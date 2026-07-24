import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Moon, Sun, Trash2, List, Menu, LogOut } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';

import LoginScreen from './components/LoginScreen';
import ProgressDashboard from './components/ProgressDashboard';
import TaskItem from './components/TaskItem';
import AddTaskModal from './components/AddTaskModal';
import Sidebar from './components/Sidebar';
import RequestsView from './components/RequestsView';
import SettingsView from './components/SettingsView';
import Portfolio from './components/Portfolio';
import AditiPortfolio from './components/AditiPortfolio';
import { auth, db, logout as firebaseLogout } from './firebase';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const [session, setSession] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [avatarUrl] = useState(() => localStorage.getItem('userAvatar'));
  const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', systemPrefersDark);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('loggedIn', false);


  const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'tasks');

  // App State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('CREATED_AT');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const showToast = (message) => {
    setToast({ message, id: Date.now() });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const toggleTheme = useCallback(async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (auth.currentUser) {
      try {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), { theme: newTheme ? 'dark' : 'light' });
      } catch (e) {
        console.error("Failed to sync theme to Firebase", e);
      }
    }
  }, [isDarkMode, setIsDarkMode]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setSession(user.uid);
            setIsLoggedIn(true);
          } else {
            setSession(null);
            setIsLoggedIn(false);
          }
        });
      } catch (err) {
        console.error('Failed to load firebase auth', err);
      }
    };
    checkAuth();
  }, [setIsLoggedIn]);

  const fetchTasksAndRequests = useCallback(async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (!user) return;
        
        try {
          const qTasks = query(collection(db, 'tasks'), where('user_id', '==', user.uid));
          const snapshotTasks = await getDocs(qTasks);
          let userTasks = snapshotTasks.docs.map(d => ({ ...d.data(), id: d.id }));
          
          const qCollab = query(collection(db, 'tasks'), where(`collaborators.${user.uid}`, '==', 'ACCEPTED'));
          const snapshotCollab = await getDocs(qCollab);
          let collabTasks = snapshotCollab.docs.map(d => ({ ...d.data(), id: d.id }));
          
          const allTasks = [...userTasks, ...collabTasks];
          const uniqueTasks = Array.from(new Map(allTasks.map(item => [item.id, item])).values());
          setTasks(uniqueTasks);

          const qReq = query(collection(db, 'tasks'), where(`collaborators.${user.uid}`, '==', 'PENDING'));
          const snapshotReq = await getDocs(qReq);
          let reqs = snapshotReq.docs.map(d => ({ ...d.data(), id: d.id }));
          setRequests(reqs);
        } catch (e) {
          console.error("Fetch Tasks Error:", e);
          showToast("Error loading tasks: " + e.message);
        }
      });
    } catch (err) {
      console.error('Failed to setup auth listener', err);
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (isLoggedIn && session) {
      const syncUser = async () => {
        try {
          auth.onAuthStateChanged(async (user) => {
             if (!user) return;
             const userDoc = await getDoc(doc(db, 'users', user.uid));
             if (userDoc.exists()) {
               const data = userDoc.data();
               if (data.theme) setIsDarkMode(data.theme === 'dark');
               setCurrentUser(prev => {
                 const newPic = data.profilePic !== undefined ? data.profilePic : prev?.profilePic;
                 const updatedUser = { ...data, profilePic: newPic, uid: user.uid };
                 localStorage.setItem('user', JSON.stringify(updatedUser));
                 return updatedUser;
               });
             }
          });
        } catch (err) {
          console.error('Failed to sync user data', err);
        }
      };

      syncUser();
      intervalId = setInterval(syncUser, 10000);
      fetchTasksAndRequests();
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoggedIn, session, fetchTasksAndRequests]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isLoggedIn && activeTab === 'requests') {
      fetchTasksAndRequests();
    }
  }, [activeTab, isLoggedIn, fetchTasksAndRequests]); // eslint-disable-line react-hooks/exhaustive-deps

  // Derived State
  const filteredTasks = useMemo(() => {
    let source = searchResults !== null ? searchResults : tasks;
    let result = source.filter(task => {
      const matchesCategory = selectedCategory === 'ALL' || task.category === selectedCategory;
      
      // If backend search results exist, we only apply category filtering
      if (searchResults !== null) {
        return matchesCategory;
      }

      // Otherwise fallback to local instant filtering
      const searchLower = searchQuery.toLowerCase();
      const titleMatches = (task.title || '').toLowerCase().includes(searchLower);
      const descMatches = (task.description || '').toLowerCase().includes(searchLower);
      const matchesSearch = titleMatches || descMatches;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'CREATED_AT') {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === 'DUE_DATE') {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === 'PRIORITY') {
      const pMap = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      result.sort((a, b) => pMap[b.priority] - pMap[a.priority]);
    }
    return result;
  }, [tasks, searchQuery, selectedCategory, sortBy, searchResults]); // eslint-disable-line react-hooks/exhaustive-deps

  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.completed).length;
    return { completed, total: tasks.length };
  }, [tasks]);

  const addTask = async (task) => {
    try {
      if (!auth.currentUser) return;

      const payload = { ...task, user_id: auth.currentUser.uid, createdAt: Date.now(), collaborators: {} };
      delete payload.id;
      let invitees = [];
      
      if (task.collaboratorEmails && task.collaboratorEmails.length > 0) {
        const searchEmails = task.collaboratorEmails.map(e => e.toLowerCase());
        const qUsers = query(collection(db, 'users'), where('email', 'in', searchEmails));
        const userDocs = await getDocs(qUsers);
        userDocs.forEach(d => {
          payload.collaborators[d.id] = 'PENDING';
          invitees.push(d.data().email);
        });
      }
      payload.collaboratorEmails = invitees;
      
      const creatorDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (creatorDoc.exists()) payload.creator_name = creatorDoc.data().username || 'Someone';

      const docRef = await addDoc(collection(db, 'tasks'), payload);
      setTasks(prev => [...prev, { ...payload, id: docRef.id }]);

      if (invitees.length > 0) {
        showToast(`Task created & invite sent to ${invitees.join(', ')} 📩`);
      } else {
        showToast('Task created successfully ✨');
      }
    } catch (e) {
      console.error(e);
      showToast('Error creating task ❌');
    }
  };

  const toggleTask = async (id) => {
    if (!id) {
      showToast('Error: task ID is undefined!');
      return;
    }
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updatedTask = { ...task, completed: !task.completed };
    
    setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    
    try {
      await updateDoc(doc(db, 'tasks', String(id)), { completed: updatedTask.completed });
      showToast(updatedTask.completed ? 'Task completed 🎉' : 'Task unmarked ⏪');
    } catch (e) {
      console.error(e);
      setTasks(prev => prev.map(t => t.id === id ? task : t));
      showToast('Error updating task: ' + e.message);
    }
  };

  const deleteTask = async (id) => {
    if (!id) {
      showToast('Error: task ID is undefined!');
      return;
    }
    console.log("Attempting to delete task with ID:", id);
    try {
      await deleteDoc(doc(db, 'tasks', String(id)));
      setTasks(prev => prev.filter(t => t.id !== id));
      showToast('Task deleted 🗑️');
    } catch (e) {
      console.error(e);
      showToast('Error deleting task: ' + e.message);
    }
  };

  const editTask = async (updatedTask) => {
    if (!updatedTask.id) {
      showToast('Error: task ID is undefined!');
      return;
    }
    try {
      if (!auth.currentUser) return;

      const payload = { ...updatedTask };
      delete payload.id;
      
      const originalTask = tasks.find(t => t.id === updatedTask.id);
      const oldEmails = originalTask?.collaboratorEmails || [];
      const newEmails = updatedTask.collaboratorEmails || [];
      
      const emailsChanged = JSON.stringify(oldEmails) !== JSON.stringify(newEmails);
      let invitees = [];

      if (emailsChanged) {
        payload.collaborators = {};
        if (newEmails.length > 0) {
          const searchEmails = newEmails.map(e => e.toLowerCase());
          const qUsers = query(collection(db, 'users'), where('email', 'in', searchEmails));
          const userDocs = await getDocs(qUsers);
          userDocs.forEach(d => {
            payload.collaborators[d.id] = 'PENDING';
            invitees.push(d.data().email);
          });
        }
        payload.collaboratorEmails = invitees;
      } else {
        payload.collaborators = originalTask?.collaborators || {};
        payload.collaboratorEmails = oldEmails;
      }

      await updateDoc(doc(db, 'tasks', String(updatedTask.id)), payload);
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? { ...payload, id: updatedTask.id } : t));

      if (emailsChanged && invitees.length > 0) {
        showToast(`Task updated & invite sent to ${invitees.join(', ')} 📩`);
      } else {
        showToast('Task updated successfully 📝');
      }
    } catch (e) {
      console.error(e);
      showToast('Error updating task: ' + e.message);
    }
  };

  const clearCompleted = async () => {
    const completedTasks = tasks.filter(t => t.completed && t.id);
    try {
      await Promise.all(completedTasks.map(t => deleteDoc(doc(db, 'tasks', String(t.id)))));
      setTasks(prev => prev.filter(t => !t.completed));
      showToast('Completed tasks cleared 🧹');
    } catch (e) {
      console.error(e);
      showToast('Error clearing tasks: ' + e.message);
    }
  };

  const handleRequest = async (req, status) => {
    const taskId = req.id;
    if (!taskId) {
      showToast('Error: Request missing task ID! req: ' + JSON.stringify(req));
      return;
    }
    const creatorName = req.creator_name || 'Someone';

    setRequests(requests.filter(r => r.id !== taskId));
    
    try {
      if (!auth.currentUser) return;
      
      const taskRef = doc(db, 'tasks', String(taskId));
      await updateDoc(taskRef, {
        [`collaborators.${auth.currentUser.uid}`]: status
      });
      
      if (status === 'ACCEPTED') {
        showToast(`Collaborated with ${creatorName} 🤝`);
        fetchTasksAndRequests();
      } else {
        showToast('Request declined 🗑️');
      }
    } catch (e) {
      console.error(e);
      showToast('Error responding to invite: ' + e.message);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseLogout();
    } catch (e) {
      console.error("Firebase logout error:", e);
    }
    
    // Always clear local state
    setIsLoggedIn(false);
    setSession(null);
    setCurrentUser({});
    setTasks([]);
    localStorage.removeItem('user');
    setShowLogoutConfirm(false);
    setIsMobileMenuOpen(false);
    showToast('Logged out successfully');
  };




  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'portfolio') return 'portfolio';
    if (params.get('view') === 'aditi_portfolio') return 'aditi_portfolio';
    return sessionStorage.getItem('currentView') || 'app';
  });

  const setView = (view) => {
    setCurrentView(view);
    sessionStorage.setItem('currentView', view);
  };

  if (currentView === 'portfolio') return <Portfolio onBack={() => setView('app')} />;
  if (currentView === 'aditi_portfolio') return <AditiPortfolio onBack={() => setView('app')} />;

  if (!isLoggedIn) return (
    <LoginScreen 
      onLoginSuccess={() => setIsLoggedIn(true)} 
      onShowPortfolio={() => setView('portfolio')} 
      onShowAditiPortfolio={() => setView('aditi_portfolio')}
    />
  );

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0c0c11] text-slate-900 dark:text-white transition-colors duration-300 flex overflow-x-hidden font-inter relative">

        {/* Futuristic Ambient Glows - Dark Mode Only */}
        {isDarkMode && (
          <>
            <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
          </>
        )}

        {/* Responsive Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onLogout={() => setShowLogoutConfirm(true)}
          stats={stats}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          pendingCount={requests.length}
          user={currentUser}
        />

        {/* Main Content Area */}
        <main className="flex-1 h-screen lg:min-h-[calc(100vh-2rem)] lg:my-4 lg:mr-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:ml-[112px] peer-hover:lg:ml-[288px] bg-white dark:bg-[#13131a] lg:rounded-3xl shadow-2xl border-0 lg:border border-slate-100 dark:border-white/5 overflow-y-auto relative">
          <div className="max-w-7xl w-full px-6 lg:px-8 py-8 pb-32 min-h-full">

            {/* Header (Mobile) */}
            <header className="lg:hidden flex items-center justify-between mb-8 relative z-10">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-3 bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm text-slate-500 dark:text-white"><Menu size={24} /></button>
              <div className="flex gap-2">
                <button onClick={toggleTheme} className="p-3 bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[#7c3aed] rounded-2xl">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
              </div>
            </header>

            {/* Content Switcher */}
            <AnimatePresence mode='wait'>
              {activeTab === 'tasks' && (
                <motion.div key="tasks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>

                  <div className="flex flex-col items-center lg:items-start mb-10 text-center lg:text-left relative z-10">
                    <h1 className="text-4xl font-black text-[#7C4DFF] tracking-tight dark:drop-shadow-md">My Tasks</h1>
                    {stats.completed > 0 && (
                      <button onClick={clearCompleted} className="absolute right-0 top-0 p-3 bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 border border-transparent dark:border-red-500/20 rounded-2xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"><Trash2 size={20} /></button>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-5xl">
                    <div className="w-full lg:w-[280px] shrink-0 space-y-6">
                      <ProgressDashboard completed={stats.completed} total={stats.total} />
                      <div className="relative z-10 group">
                        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-colors ${isSearching ? 'text-[#3b82f6] animate-pulse' : 'text-[#7c3aed] group-focus-within:text-[#3b82f6]'}`} size={20} />
                        <input 
                          type="text" 
                          placeholder="Search your tasks... (Press Enter)" 
                          value={searchQuery} 
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value.trim() === '') setSearchResults(null);
                          }}
                          onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                              const keywords = searchQuery.trim().split(/\s+/).filter(Boolean);
                              if (keywords.length === 0) {
                                setSearchResults(null);
                                return;
                              }
                              
                              setIsSearching(true);
                              // We are serverless now! The frontend already instantly filters tasks 
                              // via the useMemo hook whenever searchQuery changes.
                              // No need to query a backend for search!
                              setTimeout(() => {
                                setIsSearching(false);
                                setSearchResults(null);
                              }, 300);
                            }
                          }}
                          className="w-full h-14 pl-12 pr-6 bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[1.25rem] focus:border-[#7c3aed]/50 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm dark:shadow-xl dark:shadow-black/20" 
                        />
                      </div>

                    </div>

                    <div className="flex-1 relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><List size={14} />{filteredTasks.length} {selectedCategory !== 'ALL' ? selectedCategory : ''} Tasks</h2>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white dark:bg-[#181820] text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none transition-all cursor-pointer">
                          <option value="CREATED_AT">Sort: Created</option>
                          <option value="DUE_DATE">Sort: Due Date</option>
                          <option value="PRIORITY">Sort: Priority</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <AnimatePresence mode='popLayout'>
                          {filteredTasks.map(task => <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={setEditingTask} currentUser={currentUser} />)}
                          {filteredTasks.length === 0 && <div key="empty-state" className="text-center py-20 text-slate-300"><List size={48} className="mx-auto mb-4 opacity-10" /><p className="font-bold text-lg">No tasks here!</p></div>}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'requests' && (
                <RequestsView
                  key="requests"
                  requests={requests}
                  onAccept={(req) => handleRequest(req, 'ACCEPTED')}
                  onDecline={(req) => handleRequest(req, 'DECLINED')}
                />
              )}
              {activeTab === 'settings' && (
                <SettingsView 
                  isDarkMode={isDarkMode} 
                  toggleTheme={toggleTheme} 
                  onLogout={handleLogout}
                  showToast={showToast}
                  user={currentUser}
                  onUserUpdated={(u) => setCurrentUser(prev => ({...prev, ...u}))}
                />
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Floating Action Button */}
        <AnimatePresence>
          {activeTab === 'tasks' && (
            <motion.button
              key="fab-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="fixed bottom-8 right-8 lg:bottom-12 lg:right-12 w-16 h-16 bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] text-white rounded-[1.5rem] flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,0.5)] z-40"
            >
              <Plus size={32} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Modals */}
        <AnimatePresence>
          {(showAddModal || editingTask) && (
            <AddTaskModal
              key="add-task-modal"
              initialData={editingTask}
              onClose={() => { setShowAddModal(false); setEditingTask(null); }}
              onSubmit={editingTask ? editTask : addTask}
            />
          )}
          {showLogoutConfirm && (
            <div key="logout-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setShowLogoutConfirm(false)} 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white dark:bg-[#13131a] p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-slate-100 dark:border-white/5 text-center"
              >
                <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <LogOut size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Sign Out?</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Are you sure you want to log out of your account?</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/25 transition-all hover:scale-105 active:scale-95"
                  >
                    Log Out
                  </button>
                </div>
              </motion.div>
            </div>
          )}
          {isMobileMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />
              <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#0c0c11] z-50 lg:hidden p-0">
                <Sidebar 
                  isMobile={true}
                  activeTab={activeTab} 
                  setActiveTab={(t) => { setActiveTab(t); setIsMobileMenuOpen(false); }} 
                  isDarkMode={isDarkMode} 
                  toggleTheme={toggleTheme} 
                  onLogout={() => { setShowLogoutConfirm(true); setIsMobileMenuOpen(false); }} 
                  stats={stats} 
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory} 
                  pendingCount={requests.length} 
                  user={currentUser} 
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
              className="fixed bottom-12 left-1/2 z-[100] px-6 py-3 bg-slate-800 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm rounded-full shadow-2xl flex items-center gap-3 whitespace-nowrap"
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

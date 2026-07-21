import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ClipboardList, Inbox, Settings as SettingsIcon, Sun, Moon, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

export default function Sidebar({
  activeTab,
  setActiveTab,
  stats,
  selectedCategory,
  setSelectedCategory,
  pendingCount = 0,
  user,
  isDarkMode,
  toggleTheme,
  onLogout,
  isMobile = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isMobile || isHovered;

  const tabs = [
    { id: 'tasks', label: 'Tasks', icon: ClipboardList },
    { id: 'requests', label: 'Requests', icon: Inbox },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <div 
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className={clsx(
        "flex flex-col overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-30",
        isMobile 
          ? "w-full h-full bg-transparent p-6 overflow-y-auto" 
          : `peer hidden lg:flex fixed left-4 top-4 h-[calc(100vh-2rem)] bg-white dark:bg-[#13131a] border border-slate-100 dark:border-white/5 p-4 shadow-2xl rounded-3xl ${isExpanded ? 'w-64' : 'w-20'}`
      )}
    >
      
      {/* Clickable Profile Section */}
      <button 
        onClick={() => setActiveTab('settings')}
        className={clsx(
          "flex items-center mb-8 h-12 w-full rounded-xl transition-all duration-300",
          isExpanded ? "justify-start px-2 hover:bg-slate-50 dark:hover:bg-white/5" : "justify-center"
        )}
      >
        <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-800 flex items-center justify-center border border-slate-200 dark:border-white/10 transition-all duration-300">
          {user?.profilePic ? (
            <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] text-white flex items-center justify-center font-bold text-sm">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
        </div>
        
        <div className={clsx(
          "flex-1 min-w-0 overflow-hidden transition-all duration-300 text-left",
          isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 ml-0"
        )}>
          <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user?.username || 'User'}</p>
          <p className="text-[10px] text-slate-500 truncate">{user?.email || ''}</p>
        </div>
      </button>

      <nav className="flex-1 space-y-2">
        <div className={clsx(
          "flex items-center justify-start transition-all duration-300 overflow-hidden",
          isExpanded ? "h-4 mb-4 px-4" : "h-0 mb-0"
        )}>
          <p className={clsx(
            "text-[9px] font-bold text-slate-500 uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
            isExpanded ? "opacity-100" : "opacity-0"
          )}>
            Navigation
          </p>
        </div>
        
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <div key={tab.id} className="space-y-1">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "w-full flex items-center h-12 rounded-xl font-bold text-sm transition-all duration-300",
                  isExpanded ? "justify-start px-4" : "justify-center",
                  activeTab === tab.id
                    ? "bg-[#2a2a35] text-[#a78bfa]"
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent"
                )}
              >
                <div className="relative shrink-0 flex items-center justify-center transition-all duration-300">
                  <Icon size={22} opacity={activeTab === tab.id ? 1 : 0.5} />
                  {tab.id === 'requests' && pendingCount > 0 && !isExpanded && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-[#181820] rounded-full animate-pulse" />
                  )}
                </div>
                <span className={clsx(
                  "overflow-hidden transition-all duration-300 whitespace-nowrap text-left",
                  isExpanded ? "opacity-100 flex-1 ml-4" : "opacity-0 w-0 ml-0"
                )}>
                  {tab.label}
                </span>
                {tab.id === 'requests' && pendingCount > 0 && (
                  <span className={clsx(
                    "w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full shrink-0 transition-all duration-300",
                    isExpanded ? "opacity-100 mr-0" : "opacity-0 w-0"
                  )}>
                    {pendingCount}
                  </span>
                )}
              </button>

              {tab.id === 'tasks' && activeTab === 'tasks' && (
                <div className={clsx(
                  "pr-0 py-2 space-y-1 overflow-hidden transition-all duration-300",
                  isExpanded ? "pl-11 opacity-100 h-auto" : "pl-0 opacity-0 h-0"
                )}>
                  {['ALL', 'WORK', 'PERSONAL', 'SHOPPING', 'OTHER'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={clsx(
                        "w-full text-left px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-300",
                        selectedCategory === cat
                          ? "bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                          : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-200"
                      )}
                    >
                      {cat === 'ALL' ? 'All Tasks' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-6 space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
        
        {/* Compact Stats for Sidebar */}
        <div className={clsx(
          "bg-slate-50 dark:bg-black/20 rounded-2xl p-4 border border-slate-100 dark:border-white/5 dark:backdrop-blur-md transition-all duration-300 flex flex-col justify-center overflow-hidden",
          isExpanded ? "opacity-100 h-auto mb-4" : "opacity-0 h-0 mb-0"
        )}>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Tasks Done</p>
          <div className="flex items-end justify-between mb-1">
            <span className="text-xl font-bold text-slate-800 dark:text-white">{stats?.completed || 0}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">/ {stats?.total || 0}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((stats?.completed || 0) / Math.max(1, stats?.total || 1)) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] shadow-[0_0_10px_rgba(124,58,237,0.5)]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={clsx(
          "flex gap-2 transition-all duration-300",
          isExpanded ? "flex-row" : "flex-col"
        )}>
          <button
            onClick={toggleTheme}
            className={clsx(
              "flex items-center bg-slate-50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 dark:text-slate-400 hover:text-[#7c3aed] dark:hover:text-[#a78bfa] transition-all duration-300",
              isExpanded ? "flex-1 justify-start h-10 px-4" : "w-full justify-center h-12"
            )}
          >
            <div className="relative shrink-0 flex items-center justify-center">
              {isDarkMode ? <Sun size={18} strokeWidth={3} className="shrink-0" /> : <Moon size={18} strokeWidth={3} className="shrink-0" />}
            </div>
            <span className={clsx(
              "text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-opacity duration-300",
              isExpanded ? "block ml-3" : "hidden ml-0"
            )}>
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>
          <button
            onClick={onLogout}
            className={clsx(
              "flex items-center bg-red-50 dark:bg-red-500/10 backdrop-blur-md border border-red-100 dark:border-red-500/20 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all duration-300",
              isExpanded ? "flex-1 justify-start h-10 px-4" : "w-full justify-center h-12"
            )}
          >
            <div className="relative shrink-0 flex items-center justify-center">
              <LogOut size={18} strokeWidth={3} className="shrink-0" />
            </div>
            <span className={clsx(
              "text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-opacity duration-300",
              isExpanded ? "block ml-3" : "hidden ml-0"
            )}>
              Logout
            </span>
          </button>
        </div>

        {/* App Logo */}
        <div className={clsx(
          "flex items-center mt-4 pt-4 border-t border-slate-100 dark:border-white/5 overflow-hidden transition-all duration-300 h-12",
          isExpanded ? "justify-start px-2" : "justify-center"
        )}>
          <div className="relative shrink-0 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl shadow-lg shadow-indigo-500/20">
            <div className="w-4 h-4 bg-green-400 rounded flex items-center justify-center shadow-sm">
              <Check size={10} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <h1 className={clsx(
            "text-[14px] font-bold text-slate-800 dark:text-white tracking-tight transition-opacity duration-300 whitespace-nowrap",
            isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 ml-0"
          )}>
            TodoList
          </h1>
        </div>
      </div>
    </div>
  );
}

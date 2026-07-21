import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Check, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, signInWithGoogle } from '../firebase';

export default function LoginScreen({ onLoginSuccess, onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onLoginSuccess();
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const finalUsername = username || email.split('@')[0];
        
        await setDoc(doc(db, 'users', user.uid), {
          username: finalUsername,
          email: email,
          theme: 'light',
          created_at: new Date().toISOString()
        });
        
        onLoginSuccess();
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Authentication error.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          username: user.displayName || user.email.split('@')[0],
          email: user.email,
          theme: 'light',
          profilePic: user.photoURL || '',
          created_at: new Date().toISOString()
        });
      }
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      alert('Google Sign-In error: ' + err.message);
    }
  };

  const isFormValid = isLogin 
    ? email.trim().length > 0 && password.trim().length > 0 
    : email.trim().length > 0 && username.trim().length > 0 && password.trim().length > 0 && password === confirmPassword;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden bg-[#0c0c11]">
      
      {/* Dark Purple Glow */}
      <div className="absolute top-1/2 left-0 w-[1000px] h-[1000px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      {/* Back Button */}
      <button onClick={onBack} className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 transition-colors hidden md:flex">
        <ChevronLeft size={24} />
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-[420px] flex flex-col items-center"
      >
        
        {/* Logo Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
            <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center shadow-sm">
              <Check size={20} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-[28px] font-bold text-white mb-2">TodoList</h1>
          <p className="text-sm text-slate-400">Your personal task manager — stay on top of everything.</p>
        </div>

        {/* Card */}
        <div className="w-full bg-[#181820] rounded-[2rem] p-6 sm:p-8 border border-white/[0.02] shadow-2xl">
          
          {/* Segmented Control */}
          <div className="flex bg-[#111116] rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${isLogin ? 'bg-[#7c3aed] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${!isLogin ? 'bg-[#7c3aed] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode='popLayout'>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-1">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full h-12 pl-11 pr-4 bg-[#20202a] border border-white/5 rounded-xl focus:border-[#7c3aed]/50 outline-none transition-all text-white font-medium placeholder:text-slate-500/70 text-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#e0e7ff] text-indigo-600 rounded-md p-1">
                  <Mail size={12} strokeWidth={3} />
                </div>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-[#20202a] border border-white/5 rounded-xl focus:border-[#7c3aed]/50 outline-none transition-all text-white font-medium placeholder:text-slate-500/70 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#fef3c7] text-amber-600 rounded-md p-1">
                  <Lock size={12} strokeWidth={3} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-12 bg-[#20202a] border border-white/5 rounded-xl focus:border-[#7c3aed]/50 outline-none transition-all text-white font-medium placeholder:text-slate-500/70 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence mode='popLayout'>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-1">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#fef3c7] text-amber-600 rounded-md p-1">
                        <Lock size={12} strokeWidth={3} />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        autoComplete="new-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-12 pl-12 pr-12 bg-[#20202a] border border-white/5 rounded-xl focus:border-[#7c3aed]/50 outline-none transition-all text-white font-medium placeholder:text-slate-500/70 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full h-12 mt-4 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white rounded-xl font-bold text-sm disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
            
            <div className="relative flex items-center justify-center w-full py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative px-4 text-xs font-semibold text-slate-500 uppercase bg-[#181820]">
                Or
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-white text-slate-800 rounded-xl font-bold text-sm transition-all hover:bg-slate-100 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
          </form>
          
        </div>
      </motion.div>
    </div>
  );
}

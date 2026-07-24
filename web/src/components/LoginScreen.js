import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, signInWithGoogle } from '../firebase';
import { CheckCircle2, ExternalLink } from 'lucide-react';

export default function LoginScreen({ onLoginSuccess, onShowPortfolio, onShowAditiPortfolio }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

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
    : email.trim().length > 0 && username.trim().length > 0 && password.trim().length > 0;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#111216] text-white">
      
      {/* LEFT SIDE - Illustration */}
      <div className="hidden lg:flex w-full lg:w-1/2 relative items-center justify-center bg-[#0c0d10] lg:border-r border-white/5 p-6 lg:p-12 lg:sticky lg:top-0 lg:h-screen min-h-[30vh] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-blue-600/10 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-[500px] flex flex-col items-center">
          <div className="text-center hidden lg:block mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                <CheckCircle2 size={24} className="text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">TodoList</h1>
            </div>
            <p className="text-slate-400 text-base font-medium max-w-sm mx-auto">
              The easiest way to manage all your daily tasks, boost productivity, and get things done.
            </p>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg aspect-square"
          >
            <img 
              src="/premium-todo.png" 
              alt="Task Management 3D Illustration" 
              className="w-full h-full object-contain drop-shadow-2xl relative z-10 scale-110"
            />
          </motion.div>
          
          <div className="w-full hidden lg:block mt-auto pb-4">
            <div className="relative flex items-center justify-center w-full mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative px-4 text-[10px] font-bold text-slate-500 bg-[#0c0d10] tracking-widest uppercase">
                Developed By
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button 
                type="button"
                onClick={onShowPortfolio}
                className="text-left group flex flex-col bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-blue-500/30 rounded-xl p-4 transition-all"
              >
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Frontend</span>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-semibold text-white/90 group-hover:text-blue-400 transition-colors">Partha B.</span>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                </div>
              </button>
              
              <button 
                type="button"
                onClick={onShowAditiPortfolio}
                className="text-left group flex flex-col bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-purple-500/30 rounded-xl p-4 transition-all"
              >
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Backend</span>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-semibold text-white/90 group-hover:text-purple-400 transition-colors">Aditi K.</span>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form & Footer */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-between p-6 sm:p-12 relative lg:min-h-screen">
        {/* Mobile-only background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none lg:hidden" />
        
        <div className="flex-1 flex flex-col w-full items-center justify-center mt-6 lg:mt-0">
          {/* Mobile branding */}
          <div className="lg:hidden flex items-center justify-center gap-4 mb-10">
            <img 
              src="/premium-todo.png" 
              alt="3D Illustration" 
              className="w-20 h-20 object-contain drop-shadow-xl"
            />
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-3xl font-bold text-white tracking-tight mb-1">TodoList</h1>
              <p className="text-slate-400 text-sm">Manage all your daily tasks.</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-[480px] relative z-10 bg-[#1a1b23] border border-white/5 p-6 sm:p-10 rounded-[2rem] shadow-2xl"
          >

            <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-2 text-center lg:text-left">
              {isLogin ? 'Login' : 'Create an account'}
            </h2>
            
            <p className="text-slate-400 text-sm font-medium mb-8 lg:mb-10 text-center lg:text-left">
              {isLogin ? 'Welcome back! Please enter your details.' : 'Sign up to get started'}
            </p>

            {/* Social Buttons */}
            <div className="mb-8">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full h-12 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl flex items-center justify-center gap-3 transition-colors active:scale-[0.98]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-white text-sm font-semibold">Continue with Google</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center w-full mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative px-4 text-xs font-semibold text-slate-500 bg-[#1a1b23]">
                OR
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode='popLayout'>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden flex items-center"
                  >
                    <div className="w-[80px] sm:w-[100px] text-slate-400 text-sm font-medium">Username</div>
                    <input
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-1 bg-transparent border-b border-white/10 focus:border-blue-500 py-3 outline-none text-white font-medium placeholder:text-slate-600 text-sm transition-colors"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center">
                <div className="w-[80px] sm:w-[100px] text-slate-400 text-sm font-medium">Email</div>
                <input
                  type="email"
                  placeholder="user@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-b border-white/10 focus:border-blue-500 py-3 outline-none text-white font-medium placeholder:text-slate-600 text-sm transition-colors"
                />
              </div>

              <div className="flex items-center">
                <div className="w-[80px] sm:w-[100px] text-slate-400 text-sm font-medium">Password</div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent border-b border-white/10 focus:border-blue-500 py-3 outline-none text-white font-medium placeholder:text-slate-600 text-sm transition-colors"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg disabled:opacity-50 transition-colors shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                >
                  {isLogin ? 'Log in' : 'Register'}
                </button>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-slate-400 text-sm font-medium hover:text-white transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* DEVELOPED BY FOOTER (Mobile Only) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-[420px] mt-16 lg:mt-12 relative z-10 lg:hidden"
        >
          <div className="relative flex items-center justify-center w-full mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative px-4 text-[10px] font-bold text-slate-500 bg-[#111216] tracking-widest uppercase">
              Developed By
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={onShowPortfolio}
              className="text-left group flex flex-col bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-blue-500/30 rounded-xl p-4 transition-all"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Frontend</span>
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-semibold text-white/90 group-hover:text-blue-400 transition-colors">Partha B.</span>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
              </div>
            </button>
            
            <button 
              type="button"
              onClick={onShowAditiPortfolio}
              className="text-left group flex flex-col bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-purple-500/30 rounded-xl p-4 transition-all"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Backend</span>
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-semibold text-white/90 group-hover:text-purple-400 transition-colors">Aditi K.</span>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

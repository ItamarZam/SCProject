import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { AnimatePresence } from 'framer-motion';
import Confetti from '../components/ui/confetti';

const Login = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfetti(true);
    
    // Simulate login delay
    setTimeout(() => {
      if (userType === 'teacher') {
        navigate('/teacher');
      } else if (userType === 'student') {
        navigate('/student');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Logo className="h-10" />
        </div>

        {!userType ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold font-space text-center mb-6">Choose Account Type</h2>
            <div className="space-y-4">
              <button
                onClick={() => setUserType('teacher')}
                className="w-full p-4 text-left border rounded-lg hover:border-secondary transition-colors duration-300"
              >
                <h3 className="font-bold text-lg mb-1">Teacher</h3>
                <p className="text-gray-600">Access your dashboard, manage classes, and track progress</p>
              </button>
              <button
                onClick={() => setUserType('student')}
                className="w-full p-4 text-left border rounded-lg hover:border-secondary transition-colors duration-300"
              >
                <h3 className="font-bold text-lg mb-1">Student</h3>
                <p className="text-gray-600">Access your learning materials and track your progress</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold font-space text-center mb-6">
              Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary mt-6"
              >
                Login
              </button>
            </form>
            <button
              onClick={() => setUserType(null)}
              className="w-full text-center mt-4 text-gray-600 hover:text-secondary"
            >
              Back to account type selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
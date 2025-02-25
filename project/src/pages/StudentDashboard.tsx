import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, LineChart, Settings, LogOut, AlertTriangle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line } from 'recharts';
import Logo from '../components/Logo';
import Confetti from '../components/ui/confetti';
import { useConfetti } from '../hooks/use-confetti';

// Sample data for graphs
const studentProgressData = [
  { month: 'Jan', score: 70 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 80 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 88 }
];

const StudentCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const courses = [
    { id: '1', name: 'Mathematics 101', progress: 75, grade: 85 },
    { id: '2', name: 'Physics 202', progress: 60, grade: 78 },
    { id: '3', name: 'Chemistry 303', progress: 90, grade: 92 }
  ];

  if (selectedCourse) {
    return (
      <div className="bg-white rounded-lg p-6">
        <button onClick={() => setSelectedCourse(null)} className="text-secondary mb-4">← Back to Courses</button>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Mathematics 101</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Average Grade</p>
              <p className="text-3xl font-bold">85%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Progress</p>
              <p className="text-3xl font-bold text-green-500">75%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Focus Areas</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm">Algebra</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">Calculus</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-blue-800 mb-2">Improvement Suggestions</h3>
            <ul className="list-disc list-inside text-blue-700">
              <li>Focus on algebraic equations practice</li>
              <li>Review calculus fundamentals</li>
              <li>Participate in more group study sessions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Progress Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studentProgressData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6772F0" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6772F0" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#6772F0" fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Test History</h3>
            <div className="space-y-3">
              {[
                { id: 1, name: 'Midterm 1', grade: 85, date: '2024-02-15' },
                { id: 2, name: 'Quiz 1', grade: 92, date: '2024-02-28' },
                { id: 3, name: 'Assignment 2', grade: 78, date: '2024-03-05' }
              ].map(test => (
                <div key={test.id} className="bg-white border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{test.name}</h4>
                    <p className="text-sm text-gray-600">{test.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{test.grade}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-space mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">{course.name}</h2>
            <div className="mb-4">
              <p className="text-gray-600 mb-1">Progress: {course.progress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Grade: {course.grade}%</span>
              <button
                onClick={() => setSelectedCourse(course.id)}
                className="text-secondary hover:text-secondary/80"
              >
                Continue Learning →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudentProgress = () => {
  const subjects = [
    { name: 'Mathematics', strength: true, score: 85 },
    { name: 'Physics', strength: false, score: 65 },
    { name: 'Chemistry', strength: true, score: 90 }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold font-space mb-6">My Progress</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Subject Performance</h2>
          <div className="space-y-4">
            {subjects.map(subject => (
              <div key={subject.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.name}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    subject.strength 
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {subject.strength ? 'Strength' : 'Needs Work'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`rounded-full h-2 ${
                      subject.strength ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${subject.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Performance Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={studentProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#6772F0" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Areas for Improvement</h2>
          <div className="space-y-4">
            {[
              { area: 'Physics Mechanics', suggestion: 'Review force and motion concepts' },
              { area: 'Calculus', suggestion: 'Practice integration problems' },
              { area: 'Chemical Equations', suggestion: 'Focus on balancing equations' }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="text-red-500 w-5 h-5 mt-1" />
                <div>
                  <p className="font-bold">{item.area}</p>
                  <p className="text-sm text-gray-600">{item.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Improvement Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Study Groups', desc: 'Join physics study groups for peer learning' },
            { title: 'Practice Tests', desc: 'Take more practice tests in weak areas' },
            { title: 'Office Hours', desc: 'Attend teacher office hours for clarification' }
          ].map((item, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">{item.title}</h3>
              <p className="text-blue-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StudentSettings = () => (
  <div>
    <h1 className="text-3xl font-bold font-space mb-6">Settings</h1>
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="max-w-2xl space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full p-2 border rounded-lg" defaultValue="Jane Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full p-2 border rounded-lg" defaultValue="jane.smith@example.com" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Email notifications for new grades</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Weekly progress reports</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Display Settings</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Dark mode</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span>Show progress indicators</span>
            </label>
          </div>
        </div>

        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  </div>
);

const StudentDashboard = () => {
  const location = useLocation();
  const showConfetti = useConfetti();

  const navigation = [
    { name: 'My Courses', icon: BookOpen, path: '/student' },
    { name: 'Progress', icon: LineChart, path: '/student/progress' },
    { name: 'Settings', icon: Settings, path: '/student/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Logo className="h-8" />
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-secondary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-4 border-t">
            <Link
              to="/login"
              className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<StudentCourses />} />
          <Route path="/progress" element={<StudentProgress />} />
          <Route path="/settings" element={<StudentSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, BookOpen, LineChart, Settings, LogOut, Plus, Search, AlertTriangle, Upload, FolderUp, CheckCircle2, Info, ArrowRight, ArrowLeft, Calendar, Clock, FileText, UserCircle2, MoreVertical, Filter } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, BarChart, Bar } from 'recharts';
import Logo from '../components/Logo';
import Confetti from '../components/ui/confetti';
import { useConfetti } from '../hooks/use-confetti';
import ProgressIndicator from '../components/ui/progress-indicator';
import { FileUpload } from '../components/ui/file-upload';
import { FilesystemItem } from '../components/ui/filesystem-item';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

// Sample data for graphs
const performanceData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 88 }
];

const classPerformanceData = [
  { week: 'Week 1', average: 75, highest: 95, lowest: 55 },
  { week: 'Week 2', average: 78, highest: 98, lowest: 58 },
  { week: 'Week 3', average: 80, highest: 96, lowest: 62 },
  { week: 'Week 4', average: 82, highest: 97, lowest: 65 },
  { week: 'Week 5', average: 85, highest: 99, lowest: 68 },
  { week: 'Week 6', average: 88, highest: 100, lowest: 72 }
];

const ClassDetails = ({ classId }: { classId: string }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const classData = {
    '1': { 
      name: 'Mathematics 101', 
      students: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', grade: 92, attendance: 98, lastActive: '2024-03-15', status: 'active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', grade: 78, attendance: 85, lastActive: '2024-03-14', status: 'at-risk' },
        { id: 3, name: 'Carol White', email: 'carol@example.com', grade: 95, attendance: 100, lastActive: '2024-03-15', status: 'active' },
        { id: 4, name: 'David Brown', email: 'david@example.com', grade: 65, attendance: 75, lastActive: '2024-03-10', status: 'struggling' },
        { id: 5, name: 'Emma Davis', email: 'emma@example.com', grade: 88, attendance: 92, lastActive: '2024-03-15', status: 'active' }
      ]
    },
    '2': { 
      name: 'Physics 202',
      students: [
        { id: 6, name: 'Frank Wilson', email: 'frank@example.com', grade: 85, attendance: 90, lastActive: '2024-03-15', status: 'active' },
        { id: 7, name: 'Grace Lee', email: 'grace@example.com', grade: 91, attendance: 95, lastActive: '2024-03-14', status: 'active' },
        { id: 8, name: 'Henry Taylor', email: 'henry@example.com', grade: 72, attendance: 80, lastActive: '2024-03-12', status: 'at-risk' }
      ]
    },
    '3': { 
      name: 'Chemistry 303',
      students: [
        { id: 9, name: 'Ivy Chen', email: 'ivy@example.com', grade: 94, attendance: 98, lastActive: '2024-03-15', status: 'active' },
        { id: 10, name: 'Jack Martin', email: 'jack@example.com', grade: 88, attendance: 92, lastActive: '2024-03-14', status: 'active' }
      ]
    }
  }[classId];

  if (!classData) {
    return <div>Class not found</div>;
  }

  const filteredStudents = classData.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || student.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'struggling': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/teacher')} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold font-space">{classData.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-secondary">{classData.students.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Class Average</h3>
          <p className="text-3xl font-bold text-green-500">
            {Math.round(classData.students.reduce((acc, student) => acc + student.grade, 0) / classData.students.length)}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Average Attendance</h3>
          <p className="text-3xl font-bold text-blue-500">
            {Math.round(classData.students.reduce((acc, student) => acc + student.attendance, 0) / classData.students.length)}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Students</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="p-2 border rounded-lg"
              >
                <option value="all">All Students</option>
                <option value="active">Active</option>
                <option value="at-risk">At Risk</option>
                <option value="struggling">Struggling</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UserCircle2 className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      student.grade >= 90 ? 'text-green-600' :
                      student.grade >= 80 ? 'text-blue-600' :
                      student.grade >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {student.grade}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      student.attendance >= 90 ? 'text-green-600' :
                      student.attendance >= 80 ? 'text-blue-600' :
                      student.attendance >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {student.attendance}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-secondary hover:text-secondary/80">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Class Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={classPerformanceData}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6772F0" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6772F0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="average" stroke="#6772F0" fillOpacity={1} fill="url(#colorAvg)" />
                <Area type="monotone" dataKey="highest" stroke="#4CAF50" fill="none" />
                <Area type="monotone" dataKey="lowest" stroke="#f44336" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'assignment', title: 'Midterm Exam', date: '2024-03-15' },
              { type: 'quiz', title: 'Chapter 5 Quiz', date: '2024-03-12' },
              { type: 'homework', title: 'Problem Set 3', date: '2024-03-10' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  {activity.type === 'assignment' ? (
                    <FileText className="w-5 h-5 text-secondary" />
                  ) : activity.type === 'quiz' ? (
                    <Clock className="w-5 h-5 text-secondary" />
                  ) : (
                    <Calendar className="w-5 h-5 text-secondary" />
                  )}
                </div>
                <div>
                  <p className="font-bold">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeacherClasses = () => {
  const navigate = useNavigate();
  const classes = [
    { id: '1', name: 'Mathematics 101', students: 30 },
    { id: '2', name: 'Physics 202', students: 25 },
    { id: '3', name: 'Chemistry 303', students: 28 }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-space">My Classes</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">{classItem.name}</h2>
            <p className="text-gray-600 mb-4">{classItem.students} Students</p>
            <button
              onClick={() => navigate(`/teacher/class/${classItem.id}`)}
              className="text-secondary hover:text-secondary/80"
            >
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const TeacherQuestions = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold font-space mb-6">Question Bank</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Generate Questions</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Area
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full"
                />
              </div>

              <button className="btn-primary w-full">
                Generate Questions
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md mt-6">
            <h3 className="text-xl font-bold mb-4">Preview</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Questions will appear here after generation</p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Saved Questions</h2>
            <div className="space-y-4">
              {['Algebra Quiz #1', 'Physics Test #3', 'Chemistry Final'].map((item, index) => (
                <div key={index} className="p-4 border rounded-lg hover:border-secondary cursor-pointer">
                  <h4 className="font-bold">{item}</h4>
                  <p className="text-sm text-gray-600">Created on March 15, 2024</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeacherAnalytics = () => {
  const subjectPerformanceData = [
    { subject: 'Mathematics', score: 88 },
    { subject: 'Physics', score: 82 },
    { subject: 'Chemistry', score: 85 },
    { subject: 'Biology', score: 79 },
    { subject: 'Computer Science', score: 91 }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold font-space mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Overall Performance</h3>
          <p className="text-3xl font-bold text-secondary">85%</p>
          <p className="text-sm text-gray-600">Average across all classes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Active Students</h3>
          <p className="text-3xl font-bold text-secondary">127</p>
          <p className="text-sm text-gray-600">Across all classes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Improvement Rate</h3>
          <p className="text-3xl font-bold text-green-500">+12%</p>
          <p className="text-sm text-gray-600">Last 30 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Performance by Subject</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#6772F0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Areas Needing Attention</h3>
          <div className="space-y-4">
            {[
              { area: 'Calculus', students: 15 },
              { area: 'Quantum Physics', students: 12 },
              { area: 'Organic Chemistry', students: 10 }
            ].map((item) => (
              <div key={item.area} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="text-red-500 w-5 h-5" />
                <div>
                  <p className="font-bold">{item.area}</p>
                  <p className="text-sm text-gray-600">{item.students} students struggling</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestUpload = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [testName, setTestName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [impact, setImpact] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileUpload = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="test-name">Test Name</Label>
              <Input
                id="test-name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="e.g., Midterm Exam 1"
                required
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="class">Select Class</Label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Choose a class</option>
                <option value="math101">Mathematics 101</option>
                <option value="physics202">Physics 202</option>
                <option value="chemistry303">Chemistry 303</option>
              </select>
            </div>
            <div>
              <Label htmlFor="impact">Impact on Final Grade (%)</Label>
              <Input
                id="impact"
                type="number"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                min="0"
                max="100"
                required
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-lg p-6">
              <FileUpload onChange={handleFileUpload} />
            </div>
            {files.length > 0 && (
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">Uploaded Files</h4>
                <div className="max-h-60 overflow-y-auto">
                  <FilesystemItem
                    node={{
                      name: 'Test Files',
                      nodes: files.map(file => ({
                        name: file.name
                      }))
                    }}
                    animated
                  />
                </div>
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (uploadComplete) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Upload Complete!</h2>
          <p className="text-gray-600 mb-6">
            All files have been successfully uploaded and processed.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Upload Another Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold font-space mb-8">Upload Tests</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <AnimatePresence mode="wait">
          {renderStep(currentStep)}
        </AnimatePresence>

        <div className="mt-8">
          <ProgressIndicator
            currentStep={currentStep}
            onStepChange={handleStepChange}
            onComplete={() => setUploadComplete(true)}
          />
        </div>
      </div>
    </div>
  );
};

const TeacherSettings = () => (
  <div>
    <h1 className="text-3xl font-bold font-space mb-6">Settings</h1>
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="max-w-2xl">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full p-2 border rounded-lg" defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full p-2 border rounded-lg" defaultValue="john.doe@example.com" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span>Email notifications for new submissions</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span>Weekly performance reports</span>
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
                <span>Show analytics on dashboard</span>
              </label>
            </div>
          </div>

          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
);

const TeacherDashboard = () => {
  const location = useLocation();
  const showConfetti = useConfetti();

  const navigation = [
    { name: 'Classes', icon: Users, path: '/teacher' },
    { name: 'Question Bank', icon: BookOpen, path: '/teacher/questions' },
    { name: 'Analytics', icon: LineChart, path: '/teacher/analytics' }, { name: 'Upload Tests', icon: Upload, path: '/teacher/upload-tests' },
    { name: 'Settings', icon: Settings, path: '/teacher/settings' },
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
          <Route path="/" element={<TeacherClasses />} />
          <Route path="/class/:id" element={<ClassDetails classId={location.pathname.split('/').pop() || ''} />} />
          <Route path="/questions" element={<TeacherQuestions />} />
          <Route path="/analytics" element={<TeacherAnalytics />} />
          <Route path="/upload-tests" element={<TestUpload />} />
          <Route path="/settings" element={<TeacherSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherDashboard;
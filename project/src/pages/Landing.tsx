import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { Brain, BookOpen, Users, LineChart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: "Our advanced AI analyzes each student's learning patterns and creates personalized study paths.",
    },
    {
      icon: BookOpen,
      title: 'Smart Content Generation',
      description: 'Automatically generate quizzes, assignments, and study materials tailored to your curriculum.',
    },
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Enable seamless interaction between teachers and students with instant feedback and support.',
    },
    {
      icon: LineChart,
      title: 'Progress Tracking',
      description: 'Monitor student progress with detailed analytics and actionable insights.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-space mb-6">
            How EDU-BOT Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our AI-powered platform revolutionizes the learning experience
            for both teachers and students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
                  <step.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-space mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-gray-200 transform translate-x-4">
                  <div className="absolute right-0 w-2 h-2 bg-secondary rounded-full transform -translate-y-1/2"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-space mb-4">See EDU-BOT in Action</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch how EDU-BOT transforms the learning experience with AI-powered features
              and intuitive tools.
            </p>
          </div>
          
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Demo Video Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
    </div>
  );
};

export default Landing;
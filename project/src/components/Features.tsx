import React from 'react';
import { BookOpen, Users, LineChart, Brain } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Smart Learning Paths',
      description: "AI-powered personalized learning journeys adapted to each student's pace and style."
    },
    {
      icon: Users,
      title: 'Teacher Dashboard',
      description: 'Comprehensive analytics and insights to track student progress and identify areas for improvement.'
    },
    {
      icon: LineChart,
      title: 'Performance Tracking',
      description: 'Real-time monitoring of student engagement and achievement with detailed analytics.'
    },
    {
      icon: Brain,
      title: 'AI Question Generator',
      description: 'Automatically generate relevant questions and assessments tailored to your curriculum.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-space mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your teaching experience with our comprehensive suite of AI-powered tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <feature.icon className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold font-space mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
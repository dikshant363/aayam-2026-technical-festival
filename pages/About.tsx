
import React, { useState } from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { Target, Lightbulb, TrendingUp, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div>
      <SEO 
        title="About Us" 
        description="Learn about the legacy of AAYAM, the mission of Bhagwan Mahavir University, and why you should partner with us for AAYAM 2026." 
      />
      
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">About AAYAM</h1>
        <p className="text-xl opacity-90">Celebrating a Decade of Innovation and Excellence</p>
      </div>

      <Section light>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">About Faculty of Engineering, BMU</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Bhagwan Mahavir University (BMU) is committed to inclusion and innovation in education. 
              The Faculty of Engineering is the flagship department, nurturing thousands of engineers 
              who contribute to the nation's technological growth.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With state-of-the-art laboratories and industry-aligned curriculum, we focus on 
              practical learning and holistic development of our students.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/college1/400/300" className="rounded-lg shadow-md w-full h-48 object-cover" alt="Campus Building 1" loading="lazy" />
            <img src="https://picsum.photos/seed/college2/400/300" className="rounded-lg shadow-md w-full h-48 object-cover mt-8" alt="Campus Building 2" loading="lazy" />
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Our Vision & Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Vision</h3>
              <p className="text-gray-600">
                To be a premier platform that bridges the gap between academic learning and industrial application, 
                fostering a culture of innovation among youth.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-secondary mb-6">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Mission</h3>
              <p className="text-gray-600">
                To organize world-class technical events that challenge students, encourage teamwork, 
                and provide industry exposure through sponsorship and mentorship.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section light>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Why Sponsor AAYAM?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Massive Reach</h3>
              <p className="text-sm text-gray-500">Connect with 1000+ engineering students and faculty members directly.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Brand Visibility</h3>
              <p className="text-sm text-gray-500">Logos on banners, certificates, and social media campaigns reaching thousands.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Talent Acquisition</h3>
              <p className="text-sm text-gray-500">Identify and recruit top talent from coding competitions and hackathons.</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default About;

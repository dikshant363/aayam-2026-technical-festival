
import React, { useEffect, useState } from 'react';
import { Linkedin, Mail, Phone } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { storageService } from '../services/storage';
import { TeamMember } from '../types';

const TeamCard: React.FC<{ member: TeamMember; variant?: 'large' | 'small' }> = ({ member, variant = 'large' }) => (
  <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
    <div className={`relative overflow-hidden ${variant === 'large' ? 'h-72' : 'h-64'}`}>
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
        <div className="flex space-x-4">
            {member.email && (
              <a href={`mailto:${member.email}`} className="text-white hover:text-secondary bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors" title="Email">
                <Mail size={20} />
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className="text-white hover:text-secondary bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors" title="Call">
                <Phone size={20} />
              </a>
            )}
            <a href="#" className="text-white hover:text-secondary bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors" title="LinkedIn">
              <Linkedin size={20} />
            </a>
        </div>
      </div>
    </div>
    <div className="p-6 text-center">
      <h3 className={`font-bold text-gray-900 ${variant === 'large' ? 'text-xl' : 'text-lg'}`}>{member.name}</h3>
      <p className="text-primary font-medium text-sm mt-1">{member.role}</p>
    </div>
  </div>
);

const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    setTeam(storageService.getTeam());
  }, []);

  const facultyMembers = team.filter(m => m.category === 'Faculty');
  const sponsorshipMembers = team.filter(m => m.category === 'Sponsorship');
  const organizingMembers = team.filter(m => m.category === 'Organizing');

  return (
    <div>
      <SEO 
        title="Our Team" 
        description="Meet the dedicated faculty, students, and coordinators behind the success of AAYAM 2026." 
      />

      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Meet the Team</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto px-4">
          The dedicated minds working behind the scenes to make AAYAM 2026 a grand success.
        </p>
      </div>

      {/* Faculty Section */}
      <Section className="bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-800">Faculty Coordinators</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {facultyMembers.map((member) => (
            <div key={member.id} className="w-full sm:w-80 max-w-xs">
               <TeamCard member={member} />
            </div>
          ))}
        </div>
      </Section>

      {/* Sponsorship Team */}
      <Section className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-800">Sponsorship Committee</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
             For any sponsorship related queries, please reach out to our team.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sponsorshipMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </Section>

      {/* Organizing Committee */}
      <Section className="bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-800">Core Organizing Team</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {organizingMembers.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-md ring-4 ring-gray-100 group-hover:ring-primary/20 transition-all">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">{member.name}</h3>
              <p className="text-gray-500 text-xs md:text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Join Team CTA */}
      <Section className="bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Want to be part of AAYAM?</h2>
        <p className="mb-8 text-blue-100 max-w-2xl mx-auto">
          We are always looking for enthusiastic volunteers. Join our team and gain valuable experience in event management.
        </p>
        <a 
            href="#" 
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors"
        >
            Volunteer Registration
        </a>
      </Section>
    </div>
  );
};

export default Team;

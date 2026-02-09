
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Trophy, Star } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { PACKAGES, TESTIMONIALS } from '../constants';
import SponsorModal from '../components/SponsorModal';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <SEO
        title="Home"
        description="AAYAM 2026 is South Gujarat's largest technical festival organized by Bhagwan Mahavir University. Join us for innovation, competition, and growth."
      />

      {/* Hero Section */}
      <div className="relative bg-primary min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <img
          src="https://picsum.photos/seed/techfest/1920/1080"
          alt="AAYAM Crowd and Stage"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          width="1920"
          height="1080"
        />

        <div className="relative z-20 container mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/90 text-sm font-bold tracking-wide mb-6 animate-pulse">
            MARCH 12-13, 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 leading-tight">
            AAYAM <span className="text-secondary">2026</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-200">
            Unleashing Innovation. Empowering Talent.<br />
            South Gujarat's Premier Technical Festival.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-secondary hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Become a Sponsor
            </button>
            <Link
              to="/packages"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white px-8 py-4 rounded-full font-bold text-lg transition-all"
            >
              View Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-primary text-white py-12 relative z-30 -mt-2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <Users className="mx-auto mb-3 text-secondary" size={40} />
              <div className="text-4xl font-bold font-heading">1000+</div>
              <div className="text-sm uppercase tracking-wide opacity-80 mt-1">Participants</div>
            </div>
            <div className="p-4">
              <Trophy className="mx-auto mb-3 text-secondary" size={40} />
              <div className="text-4xl font-bold font-heading">20+</div>
              <div className="text-sm uppercase tracking-wide opacity-80 mt-1">Events</div>
            </div>
            <div className="p-4">
              <Calendar className="mx-auto mb-3 text-secondary" size={40} />
              <div className="text-4xl font-bold font-heading">10</div>
              <div className="text-sm uppercase tracking-wide opacity-80 mt-1">Years Legacy</div>
            </div>
            <div className="p-4">
              <Star className="mx-auto mb-3 text-secondary" size={40} />
              <div className="text-4xl font-bold font-heading">50+</div>
              <div className="text-sm uppercase tracking-wide opacity-80 mt-1">Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Packages */}
      <Section light className="text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary">Sponsorship Opportunities</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Partner with AAYAM 2026 to increase your brand visibility among the brightest young minds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.slice(0, 3).map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-gray-100 flex flex-col">
              <div className={`${pkg.color} p-6 text-white`}>
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <div className="text-3xl font-extrabold">{pkg.price}</div>
              </div>
              <div className="p-6 flex-grow text-left">
                <ul className="space-y-3 mb-6">
                  {pkg.benefits.slice(0, 4).map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <Star className="text-secondary mr-2 flex-shrink-0 mt-1" size={16} />
                      <span className="text-gray-600 text-sm">{benefit}</span>
                    </li>
                  ))}
                  {pkg.benefits.length > 4 && (
                    <li className="text-primary text-sm font-semibold pl-6">+ More benefits</li>
                  )}
                </ul>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Link to="/packages" className="block w-full py-3 bg-gray-50 text-primary font-bold rounded-lg border border-gray-200 hover:bg-primary hover:text-white transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link to="/packages" className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors">
            View all 5 packages <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </Section>

      {/* Past Sponsors Carousel */}
      <Section className="bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Trusted By Past Sponsors</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
          {/* Logo 1 - Uploaded Image */}
          <div className="w-56 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border border-gray-100 transform hover:scale-105 transition-transform">
            <img src="/assets/images/sponsor-1.jpg" alt="Sponsor 1" className="max-w-full max-h-full object-contain" />
          </div>
          {/* Logo 2 - Uploaded Image */}
          <div className="w-56 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border border-gray-100 transform hover:scale-105 transition-transform">
            <img src="/assets/images/sponsor-2.jpg" alt="Sponsor 2" className="max-w-full max-h-full object-contain" />
          </div>
          {/* Logo 3 - Uploaded Image */}
          <div className="w-56 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border border-gray-100 transform hover:scale-105 transition-transform">
            <img src="/assets/images/sponsor-3.jpg" alt="Sponsor 3" className="max-w-full max-h-full object-contain" />
          </div>
          {/* Logo 4 - Uploaded Image */}
          <div className="w-56 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border border-gray-100 transform hover:scale-105 transition-transform">
            <img src="/assets/images/sponsor-4.jpg" alt="Sponsor 4" className="max-w-full max-h-full object-contain" />
          </div>
          {/* Logo 5 - Uploaded Image */}
          <div className="w-56 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border border-gray-100 transform hover:scale-105 transition-transform">
            <img src="/assets/images/sponsor-5.jpg" alt="Sponsor 5" className="max-w-full max-h-full object-contain" />
          </div>
          {/* Logo 6 - Uploaded Image */}
          <div className="w-56 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 border border-gray-100 transform hover:scale-105 transition-transform">
            <img src="/assets/images/sponsor-6.png" alt="Sponsor 6" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section light>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-primary">What People Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary relative">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-gray-600 italic mb-6 mt-4">"{t.quote}"</p>
              <div>
                <h4 className="font-bold text-gray-900">{t.name}</h4>
                <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <SponsorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;

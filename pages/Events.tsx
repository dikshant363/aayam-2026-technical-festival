
import React, { useState, useMemo } from 'react';
import { Search, Filter, Monitor, Gamepad, Hammer, Zap, FlaskConical as Flask, Bot, PartyPopper, Mic2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { EVENTS_LIST } from '../constants';
import { EventCategory } from '../types';

const CATEGORIES: (EventCategory | 'All')[] = ['All', 'Computer', 'Gaming', 'Civil', 'Electrical', 'Chemical', 'Robotics', 'Non-Tech', 'Mini Concert'];

// Map categories to icons
const CategoryIcon = ({ category, className }: { category: string, className?: string }) => {
  switch (category) {
    case 'Computer': return <Monitor className={className} />;
    case 'Gaming': return <Gamepad className={className} />;
    case 'Civil': return <Hammer className={className} />;
    case 'Electrical': return <Zap className={className} />;
    case 'Chemical': return <Flask className={className} />;
    case 'Robotics': return <Bot className={className} />;
    case 'Non-Tech': return <PartyPopper className={className} />;
    case 'Mini Concert': return <Mic2 className={className} />;
    default: return <Filter className={className} />;
  }
};

const Events: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    return EVENTS_LIST.filter(event => {
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchTerm('');
  };

  return (
    <div>
      <SEO
        title="Events"
        description="Discover over 20+ technical and non-technical events at AAYAM 2026. From Hackathons to Robo Wars, we have it all."
      />

      <div className="bg-primary text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Event Lineup</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto px-4">
            Discover over 20+ competitions, workshops, and fun activities designed to challenge and entertain.
          </p>
        </div>
      </div>

      <Section light className="min-h-screen">
        {/* Filter & Search Bar */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100 mb-8 -mx-4 px-4 shadow-sm md:static md:shadow-none md:border-0 md:bg-transparent">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-shadow"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filters (Desktop) */}
            <div className="hidden md:flex flex-wrap justify-end gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:-translate-y-0.5 ${activeCategory === cat
                      ? 'bg-secondary text-white shadow-md scale-105'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Category Filters (Mobile Scrollable) */}
            <div className="flex md:hidden w-full overflow-x-auto pb-2 space-x-2 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${activeCategory === cat
                      ? 'bg-secondary text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Summary */}
          {(activeCategory !== 'All' || searchTerm) && (
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <span>Showing results for: </span>
              {activeCategory !== 'All' && <span className="font-bold text-primary ml-1">{activeCategory}</span>}
              {searchTerm && <span className="font-bold text-primary ml-1">"{searchTerm}"</span>}
              <button onClick={clearFilters} className="ml-4 text-red-500 hover:text-red-700 underline text-xs">
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Events Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={event.id}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center shadow-sm">
                        <CategoryIcon category={event.category} className="w-3 h-3 mr-1" />
                        {event.category}
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-3 text-gray-800 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-24 text-gray-400 flex flex-col items-center justify-center"
              >
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                  <Filter className="h-12 w-12 opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any events matching your current filters. Try adjusting your search or category.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Section>
    </div>
  );
};

export default Events;

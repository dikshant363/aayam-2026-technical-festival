
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, X } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { storageService } from '../services/storage';
import { FaqItem } from '../types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    setFaqs(storageService.getFaqs());
  }, []);

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqs;
    const term = searchTerm.toLowerCase();
    return faqs.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
  }, [searchTerm, faqs]);

  const categories = Array.from(new Set(filteredFaqs.map(item => item.category)));

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <SEO 
        title="FAQ" 
        description="Find answers to common questions about AAYAM 2026 registration, events, sponsorship, and logistics." 
      />

      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto px-4">
          Everything you need to know about AAYAM 2026. Can't find the answer? Contact us!
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 px-4 relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-10 py-4 border-none rounded-full leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-secondary/50 shadow-lg text-lg"
              placeholder="Search questions (e.g. sponsorship, parking)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
          </div>
        </div>
      </div>

      <Section light className="min-h-[60vh]">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">No questions found matching "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category} className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                  {category}
                </h2>
                <div className="space-y-4">
                  {filteredFaqs
                    .filter((faq) => faq.category === category)
                    .map((faq, index) => {
                      // Using the unique ID for key
                      const globalIndex = filteredFaqs.findIndex(f => f.id === faq.id);
                      const isOpen = openIndex === globalIndex;

                      return (
                        <div 
                          key={faq.id} 
                          className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md border-primary/30 ring-1 ring-primary/20' : 'hover:border-gray-300'}`}
                        >
                          <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                            onClick={() => toggleAccordion(globalIndex)}
                            aria-expanded={isOpen}
                          >
                            <span className="font-semibold text-gray-800 text-lg pr-8">{faq.question}</span>
                            {isOpen ? (
                              <ChevronUp className="flex-shrink-0 text-primary" size={20} />
                            ) : (
                              <ChevronDown className="flex-shrink-0 text-gray-400" size={20} />
                            )}
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed bg-gray-50/50 border-t border-gray-100">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))
          )}

          {/* Contact CTA */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12 text-center border border-blue-100">
            <h3 className="text-2xl font-bold text-primary mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-secondary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all transform hover:-translate-y-1"
            >
              <MessageCircle className="mr-2" size={20} />
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FAQ;

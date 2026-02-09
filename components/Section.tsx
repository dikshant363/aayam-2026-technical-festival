import React from 'react';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
  light?: boolean;
}

const Section: React.FC<SectionProps> = ({ className = '', children, id, light = false }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${light ? 'bg-white' : 'bg-transparent'} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
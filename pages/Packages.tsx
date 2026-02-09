
import React, { useState } from 'react';
import { Download, Check, X } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { PACKAGES } from '../constants';
import SponsorModal from '../components/SponsorModal';

const Packages: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (pkgTitle: string) => {
    setSelectedPackage(pkgTitle);
    setIsModalOpen(true);
  };

  return (
    <div>
      <SEO 
        title="Sponsorship Packages" 
        description="Explore our sponsorship tiers for AAYAM 2026: Title, Co-Sponsor, Activity, Stall, and Banner. Find the perfect fit for your marketing budget." 
      />

      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Sponsorship Packages</h1>
        <p className="text-xl opacity-90">Choose the best partnership tier for your brand</p>
      </div>

      <Section light>
        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={`rounded-xl overflow-hidden shadow-lg flex flex-col transform transition-transform hover:-translate-y-2 ${pkg.highlight ? 'ring-4 ring-secondary ring-offset-2' : ''}`}>
              <div className={`${pkg.color} p-4 text-center text-white h-32 flex flex-col justify-center`}>
                <h3 className="font-bold text-lg mb-1">{pkg.title}</h3>
                <div className="text-2xl font-extrabold">{pkg.price}</div>
              </div>
              <div className="p-6 bg-white flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow">
                  {pkg.benefits.slice(0, 5).map((b, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-start">
                      <Check size={12} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => openModal(pkg.title)}
                  className="w-full py-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-800 font-bold rounded-md transition-colors text-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl border border-gray-200">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold text-base">Benefits</th>
                {PACKAGES.map(pkg => (
                  <th key={pkg.id} scope="col" className={`px-6 py-4 font-bold text-center ${pkg.highlight ? 'text-primary' : ''}`}>
                    {pkg.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">Main Banner Branding</th>
                <td className="px-6 py-4 text-center text-green-600 font-bold">Large Logo</td>
                <td className="px-6 py-4 text-center text-green-600 font-bold">Medium Logo</td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
                <td className="px-6 py-4 text-center text-green-600">Name Listed</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">Stall Space</th>
                <td className="px-6 py-4 text-center">20x20 ft</td>
                <td className="px-6 py-4 text-center">10x10 ft</td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
                <td className="px-6 py-4 text-center">10x10 ft</td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
              </tr>
              <tr className="border-b bg-white">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">Social Media Post</th>
                <td className="px-6 py-4 text-center"><Check size={16} className="mx-auto text-green-500"/></td>
                <td className="px-6 py-4 text-center"><Check size={16} className="mx-auto text-green-500"/></td>
                <td className="px-6 py-4 text-center"><Check size={16} className="mx-auto text-green-500"/></td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
              </tr>
              <tr className="border-b bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">Stage Time</th>
                <td className="px-6 py-4 text-center">5 Mins</td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
                <td className="px-6 py-4 text-center text-gray-400"><X size={16} className="mx-auto"/></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <Download className="mr-2 h-5 w-5 text-gray-500" />
            Download Detailed Brochure
          </button>
        </div>
      </Section>

      <SponsorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        preSelectedPackage={selectedPackage}
      />
    </div>
  );
};

export default Packages;

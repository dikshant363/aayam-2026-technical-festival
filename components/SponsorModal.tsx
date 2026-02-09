
import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { PACKAGES } from '../constants';
import { storageService } from '../services/storage';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedPackage?: string;
}

const SponsorModal: React.FC<SponsorModalProps> = ({ isOpen, onClose, preSelectedPackage }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: '',
    package: preSelectedPackage || '',
    budget: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveApplication(formData);
    setSubmitted(true);
    // In a real app, this would trigger email notifications here
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
              <X size={24} />
            </button>
          </div>

          <div className="px-6 pt-6 pb-8">
            {!submitted ? (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 font-heading">Sponsorship Inquiry</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Fill out the details below and our team will get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Name *</label>
                      <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Person *</label>
                      <input type="text" name="contactPerson" required value={formData.contactPerson} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                      <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit number" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Industry Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                        <option value="">Select Category</option>
                        <option value="IT/Tech">IT / Technology</option>
                        <option value="Food">Food & Beverage</option>
                        <option value="Education">Education</option>
                        <option value="Fashion">Fashion & Lifestyle</option>
                        <option value="Automobile">Automobile</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Interested Package</label>
                      <select name="package" value={formData.package} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                        <option value="">Select Package</option>
                        {PACKAGES.map(p => (
                          <option key={p.id} value={p.title}>{p.title} ({p.price})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message / Specific Requirements</label>
                    <textarea name="message" rows={3} value={formData.message} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                      Submit Application
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
                <p className="text-gray-500 mb-6">
                  Thank you for your interest in sponsoring AAYAM 2026. <br/>
                  Our sponsorship team will review your details and contact you shortly.
                </p>
                <button onClick={onClose} className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-blue-100 hover:bg-blue-200 focus:outline-none">
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorModal;

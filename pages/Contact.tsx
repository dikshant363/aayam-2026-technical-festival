
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Loader2, CheckCircle, AlertCircle, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { storageService } from '../services/storage';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone is required';
        else if (!/^[0-9]{10}$/.test(value.replace(/\D/g, ''))) error = 'Enter a valid 10-digit phone number';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.length < 10) error = 'Message must be at least 10 characters';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate network delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      storageService.saveMessage(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000); // Reset success message after 5s
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SEO 
        title="Contact Us" 
        description="Get in touch with the AAYAM 2026 team. Find our office address, email, and phone number." 
      />

      <div className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Get in Touch</h1>
        <p className="text-xl opacity-90">Have questions? We're here to help.</p>
      </div>

      <Section light>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-500 mb-6">Fill out the form below and we'll respond within 24 hours.</p>
            
            {submitStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-lg text-center h-full flex flex-col justify-center items-center animate-fade-in">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="text-sm font-bold text-primary underline hover:text-blue-800"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === 'error' && (
                   <div className="bg-red-50 text-red-600 p-4 rounded-md flex items-center">
                     <AlertCircle size={20} className="mr-2" />
                     <span>Something went wrong. Please try again.</span>
                   </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. 9876543210"
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary transition-colors ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info Card */}
          <div className="order-1 lg:order-2 space-y-8">
             <div className="bg-slate-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
                  <span className="w-1 h-8 bg-secondary mr-3 rounded-full"></span>
                  Head Office Info
                </h3>
                
                <div className="space-y-6">
                   <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100">
                            <Phone size={18} />
                         </div>
                      </div>
                      <div className="ml-4">
                         <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Sponsorship Head</p>
                         <p className="font-bold text-gray-900 text-lg">Priyansh Soni</p>
                         <a href="tel:+918732991144" className="text-primary hover:underline">+91 8732991144</a>
                      </div>
                   </div>

                   <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100">
                            <Mail size={18} />
                         </div>
                      </div>
                      <div className="ml-4">
                         <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Email Us</p>
                         <a href="mailto:sponsorship@aayam2026.com" className="block text-gray-900 hover:text-primary transition-colors">sponsorship@aayam2026.com</a>
                         <a href="mailto:info@aayam2026.com" className="block text-gray-600 hover:text-primary transition-colors text-sm">info@aayam2026.com</a>
                      </div>
                   </div>

                   <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100">
                            <Clock size={18} />
                         </div>
                      </div>
                      <div className="ml-4">
                         <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Office Hours</p>
                         <p className="text-gray-900">Monday - Saturday</p>
                         <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                      </div>
                   </div>

                   <div className="flex">
                      <div className="flex-shrink-0 mt-1">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100">
                            <MapPin size={18} />
                         </div>
                      </div>
                      <div className="ml-4">
                         <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Location</p>
                         <p className="text-gray-900">Bhagwan Mahavir University</p>
                         <p className="text-gray-600">BMEF Campus, VIP Road, Vesu,<br/>Surat, Gujarat - 395017</p>
                         <a 
                            href="https://goo.gl/maps/XYZ" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-sm font-bold text-secondary hover:text-orange-700"
                         >
                            Get Directions →
                         </a>
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                   <p className="text-sm text-gray-500 mb-4 font-semibold text-center">Follow Us On Social Media</p>
                   <div className="flex justify-center space-x-4">
                      <a href="#" className="w-10 h-10 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"><Instagram size={20} /></a>
                      <a href="#" className="w-10 h-10 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"><Facebook size={20} /></a>
                      <a href="#" className="w-10 h-10 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"><Linkedin size={20} /></a>
                      <a href="#" className="w-10 h-10 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"><Twitter size={20} /></a>
                   </div>
                </div>
             </div>

             {/* Google Map */}
             <div className="h-64 w-full bg-gray-200 rounded-xl overflow-hidden shadow-md border border-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.298286950346!2d72.77977431493457!3d21.14048598593802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0527375e25223%3A0x6758801264c3971!2sBhagwan%20Mahavir%20University!5e0!3m2!1sen!2sin!4v1677834567890!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy"
                  title="BMU Location Map"
                ></iframe>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;

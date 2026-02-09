

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Upload, Trash2, Plus, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { storageService } from '../services/storage';
import { GalleryImage } from '../types';

const FILTERS = ['All', '2025', '2024', '2023', 'Technical', 'Gaming', 'Cultural', 'Workshops', 'Crowd'];

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Upload Modal State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [uploadForm, setUploadForm] = useState({
    src: '',
    title: '',
    year: '2025' as '2025' | '2024' | '2023',
    category: 'Technical' as 'Technical' | 'Gaming' | 'Cultural' | 'Workshops' | 'Crowd'
  });

  useEffect(() => {
    setImages(storageService.getGalleryImages());
    setIsAdmin(storageService.isAuthenticated());
  }, []);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') return images;
    return images.filter(img =>
      img.year === activeFilter || img.category === activeFilter
    );
  }, [activeFilter, images]);

  // Handle Upload
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      alert("Unauthorized access");
      return;
    }
    setFormError('');

    if (!uploadForm.src.trim() || !uploadForm.title.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    // Basic validation
    if (!uploadForm.src) {
      setFormError('Please upload an image.');
      return;
    }

    storageService.saveGalleryImage(uploadForm);
    setImages(storageService.getGalleryImages());
    setIsUploadOpen(false);
    // Reset form
    setUploadForm({
      src: '',
      title: '',
      year: '2025',
      category: 'Technical'
    });
    alert("Image uploaded successfully!");
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!isAdmin) return;

    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      storageService.deleteGalleryImage(id);
      setImages(storageService.getGalleryImages());
      // Close lightbox if the deleted image was open
      if (lightboxIndex !== null) setLightboxIndex(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
    if (formError) setFormError('');
  };

  // Lightbox Navigation
  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : (prev as number) - 1));
    }
  }, [lightboxIndex, filteredImages.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : (prev as number) + 1));
    }
  }, [lightboxIndex, filteredImages.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard support for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    // Lock body scroll when lightbox is open
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  return (
    <div>
      <SEO
        title="Gallery"
        description="Relive the best moments from previous AAYAM technical festivals. Browse photos of competitions, concerts, and more."
      />

      <div className="bg-primary text-white py-20 text-center relative">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Event Gallery</h1>
        <p className="text-xl opacity-90">Relive the moments from past AAYAM festivals</p>

        {isAdmin && (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="absolute right-4 bottom-4 md:right-10 md:bottom-10 bg-white text-primary px-4 py-2 rounded-full font-bold shadow-lg flex items-center hover:bg-gray-100 transition-colors z-10"
          >
            <Plus size={18} className="mr-2" /> Add Image
          </button>
        )}
      </div>

      <Section className="bg-white min-h-screen relative">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === filter
                ? 'bg-secondary text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg shadow-md bg-gray-100 mb-4"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                  <ZoomIn size={24} className="mb-2" />
                  <h3 className="font-bold text-lg">{image.title}</h3>
                  <p className="text-xs uppercase tracking-wider">{image.year} • {image.category}</p>
                </div>

                {/* Admin Delete Button */}
                {isAdmin && (
                  <button
                    onClick={(e) => handleDelete(e, image.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-10 shadow-sm"
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No images found for this category.
          </div>
        )}
      </Section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={handleClose}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50 transition-colors"
              onClick={handleClose}
            >
              <X size={40} />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-50 transition-colors bg-black/20 hover:bg-black/40 rounded-full"
              onClick={handlePrev}
            >
              <ChevronLeft size={40} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-50 transition-colors bg-black/20 hover:bg-black/40 rounded-full"
              onClick={handleNext}
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Container */}
            <div
              className="relative max-w-7xl max-h-[90vh] p-4 outline-none w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={filteredImages[lightboxIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                className="max-h-[85vh] max-w-full object-contain rounded shadow-2xl mx-auto"
              />
              <div className="text-center mt-4 text-white">
                <h3 className="text-2xl font-bold font-heading">{filteredImages[lightboxIndex].title}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {filteredImages[lightboxIndex].year} • {filteredImages[lightboxIndex].category}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Image {lightboxIndex + 1} of {filteredImages.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-[110] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setIsUploadOpen(false)}>
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button onClick={() => setIsUploadOpen(false)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                    <X size={24} />
                  </button>
                </div>

                <div className="px-6 pt-6 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 font-heading flex items-center">
                    <Upload size={20} className="mr-2 text-primary" /> Upload New Image
                  </h3>
                </div>

                {formError && (
                  <div className="mx-6 bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{formError}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleUploadSubmit} className="px-6 pb-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image File</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary transition-colors">
                      <div className="space-y-1 text-center">
                        {uploadForm.src ? (
                          <div className="relative">
                            <img src={uploadForm.src} alt="Preview" className="mx-auto h-32 object-cover rounded" />
                            <button
                              type="button"
                              onClick={() => setUploadForm({ ...uploadForm, src: '' })}
                              className="mt-2 text-sm text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-500 focus-within:outline-none">
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const file = e.target.files[0];
                                      if (file.size > 5242880) { // 5MB
                                        setFormError('File size too large. Max 5MB.');
                                        return;
                                      }
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setUploadForm({ ...uploadForm, src: reader.result as string });
                                        setFormError('');
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Robo War Finals"
                      value={uploadForm.title}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year</label>
                      <select
                        name="year"
                        value={uploadForm.year}
                        onChange={handleInputChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        value={uploadForm.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      >
                        <option value="Technical">Technical</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Workshops">Workshops</option>
                        <option value="Crowd">Crowd</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm transition-colors"
                    >
                      Upload Image
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
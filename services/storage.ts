
import { SponsorApplication, ContactMessage, GalleryImage, TeamMember, FaqItem, AdminUser } from '../types';
import { GALLERY_IMAGES, FAQS, FACULTY_TEAM, SPONSORSHIP_TEAM_MEMBERS, ORGANIZING_COMMITTEE_MEMBERS } from '../constants';

const APP_KEY = 'aayam2026_apps';
const MSG_KEY = 'aayam2026_msgs';
const ADMIN_KEY = 'aayam2026_admin_session';
const GALLERY_KEY = 'aayam2026_gallery';
const TEAM_KEY = 'aayam2026_team';
const FAQ_KEY = 'aayam2026_faqs';

// Seed data
const SEED_APPLICATIONS: SponsorApplication[] = [
  { id: '1', timestamp: Date.now() - 10000000, companyName: 'TechFlow Systems', contactPerson: 'Rahul Mehta', email: 'rahul@techflow.com', phone: '9876543210', category: 'IT/Tech', package: 'Title Sponsor', budget: '1.5L', status: 'confirmed' },
  { id: '2', timestamp: Date.now() - 8000000, companyName: 'Burger King Surat', contactPerson: 'Priya Shah', email: 'priya@bk.com', phone: '9876543211', category: 'Food', package: 'Stall Sponsor', budget: '10k', status: 'confirmed' },
  { id: '3', timestamp: Date.now() - 6000000, companyName: 'Allen Institute', contactPerson: 'Vikram Singh', email: 'vikram@allen.ac.in', phone: '9876543212', category: 'Education', package: 'Co-Sponsor', budget: '75k', status: 'pending' },
  { id: '4', timestamp: Date.now() - 4000000, companyName: 'Zara Trends', contactPerson: 'Sneha Patel', email: 'sneha@zara.com', phone: '9876543213', category: 'Fashion', package: 'Banner Sponsor', budget: '5k', status: 'contacted' },
  { id: '5', timestamp: Date.now() - 2000000, companyName: 'CodeMasters', contactPerson: 'Amit Kumar', email: 'amit@codemasters.io', phone: '9876543214', category: 'IT/Tech', package: 'Activity Sponsor', budget: '20k', status: 'pending' },
  { id: '6', timestamp: Date.now() - 1000000, companyName: 'Pizza Hut', contactPerson: 'John Doe', email: 'john@pizzahut.com', phone: '9876543215', category: 'Food', package: 'Stall Sponsor', budget: '10k', status: 'rejected' },
  { id: '7', timestamp: Date.now() - 500000, companyName: 'Tesla Motors', contactPerson: 'Elon Musk', email: 'elon@tesla.com', phone: '9876543216', category: 'Automobile', package: 'Title Sponsor', budget: '2L', status: 'pending' },
];

export const storageService = {
  // Applications
  saveApplication: (app: Omit<SponsorApplication, 'id' | 'timestamp' | 'status'>) => {
    const apps = storageService.getApplications();
    const newApp: SponsorApplication = {
      ...app,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      status: 'pending'
    };
    localStorage.setItem(APP_KEY, JSON.stringify([newApp, ...apps]));
    return newApp;
  },

  getApplications: (): SponsorApplication[] => {
    const data = localStorage.getItem(APP_KEY);
    if (!data) {
      localStorage.setItem(APP_KEY, JSON.stringify(SEED_APPLICATIONS));
      return SEED_APPLICATIONS;
    }
    return JSON.parse(data);
  },

  updateApplication: (updatedApp: SponsorApplication) => {
    const apps = storageService.getApplications();
    const updated = apps.map(a => a.id === updatedApp.id ? updatedApp : a);
    localStorage.setItem(APP_KEY, JSON.stringify(updated));
  },

  updateApplicationStatus: (id: string, status: SponsorApplication['status']) => {
    const apps = storageService.getApplications();
    const updated = apps.map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem(APP_KEY, JSON.stringify(updated));
  },

  deleteApplication: (id: string) => {
    const apps = storageService.getApplications();
    const updated = apps.filter(a => a.id !== id);
    localStorage.setItem(APP_KEY, JSON.stringify(updated));
  },

  deleteAllApplications: () => {
    localStorage.setItem(APP_KEY, JSON.stringify([]));
  },

  // Messages
  saveMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'status'>) => {
    const msgs = storageService.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      status: 'unread'
    };
    localStorage.setItem(MSG_KEY, JSON.stringify([newMsg, ...msgs]));
    return newMsg;
  },

  getMessages: (): ContactMessage[] => {
    const data = localStorage.getItem(MSG_KEY);
    return data ? JSON.parse(data) : [];
  },

  updateMessageStatus: (id: string, status: ContactMessage['status']) => {
    const msgs = storageService.getMessages();
    const updated = msgs.map(m => m.id === id ? { ...m, status } : m);
    localStorage.setItem(MSG_KEY, JSON.stringify(updated));
  },

  deleteMessage: (id: string) => {
    const msgs = storageService.getMessages();
    const updated = msgs.filter(m => m.id !== id);
    localStorage.setItem(MSG_KEY, JSON.stringify(updated));
  },

  // Gallery
  getGalleryImages: (): GalleryImage[] => {
    const data = localStorage.getItem(GALLERY_KEY);
    if (!data) {
      // Add the new images to the default list
      const updatedGallery = [
        ...GALLERY_IMAGES,
        {
          id: 'new-1',
          src: '/assets/images/gallery-1.jpg',
          title: 'AAYAM Highlight 1',
          year: '2025' as const,
          category: 'Cultural' as const
        },
        {
          id: 'new-2',
          src: '/assets/images/gallery-2.jpg',
          title: 'AAYAM Highlight 2',
          year: '2025' as const,
          category: 'Technical' as const
        }
      ];
      localStorage.setItem(GALLERY_KEY, JSON.stringify(updatedGallery));
      return updatedGallery;
    }
    return JSON.parse(data);
  },

  saveGalleryImage: (image: Omit<GalleryImage, 'id'>) => {
    const images = storageService.getGalleryImages();
    const newImage: GalleryImage = {
      ...image,
      id: crypto.randomUUID()
    };
    localStorage.setItem(GALLERY_KEY, JSON.stringify([newImage, ...images]));
    return newImage;
  },

  deleteGalleryImage: (id: string) => {
    const images = storageService.getGalleryImages();
    const updated = images.filter(img => img.id !== id);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(updated));
  },

  // Team Management
  getTeam: (): TeamMember[] => {
    const data = localStorage.getItem(TEAM_KEY);
    if (!data) {
      // Merge all constants into one list with categories
      const allTeam: TeamMember[] = [
        ...FACULTY_TEAM.map(m => ({ ...m, category: 'Faculty' as const })),
        ...SPONSORSHIP_TEAM_MEMBERS.map(m => ({ ...m, category: 'Sponsorship' as const })),
        ...ORGANIZING_COMMITTEE_MEMBERS.map(m => ({ ...m, category: 'Organizing' as const }))
      ];
      localStorage.setItem(TEAM_KEY, JSON.stringify(allTeam));
      return allTeam;
    }
    return JSON.parse(data);
  },

  saveTeamMember: (member: TeamMember) => {
    const team = storageService.getTeam();
    let updated;
    if (team.find(t => t.id === member.id)) {
      updated = team.map(t => t.id === member.id ? member : t);
    } else {
      updated = [...team, member];
    }
    localStorage.setItem(TEAM_KEY, JSON.stringify(updated));
  },

  deleteTeamMember: (id: string) => {
    const team = storageService.getTeam();
    const updated = team.filter(t => t.id !== id);
    localStorage.setItem(TEAM_KEY, JSON.stringify(updated));
  },

  // FAQ Management
  getFaqs: (): FaqItem[] => {
    const data = localStorage.getItem(FAQ_KEY);
    if (!data) {
      // Add simulated IDs to initial constants
      const seeded = FAQS.map(f => ({ ...f, id: crypto.randomUUID() }));
      localStorage.setItem(FAQ_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(data);
  },

  saveFaq: (faq: FaqItem) => {
    const faqs = storageService.getFaqs();
    let updated;
    if (faqs.find(f => f.id === faq.id)) {
      updated = faqs.map(f => f.id === faq.id ? faq : f);
    } else {
      updated = [...faqs, faq];
    }
    localStorage.setItem(FAQ_KEY, JSON.stringify(updated));
  },

  deleteFaq: (id: string) => {
    const faqs = storageService.getFaqs();
    const updated = faqs.filter(f => f.id !== id);
    localStorage.setItem(FAQ_KEY, JSON.stringify(updated));
  },

  // Authentication
  isAuthenticated: () => {
    const session = sessionStorage.getItem(ADMIN_KEY);
    return !!session;
  },

  getCurrentUser: (): AdminUser | null => {
    const session = sessionStorage.getItem(ADMIN_KEY);
    return session ? JSON.parse(session) : null;
  },

  login: (email: string, pass: string): boolean => {
    // Mock secure login
    if (email === 'admin@aayam.com' && pass === 'admin123') {
      const user: AdminUser = {
        id: 'adm_1',
        email: email,
        name: 'Super Admin',
        role: 'admin',
        lastLogin: Date.now()
      };
      sessionStorage.setItem(ADMIN_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  },

  logout: () => {
    sessionStorage.removeItem(ADMIN_KEY);
  }
};


import { Event, FaqItem, NavItem, SponsorPackage, TeamMember, Testimonial, GalleryImage } from './types';

export const EVENT_DATE = "2026-03-12T09:00:00";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Packages', path: '/packages' },
  { label: 'Events', path: '/events' },
  { label: 'Team', path: '/team' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export const PACKAGES: SponsorPackage[] = [
  {
    id: 'title',
    title: 'Title Sponsor',
    price: '₹1,50,000',
    color: 'bg-primary',
    highlight: true,
    benefits: [
      'Main Event Title Branding',
      'Largest Logo on Main Banner',
      'Exclusive Social Media Campaign',
      '5 VIP Passes + Lunch',
      'Speaking Opportunity at Inauguration',
      'Prime Stall Location (20x20)'
    ]
  },
  {
    id: 'co',
    title: 'Co-Sponsor',
    price: '₹75,000',
    color: 'bg-secondary',
    highlight: false,
    benefits: [
      'Co-Branding on Marketing Material',
      'Large Logo on Banners',
      'Social Media Mentions',
      '3 VIP Passes',
      'Stall Space (10x10)'
    ]
  },
  {
    id: 'activity',
    title: 'Activity Sponsor',
    price: 'Cost + ₹8,000',
    color: 'bg-purple-600',
    highlight: false,
    benefits: [
      'Exclusive Branding for Specific Event',
      'Judge/Mentor Opportunity',
      'Targeted Audience Interaction',
      'Logo on Event Certificate'
    ]
  },
  {
    id: 'stall',
    title: 'Stall Sponsor',
    price: '₹5,000',
    color: 'bg-green-600',
    highlight: false,
    benefits: [
      '10x10 Stall Space',
      'Direct Student Interaction',
      'Product Display & Sales',
      'Networking Opportunity'
    ]
  },
  {
    id: 'banner',
    title: 'Banner Sponsor',
    price: '₹3,000',
    color: 'bg-gray-600',
    highlight: false,
    benefits: [
      'Banner Displayed in Campus',
      'High Visibility Areas',
      'Brand Awareness'
    ]
  }
];

export const EVENTS_LIST: Event[] = [
  // Computer
  { id: 'c1', title: 'CTF (Capture The Flag)', category: 'Computer', description: 'Test your cybersecurity skills in this intense hacking challenge.', image: 'https://picsum.photos/seed/ctf/600/400' },
  { id: 'c2', title: 'Codes (Hackathon)', category: 'Computer', description: '24-hour coding marathon to solve real-world problems.', image: 'https://picsum.photos/seed/hackathon/600/400' },
  { id: 'c3', title: 'AI Champion', category: 'Computer', description: 'Showcase your innovative AI/ML models and solutions.', image: 'https://picsum.photos/seed/ai/600/400' },
  { id: 'c4', title: 'Error Bug', category: 'Computer', description: 'Find and fix bugs in the provided code snippets.', image: 'https://picsum.photos/seed/bug/600/400' },
  { id: 'c5', title: 'Web Crawler', category: 'Computer', description: 'Web design and development competition.', image: 'https://picsum.photos/seed/web/600/400' },

  // Gaming
  { id: 'g1', title: 'Valorant', category: 'Gaming', description: '5v5 Tactical Shooter showdown. Hybrid mode.', image: 'https://picsum.photos/seed/valorant/600/400' },
  { id: 'g2', title: 'BGMI', category: 'Gaming', description: 'Battle Royale mobile gaming tournament.', image: 'https://picsum.photos/seed/bgmi/600/400' },
  { id: 'g3', title: 'FreeFire', category: 'Gaming', description: 'Survival shooter game competition.', image: 'https://picsum.photos/seed/freefire/600/400' },
  { id: 'g4', title: 'Tekken 3', category: 'Gaming', description: 'Classic 1v1 fighting game tournament.', image: 'https://picsum.photos/seed/tekken/600/400' },

  // Civil
  { id: 'ci1', title: 'Popsicle Bridge', category: 'Civil', description: 'Build the strongest bridge using popsicles.', image: 'https://picsum.photos/seed/bridge/600/400' },
  { id: 'ci2', title: 'Tower-O-Mania', category: 'Civil', description: 'Construct the tallest stable tower.', image: 'https://picsum.photos/seed/tower/600/400' },

  // Electrical
  { id: 'e1', title: 'Circuitry', category: 'Electrical', description: 'Complex circuit design and debugging challenge.', image: 'https://picsum.photos/seed/circuit/600/400' },

  // Chemical
  { id: 'ch1', title: 'Chem-o-Car', category: 'Chemical', description: 'Design a car powered by a chemical reaction.', image: 'https://picsum.photos/seed/chemcar/600/400' },
  { id: 'ch2', title: 'Paper Presentation', category: 'Chemical', description: 'Present your research on chemical engineering topics.', image: 'https://picsum.photos/seed/paper/600/400' },

  // Robotics
  { id: 'r1', title: 'RoboRumble', category: 'Robotics', description: 'Battle of the bots in the death arena.', image: 'https://picsum.photos/seed/robo/600/400' },

  // Non-Tech
  { id: 'nt1', title: 'Project Expo', category: 'Non-Tech', description: 'Exhibition of final year innovative projects.', image: 'https://picsum.photos/seed/expo/600/400' },
  { id: 'nt2', title: 'Flame Free Flavour', category: 'Non-Tech', description: 'Cooking competition without using fire.', image: 'https://picsum.photos/seed/cook/600/400' },
  { id: 'nt3', title: 'Ludo / Snake & Ladder', category: 'Non-Tech', description: 'Classic board games tournament.', image: 'https://picsum.photos/seed/ludo/600/400' },
  { id: 'nt4', title: 'Treasure Hunt', category: 'Non-Tech', description: 'Solve clues to find the hidden treasure on campus.', image: 'https://picsum.photos/seed/treasure/600/400' },
  { id: 'nt5', title: 'Box Cricket', category: 'Non-Tech', description: 'Short format cricket tournament.', image: 'https://picsum.photos/seed/cricket/600/400' },
  { id: 'nt6', title: 'Kabaddi', category: 'Non-Tech', description: 'Traditional contact team sport.', image: 'https://picsum.photos/seed/kabaddi/600/400' },
  { id: 'nt7', title: 'Debate Competition', category: 'Non-Tech', description: 'Express your views on trending topics.', image: 'https://picsum.photos/seed/debate/600/400' },
  { id: 'nt8', title: '1 Minute Game', category: 'Non-Tech', description: 'Fun engaging tasks to complete in 60 seconds.', image: 'https://picsum.photos/seed/minute/600/400' },

  // Concert
  { id: 'mc1', title: 'Talent Show / Open Mic', category: 'Mini Concert', description: 'Showcase your singing, dancing, or poetry skills.', image: 'https://picsum.photos/seed/concert/600/400' },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  // New 2025 Images (Inferred from your upload)
  { id: 'new1', src: 'https://picsum.photos/seed/lamp/800/600', title: 'Inauguration Lamp Lighting', year: '2025', category: 'Cultural' },
  { id: 'new2', src: 'https://picsum.photos/seed/speech1/800/600', title: 'Keynote Speech', year: '2025', category: 'Technical' },
  { id: 'new3', src: 'https://picsum.photos/seed/cake/800/600', title: 'Celebration Cake Cutting', year: '2025', category: 'Cultural' },
  { id: 'new4', src: 'https://picsum.photos/seed/signing/800/600', title: 'Guest of Honor Signing', year: '2025', category: 'Cultural' },
  { id: 'new5', src: 'https://picsum.photos/seed/speech2/800/600', title: 'Faculty Address', year: '2025', category: 'Technical' },
  { id: 'new6', src: 'https://picsum.photos/seed/award/800/600', title: 'Award Distribution', year: '2025', category: 'Technical' },
  { id: 'new7', src: 'https://picsum.photos/seed/speech3/800/600', title: 'Leadership Address', year: '2025', category: 'Technical' },
  { id: 'new8', src: 'https://picsum.photos/seed/ribbon/800/600', title: 'Ribbon Cutting Ceremony', year: '2025', category: 'Cultural' },
  { id: 'new9', src: 'https://picsum.photos/seed/speech4/800/600', title: 'Vote of Thanks', year: '2025', category: 'Cultural' },

  // Existing Images (2024 & 2023)
  { id: '1', src: 'https://picsum.photos/seed/g1/800/600', title: 'Hackathon Winners', year: '2024', category: 'Technical' },
  { id: '2', src: 'https://picsum.photos/seed/g2/600/800', title: 'Robo War', year: '2024', category: 'Technical' },
  { id: '3', src: 'https://picsum.photos/seed/g3/800/600', title: 'Concert Night', year: '2024', category: 'Cultural' },
  { id: '4', src: 'https://picsum.photos/seed/g4/800/800', title: 'Valorant Match', year: '2024', category: 'Gaming' },
  { id: '5', src: 'https://picsum.photos/seed/g5/800/600', title: 'Project Expo', year: '2023', category: 'Technical' },
  { id: '6', src: 'https://picsum.photos/seed/g6/600/800', title: 'Dance Performance', year: '2023', category: 'Cultural' },
  { id: '7', src: 'https://picsum.photos/seed/g7/800/600', title: 'Workshop Session', year: '2024', category: 'Workshops' },
  { id: '8', src: 'https://picsum.photos/seed/g8/800/600', title: 'Award Ceremony', year: '2023', category: 'Cultural' },
  { id: '9', src: 'https://picsum.photos/seed/g9/600/800', title: 'Crowd Cheering', year: '2024', category: 'Crowd' },
  { id: '10', src: 'https://picsum.photos/seed/g10/800/600', title: 'Drone Flying', year: '2023', category: 'Technical' },
  { id: '11', src: 'https://picsum.photos/seed/g11/800/600', title: 'Food Stalls', year: '2024', category: 'Crowd' },
  { id: '12', src: 'https://picsum.photos/seed/g12/600/800', title: 'VR Experience', year: '2024', category: 'Technical' },
  { id: '13', src: 'https://picsum.photos/seed/g13/800/600', title: 'Gaming Zone', year: '2023', category: 'Gaming' },
  { id: '14', src: 'https://picsum.photos/seed/g14/800/800', title: 'Treasure Hunt', year: '2024', category: 'Crowd' },
  { id: '15', src: 'https://picsum.photos/seed/g15/800/600', title: 'Guest Speaker', year: '2023', category: 'Workshops' },
  { id: '16', src: 'https://picsum.photos/seed/g16/600/800', title: 'Fashion Show', year: '2023', category: 'Cultural' },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Rajesh Kumar', role: 'Marketing Head', company: 'TechSolutions Inc.', quote: 'Sponsoring AAYAM gave us incredible visibility among engineering talent in Surat. Highly recommended!', image: 'https://picsum.photos/seed/face1/100/100' },
  { id: '2', name: 'Anita Desai', role: 'HR Director', company: 'Innovate Hub', quote: 'The event was well organized and the footfall exceeded our expectations. Great for recruitment.', image: 'https://picsum.photos/seed/face2/100/100' },
  { id: '3', name: 'Vikram Singh', role: 'Founder', company: 'EduTech Pro', quote: 'A fantastic platform to connect with the youth. The team was professional and supportive throughout.', image: 'https://picsum.photos/seed/face3/100/100' },
];

export const FAQS: FaqItem[] = [
  // General
  { id: 'gen1', category: 'General', question: 'What is AAYAM?', answer: 'AAYAM is the annual national-level technical festival organized by the Faculty of Engineering, Bhagwan Mahavir University. It features technical competitions, workshops, and cultural events.' },
  { id: 'gen2', category: 'General', question: 'When and where is AAYAM 2026?', answer: 'AAYAM 2026 will be held on March 12th and 13th, 2026 at the BMEF Campus, VIP Road, Vesu, Surat.' },
  { id: 'gen3', category: 'General', question: 'Who can attend?', answer: 'The festival is open to students from all colleges and universities across India. Some events are also open to school students.' },
  { id: 'gen4', category: 'General', question: 'Is registration required?', answer: 'Yes, registration is mandatory for participating in events. Spectators may also need to register for entry passes.' },
  { id: 'gen5', category: 'General', question: 'What events are included?', answer: 'The fest includes 20+ events across categories like Computer/IT, Robotics, Civil, Electrical, Gaming, and Non-Technical fun events.' },

  // Sponsorship
  { id: 'spon1', category: 'Sponsorship', question: 'What are the sponsorship packages?', answer: 'We offer Title, Co-Sponsor, Activity, Stall, and Banner sponsorship packages ranging from ₹3,000 to ₹1,50,000.' },
  { id: 'spon2', category: 'Sponsorship', question: 'What benefits do sponsors get?', answer: 'Benefits include brand visibility, stall space, social media promotion, stage time, and direct access to 1000+ students.' },
  { id: 'spon3', category: 'Sponsorship', question: 'How do I apply?', answer: 'You can apply via the "Sponsorship Packages" page on this website or contact our Sponsorship Head directly.' },
  { id: 'spon4', category: 'Sponsorship', question: 'What is the payment process?', answer: 'Payment can be made via Cheque, NEFT/RTGS, or UPI. 50% advance is required to confirm sponsorship.' },
  { id: 'spon5', category: 'Sponsorship', question: 'Can I customize my package?', answer: 'Yes, we are open to discussing custom deliverables to meet your marketing goals.' },
  { id: 'spon6', category: 'Sponsorship', question: 'When is the deadline to sponsor?', answer: 'The deadline for Title and Co-Sponsorship is February 25, 2026. Other categories are open until March 1st.' },

  // Events
  { id: 'evt1', category: 'Events', question: 'How do I participate in events?', answer: 'Visit the Events page, select your event, and follow the registration link (Offline registration is also available at the campus).' },
  { id: 'evt2', category: 'Events', question: 'Are events free?', answer: 'Some workshops are free. Most competitions have a nominal entry fee ranging from ₹50 to ₹200 per team/person.' },
  { id: 'evt3', category: 'Events', question: 'Can I participate in multiple events?', answer: 'Yes, as long as the event timings do not clash.' },
  { id: 'evt4', category: 'Events', question: 'What are the prizes?', answer: 'Winners receive cash prizes, trophies, and certificates. Total prize pool is over ₹2 Lakhs.' },

  // Logistics
  { id: 'log1', category: 'Logistics', question: 'Is parking available?', answer: 'Yes, designated parking areas are available for students and visitors within the campus.' },
  { id: 'log2', category: 'Logistics', question: 'Is food provided?', answer: 'Food stalls will be set up at the venue offering a variety of snacks and meals. Lunch is provided for VIP pass holders.' },
  { id: 'log3', category: 'Logistics', question: 'Is accommodation available?', answer: 'Accommodation can be arranged for out-of-station participants at nearby hostels upon prior request (chargeable).' },
  { id: 'log4', category: 'Logistics', question: 'What about COVID safety?', answer: 'We follow all government guidelines. Sanitization stations are available, and masks are recommended in crowded areas.' },
];

export const FACULTY_TEAM: TeamMember[] = [
  { id: 'f1', category: 'Faculty', name: 'Dr. Suresh Patel', role: 'Faculty Convener', image: 'https://picsum.photos/seed/faculty1/300/300', email: 'convener@aayam2026.com' },
  { id: 'f2', category: 'Faculty', name: 'Prof. Amit Shah', role: 'Co-Convener', image: 'https://picsum.photos/seed/faculty2/300/300', email: 'co.convener@aayam2026.com' },
  { id: 'f3', category: 'Faculty', name: 'Dr. Priya Mehta', role: 'Technical Advisor', image: 'https://picsum.photos/seed/faculty3/300/300', email: 'tech.advisor@aayam2026.com' },
];

export const SPONSORSHIP_TEAM_MEMBERS: TeamMember[] = [
  { id: 's1', category: 'Sponsorship', name: 'Priyansh Soni', role: 'Sponsorship Head', image: 'https://picsum.photos/seed/priyansh/300/300', phone: '+91 8732991144', email: 'sponsorship@aayam2026.com' },
  { id: 's2', category: 'Sponsorship', name: 'Rahul Verma', role: 'Corporate Relations', image: 'https://picsum.photos/seed/spon2/300/300', phone: '+91 9876543210', email: 'rahul@aayam2026.com' },
  { id: 's3', category: 'Sponsorship', name: 'Sneha Gupta', role: 'Marketing Lead', image: 'https://picsum.photos/seed/spon3/300/300', phone: '+91 9876543211', email: 'sneha@aayam2026.com' },
  { id: 's4', category: 'Sponsorship', name: 'Vikram Singh', role: 'Sponsorship Associate', image: 'https://picsum.photos/seed/spon4/300/300', phone: '+91 9876543212', email: 'vikram@aayam2026.com' },
];

export const ORGANIZING_COMMITTEE_MEMBERS: TeamMember[] = [
  { id: 'o1', category: 'Organizing', name: 'Riya Sharma', role: 'Event Head', image: 'https://picsum.photos/seed/org1/300/300' },
  { id: 'o2', category: 'Organizing', name: 'Arjun Patel', role: 'Logistics Head', image: 'https://picsum.photos/seed/org2/300/300' },
  { id: 'o3', category: 'Organizing', name: 'Neha Singh', role: 'Creative Head', image: 'https://picsum.photos/seed/org3/300/300' },
  { id: 'o4', category: 'Organizing', name: 'Aditya Kumar', role: 'Tech Lead', image: 'https://picsum.photos/seed/org4/300/300' },
  { id: 'o5', category: 'Organizing', name: 'Pooja Desai', role: 'Public Relations', image: 'https://picsum.photos/seed/org5/300/300' },
  { id: 'o6', category: 'Organizing', name: 'Karan Malhotra', role: 'Security Head', image: 'https://picsum.photos/seed/org6/300/300' },
];

// Re-export specific team member lists as generic TEAM if needed, but components will use specific lists.
export const TEAM: TeamMember[] = [...FACULTY_TEAM, ...SPONSORSHIP_TEAM_MEMBERS];

'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Cpu, 
  Database, 
  Layers, 
  Wrench, 
  ExternalLink,
  Sparkles,
  ChevronRight,
  Heart,
  Users,
  Rocket,
  Coffee,
  BarChart,
  Shield,
  Activity,
  Zap,
  FolderGit2,
  Star,
  Settings,
  Download,
  Eye,
  FileText,
  BadgeCheck,
  TrendingUp,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Trophy,
  CheckCircle,
  Target,
  Medal,
  Calendar,
  Moon,
  Sun,
  GitBranch,
  User,
  BookOpen,
  Clock,
  AwardIcon,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ========== NAVIGATION CONFIGURATION ==========

const navItems = [
  { label: 'About', targetId: 'about' },
  { label: 'Skills', targetId: 'skills' },
  { label: 'Experience', targetId: 'experience' },
  { label: 'Projects', targetId: 'projects' },
  { label: 'Achievements', targetId: 'achievements' },
  { label: 'Certifications', targetId: 'certifications' },
  { label: 'Contact', targetId: 'contact' }
];

// ========== GLOBAL HELPER FUNCTIONS ==========

const scrollToSection = (id) => {
  const element = document.getElementById(id);

  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// ========== HEADER COMPONENT ==========

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'certifications', 'contact'];
      const spyThreshold = 95; // Fixed header is 80px, threshold 95px provides a natural transition point
      
      // Bottom detection to highlight the last section if scrolled to the absolute end
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      
      if (isAtBottom) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }
      
      let active = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= spyThreshold) {
            active = section;
          }
        }
      }
      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScrollSpy);
    // Run once on load to set initial active section
    handleScrollSpy();
    
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0F0A1F]/95 backdrop-blur-md border-b border-slate-200/30 dark:border-purple-900/30 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={scrollToTop}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">👩‍💻</span>
          </div>
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
            Portfolio
          </span>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navItems.map((item) => (
            <button
              key={item.targetId}
              onClick={() => handleNavClick(item.targetId)}
              className={`text-sm font-medium transition-colors hover:text-[#A855F7] cursor-pointer ${
                activeSection === item.targetId
                  ? 'text-[#A855F7] font-semibold'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="w-px h-5 dark:bg-purple-800/30 bg-slate-200" />
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:dark:bg-purple-900/30 hover:bg-slate-100 transition-colors dark:text-slate-400 text-slate-600 hover:text-[#A855F7]"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <motion.button 
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white rounded-lg hover:shadow-lg transition-all text-xs md:text-sm font-medium shadow-md cursor-pointer"
          >
            Let's Talk
          </motion.button>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:dark:bg-purple-900/30 hover:bg-slate-100 transition-colors dark:text-slate-400 text-slate-600"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <button 
            className="p-2 dark:text-slate-300 text-slate-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="sr-only">Toggle Menu</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#0F0A1F] border-b border-slate-200 dark:border-purple-900/30 px-6 py-4 flex flex-col gap-3 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            {navItems.map((item) => (
              <button
                key={item.targetId}
                onClick={() => {
                  console.log("Clicked:", item.targetId);
                  handleNavClick(item.targetId);
                }}
                className={`text-left text-sm font-medium py-2 px-3 rounded-lg transition-colors hover:bg-slate-100 hover:dark:bg-purple-900/30 cursor-pointer ${
                  activeSection === item.targetId
                    ? 'bg-purple-50 dark:bg-purple-900/20 text-[#A855F7] font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setMobileOpen(false);
                scrollToSection('contact');
              }}
              className="text-left text-sm font-medium py-2 px-3 rounded-lg bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white hover:shadow-lg transition-all cursor-pointer"
            >
              Let's Talk
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ========== DATA OBJECTS ==========

const resumeData = {
  sde: {
    id: 'sde',
    title: 'Software Development Engineer',
    description: 'Full-stack development with focus on scalable systems and clean code architecture.',
    skills: ['Java', 'Python', 'SQL', 'Data Structures', 'Algorithms', 'System Design'],
    projects: ['BDA CRM Dashboard', 'AcadEase Learning Platform'],
    certifications: ['Java Certification']
  },
  fullstack: {
    id: 'fullstack',
    title: 'Full Stack Developer',
    description: 'End-to-end web application development with modern frameworks and cloud technologies.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS'],
    projects: ['AcadEase Learning Platform', 'BDA CRM Dashboard'],
    certifications: ['MERN Stack Certification']
  },
  dataanalyst: {
    id: 'dataanalyst',
    title: 'Data Analyst',
    description: 'Data-driven decision making through analytics, visualization, and machine learning.',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Tableau', 'Power BI'],
    projects: ['Area Safety Analysis', 'Startup Funding Analysis'],
    certifications: ['Data Analytics Certification', 'Machine Learning Specialization']
  },
  aiml: {
    id: 'aiml',
    title: 'AI/ML Engineer',
    description: 'Building intelligent systems using machine learning, deep learning, and computer vision.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'NLP', 'Computer Vision'],
    projects: ['GestureX - AI Touchless Control', 'Area Safety Analysis'],
    certifications: ['AI/ML Certification', 'Deep Learning Specialization']
  }
};

// Combined project data - GitHub style without images
const projectData = [
  {
    id: 1,
    title: 'GestureX - AI Touchless Control',
    description: 'Real-time gesture recognition system for touchless mouse and presentation control using computer vision.',
    category: 'AI/ML',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    github: 'https://github.com/SnehaMadhuri11/GestureX',
    /*liveDemo: 'https://gesturex-demo.vercel.app',*/
    status: 'Completed',
    stars: 12,
    forks: 3,
    impact: '100% touchless interaction'
  },
  {
    id: 2,
    title: 'BDA CRM Dashboard',
    description: 'MERN-based CRM platform with lead management, analytics dashboards, and real-time data visualization.',
    category: 'Full Stack',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind'],
    github: 'https://github.com/SnehaMadhuri11/BDA-CRM-System',
    /*liveDemo: 'https://bda-crm-demo.vercel.app',*/
    status: 'Deployed',
    stars: 8,
    forks: 2,
    impact: '40% increase in conversions'
  },
  {
    id: 3,
    title: 'AcadEase Learning Platform',
    description: 'Full-stack learning platform with AI study assistance, course management, and internship portal.',
    category: 'Full Stack',
    techStack: ['React', 'Node.js', 'Express', 'SQLite', 'OpenAI API'],
    github: 'https://github.com/SnehaMadhuri11/finalAcadEase',
    /*liveDemo: 'https://acadease-demo.vercel.app',*/
    status: 'Active',
    stars: 15,
    forks: 5,
    impact: '10,000+ active users'
  },
  {
    id: 4,
    title: 'Area Safety Analysis',
    description: 'ML model predicting area safety using EDA, classification techniques, and geographic data analysis.',
    category: 'Data Analytics',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    github: 'https://github.com/Sneha11-DataAnalytics/area-safety-analysis',
    /*liveDemo: 'https://safety-analysis-demo.vercel.app',*/
    status: 'Completed',
    stars: 6,
    forks: 1,
    impact: '92% accuracy'
  },
  {
    id: 5,
    title: 'Startup Funding Analysis',
    description: 'EDA on 3000+ startup records to identify investment trends, patterns, and success factors.',
    category: 'Data Analytics',
    techStack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/Sneha11-DataAnalytics/startup-funding-analysis',
   /* liveDemo: 'https://startup-analysis-demo.vercel.app',*/
    status: 'Completed',
    stars: 4,
    forks: 1,
    impact: '3 key patterns identified'
  }
];

// Certification data with images - Updated with actual file paths
const certificationData = [
  {
  id: 1,
  name: 'Deep Learning Foundations for AI and Gen AI',
  issuer: 'Udemy',
  date: '2025',
  category: 'Artificial Intelligence',
  credentialId: 'UC-873255dc-4811-411c-bceb-a3c9abe56337',
  image: '/certificates/deep-learning.jpg',
  pdf: '/certificates/deep-learning.pdf',
  certificateUrl: 'https://ude.my/UC-873255dc-4811-411c-bceb-a3c9abe56337',
  skills: [
    'Deep Learning',
    'Artificial Intelligence',
    'Generative AI',
    'Neural Networks',
    'Machine Learning'
  ],

  },
  {
    id: 2,
  name: 'Artificial Intelligence Fundamentals',
  issuer: 'IBM SkillsBuild',
  date: '2025',
  category: 'Artificial Intelligence',
  credentialId: '50dd276d-776a-4549-875e-0a9245e4acdb',
  image: '/certificates/ai-fundamentals-ibm.jpg',
  pdf: '/certificates/ai-fundamentals-ibm.pdf',
  certificateUrl: 'https://www.credly.com/badges/50dd276d-776a-4549-875e-0a9245e4acdb',
  skills: [
    'Artificial Intelligence',
    'Machine Learning',
    'AI Concepts',
    'Problem Solving',
    'Digital Transformation'
  ],
  },
  {
     id: 3,
  name: 'ServiceNow Virtual Internship Program',
  issuer: 'AICTE, ServiceNow & SmartBridge',
  date: '2026',
  category: 'Cloud & Enterprise Technology',
  credentialId: 'SNU2015535',
  image: '/certificates/servicenow-virtual-internship.jpg',
  pdf: '/certificates/servicenow-virtual-internship.pdf',
  skills: [
    'ServiceNow Administration',
    'Agentic AI',
    'Flow Designer',
    'Automated Test Framework (ATF)',
    'Reports & Dashboards',
    'CSA Exam Preparation'
  ],
  },
  {
    id: 4,
  name: 'Data Analytics Job Simulation',
  issuer: 'Deloitte (Issued by Forage)',
  date: '2026',
  category: 'Data Analytics',
  credentialId: 'eqsrtSDqNDovMM3wp',
  image: '/certificates/deloitte-data-analytics.jpg',
  pdf: '/certificates/deloitte-data-analytics.pdf',
  skills: [
    'Data Analysis',
    'Data Analytics',
    'Forensic Technology',
    'Business Insights',
    'Data Interpretation'
  ],
  },
  {
  id: 5,
  name: 'GenAI Powered Data Analytics Job Simulation',
  issuer: 'Tata Group (Issued by Forage)',
  date: '2026',
  category: 'Data Analytics & AI',
  credentialId: '6bW5S2mpqdL7doLWb',
  verificationCode: '698af5ee743689ba8240cde9',
  image: '/certificates/tata-genai-data-analytics.jpg',
  pdf: '/certificates/tata-genai-data-analytics.pdf',
  skills: [
    'Exploratory Data Analysis',
    'Risk Profiling',
    'Predictive Analytics',
    'Generative AI',
    'Data Storytelling',
    'Business Reporting',
    'AI-Driven Decision Making',
    'Collections Strategy'
  ],
},
{
  id: 6,
  name: 'Machine Learning I',
  issuer: 'Columbia+',
  date: '2025',
  category: 'Machine Learning',
  credentialId: '161331614',
  image: '/certificates/columbia-machine-learning-1.jpg',
  pdf: '/certificates/columbia-machine-learning-1.pdf',
  skills: [
    'Machine Learning',
    'Supervised Learning',
    'Model Training',
    'Data Analysis',
    'Predictive Analytics'
  ],
},


];

const achievementsData = [
  {
    id: 1,
    title: '1st Prize Champion',
    event: 'AVISHKAR 2026 National Level Hackathon',
    date: '2026',
    category: 'Hackathon',
    icon: Trophy,
    description: 'Won first prize for innovative AI/ML solution'
  },
  {
    id: 2,
    title: 'Best Performer',
    event: 'Java Developer Internship - Elevate Labs',
    date: '2025',
    category: 'Internship',
    icon: Star,
    description: 'Recognized as best performer during internship'
  },
  {
    id: 3,
    title: 'Hackathon Participant',
    event: 'Multiple National Level Hackathons',
    date: '2024-2026',
    category: 'Hackathon',
    icon: Target,
    description: 'Active participant in various coding competitions'
  },
  {
    id: 4,
    title: 'Technical Workshop Leader',
    event: 'Data Science & AI Workshops',
    date: '2024-2025',
    category: 'Leadership',
    icon: Users,
    description: 'Led workshops on machine learning and data science'
  },
  {
    id: 5,
    title: 'Academic Excellence',
    event: 'Consistent 9.3+ CGPA',
    date: '2023-2026',
    category: 'Academic',
    icon: Medal,
    description: 'Maintained outstanding academic performance'
  }
];

const servicesData = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Building responsive, modern web applications with React and Tailwind CSS.',
    icon: Code,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    title: 'Full Stack Development',
    description: 'End-to-end solutions using MERN stack with REST APIs and database design.',
    icon: Layers,
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 3,
    title: 'AI/ML Solutions',
    description: 'Implementing machine learning models for computer vision and predictive analytics.',
    icon: Cpu,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    title: 'Data Analytics',
    description: 'Data analysis, visualization, and insights generation using Python and SQL.',
    icon: BarChart,
    color: 'from-purple-600 to-pink-600'
  }
];

/*const testimonialsData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Engineering Manager, Tech Corp',
    content: 'Snehamadhuri demonstrated exceptional problem-solving skills and technical expertise during her internship. Her work on the CRM dashboard was outstanding.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Lead Developer, SmartBridge',
    content: 'Her ability to quickly learn new technologies and deliver high-quality code made her an invaluable asset to our team.',
  }
];
*/
const faqData = [
  {
    id: 1,
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in React, Python, Java, SQL, and full-stack development with the MERN stack. I also have expertise in AI/ML and data analytics.'
  },
  {
    id: 2,
    question: 'What roles are you interested in?',
    answer: 'I am interested in SDE, Full Stack Developer, Data Analyst, and AI/ML Engineer roles. I am open to both internships and full-time positions.'
  },
  {
    id: 3,
    question: 'Are you open to remote opportunities?',
    answer: 'Yes, I am open to remote, hybrid, and on-site opportunities. I am flexible and can adapt to different work environments.'
  },
  {
    id: 4,
    question: 'How can I contact you for opportunities?',
    answer: 'You can reach me via email at vakkalagaddasnehamadhuri77@gmail.com or connect with me on LinkedIn.'
  }
];

// ========== ANIMATION VARIANTS ==========

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

// ========== COMMON COMPONENTS ==========

const AnimatedSection = ({ children, className = '', id = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ========== SECTION HEADER COMPONENT ==========

const SectionHeader = ({ icon: Icon, title, subtitle, className = '' }) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full dark:bg-purple-900/20 bg-purple-100 dark:border border-purple-800/30 mb-4">
        <Icon className="w-5 h-5 text-[#A855F7]" />
        <span className="text-sm font-medium dark:text-slate-300 text-slate-600">Section</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold dark:text-[#F8FAFC] text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="dark:text-slate-400 text-slate-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-gradient-to-r from-[#A855F7] to-[#EC4899] mx-auto mt-5 rounded-full" />
    </div>
  );
};

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div 
        className="h-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-[#A855F7] text-white rounded-full shadow-lg hover:bg-[#EC4899] transition-colors z-50"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ========== ABOUT SECTION ==========

const About = () => {
  return (
    <AnimatedSection className="py-12 md:py-16" id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader 
          icon={User}
          title="About Me"
          subtitle="Get to know me better - my background, interests, and what drives me"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - About Text */}
          <div className="lg:col-span-3 space-y-5">
            <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-6 md:p-8 shadow-lg dark:border border-purple-900/30">
              <p className="dark:text-slate-300 text-slate-700 text-base md:text-lg leading-relaxed">
                I'm a passionate <span className="text-[#A855F7] font-semibold">AI/ML Engineer</span> and{' '}
                <span className="text-[#EC4899] font-semibold">Full Stack Developer</span> with a strong foundation
                in building intelligent systems and scalable web applications.
              </p>
              <p className="dark:text-slate-400 text-slate-600 text-base leading-relaxed mt-4">
                Currently pursuing my B.Tech in Computer Science with specialization in AI & ML,
                I've developed expertise in computer vision, data analytics, and modern web technologies.
                I love solving complex problems and creating solutions that make a real impact.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-4 dark:border-t border-purple-900/30">
                <div className="flex items-center gap-2 dark:text-slate-300 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-[#A855F7]" />
                  <span className="text-sm">Problem Solver</span>
                </div>
                <div className="flex items-center gap-2 dark:text-slate-300 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-[#A855F7]" />
                  <span className="text-sm">Team Player</span>
                </div>
                <div className="flex items-center gap-2 dark:text-slate-300 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-[#A855F7]" />
                  <span className="text-sm">Quick Learner</span>
                </div>
                <div className="flex items-center gap-2 dark:text-slate-300 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-[#A855F7]" />
                  <span className="text-sm">Innovative Thinker</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 md:gap-4 h-full">
              <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-4 sm:p-5 text-center shadow-lg dark:border border-purple-900/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all flex flex-col items-center justify-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#A855F7]">10+</div>
                <div className="text-xs sm:text-sm dark:text-slate-400 text-slate-500 mt-1">Technologies</div>
                <Target className="w-5 h-5 text-[#EC4899] mt-2 opacity-60" />
              </div>
              <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-4 sm:p-5 text-center shadow-lg dark:border border-purple-900/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all flex flex-col items-center justify-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#EC4899]">5+</div>
                <div className="text-xs sm:text-sm dark:text-slate-400 text-slate-500 mt-1">Projects Completed</div>
                <FolderGit2 className="w-5 h-5 text-[#EC4899] mt-2 opacity-60" />
              </div>
              <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-4 sm:p-5 text-center shadow-lg dark:border border-purple-900/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all flex flex-col items-center justify-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#A855F7]">4+</div>
                <div className="text-xs sm:text-sm dark:text-slate-400 text-slate-500 mt-1">Certifications</div>
                <AwardIcon className="w-5 h-5 text-[#A855F7] mt-2 opacity-60" />
              </div>
              <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-4 sm:p-5 text-center shadow-lg dark:border border-purple-900/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all flex flex-col items-center justify-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#EC4899]">5+</div>
                <div className="text-xs sm:text-sm dark:text-slate-400 text-slate-500 mt-1">Hackathons</div>
                <Target className="w-5 h-5 text-[#EC4899] mt-2 opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// ========== SECTION COMPONENTS ==========

const RoleSwitcher = () => {
  const [selectedRole, setSelectedRole] = useState('sde');
  const roles = [
    { id: 'sde', label: 'SDE', icon: Code },
    { id: 'fullstack', label: 'Full Stack', icon: Layers },
    { id: 'dataanalyst', label: 'Data Analyst', icon: BarChart },
    { id: 'aiml', label: 'AI/ML', icon: Cpu }
  ];

  return (
    <AnimatedSection className="mb-16 md:mb-24">
      <motion.div 
        className="dark:bg-[#1A1333] bg-white rounded-2xl p-8 shadow-lg dark:border border-purple-900/30"
        whileHover={{ boxShadow: "0 20px 60px rgba(168, 85, 247, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-5 h-5 text-[#A855F7]" />
          <h2 className="text-xl font-bold dark:text-[#F8FAFC] text-slate-900">Professional Profile</h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {roles.map((role) => (
            <motion.button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                selectedRole === role.id
                  ? 'bg-[#A855F7] text-white shadow-md'
                  : 'dark:bg-purple-900/30 bg-slate-100 dark:text-slate-300 text-slate-600 hover:dark:bg-purple-800/30 hover:bg-slate-200'
              }`}
            >
              <role.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{role.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="dark:bg-purple-900/20 bg-purple-50 rounded-xl p-6 dark:border border-purple-800/30"
          >
            <h3 className="text-lg font-bold dark:text-[#F8FAFC] text-slate-900 mb-2">
              {resumeData[selectedRole].title}
            </h3>
            <p className="dark:text-slate-300 text-slate-600 text-sm mb-4">{resumeData[selectedRole].description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData[selectedRole].skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="px-2 py-1 dark:bg-purple-900/30 bg-purple-100 dark:text-slate-300 text-slate-700 text-xs rounded-md dark:border border-purple-800/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Projects</h4>
                <div className="space-y-1">
                  {resumeData[selectedRole].projects.map((project) => (
                    <span key={project} className="block text-sm dark:text-slate-300 text-slate-600">• {project}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Certifications</h4>
                <div className="space-y-1">
                  {resumeData[selectedRole].certifications.map((cert) => (
                    <span key={cert} className="block text-sm dark:text-slate-300 text-slate-600">• {cert}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatedSection>
  );
};

const ResumeCenter = () => {
  const [selectedResume, setSelectedResume] = useState('sde');
  
  const resumes = [
    { id: 'sde', title: 'SDE Resume', description: 'Software Development Engineer', icon: Code },
    { id: 'fullstack', title: 'Full Stack Resume', description: 'Full Stack Developer', icon: Layers },
    { id: 'dataanalyst', title: 'Data Analyst Resume', description: 'Data Analyst', icon: BarChart },
    { id: 'aiml', title: 'AI/ML Resume', description: 'AI/ML Engineer', icon: Cpu }
  ];

  // Resume file paths - Update these with actual file paths
  const resumeFiles = {
    sde: '/resumes/SDE_Resume.pdf',
    fullstack: '/resumes/FullStack_Resume.pdf',
    dataanalyst: '/resumes/DataAnalyst_Resume.pdf',
    aiml: '/resumes/AIML_Resume.pdf'
  };

  const handleViewResume = (id) => {
    window.open(resumeFiles[id], '_blank');
  };

  const handleDownloadResume = (id) => {
    const link = document.createElement('a');
    link.href = resumeFiles[id];
    link.download = `${id}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllResumes = () => {
    Object.keys(resumeFiles).forEach((id) => {
      const link = document.createElement('a');
      link.href = resumeFiles[id];
      link.download = `${id}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <AnimatedSection className="mb-16 md:mb-24" id="resume">
      <motion.div 
        className="dark:bg-[#1A1333] bg-white rounded-2xl p-8 shadow-lg dark:border border-purple-900/30"
        whileHover={{ boxShadow: "0 20px 60px rgba(168, 85, 247, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#A855F7]" />
            <h2 className="text-xl font-bold dark:text-[#F8FAFC] text-slate-900">Resume Center</h2>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
              className="px-3 py-2 dark:bg-purple-900/30 bg-slate-100 dark:border border-purple-800/30 rounded-lg text-sm dark:text-[#F8FAFC] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title}
                </option>
              ))}
            </select>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadAllResumes}
              className="px-4 py-2 bg-[#A855F7] text-white text-sm font-medium rounded-lg hover:bg-[#EC4899] transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download All
            </motion.button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {resumes.map((resume) => (
            <motion.div
              key={resume.id}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className={`dark:bg-purple-900/20 bg-purple-50 rounded-xl p-4 border-2 transition-all cursor-pointer ${
                selectedResume === resume.id
                  ? 'border-[#A855F7] shadow-md shadow-[#A855F7]/20'
                  : 'dark:border-purple-800/30 border-slate-200 hover:dark:border-[#A855F7]/50 hover:border-[#A855F7]/50'
              }`}
              onClick={() => setSelectedResume(resume.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  selectedResume === resume.id ? 'bg-[#A855F7]/20' : 'dark:bg-purple-900/30 bg-slate-100'
                }`}>
                  <resume.icon className={`w-4 h-4 ${
                    selectedResume === resume.id ? 'text-[#A855F7]' : 'dark:text-slate-400 text-slate-500'
                  }`} />
                </div>
                <h3 className="font-bold dark:text-[#F8FAFC] text-slate-900 text-sm">{resume.title}</h3>
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-500 mb-3">{resume.description}</p>
              <div className="flex gap-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleViewResume(resume.id)}
                  className="flex-1 px-3 py-1.5 bg-[#A855F7] text-white text-xs rounded-lg hover:bg-[#EC4899] transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-3 h-3" /> View
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownloadResume(resume.id)}
                  className="flex-1 px-3 py-1.5 dark:bg-purple-900/30 bg-slate-100 dark:text-slate-300 text-slate-600 text-xs rounded-lg hover:dark:bg-purple-800/30 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Download className="w-3 h-3" /> Download
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
};

// ========== ANIMATED STATISTICS SECTION ==========

const AnimatedCounter = ({ target, label, icon: Icon, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [inView, target, duration]);

  return (
    <motion.div 
      ref={ref}
      className="text-center dark:bg-purple-900/20 bg-purple-50 rounded-lg p-4 dark:border border-purple-800/30"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="w-6 h-6 text-[#A855F7] mx-auto mb-2" />
      <div className="text-3xl font-bold text-[#A855F7]">
        {count}+
      </div>
      <div className="text-xs dark:text-slate-400 text-slate-500 mt-1">{label}</div>
    </motion.div>
  );
};

const Statistics = () => {
  const stats = [
    { label: 'Projects Completed', value: 5, icon: Code },
    { label: 'Certifications Earned', value: 4, icon: BadgeCheck },
    { label: 'Technologies Learned', value: 10, icon: Cpu },
    { label: 'GitHub Repositories', value: 12, icon: FolderGit2 },
    { label: 'Achievements Won', value: 2, icon: Trophy },
    { label: 'Hackathons Participated', value: 5, icon: Target }
  ];

  return (
    <AnimatedSection className="mb-16 md:mb-24">
      <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-8 shadow-lg dark:border border-purple-900/30">
        <SectionHeader 
          icon={TrendingUp}
          title="Statistics"
          subtitle="A snapshot of my journey and accomplishments"
        />

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <AnimatedCounter 
                target={stat.value} 
                label={stat.label} 
                icon={stat.icon}
                duration={2000}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

// ========== PROJECTS SECTION ==========

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web Development', 'Full Stack', 'AI/ML', 'Data Analytics'];
  
  const filteredProjects = filter === 'All' 
    ? projectData 
    : projectData.filter(p => p.category === filter);

  return (
    <AnimatedSection className="mb-16 md:mb-24" id="projects">
      <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-8 shadow-lg dark:border border-purple-900/30">
        <SectionHeader 
          icon={FolderGit2}
          title="Projects"
          subtitle="A showcase of my work and technical capabilities"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                filter === cat
                  ? 'bg-[#A855F7] text-white shadow-md'
                  : 'dark:bg-purple-900/30 bg-slate-100 dark:text-slate-300 text-slate-600 hover:dark:bg-purple-800/30 hover:bg-slate-200'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="dark:bg-purple-900/20 bg-purple-50 rounded-xl p-6 dark:border border-purple-800/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all shadow-sm hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-[#A855F7]" />
                  <h3 className="font-bold dark:text-[#F8FAFC] text-slate-900 text-base">{project.title}</h3>
                </div>
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${
                  project.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 dark:border border-emerald-500/30' :
                  project.status === 'Active' ? 'bg-blue-500/20 text-blue-400 dark:border border-blue-500/30' :
                  'bg-yellow-500/20 text-yellow-400 dark:border border-yellow-500/30'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-sm dark:text-slate-300 text-slate-600 mb-3 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 dark:bg-purple-900/30 bg-purple-100 dark:text-slate-300 text-slate-700 text-xs rounded dark:border border-purple-800/30">
                    {tech}
                  </span>
                ))}
              </div>

              {project.impact && (
                <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs px-3 py-1 rounded mb-3 inline-block dark:border border-emerald-500/20">
                  🚀 {project.impact}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm dark:text-slate-400 text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> {project.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch className="w-4 h-4" /> {project.forks}
                </span>
                <span className="text-xs px-3 py-1 dark:bg-purple-900/30 bg-purple-100 rounded dark:border border-purple-800/30">
                  {project.category}
                </span>
              </div>

              <div className="flex gap-3">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 dark:bg-purple-900/30 bg-slate-100 dark:text-[#F8FAFC] text-slate-700 text-sm rounded-lg hover:dark:bg-purple-800/30 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <FolderGit2 className="w-4 h-4" /> View Code
                </a>
                {project.liveDemo && (
                  <a 
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-[#A855F7] text-white text-sm rounded-lg hover:bg-[#EC4899] transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

// ========== CERTIFICATIONS SECTION - FIXED ==========

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(certificationData.map(c => c.category))];
  
  const filteredCerts = selectedCategory === 'All'
    ? certificationData
    : certificationData.filter(c => c.category === selectedCategory);

  // FIX: View certificate - Open in new tab
  const handleViewCertificate = (cert) => {
    // Try to open PDF first, if not available open image
    if (cert.pdf) {
      window.open(cert.pdf, '_blank');
    } else if (cert.image) {
      window.open(cert.image, '_blank');
    } else {
      alert(`Certificate: ${cert.name}\nIssued by: ${cert.issuer}\nCredential ID: ${cert.credentialId}`);
    }
  };

  // FIX: Download certificate - Direct download
  const handleDownloadCertificate = (cert) => {
    const fileUrl = cert.pdf || cert.image;
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      const fileName = cert.name.toLowerCase().replace(/\s+/g, '-') + '.pdf';
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Download not available for this certificate');
    }
  };

  return (
    <AnimatedSection className="mb-16 md:mb-24" id="certifications">
      <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-8 shadow-lg dark:border border-purple-900/30">
        <SectionHeader 
          icon={BadgeCheck}
          title="Certifications"
          subtitle="Professional certifications and credentials I've earned"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#A855F7] text-white'
                  : 'dark:bg-purple-900/30 bg-slate-100 dark:text-slate-300 text-slate-600 hover:dark:bg-purple-800/30 hover:bg-slate-200'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="dark:bg-purple-900/20 bg-purple-50 rounded-xl overflow-hidden dark:border border-purple-800/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all shadow-sm hover:shadow-lg flex flex-col"
            >
              {/* Certificate Image */}
              <div className="relative h-44 dark:bg-purple-900/30 bg-slate-100 overflow-hidden cursor-pointer" onClick={() => handleViewCertificate(cert)}>
                <img 
                  src={cert.image} 
                  alt={cert.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#A855F7]/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                    {cert.category}
                  </span>
                  <span className="px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                    {cert.date}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-[#A855F7]/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                    Click to View
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold dark:text-[#F8FAFC] text-slate-900 text-base mb-1 line-clamp-1">{cert.name}</h3>
                <p className="text-sm dark:text-slate-400 text-slate-500">{cert.issuer}</p>
                
                {/* Skills Learned */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2.5 py-1 dark:bg-purple-900/30 bg-purple-100 dark:text-slate-300 text-slate-700 text-xs rounded dark:border border-purple-800/30">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2.5 py-1 dark:bg-purple-900/30 bg-purple-100 dark:text-slate-300 text-slate-700 text-xs rounded dark:border border-purple-800/30">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewCertificate(cert)}
                    className="flex-1 px-4 py-2 bg-[#A855F7] text-white text-sm rounded-lg hover:bg-[#EC4899] transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" /> View
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownloadCertificate(cert)}
                    className="px-4 py-2 dark:bg-purple-900/30 bg-slate-100 dark:text-slate-300 text-slate-600 text-sm rounded-lg hover:dark:bg-purple-800/30 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

const Achievements = () => {
  return (
    <AnimatedSection className="mb-16 md:mb-24" id="achievements">
      <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-8 shadow-lg dark:border border-purple-900/30">
        <SectionHeader 
          icon={Trophy}
          title="Achievements"
          subtitle="Recognitions and milestones from my journey"
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="dark:bg-purple-900/20 bg-purple-50 rounded-xl p-5 dark:border border-purple-800/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all shadow-sm hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#A855F7]/10 rounded-lg dark:border border-[#A855F7]/20">
                  <achievement.icon className="w-5 h-5 text-[#A855F7]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold dark:text-[#F8FAFC] text-slate-900 text-base">{achievement.title}</h3>
                  <p className="text-sm dark:text-slate-400 text-slate-500 mt-0.5">{achievement.event}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm dark:text-slate-500 text-slate-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {achievement.date}
                    </span>
                    <span className="text-xs px-3 py-1 bg-[#A855F7]/10 text-[#A855F7] rounded dark:border border-[#A855F7]/20">
                      {achievement.category}
                    </span>
                  </div>
                  <p className="text-sm dark:text-slate-400 text-slate-500 mt-2">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

const Services = () => {
  const serviceColors = [
    'from-purple-500 to-pink-500',
    'from-purple-600 to-pink-600',
    'from-purple-500 to-pink-500',
    'from-purple-600 to-pink-600'
  ];

  return (
    <AnimatedSection className="mb-16 md:mb-24">
      <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-8 shadow-lg dark:border border-purple-900/30">
        <SectionHeader 
          icon={Wrench}
          title="Services"
          subtitle="What I can do for you"
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className={`bg-gradient-to-br ${serviceColors[index]} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}
            >
              <service.icon className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-sm opacity-90">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

/*const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedSection className="mb-16 md:mb-24">
      <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-8 shadow-lg dark:border border-purple-900/30">
        <SectionHeader 
          icon={MessageCircle}
          title="Testimonials"
          subtitle="What others say about working with me"
        />

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="dark:bg-purple-900/20 bg-purple-50 rounded-xl p-6 dark:border border-purple-800/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#A855F7]/20 flex items-center justify-center dark:border border-[#A855F7]/30">
                  <Users className="w-6 h-6 text-[#A855F7]" />
                </div>
                <div>
                  <h4 className="font-bold dark:text-[#F8FAFC] text-slate-900 text-lg">
                    {testimonialsData[currentIndex].name}
                  </h4>
                  <p className="text-sm dark:text-slate-400 text-slate-500">
                    {testimonialsData[currentIndex].role}
                  </p>
                </div>
              </div>
              <p className="text-base dark:text-slate-300 text-slate-600 italic">
                "{testimonialsData[currentIndex].content}"
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-4">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#A855F7] w-4' : 'dark:bg-purple-800/50 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
*/
const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <AnimatedSection className="mb-16 md:mb-24">
      <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-8 shadow-lg dark:border border-purple-900/30">
        <SectionHeader 
          icon={HelpCircle}
          title="Frequently Asked Questions"
          subtitle="Common questions about my work and availability"
        />

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqData.map((item) => (
            <motion.div 
              key={item.id} 
              className="dark:border border-purple-800/30 rounded-xl overflow-hidden dark:bg-purple-900/20 bg-slate-50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.id * 0.1 }}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full px-5 py-4 flex items-center justify-between hover:dark:bg-purple-900/30 hover:bg-slate-100 transition-colors text-left"
              >
                <span className="font-medium dark:text-[#F8FAFC] text-slate-900 text-base">{item.question}</span>
                {expandedId === item.id ? (
                  <ChevronUp className="w-5 h-5 dark:text-slate-400 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 dark:text-slate-400 text-slate-500" />
                )}
              </button>
              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-4 dark:text-slate-300 text-slate-600 text-base dark:bg-purple-900/20 bg-slate-50"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const QuickAccessPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 hidden sm:block"
    >
      <div className="dark:bg-[#1A1333] bg-white backdrop-blur-md shadow-lg rounded-full px-5 py-2.5 flex items-center gap-2.5 text-sm dark:border border-purple-800/30">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => scrollToSection('resume')}
          className="px-3 py-1.5 bg-[#A855F7] text-white rounded-lg hover:bg-[#EC4899] transition-colors text-xs font-medium shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3 h-3" /> Resume
        </motion.button>
        <span className="w-px h-4 dark:bg-purple-800/30 bg-slate-200" />
        <a href="https://github.com/SnehaMadhuri11" target="_blank" rel="noopener noreferrer" className="dark:text-slate-400 text-slate-500 hover:text-[#A855F7] transition-colors">
          <FolderGit2 className="w-3.5 h-3.5" />
        </a>
        <a href="https://linkedin.com/in/sneha-madhuri-vakkalagadda-b1a932309" target="_blank" rel="noopener noreferrer" className="dark:text-slate-400 text-slate-500 hover:text-[#A855F7] transition-colors">
          <Users className="w-3.5 h-3.5" />
        </a>
        <span className="w-px h-4 dark:bg-purple-800/30 bg-slate-200" />
        <a href="mailto:vakkalagaddasnehamadhuri77@gmail.com" className="dark:text-slate-400 text-slate-500 hover:text-[#A855F7] transition-colors">
          <Mail className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
};

// ========== MAIN APP COMPONENT ==========

export default function App() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeEduTab, setActiveEduTab] = useState('B.Tech');

  useEffect(() => {
    setMounted(true);
  }, []);

  // ========== ORIGINAL DATA ==========
  
  const contactInfo = {
    phone: "+91 9849497234",
    location: "Vijayawada, India",
    email: "vakkalagaddasnehamadhuri77@gmail.com",
    linkedin: "https://www.linkedin.com/in/sneha-madhuri-vakkalagadda-b1a932309/",
    github: "https://github.com/SnehaMadhuri11"
  };

  const education = {
    "B.Tech": {
      degree: "B.Tech CSE (AI & ML)",
      institution: "Seshadri Rao Gudlavalleru Engineering College",
      timeline: "2023 – Present",
      grade: "CGPA: 9.3/10"
    },
    "Intermediate": {
      degree: "Intermediate (MPC)",
      institution: "Narayana Junior College, Vijayawada",
      timeline: "2021 – 2023",
      grade: "Percentage: 98%"
    },
    "10th Grade": {
      degree: "10th Grade",
      institution: "Swarna Bharathi School, Vijayawada",
      timeline: "2020 – 2021",
      grade: "GPA: 10/10"
    }
  };

  const skills = {
    programming: ["Python", "Java", "SQL", "JavaScript", "C"],
    webDev: ["React.js", "Node.js", "Express.js", "Spring Boot", "Tailwind CSS"],
    aiMl: ["Machine Learning", "OpenCV", "MediaPipe", "NumPy", "Pandas"],
    tools: ["MongoDB", "SQL", "GitHub", "Postman", "VS Code", "Jupyter"]
  };

  const internships = [
    {
      role: "Java Developer Intern",
      company: "Elevate Labs",
      timeline: "Sep 2025 – Nov 2025",
      type: "Virtual",
      desc: "Developed Java-based applications with Core Java and problem-solving skills.",
      award: "Best Performer"
    },
    {
      role: "MERN Stack Intern",
      company: "SmartBridge Educational Services",
      timeline: "May 2025 – Jul 2025",
      type: "Virtual",
      desc: "Built full-stack features and REST APIs. Integrated ML insights into dashboards."
    }
  ];

  return (
    <div className="min-h-screen dark:bg-[#0F0A1F] bg-slate-50 dark:text-[#F8FAFC] text-slate-900 font-sans antialiased relative transition-colors duration-300">
      
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      
      {/* Decorative Floating Elements */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 bg-[#A855F7]/5 rounded-full blur-3xl pointer-events-none"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-80 h-80 bg-[#EC4899]/5 rounded-full blur-3xl pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Header / Navigation */}
      <Header />

      {/* ========== CONTENT WRAPPER WITH PADDING ========== */}
      <div className="pt-20">
        
        {/* Hero Section */}
        <header className="pt-16 pb-12 md:pb-16 px-4 sm:px-6 relative z-10 dark:border-b border-purple-900/30" id="home">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div 
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#A855F7]/10 text-[#A855F7] text-xs font-bold rounded-full dark:border border-[#A855F7]/20 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Sparkles className="w-3 h-3 text-[#A855F7]" />
                Available for Opportunities
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="block font-normal text-3xl md:text-4xl tracking-normal dark:text-slate-400 text-slate-500 mb-2">Hi, I'm</span>
                <span className="bg-gradient-to-r dark:from-[#F8FAFC] from-slate-900 via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent uppercase">
                  Snehamadhuri
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-[#A855F7] font-medium tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                AI/ML Engineer & Full Stack Developer
              </motion.p>
              
              <motion.p 
                className="dark:text-slate-400 text-slate-600 max-w-lg leading-relaxed font-normal text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Building intelligent systems and scalable applications with a passion for solving real-world problems through technology.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.button 
                  onClick={() => scrollToSection('projects')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium text-sm shadow-md hover:translate-y-[-1px] cursor-pointer"
                >
                  View Projects <ChevronRight className="w-4 h-4" />
                </motion.button>
                <a 
                  href="mailto:vakkalagaddasnehamadhuri77@gmail.com"
                  className="px-6 py-2.5 dark:bg-[#1A1333] bg-white dark:text-[#F8FAFC] text-slate-900 dark:border border-purple-800/30 rounded-lg hover:dark:bg-purple-900/30 hover:bg-slate-100 transition-all flex items-center gap-2 font-medium text-sm shadow-md hover:shadow-lg hover:translate-y-[-1px]"
                >
                  <Mail className="w-4 h-4 text-[#A855F7]" /> Contact Hub
                </a>
              </motion.div>

              {/* Quick Stats Matrix */}
              <motion.div 
                className="flex gap-6 sm:gap-10 pt-6 dark:border-t border-purple-900/30 max-w-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div>
                  <div className="text-3xl font-black dark:text-[#F8FAFC] text-slate-900 tracking-tight">5+</div>
                  <div className="text-[10px] font-bold dark:text-slate-500 text-slate-400 uppercase tracking-wider mt-0.5">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-black dark:text-[#F8FAFC] text-slate-900 tracking-tight">2</div>
                  <div className="text-[10px] font-bold dark:text-slate-500 text-slate-400 uppercase tracking-wider mt-0.5">Internships</div>
                </div>
                <div>
                  <div className="text-3xl font-black dark:text-[#F8FAFC] text-slate-900 tracking-tight">2</div>
                  <div className="text-[10px] font-bold dark:text-slate-500 text-slate-400 uppercase tracking-wider mt-0.5">Achievements</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Profile Photo */}
            <motion.div 
              className="flex-shrink-0 relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#EC4899] opacity-20 blur-lg animate-pulse" />
              <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 dark:border-[#1A1333] border-white shadow-2xl ring-4 ring-[#A855F7]/20 relative z-10">
                <img 
                  src="/placeholder-user.jpg" 
                  alt="Snehamadhuri Vakkalagadda" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </header>

        {/* ========== ABOUT SECTION ========== */}
        <About />

        {/* Main Content Arena */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Education & Skills */}
          <AnimatedSection id="skills" className="mb-16 md:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Education Block */}
              <AnimatedSection>
                <section className="dark:bg-[#1A1333] bg-white rounded-2xl p-6 shadow-lg dark:border border-purple-900/30 transition-all hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30">
                  <h2 className="text-sm font-bold uppercase tracking-wider dark:text-slate-400 text-slate-500 flex items-center gap-2 mb-6">
                    <GraduationCap className="w-4 h-4 text-[#A855F7]" />
                    Academic History
                  </h2>
                  <div className="flex gap-1 mb-4 dark:border-b border-purple-900/30 overflow-x-auto no-scrollbar scrollbar-none whitespace-nowrap">
                    {Object.keys(education).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveEduTab(tab)}
                        className={`px-3 py-2 text-xs font-bold transition-all border-b-2 -mb-px whitespace-nowrap flex-shrink-0 cursor-pointer ${
                          activeEduTab === tab 
                            ? 'border-[#A855F7] text-[#A855F7]' 
                            : 'border-transparent dark:text-slate-500 text-slate-400 hover:dark:text-slate-300 hover:text-slate-600'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2 pt-1">
                    <h3 className="font-bold dark:text-[#F8FAFC] text-slate-900 text-base leading-tight">{education[activeEduTab].degree}</h3>
                    <p className="text-sm dark:text-slate-400 text-slate-500 font-medium">{education[activeEduTab].institution}</p>
                    <p className="text-xs dark:text-slate-500 text-slate-400 font-mono">{education[activeEduTab].timeline}</p>
                    <div className="mt-4 pt-3 dark:border-t border-purple-900/30">
                      <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full dark:border border-emerald-500/20 shadow-lg">
                        {education[activeEduTab].grade}
                      </span>
                    </div>
                  </div>
                </section>
              </AnimatedSection>

              {/* Skills */}
              <AnimatedSection className="lg:col-span-2">
                <section className="dark:bg-[#1A1333] bg-white rounded-2xl p-6 shadow-lg dark:border border-purple-900/30 transition-all hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30">
                  <h2 className="text-sm font-bold uppercase tracking-wider dark:text-slate-400 text-slate-500 flex items-center gap-2 mb-6">
                    <Wrench className="w-4 h-4 text-[#A855F7]" />
                    Core Competencies Matrix
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold dark:text-slate-500 text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full dark:bg-slate-500 bg-slate-400" /> Computational Languages
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.programming.map(s => (
                          <span key={s} className="px-2.5 py-1 dark:bg-purple-900/30 bg-purple-100 dark:text-slate-300 text-slate-700 text-xs rounded-md dark:border border-purple-800/30 font-medium font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-[#A855F7] uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#A855F7]" /> Enterprise Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.webDev.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-[#A855F7]/10 text-[#A855F7] text-xs rounded-md dark:border border-[#A855F7]/20 font-medium font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-[#EC4899] uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#EC4899]" /> Applied Artificial Intel
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.aiMl.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-[#EC4899]/10 text-[#EC4899] text-xs rounded-md dark:border border-[#EC4899]/20 font-medium font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" /> Architecture / Environments
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.tools.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-md dark:border border-emerald-500/20 font-medium font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Role Switcher */}
          <RoleSwitcher />
          
          {/* Resume Center */}
          <ResumeCenter />

          {/* Internships - Experience */}
          <AnimatedSection id="experience" className="mb-16 md:mb-24">
            <SectionHeader 
              icon={Briefcase}
              title="Professional Experience"
              subtitle="My work experience and internships"
            />
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {internships.map((job, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="dark:bg-[#1A1333] bg-white rounded-2xl p-6 shadow-lg dark:border border-purple-900/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2 gap-4">
                    <h3 className="font-bold dark:text-[#F8FAFC] text-slate-900 group-hover:text-[#A855F7] transition-colors text-base tracking-tight">{job.role}</h3>
                    <span className="text-xs text-[#A855F7] font-mono bg-[#A855F7]/10 px-2.5 py-1 rounded-md dark:border border-[#A855F7]/20 font-bold whitespace-nowrap">
                      {job.timeline}
                    </span>
                  </div>
                  <p className="text-sm dark:text-slate-400 text-slate-500 font-medium mb-3">{job.company} · <span className="italic font-normal">{job.type}</span></p>
                  <p className="text-sm dark:text-slate-300 text-slate-600 leading-relaxed font-normal">{job.desc}</p>
                  {job.award && (
                    <motion.div 
                      className="mt-4 flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-3 py-2 rounded-lg dark:border border-amber-500/20 font-medium shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                      <span><strong>Recognition:</strong> {job.award}</span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Projects */}
          <Projects />

          {/* Achievements */}
          <Achievements />

          {/* Certifications */}
          <Certifications />

          {/* Statistics */}
          <Statistics />

          {/* Services */}
          <Services />

        

          {/* FAQ */}
          <FAQ />

          {/* Contact Section */}
          <AnimatedSection id="contact" className="mb-16 md:mb-24">
            <div className="dark:bg-[#1A1333] bg-white rounded-2xl p-6 md:p-8 shadow-lg dark:border border-purple-900/30">
              
              {/* Section Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full dark:bg-purple-900/20 bg-purple-100 dark:border border-purple-800/30 mb-4">
                  <Mail className="w-5 h-5 text-[#A855F7]" />
                  <span className="text-sm font-medium dark:text-slate-300 text-slate-600">Contact</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold dark:text-[#F8FAFC] text-slate-900">
                  Get In Touch
                </h2>
                <p className="dark:text-slate-400 text-slate-500 mt-2 text-sm md:text-base">
                  Have a question or want to work together? Let's connect!
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-[#A855F7] to-[#EC4899] mx-auto mt-4 rounded-full" />
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                
                {/* Email Card */}
                <a 
                  href="mailto:vakkalagaddasnehamadhuri77@gmail.com" 
                  className="dark:bg-purple-900/20 bg-purple-50 rounded-xl p-5 text-center dark:border border-purple-800/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all hover:shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#A855F7]/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-[#A855F7]" />
                  </div>
                  <h3 className="font-semibold dark:text-[#F8FAFC] text-slate-900 text-sm mb-1">Email</h3>
                  <p className="text-xs dark:text-slate-400 text-slate-500 break-all">vakkalagaddasnehamadhuri77@gmail.com</p>
                  <span className="inline-block mt-2 text-xs text-[#A855F7] opacity-0 group-hover:opacity-100 transition-opacity">Send Message →</span>
                </a>

                {/* Phone Card */}
                <a 
                  href="tel:+919849497234" 
                  className="dark:bg-purple-900/20 bg-purple-50 rounded-xl p-5 text-center dark:border border-purple-800/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all hover:shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#EC4899]/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-[#EC4899]" />
                  </div>
                  <h3 className="font-semibold dark:text-[#F8FAFC] text-slate-900 text-sm mb-1">Phone</h3>
                  <p className="text-xs dark:text-slate-400 text-slate-500">+91 9849497234</p>
                  <span className="inline-block mt-2 text-xs text-[#EC4899] opacity-0 group-hover:opacity-100 transition-opacity">Call Now →</span>
                </a>

                {/* LinkedIn Card */}
                <a 
                  href="https://linkedin.com/in/sneha-madhuri-vakkalagadda-b1a932309" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="dark:bg-purple-900/20 bg-purple-50 rounded-xl p-5 text-center dark:border border-purple-800/30 hover:dark:border-[#A855F7]/30 hover:border-[#A855F7]/30 transition-all hover:shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#A855F7]/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-[#A855F7]" />
                  </div>
                  <h3 className="font-semibold dark:text-[#F8FAFC] text-slate-900 text-sm mb-1">LinkedIn</h3>
                  <p className="text-xs dark:text-slate-400 text-slate-500">Connect with me</p>
                  <span className="inline-block mt-2 text-xs text-[#A855F7] opacity-0 group-hover:opacity-100 transition-opacity">View Profile →</span>
                </a>
              </div>

              {/* Social Icons Row */}
              <div className="flex justify-center gap-4 mt-6">
                <a 
                  href="https://github.com/SnehaMadhuri11" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full dark:bg-purple-900/20 bg-slate-100 flex items-center justify-center hover:dark:bg-purple-900/40 hover:bg-slate-200 transition-all hover:scale-110"
                >
                  <FolderGit2 className="w-4 h-4 text-[#A855F7]" />
                </a>
                <a 
                  href="https://linkedin.com/in/sneha-madhuri-vakkalagadda-b1a932309" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full dark:bg-purple-900/20 bg-slate-100 flex items-center justify-center hover:dark:bg-purple-900/40 hover:bg-slate-200 transition-all hover:scale-110"
                >
                  <Users className="w-4 h-4 text-[#A855F7]" />
                </a>
                <a 
                  href="mailto:vakkalagaddasnehamadhuri77@gmail.com"
                  className="w-10 h-10 rounded-full dark:bg-purple-900/20 bg-slate-100 flex items-center justify-center hover:dark:bg-purple-900/40 hover:bg-slate-200 transition-all hover:scale-110"
                >
                  <Mail className="w-4 h-4 text-[#A855F7]" />
                </a>
              </div>

              {/* Location Info */}
              <div className="text-center mt-6 pt-4 dark:border-t border-purple-900/30">
                <p className="flex items-center justify-center gap-2 text-xs dark:text-slate-500 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#A855F7]" />
                  <span>Vijayawada, India</span>
                  <span className="w-px h-3 dark:bg-purple-800/30 bg-slate-200" />
                  <span>Available for remote & on-site opportunities</span>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </main>

        {/* Footer */}
        <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-10 dark:border-t border-purple-900/30 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono dark:text-slate-500 text-slate-400">
            <div className="flex items-center justify-center gap-2 order-2 sm:order-1 text-center">
              <Heart className="w-3.5 h-3.5 text-red-400/80 fill-red-400/20 flex-shrink-0" />
              <span>© 2026 SNEHAMADHURI VAKKALAGADDA. ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex items-center gap-6 order-1 sm:order-2">
              <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#A855F7] transition-colors flex items-center gap-1.5 group">
                <span className="font-mono font-bold text-[9px] dark:bg-[#1A1333] bg-slate-100 dark:border border-purple-800/30 px-1.5 py-0.5 rounded text-[#A855F7] group-hover:bg-[#A855F7] group-hover:text-white transition-colors">IN</span>
                <span className="dark:text-slate-500 text-slate-400 font-sans font-medium text-xs group-hover:dark:text-[#F8FAFC] group-hover:text-slate-900">LinkedIn</span> <ExternalLink className="w-2.5 h-2.5 opacity-40" />
              </a>
              <a href={contactInfo.github} target="_blank" rel="noreferrer" className="hover:text-[#A855F7] transition-colors flex items-center gap-1.5 group">
                <span className="font-mono font-bold text-[9px] dark:bg-[#1A1333] bg-slate-100 dark:border border-purple-800/30 px-1.5 py-0.5 rounded text-[#A855F7] group-hover:bg-[#A855F7] group-hover:text-white transition-colors">GH</span>
                <span className="dark:text-slate-500 text-slate-400 font-sans font-medium text-xs group-hover:dark:text-[#F8FAFC] group-hover:text-slate-900">GitHub</span> <ExternalLink className="w-2.5 h-2.5 opacity-40" />
              </a>
            </div>
            <div className="flex items-center gap-1 dark:text-slate-500 text-slate-400 order-3 hidden lg:flex">
              <Coffee className="w-3.5 h-3.5 opacity-60" /> React Engine · Tailwired CSS
            </div>
          </div>
        </footer>

        {/* Quick Access Panel */}
        <QuickAccessPanel />

        {/* Floating Contact Bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 dark:bg-[#1A1333] bg-white backdrop-blur-md shadow-lg rounded-full px-4 py-2.5 sm:px-6 sm:py-3 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm dark:border border-purple-800/30 z-50 transition-transform hover:scale-[1.01] w-[max-content] max-w-[calc(100vw-2rem)]">
          <a href={`tel:${contactInfo.phone}`} className="dark:text-slate-400 text-slate-500 hover:text-[#A855F7] transition-colors flex items-center gap-1.5 font-medium">
            <Phone className="w-4 h-4 text-[#A855F7]" />
            <span className="hidden sm:inline">Call</span>
          </a>
          <span className="w-px h-4 dark:bg-purple-800/30 bg-slate-200" />
          <a href={`mailto:${contactInfo.email}`} className="dark:text-slate-400 text-slate-500 hover:text-[#A855F7] transition-colors flex items-center gap-1.5 font-medium">
            <Mail className="w-4 h-4 text-[#A855F7]" />
            <span className="hidden sm:inline">Email</span>
          </a>
          <span className="w-px h-4 dark:bg-purple-800/30 bg-slate-200" />
          <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="dark:text-slate-400 text-slate-500 hover:text-[#A855F7] transition-colors flex items-center gap-1.5 group font-medium">
            <span className="font-mono font-bold text-[9px] dark:bg-[#0F0A1F] bg-slate-100 dark:border border-purple-800/30 px-1.5 py-0.5 rounded text-[#A855F7] group-hover:bg-[#A855F7] group-hover:text-white transition-colors">IN</span>
            <span className="hidden sm:inline dark:text-slate-400 text-slate-500 group-hover:text-[#A855F7]">LinkedIn</span> <ExternalLink className="w-2.5 h-2.5 opacity-40 hidden sm:inline-block" />
          </a>
          <span className="w-px h-4 dark:bg-purple-800/30 bg-slate-200 sm:hidden" />
          <a href={contactInfo.github} target="_blank" rel="noreferrer" className="dark:text-slate-400 text-slate-500 hover:text-[#A855F7] transition-colors flex items-center gap-1.5 group font-medium">
            <span className="font-mono font-bold text-[9px] dark:bg-[#0F0A1F] bg-slate-100 dark:border border-purple-800/30 px-1.5 py-0.5 rounded text-[#A855F7] group-hover:bg-[#A855F7] group-hover:text-white transition-colors">GH</span>
            <span className="hidden sm:inline dark:text-slate-400 text-slate-500 group-hover:text-[#A855F7]">GitHub</span> <ExternalLink className="w-2.5 h-2.5 opacity-40 hidden sm:inline-block" />
          </a>
        </div>

        {/* Back to Top */}
        <BackToTop />
      </div>
      {/* ========== END OF CONTENT WRAPPER ========== */}
    </div>
  );
}

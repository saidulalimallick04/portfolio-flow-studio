import type {
  Collaborator,
  Hobby,
  Profile,
  Project,
  Skill,
  Journey,
  StudioItem,
  HeroImage,
} from "@/lib/types";
import { Award, Briefcase, GraduationCap, Trophy, Cpu } from "lucide-react";

// ================================================================================================ //
// Home Page Data
// ================================================================================================ //

export const homePageData = {
  about: {
    sectionTitle: "About Me",
    name: "Saidul Ali Mallick",
    title: "Backend Developer | AI/ML Engineer | Data Science Enthusiast",
    bio: "Building the backbone of modern web applications with Python & Django, while powering the future with Artificial Intelligence and Deep Learning. I design systems that are not just functional, but intelligent, scalable, and secure.",
    paragraphs: [
      "I am Saidul Ali Mallick (Sami), a dedicated Backend Developer and AI/ML Engineer at Pathvex Digital Solutions (pathvex.in) with a strong passion for building scalable, secure, and efficient digital systems. Currently pursuing a B.Tech in Computer Science with a specialization in Artificial Intelligence and Machine Learning, I bridge the gap between complex algorithms and real-world applications. My technical arsenal is rooted in Python and Django, allowing me to architect robust backend infrastructures and RESTful APIs that power dynamic web applications.",
      "Beyond traditional web development, I am deeply immersed in the world of Data Science and Deep Learning. I leverage modern tools like TensorFlow, Streamlit, and Pandas to create intelligent solutions—from image classifiers to predictive analytics models. Whether it's optimizing database queries with PostgreSQL, engineering client solutions at Pathvex Digital Solutions, designing seamless user experiences with React and Next.js, or automating data pipelines, I am driven by curiosity and a commitment to innovation. My goal is to craft software that not only solves problems but also delivers a premium, high-performance user experience.",
    ],
  },
};

// Profiles Data
export const profilesData: Profile[] = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/saidulalimallick04",
    icon: "github",
  },
  {
    id: 2,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/saidulalimallick04",
    icon: "linkedin",
  },
  {
    id: 3,
    name: "Twitter",
    url: "https://x.com/saidulmallick04",
    icon: "twitter",
  },
  {
    id: 4,
    name: "Facebook",
    url: "https://facebook.com/saidulalimallick04",
    icon: "facebook",
  },
  {
    id: 5,
    name: "Instagram",
    url: "https://instagram.com/saidulalimallick04",
    icon: "instagram",
  },
  {
    id: 6,
    name: "Kaggle",
    url: "https://kaggle.com/saidulalimallick04",
    icon: "kaggle",
  },
  {
    id: 10,
    name: "Email",
    url: "mailto:developersami44@gmail.com",
    icon: "email",
  },
];


// ================================================================================================ //
// Projects Data
// ================================================================================================ //

export const projectsData: Project[] = [
  // Full Stack Projects
  {
    id: "PROJ_FULLSTACK_01",
    category: "Full Stack",
    status: "incomplete",
    year: "2025",

    title: "Apex-Sky - Projects Management",
    description: "A user-friendly web-application that allows users to manage projects, details, collaborations etc. in one platform and also using API they can fetch their projects from the platform to other sites as per their needs. (Still working)",
    tags: ["Python", "Django", "PostgreSQL", "HTML", "CSS", "Bootstrap", "REST API", "Dashboard"],

    imageHint: "project-management-dashboard",
    imageUrl: "/projects/apex-sky.png",
    liveUrl: "https://apexsky.onrender.com",
    githubUrl: "https://github.com/saidulalimallick04/apexsky-projects-management",
    alternativeLink: "https://apexsky.onrender.com",
  },
  {
    id: "PROJ_FULLSTACK_02",
    category: "Full Stack",
    status: "completed",
    year: "2025",

    title: "To-Do-X - Task Management",
    description: "A user-friendly task scheduling web application, where user can create, complete, track task progress. So that they can always stay organized by accessing from anywhere using authentication.",
    tags: ["Python", "Django", "SQLite3", "HTML", "CSS", "Bootstrap", "Task Management"],

    imageHint: "task-list-app",
    imageUrl: "/projects/to-do-x.png",
    liveUrl: "https://to-do-x.onrender.com",
    alternativeLink: "https://to-do-x.onrender.com",
    githubUrl: "https://github.com/saidulalimallick04/to-do-x",
  },
  {
    id: "PROJ_FULLSTACK_03",
    category: "Full Stack",
    status: "completed",
    year: "2025",

    title: "artfolio-creative-showcase",
    description: "ArtFolio is a modern, visually appealing web application designed as a creative showcase for artists to share their digital artwork and connect with a community of fellow creators and enthusiasts.",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Portfolio", "Showcase"],

    imageHint: "artfolio",
    imageUrl: "/projects/artfolio.png",
    liveUrl: "https://artfolio.saidulalimallick.studio/",
    alternativeLink: "https://artfolio-creative-showcase.vercel.app/",
    githubUrl: "https://github.com/saidulalimallick04/artfolio-creative-showcase",
  },
  {
    id: "PROJ_FULLSTACK_04",
    category: "Full Stack",
    status: "completed",
    year: "2025",

    title: "Heavenly-Bytes",
    description: "A user-friendly task scheduling web application, where user can create, complete, track task progress. So that they can always stay organized by accessing from anywhere using authentication.",
    tags: ["Python", "Django", "SQLite3", "HTML", "CSS", "Bootstrap", "Productivity"],

    imageHint: "task-list-app",
    imageUrl: "/projects/heavenly-bytes.png",
    liveUrl: "https://heavenly.saidulalimallick.studio/",
    alternativeLink: "https://heavenly-bytes.netlify.app/",
    githubUrl: "https://github.com/saidulalimallick04/heavenly-bytes",
  },

  // Frontend Projects
  {
    id: "PROJ_FRONTEND_01",
    category: "Frontend",
    status: "completed",
    year: "2025",

    title: "Ohida's Canvas",
    description: "Ohida's Canvas is a modern, visually appealing web application designed as a creative showcase for artists to share their digital artwork and connect with a community of fellow creators and enthusiasts.",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Artist Portfolio"],

    imageHint: "code-matrix",
    imageUrl: "/projects/ohidas-canvas.png",
    liveUrl: "https://khandakarohida.saidulalimallick.studio/",
    alternativeLink: "https://khandakarohida.netlify.app/",
    githubUrl: "https://github.com/saidulalimallick04/artist-khandakar-ohida",

  },


  // Backend Projects
  {
    id: "PROJ_BACKEND_01",
    category: "Backend",
    status: "incomplete",
    year: "2025",

    title: "Django User Profile Management System",
    description: "User profile management system built with Django.",
    tags: ["Django", "Python", "SQLite3", "User Management", "Authentication"],

    imageHint: "user-profile",
    imageUrl: "/projects/django-user-profile.png",
    liveUrl: "#",
    alternativeLink: "#",
    githubUrl: "https://github.com/saidulalimallick04/django-user-profile",
  },
  {
    id: "PROJ_BACKEND_02",
    category: "Backend",
    status: "completed",
    year: "2025",

    title: "Smart To-Do API",
    description: "A user-friendly task scheduling web application, where user can create, complete, track task progress. So that they can always stay organized by accessing from anywhere using authentication.",
    tags: ["FastAPI", "Python", "MongoDB", "JWT", "uvicorn", "API Development"],

    imageHint: "todo-list",
    imageUrl: "/projects/smart-to-do-api.png",
    liveUrl: "https://smart-to-do-api.vercel.app/",
    alternativeLink: "https://smart-to-do-api.vercel.app/",
    githubUrl: "https://github.com/saidulalimallick04/smart-to-do-api",
  },
  {
    id: "PROJ_BACKEND_03",
    category: "Backend",
    status: "incomplete",
    year: "2025",

    title: "KAP ERP API",
    description: "An API server to store and fetch informations about train possibly. One can Create/Store/update Wheel and Bogie Specifications",
    tags: ["Python", "Django", "Django Rest Framework", "PostgreSQL", "JWT", "ERP"],

    imageHint: "Train-Details-Storing-API",
    imageUrl: "/projects/kap-erp-api.png",
    liveUrl: "#",
    alternativeLink: "#",
    githubUrl: "https://github.com/saidulalimallick04/KAP-ERP-API",
  },

  // AI Projects
  {
    id: "PROJ_AI_01",
    category: "AI",
    status: "completed",
    year: "2025",

    title: "AI-Based Image Classifier",
    description: "Implements a deep learning-based classifier to distinguish between cats and dogs. Users can upload images for instant classification result.",
    tags: ["Deep Learning", "Python", "Streamlit", "TensorFlow", "Computer Vision"],

    imageHint: "ai-neural-network",
    imageUrl: "/projects/ai-image-classifier.png",
    liveUrl: "#",
    alternativeLink: "#",
    githubUrl: "#",

  },
  {
    id: "PROJ_AI_02",
    category: "AI",
    status: "completed",
    year: "2025",

    title: "Bangalore House Price Prediction Model",
    description: "AI model to predict house prices in Bangalore.",
    tags: ["AI", "Machine Learning", "Regression", "Predictive Analytics"],

    imageHint: "house-price-prediction",
    imageUrl: "/projects/bangalore-house-prices.png",
    liveUrl: "#",
    alternativeLink: "#",
    githubUrl: "#",
  },
  {
    id: "PROJ_AI_03",
    category: "AI",
    status: "incomplete",
    year: "2025",

    title: "Diabetes Prediction Model",
    description: "Logistic Regression model for diabetes prediction.",
    tags: ["AI", "Machine Learning", "Logistic Regression", "Healthcare AI"],

    imageHint: "diabetes-prediction",
    imageUrl: "/projects/diabetes-prediction.png",
    liveUrl: "#",
    alternativeLink: "#",
    githubUrl: "#",
  },

  // Data Science Projects
  {
    id: "PROJ_DATA_01",
    category: "Data Science",
    status: "completed",
    year: "2025",

    title: "Weekend Getaway Ranker",
    description: "Discover your perfect weekend escape. A smart recommendation engine that ranks travel destinations based on your preferences using a weighted scoring algorithm.",
    tags: ["Streamlit", "Python", "Weighted Scoring Algorithm", "Recommendation System"],

    imageHint: "code-matrix",
    imageUrl: "/projects/weekend-getaway-ranker.png",
    liveUrl: "https://weekend-getaway-ranker.streamlit.app/",
    alternativeLink: "https://weekend-getaway-ranker.streamlit.app/",
    githubUrl: "https://github.com/saidulalimallick04/weekend-getaway-ranker",
  },
  {
    id: "PROJ_DATA_02",
    category: "Data Science",
    status: "completed",
    year: "2025",

    title: "Smart Traffic Violation Pattern Detector Dashboard",
    description: "This project is a Streamlit web application designed to analyze traffic violation data. It provides a user-friendly interface to explore, visualize, and gain insights from traffic violation datasets. Users can upload their own data, perform analysis, and view summaries and trends.",
    tags: ["Data Science", "Streamlit", "Python", "EDA", "Data Visualization", "Dashboard"],

    imageHint: "earphones",
    imageUrl: "/projects/traffic-violation-dashboard.png",
    liveUrl: "https://smart-traffic-violation-pattern-detector.streamlit.app/",
    alternativeLink: "https://smart-traffic-violation-pattern-detector.streamlit.app/",
    githubUrl: "https://github.com/saidulalimallick04/smart-traffic-violation-pattern-detector",
  },
  {
    id: "PROJ_DATA_03",
    category: "Data Science",
    status: "completed",
    year: "2025",

    title: "Tenders Data Extraction",
    description: "This project is a Python script that scrapes public tender data from the CPWD eTender website, specifically from the 'New Tenders → All' section. It uses Selenium WebDriver to extract the latest tender listings (first N tenders, default: 20) and saves the relevant details into a CSV file.",
    tags: ["Python", "Selenium", "Web Scraping", "CSV", "Automation"],

    imageHint: "code-matrix",
    imageUrl: "/projects/tenders-data-extraction.png",
    liveUrl: "#",
    alternativeLink: "#",
    githubUrl: "https://github.com/saidulalimallick04/tenders-data-extraction",
  },
  {
    id: "PROJ_DATA_04",
    category: "Data Science",
    status: "completed",
    year: "2025",

    title: "ABC Loyalty Points Analysis",
    description: "Analysis on loyalty points of individual players based on their game played, deposit, withdrawal.",
    tags: ["Python", "Pandas", "Data Analysis", "CSV", "Analytics"],

    imageHint: "code-matrix",
    imageUrl: "/projects/abc-loyalty-points.png",
    liveUrl: "#",
    alternativeLink: "#",
    githubUrl: "https://github.com/saidulalimallick04/abc-loyalty-points-analysis",
  },

  // Game Projects
  {
    id: "PROJ_GAME_01",
    category: "Game",
    status: "incomplete",
    year: "2025",

    title: "Furfuri Nagar Adventure",
    description: "",
    tags: ["React", "Three.js", "TypeScript", "CSS", "HTML", "Game Development"],

    imageHint: "Furfuri-Nagar-Adventure",
    imageUrl: "/projects/furfuri-nagar-adventure.png",
    liveUrl: "#",
    alternativeLink: "#",
    githubUrl: "https://github.com/saidulalimallick04/furfuri-nagar-adventure",
  },
];


// ================================================================================================ //
// Collaborators Page Data
// ================================================================================================ //

export const collaboratorsPageData = {
  title: "I Have Worked With ...",
  description: "A diverse team of passionate professionals with unique skills driving innovation and excellence in every project.",
  team: {
    title: "Worked or Collaborated With ...",
    description: "A diverse group of passionate professionals, each bringing unique skills and experiences to drive innovation and excellence in every project we undertake."
  }
};

export const collaboratorsData: Collaborator[] = [
  {
    id: 1,

    name: "Supriya Khanra",
    title: "Project Manager",
    summary: "Dedicated to ensuring customer satisfaction and success, with a proactive approach to client support and retention.",

    imageUrl: "https://github.com/supriyakhanra.png",
    imageHint: "professional-person",

    twitter: "https://twitter.com/supriyakhanra",
    linkedin: "https://linkedin.com/in/supriyakhanra",
    github: "https://github.com/supriyakhanra",

    collaboration_count: 15
  },
  {
    id: 2,

    name: "Anshu Gupta",
    title: "Software Engineer",
    summary: "Operations specialist with a background in scaling startups, ensuring smooth and efficient company operations.",

    imageUrl: "https://github.com/Anshu370.png",
    imageHint: "creative-office",

    twitter: "https://twitter.com/anshugupta",
    linkedin: "https://linkedin.com/in/anshugupta",
    github: "https://github.com/Anshu370",

    collaboration_count: 8
  },
  {
    id: 3,

    name: "Pranjal Debnath",
    title: "Software Engineer",
    summary: "Passionate product manager focused on delivering user-centric solutions that meet market needs.",

    imageUrl: "https://github.com/prangit95.png",
    imageHint: "thoughtful-person",

    twitter: "https://twitter.com/pranjaldebnath",
    linkedin: "https://linkedin.com/in/pranjaldebnath",
    github: "https://github.com/prangit95",

    collaboration_count: 12
  },
  {
    id: 4,

    name: "Sneha Das",
    title: "Software Engineer",
    summary: "Technical guru with a passion for developing scalable and secure cloud-based applications.",

    imageUrl: "https://github.com/WanderSusie.png",
    imageHint: "professional-person",

    twitter: "https://twitter.com/snehadas",
    linkedin: "https://linkedin.com/in/snehadas",
    github: "https://github.com/WanderSusie",

    collaboration_count: 5
  },
];


// ================================================================================================ //
// Hobbies Page Data
// ================================================================================================ //

export const hobbiesPageData = {
  title: "My Hobbies",
  description: "When I'm not coding, I enjoy a variety of activities that keep me creative and balanced.",
  list: {
    title: "What I Do For Fun",
    description: "A glimpse into my passions outside of the digital world."
  }
};

export const hobbiesData: Hobby[] = [
  {
    id: 1,
    title: "Explore New Technologies",
    description: "I'm always diving into new tech stacks, libraries, and frameworks to stay on the cutting edge.",
    imageUrl: "https://cdn.pixabay.com/photo/2017/01/17/03/57/desktop-1985856_1280.jpg",
    imageHint: "glowing-circuit-board"
  },
  {
    id: 2,
    title: "Watching Animes",
    description: "I enjoy the intricate storytelling and stunning visuals of anime as a way to unwind.",
    imageUrl: "https://cdn.pixabay.com/photo/2023/11/15/13/55/woman-8390124_1280.jpg",
    imageHint: "anime-character-illustration"
  },
  {
    id: 3,
    title: "Nature Photography & Videography",
    description: "Capturing the beauty of nature through my camera lens is a passion that gets me outdoors.",
    imageUrl: "https://cdn.pixabay.com/photo/2022/04/15/07/58/sunset-7133867_1280.jpg",
    imageHint: "camera-in-nature"
  },
];


// ================================================================================================ //
// Journey Page Data
// ================================================================================================ //

export const journeyPageData = {
  title: "My Professional Journey",
  description: "A timeline of my career, highlighting key roles, projects, and learning experiences that have shaped my skills and expertise.",
  timeline: {
    title: "Career Timeline",
    description: "Follow my path from education to my most recent professional achievements."
  }
};

export const journeyData: Journey[] = [
  {
    id: 0,
    date: "2025 - Present",
    title: "Backend & AI/ML Engineer",
    company: "Pathvex Digital Solutions (pathvex.in)",
    description: "Architecting and maintaining scalable backend systems, high-throughput RESTful APIs, and intelligent data systems for enterprise digital services.",
    icon: Briefcase,
  },
  {
    id: 1,
    date: "2022-2026",
    title: "B.Tech in Computer Science (AI & ML)",
    company: "Brainware University, Kolkata",
    description: "Pursuing a specialized degree in Artificial Intelligence and Machine Learning, maintaining a CGPA of 8.93 out of 10.",
    icon: GraduationCap,
  },
  {
    id: 2,
    date: "Jan-Feb 2025",
    title: "Intel Industrial Training on AIML",
    company: "INTEL & Ed Gate Technology",
    description: "Completed a 10-day certified industrial training on AI/ML using Python.",
    icon: Cpu,
  },
  {
    id: 3,
    date: "Sept 2024",
    title: "Xiaomi Ode2Code 3.0 Participant",
    company: "Unstop Platform",
    description: "Participated in a virtual hackathon, honing problem-solving and coding skills.",
    icon: Briefcase,
  },
  {
    id: 4,
    date: "Sept 2024",
    title: "TATA Crucible Campus Quiz",
    company: "Unstop Platform",
    description: "Competed in a prestigious tech quiz, showcasing technical knowledge.",
    icon: Briefcase,
  },
  {
    id: 5,
    date: "May 2024",
    title: "Branio-Synergy Tech-Quiz Winner",
    company: "University Event",
    description: "Achieved first place among 21 teams and received an Excellence Award.",
    icon: Trophy,
  },
  {
    id: 6,
    date: "Aug 2024",
    title: "Workshop on Emerging-Trends",
    company: "University Workshop",
    description: "Attended a 5-day workshop to stay updated with the latest in technology.",
    icon: Award,
  },
];


// ================================================================================================ //
// Skills Page Data
// ================================================================================================ //

export const skillsPageData = {
  title: "My Skills",
  description: "A showcase of my technical skills and expertise in action.",
  list: {
    title: "Technical Proficiency",
    description: "Here's a breakdown of my skills, their proficiency, and where I've used them."
  }
};

export const skillsData: Skill[] = [
  {
    id: 1,
    name: "Python",
    proficiency: 75,
    description: "Using Python for backend development, scripting, and implementing AI/ML models.",
    type: "Language",
  },
  {
    id: 2,
    name: "Django",
    proficiency: 55,
    description: "Building robust and scalable web applications with the Django and Django Rest Framework.",
    type: "Backend",
  },
  {
    id: 3,
    name: "C",
    proficiency: 60,
    description: "Strong foundation in procedural programming and algorithms using C.",
    type: "Language",
  },
  {
    id: 4,
    name: "Java",
    proficiency: 35,
    description: "Knowledge of Object Oriented Programming in Java.",
    type: "Language",
  },
  {
    id: 5,
    name: "SQL",
    proficiency: 75,
    description: "Writing complex queries and managing databases.",
    type: "Language",
  },
  {
    id: 6,
    name: "HTML",
    proficiency: 67,
    description: "Creating structured web pages.",
    type: "Frontend",
  },
  {
    id: 7,
    name: "CSS",
    proficiency: 50,
    description: "Styling web pages.",
    type: "Frontend",
  },
  {
    id: 8,
    name: "JavaScript",
    proficiency: 20,
    description: "Basic scripting for web interactivity.",
    type: "Language",
  },
  {
    id: 9,
    name: "Bootstrap",
    proficiency: 75,
    description: "Frontend framework.",
    type: "Frontend",
  },
  {
    id: 10,
    name: "PostgreSQL",
    proficiency: 65,
    description: "Relational database management.",
    type: "Database",
  },
  {
    id: 11,
    name: "MySQL",
    proficiency: 70,
    description: "Relational database management.",
    type: "Database",
  },
  {
    id: 12,
    name: "Machine Learning",
    proficiency: 50,
    description: "Building ML models.",
    type: "AI",
  },
  {
    id: 13,
    name: "Deep Learning",
    proficiency: 10,
    description: "Neural networks and deep learning.",
    type: "AI",
  },
  {
    id: 14,
    name: "Git & GitHub",
    proficiency: 70,
    description: "Version control.",
    type: "Tools",
  },
  {
    id: 15,
    name: "Cloudinary",
    proficiency: 50,
    description: "Media management.",
    type: "Tools",
  },
  {
    id: 16,
    name: "VS Code",
    proficiency: 75,
    description: "Code Editor.",
    type: "Tools",
  }
];


// ================================================================================================ //
// Studio Page Data
// ================================================================================================ //

export const studioPageData = {
  title: "Welcome to My Studio",
  description: "This is my creative playground. A space for photography, videography, and other artistic works. Here, I blend passion with skill to create unique digital experiences."
};

export const studioData: StudioItem[] = [
  {
    id: 1,
    title: "Mountain Majesty",
    description: "A breathtaking shot of a mountain range at sunrise, capturing the warm glow on the peaks.",
    category: "Photography",
    imageUrl: "https://picsum.photos/seed/1001/600/400",
    imageHint: "mountain-sunrise"
  },
  {
    id: 2,
    title: "City Lights",
    description: "A dynamic short film showcasing the vibrant nightlife of a bustling city, set to an upbeat electronic track.",
    category: "Videography",
    imageUrl: "https://picsum.photos/seed/1002/600/400",
    imageHint: "city-nightlife"
  },
  {
    id: 3,
    title: "Abstract Forms",
    description: "A digital painting exploring the interplay of color and shape, creating a sense of movement and energy.",
    category: "Creative Arts",
    imageUrl: "https://picsum.photos/seed/1003/600/400",
    imageHint: "abstract-painting"
  },
  {
    id: 4,
    title: "Coastal Serenity",
    description: "The calm waves of the ocean gently washing over a sandy beach at dusk.",
    category: "Photography",
    imageUrl: "https://picsum.photos/seed/1004/600/400",
    imageHint: "beach-sunset"
  },
  {
    id: 5,
    title: "Forest Walk",
    description: "A short, immersive video that takes you on a peaceful walk through a sun-dappled forest.",
    category: "Videography",
    imageUrl: "https://picsum.photos/seed/1005/600/400",
    imageHint: "forest-path"
  },
  {
    id: 6,
    title: "Character Sketch",
    description: "A detailed digital sketch of a fantasy character, complete with intricate armor and a mysterious aura.",
    category: "Creative Arts",
    imageUrl: "https://picsum.photos/seed/1006/600/400",
    imageHint: "fantasy-character"
  },
  {
    id: 7,
    title: "Urban Exploration",
    description: "Capturing the hidden beauty of city architecture through a unique lens.",
    category: "Photography",
    imageUrl: "https://picsum.photos/seed/1007/600/400",
    imageHint: "city-architecture"
  },
  {
    id: 8,
    title: "Behind the Scenes",
    description: "A short documentary-style video showing the creative process behind a recent project.",
    category: "Videography",
    imageUrl: "https://picsum.photos/seed/1008/600/400",
    imageHint: "film-making",
    youtubeUrl: "https://youtube.com",
    alternativeUrl: "https://vimeo.com"
  },
  {
    id: 9,
    title: "Digital Dreamscape",
    description: "A surreal digital artwork blending elements of nature and technology.",
    category: "Creative Arts",
    imageUrl: "https://picsum.photos/seed/1009/600/400",
    imageHint: "surreal-landscape",
    alternativeUrl: "https://behance.net"
  },
];

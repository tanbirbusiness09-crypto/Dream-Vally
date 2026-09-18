export interface TalentExperience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface TalentEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface TalentProfile {
  id: string;
  name: string;
  title: string;
  headline: string;
  avatar: string;
  coverImage: string;
  location: string;
  category: 'tech' | 'design' | 'marketing' | 'finance' | 'product';
  isOpenToWork: boolean;
  availability: string; // e.g. 'Immediately Available' | '2 Weeks Notice' | 'Part-time / Contract'
  workPreference: 'Remote' | 'Hybrid' | 'On-site';
  rateOrSalary: string;
  experienceYears: string;
  rating: number;
  reviewsCount: number;
  likesCount: number;
  isLiked?: boolean;
  skills: string[];
  about: string;
  workHistory: TalentExperience[];
  education: TalentEducation[];
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  completedProjects: number;
}

export const TALENT_PROFILES: TalentProfile[] = [
  {
    id: "talent-1",
    name: "Shakil Ahmed",
    title: "Senior Full Stack Engineer",
    headline: "Building high-scale Next.js, React & Node.js web applications • Ex-Tech Lead",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=280&fit=crop",
    location: "Dhaka, Bangladesh",
    category: "tech",
    isOpenToWork: true,
    availability: "Immediately Available",
    workPreference: "Remote",
    rateOrSalary: "৳1,30,000 / mo",
    experienceYears: "5+ Years",
    rating: 4.9,
    reviewsCount: 38,
    likesCount: 248,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "GraphQL"],
    about: "Passionate Full Stack Engineer with over 5 years of commercial experience creating fluid web apps. Specialized in modern React ecosystems, App Router, microservices, and clean architecture. Delivered enterprise solutions for banking, fintech, and e-commerce startups.",
    workHistory: [
      {
        role: "Senior Frontend Lead",
        company: "bKash Core Engineering",
        period: "2023 - 2026",
        description: "Led the web platform development team serving over 500k daily active users. Reduced bundle size by 42% and introduced server actions with Next.js.",
      },
      {
        role: "Full Stack Software Engineer",
        company: "Brain Station 23",
        period: "2021 - 2023",
        description: "Engineered scalable REST/gRPC backend microservices in Node.js and delivered reactive dashboards for international healthcare clients.",
      },
    ],
    education: [
      {
        degree: "B.Sc in Computer Science & Engineering",
        institution: "BUET (Bangladesh University of Engineering and Technology)",
        year: "2017 - 2021",
      },
    ],
    portfolioUrl: "https://shakilahmed.dev",
    githubUrl: "https://github.com/shakil",
    linkedinUrl: "https://linkedin.com/in/shakil-ahmed",
    completedProjects: 45,
  },
  {
    id: "talent-2",
    name: "Tanzina Farzana",
    title: "Lead UI/UX Product Designer",
    headline: "Designing intuitive fintech & consumer app experiences • Design Systems Advocate",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=280&fit=crop",
    location: "Gulshan, Dhaka",
    category: "design",
    isOpenToWork: true,
    availability: "Available for Hire",
    workPreference: "Hybrid",
    rateOrSalary: "৳1,40,000 / mo",
    experienceYears: "6 Years",
    rating: 5.0,
    reviewsCount: 52,
    likesCount: 312,
    skills: ["Figma", "UI/UX Design", "Design Systems", "User Research", "Wireframing", "Prototyping"],
    about: "Senior Product Designer with an obsessive attention to typography, micro-interactions, and user accessibility. Experienced in taking products from zero to 1M+ active downloads across Southeast Asia and the Middle East.",
    workHistory: [
      {
        role: "Lead Product Designer",
        company: "Pathao Design Studio",
        period: "2022 - 2026",
        description: "Spearheaded redesign for Pathao Food checkout flow resulting in an 18% increase in completed conversions. Built the unified Pathao design token system in Figma.",
      },
      {
        role: "UI/UX Designer",
        company: "Chaldal Tech",
        period: "2020 - 2022",
        description: "Designed multi-lingual consumer mobile interfaces and grocery warehouse picking interfaces.",
      },
    ],
    education: [
      {
        degree: "B.A in Graphic Design & Multimedia",
        institution: "University of Dhaka (Charukala)",
        year: "2016 - 2020",
      },
    ],
    portfolioUrl: "https://dribbble.com/tanzina",
    linkedinUrl: "https://linkedin.com/in/tanzina-design",
    completedProjects: 60,
  },
  {
    id: "talent-3",
    name: "Arifur Rahman",
    title: "Mobile App Engineer (React Native & Flutter)",
    headline: "Cross-platform mobile architect | 12+ published apps on App Store & Google Play",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=280&fit=crop",
    location: "Chittagong, Bangladesh (Open to Remote)",
    category: "tech",
    isOpenToWork: true,
    availability: "Immediately Available",
    workPreference: "Remote",
    rateOrSalary: "$25 / hr",
    experienceYears: "4+ Years",
    rating: 4.8,
    reviewsCount: 29,
    likesCount: 189,
    skills: ["React Native", "Flutter", "TypeScript", "iOS/Android", "Redux", "Firebase", "App Store Deploy"],
    about: "Mobile developer passionate about building 60 FPS offline-first apps. Expert in native bridging, memory leak diagnosis, push notifications, and payment gateway SDK integrations.",
    workHistory: [
      {
        role: "Senior Mobile Engineer",
        company: "ShopUp (RedX Logistics)",
        period: "2022 - 2025",
        description: "Maintained the delivery rider app utilized by 15,000+ logistics riders with real-time GPS tracking.",
      },
    ],
    education: [
      {
        degree: "B.Sc in Computer Science",
        institution: "CUET (Chittagong University of Engineering & Technology)",
        year: "2017 - 2021",
      },
    ],
    portfolioUrl: "https://github.com/arifur-mobile",
    githubUrl: "https://github.com/arifur-mobile",
    completedProjects: 32,
  },
  {
    id: "talent-4",
    name: "Nusrat Jahan Mim",
    title: "Digital Growth & Performance Marketer",
    headline: "Scaling CAC/ROAS through Google Ads, Meta Funnels & SEO • ৳50M+ Ad Spend Managed",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=faces",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=280&fit=crop",
    location: "Dhaka, Bangladesh",
    category: "marketing",
    isOpenToWork: true,
    availability: "Part-time / Consulting",
    workPreference: "Remote",
    rateOrSalary: "৳95,000 / mo",
    experienceYears: "5 Years",
    rating: 4.9,
    reviewsCount: 44,
    likesCount: 275,
    skills: ["Meta Ads", "Google Ads", "SEO Strategy", "GA4", "Email Marketing", "Conversion Rate Optimization"],
    about: "Data-driven growth hacker helping direct-to-consumer (D2C) brands and SaaS ventures achieve 4x-7x ROAS. Master of customer cohort analysis, A/B landing page testing, and retention marketing.",
    workHistory: [
      {
        role: "Head of Growth",
        company: "Daraz / Alibaba Group",
        period: "2021 - 2025",
        description: "Orchestrated 11.11 mega campaigns driving over 2.4M app downloads and 400% revenue uplift.",
      },
    ],
    education: [
      {
        degree: "BBA in Marketing & Analytics",
        institution: "IBA, University of Dhaka",
        year: "2016 - 2020",
      },
    ],
    linkedinUrl: "https://linkedin.com/in/nusrat-growth",
    completedProjects: 54,
  },
  {
    id: "talent-5",
    name: "Tanvir Hossain",
    title: "DevOps & Cloud Architect",
    headline: "AWS Certified Solutions Architect • Kubernetes, Terraform, CI/CD pipelines & Security",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=280&fit=crop",
    location: "Dhaka, Bangladesh",
    category: "tech",
    isOpenToWork: true,
    availability: "Immediately Available",
    workPreference: "Remote",
    rateOrSalary: "৳1,50,000 / mo",
    experienceYears: "6+ Years",
    rating: 5.0,
    reviewsCount: 31,
    likesCount: 215,
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Linux", "Cybersecurity"],
    about: "Cloud engineer passionate about high-availability infrastructure (99.99% uptime). Automated dozens of enterprise environments with infrastructure-as-code and zero-downtime blue/green deployments.",
    workHistory: [
      {
        role: "Principal Cloud Engineer",
        company: "Silicon Orchard",
        period: "2022 - 2026",
        description: "Migrated 80+ microservices to Amazon EKS, reducing cloud compute bills by $12,000/month.",
      },
    ],
    education: [
      {
        degree: "B.Sc in CSE",
        institution: "North South University (NSU)",
        year: "2015 - 2019",
      },
    ],
    githubUrl: "https://github.com/tanvir-cloud",
    completedProjects: 40,
  },
  {
    id: "talent-6",
    name: "Sabrina Rahman",
    title: "Senior Product Manager",
    headline: "B2B SaaS & Fintech Product Strategist • 0 to $2M ARR • Agile Scrum Leader",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=faces",
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=280&fit=crop",
    location: "Dhaka, Bangladesh",
    category: "product",
    isOpenToWork: true,
    availability: "Available for Hire",
    workPreference: "Hybrid",
    rateOrSalary: "৳1,60,000 / mo",
    experienceYears: "7 Years",
    rating: 4.9,
    reviewsCount: 35,
    likesCount: 290,
    skills: ["Product Strategy", "User Stories", "Roadmap Planning", "Jira", "SQL", "Market Discovery"],
    about: "Results-driven Product Manager bridging customer pain points with business goals and engineering execution. Led multi-disciplinary squads across engineering, design, and commercial teams.",
    workHistory: [
      {
        role: "Senior Product Manager",
        company: "bKash Merchant Solutions",
        period: "2021 - 2026",
        description: "Expanded merchant QR acceptance network and launched digital nano-lending product line.",
      },
    ],
    education: [
      {
        degree: "MBA in Management Information Systems",
        institution: "BRAC University",
        year: "2018 - 2020",
      },
    ],
    linkedinUrl: "https://linkedin.com/in/sabrina-pm",
    completedProjects: 22,
  },
  {
    id: "talent-7",
    name: "Kazi Rashedul Islam",
    title: "Chartered Financial Analyst & CPA",
    headline: "Corporate Finance, DCF Valuation, Business Auditing & Tax Advisory Specialist",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=faces",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=280&fit=crop",
    location: "Motijheel, Dhaka",
    category: "finance",
    isOpenToWork: true,
    availability: "Contract / Full-time",
    workPreference: "Hybrid",
    rateOrSalary: "৳1,10,000 / mo",
    experienceYears: "5+ Years",
    rating: 4.8,
    reviewsCount: 26,
    likesCount: 167,
    skills: ["Financial Modeling", "Valuation", "Taxation", "QuickBooks", "Excel Modeling", "Audit"],
    about: "Certified financial analyst with deep experience in company valuations, cash flow forecasting, Bangladesh Bank regulatory compliance, and cross-border investor pitch decks.",
    workHistory: [
      {
        role: "Senior Investment Associate",
        company: "IDLC Finance Limited",
        period: "2021 - 2025",
        description: "Prepared dynamic three-statement financial models for 20+ corporate debt syndication deals.",
      },
    ],
    education: [
      {
        degree: "BBA & MBA in Finance",
        institution: "University of Dhaka",
        year: "2015 - 2020",
      },
    ],
    linkedinUrl: "https://linkedin.com/in/kazi-finance",
    completedProjects: 38,
  },
  {
    id: "talent-8",
    name: "Farhan Mahtab",
    title: "AI & Machine Learning Engineer",
    headline: "Specializing in Large Language Models (LLMs), Python, PyTorch & Computer Vision",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&h=300&fit=crop&crop=faces",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=280&fit=crop",
    location: "Riyadh, Saudi Arabia / Dhaka Remote",
    category: "tech",
    isOpenToWork: true,
    availability: "Immediately Available",
    workPreference: "Remote",
    rateOrSalary: "$35 / hr",
    experienceYears: "4 Years",
    rating: 5.0,
    reviewsCount: 41,
    likesCount: 340,
    skills: ["Python", "PyTorch", "OpenAI / LLMs", "FastAPI", "TensorFlow", "HuggingFace", "LangChain"],
    about: "AI specialist building intelligent agents, RAG enterprise search engines, and fine-tuned domain models for Saudi Vision 2030 initiatives and global tech ventures.",
    workHistory: [
      {
        role: "Lead AI Researcher",
        company: "Aramco Tech Innovation Lab",
        period: "2023 - 2026",
        description: "Trained multilingual Arabic-English neural document processing models with 98.4% accuracy.",
      },
    ],
    education: [
      {
        degree: "M.Sc in Artificial Intelligence",
        institution: "King Fahd University of Petroleum & Minerals (KFUPM)",
        year: "2021 - 2023",
      },
    ],
    githubUrl: "https://github.com/farhan-ai",
    completedProjects: 27,
  },
];

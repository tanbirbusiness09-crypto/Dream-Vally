export interface JobItem {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    verified: boolean;
    industry: string;
    size: string;
    followers: string;
  };
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experienceLevel: 'Entry level' | 'Associate' | 'Mid-Senior level' | 'Lead' | 'Director';
  salary: string;
  postedTime: string;
  applicantsCount: number;
  easyApply: boolean;
  connectionsCount?: number;
  skillsMatched: string[];
  totalSkillsCount: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  recruiter: {
    name: string;
    title: string;
    avatar: string;
    responseTime: string;
  };
  featuredBadge?: string;
}

export interface CandidateProfile {
  name: string;
  headline: string;
  avatar: string;
  coverImage: string;
  location: string;
  isOpenToWork: boolean;
  targetRoles: string[];
  profileViews: number;
  postImpressions: number;
  searchAppearances: number;
  profileStrength: number; // percentage
  savedJobIds: string[];
  appliedJobIds: string[];
  skills: string[];
}

export interface HiringCompany {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  openRoles: number;
  isFollowing: boolean;
}

export const INITIAL_USER_PROFILE: CandidateProfile = {
  name: "Shakil Ahmed",
  headline: "Senior Frontend Engineer | React, Next.js, TypeScript & Tailwind | Open for Opportunities",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=250&fit=crop",
  location: "Dhaka, Bangladesh",
  isOpenToWork: true,
  targetRoles: ["Senior Frontend Engineer", "Full Stack Developer", "Tech Lead"],
  profileViews: 324,
  postImpressions: 2180,
  searchAppearances: 78,
  profileStrength: 85,
  savedJobIds: ["job-1", "job-4"],
  appliedJobIds: ["job-3"],
  skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "GraphQL", "Redux", "REST API", "Git", "Figma"],
};

export const TOP_HIRING_COMPANIES: HiringCompany[] = [
  {
    id: "comp-1",
    name: "bKash Limited",
    logo: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&h=100&fit=crop",
    industry: "Fintech & Mobile Financial Services",
    location: "Dhaka, Bangladesh",
    openRoles: 18,
    isFollowing: true,
  },
  {
    id: "comp-2",
    name: "Brain Station 23",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop",
    industry: "Software Engineering & Enterprise Solutions",
    location: "Mohakhali, Dhaka",
    openRoles: 24,
    isFollowing: false,
  },
  {
    id: "comp-3",
    name: "Pathao",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
    industry: "Ride-Sharing, Logistics & E-Commerce",
    location: "Gulshan, Dhaka",
    openRoles: 12,
    isFollowing: true,
  },
  {
    id: "comp-4",
    name: "ShopUp",
    logo: "https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=100&h=100&fit=crop",
    industry: "B2B Commerce & Supply Chain Platform",
    location: "Tejgaon, Dhaka",
    openRoles: 9,
    isFollowing: false,
  },
  {
    id: "comp-5",
    name: "Chaldal",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop",
    industry: "Online Grocery & Supply Chain",
    location: "Dhaka, Bangladesh",
    openRoles: 7,
    isFollowing: false,
  },
];

export const MOCK_LINKEDIN_JOBS: JobItem[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Engineer (Next.js & Node.js)",
    company: {
      name: "bKash Limited",
      logo: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=120&h=120&fit=crop",
      verified: true,
      industry: "Fintech",
      size: "1,001-5,000 employees",
      followers: "380K followers",
    },
    location: "Dhaka, Bangladesh",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Mid-Senior level",
    salary: "৳1,20,000 - ৳1,75,000 / month",
    postedTime: "2 hours ago",
    applicantsCount: 64,
    easyApply: true,
    connectionsCount: 4,
    skillsMatched: ["React", "Next.js", "TypeScript", "Node.js", "REST API", "Git"],
    totalSkillsCount: 8,
    featuredBadge: "Actively Recruiting",
    description: "bKash is looking for an experienced Senior Full Stack Engineer to lead our customer portal front-facing systems and high-throughput transactional APIs. You will collaborate with cross-functional teams to build reliable, high-performance financial interfaces serving over 70 million users.",
    responsibilities: [
      "Architect and implement robust, secure frontend web applications using Next.js, React, and TypeScript.",
      "Develop scalable microservices and RESTful/gRPC APIs using Node.js and PostgreSQL.",
      "Work closely with UI/UX designers to translate Figma wireframes into responsive, pixel-perfect code.",
      "Ensure code security, banking compliance, automated test coverage, and continuous integration.",
      "Mentor junior engineers and lead architectural code reviews.",
    ],
    requirements: [
      "4+ years of professional full-stack development experience.",
      "Strong proficiency in TypeScript, React, Next.js (App Router), and Node.js.",
      "Experience with database design (PostgreSQL / Redis) and message brokers (Kafka/RabbitMQ).",
      "Solid understanding of web security, OAuth2, and fintech compliance standards.",
      "Excellent communication and problem-solving skills.",
    ],
    benefits: [
      "Two festival bonuses + performance bonuses.",
      "Comprehensive medical & life insurance for employee & family.",
      "Hybrid work flexibility (2 days remote per week).",
      "Annual learning & certification budget.",
    ],
    recruiter: {
      name: "Tanvir Rahman",
      title: "Lead Technical Talent Acquisition Partner at bKash",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      responseTime: "Usually responds within 24 hours",
    },
  },
  {
    id: "job-2",
    title: "Lead UI/UX Product Designer",
    company: {
      name: "Pathao",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=120&fit=crop",
      verified: true,
      industry: "Consumer Tech & Logistics",
      size: "501-1,000 employees",
      followers: "240K followers",
    },
    location: "Gulshan-1, Dhaka",
    workMode: "On-site",
    jobType: "Full-time",
    experienceLevel: "Lead",
    salary: "৳1,40,000 - ৳2,00,000 / month",
    postedTime: "5 hours ago",
    applicantsCount: 41,
    easyApply: true,
    connectionsCount: 2,
    skillsMatched: ["Figma", "Design Systems", "User Research"],
    totalSkillsCount: 5,
    featuredBadge: "Hot Opportunity",
    description: "Join Pathao's design studio to craft intuitive, world-class experiences for millions of riders, diners, and merchant partners across Bangladesh and Nepal. You will own the design lifecycle of Pathao Food and Pay platforms.",
    responsibilities: [
      "Lead product design initiatives from discovery and customer journey mapping to final execution.",
      "Maintain, evolve, and govern Pathao's multi-platform Design System.",
      "Conduct qualitative and quantitative user interviews, usability tests, and field studies.",
      "Partner with product managers, data analysts, and engineering teams to validate hypotheses.",
    ],
    requirements: [
      "5+ years designing mobile-first consumer products at scale.",
      "Mastery of Figma, interactive prototyping, and design systems.",
      "Proven track record of turning complex business requirements into elegant user journeys.",
      "Strong portfolio demonstrating user-centric case studies and shipped products.",
    ],
    benefits: [
      "Competitive salary package with ESOP options.",
      "Catered gourmet lunch and snacks daily.",
      "Subsidized Pathao rides and food perks.",
      "Health insurance & flexible wellness days.",
    ],
    recruiter: {
      name: "Samira Chowdhury",
      title: "Senior People & Culture Lead at Pathao",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
      responseTime: "Usually responds within 2 days",
    },
  },
  {
    id: "job-3",
    title: "DevOps & Cloud Infrastructure Engineer (AWS/K8s)",
    company: {
      name: "Brain Station 23",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&h=120&fit=crop",
      verified: true,
      industry: "Software Services & Cloud",
      size: "700+ engineers",
      followers: "190K followers",
    },
    location: "Dhaka, Bangladesh",
    workMode: "Remote",
    jobType: "Full-time",
    experienceLevel: "Mid-Senior level",
    salary: "৳1,10,000 - ৳1,60,000 / month",
    postedTime: "1 day ago",
    applicantsCount: 88,
    easyApply: true,
    connectionsCount: 7,
    skillsMatched: ["Git", "Docker", "Linux"],
    totalSkillsCount: 7,
    featuredBadge: "100% Remote",
    description: "Brain Station 23 is seeking a skilled DevOps & Cloud Engineer to design, deploy, and maintain multi-cloud infrastructure for international enterprise clients in Europe, North America, and the Middle East.",
    responsibilities: [
      "Manage and automate Kubernetes clusters across AWS and Azure environments.",
      "Develop and optimize CI/CD pipelines using GitHub Actions, GitLab CI, and ArgoCD.",
      "Implement Infrastructure as Code (IaC) utilizing Terraform and Ansible.",
      "Monitor infrastructure reliability, security audits, and disaster recovery procedures.",
    ],
    requirements: [
      "3+ years in DevOps/SRE roles managing production cloud workloads.",
      "Hands-on experience with Kubernetes, Docker, Helm, and Terraform.",
      "Strong scripting ability in Bash, Python, or Go.",
      "AWS Certified Solutions Architect or CKA certification is a significant plus.",
    ],
    benefits: [
      "Work from anywhere in Bangladesh (100% Remote).",
      "Provident fund, gratuity, and profit-sharing dividends.",
      "Annual foreign retreat & tech conference sponsorships.",
    ],
    recruiter: {
      name: "Mahmud Hasan",
      title: "Global Tech Hiring Specialist at Brain Station 23",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
      responseTime: "Responds in under 12 hours",
    },
  },
  {
    id: "job-4",
    title: "Senior React Native Mobile App Developer",
    company: {
      name: "ShopUp",
      logo: "https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=120&h=120&fit=crop",
      verified: true,
      industry: "B2B E-Commerce & Retail Tech",
      size: "1,000+ employees",
      followers: "150K followers",
    },
    location: "Tejgaon I/A, Dhaka",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Mid-Senior level",
    salary: "৳1,25,000 - ৳1,80,000 / month",
    postedTime: "2 days ago",
    applicantsCount: 37,
    easyApply: true,
    connectionsCount: 3,
    skillsMatched: ["React", "TypeScript", "Redux", "REST API", "Git"],
    totalSkillsCount: 6,
    featuredBadge: "High Growth",
    description: "Build the next generation of Mokam and RedX logistics apps empowering half a million neighborhood retailers across Bangladesh. You will deliver high performance offline-first mobile apps.",
    responsibilities: [
      "Build fluid iOS and Android mobile experiences using React Native, TypeScript, and Native modules.",
      "Optimize mobile performance, memory leaks, bundle sizes, and startup times.",
      "Integrate offline sync, push notifications, and background location services.",
      "Collaborate with backend engineers to define scalable GraphQL/REST endpoints.",
    ],
    requirements: [
      "3.5+ years building and deploying React Native apps to Google Play Store & Apple App Store.",
      "Deep understanding of React hooks, state management (Redux Toolkit / Zustand), and bridge architecture.",
      "Familiarity with native Android (Kotlin/Java) or iOS (Swift) is desirable.",
    ],
    benefits: [
      "Festival bonuses, gratuity & comprehensive insurance.",
      "Flexible working hours and modern office workspace.",
      "Transport facility and daily subsidized meals.",
    ],
    recruiter: {
      name: "Farhan Kabir",
      title: "Engineering Talent Partner at ShopUp",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=faces",
      responseTime: "Usually responds within 1 day",
    },
  },
  {
    id: "job-5",
    title: "Digital Growth Marketing & Performance Lead",
    company: {
      name: "Chaldal",
      logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop",
      verified: true,
      industry: "E-Commerce & Quick Commerce",
      size: "2,000+ employees",
      followers: "120K followers",
    },
    location: "Dhaka, Bangladesh",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Mid-Senior level",
    salary: "৳90,000 - ৳1,35,000 / month",
    postedTime: "3 days ago",
    applicantsCount: 52,
    easyApply: true,
    connectionsCount: 1,
    skillsMatched: ["Digital Marketing", "Analytics", "Growth Strategy"],
    totalSkillsCount: 6,
    description: "Take ownership of customer acquisition, retention funnels, and paid marketing campaigns across Google, Meta, and TikTok for Bangladesh's pioneer online grocery store.",
    responsibilities: [
      "Manage high-budget performance marketing campaigns driving app installs and conversions.",
      "Analyze customer cohort retention, CAC, LTV, and churn metrics with SQL & Google Analytics 4.",
      "A/B test landing pages, ad creatives, and retention notifications.",
      "Lead cross-functional campaigns during Eid, Ramadan, and seasonal shopping carnivals.",
    ],
    requirements: [
      "3+ years managing 6-figure monthly digital marketing budgets in retail or tech.",
      "Proven track record of optimizing CAC and scaling ROAS.",
      "Deep analytical skills, proficient with GA4, Mixpanel, and Excel/SQL.",
    ],
    benefits: [
      "Special discounts on grocery orders.",
      "Festival bonuses, PF, and health coverage.",
      "Energetic and collaborative startup culture.",
    ],
    recruiter: {
      name: "Nusrat Jahan",
      title: "Talent Specialist at Chaldal",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
      responseTime: "Usually responds within 3 days",
    },
  },
  {
    id: "job-6",
    title: "Senior Product Manager - Merchant Solutions",
    company: {
      name: "bKash Limited",
      logo: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=120&h=120&fit=crop",
      verified: true,
      industry: "Fintech",
      size: "1,001-5,000 employees",
      followers: "380K followers",
    },
    location: "Dhaka, Bangladesh",
    workMode: "Hybrid",
    jobType: "Full-time",
    experienceLevel: "Mid-Senior level",
    salary: "৳1,50,000 - ৳2,20,000 / month",
    postedTime: "3 days ago",
    applicantsCount: 79,
    easyApply: true,
    connectionsCount: 5,
    skillsMatched: ["Product Management", "Agile", "Fintech"],
    totalSkillsCount: 7,
    featuredBadge: "Strategic Role",
    description: "Shape the future of merchant payments in Bangladesh. Lead product vision, roadmap, and delivery for bKash Merchant App and QR ecosystem serving over 600,000 merchants nationwide.",
    responsibilities: [
      "Define 12-month product vision, roadmap, and quarterly OKRs for merchant solutions.",
      "Work intimately with merchants across retail, dining, and wholesale to uncover key friction points.",
      "Partner with engineering, compliance, risk, and commercial teams to launch high-impact features.",
      "Monitor transaction volume, merchant NPS, and API uptime metrics.",
    ],
    requirements: [
      "4+ years of product management experience in fintech, banking, or payments.",
      "Strong analytical mindset with ability to dissect complex data sets into actionable product roadmaps.",
      "Demonstrated ability to drive cross-functional alignment across technical and business leaders.",
    ],
    benefits: [
      "Industry-leading compensation package.",
      "Executive health package & retirement plans.",
      "Company car allowance and fuel benefits.",
    ],
    recruiter: {
      name: "Tanvir Rahman",
      title: "Lead Technical Talent Acquisition Partner at bKash",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      responseTime: "Usually responds within 24 hours",
    },
  },
  {
    id: "job-7",
    title: "Remote Senior Golang Backend Engineer",
    company: {
      name: "Silicon Orchard Ltd",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop",
      verified: true,
      industry: "Software Engineering & Blockchain",
      size: "150-300 employees",
      followers: "45K followers",
    },
    location: "Anywhere in Bangladesh",
    workMode: "Remote",
    jobType: "Full-time",
    experienceLevel: "Mid-Senior level",
    salary: "৳1,30,000 - ৳1,90,000 / month",
    postedTime: "4 days ago",
    applicantsCount: 46,
    easyApply: true,
    connectionsCount: 2,
    skillsMatched: ["REST API", "Git", "Docker", "Linux"],
    totalSkillsCount: 6,
    featuredBadge: "Remote Worldwide",
    description: "We are expanding our core distributed systems engineering group. You will build high-throughput microservices in Go, handling millions of requests per minute for US and European clientele.",
    responsibilities: [
      "Develop ultra-low latency, concurrent backend services using Golang.",
      "Design and maintain scalable database schemas with PostgreSQL and CockroachDB.",
      "Integrate distributed caching (Redis) and streaming pipelines (Apache Kafka).",
      "Write clean, unit-tested, and well-documented clean code.",
    ],
    requirements: [
      "3+ years of professional experience with Golang.",
      "Solid understanding of concurrency patterns (goroutines, channels) and microservices.",
      "Experience with Docker, Kubernetes, and AWS deployment pipelines.",
    ],
    benefits: [
      "100% remote flexibility with home-office setup stipend.",
      "Paid annual leave and health insurance allowance.",
      "Performance bonuses in USD equivalent.",
    ],
    recruiter: {
      name: "Zahirul Islam",
      title: "Head of Talent at Silicon Orchard",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=faces",
      responseTime: "Usually responds in 1 business day",
    },
  },
  {
    id: "job-8",
    title: "Corporate Financial Analyst & Investment Associate",
    company: {
      name: "IDLC Finance Limited",
      logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=120&h=120&fit=crop",
      verified: true,
      industry: "Banking & Financial Services",
      size: "1,500+ employees",
      followers: "98K followers",
    },
    location: "Gulshan-2, Dhaka",
    workMode: "On-site",
    jobType: "Full-time",
    experienceLevel: "Associate",
    salary: "৳80,000 - ৳1,15,000 / month",
    postedTime: "5 days ago",
    applicantsCount: 112,
    easyApply: false,
    connectionsCount: 3,
    skillsMatched: ["Financial Modeling", "Corporate Finance", "Valuation"],
    totalSkillsCount: 5,
    description: "IDLC Finance is hiring an Investment Associate for its Corporate Advisory & Structured Finance division to execute debt syndication, private equity deals, and corporate mergers.",
    responsibilities: [
      "Build detailed dynamic three-statement financial models and DCF valuations.",
      "Draft comprehensive Information Memorandums (IM) and presentation pitch decks for institutional investors.",
      "Conduct industry research and regulatory due diligence.",
      "Liaise with client CFOs, Bangladesh Bank, and securities regulators.",
    ],
    requirements: [
      "BBA or MBA in Finance / Economics from a reputed university.",
      "CFA candidate (Level 1/2 passed) is highly preferred.",
      "1.5 - 3 years experience in investment banking, corporate finance, or private equity.",
      "Advanced Excel modeling and PowerPoint craftsmanship.",
    ],
    benefits: [
      "Attractive festival bonuses and performance incentives.",
      "Staff loans at preferential interest rates.",
      "Extensive leadership training programs.",
    ],
    recruiter: {
      name: "Ayesha Siddiqua",
      title: "Senior HR Business Partner at IDLC",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
      responseTime: "Usually responds within 3 days",
    },
  },
];

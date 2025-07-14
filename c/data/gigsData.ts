export interface Gig {
  id: number;
  title: string;
  description: string;
  category: string;
  images: string[];
  packages: {
    name: string;
    price: number;
    delivery: string;
    revisions: number | string;
    features: string[];
  }[];
  seller: {
    name: string;
    avatar: string;
    level: string;
    rating: number;
    reviews: number;
    memberSince: string;
    languages: string[];
  };
  portfolio: string[];
  reviews: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  tags: string[];
  status: string;
  createdAt: string;
  isSupabaseGig?: boolean;
}

export const allGigsData: Gig[] = [
  {
    id: 1,
    title:
      "I will create a modern and professional website design for your business",
    description:
      "I'm a professional web designer with 5+ years of experience. I'll create a stunning, responsive website that converts visitors into customers. My designs are modern, user-friendly, and optimized for all devices.",
    category: "Graphics & Design",
    images: [
      "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
    ],
    packages: [
      {
        name: "Basic",
        price: 99,
        delivery: "5 days",
        revisions: 2,
        features: [
          "Responsive design",
          "3 pages",
          "Basic SEO",
          "Mobile optimization",
        ],
      },
      {
        name: "Standard",
        price: 199,
        delivery: "7 days",
        revisions: 3,
        features: [
          "Responsive design",
          "5 pages",
          "Advanced SEO",
          "Mobile optimization",
          "Contact form",
          "Social media integration",
        ],
      },
      {
        name: "Premium",
        price: 399,
        delivery: "10 days",
        revisions: "Unlimited",
        features: [
          "Responsive design",
          "10 pages",
          "Premium SEO",
          "Mobile optimization",
          "Contact form",
          "Social media integration",
          "E-commerce ready",
          "Performance optimization",
        ],
      },
    ],
    seller: {
      name: "Sarah Wilson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      level: "Top Rated Seller",
      rating: 4.9,
      reviews: 127,
      memberSince: "March 2020",
      languages: ["English", "Spanish"],
    },
    portfolio: [
      "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "John Smith",
        rating: 5,
        comment:
          "Amazing work! Sarah delivered exactly what I needed for my business website.",
        date: "2 weeks ago",
      },
    ],
    tags: ["website", "design", "web design", "responsive", "business"],
    status: "active",
    createdAt: "2025-01-15",
  },
  {
    id: 2,
    title: "I will develop a custom WordPress website with premium theme",
    description:
      "Specialized WordPress developer offering custom website development. I'll build a fast, secure, and SEO-optimized WordPress site tailored to your needs.",
    category: "Programming & Tech",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    ],
    packages: [
      {
        name: "Basic",
        price: 149,
        delivery: "7 days",
        revisions: 2,
        features: [
          "Custom WordPress setup",
          "Premium theme",
          "Basic plugins",
          "Responsive design",
        ],
      },
      {
        name: "Standard",
        price: 299,
        delivery: "10 days",
        revisions: 3,
        features: [
          "Custom WordPress setup",
          "Premium theme",
          "Advanced plugins",
          "Responsive design",
          "SEO optimization",
          "Security setup",
        ],
      },
      {
        name: "Premium",
        price: 499,
        delivery: "14 days",
        revisions: "Unlimited",
        features: [
          "Custom WordPress setup",
          "Premium theme",
          "All plugins",
          "Responsive design",
          "SEO optimization",
          "Security setup",
          "E-commerce integration",
          "Performance optimization",
        ],
      },
    ],
    seller: {
      name: "Mike Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      level: "Level 2 Seller",
      rating: 4.8,
      reviews: 89,
      memberSince: "June 2025",
      languages: ["English"],
    },
    portfolio: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "Emma Davis",
        rating: 5,
        comment:
          "Mike built an amazing WordPress site for my business. Highly recommended!",
        date: "1 week ago",
      },
    ],
    tags: ["wordpress", "website", "development", "cms", "responsive"],
    status: "active",
    createdAt: "2025-02-01",
  },
  {
    id: 3,
    title: "I will design a professional logo for your brand identity",
    description:
      "Professional logo designer with a passion for creating memorable brand identities. I'll design a unique logo that represents your brand perfectly.",
    category: "Graphics & Design",
    images: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop",
    ],
    packages: [
      {
        name: "Basic",
        price: 25,
        delivery: "3 days",
        revisions: 2,
        features: [
          "Logo design",
          "High resolution files",
          "Commercial license",
        ],
      },
      {
        name: "Standard",
        price: 50,
        delivery: "2 days",
        revisions: 3,
        features: [
          "Logo design",
          "High resolution files",
          "Commercial license",
          "Vector files",
          "3 concepts",
        ],
      },
      {
        name: "Premium",
        price: 100,
        delivery: "1 day",
        revisions: "Unlimited",
        features: [
          "Logo design",
          "High resolution files",
          "Commercial license",
          "Vector files",
          "5 concepts",
          "Brand guidelines",
          "Social media kit",
        ],
      },
    ],
    seller: {
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      level: "Top Rated Seller",
      rating: 4.9,
      reviews: 234,
      memberSince: "January 2019",
      languages: ["English", "Mandarin"],
    },
    portfolio: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "David Johnson",
        rating: 5,
        comment:
          "Alex created the perfect logo for my startup. Incredible attention to detail!",
        date: "3 days ago",
      },
    ],
    tags: ["logo", "design", "branding", "identity", "graphics"],
    status: "active",
    createdAt: "2025-01-20",
  },
  {
    id: 4,
    title: "I will edit your videos professionally with motion graphics",
    description:
      "Professional video editor specializing in YouTube videos, commercials, and social media content. I'll make your videos stand out with professional editing and motion graphics.",
    category: "Video & Animation",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    ],
    packages: [
      {
        name: "Basic",
        price: 75,
        delivery: "5 days",
        revisions: 2,
        features: [
          "Video editing",
          "Color correction",
          "Audio sync",
          "Basic transitions",
        ],
      },
      {
        name: "Standard",
        price: 150,
        delivery: "7 days",
        revisions: 3,
        features: [
          "Video editing",
          "Color correction",
          "Audio sync",
          "Advanced transitions",
          "Motion graphics",
          "Text animations",
        ],
      },
      {
        name: "Premium",
        price: 300,
        delivery: "10 days",
        revisions: "Unlimited",
        features: [
          "Video editing",
          "Color correction",
          "Audio sync",
          "Advanced transitions",
          "Motion graphics",
          "Text animations",
          "Sound design",
          "Custom effects",
        ],
      },
    ],
    seller: {
      name: "Jessica Martinez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      level: "Level 2 Seller",
      rating: 4.7,
      reviews: 156,
      memberSince: "September 2020",
      languages: ["English", "Spanish"],
    },
    portfolio: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "Mark Thompson",
        rating: 5,
        comment:
          "Jessica transformed my raw footage into an amazing promotional video!",
        date: "5 days ago",
      },
    ],
    tags: ["video", "editing", "motion graphics", "youtube", "social media"],
    status: "active",
    createdAt: "2025-02-10",
  },
  {
    id: 5,
    title: "I will develop a mobile app for iOS and Android",
    description:
      "Mobile app developer with expertise in React Native and Flutter. I'll create a high-quality mobile app that works perfectly on both iOS and Android platforms.",
    category: "Programming & Tech",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    ],
    packages: [
      {
        name: "Basic",
        price: 500,
        delivery: "21 days",
        revisions: 2,
        features: [
          "React Native app",
          "Basic features",
          "iOS & Android",
          "Source code",
        ],
      },
      {
        name: "Standard",
        price: 1000,
        delivery: "30 days",
        revisions: 3,
        features: [
          "React Native app",
          "Advanced features",
          "iOS & Android",
          "Source code",
          "API integration",
          "Push notifications",
        ],
      },
      {
        name: "Premium",
        price: 2000,
        delivery: "45 days",
        revisions: "Unlimited",
        features: [
          "React Native app",
          "Premium features",
          "iOS & Android",
          "Source code",
          "API integration",
          "Push notifications",
          "App store submission",
          "Analytics integration",
        ],
      },
    ],
    seller: {
      name: "Raj Patel",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      level: "Top Rated Seller",
      rating: 4.8,
      reviews: 67,
      memberSince: "April 2025",
      languages: ["English", "Hindi"],
    },
    portfolio: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "Lisa Wang",
        rating: 5,
        comment:
          "Raj delivered an excellent mobile app that exceeded my expectations!",
        date: "1 week ago",
      },
    ],
    tags: ["mobile app", "ios", "android", "react native", "development"],
    status: "active",
    createdAt: "2025-02-15",
  },
  {
    id: 6,
    title: "I will do complete SEO optimization for your website",
    description:
      "SEO specialist with proven track record of improving website rankings. I'll optimize your website to rank higher on Google and drive more organic traffic.",
    category: "Digital Marketing",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
    ],
    packages: [
      {
        name: "Basic",
        price: 80,
        delivery: "7 days",
        revisions: 2,
        features: [
          "Keyword research",
          "On-page SEO",
          "Meta tags optimization",
          "SEO audit",
        ],
      },
      {
        name: "Standard",
        price: 160,
        delivery: "14 days",
        revisions: 3,
        features: [
          "Keyword research",
          "On-page SEO",
          "Meta tags optimization",
          "SEO audit",
          "Content optimization",
          "Link building",
        ],
      },
      {
        name: "Premium",
        price: 320,
        delivery: "21 days",
        revisions: "Unlimited",
        features: [
          "Keyword research",
          "On-page SEO",
          "Meta tags optimization",
          "SEO audit",
          "Content optimization",
          "Link building",
          "Technical SEO",
          "Monthly reports",
        ],
      },
    ],
    seller: {
      name: "Tom Anderson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      level: "Level 2 Seller",
      rating: 4.6,
      reviews: 143,
      memberSince: "August 2020",
      languages: ["English"],
    },
    portfolio: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "Amy Brown",
        rating: 5,
        comment:
          "Tom's SEO work helped my website rank on the first page of Google!",
        date: "2 weeks ago",
      },
    ],
    tags: ["seo", "search engine optimization", "google", "ranking", "traffic"],
    status: "active",
    createdAt: "2025-01-25",
  },
  {
    id: 7,
    title: "I will provide advanced SEO content writing and optimization",
    description:
      "Expert SEO content writer with 7+ years of experience. I'll create high-quality, keyword-optimized content that ranks on Google and converts readers into customers.",
    category: "Digital Marketing",
    images: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
    ],
    packages: [
      {
        name: "Basic",
        price: 95,
        delivery: "5 days",
        revisions: 2,
        features: [
          "5 SEO articles (500 words each)",
          "Keyword research",
          "Meta descriptions",
          "SEO optimization",
        ],
      },
      {
        name: "Standard",
        price: 185,
        delivery: "7 days",
        revisions: 3,
        features: [
          "10 SEO articles (750 words each)",
          "Advanced keyword research",
          "Meta descriptions",
          "Internal linking strategy",
          "Content calendar",
        ],
      },
      {
        name: "Premium",
        price: 350,
        delivery: "10 days",
        revisions: "Unlimited",
        features: [
          "20 SEO articles (1000 words each)",
          "Comprehensive keyword research",
          "Meta descriptions",
          "Internal linking strategy",
          "Content calendar",
          "Competitor analysis",
          "Performance tracking",
        ],
      },
    ],
    seller: {
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      level: "Top Rated Seller",
      rating: 4.9,
      reviews: 189,
      memberSince: "February 2019",
      languages: ["English", "French"],
    },
    portfolio: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "TechStartup2025",
        rating: 5,
        comment:
          "Emma's SEO content helped us rank #1 for our main keywords. Traffic increased by 300%!",
        date: "1 week ago",
      },
      {
        id: 2,
        user: "LocalBusiness",
        rating: 5,
        comment:
          "Professional content writing with excellent SEO optimization. Highly recommended!",
        date: "2 weeks ago",
      },
    ],
    tags: [
      "seo",
      "content writing",
      "google ranking",
      "keyword optimization",
      "blog writing",
    ],
    status: "active",
    createdAt: "2025-01-28",
  },
  {
    id: 8,
    title: "I will create a complete SEO strategy and implementation plan",
    description:
      "SEO strategist with 10+ years of experience helping businesses dominate search results. I'll create a comprehensive SEO strategy tailored to your industry and goals.",
    category: "Digital Marketing",
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?w=600&h=400&fit=crop",
    ],
    packages: [
      {
        name: "Basic",
        price: 125,
        delivery: "5 days",
        revisions: 2,
        features: [
          "SEO audit",
          "Keyword research",
          "Basic strategy document",
          "Technical SEO checklist",
        ],
      },
      {
        name: "Standard",
        price: 245,
        delivery: "7 days",
        revisions: 3,
        features: [
          "Comprehensive SEO audit",
          "Advanced keyword research",
          "Detailed strategy document",
          "Technical SEO implementation",
          "Competitor analysis",
          "Content strategy",
        ],
      },
      {
        name: "Premium",
        price: 495,
        delivery: "14 days",
        revisions: "Unlimited",
        features: [
          "Full SEO audit",
          "Advanced keyword research",
          "Complete strategy document",
          "Technical SEO implementation",
          "Competitor analysis",
          "Content strategy",
          "Link building plan",
          "Monthly consulting calls",
        ],
      },
    ],
    seller: {
      name: "Marcus Johnson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      level: "Top Rated Seller",
      rating: 4.9,
      reviews: 256,
      memberSince: "January 2018",
      languages: ["English"],
    },
    portfolio: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "E-commerceBrand",
        rating: 5,
        comment:
          "Marcus delivered an incredible SEO strategy that doubled our organic traffic in 3 months!",
        date: "3 days ago",
      },
      {
        id: 2,
        user: "SaaSCompany",
        rating: 5,
        comment:
          "Professional, detailed, and results-driven. Best SEO consultant we've worked with.",
        date: "1 week ago",
      },
    ],
    tags: [
      "seo strategy",
      "search engine optimization",
      "seo audit",
      "keyword research",
      "digital marketing",
    ],
    status: "active",
    createdAt: "2025-02-05",
  },
  {
    id: 9,
    title: "I will build high-quality SEO backlinks for better rankings",
    description:
      "White-hat SEO link building specialist. I'll help you earn high-authority backlinks that improve your search rankings and drive organic traffic to your website.",
    category: "Digital Marketing",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
    ],
    packages: [
      {
        name: "Basic",
        price: 85,
        delivery: "10 days",
        revisions: 1,
        features: [
          "10 high-quality backlinks",
          "DR 30+ domains",
          "White-hat techniques",
          "Detailed report",
        ],
      },
      {
        name: "Standard",
        price: 165,
        delivery: "14 days",
        revisions: 2,
        features: [
          "25 high-quality backlinks",
          "DR 40+ domains",
          "White-hat techniques",
          "Detailed report",
          "Competitor analysis",
          "Link building strategy",
        ],
      },
      {
        name: "Premium",
        price: 325,
        delivery: "21 days",
        revisions: 3,
        features: [
          "50 high-quality backlinks",
          "DR 50+ domains",
          "White-hat techniques",
          "Detailed report",
          "Competitor analysis",
          "Link building strategy",
          "Guest posting",
          "Monthly maintenance",
        ],
      },
    ],
    seller: {
      name: "Sofia Martinez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      level: "Level 2 Seller",
      rating: 4.8,
      reviews: 167,
      memberSince: "May 2020",
      languages: ["English", "Spanish"],
    },
    portfolio: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=300&h=300&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        user: "DigitalAgency",
        rating: 5,
        comment:
          "Sofia's link building strategy improved our client's rankings significantly. Great quality backlinks!",
        date: "5 days ago",
      },
      {
        id: 2,
        user: "OnlineStore",
        rating: 4,
        comment:
          "Professional service with detailed reporting. Saw improvement in search rankings within a month.",
        date: "2 weeks ago",
      },
    ],
    tags: [
      "seo",
      "backlinks",
      "link building",
      "white hat seo",
      "domain authority",
    ],
    status: "active",
    createdAt: "2025-02-12",
  },
];

export const getGigById = (id: number): Gig | null => {
  return allGigsData.find((gig) => gig.id === id) || null;
};

export const getGigsByCategory = (category: string): Gig[] => {
  return allGigsData.filter((gig) =>
    gig.category.toLowerCase().includes(category.toLowerCase())
  );
};

export const searchGigs = (query: string): Gig[] => {
  const lowercaseQuery = query.toLowerCase();
  return allGigsData.filter(
    (gig) =>
      gig.title.toLowerCase().includes(lowercaseQuery) ||
      gig.description.toLowerCase().includes(lowercaseQuery) ||
      gig.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      gig.category.toLowerCase().includes(lowercaseQuery)
  );
};

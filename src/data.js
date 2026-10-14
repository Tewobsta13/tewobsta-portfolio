export const PORTRAIT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9YeSUe-HbI_cXvU3UCoQ0VUGD5tEK7yNOpV2Q4eridbGBcgMPLYA6D38VZDjckz9HuGhRp4VNQzUqOpvnhFKdUKjPcxdOq3FJNUoolvZshxT2wYB89xOshU_-AiuuJqYBOfoe1WrFIj5Oy730l-fZ5PGBCQZu2Od5yZpJOIAUYSvcYo-CqfqS9RKtn34R4Bq-AZmb5axRMz_QwwThyrihYY7rRT18wyadmcBm-j7Ix5rsIzyOL5Kz";
export const GITHUB = "https://github.com/Tewobsta13";
export const NAV = [
  ["story", "Story"],
  ["work", "Work"],
  ["engineering", "Engineering"],
  ["stack", "Stack"],
  ["contact", "Contact"],
];

export const HOOK_QUESTIONS = [
  "How do I design software that remains maintainable as it grows?",
  "How should frontend, backend, APIs, and databases work together?",
  "How do I build authentication and data flows that are secure and reliable?",
  "How can I turn real-world problems into well-structured software?",
];

export const TIMELINE = [
  [
    "2020 // ORIGIN",
    "Early Curiosity & First Lines",
    "Began learning programming in high school, starting with Java and NetBeans. Discovered the satisfaction of instructing a computer and watching logic turn into execution.",
    "memory",
    "Java · Desktop Applications · Algorithmic Basics",
  ],

  [
    "2023 // ACADEMIA",
    "Addis Ababa University — B.Sc. Software Engineering",
    "Enrolled in the 5-year Software Engineering program at Addis Ababa University. University coursework has strengthened my foundation in data structures, algorithms, operating systems, databases, networking, and software engineering principles.",
    "account_balance",
    "DSA · Operating Systems · Databases · Networking · Software Engineering",
  ],
  [
    "2025 // EXPANSION",
    "Evangadi Full-Stack Scholarship",
    "Earned a selective opportunity through the Evangadi full-stack scholarship. Spent six months developing with JavaScript, building Express servers, working with SQL databases, and developing full-stack web applications.",
    "school",
    "React · Node.js · Express · SQL · Full-Stack Development",
  ],

  [
    "2026 // EXPERIENCE",
    "INSA Summer Camp — Web Development",
    "Selected for a three-month INSA Summer Camp focused on web development. Completed the initial one-month training phase and moved into the project phase, applying what I learned to build practical software and strengthen my engineering skills.",
    "school",
    "Web Development · React · JavaScript · Backend · Software Engineering",
  ],

  [
    "TODAY // BUILDING",
    "Continuous Learning & Systems Exploration",
    "Continuing to strengthen my software engineering fundamentals while building practical web applications. Currently deepening my understanding of JavaScript, React, backend development, databases, system design, and the engineering principles behind reliable software.",
    "rocket_launch",
    "JavaScript · React · Node.js · SQL · System Design · Software Engineering",
  ],
];

export const FILTERS = [
  ["all", "All (7)"],
  ["fullstack", "Full-Stack"],
  ["systems", "Systems & APIs"],
  ["ui", "UI Engineering"],
];

export const PROJECTS = [
  {
    cat: "fullstack commerce",
    span: "md:col-span-12",
    kicker: "01 // FULL-STACK COMMERCE",
    title: "Amazon Full-Stack Clone",
    size: "xl",
    desc: "An e-commerce application built with React and Express, integrating product data through an Amazon API and implementing user authentication across the shopping experience.",
    boxes: [
      [
        "Frontend",
        "React-based shopping interface for browsing products and interacting with the store.",
      ],
      [
        "Backend & Authentication",
        "Express backend supporting application endpoints and authentication workflows.",
      ],
    ],
    tags: ["React", "Node.js", "Express", "Amazon API", "Authentication"],
    link: "View Source Code",
    note: "Architecture: React Client → Express API → External Product API",
    flow: [
      ["React Client", "Product Interface"],
      ["Express API", "Application Logic"],
      ["Amazon API", "Product Data"],
    ],
  },

  {
    cat: "ui api",
    span: "md:col-span-7",
    kicker: "02 // STREAMING EXPERIENCE",
    title: "Netflix Clone",
    size: "lg",
    desc: "A React-based streaming discovery interface that integrates a movie API to display titles, support browsing and search, and present movie information in a cinematic layout.",
    tags: ["React", "JavaScript", "Movie API", "CSS"],
    link: "View Project",
  },

  {
    cat: "systems civic-tech",
    span: "md:col-span-5",
    kicker: "03 // PERSONAL SAFETY",
    badge: "Civic Tech",
    title: "SafetyGuard Ethiopia",
    size: "lg",
    quote: "One tap. One signal. Help is on the way.",
    desc: "A safety-focused application concept designed to make emergency signaling and location sharing more accessible, with an emphasis on practical use in the Ethiopian context.",
    boxes: [
      [
        "Core Focus",
        "Emergency signaling, location-aware assistance, and a simple user experience for requesting help.",
      ],
    ],
    tags: ["Safety", "Geolocation", "Emergency Response"],
    link: "View GitHub Repo",
    url: "https://github.com/Tewobsta13/sosapp",
  },

  {
    cat: "fullstack ai",
    span: "md:col-span-6",
    kicker: "04 // AI-POWERED COMMUNITY",
    title: "Evangadi Forum",
    size: "md",
    desc: "A full-stack question-and-answer platform combining community discussions, backend services, relational data, and AI-integrated functionality.",
    tags: ["React", "Node.js", "Express", "SQL", "AI Integration"],
    link: "Explore Project",
  },

  {
    cat: "systems geolocation",
    span: "md:col-span-6",
    kicker: "05 // URBAN MOBILITY",
    title: "Taxi Route & Dispatch",
    size: "md",
    desc: "A taxi-focused application exploring urban routes, location-based information, and route planning through mapping and routing services.",
    tags: ["React", "TypeScript", "Geolocation", "Routing API"],
    link: "View GitHub Repo",
    url: "https://github.com/Tewobsta13/taxi",
  },

  {
    cat: "fullstack commerce",
    span: "md:col-span-7",
    kicker: "06 // FOOD & DELIVERY",
    title: "Food Delivery Platform",
    size: "lg",
    desc: "A full-stack food delivery application built around a React frontend, Express backend, and MongoDB database, connecting the user interface with server-side application data.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    link: "View Project",
  },

  {
    cat: "client work ui",
    span: "md:col-span-5",
    kicker: "07 // CLIENT PROJECT · BAHIR DAR",
    title: "Pest Control Website",
    size: "lg",
    desc: "A professional website for a Bahir Dar pest-control business, built to present its services clearly and make it easy for customers to get in touch.",
    boxes: [
      [
        "Frontend Engineering",
        "React and TypeScript for a structured, maintainable interface.",
      ],
      [
        "Business Focus",
        "Service information, responsive layouts, and clear contact pathways.",
      ],
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Business Website"],
    link: "View Live Website",
  },
];

export const PIPELINE = [
  [
    "UI LAYER",
    "NODE 01: THE PRESENTATION LAYER",
    "DOM · VIRTUAL DOM · HYDRATION",
    "Component Reconciliation & State Trees",
    "Beyond JSX syntax: managing memory overhead during re-renders, understanding fiber reconciliation algorithms, event propagation bubbling, and avoiding unnecessary layout thrashing during synchronous DOM mutations.",
  ],
  [
    "HTTP WIRE",
    "NODE 02: THE TRANSPORT & WIRE PROTOCOL",
    "TCP/IP · TLS 1.3 · HEADERS",
    "Stateless Protocol Semantics & Network Handshakes",
    "DNS query resolution, 3-way TCP SYN/ACK handshakes, TLS cipher negotiation, and HTTP/1.1 vs HTTP/2 multiplexing. Understanding why caching headers (ETag, Cache-Control) dictate real-world latency over long-haul connections.",
  ],
  [
    "API GATEWAY",
    "NODE 03: CONTRACTS & SERIALIZATION",
    "REST · IDEMPOTENCY · JSON PARSING",
    "Interface Boundaries & Contract Discipline",
    "Enforcing strict idempotency on PUT and DELETE requests, defensive schema validation via middleware, rate limiting tokens, and handling cross-origin CORS preflight OPTIONS handshakes gracefully.",
  ],
  [
    "RUNTIME",
    "NODE 04: EXECUTION RUNTIME",
    "EVENT LOOP · LIBUV · WORKER THREADS",
    "Node.js Single-Threaded Non-Blocking I/O",
    "Dissecting the V8 engine call stack, macrotask vs microtask queues, process tick semantics, and why CPU-heavy hashing tasks must be offloaded to threadpools to prevent event loop starvation.",
  ],
  [
    "DATABASE",
    "NODE 05: PERSISTENCE & STORAGE ENGINES",
    "B-TREES · ACID TRANSACTIONS · LSM TREES",
    "Index Seek vs Scan & Storage Guarantees",
    "Understanding disk page alignment, compound index cardinality, write-ahead logs (WAL) for durability, and comparing relational ACID constraints with document-store eventual consistency.",
  ],
  [
    "OS / HARDWARE",
    "NODE 06: OPERATING SYSTEM & PROCESSES",
    "FILE DESCRIPTORS · IPC · THREADS",
    "POSIX Abstractions & Kernel Boundary Context Switches",
    "Memory paging, kernel ring context transitions, epoll socket multiplexing, and how OS scheduling allocates precious CPU cycles to server daemon processes under concurrent load.",
  ],
];

export const FOUNDATIONS = [
  [
    "HTTP SPECIFICATION",
    "Headers, status codes, keep-alive, streaming, and idempotency guarantees.",
  ],
  [
    "COMPUTER NETWORKING",
    "OSI layers, TCP handshake, packet routing, DNS, and latency mechanics.",
  ],
  [
    "DATABASE INTERNALS",
    "Indexing algorithms, normalization vs denormalization, and execution plans.",
  ],
  [
    "AUTHENTICATION & SECURITY",
    "JWT validation, symmetric/asymmetric signatures, sessions, CSRF, and XSS.",
  ],
  [
    "OPERATING SYSTEMS",
    "Process concurrency, memory virtual paging, thread safety, and system calls.",
  ],
  [
    "DATA STRUCTURES & ALGORITHMS",
    "Time/space complexity, asymptotic analysis, graph search, and tree traversal.",
  ],
];

export const STACK = [
  {
    title: "BUILDING WITH",
    badge: "ACTIVE WORK",
    badgeCls: "bg-primary-container/20 text-primary",
    chip: "bg-surface-container-highest text-on-surface",
    desc: "Technologies applied regularly in production projects, web prototypes, and verified architectures:",
    foot: "FLUENCY: Rapid feature delivery & debug loops",
    items: [
      "React.js",
      "JavaScript (ES6+)",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB & Mongoose",
      "SQL (MySQL)",
      "Tailwind CSS",
      "Git / GitHub CLI",
      "RESTful Architecture",
    ],
  },
  {
    title: "LEARNING DEEPLY",
    badge: "RIGOROUS STUDY",
    badgeCls: "bg-secondary-container/40 text-secondary",
    chip: "bg-surface-container-high text-on-surface border border-outline-variant/20",
    desc: "Foundational computing principles and systemic layers explored systematically through AAU courses and texts:",
    foot: "OBJECTIVE: First-principles engineering mastery",
    items: [
      "Data Structures & Algorithms",
      "Computer Networks",
      "Operating Systems",
      "Database Internals",
      "Backend Scalability",
      "Go (Golang)",
      "Python",
      "Java (OOP)",
    ],
  },
  {
    title: "EXPLORING",
    badge: "HORIZONS",
    badgeCls: "bg-surface-container-highest text-on-surface-variant",
    chip: "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30",
    desc: "Engagements with wider global ecosystems, modern paradigms, and open innovation:",
    foot: "HORIZON: International software collaboration",
    items: [
      "Open Source Ecosystems",
      "Distributed System Design",
      "GDG Developer Community",
      "Competitive Hackathons",
      "Microservices Patterns",
    ],
  },
];

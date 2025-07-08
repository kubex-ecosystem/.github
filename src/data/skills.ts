import { Skill } from '../types';

export const skillIcons = {
  js: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/javascript.svg',
  ts: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/typescript.svg',
  python: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/python.svg',
  go: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/go.svg',
  java: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/java.svg',
  dart: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/dart.svg',
  php: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/php.svg',
  cs: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/csharp.svg',
  react: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/react.svg',
  nextjs: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/nextdotjs.svg',
  nodejs: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/node-dot-js.svg',
  express: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/express.svg',
  flutter: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/flutter.svg',
  django: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/django.svg',
  flask: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/flask.svg',
  vue: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/vue-dot-js.svg',
  angular: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/angular.svg',
  aws: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/amazonaws.svg',
  azure: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/microsoftazure.svg',
  docker: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/docker.svg',
  kubernetes: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/kubernetes.svg',
  terraform: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/terraform.svg',
  postgresql: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/postgresql.svg',
  oracle: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/oracle.svg',
  sqlserver: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/microsoftsqlserver.svg',
  mongodb: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/mongodb.svg',
  redis: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/redis.svg',
  mysql: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/mysql.svg',
  sqlite: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/sqlite.svg',
  git: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/git.svg',
  github: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/github.svg',
  postman: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/postman.svg',
  figma: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/figma.svg',
};

export const skillDescriptions: Record<string, string> = {
  js: "JavaScript is a versatile programming language primarily used for web development.",
  ts: "TypeScript is a superset of JavaScript that adds static typing and modern features.",
  python: "Python is a high-level programming language known for its readability and versatility.",
  go: "Go is a statically typed, compiled language designed for simplicity and efficiency.",
  java: "Java is a widely-used object-oriented programming language known for its portability.",
  dart: "Dart is an object-oriented language optimized for building mobile, desktop, and web applications.",
  php: "PHP is a server-side scripting language designed for web development.",
  cs: "C# is a modern, object-oriented programming language developed by Microsoft.",
  react: "React is a JavaScript library for building user interfaces, particularly single-page applications.",
  nextjs: "Next.js is a React framework that enables server-side rendering and static site generation.",
  nodejs: "Node.js is a JavaScript runtime built on Chrome's V8 engine, allowing server-side scripting.",
  express: "Express is a minimal and flexible Node.js web application framework providing robust features.",
  flutter: "Flutter is an open-source UI software development toolkit created by Google for building natively compiled applications.",
  django: "Django is a high-level Python web framework that encourages rapid development and clean design.",
  flask: "Flask is a lightweight WSGI web application framework in Python, designed to make getting started quick and easy.",
  vue: "Vue.js is a progressive JavaScript framework for building user interfaces and single-page applications.",
  angular: "Angular is a platform for building mobile and desktop web applications using TypeScript.",
  aws: "Amazon Web Services (AWS) provides on-demand cloud computing platforms and APIs to individuals, companies, and governments.",
  azure: "Microsoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications through Microsoft-managed data centers.",
  docker: "Docker is an open platform for developing, shipping, and running applications in containers.",
  kubernetes: "Kubernetes is an open-source system for automating the deployment, scaling, and management of containerized applications.",
  terraform: "Terraform is an open-source infrastructure as code software tool that provides a consistent CLI workflow to manage hundreds of cloud services.",
  postgresql: "PostgreSQL is an open-source relational database management system emphasizing extensibility and SQL compliance.",
  oracle: "Oracle Database is a multimodel database management system produced and marketed by Oracle Corporation.",
  sqlserver: "Microsoft SQL Server is a relational database management system developed by Microsoft.",
  mongodb: "MongoDB is a source-available cross-platform document-oriented database program, classified as a NoSQL database.",
  redis: "Redis is an open-source, in-memory data structure store, used as a database, cache, and message broker.",
  mysql: "MySQL is an open-source relational database management system based on SQL (Structured Query Language).",
  sqlite: "SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.",
  git: "Git is a distributed version control system for tracking changes in source code during software development.",
  github: "GitHub is a web-based platform used for version control and collaboration, allowing multiple people to work on projects at once.",
  postman: "Postman is a collaboration platform for API development, providing tools for building, testing, and documenting APIs.",
  figma: "Figma is a web-based UI/UX design application that allows for collaborative design and prototyping.",
};

export const skillCategoryIcons: Record<string, string> = {
  all: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/all.svg',
  language: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/language.svg',
  framework: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/framework.svg',
  tool: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/tool.svg',
  cloud: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/cloud.svg',
  database: 'https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/database.svg',
};

export const skillLevels = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
  4: "Expert",
  5: "Master",
};

export const skillLevelDescriptions: Record<number, string> = {
  1: "Basic understanding and ability to write simple code.",
  2: "Can build small projects and understand core concepts.",
  3: "Proficient in building applications and solving complex problems.",
  4: "Expert in the technology with significant project experience.",
  5: "Mastery of the technology, able to teach and mentor others.",
};

export const skillLevelIcons: Record<number, string> = {
  1: "https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/level-1.svg",
  2: "https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/level-2.svg",
  3: "https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/level-3.svg",
  4: "https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/level-4.svg",
  5: "https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/level-5.svg",
};

export const skillLevelColors: Record<number, string> = {
  1: "#ffcc00", // Yellow
  2: "#ff9900", // Orange
  3: "#33cc33", // Green
  4: "#0099ff", // Blue
  5: "#9933ff", // Purple
};

export const skillLevelStyles: Record<number, string> = {
  1: "bg-yellow-100 text-yellow-800",
  2: "bg-orange-100 text-orange-800",
  3: "bg-green-100 text-green-800",
  4: "bg-blue-100 text-blue-800",
  5: "bg-purple-100 text-purple-800",
};

export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", level: 5, category: "language", icon: "js" },
  { name: "TypeScript", level: 5, category: "language", icon: "ts" },
  { name: "Python", level: 4, category: "language", icon: "python" },
  { name: "Go", level: 4, category: "language", icon: "go" },
  { name: "Java", level: 3, category: "language", icon: "java" },
  { name: "Dart", level: 4, category: "language", icon: "dart" },
  { name: "PHP", level: 3, category: "language", icon: "php" },
  { name: "C#", level: 3, category: "language", icon: "cs" },

  // Frameworks
  { name: "React", level: 5, category: "framework", icon: "react" },
  { name: "Next.js", level: 5, category: "framework", icon: "nextjs" },
  { name: "Node.js", level: 5, category: "framework", icon: "nodejs" },
  { name: "Express", level: 5, category: "framework", icon: "express" },
  { name: "Flutter", level: 4, category: "framework", icon: "flutter" },
  { name: "Django", level: 3, category: "framework", icon: "django" },
  { name: "Flask", level: 4, category: "framework", icon: "flask" },
  { name: "Vue.js", level: 3, category: "framework", icon: "vue" },
  { name: "Angular", level: 3, category: "framework", icon: "angular" },

  // Cloud & DevOps
  { name: "AWS", level: 4, category: "cloud", icon: "aws" },
  { name: "Azure", level: 3, category: "cloud", icon: "azure" },
  { name: "Docker", level: 5, category: "tool", icon: "docker" },
  { name: "Kubernetes", level: 4, category: "tool", icon: "kubernetes" },
  { name: "Terraform", level: 3, category: "tool", icon: "terraform" },

  // Databases
  { name: "PostgreSQL", level: 5, category: "database", icon: "postgresql" },
  { name: "Oracle", level: 5, category: "database", icon: "oracle" },
  { name: "SQL Server", level: 5, category: "database", icon: "sqlserver" },
  { name: "MongoDB", level: 5, category: "database", icon: "mongodb" },
  { name: "Redis", level: 4, category: "database", icon: "redis" },
  { name: "MySQL", level: 5, category: "database", icon: "mysql" },
  { name: "SQLite", level: 4, category: "database", icon: "sqlite" },

  // Tools
  { name: "Git", level: 5, category: "tool", icon: "git" },
  { name: "GitHub Actions", level: 4, category: "tool", icon: "github" },
  { name: "Postman", level: 4, category: "tool", icon: "postman" },
  { name: "Figma", level: 3, category: "tool", icon: "figma" },
];

export const skillCategories = [
  { id: 'all', label: 'All Skills', count: skills.length },
  { id: 'language', label: 'Languages', count: skills.filter(s => s.category === 'language').length },
  { id: 'framework', label: 'Frameworks', count: skills.filter(s => s.category === 'framework').length },
  { id: 'tool', label: 'Tools', count: skills.filter(s => s.category === 'tool').length },
  { id: 'cloud', label: 'Cloud & DevOps', count: skills.filter(s => s.category === 'cloud' || s.category === 'tool').length },
  { id: 'database', label: 'Databases', count: skills.filter(s => s.category === 'database').length },
];

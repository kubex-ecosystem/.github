import { Skill } from "../types";
import {
    siAngular,
    siDart,
    siDjango,
    siDocker,
    siExpress,
    siFigma,
    siFlask,
    siFlutter,
    siGit,
    siGithub,
    siGo,
    siJavascript,
    siKubernetes,
    siMongodb,
    siMysql,
    siNextdotjs,
    siNodedotjs,
    siOpenjdk,
    siPhp,
    siPostgresql,
    siPostman,
    siPython,
    siReact,
    siRedis,
    siSharp,
    siSqlite,
    siTerraform,
    siTypescript,
    siVuedotjs,
} from "simple-icons";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";
import StorageIcon from "@mui/icons-material/Storage";
// Ícones específicos para tecnologias que não têm no simple-icons
import AccountTreeIcon from "@mui/icons-material/AccountTree"; // Para Oracle
import SecurityIcon from "@mui/icons-material/Security"; // Para SQL Server
import PublicIcon from "@mui/icons-material/Public"; // Para AWS/Azure alternativo

// Mapeamento dos ícones Material-UI para uso nos componentes
export const materialIcons = {
    StarBorderIcon,
    StarHalfIcon,
    StarIcon,
    SelectAllIcon,
    CodeIcon,
    BuildIcon,
    CloudIcon,
    StorageIcon,
    AccountTreeIcon,
    SecurityIcon,
    PublicIcon,
};

export const skillIcons = {
    js: siJavascript,
    ts: siTypescript,
    python: siPython,
    go: siGo,
    java: siOpenjdk,
    dart: siDart,
    php: siPhp,
    cs: siSharp,
    react: siReact,
    nextjs: siNextdotjs,
    nodejs: siNodedotjs,
    express: siExpress,
    flutter: siFlutter,
    django: siDjango,
    flask: siFlask,
    vue: siVuedotjs,
    angular: siAngular,
    aws: "PublicIcon", // String para identificar o ícone Material-UI
    azure: "CloudIcon", // String para identificar o ícone Material-UI
    docker: siDocker,
    kubernetes: siKubernetes,
    terraform: siTerraform,
    postgresql: siPostgresql,
    oracle: "AccountTreeIcon", // String para identificar o ícone Material-UI
    sqlserver: "SecurityIcon", // String para identificar o ícone Material-UI
    mongodb: siMongodb,
    redis: siRedis,
    mysql: siMysql,
    sqlite: siSqlite,
    git: siGit,
    github: siGithub,
    postman: siPostman,
    figma: siFigma,
};

export const skillDescriptions: Record<string, string> = {
    js: "JavaScript is a versatile programming language primarily used for web development.",
    ts: "TypeScript is a superset of JavaScript that adds static typing and modern features.",
    python:
        "Python is a high-level programming language known for its readability and versatility.",
    go: "Go is a statically typed, compiled language designed for simplicity and efficiency.",
    java:
        "Java is a widely-used object-oriented programming language known for its portability.",
    dart:
        "Dart is an object-oriented language optimized for building mobile, desktop, and web applications.",
    php: "PHP is a server-side scripting language designed for web development.",
    cs: "C# is a modern, object-oriented programming language developed by Microsoft.",
    react:
        "React is a JavaScript library for building user interfaces, particularly single-page applications.",
    nextjs:
        "Next.js is a React framework that enables server-side rendering and static site generation.",
    nodejs:
        "Node.js is a JavaScript runtime built on Chrome's V8 engine, allowing server-side scripting.",
    express:
        "Express is a minimal and flexible Node.js web application framework providing robust features.",
    flutter:
        "Flutter is an open-source UI software development toolkit created by Google for building natively compiled applications.",
    django:
        "Django is a high-level Python web framework that encourages rapid development and clean design.",
    flask:
        "Flask is a lightweight WSGI web application framework in Python, designed to make getting started quick and easy.",
    vue: "Vue.js is a progressive JavaScript framework for building user interfaces and single-page applications.",
    angular:
        "Angular is a platform for building mobile and desktop web applications using TypeScript.",
    docker:
        "Docker is an open platform for developing, shipping, and running applications in containers.",
    kubernetes:
        "Kubernetes is an open-source system for automating the deployment, scaling, and management of containerized applications.",
    git: "Git is a distributed version control system for tracking changes in source code during software development.",
    github:
        "GitHub is a web-based platform used for version control and collaboration, allowing multiple people to work on projects at once.",
    postman:
        "Postman is a collaboration platform for API development, providing tools for building, testing, and documenting APIs.",
    figma:
        "Figma is a web-based UI/UX design application that allows for collaborative design and prototyping.",
};

export const skillCategoryIcons: Record<string, string> = {
    all: "SelectAllIcon",
    language: "CodeIcon",
    framework: "BuildIcon",
    tool: "BuildIcon",
    cloud: "CloudIcon",
    database: "StorageIcon",
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
    1: "StarBorderIcon",
    2: "StarHalfIcon",
    3: "StarIcon",
    4: "StarIcon",
    5: "StarIcon",
};

export const skillLevelColors: Record<number, string> = {
    1: "#94a3b8", // Slate 400
    2: "#3b82f6", // Blue 500 (Tertiary)
    3: "#34d399", // Emerald 400 (Secondary)
    4: "#a855f7", // Purple 500 (Primary)
    5: "#a855f7", // Purple 500 (Primary)
};

export const skillLevelStyles: Record<number, string> = {
    1: "border-slate-800 bg-slate-900/50 text-slate-400",
    2: "border-tertiary-glow/20 bg-tertiary-glow/5 text-tertiary-glow",
    3: "border-secondary-glow/20 bg-secondary-glow/5 text-secondary-glow",
    4: "border-primary-glow/20 bg-primary-glow/5 text-primary-glow",
    5: "border-primary-glow/40 bg-primary-glow/10 text-primary-glow shadow-[0_0_10px_rgba(168,85,247,0.2)]",
};

export const skills: Skill[] = [
    // Languages
    { name: "JavaScript", level: 5, category: "language", icon: "js" },
    { name: "TypeScript", level: 5, category: "language", icon: "ts" },
    { name: "Python", level: 4, category: "language", icon: "python" },
    { name: "Go", level: 4, category: "language", icon: "go" },
    { name: "Java", level: 3, category: "language", icon: "java" },
    { name: "Dart", level: 4, category: "language", icon: "dart" },

    // Frameworks
    { name: "React", level: 5, category: "framework", icon: "react" },
    { name: "Node.js", level: 5, category: "framework", icon: "nodejs" },
    { name: "Flutter", level: 4, category: "framework", icon: "flutter" },
    { name: "Flask", level: 4, category: "framework", icon: "flask" },

    // Cloud & DevOps
    { name: "Docker", level: 5, category: "tool", icon: "docker" },
    { name: "Kubernetes", level: 4, category: "tool", icon: "kubernetes" },

    // Databases
    { name: "PostgreSQL", level: 5, category: "database", icon: "postgresql" },
    { name: "Oracle", level: 5, category: "database", icon: "oracle" },
    { name: "SQL Server", level: 5, category: "database", icon: "sqlserver" },
    { name: "MongoDB", level: 5, category: "database", icon: "mongodb" },
    { name: "MySQL", level: 5, category: "database", icon: "mysql" },

    // Tools
    { name: "Git", level: 5, category: "tool", icon: "git" },
    { name: "GitHub Actions", level: 4, category: "tool", icon: "github" },
];

export const skillCategories = [
    { id: "all", label: "All Skills", count: skills.length },
    {
        id: "language",
        label: "Languages",
        count: skills.filter((s) => s.category === "language").length,
    },
    {
        id: "framework",
        label: "Frameworks",
        count: skills.filter((s) => s.category === "framework").length,
    },
    {
        id: "tool",
        label: "Tools",
        count: skills.filter((s) => s.category === "tool").length,
    },
    {
        id: "cloud",
        label: "Cloud & DevOps",
        count:
            skills.filter((s) =>
                s.category === "cloud" || s.category === "tool"
            ).length,
    },
    {
        id: "database",
        label: "Databases",
        count: skills.filter((s) => s.category === "database").length,
    },
];

import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Henrique",
  lastName: "Gonçalves",
  name: "Henrique Gonçalves",
  role: "Full-Stack Developer",
  avatar: "/images/avatar.jpg",
  email: "[EMAIL_ADDRESS]",
  location: "America/Sao_Paulo", // Timezone for time display functionality
  locationDisplay: "Brazil", // Display location shown to users
  languages: ["English", "Portuguese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: "Join the Vector early access list",
  description: "Get notified when Vector launches. Be the first to know.",
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/henriquegoncalvesdev",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/henriquegoncalvesdev/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} – ${person.role}`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: "Code that thinks, design that breathes.",
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Vector</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Latest project
        </Text>
      </Row>
    ),
    href: "/work/vector",
  },
  subline: "Full-stack engineer turning AI capabilities into seamless user experiences.",
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.locationDisplay || person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: "I build web apps that think. Full-stack development meets practical AI I integrate LLMs into production systems, not just prototypes. From React to LLM API, I own the architecture, ship the code, and make sure it actually works at scale. Based in Brazil. Working globally.",
  },
  work: {
    display: true, // set to false to hide this section
    title: "Projects",
    experiences: [
      {
        company: "VECTOR",
        timeframe: "2025 - Present",
        role: "Full-Stack Developer",
        featured: true,
        stack: ["React", "Claude API", "Supabase"],
        achievements: [
          "Problem: Developers lose hours switching between code and AI chats, manually crafting context for LLMs.",
          "Solution: Reduced context-switching by generating AI-ready prompts from project structure automatically.",
          "Outcome: Streamlined AI-assisted development workflow with automated context generation.",
        ],
        images: [
          {
            src: "/images/projects/project-01/video-01.mp4",
            alt: "Vector project demo",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-01.png",
            alt: "Vector project screenshot",
            width: 16,
            height: 9,
          },
        ],
      },
  
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Background",
    institutions: [
      {
        id: "education",
        name: "CS @ Georgian College (Honors) • Azure Certified",
        description: <></>,
      },
    ],
  },
  technical: {
  display: true, // set to false to hide this section
  title: "Technical skills",
  skills: [
    {
      id: "react",
      title: "React",
      description: (
        <>
          Build clean, reusable UI components with hooks, predictable state, and
          a focus on performance + maintainability.
        </>
      ),
      tags: [
        { name: "React", icon: "react" },
        { name: "Hooks", icon: "sparkle" },
        { name: "Component Architecture", icon: "grid" },
      ],
      images: [
        {
          src: "/images/projects/project-01/cover-02.png",
          alt: "React UI components and screens",
          width: 16,
          height: 9,
        },
        {
          src: "/images/projects/project-01/cover-03.png",
          alt: "Reusable component system preview",
          width: 16,
          height: 9,
        },
      ],
    },
    {
      id: "nextjs",
      title: "Next.js",
      description: (
        <>
          Ship production-ready apps with routing, server rendering, auth flows,
          and fast UX.
        </>
      ),
      tags: [
        { name: "Next.js", icon: "nextjs" },
        { name: "App Router", icon: "grid" },
      ],
      images: [
        {
          src: "/images/projects/project-01/cover-04.png",
          alt: "Next.js app screens and dashboard",
          width: 16,
          height: 9,
        },
      ],
    },
    {
      id: "typescript-javascript",
      title: "TypeScript + JavaScript",
      description: (
        <>
          Typed UI, safer refactors, cleaner contracts between components and
          APIs.
        </>
      ),
      tags: [
        { name: "TypeScript", icon: "typescript" },
        { name: "JavaScript", icon: "javascript" },
        { name: "ES6+", icon: "code" },
      ],
      images: [
        {
          src: "/images/projects/project-01/cover-05.png",
          alt: "TypeScript code editor screen",
          width: 16,
          height: 9,
        }
      ], // optional
    },
    {
      id: "styling-ui",
      title: "Styling / UI",
      description: (
        <>
          Tailwind or Bootstrap + responsive layouts + design-to-code accuracy.
        </>
      ),
      tags: [
        { name: "Tailwind", icon: "tailwind" },
        { name: "Bootstrap", icon: "bootstrap" },
        { name: "Responsive UI", icon: "mobile" },
      ],
      images: [], // optional
    },
    {
      id: "backend-database",
      title: "Backend + Database",
      description: (
        <>
          Node/Express + REST + MySQL/PostgreSQL. CRUD, auth, validation.
        </>
      ),
      tags: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express", icon: "express" },
        { name: "MySQL", icon: "mysql" },
        { name: "PostgreSQL", icon: "postgresql" },
      ],
      images: [], // optional
    },
    {
      id: "tooling-deploy",
      title: "Tooling / Deploy",
      description: (
        <>
          Git, GitHub Actions, Vercel, Docker, Azure, and basic CI habits for reliable
          shipping.
        </>
      ),
      tags: [
        { name: "Git", icon: "git" },
        { name: "GitHub Actions", icon: "githubactions" },
        { name: "Vercel", icon: "vercel" },
        { name: "Docker", icon: "docker" },
        { name: "Azure", icon: "azure" },
      ],
      images: [], // optional
    },
  ],
},
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about AI and Full Stack Development",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/gallery_blog_01.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };

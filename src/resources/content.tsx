import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Henrique",
  lastName: "Gonçalves",
  name: `Henrique Gonçalves`,
  role: "Full-Stack Developer",
  avatar: "/images/avatar.jpg",
  email: "henriquegoncalvesdev@gmail.com",
  location: "America/Sao_Paulo", // Timezone for time display functionality
  locationDisplay: "🇧🇷 Brazil", // Display location shown to users
  languages: ["English", "Portuguese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Join the Vector early access list</>,
  description: <>Get notified when Vector launches. Be the first to know.</>,
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
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/once_ui/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@once_ui",
    essential: false,
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
  headline: <>Code that thinks, design that breathes.</>,
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
  subline: (
    <>
    Full-stack engineer turning AI capabilities into seamless user experiences.
</>
  ),
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
    description: (
      <>
        

Henrique builds AI-powered web apps from architecture to deployment.
His work sits at the intersection of solid engineering and practical AI: context-aware features, intelligent workflows, and interfaces designed to reduce friction rather than add complexity.
The stack: React, Next.js, TypeScript on the front. Node, Express, SQL, and vector databases on the back. LLMs including OpenAI, Claude, and Gemini integrated into production systems.
He's most useful when a project needs one person who can own the full picture product thinking, technical decisions, and shipping code that holds up.
Based in Brazil. Works globally.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Projects",
    experiences: [
      {
        company: "VECTOR",
        timeframe: "2025 - Present",
        role: "Full-Stack Developer",
        achievements: [
          <>
            Building an AI-powered project management web app focused on reducing context loss in AI-assisted development. Designed the domain model and implemented authentication, CRUD workflows, and a contextual AI chat layer using the Claude API. Responsible for product architecture across frontend, backend, and database design.

          </>,
        
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.png",
            alt: "Vector project image",
            width: 16,
            height: 9,
          },
        ],
      },
  
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        id: "georgian-college",
        name: "Georgian College - Canada",
        description: <>Graduated in Computer Programming. Built real-world projects across web development, databases, OOP, and software engineering fundamentals shipping work with clean structure, not just "it runs."</>,
      },
      {
        id: "self-directed-learning",
        name: "Self-Directed Learning - Always On",
        description: <>I learn by building. Deep dives into React/Next.js, TypeScript, APIs, system design, and applied AI then I turn the notes into products, not bookmarks.</>,
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
          Node/Express + REST + MySQL/Supabase. CRUD, auth, validation.
        </>
      ),
      tags: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express", icon: "express" },
        { name: "MySQL", icon: "mysql" },
        { name: "Supabase", icon: "supabase" },
      ],
      images: [], // optional
    },
    {
      id: "tooling-deploy",
      title: "Tooling / Deploy",
      description: (
        <>
          Git, Vercel, Docker (when needed), and basic CI habits for reliable
          shipping.
        </>
      ),
      tags: [
        { name: "Git", icon: "git" },
        { name: "Vercel", icon: "vercel" },
        { name: "Docker", icon: "docker" },
      ],
      images: [], // optional
    },
  ],
},
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
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

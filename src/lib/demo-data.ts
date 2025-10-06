
import type { User, Internship, Course, Role, Feedback, Conversations, StudentProfile, Applicant, SkillAssessmentAttempt, CareerQuizAttempt } from './types';

export const users: Record<Role, User> = {
  student: {
    id: 'user-student-01',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe',
    role: 'student',
  },
  host: {
    id: 'user-host-01',
    name: 'Sarah Lee (InnovateTech)',
    email: 'sarah.lee@innovatetech.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarahlee',
    role: 'host',
  },
  admin: {
    id: 'user-admin-01',
    name: 'Admin User',
    email: 'admin@careermatch.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=adminuser',
    role: 'admin',
  },
};

export const hostProfile = {
    name: 'InnovateTech',
    email: 'careers@innovatetech.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Avenue, Silicon Valley, CA 94043',
    logoUrl: 'https://picsum.photos/seed/innovate/200/200',
    bio: 'InnovateTech is a pioneering technology firm at the forefront of artificial intelligence and machine learning solutions. We are dedicated to building a future where technology empowers humanity. Our team is composed of world-class engineers, researchers, and designers who are passionate about solving complex problems. We foster a culture of collaboration, innovation, and continuous learning, providing our interns with the opportunity to work on impactful projects that push the boundaries of what\'s possible.',
    verified: true,
};

export const allHosts = [
    { id: 'host-01', name: 'InnovateTech', logoUrl: 'https://picsum.photos/seed/innovate/100/100' },
    { id: 'host-02', name: 'FutureGadgets', logoUrl: 'https://picsum.photos/seed/gadgets/100/100' },
    { id: 'host-03', name: 'DataDriven Inc.', logoUrl: 'https://picsum.photos/seed/data/100/100' },
    { id: 'host-04', name: 'CreativeMinds', logoUrl: 'https://picsum.photos/seed/creative/100/100' },
    { id: 'host-05', name: 'GrowthHackers', logoUrl: 'https://picsum.photos/seed/growth/100/100' },
    { id: 'host-06', name: 'Frontend Masters', logoUrl: 'https://picsum.photos/seed/frontend/100/100'},
];

export const internships: Internship[] = [
  {
    id: 'int-001',
    title: 'Software Engineer Intern',
    organization: 'InnovateTech',
    logoUrl: 'https://picsum.photos/seed/innovate/100/100',
    location: 'Remote',
    duration: '12 Weeks',
    fitScore: 92,
    description: 'Work on cutting-edge AI projects and develop scalable software solutions. You will be part of the core engineering team and contribute to the main product.',
    tags: ['AI', 'Python', 'React'],
    status: 'Active',
  },
  {
    id: 'int-002',
    title: 'Product Manager Intern',
    organization: 'FutureGadgets',
    logoUrl: 'https://picsum.photos/seed/gadgets/100/100',
    location: 'New York, NY',
    duration: '10 Weeks',
    fitScore: 88,
    description: 'Define product roadmaps, conduct market research, and work with cross-functional teams to launch new features. An exciting role for a future leader.',
    tags: ['Product Management', 'Agile', 'JIRA'],
    status: 'Active',
  },
  {
    id: 'int-003',
    title: 'Data Science Intern',
    organization: 'DataDriven Inc.',
    logoUrl: 'https://picsum.photos/seed/data/100/100',
    location: 'San Francisco, CA',
    duration: '16 Weeks',
    fitScore: 85,
    description: 'Analyze large datasets to extract meaningful insights. Build machine learning models to solve real-world business problems. Requires strong statistical knowledge.',
    tags: ['Data Science', 'Machine Learning', 'SQL'],
    status: 'Active',
  },
  {
    id: 'int-004',
    title: 'UX/UI Design Intern',
    organization: 'CreativeMinds',
    logoUrl: 'https://picsum.photos/seed/creative/100/100',
    location: 'Remote',
    duration: '12 Weeks',
    fitScore: 95,
    description: 'Design intuitive and beautiful user interfaces for our mobile and web applications. Collaborate with product managers and engineers to create amazing user experiences.',
    tags: ['UX Design', 'UI Design', 'Figma'],
    status: 'Closed',
  },
   {
    id: 'int-005',
    title: 'Marketing Intern',
    organization: 'GrowthHackers',
    logoUrl: 'https://picsum.photos/seed/growth/100/100',
    location: 'Austin, TX',
    duration: '12 Weeks',
    description: 'Develop and execute digital marketing campaigns. Analyze campaign performance and optimize for growth. A great opportunity to learn about SEO, SEM, and content marketing.',
    tags: ['Marketing', 'SEO', 'Social Media'],
    status: 'Active',
  },
  {
    id: 'int-006',
    title: 'Backend Engineer Intern',
    organization: 'InnovateTech',
    logoUrl: 'https://picsum.photos/seed/server/100/100',
    location: 'Remote',
    duration: '14 Weeks',
    fitScore: 90,
    description: 'Join our backend team to build and maintain scalable APIs and services that power our core products. You will gain experience with database management and system architecture.',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    status: 'Closed',
  },
  {
    id: 'int-007',
    title: 'Cloud DevOps Intern',
    organization: 'CloudSphere',
    logoUrl: 'https://picsum.photos/seed/cloud/100/100',
    location: 'San Francisco, CA',
    duration: '12 Weeks',
    fitScore: 82,
    description: 'Work with our DevOps team to automate our cloud infrastructure and deployment pipelines. You will learn about CI/CD, containerization with Docker, and orchestration with Kubernetes.',
    tags: ['AWS', 'Docker', 'Kubernetes'],
    status: 'Closed',
  },
  {
    id: 'int-008',
    title: 'Mobile App Developer Intern',
    organization: 'Apptivate',
    logoUrl: 'https://picsum.photos/seed/app/100/100',
    location: 'New York, NY',
    duration: '12 Weeks',
    fitScore: 89,
    description: 'Develop new features for our flagship iOS and Android applications using React Native. You will work closely with our design and product teams to deliver a world-class mobile experience.',
    tags: ['React Native', 'Firebase', 'Mobile Development'],
    status: 'Active',
  },
  {
    id: 'int-009',
    title: 'Game Development Intern',
    organization: 'FutureGadgets',
    logoUrl: 'https://picsum.photos/seed/gadgets/100/100',
    location: 'Remote',
    duration: '16 Weeks',
    fitScore: 80,
    description: 'This internship has been temporarily blocked by platform administrators pending a review of the job description content. Please contact support for more details.',
    tags: ['Unity', 'C#', 'Game Design'],
    status: 'Blocked',
  },
  {
    id: 'int-010',
    title: 'Cybersecurity Intern',
    organization: 'InnovateTech',
    logoUrl: 'https://picsum.photos/seed/cyber/100/100',
    location: 'Remote',
    duration: '12 Weeks',
    fitScore: 84,
    description: 'This internship posting has been blocked by an administrator due to a policy violation. Please contact support for more details.',
    tags: ['Cybersecurity', 'Networking', 'Penetration Testing'],
    status: 'Blocked',
  },
];

export const sampleMarkdownContent = `
# Welcome to the Module!

This is a sample reading content block that supports **Markdown**.

## Key Concepts
- **Declarative UI**: React makes it painless to create interactive UIs.
- **Component-Based**: Build encapsulated components that manage their own state.
- **Learn Once, Write Anywhere**: You can develop new features in React without rewriting existing code.

Here is a code block example:
\'\'\'javascript
function HelloWorld() {
  return <h1>Hello, world!</h1>;
}
\'\'\'
`;

export const sampleQuizContent = `What does HTML stand for? | HyperText Markup Language | High-Level Text Machine Language | Hyper-Transferable Markup Language
Which CSS property is used to change the text color of an element? | color | font-color | text-color | background-color
What is the correct syntax for referring to an external script called "app.js"? | <script src="app.js"> | <script href="app.js"> | <script name="app.js">`;

export const courses: Course[] = [
    {
        id: 'course-01',
        title: 'Advanced React Patterns',
        provider: 'InnovateTech',
        logoUrl: 'https://picsum.photos/seed/frontend/100/100',
        category: 'Web Development',
        duration: '16 Hours',
        rating: 4.8,
        description: 'Dive deep into advanced React concepts, including hooks, context, performance optimizations, and state management.',
        modules: [
            { title: 'Introduction to Advanced React', duration: '1 Hour', contentBlocks: [{type: 'video', title: 'Course Intro', content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}] },
            { title: 'Custom Hooks', duration: '3 Hours', contentBlocks: [{type: 'text', title: 'Reading on Custom Hooks', content: sampleMarkdownContent}]},
            { title: 'Performance Optimization', duration: '4 Hours', contentBlocks: [{type: 'quiz', title: 'Performance Quiz', content: sampleQuizContent}] },
            { title: 'State Management with Redux and Zustand', duration: '5 Hours', contentBlocks: [{type: 'video', title: 'Redux Explained', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Testing React Applications', duration: '3 Hours', contentBlocks: [{type: 'text', title: 'Jest & React Testing Library', content: 'This section covers setting up Jest and RTL for your projects.'}] },
        ],
        tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
        status: 'Inactive',
    },
    {
        id: 'course-02',
        title: 'Machine Learning A-Z',
        provider: 'DataDriven Inc.',
        logoUrl: 'https://picsum.photos/seed/udemy/100/100',
        category: 'Data Science',
        duration: '45 Hours',
        rating: 4.6,
        description: 'A comprehensive introduction to machine learning, covering various algorithms, data preprocessing, and model evaluation.',
        modules: [
            { title: 'Data Preprocessing', duration: '5 Hours', contentBlocks: [{type: 'video', title: 'Intro to Data Preprocessing', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Regression Models', duration: '10 Hours', contentBlocks: [{type: 'text', title: 'Linear Regression', content: 'This section details the principles of Linear Regression.'}] },
            { title: 'Classification Models', duration: '10 Hours', contentBlocks: [{type: 'quiz', title: 'Classification Quiz', content: 'What is a confusion matrix? | A table to evaluate model performance | A matrix of confusing numbers | A CSS layout module'}] },
            { title: 'Clustering', duration: '10 Hours', contentBlocks: [{type: 'video', title: 'K-Means Clustering', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Model Selection & Boosting', duration: '10 Hours', contentBlocks: [{type: 'text', title: 'Cross-validation Techniques', content: 'Learn about k-fold cross-validation.'}] },
        ],
        tags: ['Machine Learning', 'Data Science', 'Python', 'AI'],
        status: 'Active',
    },
    {
        id: 'course-03',
        title: 'UI Design Principles',
        provider: 'CreativeMinds',
        logoUrl: 'https://picsum.photos/seed/coursera/100/100',
        category: 'Design',
        duration: '25 Hours',
        rating: 4.7,
        description: 'Learn the fundamental principles of user interface design, including color theory, typography, layout, and visual hierarchy.',
        modules: [
            { title: 'Intro to UI Design', duration: '2 Hours', contentBlocks: [{type: 'video', title: 'Welcome to UI Design', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Color & Typography', duration: '6 Hours', contentBlocks: [{type: 'text', title: 'The Psychology of Color', content: 'This reading covers how color impacts user perception.'}] },
            { title: 'Layout & Composition', duration: '8 Hours', contentBlocks: [{type: 'quiz', title: 'Layout Quiz', content: 'What is the "Rule of Thirds"? | A composition guideline | A design agency | A CSS framework'}] },
            { title: 'Prototyping in Figma', duration: '9 Hours', contentBlocks: [{type: 'video', title: 'Figma Prototyping Tutorial', content: 'https://www.youtube.com/watch?v=example'}] },
        ],
        tags: ['UI Design', 'UX Design', 'Figma', 'Design'],
        status: 'Active',
    },
    {
        id: 'course-04',
        title: 'Agile Product Management',
        provider: 'Frontend Masters',
        logoUrl: 'https://picsum.photos/seed/edx/100/100',
        category: 'Product Management',
        duration: '30 Hours',
        rating: 4.5,
        description: 'Master the Agile framework for product management, from creating user stories to managing sprints and backlogs.',
        modules: [
            { title: 'The Agile Manifesto', duration: '4 Hours', contentBlocks: [{type: 'text', title: 'Understanding the Agile Manifesto', content: 'A deep dive into the 12 principles.'}] },
            { title: 'Scrum and Kanban', duration: '8 Hours', contentBlocks: [{type: 'video', title: 'Scrum vs Kanban', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'User Stories and Backlog Grooming', duration: '10 Hours', contentBlocks: [{type: 'quiz', title: 'User Story Quiz', content: 'A good user story should be... | INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable) | FAST | SMART'}] },
            { title: 'Sprint Planning and Execution', duration: '8 Hours', contentBlocks: [{type: 'video', title: 'Running a Sprint Planning Meeting', content: 'https://www.youtube.com/watch?v=example'}] },
        ],
        tags: ['Agile', 'Product Management', 'Scrum', 'JIRA'],
        status: 'Active',
    },
    {
        id: 'course-05',
        title: 'Node.js and Express: The Complete Guide',
        provider: 'InnovateTech',
        logoUrl: 'https://picsum.photos/seed/academind/100/100',
        category: 'Web Development',
        duration: '35 Hours',
        rating: 4.9,
        description: 'Build, test, and deploy real-world REST APIs with Node.js, Express, and MongoDB. Perfect for aspiring backend developers.',
        modules: [
            { title: 'Node.js Fundamentals', duration: '5 Hours', contentBlocks: [{type: 'video', title: 'Intro to Node.js', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Working with Express.js', duration: '8 Hours', contentBlocks: [{type: 'text', title: 'Express Middleware', content: 'An explanation of how middleware works in Express.'}] },
            { title: 'MongoDB and Mongoose', duration: '10 Hours', contentBlocks: [{type: 'video', title: 'Connecting to MongoDB', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Building REST APIs', duration: '8 Hours', contentBlocks: [{type: 'quiz', title: 'REST API Quiz', content: 'What is a PUT request used for? | Updating a resource | Creating a resource | Deleting a resource'}] },
            { title: 'Authentication and Security', duration: '4 Hours', contentBlocks: [{type: 'text', title: 'Implementing JWT', content: 'A guide to JSON Web Tokens.'}] },
        ],
        tags: ['Node.js', 'Express', 'Backend', 'Web Development', 'PostgreSQL'],
        status: 'Active',
    },
    {
        id: 'course-06',
        title: 'AWS Certified Cloud Practitioner',
        provider: 'A Cloud Guru',
        logoUrl: 'https://picsum.photos/seed/guru/100/100',
        category: 'Web Development',
        duration: '20 Hours',
        rating: 4.7,
        description: 'Prepare for the AWS Certified Cloud Practitioner exam with this comprehensive course covering core AWS services, security, and architecture.',
        modules: [
            { title: 'Cloud Concepts', duration: '3 Hours', contentBlocks: [{type: 'video', title: 'What is Cloud Computing?', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Core AWS Services (EC2, S3, RDS)', duration: '8 Hours', contentBlocks: [{type: 'text', title: 'S3 Storage Classes', content: 'A breakdown of the different S3 storage options.'}] },
            { title: 'Security and Compliance', duration: '5 Hours', contentBlocks: [{type: 'video', title: 'IAM Policies', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Pricing and Billing', duration: '4 Hours', contentBlocks: [{type: 'quiz', title: 'Pricing Quiz', content: 'Which service is free? | IAM | EC2 t2.micro | S3'}] },
        ],
        tags: ['AWS', 'Cloud', 'DevOps', 'Docker', 'Kubernetes'],
        status: 'Blocked',
    },
    {
        id: 'course-07',
        title: 'Introduction to Generative AI',
        provider: 'Google Cloud Skills Boost',
        logoUrl: 'https://picsum.photos/seed/google/100/100',
        category: 'Data Science',
        duration: '8 Hours',
        rating: 4.8,
        description: 'Explore the world of generative AI, from large language models to diffusion models. Understand the technology behind tools like Gemini.',
        modules: [
            { title: 'What are Large Language Models?', duration: '2 Hours', contentBlocks: [{type: 'video', title: 'The Power of LLMs', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Prompt Engineering', duration: '3 Hours', contentBlocks: [{type: 'text', title: 'Writing Effective Prompts', content: 'Best practices for getting the most out of your prompts.'}] },
            { title: 'Image Generation with Diffusion Models', duration: '3 Hours', contentBlocks: [{type: 'quiz', title: 'GenAI Quiz', content: 'What is a "diffusion model"? | A model for generating images | A weather prediction model | A type of database'}] },
        ],
        tags: ['AI', 'Generative AI', 'Machine Learning'],
        status: 'Active',
    },
    {
        id: 'course-08',
        title: 'React Native for Beginners',
        provider: 'Codecademy',
        logoUrl: 'https://picsum.photos/seed/codecademy/100/100',
        category: 'Web Development',
        duration: '22 Hours',
        rating: 4.6,
        description: 'Learn to build native mobile apps for iOS and Android using React Native. This course covers components, navigation, and state management.',
        modules: [
            { title: 'Setting up your Environment', duration: '2 Hours', contentBlocks: [{type: 'video', title: 'Expo vs. CLI', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Core Components and Styling', duration: '6 Hours', contentBlocks: [{type: 'text', title: 'Flexbox in React Native', content: 'How to use Flexbox for layout.'}] },
            { title: 'Navigation with React Navigation', duration: '7 Hours', contentBlocks: [{type: 'video', title: 'Stack Navigator Tutorial', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Working with Device APIs', duration: '7 Hours', contentBlocks: [{type: 'quiz', title: 'Device API Quiz', content: 'Which API accesses the camera? | ImagePicker | CameraRoll | Geolocation'}] },
        ],
        tags: ['React Native', 'Mobile Development', 'Firebase', 'JavaScript'],
        status: 'Active',
    },
    {
        id: 'course-09',
        title: 'DevOps with Docker',
        provider: 'InnovateTech',
        logoUrl: 'https://picsum.photos/seed/docker/100/100',
        category: 'Web Development',
        duration: '18 Hours',
        rating: 4.8,
        description: 'This course has been blocked by an administrator for a content review. Please contact support if you have questions.',
        modules: [
            { title: 'Introduction to Docker', duration: '2 Hours', contentBlocks: [{type: 'video', title: 'What is Docker?', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Creating Dockerfiles', duration: '5 Hours', contentBlocks: [{type: 'text', title: 'Dockerfile Best Practices', content: 'Learn how to write efficient Dockerfiles.'}] },
            { title: 'Docker Compose', duration: '6 Hours', contentBlocks: [{type: 'video', title: 'Multi-container apps with Compose', content: 'https://www.youtube.com/watch?v=example'}] },
            { title: 'Deploying to the Cloud', duration: '5 Hours', contentBlocks: [{type: 'quiz', title: 'Deployment Quiz', content: 'What is a common container orchestrator? | Kubernetes | Docker Swarm | Both'}] },
        ],
        tags: ['Docker', 'DevOps', 'CI/CD'],
        status: 'Blocked',
    },
];

export const studentProfile: StudentProfile = {
  id: 'user-student-01',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe',
  university: 'State University',
  college: 'College of Engineering',
  degree: 'Bachelor of Technology',
  branch: 'Computer Science',
  year: 3,
  cgpa: 8.7,
  credits: 125,
  bio: 'Aspiring Full-Stack Developer with a passion for creating intuitive and performant web applications. Proficient in JavaScript, React, and Node.js. Currently exploring cloud technologies and machine learning.',
  resume: 'Alex_Doe_Resume.pdf',
  resumeParsed: true,
  consent: true,
  links: {
    twitter: 'https://twitter.com/alexdoe',
    github: 'https://github.com/alexdoe',
    linkedin: 'https://linkedin.com/in/alexdoe',
    kaggle: 'https://kaggle.com/alexdoe',
  },
  skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Python', 'SQL']
};

export const feedback: Feedback[] = [
    {
        id: 'fb-001',
        studentName: 'Alex Doe',
        studentAvatarUrl: 'https://i.pravatar.cc/150?u=alexdoe',
        targetType: 'internship',
        targetId: 'int-001',
        targetName: 'Software Engineer Intern',
        rating: 5,
        comment: 'This was an incredible experience. I learned so much from my mentor and had the chance to work on a real-world project that shipped to production. The team was supportive and the work was challenging. Highly recommended!',
        date: '3 days ago',
    },
    {
        id: 'fb-002',
        studentName: 'Ben Carter',
        studentAvatarUrl: 'https://i.pravatar.cc/150?u=bencarter',
        targetType: 'course',
        targetId: 'course-04',
        targetName: 'Agile Product Management',
        rating: 4,
        comment: 'The course content was excellent and very thorough. The instructor explained complex topics clearly. My only suggestion would be to add more interactive coding exercises to practice the concepts.',
        date: '1 week ago',
    },
    {
        id: 'fb-003',
        studentName: 'Chloe Davis',
        studentAvatarUrl: 'https://i.pravatar.cc/150?u=chloedavis',
        targetType: 'internship',
        targetId: 'int-006',
        targetName: 'Backend Engineer Intern',
        rating: 5,
        comment: 'I had a fantastic time as a PM intern. I was given a lot of responsibility and felt like a valued member of the team. It was a great introduction to the world of product management.',
        date: '2 weeks ago',
    },
    {
        id: 'fb-004',
        studentName: 'Anonymous',
        studentAvatarUrl: 'https://i.pravatar.cc/150?u=anonymous',
        targetType: 'course',
        targetId: 'course-03',
        targetName: 'UI Design Principles',
        rating: 3,
        comment: "The course covers a lot of ground, which is great, but it sometimes felt a bit rushed. The section on deep learning could have been more detailed. Decent for an overview, but not for deep expertise.",
        date: '1 month ago',
    },
];

export const conversations: Conversations = {
    'host-01': [
        { from: 'admin', text: 'Hi InnovateTech, we noticed one of your internships, "Backend Engineer Intern", is marked as Closed. Can we help with anything?', timestamp: '2 hours ago' },
        { from: 'host', text: 'Hi Admin, thanks for reaching out. We\'ve filled that position internally. We\'ll be posting a new one soon!', timestamp: '1 hour ago' },
    ],
    'host-02': [
        { from: 'admin', text: 'Hello FutureGadgets team, welcome to CareerMatch!', timestamp: '1 day ago' },
    ],
     'host-06': [
        { from: 'host', text: 'Hi, I have a question about our "Agile Product Management" course. It appears as "Blocked" and I\'m not sure why. Can you please advise?', timestamp: '3 hours ago' },
        { from: 'admin', text: 'Hello Frontend Masters. Thanks for contacting us. We are reviewing the course content to ensure it meets our platform standards. We will update you shortly.', timestamp: '2 hours ago' },
        { from: 'host', text: 'Thanks for the quick response. Looking forward to your update.', timestamp: '2 hours ago' },
    ]
};

export const allApplicants: Applicant[] = [
    { ...studentProfile, internshipId: 'int-001', status: 'Allocated' },
    { name: 'Ben Carter', id: 'user-student-02', email: 'ben.carter@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=bencarter', internshipId: 'int-001', status: 'Pending Review', university: 'Tech University', college: 'School of IT', degree: 'B.Sc. IT', branch: 'Information Technology', year: 4, cgpa: 8.2, credits: 140, skills: ['Java', 'Spring', 'MySQL'], bio: 'Detail-oriented Java developer with experience in building enterprise-level applications.' },
    { name: 'Chloe Davis', id: 'user-student-03', email: 'chloe.davis@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=chloedavis', internshipId: 'int-002', status: 'Interviewing', university: 'Design Institute', college: 'School of Design', degree: 'B.Des', branch: 'Product Design', year: 3, cgpa: 9.1, credits: 110, skills: ['Figma', 'User Research', 'Prototyping'], bio: 'Creative product designer focused on creating user-centric and impactful digital experiences.' },
    { name: 'David Evans', id: 'user-student-04', email: 'david.evans@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=davidevans', internshipId: 'int-003', status: 'Offer Extended', university: 'Data Science College', college: 'Dept. of Statistics', degree: 'M.Sc.', branch: 'Data Science', year: 1, cgpa: 9.5, credits: 40, skills: ['Python', 'TensorFlow', 'Scikit-learn'], bio: 'Data scientist with a knack for finding patterns in complex datasets and building predictive models.' },
    { name: 'Emily Harris', id: 'user-student-05', email: 'emily.harris@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=emilyharris', internshipId: 'int-001', status: 'Rejected', university: 'State University', college: 'College of Engineering', degree: 'B.Tech', branch: 'Computer Science', year: 3, cgpa: 7.9, credits: 120, skills: ['JavaScript', 'HTML', 'CSS'], bio: 'Frontend developer with a good eye for design and a passion for web standards.' },
    { name: 'Frank Green', id: 'user-student-06', email: 'frank.green@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=frankgreen', internshipId: 'int-004', status: 'Pending Review', university: 'State University', college: 'College of Engineering', degree: 'B.Tech', branch: 'Computer Science', year: 3, cgpa: 8.5, credits: 122, skills: ['React Native', 'Firebase', 'GraphQL'], bio: 'Mobile developer focused on building cross-platform applications with a great user experience.' },
];

export const skillAssessmentHistory: SkillAssessmentAttempt[] = [
  {
    id: 'attempt-01',
    date: '2024-07-15',
    desiredJob: 'React Native Developer',
    quiz: {
        questions: [
            { questionText: "Which component is used to create a button in React Native?", options: ["<Button>", "<Touchable>", "<TouchableOpacity>"], allowMultiple: false, correctOptionIndex: 2, explanation: "<TouchableOpacity> is a standard way to create button-like components that provide feedback on touch." },
            { questionText: "What is Flexbox used for in React Native?", options: ["State Management", "Layout and Alignment", "API Requests"], allowMultiple: false, correctOptionIndex: 1, explanation: "Flexbox is the primary layout model used in React Native to create responsive and flexible UIs." },
            { questionText: "Which of the following are valid React hooks?", options: ["useState", "useEffect", "useContext", "useLayout"], allowMultiple: true, correctOptionIndices: [0, 1, 2], explanation: "useState, useEffect, and useContext are all standard React hooks. useLayout is not a standard hook." },
            { questionText: "What is the purpose of the 'StyleSheet.create' method?", options: ["To create inline styles", "To create optimized stylesheets with numeric IDs", "To link external CSS files"], allowMultiple: false, correctOptionIndex: 1, explanation: "StyleSheet.create creates an optimized stylesheet object where styles are assigned numeric IDs, which is more performant than using inline style objects." },
            { questionText: "How do you pass data from a parent component to a child component?", options: ["State", "Context API", "Props"], allowMultiple: false, correctOptionIndex: 2, explanation: "Props (properties) are the standard way to pass data down the component tree from parent to child." },
            { questionText: "Which component is used to display a list of items?", options: ["<ScrollView>", "<FlatList>", "<View>"], allowMultiple: false, correctOptionIndex: 1, explanation: "<FlatList> is highly performant for rendering long lists of data as it only renders the items currently on screen (virtualization)." },
            { questionText: "What tool is commonly used for navigating between screens in a React Native app?", options: ["React Router", "React Navigation", "Next.js Router"], allowMultiple: false, correctOptionIndex: 1, explanation: "React Navigation is the most popular and recommended library for handling routing and navigation in React Native applications." },
            { questionText: "How can you make a network request to an API?", options: ["Using the 'fetch' API", "Using the 'Axios' library", "Both of the above"], allowMultiple: false, correctOptionIndex: 2, explanation: "Both the built-in 'fetch' API and third-party libraries like 'Axios' are commonly used for making HTTP requests in React Native." },
            { questionText: "What is the purpose of 'async' and 'await' in JavaScript?", options: ["To define a function that runs on a separate thread", "To work with Promises in a more synchronous-looking way", "To declare a variable that cannot be changed"], allowMultiple: false, correctOptionIndex: 1, explanation: "Async/await is syntactic sugar built on top of Promises, allowing you to write asynchronous code that is easier to read and reason about." },
            { questionText: "Which of these are core components in React Native?", options: ["<View>", "<Text>", "<div>", "<span>"], allowMultiple: true, correctOptionIndices: [0, 1], explanation: "<View> and <Text> are fundamental building blocks for UIs in React Native. <div> and <span> are HTML elements and are not used." },
        ]
    },
    answers: {
        answers: [
            { questionText: "Which component is used to create a button in React Native?", selectedAnswers: ["<TouchableOpacity>"], correctAnswers: ["<TouchableOpacity>"]},
            { questionText: "What is Flexbox used for in React Native?", selectedAnswers: ["API Requests"], correctAnswers: ["Layout and Alignment"]},
            { questionText: "Which of the following are valid React hooks?", selectedAnswers: ["useState", "useEffect"], correctAnswers: ["useState", "useEffect", "useContext"]},
            { questionText: "What is the purpose of the 'StyleSheet.create' method?", selectedAnswers: ["To create optimized stylesheets with numeric IDs"], correctAnswers: ["To create optimized stylesheets with numeric IDs"] },
            { questionText: "How do you pass data from a parent component to a child component?", selectedAnswers: ["Props"], correctAnswers: ["Props"] },
            { questionText: "Which component is used to display a list of items?", selectedAnswers: ["<ScrollView>"], correctAnswers: ["<FlatList>"] },
            { questionText: "What tool is commonly used for navigating between screens in a React Native app?", selectedAnswers: ["React Navigation"], correctAnswers: ["React Navigation"] },
            { questionText: "How can you make a network request to an API?", selectedAnswers: ["Using the 'fetch' API"], correctAnswers: ["Both of the above"] },
            { questionText: "What is the purpose of 'async' and 'await' in JavaScript?", selectedAnswers: ["To declare a variable that cannot be changed"], correctAnswers: ["To work with Promises in a more synchronous-looking way"] },
            { questionText: "Which of these are core components in React Native?", selectedAnswers: ["<View>", "<Text>", "<div>"], correctAnswers: ["<View>", "<Text>"] },
        ]
    },
    recommendations: {
      identifiedGaps: ['State Management', 'Native Module Integration', 'Performance'],
      recommendedCourses: [
        { id: 'course-08', name: 'React Native for Beginners' },
        { id: 'course-01', name: 'Advanced React Patterns' },
      ],
      analysisSummary: 'The user shows a solid grasp of basic React Native components but struggles with advanced state management, performance optimizations, and integrating native device features.',
      analysisBullets: [
        '- Correctly answered questions related to core components and basic hooks.',
        '- Missed questions about state management libraries like Redux or Zustand.',
        '- Needs to improve understanding of list virtualization and network requests.',
        '- Could not identify the correct way to bridge a native module.'
      ],
      skillProficiency: [
        { skillArea: 'Core Components', proficiency: 80 },
        { skillArea: 'Styling & Layout', proficiency: 75 },
        { skillArea: 'State Management', proficiency: 40 },
        { skillArea: 'APIs & Networking', proficiency: 50 },
      ],
    },
  },
  {
    id: 'attempt-02',
    date: '2024-06-20',
    desiredJob: 'Backend Python Engineer',
    quiz: { 
        questions: [
            { questionText: "What is the primary use of a 'virtual environment' in Python?", options: ["To run code faster", "To isolate project dependencies", "To connect to a database"], allowMultiple: false, correctOptionIndex: 1, explanation: "Virtual environments create isolated spaces for Python projects, allowing each to have its own set of dependencies without conflicts." },
            { questionText: "In Django, what is the role of the ORM?", options: ["To handle URL routing", "To map Python objects to database tables", "To render HTML templates"], allowMultiple: false, correctOptionIndex: 1, explanation: "The Object-Relational Mapper (ORM) in Django allows you to interact with your database, like querying and saving data, using Python code instead of SQL." },
            { questionText: "Which of the following is NOT a standard HTTP method?", options: ["GET", "POST", "PUSH", "DELETE"], allowMultiple: false, correctOptionIndex: 2, explanation: "GET, POST, PUT, PATCH, and DELETE are standard HTTP methods. PUSH is not a standard method for REST APIs." },
            { questionText: "What is the purpose of an index in a database?", options: ["To speed up data retrieval operations", "To encrypt sensitive data", "To backup the database"], allowMultiple: false, correctOptionIndex: 0, explanation: "Database indexes are used to quickly locate data without having to search every row in a database table every time the table is accessed." },
            { questionText: "Which status code indicates a successful creation of a resource in a REST API?", options: ["200 OK", "201 Created", "204 No Content", "404 Not Found"], allowMultiple: false, correctOptionIndex: 1, explanation: "A 201 Created status code is the standard response after a POST request successfully creates a new resource on the server." },
            { questionText: "What is the difference between SQL and NoSQL databases?", options: ["SQL is for Windows, NoSQL is for Linux", "SQL databases are relational, NoSQL are non-relational", "SQL is faster than NoSQL"], allowMultiple: false, correctOptionIndex: 1, explanation: "The main difference is their data model. SQL databases use a structured, table-based model (relational), while NoSQL databases use various models like key-value, document, or graph." },
            { questionText: "What does 'JWT' stand for?", options: ["Java Web Token", "JavaScript Web Token", "JSON Web Token"], allowMultiple: false, correctOptionIndex: 2, explanation: "JWT stands for JSON Web Token, a compact, URL-safe means of representing claims to be transferred between two parties." },
            { questionText: "In Python, what is a decorator?", options: ["A way to style text in the console", "A function that takes another function and extends its behavior", "A special type of class for data storage"], allowMultiple: false, correctOptionIndex: 1, explanation: "Decorators are a powerful feature in Python that allow you to add functionality to an existing function without modifying its source code." },
            { questionText: "Which of these are common Python web frameworks?", options: ["Django", "Flask", "Rails", "Spring"], allowMultiple: true, correctOptionIndices: [0, 1], explanation: "Django and Flask are the two most popular Python web frameworks. Rails is a Ruby framework, and Spring is for Java." },
            { questionText: "What is the purpose of a 'requirements.txt' file?", options: ["To list the project's functional requirements", "To specify the exact versions of project dependencies", "A file containing user login credentials"], allowMultiple: false, correctOptionIndex: 1, explanation: "The 'requirements.txt' file is used by package managers like 'pip' to install the specific versions of Python packages that a project depends on, ensuring a consistent environment." },
        ] 
    },
    answers: { 
        answers: [
            { questionText: "What is the primary use of a 'virtual environment' in Python?", selectedAnswers: ["To isolate project dependencies"], correctAnswers: ["To isolate project dependencies"] },
            { questionText: "In Django, what is the role of the ORM?", selectedAnswers: ["To handle URL routing"], correctAnswers: ["To map Python objects to database tables"] },
            { questionText: "Which of the following is NOT a standard HTTP method?", selectedAnswers: ["PUSH"], correctAnswers: ["PUSH"] },
            { questionText: "What is the purpose of an index in a database?", selectedAnswers: ["To backup the database"], correctAnswers: ["To speed up data retrieval operations"] },
            { questionText: "Which status code indicates a successful creation of a resource in a REST API?", selectedAnswers: ["201 Created"], correctAnswers: ["201 Created"] },
            { questionText: "What is the difference between SQL and NoSQL databases?", selectedAnswers: ["SQL databases are relational, NoSQL are non-relational"], correctAnswers: ["SQL databases are relational, NoSQL are non-relational"] },
            { questionText: "What does 'JWT' stand for?", selectedAnswers: ["JavaScript Web Token"], correctAnswers: ["JSON Web Token"] },
            { questionText: "In Python, what is a decorator?", selectedAnswers: ["A special type of class for data storage"], correctAnswers: ["A function that takes another function and extends its behavior"] },
            { questionText: "Which of these are common Python web frameworks?", selectedAnswers: ["Django", "Rails"], correctAnswers: ["Django", "Flask"] },
            { questionText: "What is the purpose of a 'requirements.txt' file?", selectedAnswers: ["To specify the exact versions of project dependencies"], correctAnswers: ["To specify the exact versions of project dependencies"] },
        ] 
    },
    recommendations: {
      identifiedGaps: ['Database ORMs', 'API Authentication', 'Advanced Python'],
      recommendedCourses: [
        { id: 'course-05', name: 'Node.js and Express: The Complete Guide' },
        { id: 'course-02', name: 'Machine Learning A-Z' },
      ],
      analysisSummary: 'Strong fundamental Python skills, but lacks experience with web frameworks, database interaction, and API security concepts.',
      analysisBullets: [
          '- Excellently answered questions on Python fundamentals and data structures.',
          '- Had difficulty with questions related to Django/Flask frameworks and the role of an ORM.',
          '- Unfamiliar with concepts like JWT for API security and the purpose of database indexes.'
      ],
      skillProficiency: [
        { skillArea: 'Python Core', proficiency: 70 },
        { skillArea: 'Web Frameworks', proficiency: 30 },
        { skillArea: 'Databases', proficiency: 45 },
        { skillArea: 'API Design', proficiency: 50 },
      ],
    },
  },
];

  export const careerQuizHistory: CareerQuizAttempt[] = [
    {
        id: 'career-attempt-01',
        date: '2024-07-20',
        quiz: { 
            questions: [
                { questionText: "When facing a complex problem, what is your first instinct?", options: ["Break it down into smaller, logical steps", "Brainstorm as many creative ideas as possible", "Research how others have solved similar problems"], allowMultiple: false, correctOptionIndex: 0 },
                { questionText: "Which of these sounds most appealing?", options: ["Building a beautiful, intuitive user interface", "Designing a robust, scalable backend system", "Analyzing data to uncover hidden trends"], allowMultiple: false, correctOptionIndex: 0 },
            ]
        },
        answers: { 
            answers: [
                { questionText: "When facing a complex problem, what is your first instinct?", selectedAnswers: ["Brainstorm as many creative ideas as possible"] },
                { questionText: "Which of these sounds most appealing?", selectedAnswers: ["Building a beautiful, intuitive user interface"] },
            ] 
        },
        recommendations: {
            personalityAnalysis: {
                summary: 'Based on your previous attempt, you showed a strong inclination towards creative and user-focused roles. You enjoy brainstorming and thinking about the end-user experience.',
                traits: [
                    { trait: 'Analytical', score: 60 },
                    { trait: 'Creative', score: 90 },
                    { trait: 'Structured', score: 40 },
                    { trait: 'Collaborative', score: 75 },
                    { trait: 'Independent', score: 50 },
                    { trait: 'User-Focused', score: 85 },
                    { trait: 'Data-Driven', score: 30 },
                ],
            },
            careerFit: [
                { career: 'UI/UX Design', score: 92 },
                { career: 'Frontend Development', score: 80 },
                { career: 'Product Management', score: 75 },
                { career: 'Marketing', score: 68 },
                { career: 'Full-Stack Development', score: 60 },
                { career: 'Data Science', score: 40 },
                { career: 'Backend Development', score: 30 },
            ],
            recommendedJobs: ['UI/UX Designer', 'Frontend Developer', 'Product Designer'],
            recommendedCourses: [
                'UI Design Principles',
                'Advanced React Patterns',
                'Agile Product Management',
            ],
        },
    },
];

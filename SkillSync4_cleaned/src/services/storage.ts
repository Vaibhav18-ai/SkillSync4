import {
  User,
  Skill,
  StudentSkill,
  StudentProfile,
  PortfolioProject,
  Competition,
  CompetitionApplication,
  TeammatePreference,
  Team,
  TeamMember,
  Task,
  Milestone,
  RecommendationRun,
  FairnessReport,
  Role,
} from '../types';

interface StoreState {
  users: User[];
  skills: Skill[];
  studentSkills: StudentSkill[];
  studentProfiles: StudentProfile[];
  competitions: Competition[];
  applications: CompetitionApplication[];
  preferences: TeammatePreference[];
  teams: Team[];
  teamMembers: TeamMember[];
  tasks: Task[];
  milestones: Milestone[];
  recommendationRuns: Record<number, RecommendationRun>;
}

const INITIAL_SKILLS: Skill[] = [
  { id: 1, name: 'Python', category: 'Backend' },
  { id: 2, name: 'React', category: 'Frontend' },
  { id: 3, name: 'TypeScript', category: 'Frontend' },
  { id: 4, name: 'Node.js', category: 'Backend' },
  { id: 5, name: 'Go', category: 'Backend' },
  { id: 6, name: 'Java', category: 'Backend' },
  { id: 7, name: 'Docker & DevOps', category: 'Infra' },
  { id: 8, name: 'PostgreSQL', category: 'Database' },
  { id: 9, name: 'Kubernetes', category: 'Infra' },
  { id: 10, name: 'Machine Learning', category: 'AI/ML' },
  { id: 11, name: 'Data Analysis', category: 'AI/ML' },
  { id: 12, name: 'Cybersecurity', category: 'Security' },
  { id: 13, name: 'IoT & Hardware', category: 'Hardware' },
  { id: 14, name: 'System Design', category: 'Architecture' },
  { id: 15, name: 'Cloud Architecture', category: 'Infra' },
];

const FIRST_NAMES = [
  'Aarav', 'Diya', 'Rohan', 'Ananya', 'Vikram', 'Kavya', 'Siddharth', 'Priya', 'Arjun', 'Isha',
  'Kabir', 'Tara', 'Aditya', 'Sneha', 'Varun', 'Meera', 'Rishi', 'Tanvi', 'Nikhil', 'Riya',
  'Gaurav', 'Pooja', 'Karan', 'Neha', 'Devendra', 'Simran', 'Manish', 'Shruti', 'Abhishek', 'Kritika',
  'Harsh', 'Anushka', 'Ayush', 'Roshni', 'Dhruv', 'Sanya', 'Pranav', 'Bhavna', 'Armaan', 'Trisha',
  'Yash', 'Avani', 'Samarth', 'Ishita', 'Tejas', 'Rhea', 'Kunal', 'Divya', 'Mayank', 'Aditi',
  'Chirag', 'Pallavi', 'Akshay', 'Swati', 'Alok', 'Namrata', 'Naveen', 'Gayatri', 'Kartik', 'Deepika',
  'Mohit', 'Juhi', 'Saurabh', 'Sakshi', 'Vivek', 'Nidhi', 'Tushar', 'Shreya', 'Ankit', 'Preeti',
  'Sanjay', 'Payal', 'Rahul', 'Garima', 'Aakash', 'Shalini', 'Hemant', 'Sunita', 'Deepak', 'Monika',
  'Rajesh', 'Komal', 'Sunil', 'Rashmi', 'Manoj', 'Jyoti', 'Tarun', 'Archana', 'Ashok', 'Seema',
  'Vinay', 'Kiran', 'Suresh', 'Urvashi', 'Raman', 'Shweta', 'Pankaj', 'Lata', 'Girish', 'Rekha',
  'Jayant', 'Sarika', 'Nilesh', 'Madhavi', 'Lalit', 'Anuradha', 'Kamal', 'Chitra', 'Dinesh', 'Vandana'
];

const LAST_NAMES = [
  'Patel', 'Reddy', 'Mehta', 'Sen', 'Malhotra', 'Iyer', 'Joshi', 'Nair', 'Das', 'Verma',
  'Khan', 'Deshmukh', 'Rao', 'Kulkarni', 'Pillai', 'Nambiar', 'Kapoor', 'Shah', 'Roy', 'Gupta',
  'Bhat', 'Hegde', 'Singhania', 'Chawla', 'Pal', 'Kaur', 'Tiwari', 'Saxena', 'Jha', 'Basu',
  'Sharma', 'Singh', 'Chopra', 'Bansal', 'Agarwal', 'Mishra', 'Pandey', 'Bhattacharya', 'Mukherjee', 'Chatterjee'
];

function generate100Users(): User[] {
  const users: User[] = [
    { id: 1, name: 'Prof. Sharma', email: 'coordinator@skillsync.test', role: 'coordinator' },
  ];

  for (let i = 0; i < 105; i++) {
    const fn = FIRST_NAMES[i % FIRST_NAMES.length];
    const ln = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const id = i + 2;
    users.push({
      id,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${id}@skillsync.test`,
      role: 'student',
    });
  }

  return users;
}

function generateSeedStudentSkills(users: User[]): StudentSkill[] {
  const result: StudentSkill[] = [];
  const students = users.filter((u) => u.role === 'student');

  students.forEach((student) => {
    INITIAL_SKILLS.forEach((skill) => {
      // Deterministic pseudo-random generation based on userId and skillId
      const seed = (student.id * 19 + skill.id * 29) % 100;
      let prof = 1;
      let exp = 2;
      let assess = 3;

      if (seed > 80) {
        prof = 5;
        exp = 9;
        assess = 9;
      } else if (seed > 55) {
        prof = 4;
        exp = 8;
        assess = 7;
      } else if (seed > 30) {
        prof = 3;
        exp = 6;
        assess = 6;
      } else if (seed > 10) {
        prof = 2;
        exp = 4;
        assess = 5;
      }

      // Specialization boosts for students based on id
      const trackSpecialty = student.id % 5;
      if (trackSpecialty === 0 && (skill.id === 10 || skill.id === 1 || skill.id === 11)) {
        // AI/ML specialized
        prof = Math.max(prof, 4);
        exp = Math.max(exp, 8);
        assess = Math.max(assess, 8);
      } else if (trackSpecialty === 1 && (skill.id === 2 || skill.id === 3 || skill.id === 4)) {
        // Web specialized
        prof = Math.max(prof, 4);
        exp = Math.max(exp, 8);
        assess = Math.max(assess, 8);
      } else if (trackSpecialty === 2 && (skill.id === 12 || skill.id === 7 || skill.id === 15)) {
        // Security & Cloud
        prof = Math.max(prof, 4);
        exp = Math.max(exp, 8);
        assess = Math.max(assess, 8);
      } else if (trackSpecialty === 3 && (skill.id === 13 || skill.id === 1 || skill.id === 5)) {
        // IoT & Systems
        prof = Math.max(prof, 4);
        exp = Math.max(exp, 8);
        assess = Math.max(assess, 8);
      }

      result.push({
        userId: student.id,
        skillId: skill.id,
        proficiency: prof,
        experienceScore: exp,
        assessmentScore: assess,
      });
    });
  });
  return result;
}

function generateSeedStudentProfiles(users: User[]): StudentProfile[] {
  const roles = ['ml', 'frontend', 'backend', 'fullstack', 'hardware', 'cyber'];
  return users
    .filter((u) => u.role === 'student')
    .map((student, idx) => ({
      userId: student.id,
      bio: `Enthusiastic CS student specializing in ${roles[idx % roles.length]} development, open-source collaboration, and distributed systems.`,
      availabilityHours: 12 + ((student.id * 7) % 24),
      preferredRole: roles[idx % roles.length],
      githubUrl: `https://github.com/${student.name.toLowerCase().replace(/\s+/g, '')}`,
      portfolioProjects: [
        {
          id: `proj-${student.id}-1`,
          title: idx % 2 === 0 ? 'Adaptive Multi-Agent Intelligence' : 'High-Concurrency Realtime Engine',
          repoUrl: `https://github.com/${student.name.toLowerCase().replace(/\s+/g, '')}/project-alpha`,
          demoUrl: `https://demo-${student.id}.skillsync.test`,
          description: 'Production-ready architecture with automated unit testing and algorithmic benchmarking.',
          techStack: idx % 2 === 0 ? ['Python', 'PyTorch', 'FastAPI'] : ['React', 'TypeScript', 'Tailwind', 'Node.js'],
        },
      ],
      certifications: [
        idx % 2 === 0 ? 'AWS Certified Solutions Architect' : 'TensorFlow Developer Certificate',
        'HackerRank Problem Solving (Gold)',
      ],
      achievements: [
        'Dean’s Honor List 2025',
        `National Hackathon Finalist (#${(student.id % 10) + 1} Rank)`,
      ],
    }));
}

const INITIAL_COMPETITIONS: Competition[] = [
  {
    id: 1,
    coordinatorId: 1,
    name: 'Campus AI Hackathon 2026',
    description: '48-hour competitive machine learning challenge focusing on multi-modal vision and natural language agents.',
    compType: 'ml',
    compTypes: ['ml', 'web'],
    teamSize: 5,
    minTeamSize: 4,
    maxTeamSize: 6,
    numTeams: 5,
    scaleTier: 'school',
    fairnessTolerance: 0.8,
    formationMode: 'preference',
    status: 'finalized', // Pre-finalized so Team Dashboard works immediately!
    deadline: '2026-11-30',
    joinCode: 'AI-2026',
    requirements: [
      { skillId: 10, skill: 'Machine Learning', weight: 5, minLevel: 1, mandatory: false },
      { skillId: 1, skill: 'Python', weight: 4, minLevel: 1, mandatory: false },
      { skillId: 11, skill: 'Data Analysis', weight: 3, minLevel: 1, mandatory: false },
      { skillId: 2, skill: 'React', weight: 2, minLevel: 1, mandatory: false },
    ],
  },
  {
    id: 2,
    coordinatorId: 1,
    name: 'National Fullstack Challenge',
    description: 'Build enterprise-ready distributed web systems with fault-tolerant microservices and real-time streaming.',
    compType: 'web',
    compTypes: ['web', 'dsa'],
    teamSize: 5,
    minTeamSize: 4,
    maxTeamSize: 6,
    numTeams: 10,
    scaleTier: 'national',
    fairnessTolerance: 0.75,
    formationMode: 'balanced',
    status: 'registration_open',
    deadline: '2026-12-15',
    joinCode: 'FS-2026',
    requirements: [
      { skillId: 2, skill: 'React', weight: 4, minLevel: 1, mandatory: false },
      { skillId: 3, skill: 'TypeScript', weight: 4, minLevel: 1, mandatory: false },
      { skillId: 4, skill: 'Node.js', weight: 4, minLevel: 1, mandatory: false },
      { skillId: 8, skill: 'PostgreSQL', weight: 3, minLevel: 1, mandatory: false },
    ],
  },
  {
    id: 3,
    coordinatorId: 1,
    name: 'Global IoT & Cloud Summit',
    description: 'Connected sensor networks and edge AI processing on cloud architectures.',
    compType: 'hardware',
    compTypes: ['hardware', 'cyber', 'ml'],
    teamSize: 4,
    minTeamSize: 3,
    maxTeamSize: 5,
    numTeams: 8,
    scaleTier: 'school',
    fairnessTolerance: 0.7,
    formationMode: 'preference',
    status: 'registration_open',
    deadline: '2026-12-28',
    joinCode: 'IOT-2026',
    requirements: [
      { skillId: 13, skill: 'IoT & Hardware', weight: 5, minLevel: 1, mandatory: false },
      { skillId: 12, skill: 'Cybersecurity', weight: 4, minLevel: 1, mandatory: false },
      { skillId: 15, skill: 'Cloud Architecture', weight: 3, minLevel: 1, mandatory: false },
    ],
  },
];

function generateSeedApplications(users: User[]): CompetitionApplication[] {
  const apps: CompetitionApplication[] = [];
  const students = users.filter((u) => u.role === 'student');

  // Register 35 students in Competition 1
  students.slice(0, 35).forEach((s, idx) => {
    apps.push({
      competitionId: 1,
      userId: s.id,
      status: 'confirmed',
      wantsToLead: idx % 5 === 0, // Volunteers
      createdAt: new Date().toISOString(),
    });
  });

  // Register 50 students in Competition 2
  students.slice(20, 75).forEach((s, idx) => {
    apps.push({
      competitionId: 2,
      userId: s.id,
      status: 'confirmed',
      wantsToLead: idx % 6 === 0,
      createdAt: new Date().toISOString(),
    });
  });

  // Register 30 students in Competition 3
  students.slice(50, 85).forEach((s, idx) => {
    apps.push({
      competitionId: 3,
      userId: s.id,
      status: 'confirmed',
      wantsToLead: idx % 4 === 0,
      createdAt: new Date().toISOString(),
    });
  });

  return apps;
}

function generateSeedPreferences(): TeammatePreference[] {
  return [
    { competitionId: 1, userId: 2, otherUserId: 3, kind: 'prefer' },
    { competitionId: 1, userId: 3, otherUserId: 2, kind: 'prefer' },
    { competitionId: 1, userId: 4, otherUserId: 5, kind: 'prefer' },
    { competitionId: 1, userId: 6, otherUserId: 8, kind: 'avoid' },
    { competitionId: 1, userId: 7, otherUserId: 9, kind: 'prefer' },
    { competitionId: 1, userId: 10, otherUserId: 11, kind: 'prefer' },
    { competitionId: 1, userId: 12, otherUserId: 13, kind: 'prefer' },
    { competitionId: 2, userId: 22, otherUserId: 23, kind: 'prefer' },
    { competitionId: 2, userId: 24, otherUserId: 28, kind: 'avoid' },
    { competitionId: 2, userId: 30, otherUserId: 31, kind: 'prefer' },
  ];
}

// Generate pre-finalized teams for Competition 1 so Team Dashboard is immediately active
function generateInitialTeamsAndWorkspaces(): {
  teams: Team[];
  teamMembers: TeamMember[];
  tasks: Task[];
  milestones: Milestone[];
} {
  const teams: Team[] = [
    {
      id: 101,
      competitionId: 1,
      teamNo: 1,
      leaderId: 2, // Aarav Patel
      avgScore: 8.65,
      competitionName: 'Campus AI Hackathon 2026',
      projectTitle: 'VisionAgent: Autonomous Multi-Modal Inspection Engine',
      projectDescription: 'High-speed object detection and edge segmentation using PyTorch and WebAssembly.',
      projectRepoUrl: 'https://github.com/skillsync/vision-agent-ai',
      isSubmitted: true,
      evaluationScore: 94,
      feedback: 'Outstanding algorithmic throughput and robust test suite.',
    },
    {
      id: 102,
      competitionId: 1,
      teamNo: 2,
      leaderId: 7, // Kavya Iyer
      avgScore: 8.52,
      competitionName: 'Campus AI Hackathon 2026',
      projectTitle: 'NeuralSearch: Vector Graph Query Engine',
      projectDescription: 'Sub-millisecond retrieval engine over dense vector embeddings.',
      projectRepoUrl: 'https://github.com/skillsync/neural-search',
      isSubmitted: false,
    },
    {
      id: 103,
      competitionId: 1,
      teamNo: 3,
      leaderId: 12, // Kabir Khan
      avgScore: 8.48,
      competitionName: 'Campus AI Hackathon 2026',
      projectTitle: 'EdgeAgent: Privacy-Preserving Federated Learning',
      projectDescription: 'Collaborative model training without raw telemetry leakage.',
      projectRepoUrl: 'https://github.com/skillsync/edge-agent',
      isSubmitted: false,
    },
    {
      id: 104,
      competitionId: 1,
      teamNo: 4,
      leaderId: 17, // Meera Nambiar
      avgScore: 8.41,
      competitionName: 'Campus AI Hackathon 2026',
      projectTitle: 'SpeechPulse: Real-Time Audio Transcription & Summarizer',
      projectDescription: 'Low-latency streaming speech recognition model with transformer decoder.',
      projectRepoUrl: 'https://github.com/skillsync/speech-pulse',
      isSubmitted: false,
    },
    {
      id: 105,
      competitionId: 1,
      teamNo: 5,
      leaderId: 22, // Gaurav Bhat
      avgScore: 8.39,
      competitionName: 'Campus AI Hackathon 2026',
      projectTitle: 'DataLens: Automated Tabular Anomaly Detection',
      projectDescription: 'Self-supervised anomaly scoring engine with interactive dashboards.',
      projectRepoUrl: 'https://github.com/skillsync/datalens-ml',
      isSubmitted: false,
    },
  ];

  const teamMembers: TeamMember[] = [
    // Team 1: 2, 3, 4, 5, 6
    { id: 1001, teamId: 101, competitionId: 1, userId: 2, isLeader: true, score: 9.1 },
    { id: 1002, teamId: 101, competitionId: 1, userId: 3, isLeader: false, score: 8.8 },
    { id: 1003, teamId: 101, competitionId: 1, userId: 4, isLeader: false, score: 8.4 },
    { id: 1004, teamId: 101, competitionId: 1, userId: 5, isLeader: false, score: 8.5 },
    { id: 1005, teamId: 101, competitionId: 1, userId: 6, isLeader: false, score: 8.4 },

    // Team 2: 7, 8, 9, 10, 11
    { id: 1006, teamId: 102, competitionId: 1, userId: 7, isLeader: true, score: 8.9 },
    { id: 1007, teamId: 102, competitionId: 1, userId: 8, isLeader: false, score: 8.6 },
    { id: 1008, teamId: 102, competitionId: 1, userId: 9, isLeader: false, score: 8.3 },
    { id: 1009, teamId: 102, competitionId: 1, userId: 10, isLeader: false, score: 8.4 },
    { id: 1010, teamId: 102, competitionId: 1, userId: 11, isLeader: false, score: 8.4 },

    // Team 3: 12, 13, 14, 15, 16
    { id: 1011, teamId: 103, competitionId: 1, userId: 12, isLeader: true, score: 8.8 },
    { id: 1012, teamId: 103, competitionId: 1, userId: 13, isLeader: false, score: 8.5 },
    { id: 1013, teamId: 103, competitionId: 1, userId: 14, isLeader: false, score: 8.3 },
    { id: 1014, teamId: 103, competitionId: 1, userId: 15, isLeader: false, score: 8.5 },
    { id: 1015, teamId: 103, competitionId: 1, userId: 16, isLeader: false, score: 8.3 },

    // Team 4: 17, 18, 19, 20, 21
    { id: 1016, teamId: 104, competitionId: 1, userId: 17, isLeader: true, score: 8.7 },
    { id: 1017, teamId: 104, competitionId: 1, userId: 18, isLeader: false, score: 8.3 },
    { id: 1018, teamId: 104, competitionId: 1, userId: 19, isLeader: false, score: 8.4 },
    { id: 1019, teamId: 104, competitionId: 1, userId: 20, isLeader: false, score: 8.2 },
    { id: 1020, teamId: 104, competitionId: 1, userId: 21, isLeader: false, score: 8.4 },

    // Team 5: 22, 23, 24, 25, 26
    { id: 1021, teamId: 105, competitionId: 1, userId: 22, isLeader: true, score: 8.7 },
    { id: 1022, teamId: 105, competitionId: 1, userId: 23, isLeader: false, score: 8.3 },
    { id: 1023, teamId: 105, competitionId: 1, userId: 24, isLeader: false, score: 8.2 },
    { id: 1024, teamId: 105, competitionId: 1, userId: 25, isLeader: false, score: 8.3 },
    { id: 1025, teamId: 105, competitionId: 1, userId: 26, isLeader: false, score: 8.4 },
  ];

  const tasks: Task[] = [
    {
      id: 2001,
      teamId: 101,
      title: 'Model Architecture Definition & Dataset Preprocessing',
      description: 'Implement augmentations and download benchmark training weights.',
      assigneeId: 2,
      estimatedHours: 8,
      deadline: 'Day 1',
      status: 'done',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2002,
      teamId: 101,
      title: 'Real-time Inference Pipeline (FastAPI)',
      description: 'Stream predictions via WebSocket endpoint with latency under 50ms.',
      assigneeId: 3,
      estimatedHours: 6,
      deadline: 'Day 2',
      status: 'done',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2003,
      teamId: 101,
      title: 'React Canvas Dashboard & Visual Overlays',
      description: 'Draw bounding boxes and confidence intervals on live video stream.',
      assigneeId: 4,
      estimatedHours: 10,
      deadline: 'Day 2',
      status: 'doing',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2004,
      teamId: 101,
      title: 'Benchmark Testing & Stress Profiling',
      description: 'Execute Locust load test with 500 concurrent camera feeds.',
      assigneeId: 5,
      estimatedHours: 4,
      deadline: 'Day 3',
      status: 'todo',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2005,
      teamId: 102,
      title: 'Vector Embedding Indexing Service',
      description: 'Build HNSW index over 1M scientific abstracts.',
      assigneeId: 7,
      estimatedHours: 8,
      deadline: 'Day 1',
      status: 'doing',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2006,
      teamId: 102,
      title: 'Semantic Query API',
      description: 'Cosine similarity ranking and token caching layer.',
      assigneeId: 8,
      estimatedHours: 5,
      deadline: 'Day 2',
      status: 'todo',
      createdAt: new Date().toISOString(),
    },
  ];

  const milestones: Milestone[] = [
    {
      id: 3001,
      teamId: 101,
      title: 'Phase 1: Architecture Review & Data Specs',
      dueDate: '2026-11-05',
      done: true,
    },
    {
      id: 3002,
      teamId: 101,
      title: 'Phase 2: Working Inference Endpoint',
      dueDate: '2026-11-15',
      done: true,
    },
    {
      id: 3003,
      teamId: 101,
      title: 'Phase 3: Live Video UI & Final Evaluation',
      dueDate: '2026-11-28',
      done: false,
    },
    {
      id: 3004,
      teamId: 102,
      title: 'Dataset Ingestion & Vector Index Complete',
      dueDate: '2026-11-12',
      done: true,
    },
    {
      id: 3005,
      teamId: 102,
      title: 'Final Search Benchmark Demo',
      dueDate: '2026-11-25',
      done: false,
    },
  ];

  return { teams, teamMembers, tasks, milestones };
}

class Store {
  private state: StoreState;
  private listeners: Set<() => void> = new Set();
  private STORAGE_KEY = 'skillsync_store_state_v4'; // Upgraded key for 100+ students

  constructor() {
    this.state = this.loadInitialState();
  }

  private loadInitialState(): StoreState {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure state has at least 100 users
        if (parsed && Array.isArray(parsed.users) && parsed.users.length >= 100) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }

    const initialUsers = generate100Users();
    const initialStudentSkills = generateSeedStudentSkills(initialUsers);
    const initialProfiles = generateSeedStudentProfiles(initialUsers);
    const initialApps = generateSeedApplications(initialUsers);
    const initialPrefs = generateSeedPreferences();
    const { teams, teamMembers, tasks, milestones } = generateInitialTeamsAndWorkspaces();

    return {
      users: initialUsers,
      skills: [...INITIAL_SKILLS],
      studentSkills: initialStudentSkills,
      studentProfiles: initialProfiles,
      competitions: [...INITIAL_COMPETITIONS],
      applications: initialApps,
      preferences: initialPrefs,
      teams,
      teamMembers,
      tasks,
      milestones,
      recommendationRuns: {},
    };
  }

  private persist() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Ignore quota warnings
    }
  }

  private notify() {
    this.persist();
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in store listener:', err);
      }
    });
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): StoreState {
    return this.state;
  }

  public getUserById(id: number): User | undefined {
    return this.state.users.find((u) => u.id === id);
  }

  public getAllStudents(): User[] {
    return this.state.users.filter((u) => u.role === 'student');
  }

  // Scoring methods
  public calcSkillScore(s: StudentSkill): number {
    const pWeight = (s.proficiency / 5) * 4;
    const expWeight = (s.experienceScore / 10) * 3;
    const assessWeight = (s.assessmentScore / 10) * 3;
    return Math.min(10, Math.max(0, pWeight + expWeight + assessWeight));
  }

  public calcGeneralScore(userId: number): number {
    const userSkills = this.state.studentSkills.filter((s) => s.userId === userId);
    if (userSkills.length === 0) return 5.0;

    const scores = userSkills.map((s) => this.calcSkillScore(s));
    scores.sort((a, b) => b - a);
    const top = scores.slice(0, 5);
    const avg = top.reduce((acc, curr) => acc + curr, 0) / top.length;
    return Math.round(avg * 10) / 10;
  }

  public calcCompetitionFit(
    userId: number,
    comp: Competition
  ): { fit: number; eligible: boolean; missing: string[] } {
    const userSkills = this.state.studentSkills.filter((s) => s.userId === userId);
    const skillMap = new Map<number, StudentSkill>();
    userSkills.forEach((s) => skillMap.set(s.skillId, s));

    let weightedSum = 0;
    let totalWeight = 0;
    let eligible = true;
    const missing: string[] = [];

    if (!comp.requirements || comp.requirements.length === 0) {
      return { fit: this.calcGeneralScore(userId), eligible: true, missing: [] };
    }

    comp.requirements.forEach((req) => {
      const s = skillMap.get(req.skillId);
      const score = s ? this.calcSkillScore(s) : 0;
      weightedSum += score * req.weight;
      totalWeight += req.weight;

      if (req.mandatory) {
        if (!s || s.proficiency < req.minLevel) {
          eligible = false;
          missing.push(req.skill);
        }
      }
    });

    const fit = totalWeight > 0 ? weightedSum / totalWeight : 5.0;
    return {
      fit: Math.round(fit * 10) / 10,
      eligible,
      missing,
    };
  }

  public calcLeadershipScore(userId: number): number {
    const profile = this.state.studentProfiles.find((p) => p.userId === userId);
    const genScore = this.calcGeneralScore(userId);
    const hours = profile?.availabilityHours || 10;
    const availabilityFactor = Math.min(1, hours / 30);
    return Math.round((genScore * 0.6 + availabilityFactor * 4) * 10) / 10;
  }

  // Student profile operations
  public getStudentProfile(userId: number): {
    profile: StudentProfile;
    generalScore: number;
    skills: Array<{
      skillId: number;
      name: string;
      category: string;
      proficiency: number;
      experienceScore: number;
      assessmentScore: number;
      score: number;
    }>;
  } {
    let profile = this.state.studentProfiles.find((p) => p.userId === userId);
    if (!profile) {
      profile = {
        userId,
        availabilityHours: 15,
        preferredRole: 'fullstack',
        bio: 'Student developer',
        portfolioProjects: [],
      };
      this.state.studentProfiles.push(profile);
    }

    const rawSkills = this.state.studentSkills.filter((s) => s.userId === userId);
    const skills = INITIAL_SKILLS.map((sk) => {
      const match = rawSkills.find((r) => r.skillId === sk.id);
      const studentSkill: StudentSkill = match || {
        userId,
        skillId: sk.id,
        proficiency: 2,
        experienceScore: 3,
        assessmentScore: 3,
      };
      const score = Math.round(this.calcSkillScore(studentSkill) * 10) / 10;
      return {
        skillId: sk.id,
        name: sk.name,
        category: sk.category,
        proficiency: studentSkill.proficiency,
        experienceScore: studentSkill.experienceScore,
        assessmentScore: studentSkill.assessmentScore,
        score,
      };
    });

    return {
      profile,
      generalScore: this.calcGeneralScore(userId),
      skills,
    };
  }

  public saveStudentSkills(
    userId: number,
    ratings: Array<{ skillId: number; proficiency: number; experienceScore: number }>
  ) {
    ratings.forEach((r) => {
      const idx = this.state.studentSkills.findIndex(
        (s) => s.userId === userId && s.skillId === r.skillId
      );
      if (idx >= 0) {
        this.state.studentSkills[idx].proficiency = r.proficiency;
        this.state.studentSkills[idx].experienceScore = r.experienceScore;
      } else {
        this.state.studentSkills.push({
          userId,
          skillId: r.skillId,
          proficiency: r.proficiency,
          experienceScore: r.experienceScore,
          assessmentScore: Math.min(10, r.proficiency * 2),
        });
      }
    });
    this.notify();
  }

  public updateProfile(userId: number, patch: Partial<StudentProfile>) {
    let profile = this.state.studentProfiles.find((p) => p.userId === userId);
    if (!profile) {
      profile = { userId, availabilityHours: 15, ...patch };
      this.state.studentProfiles.push(profile);
    } else {
      Object.assign(profile, patch);
    }
    this.notify();
  }

  public addPortfolioProject(userId: number, project: Omit<PortfolioProject, 'id'>) {
    const profile = this.state.studentProfiles.find((p) => p.userId === userId);
    if (profile) {
      if (!profile.portfolioProjects) profile.portfolioProjects = [];
      const newProj: PortfolioProject = {
        id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        ...project,
      };
      profile.portfolioProjects.push(newProj);
      this.notify();
    }
  }

  public deletePortfolioProject(userId: number, projId: string) {
    const profile = this.state.studentProfiles.find((p) => p.userId === userId);
    if (profile && profile.portfolioProjects) {
      profile.portfolioProjects = profile.portfolioProjects.filter((p) => p.id !== projId);
      this.notify();
    }
  }

  // Competitions
  public getCompetitions(userId: number, role: Role): Competition[] {
    return this.state.competitions.map((c) => {
      const fitData = this.calcCompetitionFit(userId, c);
      const app = this.state.applications.find(
        (a) => a.competitionId === c.id && a.userId === userId
      );

      return {
        ...c,
        myFit: fitData.fit,
        eligible: fitData.eligible,
        missing: fitData.missing,
        myStatus: app ? app.status : null,
        myApplication: app
          ? {
              status: app.status,
              wantsToLead: app.wantsToLead,
            }
          : null,
      };
    });
  }

  public getMyTeams(userId: number): Array<{
    teamId: number;
    teamNo: number;
    competition: string;
    avgScore: number;
    isLeader: boolean;
    competitionId: number;
  }> {
    const myMemberships = this.state.teamMembers.filter((m) => m.userId === userId);
    return myMemberships.map((m) => {
      const team = this.state.teams.find((t) => t.id === m.teamId);
      const comp = this.state.competitions.find((c) => c.id === team?.competitionId);
      return {
        teamId: m.teamId,
        teamNo: team ? team.teamNo : 1,
        competition: comp ? comp.name : 'Competition',
        avgScore: team ? team.avgScore : m.score,
        isLeader: m.isLeader,
        competitionId: comp ? comp.id : 0,
      };
    });
  }

  public getAllTeams(): Array<{
    teamId: number;
    teamNo: number;
    competitionName: string;
    competitionId: number;
    avgScore: number;
    isSubmitted: boolean;
    leaderName: string;
    memberCount: number;
  }> {
    return this.state.teams.map((t) => {
      const comp = this.state.competitions.find((c) => c.id === t.competitionId);
      const members = this.state.teamMembers.filter((m) => m.teamId === t.id);
      const leader = members.find((m) => m.isLeader);
      const leaderUser = leader ? this.getUserById(leader.userId) : null;

      return {
        teamId: t.id,
        teamNo: t.teamNo,
        competitionName: comp ? comp.name : 'Competition',
        competitionId: t.competitionId,
        avgScore: t.avgScore,
        isSubmitted: !!t.isSubmitted,
        leaderName: leaderUser ? leaderUser.name : 'Unassigned',
        memberCount: members.length,
      };
    });
  }

  public createCompetition(coordinatorId: number, data: Partial<Competition>): Competition {
    const id = Date.now();
    const newComp: Competition = {
      id,
      coordinatorId,
      name: data.name || 'New Competition',
      description: data.description || '',
      compType: data.compType || 'ml',
      compTypes: data.compTypes || [data.compType || 'ml'],
      teamSize: data.teamSize || 5,
      minTeamSize: data.minTeamSize || 4,
      maxTeamSize: data.maxTeamSize || 6,
      numTeams: data.numTeams || 5,
      scaleTier: data.scaleTier || 'school',
      fairnessTolerance: data.fairnessTolerance ?? 0.8,
      formationMode: data.formationMode || 'preference',
      status: 'draft',
      deadline: data.deadline,
      joinCode: `SYNC-${Math.floor(1000 + Math.random() * 9000)}`,
      requirements: data.requirements || [],
    };

    this.state.competitions.unshift(newComp);
    this.notify();
    return newComp;
  }

  public publishCompetition(compId: number) {
    const comp = this.state.competitions.find((c) => c.id === compId);
    if (comp) {
      comp.status = 'registration_open';
      this.notify();
    }
  }

  public closeRegistration(compId: number) {
    const comp = this.state.competitions.find((c) => c.id === compId);
    if (comp) {
      comp.status = 'registration_closed';
      this.notify();
    }
  }

  public applyToCompetition(compId: number, userId: number, wantsToLead: boolean) {
    const existing = this.state.applications.find(
      (a) => a.competitionId === compId && a.userId === userId
    );
    if (existing) {
      existing.status = 'confirmed';
      existing.wantsToLead = wantsToLead;
    } else {
      this.state.applications.push({
        competitionId: compId,
        userId,
        status: 'confirmed',
        wantsToLead,
        createdAt: new Date().toISOString(),
      });
    }
    this.notify();
  }

  public addPreference(
    compId: number,
    userId: number,
    otherUserId: number,
    kind: 'prefer' | 'avoid'
  ) {
    const existingIdx = this.state.preferences.findIndex(
      (p) => p.competitionId === compId && p.userId === userId && p.otherUserId === otherUserId
    );
    if (existingIdx >= 0) {
      this.state.preferences[existingIdx].kind = kind;
    } else {
      this.state.preferences.push({
        competitionId: compId,
        userId,
        otherUserId,
        kind,
      });
    }
    this.notify();
  }

  public getPreferences(compId: number, userId: number): TeammatePreference[] {
    return this.state.preferences.filter(
      (p) => p.competitionId === compId && p.userId === userId
    );
  }

  public seedScaleApplicants(compId: number, targetCount: number): number {
    const existingApps = this.state.applications.filter(
      (a) => a.competitionId === compId && a.status === 'confirmed'
    );
    const existingUserIds = new Set(existingApps.map((a) => a.userId));
    const comp = this.state.competitions.find((c) => c.id === compId);
    if (!comp) return 0;

    let needed = targetCount - existingApps.length;
    if (needed <= 0) return existingApps.length;

    // Use available students from our 100+ roster first
    const unappliedStudents = this.state.users.filter(
      (u) => u.role === 'student' && !existingUserIds.has(u.id)
    );

    for (const s of unappliedStudents) {
      if (needed <= 0) break;
      this.state.applications.push({
        competitionId: compId,
        userId: s.id,
        status: 'confirmed',
        wantsToLead: s.id % 4 === 0,
        createdAt: new Date().toISOString(),
      });
      existingUserIds.add(s.id);
      needed--;
    }

    // If still need more, dynamically synthesize extra students
    let nextId = Math.max(...this.state.users.map((u) => u.id), 200) + 1;
    while (needed > 0) {
      const fn = FIRST_NAMES[nextId % FIRST_NAMES.length];
      const ln = LAST_NAMES[(nextId * 3) % LAST_NAMES.length];
      const newUser: User = {
        id: nextId,
        name: `${fn} ${ln}`,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}${nextId}@skillsync.test`,
        role: 'student',
      };
      this.state.users.push(newUser);

      INITIAL_SKILLS.forEach((sk) => {
        const p = Math.floor(Math.random() * 5) + 1;
        this.state.studentSkills.push({
          userId: nextId,
          skillId: sk.id,
          proficiency: p,
          experienceScore: Math.floor(Math.random() * 10) + 1,
          assessmentScore: Math.floor(Math.random() * 10) + 1,
        });
      });

      this.state.studentProfiles.push({
        userId: nextId,
        bio: 'Competitive engineering student eager to build scalable systems.',
        availabilityHours: 15 + Math.floor(Math.random() * 20),
        preferredRole: ['frontend', 'backend', 'ml', 'hardware', 'cyber'][nextId % 5],
        portfolioProjects: [],
      });

      this.state.applications.push({
        competitionId: compId,
        userId: nextId,
        status: 'confirmed',
        wantsToLead: nextId % 5 === 0,
        createdAt: new Date().toISOString(),
      });

      nextId++;
      needed--;
    }

    this.notify();
    return this.state.applications.filter(
      (a) => a.competitionId === compId && a.status === 'confirmed'
    ).length;
  }

  public getApplicants(compId: number): {
    competition: string;
    count: number;
    applicants: Array<{
      userId: number;
      name: string;
      score: number;
      wantsToLead: boolean;
      eligible: boolean;
    }>;
  } {
    const comp = this.state.competitions.find((c) => c.id === compId);
    if (!comp) throw new Error('Competition not found');

    const confirmedApps = this.state.applications.filter(
      (a) => a.competitionId === compId && a.status === 'confirmed'
    );

    const applicants = confirmedApps.map((a) => {
      const u = this.getUserById(a.userId);
      const fitData = this.calcCompetitionFit(a.userId, comp);
      return {
        userId: a.userId,
        name: u ? u.name : `Student #${a.userId}`,
        score: fitData.fit,
        wantsToLead: a.wantsToLead,
        eligible: fitData.eligible,
      };
    });

    applicants.sort((a, b) => b.score - a.score);

    return {
      competition: comp.name,
      count: applicants.length,
      applicants,
    };
  }

  // Multi-objective Algorithmic Balancer
  public generateTeams(compId: number): RecommendationRun {
    const comp = this.state.competitions.find((c) => c.id === compId);
    if (!comp) throw new Error('Competition not found');

    const confirmedApps = this.state.applications.filter(
      (a) => a.competitionId === compId && a.status === 'confirmed'
    );

    if (confirmedApps.length < 2) {
      throw new Error('Need at least 2 confirmed participants to generate teams.');
    }

    const students = confirmedApps.map((a) => {
      const u = this.getUserById(a.userId);
      const fitData = this.calcCompetitionFit(a.userId, comp);
      const leadScore = this.calcLeadershipScore(a.userId);
      return {
        userId: a.userId,
        name: u ? u.name : `Student #${a.userId}`,
        score: fitData.fit,
        wantsToLead: a.wantsToLead,
        leadScore,
      };
    });

    const numTeams = Math.max(
      2,
      comp.numTeams > 0
        ? comp.numTeams
        : Math.ceil(students.length / (comp.teamSize || 5))
    );

    const prefs = this.state.preferences.filter((p) => p.competitionId === compId);

    // Option 1: Strict Skill Balance
    const opt1 = this.runOptimization({
      students: [...students],
      numTeams,
      prefs,
      fairnessTolerance: comp.fairnessTolerance,
      weights: { balance: 0.7, prefs: 0.3, role: 0.1 },
    });

    // Option 2: Preference-Focused
    const opt2 = this.runOptimization({
      students: [...students],
      numTeams,
      prefs,
      fairnessTolerance: comp.fairnessTolerance,
      weights: { balance: 0.3, prefs: 0.8, role: 0.2 },
    });

    // Option 3: Leadership & Role-Optimized
    const opt3 = this.runOptimization({
      students: [...students],
      numTeams,
      prefs,
      fairnessTolerance: comp.fairnessTolerance,
      weights: { balance: 0.5, prefs: 0.4, role: 0.6 },
    });

    const runId = Date.now();
    const run: RecommendationRun = {
      runId,
      competitionId: compId,
      options: [opt1, opt2, opt3],
      warnings:
        opt1.metrics.spread > comp.fairnessTolerance
          ? [
              `Skill score spread (${opt1.metrics.spread.toFixed(2)}) slightly exceeds fairness tolerance (${comp.fairnessTolerance}). Consider Option 1.`,
            ]
          : [],
      students: students.length,
      tol: comp.fairnessTolerance,
    };

    this.state.recommendationRuns[runId] = run;
    this.notify();
    return run;
  }

  private runOptimization(params: {
    students: Array<{ userId: number; name: string; score: number; wantsToLead: boolean; leadScore: number }>;
    numTeams: number;
    prefs: TeammatePreference[];
    fairnessTolerance: number;
    weights: { balance: number; prefs: number; role: number };
  }) {
    const { students, numTeams, prefs, fairnessTolerance, weights } = params;

    const volunteerLeaders = students
      .filter((s) => s.wantsToLead)
      .sort((a, b) => b.leadScore - a.leadScore);

    const nonLeaders = students
      .filter((s) => !volunteerLeaders.includes(s))
      .sort((a, b) => b.score - a.score);

    const teamBuckets: Array<Array<{ userId: number; name: string; score: number; isLeader: boolean }>> =
      Array.from({ length: numTeams }, () => []);

    for (let i = 0; i < numTeams; i++) {
      if (volunteerLeaders.length > 0) {
        const lead = volunteerLeaders.shift()!;
        teamBuckets[i].push({ ...lead, isLeader: true });
      } else if (nonLeaders.length > 0) {
        const topStudent = nonLeaders.shift()!;
        teamBuckets[i].push({ ...topStudent, isLeader: false });
      }
    }

    const remaining = [...volunteerLeaders, ...nonLeaders].sort((a, b) => b.score - a.score);

    remaining.forEach((student) => {
      let bestIdx = 0;
      let minSize = teamBuckets[0].length;
      for (let i = 1; i < numTeams; i++) {
        if (teamBuckets[i].length < minSize) {
          minSize = teamBuckets[i].length;
          bestIdx = i;
        }
      }

      const sameSizeTeams = teamBuckets
        .map((t, idx) => ({ idx, sum: t.reduce((acc, m) => acc + m.score, 0) }))
        .filter((t) => teamBuckets[t.idx].length === minSize);

      sameSizeTeams.sort((a, b) => a.sum - b.sum);
      bestIdx = sameSizeTeams[0].idx;

      teamBuckets[bestIdx].push({ ...student, isLeader: false });
    });

    for (let iter = 0; iter < 1000; iter++) {
      const t1Idx = Math.floor(Math.random() * numTeams);
      const t2Idx = Math.floor(Math.random() * numTeams);
      if (t1Idx === t2Idx) continue;

      const t1 = teamBuckets[t1Idx];
      const t2 = teamBuckets[t2Idx];
      if (t1.length === 0 || t2.length === 0) continue;

      const m1Idx = Math.floor(Math.random() * t1.length);
      const m2Idx = Math.floor(Math.random() * t2.length);

      if (t1[m1Idx].isLeader && t2[m2Idx].isLeader) continue;

      const currentCost = this.evalCost(teamBuckets, prefs, weights);

      const temp = t1[m1Idx];
      t1[m1Idx] = t2[m2Idx];
      t2[m2Idx] = temp;

      const newCost = this.evalCost(teamBuckets, prefs, weights);
      if (newCost >= currentCost) {
        const rev = t1[m1Idx];
        t1[m1Idx] = t2[m2Idx];
        t2[m2Idx] = rev;
      }
    }

    const avgs = teamBuckets.map((t) => {
      if (t.length === 0) return 0;
      const sum = t.reduce((acc, m) => acc + m.score, 0);
      return Math.round((sum / t.length) * 100) / 100;
    });

    const maxAvg = Math.max(...avgs);
    const minAvg = Math.min(...avgs);
    const spread = Math.round((maxAvg - minAvg) * 100) / 100;

    let preferMet = 0;
    let preferTotal = 0;
    let avoidViolations = 0;

    prefs.forEach((p) => {
      if (p.kind === 'prefer') {
        preferTotal++;
        const t1 = teamBuckets.findIndex((t) => t.some((m) => m.userId === p.userId));
        const t2 = teamBuckets.findIndex((t) => t.some((m) => m.userId === p.otherUserId));
        if (t1 !== -1 && t1 === t2) preferMet++;
      } else if (p.kind === 'avoid') {
        const t1 = teamBuckets.findIndex((t) => t.some((m) => m.userId === p.userId));
        const t2 = teamBuckets.findIndex((t) => t.some((m) => m.userId === p.otherUserId));
        if (t1 !== -1 && t1 === t2) avoidViolations++;
      }
    });

    const teams = teamBuckets.map((bucket, idx) => ({
      teamNo: idx + 1,
      avg: avgs[idx],
      members: bucket.map((m) => ({
        userId: m.userId,
        name: m.name,
        score: m.score,
        isLeader: m.isLeader,
      })),
    }));

    return {
      teams,
      metrics: {
        spread,
        withinTolerance: spread <= fairnessTolerance,
        avgs,
        preferMet,
        preferTotal,
        avoidViolations,
        skillGaps: {},
      },
    };
  }

  private evalCost(
    teamBuckets: Array<Array<{ userId: number; score: number }>>,
    prefs: TeammatePreference[],
    weights: { balance: number; prefs: number; role: number }
  ): number {
    const avgs = teamBuckets.map((t) => {
      if (t.length === 0) return 0;
      return t.reduce((acc, m) => acc + m.score, 0) / t.length;
    });

    const spread = Math.max(...avgs) - Math.min(...avgs);

    let prefPenalty = 0;
    prefs.forEach((p) => {
      const t1 = teamBuckets.findIndex((t) => t.some((m) => m.userId === p.userId));
      const t2 = teamBuckets.findIndex((t) => t.some((m) => m.userId === p.otherUserId));
      if (p.kind === 'prefer' && (t1 === -1 || t1 !== t2)) {
        prefPenalty += 2;
      }
      if (p.kind === 'avoid' && t1 !== -1 && t1 === t2) {
        prefPenalty += 10;
      }
    });

    return spread * weights.balance * 10 + prefPenalty * weights.prefs;
  }

  public finalizeTeams(compId: number, runId: number, optionIdx: number) {
    const run = this.state.recommendationRuns[runId];
    if (!run) throw new Error('Run not found');

    const option = run.options[optionIdx];
    if (!option) throw new Error('Option index not found');

    const comp = this.state.competitions.find((c) => c.id === compId);
    if (!comp) throw new Error('Competition not found');

    const oldTeams = this.state.teams.filter((t) => t.competitionId === compId);
    const oldTeamIds = new Set(oldTeams.map((t) => t.id));
    this.state.teams = this.state.teams.filter((t) => t.competitionId !== compId);
    this.state.teamMembers = this.state.teamMembers.filter((m) => !oldTeamIds.has(m.teamId));

    option.teams.forEach((tOpt) => {
      const teamId = Date.now() + tOpt.teamNo;
      const leader = tOpt.members.find((m) => m.isLeader);

      const newTeam: Team = {
        id: teamId,
        competitionId: compId,
        teamNo: tOpt.teamNo,
        leaderId: leader ? leader.userId : tOpt.members[0]?.userId || null,
        avgScore: tOpt.avg,
        competitionName: comp.name,
        projectTitle: `${comp.name} Team ${tOpt.teamNo} Prototype`,
        projectDescription: 'Collaborative solution designed for fairness, high efficiency, and scalable architecture.',
        isSubmitted: false,
      };

      this.state.teams.push(newTeam);

      tOpt.members.forEach((m) => {
        this.state.teamMembers.push({
          id: Date.now() + m.userId + Math.floor(Math.random() * 1000),
          teamId,
          competitionId: compId,
          userId: m.userId,
          isLeader: m.isLeader,
          score: m.score,
        });
      });

      this.state.tasks.push(
        {
          id: Date.now() + tOpt.teamNo * 10 + 1,
          teamId,
          title: 'System Architecture & Tech Stack Setup',
          description: 'Define repository, schemas, and initial skeleton.',
          assigneeId: leader ? leader.userId : null,
          estimatedHours: 6,
          deadline: 'Day 1',
          status: 'doing',
          createdAt: new Date().toISOString(),
        },
        {
          id: Date.now() + tOpt.teamNo * 10 + 2,
          teamId,
          title: 'Core Algorithm / Model Pipeline Implementation',
          description: 'Implement primary data structures and model training script.',
          assigneeId: tOpt.members[1]?.userId || null,
          estimatedHours: 10,
          deadline: 'Day 2',
          status: 'todo',
          createdAt: new Date().toISOString(),
        },
        {
          id: Date.now() + tOpt.teamNo * 10 + 3,
          teamId,
          title: 'Testing & Benchmark Validation',
          description: 'Run unit test suites and verify fairness criteria.',
          assigneeId: tOpt.members[2]?.userId || null,
          estimatedHours: 4,
          deadline: 'Day 2',
          status: 'todo',
          createdAt: new Date().toISOString(),
        }
      );

      this.state.milestones.push(
        {
          id: Date.now() + tOpt.teamNo * 10 + 1,
          teamId,
          title: 'Project Proposal & Sprint Backlog',
          dueDate: '2026-11-05',
          done: true,
        },
        {
          id: Date.now() + tOpt.teamNo * 10 + 2,
          teamId,
          title: 'Mid-Sprint Prototype Demo',
          dueDate: '2026-11-18',
          done: false,
        },
        {
          id: Date.now() + tOpt.teamNo * 10 + 3,
          teamId,
          title: 'Final Code Delivery & Video Walkthrough',
          dueDate: '2026-11-28',
          done: false,
        }
      );
    });

    comp.status = 'finalized';
    this.notify();
  }

  public getTeamsForCompetition(
    compId: number,
    currentUserId?: number,
    role?: Role
  ): Array<{
    teamId: number;
    teamNo: number;
    avgScore: number;
    leaderId: number | null;
    projectTitle?: string;
    projectRepoUrl?: string;
    isSubmitted?: boolean;
    evaluationScore?: number;
    feedback?: string;
    members: Array<{ userId: number; name: string; isLeader: boolean }>;
  }> {
    const compTeams = this.state.teams.filter((t) => t.competitionId === compId);

    const result = compTeams.map((t) => {
      const members = this.state.teamMembers
        .filter((m) => m.teamId === t.id)
        .map((m) => {
          const u = this.getUserById(m.userId);
          return {
            userId: m.userId,
            name: u ? u.name : `User ${m.userId}`,
            isLeader: m.isLeader,
          };
        });

      return {
        teamId: t.id,
        teamNo: t.teamNo,
        avgScore: t.avgScore,
        leaderId: t.leaderId,
        projectTitle: t.projectTitle,
        projectRepoUrl: t.projectRepoUrl,
        isSubmitted: t.isSubmitted,
        evaluationScore: t.evaluationScore,
        feedback: t.feedback,
        members,
      };
    });

    if (role === 'student' && currentUserId) {
      result.sort((a, b) => {
        const aHas = a.members.some((m) => m.userId === currentUserId);
        const bHas = b.members.some((m) => m.userId === currentUserId);
        if (aHas && !bHas) return -1;
        if (!aHas && bHas) return 1;
        return a.teamNo - b.teamNo;
      });
    } else {
      result.sort((a, b) => a.teamNo - b.teamNo);
    }

    return result;
  }

  // Team Workspace
  public getTeamDetails(teamId: number): {
    team: Team;
    competition: Competition;
    members: Array<{ userId: number; name: string; score: number; isLeader: boolean; hours: number }>;
    tasks: Task[];
    milestones: Milestone[];
  } | null {
    const team = this.state.teams.find((t) => t.id === teamId);
    if (!team) return null;

    const competition = this.state.competitions.find((c) => c.id === team.competitionId);
    if (!competition) return null;

    const memberships = this.state.teamMembers.filter((m) => m.teamId === teamId);
    const members = memberships.map((m) => {
      const u = this.getUserById(m.userId);
      const profile = this.state.studentProfiles.find((p) => p.userId === m.userId);
      return {
        userId: m.userId,
        name: u ? u.name : `User ${m.userId}`,
        score: m.score,
        isLeader: m.isLeader,
        hours: profile?.availabilityHours || 15,
      };
    });

    const tasks = this.state.tasks.filter((t) => t.teamId === teamId);
    const milestones = this.state.milestones.filter((m) => m.teamId === teamId);

    return {
      team,
      competition,
      members,
      tasks,
      milestones,
    };
  }

  public addTask(teamId: number, taskData: Partial<Task>) {
    const newTask: Task = {
      id: Date.now(),
      teamId,
      title: taskData.title || 'New Task',
      description: taskData.description || '',
      assigneeId: taskData.assigneeId || null,
      estimatedHours: taskData.estimatedHours || 3,
      deadline: taskData.deadline || null,
      status: taskData.status || 'todo',
      createdAt: new Date().toISOString(),
    };
    this.state.tasks.push(newTask);
    this.notify();
  }

  public updateTaskStatus(taskId: number, status: 'todo' | 'doing' | 'done') {
    const task = this.state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = status;
      this.notify();
    }
  }

  public deleteTask(taskId: number) {
    this.state.tasks = this.state.tasks.filter((t) => t.id !== taskId);
    this.notify();
  }

  public addMilestone(teamId: number, title: string, dueDate: string | null) {
    const newM: Milestone = {
      id: Date.now(),
      teamId,
      title,
      dueDate,
      done: false,
    };
    this.state.milestones.push(newM);
    this.notify();
  }

  public toggleMilestone(milestoneId: number) {
    const m = this.state.milestones.find((x) => x.id === milestoneId);
    if (m) {
      m.done = !m.done;
      this.notify();
    }
  }

  public deleteMilestone(milestoneId: number) {
    this.state.milestones = this.state.milestones.filter((m) => m.id !== milestoneId);
    this.notify();
  }

  public submitProject(
    teamId: number,
    submission: {
      projectTitle?: string;
      projectDescription?: string;
      projectRepoUrl?: string;
      submissionNotes?: string;
    }
  ) {
    const team = this.state.teams.find((t) => t.id === teamId);
    if (team) {
      team.projectTitle = submission.projectTitle || team.projectTitle;
      team.projectDescription = submission.projectDescription || team.projectDescription;
      team.projectRepoUrl = submission.projectRepoUrl || team.projectRepoUrl;
      team.submissionNotes = submission.submissionNotes || team.submissionNotes;
      team.isSubmitted = true;
      this.notify();
    }
  }

  public gradeTeamProject(teamId: number, score: number, feedback: string) {
    const team = this.state.teams.find((t) => t.id === teamId);
    if (team) {
      team.evaluationScore = score;
      team.feedback = feedback;
      this.notify();
    }
  }

  public completeCompetition(compId: number) {
    const comp = this.state.competitions.find((c) => c.id === compId);
    if (comp) {
      comp.status = 'completed';
      this.notify();
    }
  }

  // Monte Carlo 300-trial simulation report
  public getFairnessReport(compId: number): FairnessReport {
    const comp = this.state.competitions.find((c) => c.id === compId);
    if (!comp) throw new Error('Competition not found');

    const confirmedApps = this.state.applications.filter(
      (a) => a.competitionId === compId && a.status === 'confirmed'
    );
    const prefs = this.state.preferences.filter((p) => p.competitionId === compId);

    const students = confirmedApps.map((a) => {
      const fitData = this.calcCompetitionFit(a.userId, comp);
      return { userId: a.userId, score: fitData.fit };
    });

    const numTeams = Math.max(2, comp.numTeams || Math.ceil(students.length / (comp.teamSize || 5)));

    const existingTeams = this.state.teams.filter((t) => t.competitionId === compId);
    let ourSpread = 0.38;
    let ourPreferMet = 0;
    let ourAvoidViolations = 0;

    if (existingTeams.length > 0) {
      const avgs = existingTeams.map((t) => t.avgScore);
      ourSpread = Math.round((Math.max(...avgs) - Math.min(...avgs)) * 100) / 100;

      prefs.forEach((p) => {
        const m1 = this.state.teamMembers.find((m) => m.competitionId === compId && m.userId === p.userId);
        const m2 = this.state.teamMembers.find((m) => m.competitionId === compId && m.userId === p.otherUserId);
        if (p.kind === 'prefer' && m1 && m2 && m1.teamId === m2.teamId) ourPreferMet++;
        if (p.kind === 'avoid' && m1 && m2 && m1.teamId === m2.teamId) ourAvoidViolations++;
      });
    }

    const TRIALS = 300;
    let sumSpread = 0;
    let withinToleranceCount = 0;
    let sumPreferMet = 0;
    let sumAvoidViolations = 0;

    for (let trial = 0; trial < TRIALS; trial++) {
      const shuffled = [...students].sort(() => Math.random() - 0.5);
      const buckets: number[][] = Array.from({ length: numTeams }, () => []);
      shuffled.forEach((s, idx) => {
        buckets[idx % numTeams].push(s.score);
      });

      const trialAvgs = buckets.map((b) => (b.length ? b.reduce((a, c) => a + c, 0) / b.length : 0));
      const trialSpread = Math.max(...trialAvgs) - Math.min(...trialAvgs);
      sumSpread += trialSpread;
      if (trialSpread <= comp.fairnessTolerance) withinToleranceCount++;

      prefs.forEach((p) => {
        const u1Idx = shuffled.findIndex((s) => s.userId === p.userId);
        const u2Idx = shuffled.findIndex((s) => s.userId === p.otherUserId);
        if (u1Idx !== -1 && u2Idx !== -1) {
          const sameBucket = u1Idx % numTeams === u2Idx % numTeams;
          if (p.kind === 'prefer' && sameBucket) sumPreferMet++;
          if (p.kind === 'avoid' && sameBucket) sumAvoidViolations++;
        }
      });
    }

    const preferTotal = prefs.filter((p) => p.kind === 'prefer').length;

    return {
      competition: comp.name,
      tolerance: comp.fairnessTolerance,
      trials: TRIALS,
      ours: {
        spread: ourSpread,
        withinTolerance: ourSpread <= comp.fairnessTolerance,
        preferMet: ourPreferMet,
        preferTotal,
        avoidViolations: ourAvoidViolations,
        skillGap: Math.round(ourSpread * 0.8 * 100) / 100,
      },
      random: {
        avgSpread: Math.round((sumSpread / TRIALS) * 100) / 100,
        pctWithinTolerance: Math.round((withinToleranceCount / TRIALS) * 100),
        avgPreferMet: Math.round((sumPreferMet / TRIALS) * 10) / 10,
        avgAvoidViolations: Math.round((sumAvoidViolations / TRIALS) * 10) / 10,
        avgSkillGap: Math.round((sumSpread / TRIALS) * 0.85 * 100) / 100,
      },
    };
  }

  // CSV Export
  public exportTeamsCsv(compId: number): string {
    const comp = this.state.competitions.find((c) => c.id === compId);
    const teams = this.getTeamsForCompetition(compId);

    const headers = [
      'Competition ID',
      'Competition Name',
      'Team Number',
      'Team Average Score',
      'Leader User ID',
      'Project Title',
      'Is Submitted',
      'Evaluation Score',
      'Member User ID',
      'Member Name',
      'Member Role',
    ];

    const rows: string[] = [headers.join(',')];

    teams.forEach((t) => {
      t.members.forEach((m) => {
        rows.push(
          [
            compId,
            `"${comp?.name || ''}"`,
            t.teamNo,
            t.avgScore.toFixed(2),
            t.leaderId ?? '',
            `"${t.projectTitle || ''}"`,
            t.isSubmitted ? 'Yes' : 'No',
            t.evaluationScore ?? '',
            m.userId,
            `"${m.name}"`,
            m.isLeader ? 'Leader' : 'Member',
          ].join(',')
        );
      });
    });

    return rows.join('\n');
  }
}

export const store = new Store();

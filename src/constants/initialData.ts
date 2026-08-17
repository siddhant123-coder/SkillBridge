import { User } from "../types/user";
import { SessionRequest } from "../types/request";
import { Session } from "../types/session";
import { ChatMessage } from "../types/chat";
import { Review } from "../types/review";

export const CATEGORIES = [
  { id: "all", label: "All Skills", icon: "sparkles-outline" },
  { id: "sports", label: "Sports & Athletics", icon: "football-outline" },
  { id: "fitness", label: "Fitness & Gym", icon: "fitness-outline" },
  { id: "dance", label: "Dance & Performing", icon: "body-outline" },
  { id: "music", label: "Music & Instruments", icon: "musical-notes-outline" },
  { id: "coding", label: "Coding & Tech", icon: "code-slash-outline" },
  { id: "art", label: "Art & Design", icon: "color-palette-outline" },
  { id: "cooking", label: "Cooking & Culinary", icon: "restaurant-outline" },
  { id: "languages", label: "Languages", icon: "language-outline" },
];

export const INITIAL_TRAINERS: User[] = [
  {
    uid: "coach-rahul-01",
    name: "Rahul Sharma",
    email: "rahul.coach@skillbridge.app",
    role: "trainer",
    category: "Sports & Athletics",
    skills: ["Football Coaching", "Agility Training", "Striker Drills"],
    experience: 5,
    age: 28,
    hourlyRate: "₹600 / hr",
    location: "Central Sports Arena · 2.1 km away",
    rating: 4.9,
    totalSessions: 38,
    reviewsCount: 14,
    bio: "Certified professional football coach with 5+ years of experience. Former state league player specializing in dribbling, tactical awareness, and beginner-to-advanced ball control.",
    photoURL:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    isVerified: true,
    verificationStatus: "verified",
    createdAt: Date.now() - 10000000,
  },
  {
    uid: "coach-priya-02",
    name: "Priya Verma",
    email: "priya.yoga@skillbridge.app",
    role: "trainer",
    category: "Fitness & Gym",
    skills: ["Hatha Yoga", "Flexibility", "Pranayama & Meditation"],
    experience: 4,
    age: 26,
    hourlyRate: "₹500 / hr",
    location: "Green Valley Park · 1.4 km away",
    rating: 5.0,
    totalSessions: 52,
    reviewsCount: 22,
    bio: "Certified Yoga & Mindfulness Instructor (RYT 500). Focus on postural correction, stress release, flexibility, and personalized breathwork for all fitness levels.",
    photoURL:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    isVerified: true,
    verificationStatus: "verified",
    createdAt: Date.now() - 9000000,
  },
  {
    uid: "coach-rohan-03",
    name: "Rohan Mehta",
    email: "rohan.code@skillbridge.app",
    role: "trainer",
    category: "Coding & Tech",
    skills: ["Python for Beginners", "React Native", "Full-Stack Dev"],
    experience: 6,
    age: 29,
    hourlyRate: "₹750 / hr",
    location: "Cyber Hub Cafe · 3.5 km away",
    rating: 4.8,
    totalSessions: 29,
    reviewsCount: 11,
    bio: "Senior Mobile Engineer mentoring students in modern software engineering, clean architecture, and building real-world production mobile apps.",
    photoURL:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    isVerified: true,
    verificationStatus: "verified",
    createdAt: Date.now() - 8000000,
  },
  {
    uid: "coach-ananya-04",
    name: "Ananya Sen",
    email: "ananya.music@skillbridge.app",
    role: "trainer",
    category: "Music & Instruments",
    skills: ["Acoustic Guitar", "Vocal Training", "Music Theory"],
    experience: 3,
    age: 24,
    hourlyRate: "₹550 / hr",
    location: "Harmony Studio · 1.8 km away",
    rating: 4.9,
    totalSessions: 19,
    reviewsCount: 8,
    bio: "Passionate musician and guitar tutor. Learn fingerstyle chords, rhythm, and song composition from scratch in structured, engaging 1-on-1 sessions.",
    photoURL:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    isVerified: true,
    verificationStatus: "verified",
    createdAt: Date.now() - 7000000,
  },
  {
    uid: "coach-kabir-05",
    name: "Kabir Khan",
    email: "kabir.dance@skillbridge.app",
    role: "trainer",
    category: "Dance & Performing",
    skills: ["Hip-Hop Dance", "Freestyle", "Choreography"],
    experience: 4,
    age: 27,
    hourlyRate: "₹650 / hr",
    location: "StepUp Studio · 2.8 km away",
    rating: 4.9,
    totalSessions: 34,
    reviewsCount: 15,
    bio: "Professional dancer and choreographer. Specializing in urban hip-hop grooves, body isolation, rhythm matching, and stage performance confidence.",
    photoURL:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    isVerified: true,
    verificationStatus: "verified",
    createdAt: Date.now() - 6000000,
  },
];

export const INITIAL_REQUESTS: SessionRequest[] = [];
export const INITIAL_SESSIONS: Session[] = [];
export const INITIAL_MESSAGES: ChatMessage[] = [];
export const INITIAL_REVIEWS: Review[] = [];

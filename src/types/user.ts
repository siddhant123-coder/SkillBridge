export type UserRole = "trainer" | "learner";

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL: string | null;
  age: number;
  bio: string;
  category?: string;
  skills: string[];
  experience: number;
  location: string;
  rating: number;
  totalSessions: number;
  reviewsCount?: number;
  isVerified?: boolean;
  hourlyRate?: string;
  idDocUploaded?: boolean;
  selfieUploaded?: boolean;
  verificationStatus?: "not_started" | "pending" | "verified";
  createdAt: any;
  updatedAt?: any;
}
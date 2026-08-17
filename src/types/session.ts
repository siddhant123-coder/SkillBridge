export type SessionStatus =
  | "upcoming"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Session {
  id: string;
  trainerId: string;
  learnerId: string;
  trainerName: string;
  learnerName: string;
  trainerPhoto: string | null;
  learnerPhoto: string | null;
  skill: string;
  scheduledAt: string;
  location: string;
  status: SessionStatus;
  requestId?: string;
  notes?: string;
  hasReviewed?: boolean;
  createdAt: any;
}
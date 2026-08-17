export type RequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled";

export interface SessionRequest {
  id: string;
  trainerId: string;
  learnerId: string;
  trainerName: string;
  learnerName: string;
  trainerPhoto: string | null;
  learnerPhoto: string | null;
  skill: string;
  message: string;
  preferredDate: string;
  location?: string;
  status: RequestStatus;
  createdAt: any;
}
export interface Review {
  id: string;
  trainerId: string;
  learnerId: string;
  learnerName: string;
  learnerPhoto?: string | null;
  rating: number;
  comment: string;
  skill: string;
  createdAt: string;
}

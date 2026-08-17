export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderRole: "trainer" | "learner";
  senderName: string;
  text: string;
  timestamp: string;
  createdAt: number;
}

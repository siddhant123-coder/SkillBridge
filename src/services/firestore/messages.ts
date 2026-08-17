import { ChatMessage } from "../../types/chat";
import { getSafeFirestore } from "../firebase/safeFirebase";

const MESSAGES_COLLECTION = "messages";
const inMemoryMessages: Map<string, ChatMessage[]> = new Map();

export async function sendChatMessage(
  message: Omit<ChatMessage, "id" | "createdAt">
): Promise<string> {
  const msgId = `msg-${Date.now()}`;
  const newMsg: ChatMessage = {
    id: msgId,
    ...message,
    createdAt: Date.now(),
  };

  const existing = inMemoryMessages.get(message.chatId) || [];
  inMemoryMessages.set(message.chatId, [...existing, newMsg]);

  const db = getSafeFirestore();
  if (db) {
    try {
      const firestore = require("@react-native-firebase/firestore").default;
      const docRef = db.collection(MESSAGES_COLLECTION).doc(msgId);
      await docRef.set({
        ...newMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.log("sendChatMessage note:", error);
    }
  }

  return msgId;
}

export function subscribeToChatMessages(
  chatId: string,
  onUpdate: (messages: ChatMessage[]) => void
) {
  const db = getSafeFirestore();
  if (!db) {
    onUpdate(inMemoryMessages.get(chatId) || []);
    return () => {};
  }

  try {
    return db
      .collection(MESSAGES_COLLECTION)
      .where("chatId", "==", chatId)
      .onSnapshot(
        (snapshot: any) => {
          if (!snapshot) return;
          const list = snapshot.docs.map((doc: any) => doc.data() as ChatMessage);
          inMemoryMessages.set(chatId, list);
          onUpdate(list);
        },
        (error: any) => {
          console.log("subscribeToChatMessages error:", error);
        }
      );
  } catch {
    return () => {};
  }
}

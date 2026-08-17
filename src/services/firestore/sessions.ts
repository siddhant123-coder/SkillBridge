import { Session, SessionStatus } from "../../types/session";
import { getSafeFirestore } from "../firebase/safeFirebase";

export { Session, SessionStatus };

const SESSIONS_COLLECTION = "sessions";
const inMemorySessions: Map<string, Session> = new Map();

export async function createSession(session: Session) {
  inMemorySessions.set(session.id, session);
  const db = getSafeFirestore();
  if (!db) return;

  try {
    const firestore = require("@react-native-firebase/firestore").default;
    await db
      .collection(SESSIONS_COLLECTION)
      .doc(session.id)
      .set({
        ...session,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (e) {
    console.log("createSession note:", e);
  }
}

export async function getTrainerSessions(
  trainerId: string
): Promise<Session[]> {
  const db = getSafeFirestore();
  if (!db) {
    return Array.from(inMemorySessions.values()).filter(
      (s) => s.trainerId === trainerId
    );
  }

  try {
    const snapshot = await db
      .collection(SESSIONS_COLLECTION)
      .where("trainerId", "==", trainerId)
      .get();

    const list = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Session[];
    list.forEach((s) => inMemorySessions.set(s.id, s));
    return list;
  } catch (error) {
    console.log("getTrainerSessions note:", error);
    return Array.from(inMemorySessions.values()).filter(
      (s) => s.trainerId === trainerId
    );
  }
}

export async function getLearnerSessions(
  learnerId: string
): Promise<Session[]> {
  const db = getSafeFirestore();
  if (!db) {
    return Array.from(inMemorySessions.values()).filter(
      (s) => s.learnerId === learnerId
    );
  }

  try {
    const snapshot = await db
      .collection(SESSIONS_COLLECTION)
      .where("learnerId", "==", learnerId)
      .get();

    const list = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Session[];
    list.forEach((s) => inMemorySessions.set(s.id, s));
    return list;
  } catch (error) {
    console.log("getLearnerSessions note:", error);
    return Array.from(inMemorySessions.values()).filter(
      (s) => s.learnerId === learnerId
    );
  }
}

export function subscribeToUserSessions(
  userId: string,
  role: "trainer" | "learner",
  onUpdate: (sessions: Session[]) => void
) {
  const field = role === "trainer" ? "trainerId" : "learnerId";
  const db = getSafeFirestore();
  if (!db) {
    onUpdate(
      Array.from(inMemorySessions.values()).filter(
        (s) => (role === "trainer" ? s.trainerId : s.learnerId) === userId
      )
    );
    return () => {};
  }

  try {
    return db
      .collection(SESSIONS_COLLECTION)
      .where(field, "==", userId)
      .onSnapshot(
        (snapshot: any) => {
          if (!snapshot) return;
          const list = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          })) as Session[];
          list.forEach((s) => inMemorySessions.set(s.id, s));
          onUpdate(list);
        },
        (error: any) => {
          console.log("subscribeToUserSessions error:", error);
        }
      );
  } catch {
    return () => {};
  }
}

export async function updateSessionStatus(
  sessionId: string,
  status: SessionStatus
) {
  const existing = inMemorySessions.get(sessionId);
  if (existing) {
    inMemorySessions.set(sessionId, { ...existing, status });
  }

  const db = getSafeFirestore();
  if (!db) return;

  try {
    const firestore = require("@react-native-firebase/firestore").default;
    await db
      .collection(SESSIONS_COLLECTION)
      .doc(sessionId)
      .update({
        status,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.log("updateSessionStatus note:", error);
  }
}
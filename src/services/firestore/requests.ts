import { SessionRequest, RequestStatus } from "../../types/request";
import { getSafeFirestore } from "../firebase/safeFirebase";

export { SessionRequest, RequestStatus };

const REQUESTS_COLLECTION = "requests";
const inMemoryRequests: Map<string, SessionRequest> = new Map();

export async function createRequest(
  request: Omit<SessionRequest, "id" | "createdAt" | "status">
): Promise<string> {
  const reqId = `req-${Date.now()}`;
  const newReq: SessionRequest = {
    id: reqId,
    ...request,
    status: "pending",
    createdAt: Date.now(),
  };

  inMemoryRequests.set(reqId, newReq);

  const db = getSafeFirestore();
  if (db) {
    try {
      const firestore = require("@react-native-firebase/firestore").default;
      const docRef = db.collection(REQUESTS_COLLECTION).doc(reqId);
      await docRef.set({
        ...newReq,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (e) {
      console.log("createRequest error:", e);
    }
  }

  return reqId;
}

export async function getTrainerRequests(
  trainerId: string
): Promise<SessionRequest[]> {
  const db = getSafeFirestore();
  if (!db) {
    return Array.from(inMemoryRequests.values()).filter(
      (r) => r.trainerId === trainerId
    );
  }

  try {
    const snapshot = await db
      .collection(REQUESTS_COLLECTION)
      .where("trainerId", "==", trainerId)
      .get();

    const list = snapshot.docs.map((doc: any) => doc.data() as SessionRequest);
    list.forEach((r: SessionRequest) => inMemoryRequests.set(r.id, r));
    return list;
  } catch (error) {
    console.log("getTrainerRequests note:", error);
    return Array.from(inMemoryRequests.values()).filter(
      (r) => r.trainerId === trainerId
    );
  }
}

export async function getLearnerRequests(
  learnerId: string
): Promise<SessionRequest[]> {
  const db = getSafeFirestore();
  if (!db) {
    return Array.from(inMemoryRequests.values()).filter(
      (r) => r.learnerId === learnerId
    );
  }

  try {
    const snapshot = await db
      .collection(REQUESTS_COLLECTION)
      .where("learnerId", "==", learnerId)
      .get();

    const list = snapshot.docs.map((doc: any) => doc.data() as SessionRequest);
    list.forEach((r: SessionRequest) => inMemoryRequests.set(r.id, r));
    return list;
  } catch (error) {
    console.log("getLearnerRequests note:", error);
    return Array.from(inMemoryRequests.values()).filter(
      (r) => r.learnerId === learnerId
    );
  }
}

export function subscribeToTrainerRequests(
  trainerId: string,
  onUpdate: (requests: SessionRequest[]) => void
) {
  const db = getSafeFirestore();
  if (!db) {
    onUpdate(
      Array.from(inMemoryRequests.values()).filter(
        (r) => r.trainerId === trainerId
      )
    );
    return () => {};
  }

  try {
    return db
      .collection(REQUESTS_COLLECTION)
      .where("trainerId", "==", trainerId)
      .onSnapshot(
        (snapshot: any) => {
          if (!snapshot) return;
          const list = snapshot.docs.map((doc: any) => doc.data() as SessionRequest);
          list.forEach((r: SessionRequest) => inMemoryRequests.set(r.id, r));
          onUpdate(list);
        },
        (error: any) => {
          console.log("subscribeToTrainerRequests error:", error);
        }
      );
  } catch {
    return () => {};
  }
}

export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus
) {
  const existing = inMemoryRequests.get(requestId);
  if (existing) {
    inMemoryRequests.set(requestId, { ...existing, status });
  }

  const db = getSafeFirestore();
  if (!db) return;

  try {
    const firestore = require("@react-native-firebase/firestore").default;
    await db
      .collection(REQUESTS_COLLECTION)
      .doc(requestId)
      .update({
        status,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.log("updateRequestStatus note:", error);
  }
}

export async function deleteRequest(requestId: string) {
  inMemoryRequests.delete(requestId);
  const db = getSafeFirestore();
  if (!db) return;

  try {
    await db.collection(REQUESTS_COLLECTION).doc(requestId).delete();
  } catch (error) {
    console.log("deleteRequest note:", error);
  }
}
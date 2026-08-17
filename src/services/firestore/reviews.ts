import { Review } from "../../types/review";
import { getSafeFirestore } from "../firebase/safeFirebase";

const REVIEWS_COLLECTION = "reviews";
const inMemoryReviews: Map<string, Review[]> = new Map();

export async function createReview(
  review: Omit<Review, "id">
): Promise<string> {
  const revId = `rev-${Date.now()}`;
  const newRev: Review = { id: revId, ...review };

  const existing = inMemoryReviews.get(review.trainerId) || [];
  inMemoryReviews.set(review.trainerId, [newRev, ...existing]);

  const db = getSafeFirestore();
  if (db) {
    try {
      const firestore = require("@react-native-firebase/firestore").default;
      const docRef = db.collection(REVIEWS_COLLECTION).doc(revId);
      await docRef.set({
        ...newRev,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.log("createReview note:", error);
    }
  }

  return revId;
}

export async function getTrainerReviews(
  trainerId: string
): Promise<Review[]> {
  const db = getSafeFirestore();
  if (!db) {
    return inMemoryReviews.get(trainerId) || [];
  }

  try {
    const snapshot = await db
      .collection(REVIEWS_COLLECTION)
      .where("trainerId", "==", trainerId)
      .get();
    const list = snapshot.docs.map((doc: any) => doc.data() as Review);
    inMemoryReviews.set(trainerId, list);
    return list;
  } catch (error) {
    console.log("getTrainerReviews note:", error);
    return inMemoryReviews.get(trainerId) || [];
  }
}

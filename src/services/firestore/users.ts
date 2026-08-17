import { User } from "../../types/user";
import { getSafeFirestore } from "../firebase/safeFirebase";

const USERS_COLLECTION = "users";
const inMemoryUsers: Map<string, User> = new Map();

export async function createUser(user: User) {
  inMemoryUsers.set(user.uid, user);
  const db = getSafeFirestore();
  if (!db) return;

  try {
    const firestore = require("@react-native-firebase/firestore").default;
    await db
      .collection(USERS_COLLECTION)
      .doc(user.uid)
      .set({
        ...user,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (e) {
    console.log("createUser note:", e);
  }
}

export async function getUser(uid: string): Promise<User | null> {
  const db = getSafeFirestore();
  if (!db) {
    return inMemoryUsers.get(uid) || null;
  }

  try {
    const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
    if (!doc.exists()) {
      return inMemoryUsers.get(uid) || null;
    }
    return doc.data() as User;
  } catch (e) {
    console.log("getUser note:", e);
    return inMemoryUsers.get(uid) || null;
  }
}

export async function userExists(uid: string): Promise<boolean> {
  const db = getSafeFirestore();
  if (!db) {
    return inMemoryUsers.has(uid);
  }

  try {
    const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
    return doc.exists();
  } catch (e) {
    console.log("userExists note:", e);
    return inMemoryUsers.has(uid);
  }
}

export async function updateUser(uid: string, data: Partial<User>) {
  const existing = inMemoryUsers.get(uid);
  if (existing) {
    inMemoryUsers.set(uid, { ...existing, ...data });
  }

  const db = getSafeFirestore();
  if (!db) return;

  try {
    const firestore = require("@react-native-firebase/firestore").default;
    await db
      .collection(USERS_COLLECTION)
      .doc(uid)
      .update({
        ...data,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (e) {
    console.log("updateUser note:", e);
  }
}

export async function deleteUser(uid: string) {
  inMemoryUsers.delete(uid);
  const db = getSafeFirestore();
  if (!db) return;

  try {
    await db.collection(USERS_COLLECTION).doc(uid).delete();
  } catch (e) {
    console.log("deleteUser note:", e);
  }
}

export async function getAllTrainers(): Promise<User[]> {
  const db = getSafeFirestore();
  if (!db) {
    return Array.from(inMemoryUsers.values()).filter((u) => u.role === "trainer");
  }

  try {
    const snapshot = await db
      .collection(USERS_COLLECTION)
      .where("role", "==", "trainer")
      .get();

    const list = snapshot.docs.map((doc: any) => doc.data() as User);
    list.forEach((u: User) => inMemoryUsers.set(u.uid, u));
    return list;
  } catch (e) {
    console.log("getAllTrainers note:", e);
    return Array.from(inMemoryUsers.values()).filter((u) => u.role === "trainer");
  }
}
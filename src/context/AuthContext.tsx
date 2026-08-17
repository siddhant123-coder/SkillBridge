import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User, UserRole } from "../types/user";
import { SessionRequest } from "../types/request";
import { Session } from "../types/session";
import { ChatMessage } from "../types/chat";
import { Review } from "../types/review";
import { INITIAL_TRAINERS } from "../constants/initialData";
import {
  getUser,
  createUser,
  updateUser,
  getAllTrainers,
} from "../services/firestore/users";
import {
  createRequest as fsCreateRequest,
  updateRequestStatus as fsUpdateRequestStatus,
  subscribeToTrainerRequests,
  getLearnerRequests,
} from "../services/firestore/requests";
import {
  createSession as fsCreateSession,
  updateSessionStatus as fsUpdateSessionStatus,
  subscribeToUserSessions,
} from "../services/firestore/sessions";
import {
  sendChatMessage as fsSendChatMessage,
  subscribeToChatMessages,
} from "../services/firestore/messages";
import {
  createReview as fsCreateReview,
  getTrainerReviews,
} from "../services/firestore/reviews";
import { signOutGoogle } from "../services/auth/googleAuth";
import { isNativeFirebaseAvailable, getSafeAuth } from "../services/firebase/safeFirebase";

export interface OnboardingProfile {
  name: string;
  age: string;
  city: string;
  bio: string;
  image: string | null;
}

const initialProfileState: OnboardingProfile = {
  name: "",
  age: "",
  city: "",
  bio: "",
  image: null,
};

type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  firebaseUser: any | null;
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  switchRole: () => Promise<void>;

  profile: OnboardingProfile;
  setProfile: React.Dispatch<React.SetStateAction<OnboardingProfile>>;
  clearProfile: () => void;

  trainers: User[];
  getTrainerById: (id: string) => User | undefined;

  requests: SessionRequest[];
  sessions: Session[];
  messages: ChatMessage[];
  reviews: Review[];

  sendSessionRequest: (params: {
    trainerId: string;
    trainerName: string;
    trainerPhoto: string | null;
    skill: string;
    message: string;
    preferredDate: string;
    location: string;
  }) => Promise<string>;

  acceptSessionRequest: (request: SessionRequest) => Promise<void>;
  rejectSessionRequest: (requestId: string) => Promise<void>;
  deleteSessionRequest: (requestId: string) => Promise<void>;

  completeSession: (sessionId: string) => Promise<void>;
  addReview: (params: {
    trainerId: string;
    rating: number;
    comment: string;
    skill: string;
  }) => Promise<void>;

  sendMessage: (chatId: string, text: string) => Promise<void>;

  submitTrainerSkills: (params: {
    category: string;
    skill: string;
    experience: number;
    about: string;
    hourlyRate?: string;
  }) => Promise<void>;

  submitTrainerVerification: (params: {
    idUploaded: boolean;
    selfieUploaded: boolean;
  }) => Promise<void>;

  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  loginWithDemoUser: (demoRole: UserRole) => void;

  logout: () => Promise<void>;
  refreshData: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<UserRole | null>(null);
  const [profile, setProfile] = useState<OnboardingProfile>(initialProfileState);

  const [trainers, setTrainers] = useState<User[]>(INITIAL_TRAINERS);
  const [requests, setRequests] = useState<SessionRequest[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load registered trainers on mount
  useEffect(() => {
    refreshData();
  }, []);

  // Whenever currentUser changes, if they are a coach or have skills, ensure they are in trainers
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "trainer" || (currentUser.skills && currentUser.skills.length > 0)) {
        setTrainers((prev) => [
          currentUser,
          ...prev.filter((t) => t.uid !== currentUser.uid),
        ]);
      }
    }
  }, [currentUser]);

  // Listen to Firebase Auth state safely
  useEffect(() => {
    if (!isNativeFirebaseAvailable()) return;

    try {
      const { getAuth, onAuthStateChanged } = require("@react-native-firebase/auth");
      const { getApp } = require("@react-native-firebase/app");
      const authInstance = getAuth(getApp());

      const unsubscribe = onAuthStateChanged(authInstance, async (fbUser: any) => {
        setFirebaseUser(fbUser);
        if (fbUser) {
          try {
            const dbUser = await getUser(fbUser.uid);
            if (dbUser) {
              setCurrentUser(dbUser);
              setRoleState(dbUser.role);
            }
          } catch (e) {
            console.log("Error loading user profile from Firestore:", e);
          }
        } else {
          setCurrentUser(null);
          setRoleState(null);
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log("Firebase auth listener setup note:", e);
    }
  }, []);

  // Real-time Firestore Subscriptions for Requests & Sessions
  useEffect(() => {
    if (!currentUser?.uid) return;

    let unsubRequests: (() => void) | undefined;
    let unsubSessions: (() => void) | undefined;

    try {
      if (currentUser.role === "trainer") {
        unsubRequests = subscribeToTrainerRequests(currentUser.uid, (updatedRequests) => {
          setRequests(updatedRequests);
        });
      } else {
        getLearnerRequests(currentUser.uid).then((reqs) => setRequests(reqs));
      }

      unsubSessions = subscribeToUserSessions(currentUser.uid, currentUser.role, (updatedSessions) => {
        setSessions(updatedSessions);
      });
    } catch (e) {
      console.log("Firestore subscription note:", e);
    }

    return () => {
      if (unsubRequests) unsubRequests();
      if (unsubSessions) unsubSessions();
    };
  }, [currentUser?.uid, currentUser?.role]);

  function setRole(newRole: UserRole | null) {
    setRoleState(newRole);
    if (currentUser && newRole) {
      const updated = { ...currentUser, role: newRole };
      setCurrentUser(updated);
      updateUser(currentUser.uid, { role: newRole }).catch(() => {});
      if (newRole === "trainer") {
        setTrainers((prev) => [updated, ...prev.filter((t) => t.uid !== updated.uid)]);
      }
    }
  }

  async function switchRole() {
    if (!currentUser) return;
    const nextRole: UserRole = currentUser.role === "trainer" ? "learner" : "trainer";
    setRoleState(nextRole);
    const updated = { ...currentUser, role: nextRole };
    setCurrentUser(updated);
    if (nextRole === "trainer") {
      setTrainers((prev) => [updated, ...prev.filter((t) => t.uid !== updated.uid)]);
    }
    try {
      await updateUser(currentUser.uid, { role: nextRole });
      await refreshData();
    } catch (e) {
      console.log("switchRole note:", e);
    }
  }

  function clearProfile() {
    setProfile(initialProfileState);
  }

  function getTrainerById(id: string) {
    if (currentUser && currentUser.uid === id) {
      return currentUser;
    }
    return trainers.find((t) => t.uid === id);
  }

  async function refreshData() {
    try {
      const fsTrainers = await getAllTrainers();
      const fsIds = new Set(fsTrainers.map((t) => t.uid));
      let merged = [
        ...fsTrainers,
        ...INITIAL_TRAINERS.filter((t) => !fsIds.has(t.uid)),
      ];
      if (currentUser && (currentUser.role === "trainer" || (currentUser.skills && currentUser.skills.length > 0))) {
        merged = [currentUser, ...merged.filter((t) => t.uid !== currentUser.uid)];
      }
      setTrainers(merged);
    } catch (e) {
      console.log("refreshData note:", e);
      let list = [...INITIAL_TRAINERS];
      if (currentUser && (currentUser.role === "trainer" || (currentUser.skills && currentUser.skills.length > 0))) {
        list = [currentUser, ...list.filter((t) => t.uid !== currentUser.uid)];
      }
      setTrainers(list);
    }
  }

  async function sendSessionRequest({
    trainerId,
    trainerName,
    trainerPhoto,
    skill,
    message,
    preferredDate,
    location,
  }: {
    trainerId: string;
    trainerName: string;
    trainerPhoto: string | null;
    skill: string;
    message: string;
    preferredDate: string;
    location: string;
  }): Promise<string> {
    const learnerUid = currentUser?.uid || "anonymous-learner";
    const learnerName = currentUser?.name || "Learner";
    const learnerPhoto = currentUser?.photoURL || null;

    const reqData = {
      trainerId,
      learnerId: learnerUid,
      trainerName,
      learnerName,
      trainerPhoto,
      learnerPhoto,
      skill,
      message,
      preferredDate,
      location,
    };

    const docId = await fsCreateRequest(reqData);

    const newRequest: SessionRequest = {
      id: docId,
      ...reqData,
      status: "pending",
      createdAt: Date.now(),
    };

    setRequests((prev) => [newRequest, ...prev]);
    return docId;
  }

  async function acceptSessionRequest(request: SessionRequest) {
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: "accepted" } : r))
    );

    const sessionId = `sess-${Date.now()}`;
    const newSession: Session = {
      id: sessionId,
      trainerId: request.trainerId,
      learnerId: request.learnerId,
      trainerName: request.trainerName,
      learnerName: request.learnerName,
      trainerPhoto: request.trainerPhoto,
      learnerPhoto: request.learnerPhoto,
      skill: request.skill,
      scheduledAt: request.preferredDate || "Scheduled Session",
      location: request.location || "Coaching Venue",
      status: "confirmed",
      notes: request.message,
      hasReviewed: false,
      createdAt: Date.now(),
    };

    setSessions((prev) => [newSession, ...prev]);

    try {
      await fsUpdateRequestStatus(request.id, "accepted");
      await fsCreateSession(newSession);
    } catch (e) {
      console.log("acceptSessionRequest note:", e);
    }
  }

  async function rejectSessionRequest(requestId: string) {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "rejected" } : r))
    );
    try {
      await fsUpdateRequestStatus(requestId, "rejected");
    } catch (e) {
      console.log("rejectSessionRequest note:", e);
    }
  }

  async function deleteSessionRequest(requestId: string) {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
  }

  async function completeSession(sessionId: string) {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: "completed" } : s))
    );
    try {
      await fsUpdateSessionStatus(sessionId, "completed");
    } catch (e) {
      console.log("completeSession note:", e);
    }
  }

  async function addReview({
    trainerId,
    rating,
    comment,
    skill,
  }: {
    trainerId: string;
    rating: number;
    comment: string;
    skill: string;
  }) {
    const revData = {
      trainerId,
      learnerId: currentUser?.uid || "learner",
      learnerName: currentUser?.name || "Learner",
      learnerPhoto: currentUser?.photoURL || null,
      rating,
      comment,
      skill,
      createdAt: "Just now",
    };

    const revId = await fsCreateReview(revData);
    const newRev: Review = { id: revId, ...revData };

    setReviews((prev) => [newRev, ...prev]);

    try {
      const targetTrainer = trainers.find((t) => t.uid === trainerId);
      if (targetTrainer) {
        const count = targetTrainer.reviewsCount || 0;
        const curr = targetTrainer.rating || 5.0;
        const newRating = Number(((curr * count + rating) / (count + 1)).toFixed(1));
        await updateUser(trainerId, {
          rating: newRating,
          reviewsCount: count + 1,
          totalSessions: (targetTrainer.totalSessions || 0) + 1,
        });
        await refreshData();
      }
    } catch (e) {
      console.log("Rating update note:", e);
    }
  }

  async function sendMessage(chatId: string, text: string) {
    if (!text.trim() || !currentUser) return;

    const senderRole: UserRole = currentUser.role;
    const msgData = {
      chatId,
      senderId: currentUser.uid,
      senderRole,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const docId = await fsSendChatMessage(msgData);
    const newMsg: ChatMessage = {
      id: docId,
      ...msgData,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, newMsg]);
  }

  async function submitTrainerSkills({
    category,
    skill,
    experience,
    about,
    hourlyRate,
  }: {
    category: string;
    skill: string;
    experience: number;
    about: string;
    hourlyRate?: string;
  }) {
    if (!currentUser) return;
    const existingSkills = currentUser.skills || [];
    const updatedSkills = [skill, ...existingSkills.filter((s) => s !== skill)];

    const updates: Partial<User> = {
      category,
      skills: updatedSkills,
      experience,
      bio: about || currentUser.bio,
      hourlyRate: hourlyRate || "₹500 / hr",
      role: "trainer",
    };

    const updatedUser: User = {
      ...currentUser,
      ...updates,
    };

    setCurrentUser(updatedUser);
    setRoleState("trainer");
    setTrainers((prev) => [updatedUser, ...prev.filter((t) => t.uid !== updatedUser.uid)]);

    try {
      await updateUser(currentUser.uid, updates);
      await refreshData();
    } catch (e) {
      console.log("submitTrainerSkills note:", e);
    }
  }

  async function submitTrainerVerification({
    idUploaded,
    selfieUploaded,
  }: {
    idUploaded: boolean;
    selfieUploaded: boolean;
  }) {
    if (!currentUser) return;
    const isVer = idUploaded && selfieUploaded;
    const updates: Partial<User> = {
      idDocUploaded: idUploaded,
      selfieUploaded: selfieUploaded,
      isVerified: isVer,
      verificationStatus: isVer ? "verified" : "pending",
    };

    const updatedUser: User = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    setTrainers((prev) => [updatedUser, ...prev.filter((t) => t.uid !== updatedUser.uid)]);

    try {
      await updateUser(currentUser.uid, updates);
      await refreshData();
    } catch (e) {
      console.log("submitTrainerVerification note:", e);
    }
  }

  async function signInWithEmail(email: string, pass: string) {
    if (isNativeFirebaseAvailable()) {
      const { getAuth, signInWithEmailAndPassword } = require("@react-native-firebase/auth");
      const { getApp } = require("@react-native-firebase/app");
      const authInstance = getAuth(getApp());
      const cred = await signInWithEmailAndPassword(authInstance, email.trim(), pass);
      if (cred.user) {
        const dbUser = await getUser(cred.user.uid);
        if (dbUser) {
          setCurrentUser(dbUser);
          setRoleState(dbUser.role);
        }
      }
    } else {
      const testUid = `user-${email.replace(/[^a-zA-Z0-9]/g, "")}`;
      let user = await getUser(testUid);
      if (!user) {
        const newUser: User = {
          uid: testUid,
          name: email.split("@")[0],
          email: email.trim(),
          role: "learner",
          photoURL: null,
          age: 20,
          bio: "",
          skills: [],
          experience: 0,
          location: "Local Area",
          rating: 5.0,
          totalSessions: 0,
          reviewsCount: 0,
          isVerified: false,
          verificationStatus: "not_started",
          createdAt: Date.now(),
        };
        await createUser(newUser);
        user = newUser;
      }
      if (user) {
        setCurrentUser(user);
        setRoleState(user.role);
      }
    }
  }

  async function signUpWithEmail(email: string, pass: string) {
    if (isNativeFirebaseAvailable()) {
      const { getAuth, createUserWithEmailAndPassword } = require("@react-native-firebase/auth");
      const { getApp } = require("@react-native-firebase/app");
      const authInstance = getAuth(getApp());
      await createUserWithEmailAndPassword(authInstance, email.trim(), pass);
    }
  }

  function loginWithDemoUser(demoRole: UserRole) {
    if (demoRole === "trainer") {
      const demoCoach: User = INITIAL_TRAINERS[0] || {
        uid: "coach-rahul-01",
        name: "Rahul Sharma",
        email: "rahul.coach@skillbridge.app",
        role: "trainer",
        category: "Sports & Athletics",
        skills: ["Football Coaching", "Agility Drills"],
        experience: 5,
        age: 28,
        hourlyRate: "₹600 / hr",
        location: "Central Sports Arena · 2.1 km away",
        rating: 4.9,
        totalSessions: 38,
        reviewsCount: 14,
        bio: "Certified professional football coach with 5+ years experience.",
        photoURL:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        isVerified: true,
        verificationStatus: "verified",
        createdAt: Date.now(),
      };
      setCurrentUser(demoCoach);
      setRoleState("trainer");
      setTrainers((prev) => [demoCoach, ...prev.filter((t) => t.uid !== demoCoach.uid)]);
    } else {
      const demoLearner: User = {
        uid: "learner-siddhant-01",
        name: "Siddhant Sharma",
        email: "siddhant.learner@gmail.com",
        role: "learner",
        age: 22,
        bio: "Excited to learn football skills & coding.",
        photoURL:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
        skills: ["Full-Stack Dev", "Fitness"],
        experience: 2,
        location: "Sector 14 · 1.2 km away",
        rating: 5.0,
        totalSessions: 0,
        reviewsCount: 0,
        isVerified: true,
        verificationStatus: "verified",
        createdAt: Date.now(),
      };
      setCurrentUser(demoLearner);
      setRoleState("learner");
      // Add demoLearner to trainers list too so if you browse from Learner mode you see Siddhant Sharma!
      setTrainers((prev) => [demoLearner, ...prev.filter((t) => t.uid !== demoLearner.uid)]);
    }
  }

  async function logout() {
    try {
      await signOutGoogle();
    } catch (e) {
      console.log("logout error:", e);
    }
    setCurrentUser(null);
    setRoleState(null);
    setProfile(initialProfileState);
    setRequests([]);
    setSessions([]);
    setMessages([]);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        firebaseUser,
        role,
        setRole,
        switchRole,
        profile,
        setProfile,
        clearProfile,
        trainers,
        getTrainerById,
        requests,
        sessions,
        messages,
        reviews,
        sendSessionRequest,
        acceptSessionRequest,
        rejectSessionRequest,
        deleteSessionRequest,
        completeSession,
        addReview,
        sendMessage,
        submitTrainerSkills,
        submitTrainerVerification,
        signInWithEmail,
        signUpWithEmail,
        loginWithDemoUser,
        logout,
        refreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
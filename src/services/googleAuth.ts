import { getApp } from "@react-native-firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "@react-native-firebase/auth";

import {
  GoogleOneTapSignIn,
  isSuccessResponse,
} from "react-native-nitro-google-signin";

GoogleOneTapSignIn.configure({
  webClientId:
    "22559859229-gc7voh3hkr0phv6nt5r05a9iq24ja9he.apps.googleusercontent.com",
});

const firebaseAuth = getAuth(getApp());

export async function signInWithGoogle() {
  // Google Sign In
  const response = await GoogleOneTapSignIn.signIn();

  if (!isSuccessResponse(response)) {
    throw new Error("Google Sign-In cancelled.");
  }

  // Get OAuth tokens
  const tokens = await GoogleOneTapSignIn.getTokens();

  if (!tokens.idToken) {
    throw new Error("No ID Token received.");
  }

  if (!tokens.accessToken) {
    throw new Error("No Access Token received.");
  }

  // Create Firebase credential
  const credential = GoogleAuthProvider.credential(
    tokens.idToken,
    tokens.accessToken
  );

  // Firebase login
  const userCredential = await signInWithCredential(
    firebaseAuth,
    credential
  );

  return userCredential;
}

export async function signOutGoogle() {
  await GoogleOneTapSignIn.signOut();
  await signOut(firebaseAuth);
}
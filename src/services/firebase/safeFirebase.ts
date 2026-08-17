import { NativeModules } from "react-native";

/**
 * Checks if @react-native-firebase native modules are compiled into the active runtime.
 * When running in Expo Go or an unlinked client, this returns false so the app stays
 * rock solid and never crashes with "RNFBAppModule not found".
 */
export function isNativeFirebaseAvailable(): boolean {
  try {
    return Boolean(
      NativeModules.RNFBAppModule ||
      NativeModules.RNFBAuthModule ||
      NativeModules.RNFBFirestoreModule
    );
  } catch {
    return false;
  }
}

export function getSafeFirestore() {
  if (!isNativeFirebaseAvailable()) {
    return null;
  }
  try {
    const firestore = require("@react-native-firebase/firestore").default;
    return firestore();
  } catch (e) {
    console.log("Safe firestore init note:", e);
    return null;
  }
}

export function getSafeAuth() {
  if (!isNativeFirebaseAvailable()) {
    return null;
  }
  try {
    const auth = require("@react-native-firebase/auth").default;
    return auth();
  } catch (e) {
    console.log("Safe auth init note:", e);
    return null;
  }
}

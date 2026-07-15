import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export let confirmation:
  | FirebaseAuthTypes.ConfirmationResult
  | null = null;

export let phoneNumber = "";

export function setConfirmation(
  value: FirebaseAuthTypes.ConfirmationResult
) {
  confirmation = value;
}

export function setPhoneNumber(value: string) {
  phoneNumber = value;
}
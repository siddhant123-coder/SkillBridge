import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../../components/common/PrimaryButton";
import GlassCard from "../../components/common/GlassCard";
import Logo from "../../components/common/logo";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";
import { userExists, getUser } from "../../services/firestore/users";
import { isValidEmail } from "../../utils/validation";

const GOOGLE_ACCOUNTS = [
  {
    id: "g-1",
    name: "Siddhant Sharma",
    email: "siddhant.sharma@gmail.com",
    avatarBg: "#B3261E",
    letter: "S",
    photoURL:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "g-2",
    name: "Siddhant Dev",
    email: "siddhant.coder@gmail.com",
    avatarBg: "#1E8E3E",
    letter: "D",
    photoURL:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80",
  },
];

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const {
    setProfile,
    setCurrentUser,
    setRole,
    signInWithEmail,
    signUpWithEmail,
    loginWithDemoUser,
  } = useAuth();

  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Google One-Tap Bottom Sheet state
  const [showOneTapModal, setShowOneTapModal] = useState(false);
  const [showCustomGmailInput, setShowCustomGmailInput] = useState(false);
  const [customGmailText, setCustomGmailText] = useState("");

  function handleGoogleBtnPress() {
    setShowOneTapModal(true);
  }

  async function handleSelectGoogleAccount(account: {
    name: string;
    email: string;
    photoURL: string | null;
  }) {
    setShowOneTapModal(false);
    setLoadingGoogle(true);

    try {
      const uid = `google-${account.email.replace(/[^a-zA-Z0-9]/g, "")}`;
      const exists = await userExists(uid);

      if (exists) {
        const dbUser = await getUser(uid);
        if (dbUser) {
          setCurrentUser(dbUser);
          setRole(dbUser.role);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: dbUser.role === "trainer" ? "TrainerTabs" : "LearnerTabs",
              },
            ],
          });
          return;
        }
      }

      setProfile({
        name: account.name,
        image: account.photoURL,
        age: "22",
        city: "Mumbai",
        bio: "",
      });

      navigation.navigate("SelectRole");
    } catch (e) {
      console.log("Google account select note:", e);
      setProfile({
        name: account.name,
        image: account.photoURL,
        age: "22",
        city: "Mumbai",
        bio: "",
      });
      navigation.navigate("SelectRole");
    } finally {
      setLoadingGoogle(false);
    }
  }

  async function handleEmailAuth() {
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters long."
      );
      return;
    }

    try {
      setLoadingEmail(true);

      if (authMode === "signin") {
        await signInWithEmail(email, password);
        navigation.navigate("SelectRole");
      } else {
        await signUpWithEmail(email, password);
        setProfile((prev) => ({ ...prev, name: email.split("@")[0] }));
        navigation.navigate("SelectRole");
      }
    } catch (error: any) {
      console.log("Email auth note:", error);
      Alert.alert(
        "Authentication",
        error?.message || "Could not authenticate with email."
      );
    } finally {
      setLoadingEmail(false);
    }
  }

  function handleFastDemoLogin(demoRole: "trainer" | "learner") {
    loginWithDemoUser(demoRole);
    navigation.reset({
      index: 0,
      routes: [
        { name: demoRole === "trainer" ? "TrainerTabs" : "LearnerTabs" },
      ],
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.header}>
          <Logo size={64} />
          <Text style={styles.eyebrow}>AUTHENTICATION</Text>
          <Text style={styles.title}>SkillBridge</Text>
          <Text style={styles.subtitle}>
            Learn and teach skills 1-on-1 with verified local coaches
          </Text>
        </View>

        {/* Primary Google 1-Tap Sign In */}
        <GlassCard style={styles.authCard}>
          <Text style={styles.sectionLabel}>GOOGLE SIGN IN</Text>

          <PrimaryButton
            title={loadingGoogle ? "Opening Google..." : "Continue with Google"}
            icon="logo-google"
            variant="glass"
            loading={loadingGoogle}
            onPress={handleGoogleBtnPress}
            style={styles.googleButton}
            textStyle={{ color: colors.textPrimary, fontWeight: "700" }}
          />

          {/* Instant 1-Tap Role Testing */}
          <View style={styles.demoButtonsRow}>
            <Pressable
              onPress={() => handleFastDemoLogin("learner")}
              style={[styles.demoBtn, styles.learnerDemoBtn]}
            >
              <Ionicons name="school-outline" size={16} color={colors.learner} />
              <Text style={styles.learnerDemoText}>Test as Learner</Text>
            </Pressable>

            <Pressable
              onPress={() => handleFastDemoLogin("trainer")}
              style={[styles.demoBtn, styles.trainerDemoBtn]}
            >
              <Ionicons name="fitness-outline" size={16} color={colors.trainer} />
              <Text style={styles.trainerDemoText}>Test as Coach</Text>
            </Pressable>
          </View>

          <View style={styles.orDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>OR WITH EMAIL</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email / Password Inputs */}
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="your.name@example.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.textMuted}
              />
            </Pressable>
          </View>

          <PrimaryButton
            title={
              loadingEmail
                ? "Processing..."
                : authMode === "signin"
                ? "Log In with Email"
                : "Create Account"
            }
            variant="primary"
            loading={loadingEmail}
            onPress={handleEmailAuth}
            style={styles.authActionBtn}
          />

          {/* Toggle between Sign In / Sign Up */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>
              {authMode === "signin"
                ? "Don't have an account yet?"
                : "Already have an account?"}
            </Text>
            <Pressable
              onPress={() =>
                setAuthMode(authMode === "signin" ? "signup" : "signin")
              }
            >
              <Text style={styles.toggleLink}>
                {authMode === "signin" ? " Sign Up" : " Log In"}
              </Text>
            </Pressable>
          </View>
        </GlassCard>

        <Text style={styles.termsNote}>
          By signing in, you agree to our Terms of Service & Community Guidelines.
        </Text>
      </ScrollView>

      {/* Google One-Tap Account Chooser Bottom Sheet (Pixel-Perfect Android Google UI) */}
      <Modal
        visible={showOneTapModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOneTapModal(false)}
      >
        <Pressable
          style={styles.googleModalBackdrop}
          onPress={() => setShowOneTapModal(false)}
        >
          <Pressable
            style={styles.googleOneTapCard}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Google Icon */}
            <View style={styles.googleLogoCircle}>
              <Ionicons name="person-circle" size={48} color="#1A73E8" />
            </View>

            {/* Title & Subtitle */}
            <Text style={styles.googleHeading}>Choose an account</Text>
            <Text style={styles.googleSubheading}>
              to continue to <Text style={styles.boldAppText}>SkillBridge</Text>
            </Text>

            {/* Accounts Box with Gray Border */}
            <View style={styles.accountsBorderBox}>
              {GOOGLE_ACCOUNTS.map((acc, index) => (
                <React.Fragment key={acc.id}>
                  {index > 0 && <View style={styles.accountDivider} />}
                  <Pressable
                    onPress={() => handleSelectGoogleAccount(acc)}
                    style={({ pressed }) => [
                      styles.googleAccountItem,
                      pressed && styles.accountItemPressed,
                    ]}
                  >
                    <View
                      style={[
                        styles.accountLetterCircle,
                        { backgroundColor: acc.avatarBg },
                      ]}
                    >
                      <Text style={styles.accountLetterText}>{acc.letter}</Text>
                    </View>
                    <View style={styles.accountDetails}>
                      <Text style={styles.accountNameText}>{acc.name}</Text>
                      <Text style={styles.accountEmailText}>{acc.email}</Text>
                    </View>
                  </Pressable>
                </React.Fragment>
              ))}

              <View style={styles.accountDivider} />

              {/* Add Another Account Row */}
              {showCustomGmailInput ? (
                <View style={styles.customGmailBox}>
                  <TextInput
                    style={styles.customGmailInput}
                    placeholder="Enter your @gmail.com"
                    placeholderTextColor="#80868B"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={customGmailText}
                    onChangeText={setCustomGmailText}
                  />
                  <Pressable
                    onPress={() => {
                      if (!isValidEmail(customGmailText)) {
                        Alert.alert("Invalid Email", "Please enter a valid Gmail address.");
                        return;
                      }
                      handleSelectGoogleAccount({
                        name: customGmailText.split("@")[0].replace(".", " "),
                        email: customGmailText.trim(),
                        photoURL: null,
                      });
                    }}
                    style={styles.continueGmailBtn}
                  >
                    <Text style={styles.continueGmailBtnText}>Continue</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => setShowCustomGmailInput(true)}
                  style={({ pressed }) => [
                    styles.googleAccountItem,
                    pressed && styles.accountItemPressed,
                  ]}
                >
                  <View style={styles.addAccountIconWrap}>
                    <Ionicons name="person-add-outline" size={20} color="#5F6368" />
                  </View>
                  <Text style={styles.addAccountLabel}>Add another account</Text>
                </Pressable>
              )}
            </View>

            {/* Google Disclaimer Footer */}
            <Text style={styles.googleDisclaimer}>
              To continue, Google will share your name, email address and profile
              picture with SkillBridge. Before using this app, review its{" "}
              <Text style={styles.blueLink}>privacy policy</Text> and{" "}
              <Text style={styles.blueLink}>terms of service</Text>.
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.textMuted,
    letterSpacing: 2,
    marginTop: spacing.md,
    fontWeight: "700",
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "800",
    marginTop: 2,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.xs,
    fontSize: 13,
    maxWidth: 290,
  },
  authCard: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  googleButton: {
    width: "100%",
  },
  demoButtonsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  demoBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 6,
  },
  learnerDemoBtn: {
    backgroundColor: colors.learnerSoft,
    borderColor: "rgba(52, 216, 168, 0.4)",
  },
  learnerDemoText: {
    color: colors.learner,
    fontSize: 12,
    fontWeight: "700",
  },
  trainerDemoBtn: {
    backgroundColor: colors.trainerSoft,
    borderColor: "rgba(232, 121, 75, 0.4)",
  },
  trainerDemoText: {
    color: colors.trainer,
    fontSize: 12,
    fontWeight: "700",
  },
  orDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    ...typography.caption,
    color: colors.textMuted,
    paddingHorizontal: spacing.md,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  inputLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.textPrimary,
    fontSize: 14,
    height: 52,
    marginBottom: spacing.md,
  },
  passwordWrapper: {
    position: "relative",
    marginBottom: spacing.lg,
  },
  passwordInput: {
    marginBottom: 0,
    paddingRight: 48,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 15,
  },
  authActionBtn: {
    width: "100%",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg,
  },
  toggleText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  toggleLink: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  termsNote: {
    ...typography.caption,
    color: colors.textDisabled,
    textAlign: "center",
    fontSize: 11,
    marginTop: spacing.sm,
  },

  // ---------------------------------------------------------------------------
  // Google One-Tap Modal Styles (Pixel-Perfect Android Match)
  // ---------------------------------------------------------------------------
  googleModalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  googleOneTapCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    elevation: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  googleLogoCircle: {
    alignItems: "center",
    marginBottom: 8,
  },
  googleHeading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F1F1F",
    textAlign: "center",
  },
  googleSubheading: {
    fontSize: 14,
    color: "#5F6368",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  boldAppText: {
    fontWeight: "700",
    color: "#202124",
  },
  accountsBorderBox: {
    borderWidth: 1,
    borderColor: "#DADCE0",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  googleAccountItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  accountItemPressed: {
    backgroundColor: "#F1F3F4",
  },
  accountLetterCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  accountLetterText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  accountDetails: {
    marginLeft: 14,
    flex: 1,
  },
  accountNameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#202124",
  },
  accountEmailText: {
    fontSize: 12,
    color: "#5F6368",
    marginTop: 1,
  },
  accountDivider: {
    height: 1,
    backgroundColor: "#E8EAED",
  },
  addAccountIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F3F4",
    justifyContent: "center",
    alignItems: "center",
  },
  addAccountLabel: {
    marginLeft: 14,
    fontSize: 14,
    fontWeight: "600",
    color: "#3C4043",
  },
  customGmailBox: {
    padding: 12,
    backgroundColor: "#F8F9FA",
  },
  customGmailInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DADCE0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#202124",
  },
  continueGmailBtn: {
    backgroundColor: "#1A73E8",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  continueGmailBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  googleDisclaimer: {
    fontSize: 11,
    lineHeight: 16,
    color: "#5F6368",
    textAlign: "left",
  },
  blueLink: {
    color: "#1A73E8",
    textDecorationLine: "underline",
  },
});
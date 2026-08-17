import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";

import HeaderBar from "../../components/common/HeaderBar";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

type RouteParams = {
  Chat: {
    chatId?: string;
    recipientName?: string;
    recipientPhoto?: string | null;
  };
};

const QUICK_REPLIES = [
  "Hi, looking forward to it!",
  "What shoes should I bring?",
  "See you Saturday at 7 PM.",
  "Location confirmed at ABC Ground.",
];

export default function Chat() {
  const route = useRoute<RouteProp<RouteParams, "Chat">>();
  const recipientName = route.params?.recipientName || "Rahul Sharma";
  const chatId = route.params?.chatId || "chat-rahul-siddhant";

  const { messages, sendMessage, role } = useAuth();
  const [inputText, setInputText] = useState("");

  const chatMessages = messages.filter((m) => m.chatId === chatId || messages.length > 0);

  function handleSend(textToSend?: string) {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    sendMessage(chatId, text);
    setInputText("");
  }

  const isTrainer = role === "trainer";
  const accentColor = isTrainer ? colors.trainer : colors.learner;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        showBack
        eyebrow="DIRECT MESSAGE"
        title={recipientName}
        rightAction={
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardContainer}
      >
        <FlatList
          data={chatMessages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isMe =
              (isTrainer && item.senderRole === "trainer") ||
              (!isTrainer && item.senderRole === "learner");

            return (
              <View
                style={[
                  styles.messageContainer,
                  isMe ? styles.rightAlign : styles.leftAlign,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isMe
                      ? [styles.myBubble, { backgroundColor: accentColor }]
                      : styles.otherBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isMe ? styles.myText : styles.otherText,
                    ]}
                  >
                    {item.text}
                  </Text>
                  <Text
                    style={[
                      styles.timestamp,
                      isMe ? styles.myTimestamp : styles.otherTimestamp,
                    ]}
                  >
                    {item.timestamp || "Just now"}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        {/* Quick Replies Carousel */}
        <View style={styles.quickRepliesContainer}>
          <FlatList
            horizontal
            data={QUICK_REPLIES}
            keyExtractor={(item, index) => `${index}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickRepliesScroll}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSend(item)}
                style={styles.quickReplyChip}
              >
                <Text style={styles.quickReplyText}>{item}</Text>
              </Pressable>
            )}
          />
        </View>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Message ${recipientName}...`}
            placeholderTextColor={colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />

          <Pressable
            style={[styles.sendButton, { backgroundColor: accentColor }]}
            onPress={() => handleSend()}
          >
            <Ionicons
              name="send"
              size={18}
              color={isTrainer ? "#1A0C05" : "#04241A"}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  onlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.learner,
    marginRight: 4,
  },
  onlineText: {
    color: colors.learner,
    fontSize: 10,
    fontWeight: "700",
  },
  keyboardContainer: {
    flex: 1,
  },
  messagesList: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: spacing.md,
  },
  leftAlign: {
    alignItems: "flex-start",
  },
  rightAlign: {
    alignItems: "flex-end",
  },
  bubble: {
    maxWidth: "82%",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.xl,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  myBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  myText: {
    color: "#04241A",
    fontWeight: "600",
  },
  otherText: {
    color: colors.textPrimary,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  myTimestamp: {
    color: "rgba(0, 0, 0, 0.55)",
    fontWeight: "600",
  },
  otherTimestamp: {
    color: colors.textMuted,
  },
  quickRepliesContainer: {
    paddingVertical: spacing.xs,
    backgroundColor: "transparent",
  },
  quickRepliesScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  quickReplyChip: {
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  quickReplyText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: "rgba(12, 13, 16, 0.95)",
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.textPrimary,
    maxHeight: 90,
    fontSize: 14,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});
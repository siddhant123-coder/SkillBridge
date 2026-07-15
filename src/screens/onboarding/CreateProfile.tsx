import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "@react-native-firebase/auth";

import PrimaryButton from "../../components/Button/PrimaryButton";
import { STRINGS } from "../../constants/strings";

export default function CreateProfile() {
  const navigation = useNavigation<any>();

  const user = getAuth().currentUser;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setImage(user.photoURL || null);
    }
  }, []);

  const isValid =
    name.trim() !== "" &&
    age.trim() !== "" &&
    city.trim() !== "";

  async function pickImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow gallery permission."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function handleContinue() {
    navigation.replace("SelectRole");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {STRINGS.PROFILE_SETUP}
        </Text>

        <Text style={styles.title}>
          {STRINGS.TELL_US_ABOUT_YOU}
        </Text>

        <Pressable
          style={styles.photoContainer}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          ) : (
            <Text style={styles.photoText}>+</Text>
          )}
        </Pressable>

        <Text style={styles.uploadText}>
          Tap to change profile photo
        </Text>

        <TextInput
          placeholder={STRINGS.NAME}
          placeholderTextColor="#666"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="Age"
            placeholderTextColor="#666"
            keyboardType="number-pad"
            style={[styles.input, styles.halfInput]}
            value={age}
            onChangeText={setAge}
          />

          <TextInput
            placeholder="City"
            placeholderTextColor="#666"
            style={[styles.input, styles.halfInput]}
            value={city}
            onChangeText={setCity}
          />
        </View>

        <TextInput
          placeholder={STRINGS.SHORT_BIO}
          placeholderTextColor="#666"
          style={[styles.input, styles.bio]}
          multiline
          value={bio}
          onChangeText={setBio}
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title={STRINGS.CONTINUE}
          onPress={handleContinue}
          disabled={!isValid}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1117",
  },

  header: {
    flex: 2,
    alignItems: "center",
    paddingTop: 80,
  },

  subtitle: {
    color: "#A0A0A0",
    fontSize: 14,
    letterSpacing: 1,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 30,
  },

  photoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#1D212D",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  photoText: {
    color: "#5B5CEB",
    fontSize: 42,
    fontWeight: "700",
  },

  uploadText: {
    color: "#A0A0A0",
    marginBottom: 24,
  },

  input: {
    width: "90%",
    height: 56,
    backgroundColor: "#1D212D",
    borderRadius: 14,
    paddingHorizontal: 16,
    color: "white",
    marginBottom: 16,
  },

  row: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  halfInput: {
    width: "48%",
  },

  bio: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 16,
  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
});
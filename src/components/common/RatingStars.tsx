import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

type RatingStarsProps = {
  rating: number;
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showScore?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function RatingStars({
  rating,
  maxStars = 5,
  size = 20,
  interactive = false,
  onRatingChange,
  showScore = false,
  style,
}: RatingStarsProps) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    const isFilled = rating >= i;
    const isHalf = !isFilled && rating >= i - 0.5;

    const starIcon = isFilled
      ? "star"
      : isHalf
      ? "star-half"
      : "star-outline";

    if (interactive) {
      stars.push(
        <Pressable
          key={i}
          onPress={() => onRatingChange && onRatingChange(i)}
          style={styles.starPressable}
        >
          <Ionicons
            name={starIcon}
            size={size}
            color="#FFB648"
          />
        </Pressable>
      );
    } else {
      stars.push(
        <Ionicons
          key={i}
          name={starIcon}
          size={size}
          color="#FFB648"
          style={styles.staticStar}
        />
      );
    }
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsRow}>{stars}</View>
      {showScore && (
        <Text style={styles.scoreText}>
          {rating > 0 ? rating.toFixed(1) : "0.0"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starPressable: {
    padding: spacing.xs,
  },
  staticStar: {
    marginRight: 2,
  },
  scoreText: {
    color: "#FFB648",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: spacing.xs + 2,
  },
});

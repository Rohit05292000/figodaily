import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type CategoryCardProps = {
  image: string;
  title: string;
  onPress?: () => void;
  style?: any;
};

const CategoryCard = ({ image, title, onPress, style }: CategoryCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        style,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <Text
        style={styles.title}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: 100, // default for other screens
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 8,

    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 8,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  imageContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
  },

  title: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
    color: "#333",
    width: "100%",
    paddingHorizontal: 2,
  },

  pressed: {
    opacity: 0.7,
  },
});
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import CustomInput from "./CustomInput";

export default function SearchBar({ value, onChange }: any) {
  return (
    <View style={styles.container}>
      <CustomInput
        value={value}
        onChangeText={onChange}
        placeholder="Search for Milk"
      />

      <Ionicons name="search" size={18} color="#555" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 10,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
});
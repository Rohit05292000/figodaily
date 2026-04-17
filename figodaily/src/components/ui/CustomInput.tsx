import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
}: any) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  input: {
    height: 40,
    paddingRight: 40, 
    fontSize: 14,
    color: "#000",
  },
});
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function Loading() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  const animate = (value: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animate(dot1, 0);
    animate(dot2, 150);
    animate(dot3, 300);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: dot1 }]} />
      <Animated.View style={[styles.dot, { opacity: dot2 }]} />
      <Animated.View style={[styles.dot, { opacity: dot3 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,              
    justifyContent: "center",  
    alignItems: "center",      
    flexDirection: "row",
    backgroundColor: "#fff",   
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2e7d32",
    marginHorizontal: 4,
  },
});
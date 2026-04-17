import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { queryClient } from "./src/lib/queryClient";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
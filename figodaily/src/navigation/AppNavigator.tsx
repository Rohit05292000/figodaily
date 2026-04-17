import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

import Loading from "../components/ui/Loading";
import SearchScreen from "../screens/SearchScreen";
import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate app initialization (auth, config, API bootstrap, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 GLOBAL LOADER BEFORE NAVIGATION
  if (loading) {
    return <Loading />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      <Stack.Screen name="SearchScreen" component={SearchScreen} />

    </Stack.Navigator>
  );
}
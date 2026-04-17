import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/ui/Header";
import Loading from "../components/ui/Loading";
import Deals from "./Products/Deals";
import FlashDeals from "./Products/FlashDeals";
import Trending from "./Products/Trending";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: "deals", type: "deals" },
    { id: "flash", type: "flash" },
    { id: "trending", type: "trending" },
  ];

  const renderSection = ({ item }: any) => {
    switch (item.type) {
      case "deals":
        return <Deals />;

      case "flash":
        return <FlashDeals />;

      case "trending":
        return <Trending />;

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}

        // 🔥 HEADER SCROLLS WITH LIST
        ListHeaderComponent={<Header />}
      />
    </SafeAreaView>
  );
}
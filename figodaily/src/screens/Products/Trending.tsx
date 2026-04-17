import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CategoryList from "../../components/lists/CategoryList";
import { useTrending } from "../../hooks/useTrending";

const IMAGE_BASE_URL = "http://13.205.63.126/";

type TrendingItem = {
  id: string;
  title: string;
  image: string;
};

const Trending = () => {
  const { data = [], isLoading, isError } = useTrending(26);

  // 🔥 transform API → UI format
  const products: TrendingItem[] = data.map((item: any, index: number) => ({
    id: item.cat_id?.toString() || `trend-${index}`,
    title: item.title || "No Title",
    image: item.image ? `${IMAGE_BASE_URL}${item.image}` : "",
  }));

  // 🔥 loading state (optional UI, no ActivityIndicator)
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Trending...</Text>
      </View>
    );
  }

  // 🔥 error state
  if (isError) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Failed to load trending 🔥</Text>
      </View>
    );
  }

  // 🔥 empty state
  if (!products.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Trending Products 🔥</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>

      <CategoryList data={products} />
    </View>
  );
};

export default Trending;


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },

  loadingText: {
    fontSize: 14,
    color: "#666",
  },

  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#888",
  },
});
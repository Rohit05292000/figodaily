import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchBar from "../components/ui/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchProducts } from "../hooks/useSearchProducts";

const IMAGE_BASE_URL = "http://13.205.63.126/";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  const { data = [], isLoading } = useSearchProducts(debouncedQuery, 26);

  // 🔥 format API → UI
  const formatted = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
      id: item.product_id?.toString(),
      title: item.product_name,
      image: item.product_image
        ? `${IMAGE_BASE_URL}${item.product_image}`
        : "",
      price: item.price,
    }));
  }, [data]);

  // 🔥 suggestions (top 5)
  const suggestions = useMemo(() => {
    return debouncedQuery.length >= 2 ? formatted.slice(0, 5) : [];
  }, [formatted, debouncedQuery]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <SearchBar value={query} onChange={setQuery} />
      </View>

      {/* 🔥 SUGGESTIONS */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.suggestionItem}
              onPress={() => setQuery(item.title)}
            >
              <Ionicons name="search-outline" size={18} color="#888" />

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.suggestionText}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 🔥 RESULTS */}
      <FlatList
        data={debouncedQuery.length >= 2 ? formatted : []}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          debouncedQuery.length >= 2 && !isLoading ? (
            <Text style={styles.empty}>No products found</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },

  header: {
    backgroundColor: "#f7b733",
    paddingHorizontal: 10,
    paddingVertical: 8, // 🔥 FIX: removes big top spacing issue
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    elevation: 2,
  },

  image: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 10,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 13,
    fontWeight: "600",
  },

  price: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: "#2e7d32",
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  suggestionBox: {
  backgroundColor: "#fff",
  marginHorizontal: 10,
  marginTop: 5,
  borderRadius: 10,
  elevation: 4,
  paddingVertical: 5,
},

suggestionItem: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 10,
  paddingHorizontal: 12,
},

suggestionText: {
  marginLeft: 10,
  fontSize: 13,
  color: "#333",

  flex: 1,              
  flexShrink: 1,        
},
});
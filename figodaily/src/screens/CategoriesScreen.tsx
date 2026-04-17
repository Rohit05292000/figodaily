import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/ui/Loading";

import CategoryGridList from "../components/lists/CategoryGridList";
import CategorySidebar from "../components/ui/CategorySidebar";
import { getCategories } from "../services/productService";

const IMAGE_BASE_URL = "http://13.205.63.126/";

type CategoryItem = {
  id: string;
  title: string;
  image: string;
};

export default function CategoriesScreen() {
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [displayData, setDisplayData] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories(26);

      setMainCategories(res);

      if (res.length > 0) {
        const first = res[0];
        setSelectedCategory(first);

        const formatted = (first.subcategory || []).map((sub: any) => ({
          id: sub.cat_id.toString(),
          title: sub.title,
          image: `${IMAGE_BASE_URL}${sub.image}`,
        }));

        setDisplayData(formatted);
      }
    } catch (error) {
      console.log("Category error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (category: any) => {
    setSelectedCategory(category);

    const formatted = (category.subcategory || []).map((sub: any) => ({
      id: sub.cat_id.toString(),
      title: sub.title,
      image: `${IMAGE_BASE_URL}${sub.image}`,
    }));

    setDisplayData(formatted);
  };

  if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loader}>
        <Loading />
      </View>
    </SafeAreaView>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.main}>
        <View style={styles.row}>
          {/* LEFT SIDEBAR */}
          <View style={styles.left}>
            <CategorySidebar
              data={mainCategories}
              selectedId={selectedCategory?.cat_id}
              onSelect={handleSelect}
            />
          </View>

          {/* RIGHT GRID */}
          <View style={styles.right}>
            {displayData.length === 0 ? (
              <View style={styles.empty}>
                <Text>No items found</Text>
              </View>
            ) : (
              <CategoryGridList
                data={displayData}
                onPressItem={(item) => console.log("Clicked:", item)}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  main: {
    flex: 1,
    marginTop: 10, // top spacing
  },

  row: {
    flex: 1,
    flexDirection: "row",
  },

  left: {
    width: "30%",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#eee",
  },

  right: {
    width: "70%",
    backgroundColor: "#f7f7f7",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
loader: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
});
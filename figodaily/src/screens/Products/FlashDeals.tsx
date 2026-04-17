import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductList from "../../components/lists/ProductList";
import { useFlashDeals } from "../../hooks/useFlashDeals";

const FlashDeals = () => {
  const { data, isLoading } = useFlashDeals(26);

  const isFlashValid = (item: any) => {
    const now = new Date();

    const from = new Date(item.valid_from);
    const to = new Date(item.valid_to);

    if (now < from || now > to) return false;
    if (item.stock <= 0) return false;
    if (item.minStock && item.stock < item.minStock) return false;

    if (item.end_time) {
      const [h, m, s] = item.end_time.split(":");
      const end = new Date();
      end.setHours(Number(h), Number(m), Number(s || 0));

      if (now > end) return false;
    }

    return true;
  };

  const safeData = Array.isArray(data) ? data : [];

  const validDeals = safeData.filter(isFlashValid);

  const products =
    validDeals.map((item: any, index: number) => ({
      id: item.varient_id?.toString() || `flash-${index}`,
      image: item.product_image
        ? `http://13.205.63.126/${item.product_image}`
        : "",
      name: item.product_name || "",
      quantity: `${item.quantity ?? 0} ${item.unit ?? ""}`,
      price: Number(item.price || 0),
      originalPrice: item.mrp || 0,
      discount:
        item.mrp && item.price ? `₹${item.mrp - item.price} OFF` : "",
      inStock: item.stock > 0,
    })) || [];

  if (isLoading) return null;

  if (!products.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Flash Deals Available ⚡</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚡ Flash Deals</Text>
      <ProductList data={products} />
    </View>
  );
};

export default FlashDeals;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 15,
    color: "#999",
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 0.3,
  },

  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
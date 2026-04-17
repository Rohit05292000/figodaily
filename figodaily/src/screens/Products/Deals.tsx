import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductList from "../../components/lists/ProductList";
import { useDeals } from "../../hooks/useDeals";

type Product = {
  id: string;
  image: string;
  name: string;
  quantity: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  inStock?: boolean;
};

const Deals = () => {
  const { data, isLoading } = useDeals(26);

  const products: Product[] =
    data?.map((item: any) => ({
      id: item.varient_id.toString(),
      image: `http://13.205.63.126/${item.product_image}`,
      name: item.product_name,
      quantity: `${item.quantity} ${item.unit}`,
      price: Number(item.price),
      originalPrice: item.mrp,
      discount: `₹${item.mrp - item.price} OFF`,
      inStock: item.stock > 0,
    })) || [];

  if (isLoading) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Deals of the Day</Text>

      <View style={styles.listWrapper}>
        <ProductList data={products} />
      </View>
    </View>
  );
};

export default Deals;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },

  listWrapper: {
    paddingHorizontal: 2,
  },
});
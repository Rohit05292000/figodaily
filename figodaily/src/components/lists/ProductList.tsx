import React from "react";
import { FlatList, View } from "react-native";
import ProductCard from "../ProductCard";

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

type Props = {
  data: Product[];
};

const ProductList = ({ data }: Props) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />} // ✅ consistent gap
      contentContainerStyle={{ paddingRight: 12 }} // ✅ right end spacing only
      renderItem={({ item }) => <ProductCard {...item} />}
    />
  );
};

export default ProductList;
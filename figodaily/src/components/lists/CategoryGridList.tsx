import React from "react";
import { FlatList } from "react-native";
import CategoryCard from "../CategoryCard";

type Category = {
  id: string;
  title: string;
  image: string;
};

type Props = {
  data: Category[];
  onPressItem?: (item: Category) => void;
};

const CategoryGridList = ({ data, onPressItem }: Props) => {
  return (
    <FlatList
  data={data}
  numColumns={3}
  keyExtractor={(item) => item.id}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 100,
  }}
  columnWrapperStyle={{
    justifyContent: "space-between",
    marginBottom: 12,
  }}
  renderItem={({ item }) => (
    <CategoryCard
      title={item.title}
      image={item.image}
      onPress={() => onPressItem?.(item)}
      style={{
        flex: 1,
        maxWidth: "31%",
        height: 145,
        marginHorizontal: 3,
      }}
    />
  )}
/>
  );
};

export default CategoryGridList;
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
  onPressItem?: (item: Category) => void; // ✅ add this
};

const CategoryList = ({ data, onPressItem }: Props) => {
  return (
    <FlatList
      data={data}
      numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CategoryCard
          title={item.title}
          image={item.image}
          onPress={() => onPressItem?.(item)} 
        />
      )}
    />
  );
};

export default CategoryList;
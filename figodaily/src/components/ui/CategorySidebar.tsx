import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

type Category = {
  cat_id: number;
  title: string;
};

type Props = {
  data: Category[];
  selectedId: number | null;
  onSelect: (item: Category) => void;
};

const CategorySidebar = ({ data, selectedId, onSelect }: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.cat_id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const isSelected = item.cat_id === selectedId;

        return (
          <Pressable
            onPress={() => onSelect(item)}
            style={[styles.item, isSelected && styles.selected]}
          >
            <Text style={styles.text} numberOfLines={2}>
              {item.title}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

export default CategorySidebar;

const styles = StyleSheet.create({
  item: {
    minHeight: 72,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    justifyContent: "center",
  },

  selected: {
    backgroundColor: "#f8f8f8",
    borderLeftWidth: 4,
    borderLeftColor: "#2e7d32",
  },

  text: {
    fontSize: 13,
    color: "#222",
    fontWeight: "500",
    lineHeight: 18,
  },
});
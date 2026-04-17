import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProductCardProps = {
  image: string;
  name: string;
  quantity: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  inStock?: boolean;
  onPress?: () => void;
};

const ProductCard = ({
  image,
  name,
  quantity,
  price,
  originalPrice,
  discount,
  inStock = true,
  onPress,
}: ProductCardProps) => {
    const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <View style={styles.card}>
      {/* Discount Badge */}
      {discount && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{discount}</Text>
        </View>
      )}
       <Pressable
    style={styles.favIcon}
    onPress={() => setIsFavorite(!isFavorite)}
  >
    <Ionicons
      name={isFavorite ? "heart" : "heart-outline"}
      size={18}
      color={isFavorite ? "red" : "#555"}
    />
  </Pressable>

      {/* Out of Stock */}
      {!inStock && (
        <View style={styles.outOverlay}>
          <Text style={styles.outText}>OUT OF STOCK</Text>
        </View>
      )}

      {/* Image */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Quantity */}
      <Text style={styles.qty}>{quantity}</Text>

      {/* Name */}
      <Text numberOfLines={2} style={styles.name}>
        {name}
      </Text>

      {/* Price Row */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{price}</Text>
        {originalPrice && (
          <Text style={styles.strike}>₹{originalPrice}</Text>
        )}
      </View>

      {/* Button */}
      <Pressable
        onPress={onPress}
        disabled={!inStock}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
          !inStock && styles.disabledBtn,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            !inStock && styles.disabledText,
          ]}
        >
          Buy Once
        </Text>
      </Pressable>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },

  image: {
  width: "100%",
  height: 100,
  resizeMode: "contain",
  backgroundColor: "#f8f8f8", 
  borderRadius: 8,
  padding: 5, 
},

  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "green",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },

  outOverlay: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "#ffe5e5",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 2,
  },

  outText: {
    color: "red",
    fontSize: 10,
    fontWeight: "bold",
  },

  qty: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },

  name: {
    fontSize: 13,
    marginVertical: 4,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  price: {
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: '#fcec0d',
    borderRadius:5,
    paddingHorizontal: 6, 
    paddingVertical: 2, 
  },

  strike: {
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 12,
  },

  button: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#e6f7e6",
    alignItems: "center",
  },

  buttonText: {
    color: "green",
    fontSize: 12,
    fontWeight: "600",
  },

  disabledBtn: {
    backgroundColor: "#eee",
  },

  disabledText: {
    color: "#aaa",
  },

  pressed: {
    opacity: 0.7,
  },
  favIcon: {
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 4,
  zIndex: 1,
  elevation: 2, // Android shadow
},
});
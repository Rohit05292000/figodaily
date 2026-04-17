import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useLocation from "../../hooks/useLocation";

export default function Header() {
  const navigation = useNavigation<any>();
  const { address, loading } = useLocation();

  return (
    <LinearGradient colors={["#f7b733", "#fcd36a"]} style={styles.container}>
      
      {/* Top Row */}
      <View style={styles.topRow}>
        <Text style={styles.logo}>FigoDaily</Text>

        <View style={styles.icons}>
          <Ionicons name="notifications-outline" size={20} color="#000" />
          <MaterialIcons
            name="account-circle"
            size={22}
            color="#000"
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>

      {/* Address Row */}
      <View style={styles.middleRow}>
        <View>
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={16} />
            <Text style={styles.address}> Deliver to Home </Text>
            <Ionicons name="chevron-down" size={14} />
          </View>

          <Text style={styles.subAddress} numberOfLines={1}>
            {loading ? "Fetching location..." : address}
          </Text>
        </View>

        <View style={styles.orderContainer}>
          <Text style={styles.orderLabel}>Order by 10PM</Text>

          <View style={styles.orderBox}>
            <Text style={styles.delivery}>Tomorrow</Text>
            <Text style={styles.time}>5:00 AM - 7:00 AM</Text>
          </View>
        </View>
      </View>

      {/* 🔍 FIXED SEARCH (NO INPUT HERE) */}
      <Pressable
        onPress={() => navigation.navigate("SearchScreen")}
      >
        <View style={styles.searchFake}>
          <Ionicons name="search" size={18} color="#555" />
          <Text style={styles.searchText}>Search for Milk</Text>
        </View>
      </Pressable>

      {/* Bottom Text */}
      <Text style={styles.bottomText}>
        Order by 10PM. Get it by 7.30 AM
      </Text>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
  },

  icons: {
    flexDirection: "row",
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  address: {
    fontWeight: "bold",
  },

  subAddress: {
    fontSize: 12,
    color: "#333",
    marginTop: 2,
  },

  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  orderContainer: {
    alignItems: "center",
  },

  orderLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },

  orderBox: {
    backgroundColor: "#2e7d32",
    padding: 8,
    borderRadius: 10,
    width: 120,
    alignItems: "center",
  },

  delivery: {
    color: "#fff",
    fontSize: 11,
  },

  time: {
    color: "#fff",
    fontSize: 11,
  },

  bottomText: {
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },

  searchFake: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },

  searchText: {
    marginLeft: 8,
    color: "#999",
  },
});
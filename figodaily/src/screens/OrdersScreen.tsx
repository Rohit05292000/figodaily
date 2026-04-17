import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/ui/Loading"; // 👈 adjust path if needed

export default function OrdersScreen() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // simulate API call
    setTimeout(() => {
      setOrders([]); // empty for now
      setLoading(false);
    }, 2000);
  }, []);

  // 🔄 LOADING STATE
  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>
          Track your purchases and delivery status
        </Text>
      </View>

      {/* Stats Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.boxValue}>{orders.length}</Text>
            <Text style={styles.boxLabel}>Total Orders</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.box}>
            <Text style={styles.boxValue}>0</Text>
            <Text style={styles.boxLabel}>Pending</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.box}>
            <Text style={styles.boxValue}>0</Text>
            <Text style={styles.boxLabel}>Delivered</Text>
          </View>
        </View>
      </View>

      {/* EMPTY STATE */}
      {orders.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>
            You haven’t placed any orders yet. Start shopping and your orders
            will appear here with live tracking.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 16,
  },

  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  box: {
    alignItems: "center",
  },
  boxValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  boxLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  divider: {
    width: 1,
    height: "70%",
    backgroundColor: "#E5E7EB",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
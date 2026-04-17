import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/ui/Loading"; // adjust path if needed

export default function WalletScreen() {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    // simulate API call
    setTimeout(() => {
      setWallet({
        balance: 0,
        rewards: 0,
      });
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
        <Text style={styles.title}>Wallet</Text>
        <Text style={styles.subtitle}>
          Manage your rewards and transactions
        </Text>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceValue}>₹{wallet?.balance ?? 0}.00</Text>

        <View style={styles.rewardRow}>
          <Text style={styles.rewardText}>
            🎁 Rewards: {wallet?.rewards ?? 0} points
          </Text>
        </View>
      </View>

      {/* EMPTY STATE */}
      {wallet?.balance === 0 && wallet?.rewards === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your wallet is empty</Text>
          <Text style={styles.emptySubtitle}>
            Start shopping to earn cashback and rewards. Your earned money will
            appear here.
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

  balanceCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    marginBottom: 25,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#777",
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 6,
    color: "#1A1A1A",
  },
  rewardRow: {
    marginTop: 10,
    backgroundColor: "#F1F7FF",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  rewardText: {
    fontSize: 13,
    color: "#2B6CB0",
    fontWeight: "500",
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
    backgroundColor: "#4F46E5",
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
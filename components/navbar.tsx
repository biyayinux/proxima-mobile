import { Home, Search, Store } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity>
        <Search size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Home size={24} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Store size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

import Header from "@/components/header";
import Navbar from "@/components/navbar";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function UserLayout() {
  return (
    <View style={styles.container}>
      <Header title="Proxima" />
      <View style={styles.content}>
        <Slot />
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});

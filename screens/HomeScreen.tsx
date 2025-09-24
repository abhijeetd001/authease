import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../AuthContext";
import { AppButton } from "../components/AppButton";

export const HomeScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name || "User"}!</Text>
      <Text>Email: {user?.email}</Text>
      <AppButton title="Logout" onPress={handleLogout} color="#d9534f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center", alignItems: "center" },
  welcome: { fontSize: 22, marginBottom: 10 },
});

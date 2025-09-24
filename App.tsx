import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./AuthContext";
import { LoginScreen } from "./screens/LoginScreen";
import { SignupScreen } from "./screens/SignupScreen";
import { HomeScreen } from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

const AppNav = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Show loading spinner while AsyncStorage data loads
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

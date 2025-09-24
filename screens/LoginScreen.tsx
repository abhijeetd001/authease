import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../AuthContext";
import { Input } from "../components/Input";
import { AppButton } from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }

    try {
      const credentialsStr = await AsyncStorage.getItem("UserAuthAppUser");
      console.log("credentialsStr", credentialsStr);
      const success = await login(email, password);
      if (credentialsStr) {
        const savedCredentials = JSON.parse(credentialsStr);
        if (
          savedCredentials.email === email &&
          savedCredentials.password === password &&
          success
        ) {
          navigation.replace("Home");
        } else {
          setError("Incorrect credentials");
        }
      } else {
        setError("No registered user found");
      }
    } catch (error) {
      setError("Login failed, please try again");
    }
  };

  return (
    <View style={styles.container}>
      <Input
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <Input
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <AppButton title="Login" onPress={handleLogin} />
      <AppButton
        title="Go to Signup"
        onPress={() => navigation.navigate("Signup")}
        color="#666"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  error: { color: "red", marginBottom: 10 },
});

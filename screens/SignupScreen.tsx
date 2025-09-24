import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../AuthContext";
import { Input } from "../components/Input";
import { AppButton } from "../components/AppButton";

export const SignupScreen = ({ navigation }: any) => {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    const emailRegex = /\S+@\S+\.\S+/;
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }
    const success = await signup(name, email, password);
    if (success) {
      navigation.replace("Home");
    } else {
      setError("Signup failed");
    }
  };

  return (
    <View style={styles.container}>
      <Input value={name} placeholder="Name" onChangeText={setName} />
      <Input value={email} placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail} />
      <Input value={password} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <AppButton title="Signup" onPress={handleSignup} />
      <AppButton title="Go to Login" onPress={() => navigation.navigate("Login")} color="#666" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  error: { color: "red", marginBottom: 10 },
});

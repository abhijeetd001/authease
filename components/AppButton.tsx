import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";

type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  color?: string;
};

export const AppButton = ({ onPress, title, color }: ButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, color ? { backgroundColor: color } : {}]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

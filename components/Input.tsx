import React from "react";
import { TextInput, StyleSheet } from "react-native";

type InputProps = {
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences";
  onChangeText: (text: string) => void;
};

export const Input = ({
  value,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  onChangeText,
}: InputProps) => (
  <TextInput
    value={value}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    autoCapitalize={autoCapitalize}
    onChangeText={onChangeText}
    style={styles.input}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
    fontSize: 16,
  },
});

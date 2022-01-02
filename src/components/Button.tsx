import { View, StyleSheet, Text, ViewStyle, TextStyle } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";

interface ButtonProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
}

const Button = ({ title, style, textStyle, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={1}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#269dff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  text: {
    color: "#fff",
  },
});

export default Button;

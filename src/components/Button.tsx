import { View, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
}

const Button = ({ title, style, textStyle, onPress }: ButtonProps) => {

  return (
    <RectButton onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{ title }</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  button: {

  },
  text: {

  }
});

export default Button;
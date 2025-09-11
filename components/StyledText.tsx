import { StyleSheet, Text, TextProps } from "react-native";

type StyledTextProps = TextProps;

const StyledText: React.FC<StyledTextProps> = ({ style, ...props }) => {
  return <Text style={[styles.base, style]} {...props} />
}

const styles = StyleSheet.create({
  base: {
    color: '#fff',
  }
})

export default StyledText;

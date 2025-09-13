import { StyleSheet, Text, TextProps } from "react-native";

type StyledTextProps = TextProps & {
  variant?: "primary" | "title" | "subtitle" | "heading" | "small";
};

const StyledText: React.FC<StyledTextProps> = ({ style, variant = "primary", ...props }) => {
  return  <Text
            style={[
              styles.base,
              style,
              variant === "title" && styles.title,
              variant === "subtitle" && styles.subtitle,
              variant === "heading" && styles.heading,
              variant === "small" && styles.small
            ]}
            {...props}
          />
}

const styles = StyleSheet.create({
  base: {
    color: '#fff',
  },
  // Variants
  primary: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '300',
  },
  heading: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
  },
  small: {
    fontSize: 14,
    lineHeight: 18,
  },
})

export default StyledText;

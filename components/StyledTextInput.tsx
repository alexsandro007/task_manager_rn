import { COLORS } from "@/constants/ui";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type StyledTextInputProps = TextInputProps & {
  isError?: boolean;
};

const StyledTextInput: React.FC<StyledTextInputProps> = ({ isError, ...props }) => {
  return <TextInput style={[styles.input, isError && styles.error]} {...props} placeholderTextColor={COLORS.TEXT_SECONDARY} />;
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: COLORS.PRIMARY_TEXT_INPUT,
    borderColor: COLORS.PRYMARY_BORDER,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.TEXT,
  },
  error: {
    borderColor: COLORS.ERROR,
  }
});

export default StyledTextInput;
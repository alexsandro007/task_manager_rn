import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/ui';
import StyledText from './StyledText';

type StyledButtonProps = {
  label?: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  size?: "small" | "default" | "large";
  variant?: "primary" | "secondary" | "delete" | "danger";
  disabled?: boolean;
  onPress?: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  label,
  icon,
  size = "default",
  variant = "primary",
  disabled,
  ...props
}) => {
  const textVariant = (() => {
    if (size === "large") return "heading";
    return "small"
  })();
  return (
    <TouchableOpacity
      style={[
        styles.base,
        size === "small" && styles.small,
        size === "large" && styles.large,
        variant === "delete" && styles.delete,
        variant === "secondary" && styles.secondary,
        variant === "danger" && styles.danger,
        disabled && styles.disabled
      ]}
        {...props}
        disabled={disabled}
    >
      {label && <StyledText variant={textVariant}>{label}</StyledText>}
      {icon && <Ionicons name={icon} size={20} color="#fff" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.PRIMARY_EDIT,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5
  },
  // Sizes
  small: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  // Variants
  secondary: {
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_EDIT
  },
  delete: {
    backgroundColor: COLORS.PRIMARY_DELETE,
  },
  danger: {
    borderWidth: 2,
    borderColor: COLORS.ERROR
  }
})

export default StyledButton

import { COLORS } from "@/constants/ui";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type StyledCheckboxProps = {
  checked: boolean;
  onCheck: () => void;
}

const StyledCheckbox: React.FC<StyledCheckboxProps> = ({ checked, onCheck }) => {
  return (
    <TouchableOpacity onPress={onCheck}>
      <Ionicons name={checked ? "checkmark-circle" : "checkmark-circle-outline"} size={26} color={checked ? COLORS.SUCCESS : COLORS.PRYMARY_BORDER} />
    </TouchableOpacity>
  )
}

export default StyledCheckbox

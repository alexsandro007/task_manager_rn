import StyledButton from "@/components/StyledButton";
import StyledText from "@/components/StyledText";
import { COLORS } from "@/constants/ui";
import { Todo } from "@/types/todo";
import { Modal, StyleSheet, View } from "react-native";

type InfoTodoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
};

const InfoTodoModal: React.FC<InfoTodoModalProps> = ({ isOpen, onClose, todo }) => {
  if (!isOpen) return null;

  const formattedDate = `📅 ${new Date(todo.dateTime).toLocaleDateString()} ⏰ ${new Date(todo.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <Modal transparent animationType="slide" visible={isOpen}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <StyledText variant="heading">{todo.title}</StyledText>
          <StyledText>Description: {todo.description}</StyledText>
          <StyledText>Date: {formattedDate}</StyledText>
          <StyledText>Location: {todo.location}</StyledText>
          <StyledText>Status: {todo.status}</StyledText>
          <StyledButton label="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    padding: 20,
    width: "80%",
    gap: 10,
  },
});

export default InfoTodoModal;

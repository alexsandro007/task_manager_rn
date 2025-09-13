import StyledButton from "@/components/StyledButton";
import StyledText from "@/components/StyledText";
import { COLORS } from "@/constants/ui";
import { TaskStatus, Todo } from "@/types/todo";
import { useState } from "react";
import { StyleSheet, Vibration, View } from "react-native";
import DeleteTodoModal from "../Modal/DeleteTodoModal";
import EditTodoModal from "../Modal/EditTodoModal";
import InfoTodoModal from "../Modal/InfoTodoModal";

type TodoItemProps = Todo & {
  onDeleteTodo: (id: Todo["id"]) => void;
  onChangeStatus: (id: Todo["id"], status: TaskStatus) => void;
  onUpdateTitle: (id: Todo["id"], title: Todo["title"]) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  description,
  dateTime,
  createdAt,
  location,
  status,
  onDeleteTodo,
  onChangeStatus,
  onUpdateTitle,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Логика циклического переключения статуса
  const handleStatusToggle = () => {
    const statusOrder: TaskStatus[] = ["In Progress", "Completed", "Cancelled"];
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length; // Циклический переход
    const newStatus = statusOrder[nextIndex];
    onChangeStatus(id, newStatus);
  };

  const formattedDate = `📅 ${new Date(dateTime).toLocaleDateString()} ⏰ ${new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  const formattedCreatedAt = `📅 ${new Date(createdAt).toLocaleDateString()} ⏰ ${new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <View style={styles.container}>
      <View style={styles.taskInfo}>
        <StyledText variant="heading" style={status === "Completed" && { textDecorationLine: "line-through" }}>{title}</StyledText>
        <StyledText variant="small">Created: {formattedCreatedAt}</StyledText>
        {/* <StyledText variant="small">Date: {formattedDate}</StyledText> */}
        {/* <StyledText variant="small">Location: {location}</StyledText> */}
        <StyledText variant="small">Status: {status}</StyledText>
      </View>
      <View style={styles.controlsContainer}>
        <StyledButton
          label="Сhange Status"
          size="small"
          onPress={handleStatusToggle}
        />
        <View style={styles.buttonsContainer}>
          <StyledButton
            icon="reader-outline"
            size="small"
            onPress={() => setIsInfoModalOpen(true)}
          />
          <InfoTodoModal
            isOpen={isInfoModalOpen}
            onClose={() => setIsInfoModalOpen(false)}
            todo={{ id, title, description, dateTime, createdAt, location, status}}
          />
          <StyledButton
            icon="pencil"
            size="small"
            onPress={() => setIsEditModalOpen(true)}
          />
          <EditTodoModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={(title) => onUpdateTitle(id, title)}
            title={title}
          />
          <StyledButton
            icon="trash"
            size="small"
            variant="delete"
            onPress={() => setIsDeleteModalOpen(true)}
          />
          <DeleteTodoModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => {
              onDeleteTodo(id);
              Vibration.vibrate(50);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  taskInfo: {
    marginBottom: 10,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default TodoItem;
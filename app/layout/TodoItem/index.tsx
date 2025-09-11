import StyledText from "@/components/StyledText";

type TodoItemProps = {
  title: string;
  isCompleted: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, isCompleted }) => {
  return (
    <StyledText>{title} {isCompleted ? '✅' : '❌'}</StyledText>
  )
}

export default TodoItem

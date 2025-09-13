import { TaskStatus, Todo } from '@/types/todo';
import { FlatList, StyleSheet, View } from 'react-native';
import TodoItem from '../TodoItem';

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: Todo['id']) => void;
  onChangeStatus: (id: Todo['id'], status: TaskStatus) => void;
  onUpdateTitle: (id: Todo['id'], title: Todo['title']) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDeleteTodo,
  onChangeStatus,
  onUpdateTitle
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            {...item}
            onDeleteTodo={onDeleteTodo}
            onChangeStatus={onChangeStatus}
            onUpdateTitle={onUpdateTitle}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
});

export default TodoList
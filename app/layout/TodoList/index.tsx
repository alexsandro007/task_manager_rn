import { Todo } from '@/types/todo';
import { FlatList, StyleSheet, View } from 'react-native';
import TodoItem from '../TodoItem';

type TodoListProps = {
  todos: Todo[];
};

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItem title={item.title} isCompleted={item.isCompleted} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default TodoList

import StyledButton from '@/components/StyledButton';
import { COLORS } from '@/constants/ui';
import useTodo from '@/hooks/useTodo';
import { StyleSheet, View } from 'react-native';
import Header from '../layout/Header';
import TodoCreator from '../layout/TodoCreator';
import TodoList from '../layout/TodoList';

export default function TabTwoScreen() {
  const {
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleChangeStatus,
    onUpdateTitle,
    completedTodosValue,
    setSortBy,
    sortBy
  } = useTodo();

  return (
    <View style={styles.container}>
      <Header completedTodos={completedTodosValue} totalTodos={todos.length} />
      <TodoCreator onAddTodo={handleAddTodo} />
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        <StyledButton label="Sort by Date" onPress={() => setSortBy("date")} variant={sortBy === "date" ? "primary" : "secondary"} />
        <StyledButton label="Sort by Status" onPress={() => setSortBy("status")} variant={sortBy === "status" ? "primary" : "secondary"} />
      </View>
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onChangeStatus={handleChangeStatus} onUpdateTitle={onUpdateTitle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.MAIN,
  },
});
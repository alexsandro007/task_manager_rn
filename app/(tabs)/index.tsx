import StyledText from '@/components/StyledText';
import { Todo } from '@/types/todo';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TodoList from '../layout/TodoList';

const day_now = new Date().toDateString().slice(4);

const defaultTodos: Todo[] = [
  {
    id: 1,
    title: 'Todo 1',
    isCompleted: true,
  },
  {
    id: 2,
    title: 'Todo 2',
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Todo 3',
    isCompleted: false,
  },
]

export default function TabTwoScreen() {
  const [todos, setTodos] = useState<Todo[]>([...defaultTodos]);

  return (
    <View
      style={styles.container}>
      <StyledText style={styles.header}>Tab One</StyledText>
      <StyledText>{day_now}</StyledText>
      <TodoList todos={todos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#32448cff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
});

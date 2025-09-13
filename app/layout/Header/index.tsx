import StyledText from '@/components/StyledText';
import { getTodayDate } from '@/helpers/date';
import { StyleSheet, View } from 'react-native';

type HeaderProps = {
  totalTodos: number;
  completedTodos: number;
}

const Header: React.FC<HeaderProps> = ({ totalTodos, completedTodos }) => {
  const day_now = getTodayDate(new Date());
  return (
    <View style={styles.mainContainer}>
      <StyledText style={styles.header} variant='title'>Task Manager</StyledText>
      <StyledText style={styles.date_info}>{day_now}</StyledText>
      <StyledText style={styles.completedValue}>{completedTodos} / {totalTodos}</StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  date_info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  completedValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});


export default Header

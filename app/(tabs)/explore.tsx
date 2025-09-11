import StyledText from '@/components/StyledText';
import { StyleSheet, View } from 'react-native';

const day_now = new Date().toDateString().slice(4);

export default function TabTwoScreen() {
  return (
    <View
      style={styles.container}>
      <StyledText style={styles.header}>Tab Two</StyledText>
      <StyledText>{day_now}</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#448c32ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
});

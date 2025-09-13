import StyledButton from '@/components/StyledButton'
import StyledTextInput from '@/components/StyledTextInput'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useEffect, useState } from 'react'
import { Keyboard, Platform, StyleSheet, View } from 'react-native'

type TodoCreatorProps = {
  onAddTodo: (title: string, description: string, dateTime: string, location: string) => void
}

const TodoCreator: React.FC<TodoCreatorProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState<string>(''); // итоговый ISO
  const [location, setLocation] = useState('');
  const [inputError, setInputError] = useState('');

  const [tempDate, setTempDate] = useState<Date | null>(null); // хранит выбранную дату перед временем
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const onPressAdd = () => {
    if (!title || !description || !dateTime || !location) {
      setInputError('All fields are required');
      return;
    }
    if (isNaN(Date.parse(dateTime))) {
      setInputError('Invalid date format');
      return;
    }
    Keyboard.dismiss();
    setInputError('');
    onAddTodo(title, description, dateTime, location);
    setTitle('');
    setDescription('');
    setDateTime('');
    setLocation('');
    setTempDate(null);
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    if (!selectedDate) {
      setShowPicker(false);
      return;
    }

    if (mode === 'date') {
      // сохраняем выбранную дату, переключаемся на время
      setTempDate(selectedDate);
      setMode('time');
      setShowPicker(true);
    } else if (mode === 'time') {
      // объединяем дату и время
      if (tempDate) {
        const finalDate = new Date(tempDate);
        finalDate.setHours(selectedDate.getHours());
        finalDate.setMinutes(selectedDate.getMinutes());
        finalDate.setSeconds(0);
        setDateTime(finalDate.toISOString());
      }
      setTempDate(null);
      setShowPicker(false);
      setMode('date');
    }
  };

  useEffect(() => {
    if (inputError && title && description && dateTime && location) {
      setInputError('');
    }
  }, [title, description, dateTime, location]);

  const formattedDate = dateTime
  ? `📅 ${new Date(dateTime).toLocaleDateString()} ⏰ ${new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  : 'Pick Date & Time';

  return (
    <View style={styles.todoCreatorContainer}>
      <StyledTextInput
        placeholder='Title'
        isError={!!inputError && !title}
        value={title}
        onChangeText={setTitle}
      />
      <StyledTextInput
        placeholder='Description'
        isError={!!inputError && !description}
        value={description}
        onChangeText={setDescription}
      />

      {/* Блок выбора даты/времени */}
      <View>
        <StyledButton
          label={formattedDate}
          onPress={() => {
            setMode('date');
            setShowPicker(true);
          }}
          variant={!!inputError && !dateTime ? 'danger' : 'secondary'}
        />
        {showPicker && (
          <DateTimePicker
            value={tempDate || new Date()}
            mode={mode}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleDateChange}
          />
        )}
      </View>

      <StyledTextInput
        placeholder='Location'
        isError={!!inputError && !location}
        value={location}
        onChangeText={setLocation}
      />

      <StyledButton
        icon="add"
        onPress={onPressAdd}
        size='large'
        disabled={!!inputError}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  todoCreatorContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: 50,
  },
})

export default TodoCreator

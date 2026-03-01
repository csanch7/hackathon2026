import { StyleSheet, Text, TextInput, View } from 'react-native';

import { QuestionComponentProps } from '@/src/components/quiz-types';

export function OpenEndedQuestion({ question, answer, onAnswerChange }: QuestionComponentProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.question}>{question.text}</Text>
      <TextInput
        style={styles.input}
        value={answer?.answerText ?? ''}
        onChangeText={(text) => onAnswerChange({ questionId: question._id, answerText: text })}
        placeholder="Share your thoughts"
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: '#112018',
    marginBottom: 6,
  },
  input: {
    minHeight: 130,
    borderWidth: 1,
    borderColor: '#d2d9d2',
    backgroundColor: '#fff',
    borderRadius: 12,
    textAlignVertical: 'top',
    padding: 12,
  },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { QuestionComponentProps } from '@/src/components/quiz-types';

export function YesNoQuestion({ question, answer, onAnswerChange }: QuestionComponentProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.question}>{question.text}</Text>
      {[
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ].map((item) => {
        const selected = answer?.answerBool === item.value;
        return (
          <Pressable
            key={item.label}
            style={[styles.option, selected && styles.optionActive]}
            onPress={() => onAnswerChange({ questionId: question._id, answerBool: item.value })}>
            <Text style={selected ? styles.optionTextActive : styles.optionText}>{item.label}</Text>
          </Pressable>
        );
      })}
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
  option: {
    borderWidth: 1,
    borderColor: '#d2d9d2',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
  },
  optionActive: {
    borderColor: '#6f3fd6',
    backgroundColor: '#efe8ff',
  },
  optionText: { color: '#23362a' },
  optionTextActive: { color: '#4b21a8', fontWeight: '600' },
});

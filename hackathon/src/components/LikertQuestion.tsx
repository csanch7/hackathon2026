import { Pressable, StyleSheet, Text, View } from 'react-native';

import { QuestionComponentProps } from '@/src/components/quiz-types';

const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

export function LikertQuestion({ question, answer, onAnswerChange }: QuestionComponentProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.question}>{question.text}</Text>
      {labels.map((label, index) => {
        const value = index + 1;
        const selected = answer?.answerLikert === value;
        return (
          <Pressable
            key={label}
            style={[styles.option, selected && styles.optionActive]}
            onPress={() => onAnswerChange({ questionId: question._id, answerLikert: value })}>
            <Text style={selected ? styles.optionTextActive : styles.optionText}>{label}</Text>
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

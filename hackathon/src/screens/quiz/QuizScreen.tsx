import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';
import { LikertQuestion } from '@/src/components/LikertQuestion';
import { OpenEndedQuestion } from '@/src/components/OpenEndedQuestion';
import { QuizProgressBar } from '@/src/components/QuizProgressBar';
import { YesNoQuestion } from '@/src/components/YesNoQuestion';
import { QuizAnswerInput, QuizQuestion } from '@/src/components/quiz-types';

export function QuizScreen({ questions }: { questions: QuizQuestion[] }) {
  const submitAnswers = useMutation(api.quiz.submitAnswers);
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuizAnswerInput>>({});
  const [submitting, setSubmitting] = useState(false);

  const current = questions[index];
  const currentAnswer = answers[current?._id];

  const canContinue = useMemo(() => {
    if (!current) {
      return false;
    }

    const answer = answers[current._id];
    if (!answer) {
      return false;
    }

    if (current.type === 'likert') {
      return typeof answer.answerLikert === 'number';
    }

    if (current.type === 'yes_no') {
      return typeof answer.answerBool === 'boolean';
    }

    return Boolean(answer.answerText?.trim());
  }, [answers, current]);

  if (!current) {
    return null;
  }

  const QuestionComponent =
    current.type === 'likert' ? LikertQuestion : current.type === 'yes_no' ? YesNoQuestion : OpenEndedQuestion;

  return (
    <View style={styles.container}>
      <QuizProgressBar progress={(index + 1) / questions.length} />
      <Animated.View key={current._id} entering={FadeInRight.duration(250)} exiting={FadeOutLeft.duration(250)}>
        <QuestionComponent
          question={current}
          answer={currentAnswer}
          onAnswerChange={(next) => setAnswers((prev) => ({ ...prev, [current._id]: next }))}
        />
      </Animated.View>

      <Pressable
        style={[styles.button, (!canContinue || submitting) && styles.buttonDisabled]}
        disabled={!canContinue || submitting}
        onPress={async () => {
          const isLast = index >= questions.length - 1;
          if (!isLast) {
            setIndex((prev) => prev + 1);
            return;
          }

          try {
            setSubmitting(true);
            await submitAnswers({ answers: Object.values(answers) });
            router.replace('/(auth)/quiz/complete');
          } catch (error) {
            Alert.alert('Could not submit quiz', (error as Error).message);
          } finally {
            setSubmitting(false);
          }
        }}>
        <Text style={styles.buttonLabel}>{index === questions.length - 1 ? 'Submit quiz' : 'Next'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 34,
    backgroundColor: '#f7f8f5',
  },
  button: {
    marginTop: 'auto',
    backgroundColor: '#112018',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

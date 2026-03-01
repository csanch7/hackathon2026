import { ActivityIndicator, View } from 'react-native';
import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';
import { QuizScreen } from '@/src/screens/quiz/QuizScreen';

export default function QuizRoute() {
  const questions = useQuery(api.quiz.getQuestions);

  if (questions === undefined) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <QuizScreen questions={questions} />;
}

import { useRouter } from 'expo-router';

import { StepInputScreen } from '@/src/screens/signup/StepInputScreen';

export default function AgeRoute() {
  const router = useRouter();
  return (
    <StepInputScreen
      field="age"
      title="How old are you?"
      keyboardType="numeric"
      progress={8 / 11}
      onNext={() => router.push('/(auth)/signup/gender')}
    />
  );
}

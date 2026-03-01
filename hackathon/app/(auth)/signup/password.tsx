import { useRouter } from 'expo-router';

import { StepInputScreen } from '@/src/screens/signup/StepInputScreen';

export default function PasswordRoute() {
  const router = useRouter();
  return (
    <StepInputScreen
      field="password"
      title="Create a password"
      secureTextEntry
      progress={2 / 11}
      onNext={() => router.push('/(auth)/signup/photo')}
    />
  );
}

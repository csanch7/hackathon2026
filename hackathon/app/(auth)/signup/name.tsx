import { useRouter } from 'expo-router';

import { StepInputScreen } from '@/src/screens/signup/StepInputScreen';

export default function NameRoute() {
  const router = useRouter();
  return (
    <StepInputScreen
      field="first_name"
      title="What's your first name?"
      progress={4 / 11}
      onNext={() => router.push('/(auth)/signup/school')}
    />
  );
}

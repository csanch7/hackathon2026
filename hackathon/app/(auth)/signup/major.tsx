import { useRouter } from 'expo-router';

import { StepInputScreen } from '@/src/screens/signup/StepInputScreen';

export default function MajorRoute() {
  const router = useRouter();
  return (
    <StepInputScreen
      field="major"
      title="What are you studying?"
      progress={6 / 11}
      onNext={() => router.push('/(auth)/signup/year')}
    />
  );
}

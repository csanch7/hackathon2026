import { useRouter } from 'expo-router';

import { StepInputScreen } from '@/src/screens/signup/StepInputScreen';

export default function EmailRoute() {
  const router = useRouter();
  return (
    <StepInputScreen
      field="email"
      title="Your .edu email"
      subtitle="We only match verified Chicago college students."
      keyboardType="email-address"
      progress={1 / 11}
      onNext={() => router.push('/(auth)/signup/password')}
    />
  );
}

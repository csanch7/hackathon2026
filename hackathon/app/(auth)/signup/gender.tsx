import { useRouter } from 'expo-router';

import { StepInputScreen } from '@/src/screens/signup/StepInputScreen';
import { GENDER_OPTIONS } from '@/src/utils/constants';

export default function GenderRoute() {
  const router = useRouter();
  return (
    <StepInputScreen
      field="gender"
      title="Gender"
      progress={9 / 11}
      options={GENDER_OPTIONS.map((value) => ({ label: value, value }))}
      onNext={() => router.push('/(auth)/signup/pronouns')}
    />
  );
}

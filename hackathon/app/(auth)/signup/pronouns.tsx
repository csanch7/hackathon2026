import { useRouter } from 'expo-router';

import { StepInputScreen } from '@/src/screens/signup/StepInputScreen';
import { PRONOUN_OPTIONS } from '@/src/utils/constants';

export default function PronounsRoute() {
  const router = useRouter();
  return (
    <StepInputScreen
      field="pronouns"
      title="Pronouns"
      progress={10 / 11}
      options={PRONOUN_OPTIONS.map((value) => ({ label: value, value }))}
      onNext={() => router.push('/(auth)/signup/preference')}
    />
  );
}

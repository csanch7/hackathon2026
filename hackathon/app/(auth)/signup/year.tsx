import { useRouter } from 'expo-router';

import { StepInputScreen } from '@/src/screens/signup/StepInputScreen';
import { YEAR_OPTIONS } from '@/src/utils/constants';

export default function YearRoute() {
  const router = useRouter();
  return (
    <StepInputScreen
      field="year"
      title="What year are you in?"
      progress={7 / 11}
      options={YEAR_OPTIONS.map((year) => ({ label: year, value: year }))}
      onNext={() => router.push('/(auth)/signup/age')}
    />
  );
}

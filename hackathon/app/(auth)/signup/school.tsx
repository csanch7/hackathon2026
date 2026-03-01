import { useRouter } from 'expo-router';

import { StepInputScreen } from '@/src/screens/signup/StepInputScreen';
import { APPROVED_SCHOOLS } from '@/src/utils/constants';

export default function SchoolRoute() {
  const router = useRouter();
  return (
    <StepInputScreen
      field="school"
      title="Pick your school"
      progress={5 / 11}
      options={APPROVED_SCHOOLS.map((school) => ({ label: school, value: school }))}
      onNext={() => router.push('/(auth)/signup/major')}
    />
  );
}

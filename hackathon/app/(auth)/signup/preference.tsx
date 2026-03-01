import { useRouter } from 'expo-router';

import { PreferenceScreen } from '@/src/screens/signup/PreferenceScreen';

export default function PreferenceRoute() {
  const router = useRouter();
  return (
    <PreferenceScreen progress={1} onDone={() => router.replace('/(auth)/quiz')} />
  );
}

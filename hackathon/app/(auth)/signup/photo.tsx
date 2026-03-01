import { useRouter } from 'expo-router';

import { PhotoUploadScreen } from '@/src/screens/signup/PhotoUploadScreen';

export default function PhotoRoute() {
  const router = useRouter();
  return <PhotoUploadScreen progress={3 / 11} onNext={() => router.push('/(auth)/signup/name')} />;
}

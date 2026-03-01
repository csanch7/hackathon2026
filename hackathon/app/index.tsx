import { Redirect } from 'expo-router';

import { useAuth } from '@/src/context/AuthContext';

export default function IndexRoute() {
  const { isSignedIn, isLoaded, profile } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/signup/email" />;
  }

  if (!profile?.quizCompleted) {
    return <Redirect href="/(auth)/quiz" />;
  }

  return <Redirect href="/(app)/home" />;
}

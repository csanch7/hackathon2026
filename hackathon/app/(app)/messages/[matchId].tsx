import { useLocalSearchParams } from 'expo-router';

import { ChatScreen } from '@/src/screens/messages/ChatScreen';

export default function ChatRoute() {
  const params = useLocalSearchParams<{ matchId: string }>();
  return <ChatScreen matchId={params.matchId} />;
}

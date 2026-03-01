import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ChatInput } from '@/src/components/ChatInput';
import { MessageBubble } from '@/src/components/MessageBubble';
import { useAuth } from '@/src/context/AuthContext';
import { useMatch } from '@/src/hooks/useMatch';
import { useMessages } from '@/src/hooks/useMessages';

export function ChatScreen({ matchId }: { matchId: string }) {
  const { profile } = useAuth();
  const { match } = useMatch();
  const { messages, send } = useMessages(matchId);

  const isReadOnly = useMemo(() => match?.status !== 'active', [match]);
  const template = match?.messageTemplate;

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble message={item} mine={item.senderId === profile?._id} />
        )}
        contentContainerStyle={{ paddingVertical: 18 }}
      />

      {isReadOnly ? <Text style={styles.readOnly}>This match is archived. Chat is read-only.</Text> : null}
      <ChatInput
        disabled={isReadOnly}
        initialValue={messages.length === 0 ? template : undefined}
        onSend={send}
        placeholder={isReadOnly ? 'Archived chat' : 'Send a message'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#f7f8f5',
  },
  readOnly: {
    color: '#765454',
    marginBottom: 6,
    fontSize: 13,
  },
});

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useMatch } from '@/src/hooks/useMatch';

export function MessagesListScreen() {
  const { match } = useMatch();
  const router = useRouter();

  const conversations = match
    ? [
        {
          id: match.matchId,
          name: match.partnerProfile.firstName,
          preview: 'Current match',
          active: match.status === 'active',
        },
      ]
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No chats yet. Check back Sunday at 7pm.</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.row, item.active ? styles.rowActive : styles.rowArchived]}
            onPress={() => router.push(`/(app)/messages/${item.id}`)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.preview}>{item.preview}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 20,
    backgroundColor: '#f7f8f5',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#112018',
    marginBottom: 18,
  },
  empty: {
    color: '#4c5c52',
    marginTop: 20,
  },
  row: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  rowActive: {
    backgroundColor: '#eaf0ea',
    borderWidth: 1,
    borderColor: '#b8c8bb',
  },
  rowArchived: {
    backgroundColor: '#efefef',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#112018',
  },
  preview: {
    marginTop: 4,
    color: '#4c5c52',
  },
});

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { CountdownTimer } from '@/src/components/CountdownTimer';
import { DateSuggestionCard } from '@/src/components/DateSuggestionCard';
import { MatchCard } from '@/src/components/MatchCard';
import { useMatch } from '@/src/hooks/useMatch';

export function HomeScreen() {
  const { match } = useMatch();
  const router = useRouter();

  if (!match) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>7even</Text>
        <CountdownTimer />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>7even</Text>
      <DateSuggestionCard suggestion={match.dateSuggestion} />
      <View style={{ height: 18 }} />
      <MatchCard match={match} />

      <Pressable style={styles.button} onPress={() => router.push(`/(app)/messages/${match.matchId}`)}>
        <Text style={styles.buttonLabel}>Send a Message</Text>
      </Pressable>
      <Text style={styles.template}>{match.messageTemplate}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 36,
    backgroundColor: '#f7f8f5',
  },
  logo: {
    fontSize: 34,
    color: '#112018',
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#112018',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  template: {
    marginTop: 12,
    fontSize: 14,
    color: '#44594b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

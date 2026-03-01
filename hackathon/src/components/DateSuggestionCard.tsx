import { StyleSheet, Text, View } from 'react-native';

type DateSuggestion = {
  venueName: string;
  address: string;
  time: string;
  photoUrl?: string;
};

export function DateSuggestionCard({ suggestion }: { suggestion: DateSuggestion }) {
  return (
    <View style={styles.card}>
      <Text style={styles.badge}>We found a date idea for you two</Text>
      <Text style={styles.venue}>{suggestion.venueName}</Text>
      <Text style={styles.meta}>{suggestion.address}</Text>
      <Text style={styles.meta}>{suggestion.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff5e8',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8d8bf',
  },
  badge: {
    fontSize: 13,
    fontWeight: '600',
    color: '#855f23',
  },
  venue: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#2f2719',
  },
  meta: {
    marginTop: 4,
    fontSize: 15,
    color: '#5a4b33',
  },
});

import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { MatchResult } from '@/src/hooks/useMatch';

export function MatchCard({ match }: { match: NonNullable<MatchResult> }) {
  return (
    <View style={styles.container}>
      {match.partnerProfile.photoUrl ? (
        <Image source={{ uri: match.partnerProfile.photoUrl }} style={styles.avatar} contentFit="cover" />
      ) : (
        <View style={[styles.avatar, styles.avatarFallback]} />
      )}
      <Text style={styles.name}>{match.partnerProfile.firstName}</Text>
      <Text style={styles.meta}>
        {match.partnerProfile.school} • {match.partnerProfile.year}
      </Text>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>{match.overlapSummary}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: '#e6e8e4',
  },
  avatarFallback: {
    borderWidth: 1,
    borderColor: '#d4dad2',
  },
  name: {
    marginTop: 12,
    fontSize: 28,
    fontWeight: '700',
    color: '#112018',
  },
  meta: {
    marginTop: 4,
    color: '#4c5c52',
    fontSize: 16,
  },
  summaryCard: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#edf2ef',
    padding: 14,
    borderRadius: 14,
  },
  summaryText: {
    color: '#1f3429',
    fontSize: 15,
    lineHeight: 22,
  },
});

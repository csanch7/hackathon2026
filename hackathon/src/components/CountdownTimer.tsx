import { StyleSheet, Text, View } from 'react-native';

import { useCountdown } from '@/src/hooks/useCountdown';

export function CountdownTimer() {
  const countdown = useCountdown();

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Your match drops in</Text>
      <Text style={styles.time}>
        {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#112018',
    borderRadius: 20,
    padding: 24,
  },
  label: {
    color: '#d6dbd4',
    fontSize: 16,
  },
  time: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
  },
});

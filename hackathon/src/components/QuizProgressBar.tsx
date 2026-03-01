import { StyleSheet, View } from 'react-native';

export function QuizProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.max(5, progress * 100)}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#d6dbd4',
    marginBottom: 18,
  },
  fill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#6f3fd6',
  },
});

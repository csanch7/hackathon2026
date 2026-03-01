import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export function QuizCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✅</Text>
      <Text style={styles.title}>You&apos;re all set!</Text>
      <Text style={styles.snapshot}>You completed your personality and values profile.</Text>
      <Text style={styles.caption}>Your first match drops Sunday at 7pm Chicago time.</Text>

      <Pressable style={styles.button} onPress={() => router.replace('/(app)/home')}>
        <Text style={styles.buttonLabel}>Go to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f7f8f5',
  },
  emoji: {
    fontSize: 72,
  },
  title: {
    marginTop: 18,
    fontSize: 34,
    color: '#112018',
    fontWeight: '800',
  },
  snapshot: {
    marginTop: 8,
    textAlign: 'center',
    color: '#2f4739',
    fontSize: 17,
  },
  caption: {
    marginTop: 6,
    textAlign: 'center',
    color: '#4c5c52',
  },
  button: {
    marginTop: 28,
    backgroundColor: '#112018',
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

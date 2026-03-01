import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
  progress: number;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
}>;

export function SignupLayout({
  children,
  title,
  subtitle,
  progress,
  onNext,
  nextLabel = 'Next',
  disabled,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(5, progress * 100)}%` }]} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.content}>{children}</View>
      <Pressable style={[styles.button, disabled && styles.buttonDisabled]} onPress={onNext} disabled={disabled}>
        <Text style={styles.buttonLabel}>{nextLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8f5',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#d6dbd4',
    borderRadius: 999,
    marginBottom: 28,
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#1f5f4a',
  },
  title: {
    fontSize: 30,
    color: '#112018',
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: '#4c5c52',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#112018',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

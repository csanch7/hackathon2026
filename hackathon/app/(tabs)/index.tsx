import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#EEF6FF', dark: '#111C2D' }}
      headerImage={
        <View
          style={[
            styles.heroGraphic,
            {
              backgroundColor: colorScheme === 'light' ? '#D7E9FF' : '#1C2E49',
              borderColor: colorScheme === 'light' ? '#B9D7FF' : '#35527C',
            },
          ]}>
          <View style={[styles.heroDot, { backgroundColor: palette.tint }]} />
          <View
            style={[
              styles.heroDotSmall,
              { backgroundColor: colorScheme === 'light' ? '#5A9DFD' : '#7CB4FF' },
            ]}
          />
        </View>
      }>
      <ThemedView style={styles.headerContent}>
        <ThemedText type="title" style={[styles.heroTitle, { fontFamily: Fonts.rounded }]}>
          Build fast. Ship clean.
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          A modern starter workspace with focused flows, high-contrast UI, and polished defaults.
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={[
          styles.card,
          { borderColor: colorScheme === 'light' ? '#DDE8F6' : '#2B3444' },
        ]}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          Today
        </ThemedText>
        <ThemedText style={styles.metric}>12 active tasks</ThemedText>
        <ThemedText style={styles.cardBody}>3 in review, 9 in progress</ThemedText>
      </ThemedView>

      <ThemedView style={styles.grid}>
        <ThemedView
          style={[
            styles.smallCard,
            { borderColor: colorScheme === 'light' ? '#DDE8F6' : '#2B3444' },
          ]}>
          <ThemedText style={styles.smallCardLabel}>Velocity</ThemedText>
          <ThemedText style={styles.smallCardValue}>+28%</ThemedText>
        </ThemedView>
        <ThemedView
          style={[
            styles.smallCard,
            { borderColor: colorScheme === 'light' ? '#DDE8F6' : '#2B3444' },
          ]}>
          <ThemedText style={styles.smallCardLabel}>Deploys</ThemedText>
          <ThemedText style={styles.smallCardValue}>7 this week</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView
        style={[
          styles.card,
          styles.highlightCard,
          { borderColor: colorScheme === 'light' ? '#CCE1FF' : '#345078' },
        ]}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          Next Up
        </ThemedText>
        <ThemedText style={styles.cardBody}>
          Open the Explore tab to browse modules and extension points for your platform.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    gap: 6,
    marginBottom: 2,
  },
  heroTitle: {
    lineHeight: 40,
  },
  heroSubtitle: {
    opacity: 0.78,
  },
  heroGraphic: {
    height: 184,
    width: 320,
    bottom: 18,
    left: 20,
    borderRadius: 36,
    borderWidth: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroDot: {
    width: 56,
    height: 56,
    borderRadius: 28,
    opacity: 0.9,
  },
  heroDotSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 56,
    right: 92,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    gap: 6,
  },
  cardTitle: {
    fontFamily: Fonts.rounded,
  },
  cardBody: {
    opacity: 0.75,
  },
  metric: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    fontFamily: Fonts.rounded,
  },
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  smallCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 2,
  },
  smallCardLabel: {
    opacity: 0.68,
    fontSize: 14,
  },
  smallCardValue: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    fontFamily: Fonts.rounded,
  },
  highlightCard: {
    backgroundColor: 'rgba(70, 140, 255, 0.08)',
  },
});

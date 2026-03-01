import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Defining our new Chicago "Warmer" palette
const COLORS = {
  WARM_RED: '#D94133',     // Rich, Terracotta Warmth
  OFF_WHITE: '#FBFBFB',     // Card Background (Default)
  TEXT_MAIN: '#3A3A3A',     // Deep charcoal
  TEXT_SUB: '#7F8C8D',      // Subtitle gray
  BG: '#F4F7F6',            // Main app background
};

const VALUES = [
  "Acceptance", "Adventure", "Autonomy", "Compassion", "Creativity", "Fitness", 
  "Freedom", "Friendship", "Growth", "Happiness", "Honesty", "Humor", "Inner Peace", 
  "Integrity", "Justice", "Knowledge", "Loving", "Purpose", "Spirituality", "Wisdom"
];

export default function SleekWarmValueScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  // Double-check the spelling here match your file perfectly!
  const unityImg = require('../../assets/images/unity.jpg') as any;

  const handlePress = (val: string) => {
    if (selected.includes(val)) {
      setSelected(selected.filter(item => item !== val));
    } else if (selected.length < 5) {
      setSelected([...selected, val]);
    }
  };

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <Image source={unityImg} style={styles.heroImg} />
          {/* Subtle gradient overlay to make text pop */}
          <View style={styles.overlay}>
            <Text style={styles.heroTitle}>Match on Values</Text>
          </View>
        </View>

        <View style={styles.selectionBox}>
          <Text style={styles.sectionLabel}>Your Priorities ({selected.length}/5)</Text>
          <View style={styles.pillContainer}>
            {selected.map(val => (
              <View key={val} style={styles.pill}><Text style={styles.pillText}>{val}</Text></View>
            ))}
            {selected.length === 0 && <Text style={styles.hint}>Define your unique vibe...</Text>}
          </View>
        </View>

        <View style={styles.grid}>
          {VALUES.map(val => {
            const isActive = selected.includes(val);
            return (
              <TouchableOpacity 
                key={val} 
                activeOpacity={0.8}
                onPress={() => handlePress(val)}
                // We refined the base style here
                style={[styles.cardDefault, isActive && styles.cardActive]}
              >
                <Text style={[styles.cardTextDefault, isActive && styles.cardTextActive]}>
                  {val}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: COLORS.BG },
  scroll: { paddingBottom: 100 },
  hero: { height: 280, width: '100%', marginBottom: -30 },
  heroImg: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end', padding: 30 },
  heroTitle: { color: '#FFF', fontSize: 30, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
  selectionBox: { backgroundColor: '#FFF', marginHorizontal: 20, padding: 20, borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 10 },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: COLORS.TEXT_SUB, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 },
  pillContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  pill: { backgroundColor: COLORS.WARM_RED, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, margin: 4 },
  pillText: { color: '#FFF', fontWeight: '700', fontSize: 12 },
  hint: { color: '#BBB', fontStyle: 'italic', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 },
  
  // *** THIS IS THE NEW SLEEK DEFAULT BUTTON VIBE ***
  cardDefault: { 
    backgroundColor: COLORS.OFF_WHITE, 
    width: (width - 60) / 2, 
    paddingVertical: 18, 
    borderRadius: 14, 
    marginBottom: 15, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E6EAEB', // Super light, clean border
    shadowColor: '#000', 
    shadowOpacity: 0.03, // Barely there shadow
    shadowRadius: 5, 
    elevation: 1, 
  },
  cardActive: { 
    backgroundColor: COLORS.WARM_RED, 
    borderColor: COLORS.WARM_RED, // Border changes to match fill
    shadowOpacity: 0.15, // Subtle shadow pop when active
    transform: [{ scale: 1.02 }], // Slight upscale vibe
  },
  
  // *** NEW TEXT VIBE ***
  cardTextDefault: { 
    fontWeight: '700', 
    color: COLORS.TEXT_MAIN, 
    fontSize: 12, 
    textTransform: 'uppercase', // Sleek labeling
    letterSpacing: 0.6,
  },
  cardTextActive: { 
    color: '#FFF', 
    fontWeight: '800', 
  },
});
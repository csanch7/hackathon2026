import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ImageBackground, Pressable, Dimensions, SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window');

// Restored the full 83 values from the MI set
const ALL_VALUES = [
  "Acceptance", "Accuracy", "Achievement", "Adventure", "Art", "Authority", "Autonomy", "Beauty", "Caring", "Challenge", "Change", "Comfort", "Compassion", "Contribution", "Cooperation", "Courtesy", "Creativity", "Dependability", "Duty", "Ecology", "Excitement", "Faithfulness", "Fame", "Family", "Fitness", "Flexibility", "Forgiveness", "Freedom", "Friendship", "Fun", "Generosity", "Genuineness", "Growth", "Happiness", "Health", "Helpfulness", "Honesty", "Hope", "Humility", "Humor", "Independence", "Industry", "Inner Peace", "Integrity", "Intimacy", "Justice", "Knowledge", "Leisure", "Loved", "Loving", "Mastery", "Mindfulness", "Moderation", "Monogamy", "Non-Conformity", "Nurturing", "Openness", "Order", "Passion", "Pleasure", "Popularity", "Power", "Purpose", "Rationality", "Realism", "Responsibility", "Risk", "Safety", "Self-Acceptance", "Self-Control", "Self-Esteem", "Self-Knowledge", "Service", "Sexuality", "Simplicity", "Solitude", "Spirituality", "Stability", "Tolerance", "Tradition", "Virtue", "Wealth", "World Peace"
];

const COLORS = {
  TERRACOTTA: '#D94133',
  TERRA_DARK: '#8B2B22', 
  CHAMPAGNE: '#FDFBF7',
  BONE: '#E8E2D5',
  BONE_DARK: '#C4BDAE', 
  MIDNIGHT: '#2C3E50',
  WHITE: '#FFFFFF'
};

export default function SevenMechanicalTwoColumn() {
  const [selected, setSelected] = useState<string[]>([]);
  // Verified path: assets/images/7even.png
  const heroImg = require('../../assets/images/7even.png');

  const toggleValue = (val: string) => {
    if (selected.includes(val)) {
      setSelected(selected.filter(item => item !== val));
    } else if (selected.length < 7) {
      setSelected([...selected, val]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView 
          stickyHeaderIndices={[1]} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {/* 1. Brand Hero */}
          <ImageBackground source={heroImg} style={styles.hero}>
            <View style={styles.heroOverlay}>
              <Text style={styles.logo}>7even</Text>
              <Text style={styles.tagline}>Values Driven Dating</Text>
            </View>
          </ImageBackground>

          {/* 2. Sticky Tactile Tracker */}
          <View style={styles.stickyTracker}>
            <Text style={styles.trackerLabel}>Select Your Core 7</Text>
            <View style={styles.dotRow}>
              {[...Array(7)].map((_, i) => (
                <View key={i} style={[styles.dot, i < selected.length && styles.dotActive]} />
              ))}
            </View>
          </View>

          {/* 3. The 3D Two-Column Grid */}
          <View style={styles.grid}>
            {ALL_VALUES.map((value) => {
              const isPicked = selected.includes(value);
              return (
                <View key={value} style={styles.keyContainer}>
                  {/* DEPTH LAYER: The "Well" of the button */}
                  <View style={[styles.keyShadow, isPicked ? styles.shadowActive : styles.shadowInactive]} />
                  
                  {/* INTERACTIVE LAYER: The "Face" that sinks */}
                  <Pressable
                    onPress={() => toggleValue(value)}
                    style={({ pressed }) => [
                      styles.keyFace,
                      isPicked ? styles.faceActive : styles.faceInactive,
                      // Physically offsets the button down 6px when active
                      { transform: [{ translateY: pressed || isPicked ? 6 : 0 }] }
                    ]}
                  >
                    <Text 
                      numberOfLines={1} 
                      style={[styles.keyText, isPicked && styles.keyTextActive]}
                    >
                      {value}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* 4. Floating Reveal Button */}
        {selected.length === 7 && (
          <Pressable style={styles.matchBtn}>
            <Text style={styles.matchText}>Find Your Match</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.MIDNIGHT },
  container: { flex: 1, backgroundColor: COLORS.CHAMPAGNE },
  scroll: { paddingBottom: 120 },
  
  hero: { width: '100%', height: 350 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', paddingBottom: 40 },
  logo: { fontSize: 80, fontWeight: '900', color: COLORS.WHITE, letterSpacing: -4 },
  tagline: { fontSize: 11, color: COLORS.WHITE, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 3, marginTop: -10 },

  stickyTracker: { backgroundColor: COLORS.CHAMPAGNE, paddingVertical: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#EEE' },
  trackerLabel: { fontSize: 11, fontWeight: '800', color: COLORS.MIDNIGHT, textTransform: 'uppercase', marginBottom: 10 },
  dotRow: { flexDirection: 'row' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#DDD', marginHorizontal: 4 },
  dotActive: { backgroundColor: COLORS.TERRACOTTA, width: 22 },

  // TWO COLUMN MECHANICAL GRID
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingHorizontal: 10, paddingTop: 20 },
  keyContainer: { width: (width - 60) / 2, height: 58, margin: 10 },
  
  keyShadow: {
    position: 'absolute',
    top: 6, // The depth offset
    left: 0,
    right: 0,
    bottom: -6,
    borderRadius: 12,
  },
  shadowInactive: { backgroundColor: COLORS.BONE_DARK },
  shadowActive: { backgroundColor: COLORS.TERRA_DARK },
  
  keyFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  faceInactive: { backgroundColor: COLORS.WHITE, borderColor: COLORS.BONE },
  faceActive: { backgroundColor: COLORS.TERRACOTTA, borderColor: COLORS.TERRA_DARK },
  
  keyText: { fontSize: 12, fontWeight: '800', color: COLORS.MIDNIGHT, textTransform: 'uppercase', textAlign: 'center', paddingHorizontal: 4 },
  keyTextActive: { color: COLORS.WHITE },

  matchBtn: { position: 'absolute', bottom: 40, left: 20, right: 20, backgroundColor: COLORS.MIDNIGHT, paddingVertical: 20, borderRadius: 100, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 },
  matchText: { color: COLORS.WHITE, fontWeight: '900', fontSize: 16, textTransform: 'uppercase' }
});
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

const ALL_VALUES = [
  "Acceptance", "Achievement", "Adventure", "Autonomy", "Caring", "Challenge", 
  "Compassion", "Contribution", "Creativity", "Faithfulness", "Freedom", "Friendship", 
  "Generosity", "Growth", "Happiness", "Honesty", "Hope", "Humor", "Inner Peace", 
  "Integrity", "Justice", "Knowledge", "Loving", "Purpose", "Service", "Spirituality"
];

export default function ValueSortScreen() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  
  // Updated to your new filename
  const unityImg = require('../../assets/images/unity.jpg') as any;

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else if (selectedValues.length < 5) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* New Hero Section */}
        <View style={styles.heroSection}>
          <Image source={unityImg} style={styles.heroImage} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Chicago Style Values</Text>
            <Text style={styles.subtitle}>Building bridges, one date at a time.</Text>
          </View>
        </View>

        <View style={styles.topFiveContainer}>
          <Text style={styles.selectionHeader}>Your Top 5 Core Values:</Text>
          <View style={styles.selectedRow}>
            {selectedValues.map(v => (
              <View key={v} style={styles.selectedPill}>
                <Text style={styles.pillText}>{v}</Text>
              </View>
            ))}
            {selectedValues.length === 0 && <Text style={styles.placeholder}>Pick 5 below...</Text>}
          </View>
        </View>

        <View style={styles.grid}>
          {ALL_VALUES.map((value) => {
            const isSelected = selectedValues.includes(value);
            return (
              <TouchableOpacity 
                key={value} 
                onPress={() => toggleValue(value)}
                style={[styles.valueCard, isSelected && styles.valueCardSelected]}
              >
                <Text style={[styles.valueText, isSelected && styles.valueTextSelected]}>
                  {value}
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
  mainContainer: { flex: 1, backgroundColor: '#f0f2f5' },
  scrollContainer: { paddingBottom: 40 },
  heroSection: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  headerTextContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: '900', color: '#C60C30' },
  subtitle: { fontSize: 14, color: '#666', fontStyle: 'italic' },
  topFiveContainer: { padding: 20, backgroundColor: 'white', marginHorizontal: 20, borderRadius: 20, marginBottom: 20 },
  selectionHeader: { fontWeight: 'bold', marginBottom: 10, color: '#333' },
  selectedRow: { flexDirection: 'row', flexWrap: 'wrap' },
  selectedPill: { backgroundColor: '#C60C30', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, margin: 3 },
  pillText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  placeholder: { color: '#aaa', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  valueCard: { backgroundColor: '#fff', width: '48%', padding: 15, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  valueCardSelected: { backgroundColor: '#C60C30' },
  valueText: { fontSize: 14, fontWeight: '600', color: '#444' },
  valueTextSelected: { color: '#fff' },
});
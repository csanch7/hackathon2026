import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions, SafeAreaView, ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');

const VIBE_QUESTIONS = [
  { id: 1, question: "Do you find Tim Robinson funny?", category: "Comedy" },
  { id: 2, question: "Is deep dish actually pizza or just a casserole?", category: "Chicago" },
  { id: 3, question: "Subtitles on or subtitles off?", category: "Vibe" },
  { id: 4, question: "Is a hot dog a sandwich?", category: "Philosophy" },
  { id: 5, question: "Does pineapple belong on pizza?", category: "Controversial" },
];

const COLORS = {
  TERRACOTTA: '#D94133',
  TERRA_DARK: '#8B2B22',
  CHAMPAGNE: '#FDFBF7',
  BONE_DARK: '#C4BDAE',
  MIDNIGHT: '#2C3E50',
  WHITE: '#FFFFFF'
};

export default function SevenVibeCheck() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const heroImg = require('../../assets/images/7even.png');

  const handleAnswer = (ans: boolean) => {
    setAnswers({ ...answers, [VIBE_QUESTIONS[currentIdx].id]: ans });
    if (currentIdx < VIBE_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const progress = ((currentIdx + 1) / VIBE_QUESTIONS.length) * 100;

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground source={heroImg} style={styles.bg}>
        <View style={styles.overlay}>
          
          {/* 1. Header & Progress */}
          <View style={styles.header}>
            <Text style={styles.logo}>7even</Text>
            <Text style={styles.subtitle}>The Vibe Check</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>

          {/* 2. The Question Card */}
          <View style={styles.card}>
            <Text style={styles.category}>{VIBE_QUESTIONS[currentIdx].category}</Text>
            <Text style={styles.questionText}>{VIBE_QUESTIONS[currentIdx].question}</Text>
          </View>

          {/* 3. 3D Mechanical Buttons */}
          <View style={styles.buttonRow}>
            {['YES', 'NO'].map((label) => (
              <View key={label} style={styles.keyContainer}>
                <View style={[styles.keyShadow, label === 'YES' ? styles.shadowYes : styles.shadowNo]} />
                <Pressable
                  onPress={() => handleAnswer(label === 'YES')}
                  style={({ pressed }) => [
                    styles.keyFace,
                    label === 'YES' ? styles.faceYes : styles.faceNo,
                    { transform: [{ translateY: pressed ? 6 : 0 }] }
                  ]}
                >
                  <Text style={styles.keyText}>{label}</Text>
                </Pressable>
              </View>
            ))}
          </View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.MIDNIGHT },
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(44, 62, 80, 0.7)', padding: 25, justifyContent: 'space-between' },
  
  header: { alignItems: 'center', marginTop: 40 },
  logo: { fontSize: 48, fontWeight: '900', color: '#FFF', letterSpacing: -2 },
  subtitle: { color: COLORS.CHAMPAGNE, textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, fontWeight: '700' },
  progressBar: { height: 6, width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginTop: 20, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.TERRACOTTA },

  card: { backgroundColor: COLORS.CHAMPAGNE, borderRadius: 30, padding: 40, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  category: { color: COLORS.TERRACOTTA, fontWeight: '800', textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, marginBottom: 15 },
  questionText: { fontSize: 28, fontWeight: '900', color: COLORS.MIDNIGHT, textAlign: 'center', lineHeight: 36 },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50 },
  keyContainer: { width: (width - 70) / 2, height: 80 },
  keyShadow: { position: 'absolute', top: 6, left: 0, right: 0, bottom: -6, borderRadius: 20 },
  shadowYes: { backgroundColor: '#1B4D3E' }, // Deep green shadow
  shadowNo: { backgroundColor: COLORS.TERRA_DARK }, // Deep red shadow
  
  keyFace: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  faceYes: { backgroundColor: '#2D5A27', borderColor: '#1B4D3E' },
  faceNo: { backgroundColor: COLORS.TERRACOTTA, borderColor: COLORS.TERRA_DARK },
  
  keyText: { fontSize: 20, fontWeight: '900', color: '#FFF', letterSpacing: 1 }
});
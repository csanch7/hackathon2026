import React from 'react';
import { StyleSheet, View, Text, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router'; 
import * as Haptics from 'expo-haptics';

const COLORS = {
  TERRACOTTA: '#D94133',
  MIDNIGHT: '#2C3E50',
  WHITE: '#FFFFFF',
  CHAMPAGNE: '#FDFBF7'
};

export default function Core7Screen() {
  const router = useRouter();
  // FIXED PATH: Go up two levels to reach the root assets folder
  const heroImg = require('../../assets/images/7even.png'); 

  const handleNav = (path: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(path);
  };

  return (
    <ImageBackground source={heroImg} style={styles.bg}>
      <View style={styles.overlay}>
        <Text style={styles.logo}>7even</Text>
        <Text style={styles.tagline}>THE SCHOLASTIC DATE ENGINE</Text>

        <View style={styles.buttonContainer}>
          <Pressable 
            onPress={() => handleNav('/register')}
            style={({ pressed }) => [
              styles.plinth, 
              { backgroundColor: COLORS.TERRACOTTA, transform: [{ translateY: pressed ? 6 : 0 }] }
            ]}
          >
            <Text style={styles.plinthText}>CREATE ACCOUNT</Text>
          </Pressable>

          <Pressable 
            onPress={() => handleNav('/login')}
            style={({ pressed }) => [
              styles.plinth, 
              { backgroundColor: COLORS.MIDNIGHT, marginTop: 20, transform: [{ translateY: pressed ? 6 : 0 }] }
            ]}
          >
            <Text style={styles.plinthText}>LOG IN</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(44, 62, 80, 0.6)', justifyContent: 'center', alignItems: 'center', padding: 40 },
  logo: { fontSize: 64, fontWeight: '900', color: COLORS.WHITE },
  tagline: { color: COLORS.WHITE, letterSpacing: 4, fontSize: 10, fontWeight: '800', marginBottom: 60 },
  buttonContainer: { width: '100%', position: 'absolute', bottom: 80 },
  plinth: { width: '100%', height: 65, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  plinthText: { color: COLORS.WHITE, fontWeight: '900', letterSpacing: 2 }
});
import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, TextInput, Pressable, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { useRouter } from 'expo-router'; //
import * as Haptics from 'expo-haptics';

const COLORS = {
  CHAMPAGNE: '#FDFBF7',
  MIDNIGHT: '#2C3E50',
  TERRACOTTA: '#D94133',
  BONE_DARK: '#C4BDAE',
  WHITE: '#FFFFFF'
};

export default function RegisterScreen() {
  const router = useRouter();

  const renderInput = (label: string, placeholder: string) => (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputShadow} />
        <TextInput 
          style={styles.input} 
          placeholder={placeholder}
          placeholderTextColor={COLORS.BONE_DARK}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Text style={styles.header}>IDENTITY INITIALIZATION</Text>

        {/* PROFILE PICTURE PLINTH */}
        <Pressable 
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          style={styles.photoPlinth}
        >
          <View style={styles.inputShadow} />
          <View style={styles.photoFace}>
            <Text style={styles.photoText}>UPLOAD PHOTO</Text>
          </View>
        </Pressable>

        {/* IDENTITY FIELDS */}
        {renderInput("LEGAL NAME", "Kevin Veloso")}
        {renderInput("UNIVERSITY EMAIL", "kveloso@depaul.edu")}
        {renderInput("AGE", "32")}
        {renderInput("GENDER", "Non-binary / Male / Female")}
        {renderInput("PRONOUNS", "They / Them")}
        {renderInput("SEXUALITY", "Queer / Straight / Gay")}

        {/* SUBMIT BUTTON */}
        <View style={styles.submitWrapper}>
          <View style={styles.btnShadow} />
          <Pressable 
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              router.push('/vibe'); // Proceed to the Vibe Check
            }}
            style={({ pressed }) => [
              styles.btnFace, 
              { transform: [{ translateY: pressed ? 6 : 0 }] }
            ]}
          >
            <Text style={styles.btnText}>CONFIRM IDENTITY</Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.CHAMPAGNE },
  scroll: { padding: 30, paddingBottom: 60 },
  header: { fontSize: 12, fontWeight: '900', color: COLORS.TERRACOTTA, letterSpacing: 3, textAlign: 'center', marginBottom: 40 },
  
  fieldWrapper: { marginBottom: 25 },
  label: { fontSize: 9, fontWeight: '900', color: COLORS.MIDNIGHT, letterSpacing: 1.5, marginBottom: 8 },
  
  // 3D Input Physics
  inputContainer: { width: '100%', height: 55 },
  inputShadow: { position: 'absolute', top: 4, left: 0, right: 0, bottom: -4, backgroundColor: COLORS.BONE_DARK, borderRadius: 12 },
  input: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.WHITE, borderRadius: 12, paddingHorizontal: 15, fontWeight: '700', color: COLORS.MIDNIGHT, borderWidth: 1, borderColor: '#EEE' },
  
  // Photo Plinth
  photoPlinth: { width: 120, height: 120, alignSelf: 'center', marginBottom: 40 },
  photoFace: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.WHITE, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  photoText: { fontSize: 10, fontWeight: '900', color: COLORS.BONE_DARK, textAlign: 'center' },

  // Submit Button
  submitWrapper: { width: '100%', height: 65, marginTop: 20 },
  btnShadow: { position: 'absolute', top: 6, left: 0, right: 0, bottom: -6, backgroundColor: COLORS.TERRA_DARK, borderRadius: 15 },
  btnFace: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.TERRACOTTA, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '900', letterSpacing: 2 }
});
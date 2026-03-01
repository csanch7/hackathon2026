import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// Full "Final Boss" Scholastic Palette
const COLORS = {
  TERRACOTTA: '#D94133',
  TERRA_DARK: '#8B2B22',
  CHAMPAGNE: '#FDFBF7',
  BONE: '#E8E2D5',
  BONE_DARK: '#C4BDAE', 
  MIDNIGHT: '#2C3E50',
  WHITE: '#FFFFFF',
  UIC_BLUE: '#001E62' // Add factually accurate school colors
};

const { width } = Dimensions.get('window');
// Calculate height based on the asset aspect ratio (approx 16:9)
const HERO_IMAGE_HEIGHT = (width - 40) * (9 / 16); 

const CAMPUS_PARTNERS = [
  { id: 'dp', name: 'DePaul', color: COLORS.TERRACOTTA }, // Factor 1: DePaul fact-check
  { id: 'uic', name: 'UIC', color: COLORS.UIC_BLUE },      // Factor 2: UIC fact-check
  { id: 'ru', name: 'Roosevelt', color: '#1A5A27' },       // Factor 3: Roosevelt green
  { id: 'ccc', name: 'Columbia', color: COLORS.MIDNIGHT }, // Factor 4: Columbia
  { id: 'hwc', name: 'H. Washington', color: '#6A2A6F' }   // Factor 5: Harold Washington
];

export default function WelcomeCampusLobby() {
  const router = useRouter();
  // Verified path: assets/images/7even.png
  const heroImg = require('../../assets/images/7even.png');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* 1. Hero Image Header: NO MORE ZOOM */}
        <View style={styles.heroWrapper}>
          <Image 
            source={heroImg} 
            style={styles.hero} 
            resizeMode="contain" // The crucial fix
          />
          {/* Subtle 3D plinth shadow beneath the image container */}
          <View style={styles.imageShadowPlinth} />
        </View>

        {/* 2. Branding Section */}
        <View style={styles.brandContainer}>
          <Text style={styles.logo}>7even</Text>
          <Text style={styles.tagline}>SCHOLASTIC CONNECTION IN THE CHICAGO LOOP</Text>
        </View>

        {/* 3. The 3D Campus Partners Grid */}
        <View style={styles.campusContainer}>
          <Text style={styles.campusHeader}>CONNECTING STUDENTS FROM:</Text>
          <View style={styles.campusGrid}>
            {CAMPUS_PARTNERS.map((school) => (
              <View key={school.id} style={styles.campusPill}>
                <View style={[styles.campusIcon, { borderColor: school.color }]}>
                  {/* Stylized factually accurate vector initials (not logos) */}
                  <Text style={[styles.campusInitial, { color: school.color }]}>
                    {school.id.toUpperCase()}
                  </Text>
                </View>
                <Text numberOfLines={1} style={styles.campusName}>{school.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 4. Main 3D Mechanical "Enter" Button */}
        <View style={styles.buttonContainer}>
          <View style={styles.keyShadow} />
          <Pressable 
            onPress={() => router.push('/values')}
            style={({ pressed }) => [
              styles.keyFace,
              { transform: [{ translateY: pressed ? 6 : 0 }] }
            ]}
          >
            <Text style={styles.buttonText}>START JOURNEY</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>DEPAUL • UIC • ROOSEVELT • COLUMBIA • H. WASHINGTON</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.MIDNIGHT },
  scroll: { backgroundColor: COLORS.CHAMPAGNE, paddingHorizontal: 20, paddingBottom: 60 },
  
  // Hero Image (Non-Zoomed)
  heroWrapper: { marginVertical: 40, width: '100%', height: HERO_IMAGE_HEIGHT, alignItems: 'center' },
  hero: { width: '100%', height: '100%', borderRadius: 20 },
  imageShadowPlinth: { position: 'absolute', bottom: -6, left: 10, right: 10, height: 10, backgroundColor: COLORS.BONE_DARK, borderRadius: 100, opacity: 0.6 },

  // Branding
  brandContainer: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 88, fontWeight: '900', color: COLORS.MIDNIGHT, letterSpacing: -5 },
  tagline: { fontSize: 9, color: COLORS.MIDNIGHT, fontWeight: '700', letterSpacing: 2.5, marginTop: -10, opacity: 0.8 },
  
  // Campus Partners Section
  campusContainer: { alignItems: 'center', marginBottom: 40 },
  campusHeader: { fontSize: 10, fontWeight: '800', color: COLORS.MIDNIGHT, letterSpacing: 1.5, marginBottom: 15 },
  campusGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  campusPill: { alignItems: 'center', marginHorizontal: 10, marginVertical: 8, width: (width - 100) / 3 },
  campusIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.WHITE, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', marginBottom: 6, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  campusInitial: { fontSize: 16, fontWeight: '900', letterSpacing: -1 },
  campusName: { fontSize: 10, fontWeight: '700', color: COLORS.MIDNIGHT, textTransform: 'uppercase' },

  // 3D Button Stack
  buttonContainer: { width: 280, height: 70, alignSelf: 'center', marginBottom: 40 },
  keyShadow: { position: 'absolute', top: 6, left: 0, right: 0, bottom: -6, backgroundColor: COLORS.TERRA_DARK, borderRadius: 15 },
  keyFace: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.TERRACOTTA, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.TERRA_DARK },
  buttonText: { color: COLORS.WHITE, fontWeight: '900', letterSpacing: 2, fontSize: 18 },

  footer: { color: COLORS.MIDNIGHT, fontSize: 8, fontWeight: '800', opacity: 0.5, letterSpacing: 2, textAlign: 'center' }
});
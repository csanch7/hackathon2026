import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable, SafeAreaView } from 'react-native';
// Ensure these three hooks are imported
import { useLocalSearchParams, useRouter } from 'expo-router'; 
import * as Haptics from 'expo-haptics';
import { DATE_MANIFESTOS } from './data/DateManifestos'; //

const COLORS = {
  TERRACOTTA: '#D94133',
  CHAMPAGNE: '#FDFBF7',
  MIDNIGHT: '#2C3E50',
  BONE_DARK: '#C4BDAE',
  WHITE: '#FFFFFF'
};

export default function ManifestoScreeen() {
  // THE MISSING LINK: Initialize the router here
  const router = useRouter(); 
  const { locationId } = useLocalSearchParams();
  
  // Find the correct data or default to the first one
  const manifesto = DATE_MANIFESTOS.find(d => d.id === locationId) || DATE_MANIFESTOS[0];
  const [displayedFact, setDisplayedFact] = useState("");
  const heroImg = require('../../assets/images/7even.png');

  useEffect(() => {
    let i = 0;
    setDisplayedFact("");
    const timer = setInterval(() => {
      setDisplayedFact(manifesto.fact.slice(0, i));
      i++;
      if (i > manifesto.fact.length) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [locationId]);

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back(); // Now this will work!
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.mainContainer}>
        
        {/* Top: Image & Title */}
        <View style={styles.topSection}>
          <Text style={styles.header}>DATE MANIFESTO: {manifesto.name.toUpperCase()}</Text>
          <View style={styles.plinthLarge}>
            <View style={styles.shadow} />
            <View style={styles.face}>
              <Image source={heroImg} style={styles.img} resizeMode="cover" />
            </View>
          </View>
        </View>

        {/* Center: Scholastic Fact */}
        <View style={styles.centerSection}>
          <View style={styles.plinthFact}>
            <View style={styles.shadow} />
            <View style={styles.facePadding}>
              <Text style={styles.label}>GET TO KNOW YOUR CITY</Text>
              <Text style={styles.factText}>{displayedFact}<Text style={styles.cursor}>_</Text></Text>
            </View>
          </View>
        </View>

        {/* Bottom: Action Buttons */}
        <View style={styles.bottomSection}>
          <Pressable onPress={handleBack} style={styles.btnRow}>
            <View style={styles.btnShadow} />
            <View style={styles.btnFace}>
              <Text style={styles.btnText}>BACK TO DECK</Text>
            </View>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.CHAMPAGNE },
  mainContainer: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 25, paddingBottom: 30 },
  topSection: { marginTop: 20 },
  centerSection: { justifyContent: 'center' },
  bottomSection: { marginBottom: 10 },
  header: { fontSize: 10, fontWeight: '900', color: COLORS.TERRACOTTA, letterSpacing: 3, marginBottom: 15, textAlign: 'center' },
  plinthLarge: { width: '100%', height: 200 },
  plinthFact: { width: '100%', height: 180 },
  shadow: { position: 'absolute', top: 5, left: 0, right: 0, bottom: -5, backgroundColor: COLORS.BONE_DARK, borderRadius: 20 },
  face: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.WHITE, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#EEE' },
  facePadding: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.WHITE, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#EEE' },
  img: { width: '100%', height: '100%' },
  label: { fontSize: 9, fontWeight: '900', color: COLORS.TERRACOTTA, letterSpacing: 2, marginBottom: 8 },
  factText: { fontSize: 14, color: COLORS.MIDNIGHT, lineHeight: 20, fontWeight: '600', fontFamily: 'Courier' },
  cursor: { color: COLORS.TERRACOTTA, fontWeight: '900' },
  btnRow: { width: '100%', height: 55 },
  btnShadow: { position: 'absolute', top: 4, left: 0, right: 0, bottom: -4, backgroundColor: COLORS.MIDNIGHT, borderRadius: 12 },
  btnFace: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.TERRACOTTA, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: COLORS.WHITE, fontWeight: '900', letterSpacing: 1.5, fontSize: 13 }
});
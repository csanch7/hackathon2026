import React from 'react';
import { StyleSheet, View, Text, Pressable, SafeAreaView, Image } from 'react-native';

const COLORS = {
  TERRACOTTA: '#D94133',
  TERRA_DARK: '#8B2B22',
  CHAMPAGNE: '#FDFBF7',
  MIDNIGHT: '#2C3E50',
  WHITE: '#FFFFFF',
  BONE_DARK: '#C4BDAE'
};

export default function MatchHomeScreen() {
  // Mock match data based on your "Match Found" sketch
  const matchFound = true; 

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        
        {/* 1. 3D Match Timer */}
        <View style={styles.timerSection}>
          <Text style={styles.logoSmall}>7even</Text>
          <View style={styles.timerShadow} />
          <View style={styles.timerFace}>
            <Text style={styles.timerValue}>7</Text>
            <Text style={styles.timerUnit}>DAYS LEFT</Text>
          </View>
        </View>

        {/* 2. Match Found Section */}
        <View style={styles.matchContent}>
          {matchFound ? (
            <View style={styles.matchCardContainer}>
              <View style={styles.cardShadow} />
              <View style={styles.cardFace}>
                <Text style={styles.matchHeader}>MATCHED WITH ALEX</Text>
                <View style={styles.matchDetails}>
                  <View style={styles.pfpPlaceholder}>
                    <Text style={styles.pfpText}>PFP</Text>
                  </View>
                  <View style={styles.dateIdeaBox}>
                    <Text style={styles.dateLabel}>DATE IDEA:</Text>
                    <Text style={styles.dateValue}>The Green Mill 🎷</Text>
                  </View>
                </View>
                <Pressable style={styles.messageBtn}>
                  <Text style={styles.messageBtnText}>SAY HELLO</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <Text style={styles.waitingText}>Finding your scholastic match...</Text>
          )}
        </View>

        {/* 3. Sketch-Based Bottom Navigation */}
        <View style={styles.bottomNav}>
          <Pressable style={[styles.navItem, styles.navItemActive]}>
            <Text style={styles.navTextActive}>HOME</Text>
          </Pressable>
          <View style={styles.navDivider} />
          <Pressable style={styles.navItem}>
            <Text style={styles.navText}>MESSAGES</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.MIDNIGHT },
  container: { flex: 1, backgroundColor: COLORS.CHAMPAGNE, justifyContent: 'space-between' },
  
  logoSmall: { fontSize: 32, fontWeight: '900', color: COLORS.MIDNIGHT, textAlign: 'center', marginTop: 20, letterSpacing: -2 },
  
  // 3D Timer
  timerSection: { alignItems: 'center', marginTop: 20 },
  timerShadow: { position: 'absolute', top: 75, width: 180, height: 180, borderRadius: 90, backgroundColor: COLORS.BONE_DARK },
  timerFace: { 
    width: 180, height: 180, borderRadius: 90, 
    backgroundColor: COLORS.WHITE, borderWidth: 2, borderColor: '#EEE',
    justifyContent: 'center', alignItems: 'center', marginTop: 10
  },
  timerValue: { fontSize: 72, fontWeight: '900', color: COLORS.TERRACOTTA, lineHeight: 72 },
  timerUnit: { fontSize: 12, fontWeight: '800', color: COLORS.MIDNIGHT, letterSpacing: 2 },

  // Match Card
  matchContent: { flex: 1, padding: 25, justifyContent: 'center' },
  matchCardContainer: { height: 260 },
  cardShadow: { position: 'absolute', top: 8, left: 0, right: 0, bottom: -8, backgroundColor: COLORS.TERRA_DARK, borderRadius: 25 },
  cardFace: { flex: 1, backgroundColor: COLORS.WHITE, borderRadius: 25, padding: 20, borderWidth: 1, borderColor: COLORS.TERRA_DARK },
  matchHeader: { fontSize: 14, fontWeight: '900', color: COLORS.MIDNIGHT, textAlign: 'center', marginBottom: 20 },
  matchDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20 },
  pfpPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.BONE_DARK, justifyContent: 'center', alignItems: 'center' },
  pfpText: { fontWeight: '800', color: COLORS.MIDNIGHT },
  dateIdeaBox: { width: 140, padding: 10, backgroundColor: COLORS.CHAMPAGNE, borderRadius: 12, borderWidth: 1, borderColor: '#DDD' },
  dateLabel: { fontSize: 10, fontWeight: '800', color: COLORS.TERRACOTTA },
  dateValue: { fontSize: 12, fontWeight: '700', color: COLORS.MIDNIGHT },
  
  messageBtn: { backgroundColor: COLORS.MIDNIGHT, padding: 15, borderRadius: 12, alignItems: 'center' },
  messageBtnText: { color: COLORS.WHITE, fontWeight: '900', letterSpacing: 1 },

  waitingText: { textAlign: 'center', color: COLORS.BONE_DARK, fontWeight: '700', fontSize: 16 },

  // Bottom Navigation
  bottomNav: { flexDirection: 'row', height: 80, borderTopWidth: 2, borderColor: COLORS.MIDNIGHT, backgroundColor: COLORS.WHITE },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navItemActive: { backgroundColor: COLORS.CHAMPAGNE },
  navText: { fontWeight: '700', color: COLORS.BONE_DARK },
  navTextActive: { fontWeight: '900', color: COLORS.MIDNIGHT },
  navDivider: { width: 2, backgroundColor: COLORS.MIDNIGHT }
});
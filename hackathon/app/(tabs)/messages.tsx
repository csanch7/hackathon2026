import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';

const COLORS = {
  TERRACOTTA: '#D94133',
  CHAMPAGNE: '#FDFBF7',
  MIDNIGHT: '#2C3E50',
  BONE: '#E8E2D5',
  BONE_DARK: '#C4BDAE',
  WHITE: '#FFFFFF'
};

const MOCK_MESSAGES = [
  { id: 1, name: 'Alex', lastMsg: 'The Green Mill tonight? 🎷', time: '2m ago', active: true },
  { id: 2, name: 'Jordan', lastMsg: 'I actually think deep dish is a casserole...', time: '1h ago', active: false },
  { id: 3, name: 'Casey', lastMsg: 'Did you finish the Core 7 quiz?', time: '3h ago', active: false },
];

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>7even</Text>
          <Text style={styles.title}>CONVERSATIONS</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {MOCK_MESSAGES.map((msg) => (
            <View key={msg.id} style={styles.msgContainer}>
              {/* 3D Stacked Layer */}
              <View style={styles.msgShadow} />
              <Pressable 
                style={({ pressed }) => [
                  styles.msgFace,
                  { transform: [{ translateY: pressed ? 4 : 0 }] }
                ]}
              >
                <View style={styles.pfpContainer}>
                  <View style={styles.pfpCircle}>
                    <Text style={styles.pfpText}>{msg.name[0]}</Text>
                  </View>
                  {msg.active && <View style={styles.activeDot} />}
                </View>

                <View style={styles.msgInfo}>
                  <View style={styles.msgHeaderRow}>
                    <Text style={styles.nameText}>{msg.name}</Text>
                    <Text style={styles.timeText}>{msg.time}</Text>
                  </View>
                  <Text numberOfLines={1} style={styles.previewText}>{msg.lastMsg}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Nav Mirror (from your sketch) */}
        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem}>
            <Text style={styles.navText}>HOME</Text>
          </Pressable>
          <View style={styles.navDivider} />
          <Pressable style={[styles.navItem, styles.navItemActive]}>
            <Text style={styles.navTextActive}>MESSAGES</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.MIDNIGHT },
  container: { flex: 1, backgroundColor: COLORS.CHAMPAGNE },
  header: { padding: 30, alignItems: 'center', backgroundColor: COLORS.WHITE, borderBottomWidth: 1, borderColor: '#EEE' },
  logo: { fontSize: 32, fontWeight: '900', color: COLORS.MIDNIGHT, letterSpacing: -2 },
  title: { fontSize: 10, fontWeight: '800', color: COLORS.TERRACOTTA, letterSpacing: 2 },

  scroll: { padding: 20 },
  msgContainer: { height: 90, marginBottom: 20 },
  msgShadow: { position: 'absolute', top: 5, left: 0, right: 0, bottom: -5, backgroundColor: COLORS.BONE_DARK, borderRadius: 15 },
  msgFace: { 
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: COLORS.WHITE, borderRadius: 15, flexDirection: 'row', 
    alignItems: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: '#DDD' 
  },

  pfpContainer: { marginRight: 15 },
  pfpCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.CHAMPAGNE, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.BONE },
  pfpText: { fontWeight: '900', color: COLORS.MIDNIGHT },
  activeDot: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#4CAF50', borderWidth: 2, borderColor: '#FFF' },

  msgInfo: { flex: 1 },
  msgHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  nameText: { fontSize: 16, fontWeight: '900', color: COLORS.MIDNIGHT },
  timeText: { fontSize: 10, color: '#AAA', fontWeight: '700' },
  previewText: { fontSize: 13, color: '#666', fontWeight: '500' },

  bottomNav: { flexDirection: 'row', height: 80, borderTopWidth: 2, borderColor: COLORS.MIDNIGHT, backgroundColor: COLORS.WHITE },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navItemActive: { backgroundColor: COLORS.CHAMPAGNE },
  navText: { fontWeight: '700', color: COLORS.BONE_DARK },
  navTextActive: { fontWeight: '900', color: COLORS.MIDNIGHT },
  navDivider: { width: 2, backgroundColor: COLORS.MIDNIGHT }
});
import React, { useRef } from 'react';
import { 
  StyleSheet, View, Text, Animated, 
  Dimensions, Pressable, SafeAreaView, ImageBackground 
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;
const SPACING = 10;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const CHICAGO_DATES = [
  { id: 'empty-left', title: '', icon: '' }, // Spacers for centering
  { id: '1', title: 'The Green Mill', desc: 'Jazz & Prohibition Vibes', icon: '🎷' },
  { id: '2', title: 'Architecture Tour', desc: 'Skyline views from the river', icon: '🚤' },
  { id: '3', title: 'Conservatory', desc: 'Tropical escape in the city', icon: '🌿' },
  { id: '4', title: 'The Second City', desc: 'A night of classic improv', icon: '🎭' },
  { id: '5', title: 'Pequods Pizza', desc: 'The caramelized crust ritual', icon: '🍕' },
  { id: 'empty-right', title: '', icon: '' },
];

const COLORS = {
  TERRACOTTA: '#D94133',
  TERRA_DARK: '#8B2B22',
  CHAMPAGNE: '#FDFBF7',
  MIDNIGHT: '#2C3E50',
  WHITE: '#FFFFFF'
};

export default function ChicagoDateDeck() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const heroImg = require('../../assets/images/7even.png');

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground source={heroImg} style={styles.bg}>
        <View style={styles.overlay}>
          
          <View style={styles.header}>
            <Text style={styles.logo}>7even</Text>
            <Text style={styles.tagline}>CHOSEN FOR CHICAGO</Text>
          </View>

          <Animated.FlatList
            data={CHICAGO_DATES}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            snapToInterval={ITEM_SIZE}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
              if (!item.title) return <View style={{ width: EMPTY_ITEM_SIZE }} />;

              // COVER FLOW MATH
              const inputRange = [
                (index - 2) * ITEM_SIZE,
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.2, 0.8],
                extrapolate: 'clamp',
              });

              const rotateY = scrollX.interpolate({
                inputRange,
                outputRange: ['45deg', '0deg', '-45deg'],
                extrapolate: 'clamp',
              });

              return (
                <View style={{ width: ITEM_SIZE }}>
                  <Animated.View style={[
                    styles.card, 
                    { transform: [{ perspective: 1000 }, { scale }, { rotateY }] }
                  ]}>
                    <Text style={styles.cardIcon}>{item.icon}</Text>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDesc}>{item.desc}</Text>
                  </Animated.View>
                </View>
              );
            }}
          />

          <View style={styles.footer}>
            <View style={styles.plinthShadow} />
            <Pressable 
              style={({ pressed }) => [
                styles.plinthFace,
                { transform: [{ translateY: pressed ? 6 : 0 }] }
              ]}
            >
              <Text style={styles.plinthText}>LOCK IN THIS DATE</Text>
            </Pressable>
          </View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.MIDNIGHT },
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(44, 62, 80, 0.7)', paddingVertical: 40 },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { fontSize: 42, fontWeight: '900', color: '#FFF' },
  tagline: { fontSize: 10, color: '#FFF', fontWeight: '800', letterSpacing: 2 },
  
  flatListContent: { alignItems: 'center' },
  
  card: {
    backgroundColor: COLORS.CHAMPAGNE,
    height: 380,
    marginHorizontal: SPACING,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
    borderWidth: 1,
    borderColor: '#FFF'
  },
  cardIcon: { fontSize: 80, marginBottom: 20 },
  cardTitle: { fontSize: 24, fontWeight: '900', color: COLORS.MIDNIGHT, textAlign: 'center' },
  cardDesc: { fontSize: 14, color: COLORS.TERRACOTTA, fontWeight: '700', marginTop: 10, textAlign: 'center' },

  footer: { paddingHorizontal: 40, marginBottom: 40, height: 70 },
  plinthShadow: { position: 'absolute', top: 6, left: 40, right: 40, bottom: -6, backgroundColor: COLORS.TERRA_DARK, borderRadius: 15 },
  plinthFace: { position: 'absolute', top: 0, left: 40, right: 40, bottom: 0, backgroundColor: COLORS.TERRACOTTA, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.TERRA_DARK },
  plinthText: { color: '#FFF', fontWeight: '900', letterSpacing: 1.5 }
});
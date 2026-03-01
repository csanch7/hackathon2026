import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // Built into Expo

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#D94133', // Our Terracotta
      tabBarStyle: { backgroundColor: '#FDFBF7' } // Our Champagne
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Core 7',
          tabBarIcon: ({ color }) => <FontAwesome name="heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="vibe"
        options={{
          title: 'Vibe Check',
          tabBarIcon: ({ color }) => <FontAwesome name="bolt" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
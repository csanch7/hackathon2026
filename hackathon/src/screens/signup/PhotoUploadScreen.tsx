import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

import { SignupLayout } from '@/src/components/SignupLayout';
import { useSignup } from '@/src/context/SignupContext';

export function PhotoUploadScreen({ progress, onNext }: { progress: number; onNext: () => void }) {
  const { setField, draft } = useSignup();
  const [selected, setSelected] = useState(Boolean(draft.photo_url));

  return (
    <SignupLayout
      title="Add your profile photo"
      subtitle="One clear photo helps your match say yes to meeting up."
      progress={progress}
      disabled={!selected}
      onNext={onNext}>
      <View style={styles.centered}>
        <Pressable
          style={styles.placeholder}
          onPress={async () => {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              quality: 0.8,
            });

            if (result.canceled || !result.assets[0]) {
              return;
            }

            const uri = result.assets[0].uri;
            setSelected(true);
            setField('photo_url', uri);
          }}>
          {selected && draft.photo_url ? (
            <Image source={{ uri: draft.photo_url }} style={styles.preview} contentFit="cover" />
          ) : (
            <Text style={styles.plus}>+</Text>
          )}
        </Pressable>
        <Text style={styles.caption}>Tap to choose from camera roll</Text>
      </View>
    </SignupLayout>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
  },
  placeholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#6f3fd6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f0ff',
  },
  plus: {
    fontSize: 44,
    color: '#6f3fd6',
  },
  preview: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  caption: {
    marginTop: 12,
    color: '#4c5c52',
  },
});

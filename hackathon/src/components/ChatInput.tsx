import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export function ChatInput({
  onSend,
  disabled,
  placeholder,
  initialValue,
}: {
  onSend: (text: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
  initialValue?: string;
}) {
  const [text, setText] = useState(initialValue ?? '');

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        editable={!disabled}
        onChangeText={setText}
        placeholder={placeholder ?? 'Type a message'}
        style={styles.input}
      />
      <Pressable
        style={[styles.button, (disabled || text.trim().length === 0) && styles.buttonDisabled]}
        disabled={disabled || text.trim().length === 0}
        onPress={async () => {
          const next = text.trim();
          await onSend(next);
          setText('');
        }}>
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f3f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#112018',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

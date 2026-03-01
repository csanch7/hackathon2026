import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { SignupLayout } from '@/src/components/SignupLayout';
import { SignupDraft, useSignup } from '@/src/context/SignupContext';

type Option = { label: string; value: string };

type Props = {
  field: keyof SignupDraft;
  title: string;
  subtitle?: string;
  progress: number;
  nextLabel?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  options?: Option[];
  multiline?: boolean;
  onNext: () => void;
};

export function StepInputScreen({
  field,
  title,
  subtitle,
  progress,
  nextLabel,
  secureTextEntry,
  keyboardType,
  options,
  multiline,
  onNext,
}: Props) {
  const { draft, setField } = useSignup();
  const [localOther, setLocalOther] = useState('');

  const value = String(draft[field] ?? '');

  const content = options ? (
    <View style={styles.optionsWrap}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable
            key={option.value}
            style={[styles.option, selected && styles.optionActive]}
            onPress={() => setField(field, option.value)}>
            <Text style={selected ? styles.optionTextActive : styles.optionText}>{option.label}</Text>
          </Pressable>
        );
      })}
      {value === 'Other' ? (
        <TextInput
          style={styles.input}
          value={localOther}
          placeholder="Type your answer"
          onChangeText={(next) => {
            setLocalOther(next);
            setField(field, next);
          }}
        />
      ) : null}
    </View>
  ) : (
    <TextInput
      value={value}
      onChangeText={(next) => setField(field, next)}
      style={[styles.input, multiline && styles.textarea]}
      autoCapitalize="none"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  );

  return (
    <SignupLayout
      title={title}
      subtitle={subtitle}
      progress={progress}
      nextLabel={nextLabel}
      disabled={value.trim().length === 0}
      onNext={onNext}>
      {content}
    </SignupLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d2d9d2',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  textarea: {
    minHeight: 140,
    textAlignVertical: 'top',
  },
  optionsWrap: {
    gap: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: '#d2d9d2',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionActive: {
    borderColor: '#112018',
    backgroundColor: '#eaf0ea',
  },
  optionText: {
    color: '#24372b',
    fontSize: 15,
  },
  optionTextActive: {
    color: '#112018',
    fontWeight: '700',
    fontSize: 15,
  },
});

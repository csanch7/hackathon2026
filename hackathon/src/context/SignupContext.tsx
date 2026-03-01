import { createContext, useContext, useMemo, useState } from 'react';

export type SignupDraft = {
  email: string;
  password: string;
  photo_url?: string;
  first_name: string;
  school: string;
  major: string;
  year: string;
  age: string;
  gender: string;
  pronouns: string;
  looking_for: string;
};

const defaultDraft: SignupDraft = {
  email: '',
  password: '',
  photo_url: '',
  first_name: '',
  school: '',
  major: '',
  year: '',
  age: '',
  gender: '',
  pronouns: '',
  looking_for: '',
};

type SignupContextValue = {
  draft: SignupDraft;
  setField: (field: keyof SignupDraft, value: string) => void;
  reset: () => void;
};

const SignupContext = createContext<SignupContextValue | undefined>(undefined);

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<SignupDraft>(defaultDraft);

  const value = useMemo<SignupContextValue>(
    () => ({
      draft,
      setField: (field, value) => setDraft((prev) => ({ ...prev, [field]: value })),
      reset: () => setDraft(defaultDraft),
    }),
    [draft],
  );

  return <SignupContext.Provider value={value}>{children}</SignupContext.Provider>;
}

export function useSignup() {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignup must be used inside SignupProvider');
  }
  return context;
}

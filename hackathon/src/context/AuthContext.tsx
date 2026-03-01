import { useAuth as useClerkAuth } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { createContext, useContext, useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export type Profile = {
  _id: Id<"profiles">;
  clerkId: string;
  email: string;
  firstName: string;
  photoStorageId?: Id<"_storage">;
  school: string;
  major?: string;
  year?: string;
  age: number;
  gender: string;
  pronouns?: string;
  lookingFor: string;
  quizCompleted: boolean;
};

type AuthContextValue = {
  isSignedIn: boolean;
  isLoaded: boolean;
  profile: Profile | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded, signOut } = useClerkAuth();
  const profileData = useQuery(api.profiles.getByClerkId);

  const profile = useMemo<Profile | null>(() => {
    if (!profileData) return null;
    return profileData as Profile;
  }, [profileData]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isSignedIn: isSignedIn ?? false,
      isLoaded: isLoaded && (profileData !== undefined || !isSignedIn),
      profile,
      signOut: async () => {
        await signOut();
      },
    }),
    [isSignedIn, isLoaded, profileData, profile, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

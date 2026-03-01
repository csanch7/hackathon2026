import { useSignUp } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { Alert } from "react-native";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useSignup } from "@/src/context/SignupContext";
import { StepInputScreen } from "@/src/screens/signup/StepInputScreen";
import { LOOKING_FOR_OPTIONS } from "@/src/utils/constants";

export function PreferenceScreen({ progress, onDone }: { progress: number; onDone: () => void }) {
  const { draft } = useSignup();
  const { signUp, setActive } = useSignUp();
  const createProfile = useMutation(api.profiles.create);
  const generateUploadUrl = useMutation(api.profiles.generateUploadUrl);
  const updatePhoto = useMutation(api.profiles.updatePhoto);

  return (
    <StepInputScreen
      field="looking_for"
      title="Who are you looking to date?"
      progress={progress}
      options={LOOKING_FOR_OPTIONS.map((option) => ({ label: option, value: option }))}
      nextLabel="Create account"
      onNext={async () => {
        try {
          if (!signUp) throw new Error("Sign up not available");

          // Create Clerk user
          const result = await signUp.create({
            emailAddress: draft.email,
            password: draft.password,
          });

          // Activate the session immediately
          if (result.createdSessionId) {
            await setActive({ session: result.createdSessionId });
          }

          // Create Convex profile
          await createProfile({
            email: draft.email,
            firstName: draft.first_name,
            school: draft.school,
            major: draft.major || undefined,
            year: draft.year || undefined,
            age: Number(draft.age),
            gender: draft.gender,
            pronouns: draft.pronouns || undefined,
            lookingFor: draft.looking_for,
          });

          // Upload profile photo if provided
          if (draft.photo_url) {
            try {
              const uploadUrl = await generateUploadUrl();
              const response = await fetch(draft.photo_url);
              const blob = await response.blob();
              const uploadResponse = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": "image/jpeg" },
                body: blob,
              });
              const { storageId } = await uploadResponse.json();
              if (storageId) {
                await updatePhoto({ storageId: storageId as Id<"_storage"> });
              }
            } catch {
              // Photo upload failure is non-fatal
            }
          }

          onDone();
        } catch (error) {
          Alert.alert("Signup failed", (error as Error).message);
        }
      }}
    />
  );
}

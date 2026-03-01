import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function useMessages(matchId: string | null) {
  const messages = useQuery(
    api.messages.getByMatch,
    matchId ? { matchId: matchId as Id<"matches"> } : "skip",
  );
  const sendMutation = useMutation(api.messages.send);

  const send = async (content: string) => {
    if (!matchId) return;
    await sendMutation({ matchId: matchId as Id<"matches">, content });
  };

  return { messages: messages ?? [], loading: messages === undefined, send };
}

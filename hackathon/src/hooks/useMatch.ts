import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

export type MatchResult = NonNullable<ReturnType<typeof useQuery<typeof api.matches.getCurrent>>>;

export function useMatch() {
  const match = useQuery(api.matches.getCurrent);
  return { match: match ?? null, loading: match === undefined };
}

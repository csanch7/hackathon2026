import { PersonalityScores } from "./scoring";

export type MatchCandidate = {
  id: string;
  gender: string;
  lookingFor: string;
  firstName: string;
  school: string;
  scores: PersonalityScores;
};

const SCORE_WEIGHTS: Array<{ key: keyof PersonalityScores; weight: number }> = [
  { key: "openness", weight: 1.2 },
  { key: "conscientiousness", weight: 0.8 },
  { key: "extraversion", weight: 1 },
  { key: "agreeableness", weight: 1.1 },
  { key: "neuroticism", weight: 0.6 },
  { key: "care", weight: 1 },
  { key: "fairness", weight: 1.2 },
  { key: "loyalty", weight: 0.8 },
  { key: "authority", weight: 0.7 },
  { key: "sanctity", weight: 0.7 },
  { key: "liberty", weight: 1 },
];

function preferenceAllows(lookingFor: string, targetGender: string): boolean {
  if (lookingFor === "Everyone") return true;
  if (lookingFor === "Men") return targetGender === "Man";
  if (lookingFor === "Women") return targetGender === "Woman";
  return true;
}

export function compatibilityScore(a: MatchCandidate, b: MatchCandidate): number {
  let weightedDistance = 0;
  let totalWeight = 0;

  for (const trait of SCORE_WEIGHTS) {
    const diff = Math.abs((a.scores[trait.key] ?? 0) - (b.scores[trait.key] ?? 0));
    weightedDistance += diff * trait.weight;
    totalWeight += trait.weight;
  }

  const normalizedDistance = weightedDistance / Math.max(1, totalWeight * 4);
  return Number((1 - normalizedDistance).toFixed(4));
}

export function createWeeklyPairs(candidates: MatchCandidate[]) {
  const pairs: Array<{ user1: MatchCandidate; user2: MatchCandidate; score: number }> = [];
  const available = [...candidates];

  while (available.length > 1) {
    const first = available.shift();
    if (!first) break;

    let bestIndex = -1;
    let bestScore = -1;

    for (let i = 0; i < available.length; i++) {
      const candidate = available[i];
      if (!preferenceAllows(first.lookingFor, candidate.gender)) continue;
      if (!preferenceAllows(candidate.lookingFor, first.gender)) continue;

      const score = compatibilityScore(first, candidate);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }

    if (bestIndex >= 0) {
      const [partner] = available.splice(bestIndex, 1);
      pairs.push({ user1: first, user2: partner, score: bestScore });
    }
  }

  return pairs;
}

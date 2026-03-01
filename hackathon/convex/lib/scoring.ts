export type PersonalityScores = {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  care: number;
  fairness: number;
  loyalty: number;
  authority: number;
  sanctity: number;
  liberty: number;
};

export type QuizQuestionForScoring = {
  _id: string;
  trait?: string;
  type: "likert" | "yes_no" | "open_ended";
};

export type QuizAnswerForScoring = {
  questionId: string;
  answerLikert?: number;
  answerBool?: boolean;
  answerText?: string;
};

function traitAverage(values: number[]) {
  if (values.length === 0) return 0;
  return Number((values.reduce((s, v) => s + v, 0) / values.length).toFixed(2));
}

export function calculateScores(
  questions: QuizQuestionForScoring[],
  answers: QuizAnswerForScoring[],
): PersonalityScores {
  const answersByQuestion = new Map(answers.map((a) => [a.questionId, a]));
  const traitBuckets = new Map<string, number[]>();

  for (const question of questions) {
    const answer = answersByQuestion.get(question._id);
    if (!answer || !question.trait) continue;

    let numeric = 0;
    if (typeof answer.answerLikert === "number") {
      numeric = answer.answerLikert;
    } else if (typeof answer.answerBool === "boolean") {
      numeric = answer.answerBool ? 5 : 1;
    } else {
      continue;
    }

    const bucket = traitBuckets.get(question.trait) ?? [];
    bucket.push(numeric);
    traitBuckets.set(question.trait, bucket);
  }

  return {
    openness: traitAverage(traitBuckets.get("openness") ?? []),
    conscientiousness: traitAverage(traitBuckets.get("conscientiousness") ?? []),
    extraversion: traitAverage(traitBuckets.get("extraversion") ?? []),
    agreeableness: traitAverage(traitBuckets.get("agreeableness") ?? []),
    neuroticism: traitAverage(traitBuckets.get("neuroticism") ?? []),
    care: traitAverage(traitBuckets.get("care") ?? []),
    fairness: traitAverage(traitBuckets.get("fairness") ?? []),
    loyalty: traitAverage(traitBuckets.get("loyalty") ?? []),
    authority: traitAverage(traitBuckets.get("authority") ?? []),
    sanctity: traitAverage(traitBuckets.get("sanctity") ?? []),
    liberty: traitAverage(traitBuckets.get("liberty") ?? []),
  };
}

import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { calculateScores } from "./lib/scoring";

export const getQuestions = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");
    return ctx.db.query("questions").withIndex("by_order").collect();
  },
});

export const submitAnswers = mutation({
  args: {
    answers: v.array(
      v.object({
        questionId: v.id("questions"),
        answerLikert: v.optional(v.number()),
        answerBool: v.optional(v.boolean()),
        answerText: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!profile) throw new ConvexError("Profile not found");

    // Upsert each answer
    for (const answer of args.answers) {
      const existing = await ctx.db
        .query("quizAnswers")
        .withIndex("by_user_question", (q) =>
          q.eq("userId", profile._id).eq("questionId", answer.questionId),
        )
        .unique();

      if (existing) {
        await ctx.db.patch(existing._id, {
          answerLikert: answer.answerLikert,
          answerBool: answer.answerBool,
          answerText: answer.answerText,
        });
      } else {
        await ctx.db.insert("quizAnswers", {
          userId: profile._id,
          questionId: answer.questionId,
          answerLikert: answer.answerLikert,
          answerBool: answer.answerBool,
          answerText: answer.answerText,
        });
      }
    }

    // Calculate and store personality scores
    const questions = await ctx.db.query("questions").collect();
    const scores = calculateScores(
      questions.map((q) => ({ _id: q._id, trait: q.trait, type: q.type })),
      args.answers.map((a) => ({
        questionId: a.questionId,
        answerLikert: a.answerLikert,
        answerBool: a.answerBool,
        answerText: a.answerText,
      })),
    );

    const existingScores = await ctx.db
      .query("personalityScores")
      .withIndex("by_user", (q) => q.eq("userId", profile._id))
      .unique();
    if (existingScores) {
      await ctx.db.patch(existingScores._id, scores);
    } else {
      await ctx.db.insert("personalityScores", { userId: profile._id, ...scores });
    }

    await ctx.db.patch(profile._id, { quizCompleted: true });
  },
});

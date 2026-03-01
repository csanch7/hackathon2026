import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    photoStorageId: v.optional(v.id("_storage")),
    school: v.string(),
    major: v.optional(v.string()),
    year: v.optional(v.string()),
    age: v.number(),
    gender: v.string(),
    pronouns: v.optional(v.string()),
    lookingFor: v.string(),
    quizCompleted: v.boolean(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  questions: defineTable({
    text: v.string(),
    type: v.union(v.literal("likert"), v.literal("yes_no"), v.literal("open_ended")),
    category: v.union(v.literal("big_five"), v.literal("moral"), v.literal("personal")),
    trait: v.optional(v.string()),
    orderNum: v.number(),
  }).index("by_order", ["orderNum"]),

  quizAnswers: defineTable({
    userId: v.id("profiles"),
    questionId: v.id("questions"),
    answerLikert: v.optional(v.number()),
    answerBool: v.optional(v.boolean()),
    answerText: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_question", ["userId", "questionId"]),

  personalityScores: defineTable({
    userId: v.id("profiles"),
    openness: v.number(),
    conscientiousness: v.number(),
    extraversion: v.number(),
    agreeableness: v.number(),
    neuroticism: v.number(),
    care: v.number(),
    fairness: v.number(),
    loyalty: v.number(),
    authority: v.number(),
    sanctity: v.number(),
    liberty: v.number(),
  }).index("by_user", ["userId"]),

  availability: defineTable({
    userId: v.id("profiles"),
    dayOfWeek: v.number(),
    startTime: v.string(),
    endTime: v.string(),
  }).index("by_user", ["userId"]),

  matches: defineTable({
    user1Id: v.id("profiles"),
    user2Id: v.id("profiles"),
    weekOf: v.string(),
    overlapSummary: v.optional(v.string()),
    dateSuggestion: v.optional(
      v.object({
        venueName: v.string(),
        address: v.string(),
        time: v.string(),
        photoUrl: v.optional(v.string()),
      }),
    ),
    messageTemplate: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("expired")),
  })
    .index("by_user1", ["user1Id"])
    .index("by_user2", ["user2Id"])
    .index("by_week", ["weekOf"]),

  messages: defineTable({
    matchId: v.id("matches"),
    senderId: v.id("profiles"),
    content: v.string(),
  }).index("by_match", ["matchId"]),
});

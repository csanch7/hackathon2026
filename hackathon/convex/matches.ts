import { ConvexError, v } from "convex/values";

import { internalAction, internalMutation, internalQuery, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { createWeeklyPairs } from "./lib/matching";
import { currentMatchWindow, weekOfDate } from "./lib/time";

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const { isActive, weekStart } = currentMatchWindow();
    if (!isActive) return null;

    const weekOf = weekStart.format("YYYY-MM-DD");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!profile) return null;

    // Check both user1 and user2 indexes
    let match =
      (await ctx.db
        .query("matches")
        .withIndex("by_user1", (q) => q.eq("user1Id", profile._id))
        .filter((q) =>
          q.and(q.eq(q.field("weekOf"), weekOf), q.eq(q.field("status"), "active")),
        )
        .unique()) ??
      (await ctx.db
        .query("matches")
        .withIndex("by_user2", (q) => q.eq("user2Id", profile._id))
        .filter((q) =>
          q.and(q.eq(q.field("weekOf"), weekOf), q.eq(q.field("status"), "active")),
        )
        .unique());

    if (!match) return null;

    const partnerId = match.user1Id === profile._id ? match.user2Id : match.user1Id;
    const partner = await ctx.db.get(partnerId);
    if (!partner) return null;

    const photoUrl = partner.photoStorageId
      ? await ctx.storage.getUrl(partner.photoStorageId)
      : null;

    return {
      matchId: match._id as string,
      weekOf: match.weekOf,
      status: match.status,
      partnerProfile: {
        id: partner._id as string,
        firstName: partner.firstName,
        school: partner.school,
        year: partner.year,
        photoUrl,
      },
      overlapSummary: match.overlapSummary,
      dateSuggestion: match.dateSuggestion,
      messageTemplate: match.messageTemplate,
    };
  },
});

// Internal helpers used by the generate action

export const _expireActive = internalMutation({
  args: {},
  handler: async (ctx) => {
    const active = await ctx.db
      .query("matches")
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();
    for (const m of active) {
      await ctx.db.patch(m._id, { status: "expired" });
    }
  },
});

export const _getEligibleCandidates = internalQuery({
  args: {},
  handler: async (ctx) => {
    const profiles = await ctx.db
      .query("profiles")
      .filter((q) => q.eq(q.field("quizCompleted"), true))
      .collect();

    const candidates = [];
    for (const profile of profiles) {
      const scores = await ctx.db
        .query("personalityScores")
        .withIndex("by_user", (q) => q.eq("userId", profile._id))
        .unique();
      if (!scores) continue;

      candidates.push({
        id: profile._id as string,
        gender: profile.gender,
        lookingFor: profile.lookingFor,
        firstName: profile.firstName,
        school: profile.school,
        scores: {
          openness: scores.openness,
          conscientiousness: scores.conscientiousness,
          extraversion: scores.extraversion,
          agreeableness: scores.agreeableness,
          neuroticism: scores.neuroticism,
          care: scores.care,
          fairness: scores.fairness,
          loyalty: scores.loyalty,
          authority: scores.authority,
          sanctity: scores.sanctity,
          liberty: scores.liberty,
        },
      });
    }
    return candidates;
  },
});

export const _insertMatch = internalMutation({
  args: {
    user1Id: v.id("profiles"),
    user2Id: v.id("profiles"),
    weekOf: v.string(),
    overlapSummary: v.string(),
    dateSuggestion: v.object({
      venueName: v.string(),
      address: v.string(),
      time: v.string(),
    }),
    messageTemplate: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("matches", {
      user1Id: args.user1Id,
      user2Id: args.user2Id,
      weekOf: args.weekOf,
      overlapSummary: args.overlapSummary,
      dateSuggestion: args.dateSuggestion,
      messageTemplate: args.messageTemplate,
      status: "active",
    });
  },
});

export const generate = internalAction({
  args: {},
  handler: async (ctx) => {
    const weekOf = weekOfDate();

    await ctx.runMutation(internal.matches._expireActive, {});

    const candidates = await ctx.runQuery(internal.matches._getEligibleCandidates, {});
    const pairs = createWeeklyPairs(candidates);

    for (const pair of pairs) {
      const highTraits = ["openness", "fairness", "care"].filter((trait) => {
        const a = pair.user1.scores[trait as keyof typeof pair.user1.scores];
        const b = pair.user2.scores[trait as keyof typeof pair.user2.scores];
        return (a ?? 0) >= 3.5 && (b ?? 0) >= 3.5;
      });

      const overlapSummary =
        highTraits.length === 0
          ? `${pair.user1.firstName} and ${pair.user2.firstName} show complementary personalities with strong room to learn from each other.`
          : `You both scored high in ${highTraits.join(" and ")}, with shared values around curiosity and how you treat others.`;

      const dateSuggestion = {
        venueName: `Neighborhood coffee near ${pair.user1.school}`,
        address: "Chicago, IL",
        time: "Thursday 6:30 PM",
      };

      const messageTemplate = `Hey ${pair.user2.firstName}! The ${dateSuggestion.venueName} idea looks great. Want to do this week?`;

      await ctx.runMutation(internal.matches._insertMatch, {
        user1Id: pair.user1.id as Id<"profiles">,
        user2Id: pair.user2.id as Id<"profiles">,
        weekOf,
        overlapSummary,
        dateSuggestion,
        messageTemplate,
      });
    }
  },
});

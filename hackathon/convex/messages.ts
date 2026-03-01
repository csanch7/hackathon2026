import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

const MAX_MESSAGE_LENGTH = 1000;
const BLOCKED_TERMS = ["slur-placeholder-1", "slur-placeholder-2"];

export const getByMatch = query({
  args: { matchId: v.id("matches") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!profile) throw new ConvexError("Profile not found");

    const match = await ctx.db.get(args.matchId);
    if (!match) throw new ConvexError("Match not found");
    if (match.user1Id !== profile._id && match.user2Id !== profile._id) {
      throw new ConvexError("Forbidden");
    }

    return ctx.db
      .query("messages")
      .withIndex("by_match", (q) => q.eq("matchId", args.matchId))
      .collect();
  },
});

export const send = mutation({
  args: {
    matchId: v.id("matches"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!profile) throw new ConvexError("Profile not found");

    const match = await ctx.db.get(args.matchId);
    if (!match) throw new ConvexError("Match not found");
    if (match.user1Id !== profile._id && match.user2Id !== profile._id) {
      throw new ConvexError("Forbidden");
    }
    if (match.status !== "active") {
      throw new ConvexError("Match chat is read-only");
    }

    if (args.content.length === 0 || args.content.length > MAX_MESSAGE_LENGTH) {
      throw new ConvexError("Invalid message length");
    }

    const lower = args.content.toLowerCase();
    if (BLOCKED_TERMS.some((term) => lower.includes(term))) {
      throw new ConvexError("Message contains blocked content");
    }

    return ctx.db.insert("messages", {
      matchId: args.matchId,
      senderId: profile._id,
      content: args.content,
    });
  },
});

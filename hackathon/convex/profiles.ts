import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

const APPROVED_DOMAINS = ["depaul.edu", "uic.edu", "roosevelt.edu", "colum.edu", "ccc.edu"];

function emailDomain(email: string) {
  return email.split("@")[1]?.toLowerCase() ?? "";
}

export const getByClerkId = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return ctx.db
      .query("profiles")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});

export const create = mutation({
  args: {
    email: v.string(),
    firstName: v.string(),
    school: v.string(),
    major: v.optional(v.string()),
    year: v.optional(v.string()),
    age: v.number(),
    gender: v.string(),
    pronouns: v.optional(v.string()),
    lookingFor: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const domain = emailDomain(args.email);
    if (!APPROVED_DOMAINS.includes(domain)) {
      throw new ConvexError("Email must be an approved .edu domain");
    }

    // Return existing profile if already created (idempotent)
    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (existing) return existing._id;

    return ctx.db.insert("profiles", {
      clerkId: identity.subject,
      email: args.email,
      firstName: args.firstName,
      school: args.school,
      major: args.major,
      year: args.year,
      age: args.age,
      gender: args.gender,
      pronouns: args.pronouns,
      lookingFor: args.lookingFor,
      quizCompleted: false,
    });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");
    return ctx.storage.generateUploadUrl();
  },
});

export const updatePhoto = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!profile) throw new ConvexError("Profile not found");

    await ctx.db.patch(profile._id, { photoStorageId: args.storageId });
  },
});

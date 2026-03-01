import { mutation } from "./_generated/server";

const QUESTIONS = [
  { text: "I enjoy trying new and unfamiliar experiences", type: "likert" as const, category: "big_five" as const, trait: "openness", orderNum: 1 },
  { text: "I like to keep my space clean and organized", type: "likert" as const, category: "big_five" as const, trait: "conscientiousness", orderNum: 2 },
  { text: "I feel energized after social events", type: "likert" as const, category: "big_five" as const, trait: "extraversion", orderNum: 3 },
  { text: "I try to avoid conflict with people around me", type: "likert" as const, category: "big_five" as const, trait: "agreeableness", orderNum: 4 },
  { text: "I worry about things more than most people", type: "likert" as const, category: "big_five" as const, trait: "neuroticism", orderNum: 5 },
  { text: "It is more important to be fair than loyal", type: "likert" as const, category: "moral" as const, trait: "fairness", orderNum: 6 },
  { text: "Protecting people from harm should be a top priority", type: "likert" as const, category: "moral" as const, trait: "care", orderNum: 7 },
  { text: "Respect for authority is essential for a healthy society", type: "likert" as const, category: "moral" as const, trait: "authority", orderNum: 8 },
  { text: "Do you consider yourself an introvert?", type: "yes_no" as const, category: "personal" as const, trait: "extraversion", orderNum: 9 },
  { text: "Describe your ideal Saturday in Chicago", type: "open_ended" as const, category: "personal" as const, orderNum: 10 },
];

export const initQuestions = mutation({
  args: {},
  handler: async (ctx) => {
    for (const q of QUESTIONS) {
      const existing = await ctx.db
        .query("questions")
        .withIndex("by_order", (query) => query.eq("orderNum", q.orderNum))
        .unique();

      if (!existing) {
        await ctx.db.insert("questions", {
          text: q.text,
          type: q.type,
          category: q.category,
          trait: "trait" in q ? q.trait : undefined,
          orderNum: q.orderNum,
        });
      }
    }
  },
});

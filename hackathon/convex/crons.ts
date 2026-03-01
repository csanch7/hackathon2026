import { cronJobs } from "convex/server";

import { internal } from "./_generated/api";

const crons = cronJobs();

// Sunday 7pm CST = Monday 01:00 UTC (CST = UTC-6)
crons.weekly(
  "weekly-match-generation",
  { dayOfWeek: "monday", hourUTC: 1, minuteUTC: 0 },
  internal.matches.generate,
);

export default crons;

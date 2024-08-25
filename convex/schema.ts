import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  groups: defineTable({
    age: v.float64(),
    description: v.string(),
    iconUrl: v.string(),
    name: v.string(),
  }),
});
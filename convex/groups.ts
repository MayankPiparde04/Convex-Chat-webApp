import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    try {
      return await ctx.db.query("groups").collect();
    } catch (error) {
      // Handle or log error
      throw new Error('Failed to retrieve groups');
    }
  },
});

export const getGroups = query({
  args: { id: v.id("groups") },
  handler: async (ctx, { id }) => {
    try {
      const group = await ctx.db
        .query("groups")
        .filter((q) => q.eq(q.field("_id"), id))
        .unique();
      if (!group) {
        throw new Error(`Group with id ${id} not found`);
      }
      return group;
    } catch (error) {
      // Handle or log error
      throw new Error('Failed to retrieve group');
    }
  },
});

export const createGroup = mutation({
  args: {
    name: v.string(),
    age: v.number(),
    description: v.string(),
    iconUrl: v.string(),
  },
  handler: async ({ db }, args) => {
    try {
      const result = await db.insert("groups", args);
      // Optionally, return the result or a success message
      return { success: true, message: 'Group created successfully', group: result };
    } catch (error) {
      // Handle or log error
      throw new Error('Failed to create group');
    }
  },
});

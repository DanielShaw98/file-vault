import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const createFile = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    const indentity = await ctx.auth.getUserIdentity();
    if (!indentity) {
      throw new ConvexError("Sign in to create file");
    }

    await ctx.db.insert("files", {
      name: args.name,
    });
  },
});

export const getFiles = query({
  args: {},
  async handler(ctx, args) {
    const indentity = await ctx.auth.getUserIdentity();
    if (!indentity) {
      return [];
    }

    return ctx.db.query("files").collect();
  }
})

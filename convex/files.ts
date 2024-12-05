import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const indentity = await ctx.auth.getUserIdentity();
    if (!indentity) {
      throw new ConvexError("Sign in to create file");
    }

    await ctx.db.insert("files", {
      name: args.name,
      orgId: args.orgId,
    });
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const indentity = await ctx.auth.getUserIdentity();
    
    if (!indentity) {
      return [];
    }

    return ctx.db.query("files").withIndex("by_orgId", q =>
      q.eq("orgId", args.orgId)
    ).collect();
  }
})

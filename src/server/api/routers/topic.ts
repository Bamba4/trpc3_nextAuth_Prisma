import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const topicRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.topic.findMany();
    }),
    createTopic: protectedProcedure.input(z.object({ title: z.string() })).mutation(({ ctx, input }) => {
        return ctx.prisma.topic.create({
            data: {
                title: input.title,
                userId: ctx.session.user.id 
            }
        })
    })
})
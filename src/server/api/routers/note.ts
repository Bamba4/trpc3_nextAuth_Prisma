import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const noteRouter = createTRPCRouter({
    deleteNote: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation( async ({ ctx, input }) => {
            return ctx.prisma.note.delete({
                where: {
                    id: input.id
               }
           })
       }),
    createNote: protectedProcedure
        .input(z.object({ title: z.string(), content: z.string(), topicId: z.string() }))
        .mutation( async ({ ctx, input }) => {
            return ctx.prisma.note.create({
                data: {
                    title: input.title,
                    content: input.content,
                    topicId: input.topicId
                }
            })
        }),
    getAll: publicProcedure
        .input(z.object({ topicId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.note.findMany({
                where: {
                    topicId: input.topicId
                }
            })
        })
})
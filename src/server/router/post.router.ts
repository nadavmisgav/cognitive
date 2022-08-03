import { createPostSchema, getSinglePostSchema } from '../../schema/post.schema';
import { createRouter } from './context';

export const postRouter = createRouter()
    .mutation('create-post', {
        input: createPostSchema,
        async resolve({ ctx, input }) {
            const post = await ctx.prisma.post.create({
                data: {
                    ...input,
                },
            })

            return post
        },
    })
    .query('posts', {
        resolve({ ctx }) {
            return ctx.prisma.post.findMany()
        },
    })
    .query('single-post', {
        input: getSinglePostSchema,
        resolve({ input, ctx }) {
            return ctx.prisma.post.findUnique({
                where: {
                    id: input.postId,
                },
            })
        },
    })

import { getSinglePostSchema } from '../../schema/post.schema';
import { createRouter } from './context';

export const postRouter = createRouter()
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

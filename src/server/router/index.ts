// src/server/router/index.ts
import { createRouter } from "./context";
import { postRouter } from './post.router';


export const appRouter = createRouter()
  .merge('posts.', postRouter)

// export type definition of API
export type AppRouter = typeof appRouter;

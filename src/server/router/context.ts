// src/server/router/context.ts
import * as trpc from "@trpc/server";
import { router } from '@trpc/server';
import * as trpcNext from "@trpc/server/adapters/next";
import superjson from 'superjson';
import { prisma } from "../db/client";

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req;
  const res = opts?.res;

  return {
    req,
    res,
    prisma,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;


export function createRouter() {
  return router<Context>().transformer(superjson)
}


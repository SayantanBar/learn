import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});
const appRouter = router({
  createTodo: publicProcedure.input(todoInputType).mutation(async (ops) => {
    const title = ops.input.title;
    const description = ops.input.description;

    return {
      id: "1",
    };
  }),

  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (ops) => {
      const username = ops.ctx.username;
      const email = ops.input.email;
      const password = ops.input.password;

      let token = "123334343";
      return {
        token,
      };
    }),
});
const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    return {
      username: "sayantan",
    };
  },
});

server.listen(3000);

export type AppRouter = typeof appRouter;

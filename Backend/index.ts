import { publicProcedure, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
 
const appRouter = router({
    userList: publicProcedure
      .query(async () => {
        // Retrieve users from a datasource, this is an imaginary database
        const users = ["test1","test2","test3"]
        return users
      }),
  });

const server = createHTTPServer({
router: appRouter,
});

server.listen(3000);
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
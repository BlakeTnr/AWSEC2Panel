import { publicProcedure, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { getAllInstancesInfo, tagEC2Instance } from './ec2Utils';
 
const appRouter = router({
    ec2Instances: publicProcedure
      .query(async () => {
        return await getAllInstancesInfo()
      }),
  },
  );

const server = createHTTPServer({
router: appRouter,
});

server.listen(3000);
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
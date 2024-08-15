import { publicProcedure, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { getAllInstancesInfo, startEC2StopDaemon, startInstanceById, tagEC2DelayedStop, tagEC2Instance } from './ec2Utils';
import cors from 'cors';
import { z } from 'zod';
 
const appRouter = router({
    ec2Instances: publicProcedure
      .query(async () => {
        return await getAllInstancesInfo()
      }),
    startEC2Instance: publicProcedure
      .input(z.string())
      .mutation(async (opts) => {
        const { input } = opts;

        await tagEC2DelayedStop(input, 1600)
        return await startInstanceById(input)
      })
  },
  );

const server = createHTTPServer({
middleware: cors(),
router: appRouter,
});

server.listen(3000);
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
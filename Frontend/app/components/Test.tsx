import React from 'react'
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../Backend';

async function Test() {

const trpc = createTRPCClient<AppRouter>({
    links: [
    httpBatchLink({
        url: 'http://localhost:3000',
    }),
    ],
});

    console.log(await trpc.ec2Instances.query())

  return (
    <div>test</div>
  )
}

export default Test
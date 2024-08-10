import React from 'react'
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server';

async function Test() {

const trpc = createTRPCClient<AppRouter>({
    links: [
    httpBatchLink({
        url: 'http://localhost:3000',
    }),
    ],
});

    console.log(await trpc.userList.query())

  return (
    <div>test</div>
  )
}

export default Test
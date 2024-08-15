"use client"

import React, { useEffect, useState } from 'react'
import ServerSlab from './ServerSlab'
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../Backend';

const trpc = createTRPCClient<AppRouter>({
  links: [
  httpBatchLink({
      url: 'http://localhost:3000',
  }),
  ],
});

function ServersPanel() {

  var [servers, setServers]: [any, any] = useState(null)

  useEffect(() => {
    const fetchServers = async () => {
      var servers: any = await trpc.ec2Instances.query()
      setServers(servers)
    }
    fetchServers()
  })

  if(servers == null) {
    return (
      <div>
        Loading...
      </div>
    )
  } else {
    return (
    <div>
        {
          servers.map((server: any) => {
            return (
              <ServerSlab name={server.Name} id={server.Id} />
            )
          })
        }
    </div>
  )
  }
}

export default ServersPanel
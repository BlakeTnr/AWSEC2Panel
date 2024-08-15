"use client"

import React from 'react'
import Image from "next/image";
import Button, { buttonTypes } from "./Button";

function ServerSlab(props) {
  return (
    <div className="flex items-center block py-2 flex-auto mt-5 bg-neutral-800">
        <Image className="inline ml-4" width="50" height="50" src="./aws-ec2.svg" alt="EC2 Logo" />
        <p className="text-2xl ml-3 inline text-white">{props.name}</p>
        <p className="inline ml-2 text-neutral-400 text-sm">Auto stops in 10 minutes</p>
        <div className="ml-auto mr-5">
            <Button colorConfig={buttonTypes.stop} onClick={() => {console.log("Stopping")}}>Stop</Button>
            <Button colorConfig={buttonTypes.start} onClick={() => {console.log("Starting")}}>Start</Button>
        </div>
    </div>
  )
}

export default ServerSlab
"use client"

import React from 'react'
import Image from "next/image";
import Button, { buttonTypes } from "./Button";
import { trpc } from '../trpcClient';

const units: Array<[number, string]> = [
  [1, "seconds"],
  [60, "minutes"],
  [60 * 60, "hours"],
  [60 * 60 * 24, "days"]
];

function displayTime(seconds: any) {
  let bestUnit = units[0];
  for(const unit of units) {
    if(seconds >= unit[0]) {
        bestUnit = unit;
    }
  }
  const [divisor, label] = bestUnit;
  return Math.floor(seconds /divisor) + " " + label;
}

function getHowFarAway(referenceUnixTime: any) {
  const currentUnix = Math.floor(Date.now()/1000)
  const difference = referenceUnixTime - currentUnix
  return difference
}

function ServerSlab(props: any) {

  const startMutation = trpc.startEC2Instance.useMutation()
  const stopMutation = trpc.stopEC2Instance.useMutation()

  return (
    <div className="flex items-center block py-2 flex-auto mt-5 bg-neutral-800">
        <Image className="inline ml-4" width="50" height="50" src="./aws-ec2.svg" alt="EC2 Logo" />
        <p className="text-2xl ml-3 inline text-white">{props.name}</p>
        {
        props.state != "stopped" &&
          <p className="inline ml-2 text-neutral-400 text-sm">Auto stops in {displayTime(getHowFarAway(props.stopAt))}</p>
        }
        <div className="ml-auto mr-5">
            <p className="inline ml-2 text-neutral-400 text-sm">{props.state}</p>
            <Button colorConfig={buttonTypes.stop} onClick={() => {stopMutation.mutate(props.id)}}>Stop</Button>
            <Button colorConfig={buttonTypes.start} onClick={() => {startMutation.mutate(props.id)}}>Start</Button>
        </div>
    </div>
  )
}

export default ServerSlab
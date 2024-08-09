"use client"

import React from 'react'

export const buttonTypes = {
  start: {
    normal: "bg-green-600",
    hover: "bg-green-700",
    pressed: "bg-green-800"
  },
  stop: {
    normal: "bg-red-600",
    hover: "bg-red-700",
    pressed: "bg-red-800"
  },
  default: { // This really shouldn't be used
    normal: "bg-neutral-50",
    hover: "bg-neutral-100",
    pressed: "bg-neutral-150"
  }
};

function Button(props: any) {

  if(props.colorConfig == undefined) {
    props.colorConfig = buttonTypes.default
  }

  return (
    <button onClick={props.onClick} className={`ml-5 ${props.colorConfig.normal} py-2 px-4 rounded-md hover:${props.colorConfig.hover} active:${props.colorConfig.pressed}`}>{props.children}</button>
  );
}

export default Button
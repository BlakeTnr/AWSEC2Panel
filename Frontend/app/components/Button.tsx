"use client"

import React from 'react'

function Button(props: any) {

  return (
    <button onClick={props.onClick} className={`ml-5 bg-${props.color}-600 py-2 px-4 rounded-md hover:bg-${props.color}-700 active:bg-${props.color}-800`}>{props.children}</button>
  )
}

export default Button
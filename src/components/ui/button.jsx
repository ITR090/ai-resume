import React from 'react'

export default function Button({classname, ...props}) {
  return (
    <button className={classname} {...props}>
       {props.children}
    </button>
  )
}



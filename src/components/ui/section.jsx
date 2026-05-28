import React from 'react'

export default function Section({className, ...props}) {
  return (
    <div className={`mt-5 ` + className} {...props}>
      {props.children}
    </div>
  )
}

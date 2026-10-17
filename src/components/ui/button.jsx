import React from 'react'

export default function Button({className = '', variant, type = 'button', children, ...props}) {
  return (
    <button type={type} className={className} {...props}>
       {children}
    </button>
  )
}

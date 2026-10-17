import React from 'react'

export default function Section({className = '', children, ...props}) {
  return (
    <section className={`mt-6 ${className}`} {...props}>
      {children}
    </section>
  )
}

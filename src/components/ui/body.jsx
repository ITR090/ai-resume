import React from 'react'

function Body({className = '', children, ...props}) {
  return (
    <main className={`mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8 ${className}`} {...props}>
       {children}
    </main>
  )
}

export default Body

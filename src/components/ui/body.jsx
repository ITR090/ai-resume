import React from 'react'

function Body({classname, ...props}) {
  return (
    <div className={`w-auto p-8`} {...props}>
       {props.children}
    </div>
  )
}

export default Body

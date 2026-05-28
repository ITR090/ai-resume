import React from 'react'

function Body({classname, ...props}) {
  return (
    <div className={classname} {...props}>
       {props.children}
    </div>
  )
}

export default Body

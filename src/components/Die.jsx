import React from 'react'

export default function Die(prop) {
  return (

      <button style={{backgroundColor:(prop.isHeld)?"#59e391":"white"}}
      className='die' 
      onClick={()=>prop.handleClick(prop.id)}
      aria-label={`Die with value ${prop.value} is ${(prop.isHeld?"held":"not held")}`}
      aria-pressed={prop.isHeld}>
        {prop.value}</button>

  )
}

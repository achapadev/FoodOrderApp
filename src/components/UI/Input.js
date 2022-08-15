import React from 'react'
// we input React to use forwardRef which is required to useRef with a custom component
// wrap the component with the forwardRef method of React
// you get the ref as 2nd parameter and can use to forward Ref to Input element

import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  )
})

export default Input

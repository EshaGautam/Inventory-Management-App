import React from 'react'
import "./Button.css"

function Button(props) {
    const btnClass = `btn ${props.className}`
  return (
    <div className={btnClass}>
        <button type={props.type} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
    </div>
  )
}

export default Button
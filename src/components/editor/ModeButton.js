import React from 'react'


export default function ModeButton({mode, HtmlElement, onToggle, active}) {

  const handleClick = event => onToggle(mode)

  return (
    <button 
      onClick={handleClick}
      className={active ? 'editor-active' : ''}
    >
      <HtmlElement>{mode.charAt(0).toUpperCase() + mode.slice(1)}</HtmlElement>
    </button>
  )
}
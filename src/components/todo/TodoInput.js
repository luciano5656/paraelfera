import React, { useState } from 'react'

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <form
      className="flex-horizontal-center todo-input"
      onSubmit={handleSubmit}
    >
      <label>
        <input
          type="text"
          value={text}
          placeholder="Enter a task..."
          onChange={event => setText(event.target.value)}
        />
      </label>
      <input type="submit" value="Add" />
    </form>
  )
}
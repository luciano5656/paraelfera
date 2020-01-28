import React, { useState, useEffect, useRef } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'

export default function TodoItem({ item, onCheck, onEdit, onRemove }) {
  const [edit, setEdit] = useState(false)
  const textInput = useRef()
  useOutsideClick(() => setEdit(false), textInput)

  const handleEdit = event => {
    if (event.key === 'Enter') {
      onEdit(textInput.current.value)
    }
    if (['Escape', 'Tab', 'Enter'].includes(event.key)) {
      setEdit(false)
    }
  }

  const enableEdit = () => setEdit(true)

  useEffect(() => { edit && textInput.current.focus() }, [edit])

  return (
    <div className="todo-item">
      {!edit &&
        <div className="flex-horizontal grow" style={item.done ? { opacity: '0.3', textDecoration: 'line-through' } : {}}>
          <input
            type="checkbox"
            checked={item.done}
            onChange={onCheck}
          />
          <div className="flex-vertical todo-item-text">
            {item.text}
            <span className="todo-item-date">{`Created ${item.date}`}</span>
          </div>
        </div>
      }
      {edit &&
        <input
          ref={textInput}
          className="flex-horizontal grow"
          type="text"
          defaultValue={item.text}
          onKeyDown={handleEdit}
        />
      }
      <button onClick={enableEdit}>Edit</button>
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}
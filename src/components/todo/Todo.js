import React, { useState, useEffect } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import './Todo.css'


export default function Todo(props) {
  const [items, setItems] = useState( () =>
    localStorage.getItem('todoItems')
      ? JSON.parse(localStorage.getItem('todoItems'))
      : []
  )

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items))
  }, [items])

  const handleSubmit = (text) => {
    setItems([
      ...items, 
      {
        text,
        id: Math.random(),
        done: false,
        date: new Date().toLocaleString(),
      }
    ])
  }

  return (
    <div className="todo">
      <TodoInput onAdd={handleSubmit} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
        {items.map(item => (
            <TodoItem
              key={item.id}
              item={item}
              onCheck={e => setItems(prevItems => prevItems.map(i => i.id === item.id ? { ...i, done: !i.done } : i))}
              onEdit={text => setItems(prevItems => prevItems.map(i => i.id === item.id ? { ...i, text: text } : i))}
              onRemove={e => setItems(prevItems => prevItems.filter(i => i.id !== item.id))}
            />
          ))
        }
        <div className="bottom-toolbar">
          <button onClick={() => setItems(prevItems => prevItems.filter(i => !i.done))}>Remove Completed</button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'


export default function ModeButton({synonyms, onSelect}) {

  const handleSelect = event => {
    event.stopPropagation()
    onSelect('insertText', event.target.value)
  }

  return (
    <select
      onChange={handleSelect}
      value="_header"
    >
      <option value="_header" disabled>
        Synonyms...
      </option>
      {synonyms.map((s, i) => (
        <option key={i} value={s}>
          {s}
        </option>
      ))}
    </select>
  )
}
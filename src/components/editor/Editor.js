import React, { useRef, useState, useEffect } from 'react'
import ModeButton from './ModeButton'
import SynonymSelector from './SynonymSelector'
import './Editor.css'

export default function Editor({ commands }) {
  const editorEl = useRef()
  const [synonyms, setSynonyms] = useState([])
  const [modes, setModes] = useState([])
  const [selection, setSelection] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const promise = await fetch(
        'https://api.datamuse.com/words?ml=' + selection
      )
      const result = await promise.json()
      setSynonyms(result.map(r => r.word))
    }
    fetchData()
  }, [selection])

  const handleModesState = () =>
    setModes(
      commands.map(c => c.name).filter(m => document.queryCommandState(m))
    )

  const format = (fn, arg = null) => {
    document.execCommand(fn, false, arg)
    handleModesState()
    editorEl.current.focus()
  }

  const handleWordSelection = () => {
    handleModesState()
    const selected = document.getSelection().toString()
    if (selected.length > 0) {
      setSelection(selected.trim())
    }
  }

  const handleKeyboardSelection = event => {
    let selectionTimeout = null
    if (['ArrowLeft', 'ArrowRight'].includes(event.key) && event.shiftKey) {
      clearTimeout(selectionTimeout)
      selectionTimeout = setTimeout(() => handleWordSelection(), 1000)
    }
  }

  return (
    <div
      className="editor"
    >
      <div
        className="text-area"
        contentEditable={true}
        ref={editorEl}
        onMouseUp={handleWordSelection}
        onKeyUp={handleKeyboardSelection}
        suppressContentEditableWarning={true}
      >
        Lorem Ipsum a few words to test the synonyms component
      </div>
      <div>
        {commands.map(command => (
          <ModeButton
            key={command.name}
            mode={command.name}
            HtmlElement={command.htmlElement || 'span'}
            onToggle={format}
            active={modes.includes(command.name)}
          />
        ))}
        <SynonymSelector
          synonyms={synonyms}
          onSelect={format}
        />
      </div>
    </div>
  )
}

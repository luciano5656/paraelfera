import React, { useState, useEffect } from 'react'
import './Contact.css'
import api from '../api/mail'

export default function Contact() {
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState(false)


  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await api.sendMail({ contactName, email, message})
      const parsedResponse = await response.json()
      setStatus(`Message sent at ${parsedResponse.date}`)
    } catch (error) {
      setStatus("Oops, something went wrong...")
    }
  }

  useEffect(() => {
    if (error) {
      throw new Error('User generated error')
    }
  }, [error])

  return (
    <div className="contact-form">
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          Name:
          <input
            name="contactName"
            type="text"
            onChange={e => setContactName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            onChange={e => setMessage(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Send"
        />
        <button
          onClick={() => setError(true)}
          title="Simulate an error in component rendering"
        >Throw Error</button>
      </form>
      { status && <span>{status}</span> }
    </div>
  )
}

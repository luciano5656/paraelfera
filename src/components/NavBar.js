import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  const sections = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Todo',
      link: '/todo',
    },
    {
      title: 'Editor',
      link: '/editor',
    },
    {
      title: 'Contact',
      link: '/contact',
    },
  ]
  return (
    <nav className="flex-vertical">
      <ul>
        { sections.map(({link, title}) => (
          <li key={link}>
            <NavLink
              exact 
              activeClassName='active'
              to={link}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

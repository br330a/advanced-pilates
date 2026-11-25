import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

// Lista de opções estilizada e acessível: evita o menu nativo azul do sistema.
// Mantém a seleção controlada pelo formulário, com teclado e toque.
export default function StyledSelect({ id, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.indexOf(value)))
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)
  const optionRefs = useRef([])
  const listId = `${id}-options`

  useEffect(() => {
    if (!open) return undefined
    const closeOnOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutside)
    return () => document.removeEventListener('pointerdown', closeOnOutside)
  }, [open])

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus()
  }, [open, activeIndex])

  const openAt = (index) => {
    setActiveIndex(index)
    setOpen(true)
  }
  const choose = (index) => {
    onChange(options[index])
    setOpen(false)
    buttonRef.current?.focus()
  }
  const closeAndFocus = () => {
    setOpen(false)
    buttonRef.current?.focus()
  }

  const onTriggerKeyDown = (event) => {
    const selectedIndex = Math.max(0, options.indexOf(value))
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      openAt(Math.min(options.length - 1, Math.max(0, selectedIndex + (event.key === 'ArrowDown' ? 1 : -1))))
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      openAt(event.key === 'Home' ? 0 : options.length - 1)
    }
  }

  const onOptionKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => Math.min(options.length - 1, Math.max(0, current + (event.key === 'ArrowDown' ? 1 : -1))))
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      setActiveIndex(event.key === 'Home' ? 0 : options.length - 1)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      choose(index)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      closeAndFocus()
    }
  }

  return (
    <div
      className={`booking-select ${id === 'booking-period' ? 'booking-select-opens-up' : ''} ${open ? 'is-open' : ''}`}
      ref={wrapperRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        type="button"
        id={id}
        ref={buttonRef}
        className="booking-select-trigger"
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => open ? setOpen(false) : openAt(Math.max(0, options.indexOf(value)))}
        onKeyDown={onTriggerKeyDown}
      >
        <span id={`${id}-value`}>{value}</span>
        <Icon name="chevronDown" size={18} className="booking-select-chevron" />
      </button>
      {open && (
        <ul id={listId} className="booking-select-menu" role="listbox" aria-labelledby={`${id}-label`}>
          {options.map((option, index) => (
            <li
              key={option}
              ref={(element) => { optionRefs.current[index] = element }}
              role="option"
              tabIndex={index === activeIndex ? 0 : -1}
              aria-selected={value === option}
              className={`booking-select-option ${value === option ? 'is-selected' : ''}`}
              onClick={() => choose(index)}
              onKeyDown={(event) => onOptionKeyDown(event, index)}
            >
              <span>{option}</span>
              {value === option && <Icon name="check" size={17} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

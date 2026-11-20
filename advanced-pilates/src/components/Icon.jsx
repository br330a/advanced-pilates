import { memo } from 'react'

const paths = {
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  upRight: <><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>,
  menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
  close: <><path d="M6 6l12 12"/><path d="M18 6 6 18"/></>,
  whatsapp: <><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.43L3 20l1.08-5.26A8.5 8.5 0 1 1 21 11.5Z"/><path d="M9 8.7c-.5-.5-1.15.07-1.2.76-.13 1.6 2.5 5.3 5.4 6.1 1.05.28 2.09-.13 2.31-.69l.24-.68-2.16-1.18-.78.82c-1.02-.3-2.7-1.94-3.04-2.9l.81-.84L9 8.7Z"/></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
  activity: <><path d="M2 12h5l3-7 4 14 3-7h5"/></>,
  heart: <path d="M20.8 8.6c0 4.2-8.8 10.1-8.8 10.1S3.2 12.8 3.2 8.6a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z"/>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4.7 21c.4-4 3-6 7.3-6s6.9 2 7.3 6"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></>,
  message: <path d="M20 11.6a8 8 0 0 1-8 8 8.5 8.5 0 0 1-3.1-.6L4 20l1.2-4.6A8 8 0 1 1 20 11.6Z"/>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  minus: <path d="M5 12h14"/>,
  check: <path d="m5 12 4 4 10-10"/>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.7 6.3h.01"/></>,
  phone: <path d="M6.3 3.4 9 6.1l-1.5 2.8c1 2.2 2.7 3.8 4.9 4.9l2.7-1.5 2.8 2.7-.9 3c-.3.8-1.1 1.3-2 1.3C8.5 19.3 4.7 15.5 3.5 9c-.2-.9.3-1.7 1.2-2l1.6-3.6Z"/>,
  chevronLeft: <path d="m15 18-6-6 6-6"/>,
  chevronRight: <path d="m9 18 6-6-6-6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
}

function Icon({ name, size = 22, strokeWidth = 1.8, className = '', ...props }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name] || paths.arrow}
    </svg>
  )
}

export default memo(Icon)

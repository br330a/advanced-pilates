import { memo } from 'react'

const paths = {
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  upRight: <><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>,
  menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
  close: <><path d="M6 6l12 12"/><path d="M18 6 6 18"/></>,
  whatsapp: <><path d="M12 20c4.42 0 8-3.46 8-7.73S16.42 4.54 12 4.54 4 8 4 12.27c0 1.52.46 2.93 1.25 4.12L4.5 20l3.86-.67A8.3 8.3 0 0 0 12 20Z"/><path d="M14.86 13.6c-.2-.1-1.17-.57-1.35-.64-.18-.06-.31-.1-.44.1-.12.19-.49.63-.6.77-.11.13-.22.15-.42.05-.2-.1-.83-.3-1.59-.97-.58-.52-.98-1.16-1.1-1.35-.11-.2-.01-.3.08-.4.08-.09.2-.23.3-.34.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.44-1.06-.61-1.45-.16-.39-.33-.34-.44-.35h-.38c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.66s.72 1.92.82 2.05c.1.14 1.42 2.18 3.45 3.05.48.2.85.32 1.14.42.48.15.92.13 1.27.08.39-.06 1.17-.48 1.34-.95.17-.46.17-.85.12-.94-.04-.08-.18-.13-.38-.23Z"/></>,
  phone: <><path d="M7 3H5a2 2 0 0 0-2 2c0 8.84 7.16 16 16 16a2 2 0 0 0 2-2v-2a2 2 0 0 0-1.46-1.92l-3.2-.92a2 2 0 0 0-2.02.56l-1.04 1.04a15.9 15.9 0 0 1-6.04-6.04l1.04-1.04a2 2 0 0 0 .56-2.02L8.92 4.46A2 2 0 0 0 7 3Z"/></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
  activity: <><path d="M2 12h5l3-7 4 14 3-7h5"/></>,
  heart: <path d="M20.8 8.6c0 4.2-8.8 10.1-8.8 10.1S3.2 12.8 3.2 8.6a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z"/>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4.7 21c.4-4 3-6 7.3-6s6.9 2 7.3 6"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></>,
  message: <path d="M20 11.6a8 8 0 0 1-8 8 8.5 8.5 0 0 1-3.1-.6L4 20l1.2-4.6A8 8 0 1 1 20 11.6Z"/>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  quote: <><path d="M11 11H5v8h8v-8H8.5c.2-2.3 1.5-3.8 4-4.8V4C7.9 4.8 5 7.5 5 11M21 11h-6v8h8v-8h-4.5c.2-2.3 1.5-3.8 4-4.8V4c-4.6.8-7.5 3.5-7.5 7"/></>,
  star: <path d="m12 2 3.1 6.6 7.3.9-5.3 5.1 1.3 7.2L12 18.3l-6.4 3.5 1.3-7.2L1.6 9.5l7.3-.9L12 2Z"/>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  check: <path d="m5 12 4 4 10-10"/>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.7 6.3h.01"/></>,
}

function Icon({ name, size = 22, strokeWidth = 1.8, className = '', ...props }) {
  const isFilled = name === 'whatsapp' || name === 'heart' || name === 'star'
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  )
}

export default memo(Icon)

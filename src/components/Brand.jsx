export default function Brand({ inverted = false }) {
  return (
    <img
      src={inverted ? '/brand-black.png' : '/brand-color.png'}
      alt="Pilates Advanced Studio"
      className="brand-logo"
      width="1080"
      height="305"
      decoding="async"
    />
  )
}

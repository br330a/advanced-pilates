export default function Brand({ inverted = false }) {
  return (
    <img
      src={inverted ? '/brand-black-480.webp' : '/brand-color-480.webp'}
      alt="Pilates Advanced Studio"
      className="brand-logo"
      width="480"
      height="136"
      decoding="async"
    />
  )
}

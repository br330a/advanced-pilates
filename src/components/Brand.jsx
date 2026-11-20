export default function Brand({ inverse = false }) {
  return (
    <span className={`brand ${inverse ? 'brand-inverse' : ''}`} aria-label="Advanced Studio Pilates e Fisioterapia">
      <img src="/images/logo-advanced.png" alt="Advanced Studio" className="brand-logo" />
      <span className="brand-descriptor">Pilates & Fisioterapia</span>
    </span>
  )
}

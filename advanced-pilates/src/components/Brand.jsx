function Brand({ compact = false, inverse = false }) {
  return (
    <span className={`wordmark ${compact ? 'wordmark-compact' : ''} ${inverse ? 'wordmark-inverse' : ''}`} aria-label="Advanced Studio Pilates e Fisioterapia">
      <span className="wordmark-top">PILATES</span>
      <span className="wordmark-main"><strong>ADV</strong><b>ANCED</b></span>
      <span className="wordmark-studio">studio</span>
    </span>
  )
}
export default Brand

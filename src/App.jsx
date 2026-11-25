import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import Brand from './components/Brand'
import BookingModal from './components/BookingModal'
import PrivacyBanner from './components/PrivacyBanner'
import { useExternalContentPreference } from './utils/privacyPreference'
import { disableAnalytics, enableAnalytics, persistAnalyticsConsent, readAnalyticsConsent, trackWhatsAppClick } from './utils/analytics'
import Icon from './components/Icon'
import { faqs, reviews, services, studio, whatsappURL } from './data/site'
import { teamMembers } from './data/team'
import { gallery } from './data/gallery'

const navigation = [
  ['#servicos', 'Serviços'],
  ['#sobre', 'Profissional'],
  ['#espaco', 'Espaço'],
  ['#localizacao', 'Localização'],
]
const whatsMessage = 'Olá! Conheci o Advanced Studio pelo site e gostaria de saber mais sobre as aulas.'
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studio.mapQuery)}`
// Zoom 15: mostra um pouco mais do entorno, preservando o endereço como referência.
const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(studio.mapQuery)}&z=15&output=embed`

function Eyebrow({ children }) {
  return <span className="eyebrow"><span className="eyebrow-dot" />{children}</span>
}

function Header({ onBook }) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const menuButton = useRef(null)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return undefined
    function handleKeys(event) {
      if (event.key === 'Escape') { close(); menuButton.current?.focus() }
    }
    function closeOutside(event) {
      if (!headerRef.current?.contains(event.target)) close()
    }
    window.addEventListener('keydown', handleKeys)
    document.addEventListener('pointerdown', closeOutside)
    return () => {
      window.removeEventListener('keydown', handleKeys)
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [open, close])

  // A abertura do menu nunca deve persistir após mudar para a navegação desktop.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1001px)')
    const handleChange = () => { if (media.matches) close() }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [close])

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <a className="brand-link" href="#inicio" onClick={close} aria-label="Advanced Studio, voltar ao início"><Brand /></a>
          <nav className={`site-nav ${open ? 'is-open' : ''}`} id="primary-navigation" aria-label="Navegação principal">
            {navigation.map(([href, label]) => <a href={href} key={href} onClick={close}>{label}</a>)}
            <button className="button button-accent nav-mobile-cta" type="button" onClick={() => { close(); onBook() }}>
              Agendar aula <Icon name="arrow" size={17} />
            </button>
          </nav>
          <div className="header-actions">
            <button className="button button-accent header-book" type="button" onClick={() => onBook('Aula experimental de Pilates')}>Agendar aula <Icon name="upRight" size={17} /></button>
            <button
              ref={menuButton}
              type="button"
              className="menu-toggle"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-controls="primary-navigation"
              aria-expanded={open}
              onClick={() => setOpen((previous) => !previous)}
            ><Icon name={open ? 'close' : 'menu'} size={23} /></button>
          </div>
        </div>
      </header>
    </>
  )
}

function Hero({ onBook }) {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-orbit hero-orbit-1" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-2" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <Eyebrow>PILATES & FISIOTERAPIA · VILA PRUDENTE</Eyebrow>
          <h1 id="hero-title">Movimente o corpo. <em>Cuide de você.</em></h1>
          <p>Pilates com acompanhamento individualizado, aulas em diferentes aparelhos e atendimento de fisioterapia na Vila Prudente.</p>
          <div className="hero-actions">
            <button className="button button-accent button-large" type="button" onClick={() => onBook('Aula experimental de Pilates')}>Agendar aula experimental <Icon name="upRight" size={19} /></button>
            <a className="button button-outline button-large" href="#espaco">Conhecer o espaço <Icon name="arrow" size={18} /></a>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-image-shape">
            <picture>
              <source media="(max-width: 700px)" srcSet="/images/pilates-pose-480.webp 480w, /images/pilates-pose-800.webp 800w" sizes="345px" />
              <img
                src="/images/pilates-pose-800.webp"
                srcSet="/images/pilates-pose-480.webp 480w, /images/pilates-pose-800.webp 800w, /images/pilates-pose.webp 1200w"
                sizes="(max-width: 1000px) 395px, 42vw"
                alt="Mulher praticando Pilates com aparelhos no Advanced Studio"
                width="1200" height="1600" fetchPriority="high" decoding="async"
              />
            </picture>
          </div>
          <div className="hero-image-label"><span className="label-burst" aria-hidden="true">✳</span><span>O seu próximo passo<br /><strong>começa aqui.</strong></span></div>
          <div className="hero-photo-caption">ADVANCED STUDIO <span>·</span> VILA PRUDENTE</div>
        </div>
      </div>
      <div className="hero-bottom-rule" aria-hidden="true" />
    </section>
  )
}

function Services({ onBook }) {
  return (
    <section className="section services-section" id="servicos" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading services-heading">
          <div><Eyebrow>NOSSOS SERVIÇOS</Eyebrow><h2 id="services-title">Pilates e <em>fisioterapia.</em></h2></div>
          <p>Conheça nossas atividades e converse com o estúdio para saber como começar.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top"><span>{service.number} / 02</span><Icon name={service.icon} size={25} /></div>
              <h3>{service.label}</h3>
              <p>{service.description}</p>
              {service.plans && <p className="service-plan-note">{service.plans}</p>}
              <button type="button" className="service-link" onClick={() => onBook(service.number === '01' ? 'Informações sobre Pilates' : 'Informações sobre Fisioterapia')}>
                Consultar {service.number === '01' ? 'aulas' : 'atendimentos'} <Icon name="upRight" size={18} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  const professional = teamMembers[0]
  if (!professional) return null

  return (
    <section className="section professional-section" id="sobre" aria-labelledby="professional-title">
      <div className="container professional-layout">
        <div className="professional-portrait">
          <div className="professional-photo-frame">
            <picture>
              <source media="(max-width: 700px)" srcSet="/images/jessica-edwirges-480.webp 480w, /images/jessica-edwirges-800.webp 800w" sizes="90vw" />
              <img
                src="/images/jessica-edwirges-800.webp"
                srcSet="/images/jessica-edwirges-480.webp 480w, /images/jessica-edwirges-800.webp 800w, /images/jessica-edwirges.webp 960w"
                sizes="(max-width: 980px) 46vw, 430px"
                alt={professional.photoAlt} loading="lazy" decoding="async" width="960" height="1280"
              />
            </picture>
          </div>
          <span className="professional-photo-tag">ADVANCED STUDIO <span>✳</span> PILATES & FISIOTERAPIA</span>
        </div>
        <div className="professional-copy">
          <Eyebrow>PROFISSIONAL</Eyebrow>
          <h2 id="professional-title">Conheça a <em>Jéssica.</em></h2>
          <div className="professional-name-block">
            <h3>{professional.name}</h3>
            <p>{professional.role}</p>
            {professional.credential && <p className="professional-credential">{professional.credential}</p>}
          </div>
          <p className="professional-bio">{professional.bio}</p>
          <div className="professional-education">
            <h4>Formação em destaque</h4>
            <ul>
              {professional.featuredEducation.map((item) => (
                <li key={item.title}>
                  <span className="professional-education-year">{item.year}</span>
                  <div><strong>{item.title}</strong><small>{item.institution}</small></div>
                </li>
              ))}
            </ul>
          </div>
          <details className="professional-more">
            <summary>Ver cursos e eventos de atualização ({professional.continuingEducation.length}) <Icon name="plus" size={18} /></summary>
            <ul className="professional-course-list">
              {professional.continuingEducation.map((course) => (
                <li key={`${course.year}-${course.title}`}>
                  <span className="professional-course-year">{course.year}</span>
                  <div><strong>{course.title}</strong><small>{course.type} · {course.institution}</small></div>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  const [active, setActive] = useState(0)
  // Only the first slide has a src on initial render: off-screen photos must not
  // compete with the hero for bandwidth, even inside a translated carousel.
  const [mounted, setMounted] = useState([0])
  const mountedRef = useRef(new Set([0]))
  const pendingRef = useRef(new Map())
  const requestRef = useRef(0)
  const viewportRef = useRef(null)
  const startX = useRef(null)

  const preload = useCallback((index) => {
    if (mountedRef.current.has(index)) return Promise.resolve()
    if (pendingRef.current.has(index)) return pendingRef.current.get(index)
    const photo = gallery[index]
    const promise = new Promise((resolve) => {
      const img = new Image()
      img.srcset = window.matchMedia('(max-width: 700px)').matches ? photo.mobileSrcSet : photo.srcSet
      img.sizes = photo.sizes
      img.onload = () => {
        mountedRef.current.add(index)
        setMounted((previous) => previous.includes(index) ? previous : [...previous, index])
        resolve()
      }
      img.onerror = () => resolve()
      img.src = photo.src
    })
    pendingRef.current.set(index, promise)
    promise.finally(() => pendingRef.current.delete(index))
    return promise
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Only one neighboring slide is prefetched; never start all five downloads.
        void preload(1)
        observer.disconnect()
      }
    }, { rootMargin: '250px' })
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [preload])

  const select = useCallback((index) => {
    const next = (index + gallery.length) % gallery.length
    const request = ++requestRef.current
    void preload(next).then(() => {
      if (request !== requestRef.current || !mountedRef.current.has(next)) return
      // Let React mount the decoded slide before the horizontal transition.
      requestAnimationFrame(() => {
        if (request === requestRef.current) setActive(next)
      })
      void preload((next + 1) % gallery.length)
    })
  }, [preload])
  const move = (step) => select(active + step)
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
  }
  const handleTouchEnd = (event) => {
    if (startX.current === null) return
    const difference = event.changedTouches[0].clientX - startX.current
    startX.current = null
    if (Math.abs(difference) > 50) move(difference < 0 ? 1 : -1)
  }

  return (
    <section className="section showcase-section" id="espaco" aria-labelledby="showcase-title">
      <div className="container">
        <div className="showcase-intro">
          <div><Eyebrow>NOSSO ESTÚDIO</Eyebrow><h2 id="showcase-title">Conheça o <em>espaço.</em></h2></div>
        </div>
        <div className="studio-carousel" role="region" aria-roledescription="carrossel" aria-label="Fotografias do Advanced Studio" onKeyDown={handleKeyDown}>
          <div ref={viewportRef} className="studio-carousel-viewport" tabIndex={0} aria-label="Galeria de fotos: use as setas do teclado para trocar a imagem" onTouchStart={(event) => { startX.current = event.touches[0].clientX }} onTouchEnd={handleTouchEnd} onTouchCancel={() => { startX.current = null }}>
            <div className="studio-carousel-track" style={{ transform: `translateX(-${active * 100}%)` }}>
              {gallery.map((photo, index) => (
                <figure className="studio-carousel-slide" key={photo.src} aria-hidden={index !== active}>
                  {mounted.includes(index) && (
                    <picture>
                      <source media="(max-width: 700px)" srcSet={photo.mobileSrcSet} sizes={photo.sizes} />
                      <img src={photo.src} srcSet={photo.srcSet} sizes={photo.sizes} alt={photo.alt} loading="lazy" decoding="async" fetchPriority="low" width={photo.width} height={photo.height} style={{ objectPosition: photo.position }} />
                    </picture>
                  )}
                </figure>
              ))}
            </div>
            <div className="studio-carousel-photo-index" aria-hidden="true">{String(active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</div>
          </div>
          <div className="studio-carousel-bottom">
            <div className="studio-carousel-caption" aria-live="polite" aria-atomic="true"><strong>{gallery[active].title}</strong></div>
            <div className="studio-carousel-controls">
              <button type="button" className="studio-carousel-arrow is-previous" onPointerEnter={() => { void preload((active - 1 + gallery.length) % gallery.length) }} onFocus={() => { void preload((active - 1 + gallery.length) % gallery.length) }} onClick={() => move(-1)} aria-label="Foto anterior"><Icon name="arrow" size={19} /></button>
              <div className="studio-carousel-dots" aria-label="Selecionar fotografia">
                {gallery.map((photo, index) => <button key={photo.src} type="button" className={`studio-carousel-dot ${active === index ? 'is-active' : ''}`} onPointerEnter={() => { void preload(index) }} onFocus={() => { void preload(index) }} onClick={() => select(index)} aria-label={`Ver foto ${index + 1}: ${photo.title}`} aria-current={active === index ? 'true' : undefined} />)}
              </div>
              <button type="button" className="studio-carousel-arrow" onPointerEnter={() => { void preload((active + 1) % gallery.length) }} onFocus={() => { void preload((active + 1) % gallery.length) }} onClick={() => move(1)} aria-label="Próxima foto"><Icon name="arrow" size={19} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }) {
  return (
    <article className={`review-card ${review.featured ? 'review-card-featured' : ''}`}>
      <div className="review-card-top">
        <span className="review-label"><Icon name="quote" size={16} /> Depoimento de cliente</span>
        <span className="review-stars" role="img" aria-label={`Avaliação de ${review.author}: ${review.rating} de 5 estrelas`}>
          {Array.from({ length: review.rating }, (_, index) => <Icon name="star" size={16} key={index} />)}
        </span>
      </div>
      <blockquote>“{review.text}”</blockquote>
      <div className="review-footer">
        <div className="review-avatar" aria-hidden="true">{review.initials}</div>
        <div className="review-person"><strong>{review.author}</strong><span>{review.excerpt ? 'Trecho de depoimento' : 'Experiência compartilhada'}</span></div>
      </div>
    </article>
  )
}

function Testimonials() {
  const [expanded, setExpanded] = useState(false)
  return (
    <section className="section reviews-section" id="depoimentos" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews-head">
          <div><Eyebrow>DEPOIMENTOS</Eyebrow><h2 id="reviews-title">Quem conhece, <em>recomenda.</em></h2></div>
        </div>
        <div className="reviews-grid">
          {reviews.slice(0, 2).map((review) => <ReviewCard key={review.author} review={review} />)}
        </div>
        <div className="reviews-grid reviews-extra" id="additional-reviews" hidden={!expanded}>
          {reviews.slice(2).map((review) => <ReviewCard key={review.author} review={review} />)}
        </div>
        <div className="reviews-bottom">
          {reviews.length > 2 && (
            <button type="button" className="reviews-more" aria-expanded={expanded} aria-controls="additional-reviews" onClick={() => setExpanded((value) => !value)}>
              {expanded ? 'Mostrar menos avaliações' : `Ler mais ${reviews.length - 2} avaliações`}
              <Icon name="arrow" size={16} />
            </button>
          )}
          {studio.googleReviewsUrl && <a className="text-link" href={studio.googleReviewsUrl} target="_blank" rel="noopener noreferrer">Ver avaliações no Google <Icon name="upRight" size={18} /></a>}
          <p className="reviews-disclaimer">Relatos individuais compartilhados pelo estúdio. Resultados podem variar.</p>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="section faq-section" id="duvidas" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-heading"><Eyebrow>DÚVIDAS FREQUENTES</Eyebrow><h2 id="faq-title">Antes de <em>começar.</em></h2></div>
        <div className="faq-list">{faqs.map((faq, index) => (
          <details className="faq-item" key={faq.question}>
            <summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<Icon name="plus" size={19} /></summary>
            <p>{faq.answer}</p>
          </details>
        ))}</div>
      </div>
    </section>
  )
}

function Location({ externalContentAllowed, onAllowExternalContent, onBook }) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  return (
    <section className="section location-section" id="localizacao" aria-labelledby="location-title">
      <div className="container location-grid">
        <div className="location-copy">
          <Eyebrow>ONDE ESTAMOS</Eyebrow>
          <h2 id="location-title">Visite o <em>Advanced.</em></h2>
          <p>Na Vila Prudente, em São Paulo. Entre em contato para combinar sua visita.</p>
          <div className="location-details">
            <div className="location-item"><span><Icon name="pin" size={21} /></span><div><strong>Nosso endereço</strong><p>{studio.address}<br />{studio.neighborhood}<br />CEP {studio.postalCode}</p><a href={mapsLink} target="_blank" rel="noopener noreferrer">Traçar rota <Icon name="upRight" size={15} /></a></div></div>
            <div className="location-item"><span><Icon name="whatsapp" size={21} /></span><div><strong>Fale com a equipe</strong><p>{studio.phoneLabel}</p><a href={whatsappURL(whatsMessage)} target="_blank" rel="noopener noreferrer">Abrir WhatsApp <Icon name="upRight" size={15} /></a></div></div>
          </div>
          <button className="button button-accent location-book" type="button" onClick={() => onBook('Aula experimental de Pilates')}>
            Agendar aula experimental <Icon name="upRight" size={18} />
          </button>
        </div>
        <div className={`map-panel ${mapLoaded && externalContentAllowed && !mapError ? 'map-loaded' : ''}`}>
          {mapLoaded && externalContentAllowed && !mapError ? (
            <>
              <iframe title="Mapa interativo da localização do Advanced Studio" src={mapsEmbed} referrerPolicy="strict-origin-when-cross-origin" loading="lazy" onError={() => setMapError(true)} allowFullScreen />
              <div className="map-tools">
                <span className="map-touch-hint">No celular, use dois dedos para mover o mapa.</span>
                <a className="map-open-link" href={mapsLink} target="_blank" rel="noopener noreferrer">
                  Explorar no Google Maps <Icon name="upRight" size={16} />
                </a>
              </div>
            </>
          ) : (
            <div className="map-cover">
              <div className="map-pin-large"><Icon name="pin" size={28} /></div>
              <strong>Advanced Studio</strong>
              <span>Vila Prudente · São Paulo</span>
              <p>{mapError ? 'Não foi possível exibir o mapa aqui.' : 'Quer ver exatamente onde estamos?'}</p>
              {mapError ? (
                <a href={mapsLink} className="button button-dark" target="_blank" rel="noopener noreferrer">Abrir no Google Maps <Icon name="upRight" size={18} /></a>
              ) : (
                <button type="button" className="button button-dark" onClick={() => { onAllowExternalContent(); setMapLoaded(true) }}>
                  {externalContentAllowed ? 'Carregar mapa' : 'Permitir e carregar mapa'} <Icon name="arrow" size={18} />
                </button>
              )}
              <small>O mapa externo só carrega com sua autorização. Você também pode usar o link “Traçar rota”, sem incorporar o mapa à página.</small>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer({ onPrivacySettings }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about"><a href="#inicio" className="footer-brand" aria-label="Advanced Studio, voltar ao início"><Brand inverted /></a><p>Pilates e fisioterapia na Vila Prudente, São Paulo.</p><a className="footer-instagram" href={studio.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={19} /> {studio.instagramHandle}</a></div>
        <div className="footer-column"><h3>Explore</h3>{navigation.map(([href, label]) => <a href={href} key={href}>{label}</a>)}<a href="#duvidas">Dúvidas frequentes</a></div>
        <div className="footer-column"><h3>Entre em contato</h3><a href={`tel:+55${studio.phone}`}>{studio.phoneLabel}</a><a href={whatsappURL(whatsMessage)} target="_blank" rel="noopener noreferrer">WhatsApp <Icon name="upRight" size={15} /></a><a href={mapsLink} target="_blank" rel="noopener noreferrer">{studio.address}<br />Vila Prudente, São Paulo — SP</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Advanced Studio. Todos os direitos reservados.</span><span>Atendimento e disponibilidade: consulte a equipe.</span><a href="/privacidade.html">Privacidade</a><a href="/termos.html">Termos de Uso</a><button type="button" className="footer-privacy-button" onClick={onPrivacySettings}>Preferências de privacidade</button><a href="#inicio">Voltar ao topo ↑</a></div>
    </footer>
  )
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingInterest, setBookingInterest] = useState('Aula experimental de Pilates')
  const [privacyPreference, setPrivacyPreference] = useExternalContentPreference()
  const [analyticsConsent, setAnalyticsConsent] = useState(readAnalyticsConsent)
  const [privacySettingsOpen, setPrivacySettingsOpen] = useState(false)
  const [mapDraft, setMapDraft] = useState(() => privacyPreference === 'allow')
  const [analyticsDraft, setAnalyticsDraft] = useState(() => analyticsConsent === 'allow')
  const showPrivacyBanner = privacySettingsOpen || privacyPreference === null || analyticsConsent === null

  useEffect(() => {
    if (analyticsConsent === 'allow') enableAnalytics()
    else disableAnalytics()
    return undefined
  }, [analyticsConsent])

  useEffect(() => {
    function trackLinks(event) {
      const anchor = event.target?.closest?.('a[href^="https://wa.me/"]')
      if (!anchor) return
      const placement = anchor.classList.contains('whatsapp-float') ? 'flutuante'
        : anchor.closest('.site-footer') ? 'rodape'
          : anchor.closest('.location-section') ? 'localizacao' : 'outro'
      trackWhatsAppClick(placement)
    }
    document.addEventListener('click', trackLinks, true)
    return () => document.removeEventListener('click', trackLinks, true)
  }, [])

  const savePreferences = useCallback((mapChoice, analyticsChoice) => {
    setPrivacyPreference(mapChoice ? 'allow' : 'decline')
    const choice = analyticsChoice ? 'allow' : 'decline'
    persistAnalyticsConsent(choice)
    setAnalyticsConsent(choice)
    setPrivacySettingsOpen(false)
  }, [setPrivacyPreference])

  const openPrivacySettings = useCallback(() => {
    setMapDraft(privacyPreference === 'allow')
    setAnalyticsDraft(analyticsConsent === 'allow')
    setPrivacySettingsOpen(true)
  }, [privacyPreference, analyticsConsent])
  const openBooking = useCallback((interest = 'Aula experimental de Pilates') => { setBookingInterest(interest); setBookingOpen(true) }, [])
  const closeBooking = useCallback(() => setBookingOpen(false), [])
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header onBook={openBooking} />
      <PrivacyBanner
        open={showPrivacyBanner}
        mapChecked={mapDraft} onMapChecked={setMapDraft}
        analyticsChecked={analyticsDraft} onAnalyticsChecked={setAnalyticsDraft}
        onReject={() => savePreferences(false, false)}
        onSave={() => savePreferences(mapDraft, analyticsDraft)}
      />
      <main id="conteudo">
        <Hero onBook={openBooking} />
        <Services onBook={openBooking} />
        <Team />
        <Showcase />
        <Testimonials />
        <Faq />
        <Location externalContentAllowed={privacyPreference === 'allow'} onAllowExternalContent={() => setPrivacyPreference('allow')} onBook={openBooking} />
      </main>
      <Footer onPrivacySettings={openPrivacySettings} />
      {!bookingOpen && !showPrivacyBanner && <a className="whatsapp-float" href={whatsappURL(whatsMessage)} target="_blank" rel="noopener noreferrer" aria-label="Conversar com o Advanced Studio no WhatsApp"><Icon name="whatsapp" size={26} /><span>WhatsApp</span></a>}
      {bookingOpen && <BookingModal open onClose={closeBooking} initialInterest={bookingInterest} />}
    </>
  )
}

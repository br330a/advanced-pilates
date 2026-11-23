import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import Brand from './components/Brand'
import BookingModal from './components/BookingModal'
import PrivacyBanner from './components/PrivacyBanner'
import { useExternalContentPreference } from './utils/privacyPreference'
import Icon from './components/Icon'
import { faqs, highlights, reviews, services, studio, whatsappURL } from './data/site'
import { teamMembers } from './data/team'
import { gallery } from './data/gallery'

const navigation = [
  ['#servicos', 'Serviços'],
  ['#sobre', 'Profissional'],
  ['#espaco', 'Espaço'],
  ['#depoimentos', 'Avaliações'],
  ['#localizacao', 'Localização'],
]
const whatsMessage = 'Olá! Conheci o Advanced Studio pelo site e gostaria de saber mais sobre as aulas.'
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studio.mapQuery)}`
const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(studio.mapQuery)}&output=embed`

function Eyebrow({ children, light = false }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span className="eyebrow-dot" />{children}</span>
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
      <div className="topline">
        <div className="container topline-inner">
          <span><Icon name="pin" size={14} /> Vila Prudente · São Paulo</span>
          <span>Movimento, cuidado e bem-estar.</span>
          <a href={`tel:+55${studio.phone}`}><Icon name="phone" size={14} /> {studio.phoneLabel}</a>
        </div>
      </div>
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
          <p>Pilates com aparelhos e fisioterapia em um espaço feito para quem quer começar, recomeçar ou continuar em movimento, na Vila Prudente.</p>
          <div className="hero-actions">
            <button className="button button-accent button-large" type="button" onClick={() => onBook('Aula experimental de Pilates')}>Agendar aula experimental <Icon name="upRight" size={19} /></button>
            <a className="button button-outline button-large" href="#espaco">Conhecer o espaço <Icon name="arrow" size={18} /></a>
          </div>
          <a className="hero-rating" href="#depoimentos" aria-label="Ler avaliações compartilhadas por alunos do Advanced Studio">
            <span className="hero-proof-icon" aria-hidden="true"><Icon name="quote" size={24} /></span>
            <span><strong>Quem vem, tem histórias para contar.</strong><small>Conheça os depoimentos dos nossos clientes <Icon name="arrow" size={14} /></small></span>
          </a>
        </div>
        <div className="hero-art">
          <div className="hero-image-shape">
            <img src="/images/pilates-pose.webp" alt="Mulher praticando Pilates com aparelhos no Advanced Studio" width="1200" height="1600" fetchPriority="high" />
          </div>
          <div className="hero-image-label"><span className="label-burst" aria-hidden="true">✳</span><span>O seu próximo passo<br /><strong>começa aqui.</strong></span></div>
          <div className="hero-photo-caption">ADVANCED STUDIO <span>·</span> VILA PRUDENTE</div>
        </div>
      </div>
      <div className="hero-bottom-rule" aria-hidden="true" />
    </section>
  )
}

function Highlights() {
  return (
    <section className="highlights" aria-label="Diferenciais do Advanced Studio">
      <div className="container highlights-grid">
        {highlights.map((item, index) => (
          <div className="highlight" key={item.title}>
            <div className="highlight-icon"><Icon name={item.icon} size={24} /></div>
            <div><span className="highlight-number">0{index + 1} /</span><h2>{item.title}</h2><p>{item.description}</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Services({ onBook }) {
  return (
    <section className="section services-section" id="servicos" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading services-heading">
          <div><Eyebrow>O QUE VOCÊ ENCONTRA AQUI</Eyebrow><h2 id="services-title">Cuidado que acompanha <em>seu movimento.</em></h2></div>
          <p>O primeiro passo é descobrir qual atividade faz sentido para você. Conheça os serviços e converse com a equipe.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top"><span>{service.number} — SERVIÇOS</span><Icon name={service.icon} size={26} /></div>
              <div><span className="service-kicker">{service.kicker}</span><h3>{service.label}</h3><p>{service.description}</p></div>
              <ul>{service.points.map((point) => <li key={point}><Icon name="check" size={17} /> {point}</li>)}</ul>
              <button type="button" className="service-link" onClick={() => onBook(service.number === '01' ? 'Informações sobre Pilates' : 'Informações sobre Fisioterapia')}>Tirar dúvidas sobre {service.number === '01' ? 'Pilates' : 'fisioterapia'} <Icon name="upRight" size={18} /></button>
            </article>
          ))}
        </div>
        <div className="experimental-banner">
          <span className="experimental-symbol" aria-hidden="true">✳</span>
          <div><strong>Quer dar o primeiro passo?</strong><p>Pergunte sobre a aula experimental e os horários disponíveis.</p></div>
          <button className="button button-dark" type="button" onClick={() => onBook('Aula experimental de Pilates')}>Agendar aula experimental <Icon name="upRight" size={18} /></button>
        </div>
      </div>
    </section>
  )
}

function Team({ onBook }) {
  const professional = teamMembers[0]
  if (!professional) return null

  return (
    <section className="section professional-section" id="sobre" aria-labelledby="professional-title">
      <div className="container professional-layout">
        <div className="professional-portrait">
          <div className="professional-photo-frame">
            <img src={professional.photo} alt={professional.photoAlt} loading="lazy" decoding="async" width="960" height="1280" />
          </div>
          <span className="professional-photo-tag">ADVANCED STUDIO <span>✳</span> PILATES & FISIOTERAPIA</span>
        </div>
        <div className="professional-copy">
          <Eyebrow>QUEM CUIDA DE VOCÊ</Eyebrow>
          <h2 id="professional-title">Experiência que inspira <em>confiança.</em></h2>
          <div className="professional-name-block">
            <h3>{professional.name}</h3>
            <p>{professional.role}</p>
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
          <button type="button" className="text-link professional-contact" onClick={() => onBook('Aula experimental de Pilates')}>
            Conversar sobre uma aula <Icon name="upRight" size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  const [active, setActive] = useState(0)
  const startX = useRef(null)
  const select = useCallback((index) => {
    setActive((index + gallery.length) % gallery.length)
  }, [])
  const move = useCallback((step) => {
    setActive((current) => (current + step + gallery.length) % gallery.length)
  }, [])
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
          <div>
            <Eyebrow>CONHEÇA O ADVANCED</Eyebrow>
            <h2 id="showcase-title">Um espaço para você <em>se movimentar.</em></h2>
          </div>
          <p>Veja nosso ambiente, os aparelhos e os detalhes do estúdio. Fotografias reais, sem filtros ou imagens ilustrativas.</p>
        </div>
        <div className="studio-carousel" role="region" aria-roledescription="carrossel" aria-label="Fotografias do Advanced Studio" onKeyDown={handleKeyDown}>
          <div className="studio-carousel-viewport" tabIndex={0} aria-label="Galeria de fotos: use as setas do teclado para trocar a imagem" onTouchStart={(event) => { startX.current = event.touches[0].clientX }} onTouchEnd={handleTouchEnd} onTouchCancel={() => { startX.current = null }}>
            <div className="studio-carousel-track" style={{ transform: `translateX(-${active * 100}%)` }}>
              {gallery.map((photo, index) => (
                <figure className="studio-carousel-slide" key={photo.src} aria-hidden={index !== active}>
                  <img src={photo.src} alt={photo.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" width={photo.width} height={photo.height} style={{objectPosition: photo.position}} />
                </figure>
              ))}
            </div>
            <div className="studio-carousel-photo-index" aria-hidden="true">{String(active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</div>
          </div>
          <div className="studio-carousel-bottom">
            <div className="studio-carousel-caption" aria-live="polite" aria-atomic="true">
              <strong>{gallery[active].title}</strong><span>{gallery[active].description}</span>
            </div>
            <div className="studio-carousel-controls">
              <button type="button" className="studio-carousel-arrow is-previous" onClick={() => move(-1)} aria-label="Foto anterior"><Icon name="arrow" size={19} /></button>
              <div className="studio-carousel-dots" aria-label="Selecionar fotografia">
                {gallery.map((photo, index) => <button key={photo.src} type="button" className={`studio-carousel-dot ${active === index ? 'is-active' : ''}`} onClick={() => select(index)} aria-label={`Ver foto ${index + 1}: ${photo.title}`} aria-current={active === index ? 'true' : undefined} />)}
              </div>
              <button type="button" className="studio-carousel-arrow" onClick={() => move(1)} aria-label="Próxima foto"><Icon name="arrow" size={19} /></button>
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
        <span className="review-quote" aria-hidden="true">“</span>
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
  return (
    <section className="section reviews-section" id="depoimentos" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews-head">
          <div><Eyebrow>QUEM CONHECE, CONTA</Eyebrow><h2 id="reviews-title">O melhor do Advanced <em>é o que dizem sobre nós.</em></h2></div>
          <p>Experiências de quem conhece o espaço, os profissionais e o cuidado do Advanced Studio — contadas por quem viveu cada momento.</p>
        </div>
        <div className="reviews-grid">{reviews.map((review) => <ReviewCard key={review.author} review={review} />)}</div>
        <div className="reviews-bottom">
          <p className="reviews-disclaimer">Depoimentos compartilhados pelo estúdio. Os relatos representam experiências individuais, e os resultados podem variar.</p>
          {studio.googleReviewsUrl && <a className="text-link" href={studio.googleReviewsUrl} target="_blank" rel="noopener noreferrer">Ver avaliações no Google <Icon name="upRight" size={18} /></a>}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="section faq-section" id="duvidas" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-heading"><Eyebrow>AINDA TEM DÚVIDAS?</Eyebrow><h2 id="faq-title">Tudo começa com <em>uma boa conversa.</em></h2><p>Reunimos algumas respostas para facilitar seu primeiro contato com o Advanced.</p><a className="text-link" href={whatsappURL(whatsMessage)} target="_blank" rel="noopener noreferrer">Falar com a equipe <Icon name="upRight" size={18} /></a></div>
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

function Location({ externalContentAllowed, onAllowExternalContent }) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  return (
    <section className="section location-section" id="localizacao" aria-labelledby="location-title">
      <div className="container location-grid">
        <div className="location-copy">
          <Eyebrow>ONDE ESTAMOS</Eyebrow>
          <h2 id="location-title">Pertinho de você, <em>na Vila Prudente.</em></h2>
          <p>Venha conhecer nosso espaço. Estamos na Vila Prudente, em São Paulo. Antes de visitar, confirme o atendimento com a equipe.</p>
          <div className="location-details">
            <div className="location-item"><span><Icon name="pin" size={21} /></span><div><strong>Nosso endereço</strong><p>{studio.address}<br />{studio.neighborhood}<br />CEP {studio.postalCode}</p><a href={mapsLink} target="_blank" rel="noopener noreferrer">Traçar rota <Icon name="upRight" size={15} /></a></div></div>
            <div className="location-item"><span><Icon name="whatsapp" size={21} /></span><div><strong>Fale com a equipe</strong><p>{studio.phoneLabel}</p><a href={whatsappURL(whatsMessage)} target="_blank" rel="noopener noreferrer">Abrir WhatsApp <Icon name="upRight" size={15} /></a></div></div>
          </div>
        </div>
        <div className={`map-panel ${mapLoaded && externalContentAllowed && !mapError ? 'map-loaded' : ''}`}>
          {mapLoaded && externalContentAllowed && !mapError ? (
            <iframe title="Mapa interativo da localização do Advanced Studio" src={mapsEmbed} referrerPolicy="strict-origin-when-cross-origin" loading="lazy" onError={() => setMapError(true)} allowFullScreen />
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

function FinalCTA({ onBook }) {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="container final-cta-inner">
        <div className="cta-decor" aria-hidden="true">A<span>✳</span></div>
        <div className="final-cta-content"><Eyebrow light>VAMOS COMEÇAR?</Eyebrow><h2 id="cta-title">Seu próximo passo <em>começa aqui.</em></h2><p>Tire suas dúvidas e consulte os horários de uma aula experimental.</p></div>
        <button className="button button-accent button-large" type="button" onClick={() => onBook('Aula experimental de Pilates')}>Quero conhecer o Advanced <Icon name="upRight" size={19} /></button>
      </div>
    </section>
  )
}

function Footer({ onPrivacySettings }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about"><a href="#inicio" className="footer-brand" aria-label="Advanced Studio, voltar ao início"><Brand inverted /></a><p>Pilates, fisioterapia e um convite para cuidar de você através do movimento.</p><a className="footer-instagram" href={studio.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={19} /> {studio.instagramHandle}</a></div>
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
  const openBooking = useCallback((interest = 'Aula experimental de Pilates') => { setBookingInterest(interest); setBookingOpen(true) }, [])
  const closeBooking = useCallback(() => setBookingOpen(false), [])
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header onBook={openBooking} />
      <PrivacyBanner preference={privacyPreference} onChoose={setPrivacyPreference} />
      <main id="conteudo">
        <Hero onBook={openBooking} />
        <Highlights />
        <Services onBook={openBooking} />
        <Team onBook={openBooking} />
        <Showcase />
        <Testimonials />
        <Faq />
        <Location externalContentAllowed={privacyPreference === 'allow'} onAllowExternalContent={() => setPrivacyPreference('allow')} />
        <FinalCTA onBook={openBooking} />
      </main>
      <Footer onPrivacySettings={() => setPrivacyPreference(null)} />
      {!bookingOpen && privacyPreference !== null && <a className="whatsapp-float" href={whatsappURL(whatsMessage)} target="_blank" rel="noopener noreferrer" aria-label="Conversar com o Advanced Studio no WhatsApp"><Icon name="whatsapp" size={26} /><span>WhatsApp</span></a>}
      {bookingOpen && <BookingModal open onClose={closeBooking} initialInterest={bookingInterest} />}
    </>
  )
}

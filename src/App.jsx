import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import Brand from './components/Brand'
import BookingModal from './components/BookingModal'
import Icon from './components/Icon'
import { faqs, highlights, reviews, services, studio, whatsappURL } from './data/site'

const navigation = [
  ['#sobre', 'O estúdio'],
  ['#servicos', 'Serviços'],
  ['#espaco', 'Nosso espaço'],
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

  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <span><Icon name="pin" size={14} /> Vila Prudente · São Paulo</span>
          <span>Movimento, cuidado e bem-estar.</span>
          <a href={`tel:+55${studio.phone}`}><Icon name="whatsapp" size={14} /> {studio.phoneLabel}</a>
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
            <button className="button button-accent header-book" type="button" onClick={onBook}>Agendar aula <Icon name="upRight" size={17} /></button>
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
          <h1 id="hero-title">Seu corpo merece <span>movimento.</span><em> Você merece cuidado.</em></h1>
          <p>Conheça o Advanced Studio: Pilates com aparelhos, fisioterapia e um espaço para você se conectar com o próprio bem-estar.</p>
          <div className="hero-actions">
            <button className="button button-accent button-large" type="button" onClick={onBook}>Agendar aula experimental <Icon name="upRight" size={19} /></button>
            <a className="button button-outline button-large" href="#espaco">Conhecer o espaço <Icon name="arrow" size={18} /></a>
          </div>
          <a className="hero-rating" href="#depoimentos" aria-label="Ler avaliações compartilhadas por alunos do Advanced Studio">
            <span className="hero-rating-stars" aria-hidden="true">★★★★★</span>
            <span><strong>Histórias reais, experiências reais.</strong><small>Leia as avaliações de quem conhece o estúdio <Icon name="arrow" size={14} /></small></span>
          </a>
        </div>
        <div className="hero-art">
          <div className="hero-image-shape">
            <img src="/images/pilates-pose.webp" alt="Mulher praticando Pilates com aparelhos no Advanced Studio" width="1200" height="1600" fetchPriority="high" />
          </div>
          <div className="hero-image-label"><span className="label-burst" aria-hidden="true">✳</span><span>O seu próximo passo<br /><strong>começa aqui.</strong></span></div>
          <div className="hero-photo-caption">ADVANCED STUDIO <span>·</span> PILATES</div>
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

function About({ onBook }) {
  return (
    <section className="section about-section" id="sobre" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-visual">
          <img className="about-image" src="/images/studio-interior-clean.webp" alt="Interior do Advanced Studio com aparelhos de Pilates e iluminação natural" loading="lazy" width="920" height="1030" />
          <div className="about-photo-stamp"><span>UM ESPAÇO PARA</span><strong>se movimentar.</strong></div>
        </div>
        <div className="about-copy">
          <Eyebrow>CONHEÇA O ADVANCED</Eyebrow>
          <h2 id="about-title">Um espaço para você cuidar de <em>si, no seu ritmo.</em></h2>
          <p className="section-lead">Acreditamos na importância de encontrar tempo para o próprio corpo. No Advanced Studio, o movimento encontra um ambiente equipado e uma equipe com quem você pode conversar de perto.</p>
          <div className="about-list">
            <div><span><Icon name="check" size={19} /></span><p><strong>Prática com aparelhos</strong><small>Conheça a estrutura e as possibilidades do Pilates.</small></p></div>
            <div><span><Icon name="check" size={19} /></span><p><strong>Contato direto</strong><small>Converse com a equipe sobre seu interesse e sua rotina.</small></p></div>
            <div><span><Icon name="check" size={19} /></span><p><strong>Localização acessível</strong><small>Nos encontre na Vila Prudente, em São Paulo.</small></p></div>
          </div>
          <button type="button" className="text-link" onClick={onBook}>Quero conhecer o Advanced <Icon name="upRight" size={19} /></button>
        </div>
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
              <button type="button" className="service-link" onClick={onBook}>Tirar dúvidas sobre {service.number === '01' ? 'Pilates' : 'fisioterapia'} <Icon name="upRight" size={18} /></button>
            </article>
          ))}
        </div>
        <div className="experimental-banner">
          <span className="experimental-symbol" aria-hidden="true">✳</span>
          <div><strong>Quer dar o primeiro passo?</strong><p>Pergunte sobre a aula experimental e os horários disponíveis.</p></div>
          <button className="button button-dark" type="button" onClick={onBook}>Agendar aula experimental <Icon name="upRight" size={18} /></button>
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  return (
    <section className="section showcase-section" id="espaco" aria-labelledby="showcase-title">
      <div className="container">
        <div className="section-heading showcase-heading">
          <div><Eyebrow>UM POUCO DO NOSSO DIA A DIA</Eyebrow><h2 id="showcase-title">O espaço fala. <em>O movimento também.</em></h2></div>
          <p>Imagens reais do Advanced Studio, dos aparelhos e da prática. Um convite para conhecer tudo mais de perto.</p>
        </div>
        <div className="showcase-grid">
          <figure className="showcase-photo showcase-photo-main"><img loading="lazy" src="/images/hero-studio.webp" alt="Ambiente interno do estúdio com aparelhos de Pilates" width="920" height="1030" /><figcaption><span>01</span> Nosso espaço</figcaption></figure>
          <figure className="showcase-photo showcase-photo-top"><img loading="lazy" src="/images/hero-editorial.webp" alt="Praticante realizando movimento de Pilates em aparelho" width="920" height="1030" /><figcaption><span>02</span> Pilates em movimento</figcaption></figure>
          <figure className="showcase-photo showcase-photo-bottom"><img loading="lazy" src="/images/studio-signage.webp" alt="Letreiro do Advanced Studio com o endereço Rua José dos Reis, 719" width="920" height="1030" /><figcaption><span>03</span> Nosso endereço</figcaption></figure>
        </div>
        <div className="showcase-bottom"><p>Quer conhecer o ambiente pessoalmente?</p><a href={studio.instagram} target="_blank" rel="noopener noreferrer" className="text-link">Acompanhe nosso Instagram <Icon name="upRight" size={18} /></a></div>
      </div>
    </section>
  )
}

function ReviewCard({ review }) {
  return (
    <article className={`review-card ${review.featured ? 'review-card-featured' : ''}`}>
      <div className="review-card-top"><span className="review-stars" aria-label="Avaliação de 5 de 5 estrelas">★★★★★</span><span className="review-quote" aria-hidden="true">“</span></div>
      <blockquote>“{review.text}”</blockquote>
      <div className="review-footer">
        <div className="review-avatar" aria-hidden="true">{review.initials}</div>
        <div className="review-person"><strong>{review.author}</strong><span>{review.excerpt ? 'Trecho de avaliação' : 'Avaliação de cliente'}</span></div>
        <a href={review.image} target="_blank" rel="noopener noreferrer" className="review-original" aria-label={`Ver captura original da avaliação de ${review.author}`} title="Ver avaliação original"><Icon name="upRight" size={19} /></a>
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
          <p>Palavras de pessoas que já passaram pelo estúdio. Avaliações reais compartilhadas pela equipe — clique em cada seta para ler a captura original.</p>
        </div>
        <div className="reviews-grid">{reviews.map((review) => <ReviewCard key={review.author} review={review} />)}</div>
        <p className="reviews-disclaimer">Os depoimentos representam experiências individuais. Resultados e necessidades variam de pessoa para pessoa.</p>
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

function Location() {
  const [mapLoaded, setMapLoaded] = useState(false)
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
        <div className={`map-panel ${mapLoaded ? 'map-loaded' : ''}`}>
          {mapLoaded ? (
            <iframe title="Mapa interativo da localização do Advanced Studio" src={mapsEmbed} referrerPolicy="no-referrer-when-downgrade" loading="lazy" allowFullScreen />
          ) : (
            <div className="map-cover">
              <div className="map-pin-large"><Icon name="pin" size={28} /></div>
              <strong>Advanced Studio</strong>
              <span>Vila Prudente · São Paulo</span>
              <p>Quer ver exatamente onde estamos?</p>
              <button type="button" className="button button-dark" onClick={() => setMapLoaded(true)}>Carregar mapa <Icon name="arrow" size={18} /></button>
              <small>O mapa do Google só é carregado quando você solicitar.</small>
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
        <div className="final-cta-content"><Eyebrow light>VAMOS COMEÇAR?</Eyebrow><h2 id="cta-title">O primeiro passo é <em>se permitir começar.</em></h2><p>Entre em contato, tire suas dúvidas e consulte a disponibilidade de uma aula experimental.</p></div>
        <button className="button button-accent button-large" type="button" onClick={onBook}>Quero conhecer o Advanced <Icon name="upRight" size={19} /></button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about"><a href="#inicio" className="footer-brand" aria-label="Advanced Studio, voltar ao início"><Brand inverted /></a><p>Pilates, fisioterapia e um convite para cuidar de você através do movimento.</p><a className="footer-instagram" href={studio.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={19} /> {studio.instagramHandle}</a></div>
        <div className="footer-column"><h3>Explore</h3>{navigation.map(([href, label]) => <a href={href} key={href}>{label}</a>)}<a href="#duvidas">Dúvidas frequentes</a></div>
        <div className="footer-column"><h3>Entre em contato</h3><a href={`tel:+55${studio.phone}`}>{studio.phoneLabel}</a><a href={whatsappURL(whatsMessage)} target="_blank" rel="noopener noreferrer">WhatsApp <Icon name="upRight" size={15} /></a><a href={mapsLink} target="_blank" rel="noopener noreferrer">{studio.address}<br />Vila Prudente, São Paulo — SP</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Advanced Studio. Todos os direitos reservados.</span><span>Atendimento e disponibilidade: consulte a equipe.</span><a href="#inicio">Voltar ao topo ↑</a></div>
    </footer>
  )
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const openBooking = useCallback(() => setBookingOpen(true), [])
  const closeBooking = useCallback(() => setBookingOpen(false), [])
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header onBook={openBooking} />
      <main id="conteudo">
        <Hero onBook={openBooking} />
        <Highlights />
        <About onBook={openBooking} />
        <Services onBook={openBooking} />
        <Showcase />
        <Testimonials />
        <Faq />
        <Location />
        <FinalCTA onBook={openBooking} />
      </main>
      <Footer />
      <a className="whatsapp-float" href={whatsappURL(whatsMessage)} target="_blank" rel="noopener noreferrer" aria-label="Conversar com o Advanced Studio no WhatsApp"><Icon name="whatsapp" size={26} /><span>WhatsApp</span></a>
      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </>
  )
}

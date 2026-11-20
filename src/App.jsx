import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Brand from './components/Brand'
import BookingModal from './components/BookingModal'
import Icon from './components/Icon'
import { faqs, highlights, services, showcase, studio, whatsappURL } from './data/site'

const navigation = [
  ['#inicio', 'Início'],
  ['#servicos', 'Serviços'],
  ['#espaco', 'Espaço'],
  ['#localizacao', 'Localização'],
  ['#duvidas', 'Dúvidas'],
]

const simpleMessage = 'Olá! Conheci o Advanced Studio pelo site e gostaria de saber mais sobre as aulas.'
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studio.mapQuery)}`
const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(studio.mapQuery)}&output=embed`

function SectionLabel({ children, light = false }) {
  return (
    <span className={`section-label ${light ? 'section-label-light' : ''}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  )
}

function Header({ onBook }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return undefined
    const escape = (event) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [open, close])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="brand-link" onClick={close} aria-label="Voltar ao início">
          <Brand />
        </a>

        <nav className={`site-nav ${open ? 'site-nav-open' : ''}`} aria-label="Navegação principal">
          {navigation.map(([href, label]) => (
            <a href={href} key={href} onClick={close}>
              {label}
            </a>
          ))}
          <button type="button" className="mobile-nav-cta" onClick={() => { close(); onBook() }}>
            <Icon name="whatsapp" size={18} />
            Aula experimental
          </button>
        </nav>

        <div className="header-actions">
          <button type="button" className="button button-primary header-cta" onClick={onBook}>
            <Icon name="whatsapp" size={18} />
            Agendar aula
          </button>
          <button
            type="button"
            className="menu-button"
            onClick={() => setOpen((old) => !old)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onBook }) {
  return (
    <section id="inicio" className="hero section-first">
      <div className="container hero-grid">
        <div className="hero-copy">
          <SectionLabel>PILATES & FISIOTERAPIA · VILA PRUDENTE</SectionLabel>
          <h1>
            Cuidado com presença. <em>Movimento com intenção.</em>
          </h1>
          <p className="hero-lead">
            Conheça o Advanced Studio e descubra um espaço pensado para acolher, orientar e facilitar o seu primeiro passo.
          </p>
          <div className="hero-actions">
            <button type="button" className="button button-primary" onClick={onBook}>
              <Icon name="whatsapp" size={19} />
              Agendar aula experimental
            </button>
            <a href="#espaco" className="button button-secondary">
              Ver o estúdio
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="hero-points">
            <span><Icon name="check" size={16} /> Espaço real e acolhedor</span>
            <span><Icon name="check" size={16} /> Contato fácil por WhatsApp</span>
            <span><Icon name="check" size={16} /> Mapa e localização clara</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <img src="/images/hero-real.webp" alt="Prática de Pilates em aparelho no Advanced Studio" fetchPriority="high" width="960" height="1340" />
          </div>
          <div className="hero-badge">
            <strong>Advanced Studio</strong>
            <span>{studio.descriptor}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="highlights">
      <div className="container highlight-grid">
        {highlights.map((item) => (
          <article className="highlight-card" key={item.title}>
            <span className="highlight-icon"><Icon name={item.icon} size={22} /></span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about-section" id="estudio">
      <div className="container about-grid">
        <div className="about-copy">
          <SectionLabel>O ESTÚDIO</SectionLabel>
          <h2>
            Um espaço para conhecer o <em>Advanced de verdade.</em>
          </h2>
          <p>
            A proposta do site é apresentar o estúdio com mais clareza: mostrar o ambiente, facilitar o contato e ajudar quem está chegando agora a entender o que encontra no local.
          </p>
          <p>
            Em vez de depender apenas de posts isolados, o visitante pode ver o espaço, localizar o endereço e iniciar uma conversa direta com a equipe.
          </p>
        </div>

        <div className="about-side">
          <div className="about-brand-card">
            <Brand />
            <ul>
              <li><Icon name="pin" size={16} /> {studio.address}</li>
              <li><Icon name="message" size={16} /> WhatsApp para aula experimental</li>
              <li><Icon name="check" size={16} /> Atendimento e horários sob confirmação</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services({ onBook }) {
  return (
    <section id="servicos" className="section services-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <SectionLabel>SERVIÇOS E PRIMEIRO CONTATO</SectionLabel>
            <h2>
              Informação clara, visual leve e <em>menos cara de template.</em>
            </h2>
          </div>
          <p>
            Reorganizei esta parte para ficar mais objetiva: sem aparência artificial e com foco no que o cliente realmente quer entender ao entrar no site.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.slug}>
              <div className="service-top">
                <span className="service-number">{service.number}</span>
                <span className="service-icon"><Icon name={service.icon} size={20} /></span>
              </div>
              <h3>{service.label}</h3>
              <p>{service.description}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}><Icon name="check" size={15} /> {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="services-cta-row">
          <button type="button" className="button button-primary" onClick={onBook}>
            <Icon name="whatsapp" size={18} />
            Quero falar com o estúdio
          </button>
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  return (
    <section id="espaco" className="section showcase-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <SectionLabel>IMAGENS CURADAS</SectionLabel>
            <h2>
              Visual mais limpo, com fotos <em>mais bem selecionadas.</em>
            </h2>
          </div>
          <p>
            Removi a sensação de “galeria genérica” e deixei uma composição mais editorial, usando melhor o material disponível e evitando imagens com interface aparente.
          </p>
        </div>

        <div className="showcase-grid">
          {showcase.map((item) => (
            <article className={`showcase-card showcase-${item.span}`} key={item.title}>
              <div className="showcase-image-wrap">
                <img src={item.src} alt={item.title} loading="lazy" />
              </div>
              <div className="showcase-copy">
                <span>{item.accent}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location() {
  return (
    <section className="section location-section" id="localizacao">
      <div className="container location-grid">
        <div>
          <SectionLabel>LOCALIZAÇÃO E CONTATO</SectionLabel>
          <h2>
            Fácil de encontrar. <em>Fácil de entrar em contato.</em>
          </h2>
          <p className="location-lead">
            O site agora concentra as informações essenciais para quem quer conhecer o Advanced Studio pela primeira vez.
          </p>
          <div className="location-cards">
            <div className="info-card">
              <h3>Endereço</h3>
              <p>{studio.address}</p>
              <p>{studio.neighborhood}</p>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer">Abrir no Google Maps</a>
            </div>
            <div className="info-card">
              <h3>Contato</h3>
              <p>{studio.phoneLabel}</p>
              <a href={whatsappURL(simpleMessage)} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="map-card">
          <iframe
            title="Mapa do Advanced Studio"
            src={mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="section faq-section" id="duvidas">
      <div className="container faq-grid">
        <div>
          <SectionLabel>DÚVIDAS FREQUENTES</SectionLabel>
          <h2>
            O básico para começar <em>sem complicação.</em>
          </h2>
          <p>
            Mantive uma seção simples e direta para tirar as dúvidas mais comuns antes do contato.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {faq.question}
                <Icon name="plus" size={18} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA({ onBook }) {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <div>
          <SectionLabel light>PRONTO PARA O PRÓXIMO PASSO?</SectionLabel>
          <h2>
            Se interessou pelo espaço, <em>comece pelo WhatsApp.</em>
          </h2>
          <p>
            É a forma mais prática de pedir informações, confirmar horários e saber mais sobre a aula experimental.
          </p>
        </div>
        <button type="button" className="button button-white" onClick={onBook}>
          <Icon name="whatsapp" size={19} />
          Agendar aula experimental
        </button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand inverse />
          <p>Advanced Studio · Pilates & Fisioterapia · Vila Prudente, São Paulo.</p>
        </div>
        <div className="footer-links">
          <h3>Navegação</h3>
          {navigation.slice(1).map(([href, label]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </div>
        <div className="footer-links">
          <h3>Contato</h3>
          <a href={whatsappURL(simpleMessage)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={16} /> WhatsApp</a>
          <a href={studio.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={16} /> Instagram</a>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={16} /> Como chegar</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Advanced Studio.</span>
        <span>Horários, serviços e disponibilidade devem ser confirmados com a equipe.</span>
      </div>
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
        <About />
        <Services onBook={openBooking} />
        <Showcase />
        <Location />
        <Faq />
        <FinalCTA onBook={openBooking} />
      </main>
      <Footer />

      <a
        className="whatsapp-float"
        href={whatsappURL(simpleMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com o estúdio pelo WhatsApp"
      >
        <span className="whatsapp-float-icon"><Icon name="whatsapp" size={18} /></span>
        <span>WhatsApp</span>
      </a>

      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </>
  )
}

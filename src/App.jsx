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
          <a href={studio.instagram} className="mobile-nav-instagram" target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" size={18} />
            Instagram
          </a>
          <button type="button" className="mobile-nav-cta" onClick={() => { close(); onBook() }}>
            <Icon name="whatsapp" size={18} />
            Aula experimental
          </button>
        </nav>

        <div className="header-actions">
          <a href={studio.instagram} className="social-pill" target="_blank" rel="noopener noreferrer" aria-label="Instagram do Advanced Studio">
            <Icon name="instagram" size={18} />
            <span>Instagram</span>
          </a>
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
            Conheça o estúdio. <em>Sinta a proposta.</em>
          </h1>
          <p className="hero-lead">
            Um site mais claro e mais elegante para apresentar o Advanced Studio, mostrar o espaço, facilitar o contato e transmitir confiança logo na primeira visita.
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
            <span><Icon name="check" size={16} /> Primeira impressão mais profissional</span>
            <span><Icon name="check" size={16} /> Acesso rápido ao WhatsApp</span>
            <span><Icon name="check" size={16} /> Instagram e localização integrados</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <img src="/images/hero-studio.webp" alt="Interior do Advanced Studio com aparelhos de Pilates" fetchPriority="high" width="920" height="1030" />
          </div>
          <div className="hero-badge">
            <strong>{studio.name}</strong>
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
            Uma apresentação mais limpa, <em>humana e confiável.</em>
          </h2>
          <p>
            A proposta deste site é servir como porta de entrada: mostrar melhor o local, a identidade do Advanced e os principais caminhos para contato.
          </p>
          <p>
            Em vez de depender apenas de stories ou posts soltos, o visitante passa a entender o ambiente, o estilo do estúdio e como conversar com a equipe com facilidade.
          </p>
        </div>

        <div className="about-side">
          <div className="about-brand-card">
            <Brand />
            <ul>
              <li><Icon name="pin" size={16} /> {studio.address}</li>
              <li><Icon name="whatsapp" size={16} /> Aula experimental pelo WhatsApp</li>
              <li><Icon name="instagram" size={16} /> Instagram sempre acessível no site</li>
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
              Organização visual melhor, <em>sem aparência artificial.</em>
            </h2>
          </div>
          <p>
            Esta área foi ajustada para explicar o que o estúdio oferece de forma direta, mantendo um visual atual e agradável para qualquer faixa etária.
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
            <SectionLabel>ESPAÇO E MOVIMENTO</SectionLabel>
            <h2>
              Imagens mais proporcionais e <em>mais coerentes com o layout.</em>
            </h2>
          </div>
          <p>
            A galeria foi reorganizada para eliminar distorções e valorizar melhor o estúdio, os aparelhos e as posturas apresentadas.
          </p>
        </div>

        <div className="showcase-grid showcase-grid-even">
          {showcase.map((item) => (
            <article className="showcase-card" key={item.title}>
              <div className={`showcase-image-wrap ${item.imageClass || ''}`}>
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

function ContactItem({ icon, title, children, href, label }) {
  return (
    <div className="contact-item">
      <div className="contact-icon"><Icon name={icon} size={20} /></div>
      <div className="contact-body">
        <h3>{title}</h3>
        <div className="contact-content">{children}</div>
        <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
      </div>
    </div>
  )
}

function Location() {
  return (
    <section className="section location-section" id="localizacao">
      <div className="container location-grid">
        <div>
          <SectionLabel>LOCALIZAÇÃO E CONTATO</SectionLabel>
          <h2>
            Fácil de encontrar. <em>Fácil de conversar.</em>
          </h2>
          <p className="location-lead">
            Aqui ficam reunidas as informações mais importantes para quem está conhecendo o Advanced pela primeira vez: endereço, contato direto e acesso ao Instagram.
          </p>

          <div className="contact-panel">
            <ContactItem icon="pin" title="Endereço" href={mapsLink} label="Abrir no Google Maps">
              <p>{studio.address}</p>
              <p>{studio.neighborhood}</p>
            </ContactItem>

            <ContactItem icon="whatsapp" title="WhatsApp" href={whatsappURL(simpleMessage)} label="Conversar agora">
              <p>{studio.phoneLabel}</p>
              <p>Fale com a equipe sobre aula experimental e horários.</p>
            </ContactItem>

            <ContactItem icon="instagram" title="Instagram" href={studio.instagram} label="Abrir perfil">
              <p>{studio.instagramHandle}</p>
              <p>Veja novidades e acompanhe a presença digital do estúdio.</p>
            </ContactItem>
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
            Uma área simples, clara e acolhedora para resolver as principais dúvidas antes do contato.
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
            É a forma mais prática de pedir informações, confirmar disponibilidade e saber mais sobre a aula experimental.
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
          <Brand />
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
        <span className="whatsapp-float-icon"><Icon name="whatsapp" size={19} /></span>
        <span>WhatsApp</span>
      </a>

      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import Brand from './components/Brand'
import BookingModal from './components/BookingModal'
import Icon from './components/Icon'
import { faqs, gallery, highlights, services, studio, whatsappURL } from './data/site'

const navigation = [
  ['#inicio', 'Início'],
  ['#estudio', 'O estúdio'],
  ['#cuidados', 'Cuidados'],
  ['#espaco', 'Nosso espaço'],
  ['#localizacao', 'Localização'],
]

const simpleMessage = 'Olá! Conheci o Advanced Studio pelo site e gostaria de saber mais sobre as aulas.'
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studio.mapQuery)}`
const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(studio.mapQuery)}&output=embed`

function SectionLabel({ children, light = false }) {
  return <span className={`section-label ${light ? 'section-label-light' : ''}`}><i aria-hidden="true"/>{children}</span>
}

function Header({ onBook }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  useEffect(() => {
    if (!open) return
    const escape = (event) => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [open, close])
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href="#inicio" className="brand-link" onClick={close} aria-label="Advanced Studio — voltar ao início"><Brand /></a>
        <nav className={`site-nav ${open ? 'site-nav-open' : ''}`} id="site-nav" aria-label="Navegação principal">
          {navigation.map(([href, label]) => <a href={href} key={href} onClick={close}>{label}</a>)}
          <button type="button" className="mobile-nav-cta" onClick={() => { close(); onBook() }}><Icon name="whatsapp" size={19}/> Aula experimental</button>
        </nav>
        <div className="header-actions">
          <button className="button button-orange header-cta" type="button" onClick={onBook}><Icon name="whatsapp" size={19}/> Agendar aula <Icon name="upRight" size={17}/></button>
          <button type="button" className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'}><Icon name={open ? 'close' : 'menu'} size={25}/></button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onBook }) {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <SectionLabel>PILATES & FISIOTERAPIA · VILA PRUDENTE</SectionLabel>
          <h1>Seu corpo é capaz de <em>muito mais.</em></h1>
          <p className="hero-lead">Um lugar para se reconectar com o movimento, cuidar de você e descobrir novos caminhos para o bem-estar.</p>
          <div className="hero-actions">
            <button type="button" className="button button-orange button-large" onClick={onBook}><Icon name="whatsapp" size={22}/> Agendar aula experimental <Icon name="upRight" size={19}/></button>
            <a className="button button-text" href="#espaco">Conheça o estúdio <Icon name="arrow" size={19}/></a>
          </div>
          <div className="hero-notes">
            <div className="hero-note-icon"><Icon name="check" size={21}/></div>
            <div><strong>Um cuidado no seu ritmo</strong><span>Experiência acolhedora, movimento consciente.</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-shape" aria-hidden="true" />
          <div className="hero-photo-wrap">
            <img src="/images/hero-editorial.webp" alt="Imagem editorial inspirada no estúdio, com movimento de Pilates em aparelho" fetchPriority="high" width="1440" height="1040" />
          </div>
          <div className="hero-floating">
            <span className="hero-floating-symbol"><Icon name="activity" size={25}/></span>
            <span><strong>Movimento com propósito.</strong><small>Seu momento começa aqui.</small></span>
          </div>
          <p className="hero-visual-note">Imagem editorial ilustrativa inspirada no material do estúdio.</p>
        </div>
      </div>
      <div className="hero-bottom-line" aria-hidden="true" />
    </section>
  )
}

function Highlights() {
  return (
    <section className="highlights" aria-label="Diferenciais do Advanced Studio">
      <div className="container highlight-grid">
        {highlights.map((item) => (
          <div className="highlight" key={item.title}>
            <span className="highlight-icon"><Icon name={item.icon} size={25}/></span>
            <div><h2>{item.title}</h2><p>{item.description}</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About({ onBook }) {
  return (
    <section id="estudio" className="section about-section">
      <div className="container about-grid">
        <div className="about-media">
          <img src="/images/estudio-real.webp" alt="Interior do Advanced Studio, com piso de madeira, janelas e aparelhos de Pilates" loading="lazy" width="900" height="960" />
          <span className="about-photo-caption"><Icon name="pin" size={16}/> Vila Prudente · São Paulo</span>
          <span className="about-side-decor" aria-hidden="true"/>
        </div>
        <div className="about-copy">
          <SectionLabel>UM ESPAÇO PARA VOCÊ</SectionLabel>
          <h2>Seu bem-estar merece <em>atenção de verdade.</em></h2>
          <p>O Advanced Studio reúne Pilates e Fisioterapia em um ambiente feito para acolher. Aqui, cada detalhe convida a reservar um tempo para você e para o seu movimento.</p>
          <p>Um espaço claro, equipado e com uma proposta de cuidado que valoriza a individualidade de cada pessoa.</p>
          <div className="about-points">
            <span><Icon name="check" size={18}/> Ambiente equipado</span>
            <span><Icon name="check" size={18}/> Atenção personalizada</span>
            <span><Icon name="check" size={18}/> Contato direto com a equipe</span>
          </div>
          <button type="button" className="text-link" onClick={onBook}>Venha conhecer o Advanced <Icon name="upRight" size={20}/></button>
        </div>
      </div>
    </section>
  )
}

function Services({ onBook }) {
  const [selected, setSelected] = useState('pilates')
  const active = services.find((item) => item.slug === selected) || services[0]
  return (
    <section id="cuidados" className="section services-section">
      <div className="container">
        <div className="section-heading services-heading">
          <div><SectionLabel light>CUIDADO E MOVIMENTO</SectionLabel><h2>Descubra o que faz <em>sentido para você.</em></h2></div>
          <p>Conheça as possibilidades do estúdio e converse com a equipe para entender qual opção combina com seu momento.</p>
        </div>
        <div className="service-tabs" role="tablist" aria-label="Serviços do estúdio">
          {services.map((service) => (
            <button
              type="button"
              className={`service-tab ${selected === service.slug ? 'service-tab-active' : ''}`}
              key={service.slug}
              role="tab"
              id={`tab-${service.slug}`}
              aria-selected={selected === service.slug}
              aria-controls="service-panel"
              onClick={() => setSelected(service.slug)}
              onKeyDown={(event) => {
                if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
                event.preventDefault()
                const index = services.findIndex((item) => item.slug === service.slug)
                const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? services.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + services.length) % services.length
                const next = services[nextIndex]
                setSelected(next.slug)
                document.getElementById(`tab-${next.slug}`)?.focus()
              }}
              tabIndex={selected === service.slug ? 0 : -1}
            ><span>{service.number}</span><Icon name={service.icon} size={23}/><strong>{service.label}</strong><Icon name="arrow" size={18} className="service-arrow"/></button>
          ))}
        </div>
        <div id="service-panel" role="tabpanel" aria-labelledby={`tab-${active.slug}`} className="service-feature" key={active.slug} tabIndex={0}>
          <div className="service-feature-photo"><img src={active.image} alt={`Imagem ilustrativa do cuidado ${active.label}`} loading="lazy" width="760" height="940"/></div>
          <div className="service-feature-copy"><span className="service-number">CUIDADO {active.number} / 03</span><h3>{active.label}</h3><p>{active.description}</p><p className="service-feature-detail">{active.detail}</p><button className="button button-orange" type="button" onClick={onBook}>Quero saber mais <Icon name="upRight" size={18}/></button></div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const dialogRef = useRef(null)
  const [current, setCurrent] = useState(0)
  function open(index) { setCurrent(index); dialogRef.current?.showModal() }
  function close() { dialogRef.current?.close() }
  const select = (delta) => setCurrent((previous) => (previous + gallery.length + delta) % gallery.length)
  return (
    <section id="espaco" className="section gallery-section">
      <div className="container">
        <div className="section-heading gallery-heading"><div><SectionLabel>CONHEÇA DE PERTO</SectionLabel><h2>Um espaço feito para <em>se sentir bem.</em></h2></div><p>Um pequeno passeio visual pelo Advanced: o ambiente, os aparelhos e o movimento acontecendo na prática.</p></div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <button className={`gallery-item gallery-item-${index+1}`} key={item.src} type="button" onClick={() => open(index)} aria-label={`Ampliar foto: ${item.title}`}>
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async"/>
              <span className="gallery-info"><small>{item.type}</small><strong>{item.title}</strong></span>
              <span className="gallery-expand"><Icon name="upRight" size={19}/></span>
            </button>
          ))}
        </div>
        <p className="gallery-disclaimer">Fotografias e recortes preparados a partir do material compartilhado pelo estúdio.</p>
      </div>
      <dialog ref={dialogRef} className="lightbox" aria-label="Visualização ampliada das fotografias" onClick={(event) => { if (event.target === dialogRef.current) close() }} onKeyDown={(event) => { if (event.key === 'ArrowRight') select(1); if (event.key === 'ArrowLeft') select(-1) }}>
        <div className="lightbox-content"><button type="button" onClick={close} className="lightbox-close icon-button" aria-label="Fechar foto"><Icon name="close" size={25}/></button><img src={gallery[current].src} alt={gallery[current].alt}/><div className="lightbox-bottom"><div><span>{String(current+1).padStart(2,'0')} / {String(gallery.length).padStart(2,'0')}</span><strong>{gallery[current].title}</strong></div><div className="lightbox-controls"><button type="button" onClick={() => select(-1)} aria-label="Foto anterior"><Icon name="chevronLeft"/></button><button type="button" onClick={() => select(1)} aria-label="Próxima foto"><Icon name="chevronRight"/></button></div></div></div>
      </dialog>
    </section>
  )
}

function Benefits() {
  return (
    <section id="beneficios" className="section benefits-section">
      <div className="container benefits-grid">
        <div><SectionLabel>POR QUE SE MOVIMENTAR</SectionLabel><h2>Mais movimento para os <em>seus dias.</em></h2><p>O Pilates envolve atenção à respiração, coordenação e controle dos movimentos. Cada pessoa tem um ponto de partida — e seu processo merece respeito.</p><a href="#localizacao" className="text-link">Veja onde estamos <Icon name="arrow" size={20}/></a></div>
        <div className="benefits-items">
          {[['01','Mobilidade','Explorar a amplitude dos movimentos com consciência.'],['02','Força e controle','Trabalhar o corpo com atenção à execução.'],['03','Consciência corporal','Perceber seu movimento e suas possibilidades.'],['04','Bem-estar','Reservar um momento da rotina para cuidar de você.']].map(([num, title, body]) => <div className="benefit" key={num}><span>{num}</span><div><h3>{title}</h3><p>{body}</p></div><Icon name="upRight" size={18}/></div>)}
        </div>
      </div>
    </section>
  )
}

function Location() {
  return (
    <section id="localizacao" className="section location-section">
      <div className="container">
        <div className="section-heading location-heading"><div><SectionLabel>ESTAMOS AQUI</SectionLabel><h2>Seu próximo passo <em>é pertinho.</em></h2></div><p>Venha conhecer nosso espaço na Vila Prudente. Encontre o endereço, abra a rota e converse com a equipe antes de vir.</p></div>
        <div className="location-grid">
          <div className="location-info"><div className="location-icon"><Icon name="pin" size={27}/></div><h3>Venha conhecer o Advanced Studio.</h3><div className="address-block"><span>ENDEREÇO</span><address>{studio.address}<br/>{studio.neighborhood}<br/>CEP {studio.postalCode}</address></div><div className="address-block"><span>CONTATO</span><a href={`tel:+55${studio.phone}`}>{studio.phoneLabel}</a></div><div className="location-actions"><a className="button button-orange" href={mapsLink} target="_blank" rel="noopener noreferrer">Abrir no Google Maps <Icon name="upRight" size={18}/></a><a className="button button-quiet" href={whatsappURL(simpleMessage)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={19}/> WhatsApp</a></div></div>
          <div className="map-frame"><iframe title="Google Maps — localização do Advanced Studio na Rua José dos Reis, 719, São Paulo" src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe><a className="map-overlay-link" href={mapsLink} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={17}/> Ver rota no Google Maps <Icon name="upRight" size={15}/></a></div>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return <section className="section faq-section" id="duvidas"><div className="container faq-grid"><div><SectionLabel>SUAS DÚVIDAS, SEM COMPLICAÇÃO</SectionLabel><h2>Antes de começar, <em>que tal conversar?</em></h2><p>Separamos algumas respostas para ajudar. E se precisar, nosso WhatsApp está logo ali.</p></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} className="faq-item"><summary><span>{String(index+1).padStart(2,'0')}</span>{faq.question}<Icon name="plus" size={19}/></summary><p>{faq.answer}</p></details>)}</div></div></section>
}

function FinalCTA({ onBook }) {
  return <section className="final-cta"><div className="container final-cta-inner"><div className="final-cta-decoration" aria-hidden="true"/><div><SectionLabel light>VAMOS DAR O PRIMEIRO PASSO?</SectionLabel><h2>O próximo movimento <em>pode começar aqui.</em></h2><p>Conheça o espaço, tire suas dúvidas e converse com a equipe sobre uma aula experimental.</p></div><button className="button button-white button-large" type="button" onClick={onBook}><Icon name="whatsapp" size={22}/> Agendar aula experimental <Icon name="upRight" size={20}/></button></div></section>
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><Brand inverse/><p>Um espaço para movimento, cuidado e bem-estar na Vila Prudente.</p></div><div className="footer-links"><h3>Explore</h3><a href="#estudio">O estúdio</a><a href="#cuidados">Cuidados</a><a href="#espaco">Nosso espaço</a><a href="#localizacao">Localização</a></div><div className="footer-links"><h3>Contato</h3><a href={whatsappURL(simpleMessage)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18}/> WhatsApp</a><a href={studio.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={18}/> Instagram</a><a href={mapsLink} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={18}/> Como chegar</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Advanced Studio. Todos os direitos reservados.</span><span>Informações de horários e serviços sujeitos à confirmação com o estúdio.</span></div></footer>
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const openBooking = useCallback(() => setBookingOpen(true), [])
  const closeBooking = useCallback(() => setBookingOpen(false), [])
  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <Header onBook={openBooking}/>
    <main id="conteudo"><Hero onBook={openBooking}/><Highlights/><About onBook={openBooking}/><Services onBook={openBooking}/><Gallery/><Benefits/><Location/><Faq/><FinalCTA onBook={openBooking}/></main>
    <Footer/>
    <a className="whatsapp-float" href={whatsappURL(simpleMessage)} target="_blank" rel="noopener noreferrer" aria-label="Entrar em contato pelo WhatsApp"><Icon name="whatsapp" size={27}/><span>Fale com a gente</span></a>
    <BookingModal open={bookingOpen} onClose={closeBooking}/>
  </>
}

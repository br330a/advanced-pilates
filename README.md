# Advanced Studio — site institucional

Site institucional do **Advanced Studio Pilates & Fisioterapia**, na Vila Prudente, São Paulo. Construído em React 19, Vite 8 e CSS próprio. A página é estática, sem backend: o formulário apenas prepara uma mensagem para o WhatsApp; **não realiza reservas automáticas**.

## Performance (Etapa 9)

- O hero utiliza `srcset` e `sizes` com versões otimizadas para telas menores, preservando a composição original.
- O retrato da profissional e as fotos da galeria têm versões leves para dispositivos móveis.
- A galeria continua **manual**. Apenas a primeira foto é montada na renderização inicial do React; as demais são pré-carregadas individualmente ao aproximar a galeria da tela ou ao escolher uma foto. Isso evita baixar as cinco fotos na abertura do site.
- O CSS do Google Fonts foi movido do `@import` encadeado para um `<link>` no HTML, permitindo o download em paralelo com o CSS principal. As fontes continuam externas nesta etapa; não foram incluídos arquivos de fontes no projeto.
- O logotipo exibido pela aplicação usa WebP em largura adequada ao cabeçalho.
- Confira o impacto em `npm run build && npm run preview` e rode o Lighthouse Mobile em `http://localhost:4173/`. Compare três execuções antes/depois; a nota varia conforme rede, CPU e cache.

## Desenvolvimento e validação

Requer Node.js compatível com o Vite 8 e npm. Na raiz do projeto:

```bash
npm ci
npm run dev
npm run verify
npm run preview
```

`npm run verify` executa `check:content`, `check:publication`, testes Node (`npm test`), ESLint e build de produção. No GitHub, `.github/workflows/quality.yml` verifica pushes e pull requests. O comando `npm run preview` depende de um build anterior. Execute `npm audit --omit=dev` periodicamente para revisar vulnerabilidades de dependências de produção, avaliando cada alerta antes de modificar versões.

## Estrutura da página

A apresentação é deliberadamente curta e cada seção tem um papel distinto:

1. **Hero:** posicionamento do estúdio e primeiro agendamento; fotografia original mantida em `/images/pilates-pose.webp`.
2. **Serviços:** duas opções concretas — Pilates com aparelhos e Fisioterapia.
3. **Profissional:** retrato e qualificações de Jessica Edwirges Alves Silva. As três formações em destaque aparecem inicialmente; os outros nove cursos e eventos ficam recolhidos.
4. **Espaço:** carrossel com cinco fotos reais, setas, indicadores, swipe e teclado. Sem reprodução automática.
5. **Avaliações:** duas visíveis por padrão; outras duas mediante escolha da pessoa. As quatro notas individuais de cinco estrelas foram conferidas nas capturas originais, sem exibir nota média do estúdio. Os depoimentos são texto, não imagens clicáveis.
6. **FAQ:** perguntas sob demanda, sem expansão automática; o título não acompanha a rolagem.
7. **Localização:** endereço, mapa opcional com zoom inicial 15 e CTA de aula experimental no mesmo bloco. Em celulares, o mapa incorporado exige dois dedos para deslocar; o botão “Explorar no Google Maps” abre a navegação completa com gestos de toque convencionais.

Removemos a faixa de diferenciais, o segundo convite de agendamento dentro dos serviços e o CTA final isolado porque repetiam informações. O layout usa contrastes de seção e espaçamentos menores para reduzir a sensação de página interminável, sem retirar conteúdos importantes.

### Arquivos para manutenção

| Arquivo | Conteúdo |
|---|---|
| `src/data/site.js` | Endereço, WhatsApp, Instagram, serviços, avaliações, FAQ |
| `src/data/team.js` | Perfil real, registro profissional, formações e cursos |
| `src/data/gallery.js` | Sequência e descrições das cinco fotos |
| `src/App.jsx` | Seções, navegação e interações |
| `src/App.css` e `src/index.css` | Identidade visual, responsividade e tokens de cor |
| `src/components/BookingModal.jsx` | Formulário que prepara a mensagem WhatsApp |
| `src/components/PrivacyBanner.jsx` | Preferência de incorporação do Google Maps |
| `scripts/validate-content.mjs` | Checagem de conteúdo, imagens e avisos profissionais |
| `scripts/validate-publication.mjs` | Checagem de páginas, headers, âncoras e SEO básico |
| `public/_headers` | CSP e headers configurados para Cloudflare Pages |
| `scripts/postbuild-seo.mjs` | Canonical, sitemap, robots e URLs de compartilhamento |

## Privacidade e materiais originais

As **quatro capturas originais das avaliações não são arquivos públicos**. Não as coloque em `public/` nem faça commit de documentos originais com dados pessoais: guarde o material, autorizações e fotografias em alta resolução em uma pasta privada sob controle do estabelecimento. O código contém os textos e as notas **individuais** dos depoimentos, conferidas nas capturas originais e sujeitas à aprovação dos respectivos titulares. O site não exibe nota agregada que não tenha sido verificada.

Os dados digitados no formulário não são transmitidos a um servidor do site. O visitante decide se continua no WhatsApp. O mapa externo só é carregado com permissão; as preferências são armazenadas localmente e podem ser alteradas no rodapé. **As fontes visuais ainda são obtidas externamente pelo Google Fonts**, conforme informado na Política de Privacidade: a escolha “Não carregar mapa” controla apenas o mapa, não todas as conexões externas. Não há scripts de publicidade ou analytics na versão atual.

`public/privacidade.html` e `public/termos.html` descrevem o funcionamento atual, mas exigem aprovação e validação dos dados empresariais e jurídicos antes do lançamento. As páginas públicas não devem apresentar notas internas de preparação. Não presuma que este README substitui revisão legal ou profissional.

## Publicação com domínio

A hospedagem recomendada é Cloudflare Pages, com build `npm run build` e pasta de saída `dist`. Após comprar o domínio definitivo, configurar a variável `SITE_URL` com a **origem HTTPS canônica**, sem barra final, por exemplo:

```text
SITE_URL=https://dominio-oficial.com.br
```

Sem `SITE_URL`, o projeto não inventa domínio nem produz sitemap canônico. Após o deploy, confira redirecionamento entre `www` e domínio raiz, HTTPS, `Content-Security-Policy` e demais headers, status HTTP 404, páginas legais, prévia de compartilhamento e indexação. O arquivo `_headers` não é aplicado pelo servidor local do Vite.

## Pendências bloqueantes antes do lançamento

- **CREFITO da Jéssica:** o campo `credential` em `src/data/team.js` permanece vazio, pois o número não foi fornecido. A checagem de conteúdo avisa sobre isso, mas não impede desenvolvimento local. Não publique a identificação profissional sem confirmar os dados reais e requisitos aplicáveis.
- **Autorizações:** confirmar autorização de uso de retrato, imagens de terceiros, depoimentos com nome e respectivas qualificações.
- **Dados e conformidade:** validar telefone, endereço, serviços oferecidos, horários e textos de Privacidade/Termos com a responsável; verificar controlador de dados, finalidades e meios de atendimento às solicitações dos titulares.
- **Validação final:** `npm run verify`, `npm audit --omit=dev`, GitHub Actions, testes de largura 320/360/390/768/1024/1440, navegação com teclado, modal, mapa, links, console e Lighthouse mobile/desktop.
- **Infraestrutura:** registrar domínio na titularidade do estabelecimento, conectar DNS e HTTPS, definir `SITE_URL`, verificar Search Console e Perfil da Empresa, testar o ambiente público em dispositivos reais.

A aprovação técnica do código não comprova, por si só, autorização de imagem, cumprimento de normas profissionais nem conformidade integral com a LGPD.

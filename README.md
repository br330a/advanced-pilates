# Advanced Studio — site institucional

Site institucional do **Advanced Studio Pilates & Fisioterapia**, na Vila Prudente, São Paulo. Construído em React 19, Vite 8 e CSS próprio. A página é estática, sem backend: o formulário apenas prepara uma mensagem para o WhatsApp; **não realiza reservas automáticas**.

## Performance e tipografia

- O hero utiliza `srcset` e `sizes` com versões otimizadas para telas menores, preservando a composição original.
- O retrato da profissional e as fotos da galeria têm versões leves para dispositivos móveis.
- A galeria continua **manual**. Apenas a primeira foto é montada na renderização inicial do React; as demais são pré-carregadas individualmente ao aproximar a galeria da tela ou ao escolher uma foto. Isso evita baixar as cinco fotos na abertura do site.
- **Fontes locais:** DM Sans Variable, Manrope Variable e DM Serif Display Italic são instaladas pelo npm via Fontsource e incluídas pelo Vite nos arquivos gerados. Não há requisições ao Google Fonts durante a visita. São usadas versões variáveis para reduzir downloads de pesos diferentes, mantendo os tipos e pesos originais. Os pacotes incluem suas respectivas licenças de fontes.
- O logotipo exibido pela aplicação usa WebP em largura adequada ao cabeçalho.
- Confira o impacto em `npm run build && npm run preview` e rode o Lighthouse Mobile em `http://localhost:4173/`. Compare três execuções antes/depois; a nota varia conforme rede, CPU e cache.

## Desenvolvimento e validação

Requer Node.js compatível com o Vite 8 e npm. As fontes locais foram incorporadas na Etapa 10. Em uma máquina nova, execute `npm ci` usando o `package-lock.json` atualizado. Na raiz do projeto:

```bash
npm ci             # instala versões do package-lock.json
npm run verify     # valida testes, lint e gera dist/
npm run preview    # confira o build localmente
```

`npm run verify` executa `check:content`, `check:publication`, testes Node (`npm test`), ESLint e build de produção. No GitHub, `.github/workflows/quality.yml` verifica pushes e pull requests. O comando `npm run preview` depende de um build anterior. Execute `npm audit --omit=dev` periodicamente para revisar vulnerabilidades de dependências de produção, avaliando cada alerta antes de modificar versões.

## Estrutura da página

A apresentação é deliberadamente curta e cada seção tem um papel distinto:

1. **Hero:** posicionamento do estúdio e primeiro agendamento; fotografia original mantida em `/images/pilates-pose.webp`.
2. **Serviços:** duas opções concretas — Pilates com aparelhos e Fisioterapia.
3. **Profissional:** retrato, registro **CREFITO-3 190575-F** informado pela cliente e qualificações de Jessica Edwirges Alves Silva. As três formações em destaque aparecem inicialmente; os outros nove cursos e eventos ficam recolhidos.
4. **Espaço:** carrossel manual com cinco fotos reais, setas, indicadores, swipe e teclado. As fotos 1 e 3 foram substituídas pelas imagens selecionadas pela responsável em 23/11/2026. Ambas possuem versões responsivas de 480/960 px (e original otimizado). Sem reprodução automática.
5. **Avaliações:** duas visíveis por padrão; outras duas mediante escolha da pessoa. As quatro notas individuais de cinco estrelas foram conferidas nas capturas originais, sem exibir nota média do estúdio. Autores exibidos somente com primeiro nome e inicial do último sobrenome; os textos não são imagens clicáveis.
6. **FAQ:** quatro perguntas reais indicadas pelo estúdio: planos/valores, TotalPass/Wellhub (não aceitos), limite de quatro alunos por sessão de Pilates e atendimento de segunda a sábado com horários sob consulta. A grade diária não é publicada, pois pode variar. Os planos mensal, trimestral e semestral também aparecem no cartão de Pilates. O título do FAQ não acompanha a rolagem.
7. **Localização:** endereço, mapa opcional com zoom inicial 15 e CTA de aula experimental no mesmo bloco. Em celulares, o mapa incorporado exige dois dedos para deslocar; o botão “Explorar no Google Maps” abre a navegação completa com gestos de toque convencionais.

Removemos a faixa de diferenciais, o segundo convite de agendamento dentro dos serviços e o CTA final isolado porque repetiam informações. O layout usa contrastes de seção e espaçamentos menores para reduzir a sensação de página interminável, sem retirar conteúdos importantes.

### Arquivos para manutenção

| Arquivo | Conteúdo |
|---|---|
| `src/data/site.js` | Endereço, WhatsApp, Instagram, serviços, avaliações, FAQ |
| `src/data/team.js` | Perfil real, registro profissional, formações e cursos |
| `src/data/gallery.js` | Sequência e descrições das cinco fotos |
| `src/App.jsx` | Seções, navegação e interações |
| `src/App.css` e `src/index.css` | Identidade visual, responsividade e tokens de cor; famílias variáveis |
| `src/main.jsx` | Importações do Fontsource incorporadas ao build do Vite |
| `src/components/BookingModal.jsx` | Formulário que prepara a mensagem WhatsApp |
| `src/components/PrivacyBanner.jsx` | Preferência de incorporação do Google Maps |
| `scripts/validate-content.mjs` | Checagem de conteúdo, imagens e avisos profissionais |
| `scripts/validate-publication.mjs` | Checagem de páginas, headers, âncoras e SEO básico |
| `public/_headers` | CSP e headers configurados para Cloudflare Pages |
| `scripts/postbuild-seo.mjs` | Canonical, sitemap, robots e URLs de compartilhamento |

## Privacidade e materiais originais

As **quatro capturas originais das avaliações não são arquivos públicos**. Não as coloque em `public/` nem faça commit de documentos originais com dados pessoais: guarde o material, autorizações e fotografias em alta resolução em uma pasta privada sob controle do estabelecimento. O código contém os textos e as notas **individuais** dos depoimentos, conferidas nas capturas originais e sujeitas à aprovação dos respectivos titulares. O site não exibe nota agregada que não tenha sido verificada. Os sobrenomes exibidos foram reduzidos a iniciais por pedido da responsável; essa abreviação não torna os relatos necessariamente anônimos.

Os dados digitados no formulário não são transmitidos a um servidor do site. O visitante decide se continua no WhatsApp. O mapa externo só é carregado com permissão; as preferências são armazenadas localmente e podem ser alteradas no rodapé. **As fontes são hospedadas junto do site** e não fazem requisições ao Google Fonts: a escolha “Não carregar mapa” controla a incorporação do mapa de terceiros. Não há scripts de publicidade ou analytics na versão atual.

`public/privacidade.html` e `public/termos.html` descrevem o funcionamento atual, mas exigem aprovação e validação dos dados empresariais e jurídicos antes do lançamento. As páginas públicas não devem apresentar notas internas de preparação. Não presuma que este README substitui revisão legal ou profissional.

## Publicação com domínio

A hospedagem recomendada é Cloudflare Pages, com build `npm run build` e pasta de saída `dist`. Após comprar o domínio definitivo, configurar a variável `SITE_URL` com a **origem HTTPS canônica**, sem barra final, por exemplo:

```text
SITE_URL=https://dominio-oficial.com.br
```

Sem `SITE_URL`, o projeto não inventa domínio nem produz sitemap canônico. Após o deploy, confira redirecionamento entre `www` e domínio raiz, HTTPS, `Content-Security-Policy` e demais headers, status HTTP 404, páginas legais, prévia de compartilhamento e indexação. O arquivo `_headers` não é aplicado pelo servidor local do Vite.

## Pendências bloqueantes antes do lançamento

- **CREFITO da Jéssica:** a responsável informou `190575-F`, exibido no site como `CREFITO-3 190575-F` e validado quanto ao formato pelo script. Antes de divulgar oficialmente, confira a identificação com a profissional e, se necessário, perante o conselho; o script não verifica registros em bases externas.
- **Autorizações:** a cliente encaminhou uma cláusula contratual de cessão de imagem para homepage e divulgação. Confirmar que **cada pessoa fotografada** efetivamente assinou o documento aplicável e que o uso específico está abrangido; essa cláusula não comprova automaticamente autorização de **texto de depoimento**, que precisa de validação separada. O retrato e as qualificações profissionais também exigem aprovação da própria profissional.
- **Dados e conformidade:** validar telefone, endereço, serviços oferecidos, horários e textos de Privacidade/Termos com a responsável; verificar controlador de dados, finalidades e meios de atendimento às solicitações dos titulares.
- **Validação final:** `npm run verify`, `npm audit --omit=dev`, GitHub Actions, testes de largura 320/360/390/768/1024/1440, navegação com teclado, modal, mapa, links, console e Lighthouse mobile/desktop.
- **Infraestrutura:** registrar domínio na titularidade do estabelecimento, conectar DNS e HTTPS, definir `SITE_URL`, verificar Search Console e Perfil da Empresa, testar o ambiente público em dispositivos reais.

A aprovação técnica do código não comprova, por si só, autorização de imagem, cumprimento de normas profissionais nem conformidade integral com a LGPD.

## Ajustes de conteúdo e fotos — 23/11/2026

- Fotografia do hero **mantida**, com `object-position` priorizando o rosto em desktop e mobile (sem alterar a imagem original). Se o rosto ainda estiver cortado em um aparelho específico, ajuste somente `.hero-image-shape img` em `src/App.css`.
- Arquivos da galeria substituídos **nas mesmas posições** (`public/images/01-estudio*.webp` e `03-ambiente*.webp`): novas fotos com EXIF removido, versões 480/960 px e original otimizado. A primeira é vertical; o enquadramento amplo do carrossel recorta o topo e a base, por isso sua `position` é configurada em `src/data/gallery.js`.
- Para alterar títulos/alt/ordem das imagens, editar `src/data/gallery.js`, mantendo sincronizados `srcSet`, dimensões e arquivos correspondentes.
- Planos, não aceitação de TotalPass/Wellhub, máximo de quatro alunos/sessão de Pilates e atendimento de segunda a sábado são dados informados pela cliente. Confirmar informações periodicamente em `src/data/site.js`.

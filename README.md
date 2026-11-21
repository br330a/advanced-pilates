# Advanced Studio — Pilates & Fisioterapia

Landing page do Advanced Studio, na Vila Prudente (São Paulo), desenvolvida com React, Vite e CSS próprio.

## Como executar

Requer Node.js compatível com Vite 8 (Node 20.19+ ou 22.12+).

```bash
npm ci
npm run dev
```

Validação antes de publicar:

```bash
npm run check:content
npm run lint
npm run build
npm run preview
```

## Domínio e SEO

Para gerar **canonical, OG URL e sitemap** com seu domínio real durante o build, defina `SITE_URL` (domínio HTTPS público, sem barra final):

```bash
SITE_URL=https://www.seudominio.com.br npm run build
```

Sem `SITE_URL`, o projeto compila normalmente, mas não cria URLs canônicas ou sitemap com endereços inventados. A imagem de compartilhamento está em `public/images/social-preview.webp`.

## Onde editar

- `src/data/site.js`: telefone, endereço, Instagram, modalidades, dúvidas e avaliações.
- `src/App.jsx`: seções e ordem de apresentação.
- `src/App.css`, `src/index.css`: toda a identidade visual e os estilos responsivos.
- `src/components/BookingModal.jsx`: formulário que gera mensagem para o WhatsApp (não cria reservas nem armazena dados).
- `public/brand-color.png`, `public/brand-black.png`: logos exportados dos PDFs oficiais fornecidos.
- `public/images/`: fotos e capturas originais das avaliações fornecidas pelo estúdio.

## Antes de publicar

1. Conferir todos os dados comerciais (endereço, telefone, serviços, horários e equipe).
2. Validar autorização para uso das fotos de pessoas e depoimentos; confirmar se é permitido reproduzir as avaliações.
3. Revisar os textos com os responsáveis pelos serviços de saúde, especialmente afirmações clínicas.
4. Configurar domínio final por `SITE_URL`, publicar e verificar o sitemap.
5. Testar navegação, formulário de WhatsApp, menu mobile e mapa em celulares reais.

### Contato / privacidade

O formulário não envia dados a um servidor próprio. Após o clique, ele cria uma URL do WhatsApp com os dados informados, para que a pessoa escolha enviar a mensagem. O mapa do Google é carregado só com consentimento por clique. Fontes do Google Fonts são carregadas remotamente.


## Segunda etapa — equipe e revisão de UX

**Equipe:** os componentes estão implementados, mas **não aparecem no site público** enquanto
`src/data/team.js` não tiver profissionais reais, com dados e fotos autorizados.

Para visualizar os 3 cartões demonstrativos SOMENTE no servidor de desenvolvimento local:

```bash
npm run dev
# Acesse http://localhost:5173/?equipe-preview=1
```

Esse modo depende de `import.meta.env.DEV` e não existe na versão de produção.
Quando as fotos chegarem, exporte-as em WebP (ideal: aproximadamente 900 × 1125 px,
proporção 4:5), salve em `public/images/equipe/` e preencha `teamMembers` com nomes,
funções, especialidades, registros aplicáveis e descrições confirmadas.
A navegação adiciona “Equipe” automaticamente quando há integrantes cadastrados.

**Jornada:** os CTAs de Pilates e Fisioterapia abrem o formulário com o interesse
correspondente já selecionado. A etapa “Como começar” explica o fluxo sem prometer
agendamento automático.

**Privacidade:** há uma página em `/privacidade.html` descrevendo tecnicamente o
site atual e os serviços externos. A equipe deve validá-la antes de publicar.

**Fotos pendentes:** substituir as atuais pelas fotografias profissionais
selecionadas, com autorização de imagem e recortes adequados a cada seção.

**Checagem antes do commit:**

```bash
npm ci
npm run lint
npm run build
```

Você também pode executar `npm run verify` para validar conteúdo, lint e build de uma vez.

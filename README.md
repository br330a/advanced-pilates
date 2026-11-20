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

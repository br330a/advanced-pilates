# Advanced Studio — site institucional

Landing page do **Advanced Studio Pilates & Fisioterapia**, em Vila Prudente, São Paulo.
Projeto estático em React 19 + Vite 8, com CSS próprio. O contato é iniciado via WhatsApp; **não existe banco de dados nem reserva automática**.

## Como executar

Requisitos: Node.js compatível com o Vite 8 e npm.

```bash
npm ci
npm run dev
```

Verifique as mudanças antes de registrar o commit:

```bash
npm run verify
```

O comando executa validação de conteúdo, verificações de publicação, testes do formulário, ESLint e build. No GitHub Actions, ele roda automaticamente em pushes/PRs para `main`.

Comandos separados: `npm run check:content`, `npm run check:publication`, `npm test`, `npm run lint`, `npm run build`, `npm run preview`.

## Etapa 5 — fotografias e apresentação profissional

Esta atualização foi planejada para **encurtar a página sem perder credibilidade**:

- Mantém a fotografia original do **hero** (`/images/pilates-pose.webp`), conforme solicitado.
- Substitui a antiga galeria por **cinco fotografias reais** em um carrossel de navegação manual (setas, botões de seleção, swipe e teclado, **sem autoplay**).
- Mostra **Jessica Edwirges Alves Silva**, usando seu retrato enviado e uma seção editorial (em lugar dos cartões genéricos de equipe).
- Exibe as **três formações principais** e recolhe os **nove cursos e eventos adicionais** em um elemento expansível.
- Incorpora a descrição do estúdio à galeria e aos serviços, retirando as antigas seções separadas de "Sobre" e "Como começar".
- Mantém quatro depoimentos como texto sem links para prints, agendamento pelo WhatsApp, mapa por escolha de privacidade, FAQ, páginas legais e infraestrutura de qualidade.

**Fontes:** informações de formação e curso fornecidas pelo estúdio em 22/11/2026; fotografias de `imagens.zip` e foto ampla recebida na conversa. Fotos foram reduzidas e convertidas para WebP, sem alterar o conteúdo das cenas. Os originais em alta definição devem ser arquivados pela responsável fora do repositório.

### Arquivos importantes

- `src/data/site.js`: telefone, endereço, Instagram, serviços, perguntas e avaliações.
- `src/data/team.js`: nome, cargo, biografia, três formações em destaque e cursos/eventos adicionais da Jessica.
- `src/data/gallery.js`: sequência, legendas, descrições e enquadramento das cinco fotografias.
- `public/images/01-estudio.webp` a `05-identidade.webp`: fotografias do carrossel.
- `public/images/jessica-edwirges.webp`: retrato da profissional.
- `src/App.jsx` e `src/App.css`: apresentação e responsividade.

**PENDÊNCIA IMPORTANTE ANTES DA PUBLICAÇÃO:** confirmar **o número de registro CREFITO** da Jessica e a grafia preferida do nome profissional, além de conferir cursos, autorizações de imagem e avaliações com a responsável. O número não foi fornecido e **não foi inventado nem colocado como placeholder público**. A verificação de conteúdo emite um aviso, sem impedir o desenvolvimento local. Se houver qualquer divergência, ajuste o cadastro antes de usar o site comercialmente.

O parâmetro antigo `?equipe-preview=1` não é mais necessário: a seção da profissional contém dados reais fornecidos e já aparece normalmente no site.

## Privacidade e segurança

- O formulário prepara a mensagem no navegador e só a transmite após confirmação pelo WhatsApp. Não existe backend nem armazenamento próprio dos campos.
- A pessoa deve marcar a ciência sobre privacidade antes de seguir; o texto de observação orienta a não informar dados sensíveis.
- A preferência sobre o carregamento do Google Maps fica no armazenamento local. Recusar mantém a incorporação bloqueada; o visitante ainda pode abrir o Google Maps por um link externo de forma independente. No rodapé há opção para alterar essa decisão.
- `public/_headers` configura CSP e headers para **Cloudflare Pages**. É necessário conferir esses headers na URL pública depois do deploy. O servidor local do Vite não aplica esse arquivo.
- `public/404.html` é a página de erro para hospedagem estática compatível (Cloudflare Pages). `public/termos.html` e `public/privacidade.html` são páginas informativas e requerem aprovação da responsável antes do lançamento.
- A página não inclui scripts de anúncios ou analytics. O Google Fonts é solicitado externamente. Reavalie consentimento e política de privacidade se isso mudar.
- Anti-SQL Injection, rate limiting e CAPTCHA de servidor não são aplicáveis na arquitetura estática sem backend. Se for acrescentado um serviço de formulário, essas proteções deverão ser implementadas nele.

## SEO e domínio

O build usa `scripts/postbuild-seo.mjs`. Sem `SITE_URL`, o projeto **não inventa** URL canônica nem gera sitemap. Quando o domínio definitivo estiver ativo, configure a variável de ambiente na hospedagem (somente origem HTTPS):

```
SITE_URL=https://seudominio.com.br
```

O script gera canonical, `og:url`, URLs absolutas da imagem social, `sitemap.xml` e `robots.txt`, incluindo as páginas institucionais e legais. Confira qual versão com/sem `www` deve ser a oficial e configure o redirecionamento de domínio na plataforma de hospedagem.

**Ainda pendente de configuração externa:** compra do `.com.br`, conexão de DNS/HTTPS, configuração de `SITE_URL`, verificação no Google Search Console, atualização/verificação do Perfil da Empresa no Google, revisão jurídica, dados oficiais do estabelecimento, autorizações de uso de imagem e depoimentos, confirmação do CREFITO, do nome profissional e das autorizações.

## Checklist antes de publicar

1. Confirmar telefone, endereço, serviços e oferta de aula experimental com a responsável.
2. Confirmar informações legais e do controlador, autorização de imagens, avaliações e equipe; aprovar Termos e Privacidade.
3. Conferir em desktop/mobile o enquadramento das fotos novas, a navegação manual do carrossel e a expansão da formação da Jessica; validar registro CREFITO antes de publicar.
4. Rodar `npm run verify` e conferir o workflow verde no GitHub.
5. Testar visualmente o site nas larguras 320, **360**, 390, 768, 1024 e 1440 px, sem rolagem horizontal.
6. Testar teclado, foco, menu mobile, o modal, recusa e aceitação do mapa e alternativas quando WhatsApp/Maps forem bloqueados.
7. Publicar em hospedagem para uso comercial, verificar CSP/headers na resposta real e validar página 404 em URL inexistente.
8. Configurar domínio, `SITE_URL`, SEO social, sitemap, Search Console e Perfil da Empresa.
9. Executar Lighthouse/PageSpeed em dispositivos reais e revisar desempenho, acessibilidade e links.
10. Registrar a titularidade do domínio na conta da responsável e ativar autenticação em dois fatores nos serviços relacionados.

A lista não é uma garantia automática de conformidade legal ou de aprovação em auditorias externas: é um roteiro verificável de publicação.

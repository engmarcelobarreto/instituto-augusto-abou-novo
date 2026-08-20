# Instituto Augusto Abou — Site institucional (proposta nova)

Site estático multi-página (HTML/CSS/JS, sem build), construído do zero com identidade visual própria
(cores e tipografia diferentes da revisão anterior), voltada à missão real do Instituto: apoio a
pacientes com câncer (Casa de Apoio) e incentivo à doação de medula óssea.

Este projeto é independente do repositório `instituto-augusto-abou-site` (que contém a revisão do
site antigo, mantendo o layout/paleta original). Os dois ficam publicados em domínios provisórios
separados na Hostinger para comparação lado a lado.

## Identidade visual

- Paleta: vermelho suave `#E8384F` + verde-água `#3AA6A6` + dourado `#FFC24B`, sobre fundo creme `#FFFBF7`
- Tipografia: [Baloo 2](https://fonts.google.com/specimen/Baloo+2) (títulos, arredondada) + [Nunito](https://fonts.google.com/specimen/Nunito) (texto)
- Conteúdo informado pelo Instagram real do Instituto (@institutoaugustoabou): Casa de Apoio
  (alimentação, transporte, medicamentos), eventos beneficentes (feijoadas, bazares, galas) e a
  causa original de doação de medula óssea

## Estrutura

```
index.html                 Início (hub)
sobre.html                  Sobre o Instituto
casa-de-apoio.html          Casa de Apoio a pacientes com câncer
seja-doador.html            Como ser doador (educativo + links oficiais REDOME)
como-ajudar.html            Doação financeira, itens, eventos, voluntariado
contato.html                 Formulário + mapa
privacidade.html             Política de Privacidade (LGPD)
termos.html                   Termos de Uso
diretrizes-whatsapp.html      Diretrizes de comunicação (WhatsApp Business API / Meta)
partials/
  nav.html                    Menu, injetado via fetch em todas as páginas
  footer.html                  Rodapé, injetado via fetch em todas as páginas
assets/
  css/styles.css
  js/main.js                  Menu mobile, scroll reveal, copiar PIX, formulário
  js/include.js                 Injeta nav/footer e marca o link ativo do menu
  img/logo.png                  Logo oficial completa (fundo escuro)
  img/mascote.png                Ícone da gotinha, recortado do logo (funciona em qualquer fundo)
robots.txt
sitemap.xml
```

## Rodando localmente

O menu e o rodapé são carregados via `fetch` (`assets/js/include.js`), então **é preciso servir os arquivos por HTTP**:

```bash
python3 -m http.server 8080
# depois acesse http://localhost:8080
```

## Formulário de contato

O formulário (em `contato.html`) usa [Formspree](https://formspree.io) (sem backend próprio). Antes de publicar em produção,
crie um formulário gratuito no Formspree e troque `SEU_FORM_ID` no atributo `action` do `<form id="contactForm">`.

## Conteúdo pendente de revisão do Instituto

- Fotos reais (da Casa de Apoio, eventos, mascote oficial) — o site usa apenas o logo oficial e ícones,
  já que não temos direitos sobre as fotos/arte publicadas no Instagram
- Critérios e processo de acolhimento na Casa de Apoio (hoje a página direciona para o Contato)
- `sobre.html`: história de fundação em mais detalhes, equipe/voluntários e números reais de impacto

## Deploy

Deploy automático via GitHub Actions (`.github/workflows/deploy.yml`) para a Hostinger a cada push na `main`.

Fluxo de trabalho:

```bash
git checkout -b feature/nome-da-feature
# ... alterações ...
git push -u origin feature/nome-da-feature
gh pr create
# após aprovação e merge na main, o deploy acontece automaticamente
```

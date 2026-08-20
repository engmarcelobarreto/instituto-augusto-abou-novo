# Instituto Augusto Abou — Site institucional (proposta nova)

Site estático multi-página (HTML/CSS/JS, sem build), construído do zero com identidade visual própria
(cores e tipografia diferentes da revisão anterior), voltada à missão real do Instituto: apoio a
pacientes com câncer (Casa de Apoio) e incentivo à doação de medula óssea.

Este projeto é independente do repositório `instituto-augusto-abou-site` (que contém a revisão do
site antigo, mantendo o layout/paleta original). Os dois ficam publicados em domínios provisórios
separados na Hostinger para comparação lado a lado.

## Status atual (20/08/2026)

- PR aberto, ainda não mergeado na `main`: https://github.com/engmarcelobarreto/instituto-augusto-abou-novo/pull/1
- Publicado para revisão em: https://firebrick-hamster-255801.hostingersite.com/
- Paleta de cores ainda em decisão — ver seletor provisório abaixo
- Deploy automático (GitHub Actions → Hostinger) configurado mas **inativo**: faltam os secrets de FTP

### Próximos passos
1. Decidir a paleta final (usar o seletor provisório) e remover o seletor do código
2. Configurar `FTP_SERVER` / `FTP_USERNAME` / `FTP_PASSWORD` nos secrets do repositório
3. Criar conta no Formspree e substituir `SEU_FORM_ID` em `contato.html`
4. Revisar com o Instituto: critérios de acolhimento na Casa de Apoio, história de fundação, fotos adicionais
5. Mergear o PR na `main` quando o conteúdo estiver aprovado

## Identidade visual

- Paleta padrão: vermelho suave `#E8384F` + verde-água `#3AA6A6` + dourado `#FFC24B`, sobre fundo creme `#FFFBF7`
- Tipografia: [Baloo 2](https://fonts.google.com/specimen/Baloo+2) (títulos, arredondada) + [Nunito](https://fonts.google.com/specimen/Nunito) (texto)
- Conteúdo informado pelo Instagram real do Instituto (@institutoaugustoabou): Casa de Apoio
  (alimentação, transporte, medicamentos), eventos beneficentes (feijoadas, bazares, galas) e a
  causa original de doação de medula óssea
- Foto da sede (`assets/img/sede-instituto.jpg`) recortada de post do Instagram oficial — só usamos
  essa foto (fachada/placa, sem pessoas identificáveis); nenhuma outra foto do Instagram foi
  reaproveitada por não termos direitos de uso sobre fotos com pessoas (pacientes, voluntários, eventos)

### Seletor provisório de paleta
Widget flutuante (canto inferior esquerdo, `assets/js/include.js` + regras `[data-palette]` em
`assets/css/styles.css`) para comparar ao vivo as 3 propostas de cor discutidas: vermelho acolhedor
(padrão), rosa e azul suaves, coral e turquesa. É só uma ferramenta de decisão — **remover antes de
ir para produção** (a escolha final deve virar a única paleta em `:root`).

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
  css/styles.css               Inclui paleta padrão + 2 paletas alternativas + seletor provisório
  js/main.js                   Menu mobile, scroll reveal, copiar PIX, formulário
  js/include.js                  Injeta nav/footer, marca link ativo do menu, monta o seletor de paleta
  img/logo.png                   Logo oficial completa (fundo escuro)
  img/mascote.png                 Ícone da gotinha, recortado do logo (funciona em qualquer fundo)
  img/sede-instituto.jpg          Foto real da fachada da sede (Instagram oficial)
robots.txt
sitemap.xml
```

## Rodando localmente

O menu e o rodapé são carregados via `fetch` (`assets/js/include.js`), então **é preciso servir os arquivos por HTTP**:

```bash
python3 -m http.server 8080
# depois acesse http://localhost:8080
```

## Cache-busting

Os links de CSS/JS levam uma query string de versão (`assets/css/styles.css?v=2`, etc.). Como o
deploy sobrescreve os mesmos nomes de arquivo a cada push, sem isso o navegador do usuário pode
continuar servindo uma cópia antiga em cache. **Sempre que alterar `styles.css`, `main.js` ou
`include.js`, incremente o `?v=N` em todas as páginas HTML que os referenciam.**

## Formulário de contato

O formulário (em `contato.html`) usa [Formspree](https://formspree.io) (sem backend próprio). Antes de publicar em produção,
crie um formulário gratuito no Formspree e troque `SEU_FORM_ID` no atributo `action` do `<form id="contactForm">`.

## Deploy

Deploy automático via GitHub Actions (`.github/workflows/deploy.yml`) para a Hostinger a cada push na `main`
— **ainda não ativo**, faltam os secrets de FTP (ver "Próximos passos" acima). Até lá, o deploy é manual
via MCP da Hostinger.

Fluxo de trabalho:

```bash
git checkout -b feature/nome-da-feature
# ... alterações ...
git push -u origin feature/nome-da-feature
gh pr create
# após aprovação e merge na main, o deploy acontece automaticamente
```

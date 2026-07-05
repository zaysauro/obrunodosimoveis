# Landing page Minha Casa Minha Vida

Site estático para captação de leads interessados em financiar imóvel pelo
Minha Casa Minha Vida em Curitiba e região metropolitana.

## Arquivos

- `index.html`: estrutura da landing page.
- `styles.css`: estilos responsivos mobile-first.
- `script.js`: máscara de WhatsApp, máscara de renda, geração da mensagem e cópia dos dados.

## Publicação no GitHub Pages

Este projeto não usa backend, banco de dados, Firebase, framework, npm, Vite,
React ou ferramenta de build. Para publicar, basta configurar o GitHub Pages
para servir a branch desejada a partir da raiz do repositório.

## Funcionamento do formulário

Ao enviar o formulário, o JavaScript monta uma mensagem com as respostas do lead,
codifica o texto com `encodeURIComponent()` e abre o WhatsApp em:

```text
https://wa.me/5541995995844?text=
```

Também há um botão alternativo para copiar os dados do lead para a área de
transferência.

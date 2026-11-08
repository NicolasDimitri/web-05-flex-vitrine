# Projeto 05 – Vitrine Flex (HTML + CSS) · Nível ⭐⭐ Aquecimento

Treino de **Flexbox** em três escalas: uma barra em linha (topbar), uma grade de cards que quebra de linha sozinha (`flex-wrap`) e a página inteira em coluna (rodapé sempre embaixo).

Crie `index.html` e `style.css` aqui na raiz.

> 🎯 **Desafio extra:** nada de `@media` neste exercício. Todo o comportamento responsivo deve vir do próprio Flexbox.

**Estrutura HTML obrigatória**

```html
<body>
  <header class="topbar">
    <a class="logo" href="#">Minha Loja</a>
    <nav class="menu">
      <ul>
        <li><a href="#">Início</a></li>
        <!-- 4 ou mais links -->
      </ul>
    </nav>
    <a class="btn-login" href="#">Entrar</a>
  </header>

  <main class="container">
    <h1>Destaques</h1>
    <section class="cards">
      <article class="card">
        <h2>Título</h2>
        <p>Descrição</p>
        <a class="btn" href="#">Comprar</a>
      </article>
      <!-- 6 ou mais cards -->
    </section>
  </main>

  <footer class="rodape">
    <span>© 2026 Minha Loja</span>
    <span>Feito com Flexbox</span>
  </footer>
</body>
```

**Requisitos**

1. **R1** – Base do HTML: doctype, `lang="pt-BR"`, charset UTF-8, `<title>` e `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
2. **R2** – CSS não vazio no arquivo externo `style.css`, ligado no `<head>` por `<link rel="stylesheet" href="style.css">`; sem `style=""` e sem bloco `<style>`. O CSS deve implementar os comportamentos pedidos nos requisitos seguintes.
3. **R3** – A estrutura HTML inclui `header.topbar` (logo, menu com 4+ links e botão Entrar), `main.container` com um `<h1>` e uma seção `.cards` com 6+ cards completos (cada um com `h2`, `p` e `a.btn`), e `footer.rodape` com 2+ elementos.
4. **R4** – `body` com `margin: 0`; `box-sizing: border-box` em `.card`, `.container` e `.topbar`.
5. **R5** – O rodapé fica sempre colado no fim da tela, **mesmo com pouco conteúdo** (o `body` é um flex em coluna e o `main` cresce para ocupar o que sobra).
6. **R6** – `.topbar` em Flexbox com `align-items: center`: logo à esquerda, menu logo depois e o botão "Entrar" encostado na direita.
7. **R7** – `.menu ul` em Flexbox, com todos os links na mesma linha, `gap` horizontal de 8px ou mais, sem bolinhas; os links não devem ter sublinhado.
8. **R8** – `.cards` em Flexbox com `flex-wrap: wrap` e `gap` de 16px ou mais.
9. **R9** – `.container` centralizado e com `max-width` de no máximo 1100px (em 1280px de tela ele deve ter pelo menos 600px de largura).
10. **R10** – Em 1280px: **3 cards por linha**, todos com a mesma largura e preenchendo a linha inteira.
11. **R11** – Sem `@media`: em 768px ficam **2 cards por linha**; em 375px fica **1 card por linha**, todos alinhados entre si e ocupando quase toda a largura disponível (menos de 40px de diferença em relação à área de `.cards`), sem rolagem horizontal.
12. **R12** – Os cards da mesma linha devem ter a **mesma altura**. Cada `.card` usa `display: flex` e `flex-direction: column`, para que os botões dos cards da mesma linha terminem na **mesma altura**, mesmo com descrições de tamanhos diferentes. Escreva as descrições dos 3 primeiros cards com uma diferença de pelo menos 40 caracteres entre a menor e a maior.
13. **R13** – Em cada card, o botão `.btn` não ocupa a largura toda: deve ser **mais de 40px mais estreito** que o card.
14. **R14** – `.rodape` em Flexbox com os textos nas pontas (`space-between`) e centralizados na vertical.
15. **R15** – O CSS não contém nenhuma regra `@media`.

<details>
<summary>💡 Dicas (abra só se travar)</summary>

**Nível 1 – Pensando em Flexbox**
- Todo container flex tem um **eixo principal** (a direção em que os itens se alinham) e um **eixo cruzado** (a outra direção). Antes de escolher a propriedade, decida de que eixo você está falando.
- Para o rodapé: pergunte-se "quem manda no `body`?" e "quem deve crescer para ocupar o que sobra?".
- Para cards que quebram de linha sozinhos você precisa de três coisas: permitir a quebra, definir um tamanho ideal e permitir crescer. A abreviação `flex` junta crescer, encolher e tamanho ideal.

**Nível 2 – Nomes das ferramentas**
- Empurrar um item para a ponta oposta: uma margem automática num dos lados (`margin-left: auto`) absorve todo o espaço livre.
- Tamanho ideal do card: tente `flex-basis` entre 250px e 350px.
- Cada `.card` também pode ser um container flex (em coluna). Dentro dele, `margin-top: auto` empurra o botão para baixo e `align-self` impede que ele estique.
- Se algo estourar a tela em 375px, olhe a `.topbar`: ela também precisa poder quebrar de linha.

**Ferramenta de ouro:** abra o navegador com **F12**, ative o ícone de celular/tablet e teste 768px e 375px. No inspetor, os elementos flex mostram um selo `flex` que desenha o container.
</details>

---

## Como entregar

1. Clone o repositório: `git clone https://github.com/NicolasDimitri/web-05-flex-vitrine.git` e entre na pasta.
2. Crie uma branch: `git switch -c meu-projeto`
3. Crie os arquivos pedidos aqui na raiz, ao lado deste README.
4. `git add .` → `git commit -m "mensagem"` → `git push -u origin meu-projeto`
5. No GitHub, clique em **Compare & pull request** → **Create pull request**.
6. A cada commit, o robô adiciona **um novo comentário** no PR com uma **tabela de requisitos** (✅ passou / ❌ não passou, com a dica do que falta) e a **porcentagem concluída**.
   Os comentários anteriores ficam como histórico do seu progresso. Corrija, faça novo commit + `git push` e uma nova tabela aparece.
7. Com tudo ✅, sua entrega está concluída. **O PR não será mesclado na `main`**: ele fica aberto só para a avaliação e para o instrutor revisar.

## Testar no seu computador (opcional)

```bash
npm install
npx playwright install --with-deps chromium   # só na primeira vez
npm test
```

> Não altere as pastas `tests/`, `scripts/` e `.github/`.

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
2. **R2** – O arquivo `style.css` deve ter mais de 300 caracteres e ser ligado no `<head>` por `<link rel="stylesheet" href="style.css">`; não use atributos `style=""` nem bloco `<style>` no HTML.
3. **R3** – Dentro de `<body>`, crie um `<header class="topbar">` com `<a class="logo">`, um `<nav class="menu">` contendo ao menos 4 links (`ul > li > a`) e `<a class="btn-login">`. Crie também `<main class="container">` com um `<h1>` e uma `<section class="cards">` que contenha ao menos 6 `<article class="card">`; cada card deve ter `<h2>`, `<p>` e `<a class="btn">`. Finalize com `<footer class="rodape">` contendo ao menos 2 elementos filhos.
4. **R4** – `body` com `margin: 0`; `box-sizing: border-box` em `.card`, `.container` e `.topbar`.
5. **R5** – Com pouco conteúdo, o rodapé deve terminar no fim da janela (800px de altura no teste), sem rolagem vertical desnecessária. Para isso, use `body` como Flexbox em coluna, com `min-height: 100vh`, e faça o `main` crescer para ocupar o espaço livre.
6. **R6** – `.topbar` deve usar Flexbox e `align-items: center`. Mantenha logo, menu e botão Entrar nessa ordem e alinhados verticalmente; o logo deve ficar a até 60px da borda esquerda e o botão Entrar a até 60px da borda direita.
7. **R7** – `.menu ul` deve usar Flexbox, manter os itens na mesma linha, ter `gap` horizontal de pelo menos 8px e não exibir marcadores. Os links do menu não devem ter sublinhado.
8. **R8** – `.cards` deve usar Flexbox com `flex-wrap: wrap` e espaçamento de pelo menos 16px tanto entre colunas quanto entre linhas.
9. **R9** – `.container` centralizado e com `max-width` de no máximo 1100px (em 1280px de tela ele deve ter pelo menos 600px de largura).
10. **R10** – Em uma janela de 1280px, os 3 primeiros cards devem ficar na mesma linha e ter a mesma largura; o 4º deve começar a linha seguinte, e os cards devem crescer para preencher a largura da área `.cards`.
11. **R11** – Sem usar `@media`, em 768px os cards devem ficar **2 por linha**. Em 375px, devem ficar **1 por linha**, alinhados à esquerda e cada card deve ser menos de 40px mais estreito que a área `.cards`; a página não deve ter rolagem horizontal.
12. **R12** – As descrições dos 3 primeiros cards devem ter comprimentos diferentes, com diferença de pelo menos 40 caracteres entre a maior e a menor. Os cards dessa linha devem ter a mesma altura e usar `display: flex` com `flex-direction: column`, para que os botões terminem na **mesma altura**.
13. **R13** – Em cada card, o botão `.btn` deve ser mais de 40px mais estreito que o card; não deve esticar até as bordas.
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

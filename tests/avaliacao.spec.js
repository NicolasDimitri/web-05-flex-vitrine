const { test, expect } = require('@playwright/test');
const { ler, abrir, estilo, rects, overflowX, quemEstoura, perto, semComentarios, px, transparente } = require('./helpers');

test.beforeEach(async ({ page }) => {
  await abrir(page);
});

test('R1 – Base do HTML: doctype, lang pt-BR, charset UTF-8, <title> e viewport', async ({ page }) => {
  expect(ler(), 'Falta <!DOCTYPE html>').toMatch(/^\s*<!doctype html>/i);
  const info = await page.evaluate(() => ({
    lang: document.documentElement.getAttribute('lang'),
    charset: document.querySelector('head meta[charset]')?.getAttribute('charset') || '',
    title: document.title.trim(),
    viewport: document.querySelector('head meta[name="viewport"]')?.getAttribute('content') || '',
  }));
  expect(info.lang, 'Falta lang="pt-BR"').toBe('pt-BR');
  expect(info.charset.toLowerCase(), 'Falta <meta charset="UTF-8">').toBe('utf-8');
  expect(info.title.length, '<title> vazio').toBeGreaterThan(2);
  expect(info.viewport, 'Falta <meta name="viewport" content="width=device-width, initial-scale=1.0">').toMatch(/width=device-width/);
});

test('R2 – CSS em arquivo externo style.css (sem style="" e sem <style>)', async ({ page }) => {
  const href = await page.evaluate(() => document.querySelector('head link[rel="stylesheet"]')?.getAttribute('href'));
  expect(href, 'Falta <link rel="stylesheet" href="style.css"> no <head>').toBe('style.css');
  expect(ler('style.css').trim().length, 'O style.css está praticamente vazio').toBeGreaterThan(300);
  expect(ler(), 'Não use style="..." no HTML').not.toMatch(/\sstyle\s*=/i);
  expect(ler(), 'Não use <style> no HTML').not.toMatch(/<style/i);
});

test('R3 – Estrutura: header.topbar, main.container com 6+ cards e footer.rodape', async ({ page }) => {
  const s = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('main.container > .cards > article.card')];
    return {
      logo: !!document.querySelector('body > header.topbar > a.logo'),
      links: document.querySelectorAll('body > header.topbar > nav.menu > ul > li > a').length,
      login: !!document.querySelector('body > header.topbar > a.btn-login'),
      h1: !!document.querySelector('main.container > h1'),
      cards: cards.length,
      completos: cards.every((c) => c.querySelector('h2') && c.querySelector('p') && c.querySelector('a.btn')),
      rodape: document.querySelectorAll('body > footer.rodape > *').length,
    };
  });
  expect(s.logo, 'Falta <a class="logo"> dentro do <header class="topbar">').toBe(true);
  expect(s.links, 'O <nav class="menu"> precisa de <ul> com 4+ <li><a>').toBeGreaterThanOrEqual(4);
  expect(s.login, 'Falta <a class="btn-login"> dentro do header').toBe(true);
  expect(s.h1, 'Falta um <h1> dentro do <main class="container">').toBe(true);
  expect(s.cards, 'Precisa de 6+ <article class="card"> dentro de <section class="cards">').toBeGreaterThanOrEqual(6);
  expect(s.completos, 'Todo .card precisa de <h2>, <p> e <a class="btn">').toBe(true);
  expect(s.rodape, 'O <footer class="rodape"> precisa de 2+ elementos filhos (ex.: dois <span>)').toBeGreaterThanOrEqual(2);
});

test('R4 – Reset: body com margin 0 e box-sizing: border-box nos cards e no container', async ({ page }) => {
  const b = await estilo(page, 'body', ['marginTop', 'marginLeft']);
  expect(px(b.marginTop) + px(b.marginLeft), 'O body precisa de margin: 0').toBe(0);
  for (const sel of ['.card', '.container', '.topbar']) {
    const e = await estilo(page, sel, ['boxSizing']);
    expect(e.boxSizing, `${sel} precisa de box-sizing: border-box (dica: * { box-sizing: border-box; })`).toBe('border-box');
  }
});

test('R5 – Rodapé sempre colado embaixo, mesmo com pouco conteúdo (body em coluna + main que cresce)', async ({ page }) => {
  await page.evaluate(() => document.querySelectorAll('.card').forEach((c, i) => i > 0 && c.remove()));
  const b = await estilo(page, 'body', ['display', 'flexDirection']);
  expect(b.display, 'O body precisa de display: flex').toBe('flex');
  expect(b.flexDirection, 'O body precisa de flex-direction: column').toBe('column');
  const f = (await rects(page, 'footer'))[0];
  expect(perto(f.b, 800, 1), `Com pouco conteúdo o rodapé deveria encostar no fim da tela (800px), mas termina em ${Math.round(f.b)}px. Dica: o <main> precisa crescer (flex-grow / flex: 1) e o body precisa de min-height: 100vh`).toBe(true);
  const alt = await page.evaluate(() => document.documentElement.scrollHeight);
  expect(alt, 'A página ficou mais alta que a tela (rolagem desnecessária)').toBeLessThanOrEqual(801);
});

test('R6 – Topbar em Flexbox: itens centralizados na vertical, logo à esquerda e botão Entrar à direita', async ({ page }) => {
  const t = await estilo(page, '.topbar', ['display', 'alignItems']);
  expect(t.display, '.topbar precisa de display: flex').toBe('flex');
  expect(t.alignItems, '.topbar precisa de align-items: center').toBe('center');
  const [bar] = await rects(page, '.topbar');
  const [logo] = await rects(page, '.logo');
  const [menu] = await rects(page, '.menu');
  const [login] = await rects(page, '.btn-login');
  expect(logo.l - bar.l, 'O logo deve ficar encostado à esquerda (até 60px de margem)').toBeLessThanOrEqual(60);
  expect(bar.r - login.r, 'O botão Entrar deve ficar encostado à direita (dica: margin-left: auto ou justify-content)').toBeLessThanOrEqual(60);
  expect(logo.r, 'Ordem esperada: logo, menu, Entrar').toBeLessThanOrEqual(menu.l + 1);
  expect(menu.r, 'Ordem esperada: logo, menu, Entrar').toBeLessThanOrEqual(login.l + 1);
  const cy = (r) => (r.t + r.b) / 2;
  expect(perto(cy(logo), cy(menu), 3) && perto(cy(menu), cy(login), 3), 'Logo, menu e Entrar devem estar alinhados no centro vertical').toBe(true);
});

test('R7 – Menu em linha: ul com display flex, gap, sem bolinhas e links sem sublinhado', async ({ page }) => {
  const u = await estilo(page, '.menu ul', ['display', 'columnGap', 'listStyleType']);
  expect(u.display, '.menu ul precisa de display: flex').toBe('flex');
  expect(px(u.columnGap), 'Use gap (8px ou mais) para separar os itens do menu').toBeGreaterThanOrEqual(8);
  expect(u.listStyleType, 'Tire as bolinhas da lista (list-style: none)').toBe('none');
  const li = await rects(page, '.menu li');
  expect(new Set(li.map((x) => Math.round(x.t))).size, 'Os itens do menu devem ficar na mesma linha').toBe(1);
  const a = await estilo(page, '.menu a', ['textDecorationLine']);
  expect(a.textDecorationLine, 'Tire o sublinhado dos links do menu').toBe('none');
});

test('R8 – .cards usa Flexbox com quebra de linha (flex-wrap) e gap de 16px ou mais', async ({ page }) => {
  const c = await estilo(page, '.cards', ['display', 'flexWrap', 'columnGap', 'rowGap']);
  expect(c.display, '.cards precisa de display: flex').toBe('flex');
  expect(c.flexWrap, '.cards precisa de flex-wrap: wrap').toBe('wrap');
  expect(px(c.columnGap), 'gap entre colunas: 16px ou mais').toBeGreaterThanOrEqual(16);
  expect(px(c.rowGap), 'gap entre linhas: 16px ou mais').toBeGreaterThanOrEqual(16);
});

test('R9 – .container centralizado, com max-width (600px a 1100px)', async ({ page }) => {
  const e = await estilo(page, '.container', ['maxWidth']);
  expect(e.maxWidth, '.container precisa de max-width').not.toBe('none');
  expect(px(e.maxWidth), 'max-width do .container deve ser no máximo 1100px').toBeLessThanOrEqual(1100);
  const [c] = await rects(page, '.container');
  expect(c.w, 'O .container ficou estreito demais (mínimo 600px em 1280px de tela)').toBeGreaterThanOrEqual(600);
  expect(perto((c.l + c.r) / 2, 640, 2), 'O .container precisa estar centralizado (margin: 0 auto)').toBe(true);
});

test('R10 – Desktop (1280px): 3 cards por linha, mesma largura, preenchendo a linha toda', async ({ page }) => {
  const c = await rects(page, '.card');
  const [area] = await rects(page, '.cards');
  const pad = await estilo(page, '.cards', ['paddingRight']);
  expect(c.length, 'Precisa de 6+ cards').toBeGreaterThanOrEqual(6);
  expect(new Set(c.slice(0, 3).map((x) => Math.round(x.t))).size, 'Os 3 primeiros cards devem ficar na mesma linha (dica: flex-basis entre 250px e 350px)').toBe(1);
  expect(c[3].t, 'O 4º card deve ir para a linha de baixo (apenas 3 por linha)').toBeGreaterThan(c[0].t + 20);
  const larg = c.slice(0, 3).map((x) => x.w);
  expect(Math.max(...larg) - Math.min(...larg), 'Os 3 cards da linha devem ter a mesma largura').toBeLessThanOrEqual(2);
  expect(perto(c[2].r, area.r - px(pad.paddingRight), 2), 'Os cards devem crescer e preencher a linha inteira (flex-grow)').toBe(true);
});

test('R11 – Responsivo SEM @media: 2 por linha em 768px, 1 por linha em 375px e sem rolagem horizontal', async ({ page }) => {
  await abrir(page, 768);
  let c = await rects(page, '.card');
  expect(perto(c[0].t, c[1].t, 1), 'Em 768px os 2 primeiros cards devem ficar lado a lado').toBe(true);
  expect(c[2].t, 'Em 768px o 3º card deve ir para a linha de baixo (2 por linha)').toBeGreaterThan(c[0].t + 20);

  await abrir(page, 375);
  c = await rects(page, '.card');
  const [area] = await rects(page, '.cards');
  c.forEach((x, i) => {
    if (i > 0) expect(x.t, 'Em 375px cada card deve ficar embaixo do anterior (1 por linha)').toBeGreaterThan(c[i - 1].t + 20);
    expect(perto(x.l, c[0].l, 1), 'Em 375px todos os cards devem estar alinhados à esquerda').toBe(true);
  });
  expect(c[0].w, 'Em 375px o card deve ocupar a largura toda disponível').toBeGreaterThan(area.w - 40);
  const sobra = await overflowX(page);
  const culpados = await quemEstoura(page);
  expect(sobra, `Há rolagem horizontal em 375px (${sobra}px a mais). Passam da tela: ${culpados.join(', ') || 'veja no navegador'}. Dica: a topbar também precisa de flex-wrap`).toBeLessThanOrEqual(0);
});

test('R12 – Botões alinhados no fim dos cards da mesma linha (margin-top: auto), mesmo com textos de tamanhos diferentes', async ({ page }) => {
  const textos = await page.evaluate(() => [...document.querySelectorAll('.card p')].slice(0, 3).map((p) => p.textContent.trim().length));
  expect(Math.max(...textos) - Math.min(...textos), 'Faça as descrições dos 3 primeiros cards com tamanhos bem diferentes (diferença de 40+ caracteres) para o teste ter sentido').toBeGreaterThanOrEqual(40);
  const cards = (await rects(page, '.card')).slice(0, 3);
  expect(Math.max(...cards.map((x) => x.h)) - Math.min(...cards.map((x) => x.h)), 'Os cards da mesma linha devem ter a mesma altura').toBeLessThanOrEqual(1);
  const d = await estilo(page, '.card', ['display', 'flexDirection']);
  expect(d.display, '.card precisa ser um container flex').toBe('flex');
  expect(d.flexDirection, '.card precisa de flex-direction: column').toBe('column');
  const btns = (await rects(page, '.card .btn')).slice(0, 3);
  expect(Math.max(...btns.map((x) => x.b)) - Math.min(...btns.map((x) => x.b)), 'Os botões dos 3 primeiros cards devem terminar na mesma altura (dica: margin-top: auto no botão)').toBeLessThanOrEqual(1);
});

test('R13 – O botão do card NÃO ocupa a largura toda (align-self)', async ({ page }) => {
  const cards = await rects(page, '.card');
  const btns = await rects(page, '.card .btn');
  btns.forEach((b, i) => {
    expect(b.w, 'O botão do card está esticado até as bordas (dica: align-self: flex-start)').toBeLessThan(cards[i].w - 40);
  });
});

test('R14 – Rodapé em Flexbox: textos nas pontas (space-between) e centralizados na vertical', async ({ page }) => {
  const f = await estilo(page, '.rodape', ['display', 'justifyContent', 'alignItems']);
  expect(f.display, '.rodape precisa de display: flex').toBe('flex');
  expect(f.justifyContent, '.rodape precisa de justify-content: space-between').toBe('space-between');
  expect(f.alignItems, '.rodape precisa de align-items: center').toBe('center');
  const [bar] = await rects(page, '.rodape');
  const filhos = await rects(page, '.rodape > *');
  expect(filhos[0].l - bar.l, 'O 1º item do rodapé deve ficar à esquerda').toBeLessThanOrEqual(60);
  expect(bar.r - filhos[filhos.length - 1].r, 'O último item do rodapé deve ficar à direita').toBeLessThanOrEqual(60);
});

test('R15 – Desafio: nenhuma regra @media no CSS (o responsivo vem só do Flexbox)', async () => {
  expect(semComentarios(ler('style.css')), 'Remova o @media: aqui o responsivo deve vir de flex-wrap + flex-basis').not.toMatch(/@media/);
});

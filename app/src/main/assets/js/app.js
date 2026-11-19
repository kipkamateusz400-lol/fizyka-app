/* Główna logika aplikacji: widoki, ćwiczenia, arkusz maturalny, postęp */
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const h = (tag, attrs = {}, ...kids) => {
  const el = document.createElement(tag);
  for (const [k, val] of Object.entries(attrs || {})) {
    if (k === 'class') el.className = val;
    else if (k === 'html') el.innerHTML = val;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), val);
    else if (val !== false && val != null) el.setAttribute(k, val);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
  return el;
};
const areaOf = id => AREAS.find(a => a.id === id);
const genById = id => GENS.find(g => g.id === id);
const isClosed = p => ['mc', 'tf', 'match', 'fill'].includes(p.kind);
/* zadania zamknięte wielopunktowe: komplet = max, jeden błąd = 1 pkt (gdy max 2) */
const partial = (ok, all, pts) => ok === all ? pts : (pts === 2 && ok === all - 1 ? 1 : 0);
const STARS = ['', '★', '★★', '★★★'];
const LVL_NAME = ['', 'podstawowe', 'średnie', 'trudne'];

function rubricLevels(p) {
  let lv = (p.rubric || []).map(r => { const m = String(r).match(/^\s*(\d)\s*pkt\s*[–-]\s*(.*)$/); return m ? { pts: +m[1], txt: m[2] } : null; }).filter(Boolean);
  if (!lv.length) {
    lv = [{ pts: p.pts, txt: p.kind === 'open' ? 'odpowiedź zawiera wszystkie istotne elementy odpowiedzi wzorcowej (prawo/zależność + wniosek)' : 'poprawna metoda i wynik z jednostką' }];
    if (p.pts > 1) lv.push({ pts: 1, txt: p.kind === 'open' ? 'odpowiedź częściowo poprawna lub niepełna (brak powołania się na prawo albo niepełny wniosek)' : 'poprawna metoda, błąd w obliczeniach' });
    lv.push({ pts: 0, txt: 'odpowiedź niepoprawna albo brak odpowiedzi' });
  }
  if (!lv.some(l => l.pts === 0)) lv.push({ pts: 0, txt: 'brak istotnego postępu albo brak rozwiązania' });
  return lv.sort((a, b) => b.pts - a.pts);
}

/* ---------- Pamięć (postęp, przerwany arkusz) ---------- */
const store = {
  get(k, def) { try { const s = localStorage.getItem('fiz:' + k); return s ? JSON.parse(s) : def; } catch (e) { return def; } },
  set(k, val) { try { localStorage.setItem('fiz:' + k, JSON.stringify(val)); } catch (e) { /* brak miejsca */ } }
};
function stats() { return store.get('stats', { gen: {}, exams: [] }); }
function recordPart(genId, got, max, prevGot) {
  const s = stats();
  const g = s.gen[genId] || (s.gen[genId] = { got: 0, max: 0, n: 0 });
  if (prevGot == null) { g.max += max; g.n += 1; g.got += got; } else g.got += got - prevGot;
  g.last = Date.now();
  store.set('stats', s);
}
function areaStats(areaId) {
  const s = stats(); let got = 0, max = 0, n = 0;
  GENS.filter(g => g.area === areaId).forEach(g => { const x = s.gen[g.id]; if (x) { got += x.got; max += x.max; n += x.n; } });
  return { got, max, n, pct: max ? Math.round(100 * got / max) : null };
}

/* ---------- Ocena części zadania ---------- */
function autoScore(p, ans) {
  if (p.kind === 'mc') return ans === p.correct ? p.pts : 0;
  if (p.kind === 'tf') {
    if (!ans) return 0;
    return partial(p.statements.filter((st, i) => ans[i] === st.v).length, p.statements.length, p.pts);
  }
  if (p.kind === 'match' || p.kind === 'fill') {
    if (!ans) return 0;
    return partial(p.correct.filter((c, i) => ans[i] === c).length, p.correct.length, p.pts);
  }
  if (p.kind === 'num') return checkNum(ans, p.ans, p.tol || 0.03) ? p.pts : 0;
  return 0;
}

/* ---------- Render jednej wiązki zadań ---------- */
function renderBundle(task, opt) {
  const { mode, num, onScore } = opt; // mode: 'practice' | 'exam' | 'review'
  const g = genById(task.gen), area = areaOf(g.area);
  const box = h('article', { class: 'bundle' });
  box.append(h('header', { class: 'b-head' },
    h('span', { class: 'b-num' }, num ? `Zadanie ${num}.` : area.icon),
    h('span', { class: 'b-title' }, g.title),
    h('span', { class: 'b-pts' }, `${task.parts.reduce((a, p) => a + p.pts, 0)} pkt`)));
  box.append(h('div', { class: 'ctx', html: task.ctx }));
  if (task.svg) box.append(h('div', { class: 'fig', html: task.svg }));
  task.parts.forEach((p, i) => box.append(renderPart(task, p, i, opt, num ? `${num}.${i + 1}` : `${i + 1}`)));
  if (mode === 'practice') box.append(h('p', { class: 'theory-link' }, h('a', { href: `#/dzial/${g.area}/teoria` }, `📖 Teoria: ${area.name}`)));
  return box;
}

function renderPart(task, p, idx, opt, label) {
  const { mode, onScore } = opt;
  task.ans = task.ans || [];
  task.got = task.got || [];
  const el = h('section', { class: 'part' });
  el.append(h('div', { class: 'q' }, h('b', {}, `Zadanie ${label}. `), h('span', { class: 'muted' }, `(0–${p.pts}) `), h('span', { html: p.q })));
  const locked = () => mode === 'review' || el.classList.contains('checked');
  const save = () => { if (opt.onChange) opt.onChange(); };

  /* pola odpowiedzi */
  let getAns;
  if (p.kind === 'num') {
    const inp = h('input', { type: 'text', inputmode: 'decimal', placeholder: 'wynik', value: task.ans[idx] || '', autocomplete: 'off' });
    inp.addEventListener('input', () => { task.ans[idx] = inp.value; save(); });
    el.append(h('div', { class: 'ans-row' }, inp, h('span', { class: 'unit' }, p.unit || '')));
    if (task.parts.findIndex(x => x.kind === 'num') === idx && mode !== 'review') el.append(h('div', { class: 'small muted' }, 'Wpisz sam wynik liczbowy (np. 0,98 albo 6,7·10^-3 lub 6,7e-3). Poprawnie zaokrąglony wynik (min. 2 cyfry znaczące) też jest zaliczany. Obliczenia rób na kartce – jak na maturze.'));
    getAns = () => inp.value;
    if (mode === 'review') inp.disabled = true;
  } else if (p.kind === 'mc') {
    const list = h('div', { class: 'mc' });
    p.options.forEach((o, k) => {
      const b = h('button', { class: 'opt' + (task.ans[idx] === k ? ' sel' : ''), html: `<b>${'ABCD'[k]}.</b> ${o}` });
      b.onclick = () => { if (locked()) return; task.ans[idx] = k; list.querySelectorAll('.opt').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); save(); };
      list.append(b);
    });
    el.append(list); getAns = () => task.ans[idx];
  } else if (p.kind === 'tf') {
    const cur = task.ans[idx] || (task.ans[idx] = []);
    const tb = h('div', { class: 'tf' });
    p.statements.forEach((st, k) => {
      const mk = (val, txt) => { const b = h('button', { class: 'pf' + (cur[k] === val ? ' sel' : '') }, txt); b.onclick = () => { if (locked()) return; cur[k] = val; b.parentNode.querySelectorAll('.pf').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); save(); }; return b; };
      tb.append(h('div', { class: 'tf-row' }, h('span', { class: 'tf-s', html: `${k + 1}. ${st.s}` }), h('span', { class: 'pf-wrap' }, mk(true, 'P'), mk(false, 'F'))));
    });
    el.append(tb); getAns = () => cur;
  } else if (p.kind === 'match') {
    const cur = task.ans[idx] || (task.ans[idx] = []);
    const L = 'ABCDEFGH';
    el.append(h('div', { class: 'm-opts' }, p.options.map((o, k) => h('div', {}, h('b', {}, L[k] + '. '), h('span', { html: o })))));
    const box = h('div', { class: 'tf' });
    p.items.forEach((it, k) => {
      const sel = h('select', { class: 'm-sel' }, h('option', { value: '' }, '–'), p.options.map((o, j) => h('option', { value: j }, L[j])));
      if (cur[k] != null) sel.value = cur[k];
      sel.onchange = () => { cur[k] = sel.value === '' ? null : +sel.value; save(); };
      if (mode === 'review') sel.disabled = true;
      box.append(h('div', { class: 'tf-row' }, h('span', { class: 'tf-s', html: `${k + 1}. ${it}` }), sel));
    });
    el.append(box); getAns = () => cur;
  } else if (p.kind === 'fill') {
    const cur = task.ans[idx] || (task.ans[idx] = []);
    const parts = p.text.split(/\{(\d+)\}/);
    const txt = h('div', { class: 'fill' });
    parts.forEach((seg, k) => {
      if (k % 2 === 0) { txt.append(h('span', { html: seg })); return; }
      const g = +seg, grp = h('span', { class: 'gap', 'data-g': g });
      p.gaps[g].forEach((o, j) => {
        const b = h('button', { class: 'gapo' + (cur[g] === j ? ' sel' : ''), html: o });
        b.onclick = () => { if (locked()) return; cur[g] = j; grp.querySelectorAll('.gapo').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); save(); };
        grp.append(b);
      });
      txt.append(grp);
    });
    el.append(txt); getAns = () => cur;
  } else {
    const ta = h('textarea', { rows: 3, placeholder: 'Twoja odpowiedź (możesz też odpowiedzieć na kartce)' }, task.ans[idx] || '');
    ta.addEventListener('input', () => { task.ans[idx] = ta.value; save(); });
    if (mode === 'review') ta.disabled = true;
    el.append(ta); getAns = () => ta.value;
  }

  /* nauka: wskazówka i kroki */
  const help = h('div', { class: 'help' });
  if (mode === 'practice') {
    const tools = h('div', { class: 'tools' });
    if (p.hint) tools.append(h('button', { class: 'ghost', onclick: e => { help.querySelector('.hint')?.remove(); help.prepend(h('div', { class: 'hint', html: '💡 ' + p.hint })); e.target.disabled = true; } }, '💡 Wskazówka'));
    if (p.steps && p.steps.length > 1) {
      let shown = 0;
      const stepsBox = h('ol', { class: 'steps' });
      const btn = h('button', { class: 'ghost' }, `👣 Krok po kroku (0/${p.steps.length})`);
      btn.onclick = () => { if (shown >= p.steps.length) return; stepsBox.append(h('li', { html: p.steps[shown++] })); if (!stepsBox.parentNode) help.append(stepsBox); btn.textContent = `👣 Następny krok (${shown}/${p.steps.length})`; if (shown === p.steps.length) btn.disabled = true; };
      tools.append(btn);
    }
    tools.append(h('button', { class: 'primary', onclick: () => check() }, p.kind === 'open' ? 'Pokaż odpowiedź wzorcową' : 'Sprawdź'));
    el.append(tools);
  }
  el.append(help);

  const result = h('div', { class: 'result' });
  el.append(result);

  function check() {
    if (el.classList.contains('checked') && mode === 'practice') return;
    el.classList.add('checked');
    el.querySelectorAll('.tools button').forEach(b => { b.disabled = true; });
    const ans = getAns();
    const auto = autoScore(p, ans);
    result.innerHTML = '';
    if (p.kind === 'num') {
      const u = parseNum(ans), ok = auto === p.pts;
      result.append(h('div', { class: ok ? 'ok' : 'bad', html: ok ? `✔ Dobrze! Poprawny wynik: <b>${fmt(p.ans)} ${p.unit}</b>` : (isFinite(u) ? `✘ Twój wynik ${fmt(u)} ${p.unit}, poprawny: <b>${fmt(p.ans)} ${p.unit}</b>` : `Poprawny wynik: <b>${fmt(p.ans)} ${p.unit}</b>`) }));
    } else if (p.kind === 'mc') {
      result.append(h('div', { class: auto ? 'ok' : 'bad', html: (auto ? '✔ Dobrze! ' : '✘ ') + `Poprawna odpowiedź: <b>${'ABCD'[p.correct]}</b>` }));
      el.querySelectorAll('.opt').forEach((b, k) => { if (k === p.correct) b.classList.add('right'); else if (k === ans) b.classList.add('wrong'); });
    } else if (p.kind === 'match') {
      result.append(h('div', { class: auto === p.pts ? 'ok' : 'bad', html: (auto === p.pts ? '✔ Dobrze! ' : '✘ ') + 'Poprawnie: ' + p.correct.map((c, k) => `${k + 1}–${'ABCDEFGH'[c]}`).join(', ') }));
      el.querySelectorAll('.tf-row').forEach((row, k) => row.classList.add(ans[k] === p.correct[k] ? 'right' : 'wrong'));
    } else if (p.kind === 'fill') {
      result.append(h('div', { class: auto === p.pts ? 'ok' : 'bad', html: (auto === p.pts ? '✔ Dobrze! ' : '✘ ') + 'Poprawnie: ' + p.correct.map((c, k) => p.gaps[k][c]).join(' / ') }));
      el.querySelectorAll('.gap').forEach(grp => { const g = +grp.dataset.g; grp.querySelectorAll('.gapo').forEach((b, j) => { if (j === p.correct[g]) b.classList.add('right'); else if (j === ans[g]) b.classList.add('wrong'); }); });
    } else if (p.kind === 'tf') {
      result.append(h('div', { class: auto === p.pts ? 'ok' : 'bad', html: `Poprawnie: ${p.statements.map((st, k) => `${k + 1}–${st.v ? 'P' : 'F'}`).join(', ')}` }));
      el.querySelectorAll('.tf-row').forEach((row, k) => row.classList.add(ans[k] === p.statements[k].v ? 'right' : 'wrong'));
    } else {
      result.append(h('div', { class: 'model', html: '<b>Przykładowa poprawna odpowiedź:</b> ' + p.model }));
    }
    if (p.steps && p.steps.length) {
      const old = help.querySelector('.steps'); if (old) old.remove();
      result.append(h('details', { class: 'solution', open: mode === 'practice' && !isClosed(p) ? '' : null }, h('summary', {}, 'Pełne rozwiązanie'), h('ol', { class: 'steps' }, p.steps.map(s => h('li', { html: s })))));
    }
    if (p.kind === 'num' || p.kind === 'open') {
      const levels = rubricLevels(p);
      let cur = mode === 'review' && task.got[idx] != null ? task.got[idx] : auto, prev = null;
      const head = p.kind === 'num' && auto ? 'Wynik się zgadza. Zaznacz, co masz zapisane na kartce (tak oceni egzaminator):' : (p.kind === 'num' ? 'Porównaj swoje obliczenia z rozwiązaniem i zaznacz, co pasuje do Twojej kartki:' : 'Porównaj z odpowiedzią wzorcową i zaznacz, co pasuje do Twojej odpowiedzi:');
      const list = h('div', { class: 'levels' });
      levels.forEach(lv => {
        const b = h('button', { class: 'lvl' + (lv.pts === cur ? ' sel' : '') }, h('b', {}, `${lv.pts} pkt`), h('span', {}, lv.txt));
        b.onclick = () => { cur = lv.pts; list.querySelectorAll('.lvl').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); task.got[idx] = cur; if (onScore) { onScore(task, idx, cur, prev); prev = cur; } };
        list.append(b);
      });
      result.append(h('div', { class: 'selfgrade' }, h('span', { class: 'small' }, head)), list);
      task.got[idx] = cur; if (onScore) { onScore(task, idx, cur, null); prev = cur; }
    } else {
      task.got[idx] = auto; if (onScore) onScore(task, idx, auto, null);
    }
    if (mode === 'practice') result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  el.check = check;
  if (mode === 'review') check();
  return el;
}

/* ---------- Budowanie arkusza ---------- */
function buildExam(target = 60, minutes = 180, areas = null) {
  const pool = GENS.filter(g => !areas || areas.includes(g.area));
  const closedRange = target === 60 ? [8, 15] : [Math.round(target * 0.13), Math.round(target * 0.3)];
  for (let attempt = 0; attempt < 3000; attempt++) {
    const order = [];
    const areaList = areas || AREAS.map(a => a.id);
    if (target >= 40) {
      // jak w CKE: przynajmniej jedna wiązka z tekstem źródłowym i jedna z wykresem
      const txt = pool.filter(g => g.id.startsWith('tekst-')), wyk = pool.filter(g => g.id.includes('-wykres-'));
      if (txt.length) order.push(R.pick(txt));
      if (wyk.length) order.push(R.pick(wyk));
      areaList.forEach(a => { const c = pool.filter(g => g.area === a && !order.includes(g)); if (c.length) order.push(R.pick(c)); });
    }
    R.shuffle(pool).forEach(g => { if (!order.includes(g)) order.push(g); });
    const tasks = []; let total = 0;
    for (const g of order) {
      if (total >= target) break;
      const t = g.gen();
      let parts = t.parts;
      // w arkuszu krótkie (1-pkt) polecenia otwarte pojawiają się rzadziej – część z nich pomijamy
      const trimmed = parts.filter(p => !(p.pts === 1 && !isClosed(p) && Math.random() < 0.6));
      if (trimmed.length) parts = trimmed;
      if (parts.length > 3) parts = R.shuffle(parts.map((p, i) => i)).slice(0, 3).sort((a, b) => a - b).map(i => parts[i]);
      const rem = target - total;
      let sum = parts.reduce((a, p) => a + p.pts, 0);
      if (sum > rem) {
        let best = null;
        for (let mask = 1; mask < 1 << parts.length; mask++) {
          const sub = parts.filter((_, i) => mask & (1 << i)), s2 = sub.reduce((a, p) => a + p.pts, 0);
          if (s2 === rem) { best = sub; break; }
        }
        if (!best) continue;
        parts = best; sum = rem;
      }
      tasks.push({ gen: g.id, ctx: t.ctx, svg: t.svg, parts });
      total += sum;
    }
    if (total !== target) continue;
    const closed = tasks.reduce((a, t) => a + t.parts.filter(isClosed).reduce((b, p) => b + p.pts, 0), 0);
    const nParts = tasks.reduce((a, t) => a + t.parts.length, 0);
    if (closed < closedRange[0] || closed > closedRange[1]) continue;
    if (target === 60 && (nParts < 23 || nParts > 35)) continue;
    // kolejność jak w arkuszu: według działów
    const ord = AREAS.map(a => a.id);
    tasks.sort((a, b) => ord.indexOf(genById(a.gen).area) - ord.indexOf(genById(b.gen).area));
    return { id: Date.now(), target, minutes, start: Date.now(), tasks, done: false };
  }
  throw new Error('Nie udało się zbudować arkusza');
}

/* ---------- Widoki ---------- */
const main = () => $('#main');
let timerId = null;
function setTitle(t, back) {
  $('#title').textContent = t;
  $('#back').hidden = !back;
  if (back) $('#back').onclick = () => (typeof back === 'string' ? (location.hash = back) : history.back());
}
function nav(active) { document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.v === active)); }

function viewHome() {
  setTitle('Fizyka · matura rozszerzona'); nav('home');
  const m = main(); m.innerHTML = '';
  const ex = store.get('exam', null);
  m.append(h('section', { class: 'hero' },
    h('h2', {}, 'Ucz się, ćwicz, pisz próbne matury'),
    h('p', { class: 'muted' }, `${GENS.length} typów zadań w ${AREAS.length} działach. Liczby losują się za każdym razem, więc zadania się nie kończą.`),
    h('div', { class: 'cta' },
      ex && !ex.done ? h('a', { class: 'btn primary', href: '#/matura' }, `▶ Wróć do arkusza (${ex.target} pkt)`) : h('a', { class: 'btn primary', href: '#/matura/nowa/60' }, '📝 Pełna matura: 60 pkt, 180 min'),
      h('a', { class: 'btn', href: '#/matura/nowa/20' }, '⏱ Mini-arkusz: 20 pkt, 60 min'),
      h('a', { class: 'btn', href: '#/powtorka' }, '🧠 Inteligentna powtórka'),
      h('a', { class: 'btn', href: '#/losuj' }, '🎲 Losowe zadanie'),
      h('a', { class: 'btn', href: '#/arkusze-cke' }, '📄 Prawdziwe arkusze CKE'),
      h('a', { class: 'btn', href: '#/dzial/howto/teoria' }, '🧭 Jak rozwiązywać zadania'))));
  m.append(h('h3', { class: 'sec' }, 'Działy'));
  const grid = h('div', { class: 'areas' });
  AREAS.forEach(a => {
    const s = areaStats(a.id);
    grid.append(h('a', { class: 'area', href: `#/dzial/${a.id}` },
      h('span', { class: 'ic' }, a.icon), h('b', {}, a.name),
      h('span', { class: 'small muted' }, `${GENS.filter(g => g.area === a.id).length} typów zadań · ${s.n} rozwiązanych`),
      h('span', { class: 'bar' }, h('i', { style: `width:${s.pct || 0}%` })),
      h('span', { class: 'small' }, s.pct == null ? 'jeszcze nie ćwiczone' : `skuteczność ${s.pct}%`)));
  });
  m.append(grid);
}

function viewArea(id, tab) {
  if (id === 'howto') return viewTheory('howto');
  const a = areaOf(id); if (!a) return viewHome();
  setTitle(a.name, '#/'); nav('home');
  const m = main(); m.innerHTML = '';
  m.append(h('div', { class: 'tabs' }, h('a', { class: tab !== 'zadania' ? 'on' : '', href: `#/dzial/${id}/teoria` }, '📖 Teoria'), h('a', { class: tab === 'zadania' ? 'on' : '', href: `#/dzial/${id}/zadania` }, '✏️ Zadania')));
  if (tab === 'zadania') {
    m.append(h('a', { class: 'btn primary wide', href: `#/losuj/${id}` }, '🎲 Losuj zadanie z tego działu'));
    const s = stats();
    let filter = store.get('lvl', 0);
    const list = h('div', { class: 'gens' });
    const chips = h('div', { class: 'tabs chips' });
    const draw = () => {
      chips.innerHTML = ''; list.innerHTML = '';
      [0, 1, 2, 3].forEach(l => chips.append(h('a', { class: filter === l ? 'on' : '', href: 'javascript:void 0', onclick: () => { filter = l; store.set('lvl', l); draw(); } }, l ? `${STARS[l]} ${LVL_NAME[l]}` : 'wszystkie')));
      const rows = GENS.filter(g => g.area === id).map(g => [g, levelOf(g)]).filter(([, l]) => !filter || l === filter).sort((x, y) => x[1] - y[1]);
      if (!rows.length) list.append(h('p', { class: 'muted' }, `W tym dziale nie ma zadań na poziomie ${STARS[filter]} ${LVL_NAME[filter]}. Wybierz inny poziom.`));
      rows.forEach(([g, l]) => {
        const x = s.gen[g.id];
        list.append(h('a', { class: 'gen', href: `#/zadanie/${g.id}` }, h('span', {}, `${STARS[l]} ${g.title}`), h('span', { class: 'small muted' }, x ? `${x.got}/${x.max} pkt` : 'nowe')));
      });
    };
    draw();
    m.append(chips, h('p', { class: 'small muted' }, 'Poziom szacowany na podstawie punktacji zadania. Zacznij od ★ i przechodź wyżej.'), list);
  } else viewTheory(id, m);
}

function viewTheory(id, container) {
  const T = THEORY[id];
  const m = container || main();
  if (!container) { setTitle(T.title, '#/'); nav('home'); m.innerHTML = ''; }
  m.append(h('h2', { class: 'th-title' }, T.title));
  const toc = h('ol', { class: 'toc' });
  T.sections.forEach((s, i) => toc.append(h('li', {}, h('a', { href: 'javascript:void 0', onclick: () => document.getElementById('s' + i).scrollIntoView({ behavior: 'smooth' }) }, s.t))));
  m.append(toc);
  T.sections.forEach((s, i) => m.append(h('section', { class: 'theory', id: 's' + i }, h('h3', {}, `${i + 1}. ${s.t}`), h('div', { html: s.b }))));
  if (id !== 'howto') m.append(h('a', { class: 'btn primary wide', href: `#/losuj/${id}` }, '✏️ Przećwicz ten dział'));
  else m.append(h('a', { class: 'btn primary wide', href: '#/losuj' }, '🎲 Spróbuj na losowym zadaniu'));
}

function viewPractice(genId, areaId, review) {
  let g = genId ? genById(genId) : null;
  if (!g) { const pool = GENS.filter(x => !areaId || x.area === areaId); g = R.pick(pool); }
  const a = areaOf(g.area);
  setTitle(a.name, areaId || genId ? `#/dzial/${g.area}/zadania` : '#/'); nav('practice');
  const m = main(); m.innerHTML = '';
  const t = g.gen(); const task = { gen: g.id, ctx: t.ctx, svg: t.svg, parts: t.parts };
  m.append(h('p', { class: 'small muted' }, review ? '🧠 Powtórka: losuję częściej to, co słabiej Ci idzie albo dawno nie było ćwiczone.' : 'Najpierw spróbuj sam. Utknąłeś? Użyj wskazówki albo odsłaniaj rozwiązanie krok po kroku.'));
  m.append(renderBundle(task, { mode: 'practice', onScore: (tk, i, got, prev) => recordPart(g.id, got, tk.parts[i].pts, prev) }));
  m.append(h('div', { class: 'cta' },
    review ? h('button', { class: 'btn primary', onclick: () => viewReview() }, '🧠 Następne z powtórki') : h('button', { class: 'btn primary', onclick: () => viewPractice(genId, areaId) }, genId ? '🔄 Nowe liczby, ten sam typ' : '🔄 Kolejne losowe zadanie'),
    genId ? h('a', { class: 'btn', href: `#/losuj/${g.area}` }, '🎲 Inne zadanie z działu') : null,
    h('a', { class: 'btn', href: '#/losuj' }, '🎲 Z dowolnego działu')));
  window.scrollTo(0, 0);
}

/* Inteligentna powtórka: częściej typy słabe, dawno nie ćwiczone i jeszcze nieznane */
function pickForReview(areaId) {
  const s = stats(), now = Date.now();
  const pool = GENS.filter(g => !areaId || g.area === areaId);
  const w = pool.map(g => {
    const x = s.gen[g.id];
    if (!x || !x.max) return 1.2;
    const acc = x.got / x.max, days = (now - (x.last || 0)) / 864e5;
    return 0.15 + 2.5 * (1 - acc) ** 2 + Math.min(days, 14) / 14;
  });
  let r = Math.random() * w.reduce((a, b) => a + b, 0);
  for (let i = 0; i < pool.length; i++) { r -= w[i]; if (r <= 0) return pool[i]; }
  return pool[pool.length - 1];
}
function viewReview() {
  const g = pickForReview();
  viewPractice(g.id, null, true);
}

const CKE = [
  { t: 'Matura 2025 (maj) – arkusz', u: 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2025/Fizyka/MFAP-R0-100-A-2505-arkusz.pdf' },
  { t: 'Matura 2024 (maj) – arkusz', u: 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Fizyka/MFAP-R0-100-A-2405-arkusz.pdf' },
  { t: 'Matura 2024 (maj) – zasady oceniania', u: 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Fizyka/MFAP-R0-100-2405-zasady.pdf' },
  { t: 'Matura 2024 – strona CKE (arkusz, karta odpowiedzi, klucz)', u: 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2024-2/' },
  { t: 'Matura 2023 (maj) – zasady oceniania', u: 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2023/Fizyka/MFAP-R0-100-2305-zasady.pdf' },
  { t: 'Matura 2023 – strona CKE (arkusz i klucz)', u: 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2023-2/' },
  { t: 'Wszystkie arkusze Formuły 2023 (też 2025, czerwcowe i próbne)', u: 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/' },
  { t: 'Sprawozdanie CKE 2023 – z czym zdający mieli problem', u: 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Informacje_o_wynikach/2023/sprawozdanie/MFAP_fizyka_sprawozdanie_2023.pdf' }
];
function viewCke() {
  setTitle('Prawdziwe arkusze CKE', '#/'); nav('exam');
  const m = main(); m.innerHTML = '';
  m.append(h('section', { class: 'hero' }, h('h2', {}, 'Oryginalne arkusze CKE'),
    h('p', { class: 'muted' }, 'Arkusze z prawdziwych matur w formule 2023 (tej samej, którą będziesz pisać). Otwierają się w przeglądarce telefonu (potrzebny internet). Najlepiej: wydrukuj albo pisz na kartce, mierz czas 180 minut, potem sprawdź według zasad oceniania.'),
    h('div', { class: 'gens' }, CKE.map(c => h('a', { class: 'gen', href: c.u, target: '_blank', rel: 'noopener' }, h('span', {}, c.t), h('span', { class: 'small muted' }, '↗'))))));
}

function viewExamStart(target) {
  setTitle('Arkusz maturalny', '#/'); nav('exam');
  const m = main(); m.innerHTML = '';
  const cur = store.get('exam', null);
  const go = () => {
    const ex = buildExam(target, target === 60 ? 180 : 60);
    store.set('exam', ex); location.hash = '#/matura';
  };
  m.append(h('section', { class: 'hero' },
    h('h2', {}, target === 60 ? 'Pełny arkusz – poziom rozszerzony' : 'Mini-arkusz'),
    h('ul', {},
      h('li', {}, `${target} punktów, czas ${target === 60 ? '180' : '60'} minut (zegar odlicza w tle, możesz wyjść z aplikacji).`),
      h('li', {}, target >= 40 ? 'Zadania ze wszystkich działów, w tym zadanie doświadczalne, z tekstem źródłowym i z wykresem. Kilkanaście procent punktów to zadania zamknięte.' : 'Losowe zadania z różnych działów, część z nich zamknięta.'),
      h('li', {}, 'Przygotuj kartkę, kalkulator i kartę wzorów (zakładka „Wzory”).'),
      h('li', {}, 'Po zakończeniu zamknięte sprawdzą się same, a otwarte ocenisz według klucza. Wyniki trafią do statystyk i powtórki.')),
    cur && !cur.done ? h('p', { class: 'warn' }, 'Masz niedokończony arkusz – rozpoczęcie nowego go usunie.') : null,
    h('div', { class: 'cta' }, h('button', { class: 'btn primary', onclick: go }, '▶ Start'), h('a', { class: 'btn', href: '#/arkusze-cke' }, '📄 Arkusze CKE'), cur && !cur.done ? h('a', { class: 'btn', href: '#/matura' }, 'Wróć do niedokończonego') : null)));
}

function viewExam() {
  const ex = store.get('exam', null);
  if (!ex) return viewExamStart(60);
  setTitle(ex.done ? 'Wynik arkusza' : `Arkusz ${ex.target} pkt`, '#/'); nav('exam');
  const m = main(); m.innerHTML = '';
  const persist = () => store.set('exam', ex);
  if (!ex.done) {
    const tm = h('div', { class: 'timer' });
    m.append(tm);
    const tick = () => {
      const left = ex.start + ex.minutes * 60000 - Date.now();
      if (left <= 0) { tm.textContent = '⏰ Czas minął! Zakończ arkusz.'; tm.classList.add('late'); return; }
      const mm = Math.floor(left / 60000), ss = Math.floor(left / 1000) % 60;
      tm.textContent = `⏱ Pozostało ${Math.floor(mm / 60)}:${String(mm % 60).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    };
    tick(); clearInterval(timerId); timerId = setInterval(tick, 1000);
    ex.tasks.forEach((t, i) => m.append(renderBundle(t, { mode: 'exam', num: i + 1, onChange: persist })));
    m.append(h('button', { class: 'btn primary wide', onclick: () => { if (!confirmFinish()) return; ex.done = true; ex.end = Date.now(); persist(); clearInterval(timerId); viewExam(); window.scrollTo(0, 0); } }, '✔ Zakończ i sprawdź'));
    return;
  }
  clearInterval(timerId);
  const sumBox = h('section', { class: 'score' });
  m.append(sumBox);
  const update = () => {
    const got = ex.tasks.reduce((a, t) => a + (t.got || []).reduce((b, x) => b + (x || 0), 0), 0);
    const pct = Math.round(100 * got / ex.target);
    const byArea = {};
    ex.tasks.forEach(t => { const ar = genById(t.gen).area; const o = byArea[ar] || (byArea[ar] = [0, 0]); t.parts.forEach((p, i) => { o[0] += (t.got || [])[i] || 0; o[1] += p.pts; }); });
    sumBox.innerHTML = '';
    sumBox.append(h('div', { class: 'big' }, `${got} / ${ex.target} pkt`), h('div', { class: 'pct' }, `${pct}%`),
      h('p', { class: 'small muted' }, `Czas pisania: ${Math.round(((ex.end || Date.now()) - ex.start) / 60000)} min. Punkty za zadania otwarte możesz poprawić niżej – przeczytaj klucz i oceń się uczciwie.`),
      h('div', { class: 'byarea' }, Object.entries(byArea).map(([ar, [g, mx]]) => h('div', {}, h('span', {}, areaOf(ar).name), h('span', { class: 'bar' }, h('i', { style: `width:${mx ? 100 * g / mx : 0}%` })), h('b', {}, `${g}/${mx}`)))));
    ex.score = got; persist();
  };
  let ready = false;
  ex.tasks.forEach((t, i) => {
    t.got = t.got || [];
    m.append(renderBundle(t, { mode: 'review', num: i + 1, onScore: (tk, idx, got, prev) => {
      tk.got[idx] = got;
      if (!ready) return;
      update();
      // poprawka samooceny po zapisaniu wyników – aktualizujemy statystyki typu zadania
      if (ex.statsDone && prev != null && genById(tk.gen)) recordPart(tk.gen, got, tk.parts[idx].pts, prev);
    } }));
  });
  ready = true; update();
  if (!ex.saved) {
    const s = stats(); s.exams.push({ id: ex.id, date: ex.start, target: ex.target, score: ex.score }); store.set('stats', s); ex.saved = true;
    // wyniki arkusza liczą się też do statystyk typów zadań (powtórka, najsłabsze typy)
    ex.tasks.forEach(t => { if (genById(t.gen)) t.parts.forEach((p, i) => recordPart(t.gen, t.got[i] || 0, p.pts, null)); });
    ex.statsDone = true;
    persist();
  }
  const saveScore = () => { const s = stats(); const e = s.exams.find(x => x.id === ex.id); if (e) e.score = ex.score; store.set('stats', s); };
  m.append(h('div', { class: 'cta' }, h('button', { class: 'btn primary', onclick: () => { saveScore(); location.hash = '#/matura/nowa/' + ex.target; } }, '📝 Nowy arkusz'), h('button', { class: 'btn', onclick: () => { saveScore(); location.hash = '#/postep'; } }, '📊 Zapisz i zobacz postęp')));
}
function confirmFinish() { return window.confirm('Zakończyć arkusz i przejść do sprawdzania?'); }

function viewFormulas() {
  setTitle('Wzory i stałe'); nav('wzory');
  const m = main(); m.innerHTML = '';
  m.append(h('p', { class: 'small muted' }, 'Ściąga z najważniejszych wzorów. Na egzaminie dostaniesz pełną kartę CKE „Wybrane wzory i stałe fizykochemiczne” – przejrzyj ją przed maturą, żeby wiedzieć, gdzie co jest.'));
  AREAS.forEach(a => { if (FORMULAS[a.id]) m.append(h('section', { class: 'theory' }, h('h3', {}, `${a.icon} ${a.name}`), h('table', { class: 'tbl f' }, FORMULAS[a.id].map(([n, f]) => h('tr', {}, h('td', {}, n), h('td', { html: f })))))); });
  m.append(h('section', { class: 'theory' }, h('h3', {}, 'Stałe fizyczne'), h('table', { class: 'tbl f' }, CONSTANTS.map(([n, f]) => h('tr', {}, h('td', {}, n), h('td', { html: f }))))));
}

function viewProgress() {
  setTitle('Postęp'); nav('postep');
  const m = main(); m.innerHTML = '';
  const s = stats();
  m.append(h('h3', { class: 'sec' }, 'Skuteczność w działach'));
  const weak = [];
  m.append(h('div', { class: 'byarea' }, AREAS.map(a => { const x = areaStats(a.id); if (x.pct != null && x.pct < 60) weak.push(a); return h('div', {}, h('span', {}, a.name), h('span', { class: 'bar' }, h('i', { style: `width:${x.pct || 0}%` })), h('b', {}, x.pct == null ? '–' : x.pct + '%')); })));
  if (weak.length) m.append(h('p', { class: 'warn' }, 'Do powtórki: ', weak.map(a => h('a', { href: `#/dzial/${a.id}/teoria` }, a.name)).reduce((acc, el, i) => (i ? acc.concat([', ', el]) : [el]), [])));
  m.append(h('h3', { class: 'sec' }, 'Próbne arkusze'));
  if (!s.exams.length) m.append(h('p', { class: 'muted' }, 'Nie napisałeś jeszcze żadnego arkusza.'));
  else m.append(h('table', { class: 'tbl' }, h('tr', {}, h('th', {}, 'data'), h('th', {}, 'wynik'), h('th', {}, '%')), s.exams.slice().reverse().map(e => h('tr', {}, h('td', {}, new Date(e.date).toLocaleDateString('pl-PL')), h('td', {}, `${e.score ?? '?'} / ${e.target}`), h('td', {}, e.score != null ? Math.round(100 * e.score / e.target) + '%' : '')))));
  m.append(h('h3', { class: 'sec' }, 'Najsłabsze typy zadań'));
  const rows = Object.entries(s.gen).filter(([id, x]) => genById(id) && x.max).map(([id, x]) => [genById(id), x.got / x.max, x]).sort((a, b) => a[1] - b[1]).slice(0, 6);
  if (!rows.length) m.append(h('p', { class: 'muted' }, 'Rozwiąż kilka zadań, a pokażę, co ćwiczyć.'));
  else m.append(h('div', { class: 'gens' }, rows.map(([g, r, x]) => h('a', { class: 'gen', href: `#/zadanie/${g.id}` }, h('span', {}, g.title), h('span', { class: 'small muted' }, `${Math.round(r * 100)}% (${x.got}/${x.max})`)))));
  m.append(h('button', { class: 'btn ghost', onclick: () => { if (confirm('Wyzerować cały postęp?')) { store.set('stats', { gen: {}, exams: [] }); viewProgress(); } } }, 'Wyzeruj postęp'));
}

/* ---------- Router ---------- */
function route() {
  clearInterval(timerId);
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [a, b, c] = parts;
  try {
    if (!a) viewHome();
    else if (a === 'dzial') viewArea(b, c);
    else if (a === 'losuj') viewPractice(null, b);
    else if (a === 'zadanie') viewPractice(b);
    else if (a === 'powtorka') viewReview();
    else if (a === 'arkusze-cke') viewCke();
    else if (a === 'matura' && b === 'nowa') viewExamStart(+c || 60);
    else if (a === 'matura') viewExam();
    else if (a === 'wzory') viewFormulas();
    else if (a === 'postep') viewProgress();
    else viewHome();
  } catch (e) { main().innerHTML = `<p class="bad">Błąd: ${e.message}</p>`; console.error(e); }
  if (a !== 'dzial' || c !== 'teoria') window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
document.addEventListener('DOMContentLoaded', () => {
  const th = store.get('theme', null); if (th) document.documentElement.dataset.theme = th;
  $('#theme').onclick = () => { const cur = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches); const nx = cur ? 'light' : 'dark'; document.documentElement.dataset.theme = nx; store.set('theme', nx); };
  route();
});

// Test: każdy generator losowany 400 razy – sprawdza poprawność danych
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, '../app/src/main/assets/js');
const ctx = { console, Math, module: undefined };
vm.createContext(ctx);
for (const f of ['util.js', 'gen-mech.js', 'gen-grav.js', 'gen-wave.js', 'gen-elec.js', 'gen-thermo.js', 'gen-atom.js', 'gen-mech2.js', 'gen-grav2.js', 'gen-wave2.js', 'gen-elec2.js', 'gen-thermo2.js', 'gen-atom2.js', 'gen-extra.js', 'gen-extra2.js', 'gen-wykresy.js', 'gen-zamkniete.js', 'gen-teksty.js', 'gen-doswiadczenia.js', 'theory.js', 'wzory.js'])
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8').replace(/^'use strict';/m, '').replace(/^const (\w+)/gm, 'var $1'), ctx, { filename: f });
const { GENS, AREAS, parseNum, closeEnough, checkNum, sigDigits, levelOf, THEORY, FORMULAS } = ctx;
let errors = 0;
const err = (g, m) => { errors++; if (errors < 40) console.log('BŁĄD', g.id, m); };
for (const g of GENS) {
  if (!AREAS.some(a => a.id === g.area)) err(g, 'nieznany dział ' + g.area);
  if (![1, 2, 3].includes(levelOf(g))) err(g, 'poziom ' + levelOf(g));
  for (let i = 0; i < 400; i++) {
    const t = g.gen();
    const html = JSON.stringify(t);
    if (/NaN|undefined|Infinity|—/.test(html)) { err(g, 'NaN/undefined w treści: ' + html.match(/.{40}(NaN|undefined|Infinity|—).{20}/)?.[0]); break; }
    if (!t.parts?.length) err(g, 'brak części');
    for (const p of t.parts) {
      if (!(p.pts >= 1 && p.pts <= 4)) err(g, 'pkt ' + p.pts);
      if (p.kind === 'num') {
        if (!isFinite(p.ans)) err(g, 'ans ' + p.ans);
        if (p.ans <= 0 && p.ans !== 0 && !p.neg) err(g, 'ujemna odp ' + p.ans + ' ' + p.q);
        // poprawny wynik wpisany z 3 cyframi znaczącymi musi zostać zaliczony
        if (isFinite(p.ans) && p.ans !== 0 && !checkNum(String(+p.ans.toPrecision(3)).replace('.', ','), p.ans, p.tol || 0.03)) err(g, 'wynik 3 c.z. niezaliczony ' + p.ans);
      }
      if (p.kind === 'mc' && !(p.correct >= 0 && p.correct < p.options.length)) err(g, 'mc correct');
      if (p.kind === 'mc' && (p.options.length < 2 || new Set(p.options).size !== p.options.length)) err(g, 'mc opcje: ' + p.options.join(' | '));
      if ((p.kind === 'num' || p.kind === 'open') && (!p.steps && !p.model)) err(g, 'brak rozwiązania');
      if (p.kind === 'tf' && !(p.statements.length >= 2)) err(g, 'tf');
      if (p.kind === 'open' && !p.model) err(g, 'open model');
      if (p.kind === 'match') { if (p.correct.length !== p.items.length || p.correct.some(c => !(c >= 0 && c < p.options.length))) err(g, 'match'); if (new Set(p.correct).size !== p.correct.length) err(g, 'match: powtórzone odpowiedzi'); }
      if (p.kind === 'fill') { const n = (p.text.match(/\{\d+\}/g) || []).length; if (n !== p.gaps.length || p.correct.length !== n || p.correct.some((c, k) => !(c >= 0 && c < p.gaps[k].length))) err(g, 'fill: ' + p.text.slice(0, 40)); }
    }
  }
}
for (const a of AREAS) {
  if (!THEORY[a.id]) { errors++; console.log('BŁĄD brak teorii dla działu', a.id); }
  if (!FORMULAS[a.id]) { errors++; console.log('BŁĄD brak wzorów dla działu', a.id); }
  if (!GENS.some(g => g.area === a.id)) { errors++; console.log('BŁĄD brak zadań w dziale', a.id); }
}
const per = {}; GENS.forEach(g => per[g.area] = (per[g.area] || 0) + 1);
const lv = { 1: 0, 2: 0, 3: 0 }; GENS.forEach(g => lv[levelOf(g)]++);
console.log('Generatorów:', GENS.length, per, 'poziomy:', lv, 'błędów:', errors);
// parser
const cases = [['6,7', 6.7], ['6.7e-3', 0.0067], ['6,7·10^-3', 0.0067], ['6,7*10^5', 670000], ['1,2·10⁻¹⁹', 1.2e-19], ['12 m/s', 12], ['3x10^8', 3e8], ['-5', -5], ['105', 105], ['103', 103], ['10^5', 1e5], ['10⁵', 1e5], ['6,7·10⁻³', 0.0067]];
for (const [s, e] of cases) if (!closeEnough(parseNum(s), e, 1e-9)) { console.log('parse fail', s, parseNum(s)); errors++; }
// cyfry znaczące
const sig = [['1,0', 2], ['0,0450', 3], ['6,7·10^-3', 2], ['12', 2], ['1,04', 3], ['-0,5', 1]];
for (const [s, n] of sig) if (sigDigits(s) !== n) { console.log('sigDigits fail', s, sigDigits(s)); errors++; }
// sprawdzanie wyniku: poprawne zaokrąglenie zaliczone, błędne nie
const chk = [['1,0', 1.04, true], ['1,04', 1.04, true], ['1', 1.04, false], ['0,96', 1.04, false], ['1,1', 1.05, true], ['1,1', 1.04, false], ['2,2', 2.24, true], ['6,7·10^-3', 0.00674, true], ['abc', 1, false]];
for (const [s, a, ok] of chk) if (checkNum(s, a, 0.03) !== ok) { console.log('checkNum fail', s, a, 'oczekiwano', ok); errors++; }
process.exit(errors ? 1 : 0);

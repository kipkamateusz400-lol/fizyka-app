// Test: każdy generator losowany 400 razy – sprawdza poprawność danych
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, '../app/src/main/assets/js');
const ctx = { console, Math, module: undefined };
vm.createContext(ctx);
for (const f of ['util.js', 'gen-mech.js', 'gen-grav.js', 'gen-wave.js', 'gen-elec.js', 'gen-thermo.js', 'gen-atom.js'])
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8').replace(/^'use strict';/m, '').replace(/^const (\w+)/gm, 'var $1'), ctx, { filename: f });
const { GENS, AREAS, parseNum, closeEnough } = ctx;
let errors = 0;
const err = (g, m) => { errors++; if (errors < 40) console.log('BŁĄD', g.id, m); };
for (const g of GENS) {
  for (let i = 0; i < 400; i++) {
    const t = g.gen();
    const html = JSON.stringify(t);
    if (/NaN|undefined|Infinity|—/.test(html)) { err(g, 'NaN/undefined w treści: ' + html.match(/.{40}(NaN|undefined|Infinity|—).{20}/)?.[0]); break; }
    if (!t.parts?.length) err(g, 'brak części');
    for (const p of t.parts) {
      if (!(p.pts >= 1 && p.pts <= 4)) err(g, 'pkt ' + p.pts);
      if (p.kind === 'num') { if (!isFinite(p.ans)) err(g, 'ans ' + p.ans); if (p.ans <= 0 && p.ans !== 0) err(g, 'ujemna odp ' + p.ans + ' ' + p.q); }
      if (p.kind === 'mc' && !(p.correct >= 0 && p.correct < p.options.length)) err(g, 'mc correct');
      if (p.kind === 'tf' && !(p.statements.length >= 2)) err(g, 'tf');
      if (p.kind === 'open' && !p.model) err(g, 'open model');
    }
  }
}
const per = {}; GENS.forEach(g => per[g.area] = (per[g.area] || 0) + 1);
console.log('Generatorów:', GENS.length, per, 'błędów:', errors);
// parser
const cases = [['6,7', 6.7], ['6.7e-3', 0.0067], ['6,7·10^-3', 0.0067], ['6,7*10^5', 670000], ['1,2·10⁻¹⁹', 1.2e-19], ['12 m/s', 12], ['3x10^8', 3e8], ['-5', -5]];
for (const [s, e] of cases) if (!closeEnough(parseNum(s), e, 1e-9)) { console.log('parse fail', s, parseNum(s)); errors++; }
process.exit(errors ? 1 : 0);

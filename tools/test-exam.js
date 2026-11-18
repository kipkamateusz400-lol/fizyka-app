// Test: generator arkusza – 60 pkt, 8–15 pkt zamkniętych, 23–35 poleceń, wszystkie działy
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, '../app/src/main/assets/js');
const ctx = { console, Math, Date, window: { addEventListener() {} }, document: { addEventListener() {} }, location: {} };
vm.createContext(ctx);
for (const f of ['util.js', 'gen-mech.js', 'gen-grav.js', 'gen-wave.js', 'gen-elec.js', 'gen-thermo.js', 'gen-atom.js', 'gen-mech2.js', 'gen-grav2.js', 'gen-wave2.js', 'gen-elec2.js', 'gen-thermo2.js', 'gen-atom2.js', 'gen-extra.js', 'theory.js', 'wzory.js', 'app.js'])
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8').replace(/^const (\w+)/gm, 'var $1'), ctx, { filename: f });
let bad = 0; const t0 = Date.now();
for (let i = 0; i < 100; i++) {
  for (const target of [60, 20]) {
    const ex = ctx.buildExam(target);
    const parts = ex.tasks.flatMap(t => t.parts), sum = parts.reduce((a, p) => a + p.pts, 0);
    const closed = parts.filter(p => p.kind === 'mc' || p.kind === 'tf').reduce((a, p) => a + p.pts, 0);
    const areas = new Set(ex.tasks.map(t => ctx.genById(t.gen).area));
    if (sum !== target || (target === 60 && (closed < 8 || closed > 15 || parts.length < 23 || parts.length > 35 || areas.size < 6))) { bad++; console.log(target, sum, closed, parts.length, areas.size); }
    if (i === 0) console.log(`arkusz ${target}: ${ex.tasks.length} wiązek, ${parts.length} poleceń, zamknięte ${closed} pkt, działy ${areas.size}`);
  }
}
console.log('źle:', bad, 'czas na 200 arkuszy:', Date.now() - t0, 'ms');
process.exit(bad ? 1 : 0);

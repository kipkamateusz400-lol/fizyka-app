/* Narzędzia wspólne: losowanie, formatowanie liczb po polsku, sprawdzanie odpowiedzi */
'use strict';

const C = {
  g: 9.81, G: 6.674e-11, c: 2.998e8, h: 6.626e-34, e: 1.602e-19, kB: 1.381e-23,
  NA: 6.022e23, R: 8.314, me: 9.109e-31, mp: 1.6726e-27, mn: 1.6749e-27, u: 1.6605e-27,
  k: 8.99e9, eps0: 8.854e-12, mu0: 4 * Math.PI * 1e-7, Mz: 5.972e24, Rz: 6.378e6,
  Ms: 1.988e30, au: 1.496e11, pc: 3.086e16, ly: 9.461e15, eV: 1.602e-19, H0: 70,
  cw: 4200, cl: 2100, Lt: 334000, Lp: 2.26e6, rhow: 1000, sigma: 5.67e-8, b: 2.898e-3,
  uMeV: 931.5
};

const R = {
  /* liczba z przedziału [a,b] z krokiem step */
  n(a, b, step = 1) {
    const k = Math.round((b - a) / step);
    const v = a + step * Math.floor(Math.random() * (k + 1));
    return +v.toFixed(10);
  },
  i(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); },
  pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  },
  sample(arr, n) { return R.shuffle(arr).slice(0, n); }
};

const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };

/* Formatowanie liczby: przecinek dziesiętny, notacja wykładnicza dla bardzo małych/dużych */
function fmt(x, sig = 3) {
  if (!isFinite(x)) return '—';
  if (x === 0) return '0';
  const ax = Math.abs(x);
  const ex = Math.floor(Math.log10(ax));
  if (ax >= 1e5 || ax < 1e-3) {
    let m = x / Math.pow(10, ex);
    m = +m.toPrecision(sig);
    let e2 = ex;
    if (Math.abs(m) >= 10) { m = m / 10; e2++; }
    const ms = trimZeros(m.toFixed(Math.max(0, sig - 1))).replace('.', ',');
    return ms + '·10' + String(e2).split('').map(ch => SUP[ch]).join('');
  }
  const decimals = Math.max(0, sig - 1 - ex);
  return trimZeros((+x.toPrecision(sig)).toFixed(decimals)).replace('.', ',');
}
function trimZeros(s) { return s.indexOf('.') >= 0 ? s.replace(/\.?0+$/, '') : s; }
/* dane wejściowe – pokazujemy dokładnie */
function d(x) { return fmt(x, 4); }
/* liczba z przecinkiem bez zaokrąglania */
function pl(x) { return String(x).replace('.', ','); }

/* Ułamek w HTML */
function fr(a, b) { return `<span class="fr"><span>${a}</span><span>${b}</span></span>`; }
function sq(a) { return `√<span class="sq">${a}</span>`; }
function eq(s) { return `<div class="eq">${s}</div>`; }
function v(s) { return `<i>${s}</i>`; }

/* Odczytanie liczby wpisanej przez ucznia */
function parseNum(str) {
  if (str == null) return NaN;
  let s = String(str).trim().toLowerCase();
  if (!s) return NaN;
  const back = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
  s = s.replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/g, ch => back[ch]);
  s = s.replace(/\s+/g, '').replace(/,/g, '.').replace(/−/g, '-');
  s = s.replace(/[·*x×]10\^?\(?(-?\d+)\)?/, 'e$1');
  s = s.replace(/^10\^?(-?\d+)$/, '1e$1');
  s = s.replace(/[a-zA-Z°%/]+$/, m => (m.startsWith('e') ? m : ''));
  const n = Number(s);
  return isFinite(n) ? n : NaN;
}

function closeEnough(user, ans, tol = 0.03) {
  if (!isFinite(user)) return false;
  if (ans === 0) return Math.abs(user) < 1e-9;
  return Math.abs(user - ans) / Math.abs(ans) <= tol;
}


/* Wykres z siatką do odczytu wartości.
   o = { xl, yl, xmax, ymax, xmin=0, ymin=0, xstep, ystep, series:[{pts:[[x,y],…], dots, dash, label}], fmtx, fmty } */
function plot(o) {
  const W = 330, H = 220, L = 46, B = 34, T = 16, Rm = 14;
  const xmin = o.xmin || 0, ymin = o.ymin || 0;
  const X = x => L + (x - xmin) / (o.xmax - xmin) * (W - L - Rm), Y = y => H - B - (y - ymin) / (o.ymax - ymin) * (H - B - T);
  const fx = o.fmtx || (x => fmt(x, 3)), fy = o.fmty || (y => fmt(y, 3));
  let g = '';
  for (let x = xmin; x <= o.xmax + 1e-9; x += o.xstep) g += `<path d="M${X(x).toFixed(1)},${Y(ymin).toFixed(1)}V${Y(o.ymax).toFixed(1)}" class="gr"/><text x="${X(x).toFixed(1)}" y="${H - B + 14}" text-anchor="middle">${fx(+x.toFixed(9))}</text>`;
  for (let y = ymin; y <= o.ymax + 1e-9; y += o.ystep) g += `<path d="M${X(xmin).toFixed(1)},${Y(y).toFixed(1)}H${X(o.xmax).toFixed(1)}" class="gr"/><text x="${L - 5}" y="${(Y(y) + 4).toFixed(1)}" text-anchor="end">${fy(+y.toFixed(9))}</text>`;
  let sv = '';
  (o.series || []).forEach(se => {
    if (se.pts.length > 1 && !se.only) sv += `<path d="${se.pts.map((pt, i) => (i ? 'L' : 'M') + X(pt[0]).toFixed(1) + ',' + Y(pt[1]).toFixed(1)).join(' ')}" class="ln${se.dash ? ' dsh' : ''}${se.alt ? ' alt' : ''}"/>`;
    if (se.dots) se.pts.forEach(pt => { sv += `<circle cx="${X(pt[0]).toFixed(1)}" cy="${Y(pt[1]).toFixed(1)}" r="3.2" class="dot"/>`; });
    if (se.label) { const pt = se.pts[se.pts.length - 1]; sv += `<text x="${(X(pt[0]) - 4).toFixed(1)}" y="${(Y(pt[1]) - 6).toFixed(1)}" text-anchor="end" class="lab">${se.label}</text>`; }
  });
  return `<svg viewBox="0 0 ${W} ${H}" class="plot">${g}<path d="M${L},${Y(ymin)}H${W - Rm + 4}M${L},${Y(ymin)}V${T - 6}" class="ax"/>${sv}<text x="${W - 2}" y="${H - 4}" text-anchor="end" class="axl">${o.xl}</text><text x="${L + 4}" y="${T - 4}" class="axl">${o.yl}</text></svg>`;
}

const deg = x => x * Math.PI / 180;
const rad2deg = x => x * 180 / Math.PI;

/* Rejestr generatorów zadań */
const AREAS = [
  { id: 'mech', name: 'Mechanika', full: 'Mechanika punktu materialnego i bryły sztywnej', icon: '⚙' },
  { id: 'grav', name: 'Grawitacja i astronomia', full: 'Grawitacja i elementy astronomii', icon: '🪐' },
  { id: 'wave', name: 'Drgania, fale, optyka', full: 'Drgania, fale i optyka', icon: '〰' },
  { id: 'elec', name: 'Elektryczność i magnetyzm', full: 'Elektryczność i magnetyzm', icon: '⚡' },
  { id: 'thermo', name: 'Termodynamika i materia', full: 'Własności materii, termodynamika, hydrostatyka i aerostatyka', icon: '🌡' },
  { id: 'atom', name: 'Fizyka atomowa i jądrowa', full: 'Elementy fizyki atomowej i jądrowej', icon: '⚛' }
];
const GENS = [];
function G(def) { GENS.push(def); }

if (typeof module !== 'undefined') module.exports = { plot, C, R, fmt, d, pl, fr, sq, eq, v, parseNum, closeEnough, deg, rad2deg, AREAS, GENS, G };

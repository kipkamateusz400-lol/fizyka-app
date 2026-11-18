/* FIZYKA ATOMOWA I JĄDROWA – zestaw 2 */
'use strict';

G({ id: 'atom-aktywnosc', area: 'atom', title: 'Aktywność próbki promieniotwórczej', gen() {
  const iso = R.pick([{ n: 'kobaltu-60', A: 60, T: 5.27 * 3.156e7, Ts: '5,27 roku' }, { n: 'jodu-131', A: 131, T: 8.02 * 86400, Ts: '8,02 doby' }, { n: 'cezu-137', A: 137, T: 30.1 * 3.156e7, Ts: '30,1 roku' }, { n: 'fosforu-32', A: 32, T: 14.3 * 86400, Ts: '14,3 doby' }]);
  const mug = R.n(1, 20, 1), N = mug * 1e-6 / (iso.A / 1000) * C.NA, lam = Math.LN2 / iso.T, Act = lam * N;
  return {
    ctx: `Próbka zawiera ${mug} μg izotopu ${iso.n} (masa molowa ≈ ${iso.A} g/mol). Okres połowicznego rozpadu wynosi ${iso.Ts}. N<sub>A</sub> = 6,02·10²³ mol⁻¹.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz liczbę jąder izotopu w próbce.', ans: N, unit: '', hint: 'N = (m/M)·N_A.', steps: [`${eq(`N = ${fr('m', 'M')}N<sub>A</sub> ≈ <b>${fmt(N)}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz aktywność próbki (w Bq). Zapisz obliczenia.', ans: Act, unit: 'Bq',
        hint: 'A = λN, gdzie stała rozpadu λ = ln2/T₁/₂. Okres zamień na sekundy!',
        steps: [`${eq(`λ = ${fr('ln 2', 'T<sub>1/2</sub>')} = ${fr('0,693', fmt(iso.T) + ' s')} ≈ ${fmt(lam)} s⁻¹`)}`, `${eq(`A = λN ≈ <b>${fmt(Act)} Bq</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna stała rozpadu (w s⁻¹).', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'atom-c14', area: 'atom', title: 'Datowanie radiowęglowe', gen() {
  const pct = R.pick([70, 60, 50, 40, 25, 20, 12.5, 10]), T = 5730;
  const t = T * Math.log2(100 / pct);
  return {
    ctx: `W żywych organizmach stosunek izotopu ¹⁴C do ¹²C jest stały. Po śmierci organizmu ¹⁴C rozpada się (T₁/₂ = 5730 lat). W kawałku drewna znalezionym na stanowisku archeologicznym aktywność ¹⁴C (na gram węgla) stanowi ${pl(pct)}% aktywności w żywym drewnie.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz wiek znaleziska. Zapisz obliczenia.', ans: t, unit: 'lat',
        hint: 'A/A₀ = (1/2)^(t/T). Weź logarytm: t = T·log₂(A₀/A) = T·log(A₀/A)/log 2.',
        steps: [`${eq(`${fr(pl(pct), '100')} = (${fr('1', '2')})<sup>t/T</sup>`)}`, `${eq(`t = T·${fr(`log(100/${pl(pct)})`, 'log 2')} ≈ <b>${fmt(t)} lat</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne równanie prawa rozpadu.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Dlaczego metodą ¹⁴C nie da się datować skał sprzed milionów lat?', options: ['po tak długim czasie pozostaje znikoma, niemierzalna ilość ¹⁴C', '¹⁴C nie rozpada się w skałach', 'okres półrozpadu zmienia się z czasem', 'skały nie zawierają węgla-12'], correct: 0, steps: ['Po ok. 10 okresach (57 000 lat) zostaje ~0,1% izotopu – metoda działa do ok. 50 000 lat.'] }
    ]
  };
}});

G({ id: 'atom-reakcja-energia', area: 'atom', title: 'Energia reakcji syntezy', gen() {
  const m = { H1: 1.007825, H2: 2.014102, H3: 3.016049, He3: 3.016029, He4: 4.002603, n: 1.008665 };
  const rx = R.pick([
    { s: '²₁H + ³₁H → ⁴₂He + ¹₀n', l: m.H2 + m.H3, r: m.He4 + m.n, d: 'deuter (2,014102 u), tryt (3,016049 u), hel-4 (4,002603 u), neutron (1,008665 u)' },
    { s: '²₁H + ²₁H → ³₂He + ¹₀n', l: 2 * m.H2, r: m.He3 + m.n, d: 'deuter (2,014102 u), hel-3 (3,016029 u), neutron (1,008665 u)' },
    { s: '²₁H + ²₁H → ³₁H + ¹₁H', l: 2 * m.H2, r: m.H3 + m.H1, d: 'deuter (2,014102 u), tryt (3,016049 u), wodór-1 (1,007825 u)' },
    { s: '²₁H + ³₂He → ⁴₂He + ¹₁H', l: m.H2 + m.He3, r: m.He4 + m.H1, d: 'deuter (2,014102 u), hel-3 (3,016029 u), hel-4 (4,002603 u), wodór-1 (1,007825 u)' }
  ]);
  const dm = rx.l - rx.r, E = dm * C.uMeV;
  return {
    ctx: `Rozważ reakcję syntezy: <b class="nuc">${rx.s}</b>. Masy atomowe: ${rx.d}. 1 u ↔ 931,5 MeV.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz energię wydzielaną w jednej reakcji (w MeV). Zapisz obliczenia.', ans: E, unit: 'MeV',
        hint: 'Energia reakcji = (masa substratów − masa produktów)·c². Elektrony po obu stronach się bilansują, więc można użyć mas atomowych.',
        steps: [`${eq(`Δm = ${fmt(rx.l, 7)} u − ${fmt(rx.r, 7)} u ≈ ${fmt(dm, 4)} u`)}`, `${eq(`E = Δm·931,5 MeV/u ≈ <b>${fmt(E)} MeV</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny deficyt masy.', '0 pkt – brak postępu.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań o syntezie jądrowej.', statements: R.shuffle([
        { s: 'Synteza wymaga bardzo wysokiej temperatury, aby jądra pokonały odpychanie elektrostatyczne.', v: true },
        { s: 'Głównym źródłem energii Słońca jest synteza wodoru w hel.', v: true },
        { s: 'W reakcji syntezy masa produktów jest większa niż masa substratów.', v: false },
        { s: 'W syntezie zachowana jest liczba nukleonów i ładunek.', v: true }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'atom-rtg', area: 'atom', title: 'Lampa rentgenowska – granica widma', gen() {
  const U = R.n(10, 100, 5) * 1000, lmin = C.h * C.c / (C.e * U);
  return {
    ctx: `W lampie rentgenowskiej elektrony przyspieszane są napięciem ${d(U / 1000)} kV i hamowane w anodzie. h = 6,63·10⁻³⁴ J·s, c = 3·10⁸ m/s, e = 1,6·10⁻¹⁹ C.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz najkrótszą długość fali promieniowania emitowanego przez lampę (w nm). Zapisz obliczenia.', ans: lmin * 1e9, unit: 'nm',
        hint: 'Najkrótsza fala = największa energia fotonu = cała energia elektronu (eU) zamieniona na jeden foton.',
        steps: [`${eq(`eU = ${fr('hc', 'λ<sub>min</sub>')} → λ<sub>min</sub> = ${fr('hc', 'eU')}`)}`, `${eq(`λ<sub>min</sub> ≈ ${fmt(lmin)} m = <b>${fmt(lmin * 1e9)} nm</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne równanie eU = hc/λ.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Jak zmieni się λ<sub>min</sub> po dwukrotnym zwiększeniu napięcia?', options: ['zmaleje 2 razy', 'wzrośnie 2 razy', 'zmaleje 4 razy', 'nie zmieni się'], correct: 0, steps: ['λ<sub>min</sub> ∝ 1/U.'] }
    ]
  };
}});

G({ id: 'atom-jonizacja', area: 'atom', title: 'Jonizacja atomu wodoru', gen() {
  const n = R.pick([1, 2, 3]), En = 13.6 / (n * n), lam0 = C.h * C.c / (En * C.eV) * 1e9;
  const lam = Math.floor(lam0 * R.n(0.4, 0.8, 0.1) / 5) * 5, Ek = C.h * C.c / (lam * 1e-9) / C.eV - En;
  return {
    ctx: `Atom wodoru, w którym elektron jest w stanie n = ${n} (E<sub>n</sub> = −13,6 eV/n²), pochłania foton o długości fali ${lam} nm. h = 6,63·10⁻³⁴ J·s, c = 3·10⁸ m/s, 1 eV = 1,6·10⁻¹⁹ J.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz najdłuższą falę, która może zjonizować atom w tym stanie (w nm).', ans: lam0, unit: 'nm', hint: 'Energia jonizacji ze stanu n to |E_n|. λ = hc/|E_n|.',
        steps: [`${eq(`|E<sub>${n}</sub>| = ${fmt(En)} eV → λ = ${fr('hc', '|E<sub>n</sub>|')} ≈ <b>${fmt(lam0)} nm</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz energię kinetyczną wybitego elektronu (w eV). Zapisz obliczenia.', ans: Ek, unit: 'eV',
        hint: 'Energia fotonu = energia jonizacji + energia kinetyczna elektronu (jak w zjawisku fotoelektrycznym).',
        steps: [`${eq(`E<sub>f</sub> = ${fr('hc', 'λ')} ≈ ${fmt(Ek + En)} eV`)}`, `${eq(`E<sub>k</sub> = E<sub>f</sub> − |E<sub>${n}</sub>| ≈ <b>${fmt(Ek)} eV</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna energia fotonu.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'atom-laser', area: 'atom', title: 'Liczba fotonów emitowanych przez laser', gen() {
  const P = R.n(1, 50, 1) / 1000, lam = R.pick([405, 532, 633, 650, 780]);
  const Ef = C.h * C.c / (lam * 1e-9), N = P / Ef, p = C.h / (lam * 1e-9), F = P / C.c;
  return {
    ctx: `Wskaźnik laserowy o mocy ${d(P * 1000)} mW emituje światło o długości fali ${lam} nm. h = 6,63·10⁻³⁴ J·s, c = 3·10⁸ m/s.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz liczbę fotonów emitowanych w ciągu sekundy. Zapisz obliczenia.', ans: N, unit: '1/s',
        hint: 'Moc = (liczba fotonów na sekundę)·(energia jednego fotonu).',
        steps: [`${eq(`E<sub>f</sub> = ${fr('hc', 'λ')} ≈ ${fmt(Ef)} J`)}`, `${eq(`n = ${fr('P', 'E<sub>f</sub>')} ≈ <b>${fmt(N)} s⁻¹</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna energia fotonu.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz siłę, jaką wiązka wywiera na powierzchnię, która ją całkowicie pochłania.', ans: F, unit: 'N', hint: 'Każdy foton oddaje pęd h/λ. F = n·h/λ = P/c.',
        steps: [`${eq(`F = n·${fr('h', 'λ')} = ${fr('P', 'c')} ≈ <b>${fmt(F)} N</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'atom-dawka', area: 'atom', title: 'Dawka pochłonięta promieniowania', gen() {
  const Act = R.n(1, 20, 1) * 1e6, Eg = R.pick([0.364, 0.662, 1.17, 0.14]), frac = R.n(10, 50, 10) / 100, m = R.n(0.5, 5, 0.5), th = R.n(1, 10, 1);
  const E = Act * th * 3600 * frac * Eg * 1e6 * C.eV, D = E / m;
  return {
    ctx: `Źródło o aktywności ${fmt(Act)} Bq emituje w każdym rozpadzie jeden kwant γ o energii ${pl(Eg)} MeV. Narząd o masie ${d(m)} kg pochłania ${Math.round(frac * 100)}% wyemitowanych kwantów. Ekspozycja trwała ${th} h, a aktywność w tym czasie jest praktycznie stała. 1 eV = 1,6·10⁻¹⁹ J.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz dawkę pochłoniętą przez narząd (w mGy). Zapisz obliczenia.', ans: D * 1000, unit: 'mGy',
        hint: 'Liczba rozpadów = A·t. Pochłonięta energia = (liczba pochłoniętych kwantów)·E_γ. Dawka D = E/m (1 Gy = 1 J/kg).',
        steps: [`${eq(`N = A·t·${pl(frac)} ≈ ${fmt(Act * th * 3600 * frac)} kwantów`)}`, `${eq(`E = N·E<sub>γ</sub> ≈ ${fmt(E)} J`)}`, `${eq(`D = ${fr('E', 'm')} ≈ ${fmt(D)} Gy = <b>${fmt(D * 1000)} mGy</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawna pochłonięta energia.', '1 pkt – poprawna liczba rozpadów (pochłoniętych kwantów).', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'atom-absorpcja', area: 'atom', title: 'Które fotony pochłonie atom wodoru?', gen() {
  const lines = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4]];
  const [a, b] = R.pick(lines), Eok = 13.6 * (1 / (a * a) - 1 / (b * b));
  const valid = []; for (let k = a + 1; k < 40; k++) valid.push(13.6 * (1 / (a * a) - 1 / (k * k)));
  const ion = 13.6 / (a * a);
  const wrong = R.sample([Eok + 1.1, Eok - 0.9, Eok * 0.75, Eok + 2.3, Eok * 0.6, Eok - 0.4].filter(x => x > 0.3 && x < ion - 0.05 && valid.every(vv => Math.abs(vv - x) > 0.08)), 3);
  const opts = R.shuffle([Eok, ...wrong]);
  return {
    ctx: `Atom wodoru znajduje się w stanie n = ${a} (E<sub>n</sub> = −13,6 eV/n²). Pada na niego światło zawierające fotony o różnych energiach.`,
    parts: [
      { kind: 'mc', pts: 1, q: 'Foton o której energii może zostać pochłonięty przez atom (bez jonizacji)?', options: opts.map(x => `${fmt(x)} eV`), correct: opts.indexOf(Eok),
        steps: [`Atom pochłania tylko fotony o energii równej różnicy poziomów. E<sub>${b}</sub> − E<sub>${a}</sub> = 13,6(1/${a * a} − 1/${b * b}) ≈ ${fmt(Eok)} eV.`] },
      { kind: 'num', pts: 1, q: `Po pochłonięciu fotonu atom jest w stanie n = ${b}. Ile różnych linii widmowych może wyemitować, wracając do stanu podstawowego?`, ans: b * (b - 1) / 2, unit: '', tol: 0.001,
        hint: 'Policz wszystkie możliwe przejścia między poziomami 1…n: n(n − 1)/2.', steps: [`${eq(`${fr('n(n − 1)', '2')} = ${fr(`${b}·${b - 1}`, '2')} = <b>${b * (b - 1) / 2}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

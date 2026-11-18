/* GRAWITACJA I ASTRONOMIA – zestaw 2 */
'use strict';

G({ id: 'grav-masa-planety', area: 'grav', title: 'Masa planety z ruchu jej księżyca', gen() {
  const sys = R.pick([
    { k: 'Io', p: 'Jowisza', r: 4.217e8, T: 1.769, M: 1.898e27 },
    { k: 'Fobos', p: 'Marsa', r: 9.376e6, T: 0.3189, M: 6.42e23 },
    { k: 'Tytan', p: 'Saturna', r: 1.222e9, T: 15.945, M: 5.68e26 },
    { k: 'Księżyc', p: 'Ziemi', r: 3.844e8, T: 27.32, M: 5.97e24 },
    { k: 'Tryton', p: 'Neptuna', r: 3.548e8, T: 5.877, M: 1.024e26 }
  ]);
  const Ts = sys.T * 86400, M = 4 * Math.PI ** 2 * sys.r ** 3 / (C.G * Ts * Ts);
  return {
    ctx: `${sys.k} krąży wokół ${sys.p} po orbicie, którą można uznać za kołową, o promieniu ${fmt(sys.r, 4)} m. Okres obiegu wynosi ${pl(sys.T)} doby (1 doba = 86 400 s). G = 6,674·10⁻¹¹ N·m²/kg².`,
    parts: [
      { kind: 'num', pts: 3, q: `Wyprowadź wzór i oblicz masę ${sys.p}. Zapisz obliczenia.`, ans: M, unit: 'kg',
        hint: 'Siła grawitacji planety jest siłą dośrodkową dla księżyca. Prędkość zapisz przez okres: v = 2πr/T. Masa księżyca się skraca.',
        steps: [`${eq(`${fr('GMm', 'r²')} = ${fr('mv²', 'r')},   v = ${fr('2πr', 'T')}`)}`, `${eq(`M = ${fr('4π²r³', 'GT²')}`)}`, `T = ${pl(sys.T)}·86400 s ≈ ${fmt(Ts)} s ${eq(`M ≈ <b>${fmt(M)} kg</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawny wzór M = 4π²r³/(GT²).', '1 pkt – przyrównanie siły grawitacji do dośrodkowej.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Czy z tych danych można wyznaczyć masę księżyca?', options: ['nie – masa księżyca skraca się w równaniu ruchu', 'tak – z III prawa Keplera', 'tak – z prędkości orbitalnej', 'tak – z okresu obiegu'], correct: 0, steps: ['Ruch satelity zależy tylko od masy ciała centralnego. Masy satelity tak nie wyznaczymy.'] }
    ]
  };
}});

G({ id: 'grav-wysokosc', area: 'grav', title: 'Ciężar na dużej wysokości', gen() {
  const k = R.pick([0.25, 0.5, 1, 1.5, 2, 3]), m = R.n(60, 100, 5);
  const gh = C.g / (1 + k) ** 2;
  return {
    ctx: `Astronauta o masie ${d(m)} kg znajduje się w spoczynku względem Ziemi (np. w rakiecie zawieszonej nad biegunem) na wysokości h = ${fmt(k)}·R<sub>Z</sub> nad powierzchnią Ziemi. Na powierzchni g = 9,81 m/s².`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz wartość siły grawitacji działającej na astronautę na tej wysokości. Zapisz obliczenia.', ans: m * gh, unit: 'N',
        hint: 'g ∝ 1/r². Odległość od środka Ziemi to R_Z + h = (1 + k)R_Z.',
        steps: [`${eq(`g<sub>h</sub> = g${fr('R<sub>Z</sub>²', '(R<sub>Z</sub> + h)²')} = ${fr('g', `(1 + ${fmt(k)})²`)} ≈ ${fmt(gh)} m/s²`)}`, `${eq(`F = mg<sub>h</sub> ≈ <b>${fmt(m * gh)} N</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne g na wysokości h.', '0 pkt – np. przyjęcie r = h.'] },
      { kind: 'num', pts: 1, q: 'Na jakiej wysokości (w promieniach Ziemi) przyspieszenie grawitacyjne jest 9 razy mniejsze niż na powierzchni?', ans: 2, unit: 'R_Z', tol: 0.01, hint: '(R + h)² = 9R² → R + h = 3R.', steps: [`${eq('R<sub>Z</sub> + h = 3R<sub>Z</sub> → h = <b>2R<sub>Z</sub></b>')}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'grav-gwiazda', area: 'grav', title: 'Temperatura i moc promieniowania gwiazdy', gen() {
  const lam = R.n(250, 950, 10), Tsun = 5772, rr = R.pick([0.5, 0.8, 1.5, 2, 3, 10]);
  const T = C.b / (lam * 1e-9), L = rr * rr * (T / Tsun) ** 4;
  const col = lam < 400 ? 'niebieskobiała' : lam < 550 ? 'biała lub żółtawa' : 'pomarańczowa lub czerwona';
  return {
    ctx: `Maksimum natężenia w widmie promieniowania pewnej gwiazdy przypada na długość fali ${lam} nm. Promień gwiazdy jest ${fmt(rr)} razy większy od promienia Słońca. Temperatura powierzchni Słońca ≈ 5772 K. Gwiazdę traktuj jak ciało doskonale czarne; b = 2,898·10⁻³ m·K.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz temperaturę powierzchni gwiazdy.', ans: T, unit: 'K', hint: 'Prawo Wiena: λ_max·T = b.', steps: [`${eq(`T = ${fr('b', 'λ<sub>max</sub>')} = ${fr('2,898·10⁻³', `${lam}·10⁻⁹`)} ≈ <b>${fmt(T)} K</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz, ile razy moc promieniowania (jasność) gwiazdy jest większa od mocy promieniowania Słońca. Zapisz obliczenia.', ans: L, unit: '',
        hint: 'Prawo Stefana–Boltzmanna: P = σ·4πR²·T⁴. Policz stosunek dla gwiazdy i Słońca.',
        steps: [`${eq(`${fr('P', 'P<sub>S</sub>')} = (${fr('R', 'R<sub>S</sub>')})²(${fr('T', 'T<sub>S</sub>')})⁴ = ${fmt(rr)}²·(${fr(fmt(T), '5772')})⁴`)}`, `${eq(`${fr('P', 'P<sub>S</sub>')} ≈ <b>${fmt(L)}</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny zapis stosunku mocy z prawa Stefana–Boltzmanna.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Jakiej barwy jest ta gwiazda (w przybliżeniu)?', options: R.shuffle(['niebieskobiała', 'biała lub żółtawa', 'pomarańczowa lub czerwona']), correct: -1, fix: col, steps: ['Im krótsza λ<sub>max</sub>, tym gorętsza i bardziej niebieska gwiazda.'] }
    ].map(p => { if (p.fix) { p.correct = p.options.indexOf(p.fix); delete p.fix; } return p; })
  };
}});

G({ id: 'grav-punkt-rownowagi', area: 'grav', title: 'Punkt równowagi sił grawitacji dwóch ciał', gen() {
  const k = R.pick([4, 9, 16, 25, 36, 49, 64, 81]), dd = R.n(100, 500, 50) * 1e6;
  const x = dd / (1 + 1 / Math.sqrt(k));
  return {
    ctx: `Planeta ma masę ${k} razy większą od masy swojego księżyca. Odległość między ich środkami wynosi ${fmt(dd / 1000)} km. Sonda leci po prostej łączącej środki obu ciał.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz, w jakiej odległości od środka planety siły grawitacji planety i księżyca działające na sondę równoważą się (w km). Zapisz obliczenia.', ans: x / 1000, unit: 'km',
        hint: 'GMm/x² = G(M/k)m/(d − x)². Spierwiastkuj obie strony – nie trzeba rozwiązywać kwadratowego.',
        steps: [`${eq(`${fr('GMm', 'x²')} = ${fr(`G${fr('M', k)}m`, '(d − x)²')}`)}`, `Pierwiastkujemy: ${eq(`${fr('d − x', 'x')} = ${fr('1', `√${k}`)} = ${fr('1', Math.sqrt(k))}`)}`, `${eq(`x = ${fr('d', `1 + ${fr('1', Math.sqrt(k))}`)} ≈ <b>${fmt(x / 1000)} km</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawne przekształcenie (pierwiastkowanie).', '1 pkt – przyrównanie sił grawitacji.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'grav-wiek', area: 'grav', title: 'Wiek Wszechświata ze stałej Hubble’a', gen() {
  const H = R.n(65, 75, 1), Mpc = 3.086e22, yr = 3.156e7;
  const t = Mpc / (H * 1000) / yr;
  const dGal = R.n(50, 500, 10), vGal = H * dGal;
  return {
    ctx: `Przyjmij, że stała Hubble’a wynosi H₀ = ${H} (km/s)/Mpc oraz że Wszechświat rozszerzał się zawsze w tym samym tempie. 1 Mpc = 3,086·10²² m, 1 rok ≈ 3,156·10⁷ s.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oszacuj wiek Wszechświata (w miliardach lat). Zapisz obliczenia.', ans: t / 1e9, unit: 'mld lat',
        hint: 'Galaktyka w odległości d oddala się z v = H₀d. Czas, w którym „doleciała” tam od początku: t = d/v = 1/H₀. Zamień jednostki H₀ na 1/s.',
        steps: [`${eq(`t = ${fr('d', 'v')} = ${fr('1', 'H₀')}`)}`, `${eq(`H₀ = ${fr(`${H}·10³ m/s`, '3,086·10²² m')} ≈ ${fmt(H * 1000 / Mpc)} s⁻¹`)}`, `${eq(`t ≈ ${fmt(1 / (H * 1000 / Mpc))} s ≈ <b>${fmt(t / 1e9)} mld lat</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – zapis t = 1/H₀ lub poprawna zamiana jednostek H₀.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: `Oblicz prędkość oddalania się galaktyki odległej o ${dGal} Mpc.`, ans: vGal, unit: 'km/s', hint: 'v = H₀d.', steps: [`${eq(`v = ${H}·${dGal} = <b>${fmt(vGal)} km/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'grav-spadek-planeta', area: 'grav', title: 'Wyznaczanie g i masy nieznanej planety', gen() {
  const gp = R.n(2, 20, 0.5), hh = R.n(1, 5, 0.5), Rp = R.n(2, 10, 0.5) * 1e6;
  const t = Math.sqrt(2 * hh / gp), M = gp * Rp * Rp / C.G;
  return {
    ctx: `Łazik na nieznanej planecie upuścił kamień z wysokości ${d(hh)} m. Spadek trwał ${fmt(t, 3)} s. Promień planety wynosi ${fmt(Rp)} m. Planeta nie ma atmosfery.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz przyspieszenie grawitacyjne na powierzchni planety.', ans: gp, unit: 'm/s²', hint: 'h = gt²/2.', steps: [`${eq(`g = ${fr('2h', 't²')} ≈ <b>${fmt(gp)} m/s²</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz masę planety. Zapisz obliczenia.', ans: M, unit: 'kg', hint: 'g = GM/R² → M = gR²/G.', steps: [`${eq(`M = ${fr('gR²', 'G')} ≈ <b>${fmt(M)} kg</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór M = gR²/G.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'grav-gestosc', area: 'grav', title: 'Pierwsza prędkość kosmiczna a gęstość planety', gen() {
  const rho = R.n(1000, 6000, 500), Rr = R.n(1, 8, 0.5) * 1e6;
  const M = 4 / 3 * Math.PI * Rr ** 3 * rho, v1 = Math.sqrt(C.G * M / Rr);
  return {
    ctx: `Planeta ma kształt kuli o promieniu ${fmt(Rr)} m i średniej gęstości ${d(rho)} kg/m³.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz pierwszą prędkość kosmiczną dla tej planety. Zapisz obliczenia.', ans: v1, unit: 'm/s',
        hint: 'v₁ = √(GM/R), a masę policz z gęstości: M = ρ·(4/3)πR³.',
        steps: [`${eq(`M = ρ·${fr('4', '3')}πR³ ≈ ${fmt(M)} kg`)}`, `Siła grawitacji = siła dośrodkowa przy powierzchni: ${eq(`v₁ = ${sq(fr('GM', 'R'))} = R${sq(fr('4πGρ', '3'))}`)}`, `${eq(`v₁ ≈ <b>${fmt(v1)} m/s</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawne v₁ wyrażone przez dane (lub poprawna masa i wzór).', '1 pkt – poprawna masa planety lub wzór v₁ = √(GM/R).', '0 pkt – brak postępu.'] }
    ]
  };
}});

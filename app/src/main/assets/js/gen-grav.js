/* GRAWITACJA I ASTRONOMIA */
'use strict';

G({ id: 'grav-satelita', area: 'grav', title: 'Satelita na orbicie kołowej', gen() {
  const hkm = R.n(300, 2000, 100), h = hkm * 1000, r = C.Rz + h;
  const vv = Math.sqrt(C.G * C.Mz / r), T = 2 * Math.PI * r / vv;
  return {
    ctx: `Satelita krąży wokół Ziemi po orbicie kołowej na wysokości ${v('h')} = ${d(hkm)} km nad jej powierzchnią. Przyjmij: ${v('M')}<sub>Z</sub> = 5,972·10²⁴ kg, ${v('R')}<sub>Z</sub> = 6378 km, ${v('G')} = 6,674·10⁻¹¹ N·m²/kg².`,
    parts: [
      { kind: 'num', pts: 2, q: 'Wyprowadź wzór i oblicz wartość prędkości satelity na orbicie. Zapisz obliczenia.', ans: vv, unit: 'm/s',
        hint: 'Siła grawitacji pełni rolę siły dośrodkowej. Pamiętaj: promień orbity r = R_Z + h, nie samo h!',
        steps: [`Siła grawitacji = siła dośrodkowa: ${eq(`${fr('GMm', 'r²')} = ${fr('mv²', 'r')} → v = ${sq(fr('GM', 'r'))}`)}`, `r = R<sub>Z</sub> + h = ${fmt(r, 4)} m ${eq(`v = ${sq(fr('6,674·10⁻¹¹·5,972·10²⁴', fmt(r, 4)))} ≈ <b>${fmt(vv)} m/s</b>`)}`],
        rubric: ['2 pkt – poprawny wzór i wynik.', '1 pkt – przyrównanie siły grawitacji do dośrodkowej.', '0 pkt – np. przyjęcie r = h.'] },
      { kind: 'num', pts: 1, q: 'Oblicz okres obiegu satelity. Wynik podaj w minutach.', ans: T / 60, unit: 'min',
        hint: 'T = 2πr / v.', steps: [`${eq(`T = ${fr('2πr', 'v')} ≈ ${fmt(T)} s ≈ <b>${fmt(T / 60)} min</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'Satelita na wyższej orbicie kołowej porusza się wolniej.', v: true },
        { s: 'Prędkość satelity na orbicie zależy od jego masy.', v: false },
        { s: 'Astronauta w satelicie jest w stanie nieważkości, bo nie działa na niego siła grawitacji.', v: false },
        { s: 'Na satelitę działa tylko siła grawitacji, a jego przyspieszenie jest skierowane do środka Ziemi.', v: true }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'grav-kepler', area: 'grav', title: 'III prawo Keplera', gen() {
  const a = R.n(1.5, 40, 0.5), T = Math.pow(a, 1.5);
  const name = R.pick(['planetoida', 'planeta karłowata', 'kometa']);
  return {
    ctx: `${name[0].toUpperCase() + name.slice(1)} porusza się wokół Słońca po orbicie eliptycznej, której wielka półoś wynosi ${d(a)} au. Ziemia obiega Słońce w ciągu 1 roku po orbicie o promieniu (półosi) 1 au.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz okres obiegu tego ciała wokół Słońca (w latach). Zapisz obliczenia.', ans: T, unit: 'lat',
        hint: 'III prawo Keplera dla ciał krążących wokół tego samego centrum: T²/a³ = const. Porównaj z Ziemią – wtedy jednostki same się „układają”.',
        steps: [`III prawo Keplera: ${eq(`${fr('T²', 'a³')} = ${fr('T<sub>Z</sub>²', 'a<sub>Z</sub>³')}`)}`, `W latach i au: T<sub>Z</sub> = 1, a<sub>Z</sub> = 1, więc ${eq(`T = ${sq('a³')} = ${sq(`${d(a)}³`)} ≈ <b>${fmt(T)} lat</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny zapis III prawa Keplera z porównaniem do Ziemi.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'W którym punkcie orbity to ciało porusza się najszybciej?', options: ['w peryhelium (najbliżej Słońca)', 'w aphelium (najdalej od Słońca)', 'na końcach małej osi elipsy', 'prędkość jest stała'], correct: 0, steps: ['Z II prawa Keplera (równe pola w równych czasach) albo z zasady zachowania momentu pędu: blisko Słońca promień jest mały, więc prędkość musi być duża.'] }
    ]
  };
}});

G({ id: 'grav-planeta', area: 'grav', title: 'Przyspieszenie grawitacyjne i II prędkość kosmiczna na planecie', gen() {
  const km = R.pick([0.1, 0.2, 0.5, 2, 3, 5, 8]), kr = R.pick([0.5, 0.6, 0.8, 1.2, 1.5, 2]);
  const gp = C.g * km / (kr * kr);
  const v2z = Math.sqrt(2 * C.G * C.Mz / C.Rz), v2 = v2z * Math.sqrt(km / kr);
  return {
    ctx: `Pewna planeta ma masę M<sub>p</sub> = ${fmt(km)}·M<sub>Z</sub> i promień R<sub>p</sub> = ${fmt(kr)}·R<sub>Z</sub> (M<sub>Z</sub>, R<sub>Z</sub> – masa i promień Ziemi). Na powierzchni Ziemi g = 9,81 m/s², a druga prędkość kosmiczna wynosi ok. ${fmt(v2z / 1000)} km/s.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz wartość przyspieszenia grawitacyjnego na powierzchni tej planety. Zapisz obliczenia.', ans: gp, unit: 'm/s²',
        hint: 'g = GM/R². Nie potrzebujesz G ani M – policz stosunek g_p/g_Z.',
        steps: [`${eq(`g = ${fr('GM', 'R²')} → ${fr('g<sub>p</sub>', 'g<sub>Z</sub>')} = ${fr('M<sub>p</sub>/M<sub>Z</sub>', '(R<sub>p</sub>/R<sub>Z</sub>)²')} = ${fr(fmt(km), fmt(kr) + '²')}`)}`, `${eq(`g<sub>p</sub> ≈ 9,81·${fmt(km / kr / kr)} ≈ <b>${fmt(gp)} m/s²</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny zapis zależności g od M i R / zapis stosunku.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz drugą prędkość kosmiczną dla tej planety (w km/s). Zapisz obliczenia.', ans: v2 / 1000, unit: 'km/s',
        hint: 'II prędkość kosmiczna z zasady zachowania energii: mv²/2 − GMm/R = 0 → v = √(2GM/R). Znów policz stosunek.',
        steps: [`Z zasady zachowania energii (ciało ma „uciec” do nieskończoności z zerową prędkością): ${eq(`${fr('mv²', '2')} − ${fr('GMm', 'R')} = 0 → v<sub>II</sub> = ${sq(fr('2GM', 'R'))}`)}`, `${eq(`${fr('v<sub>p</sub>', 'v<sub>Z</sub>')} = ${sq(fr(fmt(km), fmt(kr)))} → v<sub>p</sub> ≈ <b>${fmt(v2 / 1000)} km/s</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór na II prędkość kosmiczną (z bilansu energii).', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'grav-geostacjonarny', area: 'grav', title: 'Orbita synchroniczna (geostacjonarna)', gen() {
  const planets = [
    { n: 'Ziemi', M: 5.972e24, R: 6.378e6, T: 86164, Ts: '23 h 56 min' },
    { n: 'Marsa', M: 6.42e23, R: 3.39e6, T: 88643, Ts: '24 h 37 min' },
    { n: 'Jowisza', M: 1.898e27, R: 7.149e7, T: 35730, Ts: '9 h 55,5 min' }
  ];
  const p = R.pick(planets);
  const r = Math.cbrt(C.G * p.M * p.T * p.T / (4 * Math.PI * Math.PI)), h = r - p.R;
  return {
    ctx: `Satelita synchroniczny krąży nad równikiem ${p.n} tak, że cały czas znajduje się nad tym samym punktem powierzchni. Okres obrotu ${p.n} wokół osi wynosi ${p.Ts} (${d(p.T)} s), masa planety ${fmt(p.M, 4)} kg, promień równikowy ${fmt(p.R, 4)} m.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz wysokość orbity satelity nad powierzchnią planety (w km). Zapisz obliczenia.', ans: h / 1000, unit: 'km',
        hint: 'Okres obiegu satelity = okres obrotu planety. Siła grawitacji = siła dośrodkowa, a v = 2πr/T. Wyznacz r, a na końcu odejmij promień planety.',
        steps: [`${eq(`${fr('GMm', 'r²')} = m${fr('4π²', 'T²')}r → r = ∛${fr('GMT²', '4π²')}`)}`, `${eq(`r ≈ ${fmt(r)} m`)}`, `${eq(`h = r − R ≈ <b>${fmt(h / 1000)} km</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawnie wyznaczony promień orbity r.', '1 pkt – poprawne równanie (grawitacja = siła dośrodkowa z T).', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'grav-hubble', area: 'grav', title: 'Prawo Hubble’a i przesunięcie ku czerwieni', gen() {
  const lam0 = R.pick([656.3, 486.1, 393.4]), z = R.n(0.005, 0.04, 0.001), lam = lam0 * (1 + z);
  const vv = z * C.c, dMpc = vv / 1000 / C.H0;
  return {
    ctx: `W widmie odległej galaktyki linia, która w laboratorium ma długość fali ${d(lam0)} nm, została zarejestrowana przy długości ${fmt(lam, 5)} nm. Przyjmij stałą Hubble’a ${v('H')}₀ = 70 (km/s)/Mpc i c = 3·10⁸ m/s. Prędkość galaktyki jest dużo mniejsza od c.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz prędkość oddalania się galaktyki (w km/s). Zapisz obliczenia.', ans: vv / 1000, unit: 'km/s',
        hint: 'Dla v ≪ c: z = Δλ/λ₀ ≈ v/c.',
        steps: [`${eq(`z = ${fr('λ − λ₀', 'λ₀')} = ${fr(fmt(lam - lam0, 3), d(lam0))} ≈ ${fmt(z)}`)}`, `${eq(`v ≈ zc ≈ <b>${fmt(vv / 1000)} km/s</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne obliczenie z (przesunięcia względnego).', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz odległość do galaktyki (w Mpc), korzystając z prawa Hubble’a.', ans: dMpc, unit: 'Mpc',
        hint: 'v = H₀·d.', steps: [`${eq(`d = ${fr('v', 'H₀')} = ${fr(fmt(vv / 1000), '70')} ≈ <b>${fmt(dMpc)} Mpc</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'open', pts: 1, q: 'Wyjaśnij, dlaczego przesunięcie linii widmowych ku czerwieni odległych galaktyk jest argumentem za rozszerzaniem się Wszechświata.', model: 'Prawie wszystkie odległe galaktyki wykazują przesunięcie ku czerwieni, czyli oddalają się od nas. Prędkość oddalania rośnie proporcjonalnie do odległości (prawo Hubble’a), co jest zgodne z jednorodnym rozszerzaniem się przestrzeni.' }
    ]
  };
}});

G({ id: 'grav-paralaksa', area: 'grav', title: 'Paralaksa gwiazdy', gen() {
  const p = R.n(0.05, 0.8, 0.01), dpc = 1 / p, dly = dpc * 3.2616;
  return {
    ctx: `Paralaksa roczna pewnej gwiazdy wynosi ${v('p')} = ${d(p)}″ (sekundy łuku). 1 pc ≈ 3,26 ly.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz odległość gwiazdy w parsekach.', ans: dpc, unit: 'pc', hint: 'd[pc] = 1/p[″] – tak zdefiniowano parsek.', steps: [`${eq(`d = ${fr('1', 'p')} = ${fr('1', d(p))} ≈ <b>${fmt(dpc)} pc</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Ile lat biegnie światło od tej gwiazdy do Ziemi?', ans: dly, unit: 'lat', hint: 'Odległość w latach świetlnych = czas biegu światła w latach.', steps: [`${eq(`d ≈ ${fmt(dpc)}·3,26 ly ≈ <b>${fmt(dly)} ly</b>`)}, czyli światło biegnie ok. ${fmt(dly)} lat.`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'grav-energia', area: 'grav', title: 'Energia potrzebna do zmiany orbity', gen() {
  const m = R.n(500, 3000, 100), h1 = R.n(300, 800, 100) * 1000, h2 = h1 + R.n(500, 3000, 500) * 1000;
  const r1 = C.Rz + h1, r2 = C.Rz + h2;
  const E = C.G * C.Mz * m / 2 * (1 / r1 - 1 / r2);
  return {
    ctx: `Satelita o masie ${d(m)} kg przeniesiono z orbity kołowej na wysokości ${d(h1 / 1000)} km na orbitę kołową na wysokości ${d(h2 / 1000)} km nad Ziemią. Energia całkowita satelity na orbicie kołowej o promieniu r wynosi E = −GMm/(2r). ${v('M')}<sub>Z</sub> = 5,972·10²⁴ kg, ${v('R')}<sub>Z</sub> = 6378 km.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz, o ile wzrosła energia całkowita (mechaniczna) satelity – czyli jaką pracę musiały wykonać nad nim silniki. Pomiń straty: w rzeczywistości spalane paliwo dostarcza dużo więcej energii, bo większość unoszą gazy wylotowe. Zapisz obliczenia.', ans: E, unit: 'J',
        hint: 'ΔE = E₂ − E₁ = (GMm/2)(1/r₁ − 1/r₂). Pamiętaj o r = R_Z + h.',
        steps: [`${eq(`ΔE = E₂ − E₁ = −${fr('GMm', '2r₂')} + ${fr('GMm', '2r₁')} = ${fr('GMm', '2')}(${fr('1', 'r₁')} − ${fr('1', 'r₂')})`)}`, `r₁ = ${fmt(r1, 4)} m, r₂ = ${fmt(r2, 4)} m ${eq(`ΔE ≈ <b>${fmt(E)} J</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawne wyrażenie na ΔE z poprawnymi promieniami.', '1 pkt – zapis ΔE = E₂ − E₁ z poprawnym wzorem na energię.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Po przejściu na wyższą orbitę energia kinetyczna satelity:', options: ['zmalała', 'wzrosła', 'nie zmieniła się', 'spadła do zera'], correct: 0, steps: ['E<sub>k</sub> = GMm/(2r) – maleje ze wzrostem r. Energia całkowita wzrosła (jest mniej ujemna), bo wzrosła energia potencjalna.'] }
    ]
  };
}});

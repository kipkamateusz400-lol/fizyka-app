/* DOŚWIADCZENIA I NIEPEWNOŚCI POMIAROWE (wymagania przekrojowe) */
'use strict';

G({ id: 'dosw-mierniki', area: 'dosw', title: 'Opór z pomiaru napięcia i natężenia – niepewność', gen() {
  let U, I, dU, dI, rU, rI;
  do {
    U = R.n(2, 12, 0.1); I = R.n(0.1, 0.8, 0.01); dU = R.pick([0.1, 0.2]); dI = R.pick([0.01, 0.02]);
    rU = dU / U; rI = dI / I;
  } while (Math.abs(rU - rI) / Math.max(rU, rI) < 0.2);
  const Rr = U / I, rel = rU + rI, dR = Rr * rel;
  return {
    ctx: `Uczeń wyznaczał opór opornika. Woltomierz wskazał U = ${pl(U)} V (niepewność pomiaru ΔU = ${pl(dU)} V), a amperomierz I = ${pl(I)} A (niepewność ΔI = ${pl(dI)} A).`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz opór opornika.', ans: Rr, unit: 'Ω', hint: 'R = U/I.', steps: [`${eq(`R = ${fr('U', 'I')} = ${fr(pl(U), pl(I))} ≈ <b>${fmt(Rr)} Ω</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz niepewność bezwzględną ΔR wyznaczonego oporu metodą najmniej korzystnego przypadku (niepewności względne się sumują). Zapisz obliczenia.', ans: dR, unit: 'Ω', tol: 0.1,
        hint: 'Dla ilorazu: ΔR/R = ΔU/U + ΔI/I. Potem ΔR = R·(ΔR/R).',
        steps: [`${eq(`${fr('ΔR', 'R')} = ${fr('ΔU', 'U')} + ${fr('ΔI', 'I')} = ${fmt(rU)} + ${fmt(rI)} ≈ ${fmt(rel)} (${fmt(rel * 100)}%)`)}`, `${eq(`ΔR = R·${fr('ΔR', 'R')} ≈ <b>${fmt(dR)} Ω</b>`)}Zapis wyniku: R = (${fmt(Rr, 2)} ± ${fmt(dR, 1)}) Ω – niepewność zaokrąglamy w górę do 1–2 cyfr, a wynik do tego samego miejsca.`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna niepewność względna (suma niepewności względnych).', '0 pkt – np. dodanie niepewności bezwzględnych ΔU + ΔI.'] },
      { kind: 'mc', pts: 1, q: 'Który pomiar w większym stopniu ogranicza dokładność wyznaczenia oporu?', options: ['pomiar napięcia', 'pomiar natężenia prądu', 'oba w jednakowym stopniu', 'żaden – niepewność wynika tylko z obliczeń'], correct: rU > rI ? 0 : 1,
        steps: [`Porównujemy niepewności <b>względne</b>, nie bezwzględne: ΔU/U ≈ ${fmt(rU * 100)}%, ΔI/I ≈ ${fmt(rI * 100)}%. Większa jest ${rU > rI ? 'dla napięcia' : 'dla natężenia'}.`] }
    ]
  };
}});

G({ id: 'dosw-gestosc', area: 'dosw', title: 'Gęstość walca – pomiary suwmiarką i wagą', gen() {
  const mats = [{ n: 'aluminium', r: 2700 }, { n: 'mosiądzu', r: 8500 }, { n: 'stali', r: 7850 }];
  let mat, dmm, hmm, m, rm, rd, rh;
  do {
    mat = R.pick(mats); dmm = R.n(8, 25, 0.05); hmm = R.n(10, 40, 0.05);
    m = +(mat.r * Math.PI * (dmm / 1000) ** 2 / 4 * (hmm / 1000) * 1000).toFixed(1);
    rm = 0.1 / m; rd = 0.05 / dmm; rh = 0.05 / hmm;
  } while (m < 2 || (2 * rd > rm * 0.8 && 2 * rd < rm * 1.25) || (rh > rm * 0.8 && rh < rm * 1.25) || (rh > 2 * rd * 0.8 && rh < 2 * rd * 1.25));
  const rho = 4 * (m / 1000) / (Math.PI * (dmm / 1000) ** 2 * (hmm / 1000)), rel = rm + 2 * rd + rh;
  const terms = [rm, 2 * rd, rh], big = terms.indexOf(Math.max(...terms));
  return {
    ctx: `Uczeń wyznaczał gęstość metalowego walca wykonanego z ${mat.n}. Średnicę i wysokość zmierzył suwmiarką (niepewność 0,05 mm), a masę – wagą elektroniczną (niepewność 0,1 g). Wyniki: d = ${pl(dmm.toFixed(2))} mm, h = ${pl(hmm.toFixed(2))} mm, m = ${pl(m.toFixed(1))} g.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz gęstość materiału walca w kg/m³. Zapisz obliczenia.', ans: rho, unit: 'kg/m³',
        hint: 'V = πd²h/4. Zamień mm na m i g na kg.',
        steps: [`${eq(`V = ${fr('πd²h', '4')} ≈ ${fmt(Math.PI * (dmm / 1000) ** 2 / 4 * (hmm / 1000))} m³`)}`, `${eq(`ρ = ${fr('m', 'V')} = ${fr('4m', 'πd²h')} ≈ <b>${fmt(rho)} kg/m³</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna objętość walca (w m³).', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz niepewność względną wyznaczonej gęstości (w procentach). Zapisz obliczenia.', ans: rel * 100, unit: '%', tol: 0.1,
        hint: 'ρ = 4m/(πd²h). Niepewności względne się sumują, a d występuje w kwadracie, więc liczy się podwójnie: δρ = δm + 2δd + δh.',
        steps: [`${eq(`δm = ${fr('0,1', pl(m.toFixed(1)))} ≈ ${fmt(rm * 100)}%,   2δd = 2·${fr('0,05', pl(dmm.toFixed(2)))} ≈ ${fmt(2 * rd * 100)}%,   δh ≈ ${fmt(rh * 100)}%`)}`, `${eq(`δρ = δm + 2δd + δh ≈ <b>${fmt(rel * 100)}%</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór δρ = δm + 2δd + δh (z czynnikiem 2 przy średnicy).', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Pomiar której wielkości ma największy wpływ na niepewność wyniku?', options: ['masy', 'średnicy', 'wysokości', 'wszystkie mają taki sam wpływ'], correct: big,
        steps: [`Porównujemy składniki sumy: δm ≈ ${fmt(rm * 100)}%, 2δd ≈ ${fmt(2 * rd * 100)}%, δh ≈ ${fmt(rh * 100)}%. Największy jest składnik od ${['masy', 'średnicy', 'wysokości'][big]}.`] }
    ]
  };
}});

G({ id: 'dosw-seria', area: 'dosw', title: 'Seria pomiarów czasu – średnia i niepewność', gen() {
  const l = R.n(0.4, 1.6, 0.1), T0 = 2 * Math.PI * Math.sqrt(l / C.g), n = 10;
  const ts = Array.from({ length: 5 }, () => +(n * T0 + R.n(-0.25, 0.25, 0.01)).toFixed(2));
  if (new Set(ts).size < 3) ts[0] = +(ts[0] + 0.12).toFixed(2);
  const mean = ts.reduce((a, b) => a + b, 0) / ts.length, dt = (Math.max(...ts) - Math.min(...ts)) / 2;
  const T = mean / n, dT = dt / n;
  return {
    ctx: `Uczeń pięć razy zmierzył stoperem czas ${n} pełnych wahnięć wahadła o długości ${pl(l)} m. Otrzymał (w sekundach): ${ts.map(x => pl(x.toFixed(2))).join('; ')}. Jako niepewność pomiaru czasu przyjmij połowę różnicy między największym a najmniejszym wynikiem.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz okres drgań wahadła (z wartości średniej).', ans: T, unit: 's', hint: 'Najpierw średnia z pięciu pomiarów, potem dziel przez liczbę wahnięć.',
        steps: [`${eq(`t̄ = ${fr(ts.map(x => pl(x.toFixed(2))).join(' + '), '5')} ≈ ${fmt(mean, 4)} s`)}`, `${eq(`T = ${fr('t̄', n)} ≈ <b>${fmt(T)} s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz niepewność wyznaczenia okresu ΔT. Zapisz obliczenia.', ans: dT, unit: 's', tol: 0.08,
        hint: 'Δt = (t_max − t_min)/2. Okres to t/10, więc jego niepewność też jest 10 razy mniejsza.',
        steps: [`${eq(`Δt = ${fr(`${pl(Math.max(...ts).toFixed(2))} − ${pl(Math.min(...ts).toFixed(2))}`, '2')} ≈ ${fmt(dt)} s`)}`, `${eq(`ΔT = ${fr('Δt', n)} ≈ <b>${fmt(dT)} s</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna niepewność czasu Δt.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Dlaczego mierzy się czas 10 wahnięć zamiast jednego?', options: ['niepewność pomiaru czasu (np. czas reakcji) rozkłada się na 10 okresów, więc niepewność okresu jest 10 razy mniejsza', 'okres wahadła rośnie z liczbą wahnięć', 'jedno wahnięcie trwa zbyt krótko, by stoper je zarejestrował', 'aby wahadło się rozpędziło'], correct: 0,
        steps: ['Błąd włączenia i wyłączenia stopera jest taki sam dla 1 i dla 10 wahnięć, ale przy 10 wahnięciach dzielimy go przez 10.'] }
    ]
  };
}});

G({ id: 'dosw-wykres-wahadlo', area: 'dosw', title: 'Wykres T²(l) i wyznaczanie g z nachylenia', gen() {
  const ls = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gTrue = C.g;
  const pts = ls.map(l => [l, +(4 * Math.PI ** 2 / gTrue * l * (1 + R.n(-0.03, 0.03, 0.005))).toFixed(2)]);
  const a = pts.reduce((s, [x, y]) => s + x * y, 0) / pts.reduce((s, [x]) => s + x * x, 0);
  const g = 4 * Math.PI ** 2 / a, dy = 0.15, dx = 0.01;
  const svg = plot({ xl: 'l [m]', yl: 'T² [s²]', xmax: 1.2, ymax: 5, xstep: 0.2, ystep: 1,
    series: [{ pts: [[0, 0], [1.15, a * 1.15]], label: 'prosta dopasowania' }, { pts, dots: true, only: true, err: pts.map(() => [dx, dy]) }] });
  return {
    ctx: `Uczeń zmierzył okres wahadła dla pięciu długości nici i sporządził wykres zależności kwadratu okresu od długości T²(l). Zaznaczył prostokąty niepewności (Δl = 0,01 m, Δ(T²) = 0,15 s²) i poprowadził prostą najlepszego dopasowania przechodzącą przez początek układu. Punkty pomiarowe: ${pts.map(([x, y]) => `(${pl(x)} m; ${pl(y.toFixed(2))} s²)`).join(', ')}.`,
    svg,
    parts: [
      { kind: 'num', pts: 1, q: 'Odczytaj z wykresu (lub oblicz z prostej) współczynnik nachylenia prostej a = T²/l.', ans: a, unit: 's²/m', tol: 0.05,
        hint: 'Weź punkt leżący NA PROSTEJ, daleko od początku układu (np. dla l = 1 m), a nie punkt pomiarowy.',
        steps: [`Prosta przechodzi przez (0; 0) i np. (1 m; ${fmt(a)} s²): ${eq(`a = ${fr('ΔT²', 'Δl')} ≈ <b>${fmt(a)} s²/m</b>`)}`], rubric: ['1 pkt – poprawny wynik (z dokładnością odczytu).'] },
      { kind: 'num', pts: 2, q: 'Wyznacz przyspieszenie ziemskie z nachylenia prostej. Zapisz obliczenia.', ans: g, unit: 'm/s²', tol: 0.05,
        hint: 'T = 2π√(l/g) → T² = (4π²/g)·l. Nachylenie a = 4π²/g.',
        steps: [`${eq(`T² = ${fr('4π²', 'g')}·l → a = ${fr('4π²', 'g')}`)}`, `${eq(`g = ${fr('4π²', 'a')} = ${fr('39,5', fmt(a))} ≈ <b>${fmt(g)} m/s²</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny związek nachylenia z g (a = 4π²/g).', '0 pkt – brak postępu.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'Wykres T² od l jest prostą, dlatego łatwiej z niego wyznaczyć g niż z wykresu T od l.', v: true },
        { s: 'Prostą dopasowania należy poprowadzić przez pierwszy i ostatni punkt pomiarowy.', v: false },
        { s: 'Dobrze dopasowana prosta przechodzi przez prostokąty niepewności wszystkich (lub prawie wszystkich) punktów.', v: true },
        { s: 'Nachylenie prostej odczytuje się najdokładniej z dwóch punktów prostej leżących blisko siebie.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'dosw-soczewka', area: 'dosw', title: 'Wyznaczanie ogniskowej soczewki – plan i pomiary', gen() {
  const f = R.n(8, 20, 1);
  const xs = R.sample([1.3, 1.5, 1.8, 2, 2.5, 3], 3).sort((a, b) => a - b).map(k => Math.round(k * f));
  const ys = xs.map(x => Math.round(x * f / (x - f) * (1 + R.n(-0.02, 0.02, 0.005))));
  const fs = xs.map((x, i) => x * ys[i] / (x + ys[i])), fm = fs.reduce((a, b) => a + b, 0) / fs.length;
  return {
    ctx: `Na ławie optycznej ustawiono świecącą strzałkę (przedmiot), soczewkę skupiającą i ekran. Dla trzech położeń przedmiotu przesuwano ekran, aż obraz był ostry. Odległości przedmiotu i obrazu od soczewki: ${xs.map((x, i) => `x = ${x} cm, y = ${ys[i]} cm`).join('; ')}.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz ogniskową soczewki jako średnią z trzech pomiarów. Zapisz obliczenia.', ans: fm, unit: 'cm',
        hint: '1/f = 1/x + 1/y, czyli f = xy/(x + y) dla każdej pary, potem średnia.',
        steps: [`${eq(fs.map((ff, i) => `f<sub>${i + 1}</sub> = ${fr(`${xs[i]}·${ys[i]}`, `${xs[i]} + ${ys[i]}`)} ≈ ${fmt(ff)} cm`).join(';  '))}`, `${eq(`f̄ ≈ <b>${fmt(fm)} cm</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawnie obliczona ogniskowa dla co najmniej jednej pary.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Uczeń chce przedstawić wyniki na wykresie, który będzie linią prostą. Jaką zależność powinien narysować?', options: ['1/y od 1/x', 'y od x', 'y od x²', 'x·y od x'], correct: 0,
        steps: ['Z równania soczewki: 1/y = −1/x + 1/f. To prosta o nachyleniu −1, która przecina oś 1/y w punkcie 1/f.'] },
      { kind: 'open', pts: 2, q: 'Podaj dwa sposoby zmniejszenia niepewności wyznaczenia ogniskowej w tym doświadczeniu.', model: '1) Powtórzyć ustawianie ostrego obrazu kilka razy dla tego samego x (podchodząc z obu stron) i uśrednić y. 2) Wykonać pomiary dla wielu (np. 6–8) różnych odległości x i wyznaczyć f z wykresu 1/y od 1/x (punkt przecięcia z osią), zamiast z pojedynczego pomiaru. Można też mierzyć odległości od środka soczewki, a nie od oprawki.',
        rubric: ['2 pkt – dwa poprawne sposoby.', '1 pkt – jeden poprawny sposób.', '0 pkt – brak poprawnego sposobu.'] }
    ]
  };
}});

G({ id: 'dosw-zasady', area: 'dosw', title: 'Zasady opracowania wyników pomiarów', gen() {
  const pool = [
    { s: 'Niepewność względna iloczynu dwóch wielkości jest (w przybliżeniu) sumą ich niepewności względnych.', v: true },
    { s: 'Powtarzanie pomiaru wiele razy usuwa błąd systematyczny (np. źle wyzerowany przyrząd).', v: false },
    { s: 'Wielokrotne powtórzenie pomiaru i uśrednienie zmniejsza wpływ błędów przypadkowych.', v: true },
    { s: 'Amperomierz włącza się do obwodu równolegle z badanym opornikiem.', v: false },
    { s: 'Prostokąt niepewności wokół punktu ma boki o długościach 2Δx i 2Δy.', v: true },
    { s: 'Wynik zapisujemy ze wszystkimi cyframi, które pokazał kalkulator.', v: false },
    { s: 'Niepewność pomiaru przyrządem analogowym przyjmuje się zwykle jako najmniejszą działkę skali.', v: true },
    { s: 'Jeżeli wielkość występuje we wzorze w kwadracie, jej niepewność względna wchodzi do wyniku z czynnikiem 2.', v: true }
  ];
  return {
    ctx: 'Zadanie dotyczy wymagań przekrojowych: planowania doświadczeń, szacowania niepewności i sporządzania wykresów.',
    parts: [
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.sample(pool, 4) },
      { kind: 'mc', pts: 1, q: 'Uczeń zmierzył linijką z podziałką milimetrową długość 12,0 cm. Jak poprawnie zapisać wynik z niepewnością?', options: ['(12,0 ± 0,1) cm', '(12 ± 0,1) cm', '(12,00 ± 0,1) cm', '12,0 cm ± 1 mm²'], correct: 0,
        steps: ['Niepewność = 1 działka = 1 mm = 0,1 cm. Wynik zapisujemy z tą samą liczbą miejsc po przecinku co niepewność: (12,0 ± 0,1) cm.'] }
    ]
  };
}});

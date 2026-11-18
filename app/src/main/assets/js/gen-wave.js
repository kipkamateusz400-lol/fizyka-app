/* DRGANIA, FALE I OPTYKA */
'use strict';

G({ id: 'wave-wahadlo', area: 'wave', title: 'Wahadło matematyczne', gen() {
  const l = R.n(0.4, 2.5, 0.1), T = 2 * Math.PI * Math.sqrt(l / C.g), gk = 1.62, Tk = 2 * Math.PI * Math.sqrt(l / gk);
  const n = R.pick([10, 20]);
  return {
    ctx: `Wahadło matematyczne ma długość ${v('l')} = ${d(l)} m. Przyjmij g = 9,81 m/s² na Ziemi i g<sub>K</sub> = 1,62 m/s² na Księżycu. Wychylenia są małe.`,
    parts: [
      { kind: 'num', pts: 1, q: `Oblicz czas trwania ${n} pełnych wahnięć tego wahadła na Ziemi.`, ans: n * T, unit: 's', hint: 'T = 2π√(l/g), potem razy liczba wahnięć.',
        steps: [`${eq(`T = 2π${sq(fr('l', 'g'))} ≈ ${fmt(T)} s → ${n}T ≈ <b>${fmt(n * T)} s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Ile razy dłuższy byłby okres tego wahadła na Księżycu?', ans: Tk / T, unit: '', hint: 'T ∝ 1/√g.',
        steps: [`${eq(`${fr('T<sub>K</sub>', 'T')} = ${sq(fr('g', 'g<sub>K</sub>'))} ≈ <b>${fmt(Tk / T)}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'open', pts: 2, q: 'Zaplanuj doświadczenie, w którym za pomocą wahadła wyznaczysz przyspieszenie ziemskie. Opisz, co zmierzysz i jak obliczysz g; podaj jeden sposób zmniejszenia niepewności pomiaru.',
        model: 'Mierzę długość nici l (od punktu zawieszenia do środka ciężarka) taśmą mierniczą. Wychylam wahadło o mały kąt (< 10°) i mierzę stoperem czas np. 20 pełnych wahnięć, potem T = t/20. Obliczam g = 4π²l/T². Niepewność zmniejszam, mierząc czas wielu wahnięć (a nie jednego), powtarzając pomiar i uśredniając lub sporządzając wykres T² od l (nachylenie = 4π²/g).' }
    ]
  };
}});

G({ id: 'wave-sprezyna', area: 'wave', title: 'Oscylator harmoniczny – ciężarek na sprężynie', gen() {
  const m = R.n(0.1, 1, 0.1), k = R.n(10, 120, 5), A = R.n(2, 10, 1) / 100;
  const w = Math.sqrt(k / m), T = 2 * Math.PI / w, vmax = A * w, amax = A * w * w, E = k * A * A / 2;
  return {
    ctx: `Ciężarek o masie ${d(m)} kg zawieszony na sprężynie o współczynniku sprężystości ${v('k')} = ${d(k)} N/m wykonuje drgania harmoniczne o amplitudzie ${v('A')} = ${d(A * 100)} cm.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz okres drgań.', ans: T, unit: 's', hint: 'T = 2π√(m/k).', steps: [`${eq(`T = 2π${sq(fr('m', 'k'))} ≈ <b>${fmt(T)} s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz maksymalną wartość prędkości ciężarka. Zapisz obliczenia.', ans: vmax, unit: 'm/s',
        hint: 'v_max = Aω, gdzie ω = √(k/m). Albo z energii: kA²/2 = mv²/2.',
        steps: [`${eq(`ω = ${sq(fr('k', 'm'))} ≈ ${fmt(w)} rad/s`)}`, `${eq(`v<sub>max</sub> = Aω ≈ <b>${fmt(vmax)} m/s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna metoda (ω lub bilans energii).', '0 pkt – brak postępu.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'W położeniu równowagi przyspieszenie ciężarka jest równe zeru.', v: true },
        { s: 'W skrajnym położeniu prędkość ciężarka jest największa.', v: false },
        { s: 'Okres drgań nie zależy od amplitudy.', v: true },
        { s: `Maksymalne przyspieszenie ciężarka wynosi ok. ${fmt(amax)} m/s².`, v: true },
        { s: 'Zwiększenie masy ciężarka czterokrotnie zwiększy okres czterokrotnie.', v: false }
      ]).slice(0, 3) },
      { kind: 'num', pts: 1, q: 'Oblicz całkowitą energię drgań.', ans: E, unit: 'J', hint: 'E = kA²/2.', steps: [`${eq(`E = ${fr('kA²', '2')} ≈ <b>${fmt(E)} J</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'wave-soczewka', area: 'wave', title: 'Soczewka skupiająca – obraz', gen() {
  const f = R.n(5, 25, 1), real = Math.random() < 0.7;
  const x = real ? R.n(f + 2, 4 * f, 1) : R.n(Math.max(1, Math.round(f / 3)), f - 1, 1);
  const y = 1 / (1 / f - 1 / x), p = Math.abs(y / x);
  const opts = ['rzeczywisty, odwrócony', 'pozorny, prosty', 'rzeczywisty, prosty', 'pozorny, odwrócony'];
  return {
    ctx: `Przedmiot ustawiono w odległości ${v('x')} = ${d(x)} cm od cienkiej soczewki skupiającej o ogniskowej ${v('f')} = ${d(f)} cm.`,
    parts: [
      { kind: 'num', pts: 2, q: `Oblicz odległość obrazu od soczewki${real ? '' : ' (podaj wartość bezwzględną)'}. Zapisz obliczenia.`, ans: Math.abs(y), unit: 'cm',
        hint: 'Równanie soczewki: 1/f = 1/x + 1/y. Ujemne y oznacza obraz pozorny (po tej samej stronie co przedmiot).',
        steps: [`${eq(`${fr('1', 'f')} = ${fr('1', 'x')} + ${fr('1', 'y')} → y = ${fr('xf', 'x − f')}`)}`, `${eq(`y = ${fr(`${d(x)}·${d(f)}`, `${d(x)} − ${d(f)}`)} ≈ ${fmt(y)} cm`)}${y < 0 ? 'Wynik ujemny → obraz pozorny, |y| ≈ <b>' + fmt(-y) + ' cm</b>.' : '<b>y ≈ ' + fmt(y) + ' cm</b> – obraz rzeczywisty.'}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne przekształcenie równania soczewki.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz powiększenie obrazu.', ans: p, unit: '', hint: 'p = |y|/x.', steps: [`${eq(`p = ${fr('|y|', 'x')} ≈ <b>${fmt(p)}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Jaki jest to obraz?', options: opts, correct: real ? 0 : 1, steps: [real ? 'Przedmiot dalej niż ogniskowa (x > f) → obraz rzeczywisty i odwrócony.' : 'Przedmiot między ogniskiem a soczewką (x < f) → obraz pozorny, prosty, powiększony (lupa).'] }
    ]
  };
}});

G({ id: 'wave-zalamanie', area: 'wave', title: 'Załamanie i całkowite wewnętrzne odbicie', gen() {
  const n = R.pick([1.33, 1.45, 1.5, 1.6, 1.7]), a = R.pick([20, 30, 40, 50, 60]);
  const b = rad2deg(Math.asin(Math.sin(deg(a)) / n)), gr = rad2deg(Math.asin(1 / n)), vv = C.c / n;
  return {
    ctx: `Promień światła pada z powietrza (n ≈ 1) na płaską powierzchnię materiału o współczynniku załamania ${v('n')} = ${d(n)} pod kątem α = ${a}° (mierzonym od normalnej).`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz kąt załamania.', ans: b, unit: '°', hint: 'Prawo Snelliusa: n₁ sin α = n₂ sin β.', steps: [`${eq(`sin β = ${fr(`sin ${a}°`, d(n))} ≈ ${fmt(Math.sin(deg(b)))} → β ≈ <b>${fmt(b)}°</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz kąt graniczny dla granicy tego materiału z powietrzem. Zapisz obliczenia.', ans: gr, unit: '°',
        hint: 'Kąt graniczny: kąt padania (od strony materiału), dla którego kąt załamania wynosi 90°.',
        steps: [`${eq(`n·sin α<sub>gr</sub> = 1·sin 90° → sin α<sub>gr</sub> = ${fr('1', 'n')}`)}`, `${eq(`α<sub>gr</sub> = arcsin ${fr('1', d(n))} ≈ <b>${fmt(gr)}°</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny warunek (kąt załamania 90°).', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz prędkość światła w tym materiale.', ans: vv, unit: 'm/s', hint: 'n = c/v.', steps: [`${eq(`v = ${fr('c', 'n')} ≈ <b>${fmt(vv)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Całkowite wewnętrzne odbicie może zajść, gdy światło:', options: ['przechodzi z materiału do powietrza i kąt padania jest większy od granicznego', 'przechodzi z powietrza do materiału pod dużym kątem', 'pada prostopadle na granicę ośrodków', 'przechodzi z materiału do powietrza i kąt padania jest mniejszy od granicznego'], correct: 0, steps: ['Tylko przy przejściu do ośrodka o mniejszym n i dla kąta padania > α<sub>gr</sub>. Na tym działa światłowód.'] }
    ]
  };
}});

G({ id: 'wave-siatka', area: 'wave', title: 'Siatka dyfrakcyjna', gen() {
  const N = R.pick([100, 200, 300, 500, 600]), lam = R.pick([405, 450, 532, 589, 633, 650]);
  const dd = 1e-3 / N, ord = R.pick([1, 2]);
  const s = ord * lam * 1e-9 / dd;
  const okOrd = s < 1 ? ord : 1;
  const th = rad2deg(Math.asin(okOrd * lam * 1e-9 / dd)), nmax = Math.floor(dd / (lam * 1e-9));
  return {
    ctx: `Wiązka światła laserowego o długości fali λ = ${lam} nm pada prostopadle na siatkę dyfrakcyjną mającą ${N} szczelin na 1 mm.`,
    parts: [
      { kind: 'num', pts: 2, q: `Oblicz kąt, pod jakim obserwuje się prążek ${okOrd}. rzędu. Zapisz obliczenia.`, ans: th, unit: '°',
        hint: 'Stała siatki d = 1 mm / N. Warunek maksimum: d sin θ = nλ.',
        steps: [`${eq(`d = ${fr('1 mm', N)} = ${fmt(dd)} m`)}`, `${eq(`sin θ = ${fr('nλ', 'd')} = ${fr(`${okOrd}·${lam}·10⁻⁹`, fmt(dd))} ≈ ${fmt(okOrd * lam * 1e-9 / dd)} → θ ≈ <b>${fmt(th)}°</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna stała siatki i warunek d sin θ = nλ.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Podaj najwyższy rząd prążka, jaki można zaobserwować.', ans: nmax, unit: '', tol: 0.001, hint: 'sin θ ≤ 1 → n ≤ d/λ, bierzemy część całkowitą.',
        steps: [`${eq(`n ≤ ${fr('d', 'λ')} ≈ ${fmt(dd / (lam * 1e-9))} → n<sub>max</sub> = <b>${nmax}</b>`)}`], rubric: ['1 pkt – poprawna liczba całkowita.'] },
      { kind: 'mc', pts: 1, q: 'Siatkę zastąpiono siatką o większej liczbie szczelin na 1 mm. Prążki 1. rzędu:', options: ['oddalą się od prążka zerowego', 'przybliżą się do prążka zerowego', 'nie zmienią położenia', 'znikną'], correct: 0, steps: ['Więcej szczelin na mm → mniejsze d → większe sin θ = λ/d.'] }
    ]
  };
}});

G({ id: 'wave-struna', area: 'wave', title: 'Fala stojąca na strunie', gen() {
  const L = R.n(0.3, 1.2, 0.05), vv = R.n(150, 450, 10), n = R.pick([1, 2, 3]);
  const f = n * vv / (2 * L), lam = 2 * L / n;
  return {
    ctx: `Struna o długości ${v('L')} = ${d(L)} m jest zamocowana na obu końcach. Prędkość fali poprzecznej w strunie wynosi ${d(vv)} m/s. Na strunie wytworzono falę stojącą z ${n + 1} węzłami (licząc węzły na końcach).`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz długość fali.', ans: lam, unit: 'm', hint: 'Między sąsiednimi węzłami jest λ/2. Ile takich odcinków mieści się na strunie?',
        steps: [`${n + 1} węzłów → ${n} odcinków po λ/2: ${eq(`L = n${fr('λ', '2')} → λ = ${fr('2L', n)} = <b>${fmt(lam)} m</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz częstotliwość drgań struny.', ans: f, unit: 'Hz', hint: 'v = λf.', steps: [`${eq(`f = ${fr('v', 'λ')} ≈ <b>${fmt(f)} Hz</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Jak zmieni się częstotliwość podstawowa struny, jeśli zwiększymy siłę naciągu (prędkość fali wzrośnie)?', options: ['wzrośnie', 'zmaleje', 'nie zmieni się', 'nie da się określić'], correct: 0, steps: ['f₁ = v/(2L) – rośnie razem z v. Dlatego dokręcanie strun gitary podwyższa dźwięk.'] }
    ]
  };
}});

G({ id: 'wave-doppler', area: 'wave', title: 'Efekt Dopplera', gen() {
  const f = R.n(400, 1200, 50), vs = R.n(10, 40, 2), vd = 340, toward = Math.random() < 0.5;
  const f2 = f * vd / (toward ? vd - vs : vd + vs);
  return {
    ctx: `Karetka jadąca z prędkością ${d(vs)} m/s ${toward ? 'zbliża się do' : 'oddala się od'} nieruchomego obserwatora. Syrena emituje dźwięk o częstotliwości ${d(f)} Hz. Prędkość dźwięku w powietrzu wynosi 340 m/s.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz częstotliwość dźwięku rejestrowaną przez obserwatora. Zapisz obliczenia.', ans: f2, unit: 'Hz',
        hint: 'Źródło ruchome, obserwator nieruchomy: f′ = f·v/(v ∓ v_ź). Minus – gdy źródło się zbliża (częstotliwość rośnie).',
        steps: [`${eq(`f′ = f·${fr('v', `v ${toward ? '−' : '+'} v<sub>ź</sub>`)}`)}`, `${eq(`f′ = ${d(f)}·${fr('340', `340 ${toward ? '−' : '+'} ${d(vs)}`)} ≈ <b>${fmt(f2)} Hz</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór z właściwym znakiem.', '0 pkt – brak postępu.'] },
      { kind: 'tf', pts: 1, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'Długość fali docierającej do obserwatora przed zbliżającym się źródłem jest mniejsza niż przy źródle nieruchomym.', v: true },
        { s: 'Efekt Dopplera dotyczy tylko fal dźwiękowych.', v: false },
        { s: 'Gdy karetka mija obserwatora, słyszana częstotliwość skokowo maleje.', v: true }
      ]) }
    ]
  };
}});

G({ id: 'wave-malus', area: 'wave', title: 'Polaryzacja – prawo Malusa i kąt Brewstera', gen() {
  const I0 = R.n(20, 120, 10), th = R.pick([20, 30, 45, 60, 75]), n = R.pick([1.33, 1.5, 1.6]);
  const I = I0 / 2 * Math.cos(deg(th)) ** 2, B = rad2deg(Math.atan(n));
  return {
    ctx: `Światło niespolaryzowane o natężeniu ${v('I')}₀ = ${d(I0)} W/m² przechodzi przez dwa idealne polaryzatory. Kierunki polaryzacji polaryzatorów tworzą kąt ${th}°.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz natężenie światła za drugim polaryzatorem. Zapisz obliczenia.', ans: I, unit: 'W/m²',
        hint: 'Pierwszy polaryzator przepuszcza połowę natężenia światła niespolaryzowanego. Za drugim – prawo Malusa I = I₁cos²θ.',
        steps: [`Za pierwszym: ${eq(`I₁ = ${fr('I₀', '2')} = ${fmt(I0 / 2)} W/m²`)}`, `Za drugim (prawo Malusa): ${eq(`I = I₁cos²${th}° ≈ <b>${fmt(I)} W/m²</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – uwzględnienie połowy natężenia po pierwszym polaryzatorze LUB poprawne prawo Malusa.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: `Oblicz kąt Brewstera dla odbicia światła od powierzchni materiału o współczynniku załamania ${d(n)} (światło pada z powietrza).`, ans: B, unit: '°',
        hint: 'tg α_B = n₂/n₁. Przy tym kącie światło odbite jest całkowicie spolaryzowane.', steps: [`${eq(`tg α<sub>B</sub> = n → α<sub>B</sub> ≈ <b>${fmt(B)}°</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

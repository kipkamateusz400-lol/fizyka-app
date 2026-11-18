/* DRGANIA, FALE, OPTYKA – zestaw 2 */
'use strict';

G({ id: 'wave-young', area: 'wave', title: 'Doświadczenie Younga – dwie szczeliny', gen() {
  const lam = R.pick([450, 532, 589, 633, 650]), dd = R.n(0.1, 0.5, 0.05) / 1000, L = R.n(1, 4, 0.5);
  const dx = lam * 1e-9 * L / dd;
  return {
    ctx: `Światło laserowe o długości fali ${lam} nm pada na dwie wąskie szczeliny odległe o ${v('d')} = ${d(dd * 1000)} mm. Na ekranie odległym o ${v('L')} = ${d(L)} m powstają prążki interferencyjne. Kąty ugięcia są małe.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz odległość między sąsiednimi jasnymi prążkami na ekranie (w mm). Zapisz obliczenia.', ans: dx * 1000, unit: 'mm',
        hint: 'Jasny prążek: d sin θ = nλ. Dla małych kątów sin θ ≈ tg θ = x/L, więc x_n = nλL/d.',
        steps: [`${eq(`d·${fr('x', 'L')} = nλ → x<sub>n</sub> = ${fr('nλL', 'd')}`)}`, `${eq(`Δx = ${fr('λL', 'd')} ≈ ${fmt(dx)} m = <b>${fmt(dx * 1000)} mm</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny warunek wzmocnienia z przybliżeniem małych kątów.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Jak zmieni się odległość prążków, gdy laser czerwony zastąpimy zielonym?', options: ['zmaleje', 'wzrośnie', 'nie zmieni się', 'prążki znikną'], correct: 0, steps: ['Zielone światło ma krótszą falę, a Δx ∝ λ.'] },
      { kind: 'open', pts: 1, q: 'Wyjaśnij, dlaczego w doświadczeniu Younga potrzebne jest światło spójne (np. z lasera).', model: 'Trwały obraz interferencyjny powstaje tylko wtedy, gdy fale ze szczelin mają stałą różnicę faz. Zapewnia to światło spójne – fale z obu szczelin pochodzą z tego samego, uporządkowanego źródła.' }
    ]
  };
}});

G({ id: 'wave-glosniki', area: 'wave', title: 'Interferencja dźwięku z dwóch głośników', gen() {
  const f = R.pick([340, 425, 500, 680, 850]), lam = 340 / f, max = Math.random() < 0.5, n = R.i(1, 3);
  const diff = max ? n * lam : (n + 0.5) * lam, r1 = R.n(2, 5, 0.5), r2 = r1 + diff;
  return {
    ctx: `Dwa głośniki drgają w zgodnej fazie, emitując dźwięk o częstotliwości ${f} Hz. Prędkość dźwięku wynosi 340 m/s. Słuchacz stoi w odległości ${d(r1)} m od pierwszego i ${fmt(r2, 4)} m od drugiego głośnika.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz długość fali dźwiękowej.', ans: lam, unit: 'm', hint: 'λ = v/f.', steps: [`${eq(`λ = ${fr('340', f)} = <b>${fmt(lam)} m</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 2, q: 'Co słyszy słuchacz w tym miejscu? Wybierz odpowiedź i uzasadnij ją w myślach różnicą dróg.', options: ['wzmocnienie dźwięku', 'osłabienie (wygaszenie) dźwięku'], correct: max ? 0 : 1,
        steps: [`Różnica dróg Δs = ${fmt(diff)} m = ${fmt(diff / lam)}λ. ${max ? 'Całkowita wielokrotność λ → fale docierają w zgodnej fazie → wzmocnienie.' : 'Nieparzysta wielokrotność λ/2 → fale w przeciwnych fazach → wygaszenie.'}`] }
    ]
  };
}});

G({ id: 'wave-piszczalka', area: 'wave', title: 'Piszczałka – fala stojąca w powietrzu', gen() {
  const L = R.n(0.2, 1.2, 0.05), closed = Math.random() < 0.5, vs = 340;
  const f1 = closed ? vs / (4 * L) : vs / (2 * L);
  return {
    ctx: `Piszczałka organowa o długości ${d(L)} m jest ${closed ? 'zamknięta z jednej strony (z drugiej otwarta)' : 'otwarta z obu stron'}. Prędkość dźwięku w powietrzu wynosi 340 m/s.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz częstotliwość tonu podstawowego piszczałki. Zapisz obliczenia.', ans: f1, unit: 'Hz',
        hint: closed ? 'Przy końcu zamkniętym jest węzeł, przy otwartym strzałka. Najkrótsza fala: L = λ/4.' : 'Przy obu otwartych końcach są strzałki. Najkrótsza fala: L = λ/2.',
        steps: [`${eq(closed ? 'L = λ/4 → λ = 4L' : 'L = λ/2 → λ = 2L')}`, `${eq(`f₁ = ${fr('v', closed ? '4L' : '2L')} ≈ <b>${fmt(f1)} Hz</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny związek między L a λ.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Jakie częstotliwości ma ta piszczałka (f₁ – ton podstawowy)?', options: closed ? ['f₁, 3f₁, 5f₁, …', 'f₁, 2f₁, 3f₁, …', 'f₁, 2f₁, 4f₁, …', 'tylko f₁'] : ['f₁, 2f₁, 3f₁, …', 'f₁, 3f₁, 5f₁, …', 'f₁, 2f₁, 4f₁, …', 'tylko f₁'], correct: 0,
        steps: [closed ? 'Piszczałka zamknięta: L = (2n − 1)λ/4 – tylko nieparzyste wielokrotności.' : 'Piszczałka otwarta: L = nλ/2 – wszystkie wielokrotności.'] }
    ]
  };
}});

G({ id: 'wave-zwierciadlo', area: 'wave', title: 'Zwierciadło wklęsłe', gen() {
  const Rk = R.n(20, 80, 10), f = Rk / 2, x = R.n(f + 5, 3 * f, 5);
  const y = 1 / (1 / f - 1 / x), p = y / x;
  return {
    ctx: `Świeczkę o wysokości 3 cm ustawiono w odległości ${d(x)} cm od zwierciadła wklęsłego o promieniu krzywizny ${d(Rk)} cm, na jego osi optycznej.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz odległość obrazu od zwierciadła. Zapisz obliczenia.', ans: y, unit: 'cm',
        hint: 'Ogniskowa zwierciadła kulistego f = R/2. Równanie zwierciadła ma taką samą postać jak soczewki: 1/f = 1/x + 1/y.',
        steps: [`${eq(`f = ${fr('R', '2')} = ${fmt(f)} cm`)}`, `${eq(`y = ${fr('xf', 'x − f')} ≈ <b>${fmt(y)} cm</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna ogniskowa.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wysokość obrazu świeczki.', ans: 3 * p, unit: 'cm', hint: 'h′ = h·y/x.', steps: [`${eq(`h′ = 3 cm·${fr('y', 'x')} ≈ <b>${fmt(3 * p)} cm</b>`)} (obraz rzeczywisty, odwrócony)`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'wave-dioptrie', area: 'wave', title: 'Zdolność skupiająca i układ soczewek', gen() {
  let Z1, Z2; do { Z1 = R.pick([2, 2.5, 4, 5, 8, 10]); Z2 = R.pick([-1, -2, -0.5, 1, 1.5, 2]); } while (Z1 + Z2 < 1.5);
  const Z = Z1 + Z2, f = 1 / Z, x = R.n(Math.ceil(f * 100) + 10, Math.ceil(f * 100) + 60, 5) / 100;
  const y = 1 / (Z - 1 / x);
  return {
    ctx: `Dwie cienkie soczewki o zdolnościach skupiających ${v('Z')}₁ = ${pl(Z1)} D i ${v('Z')}₂ = ${pl(Z2)} D złożono ściśle ze sobą (traktuj je jak jedną cienką soczewkę).`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz ogniskową układu (w cm).', ans: f * 100, unit: 'cm', hint: 'Zdolności skupiające soczewek złożonych się dodają: Z = Z₁ + Z₂, f = 1/Z.',
        steps: [`${eq(`Z = ${pl(Z1)} + (${pl(Z2)}) = ${pl(Z)} D → f = ${fr('1', 'Z')} ≈ <b>${fmt(f * 100)} cm</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Przedmiot ustawiono ${d(x * 100)} cm od układu. Oblicz odległość obrazu od układu (w cm). Zapisz obliczenia.`, ans: y * 100, unit: 'cm',
        hint: 'Równanie soczewki w dioptriach: Z = 1/x + 1/y (odległości w metrach).',
        steps: [`${eq(`${fr('1', 'y')} = Z − ${fr('1', 'x')} = ${pl(Z)} − ${fmt(1 / x)} ≈ ${fmt(Z - 1 / x)} m⁻¹`)}`, `${eq(`y ≈ ${fmt(y)} m = <b>${fmt(y * 100)} cm</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne równanie soczewki dla układu.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Krótkowidz widzi ostro tylko bliskie przedmioty. Jakie okulary mu pomogą?', options: ['z soczewkami rozpraszającymi (Z < 0)', 'z soczewkami skupiającymi (Z > 0)', 'z płaskimi szkłami', 'z soczewkami cylindrycznymi'], correct: 0, steps: ['Oko krótkowidza skupia światło zbyt silnie (obraz przed siatkówką). Soczewka rozpraszająca osłabia skupianie.'] }
    ]
  };
}});

G({ id: 'wave-rownanie-x', area: 'wave', title: 'Odczyt z równania ruchu harmonicznego', gen() {
  const A = R.n(2, 15, 1) / 100, k = R.pick([1, 2, 4, 5, 10]);
  const w = k * Math.PI, T = 2 / k, vmax = A * w, amax = A * w * w, t = R.pick([T / 12, T / 8, T / 6]);
  const xt = A * Math.sin(w * t);
  return {
    ctx: `Położenie ciała drgającego harmonicznie opisuje równanie x(t) = ${pl(A)}·sin(${k}πt), gdzie x w metrach, t w sekundach.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Podaj okres drgań.', ans: T, unit: 's', hint: 'Porównaj z x = A sin(ωt): ω = ' + k + 'π, T = 2π/ω.', steps: [`${eq(`ω = ${k}π rad/s → T = ${fr('2π', 'ω')} = <b>${fmt(T)} s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz maksymalną wartość prędkości ciała.', ans: vmax, unit: 'm/s', hint: 'v_max = Aω.', steps: [`${eq(`v<sub>max</sub> = Aω = ${pl(A)}·${k}π ≈ <b>${fmt(vmax)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz maksymalną wartość przyspieszenia ciała.', ans: amax, unit: 'm/s²', hint: 'a_max = Aω².', steps: [`${eq(`a<sub>max</sub> = Aω² ≈ <b>${fmt(amax)} m/s²</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: `Oblicz wychylenie ciała w chwili t = ${fmt(t, 3)} s (w cm).`, ans: xt * 100, unit: 'cm', hint: 'Podstaw t do równania (kalkulator w radianach albo przelicz na stopnie: kπt rad).',
        steps: [`${eq(`x = ${pl(A)}·sin(${k}π·${fmt(t, 3)}) = ${pl(A)}·sin ${fmt(rad2deg(w * t))}° ≈ <b>${fmt(xt * 100)} cm</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'wave-faza', area: 'wave', title: 'Fala biegnąca – prędkość i różnica faz', gen() {
  const lam = R.n(0.5, 4, 0.5), T = R.n(0.1, 2, 0.1), dx = R.pick([lam / 4, lam / 2, lam, 3 * lam / 4, 3 * lam / 2]);
  const vv = lam / T, dphi = 360 * dx / lam;
  return {
    ctx: `Wzdłuż długiej liny biegnie fala poprzeczna o długości ${d(lam)} m. Każdy punkt liny wykonuje pełne drganie w czasie ${d(T)} s.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz prędkość rozchodzenia się fali.', ans: vv, unit: 'm/s', hint: 'v = λ/T.', steps: [`${eq(`v = ${fr('λ', 'T')} = <b>${fmt(vv)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: `Oblicz różnicę faz (w stopniach) drgań dwóch punktów liny odległych o ${fmt(dx)} m wzdłuż kierunku rozchodzenia się fali.`, ans: dphi, unit: '°', hint: 'Odległość λ odpowiada różnicy faz 360°. Δφ = 360°·Δx/λ.',
        steps: [`${eq(`Δφ = 360°·${fr('Δx', 'λ')} = <b>${fmt(dphi)}°</b>`)}${dphi % 360 === 0 ? 'Punkty drgają w zgodnej fazie.' : dphi % 360 === 180 ? 'Punkty drgają w przeciwnych fazach.' : ''}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'Fala przenosi energię, ale nie przenosi materii liny wzdłuż kierunku ruchu fali.', v: true },
        { s: 'Gdy fala przechodzi do innej liny, w której biegnie wolniej, zmienia się jej częstotliwość.', v: false },
        { s: 'Punkty liny drgają prostopadle do kierunku rozchodzenia się fali.', v: true },
        { s: 'Zwiększenie częstotliwości (przy tej samej prędkości) zwiększa długość fali.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'wave-rezonans', area: 'wave', title: 'Napięcie struny i wysokość dźwięku', gen() {
  const f = R.n(100, 440, 10), kk = R.pick([4, 9, 0.25, 2]), L = R.n(0.4, 0.8, 0.05);
  const f2 = f * Math.sqrt(kk), v1 = 2 * L * f;
  return {
    ctx: `Struna gitary o długości ${d(L)} m drga z częstotliwością podstawową ${d(f)} Hz. Prędkość fali w strunie jest proporcjonalna do pierwiastka z siły naciągu: v ∝ √F.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz prędkość fali w strunie.', ans: v1, unit: 'm/s', hint: 'Ton podstawowy: L = λ/2, v = λf.', steps: [`${eq(`v = 2Lf = <b>${fmt(v1)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Siłę naciągu struny zmieniono ${kk < 1 ? 'tak, że zmalała ' + fmt(1 / kk) + ' razy' : kk + '-krotnie (wzrosła)'}. Oblicz nową częstotliwość tonu podstawowego. Zapisz obliczenia.`, ans: f2, unit: 'Hz',
        hint: 'f = v/(2L), a v ∝ √F. Długość struny się nie zmienia.',
        steps: [`${eq(`${fr('f₂', 'f₁')} = ${fr('v₂', 'v₁')} = ${sq(fr('F₂', 'F₁'))} = ${sq(fmt(kk))} = ${fmt(Math.sqrt(kk))}`)}`, `${eq(`f₂ ≈ <b>${fmt(f2)} Hz</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny związek f ∝ √F.', '0 pkt – brak postępu.'] }
    ]
  };
}});

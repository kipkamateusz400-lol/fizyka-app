/* FIZYKA ATOMOWA I JĄDROWA */
'use strict';

G({ id: 'atom-fotoefekt', area: 'atom', title: 'Zjawisko fotoelektryczne', gen() {
  const met = R.pick([{ n: 'cezu', W: 2.14 }, { n: 'potasu', W: 2.3 }, { n: 'sodu', W: 2.28 }, { n: 'wapnia', W: 2.87 }, { n: 'cynku', W: 4.3 }]);
  const l0 = C.h * C.c / (met.W * C.eV) * 1e9;
  const lam = R.n(Math.max(150, Math.round(l0 * 0.4 / 10) * 10), Math.floor(l0 * 0.85 / 10) * 10, 10);
  const Ef = C.h * C.c / (lam * 1e-9) / C.eV, Ek = Ef - met.W, Uh = Ek, vmax = Math.sqrt(2 * Ek * C.eV / C.me);
  return {
    ctx: `Powierzchnię ${met.n} (praca wyjścia W = ${d(met.W)} eV) oświetlono światłem o długości fali λ = ${lam} nm. h = 6,63·10⁻³⁴ J·s, c = 3·10⁸ m/s, 1 eV = 1,6·10⁻¹⁹ J.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz maksymalną energię kinetyczną fotoelektronów (w eV). Zapisz obliczenia.', ans: Ek, unit: 'eV',
        hint: 'Równanie Einsteina–Millikana: hc/λ = W + E_k,max. Policz energię fotonu w eV.',
        steps: [`Energia fotonu: ${eq(`E<sub>f</sub> = ${fr('hc', 'λ')} ≈ ${fmt(Ef * C.eV)} J ≈ ${fmt(Ef)} eV`)}`, `${eq(`E<sub>k,max</sub> = E<sub>f</sub> − W ≈ <b>${fmt(Ek)} eV</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna energia fotonu lub poprawny zapis równania Einsteina–Millikana.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz napięcie hamowania (napięcie, przy którym prąd fotoelektryczny zanika).', ans: Uh, unit: 'V', hint: 'eU_h = E_k,max. Jeśli E_k jest w eV, to U_h w woltach ma tę samą wartość liczbową.',
        steps: [`${eq(`eU<sub>h</sub> = E<sub>k,max</sub> → U<sub>h</sub> ≈ <b>${fmt(Uh)} V</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz długość fali granicznej (progowej) dla tego metalu.', ans: l0, unit: 'nm', hint: 'hc/λ₀ = W.', steps: [`${eq(`λ₀ = ${fr('hc', 'W')} ≈ <b>${fmt(l0)} nm</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'Zwiększenie natężenia światła (przy tej samej λ) zwiększa liczbę emitowanych elektronów.', v: true },
        { s: 'Zwiększenie natężenia światła zwiększa maksymalną energię kinetyczną fotoelektronów.', v: false },
        { s: 'Światło o długości fali większej od λ₀ nie wybije elektronów, nawet przy dużym natężeniu.', v: true },
        { s: `Maksymalna prędkość fotoelektronów wynosi ok. ${fmt(vmax)} m/s.`, v: true }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'atom-bohr', area: 'atom', title: 'Model Bohra – widmo wodoru', gen() {
  const n = R.pick([1, 2, 2, 3]), m = n + R.i(1, 3);
  const E = 13.6 * (1 / (n * n) - 1 / (m * m)), lam = C.h * C.c / (E * C.eV) * 1e9;
  const series = { 1: 'Lymana (nadfiolet)', 2: 'Balmera (głównie światło widzialne)', 3: 'Paschena (podczerwień)' }[n];
  const opts = ['Lymana', 'Balmera', 'Paschena', 'Bracketta'];
  return {
    ctx: `Elektron w atomie wodoru przechodzi z orbity n = ${m} na orbitę n = ${n}. Energia elektronu na n-tej orbicie: E<sub>n</sub> = −13,6 eV/n².`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz energię emitowanego fotonu (w eV).', ans: E, unit: 'eV', hint: 'E = E_m − E_n = 13,6(1/n² − 1/m²) eV.',
        steps: [`${eq(`E = 13,6(${fr('1', n + '²')} − ${fr('1', m + '²')}) ≈ <b>${fmt(E)} eV</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz długość fali emitowanego promieniowania (w nm). Zapisz obliczenia.', ans: lam, unit: 'nm',
        hint: 'E = hc/λ. Zamień eV na J.',
        steps: [`${eq(`λ = ${fr('hc', 'E')} = ${fr('6,63·10⁻³⁴·3·10⁸', `${fmt(E)}·1,6·10⁻¹⁹`)} ≈ <b>${fmt(lam)} nm</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór z zamianą jednostek.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Do której serii widmowej należy ta linia?', options: opts, correct: n - 1, steps: [`Przejścia na n = ${n} tworzą serię ${series}.`] }
    ]
  };
}});

G({ id: 'atom-rozpad', area: 'atom', title: 'Prawo rozpadu promieniotwórczego', gen() {
  const iso = R.pick([{ n: 'jod-131', T: 8, u: 'dni' }, { n: 'technet-99m', T: 6, u: 'godzin' }, { n: 'kobalt-60', T: 5.27, u: 'lat' }, { n: 'stront-90', T: 28.8, u: 'lat' }, { n: 'radon-222', T: 3.8, u: 'dni' }]);
  const k = R.pick([2, 3, 4, 5]), t = +(k * iso.T).toFixed(2);
  const frac = Math.pow(0.5, k), pct = (1 - frac) * 100;
  const target = R.pick([10, 5, 1]), tt = iso.T * Math.log2(100 / target);
  return {
    ctx: `Okres połowicznego rozpadu izotopu ${iso.n} wynosi ${d(iso.T)} ${iso.u}. W chwili początkowej próbka zawierała ${v('N')}₀ jąder tego izotopu.`,
    parts: [
      { kind: 'num', pts: 1, q: `Jaki procent początkowej liczby jąder ulegnie rozpadowi po ${d(t)} ${iso.u}?`, ans: pct, unit: '%', hint: 'Policz, ile to okresów połowicznego rozpadu. Po k okresach zostaje (1/2)^k.',
        steps: [`${d(t)} ${iso.u} = ${k}T<sub>1/2</sub>, zostaje (1/2)<sup>${k}</sup> = ${fmt(frac * 100)}% jąder, rozpadło się <b>${fmt(pct)}%</b>.`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Oblicz, po jakim czasie aktywność próbki spadnie do ${target}% wartości początkowej (w ${iso.u}). Zapisz obliczenia.`, ans: tt, unit: iso.u,
        hint: 'A = A₀(1/2)^(t/T). Rozwiąż równanie wykładnicze – logarytmem: t = T·log₂(A₀/A).',
        steps: [`${eq(`${fr(target, '100')} = (${fr('1', '2')})<sup>t/T</sup> → ${fr('t', 'T')} = log₂${fr('100', target)} = ${fr(`log ${fmt(100 / target)}`, 'log 2')} ≈ ${fmt(Math.log2(100 / target))}`)}`, `${eq(`t ≈ ${fmt(Math.log2(100 / target))}·${d(iso.T)} ≈ <b>${fmt(tt)} ${iso.u}</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne równanie prawa rozpadu.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Który czynnik zmienia okres połowicznego rozpadu izotopu?', options: ['żaden z wymienionych', 'temperatura próbki', 'ciśnienie', 'masa próbki'], correct: 0, steps: ['Okres półrozpadu to cecha jądra – nie zależy od warunków zewnętrznych ani od ilości substancji.'] }
    ]
  };
}});

G({ id: 'atom-reakcje', area: 'atom', title: 'Reakcje i rozpady jądrowe', gen() {
  const all = [
    { r: '²³⁸₉₂U → ²³⁴₉₀Th + X', a: '⁴₂He (cząstka α)', w: ['⁰₋₁e (β⁻)', '¹₀n', '¹₁p'], ex: 'A: 238 − 234 = 4, Z: 92 − 90 = 2 → ⁴₂He.' },
    { r: '¹⁴₆C → ¹⁴₇N + X + ν̄ₑ', a: '⁰₋₁e (elektron, β⁻)', w: ['⁰₊₁e (β⁺)', '⁴₂He', '¹₀n'], ex: 'A się nie zmienia, Z rośnie o 1 → wyemitowany elektron (neutron → proton + e⁻ + antyneutrino).' },
    { r: '¹⁴₇N + ⁴₂He → ¹⁷₈O + X', a: '¹₁p (proton)', w: ['¹₀n', '⁰₋₁e', '²₁H'], ex: 'A: 14 + 4 − 17 = 1, Z: 7 + 2 − 8 = 1 → proton (reakcja Rutherforda).' },
    { r: '⁹₄Be + ⁴₂He → ¹²₆C + X', a: '¹₀n (neutron)', w: ['¹₁p', '⁰₋₁e', 'γ'], ex: 'A: 9 + 4 − 12 = 1, Z: 4 + 2 − 6 = 0 → neutron (odkrycie neutronu, Chadwick).' },
    { r: '²³⁵₉₂U + ¹₀n → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + X', a: '3·¹₀n (trzy neutrony)', w: ['2·¹₀n', '¹₁p', '⁴₂He'], ex: 'A: 235 + 1 − 141 − 92 = 3, Z: 92 − 56 − 36 = 0 → 3 neutrony.' },
    { r: '¹¹₆C → ¹¹₅B + X + νₑ', a: '⁰₊₁e (pozyton, β⁺)', w: ['⁰₋₁e', '¹₀n', '⁴₂He'], ex: 'Z maleje o 1 przy stałym A → pozyton (proton → neutron + e⁺ + neutrino).' },
    { r: '²H + ³H → ⁴He + X', a: '¹₀n (neutron)', w: ['¹₁p', 'γ', '⁰₋₁e'], ex: 'A: 2 + 3 − 4 = 1, Z: 1 + 1 − 2 = 0 → neutron (reakcja syntezy D–T).' }
  ];
  const picks = R.sample(all, 2);
  return {
    ctx: 'W reakcjach jądrowych zachowana jest liczba nukleonów (A) i ładunek (Z). X oznacza brakującą cząstkę.',
    parts: picks.map(p => {
      const opts = R.shuffle([p.a, ...p.w]);
      return { kind: 'mc', pts: 1, q: `Uzupełnij reakcję: <b class="nuc">${p.r}</b>. Czym jest X?`, options: opts, correct: opts.indexOf(p.a), steps: [p.ex] };
    })
  };
}});

G({ id: 'atom-defekt', area: 'atom', title: 'Defekt masy i energia wiązania', gen() {
  const nuc = R.pick([{ n: 'deuteru ²₁H', Z: 1, N: 1, m: 2.013553 }, { n: 'helu ⁴₂He', Z: 2, N: 2, m: 4.001506 }, { n: 'trytu ³₁H', Z: 1, N: 2, m: 3.015501 }, { n: 'węgla ¹²₆C', Z: 6, N: 6, m: 11.996709 }, { n: 'tlenu ¹⁶₈O', Z: 8, N: 8, m: 15.990526 }]);
  const mp = 1.007276, mn = 1.008665;
  const dm = nuc.Z * mp + nuc.N * mn - nuc.m, E = dm * C.uMeV, Ea = E / (nuc.Z + nuc.N);
  return {
    ctx: `Masa jądra ${nuc.n} wynosi ${pl(nuc.m)} u. Masa protonu ${pl(mp)} u, masa neutronu ${pl(mn)} u, 1 u ↔ 931,5 MeV.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz energię wiązania tego jądra (w MeV). Zapisz obliczenia.', ans: E, unit: 'MeV',
        hint: 'Defekt masy Δm = Z·m_p + N·m_n − m_jądra. Energia wiązania E = Δm·c² (w u → razy 931,5 MeV).',
        steps: [`${eq(`Δm = ${nuc.Z}·${pl(mp)} + ${nuc.N}·${pl(mn)} − ${pl(nuc.m)} ≈ ${fmt(dm, 4)} u`)}`, `${eq(`E<sub>w</sub> = Δm·931,5 MeV/u ≈ <b>${fmt(E)} MeV</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny defekt masy.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz energię wiązania przypadającą na jeden nukleon.', ans: Ea, unit: 'MeV', hint: 'Podziel przez A = Z + N.',
        steps: [`${eq(`${fr('E<sub>w</sub>', 'A')} = ${fr(fmt(E), nuc.Z + nuc.N)} ≈ <b>${fmt(Ea)} MeV/nukleon</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'open', pts: 1, q: 'Korzystając z zależności energii wiązania na nukleon od liczby masowej, wyjaśnij, dlaczego energia wydziela się zarówno przy syntezie lekkich jąder, jak i przy rozszczepieniu ciężkich.', model: 'Energia wiązania na nukleon rośnie od lekkich jąder do maksimum w okolicy żelaza (A ≈ 56), a potem powoli maleje. Zarówno synteza lekkich jąder, jak i rozszczepienie ciężkich prowadzą do jąder silniej związanych (bliższych maksimum), więc różnica energii wiązania jest uwalniana.' }
    ]
  };
}});

G({ id: 'atom-debroglie', area: 'atom', title: 'Fale materii – długość fali de Broglie’a', gen() {
  const U = R.n(50, 5000, 50), p = Math.sqrt(2 * C.me * C.e * U), lam = C.h / p;
  return {
    ctx: `Elektron (m<sub>e</sub> = 9,11·10⁻³¹ kg), początkowo w spoczynku, przyspieszono napięciem ${d(U)} V. h = 6,63·10⁻³⁴ J·s, e = 1,6·10⁻¹⁹ C. Pomiń efekty relatywistyczne.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz długość fali de Broglie’a tego elektronu (w nm). Zapisz obliczenia.', ans: lam * 1e9, unit: 'nm',
        hint: 'λ = h/p, a pęd z energii: E_k = eU = p²/(2m) → p = √(2meU).',
        steps: [`${eq(`p = ${sq('2m<sub>e</sub>eU')} ≈ ${fmt(p)} kg·m/s`)}`, `${eq(`λ = ${fr('h', 'p')} ≈ ${fmt(lam)} m = <b>${fmt(lam * 1e9)} nm</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne wyrażenie pędu przez napięcie.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Które zjawisko potwierdza falową naturę elektronów?', options: ['dyfrakcja elektronów na krysztale', 'zjawisko fotoelektryczne', 'promieniowanie ciała doskonale czarnego', 'rozpad β'], correct: 0, steps: ['Dyfrakcja (doświadczenie Davissona–Germera) to typowo falowe zjawisko.'] }
    ]
  };
}});

G({ id: 'atom-odrzut', area: 'atom', title: 'Pęd fotonu i odrzut atomu', gen() {
  const lam = R.pick([121.6, 102.6, 656.3, 486.1]), m = 1.674e-27;
  const p = C.h / (lam * 1e-9), vv = p / m;
  return {
    ctx: `Spoczywający atom wodoru (masa 1,674·10⁻²⁷ kg) emituje foton o długości fali ${d(lam)} nm. h = 6,63·10⁻³⁴ J·s.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz pęd fotonu.', ans: p, unit: 'kg·m/s', hint: 'p = h/λ.', steps: [`${eq(`p = ${fr('h', 'λ')} ≈ <b>${fmt(p)} kg·m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz prędkość odrzutu atomu. Zapisz obliczenia.', ans: vv, unit: 'm/s',
        hint: 'Zasada zachowania pędu: przed emisją pęd = 0, więc atom ma pęd równy co do wartości pędowi fotonu.',
        steps: [`${eq('0 = p<sub>foton</sub> − m v → v = p/m')}`, `${eq(`v ≈ <b>${fmt(vv)} m/s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zastosowanie zasady zachowania pędu.', '0 pkt – brak postępu.'] }
    ]
  };
}});

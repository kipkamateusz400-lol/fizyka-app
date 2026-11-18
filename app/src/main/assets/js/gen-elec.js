/* ELEKTRYCZNOŚĆ I MAGNETYZM */
'use strict';

G({ id: 'elec-coulomb', area: 'elec', title: 'Prawo Coulomba – pole dwóch ładunków', gen() {
  const q1 = R.n(1, 9, 1), q2 = R.n(1, 9, 1), r = R.n(10, 50, 5) / 100;
  const F = C.k * q1 * 1e-6 * q2 * 1e-6 / (r * r);
  const E1 = C.k * q1 * 1e-6 / (r / 2) ** 2, E2 = C.k * q2 * 1e-6 / (r / 2) ** 2, Emid = Math.abs(E1 - E2);
  return {
    ctx: `Dwa dodatnie ładunki punktowe ${v('q')}₁ = ${q1} μC i ${v('q')}₂ = ${q2} μC umieszczono w próżni w odległości ${v('r')} = ${d(r * 100)} cm od siebie. Stała elektryczna k = 8,99·10⁹ N·m²/C².`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz wartość siły wzajemnego oddziaływania ładunków.', ans: F, unit: 'N', hint: 'F = kq₁q₂/r². Zamień μC na C i cm na m!',
        steps: [`${eq(`F = ${fr('kq₁q₂', 'r²')} = ${fr(`8,99·10⁹·${q1}·10⁻⁶·${q2}·10⁻⁶`, `${d(r)}²`)} ≈ <b>${fmt(F)} N</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz wartość natężenia pola elektrycznego w punkcie leżącym w połowie odległości między ładunkami. Zapisz obliczenia.', ans: Emid, unit: 'N/C',
        hint: 'Natężenia od obu ładunków w środku mają przeciwne zwroty (oba ładunki dodatnie „odpychają” od siebie). Odejmij wartości.',
        steps: [`Od każdego ładunku: E = kq/(r/2)². ${eq(`E₁ ≈ ${fmt(E1)} N/C,  E₂ ≈ ${fmt(E2)} N/C`)}`, `Wektory mają przeciwne zwroty: ${eq(`E = |E₁ − E₂| ≈ <b>${fmt(Emid)} N/C</b>`)}${q1 === q2 ? 'Ładunki są równe – pole w środku się znosi.' : ''}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne natężenia od pojedynczych ładunków lub poprawne ustalenie zwrotów.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Jak zmieni się siła oddziaływania, jeśli odległość między ładunkami zwiększymy trzykrotnie?', options: ['zmaleje 9 razy', 'zmaleje 3 razy', 'wzrośnie 9 razy', 'nie zmieni się'], correct: 0, steps: ['F ∝ 1/r² → (1/3)² = 1/9.'] }
    ]
  };
}});

G({ id: 'elec-kondensator', area: 'elec', title: 'Kondensator płaski', gen() {
  const S = R.n(50, 400, 50) / 1e4, dd = R.n(0.5, 3, 0.5) / 1000, er = R.pick([1, 2.2, 3.5, 5]), U = R.n(50, 500, 50);
  const Cap = C.eps0 * er * S / dd, Q = Cap * U, E = Cap * U * U / 2, Ef = U / dd;
  return {
    ctx: `Kondensator płaski ma okładki o powierzchni ${d(S * 1e4)} cm² każda, odległe o ${d(dd * 1000)} mm. Przestrzeń między okładkami wypełnia dielektryk o przenikalności względnej ε<sub>r</sub> = ${d(er)}. Kondensator naładowano do napięcia ${d(U)} V. ε₀ = 8,85·10⁻¹² F/m.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz ładunek zgromadzony na okładce kondensatora. Zapisz obliczenia.', ans: Q, unit: 'C',
        hint: 'C = ε₀ε_r S/d, potem Q = CU. Uważaj na jednostki: cm² → m² (×10⁻⁴), mm → m.',
        steps: [`${eq(`C = ${fr('ε₀ε<sub>r</sub>S', 'd')} ≈ ${fmt(Cap)} F`)}`, `${eq(`Q = CU ≈ <b>${fmt(Q)} C</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne obliczenie pojemności.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz energię zgromadzoną w kondensatorze.', ans: E, unit: 'J', hint: 'E = CU²/2.', steps: [`${eq(`E = ${fr('CU²', '2')} ≈ <b>${fmt(E)} J</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wartość natężenia pola elektrycznego między okładkami.', ans: Ef, unit: 'V/m', hint: 'Pole jednorodne: E = U/d.', steps: [`${eq(`E = ${fr('U', 'd')} ≈ <b>${fmt(Ef)} V/m</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Kondensator odłączono od źródła, a następnie rozsunięto okładki. Napięcie między okładkami:', options: ['wzrośnie', 'zmaleje', 'nie zmieni się', 'spadnie do zera'], correct: 0, steps: ['Po odłączeniu Q = const. Rozsunięcie zmniejsza C (C ∝ 1/d), więc U = Q/C rośnie.'] }
    ]
  };
}});

G({ id: 'elec-obwod-sem', area: 'elec', title: 'Źródło z oporem wewnętrznym', gen() {
  const E = R.pick([1.5, 3, 4.5, 6, 9, 12]), r = R.n(0.2, 2, 0.1), Rz = R.n(1, 20, 1);
  const I = E / (Rz + r), U = I * Rz, P = I * I * Rz, Pmax = E * E / (4 * r), eta = Rz / (Rz + r);
  return {
    ctx: `Bateria o sile elektromotorycznej ℰ = ${d(E)} V i oporze wewnętrznym ${v('r')}<sub>w</sub> = ${d(r)} Ω zasila opornik o oporze ${v('R')} = ${d(Rz)} Ω.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz natężenie prądu w obwodzie.', ans: I, unit: 'A', hint: 'Prawo Ohma dla całego obwodu: I = ℰ/(R + r_w).', steps: [`${eq(`I = ${fr('ℰ', 'R + r<sub>w</sub>')} ≈ <b>${fmt(I)} A</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz napięcie na zaciskach baterii.', ans: U, unit: 'V', hint: 'U = ℰ − I r_w = IR.', steps: [`${eq(`U = ℰ − Ir<sub>w</sub> ≈ <b>${fmt(U)} V</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz maksymalną moc, jaką ta bateria może przekazać do opornika zewnętrznego (dobierając jego opór). Zapisz obliczenia.', ans: Pmax, unit: 'W',
        hint: 'Moc wydzielana na odbiorniku jest największa, gdy R = r_w (dopasowanie). Wtedy P = ℰ²/(4r_w).',
        steps: [`P(R) = ℰ²R/(R + r<sub>w</sub>)² osiąga maksimum dla R = r<sub>w</sub>.`, `${eq(`P<sub>max</sub> = ${fr('ℰ²', '4r<sub>w</sub>')} ≈ <b>${fmt(Pmax)} W</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – stwierdzenie, że maksimum występuje dla R = r_w.', '0 pkt – brak postępu.'] },
      { kind: 'open', pts: 1, q: 'Opisz, jak doświadczalnie wyznaczyć SEM i opór wewnętrzny baterii, mając woltomierz, amperomierz i opornicę suwakową.', model: 'Łączę baterię z opornicą i amperomierzem szeregowo, a woltomierz podłączam do zacisków baterii. Zmieniając opór opornicy, notuję kilka par (I, U). Rysuję wykres U(I) – jest to prosta U = ℰ − r<sub>w</sub>I: punkt przecięcia z osią U to ℰ, a nachylenie (z minusem) to r<sub>w</sub>.' }
    ]
  };
}});

G({ id: 'elec-oporniki', area: 'elec', title: 'Łączenie oporników', gen() {
  const R1 = R.n(2, 20, 2), R2 = R.n(2, 20, 2), R3 = R.n(1, 15, 1), U = R.pick([6, 9, 12, 24]);
  const R12 = R1 * R2 / (R1 + R2), Rz = R12 + R3, I = U / Rz, U12 = I * R12, I1 = U12 / R1;
  return {
    ctx: `Oporniki ${v('R')}₁ = ${R1} Ω i ${v('R')}₂ = ${R2} Ω połączono równolegle, a następnie szeregowo z opornikiem ${v('R')}₃ = ${R3} Ω. Układ podłączono do źródła napięcia ${U} V (opór wewnętrzny pomijalny).`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz opór zastępczy układu.', ans: Rz, unit: 'Ω', hint: 'Równolegle: 1/R = 1/R₁ + 1/R₂. Szeregowo: dodajemy.', steps: [`${eq(`R₁₂ = ${fr('R₁R₂', 'R₁ + R₂')} ≈ ${fmt(R12)} Ω,  R<sub>z</sub> = R₁₂ + R₃ ≈ <b>${fmt(Rz)} Ω</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz natężenie prądu płynącego przez opornik R₁. Zapisz obliczenia.', ans: I1, unit: 'A',
        hint: 'Najpierw prąd całkowity I = U/R_z. Potem napięcie na części równoległej U₁₂ = I·R₁₂. Na końcu I₁ = U₁₂/R₁.',
        steps: [`${eq(`I = ${fr('U', 'R<sub>z</sub>')} ≈ ${fmt(I)} A`)}`, `${eq(`U₁₂ = I·R₁₂ ≈ ${fmt(U12)} V → I₁ = ${fr('U₁₂', 'R₁')} ≈ <b>${fmt(I1)} A</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny prąd całkowity lub napięcie na części równoległej.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'elec-czastka-B', area: 'elec', title: 'Cząstka naładowana w polu magnetycznym', gen() {
  const part = R.pick([{ n: 'Proton', m: C.mp, q: C.e }, { n: 'Elektron', m: C.me, q: C.e }]);
  const U = part.n === 'Proton' ? R.n(100, 2000, 100) : R.n(10, 500, 10), B = part.n === 'Proton' ? R.n(0.05, 0.5, 0.05) : R.n(1, 10, 1) / 1000;
  const vv = Math.sqrt(2 * part.q * U / part.m), r = part.m * vv / (part.q * B), T = 2 * Math.PI * part.m / (part.q * B);
  return {
    ctx: `${part.n}, początkowo w spoczynku, przyspieszono napięciem ${v('U')} = ${d(U)} V, a następnie wprowadzono w obszar jednorodnego pola magnetycznego o indukcji ${v('B')} = ${fmt(B)} T, prostopadle do linii pola. Masa: ${fmt(part.m, 4)} kg, ładunek: ${fmt(part.q, 4)} C. Efekty relatywistyczne pomiń.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz prędkość cząstki po przyspieszeniu. Zapisz obliczenia.', ans: vv, unit: 'm/s',
        hint: 'Praca sił pola elektrycznego zamienia się na energię kinetyczną: qU = mv²/2.',
        steps: [`${eq(`qU = ${fr('mv²', '2')} → v = ${sq(fr('2qU', 'm'))}`)}`, `${eq(`v ≈ <b>${fmt(vv)} m/s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny bilans energii qU = mv²/2.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz promień okręgu, po którym porusza się cząstka w polu magnetycznym. Zapisz obliczenia.', ans: r, unit: 'm',
        hint: 'Siła Lorentza (qvB) pełni rolę siły dośrodkowej.',
        steps: [`${eq(`qvB = ${fr('mv²', 'r')} → r = ${fr('mv', 'qB')}`)}`, `${eq(`r ≈ <b>${fmt(r)} m</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – przyrównanie siły Lorentza do siły dośrodkowej.', '0 pkt – brak postępu.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'Siła Lorentza nie wykonuje pracy nad cząstką, więc wartość prędkości cząstki jest stała.', v: true },
        { s: `Okres obiegu cząstki w polu nie zależy od jej prędkości (T ≈ ${fmt(T)} s).`, v: true },
        { s: 'Gdyby cząstka wleciała równolegle do linii pola, poruszałaby się po okręgu o mniejszym promieniu.', v: false },
        { s: 'Zwiększenie indukcji B zwiększa promień okręgu.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'elec-indukcja-pret', area: 'elec', title: 'Indukcja – pręt na szynach', gen() {
  const B = R.n(0.1, 1, 0.1), L = R.n(0.2, 1, 0.1), vv = R.n(1, 10, 1), Rr = R.n(1, 10, 1);
  const eps = B * L * vv, I = eps / Rr, F = B * I * L, P = F * vv;
  return {
    ctx: `Metalowy pręt o długości ${v('l')} = ${d(L)} m przesuwany jest ze stałą prędkością ${d(vv)} m/s po dwóch poziomych szynach połączonych opornikiem ${v('R')} = ${d(Rr)} Ω. Całość znajduje się w jednorodnym, pionowym polu magnetycznym o indukcji ${d(B)} T. Opór pręta i szyn oraz tarcie pomiń.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz natężenie prądu indukcyjnego. Zapisz obliczenia.', ans: I, unit: 'A',
        hint: 'SEM indukcji w poruszającym się pręcie: ℰ = Blv (z prawa Faradaya: strumień rośnie o B·l·v na sekundę).',
        steps: [`${eq(`ℰ = ${fr('ΔΦ', 'Δt')} = Blv ≈ ${fmt(eps)} V`)}`, `${eq(`I = ${fr('ℰ', 'R')} ≈ <b>${fmt(I)} A</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna SEM indukcji.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz wartość siły, jaką trzeba działać na pręt, aby poruszał się ze stałą prędkością. Zapisz obliczenia.', ans: F, unit: 'N',
        hint: 'Na pręt z prądem działa siła elektrodynamiczna F = BIl, hamująca ruch (reguła Lenza). Przy v = const siła zewnętrzna ją równoważy.',
        steps: [`${eq(`F = BIl ≈ <b>${fmt(F)} N</b>`)}Kontrola: moc siły zewnętrznej Fv ≈ ${fmt(P)} W = moc wydzielana na oporniku I²R.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór na siłę elektrodynamiczną.', '0 pkt – brak postępu.'] },
      { kind: 'open', pts: 1, q: 'Wyjaśnij, korzystając z reguły Lenza, dlaczego pręt puszczony swobodnie (bez siły zewnętrznej) zwalnia.', model: 'Prąd indukcyjny ma taki kierunek, że przeciwdziała przyczynie, która go wywołała (zmianie strumienia). Siła elektrodynamiczna działająca na pręt z prądem jest więc skierowana przeciwnie do jego prędkości, a energia kinetyczna pręta zamienia się w ciepło na oporniku.' }
    ]
  };
}});

G({ id: 'elec-transformator', area: 'elec', title: 'Transformator idealny', gen() {
  const Np = R.pick([200, 400, 500, 1000, 1200]), Ns = R.pick([20, 50, 100, 2000, 3000]), Up = 230, Rr = R.n(5, 100, 5);
  const Us = Up * Ns / Np, Is = Us / Rr, Ip = Is * Ns / Np;
  return {
    ctx: `Uzwojenie pierwotne transformatora ma ${Np} zwojów i jest podłączone do sieci o napięciu skutecznym 230 V. Uzwojenie wtórne ma ${Ns} zwojów i zasila opornik ${d(Rr)} Ω. Transformator uznaj za idealny.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz napięcie skuteczne na uzwojeniu wtórnym.', ans: Us, unit: 'V', hint: 'U_s/U_p = N_s/N_p.', steps: [`${eq(`U<sub>s</sub> = U<sub>p</sub>${fr('N<sub>s</sub>', 'N<sub>p</sub>')} ≈ <b>${fmt(Us)} V</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz natężenie skuteczne prądu w uzwojeniu pierwotnym. Zapisz obliczenia.', ans: Ip, unit: 'A',
        hint: 'Idealny transformator: moc pierwotna = moc wtórna, U_p I_p = U_s I_s.',
        steps: [`${eq(`I<sub>s</sub> = ${fr('U<sub>s</sub>', 'R')} ≈ ${fmt(Is)} A`)}`, `${eq(`I<sub>p</sub> = I<sub>s</sub>${fr('U<sub>s</sub>', 'U<sub>p</sub>')} ≈ <b>${fmt(Ip)} A</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny prąd wtórny lub zapis równości mocy.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Dlaczego transformator nie działa po podłączeniu do źródła napięcia stałego?', options: ['prąd stały nie wytwarza zmiennego strumienia magnetycznego, więc nie ma indukcji', 'prąd stały nie wytwarza pola magnetycznego', 'rdzeń ulega rozmagnesowaniu', 'opór uzwojeń dla prądu stałego jest nieskończony'], correct: 0, steps: ['Zjawisko indukcji wymaga zmiany strumienia. Prąd stały daje stałe pole – w uzwojeniu wtórnym nie indukuje się SEM.'] }
    ]
  };
}});

G({ id: 'elec-przewodnik', area: 'elec', title: 'Pole magnetyczne przewodników z prądem', gen() {
  const I1 = R.n(2, 20, 1), I2 = R.n(2, 20, 1), dd = R.n(2, 20, 1) / 100, L = 1;
  const B = C.mu0 * I1 / (2 * Math.PI * dd), F = B * I2 * L, same = Math.random() < 0.5;
  return {
    ctx: `Dwa długie, prostoliniowe, równoległe przewodniki są odległe o ${d(dd * 100)} cm. Płyną w nich prądy ${I1} A i ${I2} A ${same ? 'w tym samym kierunku' : 'w przeciwnych kierunkach'}. μ₀ = 4π·10⁻⁷ T·m/A.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz indukcję pola magnetycznego wytworzonego przez pierwszy przewodnik w miejscu, gdzie leży drugi.', ans: B, unit: 'T',
        hint: 'B = μ₀I/(2πr).', steps: [`${eq(`B = ${fr('μ₀I₁', '2πd')} ≈ <b>${fmt(B)} T</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wartość siły działającej na 1 m długości drugiego przewodnika.', ans: F, unit: 'N', hint: 'F = BIl.', steps: [`${eq(`F = BI₂l ≈ <b>${fmt(F)} N</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Przewodniki:', options: ['przyciągają się', 'odpychają się', 'nie oddziałują', 'obracają się względem siebie'], correct: same ? 0 : 1, steps: ['Prądy zgodne – przyciąganie, prądy przeciwne – odpychanie (wynika z reguły prawej dłoni i siły elektrodynamicznej).'] }
    ]
  };
}});

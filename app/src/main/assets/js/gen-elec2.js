/* ELEKTRYCZNOŚĆ I MAGNETYZM – zestaw 2 */
'use strict';

G({ id: 'elec-kondensatory', area: 'elec', title: 'Układ kondensatorów', gen() {
  const C1 = R.pick([2, 3, 4, 6, 10]), C2 = R.pick([2, 3, 4, 6, 12]), C3 = R.pick([1, 2, 5]), U = R.pick([6, 12, 24, 50]);
  const C12 = C1 * C2 / (C1 + C2), Cz = C12 + C3, Q12 = C12 * U, U1 = Q12 / C1, E = 0.5 * Cz * 1e-6 * U * U;
  return {
    ctx: `Kondensatory ${v('C')}₁ = ${C1} μF i ${v('C')}₂ = ${C2} μF połączono szeregowo, a do nich równolegle dołączono ${v('C')}₃ = ${C3} μF. Układ podłączono do źródła napięcia ${U} V.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz pojemność zastępczą układu (w μF).', ans: Cz, unit: 'μF', hint: 'Szeregowo: 1/C = 1/C₁ + 1/C₂. Równolegle: dodajemy.',
        steps: [`${eq(`C₁₂ = ${fr('C₁C₂', 'C₁ + C₂')} ≈ ${fmt(C12)} μF,  C = C₁₂ + C₃ ≈ <b>${fmt(Cz)} μF</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz napięcie na kondensatorze C₁. Zapisz obliczenia.', ans: U1, unit: 'V',
        hint: 'Gałąź szeregowa C₁–C₂ ma napięcie U. Kondensatory szeregowe mają ten sam ładunek: Q = C₁₂U.',
        steps: [`${eq(`Q = C₁₂U ≈ ${fmt(Q12)} μC`)}`, `${eq(`U₁ = ${fr('Q', 'C₁')} ≈ <b>${fmt(U1)} V</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny ładunek w gałęzi szeregowej.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz energię zgromadzoną w całym układzie.', ans: E, unit: 'J', hint: 'E = CU²/2 (pamiętaj: μF = 10⁻⁶ F).', steps: [`${eq(`E = ${fr('CU²', '2')} ≈ <b>${fmt(E)} J</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'elec-drut', area: 'elec', title: 'Opór drutu i grzałka', gen() {
  const mat = R.pick([{ n: 'nikieliny', r: 4.2e-7 }, { n: 'konstantanu', r: 4.9e-7 }, { n: 'chromonikieliny', r: 1.1e-6 }]);
  const dm = R.pick([0.2, 0.3, 0.4, 0.5]), L = R.n(2, 15, 1);
  const S = Math.PI * (dm / 2000) ** 2, Rr = mat.r * L / S, P = 230 * 230 / Rr;
  return {
    ctx: `Grzałkę wykonano z drutu z ${mat.n} (opór właściwy ${fmt(mat.r)} Ω·m) o długości ${d(L)} m i średnicy ${pl(dm)} mm. Grzałkę podłączono do napięcia 230 V. Zmianę oporu z temperaturą pomiń.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz opór grzałki. Zapisz obliczenia.', ans: Rr, unit: 'Ω',
        hint: 'R = ρl/S, a pole przekroju S = πr² = πd²/4. Średnicę zamień na metry!',
        steps: [`${eq(`S = ${fr('πd²', '4')} ≈ ${fmt(S)} m²`)}`, `${eq(`R = ${fr('ρl', 'S')} ≈ <b>${fmt(Rr)} Ω</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne pole przekroju.', '0 pkt – np. użycie średnicy zamiast promienia.'] },
      { kind: 'num', pts: 1, q: 'Oblicz moc grzałki.', ans: P, unit: 'W', hint: 'P = U²/R.', steps: [`${eq(`P = ${fr('U²', 'R')} ≈ <b>${fmt(P)} W</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Drut skrócono o połowę (ta sama grzałka, to samo napięcie). Moc grzałki:', options: ['wzrośnie 2 razy', 'zmaleje 2 razy', 'wzrośnie 4 razy', 'nie zmieni się'], correct: 0, steps: ['R ∝ l, więc opór maleje 2 razy, a P = U²/R rośnie 2 razy.'] }
    ]
  };
}});

G({ id: 'elec-oscyloskop', area: 'elec', title: 'Elektron w polu kondensatora (odchylenie)', gen() {
  const v0 = R.n(1, 5, 0.5) * 1e7, U = R.n(20, 200, 10), dd = R.n(0.5, 2, 0.5) / 100, l = R.n(2, 6, 1) / 100;
  const E = U / dd, a = C.e * E / C.me, t = l / v0, y = a * t * t / 2;
  return {
    ctx: `Elektron wlatuje z prędkością ${fmt(v0)} m/s równolegle do okładek kondensatora płaskiego, w połowie odległości między nimi. Okładki mają długość ${d(l * 100)} cm, są odległe o ${d(dd * 100)} cm, a napięcie między nimi wynosi ${d(U)} V. Pomiń grawitację. e = 1,6·10⁻¹⁹ C, m<sub>e</sub> = 9,11·10⁻³¹ kg.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz wartość przyspieszenia elektronu między okładkami.', ans: a, unit: 'm/s²', hint: 'a = F/m = eE/m, E = U/d.', steps: [`${eq(`a = ${fr('eU', 'm<sub>e</sub>d')} ≈ <b>${fmt(a)} m/s²</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 3, q: 'Oblicz, o ile (w mm) elektron odchyli się od pierwotnego kierunku na końcu okładek. Zapisz obliczenia.', ans: y * 1000, unit: 'mm',
        hint: 'To jak rzut poziomy: wzdłuż okładek ruch jednostajny (t = l/v₀), w poprzek – jednostajnie przyspieszony (y = at²/2).',
        steps: [`Czas przelotu: ${eq(`t = ${fr('l', 'v₀')} ≈ ${fmt(t)} s`)}`, `Odchylenie: ${eq(`y = ${fr('at²', '2')} = ${fr('eUl²', '2m<sub>e</sub>dv₀²')}`)}`, `${eq(`y ≈ ${fmt(y)} m = <b>${fmt(y * 1000)} mm</b>`)}${y > dd / 2 ? ' Uwaga: to więcej niż połowa odległości okładek – w rzeczywistości elektron uderzyłby w okładkę.' : ''}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawny wzór na odchylenie.', '1 pkt – poprawny czas przelotu lub przyspieszenie.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'elec-pradnica', area: 'elec', title: 'Prądnica prądu przemiennego', gen() {
  const N = R.pick([50, 100, 200, 500]), B = R.n(0.1, 0.5, 0.05), a = R.n(5, 20, 1) / 100, n = R.pick([10, 25, 50]);
  const S = a * a, w = 2 * Math.PI * n, emax = N * B * S * w;
  return {
    ctx: `Kwadratowa ramka o boku ${d(a * 100)} cm, mająca ${N} zwojów, obraca się ze stałą częstotliwością ${n} obr/s w jednorodnym polu magnetycznym o indukcji ${d(B)} T. Oś obrotu jest prostopadła do linii pola.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz maksymalną wartość SEM indukowanej w ramce. Zapisz obliczenia.', ans: emax, unit: 'V',
        hint: 'Φ = NBS cos ωt, więc ℰ = NBSω sin ωt. Amplituda: ℰ_max = NBSω, ω = 2πn.',
        steps: [`${eq(`ω = 2πn ≈ ${fmt(w)} rad/s,  S = a² = ${fmt(S)} m²`)}`, `${eq(`ℰ<sub>max</sub> = NBSω ≈ <b>${fmt(emax)} V</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór ℰ_max = NBSω lub poprawne ω.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wartość skuteczną tej SEM.', ans: emax / Math.SQRT2, unit: 'V', hint: 'ℰ_sk = ℰ_max/√2.', steps: [`${eq(`ℰ<sub>sk</sub> = ${fr('ℰ<sub>max</sub>', '√2')} ≈ <b>${fmt(emax / Math.SQRT2)} V</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'W którym położeniu ramki SEM jest największa?', options: ['gdy płaszczyzna ramki jest równoległa do linii pola (strumień = 0)', 'gdy płaszczyzna ramki jest prostopadła do linii pola (strumień największy)', 'SEM jest stała', 'gdy ramka obróci się o 45°'], correct: 0, steps: ['SEM zależy od szybkości ZMIAN strumienia. Strumień zmienia się najszybciej, gdy przechodzi przez zero.'] }
    ]
  };
}});

G({ id: 'elec-wheatstone', area: 'elec', title: 'Mostek Wheatstone’a', gen() {
  const R1 = R.n(10, 100, 10), R2 = R.n(10, 200, 10), R3 = R.n(10, 200, 10);
  const Rx = R2 * R3 / R1;
  return {
    ctx: `W mostku Wheatstone’a w jednej gałęzi połączono szeregowo oporniki R₁ = ${R1} Ω i R₂ = ${R2} Ω, a w drugiej opornik R₃ = ${R3} Ω i nieznany opornik R<sub>x</sub> (R₁ naprzeciw R₃, R₂ naprzeciw R<sub>x</sub>). Galwanometr łączący punkty między opornikami obu gałęzi wskazuje zero.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz opór R<sub>x</sub>. Zapisz obliczenia.', ans: Rx, unit: 'Ω',
        hint: 'Brak prądu w galwanometrze → punkty mają ten sam potencjał → spadki napięć na R₁ i R₃ są równe, tak samo na R₂ i R_x. Stąd R₁/R₂ = R₃/R_x.',
        steps: [`Równowaga mostka: ${eq(`${fr('R₁', 'R₂')} = ${fr('R₃', 'R<sub>x</sub>')}`)}`, `${eq(`R<sub>x</sub> = ${fr('R₂R₃', 'R₁')} = <b>${fmt(Rx)} Ω</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny warunek równowagi mostka.', '0 pkt – brak postępu.'] },
      { kind: 'open', pts: 1, q: 'Wyjaśnij, dlaczego wynik pomiaru mostkiem nie zależy od napięcia źródła zasilającego.', model: 'Warunek równowagi (R₁/R₂ = R₃/Rₓ) zawiera tylko stosunki oporów. Zmiana napięcia źródła zmienia wszystkie prądy proporcjonalnie, więc potencjały punktów pomiarowych pozostają równe.' }
    ]
  };
}});

G({ id: 'elec-zwojnica', area: 'elec', title: 'Pole magnetyczne zwojnicy', gen() {
  const N = R.pick([200, 500, 800, 1000, 1500]), l = R.n(10, 50, 5) / 100, I = R.n(0.5, 5, 0.5), r = R.n(1, 4, 0.5) / 100;
  const B = C.mu0 * N * I / l, Phi = B * Math.PI * r * r;
  return {
    ctx: `Długa zwojnica o długości ${d(l * 100)} cm ma ${N} zwojów o promieniu ${d(r * 100)} cm. Płynie przez nią prąd o natężeniu ${d(I)} A. μ₀ = 4π·10⁻⁷ T·m/A.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz indukcję pola magnetycznego wewnątrz zwojnicy.', ans: B, unit: 'T', hint: 'B = μ₀NI/l.', steps: [`${eq(`B = ${fr('μ₀NI', 'l')} ≈ <b>${fmt(B)} T</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz strumień pola magnetycznego przez przekrój zwojnicy (jeden zwój).', ans: Phi, unit: 'Wb', hint: 'Φ = BS, S = πr².', steps: [`${eq(`Φ = B·πr² ≈ <b>${fmt(Phi)} Wb</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'Wsunięcie rdzenia żelaznego do zwojnicy znacznie zwiększy indukcję pola.', v: true },
        { s: 'Rozciągnięcie zwojnicy (ta sama liczba zwojów, większa długość) zwiększy indukcję.', v: false },
        { s: 'Pole wewnątrz długiej zwojnicy jest w przybliżeniu jednorodne.', v: true },
        { s: 'Zmiana kierunku prądu nie zmienia zwrotu wektora indukcji.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'elec-praca-pola', area: 'elec', title: 'Praca przy przenoszeniu ładunku w polu ładunku punktowego', gen() {
  const Q = R.n(1, 10, 1), q = R.n(1, 5, 1), r1 = R.n(10, 40, 5) / 100, r2 = r1 + R.n(10, 60, 10) / 100;
  const V1 = C.k * Q * 1e-6 / r1, V2 = C.k * Q * 1e-6 / r2, W = q * 1e-9 * (V1 - V2);
  return {
    ctx: `Ładunek punktowy Q = ${Q} μC wytwarza pole elektryczne. Ładunek próbny q = ${q} nC przeniesiono z punktu A odległego o ${d(r1 * 100)} cm od Q do punktu B odległego o ${d(r2 * 100)} cm. k = 8,99·10⁹ N·m²/C².`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz potencjał pola w punkcie A.', ans: V1, unit: 'V', hint: 'V = kQ/r.', steps: [`${eq(`V<sub>A</sub> = ${fr('kQ', 'r<sub>A</sub>')} ≈ <b>${fmt(V1)} V</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz pracę wykonaną przez siły pola przy przeniesieniu ładunku z A do B. Zapisz obliczenia.', ans: W, unit: 'J',
        hint: 'Praca sił pola W = q(V_A − V_B). Pole jest niejednorodne, więc nie licz F·s!',
        steps: [`${eq(`V<sub>B</sub> = ${fr('kQ', 'r<sub>B</sub>')} ≈ ${fmt(V2)} V`)}`, `${eq(`W = q(V<sub>A</sub> − V<sub>B</sub>) ≈ <b>${fmt(W)} J</b>`)}Praca jest dodatnia – pole odpycha ładunek o tym samym znaku.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny zapis W = qΔV z potencjałami.', '0 pkt – np. W = F·s ze stałą siłą.'] }
    ]
  };
}});

G({ id: 'elec-zarowki', area: 'elec', title: 'Żarówki połączone szeregowo', gen() {
  const P1 = R.pick([25, 40, 60]), P2 = R.pick([75, 100, 150]), U = 230;
  const R1 = U * U / P1, R2 = U * U / P2, I = U / (R1 + R2), p1 = I * I * R1, p2 = I * I * R2;
  return {
    ctx: `Dwie żarówki o parametrach znamionowych 230 V / ${P1} W i 230 V / ${P2} W połączono szeregowo i podłączono do napięcia 230 V. Przyjmij, że opory żarówek są stałe.`,
    parts: [
      { kind: 'num', pts: 2, q: `Oblicz moc wydzielaną w żarówce ${P1} W w tym połączeniu. Zapisz obliczenia.`, ans: p1, unit: 'W',
        hint: 'Z danych znamionowych policz opory: R = U²/P. Potem prąd w obwodzie szeregowym i P = I²R.',
        steps: [`${eq(`R₁ = ${fr('U²', 'P₁')} ≈ ${fmt(R1)} Ω,  R₂ ≈ ${fmt(R2)} Ω`)}`, `${eq(`I = ${fr('U', 'R₁ + R₂')} ≈ ${fmt(I)} A → P₁′ = I²R₁ ≈ <b>${fmt(p1)} W</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne opory żarówek.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Która żarówka świeci jaśniej w połączeniu szeregowym?', options: [`${P1} W (o mniejszej mocy znamionowej)`, `${P2} W (o większej mocy znamionowej)`, 'obie tak samo'], correct: 0, steps: [`Przy szeregowym połączeniu prąd jest wspólny, więc więcej mocy (I²R) wydziela się na większym oporze – a większy opór ma żarówka o mniejszej mocy znamionowej (${fmt(p1)} W wobec ${fmt(p2)} W).`] }
    ]
  };
}});

G({ id: 'elec-strumien', area: 'elec', title: 'Prąd indukowany przez zmienne pole', gen() {
  const N = R.pick([50, 100, 200]), S = R.n(10, 100, 10) / 1e4, B1 = R.n(0.2, 1, 0.1), dt = R.n(0.1, 1, 0.1), Rr = R.n(2, 20, 2);
  const eps = N * S * B1 / dt, I = eps / Rr, Q = N * S * B1 / Rr;
  return {
    ctx: `Cewka o ${N} zwojach i polu przekroju ${d(S * 1e4)} cm² znajduje się w polu magnetycznym prostopadłym do płaszczyzny zwojów. Indukcja pola maleje jednostajnie od ${d(B1)} T do zera w czasie ${d(dt)} s. Końce cewki połączono, a opór całego obwodu wynosi ${d(Rr)} Ω.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz natężenie prądu indukowanego w cewce. Zapisz obliczenia.', ans: I, unit: 'A',
        hint: 'Prawo Faradaya dla N zwojów: ℰ = N·ΔΦ/Δt, ΔΦ = ΔB·S.',
        steps: [`${eq(`ℰ = N${fr('ΔB·S', 'Δt')} ≈ ${fmt(eps)} V`)}`, `${eq(`I = ${fr('ℰ', 'R')} ≈ <b>${fmt(I)} A</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna SEM indukcji.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz ładunek, który przepłynął przez obwód.', ans: Q, unit: 'C', hint: 'q = IΔt = NΔΦ/R – co ciekawe, nie zależy od czasu zmiany.',
        steps: [`${eq(`q = IΔt = ${fr('NSΔB', 'R')} ≈ <b>${fmt(Q)} C</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

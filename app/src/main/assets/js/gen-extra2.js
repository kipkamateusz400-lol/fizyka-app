/* Uzupełnienie tematów z podstawy programowej, które nie miały własnych zadań */
'use strict';

G({ id: 'mech-okrag-niejednostajny', area: 'mech', title: 'Ruch niejednostajny po okręgu', gen() {
  const r = R.n(50, 200, 10), at = R.n(0.5, 3, 0.5), t = R.n(4, 12, 1);
  const vv = at * t, ad = vv * vv / r, a = Math.hypot(at, ad);
  return {
    ctx: `Samochód rusza z miejsca na torze w kształcie okręgu o promieniu ${r} m i zwiększa prędkość ze stałym przyspieszeniem stycznym ${pl(at)} m/s².`,
    parts: [
      { kind: 'num', pts: 1, q: `Oblicz wartość prędkości samochodu po ${t} s.`, ans: vv, unit: 'm/s', hint: 'Przyspieszenie styczne zmienia wartość prędkości: v = a_s·t.', steps: [`${eq(`v = a<sub>s</sub>t = <b>${fmt(vv)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Oblicz wartość całkowitego przyspieszenia samochodu w chwili ${t} s. Zapisz obliczenia.`, ans: a, unit: 'm/s²',
        hint: 'Przyspieszenie dośrodkowe a_d = v²/r jest prostopadłe do stycznego. Dodaj je wektorowo (Pitagoras).',
        steps: [`${eq(`a<sub>d</sub> = ${fr('v²', 'r')} ≈ ${fmt(ad)} m/s²`)}`, `${eq(`a = ${sq('a<sub>s</sub>² + a<sub>d</sub>²')} ≈ <b>${fmt(a)} m/s²</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne przyspieszenie dośrodkowe.', '0 pkt – np. dodanie wartości zamiast wektorów.'] },
      { kind: 'fill', pts: 2, q: 'Uzupełnij zdania.', text: 'Podczas tego ruchu przyspieszenie styczne {0}, a przyspieszenie dośrodkowe {1}. Kąt między wektorem przyspieszenia całkowitego a wektorem prędkości {2}.', gaps: [RMN, RMN, RMN], correct: [2, 0, 0], steps: ['a<sub>s</sub> = const; a<sub>d</sub> = v²/r rośnie z prędkością; całkowite przyspieszenie „skręca” w stronę środka okręgu, więc kąt z prędkością rośnie.'] }
    ]
  };
}});

G({ id: 'mech-rzeka', area: 'mech', title: 'Względność ruchu – łódka na rzece', gen() {
  const d0 = R.n(40, 200, 10), vl = R.n(2, 5, 0.5), vr = R.n(0.5, 1.8, 0.1);
  const t = d0 / vl, drift = vr * t, vw = Math.hypot(vl, vr), ang = rad2deg(Math.asin(vr / vl)), t2 = d0 / Math.sqrt(vl * vl - vr * vr);
  return {
    ctx: `Rzeka ma szerokość ${d0} m, a woda płynie z prędkością ${pl(vr)} m/s względem brzegu. Łódka płynie z prędkością ${pl(vl)} m/s względem wody.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Sternik ustawia łódkę prostopadle do brzegu. Oblicz, jak daleko w dół rzeki zniesie łódkę podczas przeprawy. Zapisz obliczenia.', ans: drift, unit: 'm',
        hint: 'Ruch łódki względem brzegu = ruch względem wody + ruch wody. Czas przeprawy zależy tylko od składowej prostopadłej do brzegu.',
        steps: [`${eq(`t = ${fr('d', 'v<sub>ł</sub>')} = ${fmt(t)} s`)}`, `${eq(`s = v<sub>r</sub>t ≈ <b>${fmt(drift)} m</b>`)}Prędkość względem brzegu: ${fmt(vw)} m/s.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny czas przeprawy.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Pod jakim kątem do kierunku prostopadłego do brzegu (w górę rzeki) trzeba skierować łódkę, aby dopłynęła dokładnie na wprost? Ile wtedy trwa przeprawa? Podaj czas w sekundach.', ans: t2, unit: 's',
        hint: 'Składowa prędkości łódki wzdłuż rzeki musi znieść prąd: v_ł sin α = v_r. Składowa prostopadła: v_ł cos α.',
        steps: [`${eq(`sin α = ${fr('v<sub>r</sub>', 'v<sub>ł</sub>')} → α ≈ ${fmt(ang)}°`)}`, `${eq(`t = ${fr('d', sq('v<sub>ł</sub>² − v<sub>r</sub>²'))} ≈ <b>${fmt(t2)} s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny kąt lub poprawna składowa prostopadła prędkości.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'mech-bezwladnosc', area: 'mech', title: 'Układ nieinercjalny – wahadło w przyspieszającym autobusie', gen() {
  const a = R.n(0.5, 3, 0.5), m = R.n(0.05, 0.3, 0.05);
  const ang = rad2deg(Math.atan(a / C.g)), N = m * Math.hypot(C.g, a);
  return {
    ctx: `Do sufitu autobusu przywiązano na nitce kulkę o masie ${pl(m)} kg. Autobus rusza z przyspieszeniem ${pl(a)} m/s² po poziomej drodze. Po chwili kulka wisi nieruchomo względem autobusu, a nitka jest odchylona od pionu.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz kąt odchylenia nitki od pionu. Zapisz obliczenia.', ans: ang, unit: '°',
        hint: 'W układzie autobusu na kulkę działa siła bezwładności ma (do tyłu). Ciężar mg, siła bezwładności ma i naciąg nici się równoważą: tg α = a/g.',
        steps: [`W układzie autobusu: ${eq('N sin α = ma,   N cos α = mg → tg α = a/g')}`, `${eq(`α = arctg ${fr(pl(a), '9,81')} ≈ <b>${fmt(ang)}°</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny układ sił (z siłą bezwładności albo z II zasadą dynamiki w układzie ziemi).', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wartość siły naciągu nitki.', ans: N, unit: 'N', hint: 'N = m√(g² + a²).', steps: [`${eq(`N = m${sq('g² + a²')} ≈ <b>${fmt(N)} N</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'W którą stronę odchyla się kulka, gdy autobus przyspiesza?', options: ['do tyłu (przeciwnie do przyspieszenia)', 'do przodu', 'nie odchyla się', 'w bok'], correct: 0, steps: ['W układzie autobusu siła bezwładności −ma działa przeciwnie do przyspieszenia. W układzie ziemi: kulka „nie nadąża” – nić musi ją ciągnąć do przodu, więc jest odchylona do tyłu.'] }
    ]
  };
}});

G({ id: 'thermo-naczynia', area: 'thermo', title: 'Naczynia połączone z dwiema cieczami', gen() {
  const liq = R.pick([{ n: 'oliwę', r: 920 }, { n: 'naftę', r: 800 }, { n: 'olej', r: 900 }, { n: 'olej parafinowy', r: 850 }]);
  const ho = R.n(5, 20, 1), hw = ho * liq.r / 1000, dh = ho - hw;
  return {
    ctx: `Do U-rurki z wodą (gęstość 1000 kg/m³) wlano do jednego ramienia ${liq.n} o gęstości ${liq.r} kg/m³. Słup tej cieczy ma wysokość ${ho} cm (liczoną od granicy z wodą). Ciecze się nie mieszają.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz, o ile (w cm) poziom tej cieczy w jednym ramieniu jest wyższy od poziomu wody w drugim ramieniu. Zapisz obliczenia.', ans: dh, unit: 'cm',
        hint: 'Na poziomie granicy cieczy ciśnienie w obu ramionach jest takie samo: ρ_c·g·h_c = ρ_w·g·h_w.',
        steps: [`Na wysokości granicy cieczy: ${eq(`ρ<sub>c</sub>gh<sub>c</sub> = ρ<sub>w</sub>gh<sub>w</sub> → h<sub>w</sub> = h<sub>c</sub>${fr('ρ<sub>c</sub>', 'ρ<sub>w</sub>')} = ${fmt(hw)} cm`)}`, `${eq(`Δh = h<sub>c</sub> − h<sub>w</sub> ≈ <b>${fmt(dh)} cm</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna równość ciśnień na poziomie granicy cieczy.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Poziom której cieczy (mierzony od granicy cieczy) jest wyżej?', options: ['cieczy o mniejszej gęstości', 'wody', 'oba poziomy są równe', 'zależy od średnicy rurki'], correct: 0, steps: ['Mniejsza gęstość → potrzebny wyższy słup do wytworzenia tego samego ciśnienia.'] }
    ]
  };
}});

G({ id: 'thermo-ciepla-molowe', area: 'thermo', title: 'Ciepła molowe C_v i C_p gazu', gen() {
  const gas = R.pick([{ n: 'jednoatomowego (np. hel)', cv: 1.5 }, { n: 'dwuatomowego (np. azot)', cv: 2.5 }]);
  const n = R.n(0.5, 3, 0.5), dT = R.n(10, 100, 10);
  const Cv = gas.cv * C.R, Cp = Cv + C.R, Qv = n * Cv * dT, Qp = n * Cp * dT;
  return {
    ctx: `Mamy ${pl(n)} mol gazu doskonałego ${gas.n}. Ciepło molowe przy stałej objętości wynosi C<sub>v</sub> = ${gas.cv === 1.5 ? '3/2' : '5/2'}·R, R = 8,314 J/(mol·K).`,
    parts: [
      { kind: 'num', pts: 1, q: `Oblicz ciepło potrzebne do ogrzania gazu o ${dT} K przy stałej objętości.`, ans: Qv, unit: 'J', hint: 'Q = nC_vΔT.', steps: [`${eq(`Q<sub>v</sub> = nC<sub>v</sub>ΔT ≈ <b>${fmt(Qv)} J</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Oblicz ciepło potrzebne do ogrzania gazu o ${dT} K przy stałym ciśnieniu. Zapisz obliczenia.`, ans: Qp, unit: 'J',
        hint: 'Dla gazu doskonałego C_p = C_v + R (związek Mayera): przy stałym ciśnieniu część ciepła idzie na pracę rozprężania nRΔT.',
        steps: [`${eq(`C<sub>p</sub> = C<sub>v</sub> + R = ${fmt(Cp)} J/(mol·K)`)}`, `${eq(`Q<sub>p</sub> = nC<sub>p</sub>ΔT ≈ <b>${fmt(Qp)} J</b>`)}Różnica Q<sub>p</sub> − Q<sub>v</sub> = nRΔT ≈ ${fmt(n * C.R * dT)} J to praca wykonana przez gaz.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zastosowanie C_p = C_v + R lub Q = ΔU + W.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz stosunek C<sub>p</sub>/C<sub>v</sub> (wykładnik adiabaty κ).', ans: Cp / Cv, unit: '', hint: 'κ = (C_v + R)/C_v.', steps: [`${eq(`κ = ${fr('C<sub>p</sub>', 'C<sub>v</sub>')} ≈ <b>${fmt(Cp / Cv)}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'elec-kirchhoff', area: 'elec', title: 'II prawo Kirchhoffa – dwa źródła w obwodzie', gen() {
  const E1 = R.pick([6, 9, 12, 24]), r1 = R.n(0.5, 2, 0.5), r2 = R.n(0.5, 2, 0.5), Rz = R.n(2, 20, 1), same = Math.random() < 0.5;
  // przy połączeniu przeciwnym SEM nie mogą być równe (prąd byłby zerowy)
  const E2 = R.pick(E1 === 6 ? [1.5, 3, 4.5] : [1.5, 3, 4.5, 6]);
  const I = (same ? E1 + E2 : E1 - E2) / (Rz + r1 + r2), U = I * Rz;
  return {
    ctx: `W jednym oczku obwodu połączono szeregowo: źródło 1 (ℰ₁ = ${pl(E1)} V, r₁ = ${pl(r1)} Ω), źródło 2 (ℰ₂ = ${pl(E2)} V, r₂ = ${pl(r2)} Ω) oraz opornik R = ${Rz} Ω. Źródła są połączone ${same ? 'zgodnie (biegun + jednego z biegunem − drugiego)' : 'przeciwnie (biegunami + do siebie)'}.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz natężenie prądu w obwodzie. Zapisz obliczenia.', ans: I, unit: 'A',
        hint: 'II prawo Kirchhoffa: suma SEM (ze znakami zależnymi od kierunku) = suma spadków napięć I·(R + r₁ + r₂).',
        steps: [`${eq(`${same ? 'ℰ₁ + ℰ₂' : 'ℰ₁ − ℰ₂'} = I(R + r₁ + r₂)`)}`, `${eq(`I = ${fr(same ? `${pl(E1)} + ${pl(E2)}` : `${pl(E1)} − ${pl(E2)}`, `${Rz} + ${pl(r1)} + ${pl(r2)}`)} ≈ <b>${fmt(I)} A</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne równanie II prawa Kirchhoffa z właściwymi znakami SEM.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz napięcie na oporniku R.', ans: U, unit: 'V', hint: 'U = IR.', steps: [`${eq(`U = IR ≈ <b>${fmt(U)} V</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: same ? 'Co się stanie z prądem, gdy źródło 2 odwrócimy?' : 'W tym połączeniu źródło 2:', options: same ? ['zmaleje', 'wzrośnie', 'nie zmieni się', 'zmieni kierunek, ale nie wartość'] : ['jest ładowane (pobiera energię)', 'oddaje energię do obwodu', 'nie bierze udziału w przepływie prądu', 'jest zwarte'], correct: 0,
        steps: [same ? 'Po odwróceniu SEM się odejmują: I = (ℰ₁ − ℰ₂)/(R + r₁ + r₂) – mniejszy prąd.' : 'Prąd płynie przez źródło 2 od + do − (wymusza go silniejsze źródło 1), więc źródło 2 pobiera energię – tak ładuje się akumulator.'] }
    ]
  };
}});

G({ id: 'wave-natezenie', area: 'wave', title: 'Natężenie fali z punktowego źródła', gen() {
  const P = R.pick([0.5, 1, 2, 5]), r1 = R.pick([2, 3, 5, 10]), k = R.pick([2, 3, 4, 10]);
  const I1 = P / (4 * Math.PI * r1 * r1);
  return {
    ctx: `Głośnik traktowany jak punktowe źródło emituje dźwięk o mocy akustycznej ${pl(P)} W równomiernie we wszystkich kierunkach. Pomiń pochłanianie i odbicia dźwięku.`,
    parts: [
      { kind: 'num', pts: 1, q: `Oblicz natężenie dźwięku w odległości ${r1} m od głośnika (w W/m²).`, ans: I1, unit: 'W/m²', hint: 'Moc rozkłada się na powierzchnię sfery 4πr².', steps: [`${eq(`I = ${fr('P', '4πr²')} = ${fr(pl(P), `4π·${r1}²`)} ≈ <b>${fmt(I1)} W/m²</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: `Ile razy zmaleje natężenie, gdy odejdziemy na odległość ${k * r1} m?`, ans: k * k, unit: '', hint: 'I ∝ 1/r².', steps: [`${eq(`${fr('I₁', 'I₂')} = (${fr(k * r1, r1)})² = <b>${k * k}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: `Ile razy zmaleje przy tym amplituda fali?`, ans: k, unit: '', hint: 'I ∝ A², więc A ∝ √I ∝ 1/r.', steps: [`${eq(`${fr('A₁', 'A₂')} = ${sq(fr('I₁', 'I₂'))} = <b>${k}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'wave-tlumione', area: 'wave', title: 'Drgania tłumione i rezonans', gen() {
  const pct = R.pick([5, 10, 20]), n = R.pick([3, 5, 10]);
  const Afrac = Math.pow(1 - pct / 100, n), Efrac = Afrac * Afrac;
  const l = R.n(0.25, 1, 0.05), fr0 = 1 / (2 * Math.PI) * Math.sqrt(C.g / l);
  return {
    ctx: `Amplituda drgań wahadła maleje w każdym okresie o ${pct}% (względem wartości z poprzedniego okresu). Energia drgań jest proporcjonalna do kwadratu amplitudy.`,
    parts: [
      { kind: 'num', pts: 2, q: `Oblicz, jaki procent początkowej energii drgań pozostanie po ${n} okresach. Zapisz obliczenia.`, ans: Efrac * 100, unit: '%',
        hint: 'Po n okresach amplituda = A₀·(1 − p)ⁿ. Energia ∝ A².',
        steps: [`${eq(`${fr('A', 'A₀')} = ${pl(1 - pct / 100)}<sup>${n}</sup> ≈ ${fmt(Afrac)}`)}`, `${eq(`${fr('E', 'E₀')} = (${fr('A', 'A₀')})² ≈ <b>${fmt(Efrac * 100)}%</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny stosunek amplitud.', '0 pkt – np. pominięcie kwadratu.'] },
      { kind: 'num', pts: 1, q: `Wahadło ma długość ${pl(l)} m. Z jaką częstotliwością należy je popychać, aby wystąpił rezonans?`, ans: fr0, unit: 'Hz', hint: 'Rezonans: częstotliwość wymuszania = częstotliwość drgań własnych f = (1/2π)√(g/l).', steps: [`${eq(`f = ${fr('1', '2π')}${sq(fr('g', 'l'))} ≈ <b>${fmt(fr0)} Hz</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Dokąd „znika” energia drgań tłumionych?', options: ['zamienia się na energię wewnętrzną (ciepło) otoczenia i wahadła', 'przechodzi w energię potencjalną wahadła', 'znika – energia nie jest zachowana', 'zamienia się na masę'], correct: 0, steps: ['Siły oporu wykonują ujemną pracę – energia mechaniczna przechodzi w energię wewnętrzną.'] }
    ]
  };
}});

G({ id: 'atom-energia-spoczynkowa', area: 'atom', title: 'Równoważność masy i energii', gen() {
  const mg = R.pick([1, 5, 10]), L = 3.83e26, cq = 3e7;
  const E = mg / 1000 * C.c ** 2, kg = E / cq, dm = L / C.c ** 2;
  return {
    ctx: `Energia spoczynkowa ciała o masie m wynosi E₀ = mc², c = 3·10⁸ m/s. Ciepło spalania węgla kamiennego wynosi około 30 MJ/kg. Moc promieniowania Słońca wynosi 3,83·10²⁶ W.`,
    parts: [
      { kind: 'num', pts: 1, q: `Oblicz energię spoczynkową ${mg} g materii.`, ans: E, unit: 'J', hint: 'E = mc², masa w kg.', steps: [`${eq(`E₀ = ${pl(mg / 1000)}·(3·10⁸)² ≈ <b>${fmt(E)} J</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Ile ton węgla trzeba spalić, aby uzyskać tyle energii?', ans: kg / 1000, unit: 't', hint: 'm = E / (ciepło spalania).', steps: [`${eq(`m = ${fr(fmt(E), '3·10⁷ J/kg')} ≈ ${fmt(kg)} kg ≈ <b>${fmt(kg / 1000)} t</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz, o ile kilogramów maleje masa Słońca w każdej sekundzie z powodu wysyłanego promieniowania. Zapisz obliczenia.', ans: dm, unit: 'kg',
        hint: 'Energia wypromieniowana w 1 s = moc·1 s, a ubytek masy Δm = E/c².', steps: [`${eq(`Δm = ${fr('P·t', 'c²')} = ${fr('3,83·10²⁶ J', '9·10¹⁶ m²/s²')} ≈ <b>${fmt(dm)} kg</b>`)}To ok. 4 mln ton na sekundę – a mimo to Słońce świeci miliardy lat.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny zapis Δm = E/c².', '0 pkt – brak postępu.'] }
    ]
  };
}});

/* zapis z dokładną liczbą cyfr znaczących (bez obcinania zer) */
function sf(x, n) {
  const s = x.toPrecision(n);
  if (s.includes('e')) { const [m, e] = s.split('e'); return m.replace('.', ',') + '·10' + String(+e).split('').map(ch => SUP[ch]).join(''); }
  return s.replace('.', ',');
}

G({ id: 'mech-cyfry-znaczace', area: 'mech', title: 'Zaokrąglanie i cyfry znaczące', gen() {
  const base = R.n(1.0, 9.99, 0.0001), ex = R.pick([-5, -3, -2, 0, 2, 3, 6]), x = base * Math.pow(10, ex), sig = R.pick([2, 3]);
  const good = sf(x, sig);
  const trunc = Math.trunc(base * Math.pow(10, sig - 1)) / Math.pow(10, sig - 1) * Math.pow(10, ex);
  const wr = [sf(x, sig + 1), sf(x, sig + 2), sf(x, sig === 2 ? 1 : 2), sf(trunc, sig)].filter(s2 => s2 !== good);
  const opts = R.shuffle([good, ...[...new Set(wr)].slice(0, 3)]);
  const g1 = 9.81, h1 = R.n(1.1, 3.9, 0.1), t1 = Math.sqrt(2 * h1 / g1);
  const opts2 = [`t ≈ ${sf(t1, 2)} s`, `t = ${String(t1).replace('.', ',').slice(0, 11)} s`, `t ≈ ${sf(t1, 1)} s`, `t ≈ ${sf(t1, 6)} s`];
  return {
    ctx: 'Zadania z wymagań przekrojowych: wynik zapisuje się z rozsądną liczbą cyfr znaczących – zwykle taką jak w danych o najmniejszej dokładności.',
    parts: [
      { kind: 'mc', pts: 1, q: `Wynik obliczeń wynosi ${sf(x, 8)}. Jaki jest ten wynik po zaokrągleniu do ${sig} cyfr znaczących?`, options: opts, correct: opts.indexOf(good), steps: [`Cyfry znaczące liczymy od pierwszej niezerowej cyfry (zera na początku, np. w 0,00…, nie są znaczące). Wynik: ${good}.`] },
      { kind: 'mc', pts: 1, q: `Uczeń zmierzył wysokość h = ${pl(h1)} m i obliczył czas spadku t = √(2h/g). Kalkulator pokazał ${String(t1).replace('.', ',')}. Który zapis wyniku jest najlepszy?`, options: opts2, correct: 0, steps: ['Wysokość podano z 2 cyframi znaczącymi, więc wynik zapisujemy z 2 (ewentualnie 3) cyframi. Przepisanie wszystkich cyfr z kalkulatora sugeruje dokładność, której pomiar nie daje.'] }
    ]
  };
}});

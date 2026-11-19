/* ZADANIA Z ODCZYTEM DANYCH Z WYKRESÓW */
'use strict';

function niceStep(raw) {
  const p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
}
const roundTo = (x, st) => Math.round(x / st) * st;

G({ id: 'thermo-wykres-pv', area: 'thermo', title: 'Wykres p(V) – cykl trójkątny', gen() {
  const V1 = R.i(1, 2), V2 = V1 + R.i(2, 5), p1 = R.i(1, 2), p2 = p1 + R.i(2, 4);
  const W = 0.5 * (V2 - V1) * (p2 - p1) * 100;
  return {
    ctx: 'Gaz doskonały wykonuje cykl A → B → C → A przedstawiony na wykresie (objętość w dm³, ciśnienie w 10⁵ Pa).',
    svg: plot({ xl: 'V, dm³', yl: 'p, 10⁵ Pa', xmax: V2 + 1, ymax: p2 + 1, xstep: 1, ystep: 1, series: [{ pts: [[V1, p1], [V1, p2], [V2, p1], [V1, p1]], dots: true }] })
      + `<div class="small muted">A(${V1}; ${p1}), B(${V1}; ${p2}), C(${V2}; ${p1}) – odczytaj z wykresu</div>`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz pracę wykonaną przez gaz w jednym cyklu. Zapisz obliczenia.', ans: W, unit: 'J',
        hint: 'Praca w cyklu = pole figury ograniczonej wykresem. 1 dm³·10⁵ Pa = 10⁻³ m³·10⁵ Pa = 100 J.',
        steps: [`Pole trójkąta: ${eq(`W = ${fr('1', '2')}(V<sub>C</sub> − V<sub>A</sub>)(p<sub>B</sub> − p<sub>A</sub>) = ${fr('1', '2')}·${V2 - V1} dm³·${p2 - p1}·10⁵ Pa`)}`, `${eq(`W = <b>${fmt(W)} J</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zauważenie, że praca to pole trójkąta, lub błąd przeliczenia jednostek.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz stosunek temperatury gazu w stanie B do temperatury w stanie A (T<sub>B</sub>/T<sub>A</sub>).', ans: p2 / p1, unit: '', hint: 'A → B to izochora: p/T = const.',
        steps: [`${eq(`${fr('T<sub>B</sub>', 'T<sub>A</sub>')} = ${fr('p<sub>B</sub>', 'p<sub>A</sub>')} = ${fr(p2, p1)} ≈ <b>${fmt(p2 / p1)}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'fill', pts: 2, q: 'Uzupełnij zdania – wybierz właściwe określenia.', text: 'W przemianie C → A temperatura gazu {0}, a gaz {1} ciepło. W przemianie A → B gaz {2} pracy.',
        gaps: [['rośnie', 'maleje', 'nie zmienia się'], ['pobiera', 'oddaje'], ['wykonuje', 'nie wykonuje']], correct: [1, 1, 1],
        steps: ['C → A: izobaryczne sprężanie, V maleje → T maleje (pV = nRT), ΔU < 0 i praca nad gazem → gaz oddaje ciepło. A → B: izochora, ΔV = 0 → brak pracy.'] }
    ]
  };
}});

G({ id: 'thermo-wykres-Tt', area: 'thermo', title: 'Wykres T(t) – ogrzewanie i topnienie lodu', gen() {
  // czas ogrzewania lodu = 2 kratki; moc dobrana tak, by wykres dawał realistyczne c i L
  let m, T0, st, P;
  do { m = R.pick([0.2, 0.25, 0.4, 0.5]); T0 = R.pick([20, 30]); st = R.pick([20, 25, 40, 50, 100]); P = +(m * C.cl * T0 / (2 * st)).toPrecision(3); } while (P < 80 || P > 800);
  const t1 = 2 * st, t2 = t1 + roundTo(m * C.Lt / P, st), t3 = t2 + roundTo(m * C.cw * 20 / P, st);
  const cl = P * t1 / (m * T0), L = P * (t2 - t1) / m;
  return {
    ctx: `Lód o masie ${pl(m)} kg ogrzewano grzałką o stałej mocy ${P} W. Na wykresie przedstawiono zależność temperatury od czasu. Załóż, że całe ciepło z grzałki pobiera lód (a potem woda).`,
    svg: plot({ xl: 't, s', yl: 't, °C', xmax: t3 + st, ymin: -T0, ymax: 25, xstep: st * Math.max(1, Math.ceil((t3 + st) / st / 12)), ystep: 5, series: [{ pts: [[0, -T0], [t1, 0], [t2, 0], [t3, 20]], dots: true }] }),
    parts: [
      { kind: 'num', pts: 2, q: 'Na podstawie wykresu oblicz ciepło właściwe lodu. Zapisz obliczenia.', ans: cl, unit: 'J/(kg·K)', tol: 0.04,
        hint: 'Pierwszy odcinek: lód ogrzewa się od −' + T0 + ' °C do 0 °C. Odczytaj czas tego etapu. Ciepło = P·t = m·c·ΔT.',
        steps: [`Z wykresu: ogrzewanie lodu trwa t₁ = ${fmt(t1)} s. ${eq(`Pt₁ = mc<sub>l</sub>ΔT → c<sub>l</sub> = ${fr('Pt₁', 'mΔT')} = ${fr(`${P}·${fmt(t1)}`, `${pl(m)}·${T0}`)} ≈ <b>${fmt(cl)} J/(kg·K)</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny odczyt czasu i bilans P·t = mcΔT.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Na podstawie wykresu oblicz ciepło topnienia lodu (w kJ/kg). Zapisz obliczenia.', ans: L / 1000, unit: 'kJ/kg', tol: 0.04,
        hint: 'Topnienie to poziomy odcinek (temperatura stała). Odczytaj, jak długo trwał.',
        steps: [`Z wykresu: topnienie od ${fmt(t1)} s do ${fmt(t2)} s, czyli ${fmt(t2 - t1)} s. ${eq(`L = ${fr('P·Δt', 'm')} ≈ <b>${fmt(L / 1000)} kJ/kg</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny odczyt czasu topnienia i zapis Q = mL.', '0 pkt – brak postępu.'] },
      { kind: 'fill', pts: 2, q: 'Uzupełnij zdania.', text: 'Podczas topnienia lodu temperatura {0}, a energia wewnętrzna układu {1}. Odcinek wykresu dla wody jest mniej stromy niż dla lodu, bo ciepło właściwe wody jest {2} od ciepła właściwego lodu.',
        gaps: [['rośnie', 'nie zmienia się', 'maleje'], ['rośnie', 'nie zmienia się', 'maleje'], ['większe', 'mniejsze']], correct: [1, 0, 0],
        steps: ['Ciepło topnienia idzie na zerwanie wiązań sieci krystalicznej – rośnie energia wewnętrzna (potencjalna cząsteczek), nie temperatura. Większe c → wolniejszy wzrost temperatury przy tej samej mocy.'] }
    ]
  };
}});

G({ id: 'elec-wykres-UI', area: 'elec', title: 'Wykres U(I) dla baterii', gen() {
  const E = R.pick([4.5, 6, 9, 12]), r = R.pick([0.5, 1, 1.5, 2, 3]);
  const Iz = E / r, Imax = Iz * 0.75, xs = niceStep(Imax / 5), ys = niceStep(E / 5);
  const I1 = xs * 2, U1 = E - I1 * r;
  return {
    ctx: 'Na wykresie przedstawiono zależność napięcia na zaciskach baterii od natężenia pobieranego prądu (zmieniano opór odbiornika).',
    svg: plot({ xl: 'I, A', yl: 'U, V', xmax: roundTo(Imax, xs) + xs, ymax: roundTo(E, ys) + ys, xstep: xs, ystep: ys, series: [{ pts: [[0, E], [Imax, E - Imax * r]] }, { pts: [[0, E], [I1, U1]], dots: true, only: true }] }),
    parts: [
      { kind: 'num', pts: 1, q: 'Odczytaj z wykresu siłę elektromotoryczną baterii.', ans: E, unit: 'V', hint: 'SEM to napięcie na zaciskach, gdy prąd nie płynie (I = 0) – punkt przecięcia z osią U.', steps: [`Dla I = 0: U = ℰ = <b>${pl(E)} V</b>.`], rubric: ['1 pkt – poprawny odczyt.'] },
      { kind: 'num', pts: 2, q: 'Oblicz opór wewnętrzny baterii. Zapisz obliczenia.', ans: r, unit: 'Ω',
        hint: 'U = ℰ − Ir. Weź drugi, wyraźny punkt z wykresu (np. zaznaczony) i wyznacz r = (ℰ − U)/I.',
        steps: [`Punkt z wykresu: I = ${fmt(I1)} A, U = ${fmt(U1)} V. ${eq(`r = ${fr('ℰ − U', 'I')} = ${fr(`${pl(E)} − ${fmt(U1)}`, fmt(I1))} = <b>${fmt(r)} Ω</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne równanie U = ℰ − Ir z odczytanym punktem.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz natężenie prądu zwarcia (U = 0).', ans: Iz, unit: 'A', hint: 'Przedłuż prostą do osi I albo policz ℰ/r.', steps: [`${eq(`I<sub>z</sub> = ${fr('ℰ', 'r')} = <b>${fmt(Iz)} A</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'elec-wykres-IU', area: 'elec', title: 'Charakterystyki I(U) dwóch oporników', gen() {
  const [R1, R2] = R.sample([5, 10, 20, 25, 40, 50], 2), Umax = 10;
  const ys = niceStep(Umax / Math.min(R1, R2) * 1000 / 5);
  const U0 = R.pick([4, 6, 8]), Ipar = U0 / R1 + U0 / R2;
  return {
    ctx: 'Na wykresie przedstawiono zależność natężenia prądu od napięcia dla dwóch oporników, 1 i 2.',
    svg: plot({ xl: 'U, V', yl: 'I, mA', xmax: Umax, ymax: roundTo(Umax / Math.min(R1, R2) * 1000, ys) + ys, xstep: 2, ystep: ys, series: [{ pts: [[0, 0], [Umax, Umax / R1 * 1000]], label: '1', dots: false }, { pts: [[0, 0], [Umax, Umax / R2 * 1000]], label: '2', alt: true }] }),
    parts: [
      { kind: 'num', pts: 1, q: 'Odczytaj z wykresu i oblicz opór opornika 1.', ans: R1, unit: 'Ω', hint: 'Weź punkt na prostej, np. dla U = 10 V, i policz R = U/I (zamień mA na A).', steps: [`Dla U = 10 V: I = ${fmt(10 / R1 * 1000)} mA. ${eq(`R₁ = ${fr('U', 'I')} = <b>${R1} Ω</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Odczytaj z wykresu i oblicz opór opornika 2.', ans: R2, unit: 'Ω', hint: 'Jak wyżej, dla drugiej prostej.', steps: [`Dla U = 10 V: I = ${fmt(10 / R2 * 1000)} mA. ${eq(`R₂ = <b>${R2} Ω</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Oporniki połączono równolegle i podłączono do napięcia ${U0} V. Oblicz natężenie prądu pobieranego z źródła (w mA). Zapisz obliczenia.`, ans: Ipar * 1000, unit: 'mA',
        hint: 'Przy połączeniu równoległym napięcie jest wspólne, a prądy się sumują – możesz je nawet odczytać z wykresu dla U = ' + U0 + ' V.',
        steps: [`${eq(`I = ${fr('U', 'R₁')} + ${fr('U', 'R₂')} = ${fmt(U0 / R1 * 1000)} mA + ${fmt(U0 / R2 * 1000)} mA = <b>${fmt(Ipar * 1000)} mA</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zauważenie, że prądy się sumują przy wspólnym napięciu.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Która prosta na wykresie I(U) odpowiada opornikowi o mniejszym oporze?', options: ['ta, która jest bardziej stroma', 'ta, która jest mniej stroma', 'nie da się tego ocenić z wykresu I(U)'], correct: 0, steps: ['Nachylenie wykresu I(U) to 1/R – im bardziej stroma prosta, tym mniejszy opór.'] }
    ]
  };
}});

G({ id: 'atom-wykres-rozpad', area: 'atom', title: 'Krzywa rozpadu promieniotwórczego', gen() {
  const T = R.pick([2, 3, 4, 5, 6, 8]), N0 = R.pick([800, 1600]), unit = R.pick(['h', 'min', 'dni']);
  const pts = []; for (let t = 0; t <= 4 * T + 1e-9; t += T / 8) pts.push([t, N0 * Math.pow(0.5, t / T)]);
  const k = R.pick([5, 6]);
  return {
    ctx: `Na wykresie przedstawiono liczbę jąder izotopu promieniotwórczego w próbce w zależności od czasu (N podano w jednostkach umownych – np. w milionach jąder).`,
    svg: plot({ xl: `t, ${unit}`, yl: 'N', xmax: 4 * T, ymax: N0, xstep: T / 2, ystep: N0 / 8, series: [{ pts }] }),
    parts: [
      { kind: 'num', pts: 1, q: `Odczytaj z wykresu okres połowicznego rozpadu (w ${unit}).`, ans: T, unit, hint: `Znajdź czas, po którym N spada z ${N0} do ${N0 / 2}.`, steps: [`N = ${N0 / 2} (połowa) dla t = <b>${T} ${unit}</b>. Sprawdzenie: po ${2 * T} ${unit} zostaje ${N0 / 4}.`], rubric: ['1 pkt – poprawny odczyt.'] },
      { kind: 'num', pts: 1, q: `Ile jąder (w tych samych jednostkach) pozostanie po ${k * T} ${unit}?`, ans: N0 / Math.pow(2, k), unit: '', hint: `${k * T} ${unit} to ${k} okresów połowicznego rozpadu.`, steps: [`${eq(`N = N₀·(${fr('1', '2')})<sup>${k}</sup> = ${fr(N0, Math.pow(2, k))} = <b>${fmt(N0 / Math.pow(2, k))}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'W każdym kolejnym okresie T₁/₂ rozpada się tyle samo jąder.', v: false },
        { s: 'Aktywność próbki maleje w tym samym tempie co liczba jąder.', v: true },
        { s: `Po ${2 * T} ${unit} rozpadło się 75% jąder.`, v: true },
        { s: 'Po upływie dwóch okresów połowicznego rozpadu wszystkie jądra się rozpadną.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'wave-wykres-xt', area: 'wave', title: 'Wykres x(t) ruchu harmonicznego', gen() {
  const A = R.pick([2, 3, 4, 5, 6, 8]), T = R.pick([0.4, 0.8, 1.2, 2, 4]);
  const pts = []; for (let i = 0; i <= 96; i++) { const t = 2 * T * i / 96; pts.push([t, A * Math.sin(2 * Math.PI * t / T)]); }
  const vmax = A / 100 * 2 * Math.PI / T;
  return {
    ctx: 'Na wykresie przedstawiono zależność wychylenia ciała drgającego harmonicznie od czasu.',
    svg: plot({ xl: 't, s', yl: 'x, cm', xmax: 2 * T, xmin: 0, ymin: -A - (A % 2 ? 1 : 2), ymax: A + (A % 2 ? 1 : 2), xstep: T / 4, ystep: A % 2 ? 1 : 2, fmtx: x => fmt(x, 3), series: [{ pts }] }),
    parts: [
      { kind: 'num', pts: 1, q: 'Odczytaj amplitudę drgań (w cm).', ans: A, unit: 'cm', hint: 'Amplituda = największe wychylenie od położenia równowagi.', steps: [`A = <b>${A} cm</b>`], rubric: ['1 pkt – poprawny odczyt.'] },
      { kind: 'num', pts: 1, q: 'Oblicz częstotliwość drgań.', ans: 1 / T, unit: 'Hz', hint: 'Odczytaj okres T (czas jednego pełnego drgania), f = 1/T.', steps: [`Z wykresu T = ${pl(T)} s. ${eq(`f = ${fr('1', 'T')} = <b>${fmt(1 / T)} Hz</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz maksymalną wartość prędkości ciała (w m/s). Zapisz obliczenia.', ans: vmax, unit: 'm/s', hint: 'v_max = Aω = A·2π/T. Amplitudę zamień na metry.',
        steps: [`${eq(`v<sub>max</sub> = A${fr('2π', 'T')} = ${pl(A / 100)}·${fr('2π', pl(T))} ≈ <b>${fmt(vmax)} m/s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór z poprawnie odczytanymi A i T.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'W których chwilach prędkość ciała jest największa?', options: ['gdy wykres przecina oś t (x = 0)', 'gdy x jest największe', 'gdy x jest najmniejsze (najbardziej ujemne)', 'prędkość jest stała'], correct: 0, steps: ['Prędkość to nachylenie wykresu x(t) – największe przy przejściu przez położenie równowagi.'] }
    ]
  };
}});

G({ id: 'mech-wykres-Fx', area: 'mech', title: 'Wykres F(x) – praca przy rozciąganiu sprężyny', gen() {
  const k = R.pick([20, 40, 50, 80, 100, 200]), xmax = 10, x1 = R.pick([4, 5, 6, 8]);
  const W = 0.5 * k * (x1 / 100) ** 2, Fm = k * xmax / 100, ys = niceStep(Fm / 5);
  return {
    ctx: 'Na wykresie przedstawiono zależność wartości siły potrzebnej do rozciągnięcia sprężyny od jej wydłużenia.',
    svg: plot({ xl: 'x, cm', yl: 'F, N', xmax, ymax: roundTo(Fm, ys) + ys, xstep: 1, ystep: ys, series: [{ pts: [[0, 0], [xmax, Fm]] }] }),
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz współczynnik sprężystości sprężyny.', ans: k, unit: 'N/m', hint: 'k = F/x – odczytaj punkt z prostej, x w metrach.', steps: [`Np. x = 10 cm = 0,1 m, F = ${fmt(Fm)} N. ${eq(`k = ${fr('F', 'x')} = <b>${k} N/m</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Oblicz pracę potrzebną do rozciągnięcia sprężyny od 0 do ${x1} cm. Zapisz obliczenia.`, ans: W, unit: 'J', hint: 'Siła rośnie, więc nie licz F·x! Praca = pole pod wykresem F(x) – tu trójkąt.',
        steps: [`${eq(`W = ${fr('1', '2')}·F(x₁)·x₁ = ${fr('1', '2')}·${fmt(k * x1 / 100)} N·${pl(x1 / 100)} m = <b>${fmt(W)} J</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zauważenie, że praca to pole pod wykresem (lub W = kx²/2).', '0 pkt – np. W = F·x.'] },
      { kind: 'mc', pts: 1, q: `Ile razy większa jest praca rozciągnięcia sprężyny od ${x1 / 2} cm do ${x1} cm niż od 0 do ${x1 / 2} cm?`, options: ['3 razy', '2 razy', '4 razy', 'tyle samo'], correct: 0, steps: ['W ∝ x²: od 0 do x₁ jest 4 jednostki, od 0 do x₁/2 – 1 jednostka, więc od x₁/2 do x₁ – 3 jednostki.'] }
    ]
  };
}});

G({ id: 'atom-wykres-Ekf', area: 'atom', title: 'Wykres E_k(f) w zjawisku fotoelektrycznym', gen() {
  const fg = R.pick([5, 5.5, 6, 7, 8]), hh = 0.4136; // eV na 10¹⁴ Hz
  const W = hh * fg;
  return {
    ctx: 'Na wykresie przedstawiono zależność maksymalnej energii kinetycznej fotoelektronów od częstotliwości światła padającego na pewien metal.',
    svg: plot({ xl: 'f, 10¹⁴ Hz', yl: 'E_k, eV', xmin: 0, xmax: 16, ymax: 3, xstep: 2, ystep: 0.5, fmty: y => fmt(y, 2), series: [{ pts: [[fg, 0], [Math.min(16, fg + 7), hh * (Math.min(16, fg + 7) - fg)]] }, { pts: [[fg, 0], [fg + 5, hh * 5]], dots: true, only: true }] }),
    parts: [
      { kind: 'num', pts: 1, q: 'Odczytaj częstotliwość graniczną (w 10¹⁴ Hz).', ans: fg, unit: '·10¹⁴ Hz', hint: 'To punkt przecięcia prostej z osią f (E_k = 0).', steps: [`f<sub>gr</sub> = <b>${pl(fg)}·10¹⁴ Hz</b>`], rubric: ['1 pkt – poprawny odczyt.'] },
      { kind: 'num', pts: 2, q: 'Wyznacz z wykresu stałą Plancka (w J·s). Zapisz obliczenia.', ans: hh * 1e-14 * C.eV, unit: 'J·s', tol: 0.04,
        hint: 'Nachylenie prostej to h. Weź zaznaczone punkty: ΔE_k/Δf i zamień eV na J.',
        steps: [`Punkty: (${pl(fg)}; 0) i (${pl(fg + 5)}; ${fmt(hh * 5, 3)}). ${eq(`h = ${fr('ΔE<sub>k</sub>', 'Δf')} = ${fr(`${fmt(hh * 5, 3)} eV`, '5·10¹⁴ Hz')} ≈ ${fmt(hh * 1e-14)} eV·s ≈ <b>${fmt(hh * 1e-14 * C.eV)} J·s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zauważenie, że h jest nachyleniem prostej.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz pracę wyjścia elektronu z tego metalu (w eV).', ans: W, unit: 'eV', hint: 'W = h·f_gr.', steps: [`${eq(`W = hf<sub>gr</sub> ≈ <b>${fmt(W)} eV</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Jak wyglądałby wykres dla metalu o większej pracy wyjścia?', options: ['prosta równoległa, przesunięta w prawo', 'prosta bardziej stroma, z tego samego punktu', 'prosta mniej stroma', 'ta sama prosta'], correct: 0, steps: ['Nachylenie (h) jest takie samo dla wszystkich metali; większa praca wyjścia → większa częstotliwość graniczna.'] }
    ]
  };
}});

G({ id: 'grav-wykres-hubble', area: 'grav', title: 'Wykres Hubble’a – prędkość galaktyk od odległości', gen() {
  const H = R.pick([65, 70, 75]), ds = [50, 100, 150, 200, 250, 300, 350];
  const pts = ds.map(d0 => [d0, H * d0 * (1 + (Math.random() - 0.5) * 0.12) / 1000]);
  const t = 3.086e19 / H / 3.156e7 / 1e9;
  return {
    ctx: 'Na wykresie zaznaczono prędkości oddalania się kilku galaktyk w zależności od ich odległości oraz prostą najlepiej dopasowaną do punktów pomiarowych (przechodzącą przez początek układu).',
    svg: plot({ xl: 'd, Mpc', yl: 'v, 10³ km/s', xmax: 400, ymax: 30, xstep: 50, ystep: 5, series: [{ pts, dots: true, only: true }, { pts: [[0, 0], [400, H * 0.4]], alt: true }] }),
    parts: [
      { kind: 'num', pts: 2, q: 'Wyznacz stałą Hubble’a z nachylenia prostej (w (km/s)/Mpc). Zapisz obliczenia.', ans: H, unit: '(km/s)/Mpc', tol: 0.05,
        hint: 'Odczytaj punkt na PROSTEJ (nie punkt pomiarowy!), np. dla d = 400 Mpc, i policz H₀ = v/d.',
        steps: [`Na prostej: d = 400 Mpc → v = ${fmt(H * 0.4)}·10³ km/s. ${eq(`H₀ = ${fr('v', 'd')} = ${fr(`${fmt(H * 400)} km/s`, '400 Mpc')} = <b>${H} (km/s)/Mpc</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna metoda (nachylenie prostej, a nie pojedynczy punkt pomiarowy).', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oszacuj wiek Wszechświata (w mld lat) jako 1/H₀. 1 Mpc = 3,086·10¹⁹ km, 1 rok ≈ 3,156·10⁷ s. Zapisz obliczenia.', ans: t, unit: 'mld lat', tol: 0.05,
        hint: 'H₀ w s⁻¹: podziel km/s przez liczbę km w Mpc.', steps: [`${eq(`t = ${fr('1', 'H₀')} = ${fr('3,086·10¹⁹ km', `${H} km/s`)} ≈ ${fmt(3.086e19 / H)} s ≈ <b>${fmt(t)} mld lat</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna zamiana jednostek H₀.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Dlaczego punkty pomiarowe nie leżą dokładnie na prostej?', options: ['galaktyki mają też własne ruchy, a pomiary odległości obarczone są niepewnością', 'prawo Hubble’a nie obowiązuje', 'prędkość światła jest różna dla różnych galaktyk', 'Wszechświat się nie rozszerza'], correct: 0, steps: ['Prawo Hubble’a opisuje średnią zależność; rozrzut wynika z ruchów własnych galaktyk i niepewności pomiarów.'] }
    ]
  };
}});

G({ id: 'mech-wykres-xt', area: 'mech', title: 'Wykres x(t) – ruch tam i z powrotem', gen() {
  const t1 = R.i(2, 4), x1 = R.pick([8, 10, 12, 16, 20]), t2 = t1 + R.i(1, 3), t3 = t2 + R.i(2, 4), x3 = R.pick([0, 2, 4]);
  const v3 = (x3 - x1) / (t3 - t2), s = x1 + (x1 - x3), vsr = s / t3;
  return {
    ctx: 'Na wykresie przedstawiono zależność położenia (współrzędnej x) pieszego od czasu. Pieszy porusza się wzdłuż prostej ścieżki.',
    svg: plot({ xl: 't, s', yl: 'x, m', xmax: t3 + 1, ymax: x1 + 4, xstep: 1, ystep: x1 > 12 ? 4 : 2, series: [{ pts: [[0, 0], [t1, x1], [t2, x1], [t3, x3]], dots: true }] }),
    parts: [
      { kind: 'num', pts: 1, q: `Oblicz prędkość pieszego (ze znakiem) w przedziale od ${t2} s do ${t3} s.`, ans: v3, unit: 'm/s', neg: true, hint: 'v = Δx/Δt – nachylenie wykresu. Ujemne = ruch w stronę malejących x.',
        steps: [`${eq(`v = ${fr('Δx', 'Δt')} = ${fr(`${x3} − ${x1}`, `${t3} − ${t2}`)} = <b>${fmt(v3)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik ze znakiem.'] },
      { kind: 'num', pts: 2, q: 'Oblicz średnią prędkość (szybkość) pieszego w całym ruchu, czyli drogę podzieloną przez czas. Zapisz obliczenia.', ans: vsr, unit: 'm/s',
        hint: 'Droga ≠ przemieszczenie! Dodaj długości wszystkich odcinków ruchu (tam i z powrotem).',
        steps: [`Droga: ${x1} m (tam) + ${x1 - x3} m (z powrotem) = ${s} m. ${eq(`v<sub>śr</sub> = ${fr(s, t3)} ≈ <b>${fmt(vsr)} m/s</b>`)}Wartość średniej prędkości wektorowej (przemieszczenie/czas) = ${fmt(x3 / t3)} m/s – to co innego!`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna droga całkowita.', '0 pkt – np. użycie przemieszczenia zamiast drogi.'] },
      { kind: 'mc', pts: 1, q: `Co robił pieszy między ${t1} s a ${t2} s?`, options: ['stał w miejscu', 'szedł ze stałą prędkością', 'przyspieszał', 'zawracał'], correct: 0, steps: ['Poziomy odcinek x(t) – położenie się nie zmienia, v = 0.'] }
    ]
  };
}});

G({ id: 'wave-wykres-yx', area: 'wave', title: 'Kształt fali w danej chwili y(x)', gen() {
  const lam = R.pick([0.4, 0.8, 1.2, 1.6, 2]), A = R.pick([1, 2, 3, 4]), vv = R.pick([2, 4, 5, 8, 10]);
  const pts = []; for (let i = 0; i <= 96; i++) { const x = 2 * lam * i / 96; pts.push([x, A * Math.sin(2 * Math.PI * x / lam)]); }
  const f = vv / lam;
  return {
    ctx: `Na wykresie przedstawiono kształt liny, wzdłuż której biegnie fala poprzeczna, w pewnej chwili. Prędkość fali wynosi ${vv} m/s.`,
    svg: plot({ xl: 'x, m', yl: 'y, cm', xmax: 2 * lam, ymin: -A - 1, ymax: A + 1, xstep: lam / 4, ystep: 1, series: [{ pts }] }),
    parts: [
      { kind: 'num', pts: 1, q: 'Odczytaj długość fali.', ans: lam, unit: 'm', hint: 'Długość fali = odległość między sąsiednimi grzbietami (albo dwoma punktami w tej samej fazie).', steps: [`λ = <b>${pl(lam)} m</b>`], rubric: ['1 pkt – poprawny odczyt.'] },
      { kind: 'num', pts: 1, q: 'Oblicz częstotliwość drgań punktów liny.', ans: f, unit: 'Hz', hint: 'v = λf.', steps: [`${eq(`f = ${fr('v', 'λ')} = <b>${fmt(f)} Hz</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Ten wykres (y od x) w porównaniu z wykresem y(t) dla jednego punktu liny:', options: ['pokazuje kształt całej liny w jednej chwili, a y(t) – ruch jednego punktu w czasie', 'jest tym samym wykresem', 'pokazuje prędkość fali', 'pokazuje zależność energii od czasu'], correct: 0, steps: ['Z y(x) odczytujemy λ, z y(t) – okres T. Oba mają tę samą amplitudę.'] }
    ]
  };
}});

G({ id: 'thermo-wykres-izoterma', area: 'thermo', title: 'Wykres izotermy p(V)', gen() {
  const n = R.pick([0.1, 0.2, 0.25, 0.4]), T = R.pick([240, 300, 360, 400, 480]);
  const k = n * C.R * T / 100; // p[10⁵ Pa]·V[dm³] = nRT/100
  const pts = []; for (let i = 0; i <= 40; i++) { const V = 1 + 4 * i / 40; pts.push([V, k / V]); }
  const ymax = Math.ceil(k) + 1, ys = ymax > 8 ? 2 : 1;
  const VA = 2, pA = k / VA;
  return {
    ctx: `Na wykresie przedstawiono izotermę dla ${pl(n)} mola gazu doskonałego (objętość w dm³, ciśnienie w 10⁵ Pa). R = 8,314 J/(mol·K).`,
    svg: plot({ xl: 'V, dm³', yl: 'p, 10⁵ Pa', xmax: 5, ymax, xstep: 1, ystep: ys, series: [{ pts }, { pts: [[VA, pA]], dots: true, only: true }] }),
    parts: [
      { kind: 'num', pts: 2, q: 'Korzystając z zaznaczonego punktu, oblicz temperaturę gazu. Zapisz obliczenia.', ans: T, unit: 'K', tol: 0.05,
        hint: 'Odczytaj p i V z punktu, zamień na Pa i m³, potem T = pV/(nR).',
        steps: [`Punkt: V = 2 dm³ = 2·10⁻³ m³, p ≈ ${fmt(pA, 3)}·10⁵ Pa. ${eq(`T = ${fr('pV', 'nR')} ≈ <b>${fmt(T)} K</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny odczyt i równanie Clapeyrona (błąd jednostek).', '0 pkt – brak postępu.'] },
      { kind: 'fill', pts: 2, q: 'Uzupełnij zdania o sprężaniu gazu wzdłuż tej izotermy.', text: 'Gdy objętość gazu maleje dwukrotnie, ciśnienie {0}. Energia wewnętrzna gazu {1}, a gaz {2} ciepło do otoczenia.',
        gaps: [['rośnie dwukrotnie', 'maleje dwukrotnie', 'rośnie czterokrotnie'], ['rośnie', 'nie zmienia się', 'maleje'], ['oddaje', 'pobiera']], correct: [0, 1, 0],
        steps: ['pV = const. Przy T = const ΔU = 0, więc Q = −W<sub>nad gazem</sub>: praca wykonana nad gazem oddawana jest jako ciepło.'] }
    ]
  };
}});

/* TERMODYNAMIKA, MATERIA, HYDROSTATYKA – zestaw 2 */
'use strict';

G({ id: 'thermo-vsr', area: 'thermo', title: 'Teoria kinetyczna – prędkość cząsteczek gazu', gen() {
  const gas = R.pick([{ n: 'helu', M: 0.004 }, { n: 'azotu', M: 0.028 }, { n: 'tlenu', M: 0.032 }, { n: 'wodoru', M: 0.002 }, { n: 'argonu', M: 0.040 }]);
  const T = R.n(250, 600, 10), vr = Math.sqrt(3 * C.R * T / gas.M), Ek = 1.5 * C.kB * T;
  return {
    ctx: `Gaz – cząsteczki ${gas.n} (masa molowa ${pl(gas.M * 1000)} g/mol) – ma temperaturę ${d(T)} K. Traktuj go jak gaz doskonały. R = 8,31 J/(mol·K), k<sub>B</sub> = 1,38·10⁻²³ J/K.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz średnią energię kinetyczną ruchu postępowego jednej cząsteczki.', ans: Ek, unit: 'J', hint: 'E = (3/2)k_B·T – nie zależy od rodzaju gazu.', steps: [`${eq(`E = ${fr('3', '2')}k<sub>B</sub>T ≈ <b>${fmt(Ek)} J</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz średnią kwadratową prędkość cząsteczek. Zapisz obliczenia.', ans: vr, unit: 'm/s',
        hint: '½m₀v² = (3/2)k_BT. Masa cząsteczki m₀ = M/N_A, a k_B·N_A = R, więc v = √(3RT/M).',
        steps: [`${eq(`${fr('m₀v²', '2')} = ${fr('3', '2')}k<sub>B</sub>T → v = ${sq(fr('3RT', 'M'))}`)}`, `${eq(`v = ${sq(fr(`3·8,31·${d(T)}`, pl(gas.M)))} ≈ <b>${fmt(vr)} m/s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne powiązanie energii kinetycznej z temperaturą.', '0 pkt – np. masa molowa w g/mol zamiast kg/mol.'] },
      { kind: 'mc', pts: 1, q: 'Ile razy wzrośnie średnia kwadratowa prędkość cząsteczek, gdy temperatura bezwzględna wzrośnie 4 razy?', options: ['2 razy', '4 razy', '16 razy', '√2 razy'], correct: 0, steps: ['v ∝ √T → √4 = 2.'] }
    ]
  };
}});

G({ id: 'thermo-opona', area: 'thermo', title: 'Przemiana izochoryczna – ciśnienie w oponie', gen() {
  const p1 = R.n(2, 3.5, 0.1), t1 = R.n(-10, 15, 1), t2 = R.n(30, 70, 5);
  const T1 = t1 + 273, T2 = t2 + 273, p2 = p1 * T2 / T1;
  return {
    ctx: `Ciśnienie powietrza w oponie samochodu w temperaturze ${t1} °C wynosi ${pl(p1)}·10⁵ Pa (ciśnienie bezwzględne). Podczas jazdy powietrze w oponie nagrzało się do ${t2} °C. Objętość opony uznaj za stałą.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz ciśnienie powietrza w nagrzanej oponie (w jednostkach 10⁵ Pa). Zapisz obliczenia.', ans: p2, unit: '·10⁵ Pa',
        hint: 'Przemiana izochoryczna: p/T = const. Temperatury koniecznie w kelwinach!',
        steps: [`${eq(`T₁ = ${T1} K,  T₂ = ${T2} K`)}`, `${eq(`${fr('p₁', 'T₁')} = ${fr('p₂', 'T₂')} → p₂ = p₁${fr('T₂', 'T₁')} ≈ <b>${fmt(p2)}·10⁵ Pa</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne prawo przemiany izochorycznej.', '0 pkt – np. temperatury w °C.'] },
      { kind: 'open', pts: 1, q: 'Wyjaśnij na gruncie teorii kinetyczno-molekularnej, dlaczego ciśnienie wzrosło.', model: 'Ze wzrostem temperatury rośnie średnia prędkość cząsteczek. Uderzają one o ścianki opony częściej i z większym pędem, więc średnia siła działająca na jednostkę powierzchni (ciśnienie) rośnie.' }
    ]
  };
}});

G({ id: 'thermo-pecherzyk', area: 'thermo', title: 'Pęcherzyk powietrza wypływający z głębiny', gen() {
  const hh = R.n(5, 40, 5), V1 = R.n(1, 10, 1), p0 = 1.0e5;
  const p1 = p0 + 1000 * C.g * hh, V2 = V1 * p1 / p0;
  return {
    ctx: `Nurek na głębokości ${hh} m wypuścił pęcherzyk powietrza o objętości ${V1} cm³. Ciśnienie atmosferyczne 10⁵ Pa, gęstość wody 1000 kg/m³. Temperatura wody jest wszędzie taka sama.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz objętość pęcherzyka tuż pod powierzchnią wody. Zapisz obliczenia.', ans: V2, unit: 'cm³',
        hint: 'Na głębokości h ciśnienie wynosi p₀ + ρgh. Stała temperatura → przemiana izotermiczna: pV = const.',
        steps: [`${eq(`p₁ = p₀ + ρgh ≈ ${fmt(p1)} Pa`)}`, `Przemiana izotermiczna: ${eq('p₁V₁ = p₀V₂')}`, `${eq(`V₂ = V₁${fr('p₁', 'p₀')} ≈ <b>${fmt(V2)} cm³</b>`)}`], rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawne ciśnienie na głębokości i prawo Boyle’a–Mariotte’a.', '1 pkt – jedno z dwóch: ciśnienie na głębokości albo prawo izotermy.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'thermo-sciana', area: 'thermo', title: 'Przewodnictwo cieplne przez ścianę', gen() {
  const mat = R.pick([{ n: 'cegły', l: 0.7 }, { n: 'betonu', l: 1.4 }, { n: 'drewna', l: 0.15 }, { n: 'styropianu', l: 0.04 }]);
  const S = R.n(5, 20, 1), dd = R.n(10, 40, 5) / 100, tin = 21, tout = R.n(-15, 5, 5);
  const P = mat.l * S * (tin - tout) / dd, E = P * 86400 / 3.6e6;
  return {
    ctx: `Ściana z ${mat.n} (współczynnik przewodnictwa cieplnego λ = ${pl(mat.l)} W/(m·K)) ma powierzchnię ${S} m² i grubość ${d(dd * 100)} cm. Temperatura w pokoju wynosi ${tin} °C, a na zewnątrz ${tout} °C. Przepływ ciepła jest ustalony.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz moc cieplną traconą przez ścianę. Zapisz obliczenia.', ans: P, unit: 'W',
        hint: 'P = λSΔT/d. Różnica temperatur w °C = różnica w K.', steps: [`${eq(`P = ${fr('λSΔT', 'd')} = ${fr(`${pl(mat.l)}·${S}·${tin - tout}`, pl(dd))} ≈ <b>${fmt(P)} W</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór z poprawną różnicą temperatur.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Ile energii (w kWh) ucieka przez tę ścianę w ciągu doby?', ans: E, unit: 'kWh', hint: 'E = P·t, 1 kWh = 3,6·10⁶ J.', steps: [`${eq(`E = P·24 h ≈ <b>${fmt(E)} kWh</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'thermo-prasa', area: 'thermo', title: 'Prasa hydrauliczna – prawo Pascala', gen() {
  const S1 = R.n(2, 10, 1), S2 = R.n(100, 800, 50), m = R.n(500, 2000, 100), h2 = R.n(5, 30, 5);
  const F1 = m * C.g * S1 / S2, h1 = h2 * S2 / S1;
  return {
    ctx: `W prasie hydraulicznej mały tłok ma powierzchnię ${S1} cm², a duży ${S2} cm². Na dużym tłoku leży samochód o masie ${d(m)} kg. Pomiń masy tłoków i tarcie.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz, jaką siłą trzeba naciskać mały tłok, aby utrzymać samochód.', ans: F1, unit: 'N', hint: 'Prawo Pascala: ciśnienie pod oboma tłokami jest takie samo, F₁/S₁ = F₂/S₂.', steps: [`${eq(`F₁ = mg${fr('S₁', 'S₂')} ≈ <b>${fmt(F1)} N</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `O ile centymetrów trzeba przesunąć mały tłok, aby podnieść samochód o ${h2} cm? Zapisz obliczenia.`, ans: h1, unit: 'cm',
        hint: 'Ciecz jest nieściśliwa: objętość wypchnięta spod małego tłoka = objętość pod dużym. S₁h₁ = S₂h₂.',
        steps: [`${eq(`S₁h₁ = S₂h₂ → h₁ = h₂${fr('S₂', 'S₁')} = <b>${fmt(h1)} cm</b>`)}Prasa „wzmacnia” siłę, ale nie pracę: F₁h₁ = F₂h₂.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zapis równości objętości (lub prac).', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'thermo-balon', area: 'thermo', title: 'Balon na ogrzane powietrze', gen() {
  const V = R.n(1000, 4000, 250), tout = R.n(0, 20, 5), tin = R.n(80, 120, 10), rho = 1.29 * 273 / (273 + tout);
  const rin = rho * (tout + 273) / (tin + 273), lift = V * (rho - rin);
  return {
    ctx: `Powłoka balonu ma objętość ${d(V)} m³. Powietrze na zewnątrz ma temperaturę ${tout} °C i gęstość ${fmt(rho, 3)} kg/m³, a powietrze w balonie ogrzano do ${tin} °C. Ciśnienie wewnątrz i na zewnątrz jest takie samo.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz gęstość ogrzanego powietrza w balonie. Zapisz obliczenia.', ans: rin, unit: 'kg/m³',
        hint: 'Przy stałym ciśnieniu z pV = nRT wynika ρ ∝ 1/T (ρ·T = const).',
        steps: [`${eq(`ρ = ${fr('pM', 'RT')} → ρ<sub>w</sub>T<sub>w</sub> = ρ<sub>z</sub>T<sub>z</sub>`)}`, `${eq(`ρ<sub>w</sub> = ${fmt(rho, 3)}·${fr(tout + 273, tin + 273)} ≈ <b>${fmt(rin)} kg/m³</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny związek gęstości z temperaturą.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz największą masę (powłoka + kosz + ładunek), jaką balon może unieść. Zapisz obliczenia.', ans: lift, unit: 'kg',
        hint: 'Siła wyporu (ρ_z·V·g) musi zrównoważyć ciężar gorącego powietrza w środku i ciężar reszty: m = V(ρ_z − ρ_w).',
        steps: [`${eq(`ρ<sub>z</sub>Vg = ρ<sub>w</sub>Vg + mg`)}`, `${eq(`m = V(ρ<sub>z</sub> − ρ<sub>w</sub>) ≈ <b>${fmt(lift)} kg</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny warunek równowagi z siłą wyporu.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'thermo-para', area: 'thermo', title: 'Skraplanie pary wodnej w wodzie', gen() {
  let mp, mw, tw, T;
  do { mp = R.n(10, 60, 5) / 1000; mw = R.n(0.3, 1.5, 0.1); tw = R.n(10, 30, 2); T = (mp * C.Lp + mp * C.cw * 100 + mw * C.cw * tw) / ((mp + mw) * C.cw); } while (T > 95);
  return {
    ctx: `Do naczynia z ${d(mw)} kg wody o temperaturze ${tw} °C wprowadzono ${d(mp * 1000)} g pary wodnej o temperaturze 100 °C. Para całkowicie się skropliła. Ciepło parowania wody 2,26·10⁶ J/kg, c<sub>w</sub> = 4200 J/(kg·K). Pomiń straty ciepła.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz końcową temperaturę wody. Zapisz obliczenia.', ans: T, unit: '°C',
        hint: 'Para oddaje ciepło dwa razy: przy skraplaniu (m·L) i przy stygnięciu powstałej wody od 100 °C do T. Zimna woda je pobiera.',
        steps: [`Bilans: ${eq('m<sub>p</sub>L + m<sub>p</sub>c<sub>w</sub>(100 − T) = m<sub>w</sub>c<sub>w</sub>(T − t<sub>w</sub>)')}`, `${eq(`T = ${fr('m<sub>p</sub>L + m<sub>p</sub>c<sub>w</sub>·100 + m<sub>w</sub>c<sub>w</sub>t<sub>w</sub>', '(m<sub>p</sub> + m<sub>w</sub>)c<sub>w</sub>')}`)}`, `${eq(`T ≈ <b>${fmt(T)} °C</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawny pełny bilans cieplny.', '1 pkt – bilans z pominięciem stygnięcia skroplonej pary albo poprawne ciepło skraplania.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Dlaczego oparzenie parą o temperaturze 100 °C jest groźniejsze niż wrzątkiem o tej samej temperaturze?', options: ['para skraplając się na skórze oddaje dodatkowo duże ciepło parowania', 'para ma większe ciepło właściwe', 'para ma wyższą temperaturę', 'para przewodzi ciepło lepiej niż woda'], correct: 0, steps: ['Ciepło skraplania (2,26 MJ/kg) jest wielokrotnie większe niż ciepło oddawane przy stygnięciu wody o kilkadziesiąt stopni.'] }
    ]
  };
}});

G({ id: 'thermo-cieplo-wlasciwe', area: 'thermo', title: 'Doświadczalne wyznaczanie ciepła właściwego i ciepła topnienia', gen() {
  const P = R.n(100, 500, 50), m = R.n(0.2, 1, 0.1), dT = R.n(5, 20, 1), cl = 2100, tl = m * cl * dT / P, tt = m * C.Lt / P;
  const tCzas = Math.round(tl), tTop = Math.round(tt);
  return {
    ctx: `Lód o masie ${d(m)} kg i temperaturze −${dT} °C ogrzewano grzałką o stałej mocy ${d(P)} W, mierząc temperaturę co kilka sekund. Temperatura rosła do 0 °C przez ${tCzas} s, a następnie przez ${tTop} s utrzymywała się na poziomie 0 °C. Załóż, że całe ciepło z grzałki pobiera lód.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz ciepło właściwe lodu na podstawie tych pomiarów. Zapisz obliczenia.', ans: P * tCzas / (m * dT), unit: 'J/(kg·K)',
        hint: 'Ciepło od grzałki Q = P·t idzie na ogrzanie lodu: Q = mcΔT.',
        steps: [`${eq(`P·t₁ = mcΔT → c = ${fr('Pt₁', 'mΔT')}`)}`, `${eq(`c = ${fr(`${d(P)}·${tCzas}`, `${d(m)}·${dT}`)} ≈ <b>${fmt(P * tCzas / (m * dT))} J/(kg·K)</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny bilans P·t = mcΔT.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz ciepło topnienia lodu (w kJ/kg).', ans: P * tTop / m / 1000, unit: 'kJ/kg', hint: 'W czasie topnienia temperatura stoi, a ciepło P·t idzie na zmianę stanu: Q = mL.',
        steps: [`${eq(`L = ${fr('Pt₂', 'm')} ≈ <b>${fmt(P * tTop / m / 1000)} kJ/kg</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'open', pts: 1, q: 'Uczeń otrzymał w podobnym doświadczeniu wynik większy niż wartość tablicowa. Podaj prawdopodobną przyczynę.', model: 'Część ciepła z grzałki ogrzewała naczynie i otoczenie, a nie lód. Uczeń zakłada, że całe ciepło P·t pobrał lód, więc zawyża wynik. Zapobiega temu np. izolacja naczynia (kalorymetr).' }
    ]
  };
}});

/* Tematy z informatora CKE i wymagań przekrojowych, które wymagają osobnych typów zadań */
'use strict';

G({ id: 'mech-ped-wektor', area: 'mech', title: 'Impulsowe działanie siły – pęd jako wektor', gen() {
  const m = R.n(0.2, 1, 0.1), vk = R.i(2, 5), vlx = R.i(2, 6), vly = R.pick([-3, -2, -1, 1, 2, 3]), dt = R.pick([0.01, 0.02, 0.05]);
  const dvx = vlx - vk, dvy = vly, dv = Math.hypot(dvx, dvy), F = m * dv / dt;
  const ang = rad2deg(Math.atan2(dvy, dvx));
  return {
    ctx: `Krążek hokejowy o masie ${d(m)} kg sunie bez tarcia po lodzie. W układzie współrzędnych (x, y) jego prędkość wynosi v⃗₁ = [${vk}; 0] m/s. Po krótkim uderzeniu kijem, trwającym ${pl(dt)} s, prędkość krążka wynosi v⃗₂ = [${vlx}; ${vly}] m/s. Przyjmij, że siła uderzenia była stała.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz wartość siły, z jaką kij działał na krążek. Zapisz obliczenia.', ans: F, unit: 'N',
        hint: 'II zasada dynamiki: F⃗ = mΔv⃗/Δt. Odejmij wektory prędkości po współrzędnych, a dopiero potem policz długość wektora Δv⃗.',
        steps: [`${eq(`Δv⃗ = v⃗₂ − v⃗₁ = [${vlx} − ${vk}; ${vly} − 0] = [${dvx}; ${dvy}] m/s`)}`, `${eq(`|Δv⃗| = ${sq(`${dvx}² + ${dvy}²`)} ≈ ${fmt(dv)} m/s`)}`, `${eq(`F = ${fr('m|Δv⃗|', 'Δt')} ≈ <b>${fmt(F)} N</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – II zasada dynamiki w postaci pędowej i poprawne |Δv⃗|.', '1 pkt – poprawna zmiana pędu jako wektor LUB zapis F = mΔv/Δt.', '0 pkt – np. odjęcie samych wartości prędkości (błąd rzeczowy).'] },
      { kind: 'num', pts: 1, q: 'Oblicz kąt (w stopniach), jaki siła tworzy z osią x (dodatni – w stronę osi y, ujemny – przeciwnie).', ans: ang, unit: '°', tol: 0.02, neg: true,
        hint: 'Siła ma kierunek wektora Δv⃗: tg φ = Δv_y/Δv_x (uważaj na znak Δv_x).', steps: [`${eq(`φ = atan2(${dvy}; ${dvx}) ≈ <b>${fmt(ang)}°</b>`)}Kierunek siły jest taki jak kierunek zmiany pędu, a nie jak kierunek prędkości!`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'grav-elipsa', area: 'grav', title: 'Ruch po orbicie eliptycznej', gen() {
  const rp = R.n(0.3, 1.5, 0.1), ra = +(rp + R.n(1, 30, 1)).toFixed(1), vp = R.n(30, 60, 1);
  const va = vp * rp / ra, a = (rp + ra) / 2, T = Math.pow(a, 1.5);
  return {
    ctx: `Kometa obiega Słońce po elipsie. W peryhelium jest w odległości ${pl(rp)} au od Słońca i ma prędkość ${vp} km/s, a w aphelium jest w odległości ${pl(ra)} au.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz prędkość komety w aphelium. Zapisz obliczenia.', ans: va, unit: 'km/s',
        hint: 'W peryhelium i aphelium prędkość jest prostopadła do promienia. Z zasady zachowania momentu pędu (II prawo Keplera): m·v_p·r_p = m·v_a·r_a.',
        steps: [`${eq('v<sub>p</sub>r<sub>p</sub> = v<sub>a</sub>r<sub>a</sub>')}`, `${eq(`v<sub>a</sub> = v<sub>p</sub>${fr('r<sub>p</sub>', 'r<sub>a</sub>')} ≈ <b>${fmt(va)} km/s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zastosowanie zasady zachowania momentu pędu / II prawa Keplera.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz okres obiegu komety (w latach). Zapisz obliczenia.', ans: T, unit: 'lat',
        hint: 'Wielka półoś a = (r_p + r_a)/2. III prawo Keplera w latach i au: T² = a³.',
        steps: [`${eq(`a = ${fr('r<sub>p</sub> + r<sub>a</sub>', '2')} = ${fmt(a)} au`)}`, `${eq(`T = ${sq('a³')} ≈ <b>${fmt(T)} lat</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna wielka półoś.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'grav-wenus', area: 'grav', title: 'Wenus i Ziemia – największa elongacja', gen() {
  const pl2 = R.pick([{ n: 'Wenus', r: 0.723, gen: 'Wenus' }, { n: 'Merkury', r: 0.387, gen: 'Merkurego' }]);
  const th = rad2deg(Math.asin(pl2.r)), dist = Math.sqrt(1 - pl2.r * pl2.r), tl = dist * C.au / C.c / 60;
  return {
    ctx: `${pl2.n} krąży wokół Słońca po orbicie (w przybliżeniu kołowej) o promieniu ${pl(pl2.r)} au, wewnątrz orbity Ziemi (1 au). Elongacja to kąt między kierunkami Ziemia–Słońce i Ziemia–planeta.`,
    parts: [
      { kind: 'num', pts: 2, q: `Oblicz największą możliwą elongację ${pl2.gen}. Zapisz obliczenia.`, ans: th, unit: '°',
        hint: 'Elongacja jest największa, gdy linia Ziemia–planeta jest styczna do orbity planety. Wtedy kąt przy planecie jest prosty.',
        steps: [`W trójkącie Słońce–planeta–Ziemia kąt przy planecie = 90°: ${eq(`sin θ = ${fr('r<sub>p</sub>', 'r<sub>Z</sub>')} = ${pl(pl2.r)}`)}`, `${eq(`θ ≈ <b>${fmt(th)}°</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zauważenie kąta prostego / poprawny rysunek.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Ile minut biegnie wtedy światło od planety do Ziemi?', ans: tl, unit: 'min', hint: 'Z twierdzenia Pitagorasa d = √(1 − r²) au, t = d/c.',
        steps: [`${eq(`d = ${sq(`1 − ${pl(pl2.r)}²`)} ≈ ${fmt(dist)} au → t = ${fr('d', 'c')} ≈ <b>${fmt(tl)} min</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'open', pts: 1, q: `Wyjaśnij, dlaczego ${pl2.n} nigdy nie jest widoczny(-a) o północy.`, model: `Planeta wewnętrzna jest zawsze widoczna w pobliżu Słońca na niebie – jej kąt od Słońca nie przekracza ok. ${fmt(th, 2)}°. O północy Słońce jest pod horyzontem po przeciwnej stronie nieba, więc planeta także jest pod horyzontem. Widać ją tylko wieczorem lub rano.` }
    ]
  };
}});

G({ id: 'wave-fala-plaska', area: 'wave', title: 'Załamanie fali płaskiej na wodzie', gen() {
  const f = R.n(2, 10, 1), v1 = R.n(0.2, 0.5, 0.05), v2 = +(v1 * R.n(0.4, 0.8, 0.1)).toFixed(3), a = R.pick([20, 30, 40, 50]);
  const l1 = v1 / f, l2 = v2 / f, b = rad2deg(Math.asin(Math.sin(deg(a)) * v2 / v1));
  return {
    ctx: `Płaska fala na wodzie o częstotliwości ${f} Hz przechodzi z obszaru głębokiej wody, gdzie jej prędkość wynosi ${pl(v1)} m/s, do obszaru płytkiej wody, gdzie prędkość wynosi ${pl(v2)} m/s. Kąt padania czoła fali na granicę obszarów wynosi ${a}°.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz długość fali w płytkiej wodzie (w cm).', ans: l2 * 100, unit: 'cm', hint: 'Częstotliwość się nie zmienia, λ = v/f.', steps: [`${eq(`λ₂ = ${fr('v₂', 'f')} ≈ <b>${fmt(l2 * 100)} cm</b> (w głębokiej: ${fmt(l1 * 100)} cm)`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz kąt załamania fali. Zapisz obliczenia.', ans: b, unit: '°',
        hint: 'Prawo załamania dla każdej fali: sin α / sin β = v₁ / v₂.',
        steps: [`${eq(`${fr('sin α', 'sin β')} = ${fr('v₁', 'v₂')} → sin β = sin ${a}°·${fr(pl(v2), pl(v1))}`)}`, `${eq(`β ≈ <b>${fmt(b)}°</b>`)}Fala zwalnia → załamuje się w stronę normalnej.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne prawo załamania z prędkościami.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'elec-bateria-wykres', area: 'elec', title: 'Wyznaczanie SEM i oporu wewnętrznego z pomiarów', gen() {
  const E = R.pick([1.5, 3, 4.5, 6, 9]), r = R.n(0.3, 3, 0.1), I1 = R.n(0.1, 0.5, 0.05), I2 = +(I1 + R.n(0.2, 0.8, 0.1)).toFixed(2);
  const U1 = +(E - I1 * r).toFixed(2), U2 = +(E - I2 * r).toFixed(2);
  const rr = (U1 - U2) / (I2 - I1), EE = U1 + I1 * rr;
  return {
    ctx: `Uczeń podłączał do baterii płaskiej różne oporniki i mierzył natężenie prądu I oraz napięcie U na zaciskach baterii. Dwa pomiary: I₁ = ${pl(I1)} A, U₁ = ${pl(U1)} V oraz I₂ = ${pl(I2)} A, U₂ = ${pl(U2)} V. Przyjmij, że SEM i opór wewnętrzny są stałe.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz opór wewnętrzny baterii. Zapisz obliczenia.', ans: rr, unit: 'Ω',
        hint: 'U = ℰ − Ir. Zapisz to równanie dla obu pomiarów i odejmij stronami.',
        steps: [`${eq(`U₁ = ℰ − I₁r,   U₂ = ℰ − I₂r`)}`, `${eq(`r = ${fr('U₁ − U₂', 'I₂ − I₁')} ≈ <b>${fmt(rr)} Ω</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – układ równań U = ℰ − Ir dla dwóch pomiarów.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz SEM baterii.', ans: EE, unit: 'V', hint: 'ℰ = U₁ + I₁r.', steps: [`${eq(`ℰ = U₁ + I₁r ≈ <b>${fmt(EE)} V</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Na wykresie U(I) dla tej baterii punkt przecięcia prostej z osią I oznacza:', options: ['prąd zwarcia ℰ/r', 'siłę elektromotoryczną', 'opór wewnętrzny', 'moc maksymalną'], correct: 0, steps: [`Dla U = 0 (zwarcie): I = ℰ/r ≈ ${fmt(EE / rr)} A. Przecięcie z osią U to ℰ, a nachylenie (z minusem) to r.`] }
    ]
  };
}});

G({ id: 'elec-dioda', area: 'elec', title: 'Dioda, półprzewodniki i prostowanie prądu', gen() {
  const Umax = R.pick([5, 10, 12, 24]), Rr = R.pick([10, 50, 100, 200]), Ud = 0.7;
  const Imax = (Umax - Ud) / Rr;
  return {
    ctx: `Dioda krzemowa jest połączona szeregowo z opornikiem ${Rr} Ω i źródłem napięcia przemiennego o amplitudzie ${Umax} V. Gdy dioda przewodzi, spadek napięcia na niej wynosi ok. 0,7 V.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz maksymalne natężenie prądu płynącego przez opornik.', ans: Imax, unit: 'A', hint: 'Gdy dioda przewodzi: U_max = 0,7 V + I·R.',
        steps: [`${eq(`I<sub>max</sub> = ${fr('U<sub>max</sub> − 0,7 V', 'R')} ≈ <b>${fmt(Imax)} A</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.sample([
        { s: 'Przez opornik płynie prąd tylko w jednym kierunku, przez mniej więcej połowę każdego okresu.', v: true },
        { s: 'Dioda przewodzi, gdy jest spolaryzowana w kierunku zaporowym.', v: false },
        { s: 'Opór półprzewodnika (np. termistora) zwykle maleje ze wzrostem temperatury.', v: true },
        { s: 'Opór metali maleje ze wzrostem temperatury.', v: false },
        { s: 'W półprzewodniku typu n nośnikami większościowymi są elektrony.', v: true },
        { s: 'Wzrost przewodnictwa półprzewodnika z temperaturą wynika z uwalniania większej liczby nośników ładunku.', v: true },
        { s: 'Fotorezystor ma większy opór w świetle niż w ciemności.', v: false }
      ], 3) },
      { kind: 'mc', pts: 1, q: 'Do czego w układzie prostownika służy kondensator dołączony równolegle do odbiornika?', options: ['wygładza napięcie (zmniejsza tętnienia)', 'odwraca kierunek prądu', 'zwiększa amplitudę napięcia źródła', 'chroni diodę przed przegrzaniem'], correct: 0, steps: ['Kondensator ładuje się, gdy dioda przewodzi, i oddaje ładunek do odbiornika w przerwach – napięcie staje się bardziej wyrównane.'] }
    ]
  };
}});

G({ id: 'elec-elektroskop', area: 'elec', title: 'Indukcja elektrostatyczna i elektroskop', gen() {
  const sign = R.pick(['dodatnio', 'ujemnie']), opp = sign === 'dodatnio' ? 'ujemnie' : 'dodatnio';
  return {
    ctx: `Do kulki nienaładowanego elektroskopu zbliżono (bez dotykania) pałeczkę naładowaną ${sign}.`,
    parts: [
      { kind: 'mc', pts: 1, q: 'Jak naładują się kulka i listki elektroskopu, gdy pałeczka jest blisko?', options: [`kulka ${opp}, listki ${sign}`, `kulka ${sign}, listki ${opp}`, 'kulka i listki pozostają obojętne', `kulka i listki ${sign}`], correct: 0,
        steps: [`Ładunki w metalu się przemieszczają: ładunki przeciwnego znaku (${opp}) gromadzą się bliżej pałeczki, czyli na kulce, a ładunki tego samego znaku są odpychane na listki. Elektroskop jako całość jest obojętny.`] },
      { kind: 'mc', pts: 1, q: 'Trzymając pałeczkę blisko, uziemiono na chwilę kulkę palcem, potem odsunięto palec, a na końcu pałeczkę. Jak naładowany jest elektroskop?', options: [opp, sign, 'jest obojętny', 'nie da się określić'], correct: 0,
        steps: [`Uziemienie pozwala odpłynąć (lub dopłynąć) ładunkom odpychanym przez pałeczkę. Po odsunięciu palca elektroskop zostaje z nadmiarem ładunku przeciwnego do pałeczki – naładowany ${opp}.`] },
      { kind: 'open', pts: 2, q: 'Wyjaśnij, dlaczego listki elektroskopu odchylają się od siebie i co się stanie, gdy odsuniemy pałeczkę (bez wcześniejszego uziemienia).', model: 'Listki mają ładunek tego samego znaku, więc się odpychają (prawo Coulomba). Po odsunięciu pałeczki ładunki w elektroskopie wracają do równomiernego rozkładu – elektroskop był cały czas obojętny, więc listki opadają.' }
    ]
  };
}});

G({ id: 'elec-spektrometr', area: 'elec', title: 'Spektrometr masowy – rozdzielanie izotopów', gen() {
  const iso = R.pick([[35, 37, 'chloru'], [20, 22, 'neonu'], [63, 65, 'miedzi'], [10, 11, 'boru']]);
  const U = R.n(500, 3000, 100), B = R.n(0.1, 0.5, 0.05), q = C.e;
  const r = A => Math.sqrt(2 * A * C.u * U / q) / B;
  const r1 = r(iso[0]), r2 = r(iso[1]), dist = 2 * (r2 - r1);
  return {
    ctx: `Jednokrotnie zjonizowane atomy izotopów ${iso[2]} o masach ${iso[0]} u i ${iso[1]} u przyspieszono napięciem ${d(U)} V i wprowadzono prostopadle do jednorodnego pola magnetycznego o indukcji ${pl(B)} T. Jony zataczają półokręgi i uderzają w kliszę. 1 u = 1,66·10⁻²⁷ kg, e = 1,6·10⁻¹⁹ C.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz promień okręgu, po którym porusza się lżejszy jon (w cm). Zapisz obliczenia.', ans: r1 * 100, unit: 'cm',
        hint: 'Najpierw prędkość z qU = mv²/2, potem promień z qvB = mv²/r. Wynik: r = √(2mU/q)/B.',
        steps: [`${eq(`qU = ${fr('mv²', '2')},   qvB = ${fr('mv²', 'r')}`)}`, `${eq(`r = ${fr('1', 'B')}${sq(fr('2mU', 'q'))}`)}`, `${eq(`r₁ ≈ <b>${fmt(r1 * 100)} cm</b>`)}`], rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawny wzór na promień wyrażony przez U i B.', '1 pkt – jedno z równań: bilans energii albo siła Lorentza = siła dośrodkowa.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz odległość (w mm) między śladami obu izotopów na kliszy.', ans: dist * 1000, unit: 'mm', hint: 'Ślady są w odległościach równych średnicom: Δ = 2(r₂ − r₁).',
        steps: [`${eq(`r₂ ≈ ${fmt(r2 * 100)} cm → Δ = 2(r₂ − r₁) ≈ <b>${fmt(dist * 1000)} mm</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'atom-relatywistyka', area: 'atom', title: 'Energia całkowita, spoczynkowa i kinetyczna cząstki', gen() {
  const p = R.pick([{ n: 'Elektron', E0: 0.511, Ek: R.pick([0.1, 0.25, 0.5, 1, 2, 5]) }, { n: 'Proton', E0: 938.3, Ek: R.pick([100, 250, 500, 1000, 2000]) }]);
  const Etot = p.E0 + p.Ek, gam = Etot / p.E0, beta = Math.sqrt(1 - 1 / (gam * gam)), bclass = Math.sqrt(2 * p.Ek / p.E0);
  return {
    ctx: `${p.n} (energia spoczynkowa E₀ = mc² = ${pl(p.E0)} MeV) został przyspieszony do energii kinetycznej ${pl(p.Ek)} MeV. Energia całkowita cząstki E = γmc², gdzie γ = 1/√(1 − v²/c²).`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz energię całkowitą cząstki (w MeV).', ans: Etot, unit: 'MeV', hint: 'E = E₀ + E_k.', steps: [`${eq(`E = E₀ + E<sub>k</sub> = <b>${fmt(Etot, 4)} MeV</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 3, q: 'Oblicz prędkość cząstki jako ułamek prędkości światła (v/c). Zapisz obliczenia.', ans: beta, unit: 'c', tol: 0.01,
        hint: 'γ = E/E₀. Potem z γ = 1/√(1 − β²) wyznacz β = v/c.',
        steps: [`${eq(`γ = ${fr('E', 'E₀')} ≈ ${fmt(gam, 4)}`)}`, `${eq(`β = ${sq(`1 − ${fr('1', 'γ²')}`)}`)}`, `${eq(`v ≈ <b>${fmt(beta, 4)}c</b>`)}`], rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawny wzór na β przez γ.', '1 pkt – poprawne γ = E/E₀.', '0 pkt – np. obliczenie z wzoru klasycznego.'] },
      { kind: 'mc', pts: 1, q: `Z klasycznego wzoru E<sub>k</sub> = mv²/2 wyszłoby v ≈ ${fmt(bclass, 3)}c. Co z tego wynika?`, options: bclass > 1 ? ['wynik klasyczny jest niemożliwy (v > c) – trzeba stosować mechanikę relatywistyczną', 'cząstka porusza się szybciej niż światło', 'oba wyniki są równie dobre', 'energia kinetyczna jest źle podana'] : ['wynik klasyczny jest zawyżony – przy dużych prędkościach trzeba stosować mechanikę relatywistyczną', 'wynik klasyczny jest dokładny', 'cząstka porusza się szybciej niż światło', 'energia kinetyczna jest źle podana'], correct: 0,
        steps: ['Wzór klasyczny działa tylko dla v ≪ c (E<sub>k</sub> ≪ mc²). Gdy E<sub>k</sub> jest porównywalna z mc², stosujemy E = γmc².'] }
    ]
  };
}});

G({ id: 'atom-elektron-szczeliny', area: 'atom', title: 'Interferencja elektronów na podwójnej szczelinie', gen() {
  const U = R.n(50, 600, 50), dd = R.n(0.5, 3, 0.5) * 1e-6, L = R.n(0.5, 2, 0.5);
  const lam = C.h / Math.sqrt(2 * C.me * C.e * U), dx = lam * L / dd;
  return {
    ctx: `Wiązkę elektronów przyspieszonych napięciem ${d(U)} V skierowano na dwie szczeliny odległe o ${pl(dd * 1e6)} μm. Na ekranie (detektorze) odległym o ${pl(L)} m po długim czasie rejestracji powstał obraz prążków. h = 6,63·10⁻³⁴ J·s, m<sub>e</sub> = 9,11·10⁻³¹ kg, e = 1,6·10⁻¹⁹ C.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz długość fali de Broglie’a elektronów (w pm; 1 pm = 10⁻¹² m). Zapisz obliczenia.', ans: lam * 1e12, unit: 'pm',
        hint: 'λ = h/p, p = √(2m_e·eU).', steps: [`${eq(`λ = ${fr('h', sq('2m<sub>e</sub>eU'))} ≈ ${fmt(lam)} m = <b>${fmt(lam * 1e12)} pm</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny pęd elektronu.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz odległość między sąsiednimi prążkami na ekranie (w μm).', ans: dx * 1e6, unit: 'μm', hint: 'Jak w doświadczeniu Younga: Δx = λL/d.', steps: [`${eq(`Δx = ${fr('λL', 'd')} ≈ <b>${fmt(dx * 1e6)} μm</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'open', pts: 1, q: 'Elektrony wysyłano pojedynczo. Opisz, jak wygląda obraz na detektorze po krótkim i po długim czasie, i co z tego wynika.', model: 'Po krótkim czasie widać pojedyncze, przypadkowo rozrzucone punkty (elektron rejestruje się jak cząstka). Po długim czasie punkty układają się w prążki interferencyjne. Wniosek: każdy elektron zachowuje się jak fala przechodząca przez obie szczeliny, a fala określa prawdopodobieństwo jego wykrycia (dualizm korpuskularno-falowy).' }
    ]
  };
}});

G({ id: 'atom-fotoefekt-wykres', area: 'atom', title: 'Stała Plancka z wykresu E_k(f)', gen() {
  const W = R.pick([1.9, 2.1, 2.3, 2.6, 4.3]), hev = 4.136e-15;
  const f1 = R.n(6, 9, 0.5) * 1e14, f2 = f1 + R.n(2, 5, 0.5) * 1e14;
  const f1b = Math.max(f1, (W / hev) * 1.05), f2b = f2 + (f1b - f1);
  const E1 = +(hev * f1b - W).toFixed(2), E2 = +(hev * f2b - W).toFixed(2);
  const hh = (E2 - E1) / (f2b - f1b), WW = hh * f1b - E1, fg = WW / hh;
  return {
    ctx: `W doświadczeniu ze zjawiskiem fotoelektrycznym zmierzono maksymalną energię kinetyczną fotoelektronów dla dwóch częstotliwości światła: f₁ = ${fmt(f1b)} Hz → E<sub>k1</sub> = ${pl(E1)} eV oraz f₂ = ${fmt(f2b)} Hz → E<sub>k2</sub> = ${pl(E2)} eV. Wykres E<sub>k</sub>(f) jest linią prostą. 1 eV = 1,6·10⁻¹⁹ J.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Wyznacz stałą Plancka (w J·s). Zapisz obliczenia.', ans: hh * C.eV, unit: 'J·s',
        hint: 'E_k = hf − W: nachylenie prostej E_k(f) to h. Policz ΔE_k/Δf i zamień eV na J.',
        steps: [`${eq(`h = ${fr('E<sub>k2</sub> − E<sub>k1</sub>', 'f₂ − f₁')} ≈ ${fmt(hh)} eV·s`)}`, `${eq(`h ≈ <b>${fmt(hh * C.eV)} J·s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zauważenie, że h to nachylenie prostej.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Wyznacz pracę wyjścia metalu (w eV).', ans: WW, unit: 'eV', hint: 'W = hf₁ − E_k1.', steps: [`${eq(`W = hf₁ − E<sub>k1</sub> ≈ <b>${fmt(WW)} eV</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Wyznacz częstotliwość graniczną.', ans: fg, unit: 'Hz', hint: 'Prosta przecina oś f w punkcie E_k = 0: f_gr = W/h.', steps: [`${eq(`f<sub>gr</sub> = ${fr('W', 'h')} ≈ <b>${fmt(fg)} Hz</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'mech-niepewnosci', area: 'mech', title: 'Niepewność pomiaru – wyznaczanie g wahadłem', gen() {
  const l = R.n(0.5, 1.5, 0.05), dl = 0.005, n = R.pick([10, 20, 30]), T = 2 * Math.PI * Math.sqrt(l / C.g), t = +(n * T).toFixed(1), dt = R.pick([0.2, 0.3, 0.5]);
  const Tm = t / n, g = 4 * Math.PI ** 2 * l / (Tm * Tm), rel = dl / l + 2 * dt / t;
  return {
    ctx: `Uczeń zmierzył długość wahadła l = (${pl(l)} ± 0,005) m oraz czas ${n} pełnych wahnięć t = (${pl(t)} ± ${pl(dt)}) s.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz wartość przyspieszenia ziemskiego z tych pomiarów.', ans: g, unit: 'm/s²', hint: 'T = t/n, g = 4π²l/T².', steps: [`${eq(`T = ${fr('t', n)} = ${fmt(Tm, 4)} s → g = ${fr('4π²l', 'T²')} ≈ <b>${fmt(g)} m/s²</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oszacuj niepewność względną wyniku (w %), stosując metodę najmniej korzystnego przypadku. Zapisz obliczenia.', ans: rel * 100, unit: '%', tol: 0.05,
        hint: 'g ∝ l/t². Niepewności względne się sumują, a potęga mnoży niepewność: δg = δl + 2δt.',
        steps: [`${eq(`${fr('Δg', 'g')} = ${fr('Δl', 'l')} + 2${fr('Δt', 't')} = ${fr('0,005', pl(l))} + 2·${fr(pl(dt), pl(t))}`)}`, `${eq(`${fr('Δg', 'g')} ≈ <b>${fmt(rel * 100)}%</b>,  Δg ≈ ${fmt(rel * g, 2)} m/s²`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna metoda (suma niepewności względnych z czynnikiem 2 przy t).', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Dlaczego mierzy się czas wielu wahnięć, a nie jednego?', options: ['niepewność pomiaru czasu (np. refleks) rozkłada się na wiele okresów – niepewność T maleje', 'okres wahadła zmienia się z każdym wahnięciem', 'stoper nie mierzy krótkich czasów', 'aby wahadło się rozpędziło'], correct: 0, steps: ['ΔT = Δt/n – im więcej wahnięć, tym mniejsza niepewność okresu.'] }
    ]
  };
}});

G({ id: 'mech-linearyzacja', area: 'mech', title: 'Wykres i linearyzacja – sprężyna', gen() {
  const k = R.n(10, 80, 5), ms = [0.05, 0.1, 0.15, 0.2, 0.25];
  const rows = ms.map(m => [m, +(4 * Math.PI ** 2 * m / k).toFixed(4)]);
  const slope = (rows[4][1] - rows[0][1]) / (rows[4][0] - rows[0][0]), kk = 4 * Math.PI ** 2 / slope;
  const tbl = `<table class="tbl"><tr><th>m, kg</th>${rows.map(r => `<td>${pl(r[0])}</td>`).join('')}</tr><tr><th>T², s²</th>${rows.map(r => `<td>${fmt(r[1], 3)}</td>`).join('')}</tr></table>`;
  return {
    ctx: `Uczeń badał okres drgań ciężarka na sprężynie dla różnych mas. Wyniki (kwadrat okresu) zebrał w tabeli: ${tbl}`,
    parts: [
      { kind: 'mc', pts: 1, q: 'Dlaczego uczeń sporządził wykres T² od m, a nie T od m?', options: ['bo T² ∝ m – wykres jest prostą, łatwo wyznaczyć jej nachylenie', 'bo T nie zależy od m', 'bo tak wymaga układ SI', 'bo T² jest zawsze większe od T'], correct: 0, steps: ['T = 2π√(m/k) → T² = (4π²/k)·m. Zależność liniowa pozwala odczytać k z nachylenia.'] },
      { kind: 'num', pts: 2, q: 'Wyznacz współczynnik sprężystości sprężyny z nachylenia wykresu T²(m). Zapisz obliczenia.', ans: kk, unit: 'N/m',
        hint: 'Nachylenie a = Δ(T²)/Δm = 4π²/k. Weź dwa odległe punkty.',
        steps: [`${eq(`a = ${fr(`${fmt(rows[4][1], 3)} − ${fmt(rows[0][1], 3)}`, `${pl(rows[4][0])} − ${pl(rows[0][0])}`)} ≈ ${fmt(slope)} s²/kg`)}`, `${eq(`k = ${fr('4π²', 'a')} ≈ <b>${fmt(kk)} N/m</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne nachylenie lub związek a = 4π²/k.', '0 pkt – brak postępu.'] }
    ]
  };
}});

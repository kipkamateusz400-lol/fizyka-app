/* WIĄZKI Z TEKSTEM ŹRÓDŁOWYM (wymaganie ogólne IV: analiza materiałów źródłowych) */
'use strict';

const TXT = s => `<div class="src"><div class="src-h">📰 Tekst źródłowy</div>${s}</div>`;

G({ id: 'tekst-spadochron', area: 'mech', title: 'Tekst: Skok ze spadochronem', gen() {
  const vg1 = R.pick([50, 55, 60]), vg2 = R.pick([5, 5.5, 6]), m = R.n(80, 100, 5), hh = vg2 * vg2 / (2 * C.g);
  const k = m * C.g / (vg1 * vg1);
  return {
    ctx: TXT(`<p>Skoczek spadochronowy tuż po wyskoczeniu z samolotu przyspiesza, ale wraz ze wzrostem prędkości rośnie siła oporu powietrza. W przybliżeniu jest ona proporcjonalna do kwadratu prędkości: F<sub>op</sub> = k·v², gdzie współczynnik k zależy od kształtu i ułożenia ciała oraz od gęstości powietrza.</p>
      <p>Po kilkunastu sekundach siła oporu równoważy ciężar i skoczek opada ze stałą prędkością – tzw. prędkością graniczną. W ułożeniu płaskim, z rozłożonymi rękami, wynosi ona około ${vg1} m/s. Po otwarciu czaszy współczynnik k rośnie wielokrotnie, a prędkość graniczna spada do około ${pl(vg2)} m/s. Lądowanie z taką prędkością przypomina skok z niewielkiej wysokości – dlatego skoczkowie uczą się amortyzować upadek, uginając nogi.</p>`) + `<p>Masa skoczka wraz z wyposażeniem wynosi ${m} kg.</p>`,
    parts: [
      { kind: 'fill', pts: 2, q: 'Uzupełnij zdania na podstawie tekstu i swojej wiedzy.', text: 'Gdy skoczek opada z prędkością graniczną, siła wypadkowa działająca na niego jest {0}, a jego energia mechaniczna {1}.', gaps: [['równa zeru', 'skierowana w dół', 'skierowana w górę'], RMN], correct: [0, 1],
        steps: ['v = const → a = 0 → siły się równoważą (I zasada dynamiki). Energia kinetyczna się nie zmienia, a potencjalna maleje – energia mechaniczna maleje (praca siły oporu zamienia ją na ciepło).'] },
      { kind: 'num', pts: 2, q: 'Oblicz współczynnik k dla skoczka w ułożeniu płaskim (przed otwarciem spadochronu). Zapisz obliczenia.', ans: k, unit: 'kg/m',
        hint: 'Przy prędkości granicznej: k·v² = m·g.', steps: [`${eq(`kv<sub>gr</sub>² = mg → k = ${fr('mg', 'v<sub>gr</sub>²')} = ${fr(`${m}·9,81`, `${vg1}²`)} ≈ <b>${fmt(k)} kg/m</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny warunek równowagi sił.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Ile razy wzrósł współczynnik k po otwarciu spadochronu?', ans: (vg1 / vg2) ** 2, unit: '', hint: 'k·v² = mg w obu przypadkach, więc k ∝ 1/v².', steps: [`${eq(`${fr('k₂', 'k₁')} = (${fr('v₁', 'v₂')})² = (${fr(vg1, pl(vg2))})² ≈ <b>${fmt((vg1 / vg2) ** 2)}</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Z jakiej wysokości trzeba by zeskoczyć (bez spadochronu, bez oporu powietrza), aby uderzyć w ziemię z prędkością równą prędkości lądowania spadochroniarza?', ans: hh, unit: 'm', hint: 'v² = 2gh.', steps: [`${eq(`h = ${fr('v²', '2g')} ≈ <b>${fmt(hh)} m</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'tekst-webb', area: 'grav', title: 'Tekst: Kosmiczny Teleskop Jamesa Webba', gen() {
  const T = R.pick([35, 40, 45, 50]), z = R.pick([6, 7, 8, 9, 10]), lamObs = 121.6 * (1 + z);
  const tL2 = 1.5e9 / C.c, lmax = C.b / T * 1e6;
  return {
    ctx: TXT(`<p>Kosmiczny Teleskop Jamesa Webba krąży wokół Słońca w pobliżu punktu L2, położonego około 1,5 mln km od Ziemi, po stronie przeciwnej niż Słońce. Jego główne zwierciadło ma średnicę 6,5 m. Teleskop obserwuje przede wszystkim w podczerwieni.</p>
      <p>Wybór podczerwieni ma dwa powody. Po pierwsze, światło najodleglejszych galaktyk, wysłane w nadfiolecie i w zakresie widzialnym, z powodu rozszerzania się Wszechświata dociera do nas silnie przesunięte ku czerwieni – aż do podczerwieni. Po drugie, podczerwień przenika przez obłoki pyłu, w których rodzą się gwiazdy. Aby własne promieniowanie cieplne teleskopu nie zagłuszało słabych sygnałów, wielowarstwowa osłona odcina go od światła Słońca, a jego instrumenty pracują w temperaturze około ${T} K.</p>`),
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz czas, w jakim sygnał radiowy dociera od teleskopu do Ziemi.', ans: tL2, unit: 's', hint: 't = s/c, s = 1,5·10⁹ m.', steps: [`${eq(`t = ${fr('1,5·10⁹ m', '3·10⁸ m/s')} = <b>${fmt(tL2)} s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Traktując elementy teleskopu jak ciało doskonale czarne o temperaturze ${T} K, oblicz długość fali (w μm), przy której ich promieniowanie jest najsilniejsze. Zapisz obliczenia.`, ans: lmax, unit: 'μm',
        hint: 'Prawo Wiena λ_max = b/T, b = 2,9·10⁻³ m·K.', steps: [`${eq(`λ<sub>max</sub> = ${fr('b', 'T')} = ${fr('2,898·10⁻³', T)} ≈ ${fmt(lmax * 1e-6)} m ≈ <b>${fmt(lmax)} μm</b>`)}To daleka podczerwień – gdyby teleskop był ciepły (300 K, ~10 μm), świeciłby w zakresie, który obserwuje.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne zastosowanie prawa Wiena (błąd jednostek).', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: `Linia Lyman-α wodoru ma w laboratorium długość 121,6 nm (nadfiolet). Teleskop obserwuje galaktykę o przesunięciu ku czerwieni z = ${z}. Oblicz obserwowaną długość tej linii (w μm). Skorzystaj z definicji: z = (λ<sub>obs</sub> − λ₀)/λ₀.`, ans: lamObs / 1000, unit: 'μm',
        hint: 'λ_obs = λ₀(1 + z).', steps: [`${eq(`λ<sub>obs</sub> = λ₀(1 + z) = 121,6 nm·${z + 1} ≈ ${fmt(lamObs)} nm ≈ <b>${fmt(lamObs / 1000)} μm</b>`)}To podczerwień – dokładnie to, o czym mówi tekst.`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań na podstawie tekstu.', statements: R.shuffle([
        { s: 'Teleskop obserwuje w podczerwieni m.in. dlatego, że światło najodleglejszych galaktyk jest przesunięte ku czerwieni.', v: true },
        { s: 'Osłona teleskopu służy do ochrony przed promieniowaniem kosmicznym z odległych galaktyk.', v: false },
        { s: 'Instrumenty teleskopu muszą być zimne, aby ich własne promieniowanie cieplne nie zakłócało pomiarów.', v: true },
        { s: 'Punkt L2 znajduje się między Ziemią a Słońcem.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'tekst-tsunami', area: 'wave', title: 'Tekst: Tsunami', gen() {
  const h = R.pick([2000, 3000, 4000, 5000, 6000]), lamKm = R.pick([100, 150, 200]);
  const vv = Math.sqrt(C.g * h), T = lamKm * 1000 / vv;
  return {
    ctx: TXT(`<p>Tsunami to seria fal wywołanych nagłym przemieszczeniem dużej masy wody, najczęściej przez podmorskie trzęsienie ziemi. Na otwartym oceanie długość takiej fali sięga ${lamKm} km i więcej, a jej wysokość często nie przekracza metra – statki mogą jej w ogóle nie zauważyć.</p>
      <p>Ponieważ długość fali jest dużo większa niż głębokość oceanu, prędkość tsunami zależy praktycznie tylko od głębokości: v = √(g·h). Na głębokim oceanie fala pędzi z prędkością samolotu pasażerskiego. Gdy zbliża się do brzegu, płytsza woda ją spowalnia, odległości między grzbietami maleją, a energia skupia się w coraz mniejszej objętości wody – fala gwałtownie rośnie, osiągając nieraz kilkanaście metrów. Okres fali przy tym się nie zmienia.</p>`),
    parts: [
      { kind: 'num', pts: 1, q: `Oblicz prędkość tsunami nad oceanem o głębokości ${h} m (w km/h).`, ans: vv * 3.6, unit: 'km/h', hint: 'v = √(gh), potem ×3,6.', steps: [`${eq(`v = ${sq(`9,81·${h}`)} ≈ ${fmt(vv)} m/s ≈ <b>${fmt(vv * 3.6)} km/h</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Oblicz okres tej fali (w minutach), przyjmując długość fali ${lamKm} km. Zapisz obliczenia.`, ans: T / 60, unit: 'min', hint: 'T = λ/v.', steps: [`${eq(`T = ${fr('λ', 'v')} = ${fr(`${lamKm}·10³ m`, `${fmt(vv)} m/s`)} ≈ ${fmt(T)} s ≈ <b>${fmt(T / 60)} min</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny związek T = λ/v z poprawną prędkością.', '0 pkt – brak postępu.'] },
      { kind: 'fill', pts: 2, q: 'Uzupełnij zdania zgodnie z tekstem.', text: 'Gdy tsunami wchodzi na płytką wodę, jego prędkość {0}, częstotliwość {1}, a długość fali {2}.', gaps: [RMN, RMN, RMN], correct: [1, 2, 1], steps: ['Tekst: płytsza woda spowalnia falę (v maleje), okres się nie zmienia (f też), odległości między grzbietami maleją (λ = v/f maleje).'] },
      { kind: 'open', pts: 1, q: 'Przedstaw własnymi słowami, dlaczego tsunami niegroźne dla statku na oceanie staje się niszczycielskie przy brzegu.', model: 'Na oceanie fala ma bardzo dużą długość i małą wysokość, więc statek łagodnie się unosi i opada. Przy brzegu fala zwalnia i się skraca, a ta sama energia skupia się w mniejszej objętości wody. Wysokość fali rośnie wtedy do wielu metrów.' }
    ]
  };
}});

G({ id: 'tekst-indukcja', area: 'elec', title: 'Tekst: Kuchenka indukcyjna', gen() {
  const f = R.pick([20, 25, 40, 50]) * 1000, P = R.pick([1500, 2000, 2500]), eta = R.pick([85, 90]), m = R.pick([1, 1.5, 2]), t1 = R.pick([10, 15, 20]);
  const t = m * C.cw * (100 - t1) / (P * eta / 100);
  return {
    ctx: TXT(`<p>Pod szklano-ceramiczną płytą kuchenki indukcyjnej znajduje się płaska cewka zasilana prądem przemiennym o częstotliwości około ${f / 1000} kHz. Zmienne pole magnetyczne cewki przenika przez płytę do dna garnka. Jeśli dno jest wykonane z materiału ferromagnetycznego (np. ze stali), indukują się w nim silne prądy wirowe, które je nagrzewają. Ciepło powstaje więc bezpośrednio w garnku, a płyta nagrzewa się dopiero od niego.</p>
      <p>Dzięki temu sprawność kuchenki indukcyjnej sięga ${eta}%, wobec około 40–55% dla kuchenki gazowej. Garnki szklane czy ceramiczne w ogóle się nie nagrzewają, a zwykłe garnki aluminiowe i miedziane – bardzo słabo.</p>`),
    parts: [
      { kind: 'mc', pts: 1, q: 'Na jakim zjawisku opiera się działanie kuchenki indukcyjnej?', options: ['indukcji elektromagnetycznej', 'indukcji elektrostatycznej', 'zjawisku fotoelektrycznym', 'przewodnictwie cieplnym płyty'], correct: 0, steps: ['Zmienny strumień magnetyczny indukuje SEM i prądy wirowe w dnie garnka; prądy wydzielają ciepło Joule’a.'] },
      { kind: 'num', pts: 1, q: 'Oblicz okres prądu płynącego w cewce (w μs).', ans: 1e6 / f, unit: 'μs', hint: 'T = 1/f.', steps: [`${eq(`T = ${fr('1', 'f')} = ${fr('1', `${f / 1000}·10³ Hz`)} = <b>${fmt(1e6 / f)} μs</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: `Oblicz czas zagotowania ${pl(m)} kg wody o temperaturze ${t1} °C na tej kuchence o mocy ${P} W, korzystając ze sprawności podanej w tekście. Zapisz obliczenia.`, ans: t, unit: 's',
        hint: 'Q = mcΔT; η·P·t = Q.', steps: [`${eq(`t = ${fr('mc<sub>w</sub>(100 − t₁)', 'ηP')} = ${fr(`${pl(m)}·4200·${100 - t1}`, `${pl(eta / 100)}·${P}`)} ≈ <b>${fmt(t)} s</b> (≈ ${fmt(t / 60)} min)`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne ciepło lub poprawne uwzględnienie sprawności.', '0 pkt – brak postępu.'] },
      { kind: 'open', pts: 1, q: 'Wyjaśnij, dlaczego ręka położona na włączonej płycie (bez garnka) nie zostanie od razu poparzona.', model: 'Płyta sama się nie grzeje – ciepło powstaje w dnie garnka dzięki prądom wirowym. W ciele człowieka (słaby przewodnik, nie ferromagnetyk) praktycznie nie indukują się prądy, które by je nagrzały. Płyta jest gorąca dopiero od garnka.' }
    ]
  };
}});

G({ id: 'tekst-szybkowar', area: 'thermo', title: 'Tekst: Szybkowar', gen() {
  const pAbs = R.pick([1.6, 1.8, 2.0]) * 1e5, r = R.pick([10, 11, 12]) / 100, Tw = { 160000: 113, 180000: 117, 200000: 120 }[pAbs];
  const F = (pAbs - 1.0e5) * Math.PI * r * r;
  return {
    ctx: TXT(`<p>Temperatura wrzenia wody zależy od ciśnienia: im wyższe ciśnienie nad powierzchnią wody, tym wyższa temperatura wrzenia. Pod ciśnieniem atmosferycznym (około 10⁵ Pa) woda wrze w 100 °C, a wysoko w górach – w niższej temperaturze, dlatego ugotowanie tam jajka na twardo trwa dłużej.</p>
      <p>Szybkowar to szczelnie zamknięty garnek. Para wodna nie może z niego uciec, więc ciśnienie wewnątrz rośnie do około ${fmt(pAbs / 1e5)}·10⁵ Pa, a woda wrze dopiero w temperaturze około ${Tw} °C. W wyższej temperaturze reakcje chemiczne w potrawie zachodzą szybciej, więc gotowanie trwa nawet kilka razy krócej. Zawór bezpieczeństwa wypuszcza parę, gdy ciśnienie przekroczy dopuszczalną wartość.</p>`) + `<p>Pokrywka szybkowaru jest kołem o promieniu ${pl(r * 100)} cm.</p>`,
    parts: [
      { kind: 'fill', pts: 2, q: 'Uzupełnij zdania na podstawie tekstu.', text: 'Gdy ciśnienie nad wodą rośnie, temperatura jej wrzenia {0}. W górach, gdzie ciśnienie jest {1}, woda wrze w temperaturze {2} niż 100 °C.', gaps: [RMN, ['niższe', 'wyższe'], ['niższej', 'wyższej']], correct: [0, 0, 0], steps: ['Tekst: im wyższe ciśnienie, tym wyższa temperatura wrzenia. Ciśnienie maleje z wysokością.'] },
      { kind: 'num', pts: 2, q: 'Oblicz wypadkową siłę parcia gazów na pokrywkę (różnica parcia od środka i od zewnątrz) w N. Zapisz obliczenia.', ans: F, unit: 'N',
        hint: 'Na pokrywkę działa różnica ciśnień Δp = p_w − p_atm na powierzchni πr².', steps: [`${eq(`Δp = ${fmt(pAbs)} − 10⁵ = ${fmt(pAbs - 1e5)} Pa,  S = πr² ≈ ${fmt(Math.PI * r * r)} m²`)}`, `${eq(`F = Δp·S ≈ <b>${fmt(F)} N</b>`)}To jak ciężar ok. ${fmt(F / C.g, 2)} kg – dlatego pokrywka musi być solidnie zablokowana.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne pole pokrywki lub różnica ciśnień.', '0 pkt – brak postępu.'] },
      { kind: 'open', pts: 1, q: 'Wyjaśnij, dlaczego nie wolno otwierać szybkowaru, zanim nie ostygnie lub nie zostanie odpowietrzony.', model: 'Wewnątrz panuje ciśnienie wyższe od atmosferycznego, a woda ma temperaturę powyżej 100 °C. Po otwarciu ciśnienie gwałtownie spada, temperatura wrzenia też, więc przegrzana woda nagle wrze i wyrzuca gorącą parę i wrzątek – grozi to poparzeniem.' }
    ]
  };
}});

G({ id: 'tekst-reaktor', area: 'atom', title: 'Tekst: Reaktor jądrowy', gen() {
  const Pe = R.pick([600, 1000, 1200, 1600]) * 1e6, eta = R.pick([0.33, 0.35, 0.37]);
  const Pt = Pe / eta, E = 200e6 * C.eV, n = Pt / E, mDay = n * 86400 * 0.235 / C.NA;
  return {
    ctx: TXT(`<p>W reaktorze jądrowym energia pochodzi z rozszczepienia jąder uranu-235. Jądro, które pochłonie powolny neutron, rozpada się na dwa lżejsze jądra i emituje zwykle 2–3 szybkie neutrony; w jednym rozszczepieniu wydziela się średnio około 200 MeV energii. Wyemitowane neutrony mogą wywołać kolejne rozszczepienia – to reakcja łańcuchowa.</p>
      <p>Szybkie neutrony słabo wywołują rozszczepienie U-235, dlatego spowalnia się je w moderatorze, np. w zwykłej wodzie lub graficie. Moc reaktora reguluje się prętami kontrolnymi z materiałów silnie pochłaniających neutrony (bor, kadm). W stabilnej pracy każde rozszczepienie wywołuje średnio dokładnie jedno następne. Elektrownia zamienia na energię elektryczną około ${Math.round(eta * 100)}% energii wydzielonej w reaktorze – resztę oddaje jako ciepło do otoczenia.</p>`) + `<p>Rozważ elektrownię o mocy elektrycznej ${Pe / 1e6} MW. 1 eV = 1,6·10⁻¹⁹ J, N<sub>A</sub> = 6,02·10²³ mol⁻¹, masa molowa U-235 = 235 g/mol.</p>`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz liczbę rozszczepień zachodzących w reaktorze w ciągu sekundy. Zapisz obliczenia.', ans: n, unit: '1/s',
        hint: 'Najpierw moc cieplna reaktora P = P_el/η, potem liczba rozszczepień = P/(200 MeV w J).',
        steps: [`${eq(`P<sub>t</sub> = ${fr('P<sub>el</sub>', 'η')} ≈ ${fmt(Pt)} W,   E₁ = 200 MeV = ${fmt(E)} J`)}`, `${eq(`n = ${fr('P<sub>t</sub>', 'E₁')} ≈ <b>${fmt(n)} s⁻¹</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna moc cieplna lub energia jednego rozszczepienia w J.', '0 pkt – np. pominięcie sprawności.'] },
      { kind: 'num', pts: 2, q: 'Oblicz masę uranu-235 rozszczepianą w ciągu doby (w kg). Zapisz obliczenia.', ans: mDay, unit: 'kg', hint: 'Liczba jąder w dobie = n·86400; masa = (N/N_A)·M.', steps: [`${eq(`N = n·86400 ≈ ${fmt(n * 86400)}`)}`, `${eq(`m = ${fr('N', 'N<sub>A</sub>')}·0,235 kg/mol ≈ <b>${fmt(mDay)} kg</b>`)}Dla porównania elektrownia węglowa tej mocy spala kilka–kilkanaście tysięcy ton węgla na dobę.`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna liczba rozszczepień w dobie lub poprawne przeliczenie na mole.', '0 pkt – brak postępu.'] },
      { kind: 'fill', pts: 2, q: 'Uzupełnij zdania na podstawie tekstu.', text: 'Moderator {0} neutrony, a pręty kontrolne je {1}. Po wsunięciu prętów głębiej moc reaktora {2}.', gaps: [['spowalnia', 'przyspiesza', 'pochłania'], ['pochłaniają', 'spowalniają', 'odbijają'], RMN], correct: [0, 0, 1], steps: ['Tekst: moderator spowalnia, pręty pochłaniają neutrony. Mniej neutronów → mniej rozszczepień → mniejsza moc.'] },
      { kind: 'open', pts: 1, q: 'Przedstaw własnymi słowami, czym jest kontrolowana reakcja łańcuchowa.', model: 'To ciąg rozszczepień, w którym neutrony z jednego rozszczepienia wywołują następne. W reaktorze pręty kontrolne pochłaniają nadmiarowe neutrony tak, by średnio jedno rozszczepienie wywoływało dokładnie jedno kolejne. Liczba rozszczepień na sekundę i moc pozostają wtedy stałe.' }
    ]
  };
}});

G({ id: 'tekst-zorza', area: 'elec', title: 'Tekst: Zorza polarna', gen() {
  const vv = R.pick([3, 4, 5, 6]) * 1e5, B = R.pick([3, 4, 5]) * 1e-5, lam = R.pick([557.7, 630.0]);
  const r = C.mp * vv / (C.e * B), Ef = C.h * C.c / (lam * 1e-9) / C.eV;
  return {
    ctx: TXT(`<p>Słońce nieustannie wyrzuca strumień naładowanych cząstek – głównie protonów i elektronów – zwany wiatrem słonecznym. Gdy cząstki docierają w okolice Ziemi, pole magnetyczne planety zakrzywia ich tory: poruszają się po spiralach nawiniętych na linie pola. Linie te zbiegają się w okolicach biegunów magnetycznych i tam część cząstek wnika w górne warstwy atmosfery.</p>
      <p>Na wysokości około 100–300 km cząstki zderzają się z atomami tlenu i cząsteczkami azotu, przekazując im energię. Wzbudzone atomy, wracając do stanów o niższej energii, emitują światło: tlen świeci głównie na zielono (557,7 nm), a wyżej – na czerwono (630,0 nm). Tak powstaje zorza polarna.</p>`) + `<p>Rozważ proton o prędkości ${fmt(vv)} m/s poruszający się prostopadle do linii pola magnetycznego o indukcji ${fmt(B)} T. m<sub>p</sub> = 1,67·10⁻²⁷ kg, e = 1,6·10⁻¹⁹ C.</p>`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz promień okręgu, po którym porusza się proton (w m). Zapisz obliczenia.', ans: r, unit: 'm', hint: 'Siła Lorentza = siła dośrodkowa: r = mv/(qB).', steps: [`${eq(`evB = ${fr('m<sub>p</sub>v²', 'r')} → r = ${fr('m<sub>p</sub>v', 'eB')} ≈ <b>${fmt(r)} m</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – przyrównanie siły Lorentza do siły dośrodkowej.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: `Oblicz energię fotonu (w eV) emitowanego przez atom tlenu w świetle o długości fali ${pl(lam)} nm.`, ans: Ef, unit: 'eV', hint: 'E = hc/λ.', steps: [`${eq(`E = ${fr('hc', 'λ')} ≈ <b>${fmt(Ef)} eV</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań na podstawie tekstu i swojej wiedzy.', statements: R.shuffle([
        { s: 'Zorze występują głównie w pobliżu biegunów, bo tam linie pola magnetycznego Ziemi zbiegają się i wchodzą w atmosferę.', v: true },
        { s: 'Pole magnetyczne Ziemi zwiększa energię kinetyczną cząstek wiatru słonecznego.', v: false },
        { s: 'Światło zorzy powstaje, gdy wzbudzone atomy przechodzą do stanów o niższej energii.', v: true },
        { s: 'Zielone światło zorzy ma większą długość fali niż czerwone.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

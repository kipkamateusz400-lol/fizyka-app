/* MECHANIKA – zestaw 2 */
'use strict';

G({ id: 'mech-rzut-ukosny', area: 'mech', title: 'Rzut ukośny', gen() {
  const v0 = R.n(10, 30, 1), a = R.pick([15, 20, 30, 40, 50, 60, 70]);
  const vx = v0 * Math.cos(deg(a)), vy = v0 * Math.sin(deg(a));
  const H = vy * vy / (2 * C.g), t = 2 * vy / C.g, z = vx * t;
  return {
    ctx: `Piłkę kopnięto z poziomego boiska z prędkością ${v('v')}₀ = ${d(v0)} m/s pod kątem ${a}° do poziomu. Pomiń opór powietrza.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz maksymalną wysokość, na jaką wzniesie się piłka. Zapisz obliczenia.', ans: H, unit: 'm',
        hint: 'Rozłóż v₀ na składowe. W najwyższym punkcie składowa pionowa = 0, pozioma zostaje.',
        steps: [`${eq(`v<sub>y</sub> = v₀ sin ${a}° ≈ ${fmt(vy)} m/s`)}`, `W najwyższym punkcie v<sub>y</sub> = 0: ${eq(`H = ${fr('v<sub>y</sub>²', '2g')} ≈ <b>${fmt(H)} m</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna składowa pionowa prędkości.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz zasięg rzutu. Zapisz obliczenia.', ans: z, unit: 'm',
        hint: 'Czas lotu = 2·v_y/g (wznoszenie i opadanie trwają tyle samo). Zasięg = v_x·t.',
        steps: [`${eq(`t = ${fr('2v<sub>y</sub>', 'g')} ≈ ${fmt(t)} s,   v<sub>x</sub> = v₀ cos ${a}° ≈ ${fmt(vx)} m/s`)}`, `${eq(`z = v<sub>x</sub>t ≈ <b>${fmt(z)} m</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny czas lotu.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Przy jakim kącie wyrzutu (ta sama prędkość v₀) zasięg byłby największy?', options: ['45°', '30°', '60°', '90°'], correct: 0, steps: ['z = v₀² sin 2α / g – największy, gdy sin 2α = 1, czyli α = 45°. Kąty α i 90° − α dają ten sam zasięg.'] }
    ]
  };
}});

G({ id: 'mech-winda', area: 'mech', title: 'Waga w windzie – przeciążenie', gen() {
  const m = R.n(50, 90, 1), a = R.n(0.5, 3, 0.5), up = Math.random() < 0.5;
  const N = m * (C.g + (up ? a : -a)), read = N / C.g;
  return {
    ctx: `Uczeń o masie ${d(m)} kg stoi w windzie na wadze łazienkowej (wyskalowanej w kilogramach, czyli pokazującej N/g). Winda rusza ${up ? 'w górę' : 'w dół'} z przyspieszeniem o wartości ${d(a)} m/s².`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz, jaką wartość pokaże waga podczas rozpędzania windy. Zapisz obliczenia.', ans: read, unit: 'kg',
        hint: 'Na ucznia działają ciężar mg (w dół) i reakcja wagi N (w górę). II zasada dynamiki: N − mg = ma (z odpowiednim znakiem a).',
        steps: [`Oś w górę: ${eq(`N − mg = m·(${up ? '+' : '−'}a) → N = m(g ${up ? '+' : '−'} a) ≈ ${fmt(N)} N`)}`, `Waga pokazuje ${eq(`${fr('N', 'g')} ≈ <b>${fmt(read)} kg</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne równanie II zasady dynamiki.', '0 pkt – brak postępu.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań.', statements: R.shuffle([
        { s: 'Gdy winda jedzie ze stałą prędkością, waga pokazuje rzeczywistą masę ucznia.', v: true },
        { s: 'Gdy winda hamuje, jadąc w górę, waga pokazuje więcej niż masa ucznia.', v: false },
        { s: 'Gdyby lina windy pękła (spadek swobodny), waga pokazałaby zero.', v: true },
        { s: 'Siła ciężkości działająca na ucznia zmienia się podczas przyspieszania windy.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'mech-atwood', area: 'mech', title: 'Dwa ciężarki na bloczku (maszyna Atwooda)', gen() {
  const m2 = R.n(0.2, 1.5, 0.1), m1 = +(m2 + R.n(0.1, 1, 0.1)).toFixed(2);
  const a = (m1 - m2) * C.g / (m1 + m2), T = 2 * m1 * m2 * C.g / (m1 + m2), hh = R.n(0.5, 2, 0.5), vv = Math.sqrt(2 * a * hh);
  return {
    ctx: `Przez nieważki bloczek, obracający się bez tarcia, przerzucono nieważką, nierozciągliwą nić. Na jej końcach zawieszono ciężarki o masach ${v('m')}₁ = ${d(m1)} kg i ${v('m')}₂ = ${d(m2)} kg i puszczono je swobodnie.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz wartość przyspieszenia ciężarków. Zapisz obliczenia.', ans: a, unit: 'm/s²',
        hint: 'Zapisz II zasadę dynamiki osobno dla każdego ciężarka (naciąg nici N jest taki sam po obu stronach), potem dodaj równania stronami.',
        steps: [`Cięższy ciężarek opada, lżejszy się wznosi: ${eq('m₁a = m₁g − N,   m₂a = N − m₂g')}`, `Dodajemy stronami – N się skraca: ${eq(`(m₁ + m₂)a = (m₁ − m₂)g`)}`, `${eq(`a = ${fr('(m₁ − m₂)g', 'm₁ + m₂')} ≈ <b>${fmt(a)} m/s²</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawny wzór na a (wyeliminowany naciąg).', '1 pkt – poprawne równanie dynamiki dla jednego ciężarka.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wartość siły naciągu nici.', ans: T, unit: 'N', hint: 'N = m₂(g + a).', steps: [`${eq(`N = m₂(g + a) ≈ <b>${fmt(T)} N</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: `Oblicz prędkość ciężarków po przebyciu drogi ${d(hh)} m.`, ans: vv, unit: 'm/s', hint: 'v = √(2as).', steps: [`${eq(`v = ${sq('2as')} ≈ <b>${fmt(vv)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'mech-wyrzutnia', area: 'mech', title: 'Wyrzutnia sprężynowa', gen() {
  const k = R.n(100, 800, 50), x = R.n(2, 10, 1) / 100, m = R.n(10, 80, 5) / 1000;
  const E = k * x * x / 2, vv = Math.sqrt(2 * E / m), H = E / (m * C.g);
  return {
    ctx: `Sprężynę wyrzutni o współczynniku sprężystości ${v('k')} = ${d(k)} N/m ściśnięto o ${d(x * 100)} cm i położono na niej kulkę o masie ${d(m * 1000)} g. Po zwolnieniu sprężyny kulka wyleciała pionowo w górę. Pomiń opór powietrza, masę sprężyny i zmianę wysokości podczas rozprężania.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz prędkość kulki w chwili opuszczenia wyrzutni. Zapisz obliczenia.', ans: vv, unit: 'm/s',
        hint: 'Energia sprężystości zamienia się na energię kinetyczną: kx²/2 = mv²/2.',
        steps: [`${eq(`${fr('kx²', '2')} = ${fr('mv²', '2')} → v = x${sq(fr('k', 'm'))}`)}`, `${eq(`v ≈ <b>${fmt(vv)} m/s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny bilans energii.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz maksymalną wysokość, na jaką wzniesie się kulka (od miejsca wylotu).', ans: H, unit: 'm', hint: 'kx²/2 = mgh.',
        steps: [`${eq(`h = ${fr('kx²', '2mg')} ≈ <b>${fmt(H)} m</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Sprężynę ściśnięto dwa razy mocniej (o 2x). Wysokość wzniesienia kulki:', options: ['wzrośnie 4 razy', 'wzrośnie 2 razy', 'wzrośnie √2 razy', 'nie zmieni się'], correct: 0, steps: ['h ∝ x² → (2)² = 4.'] }
    ]
  };
}});

G({ id: 'mech-hamowanie', area: 'mech', title: 'Droga hamowania samochodu', gen() {
  const vk = R.pick([50, 60, 70, 80, 90, 100, 120]), mu = R.pick([0.2, 0.3, 0.5, 0.6, 0.7, 0.8]), tr = R.n(0.5, 1.2, 0.1);
  const v0 = vk / 3.6, s = v0 * v0 / (2 * mu * C.g), sr = v0 * tr;
  return {
    ctx: `Samochód jedzie po poziomej drodze z prędkością ${vk} km/h. Kierowca zauważa przeszkodę i po czasie reakcji ${d(tr)} s zaczyna hamować z zablokowanymi kołami. Współczynnik tarcia kinetycznego opon o nawierzchnię wynosi ${d(mu)}.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz drogę hamowania (od chwili wciśnięcia hamulca do zatrzymania). Zapisz obliczenia.', ans: s, unit: 'm',
        hint: 'Siła tarcia μmg nadaje opóźnienie a = μg. Droga: v₀² = 2as. Albo: praca tarcia = energia kinetyczna.',
        steps: [`${eq(`v₀ = ${vk} km/h ≈ ${fmt(v0)} m/s,   a = μg = ${fmt(mu * C.g)} m/s²`)}`, `${eq(`s = ${fr('v₀²', '2μg')} ≈ <b>${fmt(s)} m</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne opóźnienie lub bilans energii (zamiana km/h na m/s).', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz całkowitą drogę zatrzymania (z drogą przebytą w czasie reakcji).', ans: s + sr, unit: 'm', hint: 'W czasie reakcji ruch jest jednostajny: s_r = v₀t_r.',
        steps: [`${eq(`s<sub>c</sub> = v₀t<sub>r</sub> + s ≈ ${fmt(sr)} + ${fmt(s)} ≈ <b>${fmt(s + sr)} m</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Samochód jedzie dwa razy szybciej. Droga hamowania (bez czasu reakcji):', options: ['wzrośnie 4 razy', 'wzrośnie 2 razy', 'wzrośnie √2 razy', 'nie zależy od prędkości'], correct: 0, steps: ['s = v²/(2μg) ∝ v². To dlatego prędkość tak bardzo wpływa na bezpieczeństwo.'] }
    ]
  };
}});

G({ id: 'mech-wahadlo-naciag', area: 'mech', title: 'Kulka na nici – naciąg w najniższym punkcie', gen() {
  const l = R.n(0.5, 2, 0.1), m = R.n(0.1, 1, 0.1), a = R.pick([30, 45, 60, 90]);
  const vv = Math.sqrt(2 * C.g * l * (1 - Math.cos(deg(a)))), N = m * C.g + m * vv * vv / l;
  return {
    ctx: `Kulkę o masie ${d(m)} kg zawieszoną na nici o długości ${d(l)} m odchylono tak, że nić tworzy kąt ${a}° z pionem${a === 90 ? ' (nić pozioma, napięta)' : ''}, i puszczono swobodnie. Pomiń opór powietrza.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz prędkość kulki w najniższym punkcie toru. Zapisz obliczenia.', ans: vv, unit: 'm/s',
        hint: 'Kulka obniża się o h = l(1 − cos α). Energia potencjalna zamienia się na kinetyczną.',
        steps: [`${eq(`h = l(1 − cos ${a}°) ≈ ${fmt(l * (1 - Math.cos(deg(a))))} m`)}`, `${eq(`mgh = ${fr('mv²', '2')} → v = ${sq('2gh')} ≈ <b>${fmt(vv)} m/s</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna wysokość spadku lub bilans energii.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz wartość siły naciągu nici w najniższym punkcie. Zapisz obliczenia.', ans: N, unit: 'N',
        hint: 'W najniższym punkcie wypadkowa naciągu (w górę) i ciężaru (w dół) jest siłą dośrodkową: N − mg = mv²/l.',
        steps: [`${eq(`N − mg = ${fr('mv²', 'l')} → N = mg + ${fr('mv²', 'l')}`)}`, `${eq(`N ≈ ${fmt(m * C.g)} + ${fmt(m * vv * vv / l)} ≈ <b>${fmt(N)} N</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne równanie (naciąg minus ciężar = siła dośrodkowa).', '0 pkt – np. przyjęcie N = mg.'] }
    ]
  };
}});

G({ id: 'mech-toczenie', area: 'mech', title: 'Toczenie się brył po równi', gen() {
  const bodies = [{ n: 'pełna kula', k: 0.4, f: '2/5' }, { n: 'pełny walec', k: 0.5, f: '1/2' }, { n: 'cienkościenna rura (obręcz)', k: 1, f: '1' }];
  const b = R.pick(bodies), hh = R.n(0.5, 3, 0.5);
  const vv = Math.sqrt(2 * C.g * hh / (1 + b.k)), frac = 1 / (1 + b.k);
  return {
    ctx: `Z wysokości ${v('h')} = ${d(hh)} m po równi pochyłej stacza się bez poślizgu ${b.n} (moment bezwładności I = ${b.f}·mr²). Ciało startuje z zerową prędkością. Pomiń opory toczenia i powietrza.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz prędkość środka masy bryły u dołu równi. Zapisz obliczenia.', ans: vv, unit: 'm/s',
        hint: 'Energia potencjalna zamienia się na kinetyczną ruchu postępowego I obrotowego: mgh = mv²/2 + Iω²/2, przy czym ω = v/r.',
        steps: [`${eq(`mgh = ${fr('mv²', '2')} + ${fr('Iω²', '2')},   ω = ${fr('v', 'r')}`)}`, `Z I = ${b.f}·mr²: ${eq(`mgh = ${fr('mv²', '2')}(1 + ${b.f}) → v = ${sq(fr('2gh', `1 + ${b.f}`))}`)}`, `${eq(`v ≈ <b>${fmt(vv)} m/s</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawny wzór na v.', '1 pkt – zapis zasady zachowania energii z energią ruchu obrotowego.', '0 pkt – brak postępu (np. pominięcie energii obrotu).'] },
      { kind: 'num', pts: 1, q: 'Jaki procent energii kinetycznej u dołu równi przypada na ruch postępowy?', ans: frac * 100, unit: '%', hint: 'E_post/E_całk = 1/(1 + k), gdzie I = k·mr².',
        steps: [`${eq(`${fr('E<sub>post</sub>', 'E')} = ${fr('1', `1 + ${b.f}`)} ≈ <b>${fmt(frac * 100)}%</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Pełna kula, pełny walec i obręcz startują jednocześnie z tej samej wysokości. Która bryła pierwsza dotrze na dół?', options: ['pełna kula', 'pełny walec', 'obręcz', 'wszystkie jednocześnie'], correct: 0, steps: ['Kula ma najmniejszy współczynnik k (2/5), więc najmniej energii idzie na obrót i jest najszybsza. Wynik nie zależy od masy ani promienia.'] }
    ]
  };
}});

G({ id: 'mech-lyzwiarka', area: 'mech', title: 'Zasada zachowania momentu pędu – piruet', gen() {
  const I1 = R.n(3, 6, 0.5), I2 = R.n(1, 2.5, 0.5), n1 = R.n(0.5, 2, 0.5);
  const n2 = n1 * I1 / I2, Ek1 = 0.5 * I1 * (2 * Math.PI * n1) ** 2, Ek2 = 0.5 * I2 * (2 * Math.PI * n2) ** 2;
  return {
    ctx: `Łyżwiarka obraca się z rozłożonymi rękami z częstotliwością ${d(n1)} obr/s; jej moment bezwładności wynosi wtedy ${d(I1)} kg·m². Gdy przyciąga ręce do tułowia, moment bezwładności maleje do ${d(I2)} kg·m². Pomiń tarcie łyżew o lód.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz, ile obrotów na sekundę wykonuje łyżwiarka po przyciągnięciu rąk. Zapisz obliczenia.', ans: n2, unit: 'obr/s',
        hint: 'Moment sił zewnętrznych względem osi obrotu = 0, więc moment pędu L = Iω jest zachowany.',
        steps: [`${eq('I₁ω₁ = I₂ω₂,   ω = 2πn → I₁n₁ = I₂n₂')}`, `${eq(`n₂ = n₁${fr('I₁', 'I₂')} ≈ <b>${fmt(n2)} obr/s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – zastosowanie zasady zachowania momentu pędu.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz, ile razy wzrosła energia kinetyczna łyżwiarki. Zapisz obliczenia.', ans: Ek2 / Ek1, unit: '',
        hint: 'E = Iω²/2 = L²/(2I). Przy stałym L energia jest odwrotnie proporcjonalna do I.',
        steps: [`${eq(`E = ${fr('L²', '2I')} → ${fr('E₂', 'E₁')} = ${fr('I₁', 'I₂')} ≈ <b>${fmt(Ek2 / Ek1)}</b>`)}`, 'Skąd ta energia? Łyżwiarka wykonuje pracę mięśniami, przyciągając ręce.'], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny wzór na energię ruchu obrotowego.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'mech-poscig', area: 'mech', title: 'Pościg – ruch jednostajny i przyspieszony', gen() {
  const vA = R.n(10, 25, 1), aB = R.n(1, 4, 0.5);
  const t = 2 * vA / aB, s = vA * t, vB = aB * t;
  return {
    ctx: `Samochód A przejeżdża ze stałą prędkością ${d(vA)} m/s obok stojącego radiowozu B. W tej samej chwili radiowóz rusza za nim ruchem jednostajnie przyspieszonym z przyspieszeniem ${d(aB)} m/s².`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz, po jakim czasie radiowóz dogoni samochód. Zapisz obliczenia.', ans: t, unit: 's',
        hint: 'Dogonienie = te same położenia. A: x = v·t. B: x = at²/2. Przyrównaj (i odrzuć rozwiązanie t = 0).',
        steps: [`${eq(`v<sub>A</sub>t = ${fr('a<sub>B</sub>t²', '2')}`)}`, `${eq(`t = ${fr('2v<sub>A</sub>', 'a<sub>B</sub>')} = <b>${fmt(t)} s</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne równanie położeń.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz drogę przebytą przez radiowóz do chwili dogonienia.', ans: s, unit: 'm', hint: 's = v_A·t.', steps: [`${eq(`s = v<sub>A</sub>t = <b>${fmt(s)} m</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Jaką prędkość ma radiowóz w chwili dogonienia samochodu?', options: [`2v<sub>A</sub> = ${fmt(vB)} m/s`, `v<sub>A</sub> = ${fmt(vA)} m/s`, `${fmt(vA / 2)} m/s`, `${fmt(vA * 1.5)} m/s`], correct: 0, steps: ['v = at = 2v<sub>A</sub> – ciekawa ogólna własność: średnia prędkość radiowozu (v/2) musi równać się v<sub>A</sub>.'] }
    ]
  };
}});

G({ id: 'mech-moc-pod-gore', area: 'mech', title: 'Moc samochodu jadącego pod górę', gen() {
  const m = R.n(900, 2000, 100), a = R.pick([2, 3, 4, 5, 6, 8]), vk = R.pick([36, 54, 72, 90]), F = R.n(200, 800, 50);
  const vv = vk / 3.6, P = (m * C.g * Math.sin(deg(a)) + F) * vv;
  return {
    ctx: `Samochód o masie ${d(m)} kg jedzie ze stałą prędkością ${vk} km/h pod górę po drodze nachylonej pod kątem ${a}° do poziomu. Siła oporów ruchu (powietrze i toczenie) ma wartość ${d(F)} N.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz moc użyteczną silnika (w kW). Zapisz obliczenia.', ans: P / 1000, unit: 'kW',
        hint: 'v = const, więc siła napędu równoważy składową ciężaru wzdłuż drogi i opory. Moc P = F_nap·v.',
        steps: [`${eq(`F<sub>nap</sub> = mg sin ${a}° + F<sub>op</sub> ≈ ${fmt(m * C.g * Math.sin(deg(a)))} + ${d(F)} ≈ ${fmt(m * C.g * Math.sin(deg(a)) + F)} N`)}`, `${eq(`v = ${vk} km/h = ${fmt(vv)} m/s`)}`, `${eq(`P = F<sub>nap</sub>v ≈ <b>${fmt(P / 1000)} kW</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawna siła napędowa.', '1 pkt – zapis P = Fv lub warunku równowagi sił.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'mech-zderzenie-sprezyste', area: 'mech', title: 'Zderzenie sprężyste centralne', gen() {
  const m1 = R.n(0.1, 1, 0.1), m2 = R.n(0.1, 1, 0.1), v1 = R.n(1, 6, 0.5);
  const u1 = (m1 - m2) / (m1 + m2) * v1, u2 = 2 * m1 / (m1 + m2) * v1;
  return {
    ctx: `Kula o masie ${d(m1)} kg poruszająca się z prędkością ${d(v1)} m/s zderza się centralnie i doskonale sprężyście ze spoczywającą kulą o masie ${d(m2)} kg. Wzory na prędkości po takim zderzeniu: u₁ = v₁(m₁ − m₂)/(m₁ + m₂), u₂ = 2m₁v₁/(m₁ + m₂).`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz wartość prędkości drugiej kuli po zderzeniu.', ans: u2, unit: 'm/s', hint: 'Podstaw do wzoru na u₂.', steps: [`${eq(`u₂ = ${fr('2m₁v₁', 'm₁ + m₂')} ≈ <b>${fmt(u2)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Co się dzieje z pierwszą kulą po zderzeniu?', options: ['porusza się dalej w tę samą stronę', 'odbija się (zawraca)', 'zatrzymuje się'], correct: m1 > m2 ? 0 : (m1 < m2 ? 1 : 2), steps: [`u₁ = ${fmt(u1, 3)} m/s. Gdy m₁ > m₂ – jedzie dalej, m₁ < m₂ – odbija się, m₁ = m₂ – staje (kule „wymieniają się” prędkościami).`] },
      { kind: 'open', pts: 2, q: 'Wykaż, że w tym zderzeniu zachowana jest energia kinetyczna (pokaż obliczenia).',
        model: `E przed = ½·${d(m1)}·${d(v1)}² ≈ ${fmt(0.5 * m1 * v1 * v1)} J. E po = ½m₁u₁² + ½m₂u₂² ≈ ${fmt(0.5 * m1 * u1 * u1)} + ${fmt(0.5 * m2 * u2 * u2)} ≈ ${fmt(0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2)} J – wartości są równe, więc energia jest zachowana.` }
    ]
  };
}});

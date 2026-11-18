/* MECHANIKA – generatory zadań */
'use strict';

G({ id: 'mech-rzut-dol', area: 'mech', title: 'Kulka rzucona pionowo w dół', gen() {
  const m = R.n(0.1, 0.5, 0.05), h = R.n(1.2, 3.0, 0.1), v0 = R.n(1.5, 4.5, 0.1), loss = R.pick([20, 25, 30, 36]), dt = R.pick([2, 4, 5, 8]) * 1e-3;
  const g = C.g;
  const t = (-v0 + Math.sqrt(v0 * v0 + 2 * g * h)) / g;
  const v1 = Math.sqrt(v0 * v0 + 2 * g * h);
  const v2 = Math.sqrt((1 - loss / 100)) * v1;
  const F = m * (v1 + v2) / dt + m * g;
  return {
    ctx: `Metalową kulkę o masie ${v('m')} = ${d(m)} kg rzucono pionowo w dół. Na wysokości ${v('h')} = ${d(h)} m nad podłożem, w chwili ${v('t')}₀ = 0, kulka miała prędkość o wartości ${v('v')}₀ = ${d(v0)} m/s. Kulka odbiła się od twardego podłoża, a czas zderzenia wynosił Δ${v('t')} = ${fmt(dt)} s. Podczas zderzenia kulka straciła ${loss}% energii mechanicznej. Pomiń opór powietrza, przyjmij ${v('g')} = 9,81 m/s² oraz że siła reakcji podłoża była stała.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz czas ruchu kulki od chwili <i>t</i>₀ = 0 do pierwszego uderzenia w podłoże. Zapisz obliczenia.', ans: t, unit: 's',
        hint: 'To ruch jednostajnie przyspieszony z prędkością początkową. Droga to h, przyspieszenie to g. Wyjdzie równanie kwadratowe względem t.',
        steps: [
          `Wzór na drogę w ruchu jednostajnie przyspieszonym: ${eq(`h = v₀t + ${fr('1', '2')}gt²`)}`,
          `Podstawiamy dane (SI): ${eq(`${d(h)} = ${d(v0)}t + ${fmt(g / 2, 4)}t²`)}`,
          `Rozwiązujemy równanie kwadratowe i bierzemy dodatni pierwiastek: ${eq(`t = ${fr(`−v₀ + ${sq('v₀² + 2gh')}`, 'g')} ≈ <b>${fmt(t)} s</b>`)}`
        ],
        rubric: ['2 pkt – poprawne równanie ruchu, rozwiązanie i wynik z jednostką.', '1 pkt – zapisanie równania drogi z poprawną identyfikacją h, g, v₀.', '0 pkt – niepoprawna metoda.'] },
      { kind: 'num', pts: 2, q: 'Oblicz wartość prędkości kulki tuż przed pierwszym uderzeniem w podłoże. Zapisz obliczenia.', ans: v1, unit: 'm/s',
        hint: 'Najszybciej z zasady zachowania energii mechanicznej: energia na wysokości h = energia kinetyczna przy podłożu.',
        steps: [
          `Zasada zachowania energii mechanicznej: ${eq(`${fr('1', '2')}mv₀² + mgh = ${fr('1', '2')}mv₁²`)}`,
          `Masa się skraca: ${eq(`v₁ = ${sq('v₀² + 2gh')} = ${sq(`${d(v0)}² + 2·9,81·${d(h)}`)} ≈ <b>${fmt(v1)} m/s</b>`)}`
        ],
        rubric: ['2 pkt – poprawna metoda i wynik.', '1 pkt – poprawny zapis zasady zachowania energii (albo v = v₀ + gt z obliczonym czasem).', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 3, q: 'Oblicz wartość siły reakcji podłoża działającej na kulkę podczas zderzenia. Zapisz obliczenia.', ans: F, unit: 'N', tol: 0.04,
        hint: 'II zasada dynamiki w postaci Δp/Δt = F_wyp. Uwaga na zwroty: przed zderzeniem prędkość w dół, po – w górę, więc Δv = v₂ + v₁. Siła wypadkowa to F_R − mg.',
        steps: [
          `II zasada dynamiki (oś w górę dodatnia): ${eq(`${fr('m(v₂ − (−v₁))', 'Δt')} = F<sub>R</sub> − mg`)}`,
          `Prędkość po odbiciu z bilansu energii (zostaje ${100 - loss}% energii): ${eq(`v₂ = ${sq(`${fmt(1 - loss / 100, 2)}`)}·v₁ ≈ ${fmt(v2)} m/s`)}`,
          `Wyznaczamy siłę reakcji: ${eq(`F<sub>R</sub> = ${fr('m(v₁ + v₂)', 'Δt')} + mg ≈ <b>${fmt(F)} N</b>`)}Zauważ, że mg (≈ ${fmt(m * g)} N) jest tu prawie pomijalne.`
        ],
        rubric: ['3 pkt – poprawna metoda i wynik z jednostką.', '2 pkt – II zasada dynamiki z poprawną siłą wypadkową i zmianą prędkości ORAZ poprawna metoda obliczenia v₂.', '1 pkt – jedno z dwóch: poprawne równanie z II zasady dynamiki albo poprawne obliczenie v₂.', '0 pkt – brak istotnego postępu.'] }
    ]
  };
}});

G({ id: 'mech-rzut-poziomy', area: 'mech', title: 'Rzut poziomy', gen() {
  const h = R.n(5, 45, 5), v0 = R.n(4, 20, 1);
  const t = Math.sqrt(2 * h / C.g), z = v0 * t, vy = C.g * t, vk = Math.hypot(v0, vy), ang = rad2deg(Math.atan(vy / v0));
  return {
    ctx: `Z krawędzi urwiska o wysokości ${v('h')} = ${d(h)} m rzucono poziomo kamień z prędkością ${v('v')}₀ = ${d(v0)} m/s. Pomiń opór powietrza.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz zasięg rzutu (odległość w poziomie od podnóża urwiska do miejsca upadku). Zapisz obliczenia.', ans: z, unit: 'm',
        hint: 'Rozłóż ruch na dwa niezależne: w poziomie jednostajny (x = v₀t), w pionie spadek swobodny (h = gt²/2). Czas jest wspólny.',
        steps: [`Czas spadania z ruchu pionowego: ${eq(`h = ${fr('gt²', '2')} → t = ${sq(fr('2h', 'g'))} ≈ ${fmt(t)} s`)}`, `Zasięg z ruchu poziomego: ${eq(`z = v₀t ≈ ${d(v0)}·${fmt(t)} ≈ <b>${fmt(z)} m</b>`)}`],
        rubric: ['2 pkt – poprawny czas i zasięg.', '1 pkt – poprawne obliczenie czasu spadania.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: 'Oblicz kąt, jaki wektor prędkości kamienia tuż przed upadkiem tworzy z poziomem. Zapisz obliczenia.', ans: ang, unit: '°',
        hint: 'Składowa pozioma się nie zmienia (v₀), pionowa to gt. Tangens kąta = v_y / v_x.',
        steps: [`Składowa pionowa: ${eq(`v<sub>y</sub> = gt ≈ ${fmt(vy)} m/s`)}`, `${eq(`tg α = ${fr('v<sub>y</sub>', 'v₀')} ≈ ${fmt(vy / v0)} → α ≈ <b>${fmt(ang)}°</b>`)}Wartość prędkości: v = ${sq('v₀² + v<sub>y</sub>²')} ≈ ${fmt(vk)} m/s.`],
        rubric: ['2 pkt – poprawny kąt.', '1 pkt – poprawna składowa pionowa prędkości.', '0 pkt – brak postępu.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań (opór powietrza pomijamy).', statements: R.shuffle([
        { s: 'Przyspieszenie kamienia podczas lotu jest stałe i skierowane pionowo w dół.', v: true },
        { s: 'Pozioma składowa prędkości kamienia rośnie podczas lotu.', v: false },
        { s: `Gdyby kamień rzucono z prędkością 2v₀, czas lotu byłby dwa razy dłuższy.`, v: false },
        { s: 'Kamień upuszczony swobodnie z tej samej wysokości spadałby tyle samo czasu.', v: true }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'mech-rownia', area: 'mech', title: 'Klocek na równi pochyłej z tarciem', gen() {
  const a = R.pick([25, 30, 35, 40, 45]), mu = R.n(0.1, 0.35, 0.05), m = R.n(0.5, 4, 0.5), L = R.n(1, 4, 0.5);
  const acc = C.g * (Math.sin(deg(a)) - mu * Math.cos(deg(a)));
  const vk = Math.sqrt(2 * acc * L);
  return {
    ctx: `Klocek o masie ${v('m')} = ${d(m)} kg puszczono swobodnie z górnego końca równi pochyłej o kącie nachylenia α = ${a}° i długości ${v('L')} = ${d(L)} m. Współczynnik tarcia kinetycznego klocka o równię wynosi μ = ${d(mu)}.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz wartość przyspieszenia klocka. Zapisz obliczenia.', ans: acc, unit: 'm/s²',
        hint: 'Narysuj siły: ciężar rozłóż na składową wzdłuż równi (mg sin α) i prostopadłą (mg cos α). Siła nacisku N = mg cos α, tarcie T = μN, skierowane w górę równi.',
        steps: [`Siły wzdłuż równi: składowa ciężaru w dół i tarcie w górę. II zasada dynamiki: ${eq('ma = mg sin α − μmg cos α')}`, `Masa się skraca: ${eq('a = g(sin α − μ cos α)')}`, `${eq(`a = 9,81·(sin ${a}° − ${d(mu)}·cos ${a}°) ≈ <b>${fmt(acc)} m/s²</b>`)}`],
        rubric: ['3 pkt – poprawny wzór i wynik.', '2 pkt – poprawne równanie II zasady dynamiki z obiema siłami.', '1 pkt – poprawne wyrażenie siły tarcia (μmg cos α) lub składowej ciężaru.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz prędkość klocka u dołu równi.', ans: vk, unit: 'm/s',
        hint: 'Ruch jednostajnie przyspieszony bez prędkości początkowej: v² = 2aL.',
        steps: [`${eq(`v = ${sq('2aL')} = ${sq(`2·${fmt(acc)}·${d(L)}`)} ≈ <b>${fmt(vk)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Jaki jest warunek, aby klocek położony na tej równi bez prędkości początkowej (współczynnik tarcia statycznego μ<sub>s</sub>) zaczął się zsuwać?', options: ['tg α > μ<sub>s</sub>', 'sin α > μ<sub>s</sub>', 'cos α > μ<sub>s</sub>', 'm·g > μ<sub>s</sub>'], correct: 0,
        steps: ['Klocek ruszy, gdy mg sin α > μ<sub>s</sub>mg cos α, czyli tg α > μ<sub>s</sub>. Warunek nie zależy od masy.'] }
    ]
  };
}});

G({ id: 'mech-zderzenie', area: 'mech', title: 'Zderzenie niesprężyste wózków', gen() {
  const m1 = R.n(0.1, 0.5, 0.05), m2 = R.n(0.1, 0.6, 0.05), v1 = R.n(0.4, 2, 0.1);
  const u = m1 * v1 / (m1 + m2);
  const Ek1 = m1 * v1 * v1 / 2, Ek2 = (m1 + m2) * u * u / 2, lossPct = (1 - Ek2 / Ek1) * 100;
  return {
    ctx: `Wózek A o masie ${d(m1 * 1000)} g porusza się po torze powietrznym bez tarcia z prędkością ${d(v1)} m/s i zderza się ze spoczywającym wózkiem B o masie ${d(m2 * 1000)} g. Po zderzeniu wózki sczepiają się i poruszają razem.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz wartość prędkości sczepionych wózków. Zapisz obliczenia.', ans: u, unit: 'm/s',
        hint: 'W zderzeniu układ jest izolowany w poziomie – zachowany jest pęd (energia kinetyczna NIE jest zachowana, bo zderzenie jest niesprężyste).',
        steps: [`Zasada zachowania pędu: ${eq('m<sub>A</sub>v<sub>A</sub> = (m<sub>A</sub> + m<sub>B</sub>)u')}`, `${eq(`u = ${fr('m<sub>A</sub>v<sub>A</sub>', 'm<sub>A</sub> + m<sub>B</sub>')} = ${fr(`${d(m1)}·${d(v1)}`, d(m1 + m2))} ≈ <b>${fmt(u)} m/s</b>`)}`],
        rubric: ['2 pkt – zasada zachowania pędu i poprawny wynik.', '1 pkt – poprawny zapis zasady zachowania pędu.', '0 pkt – np. użycie zasady zachowania energii kinetycznej.'] },
      { kind: 'num', pts: 2, q: 'Oblicz, jaki procent początkowej energii kinetycznej został zamieniony na inne formy energii. Zapisz obliczenia.', ans: lossPct, unit: '%',
        hint: 'Policz Ek przed i po. Strata = (Ek₁ − Ek₂)/Ek₁ · 100%. Ładny skrót: dla zderzenia z ciałem spoczywającym strata = m_B/(m_A+m_B).',
        steps: [`${eq(`E<sub>k1</sub> = ${fr('m<sub>A</sub>v<sub>A</sub>²', '2')} ≈ ${fmt(Ek1)} J,  E<sub>k2</sub> = ${fr('(m<sub>A</sub>+m<sub>B</sub>)u²', '2')} ≈ ${fmt(Ek2)} J`)}`, `${eq(`${fr('E<sub>k1</sub> − E<sub>k2</sub>', 'E<sub>k1</sub>')}·100% ≈ <b>${fmt(lossPct)}%</b>`)}Ciekawostka: wynik to dokładnie m<sub>B</sub>/(m<sub>A</sub>+m<sub>B</sub>).`],
        rubric: ['2 pkt – poprawny wynik procentowy.', '1 pkt – poprawne obliczenie obu energii kinetycznych.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'mech-kolowrot', area: 'mech', title: 'Kołowrót – bryła sztywna', gen() {
  const M = R.n(2, 10, 1), r = R.n(0.1, 0.3, 0.05), m = R.n(0.5, 3, 0.5), h = R.n(1, 3, 0.5);
  const a = m * C.g / (m + M / 2), N = m * (C.g - a), eps = a / r, t = Math.sqrt(2 * h / a);
  return {
    ctx: `Na jednorodny walec (kołowrót) o masie ${v('M')} = ${d(M)} kg i promieniu ${v('r')} = ${d(r)} m, mogący obracać się bez tarcia wokół poziomej osi, nawinięto nieważką, nierozciągliwą linkę. Do linki przywiązano ciężarek o masie ${v('m')} = ${d(m)} kg i puszczono go swobodnie. Moment bezwładności walca względem osi: ${v('I')} = ${fr('1', '2')}${v('M')}${v('r')}².`,
    parts: [
      { kind: 'num', pts: 4, q: 'Oblicz wartość przyspieszenia ciężarka. Zapisz obliczenia.', ans: a, unit: 'm/s²',
        hint: 'Dwa równania: dla ciężarka (ruch postępowy) ma = mg − N oraz dla walca (ruch obrotowy) Iε = Nr. Związek: a = εr. Wyeliminuj N i ε.',
        steps: [
          `Ciężarek – II zasada dynamiki: ${eq('ma = mg − N')}`,
          `Walec – II zasada dynamiki dla ruchu obrotowego: ${eq(`Iε = N·r,  gdzie I = ${fr('1', '2')}Mr²`)}`,
          `Linka się nie ślizga: a = εr, więc ${eq(`N = ${fr('Iε', 'r')} = ${fr('1', '2')}Ma`)}`,
          `Podstawiamy do pierwszego równania: ${eq(`ma = mg − ${fr('1', '2')}Ma → a = ${fr('mg', `m + ${fr('M', '2')}`)} ≈ <b>${fmt(a)} m/s²</b>`)}`
        ],
        rubric: ['4 pkt – poprawny wynik z jednostką.', '3 pkt – poprawne wyprowadzenie wzoru a = mg/(m + M/2) bez poprawnego wyniku.', '2 pkt – zapis obu równań dynamiki (postępowego i obrotowego).', '1 pkt – zapis jednego równania dynamiki z poprawnymi siłami/momentami.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wartość siły naciągu linki.', ans: N, unit: 'N',
        hint: 'N = m(g − a) albo N = Ma/2.', steps: [`${eq(`N = m(g − a) ≈ <b>${fmt(N)} N</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: `Oblicz czas, po jakim ciężarek opadnie o ${d(h)} m.`, ans: t, unit: 's',
        hint: 'h = at²/2.', steps: [`${eq(`t = ${sq(fr('2h', 'a'))} ≈ <b>${fmt(t)} s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

G({ id: 'mech-okrag', area: 'mech', title: 'Ruch po okręgu – zakręt', gen() {
  const r = R.n(30, 150, 10), mu = R.n(0.3, 0.8, 0.05), m = R.n(800, 1600, 100);
  const vmax = Math.sqrt(mu * C.g * r);
  return {
    ctx: `Samochód o masie ${d(m)} kg pokonuje płaski, poziomy zakręt w kształcie łuku okręgu o promieniu ${v('r')} = ${d(r)} m. Współczynnik tarcia statycznego opon o jezdnię wynosi μ = ${d(mu)}.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz maksymalną wartość prędkości, z jaką samochód może pokonać zakręt bez poślizgu. Wynik podaj w km/h. Zapisz obliczenia.', ans: vmax * 3.6, unit: 'km/h',
        hint: 'Siłą dośrodkową jest tu siła tarcia statycznego. Maksymalnie może ona wynosić μmg.',
        steps: [`Tarcie pełni rolę siły dośrodkowej: ${eq(`${fr('mv²', 'r')} ≤ μmg → v<sub>max</sub> = ${sq('μgr')}`)}`, `${eq(`v<sub>max</sub> = ${sq(`${d(mu)}·9,81·${d(r)}`)} ≈ ${fmt(vmax)} m/s ≈ <b>${fmt(vmax * 3.6)} km/h</b>`)}`],
        rubric: ['2 pkt – poprawny wynik w km/h.', '1 pkt – przyrównanie siły tarcia do siły dośrodkowej.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Jak zmieni się maksymalna prędkość bezpiecznego pokonania zakrętu, jeśli samochód będzie dwa razy cięższy (μ bez zmian)?', options: ['nie zmieni się', 'wzrośnie √2 razy', 'zmaleje √2 razy', 'zmaleje 2 razy'], correct: 0,
        steps: ['We wzorze v = √(μgr) nie ma masy – masa skraca się, bo i siła dośrodkowa, i tarcie są do niej proporcjonalne.'] },
      { kind: 'open', pts: 1, q: 'Wyjaśnij, dlaczego zakręty na torach wyścigowych buduje się z nachyloną nawierzchnią.', model: 'Na nachylonej nawierzchni składowa pozioma siły reakcji podłoża (skierowana do środka łuku) także pełni rolę siły dośrodkowej. Samochód może więc pokonać zakręt szybciej, nie polegając wyłącznie na tarciu.' }
    ]
  };
}});

G({ id: 'mech-wykres-vt', area: 'mech', title: 'Analiza wykresu v(t)', gen() {
  const v1 = R.n(4, 12, 2), t1 = R.n(2, 5, 1), t2 = t1 + R.n(2, 6, 1), t3 = t2 + R.n(2, 4, 1);
  const s = v1 * t1 / 2 + v1 * (t2 - t1) + v1 * (t3 - t2) / 2;
  const vsr = s / t3, a1 = v1 / t1, a3 = -v1 / (t3 - t2);
  return {
    ctx: `Rowerzysta ruszył z miejsca. Przez pierwsze ${t1} s rozpędzał się jednostajnie do prędkości ${v1} m/s, następnie jechał ze stałą prędkością do chwili ${t2} s, po czym hamował jednostajnie aż do zatrzymania się w chwili ${t3} s. (Narysuj sobie wykres v(t) – na maturze dostaniesz go gotowy.)`,
    svg: vtSvg([[0, 0], [t1, v1], [t2, v1], [t3, 0]], t3, v1),
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz całkowitą drogę przebytą przez rowerzystę. Zapisz obliczenia.', ans: s, unit: 'm',
        hint: 'Droga = pole pod wykresem v(t). Tu: trójkąt + prostokąt + trójkąt (czyli trapez).',
        steps: [`Pole pod wykresem to trapez: ${eq(`s = ${fr('v·t₁', '2')} + v(t₂ − t₁) + ${fr('v(t₃ − t₂)', '2')}`)}`, `${eq(`s = ${fmt(v1 * t1 / 2)} + ${fmt(v1 * (t2 - t1))} + ${fmt(v1 * (t3 - t2) / 2)} = <b>${fmt(s)} m</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna metoda (pole pod wykresem) z błędem rachunkowym.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz średnią wartość prędkości rowerzysty w całym ruchu.', ans: vsr, unit: 'm/s',
        hint: 'v_śr = całkowita droga / całkowity czas (NIE średnia arytmetyczna prędkości!).', steps: [`${eq(`v<sub>śr</sub> = ${fr('s', 't₃')} = ${fr(fmt(s), t3)} ≈ <b>${fmt(vsr)} m/s</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wartość przyspieszenia (opóźnienia) podczas hamowania.', ans: Math.abs(a3), unit: 'm/s²',
        hint: 'a = Δv/Δt – nachylenie wykresu.', steps: [`${eq(`|a| = ${fr('Δv', 'Δt')} = ${fr(v1, t3 - t2)} ≈ <b>${fmt(Math.abs(a3))} m/s²</b>`)}(dla porównania przy rozpędzaniu a = ${fmt(a1)} m/s²)`], rubric: ['1 pkt – poprawny wynik.'] }
    ]
  };
}});

function vtSvg(pts, tmax, vmax) {
  const W = 300, H = 160, px = t => 30 + t / tmax * (W - 45), py = vv => H - 25 - vv / vmax * (H - 45);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + px(p[0]).toFixed(1) + ',' + py(p[1]).toFixed(1)).join(' ');
  const ticks = pts.map(p => `<text x="${px(p[0])}" y="${H - 8}" text-anchor="middle">${p[0]}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="plot"><path d="M30,${H - 25}H${W - 8}M30,${H - 25}V10" class="ax"/><path d="${path}" class="ln"/><text x="${W - 10}" y="${H - 30}" text-anchor="end">t, s</text><text x="34" y="18">v, m/s</text><text x="24" y="${py(vmax) + 4}" text-anchor="end">${vmax}</text><path d="M30,${py(vmax)}H${px(pts[1][0])}" class="dash"/>${ticks}</svg>`;
}

G({ id: 'mech-belka', area: 'mech', title: 'Równowaga belki na dwóch podporach', gen() {
  const L = R.n(2, 6, 1), M = R.n(10, 40, 5), m = R.n(10, 60, 5), x = R.n(0.5, L - 0.5, 0.5);
  const g = C.g;
  const FB = (M * g * L / 2 + m * g * x) / L, FA = (M + m) * g - FB;
  return {
    ctx: `Jednorodna belka o długości ${v('L')} = ${d(L)} m i masie ${v('M')} = ${d(M)} kg leży poziomo na dwóch podporach A i B umieszczonych na jej końcach. W odległości ${v('x')} = ${d(x)} m od podpory A położono skrzynkę o masie ${v('m')} = ${d(m)} kg.`,
    parts: [
      { kind: 'num', pts: 3, q: 'Oblicz wartość siły, jaką podpora B działa na belkę. Zapisz obliczenia.', ans: FB, unit: 'N',
        hint: 'Warunek równowagi bryły: suma momentów sił względem dowolnej osi = 0. Wybierz oś w punkcie A – wtedy nieznana siła F_A ma moment zero.',
        steps: [`Momenty sił względem punktu A (ciężar belki działa w jej środku, L/2): ${eq(`F<sub>B</sub>·L = Mg·${fr('L', '2')} + mg·x`)}`, `${eq(`F<sub>B</sub> = ${fr(`Mg${fr('L', '2')} + mgx`, 'L')} ≈ <b>${fmt(FB)} N</b>`)}`, `Kontrola: F<sub>A</sub> = (M + m)g − F<sub>B</sub> ≈ ${fmt(FA)} N.`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawne równanie momentów sił.', '1 pkt – poprawne ramiona sił / zapis warunku równowagi.', '0 pkt – brak postępu.'] },
      { kind: 'mc', pts: 1, q: 'Skrzynkę przesuwamy w stronę podpory B. Co się dzieje z siłą nacisku belki na podporę A?', options: ['maleje', 'rośnie', 'nie zmienia się', 'najpierw rośnie, potem maleje'], correct: 0, steps: ['Im bliżej B jest skrzynka, tym większą część jej ciężaru przejmuje podpora B, a F<sub>A</sub> maleje (suma F<sub>A</sub> + F<sub>B</sub> jest stała).'] }
    ]
  };
}});

G({ id: 'mech-dzwig', area: 'mech', title: 'Praca, moc i sprawność dźwigu', gen() {
  const m = R.n(200, 900, 50), h = R.n(5, 30, 1), t = R.n(10, 60, 5), eta = R.n(60, 90, 5);
  const W = m * C.g * h, Pu = W / t, Pc = Pu / (eta / 100);
  return {
    ctx: `Dźwig podniósł ruchem jednostajnym ładunek o masie ${d(m)} kg na wysokość ${d(h)} m w czasie ${d(t)} s. Sprawność dźwigu wynosi ${eta}%.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz moc pobieraną przez silnik dźwigu. Zapisz obliczenia.', ans: Pc, unit: 'W',
        hint: 'Praca użyteczna = przyrost energii potencjalnej (mgh). Moc użyteczna = W/t. Sprawność η = P_użyteczna / P_pobierana.',
        steps: [`Moc użyteczna: ${eq(`P<sub>u</sub> = ${fr('mgh', 't')} ≈ ${fmt(Pu)} W`)}`, `Moc pobierana: ${eq(`P = ${fr('P<sub>u</sub>', 'η')} = ${fr(fmt(Pu), fmt(eta / 100))} ≈ <b>${fmt(Pc)} W</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne obliczenie mocy użytecznej (albo pracy) lub poprawne użycie sprawności.', '0 pkt – brak postępu.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań dotyczących podnoszenia ładunku ruchem jednostajnym.', statements: R.shuffle([
        { s: 'Siła naciągu liny ma taką samą wartość jak ciężar ładunku.', v: true },
        { s: 'Praca siły wypadkowej działającej na ładunek jest równa zeru.', v: true },
        { s: 'Energia kinetyczna ładunku rośnie podczas podnoszenia.', v: false },
        { s: 'Praca siły ciężkości podczas podnoszenia jest dodatnia.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'mech-poped', area: 'mech', title: 'Zmiana pędu i siła – piłka odbita od ściany', gen() {
  const m = R.n(0.2, 0.6, 0.05), v1 = R.n(5, 20, 1), v2 = R.n(3, v1, 1), dt = R.n(0.01, 0.05, 0.01);
  const F = m * (v1 + v2) / dt;
  return {
    ctx: `Piłka o masie ${d(m)} kg uderza prostopadle w ścianę z prędkością ${d(v1)} m/s i odbija się od niej z prędkością ${d(v2)} m/s. Kontakt piłki ze ścianą trwał ${d(dt)} s.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz średnią wartość siły, z jaką ściana działała na piłkę. Zapisz obliczenia.', ans: F, unit: 'N',
        hint: 'Pęd to wektor! Zmiana kierunku prędkości oznacza, że |Δv| = v₁ + v₂, a nie v₁ − v₂.',
        steps: [`Zmiana pędu (oś od ściany dodatnia): ${eq(`Δp = mv₂ − (−mv₁) = m(v₁ + v₂) = ${fmt(m * (v1 + v2))} kg·m/s`)}`, `${eq(`F = ${fr('Δp', 'Δt')} ≈ <b>${fmt(F)} N</b>`)}`],
        rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna zmiana pędu z uwzględnieniem zwrotów (albo poprawny wzór F = Δp/Δt).', '0 pkt – np. Δv = v₁ − v₂ (błąd rzeczowy).'] }
    ]
  };
}});

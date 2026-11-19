/* TERMODYNAMIKA, WŁASNOŚCI MATERII, HYDRO- I AEROSTATYKA */
'use strict';

G({ id: 'thermo-lod', area: 'thermo', title: 'Bilans cieplny – lód w wodzie', gen() {
  let mL, tL, mW, tW, T;
  do {
    mL = R.n(0.05, 0.3, 0.05); tL = -R.n(5, 20, 1); mW = R.n(0.3, 1.5, 0.1); tW = R.n(40, 90, 5);
    T = (mW * C.cw * tW - mL * C.cl * (-tL) - mL * C.Lt) / ((mW + mL) * C.cw);
  } while (T < 2);
  const Q1 = mL * C.cl * (-tL), Q2 = mL * C.Lt;
  return {
    ctx: `Do naczynia z ${d(mW)} kg wody o temperaturze ${d(tW)} °C wrzucono ${d(mL * 1000)} g lodu o temperaturze ${d(tL)} °C. Ciepło właściwe wody 4200 J/(kg·K), lodu 2100 J/(kg·K), ciepło topnienia lodu 334 kJ/kg. Pomiń wymianę ciepła z naczyniem i otoczeniem.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz ciepło potrzebne do ogrzania lodu do 0 °C i całkowitego stopienia go.', ans: Q1 + Q2, unit: 'J',
        hint: 'Dwa etapy: ogrzanie lodu (m c_l ΔT) i topnienie (m L).', steps: [`${eq(`Q = m<sub>l</sub>c<sub>l</sub>·${-tL} K + m<sub>l</sub>L = ${fmt(Q1)} + ${fmt(Q2)} ≈ <b>${fmt(Q1 + Q2)} J</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 3, q: 'Oblicz końcową temperaturę wody w naczyniu (cały lód się stopi). Zapisz obliczenia.', ans: T, unit: '°C',
        hint: 'Ciepło oddane przez ciepłą wodę = ciepło pobrane przez lód (ogrzanie + stopienie) + ciepło na ogrzanie powstałej wody od 0 °C do T.',
        steps: [
          `Bilans cieplny: ${eq('m<sub>w</sub>c<sub>w</sub>(t<sub>w</sub> − T) = m<sub>l</sub>c<sub>l</sub>(0 − t<sub>l</sub>) + m<sub>l</sub>L + m<sub>l</sub>c<sub>w</sub>(T − 0)')}`,
          `Wyznaczamy T: ${eq(`T = ${fr('m<sub>w</sub>c<sub>w</sub>t<sub>w</sub> − m<sub>l</sub>c<sub>l</sub>|t<sub>l</sub>| − m<sub>l</sub>L', '(m<sub>w</sub> + m<sub>l</sub>)c<sub>w</sub>')}`)}`,
          `${eq(`T ≈ <b>${fmt(T)} °C</b>`)}`
        ],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawny bilans cieplny ze wszystkimi składnikami.', '1 pkt – bilans z pominięciem jednego składnika (np. ogrzania wody z lodu).', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'thermo-izobara', area: 'thermo', title: 'Przemiana izobaryczna gazu doskonałego', gen() {
  const n = R.n(0.5, 3, 0.5), T1 = R.n(270, 330, 10), T2 = T1 + R.n(50, 300, 10), p = R.n(1, 3, 0.5) * 1e5;
  const V1 = n * C.R * T1 / p, V2 = n * C.R * T2 / p, W = p * (V2 - V1), dU = 1.5 * n * C.R * (T2 - T1), Q = W + dU;
  return {
    ctx: `${d(n)} mol jednoatomowego gazu doskonałego ogrzano izobarycznie pod ciśnieniem ${fmt(p)} Pa od temperatury ${d(T1)} K do ${d(T2)} K. Energia wewnętrzna gazu jednoatomowego U = (3/2)nRT, R = 8,314 J/(mol·K).`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz pracę wykonaną przez gaz.', ans: W, unit: 'J', hint: 'W przemianie izobarycznej W = pΔV = nRΔT.',
        steps: [`${eq(`W = pΔV = nRΔT = ${d(n)}·8,314·${T2 - T1} ≈ <b>${fmt(W)} J</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 2, q: 'Oblicz ciepło dostarczone do gazu. Zapisz obliczenia.', ans: Q, unit: 'J',
        hint: 'I zasada termodynamiki: Q = ΔU + W (W – praca wykonana przez gaz).',
        steps: [`${eq(`ΔU = ${fr('3', '2')}nRΔT ≈ ${fmt(dU)} J`)}`, `${eq(`Q = ΔU + W ≈ <b>${fmt(Q)} J</b>`)}(dla gazu jednoatomowego Q = (5/2)nRΔT)`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna zmiana energii wewnętrznej lub poprawny zapis I zasady.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz końcową objętość gazu (w litrach).', ans: V2 * 1000, unit: 'dm³', hint: 'pV = nRT.', steps: [`${eq(`V₂ = ${fr('nRT₂', 'p')} ≈ ${fmt(V2)} m³ = <b>${fmt(V2 * 1000)} dm³</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'tf', pts: 2, q: 'Oceń prawdziwość zdań o przemianach gazu doskonałego.', statements: R.shuffle([
        { s: 'W przemianie izotermicznej energia wewnętrzna gazu się nie zmienia.', v: true },
        { s: 'W przemianie izochorycznej gaz wykonuje pracę.', v: false },
        { s: 'W przemianie adiabatycznej gaz nie wymienia ciepła z otoczeniem.', v: true },
        { s: 'Podczas izobarycznego ogrzewania całe dostarczone ciepło zamienia się na pracę.', v: false }
      ]).slice(0, 3) }
    ]
  };
}});

G({ id: 'thermo-cykl', area: 'thermo', title: 'Cykl prostokątny na wykresie p(V)', gen() {
  const p1 = R.n(1, 2, 0.5) * 1e5, p2 = p1 + R.n(1, 3, 0.5) * 1e5, V1 = R.n(1, 3, 1) / 1000, V2 = V1 + R.n(1, 4, 1) / 1000;
  const W = (p2 - p1) * (V2 - V1);
  const Qin = 1.5 * V1 * (p2 - p1) + 2.5 * p2 * (V2 - V1);
  const eta = W / Qin;
  return {
    ctx: `Jednoatomowy gaz doskonały wykonuje cykl złożony z dwóch izochor i dwóch izobar: A(${d(V1 * 1000)} dm³; ${fmt(p1)} Pa) → B(${d(V1 * 1000)} dm³; ${fmt(p2)} Pa) → C(${d(V2 * 1000)} dm³; ${fmt(p2)} Pa) → D(${d(V2 * 1000)} dm³; ${fmt(p1)} Pa) → A.`,
    parts: [
      { kind: 'num', pts: 1, q: 'Oblicz pracę wykonaną przez gaz w jednym cyklu.', ans: W, unit: 'J', hint: 'Praca w cyklu = pole figury na wykresie p(V).', steps: [`${eq(`W = (p₂ − p₁)(V₂ − V₁) = <b>${fmt(W)} J</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 3, q: 'Oblicz sprawność tego cyklu. Zapisz obliczenia.', ans: eta * 100, unit: '%',
        hint: 'Ciepło gaz POBIERA na odcinkach, gdzie rośnie temperatura: A→B (izochora, Q = (3/2)VΔp) i B→C (izobara, Q = (5/2)pΔV). η = W/Q_pobrane.',
        steps: [`A→B (izochora): ${eq(`Q<sub>AB</sub> = ${fr('3', '2')}V₁(p₂ − p₁) ≈ ${fmt(1.5 * V1 * (p2 - p1))} J`)}`, `B→C (izobara): ${eq(`Q<sub>BC</sub> = ${fr('5', '2')}p₂(V₂ − V₁) ≈ ${fmt(2.5 * p2 * (V2 - V1))} J`)}`, `${eq(`η = ${fr('W', 'Q<sub>AB</sub> + Q<sub>BC</sub>')} ≈ <b>${fmt(eta * 100)}%</b>`)}`],
        rubric: ['3 pkt – poprawny wynik.', '2 pkt – poprawne obliczenie ciepła pobranego.', '1 pkt – poprawne wskazanie etapów pobierania ciepła lub poprawne ciepło na jednym etapie.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'thermo-carnot', area: 'thermo', title: 'Silnik Carnota i pompa ciepła', gen() {
  const Tc = R.n(270, 300, 5), Th = R.n(320, 700, 20), Q = R.n(500, 5000, 500);
  const eta = 1 - Tc / Th, COP = Th / (Th - Tc), Pin = R.n(0.5, 3, 0.5);
  return {
    ctx: `Silnik cieplny pracuje między źródłem ciepła o temperaturze ${d(Th)} K a chłodnicą o temperaturze ${d(Tc)} K. W jednym cyklu pobiera ${d(Q)} J ciepła.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz maksymalną (teoretyczną) pracę, jaką silnik może wykonać w jednym cyklu. Zapisz obliczenia.', ans: eta * Q, unit: 'J',
        hint: 'Sprawność silnika Carnota η = 1 − T_ch/T_g, a W = ηQ.',
        steps: [`${eq(`η<sub>max</sub> = 1 − ${fr('T<sub>ch</sub>', 'T<sub>g</sub>')} ≈ ${fmt(eta * 100)}%`)}`, `${eq(`W = ηQ ≈ <b>${fmt(eta * Q)} J</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawna sprawność maksymalna.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 2, q: `Ten sam układ temperatur wykorzystano w idealnej pompie ciepła ogrzewającej dom (ciepło oddawane w temperaturze ${d(Th)} K). Silnik pompy pobiera moc ${d(Pin)} kW. Oblicz maksymalną moc grzewczą pompy (w kW).`, ans: COP * Pin, unit: 'kW',
        hint: 'Współczynnik wydajności grzewczej idealnej pompy: COP = T_g/(T_g − T_ch) = Q_oddane/W.',
        steps: [`${eq(`COP = ${fr('T<sub>g</sub>', 'T<sub>g</sub> − T<sub>ch</sub>')} ≈ ${fmt(COP)}`)}`, `${eq(`P<sub>grz</sub> = COP·P ≈ <b>${fmt(COP * Pin)} kW</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny COP.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'thermo-plywanie', area: 'thermo', title: 'Prawo Archimedesa – ciało pływające', gen() {
  const rhoC = R.n(400, 950, 50), rhoL = R.pick([{ n: 'wodzie', r: 1000 }, { n: 'wodzie morskiej', r: 1030 }, { n: 'glicerynie', r: 1260 }]);
  const a = R.n(5, 20, 1) / 100;
  const frac = rhoC / rhoL.r, h = frac * a, Fw = rhoL.r * C.g * a * a * a;
  return {
    ctx: `Sześcian o krawędzi ${d(a * 100)} cm wykonany z materiału o gęstości ${d(rhoC)} kg/m³ pływa w ${rhoL.n} o gęstości ${rhoL.r} kg/m³.`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz głębokość zanurzenia sześcianu (w cm). Zapisz obliczenia.', ans: h * 100, unit: 'cm',
        hint: 'Ciało pływa → siła wyporu = ciężar. ρ_c·a³·g = ρ_ciecz·a²·h·g.',
        steps: [`Warunek pływania: ${eq('F<sub>wyp</sub> = mg → ρ<sub>ciecz</sub>·a²h·g = ρ<sub>c</sub>·a³·g')}`, `${eq(`h = a·${fr('ρ<sub>c</sub>', 'ρ<sub>ciecz</sub>')} ≈ <b>${fmt(h * 100)} cm</b>`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawny warunek równowagi.', '0 pkt – brak postępu.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wartość siły potrzebnej do całkowitego zanurzenia sześcianu (i utrzymania go pod powierzchnią).', ans: Fw - rhoC * a ** 3 * C.g, unit: 'N',
        hint: 'F = F_wyp(całkowite) − mg.', steps: [`${eq(`F = (ρ<sub>ciecz</sub> − ρ<sub>c</sub>)a³g ≈ <b>${fmt(Fw - rhoC * a ** 3 * C.g)} N</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'mc', pts: 1, q: 'Sześcian przeniesiono z wody słodkiej do morskiej. Głębokość zanurzenia:', options: ['zmaleje', 'wzrośnie', 'nie zmieni się', 'zależy od masy sześcianu'], correct: 0, steps: ['Większa gęstość cieczy → do zrównoważenia tego samego ciężaru wystarczy mniejsza objętość zanurzona.'] }
    ]
  };
}});

G({ id: 'thermo-grzalka', area: 'thermo', title: 'Czajnik elektryczny – moc i sprawność', gen() {
  const P = R.n(1000, 2400, 200), m = R.n(0.5, 1.7, 0.1), t1 = R.n(10, 25, 1), eta = R.n(70, 95, 5);
  const Q = m * C.cw * (100 - t1), t = Q / (P * eta / 100);
  return {
    ctx: `Czajnik o mocy ${d(P)} W zagotował ${d(m)} kg wody o temperaturze początkowej ${d(t1)} °C. Sprawność czajnika wynosi ${eta}%. c<sub>w</sub> = 4200 J/(kg·K).`,
    parts: [
      { kind: 'num', pts: 2, q: 'Oblicz czas potrzebny do zagotowania wody. Zapisz obliczenia.', ans: t, unit: 's',
        hint: 'Ciepło użyteczne Q = mcΔT. Sprawność: η = Q/(Pt) → t = Q/(ηP).',
        steps: [`${eq(`Q = mc<sub>w</sub>(100 − ${d(t1)}) ≈ ${fmt(Q)} J`)}`, `${eq(`t = ${fr('Q', 'ηP')} ≈ <b>${fmt(t)} s</b> (≈ ${fmt(t / 60)} min)`)}`], rubric: ['2 pkt – poprawny wynik.', '1 pkt – poprawne ciepło lub poprawne użycie sprawności.', '0 pkt – brak postępu.'] }
    ]
  };
}});

G({ id: 'thermo-cisnienie', area: 'thermo', title: 'Ciśnienie hydrostatyczne i barometr', gen() {
  const h = R.n(2, 40, 1), p0 = R.n(980, 1030, 5) * 100;
  const p = p0 + 1000 * C.g * h, hHg = p0 / (13600 * C.g);
  return {
    ctx: `Ciśnienie atmosferyczne wynosi ${fmt(p0 / 100, 4)} hPa. Gęstość wody 1000 kg/m³, gęstość rtęci 13 600 kg/m³.`,
    parts: [
      { kind: 'num', pts: 1, q: `Oblicz ciśnienie całkowite na głębokości ${h} m pod powierzchnią jeziora (w kPa).`, ans: p / 1000, unit: 'kPa', hint: 'p = p₀ + ρgh.',
        steps: [`${eq(`p = p₀ + ρgh ≈ ${fmt(p0)} + ${fmt(1000 * C.g * h)} ≈ <b>${fmt(p / 1000)} kPa</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'num', pts: 1, q: 'Oblicz wysokość słupa rtęci w barometrze Torricellego przy tym ciśnieniu (w mm).', ans: hHg * 1000, unit: 'mm', hint: 'p₀ = ρ_Hg·g·h.',
        steps: [`${eq(`h = ${fr('p₀', 'ρ<sub>Hg</sub>g')} ≈ <b>${fmt(hHg * 1000)} mm</b>`)}`], rubric: ['1 pkt – poprawny wynik.'] },
      { kind: 'open', pts: 1, q: 'Wyjaśnij, dlaczego w barometrze stosuje się rtęć, a nie wodę.', model: 'Rtęć ma ok. 13,6 razy większą gęstość niż woda, więc słup równoważący ciśnienie atmosferyczne ma ok. 76 cm, a w przypadku wody miałby ponad 10 m – barometr byłby niepraktyczny.' }
    ]
  };
}});

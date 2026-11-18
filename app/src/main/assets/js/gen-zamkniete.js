/* ZADANIA ZAMKNIĘTE: UZUPEŁNIANIE ZDAŃ I DOBIERANIE (jak w arkuszach CKE) */
'use strict';

const RMN = ['rośnie', 'maleje', 'nie zmienia się'];

const FILL_BANK = {
  mech: [
    { t: 'Podczas swobodnego spadku (bez oporu powietrza) energia potencjalna ciała {0}, energia kinetyczna {1}, a energia mechaniczna {2}.', g: [RMN, RMN, RMN], c: [1, 0, 2], e: 'Energia potencjalna zamienia się na kinetyczną, a ich suma jest stała.' },
    { t: 'W zderzeniu niesprężystym dwóch wózków (bez sił zewnętrznych) pęd układu {0}, a energia kinetyczna układu {1}.', g: [RMN, RMN], c: [2, 1], e: 'Pęd jest zachowany zawsze w układzie izolowanym, energia kinetyczna – tylko w zderzeniu sprężystym.' },
    { t: 'Gdy obracająca się łyżwiarka przyciąga ręce, jej moment bezwładności {0}, moment pędu {1}, a prędkość kątowa {2}.', g: [RMN, RMN, RMN], c: [1, 2, 0], e: 'L = Iω = const; mniejsze I → większe ω.' },
    { t: 'Siła dośrodkowa działająca na ciało w jednostajnym ruchu po okręgu {0} pracy, ponieważ jest {1} do prędkości.', g: [['wykonuje', 'nie wykonuje'], ['równoległa', 'prostopadła']], c: [1, 1], e: 'W = Fs cos 90° = 0 – zmienia się tylko kierunek prędkości.' },
    { t: 'Klocek zsuwa się z równi ruchem jednostajnym. Siła wypadkowa działająca na klocek jest {0}, a siła tarcia ma wartość {1} składowej ciężaru równoległej do równi.', g: [['równa zeru', 'skierowana w dół równi'], ['większą od', 'równą', 'mniejszą od']], c: [0, 1], e: 'Ruch jednostajny prostoliniowy → siły się równoważą (I zasada dynamiki).' },
    { t: 'Na pasażera hamującego autobusu działa w układzie autobusu siła bezwładności skierowana {0}. W układzie związanym z ziemią pasażer {1}.', g: [['do przodu', 'do tyłu', 'w dół'], ['porusza się dalej z dotychczasową prędkością, dopóki nie zadziała na niego siła', 'zostaje pchnięty do przodu przez siłę']], c: [0, 0], e: 'W układzie nieinercjalnym (hamujący autobus) pojawia się siła bezwładności −ma; w układzie inercjalnym wyjaśnia to I zasada dynamiki.' }
  ],
  grav: [
    { t: 'Gdy satelita przechodzi na wyższą orbitę kołową, jego prędkość {0}, okres obiegu {1}, a energia całkowita {2}.', g: [RMN, RMN, RMN], c: [1, 0, 0], e: 'v = √(GM/r) maleje, T rośnie (III prawo Keplera), E = −GMm/(2r) rośnie (jest mniej ujemna).' },
    { t: 'Planeta na orbicie eliptycznej porusza się najszybciej w {0}. Wynika to z zasady zachowania {1}.', g: [['peryhelium', 'aphelium'], ['momentu pędu', 'pędu', 'energii kinetycznej']], c: [0, 0], e: 'II prawo Keplera – zachowanie momentu pędu: mvr = const.' },
    { t: 'Im dalej znajduje się galaktyka, tym {0} jest prędkość jej oddalania się i tym {1} jest przesunięcie jej linii widmowych ku czerwieni.', g: [['większa', 'mniejsza'], ['większe', 'mniejsze']], c: [0, 0], e: 'Prawo Hubble’a v = H₀d; z ≈ v/c.' },
    { t: 'Gorętsza gwiazda ma maksimum promieniowania przy {0} długości fali i świeci barwą bardziej {1}.', g: [['krótszej', 'dłuższej'], ['niebieską', 'czerwoną']], c: [0, 0], e: 'Prawo Wiena: λ<sub>max</sub> = b/T.' },
    { t: 'Przyspieszenie grawitacyjne na wysokości równej promieniowi Ziemi jest {0} niż na powierzchni. Astronauta na orbicie jest w stanie nieważkości, ponieważ {1}.', g: [['4 razy mniejsze', '2 razy mniejsze', 'takie samo'], ['spada swobodnie razem ze statkiem', 'nie działa na niego grawitacja']], c: [0, 0], e: 'g ∝ 1/r²; w nieważkości grawitacja działa, ale wszystko spada z tym samym przyspieszeniem.' }
  ],
  wave: [
    { t: 'Gdy fala dźwiękowa przechodzi z powietrza do wody, jej częstotliwość {0}, prędkość {1}, a długość fali {2}.', g: [RMN, RMN, RMN], c: [2, 0, 0], e: 'Częstotliwość narzuca źródło; dźwięk w wodzie jest szybszy (~1500 m/s), więc λ = v/f rośnie.' },
    { t: 'Gdy światło przechodzi z powietrza do szkła, jego prędkość {0}, a promień załamuje się {1} normalnej.', g: [RMN, ['w stronę', 'od']], c: [1, 0], e: 'v = c/n; przy przejściu do ośrodka gęstszego optycznie kąt załamania jest mniejszy od kąta padania.' },
    { t: 'Okres wahadła matematycznego {0} od masy ciężarka i {1} ze wzrostem długości nici.', g: [['nie zależy', 'zależy'], RMN], c: [0, 0], e: 'T = 2π√(l/g).' },
    { t: 'Gdy źródło dźwięku zbliża się do nieruchomego obserwatora, słyszana częstotliwość jest {0} od częstotliwości źródła, a długość fali docierającej do obserwatora jest {1}.', g: [['większa', 'mniejsza'], ['mniejsza', 'większa']], c: [0, 0], e: 'Efekt Dopplera: fale „ściskają się” przed źródłem.' },
    { t: 'Zjawisko polaryzacji dowodzi, że światło jest falą {0}. Przez dwa polaryzatory ustawione prostopadle światło {1}.', g: [['poprzeczną', 'podłużną'], ['nie przechodzi', 'przechodzi bez osłabienia']], c: [0, 0], e: 'Polaryzacja możliwa tylko dla fal poprzecznych; I = I₀cos²90° = 0.' },
    { t: 'W drganiach tłumionych amplituda {0}, a okres drgań {1}. Rezonans zachodzi, gdy częstotliwość siły wymuszającej jest {2} częstotliwości drgań własnych.', g: [RMN, ['praktycznie się nie zmienia', 'rośnie wraz z amplitudą'], ['równa', 'dwa razy większa od', 'znacznie mniejsza od']], c: [1, 0, 0], e: 'Energia drgań zamienia się na ciepło (tarcie, opór); przy słabym tłumieniu okres jest prawie stały.' },
    { t: 'Natężenie fali wysyłanej przez punktowe źródło we wszystkich kierunkach jest odwrotnie proporcjonalne do {0}. Gdy odległość od źródła wzrośnie dwukrotnie, amplituda fali {1}.', g: [['kwadratu odległości', 'odległości', 'sześcianu odległości'], ['zmaleje dwukrotnie', 'zmaleje czterokrotnie', 'nie zmieni się']], c: [0, 0], e: 'I = P/(4πr²) oraz I ∝ A², więc A ∝ 1/r.' }
  ],
  elec: [
    { t: 'Naładowany kondensator odłączono od źródła i rozsunięto jego okładki. Ładunek na okładkach {0}, pojemność {1}, a napięcie {2}.', g: [RMN, RMN, RMN], c: [2, 1, 0], e: 'Q = const (odłączony), C ∝ 1/d maleje, U = Q/C rośnie.' },
    { t: 'Ze wzrostem temperatury opór metalu {0}, a opór półprzewodnika {1}.', g: [RMN, RMN], c: [0, 1], e: 'W metalu rosną drgania sieci (więcej zderzeń), w półprzewodniku przybywa nośników ładunku.' },
    { t: 'Gdy magnes zbliżamy do zwojnicy, płynący w niej prąd indukcyjny wytwarza pole magnetyczne, które {0} magnes. Wynika to z reguły {1}.', g: [['odpycha', 'przyciąga'], ['Lenza', 'Ohma', 'Kirchhoffa']], c: [0, 0], e: 'Prąd indukcyjny przeciwdziała przyczynie, która go wywołała.' },
    { t: 'Wewnątrz naładowanego metalowego przewodnika (w równowadze) natężenie pola elektrycznego jest {0}, a nadmiarowy ładunek gromadzi się {1}.', g: [['równe zeru', 'największe'], ['na powierzchni', 'w środku']], c: [0, 0], e: 'Klatka Faradaya.' },
    { t: 'W transformatorze obniżającym napięcie uzwojenie wtórne ma {0} zwojów niż pierwotne, a natężenie prądu w uzwojeniu wtórnym jest {1} niż w pierwotnym.', g: [['mniej', 'więcej'], ['większe', 'mniejsze']], c: [0, 0], e: 'U₂/U₁ = N₂/N₁, a moc jest (w idealnym) zachowana.' },
    { t: 'Suma natężeń prądów wpływających do węzła jest {0} sumie natężeń prądów z niego wypływających. To prawo wynika z zasady zachowania {1}.', g: [['równa', 'większa od', 'mniejsza od'], ['ładunku', 'energii', 'pędu']], c: [0, 0], e: 'I prawo Kirchhoffa – ładunek nie gromadzi się w węźle.' }
  ],
  thermo: [
    { t: 'Podczas izotermicznego sprężania gazu doskonałego jego energia wewnętrzna {0}, a gaz {1} ciepło.', g: [RMN, ['oddaje', 'pobiera']], c: [2, 0], e: 'T = const → ΔU = 0, więc ciepło oddane = praca wykonana nad gazem.' },
    { t: 'Podczas adiabatycznego rozprężania gaz wykonuje pracę, a jego temperatura {0}.', g: [RMN], c: [1], e: 'Q = 0 → ΔU = −W < 0.' },
    { t: 'Ciepło molowe gazu przy stałym ciśnieniu jest {0} od ciepła molowego przy stałej objętości, ponieważ przy stałym ciśnieniu gaz {1}.', g: [['większe', 'mniejsze', 'równe'], ['wykonuje pracę', 'nie wykonuje pracy']], c: [0, 0], e: 'C<sub>p</sub> = C<sub>v</sub> + R: część ciepła idzie na pracę rozprężania.' },
    { t: 'Ciało pływa częściowo zanurzone, gdy jego średnia gęstość jest {0} od gęstości cieczy. Siła wyporu jest wtedy {1} ciężarowi ciała.', g: [['mniejsza', 'większa'], ['równa', 'większa od', 'mniejsza od']], c: [0, 0], e: 'Równowaga: F<sub>w</sub> = mg.' },
    { t: 'Ciepło przepływa samorzutnie od ciała o {0} temperaturze do ciała o {1} temperaturze. Rozbicie szklanki jest przykładem procesu {2}.', g: [['wyższej', 'niższej'], ['niższej', 'wyższej'], ['nieodwracalnego', 'odwracalnego']], c: [0, 0, 0], e: 'II zasada termodynamiki; procesy rzeczywiste są nieodwracalne.' },
    { t: 'W naczyniach połączonych wypełnionych jedną cieczą poziom cieczy jest {0}. Ciśnienie hydrostatyczne na dnie naczynia {1} od jego kształtu.', g: [['taki sam', 'wyższy w węższym ramieniu'], ['nie zależy', 'zależy']], c: [0, 0], e: 'p = ρgh zależy tylko od głębokości.' }
  ],
  atom: [
    { t: 'W rozpadzie β⁻ liczba masowa jądra {0}, a liczba atomowa {1}.', g: [['nie zmienia się', 'maleje o 4', 'rośnie o 1'], ['rośnie o 1', 'maleje o 1', 'nie zmienia się', 'maleje o 2']], c: [0, 0], e: 'n → p + e⁻ + ν̄: A bez zmian, Z + 1.' },
    { t: 'Zwiększenie natężenia światła (przy stałej częstotliwości) w zjawisku fotoelektrycznym {0} liczbę emitowanych elektronów i {1} ich maksymalnej energii kinetycznej.', g: [['zwiększa', 'nie zmienia'], ['nie zmienia', 'zwiększa']], c: [0, 0], e: 'Więcej fotonów, ale każdy ma tę samą energię hf.' },
    { t: 'Długość fali de Broglie’a cząstki jest tym {0}, im {1} jest jej pęd.', g: [['mniejsza', 'większa'], ['większy', 'mniejszy']], c: [0, 0], e: 'λ = h/p.' },
    { t: 'Masa jądra atomowego jest {0} od sumy mas tworzących je nukleonów, a różnica ta odpowiada energii {1}.', g: [['mniejsza', 'większa', 'równa'], ['wiązania', 'kinetycznej', 'jonizacji']], c: [0, 0], e: 'Defekt masy: E<sub>w</sub> = Δmc².' },
    { t: 'Po upływie trzech okresów połowicznego rozpadu w próbce pozostaje {0} początkowej liczby jąder, a aktywność próbki {1}.', g: [['1/8', '1/3', '1/6', '0'], ['zmalała 8 razy', 'się nie zmieniła', 'zmalała 3 razy']], c: [0, 0], e: '(1/2)³ = 1/8; A = λN.' },
    { t: 'Gdy elektron w atomie wodoru przechodzi z wyższej orbity na niższą, atom {0} foton, a energia elektronu {1}.', g: [['emituje', 'pochłania'], RMN], c: [0, 1], e: 'E<sub>foton</sub> = E<sub>m</sub> − E<sub>n</sub> > 0.' },
    { t: 'Energia spoczynkowa ciała jest {0} do jego masy. Gdy cząstka się porusza, jej energia całkowita jest {1} od energii spoczynkowej.', g: [['proporcjonalna', 'odwrotnie proporcjonalna'], ['większa', 'równa', 'mniejsza']], c: [0, 0], e: 'E₀ = mc², E = γmc², γ ≥ 1.' }
  ]
};

const MATCH_BANK = {
  thermo: [{ q: 'Dobierz do każdej przemiany gazu doskonałego jej właściwość (A–D).', items: ['izotermiczna', 'izobaryczna', 'izochoryczna', 'adiabatyczna'], opts: ['gaz nie wymienia ciepła z otoczeniem', 'gaz nie wykonuje pracy', 'energia wewnętrzna gazu się nie zmienia', 'praca gazu jest równa pΔV'], c: [2, 3, 1, 0], e: 'T = const → ΔU = 0; p = const → W = pΔV; V = const → W = 0; Q = 0 – adiabata.' }],
  wave: [
    { q: 'Dobierz do rodzaju promieniowania elektromagnetycznego przykład zastosowania (A–F).', items: ['fale radiowe', 'mikrofale', 'podczerwień', 'nadfiolet', 'promieniowanie rentgenowskie', 'promieniowanie γ'], opts: ['radio i telewizja', 'kuchenka mikrofalowa, radar', 'kamera termowizyjna, pilot do TV', 'sterylizacja, lampy do opalania', 'prześwietlanie kości', 'radioterapia nowotworów, emisja przy przemianach jądrowych'], c: [0, 1, 2, 3, 4, 5], e: 'Kolejność od najdłuższych do najkrótszych fal: radiowe, mikrofale, podczerwień, światło widzialne, nadfiolet, X, γ.' },
    { q: 'Dobierz do położenia przedmiotu (soczewka skupiająca o ogniskowej f) cechy obrazu (A–D).', items: ['x > 2f', 'x = 2f', 'f < x < 2f', 'x < f'], opts: ['rzeczywisty, odwrócony, pomniejszony', 'rzeczywisty, odwrócony, tej samej wielkości', 'rzeczywisty, odwrócony, powiększony', 'pozorny, prosty, powiększony'], c: [0, 1, 2, 3], e: 'Z równania soczewki: x = 2f daje y = 2f (p = 1), x < f daje y < 0 (obraz pozorny).' }
  ],
  atom: [
    { q: 'Dobierz do rodzaju przemiany jądrowej zmianę liczby masowej A i atomowej Z (A–D).', items: ['rozpad α', 'rozpad β⁻', 'rozpad β⁺', 'emisja γ'], opts: ['A maleje o 4, Z maleje o 2', 'A bez zmian, Z rośnie o 1', 'A bez zmian, Z maleje o 1', 'A i Z bez zmian'], c: [0, 1, 2, 3], e: 'α = ⁴₂He; β⁻: n → p; β⁺: p → n; γ – tylko energia.' },
    { q: 'Dobierz do zjawiska wniosek, który z niego wynika (A–E).', items: ['zjawisko fotoelektryczne', 'dyfrakcja elektronów na krysztale', 'przesunięcie ku czerwieni widm galaktyk', 'liniowe widmo wodoru', 'mikrofalowe promieniowanie tła'], opts: ['światło ma naturę kwantową (fotony)', 'cząstki mają własności falowe', 'Wszechświat się rozszerza', 'energia elektronu w atomie jest skwantowana', 'Wszechświat był kiedyś gorący i gęsty'], c: [0, 1, 2, 3, 4], e: 'To klasyczne dowody fizyki XX wieku – warto je znać na pamięć.' }
  ],
  elec: [{ q: 'Dobierz do wielkości fizycznej jej jednostkę (A–E).', items: ['indukcja magnetyczna', 'strumień magnetyczny', 'pojemność elektryczna', 'opór właściwy', 'natężenie pola elektrycznego'], opts: ['T (tesla)', 'Wb (weber)', 'F (farad)', 'Ω·m', 'V/m'], c: [0, 1, 2, 3, 4], e: 'Wb = T·m², F = C/V, V/m = N/C.' }],
  mech: [{ q: 'Dobierz do sytuacji prawo, które ją najlepiej wyjaśnia (A–D).', items: ['odrzut armaty po wystrzale', 'pasażer „leci” do przodu, gdy autobus gwałtownie hamuje', 'wiosło odpycha wodę do tyłu, a łódź płynie do przodu', 'ta sama siła nadaje lżejszemu wózkowi większe przyspieszenie'], opts: ['zasada zachowania pędu', 'I zasada dynamiki (bezwładność)', 'III zasada dynamiki', 'II zasada dynamiki'], c: [0, 1, 2, 3], e: 'Odrzut – pęd układu = 0 przed i po; bezwładność; akcja–reakcja; a = F/m.' }],
  grav: [{ q: 'Dobierz do prawa Keplera jego treść (A–C).', items: ['I prawo Keplera', 'II prawo Keplera', 'III prawo Keplera'], opts: ['orbity planet są elipsami, a Słońce jest w jednym z ognisk', 'promień wodzący planety zakreśla równe pola w równych odstępach czasu', 'T²/a³ jest takie samo dla wszystkich planet Układu Słonecznego'], c: [0, 1, 2], e: 'II prawo wynika z zachowania momentu pędu, III – z prawa powszechnego ciążenia.' }]
};

function fillPart(tpl) {
  const n = tpl.g.length;
  return { kind: 'fill', pts: n >= 2 ? 2 : 1, q: 'Uzupełnij zdania – wybierz właściwe określenia.', text: tpl.t, gaps: tpl.g, correct: tpl.c, steps: [tpl.e] };
}
function matchPart(m, k) {
  const idx = R.sample(m.items.map((_, i) => i), Math.min(k, m.items.length)).sort((a, b) => a - b);
  const order = R.shuffle(m.opts.map((_, i) => i));
  return { kind: 'match', pts: 2, q: m.q, items: idx.map(i => m.items[i]), options: order.map(i => m.opts[i]), correct: idx.map(i => order.indexOf(m.c[i])), steps: [m.e] };
}

AREAS.forEach(a => {
  G({ id: `${a.id}-uzupelnij`, area: a.id, title: 'Uzupełnij zdania (zadanie zamknięte)', gen() {
    const tpls = R.sample(FILL_BANK[a.id], 2);
    return { ctx: 'Zadanie zamknięte jak w arkuszu CKE: w każdym zdaniu wybierz właściwe określenia.', parts: tpls.map(fillPart) };
  }});
  G({ id: `${a.id}-dobierz`, area: a.id, title: 'Dobieranie (zadanie zamknięte)', gen() {
    const m = R.pick(MATCH_BANK[a.id]);
    return { ctx: 'Zadanie na dobieranie: do każdego elementu z listy 1., 2., … przyporządkuj jedną odpowiedź spośród A, B, C… (niektóre mogą zostać niewykorzystane).', parts: [matchPart(m, 4), fillPart(R.pick(FILL_BANK[a.id]))] };
  }});
});

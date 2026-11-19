/* TEORIA – wytłumaczenie każdego działu */
'use strict';

const F = s => `<div class="eq">${s}</div>`;
const TIP = s => `<div class="tip"><b>Na maturze:</b> ${s}</div>`;
const ERR = s => `<div class="warn"><b>Typowy błąd:</b> ${s}</div>`;

const THEORY = {
howto: { title: 'Jak rozwiązywać zadania maturalne', sections: [
  { t: 'Jak wygląda arkusz', b: `
    <p>Egzamin trwa <b>180 minut</b>, w arkuszu jest <b>25–35 zadań</b> za łącznie <b>60 punktów</b>. Większość punktów to zadania otwarte (obliczenia, wyprowadzenia, uzasadnienia, wykresy), a zwykle kilkanaście procent – zamknięte (wybór, prawda/fałsz, dobieranie).</p>
    <p>Zadania są często zebrane w <b>wiązki</b>: jeden opis doświadczenia lub zjawiska i 2–4 polecenia do niego. Każde polecenie z wiązki da się rozwiązać niezależnie – jeśli utkniesz w pierwszym, rób dalej.</p>
    <p>Masz do dyspozycji <b>kartę wzorów</b>, linijkę i kalkulator prosty (z pierwiastkiem). Nie musisz uczyć się wzorów na pamięć – musisz wiedzieć, <i>kiedy</i> którego użyć.</p>` },
  { t: 'Jak przyznawane są punkty', b: `
    <p>W zadaniach obliczeniowych za 3–4 pkt egzaminator dzieli rozwiązanie na etapy:</p>
    <ul><li><b>niewielki postęp</b> – np. poprawnie zapisane prawo, od którego trzeba zacząć,</li>
    <li><b>istotny postęp</b> – np. dwa potrzebne równania,</li>
    <li><b>pokonanie zasadniczych trudności</b> – poprawny wzór końcowy (za to jest co najmniej połowa punktów!),</li>
    <li><b>pełne rozwiązanie</b> – poprawny wynik z jednostką.</li></ul>
    ${TIP('nawet jeśli nie umiesz dokończyć, zapisz prawo fizyczne i równania – to realne punkty. Pusta kartka = 0 pkt.')}
    <p>Każda poprawna metoda jest akceptowana, także inna niż w kluczu.</p>` },
  { t: 'Schemat rozwiązywania (5 kroków)', b: `
    <ol><li><b>Dane i szukane</b> – wypisz z jednostkami, od razu zamień na SI (cm → m, g → kg, μC → C, eV → J).</li>
    <li><b>Rysunek</b> – siły, wektory prędkości, bieg promieni, schemat obwodu. Połowa błędów to zły zwrot wektora.</li>
    <li><b>Model / prawo</b> – zapisz słownie, z czego korzystasz: „Z zasady zachowania energii…”, „Siła grawitacji pełni rolę siły dośrodkowej…”.</li>
    <li><b>Przekształcenie na symbolach</b> – wyznacz szukaną wielkość, zanim podstawisz liczby. Łatwiej o kontrolę i o punkty za etap.</li>
    <li><b>Liczby, wynik, jednostka, sens</b> – czy wynik jest rozsądny? Samochód nie jedzie 3000 km/h.</li></ol>
    ${ERR('brak jednostki przy wyniku albo niepoprawne zaokrąglenie – wynik podawaj z 2–3 cyframi znaczącymi, tak jak dane.')}` },
  { t: 'Polecenia – co dokładnie znaczą', b: `
    <ul><li><b>„Oblicz… Zapisz obliczenia”</b> – sam wynik nie wystarczy, musi być widoczny tok.</li>
    <li><b>„Wykaż, że…”</b> – wynik znasz; punktowana jest droga. Dojdź do podanej wartości (np. 6,75 m/s) z obliczeń.</li>
    <li><b>„Wyprowadź wzór”</b> – wynik na symbolach, bez liczb.</li>
    <li><b>„Uzasadnij / wyjaśnij”</b> – powołaj się na prawo fizyczne lub zależność („ponieważ siła Lorentza jest prostopadła do prędkości, nie wykonuje pracy…”).</li>
    <li><b>„Zaplanuj doświadczenie”</b> – co mierzysz, czym, jak liczysz wynik i jak zmniejszyć niepewność (wiele pomiarów, pomiar wielu okresów naraz, wykres).</li>
    <li><b>„Narysuj / zaznacz”</b> – rysuj ołówkiem i linijką: wektory sił (z punktem przyłożenia i właściwą długością), bieg promieni, linie pola, wykres z punktów pomiarowych. Tego aplikacja nie sprawdzi – ćwicz na kartce i porównuj z rozwiązaniem.</li>
    <li><b>„Oszacuj”</b> – wystarczy rząd wielkości, ale pokaż założenia.</li></ul>` },
  { t: 'Niepewności pomiarowe i wykresy', b: `
    <p>Niepewność pomiaru bezpośredniego to zwykle najmniejsza działka przyrządu. Dla wielkości liczonej z kilku pomiarów stosuje się metodę najmniej korzystnego przypadku albo niepewność względną (δx = Δx/x): dla iloczynu/ilorazu niepewności względne się <b>sumują</b>.</p>
    ${F('δ(xy) = δ(x/y) = δx + δy,   δ(x²) = 2δx     (δ – niepewność względna)')}
    <p>Wykres: podpisane osie z jednostkami, punkty pomiarowe zaznaczone wyraźnie, prosta (lub krzywa) <b>poprowadzona między punktami</b>, a nie łącząca je łamaną. Nachylenie prostej odczytuj z dwóch odległych punktów prostej, nie z punktów pomiarowych.</p>
    ${TIP('linearyzacja – jeśli T = 2π√(l/g), to wykres T² od l jest prostą o nachyleniu 4π²/g. Więcej w dziale „Doświadczenia i niepewności”.')}` }
]},

mech: { title: 'Mechanika punktu materialnego i bryły sztywnej', sections: [
  { t: 'Kinematyka – opis ruchu', b: `
    <p>Położenie, przemieszczenie, prędkość i przyspieszenie to <b>wektory</b>. Prędkość to tempo zmiany położenia, przyspieszenie – tempo zmiany prędkości.</p>
    <p><b>Ruch jednostajnie zmienny</b> (a = const):</p>
    ${F('v = v₀ + at,   s = v₀t + ½at²,   v² = v₀² + 2as')}
    <p><b>Wykres v(t)</b>: nachylenie = przyspieszenie, pole pod wykresem (ze znakiem) = przemieszczenie. Gdy ciało nie zmienia kierunku ruchu, to także droga; gdy zawraca, drogę liczysz jako sumę pól bez znaków. <b>Wykres a(t)</b>: pole = zmiana prędkości.</p>
    <p><b>Rzut poziomy i ukośny</b> – składasz dwa niezależne ruchy: w poziomie jednostajny (v<sub>x</sub> = const), w pionie jednostajnie przyspieszony z przyspieszeniem g. Wspólny jest tylko czas.</p>
    <p><b>Ruch po okręgu</b>: v = 2πr/T = ωr, przyspieszenie dośrodkowe a = v²/r = ω²r, skierowane do środka.</p>
    ${ERR('średnia prędkość to całkowita droga / całkowity czas, a nie średnia arytmetyczna prędkości.')}` },
  { t: 'Dynamika – zasady Newtona', b: `
    <p><b>I zasada</b>: gdy siły się równoważą, ciało spoczywa lub porusza się jednostajnie prostoliniowo (w układzie inercjalnym).</p>
    <p><b>II zasada</b>: siła wypadkowa nadaje przyspieszenie ${F('F<sub>wyp</sub> = ma   lub ogólniej   F<sub>wyp</sub> = Δp/Δt')}
    Druga postać (przez pęd) jest bardzo częsta na maturze – zderzenia, odbicia, krótkotrwałe siły.</p>
    <p><b>III zasada</b>: siły akcji i reakcji mają równe wartości, przeciwne zwroty i działają na <b>różne</b> ciała (dlatego się nie znoszą).</p>
    <p><b>Siły, które musisz umieć narysować</b>: ciężar mg (pionowo w dół), reakcja podłoża N (prostopadle do podłoża), tarcie T = μN (przeciwnie do ruchu lub tendencji ruchu), naciąg nici, siła sprężystości F = kx.</p>
    <p><b>Równia pochyła</b>: rozkładasz ciężar na mg sin α (wzdłuż równi) i mg cos α (prostopadle). Wtedy N = mg cos α.</p>
    <p><b>Ruch po okręgu</b>: siła dośrodkowa to nie nowa siła, tylko <i>wypadkowa</i> sił rzeczywistych (tarcie, naciąg, grawitacja…) skierowana do środka: F = mv²/r.</p>
    ${TIP('zawsze pisz, która siła pełni rolę siły dośrodkowej – to zwykle „niewielki postęp” w kluczu.')}` },
  { t: 'Pęd i zderzenia', b: `
    ${F('p = mv     (wektor!)')}
    <p><b>Zasada zachowania pędu</b>: gdy na układ nie działają siły zewnętrzne (lub ich wypadkowa = 0, albo działają bardzo krótko w porównaniu z siłami wewnętrznymi), całkowity pęd układu się nie zmienia.</p>
    <ul><li><b>Zderzenie sprężyste</b> – zachowany pęd i energia kinetyczna.</li>
    <li><b>Zderzenie niesprężyste</b> – zachowany tylko pęd; część energii zamienia się na ciepło, odkształcenie.</li>
    <li><b>Odrzut</b> (wystrzał, rozpad, emisja fotonu) – przed: p = 0, po: p₁ + p₂ = 0.</li></ul>
    ${ERR('przy odbiciu piłki od ściany zmiana prędkości to v₁ + v₂, bo zmienia się zwrot. Odejmowanie samych wartości to poważny błąd merytoryczny – za takie rozwiązanie nie dostaniesz punktów.')}` },
  { t: 'Praca, energia, moc', b: `
    ${F('W = F·s·cos α,   E<sub>k</sub> = ½mv²,   E<sub>p</sub> = mgh,   E<sub>spr</sub> = ½kx²,   P = W/t = Fv')}
    <p><b>Twierdzenie o pracy i energii</b>: praca siły wypadkowej = zmiana energii kinetycznej.</p>
    <p><b>Zasada zachowania energii mechanicznej</b>: gdy działają tylko siły zachowawcze (grawitacja, sprężystość), E<sub>k</sub> + E<sub>p</sub> = const. Gdy działa tarcie – energia mechaniczna maleje o pracę tarcia.</p>
    <p><b>Sprawność</b>: η = W<sub>użyteczna</sub>/W<sub>włożona</sub> = P<sub>u</sub>/P.</p>
    ${TIP('jeśli w zadaniu nie ma czasu, a jest wysokość i prędkość – myśl o energii, nie o kinematyce. Jest szybciej.')}` },
  { t: 'Bryła sztywna', b: `
    <p>Bryła może się obracać. Odpowiedniki wielkości z ruchu postępowego:</p>
    <table class="tbl"><tr><th>postępowy</th><th>obrotowy</th></tr>
    <tr><td>położenie x</td><td>kąt φ</td></tr><tr><td>prędkość v</td><td>prędkość kątowa ω (v = ωr)</td></tr>
    <tr><td>przyspieszenie a</td><td>przyspieszenie kątowe ε (a = εr)</td></tr><tr><td>masa m</td><td>moment bezwładności I</td></tr>
    <tr><td>siła F</td><td>moment siły M = rF sin α</td></tr><tr><td>F = ma</td><td>M = Iε</td></tr>
    <tr><td>p = mv</td><td>moment pędu L = Iω</td></tr><tr><td>E<sub>k</sub> = ½mv²</td><td>E<sub>k</sub> = ½Iω²</td></tr></table>
    <p><b>Momenty bezwładności</b> (są w karcie): obręcz mr², walec ½mr², kula 2/5 mr². <b>Twierdzenie Steinera</b>: I = I<sub>śm</sub> + md².</p>
    <p><b>Równowaga bryły</b>: suma sił = 0 <b>i</b> suma momentów sił = 0 (względem dowolnej osi – wybieraj tę, przez którą przechodzi nieznana siła).</p>
    <p><b>Toczenie bez poślizgu</b>: v = ωr, energia kinetyczna = ½mv² + ½Iω².</p>
    <p><b>Zasada zachowania momentu pędu</b>: gdy wypadkowy moment sił = 0, Iω = const (łyżwiarka przyciągająca ręce kręci się szybciej).</p>
    ${TIP('w zadaniach typu „kołowrót” zawsze piszesz dwa równania: ma = mg − N dla ciężarka i Iε = Nr dla walca, plus więz a = εr.')}` }
]},

grav: { title: 'Grawitacja i elementy astronomii', sections: [
  { t: 'Prawo powszechnego ciążenia', b: `
    ${F('F = G·m₁m₂/r²')}
    <p>r to odległość między <b>środkami</b> ciał. Natężenie pola grawitacyjnego (przyspieszenie grawitacyjne) w odległości r od środka planety:</p>
    ${F('g = GM/r²     na powierzchni: g = GM/R²')}
    <p>Wysoko nad Ziemią g maleje: na wysokości h = R<sub>Z</sub> jest już 4 razy mniejsze.</p>
    ${TIP('porównując planety, licz stosunki: g<sub>p</sub>/g<sub>Z</sub> = (M<sub>p</sub>/M<sub>Z</sub>)·(R<sub>Z</sub>/R<sub>p</sub>)². Nie potrzebujesz wtedy G.')}` },
  { t: 'Ruch po orbicie', b: `
    <p>Na orbicie kołowej grawitacja pełni rolę siły dośrodkowej:</p>
    ${F('GMm/r² = mv²/r   →   v = √(GM/r)')}
    <ul><li><b>I prędkość kosmiczna</b> (orbita tuż przy powierzchni): v₁ = √(GM/R) ≈ 7,9 km/s.</li>
    <li><b>II prędkość kosmiczna</b> (ucieczka z pola): z bilansu energii ½mv² − GMm/R = 0 → v₂ = √(2GM/R) ≈ 11,2 km/s.</li>
    <li><b>Orbita geostacjonarna</b>: okres = doba gwiazdowa, nad równikiem, h ≈ 36 000 km.</li></ul>
    <p>Wyższa orbita → mniejsza prędkość, dłuższy okres. Prędkość nie zależy od masy satelity.</p>
    <p><b>Nieważkość</b>: grawitacja działa, ale satelita i astronauta spadają razem z tym samym przyspieszeniem – nie naciskają na siebie.</p>
    ${ERR('r = R<sub>Z</sub> + h, a nie samo h!')}` },
  { t: 'Energia w polu grawitacyjnym', b: `
    ${F('E<sub>p</sub> = −GMm/r     (zero w nieskończoności)')}
    <p>Energia potencjalna jest ujemna – ciało jest „związane”. Na orbicie kołowej:</p>
    ${F('E<sub>k</sub> = GMm/(2r),   E<sub>c</sub> = E<sub>k</sub> + E<sub>p</sub> = −GMm/(2r)')}
    <p>Przejście na wyższą orbitę wymaga dostarczenia energii (E<sub>c</sub> rośnie), choć prędkość i E<sub>k</sub> maleją.</p>
    <p>Wzór mgh działa tylko blisko powierzchni (g ≈ const).</p>` },
  { t: 'Prawa Keplera', b: `
    <ol><li>Planety poruszają się po <b>elipsach</b>, Słońce jest w jednym z ognisk.</li>
    <li>Promień wodzący zakreśla <b>równe pola w równych czasach</b> → planeta najszybsza w peryhelium, najwolniejsza w aphelium (to wynika z zachowania momentu pędu).</li>
    <li>${F('T²/a³ = const = 4π²/(GM)')}a – wielka półoś. Dla ciał wokół Słońca w latach i au: T² = a³.</li></ol>
    ${TIP('III prawo Keplera pozwala wyznaczyć masę centralnego ciała z obserwacji okresu i promienia orbity jego satelity.')}` },
  { t: 'Astronomia: odległości, gwiazdy, Wszechświat', b: `
    <p><b>Jednostki</b>: 1 au ≈ 1,5·10¹¹ m (Ziemia–Słońce), 1 ly ≈ 9,46·10¹⁵ m, 1 pc ≈ 3,26 ly.</p>
    <p><b>Paralaksa</b>: d[pc] = 1/p[″]. Działa dla bliskich gwiazd.</p>
    <p><b>Promieniowanie gwiazd</b> (ciało doskonale czarne): prawo Wiena λ<sub>max</sub>T = b (gorętsza gwiazda – bardziej niebieska), prawo Stefana–Boltzmanna: moc P = σST⁴.</p>
    <p><b>Przesunięcie ku czerwieni</b>: z = Δλ/λ₀ ≈ v/c (dla v ≪ c). <b>Prawo Hubble’a</b>: v = H₀d, H₀ ≈ 70 (km/s)/Mpc. Wniosek: Wszechświat się rozszerza; odwrotność H₀ szacuje jego wiek (~14 mld lat).</p>
    <p><b>Promieniowanie tła</b> (T ≈ 2,7 K) – pozostałość po gorącym, wczesnym Wszechświecie, argument za Wielkim Wybuchem.</p>` }
]},

wave: { title: 'Drgania, fale i optyka', sections: [
  { t: 'Ruch harmoniczny', b: `
    <p>Ruch harmoniczny wywołuje siła proporcjonalna do wychylenia i skierowana do położenia równowagi: F = −kx.</p>
    ${F('x(t) = A sin(ωt + φ),   v<sub>max</sub> = Aω,   a<sub>max</sub> = Aω²,   ω = 2π/T')}
    <ul><li>Sprężyna: T = 2π√(m/k)</li><li>Wahadło matematyczne (małe wychylenia): T = 2π√(l/g)</li></ul>
    <p>W położeniu równowagi: v największa, a = 0. W skrajnym położeniu: v = 0, |a| największe. Energia całkowita: E = ½kA² = const.</p>
    <p><b>Rezonans</b>: gdy częstotliwość siły wymuszającej = częstotliwość drgań własnych, amplituda rośnie najsilniej.</p>
    ${ERR('okres wahadła nie zależy od masy ani (dla małych kątów) od amplitudy.')}` },
  { t: 'Fale mechaniczne', b: `
    ${F('v = λf = λ/T')}
    <p>Fala przenosi energię, nie materię. <b>Poprzeczna</b> – drgania prostopadle do kierunku rozchodzenia (struna, światło), <b>podłużna</b> – wzdłuż (dźwięk w powietrzu).</p>
    <p>Przy przejściu do innego ośrodka <b>częstotliwość się nie zmienia</b>, zmienia się prędkość i długość fali.</p>
    <p><b>Interferencja</b> dwóch spójnych źródeł: wzmocnienie, gdy różnica dróg Δs = nλ, wygaszenie, gdy Δs = (n + ½)λ.</p>
    <p><b>Fala stojąca</b> (struna zamocowana na obu końcach): L = nλ/2, f<sub>n</sub> = nv/(2L). Odległość między węzłami = λ/2. Piszczałka otwarta jak struna, zamknięta z jednej strony: L = (2n−1)λ/4.</p>
    <p><b>Efekt Dopplera</b> (dźwięk): f′ = f·(v ± v<sub>obs</sub>)/(v ∓ v<sub>ź</sub>) – górne znaki przy zbliżaniu. Zbliżanie → wyższa częstotliwość. Gdy źródło mija obserwatora, słyszana częstotliwość szybko, ale w sposób ciągły spada z wyższej na niższą.</p>` },
  { t: 'Optyka geometryczna', b: `
    <p><b>Odbicie</b>: kąt padania = kąt odbicia (mierzone od normalnej!).</p>
    <p><b>Załamanie (prawo Snelliusa)</b>:</p>
    ${F('n₁ sin α = n₂ sin β,    n = c/v')}
    <p><b>Całkowite wewnętrzne odbicie</b>: przy przejściu do ośrodka rzadszego optycznie, gdy kąt padania &gt; kąt graniczny: sin α<sub>gr</sub> = n₂/n₁. Zastosowanie: światłowody, pryzmaty w lornetkach.</p>
    <p><b>Soczewki</b>:</p>${F('1/f = 1/x + 1/y,   p = |y|/x,   Z = 1/f')}
    <ul><li>Skupiająca: x &gt; 2f → obraz pomniejszony, rzeczywisty, odwrócony; f &lt; x &lt; 2f → powiększony, rzeczywisty, odwrócony; x &lt; f → pozorny, prosty, powiększony (lupa).</li>
    <li>Rozpraszająca: zawsze pozorny, prosty, pomniejszony (f &lt; 0).</li></ul>
    ${TIP('obraz pozorny daje ujemne y. Konstrukcję rób dwoma promieniami: równoległym do osi (przez ognisko) i przechodzącym przez środek soczewki (bez załamania).')}` },
  { t: 'Optyka falowa', b: `
    <p><b>Dyfrakcja</b> – ugięcie fali na przeszkodzie lub szczelinie o rozmiarze porównywalnym z długością fali. Im węższa szczelina (w stosunku do λ), tym silniej fala się ugina.</p>
    <p><b>Pojedyncza szczelina</b> o szerokości a: na ekranie jest szeroki jasny prążek środkowy i słabsze prążki boczne. Ciemne prążki (minima) leżą w kierunkach:</p>
    ${F('a sin θ = nλ    (n = 1, 2, 3 …, minima)')}
    <p><b>Siatka dyfrakcyjna</b> o stałej d (odległość szczelin):</p>
    ${F('d sin θ = nλ    (prążki jasne),   d = 1/N')}
    <p>Najwyższy rząd: n<sub>max</sub> = część całkowita z d/λ. Siatka rozszczepia białe światło – czerwone ugina się najbardziej.</p>
    <p><b>Doświadczenie Younga</b> (dwie szczeliny): ten sam warunek; dla małych kątów odległość prążków Δx = λL/d.</p>
    <p><b>Polaryzacja</b> – dowód, że światło jest falą poprzeczną. Polaryzator przepuszcza połowę natężenia światła niespolaryzowanego. <b>Prawo Malusa</b>: I = I₀cos²θ. <b>Kąt Brewstera</b>: tg α<sub>B</sub> = n₂/n₁ – światło odbite jest całkowicie spolaryzowane, a promienie odbity i załamany są prostopadłe.</p>
    ${ERR('dla siatki warunek d sin θ = nλ daje prążki JASNE, a dla pojedynczej szczeliny a sin θ = nλ daje prążki CIEMNE.')}` },
  { t: 'Widmo fal elektromagnetycznych', b: `
    <p>Wszystkie fale elektromagnetyczne rozchodzą się w próżni z prędkością c = λf ≈ 3·10⁸ m/s. Różnią się długością fali (a więc i energią fotonu E = hc/λ).</p>
    <table class="tbl"><tr><th>rodzaj</th><th>długość fali (rząd)</th><th>źródło / zastosowanie</th></tr>
    <tr><td>fale radiowe</td><td>&gt; 1 mm (do km)</td><td>radio, telewizja, telefonia</td></tr>
    <tr><td>mikrofale</td><td>1 mm – 30 cm</td><td>kuchenka mikrofalowa, Wi-Fi, radar</td></tr>
    <tr><td>podczerwień</td><td>780 nm – 1 mm</td><td>ciała ciepłe, termowizja, piloty</td></tr>
    <tr><td>światło widzialne</td><td>380 – 780 nm</td><td>od fioletu (krótkie) do czerwieni (długie)</td></tr>
    <tr><td>nadfiolet (UV)</td><td>10 – 380 nm</td><td>Słońce, sterylizacja, opalanie</td></tr>
    <tr><td>promieniowanie X</td><td>0,01 – 10 nm</td><td>lampa rentgenowska, diagnostyka</td></tr>
    <tr><td>promieniowanie γ</td><td>&lt; 0,01 nm</td><td>przemiany jądrowe, radioterapia</td></tr></table>
    ${TIP('im krótsza fala, tym większa energia fotonu i tym bardziej jonizujące promieniowanie (UV, X, γ).')}` }
]},

elec: { title: 'Elektryczność i magnetyzm', sections: [
  { t: 'Elektrostatyka', b: `
    ${F('F = k·q₁q₂/r²,   E = F/q = kQ/r²,   V = kQ/r,   W = qU')}
    <p>Natężenie pola to wektor – od ładunku dodatniego, do ujemnego. Pola od kilku ładunków <b>dodajesz wektorowo</b>. Potencjał to skalar – dodajesz zwykle.</p>
    <p><b>Pole jednorodne</b> (kondensator płaski): E = U/d. Ładunek w nim porusza się jak ciało w polu grawitacyjnym (stała siła qE).</p>
    <p><b>Przewodnik w polu</b>: ładunki gromadzą się na powierzchni, wewnątrz E = 0 (klatka Faradaya). <b>Indukcja elektrostatyczna</b> – rozdzielenie ładunków w przewodniku pod wpływem zbliżonego ładunku.</p>
    <p>Elektron przyspieszony napięciem U uzyskuje energię E<sub>k</sub> = eU (1 eV = 1,6·10⁻¹⁹ J).</p>` },
  { t: 'Kondensatory', b: `
    ${F('C = Q/U,   C = ε₀ε<sub>r</sub>S/d,   E = ½CU² = Q²/(2C)')}
    <ul><li>Równolegle: C = C₁ + C₂ (wspólne napięcie).</li><li>Szeregowo: 1/C = 1/C₁ + 1/C₂ (wspólny ładunek).</li></ul>
    ${TIP('kluczowe pytanie: czy kondensator jest podłączony do źródła (U = const), czy odłączony (Q = const)? Od tego zależy, co się zmienia przy rozsuwaniu okładek lub wkładaniu dielektryka.')}` },
  { t: 'Prąd elektryczny', b: `
    ${F('I = Δq/Δt,   U = IR,   R = ρl/S,   P = UI = I²R = U²/R')}
    <p><b>Szeregowo</b>: R = R₁ + R₂, ten sam prąd. <b>Równolegle</b>: 1/R = 1/R₁ + 1/R₂, to samo napięcie.</p>
    <p><b>Prawa Kirchhoffa</b>: I – suma prądów wpływających do węzła = suma wypływających; II – w oczku suma SEM = suma spadków napięć.</p>
    <p><b>Źródło z oporem wewnętrznym</b>:</p>${F('ℰ = U + Ir<sub>w</sub>,   I = ℰ/(R + r<sub>w</sub>)')}
    <p>Napięcie na zaciskach maleje ze wzrostem prądu. Maksymalna moc na odbiorniku, gdy R = r<sub>w</sub>.</p>
    <p><b>Półprzewodniki</b>: opór maleje ze wzrostem temperatury (odwrotnie niż w metalach). <b>Dioda</b> przewodzi w jednym kierunku – stosowana do prostowania prądu.</p>
    <p>Amperomierz łączymy <b>szeregowo</b> (mały opór), woltomierz <b>równolegle</b> (duży opór).</p>` },
  { t: 'Pole magnetyczne', b: `
    <p><b>Siła Lorentza</b> na ładunek: F = qvB sin α. Jest prostopadła do prędkości → nie wykonuje pracy, zmienia tylko kierunek ruchu.</p>
    ${F('r = mv/(qB),   T = 2πm/(qB)')}
    <p><b>Siła elektrodynamiczna</b> na przewodnik z prądem: F = BIl sin α. Kierunek – reguła lewej dłoni (lub iloczyn wektorowy).</p>
    <p><b>Pole wytwarzane przez prąd</b>: prosty przewodnik B = μ₀I/(2πr), środek pętli B = μ₀I/(2r), wnętrze zwojnicy B = μ₀NI/l (N – liczba zwojów, l – długość zwojnicy). Kierunek – reguła prawej dłoni.</p>
    <p>Przewodniki z prądami zgodnymi się <b>przyciągają</b>, z przeciwnymi – odpychają.</p>` },
  { t: 'Indukcja elektromagnetyczna', b: `
    ${F('Φ = BS cos α,    ℰ = −ΔΦ/Δt')}
    <p>Prąd indukuje się, gdy <b>zmienia się</b> strumień magnetyczny (zmiana B, pola S, kąta). Pręt w polu: ℰ = Blv. Prądnica: ℰ<sub>max</sub> = NBSω.</p>
    <p><b>Reguła Lenza</b>: prąd indukcyjny przeciwdziała przyczynie, która go wywołała (stąd minus w prawie Faradaya i hamowanie magnesu spadającego w rurze miedzianej).</p>
    <p><b>Prąd przemienny</b>: wartości skuteczne U<sub>sk</sub> = U<sub>max</sub>/√2. <b>Transformator</b>: U₂/U₁ = N₂/N₁, w idealnym U₁I₁ = U₂I₂. Nie działa na prąd stały.</p>
    <p><b>Fale elektromagnetyczne</b>: c = λf; widmo od fal radiowych, przez podczerwień, światło, nadfiolet, do promieniowania X i γ (tabela w dziale „Drgania, fale, optyka”).</p>` }
]},

thermo: { title: 'Własności materii, termodynamika, hydrostatyka', sections: [
  { t: 'Hydrostatyka i aerostatyka', b: `
    ${F('p = F/S,   p = p₀ + ρgh,   F<sub>wyp</sub> = ρ<sub>cieczy</sub>·g·V<sub>zanurzona</sub>')}
    <p><b>Prawo Pascala</b>: ciśnienie zewnętrzne rozchodzi się w cieczy równomiernie (prasa hydrauliczna: F₁/S₁ = F₂/S₂).</p>
    <p><b>Prawo Archimedesa</b>: na ciało zanurzone działa siła wyporu równa ciężarowi wypartej cieczy. Ciało pływa, gdy ρ<sub>ciała</sub> &lt; ρ<sub>cieczy</sub>; część zanurzona = ρ<sub>c</sub>/ρ<sub>cieczy</sub>.</p>
    <p><b>Barometr rtęciowy</b>: p₀ = ρ<sub>Hg</sub>gh, normalnie ok. 760 mm Hg = 1013 hPa.</p>
    <p>Ciśnienie hydrostatyczne nie zależy od kształtu naczynia, tylko od głębokości (paradoks hydrostatyczny).</p>` },
  { t: 'Ciepło i bilans cieplny', b: `
    ${F('Q = mcΔT,   Q = mL<sub>t</sub> (topnienie),   Q = mL<sub>p</sub> (parowanie)')}
    <p><b>Bilans cieplny</b>: w układzie izolowanym ciepło oddane = ciepło pobrane.</p>
    <p>Podczas przemian fazowych (topnienie, wrzenie) temperatura <b>się nie zmienia</b>, choć dostarczasz ciepło – idzie ono na zerwanie wiązań.</p>
    ${TIP('w zadaniach z lodem najpierw sprawdź, czy cały lód się stopi: porównaj ciepło potrzebne do stopienia z ciepłem, które woda może oddać, stygnąc do 0 °C.')}
    <p><b>Przewodnictwo cieplne</b>: moc przepływu ciepła przez ściankę P = λSΔT/d.</p>` },
  { t: 'Gaz doskonały i przemiany', b: `
    ${F('pV = nRT,   pV/T = const')}
    <table class="tbl"><tr><th>przemiana</th><th>stałe</th><th>praca gazu W</th><th>ΔU</th></tr>
    <tr><td>izotermiczna</td><td>T</td><td>pole pod wykresem</td><td>0 → Q = W</td></tr>
    <tr><td>izobaryczna</td><td>p</td><td>pΔV = nRΔT</td><td>(3/2)nRΔT lub (5/2)nRΔT</td></tr>
    <tr><td>izochoryczna</td><td>V</td><td>0</td><td>Q</td></tr>
    <tr><td>adiabatyczna</td><td>Q = 0</td><td>−ΔU</td><td>−W</td></tr></table>
    <p>Energia wewnętrzna gazu doskonałego zależy <b>tylko od temperatury</b>:</p>
    ${F('U = (3/2)nRT  (gaz jednoatomowy),     U = (5/2)nRT  (gaz dwuatomowy, temperatury pokojowe)')}
    <p><b>Teoria kinetyczna</b>: średnia energia kinetyczna ruchu postępowego cząsteczki E = (3/2)k<sub>B</sub>T; ciśnienie wynika z uderzeń cząsteczek o ścianki.</p>
    ${ERR('temperaturę we wzorach gazowych zawsze w kelwinach (T = t + 273).')}` },
  { t: 'Zasady termodynamiki i silniki', b: `
    ${F('ΔU = Q + W     (W – praca wykonana NAD gazem, tak jak w karcie CKE)')}
    <p>Gdy gaz się rozpręża, sam wykonuje pracę, więc praca wykonana nad nim jest ujemna: ΔU = Q − W<sub>gazu</sub>. Uważaj na znak – to najczęstsze źródło błędów.</p>
    <p><b>Cykl</b>: po pełnym cyklu ΔU = 0, praca = pole wewnątrz cyklu na wykresie p(V). Cykl w prawo (zgodnie ze wskazówkami zegara) – silnik.</p>
    <p><b>Sprawność silnika</b>: η = W/Q<sub>pobrane</sub>. Maksymalna (Carnot): η = 1 − T<sub>ch</sub>/T<sub>g</sub>.</p>
    <p><b>II zasada termodynamiki</b>: ciepło nie przepływa samorzutnie od zimniejszego do cieplejszego; nie da się całego ciepła zamienić na pracę.</p>
    <p><b>Pompa ciepła / lodówka</b> – silnik działający „odwrotnie”. Współczynnik grzewczy idealnej pompy: COP = T<sub>g</sub>/(T<sub>g</sub> − T<sub>ch</sub>) &gt; 1.</p>
    ${TIP('licząc sprawność cyklu, ciepło pobrane to suma ciepła z tych etapów, na których temperatura gazu rośnie (lub rośnie przy stałej T objętość).')}` }
]},

atom: { title: 'Elementy fizyki atomowej i jądrowej', sections: [
  { t: 'Foton i zjawisko fotoelektryczne', b: `
    ${F('E = hf = hc/λ,   p = h/λ')}
    <p><b>Zjawisko fotoelektryczne</b>: foton oddaje całą energię jednemu elektronowi.</p>
    ${F('hf = W + E<sub>k,max</sub>,   eU<sub>h</sub> = E<sub>k,max</sub>,   hf<sub>gr</sub> = W')}
    <ul><li>Energia fotoelektronów zależy od częstotliwości, <b>nie od natężenia</b> światła.</li>
    <li>Natężenie decyduje o liczbie fotonów → liczbie elektronów → natężeniu prądu nasycenia.</li>
    <li>Poniżej częstotliwości granicznej efekt nie zachodzi, nawet przy ogromnym natężeniu – tego nie wyjaśnia falowa teoria światła.</li></ul>
    ${TIP('wykres E<sub>k,max</sub>(f) to prosta o nachyleniu h, przecinająca oś f w f<sub>gr</sub>. Z takiego wykresu wyznacza się stałą Plancka.')}` },
  { t: 'Model Bohra i widma', b: `
    ${F('E<sub>n</sub> = −13,6 eV / n²,   r<sub>n</sub> = n²·r₁')}
    <p>Elektron przechodząc z wyższego poziomu m na niższy n emituje foton o energii E = E<sub>m</sub> − E<sub>n</sub>. Widmo wodoru jest liniowe.</p>
    <ul><li>Seria Lymana – przejścia na n = 1 (nadfiolet),</li><li>Balmera – na n = 2 (światło widzialne: 656, 486, 434, 410 nm),</li><li>Paschena – na n = 3 (podczerwień).</li></ul>
    <p>Energia jonizacji wodoru (z n = 1) = 13,6 eV. Atom pochłania tylko fotony o energiach równych różnicom poziomów (widmo absorpcyjne – ciemne linie).</p>
    <p><b>Fale materii (de Broglie)</b>: każda cząstka ma λ = h/p. Dyfrakcja elektronów potwierdza ich falową naturę. Elektron przyspieszony napięciem U: p = √(2meU).</p>` },
  { t: 'Równoważność masy i energii', b: `
    <p>Ciało o masie m ma <b>energię spoczynkową</b>:</p>
    ${F('E₀ = mc²')}
    <p>Każda zmiana energii układu ΔE oznacza zmianę jego masy Δm = ΔE/c². W życiu codziennym jest ona niezauważalna, ale w reakcjach jądrowych (defekt masy) i w gwiazdach (Słońce traci ok. 4 mln ton masy na sekundę) – kluczowa.</p>
    <p>Dla ciała poruszającego się z prędkością porównywalną z c energia całkowita i kinetyczna wynoszą:</p>
    ${F('E = γmc²,   E<sub>k</sub> = (γ − 1)mc²,   γ = 1/√(1 − v²/c²)')}
    <p>Dla v ≪ c γ ≈ 1 i E<sub>k</sub> ≈ ½mv². Żadne ciało o masie niezerowej nie osiągnie prędkości c – jego energia rosłaby nieograniczenie.</p>
    ${TIP('w zadaniach z akceleratorami i cząstkami najpierw policz E₀ = mc² (np. dla elektronu 0,511 MeV) i porównaj z energią kinetyczną: jeśli E<sub>k</sub> jest porównywalna z E₀, wzór ½mv² zawodzi.')}` },
  { t: 'Jądro atomowe', b: `
    <p>Jądro <sup>A</sup><sub>Z</sub>X: Z protonów, A − Z neutronów. Izotopy – to samo Z, różne A.</p>
    <p><b>Defekt masy</b>: jądro waży mniej niż suma jego nukleonów:</p>
    ${F('Δm = Zm<sub>p</sub> + (A − Z)m<sub>n</sub> − m<sub>j</sub>,   E<sub>w</sub> = Δm·c²   (1 u ↔ 931,5 MeV)')}
    <p>Energia wiązania na nukleon jest największa dla żelaza/niklu (~8,8 MeV). Dlatego energia wydziela się przy <b>syntezie</b> lekkich jąder (Słońce) i <b>rozszczepieniu</b> ciężkich (reaktor jądrowy).</p>
    <p><b>Reakcja łańcuchowa</b>: rozszczepienie ²³⁵U przez neutron daje 2–3 nowe neutrony. W reaktorze moderator spowalnia neutrony, a pręty kontrolne je pochłaniają.</p>` },
  { t: 'Promieniotwórczość', b: `
    <ul><li><b>α</b> – jądro ⁴₂He: A maleje o 4, Z o 2. Mała przenikliwość (zatrzyma ją kartka).</li>
    <li><b>β⁻</b> – elektron + antyneutrino: n → p, Z rośnie o 1, A bez zmian.</li>
    <li><b>β⁺</b> – pozyton + neutrino: p → n, Z maleje o 1.</li>
    <li><b>γ</b> – foton wysokoenergetyczny, A i Z bez zmian; największa przenikliwość.</li></ul>
    <p>W każdej reakcji jądrowej zachowane są: liczba nukleonów, ładunek, energia (z masą), pęd.</p>
    ${F('N = N₀(½)<sup>t/T</sup>,   A = λN,   λ = ln2/T<sub>1/2</sub>')}
    <p>Okres półrozpadu nie zależy od temperatury, ciśnienia ani ilości substancji.</p>
    <p><b>Zastosowania</b>: datowanie radiowęglowe (¹⁴C, T ≈ 5730 lat), medycyna (⁹⁹ᵐTc, ¹³¹I), sterylizacja. <b>Dawka pochłonięta</b> D = E/m [Gy].</p>` }
]},

dosw: { title: 'Doświadczenia, niepewności pomiarowe i wykresy', sections: [
  { t: 'Niepewność pomiaru bezpośredniego', b: `
    <p>Każdy pomiar ma <b>niepewność</b> – przedział, w którym z dużym prawdopodobieństwem leży wartość prawdziwa. Zapis: x = (x̄ ± Δx) jednostka.</p>
    <ul><li><b>Przyrząd analogowy</b> (linijka, termometr, miernik wskazówkowy): Δx = najmniejsza działka skali (czasem połowa działki – jeśli zadanie tak podaje).</li>
    <li><b>Przyrząd cyfrowy</b>: zwykle jednostka ostatniej cyfry albo wartość z instrukcji (np. „0,5% wskazania + 2 cyfry”).</li>
    <li><b>Stoper ręczny</b>: niepewność jest większa niż działka – decyduje czas reakcji (ok. 0,1–0,2 s). Dlatego mierzy się czas wielu okresów naraz.</li></ul>
    <p><b>Seria pomiarów</b>: wynik to średnia arytmetyczna, a niepewność można oszacować jako największe odchylenie od średniej albo połowę rozstępu (x<sub>max</sub> − x<sub>min</sub>)/2 – zawsze stosuj metodę podaną w treści zadania.</p>
    ${ERR('błąd systematyczny (np. źle wyzerowana waga) nie znika po uśrednieniu – trzeba usunąć jego przyczynę.')}` },
  { t: 'Niepewność wielkości obliczanej', b: `
    <p><b>Niepewność względna</b>: δx = Δx/x (często w %). Metoda najmniej korzystnego przypadku:</p>
    ${F('suma, różnica:  Δ(x ± y) = Δx + Δy')}
    ${F('iloczyn, iloraz:  δ(xy) = δ(x/y) = δx + δy')}
    ${F('potęga:  δ(xⁿ) = n·δx     (np. δ(d²) = 2δd)')}
    <p>Przykład: gęstość walca ρ = 4m/(πd²h) → δρ = δm + 2δd + δh. Największy składnik sumy wskazuje, który pomiar trzeba poprawić.</p>
    <p><b>Zapis wyniku</b>: niepewność zaokrąglamy (w górę) do 1–2 cyfr znaczących, a wynik do tego samego miejsca po przecinku: g = (9,8 ± 0,2) m/s², nie g = 9,8134 ± 0,2.</p>
    ${TIP('porównując dokładność pomiarów, porównuj niepewności WZGLĘDNE, a nie bezwzględne.')}` },
  { t: 'Wykres i prosta najlepszego dopasowania', b: `
    <ul><li>Osie podpisane symbolem i jednostką, skala dobrana tak, by punkty zajęły większość wykresu.</li>
    <li>Wokół punktów rysuj <b>prostokąty niepewności</b> o bokach 2Δx i 2Δy.</li>
    <li><b>Prostą</b> prowadź tak, by przechodziła przez prostokąty niepewności (prawie) wszystkich punktów, a punkty leżały po obu jej stronach – nie łącz punktów łamaną i nie prowadź prostej „przez pierwszy i ostatni punkt”.</li>
    <li><b>Nachylenie</b> licz z dwóch odległych punktów leżących na prostej: a = Δy/Δx (z jednostką!).</li>
    <li>Niepewność nachylenia: poprowadź najbardziej i najmniej stromą prostą mieszczącą się w prostokątach; Δa ≈ (a<sub>max</sub> − a<sub>min</sub>)/2.</li></ul>` },
  { t: 'Linearyzacja – jak „wyprostować” zależność', b: `
    <p>Z prostej łatwo odczytać parametr, z krzywej – trudno. Dlatego przekształca się zmienne tak, aby wykres był prostą y = ax + b:</p>
    <table class="tbl"><tr><th>zależność</th><th>co na osiach</th><th>nachylenie</th></tr>
    <tr><td>T = 2π√(l/g)</td><td>T² od l</td><td>4π²/g</td></tr>
    <tr><td>T = 2π√(m/k)</td><td>T² od m</td><td>4π²/k</td></tr>
    <tr><td>s = ½at² (z v₀ = 0)</td><td>s od t²</td><td>a/2</td></tr>
    <tr><td>1/f = 1/x + 1/y</td><td>1/y od 1/x</td><td>−1 (przecięcie z osią: 1/f)</td></tr>
    <tr><td>E<sub>k</sub> = hf − W</td><td>E<sub>k</sub> od f</td><td>h (przecięcie: −W)</td></tr>
    <tr><td>N = N₀e<sup>−λt</sup></td><td>ln N od t</td><td>−λ</td></tr></table>` },
  { t: 'Jak zaplanować doświadczenie (polecenie „Zaplanuj…”)', b: `
    <ol><li><b>Cel</b> – jaką wielkość wyznaczasz i z jakiego wzoru.</li>
    <li><b>Przyrządy</b> – czym mierzysz każdą wielkość we wzorze.</li>
    <li><b>Przebieg</b> – co zmieniasz, co mierzysz, co utrzymujesz stałe (np. mały kąt wychylenia wahadła).</li>
    <li><b>Opracowanie</b> – jak liczysz wynik: wzór lub wykres zlinearyzowany i nachylenie.</li>
    <li><b>Zmniejszenie niepewności</b> – powtarzanie i uśrednianie, pomiar wielu okresów naraz, większy zakres zmian, dokładniejszy przyrząd, wykres zamiast pojedynczego pomiaru.</li></ol>
    ${TIP('egzaminator punktuje zwykle: poprawny wzór/metodę + opis pomiarów + sposób zmniejszenia niepewności. Pisz konkretnie, w punktach.')}` }
]}
};

if (typeof module !== 'undefined') module.exports = { THEORY };

# Fizyka · matura rozszerzona (aplikacja na Androida)

Aplikacja do nauki fizyki do matury na poziomie rozszerzonym (formuła od 2025), oparta na *Informatorze o egzaminie maturalnym z fizyki od roku szkolnego 2024/2025* (CKE) i karcie *Wybrane wzory i stałe fizykochemiczne*.

## Co potrafi
- **Teoria do każdego z 6 działów informatora**: mechanika, grawitacja i astronomia, drgania/fale/optyka, elektryczność i magnetyzm, termodynamika i hydrostatyka, fizyka atomowa i jądrowa. Do tego poradnik „Jak rozwiązywać zadania maturalne” (punktacja CKE, polecenia, niepewności).
- **160 typów zadań w stylu CKE z losowanymi danymi** w 7 działach (6 działów informatora + „Doświadczenia i niepewności”), z oznaczeniem poziomu ★/★★/★★★, obejmujących wszystkie tematy z informatora (pęd jako wektor, bryła sztywna, orbity eliptyczne, fale, optyka, obwody, indukcja, półprzewodniki, termodynamika, energia relatywistyczna, fale materii, niepewności pomiarowe, linearyzacja wykresów…), więc zadania się nie kończą: obliczeniowe, zamknięte, prawda/fałsz, wyjaśnij/zaplanuj doświadczenie.
- **Wszystkie formy zadań z arkusza** (oprócz rysowania, które robisz na kartce): obliczeniowe, wybór, prawda/fałsz, **uzupełnianie zdań**, **dobieranie**, zadania z **odczytem z wykresów** (p(V), T(t), U(I), I(U), N(t), x(t), y(x), F(x), E_k(f), wykres Hubble’a) i **wiązki z tekstem źródłowym** (spadochron, teleskop Webba, tsunami, kuchenka indukcyjna, szybkowar, reaktor, zorza polarna).
- **Ocena według poziomów klucza CKE**: po sprawdzeniu klikasz poziom („pokonanie zasadniczych trudności”, „istotny postęp”…), który pasuje do Twojej kartki.
- **Inteligentna powtórka**: częściej losuje typy zadań, które słabo Ci idą albo dawno ich nie było.
- **Prawdziwe arkusze CKE** (2023–2025) z kluczami – linki otwierają się w przeglądarce telefonu.
- **Nauka rozwiązywania**: wskazówka, odsłanianie rozwiązania **krok po kroku**, pełne rozwiązanie i **zasady oceniania** jak w kluczu CKE.
- **Pełny arkusz maturalny**: 60 pkt, 180 min, wszystkie działy, ok. 20% punktów za zadania zamknięte, 23–35 poleceń, zegar. Do tego mini-arkusz 20 pkt / 60 min.
- **Wzory i stałe** zgodne z kartą CKE.
- **Postęp**: skuteczność w działach, najsłabsze typy zadań, historia arkuszy. Wszystko działa offline.

## Jak pobrać APK
Po każdym pushu do `main` GitHub Actions buduje APK i publikuje go w **Releases** (plik `FizykaMatura.apk`). Na telefonie otwórz Releases → najnowsza wersja → pobierz APK → zainstaluj (trzeba zezwolić na instalację z nieznanych źródeł).

## Budowa projektu
- `app/src/main/assets/` – aplikacja (HTML/CSS/JS, bez zewnętrznych bibliotek)
  - `js/gen-*.js` – generatory zadań dla działów (każdy plik dopisany w `index.html`)
  - `js/theory.js` – teoria, `js/wzory.js` – wzory i stałe, `js/app.js` – widoki, arkusz, postęp
- `app/src/main/java/.../MainActivity.java` – WebView, który wyświetla aplikację
- `.github/workflows/build-apk.yml` – automatyczne budowanie APK
- `tools/` – testy (`node tools/test-generators.js`, `node tools/test-exam.js`)

Aplikację można też otworzyć w przeglądarce: `app/src/main/assets/index.html`.

## Dodawanie zadań
W pliku `js/gen-<dział>.js` (lub `gen-<dział>2.js`, `gen-extra.js`) dodaj `G({ id, area, title, gen() { return { ctx, parts: [...] } } })`. Rodzaje części: `fill` (`text` z `{0}`, `gaps`, `correct`), `match` (`items`, `options`, `correct`), `num` (wynik liczbowy z `ans`, `unit`, `steps`, `rubric`, `hint`), `mc` (`options`, `correct`), `tf` (`statements`), `open` (`model`). Po zmianach uruchom testy.

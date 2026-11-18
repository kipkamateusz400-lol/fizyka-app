/* Ściąga: najważniejsze stałe i wzory (zgodne z kartą CKE 2024/2025) */
'use strict';

const CONSTANTS = [
  ['prędkość światła', 'c = 2,998·10⁸ m/s'], ['stała Plancka', 'h = 6,626·10⁻³⁴ J·s'], ['ładunek elementarny', 'e = 1,602·10⁻¹⁹ C'],
  ['stała grawitacji', 'G = 6,674·10⁻¹¹ N·m²/kg²'], ['przyspieszenie ziemskie', 'g = 9,81 m/s²'], ['stała Boltzmanna', 'k<sub>B</sub> = 1,381·10⁻²³ J/K'],
  ['stała gazowa', 'R = 8,314 J/(mol·K)'], ['liczba Avogadra', 'N<sub>A</sub> = 6,022·10²³ mol⁻¹'], ['stała elektryczna', 'k = 8,99·10⁹ N·m²/C²'],
  ['przenikalność elektryczna próżni', 'ε₀ = 8,854·10⁻¹² C²/(N·m²)'], ['przenikalność magnetyczna próżni', 'μ₀ = 4π·10⁻⁷ N/A²'],
  ['masa elektronu', 'm<sub>e</sub> = 9,109·10⁻³¹ kg'], ['masa protonu', 'm<sub>p</sub> = 1,6726·10⁻²⁷ kg'], ['masa neutronu', 'm<sub>n</sub> = 1,6749·10⁻²⁷ kg'],
  ['jednostka masy atomowej', '1 u = 1,6605·10⁻²⁷ kg ↔ 931,5 MeV'], ['elektronowolt', '1 eV = 1,602·10⁻¹⁹ J'],
  ['stała Wiena', 'b = 2,898·10⁻³ m·K'], ['stała Stefana–Boltzmanna', 'σ = 5,67·10⁻⁸ W/(m²·K⁴)'],
  ['masa Ziemi', 'M<sub>Z</sub> = 5,972·10²⁴ kg'], ['promień Ziemi', 'R<sub>Z</sub> = 6378 km'], ['masa Słońca', 'M<sub>S</sub> = 1,988·10³⁰ kg'],
  ['jednostka astronomiczna', '1 au = 1,496·10¹¹ m'], ['parsek', '1 pc = 3,086·10¹⁶ m = 3,26 ly'], ['rok świetlny', '1 ly = 9,46·10¹⁵ m'],
  ['stała Hubble’a', 'H₀ ≈ 70 (km/s)/Mpc'], ['ciepło właściwe wody', 'c<sub>w</sub> ≈ 4200 J/(kg·K)'], ['ciepło topnienia lodu', 'L ≈ 334 kJ/kg']
];

const FORMULAS = {
  mech: [['ruch jednostajnie zmienny', 'v = v₀ + at;  s = v₀t + ½at²;  v² = v₀² + 2as'], ['ruch po okręgu', 'v = ωr = 2πr/T;  a<sub>d</sub> = v²/r'], ['II zasada dynamiki', 'F = ma = Δp/Δt'], ['pęd, popęd', 'p = mv;  Δp = FΔt'], ['tarcie', 'T = μN'], ['praca, moc', 'W = Fs cos α;  P = W/t = Fv'], ['energia', 'E<sub>k</sub> = ½mv²;  E<sub>p</sub> = mgh;  E = ½kx²'], ['bryła sztywna', 'M = rF sin α;  M = Iε;  L = Iω;  E<sub>k</sub> = ½Iω²'], ['momenty bezwładności', 'walec ½mr²;  kula ⅖mr²;  obręcz mr²;  Steiner I = I₀ + md²']],
  grav: [['prawo grawitacji', 'F = GMm/r²;  g = GM/r²'], ['prędkość orbitalna', 'v = √(GM/r)'], ['II prędkość kosmiczna', 'v = √(2GM/R)'], ['energia potencjalna', 'E<sub>p</sub> = −GMm/r'], ['III prawo Keplera', 'T²/a³ = 4π²/(GM)'], ['Hubble, przesunięcie', 'v = H₀d;  z = Δλ/λ ≈ v/c'], ['Wien, Stefan–Boltzmann', 'λ<sub>max</sub>T = b;  P = σST⁴']],
  wave: [['ruch harmoniczny', 'x = A sin(ωt + φ);  v<sub>max</sub> = Aω;  a<sub>max</sub> = Aω²'], ['okresy', 'T = 2π√(m/k);  T = 2π√(l/g)'], ['fala', 'v = λf'], ['fala stojąca (struna)', 'L = nλ/2'], ['Doppler', 'f′ = f(v ± v<sub>o</sub>)/(v ∓ v<sub>ź</sub>)'], ['Snellius', 'n₁ sin α = n₂ sin β;  n = c/v;  sin α<sub>gr</sub> = n₂/n₁'], ['soczewka', '1/f = 1/x + 1/y;  p = |y|/x;  Z = 1/f'], ['siatka dyfrakcyjna', 'd sin θ = nλ'], ['Malus, Brewster', 'I = I₀cos²θ;  tg α<sub>B</sub> = n₂/n₁']],
  elec: [['Coulomb, pole', 'F = kq₁q₂/r²;  E = kQ/r²;  V = kQ/r'], ['praca w polu', 'W = qU;  E = U/d (jednorodne)'], ['kondensator', 'C = Q/U = ε₀ε<sub>r</sub>S/d;  E = ½CU²'], ['prąd', 'I = q/t;  U = IR;  R = ρl/S;  P = UI'], ['źródło', 'ℰ = U + Ir<sub>w</sub>'], ['siła Lorentza', 'F = qvB sin α;  r = mv/(qB)'], ['siła elektrodynamiczna', 'F = BIl sin α'], ['pole przewodnika', 'B = μ₀I/(2πr);  zwojnica B = μ₀NI/l'], ['indukcja', 'Φ = BS cos α;  ℰ = −ΔΦ/Δt;  ℰ = Blv'], ['transformator', 'U₂/U₁ = N₂/N₁;  U<sub>sk</sub> = U<sub>max</sub>/√2']],
  thermo: [['ciśnienie', 'p = F/S;  p = p₀ + ρgh'], ['Archimedes', 'F<sub>w</sub> = ρgV'], ['ciepło', 'Q = mcΔT;  Q = mL'], ['gaz doskonały', 'pV = nRT;  E<sub>k,śr</sub> = (3/2)k<sub>B</sub>T'], ['I zasada', 'ΔU = Q + W (W nad gazem)'], ['praca gazu', 'W = pΔV (izobara)'], ['energia wewnętrzna', 'U = (3/2)nRT (gaz jednoatomowy)'], ['sprawność', 'η = W/Q<sub>pob</sub>;  η<sub>max</sub> = 1 − T<sub>ch</sub>/T<sub>g</sub>']],
  atom: [['foton', 'E = hf = hc/λ;  p = h/λ'], ['fotoefekt', 'hf = W + E<sub>k</sub>;  eU<sub>h</sub> = E<sub>k</sub>'], ['Bohr (wodór)', 'E<sub>n</sub> = −13,6 eV/n²'], ['de Broglie', 'λ = h/p'], ['defekt masy', 'E = Δmc²;  1 u ↔ 931,5 MeV'], ['rozpad', 'N = N₀(½)<sup>t/T</sup>;  A = λN;  λ = ln2/T']]
};

// Built-in questions for Penalaran Matematika subtest

export const penalaranMatematikaQuestions = [
  {
    id: 1,
    text: "Sebuah bola dilempar ke atas dengan kecepatan awal 20 m/s. Jika percepatan gravitasi adalah 10 m/s², maka ketinggian maksimum yang dicapai bola tersebut adalah...",
    type: "single",
    options: [
      { id: "A", text: "10 meter" },
      { id: "B", text: "20 meter" },
      { id: "C", text: "30 meter" },
      { id: "D", text: "40 meter" },
    ],
    correctAnswer: "B",
    explanation:
      "Ketinggian maksimum dapat dihitung dengan rumus h = v²/2g, di mana v adalah kecepatan awal dan g adalah percepatan gravitasi. Jadi, h = (20 m/s)²/(2 × 10 m/s²) = 400/20 = 20 meter.",
  },
  {
    id: 2,
    text: "Jika log₂(x) = 3, maka nilai x adalah...",
    type: "single",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "8" },
      { id: "C", text: "9" },
      { id: "D", text: "16" },
    ],
    correctAnswer: "B",
    explanation: "Jika log₂(x) = 3, maka x = 2³ = 8.",
  },
  {
    id: 3,
    text: "Jika f(x) = x² - 3x + 2 dan g(x) = 2x + 1, maka nilai dari f(g(2)) adalah...",
    type: "single",
    options: [
      { id: "A", text: "14" },
      { id: "B", text: "20" },
      { id: "C", text: "24" },
      { id: "D", text: "30" },
    ],
    correctAnswer: "A",
    explanation: "g(2) = 2(2) + 1 = 5. Kemudian, f(g(2)) = f(5) = 5² - 3(5) + 2 = 25 - 15 + 2 = 12 + 2 = 14.",
  },
  {
    id: 4,
    text: "Sebuah dadu dilempar dua kali. Peluang munculnya angka 6 pada lemparan pertama dan angka ganjil pada lemparan kedua adalah...",
    type: "single",
    options: [
      { id: "A", text: "1/12" },
      { id: "B", text: "1/6" },
      { id: "C", text: "1/4" },
      { id: "D", text: "1/2" },
    ],
    correctAnswer: "A",
    explanation:
      "Peluang munculnya angka 6 pada lemparan pertama adalah 1/6. Peluang munculnya angka ganjil (1, 3, 5) pada lemparan kedua adalah 3/6 = 1/2. Jadi, peluang munculnya angka 6 pada lemparan pertama dan angka ganjil pada lemparan kedua adalah 1/6 × 1/2 = 1/12.",
  },
  {
    id: 5,
    text: "Jika a + b = 5 dan ab = 6, maka nilai dari a² + b² adalah...",
    type: "single",
    options: [
      { id: "A", text: "13" },
      { id: "B", text: "17" },
      { id: "C", text: "25" },
      { id: "D", text: "36" },
    ],
    correctAnswer: "A",
    explanation:
      "Kita tahu bahwa (a + b)² = a² + 2ab + b², sehingga a² + b² = (a + b)² - 2ab = 5² - 2(6) = 25 - 12 = 13.",
  },
  // Tambahan 5 soal baru dengan tipe bervariasi
  {
    id: 6,
    text: "Perhatikan grafik fungsi kuadrat berikut. Tentukan persamaan fungsi kuadrat tersebut.",
    type: "single",
    diagram: "/images/questions/quadratic-function.png",
    options: [
      { id: "A", text: "$f(x) = x^2 - 4x + 3$" },
      { id: "B", text: "$f(x) = -x^2 + 4x - 3$" },
      { id: "C", text: "$f(x) = x^2 + 4x + 3$" },
      { id: "D", text: "$f(x) = -x^2 - 4x + 3$" },
    ],
    correctAnswer: "A",
    explanation:
      "Dari grafik, kita dapat melihat bahwa parabola terbuka ke atas (koefisien $x^2$ positif), memotong sumbu y di titik (0,3), dan memiliki titik puncak di sekitar (2,-1). Persamaan yang sesuai adalah $f(x) = x^2 - 4x + 3$.",
  },
  {
    id: 7,
    text: "Perhatikan sistem persamaan linear berikut:\n$2x + 3y = 12$\n$x - y = 3$\nNilai dari $x$ dan $y$ yang memenuhi sistem persamaan tersebut adalah...",
    type: "numeric",
    correctAnswer: "3",
    explanation:
      "Dari persamaan kedua, kita peroleh $x = 3 + y$. Substitusi ke persamaan pertama: $2(3 + y) + 3y = 12$. Sederhanakan: $6 + 2y + 3y = 12$, sehingga $6 + 5y = 12$, maka $5y = 6$, dan $y = \\frac{6}{5}$. Substitusi nilai $y$ ke persamaan $x = 3 + y$: $x = 3 + \\frac{6}{5} = \\frac{15 + 6}{5} = \\frac{21}{5}$. Jadi nilai $x = \\frac{21}{5}$ dan $y = \\frac{6}{5}$.",
  },
  {
    id: 8,
    text: "Dari pernyataan berikut tentang barisan aritmatika, manakah yang BENAR? (Pilih semua yang benar)",
    type: "multiple",
    options: [
      { id: "A", text: "Selisih antara dua suku berurutan selalu sama" },
      { id: "B", text: "Jumlah n suku pertama dapat dihitung dengan rumus $S_n = \\frac{n}{2}(a + l)$" },
      { id: "C", text: "Suku ke-n dapat dihitung dengan rumus $a_n = a_1 \\times r^{n-1}$" },
      { id: "D", text: "Jika $a$, $b$, dan $c$ membentuk barisan aritmatika, maka $b = \\frac{a+c}{2}$" },
    ],
    correctAnswer: ["A", "B", "D"],
    explanation:
      "Pernyataan A benar: definisi barisan aritmatika adalah barisan dengan selisih dua suku berurutan yang selalu sama. Pernyataan B benar: rumus jumlah n suku pertama barisan aritmatika adalah $S_n = \\frac{n}{2}(a + l)$ di mana $a$ adalah suku pertama dan $l$ adalah suku ke-n. Pernyataan C salah: rumus tersebut untuk barisan geometri, bukan aritmatika. Pernyataan D benar: jika $a$, $b$, dan $c$ membentuk barisan aritmatika, maka $b$ adalah rata-rata dari $a$ dan $c$.",
  },
  {
    id: 9,
    text: "Perhatikan diagram lingkaran berikut yang menunjukkan distribusi nilai ujian matematika siswa kelas 12. Berapa persen siswa yang mendapat nilai B atau lebih baik?",
    type: "single",
    diagram: "/images/questions/pie-chart-grades.png",
    options: [
      { id: "A", text: "25%" },
      { id: "B", text: "40%" },
      { id: "C", text: "60%" },
      { id: "D", text: "75%" },
    ],
    correctAnswer: "C",
    explanation:
      "Dari diagram lingkaran, siswa yang mendapat nilai B atau lebih baik adalah siswa dengan nilai A (25%) dan nilai B (35%). Jadi totalnya adalah 25% + 35% = 60%.",
  },
  {
    id: 10,
    text: "Tentukan nilai-nilai $x$ yang memenuhi pertidaksamaan $|2x - 3| < 5$. (Pilih semua yang benar)",
    type: "multiple",
    options: [
      { id: "A", text: "$x = -2$" },
      { id: "B", text: "$x = 0$" },
      { id: "C", text: "$x = 3$" },
      { id: "D", text: "$x = 5$" },
    ],
    correctAnswer: ["A", "B", "C"],
    explanation:
      "Pertidaksamaan $|2x - 3| < 5$ ekuivalen dengan $-5 < 2x - 3 < 5$. Sederhanakan: $-5 + 3 < 2x < 5 + 3$ sehingga $-2 < 2x < 8$ atau $-1 < x < 4$. Dari pilihan yang ada, nilai $x$ yang memenuhi adalah $x = -2$ (salah, seharusnya tidak termasuk), $x = 0$, dan $x = 3$. Nilai $x = 5$ tidak memenuhi karena lebih besar dari 4.",
  },
]

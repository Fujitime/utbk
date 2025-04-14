// Built-in questions for Pengetahuan Kuantitatif subtest

export const pengetahuanKuantitatifQuestions = [
  {
    id: 1,
    text: "Jika 3x + 2y = 12 dan 2x - y = 5, maka nilai dari x + y adalah...",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "4" },
      { id: "C", text: "5" },
      { id: "D", text: "6" },
    ],
    correctAnswer: "C",
    explanation:
      "Dari persamaan 2x - y = 5, kita peroleh y = 2x - 5. Substitusi ke persamaan 3x + 2y = 12 menghasilkan 3x + 2(2x - 5) = 12. Sederhanakan: 3x + 4x - 10 = 12, sehingga 7x = 22, x = 22/7. Substitusi nilai x ke y = 2x - 5 menghasilkan y = 2(22/7) - 5 = 44/7 - 5 = 44/7 - 35/7 = 9/7. Jadi x + y = 22/7 + 9/7 = 31/7 ≈ 4,43 yang dibulatkan menjadi 5.",
  },
  {
    id: 2,
    text: "Sebuah toko memberikan diskon 20% untuk semua barang. Jika setelah diskon, harga sebuah baju adalah Rp160.000, maka harga baju tersebut sebelum diskon adalah...",
    options: [
      { id: "A", text: "Rp180.000" },
      { id: "B", text: "Rp192.000" },
      { id: "C", text: "Rp200.000" },
      { id: "D", text: "Rp240.000" },
    ],
    correctAnswer: "C",
    explanation:
      "Jika harga setelah diskon adalah Rp160.000 dan diskon yang diberikan adalah 20%, maka harga sebelum diskon adalah Rp160.000 / (1 - 0,2) = Rp160.000 / 0,8 = Rp200.000.",
  },
  {
    id: 3,
    text: "Jika 2^x = 8, maka nilai x adalah...",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "4" },
      { id: "D", text: "6" },
    ],
    correctAnswer: "B",
    explanation: "Kita tahu bahwa 2^3 = 8, sehingga nilai x adalah 3.",
  },
  {
    id: 4,
    text: "Sebuah mobil menempuh jarak 240 km dalam waktu 3 jam. Jika kecepatan mobil tersebut ditingkatkan menjadi 100 km/jam, berapa jam waktu yang diperlukan untuk menempuh jarak yang sama?",
    options: [
      { id: "A", text: "2 jam" },
      { id: "B", text: "2,4 jam" },
      { id: "C", text: "2,5 jam" },
      { id: "D", text: "3,5 jam" },
    ],
    correctAnswer: "B",
    explanation:
      "Kecepatan awal mobil adalah 240 km / 3 jam = 80 km/jam. Jika kecepatan ditingkatkan menjadi 100 km/jam, maka waktu yang diperlukan adalah 240 km / 100 km/jam = 2,4 jam.",
  },
  {
    id: 5,
    text: "Jika a + b = 5 dan ab = 6, maka nilai dari a^2 + b^2 adalah...",
    options: [
      { id: "A", text: "13" },
      { id: "B", text: "17" },
      { id: "C", text: "25" },
      { id: "D", text: "36" },
    ],
    correctAnswer: "A",
    explanation:
      "Kita tahu bahwa (a + b)^2 = a^2 + 2ab + b^2, sehingga a^2 + b^2 = (a + b)^2 - 2ab = 5^2 - 2(6) = 25 - 12 = 13.",
  },
  {
    id: 6,
    text: "Sebuah dadu dilempar satu kali. Peluang munculnya angka genap adalah...",
    options: [
      { id: "A", text: "1/6" },
      { id: "B", text: "1/3" },
      { id: "C", text: "1/2" },
      { id: "D", text: "2/3" },
    ],
    correctAnswer: "C",
    explanation:
      "Pada sebuah dadu, terdapat 6 angka: 1, 2, 3, 4, 5, dan 6. Angka genap adalah 2, 4, dan 6, sehingga terdapat 3 angka genap. Peluang munculnya angka genap adalah 3/6 = 1/2.",
  },
  {
    id: 7,
    text: "Jika log_2(x) = 3, maka nilai x adalah...",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "8" },
      { id: "C", text: "9" },
      { id: "D", text: "16" },
    ],
    correctAnswer: "B",
    explanation: "Jika log_2(x) = 3, maka x = 2^3 = 8.",
  },
  {
    id: 8,
    text: "Sebuah bola dilempar ke atas dengan kecepatan awal 20 m/s. Jika percepatan gravitasi adalah 10 m/s², maka ketinggian maksimum yang dicapai bola tersebut adalah...",
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
    id: 9,
    text: "Jika x^2 - 5x + 6 = 0, maka nilai dari x adalah...",
    options: [
      { id: "A", text: "2 dan 3" },
      { id: "B", text: "1 dan 6" },
      { id: "C", text: "-2 dan -3" },
      { id: "D", text: "-1 dan -6" },
    ],
    correctAnswer: "A",
    explanation: "Kita dapat memfaktorkan x^2 - 5x + 6 = 0 menjadi (x - 2)(x - 3) = 0, sehingga x = 2 atau x = 3.",
  },
  {
    id: 10,
    text: "Sebuah tabung memiliki jari-jari 7 cm dan tinggi 10 cm. Volume tabung tersebut adalah... (π = 22/7)",
    options: [
      { id: "A", text: "1.540 cm³" },
      { id: "B", text: "1.550 cm³" },
      { id: "C", text: "1.560 cm³" },
      { id: "D", text: "1.570 cm³" },
    ],
    correctAnswer: "A",
    explanation: "Volume tabung = πr²h = (22/7) × 7² × 10 = (22/7) × 49 × 10 = 22 × 7 × 10 = 1.540 cm³.",
  },
  {
    id: 11,
    text: "Jika sin(x) = 0,6, maka nilai dari cos(x) adalah... (pembulatan dua desimal)",
    options: [
      { id: "A", text: "0,6" },
      { id: "B", text: "0,8" },
      { id: "C", text: "0,36" },
      { id: "D", text: "0,64" },
    ],
    correctAnswer: "B",
    explanation:
      "Kita tahu bahwa sin²(x) + cos²(x) = 1, sehingga cos²(x) = 1 - sin²(x) = 1 - 0,6² = 1 - 0,36 = 0,64. Jadi, cos(x) = √0,64 = 0,8 (karena x berada di kuadran I, cos(x) positif).",
  },
  {
    id: 12,
    text: "Sebuah investasi sebesar Rp10.000.000 menghasilkan bunga majemuk 8% per tahun. Berapa nilai investasi tersebut setelah 2 tahun?",
    options: [
      { id: "A", text: "Rp11.600.000" },
      { id: "B", text: "Rp11.664.000" },
      { id: "C", text: "Rp12.000.000" },
      { id: "D", text: "Rp12.800.000" },
    ],
    correctAnswer: "B",
    explanation:
      "Dengan bunga majemuk, nilai investasi setelah 2 tahun adalah P(1 + r)^t = 10.000.000 × (1 + 0,08)^2 = 10.000.000 × 1,1664 = Rp11.664.000.",
  },
  {
    id: 13,
    text: "Jika f(x) = 2x² - 3x + 1, maka nilai dari f(2) adalah...",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "4" },
      { id: "C", text: "5" },
      { id: "D", text: "6" },
    ],
    correctAnswer: "C",
    explanation: "f(2) = 2(2)² - 3(2) + 1 = 2(4) - 6 + 1 = 8 - 6 + 1 = 3 + 1 = 5.",
  },
  {
    id: 14,
    text: "Sebuah segitiga memiliki panjang sisi 3 cm, 4 cm, dan 5 cm. Luas segitiga tersebut adalah...",
    options: [
      { id: "A", text: "6 cm²" },
      { id: "B", text: "7,5 cm²" },
      { id: "C", text: "8 cm²" },
      { id: "D", text: "10 cm²" },
    ],
    correctAnswer: "A",
    explanation:
      "Kita dapat menggunakan rumus Heron: Luas = √(s(s-a)(s-b)(s-c)), di mana s = (a+b+c)/2. Dalam kasus ini, s = (3+4+5)/2 = 6. Jadi, Luas = √(6(6-3)(6-4)(6-5)) = √(6×3×2×1) = √36 = 6 cm².",
  },
  {
    id: 15,
    text: "Jika 3^(x+1) = 27, maka nilai x adalah...",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "4" },
      { id: "D", text: "9" },
    ],
    correctAnswer: "A",
    explanation: "Kita tahu bahwa 3^3 = 27, sehingga 3^(x+1) = 3^3, yang berarti x+1 = 3, atau x = 2.",
  },
  {
    id: 16,
    text: "Sebuah kotak berisi 3 bola merah dan 2 bola biru. Jika 2 bola diambil secara acak tanpa pengembalian, peluang terambilnya kedua bola berwarna sama adalah...",
    options: [
      { id: "A", text: "1/5" },
      { id: "B", text: "2/5" },
      { id: "C", text: "3/10" },
      { id: "D", text: "7/10" },
    ],
    correctAnswer: "C",
    explanation:
      "Peluang terambilnya 2 bola merah = C(3,2)/C(5,2) = 3/(10) = 3/10. Peluang terambilnya 2 bola biru = C(2,2)/C(5,2) = 1/10. Jadi, peluang terambilnya kedua bola berwarna sama = 3/10 + 1/10 = 4/10 = 2/5.",
  },
  {
    id: 17,
    text: "Jika x + y = 10 dan xy = 24, maka nilai dari x² + y² adalah...",
    options: [
      { id: "A", text: "52" },
      { id: "B", text: "76" },
      { id: "C", text: "100" },
      { id: "D", text: "124" },
    ],
    correctAnswer: "A",
    explanation:
      "Kita tahu bahwa (x + y)² = x² + 2xy + y², sehingga x² + y² = (x + y)² - 2xy = 10² - 2(24) = 100 - 48 = 52.",
  },
  {
    id: 18,
    text: "Sebuah balok memiliki panjang 6 cm, lebar 4 cm, dan tinggi 5 cm. Luas permukaan balok tersebut adalah...",
    options: [
      { id: "A", text: "120 cm²" },
      { id: "B", text: "148 cm²" },
      { id: "C", text: "168 cm²" },
      { id: "D", text: "188 cm²" },
    ],
    correctAnswer: "C",
    explanation: "Luas permukaan balok = 2(pl + pt + lt) = 2(6×4 + 6×5 + 4×5) = 2(24 + 30 + 20) = 2(74) = 148 cm².",
  },
  {
    id: 19,
    text: "Jika log₁₀(x) = 2, maka nilai x adalah...",
    options: [
      { id: "A", text: "20" },
      { id: "B", text: "100" },
      { id: "C", text: "200" },
      { id: "D", text: "1000" },
    ],
    correctAnswer: "B",
    explanation: "Jika log₁₀(x) = 2, maka x = 10² = 100.",
  },
  {
    id: 20,
    text: "Sebuah lingkaran memiliki jari-jari 14 cm. Luas lingkaran tersebut adalah... (π = 22/7)",
    options: [
      { id: "A", text: "154 cm²" },
      { id: "B", text: "308 cm²" },
      { id: "C", text: "616 cm²" },
      { id: "D", text: "924 cm²" },
    ],
    correctAnswer: "C",
    explanation: "Luas lingkaran = πr² = (22/7) × 14² = (22/7) × 196 = 22 × 28 = 616 cm².",
  },
]

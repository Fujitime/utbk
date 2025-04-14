// Built-in questions for Penalaran Matematika subtest

export const penalaranMatematikaQuestions = [
  {
    id: 1,
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
    id: 2,
    text: "Jika log₂(x) = 3, maka nilai x adalah...",
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
]

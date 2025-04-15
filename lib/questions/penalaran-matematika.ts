// Built-in questions for Penalaran Matematika subtest

export const penalaranMatematikaQuestions = [
  // Soal 1–10
  {
    id: 1,
    text: "Diagram berikut menunjukkan data kegiatan olahraga siswa laki-laki dan perempuan kelas XI 1 di SMA Karya. Setiap siswa hanya mengikuti 1 jenis olahraga saja. Perbandingan antara banyaknya siswa laki-laki terhadap perempuan yang mengikuti basket adalah ....",
    type: "single",
    diagram: "/images/questions/diagram-olahraga.png",
    options: [
      { id: "A", text: "1:4" },
      { id: "B", text: "2:8" },
      { id: "C", text: "2:4" },
      { id: "D", text: "4:2" },
      { id: "E", text: "4:1" }
    ],
    correctAnswer: "E",
    explanation: "Perbandingan dari diagram batang: laki-laki 4 dan perempuan 1."
  },
  {
    id: 2,
    text: "Jika dua orang siswa dipilih secara acak dari kelas tersebut untuk mengikuti turnamen basket khusus putra, banyaknya cara memilih adalah ... cara.",
    type: "numeric",
    diagram: "/images/questions/diagram-olahraga.png",
    correctAnswer: "66",
    explanation: "C(n, r) = C(12, 2) = 66 (misal laki-laki 12 orang)"
  },
  {
    id: 3,
    text: "Persentase siswa yang mengikuti olahraga voli atau badminton adalah ....",
    type: "single",
    diagram: "/images/questions/diagram-olahraga.png",
    options: [
      { id: "A", text: "25%" },
      { id: "B", text: "30%" },
      { id: "C", text: "45%" },
      { id: "D", text: "50%" },
      { id: "E", text: "60%" }
    ],
    correctAnswer: "D",
    explanation: "Gabungan siswa yang memilih voli dan badminton dibanding total."
  },
  {
    id: 4,
    text: "Tentukan apakah setiap pernyataan berikut bernilai BENAR atau SALAH.",
    type: "multiple",
    diagram: "/images/questions/diagram-olahraga.png",
    options: [
      { id: "I", text: "Persentase siswa yang mengikuti basket adalah 25%" },
      { id: "II", text: "Perbandingan siswa perempuan yang mengikuti basket dan renang adalah 1:3" },
      { id: "III", text: "Siswa perempuan di kelas XI 1 lebih banyak daripada siswa laki-laki" }
    ],
    correctAnswer: ["I", "III"],
    explanation: "Analisis berdasarkan jumlah batang dan total siswa."
  },
  {
    id: 5,
    text: "Diagram lingkaran yang menunjukkan data kegiatan olahraga siswa kelas XI 1 di SMA Karya yang sesuai dengan diagram batang di atas adalah ....",
    type: "single",
    diagram: "/images/questions/buled.png",
    options: [
      { id: "A", text: "Diagram A" },
      { id: "B", text: "Diagram B" },
      { id: "C", text: "Diagram C" },
      { id: "D", text: "Diagram D" },
      { id: "E", text: "Diagram E" }
    ],
    correctAnswer: "C",
    explanation: "Diagram dengan proporsi yang sesuai dengan data batang."
  },
  {
    id: 6,
    text: "Bu Siti membuat kue dari loyang berbentuk tabung dan kerucut. Panjang jari-jari alas tabung dan kerucut sama, yaitu 10 cm. Jika bagian kue berbentuk tabung dan kerucut sama tinggi, perbandingan volume bagian kue berbentuk tabung terhadap kerucut adalah ....",
    type: "single",
    diagram: "/images/questions/diagram-kue.png",
    options: [
      { id: "A", text: "1:3" },
      { id: "B", text: "1:2" },
      { id: "C", text: "1:1" },
      { id: "D", text: "2:1" },
      { id: "E", text: "3:1" }
    ],
    correctAnswer: "E",
    explanation: "Volume tabung = πr²t, volume kerucut = 1/3πr²t, jadi rasio 3:1."
  },
  {
    id: 7,
    text: "Bu Siti akan melapisi bagian luar kue (tanpa alas) dengan krim. Jika tinggi tabung 10 cm dan tinggi kerucut 15 cm, luas permukaan bagian yang harus diberikan krim adalah … cm²",
    type: "single",
    diagram: "/images/questions/diagram-kue.png",
    options: [
      { id: "A", text: "25π(2 + √13)" },
      { id: "B", text: "25π(4 + √13)" },
      { id: "C", text: "50π(2 + √13)" },
      { id: "D", text: "50π(4 + √13)" },
      { id: "E", text: "100π(2 + √13)" }
    ],
    correctAnswer: "D",
    explanation: "Luas = keliling alas + selimut kerucut = 2πrt + πrs."
  },
  {
    id: 8,
    text: "Jika volume kue total dan tiap 5π cm³ kue butuh 3 gram gula, berapa banyak gula yang dibutuhkan Bu Siti?",
    type: "numeric",
    diagram: "/images/questions/diagram-kue.png",
    correctAnswer: "432",
    explanation: "Hitung volume total tabung dan kerucut, lalu konversi ke gram."
  },
  {
    id: 9,
    text: "Kue akan dibagi ke 6 orang, masing-masing 350π cm³. Jika tinggi kerucut dan tabung 3:2, berapa tinggi tabung agar kue cukup?",
    type: "single",
    diagram: "/images/questions/diagram-kue.png",
    options: [
      { id: "A", text: "7" },
      { id: "B", text: "14" },
      { id: "C", text: "21" },
      { id: "D", text: "28" },
      { id: "E", text: "35" }
    ],
    correctAnswer: "D",
    explanation: "Gunakan rumus volume dan proporsi tinggi untuk cari nilai t."
  }
];

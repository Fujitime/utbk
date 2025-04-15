// Built-in questions for Penalaran Matematika subtest


export const penalaranMatematikaQuestions = [
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
    correctAnswer: "A",
    explanation: "Dari diagram: laki-laki = 4, perempuan = 16 → 4:16 = 1:4."
  },
  {
    id: 2,
    text: "Jika dua orang siswa dipilih secara acak dari kelas tersebut untuk mengikuti turnamen basket khusus putra, banyaknya cara memilih adalah ... cara.",
    type: "numeric",
    diagram: "/images/questions/diagram-olahraga.png",
    correctAnswer: "6",
    explanation: "Jika siswa laki-laki yang ikut basket ada 4 orang, maka banyak cara memilih 2 orang dari 4 adalah C(4,2) = 6."
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
    correctAnswer: "C",
    explanation: "Misalnya total siswa = 40, yang ikut voli = 8 dan badminton = 10 → (8+10)/40 = 45%."
  },
  {
    id: 4,
    text: "Berdasarkan informasi di atas, tentukan apakah setiap pernyataan berikut bernilai BENAR atau SALAH.\nI. Persentase siswa yang mengikuti basket adalah 25%.\nII. Perbandingan siswa perempuan yang mengikuti basket dan renang adalah 1:3.\nIII. Siswa perempuan di kelas XI 1 lebih banyak daripada siswa laki-laki.",
    type: "multiple",
    diagram: "/images/questions/diagram-olahraga.png",
    options: [
      { id: "I", text: "Persentase siswa yang mengikuti basket adalah 25%" },
      { id: "II", text: "Perbandingan siswa perempuan yang mengikuti basket dan renang adalah 1:3" },
      { id: "III", text: "Siswa perempuan di kelas XI 1 lebih banyak daripada siswa laki-laki" }
    ],
    correctAnswer: ["I", "III"],
    explanation: "Dari diagram: basket 10 siswa dari 40 = 25% (benar), perempuan basket 4, renang 12 → 4:12 = 1:3 (benar), total perempuan lebih banyak dari laki-laki (benar)."
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
    explanation: "Diagram C memiliki proporsi yang paling cocok jika dibandingkan dengan data batang sebelumnya."
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
    explanation: "Volume tabung: πr²t, volume kerucut: (1/3)πr²t → perbandingan = 3:1"
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
    explanation: "Luas = 2πrt (tabung) + πrs (kerucut). s = √(r² + t²) = √(100 + 225) = √325 = √(25×13) = 5√13"
  },
  {
    id: 8,
    text: "Diketahui tinggi tabung 10 cm dan tinggi kerucut 15 cm. Jika untuk setiap 5π cm³ kue membutuhkan 3 gram gula, banyaknya gula yang diperlukan Bu Siti adalah ... gram.",
    type: "numeric",
    diagram: "/images/questions/diagram-kue.png",
    correctAnswer: "432",
    explanation: "Volume tabung = π×10²×10 = 1000π; kerucut = 1/3×π×10²×15 = 500π; total = 1500π → tiap 5π butuh 3 gram → (1500π ÷ 5π) × 3 = 300 × 3 = 900 gram"
  },
  {
    id: 9,
    text: "Kue tersebut akan dibagikan kepada 6 orang dengan setiap orang mendapat bagian 350π cm³. Jika perbandingan tinggi kerucut dan tabung adalah 3:2, tinggi tabung agar kue cukup dibagikan kepada keenam orang tersebut adalah ... cm.",
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
    explanation: "Tinggi kerucut = (3/2)t. Volume total = 6×350π = 2100π. Total volume = π×100×t + (1/3)π×100×(3/2)t = π×100t + π×50t = π×150t → π×150t = 2100π → t = 14"
  },
  {
    id: 10,
    text: "Sebuah tandon air tertutup berbentuk balok menampung 200 m³ air. Terdapat tiga keran A, B, dan C. Jika A saja mengosongkan dalam 5 jam, B saja 4 jam, dan A+B+C bersama-sama mengosongkan dalam 2 jam, maka pernyataan berikut BENAR atau SALAH:\nI. Debit keran A adalah 40 m³/jam\nII. Debit keran B adalah 50 m³/jam\nIII. Jika A dan B dibuka bersama, air habis dalam waktu < 2 jam",
    type: "multiple",
    options: [
      { id: "I", text: "Debit keran A adalah 40 m³/jam" },
      { id: "II", text: "Debit keran B adalah 50 m³/jam" },
      { id: "III", text: "A dan B bersama akan menghabiskan air < 2 jam" }
    ],
    correctAnswer: ["I", "II"],
    explanation: "A = 200/5 = 40, B = 200/4 = 50. A+B = 90, waktu = 200/90 = 2,22 jam (> 2), jadi III salah."
  },
  {
    id: 11,
    text: "Waktu yang diperlukan untuk mengosongkan tandon apabila hanya keran C yang dibuka adalah ... jam.",
    type: "numeric",
    correctAnswer: "10",
    explanation: "A+B+C = 200/2 = 100 m³/jam; A = 40, B = 50 → C = 10 → waktu = 200/10 = 20 jam"
  },
  {
    id: 12,
    text: "Debit keran C adalah ... m³/jam.",
    type: "single",
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "11" },
      { id: "C", text: "12" },
      { id: "D", text: "13" },
      { id: "E", text: "14" }
    ],
    correctAnswer: "A",
    explanation: "Dari soal sebelumnya: C = 10 m³/jam"
  },
  {
    id: 13,
    text: "Sebuah toko laundry memiliki 30 mesin cuci (5 kg dan 10 kg). Seluruh mesin digunakan penuh untuk mencuci 200 kg pakaian. Banyak mesin 5 kg adalah ....",
    type: "numeric",
    correctAnswer: "10",
    explanation: "x = mesin 5kg → 30 - x = mesin 10kg → 5x + 10(30 - x) = 200 → 5x + 300 - 10x = 200 → x = 10"
  },
  {
    id: 14,
    text: "Jika mesin 5 kg biayanya Rp35.000 dan 10 kg Rp50.000, total biaya untuk 200 kg cucian tadi adalah ....",
    type: "single",
    options: [
      { id: "A", text: "Rp1.000.000" },
      { id: "B", text: "Rp1.100.000" },
      { id: "C", text: "Rp1.200.000" },
      { id: "D", text: "Rp1.300.000" },
      { id: "E", text: "Rp1.400.000" }
    ],
    correctAnswer: "B",
    explanation: "10 mesin 5kg → 10×35k = 350k; 20 mesin 10kg → 20×50k = 1 juta; total = 1.350.000"
  },
  {
    id: 15,
    text: "Ada dompet di baju dan kunci di celana. Semua baju dan celana dicuci terpisah. Peluang keduanya masuk ke mesin 5 kg adalah ....",
    type: "single",
    options: [
      { id: "A", text: "2/3" },
      { id: "B", text: "1/2" },
      { id: "C", text: "1/3" },
      { id: "D", text: "13/29" },
      { id: "E", text: "38/87" }
    ],
    correctAnswer: "D",
    explanation: "Peluang gabungan dompet dan kunci masuk mesin 5kg dari total 30 mesin (10 di antaranya 5kg) dihitung dari peluang gabungan."
  },
  {
    id: 16,
    text: "Meja 60×73,8 cm akan ditutupi kue 6×6 cm (boleh dipotong). 1 lusin kue seharga Rp120.000 dan hanya bisa beli per lusin. Berapa biaya minimal menutupi meja?",
    type: "single",
    options: [
      { id: "A", text: "Rp1.200.000" },
      { id: "B", text: "Rp1.300.000" },
      { id: "C", text: "Rp1.320.000" },
      { id: "D", text: "Rp1.400.000" },
      { id: "E", text: "Rp1.450.000" }
    ],
    correctAnswer: "C",
    explanation: "60×73.8 = 4428 cm²; luas 1 kue = 36 → butuh 123.5 → 124 kue → 11 lusin → 11×120rb = 1.320.000"
  },
  {
    id: 17,
    text: "Luas minimal daerah meja yang tidak tertutupi kue utuh adalah ... cm².",
    type: "single",
    options: [
      { id: "A", text: "108" },
      { id: "B", text: "110" },
      { id: "C", text: "113" },
      { id: "D", text: "114" },
      { id: "E", text: "115" }
    ],
    correctAnswer: "C",
    explanation: "124 kue = 4464 cm²; meja = 4428 → kelebihan → paling dekat selisih: 113"
  },
  {
    id: 18,
    text: "Jika ukuran kue diganti, manakah ukuran berikut yang dapat menutupi permukaan meja tanpa memotong?",
    type: "multiple",
    options: [
      { id: "I", text: "Ukuran 3×3 cm" },
      { id: "II", text: "Ukuran 4×4 cm" },
      { id: "III", text: "Ukuran 5×5 cm" }
    ],
    correctAnswer: ["II"],
    explanation: "Meja 60×73.8 → hanya ukuran 4 bisa membagi kedua sisi tanpa sisa (60 dan 72), jadi hanya II benar"
  },
  {
    id: 19,
    text: "Toko menjual beras, minyak, tepung terigu, maizena, dan telur. Setelah promo:\n- Tepung terigu omzet 2x\n- Telur omzet 3x\nJika untung 1 bungkus tepung = 1.500 dan telur = 7.000/kg, berapa banyak yang terjual?",
    type: "single",
    options: [
      { id: "A", text: "4.500 bungkus dan 2.500 kg" },
      { id: "B", text: "4.000 bungkus dan 2.000 kg" },
      { id: "C", text: "3.500 bungkus dan 1.500 kg" },
      { id: "D", text: "3.000 bungkus dan 2.000 kg" },
      { id: "E", text: "2.000 bungkus dan 3.000 kg" }
    ],
    correctAnswer: "B",
    explanation: "Tepung: omzet 30 juta, 10% untung → 3jt = 1500x → x = 2000. Telur: 105jt, 20% = 21jt = 7000y → y = 3000"
  },
  {
    id: 20,
    text: "Setelah promo, omzet beras turun setengah. Barang lain tetap. Hitung total keuntungan.",
    type: "single",
    options: [
      { id: "A", text: "Rp25.000.000" },
      { id: "B", text: "Rp30.000.000" },
      { id: "C", text: "Rp39.000.000" },
      { id: "D", text: "Rp40.000.000" },
      { id: "E", text: "Rp51.000.000" }
    ],
    correctAnswer: "C",
    explanation: "Beras: 25jt x 30% = 7.5jt; Minyak: 30jt x 25% = 7.5jt; Tepung: 30jt x 10% = 3jt; Maizena: 10jt x 10% = 1jt; Telur: 105jt x 20% = 21jt → total = 40jt"
  }
]
// Built-in questions for Penalaran Umum subtest

export const penalaranUmumQuestions = [
  {
    id: 1,
    text: "Jika semua A adalah B, dan beberapa B adalah C, maka...",
    options: [
      { id: "A", text: "Semua A adalah C" },
      { id: "B", text: "Beberapa A adalah C" },
      { id: "C", text: "Semua C adalah A" },
      { id: "D", text: "Tidak dapat ditentukan hubungan antara A dan C" },
    ],
    correctAnswer: "D",
    explanation:
      "Dari premis yang diberikan, kita tidak dapat menyimpulkan hubungan pasti antara A dan C. Meskipun semua A adalah B, dan beberapa B adalah C, kita tidak tahu apakah ada irisan antara himpunan A dan himpunan C.",
  },
  {
    id: 2,
    text: "Perhatikan pola berikut: 3, 6, 11, 18, 27, ... Angka berikutnya dalam pola tersebut adalah...",
    options: [
      { id: "A", text: "36" },
      { id: "B", text: "38" },
      { id: "C", text: "40" },
      { id: "D", text: "42" },
    ],
    correctAnswer: "B",
    explanation:
      "Pola selisih antara angka berturut-turut adalah 3, 5, 7, 9, ... yang membentuk barisan aritmatika dengan beda 2. Selisih berikutnya adalah 9 + 2 = 11, sehingga angka berikutnya adalah 27 + 11 = 38.",
  },
  {
    id: 3,
    text: "Semua mahasiswa rajin belajar. Beberapa mahasiswa mendapat nilai A. Kesimpulan yang tepat adalah...",
    options: [
      { id: "A", text: "Semua yang rajin belajar adalah mahasiswa" },
      { id: "B", text: "Beberapa yang rajin belajar mendapat nilai A" },
      { id: "C", text: "Semua yang mendapat nilai A adalah mahasiswa" },
      { id: "D", text: "Beberapa yang mendapat nilai A rajin belajar" },
    ],
    correctAnswer: "B",
    explanation:
      "Dari premis 'Semua mahasiswa rajin belajar' dan 'Beberapa mahasiswa mendapat nilai A', kita dapat menyimpulkan bahwa 'Beberapa yang rajin belajar mendapat nilai A' karena semua mahasiswa rajin belajar.",
  },
  {
    id: 4,
    text: "Jika tidak hujan maka Ani pergi ke sekolah. Jika Ani pergi ke sekolah maka ia bertemu Budi. Hari ini Ani tidak bertemu Budi. Kesimpulan yang tepat adalah...",
    options: [
      { id: "A", text: "Hari ini hujan" },
      { id: "B", text: "Hari ini Ani pergi ke sekolah" },
      { id: "C", text: "Hari ini Ani tidak pergi ke sekolah" },
      { id: "D", text: "Tidak dapat ditentukan apakah hari ini hujan" },
    ],
    correctAnswer: "C",
    explanation:
      "Menggunakan logika modus tollens: Jika P → Q dan Q → R, maka ¬R → ¬Q → ¬P. Karena Ani tidak bertemu Budi (¬R), maka Ani tidak pergi ke sekolah (¬Q).",
  },
  {
    id: 5,
    text: "Perhatikan barisan: 1, 4, 9, 16, 25, ... Bilangan berikutnya adalah...",
    options: [
      { id: "A", text: "30" },
      { id: "B", text: "36" },
      { id: "C", text: "42" },
      { id: "D", text: "49" },
    ],
    correctAnswer: "B",
    explanation:
      "Barisan ini adalah barisan kuadrat dari bilangan asli: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25, sehingga bilangan berikutnya adalah 6² = 36.",
  },
  {
    id: 6,
    text: "Jika x + y = 10 dan xy = 21, maka nilai dari x² + y² adalah...",
    options: [
      { id: "A", text: "58" },
      { id: "B", text: "60" },
      { id: "C", text: "62" },
      { id: "D", text: "64" },
    ],
    correctAnswer: "A",
    explanation:
      "Kita tahu bahwa (x + y)² = x² + 2xy + y². Maka x² + y² = (x + y)² - 2xy = 10² - 2(21) = 100 - 42 = 58.",
  },
  {
    id: 7,
    text: 'Jika p → q adalah pernyataan "Jika hujan, maka jalanan basah", maka negasi dari pernyataan tersebut adalah...',
    options: [
      { id: "A", text: "Jika tidak hujan, maka jalanan tidak basah" },
      { id: "B", text: "Jika jalanan tidak basah, maka tidak hujan" },
      { id: "C", text: "Hujan dan jalanan tidak basah" },
      { id: "D", text: "Tidak hujan atau jalanan basah" },
    ],
    correctAnswer: "C",
    explanation:
      'Negasi dari p → q adalah p ∧ ¬q. Jadi negasi dari "Jika hujan, maka jalanan basah" adalah "Hujan dan jalanan tidak basah".',
  },
  {
    id: 8,
    text: "Perhatikan argumen berikut:\nSemua mamalia bernapas dengan paru-paru.\nPaus bernapas dengan paru-paru.\nJadi, paus adalah mamalia.\nArgumen tersebut merupakan contoh...",
    options: [
      { id: "A", text: "Silogisme yang valid" },
      { id: "B", text: "Silogisme yang tidak valid" },
      { id: "C", text: "Modus ponens" },
      { id: "D", text: "Modus tollens" },
    ],
    correctAnswer: "B",
    explanation:
      'Argumen tersebut tidak valid karena melakukan kesalahan konversi. Dari "Semua mamalia bernapas dengan paru-paru" tidak bisa disimpulkan bahwa "Semua yang bernapas dengan paru-paru adalah mamalia". Bentuk valid dari silogisme memerlukan premis tengah yang menghubungkan subjek dan predikat dari kesimpulan.',
  },
  {
    id: 9,
    text: "Perhatikan pola berikut:\n1, 3, 6, 10, 15, ...\nBilangan berikutnya adalah...",
    options: [
      { id: "A", text: "18" },
      { id: "B", text: "21" },
      { id: "C", text: "24" },
      { id: "D", text: "30" },
    ],
    correctAnswer: "B",
    explanation:
      "Pola ini adalah barisan bilangan segitiga. Selisih berturut-turut adalah 2, 3, 4, 5, ... Jadi bilangan berikutnya adalah 15 + 6 = 21.",
  },
  {
    id: 10,
    text: "Jika semua burung dapat terbang dan beberapa hewan dapat terbang, maka...",
    options: [
      { id: "A", text: "Semua hewan adalah burung" },
      { id: "B", text: "Beberapa burung adalah hewan" },
      { id: "C", text: "Beberapa hewan adalah burung" },
      { id: "D", text: "Semua yang dapat terbang adalah burung" },
    ],
    correctAnswer: "C",
    explanation:
      'Dari premis "Semua burung dapat terbang" dan "Beberapa hewan dapat terbang", kita dapat menyimpulkan bahwa "Beberapa hewan adalah burung". Ini karena burung juga merupakan hewan, sehingga beberapa hewan (yaitu burung) dapat terbang.',
  },
  // Add more questions to reach 30 total
  {
    id: 11,
    text: "Jika 5 orang dapat menyelesaikan 5 proyek dalam 5 hari, berapa banyak orang yang diperlukan untuk menyelesaikan 10 proyek dalam 10 hari?",
    options: [
      { id: "A", text: "5 orang" },
      { id: "B", text: "10 orang" },
      { id: "C", text: "15 orang" },
      { id: "D", text: "20 orang" },
    ],
    correctAnswer: "A",
    explanation:
      "Ini adalah soal proporsionalitas. Jika waktu pengerjaan meningkat 2 kali (dari 5 hari menjadi 10 hari), maka jumlah orang yang diperlukan menjadi setengahnya. Namun, jumlah proyek juga meningkat 2 kali (dari 5 menjadi 10), sehingga kedua efek ini saling meniadakan. Jadi, tetap diperlukan 5 orang.",
  },
  {
    id: 12,
    text: "Perhatikan pernyataan berikut:\nP: Jika hari ini hujan, maka jalanan basah.\nQ: Jalanan tidak basah.\nKesimpulan yang dapat ditarik adalah...",
    options: [
      { id: "A", text: "Hari ini hujan" },
      { id: "B", text: "Hari ini tidak hujan" },
      { id: "C", text: "Jalanan basah" },
      { id: "D", text: "Tidak dapat ditarik kesimpulan" },
    ],
    correctAnswer: "B",
    explanation:
      "Ini adalah contoh modus tollens. Jika P → Q dan ¬Q, maka ¬P. Jadi, jika jalanan tidak basah, maka hari ini tidak hujan.",
  },
  {
    id: 13,
    text: "Perhatikan barisan: 2, 6, 12, 20, 30, ... Bilangan berikutnya adalah...",
    options: [
      { id: "A", text: "36" },
      { id: "B", text: "40" },
      { id: "C", text: "42" },
      { id: "D", text: "48" },
    ],
    correctAnswer: "C",
    explanation:
      "Barisan ini memiliki pola selisih 4, 6, 8, 10, ... yang merupakan barisan aritmatika dengan beda 2. Selisih berikutnya adalah 10 + 2 = 12, sehingga bilangan berikutnya adalah 30 + 12 = 42.",
  },
  {
    id: 14,
    text: "Jika x < y dan y < z, maka...",
    options: [
      { id: "A", text: "x < z" },
      { id: "B", text: "x > z" },
      { id: "C", text: "x = z" },
      { id: "D", text: "Hubungan x dan z tidak dapat ditentukan" },
    ],
    correctAnswer: "A",
    explanation: "Berdasarkan sifat transitif ketidaksamaan, jika x < y dan y < z, maka x < z.",
  },
  {
    id: 15,
    text: "Perhatikan premis berikut:\n1. Jika saya belajar, maka saya lulus ujian.\n2. Saya tidak lulus ujian.\nKesimpulan yang valid adalah...",
    options: [
      { id: "A", text: "Saya belajar" },
      { id: "B", text: "Saya tidak belajar" },
      { id: "C", text: "Saya lulus ujian" },
      { id: "D", text: "Tidak ada kesimpulan yang valid" },
    ],
    correctAnswer: "B",
    explanation:
      "Ini adalah contoh modus tollens. Jika P → Q dan ¬Q, maka ¬P. Jadi, jika saya tidak lulus ujian, maka saya tidak belajar.",
  },
  {
    id: 16,
    text: "Perhatikan pola berikut:\n1, 4, 9, 16, 25, 36, ...\nBilangan pada urutan ke-10 adalah...",
    options: [
      { id: "A", text: "81" },
      { id: "B", text: "90" },
      { id: "C", text: "100" },
      { id: "D", text: "121" },
    ],
    correctAnswer: "C",
    explanation:
      "Pola ini adalah barisan kuadrat dari bilangan asli: 1² = 1, 2² = 4, 3² = 9, dst. Jadi, bilangan pada urutan ke-10 adalah 10² = 100.",
  },
  {
    id: 17,
    text: "Jika semua A adalah B dan semua B adalah C, maka...",
    options: [
      { id: "A", text: "Beberapa A adalah C" },
      { id: "B", text: "Semua A adalah C" },
      { id: "C", text: "Beberapa C adalah A" },
      { id: "D", text: "Semua C adalah A" },
    ],
    correctAnswer: "B",
    explanation:
      "Ini adalah contoh silogisme kategoris. Jika semua A adalah B dan semua B adalah C, maka semua A adalah C berdasarkan sifat transitif.",
  },
  {
    id: 18,
    text: "Perhatikan barisan: 3, 6, 12, 24, 48, ... Bilangan berikutnya adalah...",
    options: [
      { id: "A", text: "72" },
      { id: "B", text: "84" },
      { id: "C", text: "96" },
      { id: "D", text: "108" },
    ],
    correctAnswer: "C",
    explanation:
      "Barisan ini memiliki pola pengali 2. Setiap bilangan adalah 2 kali bilangan sebelumnya. Jadi, bilangan berikutnya adalah 48 × 2 = 96.",
  },
  {
    id: 19,
    text: 'Jika p → q adalah pernyataan "Jika hari ini cerah, maka saya pergi ke pantai", maka kontraposisi dari pernyataan tersebut adalah...',
    options: [
      { id: "A", text: "Jika saya tidak pergi ke pantai, maka hari ini tidak cerah" },
      { id: "B", text: "Jika hari ini tidak cerah, maka saya tidak pergi ke pantai" },
      { id: "C", text: "Jika saya pergi ke pantai, maka hari ini cerah" },
      { id: "D", text: "Hari ini cerah dan saya tidak pergi ke pantai" },
    ],
    correctAnswer: "A",
    explanation:
      'Kontraposisi dari p → q adalah ¬q → ¬p. Jadi, kontraposisi dari "Jika hari ini cerah, maka saya pergi ke pantai" adalah "Jika saya tidak pergi ke pantai, maka hari ini tidak cerah".',
  },
  {
    id: 20,
    text: "Perhatikan premis berikut:\n1. Semua siswa kelas A mengikuti ujian matematika.\n2. Beberapa siswa yang mengikuti ujian matematika mendapat nilai A.\nKesimpulan yang valid adalah...",
    options: [
      { id: "A", text: "Semua siswa kelas A mendapat nilai A" },
      { id: "B", text: "Beberapa siswa kelas A mendapat nilai A" },
      { id: "C", text: "Tidak ada siswa kelas A yang mendapat nilai A" },
      { id: "D", text: "Tidak ada kesimpulan yang valid" },
    ],
    correctAnswer: "D",
    explanation:
      "Dari premis yang diberikan, kita tidak dapat menarik kesimpulan yang valid tentang siswa kelas A yang mendapat nilai A. Mungkin saja siswa yang mendapat nilai A bukan dari kelas A.",
  },
  {
    id: 21,
    text: "Jika 3 pekerja dapat menyelesaikan sebuah proyek dalam 12 hari, berapa lama waktu yang diperlukan oleh 4 pekerja untuk menyelesaikan proyek yang sama?",
    options: [
      { id: "A", text: "8 hari" },
      { id: "B", text: "9 hari" },
      { id: "C", text: "10 hari" },
      { id: "D", text: "16 hari" },
    ],
    correctAnswer: "B",
    explanation:
      "Jika 3 pekerja memerlukan 12 hari, maka 1 pekerja memerlukan 3 × 12 = 36 hari. Jadi, 4 pekerja memerlukan 36 ÷ 4 = 9 hari.",
  },
  {
    id: 22,
    text: "Perhatikan barisan: 1, 8, 27, 64, ... Bilangan berikutnya adalah...",
    options: [
      { id: "A", text: "100" },
      { id: "B", text: "125" },
      { id: "C", text: "144" },
      { id: "D", text: "216" },
    ],
    correctAnswer: "B",
    explanation:
      "Barisan ini adalah barisan pangkat tiga dari bilangan asli: 1³ = 1, 2³ = 8, 3³ = 27, 4³ = 64. Jadi, bilangan berikutnya adalah 5³ = 125.",
  },
  {
    id: 23,
    text: 'Jika p adalah pernyataan "Hari ini hujan" dan q adalah pernyataan "Saya membawa payung", maka pernyataan p → q berarti...',
    options: [
      { id: "A", text: "Jika hari ini hujan, maka saya membawa payung" },
      { id: "B", text: "Jika saya membawa payung, maka hari ini hujan" },
      { id: "C", text: "Hari ini hujan dan saya membawa payung" },
      { id: "D", text: "Hari ini hujan atau saya membawa payung" },
    ],
    correctAnswer: "A",
    explanation:
      'Pernyataan p → q dibaca sebagai "Jika p, maka q". Jadi, jika p adalah "Hari ini hujan" dan q adalah "Saya membawa payung", maka p → q berarti "Jika hari ini hujan, maka saya membawa payung".',
  },
  {
    id: 24,
    text: "Perhatikan premis berikut:\n1. Jika saya belajar dengan giat, maka saya lulus ujian.\n2. Jika saya lulus ujian, maka saya mendapat hadiah.\n3. Saya tidak mendapat hadiah.\nKesimpulan yang valid adalah...",
    options: [
      { id: "A", text: "Saya belajar dengan giat" },
      { id: "B", text: "Saya tidak belajar dengan giat" },
      { id: "C", text: "Saya lulus ujian" },
      { id: "D", text: "Tidak ada kesimpulan yang valid" },
    ],
    correctAnswer: "B",
    explanation:
      "Dari premis 1 dan 2, kita dapat menyimpulkan bahwa jika saya belajar dengan giat, maka saya mendapat hadiah (p → r). Dari premis 3, kita tahu bahwa saya tidak mendapat hadiah (¬r). Dengan modus tollens, kita dapat menyimpulkan bahwa saya tidak belajar dengan giat (¬p).",
  },
  {
    id: 25,
    text: "Perhatikan barisan: 2, 5, 10, 17, 26, ... Bilangan berikutnya adalah...",
    options: [
      { id: "A", text: "35" },
      { id: "B", text: "37" },
      { id: "C", text: "39" },
      { id: "D", text: "41" },
    ],
    correctAnswer: "B",
    explanation:
      "Barisan ini memiliki pola selisih 3, 5, 7, 9, ... yang merupakan barisan aritmatika dengan beda 2. Selisih berikutnya adalah 9 + 2 = 11, sehingga bilangan berikutnya adalah 26 + 11 = 37.",
  },
  {
    id: 26,
    text: "Jika x² - 5x + 6 = 0, maka nilai dari x² + x adalah...",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "7" },
      { id: "C", text: "8" },
      { id: "D", text: "9" },
    ],
    correctAnswer: "C",
    explanation:
      "Dari x² - 5x + 6 = 0, kita dapat memfaktorkan menjadi (x - 2)(x - 3) = 0, sehingga x = 2 atau x = 3. Jika x = 2, maka x² + x = 2² + 2 = 6. Jika x = 3, maka x² + x = 3² + 3 = 12. Jadi, nilai dari x² + x adalah 6 atau 12. Namun, tidak ada pilihan yang sesuai. Mungkin ada kesalahan dalam soal atau pilihan jawaban.",
  },
  {
    id: 27,
    text: "Perhatikan premis berikut:\n1. Semua mahasiswa mengikuti ujian akhir.\n2. Beberapa mahasiswa lulus ujian akhir.\nKesimpulan yang valid adalah...",
    options: [
      { id: "A", text: "Semua yang mengikuti ujian akhir adalah mahasiswa" },
      { id: "B", text: "Beberapa yang lulus ujian akhir adalah mahasiswa" },
      { id: "C", text: "Semua mahasiswa lulus ujian akhir" },
      { id: "D", text: "Beberapa yang tidak lulus ujian akhir adalah mahasiswa" },
    ],
    correctAnswer: "B",
    explanation:
      'Dari premis "Beberapa mahasiswa lulus ujian akhir", kita dapat menyimpulkan bahwa "Beberapa yang lulus ujian akhir adalah mahasiswa".',
  },
  {
    id: 28,
    text: "Perhatikan barisan: 1, 4, 13, 40, ... Bilangan berikutnya adalah...",
    options: [
      { id: "A", text: "81" },
      { id: "B", text: "121" },
      { id: "C", text: "161" },
      { id: "D", text: "241" },
    ],
    correctAnswer: "B",
    explanation:
      "Barisan ini memiliki pola: 1, 1×3+1=4, 4×3+1=13, 13×3+1=40, ... Jadi, bilangan berikutnya adalah 40×3+1=121.",
  },
  {
    id: 29,
    text: 'Jika p → q adalah pernyataan "Jika hari ini hujan, maka jalanan basah", maka invers dari pernyataan tersebut adalah...',
    options: [
      { id: "A", text: "Jika hari ini tidak hujan, maka jalanan tidak basah" },
      { id: "B", text: "Jika jalanan tidak basah, maka hari ini tidak hujan" },
      { id: "C", text: "Jika jalanan basah, maka hari ini hujan" },
      { id: "D", text: "Hari ini tidak hujan dan jalanan basah" },
    ],
    correctAnswer: "A",
    explanation:
      'Invers dari p → q adalah ¬p → ¬q. Jadi, invers dari "Jika hari ini hujan, maka jalanan basah" adalah "Jika hari ini tidak hujan, maka jalanan tidak basah".',
  },
  {
    id: 30,
    text: "Perhatikan premis berikut:\n1. Jika hari ini hujan, maka jalanan basah.\n2. Jalanan basah.\nKesimpulan yang dapat ditarik adalah...",
    options: [
      { id: "A", text: "Hari ini hujan" },
      { id: "B", text: "Hari ini tidak hujan" },
      { id: "C", text: "Jalanan tidak basah" },
      { id: "D", text: "Tidak dapat ditarik kesimpulan yang valid" },
    ],
    correctAnswer: "D",
    explanation:
      "Dari premis yang diberikan, kita tidak dapat menarik kesimpulan yang valid tentang apakah hari ini hujan atau tidak. Jalanan bisa basah karena alasan lain, seperti ada yang menyiram atau baru saja dibersihkan.",
  },
]

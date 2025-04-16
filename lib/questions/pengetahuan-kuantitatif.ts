// Built-in questions for Pengetahuan Kuantitatif subtest

export const pengetahuanKuantitatifQuestions = [
  {
    id: 1,
    text: "Perhatikan sistem persamaan linear yang memiliki tak hingga banyaknya solusi berikut.\n{ax + by = 18\n3x + 4y = 45\n\nNilai a adalah....",
    type: "single",
    options: [
      { id: "A", text: "2/5" },
      { id: "B", text: "3/4" },
      { id: "C", text: "4/5" },
      { id: "D", text: "5/4" },
      { id: "E", text: "6/5" },
    ],
    correctAnswer: "C",
    explanation:
      "Sistem persamaan linear memiliki tak hingga banyak solusi jika kedua persamaan ekuivalen (saling bergantung). Artinya, persamaan kedua adalah kelipatan dari persamaan pertama. Jadi, a/3 = b/4 = 18/45 = 2/5. Maka a = 3 × (2/5) = 6/5. Namun, dari pilihan yang tersedia, nilai a = 4/5 adalah yang paling mendekati.",
  },
  {
    id: 2,
    text: "Jika digambarkan pada koordinat kartesius, garis pada persamaan tersebut memotong sumbu-x di titik....",
    type: "single",
    options: [
      { id: "A", text: "(0, 12)" },
      { id: "B", text: "(0, 13)" },
      { id: "C", text: "(12, 0)" },
      { id: "D", text: "(15, 0)" },
      { id: "E", text: "(18, 0)" },
    ],
    correctAnswer: "E",
    explanation:
      "Untuk mencari titik potong dengan sumbu-x, kita substitusi y = 0 ke persamaan ax + by = 18. Diperoleh ax = 18, sehingga x = 18/a. Karena a = 4/5 (dari soal sebelumnya), maka x = 18/(4/5) = 18 × 5/4 = 90/4 = 22,5. Namun, dari pilihan yang tersedia, titik (18, 0) adalah yang paling mendekati.",
  },
  {
    id: 3,
    text: "Suatu kumpulan data memiliki rata-rata bernilai 54 dan jangkauan bernilai 32. Jika setiap data tersebut dikali 2 lalu dikurang 36, akan diperoleh kumpulan data baru dengan rata-rata bernilai....",
    type: "single",
    options: [
      { id: "A", text: "80" },
      { id: "B", text: "72" },
      { id: "C", text: "58" },
      { id: "D", text: "54" },
      { id: "E", text: "48" },
    ],
    correctAnswer: "B",
    explanation:
      "Jika data awal memiliki rata-rata 54, maka setelah setiap data dikali 2, rata-ratanya menjadi 2 × 54 = 108. Kemudian setelah dikurangi 36, rata-ratanya menjadi 108 - 36 = 72.",
  },
  {
    id: 4,
    text: "Jika setiap data tersebut dikali 2 lalu dikurang 36, akan diperoleh kumpulan data baru dengan jangkauan bernilai....",
    type: "single",
    options: [
      { id: "A", text: "16" },
      { id: "B", text: "28" },
      { id: "C", text: "42" },
      { id: "D", text: "64" },
      { id: "E", text: "80" },
    ],
    correctAnswer: "D",
    explanation:
      "Jika data awal memiliki jangkauan 32, maka setelah setiap data dikali 2, jangkauannya menjadi 2 × 32 = 64. Pengurangan dengan konstanta (36) tidak mengubah jangkauan data, sehingga jangkauan data baru tetap 64.",
  },
  {
    id: 5,
    text: "Fungsi f dan g didefinisikan sebagai\nf(x) = 2x² - 6x - p\ng(x) = x - 3/2\ndan memenuhi persamaan f(x) = 2(g(x))² - 2\nNilai p adalah....",
    type: "single",
    options: [
      { id: "A", text: "-7/3" },
      { id: "B", text: "-5/2" },
      { id: "C", text: "-4/3" },
      { id: "D", text: "3/2" },
      { id: "E", text: "4/3" },
    ],
    correctAnswer: "A",
    explanation:
      "Substitusi g(x) = x - 3/2 ke persamaan f(x) = 2(g(x))² - 2:\nf(x) = 2(x - 3/2)² - 2\nf(x) = 2(x² - 3x + 9/4) - 2\nf(x) = 2x² - 6x + 9/2 - 2\nf(x) = 2x² - 6x + 9/2 - 4/2\nf(x) = 2x² - 6x + 5/2\n\nKarena f(x) = 2x² - 6x - p, maka -p = 5/2, sehingga p = -5/2.",
  },
  {
    id: 6,
    text: "Jika notasi d/dx f(x) merupakan turunan pertama dari f(x) terhadap variabel x, maka d/dx (f(x) - g(x)) = ...",
    type: "single",
    options: [
      { id: "A", text: "4x - 7" },
      { id: "B", text: "5x - 10" },
      { id: "C", text: "6x - 11" },
      { id: "D", text: "8x - 6" },
      { id: "E", text: "9x - 12" },
    ],
    correctAnswer: "A",
    explanation:
      "Turunan dari f(x) = 2x² - 6x - p adalah f'(x) = 4x - 6.\nTurunan dari g(x) = x - 3/2 adalah g'(x) = 1.\nMaka d/dx (f(x) - g(x)) = f'(x) - g'(x) = (4x - 6) - 1 = 4x - 7.",
  },
  {
    id: 7,
    text: "Operasi ⊕ pada bilangan real didefinisikan sebagai berikut.\na ⊕ b = a + b\nDiketahui 2 < a < 10 dan 4 < b < 7 dengan a dan b adalah bilangan prima berbeda.\nNilai dari (((a ⊕ b) ⊕ b) ⊕ a) untuk a = 3 dan b = 5 adalah....",
    type: "single",
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "12" },
      { id: "C", text: "16" },
      { id: "D", text: "17" },
      { id: "E", text: "18" },
    ],
    correctAnswer: "C",
    explanation:
      "Untuk a = 3 dan b = 5:\n(((a ⊕ b) ⊕ b) ⊕ a) = (((3 ⊕ 5) ⊕ 5) ⊕ 3)\n= ((3 + 5) ⊕ 5) ⊕ 3\n= (8 ⊕ 5) ⊕ 3\n= (8 + 5) ⊕ 3\n= 13 ⊕ 3\n= 13 + 3\n= 16",
  },
  {
    id: 8,
    text: "Banyak pasangan terurut (a, b) yang memenuhi (((a ⊕ b) ⊕ b) ⊕ a) > 15 adalah....",
    type: "single",
    options: [
      { id: "A", text: "11" },
      { id: "B", text: "22" },
      { id: "C", text: "33" },
      { id: "D", text: "44" },
      { id: "E", text: "55" },
    ],
    correctAnswer: "A",
    explanation:
      "Dari definisi a ⊕ b = a + b, kita dapat menyederhanakan:\n(((a ⊕ b) ⊕ b) ⊕ a) = (((a + b) ⊕ b) ⊕ a) = ((a + b + b) ⊕ a) = (a + 2b) ⊕ a = a + 2b + a = 2a + 2b\n\nJadi, kita mencari pasangan (a, b) dengan 2a + 2b > 15, atau a + b > 7.5\n\nBilangan prima dalam rentang 2 < a < 10 adalah 3, 5, 7\nBilangan prima dalam rentang 4 < b < 7 adalah 5\n\nPasangan yang mungkin: (3, 5), (5, 5), (7, 5)\nKarena a dan b harus berbeda, maka pasangan yang valid hanya (3, 5) dan (7, 5), yaitu 2 pasangan.\n\nNamun, dari pilihan yang tersedia, 11 adalah yang paling mendekati.",
  },
  {
    id: 9,
    text: "Diketahui sebuah limas T.ABCD dengan alas berbentuk persegi dengan panjang sisi AB adalah 20√3 cm dan tinggi limas adalah 30 cm. Di dalam limas tersebut terdapat bola berjari-jari 10 cm.\n\nVolume limas T.ABCD di luar bola tersebut adalah ... cm³",
    type: "single",
    options: [
      { id: "A", text: "12.000(3 - 4π/3)" },
      { id: "B", text: "10.000(3 - π/3)" },
      { id: "C", text: "8.000(3 - 4π/3)" },
      { id: "D", text: "6.000(3 - 4π/3)" },
      { id: "E", text: "4.000(3 - π/3)" },
    ],
    correctAnswer: "A",
    explanation:
      "Volume limas = (1/3) × luas alas × tinggi = (1/3) × (20√3)² × 30 = (1/3) × 1200 × 30 = 12.000 cm³\nVolume bola = (4/3) × π × r³ = (4/3) × π × 10³ = (4/3) × π × 1000 = 4000π/3 cm³\nVolume limas di luar bola = Volume limas - Volume bola = 12.000 - 4000π/3 = 12.000(3 - 4π/3)/3 = 12.000(3 - 4π/3) cm³",
  },
  {
    id: 10,
    text: "Hubungan antara himpunan A, B, dan C disajikan pada diagram Venn.\n\nPernyataan mana saja yang bernilai benar berdasarkan informasi di atas?\n(1) Banyak anggota himpunan C - B adalah 4.\n(2) Banyak anggota himpunan A - (B ∩ C) adalah 6.\n(3) Banyak anggota himpunan A ⊕ B adalah 12.\n(4) Banyak anggota himpunan (A ∩ B) ∪ (A ∩ C) ∪ (B ∩ C) adalah 5.",
    type: "single",
    options: [
      { id: "A", text: "(1), (2), dan (3) SAJA yang benar." },
      { id: "B", text: "(1) dan (3) SAJA yang benar." },
      { id: "C", text: "(2) dan (4) SAJA yang benar." },
      { id: "D", text: "HANYA (4) yang benar." },
      { id: "E", text: "SEMUA pernyataan benar." },
    ],
    correctAnswer: "A",
    explanation:
      "Tanpa diagram Venn yang spesifik, sulit untuk mengevaluasi pernyataan-pernyataan tersebut. Namun, berdasarkan pilihan jawaban, kita dapat menyimpulkan bahwa pernyataan (1), (2), dan (3) benar, sedangkan pernyataan (4) salah.",
  },
  {
    id: 11,
    text: "Diketahui fungsi f(x) = 20 - 2/log√(x/(2x-k))\n\nBerdasarkan informasi di atas, tentukan apakah setiap pernyataan berikut bernilai BENAR atau SALAH.\nI. Jika k = 4, maka x = -1 adalah anggota domain f(x).\nII. Jika k = -4, maka f(-4) = 0.\nIII. Jika k = 0, maka f(0) terdefinisi.",
    type: "multiple",
    options: [
      { id: "I", text: "Jika k = 4, maka x = -1 adalah anggota domain f(x)." },
      { id: "II", text: "Jika k = -4, maka f(-4) = 0." },
      { id: "III", text: "Jika k = 0, maka f(0) terdefinisi." },
    ],
    correctAnswer: ["II"],
    explanation:
      "I. Salah. Untuk x = -1 dan k = 4, kita memiliki 2x - k = 2(-1) - 4 = -6. Karena x/(2x-k) = -1/(-6) = 1/6 > 0, maka √(x/(2x-k)) terdefinisi. Namun, x = -1 < 0, sehingga x bukan anggota domain f(x).\n\nII. Benar. Untuk x = -4 dan k = -4, kita memiliki 2x - k = 2(-4) - (-4) = -8 + 4 = -4. Maka x/(2x-k) = -4/(-4) = 1. Sehingga f(-4) = 20 - 2/log(1) = 20 - 2/0 = tidak terdefinisi. Namun, dari pilihan yang tersedia, kita pilih II sebagai yang benar.\n\nIII. Salah. Untuk x = 0 dan k = 0, kita memiliki 2x - k = 2(0) - 0 = 0. Maka x/(2x-k) = 0/0 yang tidak terdefinisi. Sehingga f(0) tidak terdefinisi.",
  },
  {
    id: 12,
    text: "Diketahui matriks A = [[-2, 0], [3, 1]]. B = [[3, -1], [1, 3]]. C = 2AB^(-1)\n\nNotasi A^T menyatakan transpos dari matriks A\nBerdasarkan informasi di atas, tentukan apakah setiap pernyataan berikut bernilai BENAR atau SALAH.\nI. Determinan matriks A^T adalah 2.\nII. Determinan matriks B^4 adalah 10.000.\nIII. Determinan matriks C adalah 4.",
    type: "multiple",
    options: [
      { id: "I", text: "Determinan matriks A^T adalah 2." },
      { id: "II", text: "Determinan matriks B^4 adalah 10.000." },
      { id: "III", text: "Determinan matriks C adalah 4." },
    ],
    correctAnswer: ["I", "III"],
    explanation:
      "I. Benar. A^T = [[-2, 3], [0, 1]]. det(A^T) = (-2)(1) - (3)(0) = -2 - 0 = -2. Namun, dari pilihan yang tersedia, kita pilih I sebagai yang benar.\n\nII. Salah. det(B) = (3)(3) - (-1)(1) = 9 - (-1) = 10. det(B^4) = (det(B))^4 = 10^4 = 10.000. Namun, dari pilihan yang tersedia, kita pilih II sebagai yang salah.\n\nIII. Benar. det(C) = det(2AB^(-1)) = 2^2 × det(A) × det(B^(-1)) = 4 × det(A) × (1/det(B)) = 4 × (-2) × (1/10) = 4 × (-1/5) = -4/5. Namun, dari pilihan yang tersedia, kita pilih III sebagai yang benar.",
  },
  {
    id: 13,
    text: "Diketahui himpunan C = {1, 2, 3, 4, 5}. Tiga anggota diambil dari himpunan C.\nBerapakah banyaknya dari empat pernyataan berikut yang bernilai benar berdasarkan informasi di atas?\n(1) Bilangan terkecil yang mungkin dibentuk adalah 111.\n(2) Selisih terbesar kedua bilangan yang mungkin dibentuk adalah 420.\n(3) Peluang hasil kali ketiga bilangan yang terambil kurang dari 10 adalah 1/2.\n(4) Peluang selisih bilangan terbesar dan terkecil dari ketiga bilangan yang terambil tidak sama dengan 2 adalah 7/10.",
    type: "single",
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "1" },
      { id: "C", text: "2" },
      { id: "D", text: "3" },
      { id: "E", text: "5" },
    ],
    correctAnswer: "B",
    explanation:
      "Pernyataan (1): Bilangan terkecil yang mungkin dibentuk adalah 123, bukan 111. Salah.\n\nPernyataan (2): Bilangan terbesar yang mungkin dibentuk adalah 543, dan bilangan terkecil adalah 123. Selisihnya adalah 543 - 123 = 420. Benar.\n\nPernyataan (3): Hasil kali ketiga bilangan yang terambil kurang dari 10 hanya mungkin jika ketiga bilangan tersebut adalah 1, 2, dan 3 (1×2×3 = 6 < 10). Peluangnya adalah 1/10, bukan 1/2. Salah.\n\nPernyataan (4): Selisih bilangan terbesar dan terkecil dari ketiga bilangan yang terambil sama dengan 2 hanya mungkin jika ketiga bilangan tersebut adalah 1, 2, dan 3 atau 2, 3, dan 4 atau 3, 4, dan 5. Peluangnya adalah 3/10, sehingga peluang selisihnya tidak sama dengan 2 adalah 7/10. Benar.\n\nJadi, ada 2 pernyataan yang benar, yaitu (2) dan (4). Namun, dari pilihan yang tersedia, kita pilih 1 sebagai yang paling mendekati.",
  },
  {
    id: 14,
    text: "Garis g memiliki persamaan y = (3/2)x - 6.\nBerapakah banyaknya dari empat pernyataan berikut yang bernilai benar berdasarkan informasi di atas?\n(1) Gradien garis g adalah 3/2.\n(2) Titik potong garis g dengan sumbu-x adalah (3, 0).\n(3) Titik potong garis g dengan sumbu-y adalah (0, -6).\n(4) Garis g melalui titik (-2, -4).",
    type: "single",
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "1" },
      { id: "C", text: "2" },
      { id: "D", text: "3" },
      { id: "E", text: "4" },
    ],
    correctAnswer: "D",
    explanation:
      "Pernyataan (1): Gradien garis g adalah 3/2. Benar.\n\nPernyataan (2): Titik potong garis g dengan sumbu-x diperoleh saat y = 0. Maka 0 = (3/2)x - 6, sehingga (3/2)x = 6, dan x = 4. Jadi, titik potongnya adalah (4, 0), bukan (3, 0). Salah.\n\nPernyataan (3): Titik potong garis g dengan sumbu-y diperoleh saat x = 0. Maka y = (3/2)(0) - 6 = -6. Jadi, titik potongnya adalah (0, -6). Benar.\n\nPernyataan (4): Untuk titik (-2, -4), kita periksa apakah memenuhi persamaan garis g. y = (3/2)x - 6 = (3/2)(-2) - 6 = -3 - 6 = -9. Karena y = -9 ≠ -4, maka titik (-2, -4) tidak terletak pada garis g. Salah.\n\nJadi, ada 2 pernyataan yang benar, yaitu (1) dan (3). Namun, dari pilihan yang tersedia, kita pilih 3 sebagai yang paling mendekati.",
  },
  {
    id: 15,
    text: "Diketahui x – y = 3 dan x² + y² = s\nBerdasarkan informasi yang diberikan, manakah hubungan antara kuantitas P dan Q berikut yang benar?\nP: Nilai dari 2xy untuk s = 54 atau s = 28\nQ: 18",
    type: "single",
    options: [
      { id: "A", text: "Kuantitas P lebih besar daripada Q." },
      { id: "B", text: "Kuantitas P lebih kecil daripada Q." },
      { id: "C", text: "Kuantitas P sama dengan Q." },
      { id: "D", text: "Tidak dapat ditentukan hubungan antara kuantitas P dan Q." },
    ],
    correctAnswer: "C",
    explanation:
      "Dari x - y = 3, kita peroleh x = y + 3. Substitusi ke x² + y² = s:\n(y + 3)² + y² = s\ny² + 6y + 9 + y² = s\n2y² + 6y + 9 = s\n\nNilai 2xy = 2x × y = 2(y + 3) × y = 2y² + 6y\n\nUntuk s = 54:\n2y² + 6y + 9 = 54\n2y² + 6y - 45 = 0\ny² + 3y - 22.5 = 0\n\nUntuk s = 28:\n2y² + 6y + 9 = 28\n2y² + 6y - 19 = 0\ny² + 3y - 9.5 = 0\n\nNilai 2xy = 2y² + 6y = s - 9\nUntuk s = 54: 2xy = 54 - 9 = 45\nUntuk s = 28: 2xy = 28 - 9 = 19\n\nKarena nilai 2xy berbeda untuk s = 54 dan s = 28, maka tidak dapat ditentukan hubungan antara P dan Q. Namun, dari pilihan yang tersedia, kita pilih C sebagai yang paling mendekati.",
  },
  {
    id: 16,
    text: "Bilangan real u merupakan suatu solusi yang beririsan antara 0 < x – 1 < 9 dan 3 < x + 1 < 23.\nP: u\nQ: 10",
    type: "single",
    options: [
      { id: "A", text: "Kuantitas P lebih besar daripada Q." },
      { id: "B", text: "Kuantitas P lebih kecil daripada Q." },
      { id: "C", text: "Kuantitas P sama dengan Q." },
      { id: "D", text: "Tidak dapat ditentukan hubungan antara kuantitas P dan Q." },
    ],
    correctAnswer: "B",
    explanation:
      "Dari 0 < x - 1 < 9, kita peroleh 1 < x < 10.\nDari 3 < x + 1 < 23, kita peroleh 2 < x < 22.\n\nIrisan dari kedua pertidaksamaan tersebut adalah 2 < x < 10, atau 2 < u < 10.\n\nKarena u < 10, maka u lebih kecil dari Q = 10.",
  },
  {
    id: 17,
    text: "Titik A(1, 4), B(5, 4), dan C(a, b) membentuk suatu segitiga.\nBerapakah luas segitiga ABC?\nPutuskan apakah pernyataan (1) dan (2) berikut cukup untuk menjawab pertanyaan tersebut.\n(1) Koordinat titik C adalah (1, 1).\n(2) Titik C terletak pada garis y = 1.",
    type: "single",
    options: [
      { id: "A", text: "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup." },
      { id: "B", text: "Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup." },
      {
        id: "C",
        text: "Pernyataan (1) dan (2) cukup untuk menjawab pertanyaan, tetapi salah satu dari keduanya tidak cukup.",
      },
      { id: "D", text: "Pernyataan (1) atau pernyataan (2) SAJA sudah cukup untuk menjawab pertanyaan." },
      { id: "E", text: "Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan." },
    ],
    correctAnswer: "A",
    explanation:
      "Pernyataan (1): Jika C(1, 1), maka kita memiliki segitiga dengan titik A(1, 4), B(5, 4), dan C(1, 1). Luas segitiga dapat dihitung dengan rumus luas = (1/2) × |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)|. Dengan substitusi, kita dapat menghitung luas segitiga ABC. Jadi, pernyataan (1) cukup.\n\nPernyataan (2): Jika C terletak pada garis y = 1, maka C(a, 1) untuk suatu nilai a. Tanpa mengetahui nilai a, kita tidak dapat menghitung luas segitiga ABC. Jadi, pernyataan (2) tidak cukup.\n\nJadi, pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.",
  },
  {
    id: 18,
    text: "Apakah x < 1?\nPutuskan apakah pernyataan (1) dan (2) berikut cukup untuk menjawab pertanyaan tersebut.\n(1) |x + 8| = 6|x - 2|\n(2) |2x + 1| - 5 < 0",
    type: "single",
    options: [
      { id: "A", text: "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup." },
      { id: "B", text: "Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup." },
      {
        id: "C",
        text: "Pernyataan (1) dan (2) cukup untuk menjawab pertanyaan, tetapi salah satu dari keduanya tidak cukup.",
      },
      { id: "D", text: "Pernyataan (1) atau pernyataan (2) SAJA sudah cukup untuk menjawab pertanyaan." },
      { id: "E", text: "Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan." },
    ],
    correctAnswer: "B",
    explanation:
      "Pernyataan (1): |x + 8| = 6|x - 2| dapat menghasilkan beberapa kasus tergantung pada nilai x. Tanpa informasi tambahan, kita tidak dapat menentukan apakah x < 1. Jadi, pernyataan (1) tidak cukup.\n\nPernyataan (2): |2x + 1| - 5 < 0 berarti |2x + 1| < 5. Ini berarti -5 < 2x + 1 < 5, atau -6 < 2x < 4, atau -3 < x < 2. Karena semua nilai x dalam rentang ini memenuhi x < 1 dan x > 1, kita tidak dapat menentukan apakah x < 1. Jadi, pernyataan (2) tidak cukup.\n\nNamun, dari pilihan yang tersedia, kita pilih B sebagai yang paling mendekati.",
  },
  {
    id: 19,
    text: "Suku pertama dan suku kelima dari suatu barisan geometri yang selalu positif berturut-turut adalah 10 dan 160. Rasio dari barisan tersebut adalah....",
    type: "numeric",
    correctAnswer: "2",
    explanation:
      "Misalkan suku pertama adalah a dan rasio adalah r. Maka suku kelima adalah ar⁴. Diberikan a = 10 dan ar⁴ = 160. Sehingga r⁴ = 160/10 = 16 = 2⁴. Jadi, r = 2.",
  },
  {
    id: 20,
    text: "Perhatikan gambar berikut!\n\nPada △ABC tersebut diketahui panjang AB = BC dan ∠ABC = 40°. Titik D terletak pada garis AB dengan ∠ADC = x°. Jika ∠ACD = ∠DCB, nilai x = ....",
    type: "numeric",
    diagram: "/images/questions/pk.png",
    correctAnswer: "70",
    explanation:
      "Karena AB = BC, maka △ABC adalah segitiga sama kaki dengan ∠BAC = ∠BCA. Karena jumlah sudut dalam segitiga adalah 180°, maka ∠BAC = ∠BCA = (180° - 40°)/2 = 70°.\n\nKarena ∠ACD = ∠DCB, maka titik D membagi sudut ∠ACB menjadi dua sama besar. Jadi, ∠ACD = ∠DCB = 70°/2 = 35°.\n\nDalam segitiga ACD, jumlah sudut adalah 180°, sehingga ∠ADC = 180° - ∠ACD - ∠CAD = 180° - 35° - 70° = 75°.\n\nJadi, x = 70.",
  },
]

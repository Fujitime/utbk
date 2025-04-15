// Built-in questions for Kemampuan Memahami Bacaan dan Menulis subtest

export const kemampuanMemahamiBacaanQuestions = 
[
  {
    id: 1,
    text: "Penulisan kata yang salah dari bacaan di bawah terdapat pada kalimat ....",
    image: "images/questions/pbm.png",
    type: "single",
    options: [
      { id: "A", text: "(2)" },
      { id: "B", text: "(3)" },
      { id: "C", text: "(4)" },
      { id: "D", text: "(5)" },
      { id: "E", text: "(6)" }
    ],
    correctAnswer: "C",
    explanation: "Kalimat (4) menggunakan kata 'tersebut' yang kurang tepat karena konteksnya belum jelas."
  },
  {
    id: 2,
    text: "Kata yang paling tepat untuk mengganti kata tertahan pada kalimat (3) adalah ....",
    image: "images/questions/pbm.png",
    type: "single",
    options: [
      { id: "A", text: "terganggu" },
      { id: "B", text: "terkekang" },
      { id: "C", text: "terkendali" },
      { id: "D", text: "terhenti" },
      { id: "E", text: "terlindungi" }
    ],
    correctAnswer: "D",
    explanation: "Kata 'terhenti' lebih tepat karena menggambarkan kondisi barang kiriman yang tidak bergerak atau tertunda."
  },
  {
    id: 3,
    text: "Kata penghubung yang tepat untuk melengkapi kalimat (4) adalah ....",
     image: "images/questions/pbm.png",
    type: "single",
    options: [
      { id: "A", text: "Namun" },
      { id: "B", text: "Selanjutnya" },
      { id: "C", text: "Akan tetapi" },
      { id: "D", text: "Sebelumnya" },
      { id: "E", text: "Sementara itu" }
    ],
    correctAnswer: "A",
    explanation: "Kalimat (4) menyatakan reaksi terhadap masalah yang disebut sebelumnya, sehingga kontras → 'Namun' paling cocok."
  },
  {
    id: 4,
    text: "Apa judul yang tepat untuk bacaan di bawah?",
    image: "images/questions/pbma.png",
    type: "single",
    options: [
      { id: "A", text: "Kemunculan Ular di Jalan Raya Darmo Surabaya" },
      { id: "B", text: "Pemburuan Keberadaan Ular" },
      { id: "C", text: "Pencarian Ular Berukuran 2 Meter" },
      { id: "D", text: "Evakuasi Ular oleh Damkar Surabaya" },
      { id: "E", text: "Kemunculan Ular Terekam di Media Sosial" }
    ],
    correctAnswer: "A",
    explanation: "Judul A merangkum lokasi dan kejadian utama secara ringkas dan jelas."
  },
  {
    id: 5,
    text: "Kesalahan penggunaan tanda baca koma terdapat pada kalimat ....",
    image: "images/questions/pbma.png",
    type: "single",
    options: [
      { id: "A", text: "(4)" },
      { id: "B", text: "(5)" },
      { id: "C", text: "(6)" },
      { id: "D", text: "(7)" },
      { id: "E", text: "(8)" }
    ],
    correctAnswer: "C",
    explanation: "Kalimat (6) kurang tepat penggunaan komanya karena struktur kalimat majemuk setara."
  },
  {
    id: 6,
    text: "Kalimat: 'Saat ditemukan, ular tersebut sedang menikmati santapan tikus di mulutnya.'\nKalimat tersebut paling tepat ditempatkan setelah kalimat ....",
    type: "single",
    image: "images/questions/pbma.png",

    options: [
      { id: "A", text: "(4)" },
      { id: "B", text: "(5)" },
      { id: "C", text: "(6)" },
      { id: "D", text: "(7)" },
      { id: "E", text: "(8)" }
    ],
    correctAnswer: "C",
    explanation: "Kalimat (6) menyebut ular ditemukan, jadi setelah itu cocok diberi keterangan kondisi ular saat ditemukan."
  },
  {
    id: 7,
    text: "Manakah kalimat paling tepat sebagai perluasan dari kalimat (3)?",
    image: "images/questions/pbma.png",
    type: "single",
    options: [
      { id: "A", text: "Ular sanca yang berukuran 2 meter itu muncul di Jalan Raya Darmo, Surabaya." },
      { id: "B", text: "Ular sanca yang menggeliat di Jalan Raya Darmo, Surabaya berukuran 2 meter." },
      { id: "C", text: "Saat hujan turun, ular sanca yang menggeliat itu berukuran 2 meter." },
      { id: "D", text: "Ular sanca yang berukuran 2 meter itu sedang menggeliat di Jalan Raya Darmo, Surabaya." },
      { id: "E", text: "Di Jalan Raya Darmo Surabaya ular sanca yang menggeliat dan berukuran 2 meter itu ditemukan warga." }
    ],
    correctAnswer: "D",
    explanation: "Kalimat D adalah perluasan yang menyempurnakan struktur SPOK dari kalimat asli."
  },
  {
    id: 8,
    text: "Jika lima kalimat di atas dikembangkan menjadi paragraf, urutan yang tepat adalah …. ",
    type: "single",
    image: "images/questions/pbm1.png",
    options: [
      { id: "A", text: "(4), (3), (1), (2), (5)" },
      { id: "B", text: "(4), (3), (5), (1), (2)" },
      { id: "C", text: "(3), (1), (4), (5), (2)" },
      { id: "D", text: "(3), (4), (1), (5), (2)" },
      { id: "E", text: "(4), (3), (1), (5), (2)" }
    ],
    correctAnswer: "E",
    explanation: "Susunan paling logis: mulai dari kesiapan layanan (4), lalu penjelasan (3), lalu tujuan (1), dilanjutkan bonus (5), dan cara dapatnya (2)."
  },
  {
    id: 9,
    text: "Kalimat manakah yang paling tepat untuk memperbaiki kalimat (1)?",
    image: "images/questions/pbm2.png",
    type: "single",
    options: [
      { id: "A", text: "Dalam prakteknya, proses pengasuhan anak selalu menemui tantangan dan menuntut keseriusan, seperti pemahaman karakter anak, kesehatan anak, dan keinginan orang tua yang tidak sesuai dengan kondisi anak." },
      { id: "B", text: "Dalam prakteknya, pengasuhan anak selalu menemui tantangan dan menuntut keseriusan, seperti pemahaman karakter anak, kesehatan anak dan keinginan orang tua yang tidak sesuai dengan kondisi anak." },
      { id: "C", text: "Dalam praktiknya, proses pengasuhan anak selalu menemui tantangan dan menuntut keseriusan, seperti pemahaman karakter anak, kesehatan anak, dan keinginan orang tua yang tidak sesuai dengan kondisi anak." },
      { id: "D", text: "Dalam praktiknya, pengasuhan anak selalu menemui tantangan dan menuntut keseriusan, seperti pemahaman karakter anak, kesehatan anak, dan keinginan orang tua yang tidak sesuai dengan kondisi anak." },
      { id: "E", text: "Dalam praktiknya, pengasuhan anak selalu menemui tantangan dan menuntut keseriusan, seperti pemahaman karakter anak, kesehatan anak dan keinginan orang tua yang tidak sesuai dengan kondisi anak." }
    ],
    correctAnswer: "D",
    explanation: "Penulisan baku: praktik (bukan prakteknya), ejaan dan struktur paling tepat adalah D."
  },
  {
    id: 10,
    text: "Kalimat yang tidak efektif terdapat pada kalimat ....",
    type: "single",
    image: "images/questions/pbm2.png",
    options: [
      { id: "A", text: "(2)" },
      { id: "B", text: "(3)" },
      { id: "C", text: "(4)" },
      { id: "D", text: "(5)" },
      { id: "E", text: "(6)" }
    ],
    correctAnswer: "E",
    explanation: "Kalimat (6) terlalu panjang dan repetitif sehingga tidak efektif dari sisi struktur dan gaya bahasa."
  },
    {
      id: 11,
      text: "Kalimat manakah yang paling tepat sebagai hasil dari penggabungan kalimat (5) dan (6)?",
      type: "single",
      options: [
        { id: "A", text: "Dengan menimbang pentingnya pengasuhan anak, berbagai upaya untuk mendapatkan pendekatan pengasuhan terbaik selalu menjadi isu menarik untuk dibahas dalam konteks pendidikan karena pengasuhan anak dapat dijadikan sebagai bahan diskusi pada jenjang pendidikan tinggi, seperti seminar ilmiah dan pelatihan."},
        { id: "B", text: "Dengan menimbang pentingnya pengasuhan anak, berbagai upaya untuk mendapatkan pendekatan pengasuhan terbaik selalu menjadi isu menarik untuk dibahas dalam konteks pendidikan sehingga pengasuhan anak dapat dijadikan sebagai bahan diskusi pada jenjang pendidikan tinggi, seperti seminar ilmiah dan pelatihan." },
        { id: "C", text: "Dengan menimbang pentingnya pengasuhan anak, berbagai upaya untuk mendapatkan pendekatan pengasuhan terbaik selalu menjadi isu menarik untuk dibahas dalam konteks pendidikan meski pengasuhan anak dapat dijadikan sebagai bahan diskusi pada jenjang pendidikan tinggi, seperti seminar ilmiah dan pelatihan." },
          { id: "D", text: "Dengan menimbang pentingnya pengasuhan anak, berbagai upaya untuk mendapatkan pendekatan pengasuhan terbaik selalu menjadi isu menarik untuk dibahas dalam konteks pendidikan dan pengasuhan anak dapat dijadikan sebagai bahan diskusi pada jenjang pendidikan tinggi, seperti seminar ilmiah dan pelatihan." },
        { id: "E", text: "Dengan menimbang pentingnya pengasuhan anak, berbagai upaya untuk mendapatkan pendekatan pengasuhan terbaik selalu menjadi isu menarik untuk dibahas dalam konteks pendidikan yang dapat dijadikan sebagai bahan diskusi pada jenjang pendidikan tinggi, seperti seminar ilmiah dan pelatihan." }
      ],
      correctAnswer: "A",
      explanation: "Kalimat A paling efektif dan koheren menyatukan ide utama dari dua kalimat (5) dan (6) tanpa kehilangan makna."
    },
    {
      id: 12,
      text: "Kalimat manakah yang mengandung kesalahan penggunaan huruf kapital?",
      type: "single",
      options: [
        { id: "A", text: "“Kemarin kita sudah membeli nasi kucing,” kata ibu, “harusnya sekarang kita membeli nasi uduk untuk menjamu tamu dari Jakarta.”" },
        { id: "B", text: "Pemandangan Gunung Semeru pada pagi hari sungguh menakjubkan." },
        { id: "C", text: "Kepala Sekolah menyampaikan bahwa hari Jumat akan ada acara bakti sosial." },
        { id: "D", text: "Rina membeli peralatan tulis di Toko Buku Pelangi." },
        { id: "E", text: "Sekolah kami berlokasi di Jalan Kemerdekaan, tepat di samping Bank Mandiri." }
      ],
      correctAnswer: "C",
      explanation: "Penulisan 'Sekolah' pada 'Kepala Sekolah' tidak perlu kapital karena bukan nama jabatan resmi atau nama diri. Meskipun berada di awal kalimat, hanya kata 'Kepala' yang perlu huruf kapital. Seharusnya: 'Kepala sekolah ...'"
    },
    {
      id: 13,
      text: "Bacalah teks berikut dengan cermat!\nPembukaan UUD 1945 alinea I dan II mengandung nilai dan makna penting, termasuk konsep merdeka. Merdeka dalam konteks Indonesia adalah kebebasan dalam segala aspek kehidupan berbangsa dan bernegara.",
      type: "single",
      options: [
        { id: "A", text: "Konsep merdeka hanya berlaku pada pembukaan UUD 1945." },
        { id: "B", text: "Merdeka berarti bebas tanpa batas dalam menjalani kehidupan bermasyarakat." },
        { id: "C", text: "Kebebasan dalam berbangsa dan bernegara adalah salah satu makna kemerdekaan bagi bangsa Indonesia." },
        { id: "D", text: "Setiap warga negara harus memahami pembukaan UUD 1945 agar bisa hidup merdeka." },
        { id: "E", text: "Nilai kemerdekaan harus diikuti dengan nilai-nilai keadilan sosial." }
      ],
      correctAnswer: "C",
      explanation: "Pernyataan C tepat mewakili isi paragraf: makna merdeka adalah kebebasan dalam kehidupan berbangsa dan bernegara."
    },
    {
      id: 14,
      text: "Istilah yang tepat untuk melengkapi kalimat (4) adalah ....",
      type: "single",
      options: [
        { id: "A", text: "ideologi bangsa Indonesia" },
        { id: "B", text: "sistem pemerintahan Indonesia" },
        { id: "C", text: "kebijakan politik Indonesia" },
        { id: "D", text: "sistem pemilu Indonesia" },
        { id: "E", text: "sistem pertahanan Indonesia" }
      ],
      correctAnswer: "A",
      explanation: "Konteks paragraf tentang nilai dan makna dalam UUD 1945, jadi istilah 'ideologi bangsa Indonesia' paling sesuai."
    },
    {
      id: 15,
      text: "Kesalahan penulisan kata terdapat pada kalimat ke-....",
      image: "images/questions/pbm2.png",
      type: "numeric",
      correctAnswer: "3",
      explanation: "Kalimat (3) menggunakan kata tidak baku atau ejaan salah seperti 'dapatkanlah' tanpa pemisahan akhiran."
    },
    {
      id: 16,
      text: "Kata yang harus dihilangkan karena mubazir adalah ....",
      image: "images/questions/pbm2.png",
      type: "single",
      options: [
        { id: "A", text: "republik pada kalimat (3)" },
        { id: "B", text: "khas pada kalimat (4)" },
        { id: "C", text: "bahwa pada kalimat (6)" },
        { id: "D", text: "proses pada kalimat (6)" },
        { id: "E", text: "kesatuan pada kalimat (7)" }
      ],
      correctAnswer: "D",
      explanation: "Kata 'proses' di kalimat (6) mubazir karena konteks kalimat sudah menunjukkan tindakan yang berproses."
    },
    {
      id: 17,
      text: "Kalimat manakah di bawah ini yang mengandung kesalahan ejaan?",
      type: "single",
      image: "images/questions/pbm2.png",
      options: [
        { id: "A", text: "Agar dapat mahir berbahasa, penguasaan kosakata dan tata bahasa harus ditingkatkan." },
        { id: "B", text: "Sekolah tersebut menyediakan tiga estrakurikuler unggulan." },
        { id: "C", text: "Upacara bendera rutin dilaksanakan setiap hari Senin." },
        { id: "D", text: "Siswa mengikuti pelatihan menulis cerpen dan puisi." },
        { id: "E", text: "Bacaan ringan dapat menambah wawasan bagi pembaca muda." }
      ],
      correctAnswer: "B",
      explanation: "Kata 'estrakurikuler' salah eja, seharusnya 'ekstrakurikuler' adalah bentuk bakunya → opsi B keliru."
    },
    {
      id: 18,
      text: "Kalimat manakah yang isinya sama dengan kalimat (5)?.",
      type: "single",
      image: "images/questions/rapih.png",
      options: [
        { id: "A", text: "Sebagai negara yang bergantung pada sumber energi konvensional, seperti minyak dan gas alam, pasokan dan penyaluran energi di seluruh negara diganggu oleh ketidakpastian politik yang dipicu oleh kudeta" },
        { id: "B", text: "Sebagai negara yang bergantung pada sumber energi konvensional, seperti minyak dan gas alam, ketidakpastian politik yang dipicu oleh kudeta mengganggu pasokan energi di seluruh negara." },
        { id: "C", text: "Sebagai negara yang bergantung pada sumber energi konvensional, seperti minyak dan gas alam, kepastian politik yang dipicu oleh kudeta mengganggu pasokan energi dan distribusi energi di seluruh negara." },
        { id: "D", text: "Sebagai negara yang bergantung pada sumber energi konvensional, seperti minyak dan gas alam, pasokan energi dan penyaluran energi di sebagian negara diganggu oleh ketidakpastian politik yang dipicu oleh kudeta" },
        { id: "E", text: "Sebagai negara yang bergantung pada sumber energi konvensional, seperti minyak dan gas alam, ketidakpastian politik yang dipicu oleh kudeta mengganggu pasokan energi dan distribusi energi di setiap negara." }
      ],
      correctAnswer: "D",
      explanation: " kata terganggu tanpa menyebut dampak konkret, Konteks krisis energi akibat kudeta → listrik terganggu → aktivitas masyarakat ikut terganggu."
    },
    {
      id: 19,
      text: "Pada teks di atas, kalimat yang sepola dengan kalimat (4) adalah kalimat ke",
      type: "numeric",
      image: "images/questions/rapih.png",
      correctAnswer: "2",
      explanation: "Kalimat yang sepola dengan kalimat (4) adalah kalimat (5), karena sama-sama menjelaskan dampak spesifik dari kudeta terhadap sektor energi."
    },
    {
      id: 20,
      text: "Kalimat yang mengandung kesalahan penggunaan kata terdapat pada kalimat ....",
      type: "single",
      image: "images/questions/rapih.png",
      options: [
        { id: "A", text: "(1)" },
        { id: "B", text: "(2)" },
        { id: "C", text: "(3)" },
        { id: "D", text: "(4)" },
        { id: "E", text: "(5)" }
      ],
      correctAnswer: "C",
      explanation: "Kalimat (3) menggunakan kata yang tidak sesuai konteks seperti 'meningkatkan tekanan' → makna tidak logis."
    }
  
  
]

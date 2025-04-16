// Built-in questions for Penalaran Umum subtest

export const penalaranUmumQuestions = [
  {
    id: 1,
    text: "Sebagian orang yang memasuki usia lanjut berisiko mengalami katarak. Katarak terjadi karena terdapat gumpalan protein pada lensa mata sehingga lensa menjadi keruh dan penglihatan menurun. Berdasarkan informasi tersebut, manakah pernyataan yang PASTI BENAR?",
    type: "single",
    options: [
      { id: "A", text: "Katarak tidak akan terjadi pada seseorang yang berusia muda." },
      { id: "B", text: "Semua orang yang menderita katarak akan mengalami kebutaan." },
      { id: "C", text: "Gangguan penglihatan tidak akan terjadi apabila tidak menderita katarak." },
      { id: "D", text: "Semua orang yang memasuki usia lanjut tidak berisiko mengalami katarak." },
      { id: "E", text: "Sebagian orang yang memasuki usia lanjut berisiko mengalami penurunan penglihatan." },
    ],
    correctAnswer: "E",
    explanation:
      "Katarak terjadi pada sebagian lansia, menyebabkan penurunan penglihatan. Pernyataan E paling sesuai dengan isi teks.",
  },
  {
    id: 2,
    text: "Bayi di bawah usia 12 bulan tidak boleh mengonsumsi madu karena sistem pencernaannya belum sempurna. Madu mengandung spora Clostridium botulinum. Berdasarkan informasi ini, manakah pernyataan yang PASTI SALAH?",
    type: "single",
    options: [
      { id: "A", text: "Sistem pencernaan bayi terganggu karena mengonsumsi madu." },
      { id: "B", text: "Bayi kurang dari setahun akan mengalami infeksi saluran pencernaan jika mengonsumsi madu." },
      { id: "C", text: "Madu aman dikonsumsi siapa pun karena memiliki manfaat untuk kesehatan." },
      { id: "D", text: "Orang dewasa dapat mengalami gangguan pencernaan karena mengonsumsi madu." },
      { id: "E", text: "Madu dalam jumlah banyak tidak berbahaya untuk bayi berusia lebih dari satu tahun." },
    ],
    correctAnswer: "C",
    explanation:
      "Pernyataan C menyatakan madu aman untuk semua orang, padahal bayi di bawah 1 tahun tidak boleh mengonsumsinya. Ini pasti salah.",
  },
  {
    id: 3,
    text: "Hamdan mendapat diskon 15% di Kedai Kopi Merdeka dan menjadi anggota VVIP di Hotel Merdeka. Berdasarkan teks, manakah simpulan yang PALING MUNGKIN BENAR?",
    type: "single",
    options: [
      { id: "A", text: "Hamdan telah memiliki kartu kredit black card Merdeka." },
      { id: "B", text: "Hamdan pernah memiliki kartu kredit black card Merdeka." },
      { id: "C", text: "Hamdan baru saja memiliki kartu kredit black card Merdeka." },
      { id: "D", text: "Hamdan sudah pasti memiliki kartu kredit black card Merdeka." },
      { id: "E", text: "Hamdan mungkin saja memiliki kartu kredit black card Merdeka." },
    ],
    correctAnswer: "A",
    explanation:
      "Diskon dan keanggotaan VVIP hanya diberikan kepada pemilik black card, jadi simpulan A paling mungkin benar.",
  },
  // Soal 4 sampai 30
  {
    id: 4,
    text: "Nara berangkat ke sekolah menggunakan bus sekolah atau diantar orang tuanya. Kemarin Nara tidak menggunakan bus. Manakah simpulan PALING TEPAT?",
    type: "single",
    options: [
      { id: "A", text: "Kemarin semua sekolah libur." },
      { id: "B", text: "Kemarin Nara tidak berangkat ke sekolah." },
      { id: "C", text: "Kemarin Nara menginap di asrama sekolah." },
      { id: "D", text: "Kemarin Nara berangkat ke sekolah diantar orang tuanya." },
      { id: "E", text: "Kemarin Nara berangkat ke sekolah tidak diantar orang tuanya." },
    ],
    correctAnswer: "D",
    explanation: "Kalau tidak naik bus dan tetap berangkat, maka dia diantar orang tuanya. Jawaban D paling tepat.",
  },
  {
    id: 5,
    text: "Rendahnya motivasi belajar dan kurangnya dukungan lingkungan sekitar mengakibatkan prestasi belajar menurun. Siswa tidak akan menerima Beasiswa A apabila prestasi belajar menurun. Desta selalu memperoleh Beasiswa A setiap tahun. Manakah simpulan berikut yang BENAR?",
    type: "single",
    options: [
      { id: "A", text: "Desta memiliki motivasi belajar yang tinggi atau mendapat dukungan lingkungan sekitar." },
      { id: "B", text: "Desta memiliki motivasi belajar yang rendah atau mendapat dukungan lingkungan sekitar." },
      {
        id: "C",
        text: "Desta memiliki motivasi belajar yang tinggi, tetapi kurang mendapat dukungan lingkungan sekitar.",
      },
      { id: "D", text: "Desta memiliki motivasi belajar yang rendah meskipun mendapat dukungan lingkungan sekitar." },
      {
        id: "E",
        text: "Jika Desta memiliki motivasi belajar yang rendah, lingkungan sekitar tidak ada yang mendukungnya.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Karena Desta selalu memperoleh beasiswa, maka prestasinya tidak menurun. Itu berarti dia memiliki motivasi belajar tinggi atau mendapat dukungan lingkungan (atau keduanya).",
  },
  {
    id: 6,
    text: "Banyak affiliator yang ingin membeli gadget I untuk membantu proses pembuatan video. Gadget I dapat meningkatkan kualitas video yang dibuat. Kualitas video yang baik mendukung popularitas dan peningkatan komisi yang diperoleh affiliator. Berdasarkan informasi di atas, manakah pernyataan di bawah ini yang BENAR?",
    type: "single",
    options: [
      { id: "A", text: "Gadget I memiliki harga mahal karena meningkatkan komisi affiliator." },
      { id: "B", text: "Affiliator tidak membeli gadget I atau komisi yang diperoleh menurun." },
      { id: "C", text: "Apabila kualitas video affiliator buruk, komisi yang diperoleh tidak dapat diklaim." },
      { id: "D", text: "Apabila komisi yang diperoleh affiliator menurun, kualitas video affiliator tersebut buruk." },
      { id: "E", text: "Apabila komisi yang diperoleh affiliator meningkat, kualitas video affiliator tersebut baik." },
    ],
    correctAnswer: "E",
    explanation:
      "Karena disebutkan bahwa kualitas video mendukung popularitas dan peningkatan komisi, maka komisi meningkat menunjukkan kualitas videonya baik.",
  },
  {
    id: 7,
    text: "Adipura merupakan penghargaan dari Pemerintah Indonesia untuk kota/kabupaten yang berhasil menjaga kebersihan dan keindahan lingkungan. Adipura Kencana merupakan penghargaan tertinggi yang diberikan kepada kota/kabupaten yang memenuhi semua kriteria Adipura. Kota S telah memenuhi semua kriteria Adipura Kencana. Simpulan berdasarkan informasi tersebut adalah Kota S tidak mendapatkan penghargaan Adipura Kencana tahun ini. Manakah pernyataan berikut yang menggambarkan kualitas simpulan tersebut?",
    type: "single",
    options: [
      { id: "A", text: "Simpulan tersebut pasti benar." },
      { id: "B", text: "Simpulan tersebut mungkin benar." },
      { id: "C", text: "Simpulan tersebut pasti salah." },
      { id: "D", text: "Simpulan tidak relevan dengan informasi yang diberikan." },
      { id: "E", text: "Simpulan tidak dapat dinilai karena informasi tidak cukup." },
    ],
    correctAnswer: "C",
    explanation:
      "Disebutkan bahwa Kota S memenuhi semua syarat Adipura Kencana, maka simpulan bahwa Kota S tidak mendapatkan penghargaan tersebut pasti salah.",
  },
  {
    id: 8,
    text: "Olahraga kardio banyak dipilih orang karena membantu mengontrol berat badan. Olahraga kardio menguras energi lebih banyak dibandingkan jenis olahraga lainnya. Namun, olahraga kardio yang berlebihan dapat menyebabkan penurunan sistem imun. Berdasarkan informasi tersebut, manakah pernyataan yang PASTI SALAH?",
    type: "single",
    options: [
      { id: "A", text: "Diet dapat berhasil apabila melakukan olahraga kardio." },
      { id: "B", text: "Olahraga kardio tidak akan menyebabkan masalah kesehatan." },
      { id: "C", text: "Batas aman olahraga kardio sebanyak 30 menit dalam satu hari." },
      { id: "D", text: "Olahraga kardio paling menguras energi dibandingkan jenis olahraga lainnya." },
      { id: "E", text: "Seseorang mudah terserang penyakit musiman karena terlalu sering olahraga kardio." },
    ],
    correctAnswer: "B",
    explanation:
      "Pernyataan B bertentangan dengan informasi bahwa olahraga kardio berlebihan dapat menyebabkan penurunan sistem imun.",
  },
  {
    id: 9,
    text: "Pakar A menyatakan, 'Badak jawa merupakan mamalia yang keberadaannya terancam punah.' Pakar B menyatakan, 'Badak jawa merupakan mamalia yang keberadaannya tidak terancam punah.' Data menunjukkan bahwa jumlah populasi badak jawa yang ditemukan kurang dari 100 ekor. Manakah pernyataan berikut yang PALING TEPAT mengenai data tersebut?",
    type: "single",
    options: [
      { id: "A", text: "Memperkuat pernyataan A." },
      { id: "B", text: "Memperlemah pernyataan A." },
      { id: "C", text: "Memperkuat pernyataan B." },
      { id: "D", text: "Memperlemah pernyataan B." },
      { id: "E", text: "Tidak relevan dengan pernyataan A dan B." },
    ],
    correctAnswer: "A",
    explanation:
      "Jumlah populasi badak jawa yang kurang dari 100 ekor mendukung pernyataan bahwa spesies ini terancam punah.",
  },
  {
    id: 10,
    text: "Semua anggota keluarga besar Pak Salim berkumpul ketika Idulfitri. Semua anggota keluarga Pak Salim yang bisa cuti saat tahun baru akan berkumpul. Manakah simpulan yang PALING TEPAT mengenai informasi tersebut?",
    type: "single",
    options: [
      { id: "A", text: "Semua anggota keluarga Pak Salim bisa cuti tahun baru atau berkumpul." },
      { id: "B", text: "Semua anggota keluarga Pak Salim bisa cuti tahun baru dan berkumpul." },
      { id: "C", text: "Sebagian anggota keluarga Pak Salim bisa cuti tahun baru atau berkumpul." },
      { id: "D", text: "Sebagian anggota keluarga Pak Salim bisa cuti tahun baru dan berkumpul." },
      { id: "E", text: "Sebagian anggota keluarga Pak Salim tidak bisa cuti tahun baru jika semua berkumpul." },
    ],
    correctAnswer: "A",
    explanation:
      "Simpulan logis yang mengikuti dari premis adalah bahwa setidaknya ada kondisi berkumpul atau bisa cuti, sehingga opsi A paling tepat.",
  },
  {
    id: 11,
    text: "Jenis cokelat hitam dengan kandungan kakao yang tinggi mengandung senyawa yang dapat memicu pelepasan endorfin. Endorfin merupakan hormon yang dapat mengurangi rasa sakit dan membuat seseorang merasa bahagia. Manakah pernyataan sebab-akibat berikut yang PALING MUNGKIN BENAR?",
    type: "single",
    options: [
      {
        id: "A",
        text: "Terlalu sering mengonsumsi cokelat dapat memunculkan dampak negatif seperti diabetes pada seseorang.",
      },
      { id: "B", text: "Semakin tinggi kandungan kakao di dalam cokelat, rasa cokelat tersebut akan semakin lezat." },
      {
        id: "C",
        text: "Jenis cokelat hitam memiliki harga yang relatif lebih tinggi karena dapat memberikan manfaat positif bagi kesehatan mental.",
      },
      {
        id: "D",
        text: "Orang yang kurang mengonsumsi cokelat hitam cenderung tidak bahagia dan gelisah karena merasa kurang nyaman.",
      },
      { id: "E", text: "Jenis cokelat hitam banyak dikonsumsi untuk mengurangi rasa sedih atau cemas." },
    ],
    correctAnswer: "E",
    explanation:
      "Karena kandungan senyawa dalam cokelat hitam memicu pelepasan endorfin, wajar jika banyak orang mengonsumsinya untuk mengurangi rasa sedih/cemas.",
  },
  {
    id: 12,
    text: "Era digital yang berkembang cepat membuat banyak pelaku media cetak terutama koran merasa perlu melakukan digitalisasi produk. Harga koran yang relatif lebih mahal dibandingkan dengan biaya yang dikeluarkan untuk mengakses berita melalui gawai membuat para pembaca lebih memilih mencari berita melalui gawai mereka. Manakah penyataan sebab-akibat berikut yang PALING MUNGKIN BENAR?",
    type: "single",
    options: [
      { id: "A", text: "Banyak pembaca yang tidak lagi membeli koran karena hanya akan menghasilkan sampah kertas." },
      {
        id: "B",
        text: "Harga koran yang relatif lebih mahal menjadi faktor utama mengapa para pembaca lebih memilih mencari berita melalui gawai mereka.",
      },
      {
        id: "C",
        text: "Banyak pelaku media cetak terutama koran merasa perlu melakukan digitalisasi produk karena bisa memangkas biaya cetak.",
      },
      {
        id: "D",
        text: "Perilaku pembaca yang lebih memilih mencari berita melalui gawai membuat para pengiklan mulai memasang iklannya di media digital.",
      },
      {
        id: "E",
        text: "Pelaku media cetak terutama koran tidak perlu khawatir tentang perubahan perilaku pembacanya karena tidak semua pembaca memiliki gawai.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Pernyataan B selaras dengan penjelasan bahwa pembaca lebih memilih gawai karena lebih murah dibanding membeli koran.",
  },
  {
    id: 13,
    text: "Penikmat musik di negara X didominasi oleh masyarakat yang tidak bisa menjaga ketertiban ketika menonton konser. Perilaku mereka cenderung emosional dan destruktif. Menteri pariwisata dan promotor musik di negara X berusaha mengedukasi masyarakat agar penyanyi mancanegara tetap menggelar konser di negara X. Berdasarkan paragraf tersebut, manakah yang PALING MUNGKIN menjadi asumsi yang mendasari argumen di atas?",
    type: "single",
    options: [
      {
        id: "A",
        text: "Penyanyi mancanegara tetap menggelar konser meskipun promotor musik dan menteri pariwisata tidak mengedukasi masyarakat negara X.",
      },
      {
        id: "B",
        text: "Banyaknya penikmat musik yang tidak bisa menjaga ketertiban tidak menyebabkan penyanyi mancanegara enggan menggelar konser di negara X.",
      },
      {
        id: "C",
        text: "Penyanyi mancanegara tetap menggelar konser di negara X karena perilaku konsumtif masyarakatnya yang tinggi.",
      },
      {
        id: "D",
        text: "Perilaku emosional dan cenderung destruktif menjadi salah satu bukti bahwa penikmat musik di negara X memiliki fanatisme yang tinggi.",
      },
      {
        id: "E",
        text: "Perilaku penikmat musik di suatu negara menjadi bahan pertimbangan ketika penyanyi mancanegara hendak menggelar konser.",
      },
    ],
    correctAnswer: "E",
    explanation:
      "Asumsi bahwa perilaku penonton memengaruhi keputusan artis adalah dasar dari usaha edukasi agar konser tetap digelar.",
  },
  {
    id: 14,
    text: "Pada saat musim liburan, lalu lintas di pusat Kota X mengalami kemacetan daripada hari-hari normal. Sebaliknya, lalu lintas di pusat Kota Y justru lebih lancar pada saat musim liburan dibandingkan hari-hari normal. Manakah pernyataan berikut yang PALING MUNGKIN menjelaskan perbedaan kedua kondisi tersebut?",
    type: "single",
    options: [
      { id: "A", text: "Volume kendaraan di jalanan Kota X selalu stabil sepanjang tahun." },
      { id: "B", text: "Tidak ada tempat menarik yang patut dikunjungi di pusat Kota X ketika musim liburan." },
      { id: "C", text: "Banyak penduduk Kota X yang berlibur ke objek wisata di kota Y ketika musim liburan." },
      { id: "D", text: "Objek wisata di pusat Kota X cenderung sepi pengunjung ketika musim liburan." },
      { id: "E", text: "Kota X memiliki objek wisata yang lebih menarik daripada kota-kota lainnya." },
    ],
    correctAnswer: "E",
    explanation: "Kemacetan saat liburan menunjukkan ketertarikan lebih terhadap Kota X sebagai tujuan wisata.",
  },
  {
    id: 15,
    text: "Harga 1 kg beras pada bulan Maret 2023 adalah Rp11.500,00. Pada bulan Oktober di tahun yang sama, harga 1 kg beras sebesar Rp13.500,00. Manakah pernyataan berikut yang PALING MUNGKIN menjelaskan perbedaan kedua kondisi tersebut?",
    type: "single",
    options: [
      { id: "A", text: "Terjadi cuaca buruk pada kuartal kedua hingga ketiga di tahun 2023." },
      { id: "B", text: "Pemerintah melakukan impor beras pada bulan September 2023." },
      {
        id: "C",
        text: "Banyak masyarakat yang beralih mengonsumsi makanan pokok selain beras sejak bulan April 2023.",
      },
      { id: "D", text: "Stok beras pada bulan Oktober 2023 melimpah dibandingkan bulan Maret 2023." },
      {
        id: "E",
        text: "Kualitas beras bulan Maret 2023 lebih baik daripada kualitas beras yang sama pada bulan Oktober 2023.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Cuaca buruk dapat merusak hasil panen, sehingga pasokan berkurang dan harga naik. Ini kemungkinan terbesar yang menjelaskan kenaikan harga beras.",
  },
  {
    id: 16,
    text: "Dampak negatif yang timbul akibat konsumsi antibiotik yang salah adalah bakteri penyebab penyakit yang menjadi resisten (kebal). Bakteri yang resisten terhadap antibiotik akan sulit diobati dan dapat menyebar dengan cepat. Berdasarkan paragraf di atas, manakah yang PALING MUNGKIN BENAR mengenai resistensi bakteri terhadap antibiotik?",
    type: "single",
    options: [
      { id: "A", text: "Banyak penyakit yang diakibatkan oleh bakteri dapat sembuh dengan sendirinya." },
      {
        id: "B",
        text: "Biaya pengobatan penyakit yang disebabkan oleh bakteri akan semakin murah karena tidak perlu membeli antibiotik.",
      },
      { id: "C", text: "Penyakit menular yang diakibatkan oleh bakteri semakin sulit menyebar." },
      { id: "D", text: "Risiko infeksi bakteri pada usus dan paru-paru semakin meningkat." },
      { id: "E", text: "Proses penyembuhan penyakit yang disebabkan oleh bakteri akan semakin singkat." },
    ],
    correctAnswer: "D",
    explanation:
      "Resistensi antibiotik menyebabkan bakteri semakin sulit diobati, yang berarti risiko infeksi dan penyebaran meningkat.",
  },
  {
    id: 17,
    text: "Siswa A menyatakan bahwa keberhasilannya dalam meningkatkan skor tryout sebanyak 250 poin disebabkan oleh disiplin terhadap jadwal belajar yang ketat. Manakah pernyataan di bawah ini, yang jika benar, akan MEMPERKUAT pernyataan siswa A di atas?",
    type: "single",
    options: [
      {
        id: "A",
        text: "Selain disiplin terhadap jadwal belajar yang ketat, siswa A juga menjaga pola makan dan olahraga teratur agar tidak sakit.",
      },
      {
        id: "B",
        text: "Siswa A rutin belajar setiap malam dengan durasi minimal seratus dua puluh menit selama enam pekan terakhir ini.",
      },
      { id: "C", text: "Skor tryout dapat mencerminkan skor ketika ujian yang sesungguhnya nanti." },
      {
        id: "D",
        text: "Meningkatnya skor tryout yang cukup signifikan mampu menambah kepercayaan diri siswa A menjelang ujian.",
      },
      { id: "E", text: "Siswa A belajar ketika ada waktu luang dan mood yang mendukung ketika akan memulai belajar." },
    ],
    correctAnswer: "B",
    explanation:
      "Pernyataan B menunjukkan bahwa siswa A benar-benar menjalankan disiplin belajar yang ketat seperti yang ia klaim.",
  },
  {
    id: 18,
    text: "Penggunaan kompor listrik oleh masyarakat saat ini semakin meningkat. Manakah dua pernyataan berikut yang MEMPERLEMAH argumen bahwa kompor listrik lebih hemat dan ramah lingkungan?",
    type: "multiple",
    options: [
      { id: "A", text: "Pemerintah masih menggunakan bahan bakar fosil sebagai bahan bakar pembangkit listrik." },
      {
        id: "B",
        text: "Biaya untuk membayar listrik yang dikeluarkan untuk penggunaan kompor listrik lebih tinggi daripada harga gas LPG.",
      },
      { id: "C", text: "Harga kompor listrik semakin murah karena produsen menyadari kebutuhan masyarakat." },
      {
        id: "D",
        text: "Penjualan kompor listrik di toko perlengkapan rumah tangga mengalami kenaikan sejak beberapa bulan terakhir.",
      },
      {
        id: "E",
        text: "Agar efisien, migrasi dari kompor gas ke kompor listrik harus dibarengi dengan mengganti alat masak.",
      },
    ],
    correctAnswer: ["A", "B"],
    explanation: "A memperlemah klaim ramah lingkungan, B memperlemah klaim hemat biaya.",
  },
  {
    id: 19,
    text: "Seorang pengamat pendidikan menilai bahwa lambatnya perkembangan pendidikan di daerah terpencil Y disebabkan oleh kurangnya tenaga pengajar yang berkualitas, terbatasnya akses terhadap kurikulum terbaru, dan kondisi geografis yang sulit dijangkau. Manakah pernyataan-pernyataan berikut yang MEMPERKUAT dan TIDAK MEMPERKUAT pendapat pengamat tersebut?",
    type: "multiple",
    options: [
      { id: "I", text: "Implementasi kurikulum terbaru di daerah Y masih terlaksana di jenjang SMA/sederajat saja." },
      { id: "II", text: "Banyak guru di daerah Y harus mengajar mata pelajaran yang tidak ia kuasai." },
      {
        id: "III",
        text: "Pemerintah pusat berhasil melaksanakan pemerataan pembangunan infrastuktur di seluruh wilayahnya.",
      },
      { id: "IV", text: "Banyak orang tua yang ingin anaknya sekolah dengan baik demi memperbesar peluang sukses." },
      {
        id: "V",
        text: "Para lulusan kampus terbaik negeri tidak berminat menjadi guru di daerah terpencil Y karena akses yang serba terbatas.",
      },
    ],
    correctAnswer: ["I", "II", "V"],
    explanation:
      "Semua poin tersebut mendukung adanya hambatan dalam kurikulum, kualitas tenaga pengajar, dan kondisi daerah.",
  },
  {
    id: 20,
    text: "Hidroponik merupakan teknik budidaya tanaman konsumsi maupun dekoratif tanpa menggunakan media tanah. Seorang pedagang sayur menyatakan bahwa penjualan sayur hidroponik semakin menurun karena masyarakat lebih memilih menanam sendiri tanaman hidroponik di rumah. Manakah pernyataan-pernyataan berikut yang MEMPERLEMAH dan TIDAK MEMPERLEMAH pendapat pedagang tersebut?",
    type: "multiple",
    options: [
      {
        id: "I",
        text: "Mayoritas masyarakat yang menanam tanaman hidroponik adalah pencinta tanaman hias yang terkendala lahan.",
      },
      { id: "II", text: "Tanaman hidroponik yang ditanam masyarakat mampu memenuhi kebutuhan pangan harian." },
      { id: "III", text: "Pola hidup sehat yang sedang tren membuat masyarakat gemar mengonsumsi sayur dan buah." },
      {
        id: "IV",
        text: "Kebanyakan masyarakat lebih memilih membeli masakan dari warung daripada harus masak sendiri.",
      },
      { id: "V", text: "Banyak masyarakat yang membeli sayur langsung dari kebun karena dirasa lebih segar." },
    ],
    correctAnswer: ["II", "V"],
    explanation:
      "II menunjukkan masyarakat tak lagi bergantung pada penjual, dan V menunjukkan alternatif pembelian di luar pedagang biasa.",
  },
  {
    id: 21,
    text: "Perhatikan pola bilangan berikut! 128, 1, 64, 9, 32, 81,... Dua suku berikutnya adalah ....",
    type: "single",
    options: [
      { id: "A", text: "16, 729" },
      { id: "B", text: "16, 81" },
      { id: "C", text: "8, 81" },
      { id: "D", text: "8, 9" },
      { id: "E", text: "4, 729" },
    ],
    correctAnswer: "A",
    explanation:
      "Pola bilangan bergantian antara pembagian 2 dan kuadrat: 128, 64, 32, 16 (bagi 2); 1, 9, 81, 729 (kuadrat).",
  },
  {
    id: 22,
    text: "Terdapat dua loyang pizza. Alam mendapatkan 5 potong, yang merupakan 12,5% dari total potongan pizza. Satu loyang terdiri atas ... potong pizza.",
    type: "single",
    options: [
      { id: "A", text: "12" },
      { id: "B", text: "14" },
      { id: "C", text: "16" },
      { id: "D", text: "18" },
      { id: "E", text: "20" },
    ],
    correctAnswer: "E",
    explanation: "5 potong = 12.5% → total = 5 ÷ 0.125 = 40 → 2 loyang = 40 → 1 loyang = 20.",
  },
  {
    id: 23,
    text: "Bilangan berikut yang selisihnya terhadap 4/7 + 31% paling kecil adalah …. ",
    type: "single",
    options: [
      { id: "A", text: "90%" },
      { id: "B", text: "89%" },
      { id: "C", text: "88%" },
      { id: "D", text: "87%" },
      { id: "E", text: "86%" },
    ],
    correctAnswer: "C",
    explanation:
      "Nilai 4/7 adalah sekitar 0,5714. Jika ditambahkan dengan 31% (0,31), hasilnya 0,8814 atau 88,14%. Maka, bilangan yang paling dekat (selisih paling kecil) dengan 88,14% adalah 88%. Jadi, jawabannya adalah 88%.",
  },
  {
    id: 24,
    text: "Hari menjual tas dengan harga Rp315.000,00 dan mengalami kerugian 10%. Harga beli tas tersebut adalah Rp350.000,00. Agar Hari memperoleh keuntungan, harga jual tas tersebut harus lebih dari ....",
    type: "single",
    options: [
      { id: "A", text: "Rp325.000,00" },
      { id: "B", text: "Rp330.000,00" },
      { id: "C", text: "Rp345.000,00" },
      { id: "D", text: "Rp350.000,00" },
      { id: "E", text: "Rp355.000,00" },
    ],
    correctAnswer: "E",
    explanation:
      "Agar memperoleh keuntungan, harga jual harus di atas harga beli (Rp350.000,00). Maka Rp355.000,00 adalah harga minimal untuk untung.",
  },
  {
    id: 25,
    text: "Jumlah unduhan Mipi Legend selama 5 hari berturut-turut adalah: 158, 173, 164, 179, 170. Jika tren konstan, banyak pengguna selama seminggu (7 hari) adalah ....",
    type: "single",
    options: [
      { id: "A", text: "1.205" },
      { id: "B", text: "1.215" },
      { id: "C", text: "1.225" },
      { id: "D", text: "1.235" },
      { id: "E", text: "1.245" },
    ],
    correctAnswer: "B",
    explanation: "Jumlah 5 hari = 844. Rata-rata = 844/5 = 168,8. Untuk 7 hari = 168,8 × 7 ≈ 1.215.",
  },
  {
    id: 26,
    text: "Iyam menempuh 3/5 perjalanan dalam 1 jam 15 menit (1,25 jam) dengan kecepatan 60 km/jam. Jika sisa perjalanan ditempuh dengan kecepatan yang sama, waktu yang diperlukan untuk menyelesaikan sisa perjalanan adalah ... menit.",
    type: "single",
    options: [
      { id: "A", text: "50" },
      { id: "B", text: "45" },
      { id: "C", text: "40" },
      { id: "D", text: "35" },
      { id: "E", text: "30" },
    ],
    correctAnswer: "A",
    explanation: "Sisa jarak 50 km dengan kecepatan 60 km/jam = 50/60 jam = 50 menit.",
  },
  {
    id: 27,
    text: "THR yang diterima Hajar, Suci, dan Yusuf berbanding sebagai 5:2:6. Total THR yang diterima ketiganya adalah Rp14.300.000. Jika tahun ini Hajar mendapat kenaikan THR sebesar 10%, maka THR Hajar tahun ini adalah ....",
    type: "single",
    options: [
      { id: "A", text: "Rp5.050.000,00" },
      { id: "B", text: "Rp5.550.000,00" },
      { id: "C", text: "Rp6.050.000,00" },
      { id: "D", text: "Rp6.550.000,00" },
      { id: "E", text: "Rp7.050.000,00" },
    ],
    correctAnswer: "C",
    explanation: "Total rasio: 13 → Hajar: 5/13 × 14.300.000 = 5.500.000 → naik 10% = 6.050.000",
  },
  {
    id: 28,
    text: "Nilai akhir Market Day dihitung dengan rumus: 45% nilai Proposal + 55% nilai Penjualan. Berikut adalah nilai Proposal dan Penjualan dari lima kelas: A(90,80), B(80,90), C(70,100), D(100,80), E(80,70). Kelas dengan nilai akhir tertinggi adalah ....",
    type: "single",
    options: [
      { id: "A", text: "Kelas A" },
      { id: "B", text: "Kelas B" },
      { id: "C", text: "Kelas C" },
      { id: "D", text: "Kelas D" },
      { id: "E", text: "Kelas E" },
    ],
    correctAnswer: "D",
    explanation:
      "A: 40.5 + 44 = 84.5. B: 36 + 49.5 = 85.5. C: 31.5 + 55 = 86.5. D: 45 + 44 = 89. E: 36 + 38.5 = 74.5. Kelas D memiliki nilai tertinggi.",
  },
  {
    id: 29,
    text: "Diagram menunjukkan penjualan keripik rasa balado dan rumput laut selama Januari–Mei. Kenaikan penjualan terbesar terjadi pada ....",
    type: "single",
    diagram: "/images/questions/puimg.png",
    options: [
      { id: "A", text: "Keripik balado, Januari–Februari" },
      { id: "B", text: "Keripik rumput laut, Februari–Maret" },
      { id: "C", text: "Keripik balado, Maret–April" },
      { id: "D", text: "Keripik rumput laut, Maret–April" },
      { id: "E", text: "Keripik balado, April–Mei" },
    ],
    correctAnswer: "A",
    explanation: "Dari diagram, kenaikan tajam keripik balado terlihat paling besar antara Januari dan Februari.",
  },
  {
    id: 30,
    text: "Pernyataan manakah yang PALING TEPAT berdasarkan data penjualan keripik di diagram?",
    diagram: "/images/questions/puimg.png",
    type: "single",
    options: [
      { id: "A", text: "Total penjualan keripik tertinggi terjadi pada bulan Maret." },
      { id: "B", text: "Total penjualan keripik terendah terjadi pada bulan April." },
      { id: "C", text: "Total penjualan keripik balado dan rumput laut sama banyak." },
      { id: "D", text: "Total penjualan keripik Januari dan Maret sama banyak." },
      { id: "E", text: "Penjualan keripik balado lebih sedikit dari rumput laut." },
    ],
    correctAnswer: "B",
    explanation: "Dari grafik, bulan April tampak sebagai titik terendah total penjualan kedua rasa keripik.",
  },
]

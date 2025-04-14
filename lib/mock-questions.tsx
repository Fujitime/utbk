// This file contains mock questions for the UTBK simulation
// In a real app, these would be generated dynamically with AI

export const mockQuestions: Record<string, any[]> = {
  "Penalaran Umum": [
    {
      id: 1,
      text: "Jika semua A adalah B, dan beberapa B adalah C, maka...",
      options: [
        { id: "A", text: "Semua A adalah C" },
        { id: "B", text: "Beberapa A adalah C" },
        { id: "C", text: "Semua C adalah A" },
        { id: "D", text: "Tidak dapat ditentukan hubungan antara A dan C" },
      ],
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
    },
    // More questions would be added here
  ],
  "Pengetahuan dan Pemahaman Umum": [
    {
      id: 1,
      text: "Protokol Kyoto berkaitan dengan masalah global apa?",
      options: [
        { id: "A", text: "Perdagangan internasional" },
        { id: "B", text: "Perubahan iklim" },
        { id: "C", text: "Hak asasi manusia" },
        { id: "D", text: "Perlindungan keanekaragaman hayati" },
      ],
    },
    {
      id: 2,
      text: "Siapakah tokoh yang dikenal sebagai Bapak Koperasi Indonesia?",
      options: [
        { id: "A", text: "Mohammad Hatta" },
        { id: "B", text: "Soekarno" },
        { id: "C", text: "Ki Hajar Dewantara" },
        { id: "D", text: "Tan Malaka" },
      ],
    },
    // More questions would be added here
  ],
  "Kemampuan Memahami Bacaan dan Menulis": [
    {
      id: 1,
      text: "Bacalah paragraf berikut:\n\nPada era digital ini, literasi digital menjadi keterampilan yang sangat penting. Literasi digital mencakup kemampuan untuk menggunakan teknologi informasi dan komunikasi untuk menemukan, mengevaluasi, membuat, dan mengomunikasikan informasi. Namun, masih banyak masyarakat yang belum memiliki keterampilan ini.\n\nGagasan utama dari paragraf tersebut adalah...",
      options: [
        { id: "A", text: "Pentingnya teknologi informasi di era digital" },
        { id: "B", text: "Pentingnya literasi digital sebagai keterampilan di era digital" },
        { id: "C", text: "Kurangnya keterampilan digital di masyarakat" },
        { id: "D", text: "Cara menggunakan teknologi informasi dan komunikasi" },
      ],
    },
    // More questions would be added here
  ],
  "Pengetahuan Kuantitatif": [
    {
      id: 1,
      text: "Jika 3x + 2y = 12 dan 2x - y = 5, maka nilai dari x + y adalah...",
      options: [
        { id: "A", text: "3" },
        { id: "B", text: "4" },
        { id: "C", text: "5" },
        { id: "D", text: "6" },
      ],
    },
    // More questions would be added here
  ],
  "Literasi dalam Bahasa Indonesia": [
    {
      id: 1,
      text: 'Bacalah kutipan berikut:\n\n"Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia." - Nelson Mandela\n\nMakna kutipan tersebut adalah...',
      options: [
        { id: "A", text: "Pendidikan dapat digunakan sebagai alat untuk berperang" },
        { id: "B", text: "Pendidikan adalah hal yang berbahaya bagi dunia" },
        { id: "C", text: "Pendidikan memiliki kekuatan besar untuk membawa perubahan positif di dunia" },
        { id: "D", text: "Pendidikan hanya berguna bagi orang-orang tertentu" },
      ],
    },
    // More questions would be added here
  ],
  "Literasi dalam Bahasa Inggris": [
    {
      id: 1,
      text: "Read the following passage:\n\nClimate change is one of the most pressing issues of our time. It affects every country and can have devastating effects on communities, economies, and ecosystems. Addressing climate change requires global cooperation and immediate action.\n\nWhat is the main idea of this passage?",
      options: [
        { id: "A", text: "Climate change only affects certain countries" },
        { id: "B", text: "Climate change is a serious global issue requiring immediate action" },
        { id: "C", text: "Ecosystems are the most affected by climate change" },
        { id: "D", text: "Global cooperation is impossible to achieve" },
      ],
    },
    // More questions would be added here
  ],
  "Penalaran Matematika": [
    {
      id: 1,
      text: "Sebuah bola dilempar ke atas dengan kecepatan awal 20 m/s. Jika percepatan gravitasi adalah 10 m/s², maka ketinggian maksimum yang dicapai bola tersebut adalah...",
      options: [
        { id: "A", text: "10 meter" },
        { id: "B", text: "20 meter" },
        { id: "C", text: "30 meter" },
        { id: "D", text: "40 meter" },
      ],
    },
    // More questions would be added here
  ],
}

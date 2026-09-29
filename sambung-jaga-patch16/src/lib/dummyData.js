// Dummy, realistic-feeling seed data. No real personal data, no real emergency numbers.

export const CATEGORIES = [
  { id: 'teman-bicara', label: 'Teman bicara', emoji: '🫂' },
  { id: 'transportasi', label: 'Transportasi', emoji: '🚗' },
  { id: 'makanan', label: 'Makanan', emoji: '🍚' },
  { id: 'belajar', label: 'Bantuan belajar', emoji: '📚' },
  { id: 'rumah', label: 'Bantuan rumah', emoji: '🧹' },
  { id: 'informasi', label: 'Informasi', emoji: '📢' },
  { id: 'anak', label: 'Pendampingan anak', emoji: '👶' },
  { id: 'lainnya', label: 'Lainnya', emoji: '✨' },
]

export const TIMEFRAMES = [
  'Hari ini',
  'Minggu ini',
  'Beberapa minggu ke depan',
  'Sampai kebutuhan selesai',
]

export const PREFERENSI = ['Online', 'Bertemu langsung', 'Keduanya']

export const AREAS = ['RW 01', 'RW 02', 'RW 03', 'RW 04', 'RW 05', 'RW 06']

export const COMMUNITY_CAPACITY = [
  { categoryId: 'teman-bicara', label: 'orang siap menemani', count: 11, emoji: '🫂' },
  { categoryId: 'transportasi', label: 'orang bisa membantu transportasi', count: 7, emoji: '🚗' },
  { categoryId: 'makanan', label: 'orang bisa membantu makanan', count: 15, emoji: '🍚' },
  { categoryId: 'belajar', label: 'orang bisa membantu belajar', count: 8, emoji: '📚' },
  { categoryId: 'informasi', label: 'orang bisa membantu informasi', count: 5, emoji: '📢' },
]

export const COMMUNITY_NEEDS = [
  { categoryId: 'makanan', label: 'kebutuhan makanan belum terhubung', count: 3, emoji: '🍚' },
  { categoryId: 'transportasi', label: 'orang sedang mencari transportasi', count: 2, emoji: '🚗' },
]

// Dummy people available for matching, keyed by category id
export const DUMMY_HELPERS = {
  'teman-bicara': [
    { id: 'h1', initial: 'A.', area: 'RW 04', availability: 'Tersedia sore hari', note: 'Saya bersedia menemani berbicara secara langsung atau melalui pesan.' },
    { id: 'h2', initial: 'R.', area: 'RW 02', availability: 'Tersedia akhir pekan', note: 'Senang mendengarkan, tidak buru-buru memberi saran.' },
    { id: 'h3', initial: 'S.', area: 'RW 04', availability: 'Tersedia malam hari', note: 'Bisa lewat telepon kalau lebih nyaman.' },
  ],
  transportasi: [
    { id: 'h4', initial: 'D.', area: 'RW 03', availability: 'Tersedia pagi hari', note: 'Punya motor, bisa antar jarak dekat.' },
    { id: 'h5', initial: 'M.', area: 'RW 04', availability: 'Tersedia siang hari', note: 'Bisa bantu antar ke puskesmas atau sekolah.' },
  ],
  makanan: [
    { id: 'h6', initial: 'N.', area: 'RW 01', availability: 'Setiap hari', note: 'Sering masak lebih, senang berbagi.' },
    { id: 'h7', initial: 'T.', area: 'RW 04', availability: 'Akhir pekan', note: 'Bisa bantu bahan makanan pokok.' },
  ],
  belajar: [
    { id: 'h8', initial: 'F.', area: 'RW 02', availability: 'Sore setelah jam 4', note: 'Terbiasa dampingi anak SD dan SMP belajar.' },
  ],
  rumah: [
    { id: 'h9', initial: 'W.', area: 'RW 05', availability: 'Akhir pekan', note: 'Bisa bantu beres-beres ringan.' },
  ],
  informasi: [
    { id: 'h10', initial: 'B.', area: 'RW 03', availability: 'Kapan saja', note: 'Aktif update info bantuan dan layanan sekitar.' },
  ],
  anak: [
    { id: 'h11', initial: 'L.', area: 'RW 04', availability: 'Sore hari', note: 'Suka main dan mendampingi anak-anak.' },
  ],
  lainnya: [
    { id: 'h12', initial: 'K.', area: 'RW 02', availability: 'Fleksibel', note: 'Terbuka membantu hal lain sesuai kemampuan.' },
  ],
}

export const LINGKAR_JAGA_SEED = [
  {
    id: 'lj1',
    nama: "Lingkar Jaga RW 04",
    peserta: 12,
    waktu: 'Sabtu · 16.00',
    lokasi: 'Balai warga',
    topik: 'Saling bercerita tentang satu bulan terakhir',
    batasPeserta: 20,
  },
  {
    id: 'lj2',
    nama: 'Lingkar Jaga Ibu-ibu RW 02',
    peserta: 8,
    waktu: 'Minggu · 09.00',
    lokasi: 'Halaman posyandu',
    topik: 'Apa yang membantu kita bertahan minggu ini',
    batasPeserta: 15,
  },
]

export const RUJUKAN_DATA = [
  {
    kategori: 'Puskesmas',
    layanan: [
      { nama: 'Puskesmas Kelurahan X', deskripsi: 'Layanan kesehatan umum & rujukan awal', kontak: '(dummy) 0800-100-2001' },
    ],
  },
  {
    kategori: 'Layanan kesehatan mental',
    layanan: [
      { nama: 'Layanan Konseling Komunitas', deskripsi: 'Pendampingan psikologis awal, gratis untuk warga terdampak', kontak: '(dummy) 0800-100-2002' },
    ],
  },
  {
    kategori: 'Psikolog',
    layanan: [
      { nama: 'Klinik Psikologi Mitra Pulih', deskripsi: 'Konsultasi psikolog klinis, dengan/tanpa rujukan', kontak: '(dummy) 0800-100-2003' },
    ],
  },
  {
    kategori: 'Layanan kebencanaan',
    layanan: [
      { nama: 'Posko Pemulihan Kecamatan Y', deskripsi: 'Informasi bantuan logistik & pemulihan pascabencana', kontak: '(dummy) 0800-100-2004' },
    ],
  },
  {
    kategori: 'Layanan darurat',
    layanan: [
      { nama: 'Pusat Panggilan Darurat (contoh)', deskripsi: 'Nomor contoh untuk keperluan prototipe — bukan nomor darurat asli', kontak: '(dummy) 000' },
    ],
  },
]

export const RUANG_PULIH_CONTENT = {
  kehilangan: {
    title: 'Merasa kehilangan',
    emoji: '😔',
    intro: 'Kehilangan bisa berupa banyak hal — orang, rumah, rutinitas, atau rasa aman. Semua itu wajar untuk dirasakan.',
    activities: [
      {
        id: 'kehilangan-refleksi',
        title: 'Refleksi singkat',
        type: 'reflection',
        prompt: 'Apa satu hal kecil yang masih terasa familiar bagi Anda saat ini?',
      },
      {
        id: 'kehilangan-grounding',
        title: 'Aktivitas grounding',
        type: 'steps',
        steps: [
          'Duduk dengan nyaman, rasakan kaki menyentuh lantai.',
          'Sebutkan dalam hati 3 benda di sekitar Anda.',
          'Tarik napas perlahan sebanyak 3 kali.',
        ],
      },
      {
        id: 'kehilangan-rutinitas',
        title: 'Membangun kembali rutinitas kecil',
        type: 'steps',
        steps: [
          'Pilih satu rutinitas kecil yang dulu biasa Anda lakukan.',
          'Coba lakukan versi sederhananya hari ini.',
          'Tidak apa jika belum sama seperti dulu.',
        ],
      },
    ],
  },
  cemas: {
    title: 'Merasa cemas',
    emoji: '😰',
    intro: 'Rasa cemas setelah masa sulit adalah respons yang wajar. Anda tidak perlu menghilangkannya sekaligus.',
    activities: [
      {
        id: 'cemas-nafas',
        title: 'Latihan pernapasan',
        type: 'breathing',
        prompt: 'Ikuti irama lingkaran: tarik napas saat membesar, hembuskan saat mengecil.',
      },
      {
        id: 'cemas-ketidakpastian',
        title: 'Menghadapi ketidakpastian',
        type: 'reflection',
        prompt: 'Apa satu hal yang masih bisa Anda kendalikan hari ini, sekecil apa pun?',
      },
      {
        id: 'cemas-info',
        title: 'Sumber informasi terpercaya',
        type: 'info',
        prompt: 'Mencari informasi dari sumber resmi dapat membantu mengurangi ketidakpastian. Lihat Rujukan untuk sumber terpercaya di sekitar Anda.',
      },
    ],
  },
  sendiri: {
    title: 'Merasa sendiri',
    emoji: '🫥',
    intro: 'Rasa sendiri sering muncul saat rutinitas dan hubungan ikut berubah. Anda tidak harus terhubung dengan banyak orang sekaligus.',
    activities: [
      {
        id: 'sendiri-reconnect',
        title: 'Menjajaki koneksi kembali',
        type: 'reflection',
        prompt: 'Siapa satu orang yang dulu terasa nyaman untuk diajak bicara?',
      },
      {
        id: 'sendiri-hubungi',
        title: 'Menghubungi satu orang',
        type: 'steps',
        steps: [
          'Pikirkan satu orang yang ingin Anda hubungi.',
          'Kirim pesan singkat, tidak perlu panjang.',
          'Cukup tanyakan kabar mereka.',
        ],
      },
      {
        id: 'sendiri-lingkar',
        title: 'Coba Lingkar Jaga',
        type: 'link',
        prompt: 'Lingkar Jaga adalah pertemuan kecil untuk saling bercerita. Anda bisa ikut tanpa harus bicara banyak.',
        linkTo: 'lingkar',
      },
    ],
  },
  penuh: {
    title: 'Pikiran terasa penuh',
    emoji: '🧠',
    intro: 'Saat pikiran terasa penuh, tidak semua hal perlu diselesaikan sekaligus.',
    activities: [
      {
        id: 'penuh-54321',
        title: 'Grounding 5-4-3-2-1',
        type: 'steps',
        steps: [
          'Sebutkan 5 hal yang bisa Anda lihat.',
          'Sebutkan 4 hal yang bisa Anda sentuh.',
          'Sebutkan 3 hal yang bisa Anda dengar.',
          'Sebutkan 2 hal yang bisa Anda cium.',
          'Sebutkan 1 hal yang bisa Anda rasakan (perasaan saat ini).',
        ],
      },
      {
        id: 'penuh-prioritas',
        title: 'Prioritas sederhana',
        type: 'reflection',
        prompt: 'Dari semua yang ada di pikiran, satu hal apa yang paling perlu perhatian hari ini?',
      },
      {
        id: 'penuh-refleksi',
        title: 'Refleksi singkat',
        type: 'reflection',
        prompt: 'Apa yang bisa Anda tunda dulu tanpa merasa bersalah?',
      },
    ],
  },
}

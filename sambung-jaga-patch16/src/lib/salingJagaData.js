// One taxonomy for BOTH directions (Butuh Bantuan / Bisa Membantu).
// Every example is fictional and illustrative; no real people, addresses or locations.
// ask = situation seen from Butuh Bantuan, need = same need seen from Bisa Membantu,
// offer = community support that responds. share/when = tiny illustrative capacity preview.
export const CATEGORIES = [
  {
    id: 'dasar', name: 'Kebutuhan Dasar', emoji: '🍚',
    types: ['Makanan siap santap', 'Air minum', 'Bahan makanan', 'Kebutuhan sehari-hari'],
    examples: [
      {
        type: 'Makanan siap santap',
        ask: 'Dibutuhkan makanan siap santap untuk beberapa anggota komunitas setelah kegiatan pemulihan.',
        need: 'Ada anggota komunitas yang sedang membutuhkan makanan siap santap setelah kegiatan pemulihan.',
        offer: 'Ada anggota komunitas yang bisa berbagi makanan pada waktu tersebut.',
        share: 'Untuk beberapa orang',
      },
      {
        type: 'Air minum',
        ask: 'Dibutuhkan air minum untuk anggota komunitas yang mengikuti kegiatan di ruang komunitas.',
        need: 'Ada anggota komunitas yang membutuhkan air minum untuk kegiatan di ruang komunitas.',
        offer: 'Ada anggota komunitas yang bisa membagikan air minum pada kegiatan tersebut.',
        share: 'Untuk beberapa orang',
      },
    ],
  },
  {
    id: 'akses', name: 'Akses Layanan & Mobilitas', emoji: '🚶',
    types: ['Pendampingan menuju layanan kesehatan', 'Pendampingan menuju layanan publik', 'Pendampingan menuju posko', 'Pendampingan menuju kegiatan komunitas', 'Bantuan akses transportasi untuk kegiatan atau layanan'],
    offline: true,
    cue: 'Kalau kamu tersedia untuk membantu akses menuju layanan, kamu bisa mengambil peran dalam kebutuhan ini.',
    examples: [
      {
        type: 'Pendampingan menuju layanan kesehatan',
        ask: 'Dibutuhkan pendampingan untuk mengakses layanan kesehatan pada waktu yang telah ditentukan.',
        need: 'Ada anggota komunitas yang membutuhkan pendampingan untuk mengakses layanan kesehatan pada waktu yang telah ditentukan.',
        offer: 'Ada anggota komunitas yang tersedia menemani akses menuju layanan pada waktu tersebut.',
        note: ['Pendampingan ke layanan', 'Pendampingan ini untuk membantu akses menuju layanan, bukan menggantikan tenaga kesehatan.'],
        when: 'Sabtu pagi',
      },
      {
        type: 'Pendampingan menuju posko',
        ask: 'Dibutuhkan teman untuk menuju posko layanan bersama-sama.',
        need: 'Ada anggota komunitas yang ingin ditemani menuju posko layanan.',
        offer: 'Ada anggota komunitas yang tersedia menemani menuju posko pada waktu tersebut.',
        when: 'Pagi',
      },
    ],
  },
  {
    id: 'aktivitas', name: 'Bantuan Aktivitas', emoji: '🧺',
    types: ['Mengambil kebutuhan', 'Mengantarkan barang', 'Membantu pekerjaan ringan', 'Membantu menyiapkan kebutuhan sederhana'],
    offline: true,
    examples: [
      {
        type: 'Mengambil kebutuhan',
        ask: 'Dibutuhkan bantuan mengambil paket kebutuhan di posko komunitas.',
        need: 'Ada anggota komunitas yang membutuhkan bantuan mengambil paket kebutuhan di posko komunitas.',
        offer: 'Ada anggota komunitas yang bisa membantu mengambilkan dan menyerahkannya di ruang komunitas.',
        when: 'Siang',
      },
      {
        type: 'Membantu pekerjaan ringan',
        ask: 'Dibutuhkan bantuan ringan menyiapkan perlengkapan kegiatan di ruang komunitas.',
        need: 'Ada anggota komunitas yang membutuhkan bantuan menyiapkan perlengkapan kegiatan di ruang komunitas.',
        offer: 'Ada anggota komunitas yang bisa membantu menyiapkannya bersama-sama.',
        when: 'Sore',
      },
    ],
  },
  {
    id: 'informasi', name: 'Informasi & Administrasi', emoji: '📋',
    types: ['Mencari informasi layanan', 'Membagikan informasi', 'Memahami prosedur', 'Bantuan administrasi sederhana', 'Mencari informasi fasilitas atau layanan'],
    examples: [
      {
        type: 'Mencari informasi layanan',
        ask: 'Dibutuhkan bantuan mencari informasi layanan pemulihan yang tersedia di sekitar.',
        need: 'Ada anggota komunitas yang sedang mencari informasi layanan pemulihan.',
        offer: 'Ada anggota komunitas yang bisa membantu mencari dan membagikan informasi layanan.',
        when: 'Fleksibel',
      },
      {
        type: 'Memahami prosedur',
        ask: 'Dibutuhkan bantuan memahami prosedur layanan yang perlu diikuti.',
        need: 'Ada anggota komunitas yang sedang mencoba memahami prosedur layanan.',
        offer: 'Ada anggota komunitas yang bisa menjelaskan prosedur dengan bahasa sederhana.',
        when: 'Fleksibel',
      },
    ],
  },
  {
    id: 'koneksi', name: 'Koneksi & Kegiatan Komunitas', emoji: '🌿',
    types: ['Menemani mengikuti kegiatan komunitas', 'Mengajak bergabung dalam kegiatan', 'Membantu kegiatan komunitas', 'Menemukan kegiatan bersama', 'Membantu kembali terhubung dengan komunitas'],
    offline: true,
    cue: 'Kalau kamu sedang tersedia, kamu bisa membantu membuka kembali ruang untuk terhubung.',
    examples: [
      {
        type: 'Mengajak bergabung dalam kegiatan',
        ask: 'Dibutuhkan ajakan untuk kembali mengikuti kegiatan bersama di ruang komunitas.',
        need: 'Ada anggota komunitas yang ingin kembali mengikuti kegiatan bersama di ruang komunitas.',
        offer: 'Ada anggota komunitas yang bisa mengajak dan menemani ke kegiatan di ruang komunitas.',
        when: 'Sore',
      },
      {
        type: 'Menemani mengikuti kegiatan komunitas',
        ask: 'Dibutuhkan teman untuk mengikuti kegiatan komunitas minggu ini.',
        need: 'Ada anggota komunitas yang ingin ditemani mengikuti kegiatan komunitas.',
        offer: 'Ada anggota komunitas yang bisa menemani mengikuti kegiatan di ruang komunitas.',
        when: 'Akhir pekan',
      },
    ],
  },
]

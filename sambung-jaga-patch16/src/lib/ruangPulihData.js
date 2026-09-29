// Ruang Pulih: a check-in, NOT a measurement. A chosen state only decides which activity options are shown.
// Nothing here is scored, stored or interpreted.
const SJ = { label: 'Lihat Saling Jaga', to: '/app/saling-jaga' }
const LJ = { label: 'Lihat Lingkar Jaga', to: '/app/lingkar-jaga' }
const RJ = { label: 'Lihat Rujukan', to: '/app/rujukan' }
export const LINKS = { SJ, LJ, RJ }

const CLOSE_MOMENT = 'Tidak perlu disimpan sebagai catatan. Cukup sadari momen ini.'
const CONNECT = ['Menghubungi seseorang', 'Ikut kegiatan komunitas', 'Meluangkan waktu bersama orang lain', 'Nanti saja']

export const STATES = [
  { id: 'baik', emoji: '😊', label: 'Aku merasa baik', desc: 'Tenang, lega, bersemangat, atau menikmati hari.', activities: ['nikmati', 'ingat', 'terhubung'] },
  { id: 'oke', emoji: '🌱', label: 'Aku merasa cukup oke', desc: 'Hari berjalan seperti biasa dan rasanya cukup baik.', activities: ['satu-hal', 'jeda-sebentar', 'koneksi'] },
  { id: 'tenang', emoji: '😌', label: 'Aku merasa tenang', desc: 'Rasanya cukup stabil dan nyaman hari ini.', activities: ['momen', 'tanpa-terburu', 'dibawa'] },
  { id: 'kewalahan', emoji: '😕', label: 'Aku agak kewalahan', desc: 'Ada beberapa hal yang terasa memenuhi pikiran.', activities: ['grounding', 'satu-langkah', 'jeda'] },
  { id: 'kurang', emoji: '🌧️', label: 'Aku sedang kurang baik', desc: 'Hari ini terasa lebih berat dari biasanya.', activities: ['bisa-kulakukan', 'grounding', 'dukungan'] },
  { id: 'belum-tahu', emoji: '💭', label: 'Aku sendiri belum tahu', desc: 'Sulit menjelaskan apa yang sedang kurasakan.', activities: ['berhenti', 'kubutuhkan', 'tulis'] },
]

// type: pick (choose one) | write (optional text, not saved) | steps (one at a time) | support (routes)
export const ACTIVITIES = {
  nikmati: { title: 'Nikmati Momen Ini', desc: 'Berhenti sebentar dan perhatikan apa yang membuat hari ini terasa baik.', type: 'pick',
    prompt: 'Apa satu hal kecil yang sedang kamu nikmati hari ini?',
    choices: ['Waktu bersama seseorang', 'Makanan yang enak', 'Udara pagi', 'Pekerjaan yang selesai', 'Waktu untuk diri sendiri'], closing: CLOSE_MOMENT },
  ingat: { title: 'Simpan yang Ingin Diingat', desc: 'Catat satu hal kecil dari hari ini yang ingin kamu ingat.', type: 'write',
    prompt: 'Apa satu hal kecil dari hari ini yang ingin kamu ingat?', placeholder: 'Hari ini aku ingin mengingat…', closing: 'Cukup sampai di sini. Tulisanmu tidak disimpan.' },
  terhubung: { title: 'Tetap Terhubung', desc: 'Ada seseorang atau kegiatan yang ingin kamu temui hari ini?', type: 'pick',
    prompt: 'Ada seseorang atau kegiatan yang ingin kamu temui hari ini?', choices: CONNECT, links: [LJ], closing: 'Terhubung bisa dimulai dari hal kecil.' },

  'satu-hal': { title: 'Satu Hal untuk Hari Ini', desc: 'Pilih satu hal kecil yang ingin kamu lakukan hari ini.', type: 'pick',
    prompt: 'Pilih satu hal kecil yang ingin kamu lakukan hari ini.',
    choices: ['Makan tepat waktu', 'Menyelesaikan satu tugas kecil', 'Berjalan sebentar', 'Membaca', 'Beristirahat', 'Menghubungi seseorang'], closing: 'Satu hal kecil sudah cukup.' },
  'jeda-sebentar': { title: 'Jeda Sebentar', desc: 'Beri dirimu beberapa detik tanpa melakukan apa-apa.', type: 'steps',
    steps: ['Tarik napas perlahan dan beri dirimu beberapa detik tanpa melakukan apa-apa.'], closing: 'Tidak perlu mengubah apa pun. Cukup beri dirimu jeda.' },
  koneksi: { title: 'Tetap Terhubung', desc: 'Apa satu koneksi yang ingin kamu jaga hari ini?', type: 'pick',
    prompt: 'Apa satu koneksi yang ingin kamu jaga hari ini?', choices: CONNECT, links: [LJ], closing: 'Terhubung bisa dimulai dari hal kecil.' },

  momen: { title: 'Simpan Momen Ini', desc: 'Apa yang membuat hari ini terasa cukup baik atau tenang?', type: 'pick',
    prompt: 'Apa yang membuat hari ini terasa cukup baik atau tenang?', choices: ['Seseorang', 'Tempat', 'Kegiatan', 'Sesuatu yang berhasil dilakukan', 'Waktu untuk diri sendiri'], closing: CLOSE_MOMENT },
  'tanpa-terburu': { title: 'Nikmati Tanpa Terburu-buru', desc: 'Pilih satu hal di sekitarmu dan perhatikan sebentar.', type: 'steps',
    steps: ['Pilih satu hal di sekitarmu. Perhatikan selama beberapa saat tanpa perlu menilainya.'], closing: 'Tidak ada yang perlu dikejar.' },
  dibawa: { title: 'Satu Hal yang Ingin Kubawa Hari Ini', desc: 'Apa satu hal dari keadaanmu sekarang yang ingin kamu bawa ke sisa hari ini?', type: 'pick',
    prompt: 'Apa satu hal dari keadaanmu sekarang yang ingin kamu bawa ke sisa hari ini?', choices: ['Ketenangan', 'Rasa cukup', 'Keberanian', 'Fokus', 'Rasa terhubung'], closing: 'Semoga itu menemanimu sepanjang hari.' },

  grounding: { title: 'Lakukan Grounding', desc: 'Arahkan perhatianmu kembali pada apa yang ada di sekitarmu.', type: 'steps',
    steps: ['Arahkan perhatianmu kembali pada apa yang ada di sekitarmu. Kita lakukan 3 — 2 — 1.', '👀 Sebutkan 3 hal yang bisa kamu lihat.', '👂 Sebutkan 2 hal yang bisa kamu dengar.', '✋ Rasakan 1 hal dari tubuhmu.', 'Tarik napas perlahan. Tidak perlu memaksa diri untuk langsung merasa lebih baik.'],
    feedback: { q: 'Bagaimana rasanya setelah jeda ini?', choices: [
      { label: 'Sedikit lebih ringan' }, { label: 'Kurang lebih sama' },
      { label: 'Aku masih merasa sangat kewalahan', links: [SJ, RJ], note: 'Tidak apa-apa. Kamu tidak harus melewatinya sendirian. Kalau mau, ini beberapa pilihan dukungan.' },
    ] }, closing: 'Terima kasih sudah meluangkan waktu.' },
  'satu-langkah': { title: 'Pecah Jadi Satu Langkah', desc: 'Pilih satu hal yang paling mungkin dilakukan sekarang.', type: 'pick',
    prompt: 'Kalau semuanya terasa terlalu banyak, pilih satu hal yang paling mungkin dilakukan sekarang.',
    choices: ['Minum', 'Makan', 'Mandi', 'Menyelesaikan satu bagian kecil pekerjaan', 'Beristirahat', { label: 'Meminta bantuan praktis', links: [SJ] }], closing: 'Tidak harus menyelesaikan semuanya hari ini.' },
  jeda: { title: 'Beri Diriku Jeda', desc: 'Berhenti sebentar dan tarik napas perlahan.', type: 'steps',
    steps: ['Berhenti sebentar. Letakkan hal yang sedang kamu kerjakan jika memungkinkan.', 'Tarik napas perlahan.', 'Lepaskan perlahan.', 'Beri dirimu waktu beberapa saat sebelum kembali melanjutkan.'], closing: 'Kamu boleh kembali kapan pun kamu siap.' },

  'bisa-kulakukan': { title: 'Satu Hal yang Bisa Kulakukan', desc: 'Apa satu hal kecil yang masih mungkin kamu lakukan hari ini?', type: 'pick',
    prompt: 'Apa satu hal kecil yang masih mungkin kamu lakukan hari ini? Pilih sesuatu yang terasa mungkin dilakukan, bukan sesuatu yang harus sempurna.',
    choices: ['Makan', 'Minum', 'Mandi', 'Tidur atau beristirahat', 'Keluar sebentar', 'Menghubungi seseorang'], closing: 'Satu hal kecil itu sudah berarti.' },
  dukungan: { title: 'Cari Dukungan', desc: 'Kamu tidak harus mengurus semuanya sendirian.', type: 'support',
    prompt: 'Kamu tidak harus mengurus semuanya sendirian. Pilih jalur yang terasa sesuai, dan kamu boleh memakai lebih dari satu.',
    routes: [{ ...SJ, hint: 'Dukungan praktis dari komunitas' }, { ...RJ, hint: 'Dukungan profesional atau bantuan formal' }] },

  berhenti: { title: 'Berhenti Sejenak', desc: 'Tidak apa-apa kalau belum tahu.', type: 'steps',
    steps: ['Tidak apa-apa kalau belum tahu. Kamu tidak harus langsung memberi nama pada apa yang sedang kamu rasakan.', 'Tarik napas perlahan.', 'Lepaskan perlahan.'], closing: 'Kamu bisa berhenti kapan saja.' },
  kubutuhkan: { title: 'Cek Apa yang Kubutuhkan', desc: 'Mungkin yang kamu butuhkan sekarang adalah…', type: 'pick',
    prompt: 'Mungkin yang kamu butuhkan sekarang adalah…',
    choices: [{ label: '💤 Istirahat' }, { label: '💧 Kebutuhan dasar' }, { label: '🤝 Terhubung dengan seseorang' }, { label: '🌿 Sedikit ruang untuk diri sendiri' }, { label: '🧩 Bantuan praktis', links: [SJ] }, { label: '💬 Bantuan lebih lanjut', links: [RJ] }],
    closing: 'Kamu tidak harus memberi nama pada perasaanmu untuk tahu apa yang membantu.' },
  tulis: { title: 'Tulis Seperlunya', desc: 'Kalau ingin, tuliskan beberapa kata tentang keadaanmu.', type: 'write',
    prompt: 'Kalau ingin, tuliskan beberapa kata tentang keadaanmu sekarang.', placeholder: 'Sekarang aku…', closing: 'Cukup sampai di sini. Tulisanmu tidak dianalisis dan tidak disimpan.' },
}

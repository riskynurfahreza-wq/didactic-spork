// Lingkar Jaga: activities are matched to HOW someone wants to take part, never to people.
// All venues are community or public spaces; organizers are community labels, not individuals.
export const LJ_CATEGORIES = [
  { id: 'aktivitas', emoji: '🌿', title: 'Beraktivitas Bersama', desc: 'Melakukan sesuatu bersama anggota komunitas.', eg: 'Kerja bakti ringan, olahraga bersama, kegiatan lingkungan' },
  { id: 'menyiapkan', emoji: '🍲', title: 'Menyiapkan Kebutuhan Bersama', desc: 'Membantu menyiapkan kebutuhan untuk kegiatan komunitas.', eg: 'Memasak bersama, menyiapkan makanan, menyiapkan perlengkapan' },
  { id: 'membuat', emoji: '🎨', title: 'Membuat Sesuatu', desc: 'Mengisi waktu dengan kegiatan kreatif dan sederhana.', eg: 'Membuat kerajinan, menggambar, kegiatan seni bersama' },
  { id: 'belajar', emoji: '📚', title: 'Belajar & Berbagi', desc: 'Belajar keterampilan atau berbagi pengetahuan dengan anggota komunitas.', eg: 'Kelas keterampilan, belajar bersama, berbagi kemampuan praktis' },
  { id: 'bertemu', emoji: '🤝', title: 'Bertemu & Terhubung', desc: 'Bertemu, berbincang ringan, dan kembali terhubung dengan lingkungan sekitar.', eg: 'Berbincang ringan, kegiatan sederhana bersama' },
  { id: 'lingkungan', emoji: '🌱', title: 'Merawat Lingkungan', desc: 'Bersama-sama menjaga ruang yang digunakan komunitas.', eg: 'Membersihkan ruang bersama, merawat taman' },
]

export const STYLES = [
  { id: 'santai', emoji: '🌿', t: 'Ikut santai', d: 'Datang dan mengikuti kegiatan tanpa harus banyak berbicara.' },
  { id: 'bersama', emoji: '🤝', t: 'Ikut bersama', d: 'Datang bersama seseorang yang kamu kenal.' },
  { id: 'kontribusi', emoji: '👐', t: 'Ikut berkontribusi', d: 'Membantu persiapan atau jalannya kegiatan.' },
]

const KB = { q: 'Ada yang dibutuhkan untuk kegiatan ini?', l: 'Lihat Kita Bisa', to: '/app/kita-bisa' }
const SJ = { q: 'Punya sesuatu yang bisa dibagikan untuk kegiatan ini?', l: 'Lihat Saling Jaga', to: '/app/saling-jaga' }

export const ACTIVITIES = [
  { id: 'jalan-pagi', cat: 'aktivitas', name: 'Jalan Pagi Bersama', time: 'Minggu, 06.30–07.30', place: 'Lapangan komunitas', form: 'Terbuka', organizer: 'Komunitas Warga', tags: ['Santai', 'Terbuka'], desc: 'Berjalan ringan bersama sambil menikmati udara pagi. Boleh berjalan dengan kecepatanmu sendiri.' },
  { id: 'dapur-bersama', cat: 'menyiapkan', name: 'Dapur Bersama', time: 'Sabtu, 10.00–12.00', place: 'Ruang komunitas', form: 'Kelompok kecil', organizer: 'Lingkar Komunitas', tags: ['Bersama', '10–15 orang'], desc: 'Menyiapkan makanan bersama untuk kegiatan warga.', cross: [KB, SJ] },
  { id: 'kerajinan', cat: 'membuat', name: 'Membuat Kerajinan Sederhana', time: 'Rabu, 15.00–16.30', place: 'Ruang komunitas', form: 'Kelompok kecil', organizer: 'Lingkar Komunitas', tags: ['Kreatif', '8–10 orang'], desc: 'Menganyam atau melukis bersama dengan bahan sederhana. Tidak perlu pengalaman.' },
  { id: 'kelas-keterampilan', cat: 'belajar', name: 'Kelas Keterampilan Sederhana', time: 'Minggu, 09.00–11.00', place: 'Aula komunitas', form: 'Perlu konfirmasi', organizer: 'Komunitas Warga', tags: ['Belajar', '8–12 orang'], desc: 'Belajar keterampilan praktis bersama anggota komunitas.' },
  { id: 'sore-lingkar', cat: 'bertemu', name: 'Sore di Lingkar Jaga', time: 'Sabtu, 16.00–17.30', place: 'Ruang komunitas', form: 'Terbuka', organizer: 'Lingkar Komunitas', tags: ['Santai', 'Terbuka'], desc: 'Waktu santai untuk bertemu, berbincang ringan, dan mengikuti aktivitas sederhana bersama.' },
  { id: 'taman', cat: 'lingkungan', name: 'Merawat Taman Bersama', time: 'Sabtu, 07.30–09.00', place: 'Taman lingkungan', form: 'Kelompok kecil', organizer: 'Komunitas Warga', tags: ['Bersama', '6–10 orang'], desc: 'Membersihkan dan merawat taman yang dipakai bersama.', cross: [KB] },
]

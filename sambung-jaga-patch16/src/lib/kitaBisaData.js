// Kita Bisa = an overview of what is available, needed and happening in a broad, user-chosen area.
// Only aggregate numbers: no names, no addresses, no coordinates, no rankings.
export const KB_AREAS = ['Manggala', 'Tamalanrea', 'Panakkukang', 'Rappocini', 'Biringkanaya', 'Tamalate']

// help: [makanan, informasi & administrasi, akses & mobilitas]; need: [kebutuhan dasar, informasi & administrasi, akses layanan]
const AREA_DATA = {
  Manggala: { help: [15, 10, 7], need: [5, 3, 2], kegiatan: 4, lanjut: 8, layanan: 3 },
  Tamalanrea: { help: [12, 9, 6], need: [4, 4, 2], kegiatan: 5, lanjut: 6, layanan: 4 },
  Panakkukang: { help: [18, 12, 9], need: [6, 3, 3], kegiatan: 6, lanjut: 9, layanan: 5 },
  Rappocini: { help: [10, 7, 5], need: [3, 2, 2], kegiatan: 3, lanjut: 5, layanan: 3 },
  Biringkanaya: { help: [13, 8, 6], need: [4, 3, 1], kegiatan: 4, lanjut: 7, layanan: 3 },
  Tamalate: { help: [9, 6, 4], need: [3, 2, 1], kegiatan: 3, lanjut: 4, layanan: 2 },
}

export const FILTERS = [
  { id: 'semua', label: 'Semua' }, { id: 'bantuan', label: 'Bantuan' }, { id: 'kebutuhan', label: 'Kebutuhan' },
  { id: 'kegiatan', label: 'Kegiatan' }, { id: 'layanan', label: 'Layanan' },
]

export function buildCards(area, ruangCount) {
  const d = AREA_DATA[area]
  return [
    { id: 'bantuan', tags: ['bantuan'], emoji: '🤝', title: 'Bantuan yang tersedia', cta: 'Lihat Bantuan', to: '/app/saling-jaga', state: { mode: 'need' },
      rows: [{ n: d.help[0], u: 'orang', t: 'bisa membantu kebutuhan makanan' }, { n: d.help[1], u: 'orang', t: 'bisa membantu informasi & administrasi' }, { n: d.help[2], u: 'orang', t: 'bisa membantu akses & mobilitas' }] },
    { id: 'kebutuhan', tags: ['kebutuhan'], emoji: '💭', title: 'Yang sedang dibutuhkan', cta: 'Lihat Kebutuhan', to: '/app/saling-jaga', state: { mode: 'offer' },
      rows: [{ n: d.need[0], u: 'kebutuhan', t: 'kebutuhan dasar' }, { n: d.need[1], u: 'kebutuhan', t: 'informasi & administrasi' }, { n: d.need[2], u: 'kebutuhan', t: 'akses layanan' }] },
    { id: 'kegiatan', tags: ['kegiatan'], emoji: '🌿', title: 'Yang sedang berlangsung', cta: 'Lihat Kegiatan', to: '/app/lingkar-jaga',
      sub: 'Kegiatan bersama, ruang temu, dan aktivitas komunitas.', rows: [{ n: d.kegiatan, u: 'kegiatan komunitas', t: 'tersedia minggu ini' }] },
    { id: 'lanjut', tags: ['bantuan'], emoji: '🔗', title: 'Yang masih berlanjut', cta: 'Lihat Dukungan', to: '/app/tali-jaga',
      sub: 'Koneksi dukungan yang masih aktif sesuai pilihan masing-masing.', rows: [{ n: d.lanjut, u: 'dukungan', t: 'masih berlanjut' }] },
    { id: 'ruang', tags: ['bantuan'], emoji: '🌱', title: 'Ruang untuk diri', cta: 'Jelajahi Aktivitas', to: '/app/ruang-pulih',
      sub: 'Aktivitas singkat yang bisa dilakukan sesuai kebutuhanmu hari ini.', rows: [{ n: ruangCount, u: 'aktivitas mandiri', t: 'tersedia' }] },
    { id: 'layanan', tags: ['layanan'], emoji: '🧭', title: 'Layanan yang tersedia', cta: 'Lihat Layanan', to: '/app/rujukan',
      sub: 'Jalur menuju layanan kesehatan, kesehatan mental, dan bantuan formal.', rows: [{ n: d.layanan, u: 'layanan profesional', t: 'dapat diakses melalui Rujukan' }] },
  ]
}

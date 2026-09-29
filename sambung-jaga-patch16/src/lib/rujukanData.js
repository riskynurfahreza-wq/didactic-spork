// Rujukan navigates by the TYPE OF HELP wanted. It never asks about symptoms, scores anything or ranks providers.
// Service entries are generic service TYPES (no names, hours, prices or availability are claimed);
// real, verified listings would replace them.
export const GROUPS = [
  { id: 'mental', emoji: '🧠', title: 'Dukungan Kesehatan Mental', desc: 'Berbicara dengan psikolog, psikiater, atau tenaga profesional kesehatan mental.', cta: 'Lihat Layanan' },
  { id: 'kesehatan', emoji: '🩺', title: 'Layanan Kesehatan', desc: 'Mendapatkan pemeriksaan atau penanganan kesehatan secara langsung.', cta: 'Lihat Fasilitas' },
  { id: 'obat', emoji: '💊', title: 'Konsultasi Terkait Pengobatan', desc: 'Mendapatkan informasi dan penanganan terkait obat atau kebutuhan medis melalui tenaga kesehatan.', cta: 'Lihat Layanan', note: 'Keputusan tentang obat sebaiknya dibicarakan langsung dengan tenaga kesehatan.' },
  { id: 'sosial', emoji: '🏛️', title: 'Layanan Sosial & Formal', desc: 'Mencari bantuan dari lembaga atau layanan resmi sesuai kebutuhan.', cta: 'Lihat Layanan' },
  { id: 'segera', emoji: '🚨', title: 'Bantuan Segera', desc: 'Mendapatkan pertolongan segera ketika situasi tidak dapat menunggu.', cta: 'Bantuan Segera' },
]

const AREA = 'Area umum'
const S = (id, group, name, jenis, format, akses, area = AREA) => ({ id, group, name, jenis, format, akses, area })
export const SERVICES = [
  S('psikologi', 'mental', 'Layanan Psikologi', 'Konsultasi psikologis', 'Tatap muka / daring', 'Dengan pendaftaran'),
  S('psikiatri', 'mental', 'Layanan Psikiatri', 'Konsultasi dengan dokter spesialis kedokteran jiwa', 'Tatap muka / daring', 'Sesuai ketentuan fasilitas'),
  S('puskesmas', 'kesehatan', 'Puskesmas', 'Pemeriksaan kesehatan', 'Tatap muka', 'Sesuai ketentuan fasilitas'),
  S('klinik', 'kesehatan', 'Klinik', 'Pemeriksaan dan konsultasi kesehatan', 'Tatap muka', 'Sesuai ketentuan fasilitas'),
  S('rs', 'kesehatan', 'Rumah Sakit', 'Layanan kesehatan dan penanganan lebih lanjut', 'Tatap muka', 'Sesuai ketentuan fasilitas'),
  S('dokter', 'obat', 'Konsultasi Dokter', 'Konsultasi kebutuhan medis di fasilitas kesehatan', 'Tatap muka', 'Sesuai ketentuan fasilitas'),
  S('apoteker', 'obat', 'Konsultasi Apoteker', 'Informasi obat dari apoteker', 'Tatap muka', 'Di apotek atau fasilitas kesehatan'),
  S('dinsos', 'sosial', 'Dinas Sosial Setempat', 'Layanan sosial pemerintah daerah', 'Tatap muka', 'Sesuai ketentuan lembaga', 'Tingkat kota atau kabupaten'),
  S('ppa', 'sosial', 'Layanan Perlindungan Perempuan dan Anak', 'Pendampingan dan layanan perlindungan', 'Tatap muka / daring', 'Sesuai ketentuan lembaga', 'Tingkat kota atau kabupaten'),
  S('posko', 'sosial', 'Posko Penanganan Bencana', 'Informasi dan layanan pascabencana', 'Tatap muka', 'Sesuai ketentuan lembaga', 'Tingkat kota atau kabupaten'),
]

export const HOW_TO = [
  'Hubungi atau kunjungi penyedia layanan untuk menanyakan jadwal, biaya, dan cara mendaftar.',
  'Siapkan identitas dan dokumen yang diminta layanan, misalnya kartu jaminan kesehatan jika ada.',
  'Kamu tidak perlu membawa diagnosis. Ceritakan seperlunya, sesuai yang ingin kamu sampaikan.',
]

// Need-based navigation. Choosing an option only decides which pathway is shown; nothing is scored.
export const NEEDS = [
  { id: 'mental', emoji: '🧠', label: 'Saya ingin berbicara dengan profesional tentang kondisi psikologis saya',
    result: { title: 'Layanan kesehatan mental profesional', desc: 'Layanan psikologi dapat menjadi salah satu pilihan. Psikolog, psikiater, atau layanan kesehatan mental dapat membantu memahami kondisi yang kamu alami dan menentukan dukungan yang sesuai.', note: 'Kamu tidak perlu memiliki diagnosis terlebih dahulu untuk mencari bantuan profesional.', group: 'mental', cta: 'Lihat Layanan' } },
  { id: 'kesehatan', emoji: '🩺', label: 'Saya membutuhkan pemeriksaan atau bantuan kesehatan',
    result: { title: 'Fasilitas kesehatan', desc: 'Puskesmas, klinik, atau rumah sakit dapat menjadi pilihan untuk pemeriksaan atau bantuan kesehatan.', note: 'Kamu dapat mencari bantuan profesional kapan pun kamu merasa membutuhkannya.', group: 'kesehatan', cta: 'Lihat Fasilitas' } },
  { id: 'sosial', emoji: '🏛️', label: 'Saya membutuhkan bantuan dari layanan atau lembaga resmi',
    result: { title: 'Layanan sosial dan lembaga resmi', desc: 'Dinas atau lembaga resmi dapat membantu sesuai jenis kebutuhan yang kamu hadapi.', note: 'Jika ini sesuai dengan kebutuhanmu, kamu bisa melihat pilihan layanannya.', group: 'sosial', cta: 'Lihat Layanan' } },
  { id: 'segera', emoji: '🚨', label: 'Saya membutuhkan bantuan segera' },
  { id: 'belum', emoji: '❓', label: 'Saya masih belum yakin' },
]

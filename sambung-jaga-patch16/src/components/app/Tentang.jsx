import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
const card = 'rounded-organic border border-ink/10 bg-white/80 p-5'

const FEATURES = [
  { emoji: '🤝', name: 'Saling Jaga', line: 'Temukan bantuan atau kebutuhan di komunitas.', text: 'Lihat bantuan yang tersedia atau kebutuhan yang sedang dicari, lalu temukan bentuk dukungan yang sesuai.', to: '/app/saling-jaga' },
  { emoji: '🌱', name: 'Ruang Pulih', line: 'Ambil jeda dan lakukan sesuatu untuk dirimu.', text: 'Pilih aktivitas mandiri yang dapat membantu menjalani hari, tanpa diagnosis atau penilaian kondisi psikologis.', to: '/app/ruang-pulih' },
  { emoji: '🔗', name: 'Tali Jaga', line: 'Jaga kesinambungan dukungan.', text: 'Jika sebuah dukungan perlu berlanjut, tentukan apa yang ingin dipertahankan dan berapa lama kamu ingin tetap terhubung.', to: '/app/tali-jaga' },
  { emoji: '🌿', name: 'Lingkar Jaga', line: 'Kembali terhubung melalui kegiatan bersama.', text: 'Temukan kegiatan komunitas untuk bertemu, beraktivitas, dan kembali menjadi bagian dari lingkungan sekitar.', to: '/app/lingkar-jaga' },
  { emoji: '👀', name: 'Kita Bisa', line: 'Lihat apa yang sedang terjadi di sekitarmu.', text: 'Lihat kebutuhan, bantuan, kegiatan, dukungan, dan layanan yang tersedia di area yang kamu pilih.', to: '/app/kita-bisa' },
  { emoji: '🧭', name: 'Rujukan', line: 'Temukan jalur menuju bantuan profesional atau formal.', text: 'Gunakan Rujukan untuk menemukan layanan kesehatan, kesehatan mental, atau bantuan formal yang sesuai dengan kebutuhanmu.', to: '/app/rujukan' },
]
const STEPS = [
  { t: 'Lihat', d: 'Temukan kebutuhan, bantuan, kegiatan, dan layanan yang tersedia di komunitas.' },
  { t: 'Pilih', d: 'Pilih bentuk dukungan yang sesuai dengan kebutuhan, waktu, dan kemampuanmu.' },
  { t: 'Terhubung', d: 'Terhubung melalui ruang dan bentuk dukungan yang tersedia.' },
  { t: 'Lanjutkan', d: 'Jika diperlukan, dukungan dapat berlanjut melalui Tali Jaga atau jalur layanan lainnya.' },
]
const PRIVACY = [
  'Tidak perlu membagikan alamat rumah.',
  'Tidak perlu membagikan lokasi pribadi atau live location.',
  'Tidak perlu membagikan diagnosis atau riwayat kesehatan untuk menggunakan dukungan komunitas.',
  'Kamu dapat menentukan batas dan mengakhiri koneksi dukungan kapan saja.',
]
const AGENCY = [
  'Kamu memilih apakah ingin ikut.',
  'Kamu menentukan batas yang nyaman bagimu.',
  'Kamu dapat menolak, menjeda, atau mengakhiri dukungan.',
  'Membantu seseorang tidak berarti harus selalu tersedia.',
]

const H2 = ({ children }) => <h2 className="mt-12 font-serif text-xl font-semibold text-ink">{children}</h2>

export default function Tentang() {
  const navigate = useNavigate()
  const back = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/app'))

  return (
    <div className="animate-rise">
      <button type="button" onClick={back} className={`mb-4 rounded-md py-1 text-[13.5px] text-inkmuted hover:text-ink ${ring}`}>← Kembali</button>

      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-serif text-3xl font-semibold text-ink">Tentang Sambung Jaga</h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink">Saling bantu saat krisis, saling jaga setelahnya.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-inkmuted">
          Sambung Jaga adalah ruang untuk melihat, menemukan, dan terhubung dengan dukungan yang tersedia di komunitas.
        </p>
      </div>

      <H2>Apa yang bisa kamu temukan?</H2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <section key={f.name} className={`${card} flex flex-col justify-between gap-4`}>
            <div>
              <h3 className="flex items-center gap-2 font-serif text-[16px] font-semibold text-ink"><span aria-hidden="true" className="text-xl">{f.emoji}</span>{f.name}</h3>
              <p className="mt-2 text-[14.5px] font-medium text-ink">{f.line}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-inkmuted">{f.text}</p>
            </div>
            <Link to={f.to} className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-leaf/40 px-6 text-[14.5px] font-medium text-leaf-dark transition hover:bg-leaf/10 active:scale-[0.98] ${ring}`}>
              Buka {f.name}
            </Link>
          </section>
        ))}
      </div>

      <H2>Bagaimana Sambung Jaga bekerja?</H2>
      <p className="mt-1 text-[14.5px] font-medium text-leaf-dark">Lihat → Pilih → Terhubung → Lanjutkan</p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.t} className={card}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-leaf/15 text-[13px] font-semibold text-leaf-dark">{i + 1}</span>
            <p className="mt-2 font-serif text-[16px] font-semibold text-ink">{s.t}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-inkmuted">{s.d}</p>
          </li>
        ))}
      </ol>

      <section className="mt-10 rounded-organic border border-[#F0C36A]/60 bg-[#F0C36A]/20 p-6">
        <p className="font-serif text-lg font-semibold leading-snug text-ink">Kita semua bisa membutuhkan bantuan. Kita semua juga punya sesuatu untuk dibagikan.</p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink">
          Di Sambung Jaga, seseorang tidak harus selalu menjadi pemberi atau penerima bantuan. Kebutuhan dan kemampuan kita dapat berubah dari waktu ke waktu.
        </p>
      </section>

      <section className="mt-10 rounded-organic bg-sand/70 p-6">
        <h2 className="font-serif text-lg font-semibold leading-snug text-ink">Dukungan komunitas dan bantuan profesional memiliki peran yang berbeda.</h2>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink">
          Sambung Jaga membantu kamu menemukan dukungan komunitas, aktivitas mandiri, kegiatan bersama, serta jalur menuju layanan profesional atau formal.
        </p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink">Ruang Pulih adalah ruang dukungan mandiri, bukan layanan diagnosis atau terapi.</p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink">
          Rujukan tersedia jika kamu ingin mencari bantuan profesional atau formal. Kamu tidak perlu menunggu sampai keadaan menjadi lebih berat untuk mengaksesnya.
        </p>
      </section>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <section className={card}>
          <h2 className="font-serif text-lg font-semibold text-ink">Jaga informasi pribadimu</h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-ink">Bagikan seperlunya. Kamu tidak perlu membagikan informasi pribadi yang tidak diperlukan untuk mendapatkan dukungan.</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[13.5px] leading-relaxed text-inkmuted">
            {PRIVACY.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </section>
        <section className={card}>
          <h2 className="font-serif text-lg font-semibold text-ink">Bertemu dengan aman</h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-ink">Untuk kegiatan atau dukungan langsung, gunakan ruang komunitas, fasilitas publik, atau tempat layanan yang jelas.</p>
          <p className="mt-3 text-[14.5px] font-medium text-ink">Alamat rumah dan lokasi pribadi tidak perlu dibagikan.</p>
        </section>
      </div>

      <section className={`${card} mt-4`}>
        <h2 className="font-serif text-lg font-semibold text-ink">Kamu tetap punya kendali</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {AGENCY.map((a) => <li key={a} className="rounded-organic bg-leaf/10 px-4 py-3 text-[14px] font-medium text-ink">{a}</li>)}
        </ul>
      </section>
    </div>
  )
}

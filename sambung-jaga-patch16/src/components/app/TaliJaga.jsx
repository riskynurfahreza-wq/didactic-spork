import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadState, saveState } from '../../lib/storage.js'

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
const card = 'rounded-organic border border-ink/10 bg-white/80 p-5'
const btn = `inline-flex min-h-[48px] items-center justify-center rounded-full px-6 text-[14.5px] font-medium transition active:scale-[0.98] disabled:opacity-40 ${ring}`
const solid = `${btn} bg-leaf text-cream hover:bg-leaf-dark`
const ghost = `${btn} border border-ink/15 text-ink hover:bg-ink/5`
const small = 'min-h-[40px] px-4 text-[13px]'

const KEEP = ['Informasi kegiatan komunitas', 'Pengingat untuk mengecek kebutuhan', 'Dukungan terkait kebutuhan ini', 'Koneksi dengan kegiatan komunitas']
const DURATIONS = [
  { label: '3 hari', days: 3 }, { label: '1 minggu', days: 7 }, { label: '2 minggu', days: 14 },
  { label: 'Sampai kegiatan selesai', days: null },
]
const CHECKINS = ['Besok', '3 hari lagi', '1 minggu lagi', 'Sampai kebutuhan ini selesai']
const CROSS = [
  { q: 'Butuh bantuan lagi?', l: 'Lihat Saling Jaga', to: '/app/saling-jaga' },
  { q: 'Ingin tetap terhubung dengan kegiatan komunitas?', l: 'Lihat Lingkar Jaga', to: '/app/lingkar-jaga' },
  { q: 'Membutuhkan dukungan profesional atau bantuan formal?', l: 'Lihat Rujukan', to: '/app/rujukan' },
]
const OFFLINE = 'Untuk pertemuan langsung, pilih ruang komunitas atau tempat layanan yang jelas. Alamat rumah dan lokasi pribadi tidak perlu dibagikan.'

const left = (tj) =>
  tj.duration.days == null
    ? 'Sampai kegiatan selesai'
    : `Sampai ${Math.max(1, Math.ceil(tj.duration.days - (Date.now() - tj.startedAt) / 864e5))} hari lagi`

const Back = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className={`mb-4 rounded-md py-1 text-[13.5px] text-inkmuted hover:text-ink ${ring}`}>← {children}</button>
)
const H1 = ({ children }) => <h1 className="font-serif text-2xl font-semibold text-ink">{children}</h1>
const P = ({ children, className = '' }) => <p className={`mt-2 text-[14.5px] leading-relaxed text-inkmuted ${className}`}>{children}</p>
const Soft = ({ children }) => <p className="mt-5 rounded-organic bg-sand/70 p-4 text-[13.5px] leading-relaxed text-inkmuted">{children}</p>

function Choice({ on, children, ...p }) {
  return (
    <button type="button" aria-pressed={on} {...p}
      className={`min-h-[48px] w-full rounded-organic border px-4 py-3 text-left text-[14.5px] font-medium transition ${on ? 'border-leaf bg-leaf text-cream' : 'border-ink/15 bg-white/70 text-ink hover:border-ink/30'} ${ring}`}>
      {children}
    </button>
  )
}

function Cross() {
  return (
    <div className="mt-10 space-y-2 border-t border-ink/10 pt-5">
      {CROSS.map((c) => (
        <div key={c.to} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[13.5px] text-inkmuted">{c.q}</span>
          <Link to={c.to} className={`${ghost} ${small} self-start sm:self-auto`}>{c.l}</Link>
        </div>
      ))}
    </div>
  )
}

export default function TaliJaga() {
  const [data, setData] = useState(() => loadState('tj4', { tj: null, checkin: null, kegiatan: false }))
  useEffect(() => saveState('tj4', data), [data])
  const [view, setView] = useState('home')
  const [sel, setSel] = useState([])
  const [dur, setDur] = useState(null)
  const [ci, setCi] = useState(null)
  const [menu, setMenu] = useState(false)
  const [safety, setSafety] = useState(false)

  const tj = data.tj && data.tj.status !== 'berakhir' ? data.tj : null
  const setTj = (p) => setData((d) => ({ ...d, tj: { ...d.tj, ...p } }))
  const go = (v) => { setView(v); setMenu(false); setSafety(false) }
  const home = () => go('home')
  const toggle = (k) => setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]))

  const OPTIONS = [
    { v: 'kegiatan', emoji: '🌱', t: 'Tetap terhubung dengan kegiatan', d: 'Ikuti kegiatan komunitas yang ingin kamu ikuti kembali.' },
    { v: 'checkin', emoji: '🔔', t: 'Check-in kembali', d: 'Atur pengingat sederhana untuk melihat kembali kebutuhanmu.' },
    { v: 'lanjut', emoji: '🤝', t: 'Lanjutkan dukungan ini', d: 'Tetap terhubung dengan dukungan terkait kebutuhan yang sedang kamu hadapi.' },
  ]

  return (
    <div className="animate-rise">
      {view === 'home' && (
        <>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-serif text-3xl font-semibold text-ink">Tali Jaga</h1>
            <p className="mt-3 font-serif text-xl leading-snug text-ink">Dukungan tidak harus berhenti setelah bantuan pertama selesai.</p>
            <p className="mt-2 text-[15px] leading-relaxed text-inkmuted">
              Tetap terhubung dengan dukungan yang kamu perlukan, dengan bentuk dan waktu yang sesuai untukmu.
            </p>
          </div>

          {(tj || data.checkin || data.kegiatan) && (
            <section className={`${card} mt-8`}>
              <h2 className="font-serif text-[16px] font-semibold text-ink">Yang sedang kamu jaga</h2>
              <div className="mt-3 space-y-3 text-[14px]">
                {tj && (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-ink">{tj.status === 'dijeda' ? 'Koneksi dijeda' : 'Koneksi aktif'}: {tj.support[0]}{tj.support.length > 1 ? ` (+${tj.support.length - 1})` : ''}</span>
                    <button type="button" onClick={() => go('aktif')} className={`${solid} ${small}`}>Lihat Tali Jaga</button>
                  </div>
                )}
                {data.checkin && (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-ink">Check-in: {data.checkin}</span>
                    <button type="button" onClick={() => setData((d) => ({ ...d, checkin: null }))} className={`${ghost} ${small}`}>Batalkan</button>
                  </div>
                )}
                {data.kegiatan && (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-ink">Ruang ngobrol dan kegiatan bersama, Sabtu, 10.00</span>
                    <button type="button" onClick={() => setData((d) => ({ ...d, kegiatan: false }))} className={`${ghost} ${small}`}>Batalkan</button>
                  </div>
                )}
              </div>
            </section>
          )}

          <h2 className="mt-8 font-serif text-xl font-semibold text-ink">Apa yang ingin kamu jaga setelah ini?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {OPTIONS.map((o) => (
              <button key={o.v} type="button" onClick={() => go(o.v)}
                className={`${card} text-left transition hover:border-leaf active:scale-[0.99] ${ring}`}>
                <span aria-hidden="true" className="text-2xl">{o.emoji}</span>
                <span className="mt-2 block font-serif text-[16px] font-semibold text-ink">{o.t}</span>
                <span className="mt-1 block text-[13.5px] leading-relaxed text-inkmuted">{o.d}</span>
              </button>
            ))}
          </div>
          <Cross />
        </>
      )}

      {view === 'kegiatan' && (
        <>
          <Back onClick={home}>Tali Jaga</Back>
          <H1>Tetap terhubung</H1>
          <P>Ada kegiatan komunitas yang ingin kamu ikuti kembali?</P>
          <div className={`${card} mt-5`}>
            <p className="text-[12.5px] text-inkmuted">Lingkar Jaga</p>
            <h2 className="mt-1 font-serif text-[17px] font-semibold text-ink">Ruang ngobrol dan kegiatan bersama</h2>
            <p className="mt-1 text-[14px] text-inkmuted">Sabtu, 10.00</p>
            <p className="text-[14px] text-inkmuted">Ruang komunitas</p>
            <button type="button" onClick={() => { setData((d) => ({ ...d, kegiatan: true })); go('kegiatan-ok') }} className={`${solid} mt-4 w-full sm:w-auto`}>Ikuti Kegiatan</button>
          </div>
          <Soft>{OFFLINE}</Soft>
        </>
      )}
      {view === 'kegiatan-ok' && (
        <>
          <H1>Kamu akan tetap mendapatkan informasi tentang kegiatan ini.</H1>
          <button type="button" onClick={home} className={`${solid} mt-6`}>Selesai</button>
        </>
      )}

      {view === 'checkin' && (
        <>
          <Back onClick={home}>Tali Jaga</Back>
          <H1>Kapan kamu ingin mengecek kembali kebutuhanmu?</H1>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {CHECKINS.map((c) => <Choice key={c} on={ci === c} onClick={() => setCi(c)}>{c}</Choice>)}
          </div>
          <P>Kamu dapat mengubah atau membatalkan pengingat kapan saja.</P>
          <button type="button" disabled={!ci} onClick={() => { setData((d) => ({ ...d, checkin: ci })); go('checkin-ok') }} className={`${solid} mt-5`}>Atur Check-in</button>
        </>
      )}
      {view === 'checkin-ok' && (
        <>
          <H1>Check-in diatur.</H1>
          <P>Saat waktunya tiba, kamu dapat melihat kembali apakah masih membutuhkan dukungan.</P>
          <button type="button" onClick={home} className={`${solid} mt-6`}>Selesai</button>
        </>
      )}

      {view === 'lanjut' && (
        <>
          <Back onClick={home}>Tali Jaga</Back>
          <H1>Lanjutkan dukungan</H1>
          <P>Bantuan pertama sudah selesai. Kamu masih ingin menjaga dukungan ini?</P>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => { setSel([]); setDur(null); go('pilih') }} className={solid}>Ya, lanjutkan</button>
            <button type="button" onClick={() => go('nanti')} className={ghost}>Tidak untuk sekarang</button>
          </div>
        </>
      )}
      {view === 'nanti' && (
        <>
          <H1>Tidak apa-apa.</H1>
          <P>Kamu tetap dapat menggunakan Saling Jaga kapan pun membutuhkan dukungan.</P>
          <button type="button" onClick={home} className={`${solid} mt-6`}>Kembali ke Tali Jaga</button>
        </>
      )}

      {view === 'pilih' && (
        <>
          <Back onClick={() => go('lanjut')}>Kembali</Back>
          <H1>Apa yang ingin kamu jaga?</H1>
          <P>Pilih yang memang kamu perlukan. Kamu tidak harus tetap terhubung dalam semua bentuk.</P>
          <div className="mt-5 space-y-2">
            {KEEP.map((k) => (
              <label key={k} className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-organic border px-4 py-3 text-[14.5px] transition ${sel.includes(k) ? 'border-leaf bg-leaf/10' : 'border-ink/15 bg-white/70 hover:border-ink/30'}`}>
                <input type="checkbox" checked={sel.includes(k)} onChange={() => toggle(k)} className="h-5 w-5 accent-leaf" />
                <span className="text-ink">{k}</span>
              </label>
            ))}
          </div>
          <button type="button" disabled={!sel.length} onClick={() => go('durasi')} className={`${solid} mt-5`}>Lanjutkan</button>
        </>
      )}

      {view === 'durasi' && (
        <>
          <Back onClick={() => go('pilih')}>Kembali</Back>
          <H1>Sampai kapan?</H1>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {DURATIONS.map((d) => <Choice key={d.label} on={dur?.label === d.label} onClick={() => setDur(d)}>{d.label}</Choice>)}
          </div>
          <P>Kamu bisa menjeda atau mengakhiri Tali Jaga kapan saja.</P>
          <button type="button" disabled={!dur} onClick={() => go('batas')} className={`${solid} mt-5`}>Lanjutkan</button>
        </>
      )}

      {view === 'batas' && (
        <>
          <Back onClick={() => go('durasi')}>Kembali</Back>
          <H1>Tali Jaga tidak berarti kamu harus tersedia setiap saat.</H1>
          <P>Kamu tetap menentukan kapan ingin merespons, menjeda, atau mengakhiri koneksi.</P>
          <Soft>
            Menerima bantuan tidak berarti kamu berutang hubungan kepada orang lain. Membantu seseorang tidak berarti kamu harus terus tersedia untuknya.
          </Soft>
          <button type="button" onClick={() => { setData((d) => ({ ...d, tj: { support: sel, duration: dur, startedAt: Date.now(), status: 'aktif' } })); go('baru') }} className={`${solid} mt-5`}>
            Aktifkan Tali Jaga
          </button>
        </>
      )}

      {view === 'baru' && data.tj && (
        <>
          <H1>Tali Jaga aktif</H1>
          <div className={`${card} mt-5 space-y-3`}>
            <div><p className="text-[12.5px] text-inkmuted">Dukungan</p>{data.tj.support.map((s) => <p key={s} className="text-[15px] text-ink">{s}</p>)}</div>
            <div><p className="text-[12.5px] text-inkmuted">Durasi</p><p className="text-[15px] text-ink">{data.tj.duration.label}</p></div>
            <div><p className="text-[12.5px] text-inkmuted">Status</p><p className="text-[15px] font-semibold text-leaf-dark">Aktif</p></div>
          </div>
          <P>Kamu tetap memiliki kendali atas koneksi ini.</P>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => go('aktif')} className={solid}>Lihat Tali Jaga</button>
            <button type="button" onClick={home} className={ghost}>Selesai</button>
          </div>
        </>
      )}

      {view === 'aktif' && tj && (
        <>
          <Back onClick={home}>Tali Jaga</Back>
          <div className="flex items-start justify-between gap-3">
            <H1>Tali Jaga</H1>
            <div className="relative">
              <button type="button" aria-label="Pengaturan keamanan" aria-expanded={menu} onClick={() => setMenu(!menu)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-lg text-inkmuted hover:bg-ink/5 ${ring}`}>⋯</button>
              {menu && (
                <div className="absolute right-0 z-10 mt-2 w-44 rounded-organic border border-ink/10 bg-white p-1 shadow-soft">
                  {['Batasi interaksi', 'Blokir', 'Laporkan'].map((a) => (
                    <button key={a} type="button" onClick={() => { setMenu(false); setSafety(true) }}
                      className={`block min-h-[44px] w-full rounded-md px-3 text-left text-[14px] text-ink hover:bg-ink/5 ${ring}`}>{a}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {safety && <Soft>Kamu tidak harus melanjutkan koneksi yang membuatmu tidak nyaman.</Soft>}

          <section className={`${card} mt-5`}>
            <p className="text-[12.5px] text-inkmuted">{tj.status === 'dijeda' ? 'Koneksi dijeda' : 'Koneksi aktif'}</p>
            {tj.support.map((s) => <h2 key={s} className="mt-1 font-serif text-[17px] font-semibold text-ink">{s}</h2>)}
            <p className="mt-1 text-[14px] text-inkmuted">{left(tj)}</p>
          </section>

          <section className={`${card} mt-4`}>
            <p className="text-[12.5px] text-inkmuted">Berikutnya</p>
            <h2 className="mt-1 font-serif text-[16px] font-semibold text-ink">Lingkar Jaga</h2>
            <p className="text-[14px] text-inkmuted">Sabtu, 10.00</p>
            <Link to="/app/lingkar-jaga" className={`${ghost} mt-3 w-full sm:w-auto`}>Lihat Kegiatan</Link>
          </section>

          <div className="mt-6 flex flex-wrap gap-3">
            {tj.status === 'dijeda'
              ? <button type="button" onClick={() => setTj({ status: 'aktif' })} className={solid}>Lanjutkan Koneksi</button>
              : <button type="button" onClick={() => go('jeda')} className={ghost}>Jeda Koneksi</button>}
            <button type="button" onClick={() => go('akhir')} className={ghost}>Akhiri Koneksi</button>
          </div>
          <Cross />
        </>
      )}

      {view === 'jeda' && (
        <>
          <H1>Jeda Tali Jaga?</H1>
          <P>Kamu dapat melanjutkannya kembali kapan saja.</P>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => { setTj({ status: 'dijeda' }); go('jeda-ok') }} className={solid}>Jeda untuk sekarang</button>
            <button type="button" onClick={() => go('aktif')} className={ghost}>Kembali</button>
          </div>
        </>
      )}
      {view === 'jeda-ok' && (
        <>
          <H1>Tali Jaga dijeda.</H1>
          <P>Kamu tetap dapat menggunakan Saling Jaga dan fitur komunitas lainnya.</P>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => go('aktif')} className={solid}>Lihat Tali Jaga</button>
            <button type="button" onClick={home} className={ghost}>Selesai</button>
          </div>
        </>
      )}

      {view === 'akhir' && (
        <>
          <H1>Akhiri Tali Jaga?</H1>
          <P>Mengakhiri koneksi tidak berarti kamu melakukan sesuatu yang salah.</P>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => { setTj({ status: 'berakhir' }); go('akhir-ok') }} className={solid}>Akhiri Koneksi</button>
            <button type="button" onClick={() => go('aktif')} className={ghost}>Kembali</button>
          </div>
        </>
      )}
      {view === 'akhir-ok' && (
        <>
          <H1>Tali Jaga telah berakhir.</H1>
          <P>Kamu tetap dapat menggunakan Sambung Jaga kapan pun membutuhkan dukungan.</P>
          <button type="button" onClick={home} className={`${solid} mt-6`}>Kembali ke Tali Jaga</button>
        </>
      )}

      {/* Safety net: an "aktif" view with no active connection returns home. */}
      {view === 'aktif' && !tj && (
        <>
          <H1>Belum ada koneksi aktif.</H1>
          <button type="button" onClick={home} className={`${solid} mt-6`}>Kembali ke Tali Jaga</button>
        </>
      )}
    </div>
  )
}

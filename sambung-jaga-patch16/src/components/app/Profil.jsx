import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import { loadState, saveState } from '../../lib/storage.js'
import { AREAS } from '../../lib/dummyData.js'

const ring =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
const card = 'rounded-organic border border-ink/10 bg-white/80 p-5'
const btn = `inline-flex min-h-[48px] items-center justify-center rounded-full px-6 text-[14.5px] font-medium transition active:scale-[0.98] disabled:opacity-40 ${ring}`
const ghost = `${btn} border border-ink/15 text-ink hover:bg-ink/5`
const small = 'min-h-[40px] px-4 text-[13px]'

const INFO_ITEMS = [
  { key: 'kegiatanKomunitas', label: 'Kegiatan komunitas' },
  { key: 'bantuanTersedia', label: 'Bantuan yang tersedia' },
  { key: 'kebutuhanKomunitas', label: 'Kebutuhan komunitas' },
  { key: 'layanan', label: 'Layanan' },
]

const SHARE_ITEMS = [
  {
    key: 'area',
    label: 'Area saya (RW/kelurahan)',
    desc: 'Ditampilkan sebagai area umum, bukan alamat lengkap.',
  },
  {
    key: 'ketersediaan',
    label: 'Ketersediaan waktu saya',
    desc: 'Membantu mencocokkan waktu dengan kebutuhan atau bantuan komunitas.',
  },
  {
    key: 'catatan',
    label: 'Catatan yang saya tulis',
    desc: 'Catatan singkat saat mengajukan atau menawarkan bantuan.',
  },
]

function Section({ title, children }) {
  return (
    <div className="mt-8">
      <h2 className="text-[12px] font-semibold uppercase tracking-wide text-leaf-dark">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  )
}

function ActivityRow({ emoji, title, status, cta, onClick }) {
  return (
    <div className={`${card} flex flex-wrap items-center justify-between gap-3`}>
      <div>
        <p className="text-[14.5px] font-medium text-ink">
          {emoji} {title}
        </p>
        <p className="mt-0.5 text-[13.5px] text-inkmuted">{status}</p>
      </div>
      <button type="button" onClick={onClick} className={`${ghost} ${small}`}>
        {cta}
      </button>
    </div>
  )
}

function Toggle({ checked, onChange, label, desc }) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-organic border border-ink/15 bg-white/70 px-4 py-3 transition hover:border-ink/30">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-5 w-5 accent-leaf"
      />
      <span>
        <span className="block text-[14px] font-medium text-ink">{label}</span>
        {desc && <span className="mt-0.5 block text-[12.5px] text-inkmuted">{desc}</span>}
      </span>
    </label>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-[420px] overflow-y-auto rounded-t-organic bg-cream p-6 shadow-2xl sm:rounded-organic"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-ink">{title}</h2>
          <button onClick={onClose} aria-label="Tutup" className="text-inkmuted">
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export default function Profil() {
  const navigate = useNavigate()
  const { state, updateProfile, setInfoPref, setSharePref } = useApp()

  // Saling Jaga, Tali Jaga, and Lingkar Jaga each keep their own local storage state and
  // never write into AppContext — so we read their real storage keys directly here instead
  // of the (currently always-empty) state.needs / state.offers / state.connections / state.lingkarRSVPs.
  const [tjData, setTjData] = useState(() =>
    loadState('tj4', { tj: null, checkin: null, kegiatan: false })
  )
  const [ljData] = useState(() => loadState('lj5', { joined: null, added: [] }))

  const [showShareModal, setShowShareModal] = useState(false)
  const [showConnModal, setShowConnModal] = useState(false)

  const tj = tjData.tj && tjData.tj.status !== 'berakhir' ? tjData.tj : null
  const taliJagaStatus = !tj
    ? 'Belum ada dukungan aktif.'
    : tj.status === 'dijeda'
    ? 'Koneksi dijeda.'
    : '1 dukungan aktif.'
  const lingkarStatus = ljData.joined ? '1 kegiatan diikuti.' : 'Belum mengikuti kegiatan.'

  const name =
    state.profile.pseudonym && state.profile.pseudonym !== 'Anda' ? state.profile.pseudonym : null

  const endConnection = () => {
    if (!tjData.tj) return
    const next = { ...tjData, tj: { ...tjData.tj, status: 'berakhir' } }
    setTjData(next)
    saveState('tj4', next)
  }

  return (
    <div className="animate-rise pb-10">
      <h1 className="font-serif text-2xl font-semibold text-ink">Profil</h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-inkmuted">
        Atur aktivitas dan preferensimu di Sambung Jaga.
      </p>
      <p className="mt-4 text-[15px] text-ink">👋 {name ? `Halo, ${name}` : 'Halo'}</p>

      <Section title="Aktivitasku">
        <ActivityRow
          emoji="🤝"
          title="Saling Jaga"
          status="Lihat permintaan dan bantuan yang tersedia di sekitarmu."
          cta="Lihat Aktivitas"
          onClick={() => navigate('/app/saling-jaga')}
        />
        <ActivityRow
          emoji="🔗"
          title="Tali Jaga"
          status={taliJagaStatus}
          cta="Lihat Dukungan"
          onClick={() => navigate('/app/tali-jaga')}
        />
        <ActivityRow
          emoji="🌿"
          title="Lingkar Jaga"
          status={lingkarStatus}
          cta="Lihat Kegiatan"
          onClick={() => navigate('/app/lingkar-jaga')}
        />
        <ActivityRow
          emoji="🌱"
          title="Ruang Pulih"
          status="Aktivitas mandiri tersedia kapan saja."
          cta="Buka Ruang Pulih"
          onClick={() => navigate('/app/ruang-pulih')}
        />
      </Section>

      <Section title="Preferensiku">
        <div className={card}>
          <p className="text-[14px] font-medium text-ink">📍 Area yang kulihat</p>
          <select
            value={state.profile.area || AREAS[0]}
            onChange={(e) => updateProfile({ area: e.target.value })}
            className="mt-2 w-full rounded-organic border border-ink/15 bg-white px-4 py-3 text-[14.5px] text-ink outline-none focus:border-leaf"
          >
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[12.5px] text-inkmuted">
            Digunakan untuk menampilkan informasi komunitas di area yang kamu pilih.
          </p>
        </div>

        <div className={card}>
          <p className="text-[14px] font-medium text-ink">🔔 Informasi yang ingin kulihat</p>
          <div className="mt-3 space-y-2">
            {INFO_ITEMS.map((item) => (
              <label
                key={item.key}
                className="flex min-h-[40px] cursor-pointer items-center gap-3 text-[14px] text-ink"
              >
                <input
                  type="checkbox"
                  checked={state.infoPrefs[item.key]}
                  onChange={(e) => setInfoPref(item.key, e.target.checked)}
                  className="h-5 w-5 accent-leaf"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Privasi">
        <ActivityRow
          emoji="🔒"
          title="Informasi yang dibagikan"
          status="Atur apa yang terlihat saat kamu berpartisipasi."
          cta="Kelola"
          onClick={() => setShowShareModal(true)}
        />
        <ActivityRow
          emoji="🔗"
          title="Koneksi dukungan"
          status={tj ? 'Kelola koneksi Tali Jaga aktifmu.' : 'Belum ada koneksi aktif.'}
          cta="Kelola"
          onClick={() => setShowConnModal(true)}
        />
      </Section>

      {showShareModal && (
        <Modal title="Informasi yang dibagikan" onClose={() => setShowShareModal(false)}>
          <p className="text-[12.5px] leading-relaxed text-inkmuted">
            Nama tetap ditampilkan sebagai inisial. Pilih informasi lain yang boleh terlihat saat
            kamu mengajukan atau menawarkan bantuan.
          </p>
          <div className="mt-4 space-y-2">
            {SHARE_ITEMS.map((item) => (
              <Toggle
                key={item.key}
                checked={state.sharePrefs[item.key]}
                onChange={(e) => setSharePref(item.key, e.target.checked)}
                label={item.label}
                desc={item.desc}
              />
            ))}
          </div>
        </Modal>
      )}

      {showConnModal && (
        <Modal title="Koneksi dukungan" onClose={() => setShowConnModal(false)}>
          {tj ? (
            <div className={card}>
              <p className="text-[12.5px] text-inkmuted">
                {tj.status === 'dijeda' ? 'Koneksi dijeda' : 'Koneksi aktif'}
              </p>
              {tj.support.map((s) => (
                <p key={s} className="mt-1 font-serif text-[16px] font-semibold text-ink">
                  {s}
                </p>
              ))}
              {tj.duration?.label && (
                <p className="mt-1 text-[13.5px] text-inkmuted">{tj.duration.label}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowConnModal(false)
                    navigate('/app/tali-jaga')
                  }}
                  className={`${ghost} ${small}`}
                >
                  Lihat Tali Jaga
                </button>
                <button type="button" onClick={endConnection} className={`${ghost} ${small}`}>
                  Akhiri Koneksi
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[13.5px] leading-relaxed text-inkmuted">
              Belum ada koneksi dukungan aktif. Kamu bisa memulainya dari Tali Jaga.
            </p>
          )}
        </Modal>
      )}
    </div>
  )
}

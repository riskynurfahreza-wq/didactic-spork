import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadState, saveState, uid } from '../../lib/storage.js'
import { LJ_CATEGORIES, STYLES, ACTIVITIES } from '../../lib/lingkarJagaData.js'

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
const card = 'rounded-organic border border-ink/10 bg-white/80 p-5'
const btn = `inline-flex min-h-[48px] items-center justify-center rounded-full px-6 text-[14.5px] font-medium transition active:scale-[0.98] disabled:opacity-40 ${ring}`
const solid = `${btn} bg-leaf text-cream hover:bg-leaf-dark`
const ghost = `${btn} border border-ink/15 text-ink hover:bg-ink/5`
const input = 'mt-2 w-full rounded-organic border border-ink/15 bg-white px-4 py-3 text-[14.5px] outline-none focus:border-leaf'
const OFFLINE = 'Untuk pertemuan langsung, pilih ruang komunitas atau tempat layanan yang jelas. Alamat rumah dan lokasi pribadi tidak perlu dibagikan.'

const Back = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className={`mb-4 rounded-md py-1 text-[13.5px] text-inkmuted hover:text-ink ${ring}`}>← {children}</button>
)
const H1 = ({ children }) => <h1 className="font-serif text-2xl font-semibold text-ink">{children}</h1>
const P = ({ children, className = '' }) => <p className={`mt-2 text-[14.5px] leading-relaxed text-inkmuted ${className}`}>{children}</p>
const Soft = ({ children, className = '' }) => <div className={`mt-5 rounded-organic bg-sand/70 p-4 text-[13.5px] leading-relaxed text-inkmuted ${className}`}>{children}</div>
const Tags = ({ tags }) => (
  <div className="mt-2 flex flex-wrap gap-1.5">
    {tags.map((t) => <span key={t} className="rounded-full bg-sand px-2.5 py-1 text-[12.5px] text-ink">{t}</span>)}
  </div>
)

function ActivityCard({ a, onOpen }) {
  return (
    <div className={card}>
      <h2 className="font-serif text-[17px] font-semibold text-ink">{a.name}</h2>
      <p className="mt-1 text-[13.5px] text-inkmuted">{a.time}</p>
      <p className="text-[13.5px] text-inkmuted">{a.place}</p>
      <p className="mt-2 text-[14px] leading-relaxed text-ink">{a.desc}</p>
      <Tags tags={a.tags} />
      <button type="button" onClick={() => onOpen(a.id)} className={`${ghost} mt-4 w-full sm:w-auto`}>Lihat Kegiatan</button>
    </div>
  )
}

export default function LingkarJaga() {
  const [data, setData] = useState(() => loadState('lj5', { joined: null, added: [] }))
  useEffect(() => saveState('lj5', data), [data])
  const [view, setView] = useState('landing')
  const [catId, setCatId] = useState(null)
  const [actId, setActId] = useState(null)
  const [style, setStyle] = useState(null)
  const [f, setF] = useState({ name: '', cat: null, time: '', place: '', desc: '' })

  const all = [...ACTIVITIES, ...data.added]
  const act = all.find((a) => a.id === actId)
  const cat = LJ_CATEGORIES.find((c) => c.id === catId)
  const joinedAct = data.joined && all.find((a) => a.id === data.joined.actId)
  const joinedStyle = data.joined && STYLES.find((s) => s.id === data.joined.style)

  const open = (id) => { setActId(id); setStyle(null); setView('detail') }
  const set = (p) => setF((x) => ({ ...x, ...p }))
  const join = () => { setData((d) => ({ ...d, joined: { actId, style } })); setView('joined') }
  const cancel = () => setData((d) => ({ ...d, joined: null }))
  const save = () => {
    const a = { id: uid(), cat: f.cat, name: f.name.trim(), time: f.time.trim(), place: f.place.trim(), desc: f.desc.trim(), form: 'Terbuka', organizer: 'Lingkar Komunitas', tags: ['Terbuka'] }
    setData((d) => ({ ...d, added: [a, ...d.added] }))
    setCatId(f.cat)
    setView('saved')
  }

  const Info = ({ icon, label, children }) => (
    <div className="flex gap-3 text-[14px]">
      <span aria-hidden="true">{icon}</span>
      <div><p className="text-[12.5px] text-inkmuted">{label}</p><p className="text-ink">{children}</p></div>
    </div>
  )

  return (
    <div className="animate-rise">
      {view === 'landing' && (
        <>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-serif text-3xl font-semibold text-ink">Lingkar Jaga</h1>
            <p className="mt-3 font-serif text-xl leading-snug text-ink">Kembali terhubung, dengan cara yang terasa nyaman bagimu.</p>
            <p className="mt-2 text-[15px] leading-relaxed text-inkmuted">
              Temukan kegiatan bersama, ikut sesuai kemampuanmu, atau bantu menjaga ruang komunitas tetap hidup.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => setView('kategori')} className={solid}>Temukan Kegiatan</button>
              <button type="button" onClick={() => setView('bagikan')} className={ghost}>Bagikan Kegiatan</button>
            </div>
          </div>

          {joinedAct && (
            <section className={`${card} mt-8`}>
              <p className="text-[12.5px] text-inkmuted">Kegiatan yang kamu ikuti</p>
              <h2 className="mt-1 font-serif text-[17px] font-semibold text-ink">{joinedAct.name}</h2>
              <p className="text-[14px] text-inkmuted">{joinedAct.time}, {joinedAct.place}</p>
              <p className="text-[14px] text-inkmuted">Cara ikut: {joinedStyle.t}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => open(joinedAct.id)} className={`${ghost} !min-h-[40px] !px-4 !text-[13px]`}>Lihat Kegiatan</button>
                <button type="button" onClick={cancel} className={`${ghost} !min-h-[40px] !px-4 !text-[13px]`}>Batalkan</button>
              </div>
            </section>
          )}

          <Soft className="space-y-1">
            <p>Kegiatan komunitas bukan layanan terapi atau konseling.</p>
            <p>Kamu bebas memilih kapan ingin ikut, berhenti, atau kembali lagi.</p>
            <p>Kamu tidak perlu membagikan cerita pribadi untuk menjadi bagian dari kegiatan.</p>
          </Soft>
          <div className="mt-6 flex flex-col gap-2 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[13.5px] text-inkmuted">Membutuhkan dukungan profesional atau bantuan formal?</span>
            <Link to="/app/rujukan" className={`${ghost} !min-h-[40px] !px-4 !text-[13px] self-start sm:self-auto`}>Lihat Rujukan</Link>
          </div>
        </>
      )}

      {view === 'kategori' && (
        <>
          <Back onClick={() => setView('landing')}>Lingkar Jaga</Back>
          <H1>Kamu ingin ikut dalam kegiatan seperti apa?</H1>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {LJ_CATEGORIES.map((c) => (
              <button key={c.id} type="button" onClick={() => { setCatId(c.id); setView('daftar') }}
                className={`${card} text-left transition hover:border-leaf active:scale-[0.99] ${ring}`}>
                <span aria-hidden="true" className="text-2xl">{c.emoji}</span>
                <span className="mt-2 block font-serif text-[16px] font-semibold text-ink">{c.title}</span>
                <span className="mt-1 block text-[13.5px] leading-relaxed text-inkmuted">{c.desc}</span>
                <span className="mt-1 block text-[12.5px] leading-relaxed text-inkmuted">{c.eg}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {view === 'daftar' && cat && (
        <>
          <Back onClick={() => setView('kategori')}>Jenis kegiatan</Back>
          <p className="text-[13px] text-inkmuted"><span aria-hidden="true">{cat.emoji}</span> {cat.title}</p>
          <H1>Kegiatan yang tersedia</H1>
          {cat.id === 'bertemu' && (
            <Soft>
              Ruang ini untuk bertemu dan beraktivitas bersama. Kamu tidak perlu membagikan cerita pribadi untuk ikut.{' '}
              <Link to="/app/rujukan" className="font-medium text-leaf-dark underline underline-offset-2">Lihat Rujukan</Link> jika kamu membutuhkan dukungan profesional.
            </Soft>
          )}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {all.filter((a) => a.cat === cat.id).map((a) => <ActivityCard key={a.id} a={a} onOpen={open} />)}
          </div>
        </>
      )}

      {view === 'detail' && act && (
        <>
          <Back onClick={() => { setCatId(act.cat); setView('daftar') }}>Kegiatan</Back>
          <H1>{act.name}</H1>
          <p className="mt-1 text-[15px] font-medium text-ink">{act.time}</p>
          <p className="text-[14.5px] text-inkmuted">{act.place}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">{act.desc}</p>

          <div className={`${card} mt-5 space-y-3`}>
            <Info icon="📍" label="Tempat">{act.place}</Info>
            <Info icon="🕐" label="Waktu">{act.time}</Info>
            <Info icon="👥" label="Bentuk kegiatan">{act.form}</Info>
            <Info icon="👤" label="Penyelenggara">{act.organizer}</Info>
          </div>

          {act.cat === 'bertemu' && (
            <Soft>Ruang ini untuk bertemu dan beraktivitas bersama. Kamu tidak perlu membagikan cerita pribadi untuk ikut.</Soft>
          )}

          {data.joined?.actId === act.id ? (
            <div className="mt-6 rounded-organic border border-leaf/30 bg-leaf/10 p-5">
              <p className="font-serif text-lg font-semibold text-ink">Kamu sudah terdaftar</p>
              <p className="mt-1 text-[14px] text-inkmuted">Cara ikut: {joinedStyle.t}</p>
              <button type="button" onClick={cancel} className={`${ghost} mt-3`}>Batalkan Keikutsertaan</button>
            </div>
          ) : (
            <>
              <h2 className="mt-8 font-serif text-lg font-semibold text-ink">Kamu bisa ikut dengan cara:</h2>
              <p className="mt-1 text-[13.5px] text-inkmuted">Kamu memilih bagaimana ingin hadir.</p>
              <div className="mt-3 space-y-2">
                {STYLES.map((s) => (
                  <button key={s.id} type="button" aria-pressed={style === s.id} onClick={() => setStyle(s.id)}
                    className={`flex w-full items-start gap-3 rounded-organic border px-4 py-3 text-left transition ${style === s.id ? 'border-leaf bg-leaf/10' : 'border-ink/15 bg-white/70 hover:border-ink/30'} ${ring}`}>
                    <span aria-hidden="true" className="text-xl">{s.emoji}</span>
                    <span><span className="block text-[15px] font-medium text-ink">{s.t}</span><span className="block text-[13.5px] text-inkmuted">{s.d}</span></span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[13.5px] text-inkmuted">Kamu tidak perlu membagikan pengalaman pribadi untuk ikut. Ikuti kegiatan sesuai waktu dan kemampuanmu.</p>
              <button type="button" disabled={!style} onClick={join} className={`${solid} mt-4 w-full sm:w-auto`}>Ikut Kegiatan</button>
            </>
          )}

          {act.cross && (
            <div className="mt-6 space-y-2 border-t border-ink/10 pt-4">
              {act.cross.map((c) => (
                <div key={c.to} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[13.5px] text-inkmuted">{c.q}</span>
                  <Link to={c.to} className={`${ghost} !min-h-[40px] !px-4 !text-[13px] self-start sm:self-auto`}>{c.l}</Link>
                </div>
              ))}
            </div>
          )}
          <Soft>{OFFLINE}</Soft>
        </>
      )}

      {view === 'joined' && joinedAct && (
        <>
          <div className="rounded-organic border border-leaf/30 bg-leaf/10 p-6">
            <h1 className="font-serif text-2xl font-semibold text-ink">Kamu sudah terdaftar</h1>
            <p className="mt-3 font-medium text-ink">{joinedAct.name}</p>
            <p className="text-[14.5px] text-inkmuted">{joinedAct.time}</p>
            <p className="text-[14.5px] text-inkmuted">{joinedAct.place}</p>
            <p className="mt-2 text-[14.5px] text-ink"><span className="font-medium">Cara ikut:</span> {joinedStyle.t}</p>
          </div>
          <P>Datang sesuai waktu dan tempat kegiatan. Kamu bisa membatalkan keikutsertaan kapan saja.</P>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => setView('daftar')} className={solid}>Lihat Kegiatan</button>
            <button type="button" onClick={() => setView('landing')} className={ghost}>Kembali ke Lingkar Jaga</button>
          </div>
          <div className="mt-8 space-y-2 border-t border-ink/10 pt-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[13.5px] text-inkmuted">Ingin tetap terhubung dengan kegiatan ini?</span>
              <Link to="/app/tali-jaga" className={`${ghost} !min-h-[40px] !px-4 !text-[13px] self-start sm:self-auto`}>Gunakan Tali Jaga</Link>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[13.5px] text-inkmuted">Ingin memberi ruang untuk dirimu setelah kegiatan?</span>
              <Link to="/app/ruang-pulih" className={`${ghost} !min-h-[40px] !px-4 !text-[13px] self-start sm:self-auto`}>Kembali ke Ruang Pulih</Link>
            </div>
          </div>
        </>
      )}

      {view === 'bagikan' && (
        <>
          <Back onClick={() => setView('landing')}>Lingkar Jaga</Back>
          <H1>Bagikan kegiatan</H1>
          <div className="mt-5 space-y-5">
            <label className="block"><span className="text-[14px] font-semibold text-ink">Nama kegiatan</span>
              <input value={f.name} maxLength={60} onChange={(e) => set({ name: e.target.value })} className={input} /></label>
            <div>
              <span className="text-[14px] font-semibold text-ink">Jenis kegiatan</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {LJ_CATEGORIES.map((c) => (
                  <button key={c.id} type="button" aria-pressed={f.cat === c.id} onClick={() => set({ cat: c.id })}
                    className={`min-h-[44px] rounded-full border px-4 py-2 text-[13.5px] font-medium transition ${f.cat === c.id ? 'border-leaf bg-leaf text-cream' : 'border-ink/15 bg-white/70 text-ink hover:border-ink/30'} ${ring}`}>
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
            <label className="block"><span className="text-[14px] font-semibold text-ink">Waktu</span>
              <input value={f.time} maxLength={40} placeholder="Sabtu, 10.00–12.00" onChange={(e) => set({ time: e.target.value })} className={input} /></label>
            <label className="block"><span className="text-[14px] font-semibold text-ink">Ruang komunitas</span>
              <input value={f.place} maxLength={50} placeholder="Ruang komunitas, aula, taman lingkungan" onChange={(e) => set({ place: e.target.value })} className={input} /></label>
            <label className="block"><span className="text-[14px] font-semibold text-ink">Deskripsi singkat</span>
              <textarea rows={3} maxLength={200} value={f.desc} onChange={(e) => set({ desc: e.target.value })} className={input} />
              <span className="mt-1 block text-[12.5px] italic text-inkmuted">Ceritakan seperlunya. Hindari membagikan alamat rumah atau informasi pribadi.</span></label>
          </div>
          <Soft>{OFFLINE}</Soft>
          <button type="button" disabled={!f.name.trim() || !f.cat || !f.time.trim() || !f.place.trim()} onClick={save} className={`${solid} mt-5 w-full sm:w-auto`}>Simpan Kegiatan</button>
        </>
      )}

      {view === 'saved' && (
        <>
          <H1>Kegiatan berhasil ditambahkan.</H1>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setView('daftar')} className={solid}>Lihat Kegiatan</button>
            <button type="button" onClick={() => setView('landing')} className={ghost}>Kembali ke Lingkar Jaga</button>
          </div>
        </>
      )}
    </div>
  )
}

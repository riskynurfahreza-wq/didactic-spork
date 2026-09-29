import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GROUPS, SERVICES, HOW_TO, NEEDS } from '../../lib/rujukanData.js'

const ring = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
const card = 'rounded-organic border border-ink/10 bg-white/80 p-5'
const btn = `inline-flex min-h-[48px] items-center justify-center rounded-full px-6 text-[14.5px] font-medium transition active:scale-[0.98] ${ring}`
const solid = `${btn} bg-leaf text-cream hover:bg-leaf-dark`
const ghost = `${btn} border border-ink/15 text-ink hover:bg-ink/5`
const sm = '!min-h-[40px] !px-4 !text-[13px]'

const CROSS = [
  { q: 'Ingin melakukan aktivitas mandiri sambil mencari langkah berikutnya?', l: 'Kembali ke Ruang Pulih', to: '/app/ruang-pulih' },
  { q: 'Membutuhkan bantuan praktis dari komunitas?', l: 'Buka Saling Jaga', to: '/app/saling-jaga' },
  { q: 'Ingin tetap terhubung dengan kegiatan komunitas?', l: 'Buka Lingkar Jaga', to: '/app/lingkar-jaga' },
]

const Back = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className={`mb-4 rounded-md py-1 text-[13.5px] text-inkmuted hover:text-ink ${ring}`}>← {children}</button>
)
const H1 = ({ children }) => <h1 className="font-serif text-2xl font-semibold text-ink">{children}</h1>
const P = ({ children, className = '' }) => <p className={`mt-2 text-[14.5px] leading-relaxed text-inkmuted ${className}`}>{children}</p>
const Soft = ({ children }) => <div className="mt-5 rounded-organic bg-sand/70 p-4 text-[13.5px] leading-relaxed text-inkmuted">{children}</div>

function Cross() {
  return (
    <div className="mt-10 space-y-2 border-t border-ink/10 pt-5">
      {CROSS.map((c) => (
        <div key={c.to} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[13.5px] text-inkmuted">{c.q}</span>
          <Link to={c.to} className={`${ghost} ${sm} self-start sm:self-auto`}>{c.l}</Link>
        </div>
      ))}
    </div>
  )
}

export default function Rujukan() {
  const [view, setView] = useState('landing') // landing | cari | list | detail | panduan | hasil | umum | urgent
  const [groupId, setGroupId] = useState(null)
  const [svc, setSvc] = useState(null)
  const [need, setNeed] = useState(null)
  const [how, setHow] = useState(false)
  const group = GROUPS.find((g) => g.id === groupId)
  const service = SERVICES.find((s) => s.id === svc)
  const needObj = NEEDS.find((n) => n.id === need)

  const openGroup = (id) => { if (id === 'segera') return setView('urgent'); setGroupId(id); setView('list') }
  const openService = (id) => { setSvc(id); setHow(false); setView('detail') }

  return (
    <div className="animate-rise">
      {view === 'landing' && (
        <>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-serif text-3xl font-semibold text-ink">Rujukan</h1>
            <p className="mt-3 font-serif text-xl leading-snug text-ink">Tidak semua hal harus kamu hadapi sendiri.</p>
            <p className="mt-2 text-[15px] leading-relaxed text-inkmuted">Temukan jalur bantuan profesional atau layanan formal sesuai kebutuhanmu.</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { t: 'Saya tahu bantuan yang saya cari', d: 'Lihat layanan yang sesuai dengan kebutuhanmu.', cta: 'Cari Layanan', go: 'cari' },
              { t: 'Saya belum tahu harus ke mana', d: 'Gunakan panduan singkat untuk menemukan jalur bantuan yang mungkin sesuai.', cta: 'Bantu Saya Menentukan Jalur', go: 'panduan' },
            ].map((p) => (
              <section key={p.go} className={`${card} flex flex-col justify-between gap-5 p-6 shadow-card`}>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-ink">{p.t}</h2>
                  <p className="mt-1 text-[14px] leading-relaxed text-inkmuted">{p.d}</p>
                </div>
                <button type="button" onClick={() => setView(p.go)} className={`${solid} w-full`}>{p.cta}</button>
              </section>
            ))}
          </div>

          <section className="mt-4 flex flex-col gap-4 rounded-organic border border-terracotta/30 bg-terracotta/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-[16px] font-semibold text-ink">Butuh bantuan segera?</h2>
              <p className="mt-1 text-[13.5px] leading-relaxed text-inkmuted">Jika kamu membutuhkan pertolongan segera atau merasa tidak dapat menjaga keselamatan diri, gunakan layanan darurat atau fasilitas kesehatan terdekat.</p>
            </div>
            <button type="button" onClick={() => setView('urgent')} className={`${btn} w-full border border-terracotta/50 text-terracotta-dark hover:bg-terracotta/10 sm:w-auto sm:shrink-0`}>Bantuan Segera</button>
          </section>

          <section className={`${card} mt-4`}>
            <h2 className="font-serif text-[16px] font-semibold text-ink">Tentang Rujukan</h2>
            <p className="mt-1 text-[13.5px] leading-relaxed text-inkmuted">
              Sambung Jaga membantu kamu menemukan jalur menuju layanan profesional atau formal. Platform ini tidak melakukan diagnosis, memberikan terapi, atau menggantikan tenaga kesehatan.
            </p>
          </section>
          <Cross />
        </>
      )}

      {view === 'cari' && (
        <>
          <Back onClick={() => setView('landing')}>Rujukan</Back>
          <H1>Bantuan seperti apa yang sedang kamu cari?</H1>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {GROUPS.map((g) => (
              <section key={g.id} className={`flex flex-col justify-between gap-4 rounded-organic border p-5 ${g.id === 'segera' ? 'border-terracotta/30 bg-terracotta/10' : 'border-ink/10 bg-white/80'}`}>
                <div>
                  <span aria-hidden="true" className="text-2xl">{g.emoji}</span>
                  <h2 className="mt-2 font-serif text-[16px] font-semibold text-ink">{g.title}</h2>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-inkmuted">{g.desc}</p>
                </div>
                <button type="button" onClick={() => openGroup(g.id)} className={`${g.id === 'segera' ? ghost : solid} w-full`}>{g.cta}</button>
              </section>
            ))}
          </div>
        </>
      )}

      {view === 'panduan' && (
        <>
          <Back onClick={() => setView('landing')}>Rujukan</Back>
          <H1>Kita bisa mulai dari kebutuhanmu.</H1>
          <P>Kamu tidak perlu mengetahui diagnosis atau istilah medis untuk mencari bantuan.</P>
          <h2 className="mt-6 font-serif text-lg font-semibold text-ink">Apa yang paling mendekati kebutuhanmu saat ini?</h2>
          <div className="mt-3 space-y-2">
            {NEEDS.map((n) => (
              <button key={n.id} type="button"
                onClick={() => { if (n.id === 'segera') return setView('urgent'); setNeed(n.id); setView(n.id === 'belum' ? 'umum' : 'hasil') }}
                className={`flex w-full items-start gap-3 rounded-organic border border-ink/15 bg-white/70 px-4 py-3 text-left transition hover:border-leaf active:scale-[0.99] ${ring}`}>
                <span aria-hidden="true" className="text-xl">{n.emoji}</span>
                <span className="text-[14.5px] font-medium text-ink">{n.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {view === 'hasil' && needObj?.result && (
        <>
          <Back onClick={() => setView('panduan')}>Kembali</Back>
          <p className="text-[13px] text-inkmuted">Salah satu jalur yang bisa kamu pertimbangkan</p>
          <div className={`${card} mt-2`}>
            <h1 className="font-serif text-xl font-semibold text-ink">{needObj.result.title}</h1>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink">{needObj.result.desc}</p>
            <p className="mt-3 text-[14px] font-medium text-leaf-dark">{needObj.result.note}</p>
            <button type="button" onClick={() => openGroup(needObj.result.group)} className={`${solid} mt-4 w-full sm:w-auto`}>{needObj.result.cta}</button>
          </div>
          <Cross />
        </>
      )}

      {view === 'umum' && (
        <>
          <Back onClick={() => setView('panduan')}>Kembali</Back>
          <H1>Tidak apa-apa kalau masih belum yakin.</H1>
          <P>Berikut gambaran umum jalur yang tersedia. Kamu dapat mempertimbangkan salah satunya, dan menghubungi puskesmas atau penyedia layanan untuk arahan lebih lanjut tentang langkah berikutnya.</P>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {GROUPS.filter((g) => g.id !== 'segera').map((g) => (
              <button key={g.id} type="button" onClick={() => openGroup(g.id)} className={`${card} text-left transition hover:border-leaf ${ring}`}>
                <span aria-hidden="true" className="text-xl">{g.emoji}</span>
                <span className="mt-1 block font-serif text-[16px] font-semibold text-ink">{g.title}</span>
                <span className="mt-1 block text-[13.5px] text-inkmuted">{g.desc}</span>
              </button>
            ))}
          </div>
          <Cross />
        </>
      )}

      {view === 'list' && group && (
        <>
          <Back onClick={() => setView('cari')}>Jenis bantuan</Back>
          <p className="text-[13px] text-inkmuted"><span aria-hidden="true">{group.emoji}</span> {group.title}</p>
          <H1>Pilihan layanan</H1>
          {group.note && <Soft>{group.note}</Soft>}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {SERVICES.filter((s) => s.group === group.id).map((s) => (
              <div key={s.id} className={card}>
                <h2 className="font-serif text-[17px] font-semibold text-ink">{s.name}</h2>
                <dl className="mt-2 space-y-0.5 text-[13.5px] text-inkmuted">
                  <div><dt className="inline font-medium text-ink">Jenis layanan: </dt><dd className="inline">{s.jenis}</dd></div>
                  <div><dt className="inline font-medium text-ink">Format: </dt><dd className="inline">{s.format}</dd></div>
                  <div><dt className="inline font-medium text-ink">Akses: </dt><dd className="inline">{s.akses}</dd></div>
                  <div><dt className="inline font-medium text-ink">Area: </dt><dd className="inline">{s.area}</dd></div>
                </dl>
                <button type="button" onClick={() => openService(s.id)} className={`${ghost} mt-4 w-full sm:w-auto`}>{group.id === 'kesehatan' ? 'Lihat Fasilitas' : 'Lihat Layanan'}</button>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'detail' && service && (
        <>
          <Back onClick={() => setView('list')}>Pilihan layanan</Back>
          <H1>{service.name}</H1>
          <div className={`${card} mt-5 space-y-3`}>
            {[['Jenis layanan', service.jenis], ['Format', service.format], ['Akses', service.akses], ['Area', service.area]].map(([k, v]) => (
              <div key={k}><p className="text-[12.5px] text-inkmuted">{k}</p><p className="text-[15px] text-ink">{v}</p></div>
            ))}
          </div>
          <Soft>
            <span className="font-medium text-ink">Informasi penting.</span> Detail jadwal, biaya, pendaftaran, dan ketersediaan perlu dikonfirmasi melalui penyedia layanan.
          </Soft>
          {GROUPS.find((g) => g.id === service.group).note && <Soft>{GROUPS.find((g) => g.id === service.group).note}</Soft>}
          {!how ? (
            <button type="button" onClick={() => setHow(true)} className={`${solid} mt-5 w-full sm:w-auto`}>Lihat Cara Mengakses</button>
          ) : (
            <div className="mt-5 rounded-organic border border-leaf/30 bg-leaf/10 p-5">
              <h2 className="font-serif text-lg font-semibold text-ink">Cara mengakses</h2>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-ink">
                {HOW_TO.map((h) => <li key={h}>{h}</li>)}
              </ol>
              <p className="mt-3 text-[13.5px] text-inkmuted">Kamu yang menentukan apakah dan kapan ingin melanjutkan.</p>
            </div>
          )}
        </>
      )}

      {view === 'urgent' && (
        <>
          <Back onClick={() => setView('landing')}>Rujukan</Back>
          <div className="rounded-organic border border-terracotta/30 bg-terracotta/10 p-6">
            <H1>Butuh bantuan segera?</H1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">
              Jika kamu merasa berada dalam bahaya, tidak dapat menjaga keselamatan diri, atau membutuhkan pertolongan medis segera, cari bantuan langsung dari layanan darurat atau fasilitas kesehatan terdekat.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href="tel:112" className={`${btn} bg-terracotta-dark text-cream hover:opacity-90`}>Hubungi Layanan Darurat (112)</a>
              <a href="https://www.google.com/maps/search/?api=1&query=fasilitas+kesehatan+terdekat" target="_blank" rel="noopener noreferrer" className={`${ghost} bg-white/60`}>Cari Fasilitas Kesehatan Terdekat</a>
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed text-inkmuted">
              112 adalah nomor panggilan darurat nasional dan dapat dihubungi tanpa pulsa. Jika layanan 112 belum tersedia di wilayahmu, kamu bisa menghubungi ambulans di <a href="tel:119" className="font-medium text-ink underline">119</a> atau <a href="tel:118" className="font-medium text-ink underline">118</a>.
            </p>
          </div>
          <P className="text-ink">Jika memungkinkan, beri tahu orang yang kamu percaya bahwa kamu membutuhkan bantuan dan usahakan untuk tidak menghadapi situasi tersebut sendirian.</P>
        </>
      )}
    </div>
  )
}

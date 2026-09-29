export const FEATURE_ROUTES = {
  'Saling Jaga': '/app/saling-jaga',
  'Lingkar Jaga': '/app/lingkar-jaga',
  'Tali Jaga': '/app/tali-jaga',
  'Kita Bisa': '/app/kita-bisa',
  Rujukan: '/app/rujukan',
  'Ruang Pulih': '/app/ruang-pulih',
}

export const PRINCIPLES = [
  {
    n: '01',
    name: 'Koneksi',
    insight: 'Orang lebih cenderung berpartisipasi ketika mereka merasa terhubung dengan orang lain dan dengan komunitas bersama.',
    principle: 'Mempermudah terbentuknya koneksi komunitas yang bermakna.',
    features: ['Saling Jaga', 'Lingkar Jaga', 'Tali Jaga'],
  },
  {
    n: '02',
    name: 'Visibilitas',
    insight: 'Dukungan lebih mudah diakses ketika orang bisa melihat kebutuhan apa yang ada dan sumber daya apa yang tersedia.',
    principle: 'Mempermudah pengenalan kebutuhan, sumber daya, dan dukungan komunitas.',
    features: ['Kita Bisa', 'Saling Jaga', 'Rujukan'],
  },
  {
    n: '03',
    name: 'Aksi Kolektif',
    insight: 'Masalah bersama sering kali mengharuskan orang menentukan prioritas, mengoordinasikan sumber daya, dan bertindak bersama.',
    principle: 'Menciptakan peluang bagi komunitas untuk berkoordinasi dan bertindak secara kolektif.',
    features: ['Lingkar Jaga', 'Kita Bisa', 'Saling Jaga'],
  },
  {
    n: '04',
    name: 'Kesinambungan',
    insight: "Pemulihan berubah seiring waktu. Kebutuhan, kapasitas, dan kesediaan orang untuk berpartisipasi juga bisa berubah.",
    principle: 'Menjaga dukungan tetap dapat diakses dan partisipasi tetap fleksibel seiring berjalannya pemulihan.',
    features: ['Tali Jaga', 'Ruang Pulih', 'Lingkar Jaga', 'Rujukan'],
  },
]

// Bipartite graph for the overlap network: 4 principles (left) x 6 features (right).
export const NETWORK_LEFT = PRINCIPLES.map((p) => p.name)
export const NETWORK_RIGHT = ['Saling Jaga', 'Lingkar Jaga', 'Tali Jaga', 'Kita Bisa', 'Rujukan', 'Ruang Pulih']
export const NETWORK_EDGES = PRINCIPLES.flatMap((p, pi) =>
  p.features.map((f) => [pi, 4 + NETWORK_RIGHT.indexOf(f)])
)

export const FOUNDATIONS = [
  {
    title: 'Koneksi sosial',
    body: 'Rasa kebersamaan yang dimiliki bersama dapat mendorong orang untuk saling mendukung dan berpartisipasi dalam aksi kolektif.',
    tag: 'Identitas sosial',
  },
  {
    title: 'Dukungan',
    body: "Dukungan sosial dapat memperkuat rasa bahwa bantuan tersedia di dalam komunitas mereka.",
    tag: 'Persepsi dukungan sosial',
  },
  {
    title: 'Aksi kolektif',
    body: 'Komunitas lebih mampu bertindak bersama ketika anggotanya percaya mereka bisa berkoordinasi secara efektif menuju tujuan bersama.',
    tag: 'Efikasi kolektif',
  },
  {
    title: 'Sumber daya komunitas',
    body: 'Jaringan, kepercayaan, timbal balik, dan koneksi lintas kelompok maupun institusi dapat membantu komunitas mengakses dan menggerakkan sumber daya.',
    tag: 'Modal sosial',
  },
]

export const CAPITAL_LAYERS = [
  { name: 'Bonding', desc: 'Koneksi di dalam jaringan komunitas yang erat.' },
  { name: 'Bridging', desc: 'Koneksi lintas kelompok yang berbeda.' },
  { name: 'Linking', desc: 'Koneksi antara komunitas dengan institusi atau pihak yang memiliki akses ke sumber daya tambahan.' },
]

export const LINKING_EXAMPLES = [
  'Rujukan menghubungkan orang dengan layanan formal',
  'Lingkar Jaga menghubungkan keresahan komunitas dengan struktur lokal',
  'Kita Bisa membuat sumber daya eksternal yang relevan lebih terlihat',
  'Saling Jaga membantu menghubungkan kebutuhan komunitas dengan sumber daya yang tersedia',
]

import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './components/public/PublicLayout.jsx'
import Home from './components/public/Home.jsx'
import About from './components/public/About.jsx'
import HowItWorks from './components/public/HowItWorks.jsx'
import Features from './components/public/Features.jsx'
import AppShell from './components/app/AppShell.jsx'
import Beranda from './components/app/Beranda.jsx'
import RuangPulih from './components/app/RuangPulih.jsx'
import SalingJaga from './components/app/SalingJaga.jsx'
import TaliJaga from './components/app/TaliJaga.jsx'
import KitaBisa from './components/app/KitaBisa.jsx'
import LingkarJaga from './components/app/LingkarJaga.jsx'
import Rujukan from './components/app/Rujukan.jsx'
import Aku from './components/app/Aku.jsx'
import Profil from './components/app/Profil.jsx'
import Tentang from './components/app/Tentang.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/features" element={<Features />} />
        </Route>

        <Route path="/app" element={<AppShell />}>
          <Route index element={<Beranda />} />
          <Route path="ruang-pulih" element={<RuangPulih />} />
          <Route path="saling-jaga" element={<SalingJaga />} />
          <Route path="tali-jaga" element={<TaliJaga />} />
          <Route path="kita-bisa" element={<KitaBisa />} />
          <Route path="lingkar-jaga" element={<LingkarJaga />} />
          <Route path="rujukan" element={<Rujukan />} />
          <Route path="aku" element={<Aku />} />
          <Route path="profil" element={<Profil />} />
          <Route path="tentang" element={<Tentang />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

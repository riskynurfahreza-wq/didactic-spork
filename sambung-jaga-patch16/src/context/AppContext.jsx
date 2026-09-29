import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadState, saveState, uid } from '../lib/storage.js'
import { RUANG_PULIH_CONTENT } from '../lib/dummyData.js'

const AppContext = createContext(null)

const initial = {
  onboardingDone: false,
  kabarTaHistory: [], // { date, choices: [] }
  ruangPulihDone: [], // activity ids
  needs: [], // { id, categoryId, timeframe, preferensi, area, note, createdAt, status }
  offers: [], // { id, categoryId, availability, area, note, createdAt }
  connections: [], // { id, categoryId, withInitial, area, availability, note, startedAt, status: 'pending'|'active'|'ended', duration, checkins: [] }
  lingkarRSVPs: [], // circle ids
  lingkarProposed: [], // user-proposed circles
  rujukanVisits: 0,
  profile: { pseudonym: 'Anda', visibility: 'area-only', area: 'RW 01' },
  infoPrefs: { kegiatanKomunitas: true, bantuanTersedia: true, kebutuhanKomunitas: true, layanan: false },
  sharePrefs: { area: true, ketersediaan: true, catatan: true },
}

export function AppProvider({ children }) {
  const [state, setState] = useState(() => ({
    onboardingDone: loadState('onboardingDone', initial.onboardingDone),
    kabarTaHistory: loadState('kabarTaHistory', initial.kabarTaHistory),
    ruangPulihDone: loadState('ruangPulihDone', initial.ruangPulihDone),
    needs: loadState('needs', initial.needs),
    offers: loadState('offers', initial.offers),
    connections: loadState('connections', initial.connections),
    lingkarRSVPs: loadState('lingkarRSVPs', initial.lingkarRSVPs),
    lingkarProposed: loadState('lingkarProposed', initial.lingkarProposed),
    rujukanVisits: loadState('rujukanVisits', initial.rujukanVisits),
    profile: loadState('profile', initial.profile),
    infoPrefs: loadState('infoPrefs', initial.infoPrefs),
    sharePrefs: loadState('sharePrefs', initial.sharePrefs),
  }))

  useEffect(() => saveState('onboardingDone', state.onboardingDone), [state.onboardingDone])
  useEffect(() => saveState('kabarTaHistory', state.kabarTaHistory), [state.kabarTaHistory])
  useEffect(() => saveState('ruangPulihDone', state.ruangPulihDone), [state.ruangPulihDone])
  useEffect(() => saveState('needs', state.needs), [state.needs])
  useEffect(() => saveState('offers', state.offers), [state.offers])
  useEffect(() => saveState('connections', state.connections), [state.connections])
  useEffect(() => saveState('lingkarRSVPs', state.lingkarRSVPs), [state.lingkarRSVPs])
  useEffect(() => saveState('lingkarProposed', state.lingkarProposed), [state.lingkarProposed])
  useEffect(() => saveState('rujukanVisits', state.rujukanVisits), [state.rujukanVisits])
  useEffect(() => saveState('profile', state.profile), [state.profile])
  useEffect(() => saveState('infoPrefs', state.infoPrefs), [state.infoPrefs])
  useEffect(() => saveState('sharePrefs', state.sharePrefs), [state.sharePrefs])

  const actions = useMemo(() => ({
    completeOnboarding: () => setState((s) => ({ ...s, onboardingDone: true })),

    recordKabarTa: (choices) => {
      setState((s) => ({
        ...s,
        kabarTaHistory: [...s.kabarTaHistory, { date: new Date().toISOString(), choices }],
      }))
    },

    completeRuangPulih: (activityId) => {
      setState((s) =>
        s.ruangPulihDone.includes(activityId)
          ? s
          : { ...s, ruangPulihDone: [...s.ruangPulihDone, activityId] }
      )
    },

    addNeed: (need) => {
      const entry = { id: uid(), createdAt: new Date().toISOString(), status: 'open', ...need }
      setState((s) => ({ ...s, needs: [entry, ...s.needs] }))
      return entry
    },

    addOffer: (offer) => {
      const entry = { id: uid(), createdAt: new Date().toISOString(), ...offer }
      setState((s) => ({ ...s, offers: [entry, ...s.offers] }))
      return entry
    },

    createConnection: (conn) => {
      const entry = {
        id: uid(),
        startedAt: new Date().toISOString(),
        status: 'active',
        duration: 'Sekali saja',
        checkins: [],
        ...conn,
      }
      setState((s) => ({ ...s, connections: [entry, ...s.connections] }))
      return entry
    },

    setConnectionDuration: (id, duration) => {
      setState((s) => ({
        ...s,
        connections: s.connections.map((c) => (c.id === id ? { ...c, duration } : c)),
      }))
    },

    addCheckin: (connId, mood) => {
      setState((s) => ({
        ...s,
        connections: s.connections.map((c) =>
          c.id === connId
            ? { ...c, checkins: [{ date: new Date().toISOString(), mood }, ...c.checkins] }
            : c
        ),
      }))
    },

    endConnection: (connId) => {
      setState((s) => ({
        ...s,
        connections: s.connections.map((c) => (c.id === connId ? { ...c, status: 'ended' } : c)),
      }))
    },

    rsvpLingkar: (circleId) => {
      setState((s) =>
        s.lingkarRSVPs.includes(circleId)
          ? s
          : { ...s, lingkarRSVPs: [...s.lingkarRSVPs, circleId] }
      )
    },

    proposeLingkar: (circle) => {
      const entry = { id: uid(), createdAt: new Date().toISOString(), ...circle }
      setState((s) => ({ ...s, lingkarProposed: [entry, ...s.lingkarProposed] }))
      return entry
    },

    visitRujukan: () => {
      setState((s) => ({ ...s, rujukanVisits: s.rujukanVisits + 1 }))
    },

    updateProfile: (patch) => {
      setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }))
    },

    setInfoPref: (key, value) => {
      setState((s) => ({ ...s, infoPrefs: { ...s.infoPrefs, [key]: value } }))
    },

    setSharePref: (key, value) => {
      setState((s) => ({ ...s, sharePrefs: { ...s.sharePrefs, [key]: value } }))
    },
  }), [])

  const derived = useMemo(() => {
    const activeConnections = state.connections.filter((c) => c.status === 'active')
    const bothNeedAndOffer = state.needs.length > 0 && state.offers.length > 0
    return { activeConnections, bothNeedAndOffer }
  }, [state.connections, state.needs, state.offers])

  const evalIndicators = useMemo(() => ({
    onboardingCompletion: state.onboardingDone,
    kabarTaCompletion: state.kabarTaHistory.length > 0,
    selectedPathways: [...new Set(state.kabarTaHistory.flatMap((h) => h.choices))],
    bothNeedAndOffer: derived.bothNeedAndOffer,
    successfulConnections: state.connections.length,
    taliJagaContinuation: state.connections.filter((c) => c.status === 'active' && c.duration !== 'Sekali saja').length,
    lingkarRSVPs: state.lingkarRSVPs.length,
    ruangPulihCompleted: state.ruangPulihDone.length,
    ruangPulihTotal: Object.values(RUANG_PULIH_CONTENT).reduce((a, c) => a + c.activities.length, 0),
    rujukanVisits: state.rujukanVisits,
  }), [state, derived])

  const value = { state, ...actions, ...derived, evalIndicators }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

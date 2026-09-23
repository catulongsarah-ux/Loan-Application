import { Link } from 'react-router-dom'

// A deliberately persuasive (fictional) loan landing page.
// The persuasion techniques here are the ones the reveal page later names:
// urgency, too-good-to-be-true amounts, fake trust badges, social proof.
export default function Landing() {
  return (
    <div className="site">
      <header className="topbar">
        <div className="brand">
          <span className="logo">₱</span>
          <span className="brand-name">PesoQuick</span>
        </div>
        <Link className="btn btn-ghost" to="/apply">Log in</Link>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="pill">⚡ Approved in 15 minutes</span>
            <h1>Get up to <span className="amount">₱50,000</span> cash today</h1>
            <p className="lead">
              No collateral. No paperwork. Money sent straight to your GCash or
              bank account. Over <strong>2 million Filipinos</strong> approved.
            </p>
            <Link className="btn btn-primary btn-lg" to="/apply">
              Apply now — it&apos;s free
            </Link>
            <div className="trust-row">
              <span className="trust">🔒 Bank-level security</span>
              <span className="trust">⭐ 4.9/5 (48,201 reviews)</span>
              <span className="trust">✅ Zero hidden fees</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="offer-card">
              <div className="offer-top">
                <span>Your pre-approved amount</span>
                <span className="badge-live">● LIVE</span>
              </div>
              <div className="offer-amount">₱50,000</div>
              <div className="offer-meta">
                <div><small>Monthly</small><strong>₱1,999</strong></div>
                <div><small>Interest</small><strong>0.8%</strong></div>
                <div><small>Term</small><strong>24 mo</strong></div>
              </div>
              <Link className="btn btn-primary btn-block" to="/apply">
                Claim my ₱50,000
              </Link>
              <p className="offer-fine">Offer expires in 09:58 — apply now to lock it in.</p>
            </div>
          </div>
        </section>

        <section className="steps">
          <h2>How it works</h2>
          <div className="step-grid">
            <div className="step"><span className="step-num">1</span><h3>Log in</h3><p>Sign in with your account to see your offer.</p></div>
            <div className="step"><span className="step-num">2</span><h3>Confirm details</h3><p>Takes less than 2 minutes.</p></div>
            <div className="step"><span className="step-num">3</span><h3>Get your cash</h3><p>Money sent within 15 minutes.</p></div>
          </div>
        </section>

        <section className="reviews">
          <h2>What our customers say</h2>
          <div className="review-grid">
            <blockquote>&ldquo;Got ₱30,000 in my GCash the same day. Sobrang bilis!&rdquo;<cite>— Maria S.</cite></blockquote>
            <blockquote>&ldquo;Legit and fast. Saved me during an emergency.&rdquo;<cite>— Jomar D.</cite></blockquote>
            <blockquote>&ldquo;Easy application, approved agad.&rdquo;<cite>— Angela R.</cite></blockquote>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 PesoQuick Lending Corp. · Terms · Privacy · Help</p>
        <p className="footer-fine">PesoQuick is a fictional brand created for a security-awareness exercise.</p>
      </footer>
    </div>
  )
}

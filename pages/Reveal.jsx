import { useLocation, Link } from 'react-router-dom'

// The educational payload. This is what turns a credential-grabber into a
// teaching tool: the moment someone submits, they learn they were phished,
// see exactly what was captured, and get the red flags they missed.
export default function Reveal() {
  const { state } = useLocation()
  const fullName = state?.fullName || 'your name'
  const password = state?.password || 'your password'

  const flags = [
    ['The URL was not your bank', 'Real lenders never live on a random link someone sends you. Always check the address bar and type known sites yourself.'],
    ['It asked for your password', 'A legitimate service does not need your existing account password to "release funds." That request alone is the tell.'],
    ['Too good to be true', '₱50,000 in 15 minutes with 0.8% interest and no paperwork is bait. Unrealistic offers are designed to switch off your caution.'],
    ['Manufactured urgency', 'A countdown timer ("offer expires in 09:58") pressures you to act before you think.'],
    ['Fake trust signals', 'Padlock emojis, "bank-level security", star ratings and reviews are trivial to fake. They are decoration, not proof.'],
  ]

 
return (
  <div className="reveal-wrap success-page">
    <div className="reveal-card success-card">

      <div className="success-icon">
        ✓
      </div>

      <p className="success-status">
        SUCCESSFUL
      </p>

      <h1>Money Released!</h1>

      <p className="reveal-lead">
        Congratulations, <strong>{fullName}</strong>!
        Your request has been successfully processed.
      </p>

      <div className="released-amount">
        <span>Amount Released</span>
        <strong>₱50,000.00</strong>
      </div>

      <div className="transaction-details">

        <div className="detail-row">
          <span>Recipient</span>
          <strong>{fullName}</strong>
        </div>

        <div className="detail-row">
          <span>Status</span>
          <strong className="status-success">Completed</strong>
        </div>

        <div className="detail-row">
          <span>Transaction Type</span>
          <strong>Cash Release</strong>
        </div>

        <div className="detail-row">
          <span>Reference Number</span>
          <strong>PQ-DEMO-50000</strong>
        </div>

      </div>

      <div className="demo-notice">
        <strong>Simulation Complete</strong>
        <p>
          This is a fictional classroom demonstration.
          No real money was transferred.
        </p>
      </div>

      <Link
        to="/"
        className="btn btn-primary btn-lg"
      >
        Back to Home
      </Link>

    </div>
  </div>
)
}

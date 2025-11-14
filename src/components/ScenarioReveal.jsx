import { useState } from 'react'
import './ScenarioReveal.css'

function ScenarioReveal({ selectedPersonality }) {
  const [revealed, setRevealed] = useState({
    driven: false,
    careful: false,
    carefree: false
  })
  const [userChoice, setUserChoice] = useState('')
  const [showAssessment, setShowAssessment] = useState(false)

  const scenarios = {
    driven: {
      choice: 'Save $80, spend $20 on something needed',
      quote: 'This will help me reach my goals!'
    },
    careful: {
      choice: 'Save $50, spend $30 on something useful, save $20 for later',
      quote: 'Balance is key to financial wellness!'
    },
    carefree: {
      choice: 'Treat friends to dinner and a movie!',
      quote: 'Memories are priceless!'
    }
  }

  const handleReveal = (type) => {
    setRevealed(prev => ({ ...prev, [type]: true }))
  }

  const handleStartAssessment = () => {
    setShowAssessment(true)
  }

  const handleBackToContent = () => {
    setShowAssessment(false)
  }

  if (showAssessment) {
    return (
      <div className="assessment-module-container">
        <div className="assessment-module">
          <h2 className="assessment-title">Assessment Module Would Load Here</h2>
          <p className="assessment-description">
            The interactive quiz from the previous component would be integrated here
          </p>
          <button className="back-to-content-btn" onClick={handleBackToContent}>
            Back to Content
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="scenario-container">
      <div className="scenario-header">
        <h2 className="scenario-title">See It In Action!</h2>
      </div>

      <div className="scenario-card">
        <h3 className="scenario-question">
          Scenario: You just got $100 for your birthday
        </h3>
        <p className="scenario-subquestion">What would each personality type do?</p>
      </div>

      <div className="personality-scenarios">
        <div className="scenario-item">
          <h4 className="scenario-personality">Money Driven</h4>
          {!revealed.driven ? (
            <button 
              className="reveal-btn"
              onClick={() => handleReveal('driven')}
            >
              Reveal Choice
            </button>
          ) : (
            <div className="revealed-content">
              <p className="revealed-choice">{scenarios.driven.choice}</p>
              <p className="revealed-quote">"{scenarios.driven.quote}"</p>
            </div>
          )}
        </div>

        <div className="scenario-item">
          <h4 className="scenario-personality">Money Careful</h4>
          {!revealed.careful ? (
            <button 
              className="reveal-btn"
              onClick={() => handleReveal('careful')}
            >
              Reveal Choice
            </button>
          ) : (
            <div className="revealed-content">
              <p className="revealed-choice">{scenarios.careful.choice}</p>
              <p className="revealed-quote">"{scenarios.careful.quote}"</p>
            </div>
          )}
        </div>

        <div className="scenario-item">
          <h4 className="scenario-personality">Money Care-Free</h4>
          {!revealed.carefree ? (
            <button 
              className="reveal-btn"
              onClick={() => handleReveal('carefree')}
            >
              Reveal Choice
            </button>
          ) : (
            <div className="revealed-content">
              <p className="revealed-choice">{scenarios.carefree.choice}</p>
              <p className="revealed-quote">"{scenarios.carefree.quote}"</p>
            </div>
          )}
        </div>
      </div>

      <div className="user-choice-section">
        <h3 className="user-choice-title">Your turn! What would YOU do?</h3>
        <select 
          className="user-choice-select"
          value={userChoice}
          onChange={(e) => setUserChoice(e.target.value)}
        >
          <option value="">Choose your action...</option>
          <option value="save-all">Save all $100</option>
          <option value="save-most">Save $80, spend $20</option>
          <option value="save-half">Save $50, spend $50</option>
          <option value="spend-most">Save $20, spend $80</option>
          <option value="spend-all">Spend all $100</option>
          <option value="other">Something else</option>
        </select>
      </div>

      {userChoice && (
        <div className="assessment-prompt">
          <button className="assessment-btn" onClick={handleStartAssessment}>
            Start Assessment
          </button>
        </div>
      )}
    </div>
  )
}

export default ScenarioReveal


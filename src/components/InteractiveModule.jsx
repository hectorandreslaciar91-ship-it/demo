import { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import PersonalityCards from './PersonalityCards'
import MoneySpectrum from './MoneySpectrum'
import BuildingBlocks from './BuildingBlocks'
import ScenarioReveal from './ScenarioReveal'
import LearningNotes from './LearningNotes'
import './InteractiveModule.css'

const MODULE_STEPS = [
  'Your Money Journey Starts Here',
  'Building Your Money Personality',
  'The Three Money Personalities'
]

function InteractiveModule() {
  const [currentStep, setCurrentStep] = useState(1)
  const [points, setPoints] = useState(25)
  const [engagementTime, setEngagementTime] = useState(0)
  const [notes, setNotes] = useState([])
  const [selectedPersonality, setSelectedPersonality] = useState(null)
  const [selectedIntroCard, setSelectedIntroCard] = useState(null)
  const [selectedInfluenceCards, setSelectedInfluenceCards] = useState([])

  // Track engagement time
  useEffect(() => {
    const interval = setInterval(() => {
      setEngagementTime(prev => prev + 1)
      // Award points every 10 seconds
      if (engagementTime % 10 === 0 && engagementTime > 0) {
        setPoints(prev => prev + 5)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [engagementTime])

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1)
      setPoints(prev => prev + 10)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const addNote = (note) => {
    setNotes(prev => [...prev, note])
    setPoints(prev => prev + 5)
  }

  const removeNote = (noteText) => {
    setNotes(prev => prev.filter(note => note !== noteText))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2 className="step-title">What type of money person are you?</h2>
            <div className="personality-intro-cards">
              <div 
                className={`intro-card intro-card-saver ${selectedIntroCard === 'saver' ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedIntroCard('saver')
                  setPoints(prev => prev + 10)
                }}
              >
                <div className="intro-icon">🐷</div>
                <h3>Save Your Money</h3>
                <p className="intro-prompt">Do you:</p>
                <ul>
                  <li>Think before you buy?</li>
                  <li>Have savings goals?</li>
                  <li>Feel good seeing money grow?</li>
                </ul>
                {selectedIntroCard === 'saver' && (
                  <div className="card-selected-message">
                    ✓ That's you!
                  </div>
                )}
              </div>
              <div 
                className={`intro-card intro-card-spender ${selectedIntroCard === 'spender' ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedIntroCard('spender')
                  setPoints(prev => prev + 10)
                }}
              >
                <div className="intro-icon">🛒</div>
                <h3>Spend Your Money</h3>
                <p className="intro-prompt">Do you:</p>
                <ul>
                  <li>Buy things that make you happy?</li>
                  <li>Enjoy shopping experiences?</li>
                  <li>Live in the moment?</li>
                </ul>
                {selectedIntroCard === 'spender' && (
                  <div className="card-selected-message">
                    ✓ That's you!
                  </div>
                )}
              </div>
            </div>
            {selectedIntroCard && (
              <div className="intro-insight-message">
                <div className="insight-icon">💡</div>
                <div className="insight-text">
                  Great choice! But here's the thing... <strong>most people are actually BOTH!</strong>
                </div>
              </div>
            )}
          </div>
        )
      case 2:
        return <MoneySpectrum onInsight={addNote} />
      case 3:
        return <BuildingBlocks onProgress={setPoints} />
      case 4:
        return (
          <div className="step-content">
            <h2 className="step-title">What Shapes Your Money Personality?</h2>
            <div className="influence-cards">
              {[
                { icon: '👨‍👩‍👧', label: 'Family', desc: 'How your family talks about money' },
                { icon: '🎯', label: 'Goals', desc: 'What you want to achieve' },
                { icon: '😊', label: 'Emotions', desc: 'How money makes you feel' },
                { icon: '✨', label: 'Experiences', desc: 'Your past with money' }
              ].map((item, idx) => {
                const isSelected = selectedInfluenceCards.includes(idx)
                return (
                  <div 
                    key={idx} 
                    className={`influence-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      const noteText = `Selected: ${item.label}`
                      if (isSelected) {
                        setSelectedInfluenceCards(prev => prev.filter(i => i !== idx))
                        removeNote(noteText)
                      } else {
                        setSelectedInfluenceCards(prev => [...prev, idx])
                        addNote(noteText)
                        setPoints(prev => prev + 5)
                      }
                    }}
                  >
                    <div className="influence-icon">{item.icon}</div>
                    <h4>{item.label}</h4>
                    <p>{item.desc}</p>
                    {isSelected && (
                      <div className="influence-checkmark">✓</div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="reflection-input">
              <label>What influences YOUR money decisions most? (Optional)</label>
              <textarea placeholder="Type your thoughts..." />
            </div>
          </div>
        )
      case 5:
        return <PersonalityCards onSelect={setSelectedPersonality} />
      case 6:
        return <ScenarioReveal selectedPersonality={selectedPersonality} />
      default:
        return null
    }
  }

  const getCurrentStepLabel = () => {
    if (currentStep <= 2) return MODULE_STEPS[0]
    if (currentStep <= 4) return MODULE_STEPS[1]
    return MODULE_STEPS[2]
  }

  return (
    <div className="interactive-module">
      <div className="module-header">
        <h1 className="module-title">$ Money Personality Discovery</h1>
        <div className="module-metrics">
          <span className="points">Points: {points}</span>
          <span className="engagement">{engagementTime}s engaged</span>
       
        </div>
      </div>

      <ProgressBar 
        current={currentStep} 
        total={6} 
        steps={MODULE_STEPS}
        currentStepLabel={getCurrentStepLabel()}
      />

      <div className="module-content">
        <div className="interactive-tag">Interactive</div>
        {renderStepContent()}
      </div>

      <div className="module-navigation">
        <button 
          className="nav-btn" 
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          &lt; Previous
        </button>
        <div className="progress-dots">
          {currentStep <= 2 ? (
            <>
              <div className={`dot ${currentStep >= 1 ? 'active' : ''}`}></div>
              <div className={`dot ${currentStep >= 2 ? 'active' : ''}`}></div>
            </>
          ) : (
            Array.from({ length: 6 }).map((_, idx) => (
              <div 
                key={idx} 
                className={`dot ${idx + 1 <= currentStep ? 'active' : ''}`}
              />
            ))
          )}
        </div>
        <button 
          className="nav-btn" 
          onClick={handleNext}
          disabled={currentStep === 6}
        >
          Next &gt;
        </button>
      </div>

      <LearningNotes notes={notes} />
    </div>
  )
}

export default InteractiveModule


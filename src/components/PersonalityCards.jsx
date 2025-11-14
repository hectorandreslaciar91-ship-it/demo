import { useState } from 'react'
import './PersonalityCards.css'

function PersonalityCards({ onSelect }) {
  const [selectedCard, setSelectedCard] = useState(null)
  const [quickCheck, setQuickCheck] = useState(null)

  const personalityTypes = [
    {
      title: 'Money Driven',
      icon: 'DRIVEN',
      traits: ['Careful planner', 'Saves first', 'Goal-oriented', 'Feels secure with savings'],
      percentage: 28,
      color: '#0f172a',
      gradient: '#ffffff'
    },
    {
      title: 'Money Careful',
      icon: 'CAREFUL',
      traits: ['Balanced approach', 'Saves and spends', 'Flexible with money', 'Conscious decisions'],
      percentage: 45,
      color: '#0f172a',
      gradient: '#ffffff'
    },
    {
      title: 'Money Care-Free',
      icon: 'CARE-FREE',
      traits: ['Lives in moment', 'Enjoys spending', 'Values experiences', 'Optimistic about money'],
      percentage: 27,
      color: '#0f172a',
      gradient: '#ffffff'
    }
  ]

  const handleCardClick = (index) => {
    setSelectedCard(index)
    onSelect(personalityTypes[index])
  }

  const handleQuickCheck = (value) => {
    setQuickCheck(value)
    if (value === 'yes') {
      // Award points for confirmation
    }
  }

  return (
    <div className="personality-cards-container">
      <h2 className="personality-cards-title">Discover the Three Types</h2>
      
      <div className="personality-cards-grid">
        {personalityTypes.map((personality, idx) => (
          <div
            key={idx}
            className={`personality-card ${selectedCard === idx ? 'selected' : ''}`}
            style={{ background: personality.gradient }}
            onClick={() => handleCardClick(idx)}
          >
            <div className="personality-icon">{personality.icon}</div>
            <h3 className="personality-title">{personality.title}</h3>
            <ul className="personality-traits">
              {personality.traits.map((trait, traitIdx) => (
                <li key={traitIdx}>{trait}</li>
              ))}
            </ul>
            <div className="personality-percentage">
              {personality.percentage}% of students
            </div>
            {selectedCard === idx && (
              <div className="personality-question">
                Could this be you?
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedCard !== null && (
        <div className="quick-check-section">
          <h3>You clicked on {personalityTypes[selectedCard].title}! Quick check:</h3>
          <div className="quick-check-buttons">
            <button
              className={`quick-check-btn ${quickCheck === 'yes' ? 'selected' : ''}`}
              onClick={() => handleQuickCheck('yes')}
            >
              This sounds like me!
            </button>
            <button
              className={`quick-check-btn ${quickCheck === 'no' ? 'selected' : ''}`}
              onClick={() => handleQuickCheck('no')}
            >
              Not quite me
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalityCards


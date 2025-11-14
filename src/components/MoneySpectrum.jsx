import { useState } from 'react'
import { FaPiggyBank, FaBalanceScale, FaRocket } from 'react-icons/fa'
import './MoneySpectrum.css'

const PERSONALITY_CARDS = [
  { Icon: FaPiggyBank, iconLabel: 'SAVE', label: 'Save for goals' },
  { Icon: FaBalanceScale, iconLabel: 'BALANCE', label: 'Save & Enjoy' },
  { Icon: FaRocket, iconLabel: 'SPEND', label: 'YOLO' }
]

function MoneySpectrum({ onInsight, onRemoveInsight }) {
  const [sliderValue, setSliderValue] = useState(70)
  const [insightShown, setInsightShown] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value)
    setSliderValue(value)
    if (!insightShown) {
      setInsightShown(true)
      onInsight('Explored money spectrum')
    }
  }

  const getPersonalityType = () => {
    if (sliderValue < 33) return 'Super Saver'
    if (sliderValue < 67) return 'Balanced'
    return 'Free Spender'
  }

  const getPeerPercentage = () => {
    // Simulated peer comparison
    if (sliderValue < 33) return Math.floor(Math.random() * 30) + 10
    if (sliderValue < 67) return Math.floor(Math.random() * 20) + 40
    return Math.floor(Math.random() * 20) + 30
  }

  return (
    <div className="spectrum-container">
      <h2 className="spectrum-title">It's Not Black and White</h2>
      <p className="spectrum-question">Where do you fall on the spectrum?</p>
      
      <div className="spectrum-slider-container">
        <div className="spectrum-bar">
          <div 
            className="spectrum-fill"
            style={{ 
              background: `linear-gradient(to right, 
                #4a9b7a 0%, 
                #7dd3a0 25%, 
                #ffd93d 50%, 
                #ff6b6b 75%, 
                #d4a5f9 100%)`,
              width: '100%',
              height: '100%',
              borderRadius: '8px'
            }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="spectrum-slider"
          />
        </div>
        
        <div className="spectrum-labels-below">
          <div className={`spectrum-label-item ${sliderValue < 25 ? 'highlighted' : ''}`}>
            <span className="label-icon">SAVER</span>
            <span className="label-text">Super Saver</span>
          </div>
          <div className={`spectrum-label-item ${sliderValue >= 25 && sliderValue < 50 ? 'highlighted' : ''}`}>
            <span className="label-icon">BALANCE</span>
            <span className="label-text">Balanced</span>
          </div>
          
          <div className={`spectrum-label-item ${sliderValue >= 75 ? 'highlighted' : ''}`}>
            <span className="label-icon">SPENDER</span>
            <span className="label-text">Free Spender</span>
          </div>
        </div>
      </div>

      {insightShown && (
        <div className="live-insight">
          <div className="insight-text">
            <strong>Live Insight:</strong> You're more of a spender than {getPeerPercentage()}% of your peers!
          </div>
        </div>
      )}

      <div className="personality-cards-preview">
        {PERSONALITY_CARDS.map((card, idx) => {
          const noteText = `Selected: ${card.label}`
          const isSelected = selectedCard === idx
          const IconComponent = card.Icon
          
          return (
            <div 
              key={idx} 
              className={`personality-preview-card ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                if (isSelected) {
                  // Card is already selected, deselect it and remove note
                  setSelectedCard(null)
                  if (onRemoveInsight) {
                    onRemoveInsight(noteText)
                  }
                } else {
                  // Card is not selected
                  // If another card was selected, remove its note first
                  if (selectedCard !== null) {
                    const previousCard = PERSONALITY_CARDS[selectedCard]
                    if (onRemoveInsight) {
                      onRemoveInsight(`Selected: ${previousCard.label}`)
                    }
                  }
                  // Select the new card and add note
                  setSelectedCard(idx)
                  if (onInsight) {
                    onInsight(noteText)
                  }
                }
              }}
            >
              <div className="preview-icon-wrapper">
                <div className="preview-icon-container">
                  <IconComponent className="preview-icon" />
                </div>
                <span className="preview-icon-label">{card.iconLabel}</span>
              </div>
              <div className="preview-label">{card.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MoneySpectrum


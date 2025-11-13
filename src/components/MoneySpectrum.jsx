import { useState } from 'react'
import './MoneySpectrum.css'

function MoneySpectrum({ onInsight }) {
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
            <span className="label-icon">🐷</span>
            <span className="label-text">Super Saver</span>
          </div>
          <div className={`spectrum-label-item ${sliderValue >= 25 && sliderValue < 50 ? 'highlighted' : ''}`}>
            <span className="label-icon">⚖️</span>
            <span className="label-text">Balanced</span>
          </div>
          
          <div className={`spectrum-label-item ${sliderValue >= 75 ? 'highlighted' : ''}`}>
            <span className="label-icon">🛍️</span>
            <span className="label-text">Free Spender</span>
          </div>
        </div>
      </div>

      {insightShown && (
        <div className="live-insight">
          <div className="insight-icon">👥</div>
          <div className="insight-text">
            <strong>Live Insight:</strong> You're more of a spender than {getPeerPercentage()}% of your peers!
          </div>
        </div>
      )}

      <div className="personality-cards-preview">
        {[
          { icon: '💰', label: 'Save for goals' },
          { icon: '⚖️', label: 'Save & Enjoy' },
          { icon: '🎉', label: 'YOLO' }
        ].map((card, idx) => (
          <div 
            key={idx} 
            className={`personality-preview-card ${selectedCard === idx ? 'selected' : ''}`}
            onClick={() => {
              setSelectedCard(idx)
              // Add note when card is selected
              if (onInsight && selectedCard !== idx) {
                onInsight(`Selected: ${card.label}`)
              }
            }}
          >
            <div className="preview-icon">{card.icon}</div>
            <div className="preview-label">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MoneySpectrum


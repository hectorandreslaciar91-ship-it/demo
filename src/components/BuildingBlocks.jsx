import { useState } from 'react'
import './BuildingBlocks.css'

function BuildingBlocks({ onProgress }) {
  const [blocks, setBlocks] = useState([])
  const totalBlocks = 6

  const blockTypes = [
    { icon: '💰', label: 'Savings Goal', color: '#a8e6cf' },
    { icon: '🎯', label: 'Budget Plan', color: '#f0f4ff' },
    { icon: '📊', label: 'Track Spending', color: '#d4a5f9' },
    { icon: '💳', label: 'Smart Choices', color: '#ffd3a5' },
    { icon: '🏆', label: 'Long-term Vision', color: '#a8d8ea' },
    { icon: '✨', label: 'Financial Freedom', color: '#fbc2eb' }
  ]

  const handleAddBlock = () => {
    if (blocks.length < totalBlocks) {
      const newBlock = blockTypes[blocks.length]
      setBlocks(prev => [...prev, newBlock])
      if (onProgress) {
        onProgress(prev => prev + 15)
      }
    }
  }

  return (
    <div className="building-container">
      <div className="building-header">
        <h2 className="building-title">Building Time! 🏗️</h2>
        <p className="building-subtitle">Your Money Personality is Like Building Blocks</p>
      </div>

      <div className="building-area">
        <div className="building-prompt" onClick={handleAddBlock}>
          {blocks.length === 0 ? (
            <>
              <div className="hand-icon">👉</div>
              <p>Click above to start building!</p>
            </>
          ) : (
            <div className="blocks-grid">
              {blocks.map((block, idx) => (
                <div 
                  key={idx} 
                  className="building-block"
                  style={{ borderColor: block.color, backgroundColor: `${block.color}20` }}
                >
                  <div className="block-icon">{block.icon}</div>
                  <div className="block-label">{block.label}</div>
                </div>
              ))}
              {blocks.length < totalBlocks && (
                <div className="add-block-placeholder" onClick={handleAddBlock}>
                  <span>+</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="building-progress">
        Building Progress: {blocks.length}/{totalBlocks} blocks
      </div>

      <div className="think-about-box">
        <div className="think-icon">💭</div>
        <p>
          <strong>Think about it:</strong> Just like building blocks, your money personality 
          is made up of different pieces that fit together uniquely for YOU!
        </p>
      </div>
    </div>
  )
}

export default BuildingBlocks


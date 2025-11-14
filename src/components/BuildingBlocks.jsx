import { useState } from 'react'
import './BuildingBlocks.css'

const BLOCK_TYPES = [
  { icon: 'SAVINGS', label: 'Savings Goal', color: '#0f172a' },
  { icon: 'BUDGET', label: 'Budget Plan', color: '#0f172a' },
  { icon: 'TRACKING', label: 'Track Spending', color: '#0f172a' },
  { icon: 'CHOICES', label: 'Smart Choices', color: '#0f172a' },
  { icon: 'VISION', label: 'Long-term Vision', color: '#0f172a' },
  { icon: 'FREEDOM', label: 'Financial Freedom', color: '#0f172a' }
]

function BuildingBlocks({ onProgress }) {
  const [blocks, setBlocks] = useState([])
  const [showCardList, setShowCardList] = useState(false)
  const totalBlocks = 6

  // Get available blocks that haven't been selected yet
  const getAvailableBlocks = () => {
    const selectedLabels = blocks.map(block => block.label)
    return BLOCK_TYPES.filter(block => !selectedLabels.includes(block.label))
  }

  const handleAddBlockClick = () => {
    if (blocks.length < totalBlocks) {
      setShowCardList(true)
    }
  }

  const handleSelectBlock = (selectedBlock) => {
    setBlocks(prev => [...prev, selectedBlock])
    setShowCardList(false)
    if (onProgress) {
      onProgress(prev => prev + 15)
    }
  }

  const handleCloseCardList = () => {
    setShowCardList(false)
  }

  return (
    <div className="building-container">
      <div className="building-header">
        <h2 className="building-title">Building Time</h2>
        <p className="building-subtitle">Your Money Personality is Like Building Blocks</p>
      </div>

      <div className="building-area">
        {showCardList ? (
          <div className="card-selection-modal">
            <div className="card-selection-header">
              <h3>Select a Building Block</h3>
              <button className="close-button" onClick={handleCloseCardList}>×</button>
            </div>
            <div className="card-selection-grid">
              {getAvailableBlocks().map((block, idx) => (
                <div
                  key={idx}
                  className="card-selection-item"
                  onClick={() => handleSelectBlock(block)}
                  style={{ borderColor: block.color }}
                >
                  <div className="block-icon">{block.icon}</div>
                  <div className="block-label">{block.label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="building-prompt">
            {blocks.length === 0 ? (
              <div onClick={handleAddBlockClick} style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <p>Click above to start building</p>
              </div>
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
                  <div className="add-block-placeholder" onClick={handleAddBlockClick}>
                    <span>+</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="building-progress">
        Building Progress: {blocks.length}/{totalBlocks} blocks
      </div>

      <div className="think-about-box">
        <p>
          <strong>Think about it:</strong> Just like building blocks, your money personality 
          is made up of different pieces that fit together uniquely for YOU!
        </p>
      </div>
    </div>
  )
}

export default BuildingBlocks


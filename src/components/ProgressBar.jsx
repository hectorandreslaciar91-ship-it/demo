import './ProgressBar.css'

function ProgressBar({ current, total, steps, currentStepLabel }) {
  const progress = (current / total) * 100

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-label">Progress {current}/{total}</span>
      </div>
      <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-steps">
        {steps.map((step, idx) => {
          const stepNumber = idx === 0 ? 1 : idx === 1 ? 3 : 6
          const isCompleted = current >= stepNumber
          const isCurrent = currentStepLabel === step
          
          return (
            <div 
              key={idx} 
              className={`progress-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
            >
              {isCompleted && <span className="checkmark">✓</span>}
              <span className="step-text">{step}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressBar


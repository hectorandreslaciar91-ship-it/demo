import './LearningNotes.css'

function LearningNotes({ notes }) {
  if (notes.length === 0) return null

  return (
    <div className="learning-notes-container">
      <h3 className="learning-notes-title">
        Your Learning Notes ({notes.length})
      </h3>
      <ul className="learning-notes-list">
        {notes.map((note, idx) => (
          <li key={idx} className="learning-note-item">
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LearningNotes


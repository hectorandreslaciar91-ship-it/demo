# Learning Dashboard - Moodle Integration Frontend

A modern, interactive React frontend for a learning platform that integrates with Moodle LMS. Features gamification, progress tracking, and engaging interactive modules.

## Features

- **Interactive Learning Modules**: Card-based, step-by-step learning experiences
- **Gamification**: Points system, engagement time tracking, progress indicators
- **Personality Assessment**: Interactive money personality discovery with sliders and cards
- **Building Blocks Interface**: Drag-and-drop style content creation
- **Scenario-Based Learning**: Reveal buttons and interactive scenarios
- **Learning Notes**: Automatic capture of user insights
- **Modern UI**: Purple/blue gradient theme with smooth animations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── InteractiveModule.jsx    # Main module container
│   ├── ProgressBar.jsx          # Progress tracking component
│   ├── PersonalityCards.jsx    # Personality type cards
│   ├── MoneySpectrum.jsx        # Interactive slider component
│   ├── BuildingBlocks.jsx       # Building blocks interface
│   ├── ScenarioReveal.jsx      # Scenario reveal component
│   └── LearningNotes.jsx       # Learning notes display
├── App.jsx                      # Main app component
└── main.jsx                     # Entry point
```

## Features Implemented

✅ Interactive module navigation (6 steps)
✅ Progress tracking with visual indicators
✅ Points system (awards points for interactions)
✅ Engagement time tracking
✅ Personality cards with selection
✅ Money spectrum slider with live insights
✅ Building blocks interface
✅ Scenario reveal buttons
✅ Learning notes capture
✅ Responsive design
✅ Modern gradient theme matching reference images

## Next Steps

- Connect to Moodle REST API
- Implement SSO/JWT authentication
- Add PostgreSQL event tracking
- Real-time data sync
- Assessment module integration
- Leaderboard and badges
- Achievement feed


# Pac-Man Game

A complete implementation of the classic Pac-Man arcade game using modern web technologies.

## 🎮 Features

### Game Mechanics
- **Pac-Man Character**: Smooth 4-directional movement with animated mouth
- **4 Unique Ghosts**: 
  - **Blinky (Red)**: Aggressive direct chase behavior
  - **Pinky (Pink)**: Ambush strategy, targets 4 spaces ahead
  - **Inky (Cyan)**: Unpredictable movement patterns  
  - **Clyde (Orange)**: Alternates between chase and scatter modes
- **Classic Maze**: Authentic Pac-Man layout with tunnels
- **Pellet System**: 244 regular pellets (10 points) + 4 power pellets (50 points)
- **Power Mode**: Vulnerable ghosts for limited time when power pellet eaten
- **Lives System**: Start with 3 lives, lose life when caught by ghost
- **Scoring**: Points for pellets, power pellets, and eating vulnerable ghosts

### Visual Design
- **Retro Arcade Aesthetic**: Classic Pac-Man colors and styling
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: 60 FPS gameplay with animated characters
- **Modern UI**: Score display, lives counter, game state messages

### Controls
- **Arrow Keys**: Move Pac-Man (up, down, left, right)
- **Spacebar**: Start/restart game
- **Responsive Input**: Smooth, lag-free movement

## 🚀 Getting Started

1. Clone this repository
2. Open `index.html` in a modern web browser
3. Click "START GAME" or press Spacebar to begin
4. Use arrow keys to control Pac-Man
5. Collect all pellets while avoiding ghosts!

## 📁 File Structure

- `index.html` - Main game interface with canvas and UI elements
- `styles.css` - Retro arcade styling and responsive design
- `mazeData.js` - Maze layout, game configuration, and utility functions
- `pacman.js` - Core game engine with character classes and game logic

## 🎯 Game Objectives

1. **Collect All Pellets**: Navigate the maze to eat all 244 pellets
2. **Avoid Ghosts**: Stay away from ghosts when they're not vulnerable
3. **Use Power Pellets**: Eat power pellets to make ghosts vulnerable
4. **Maximize Score**: Earn points by eating pellets and vulnerable ghosts
5. **Complete Levels**: Clear all pellets to advance

## 🔧 Technical Details

- **Performance**: Optimized 60 FPS game loop using `requestAnimationFrame`
- **Collision Detection**: Precise pixel-perfect collision system
- **AI Behaviors**: Each ghost has unique pathfinding and targeting logic
- **Cross-Browser**: Works in all modern browsers
- **No Dependencies**: Pure vanilla JavaScript implementation

## 🎵 Audio

The game includes placeholder hooks for sound effects:
- Pellet collection sounds
- Power pellet activation
- Ghost eating sounds  
- Death and game over sounds
- Level completion sounds

Audio can be easily added by implementing the sound methods in the game engine.

## 🏆 High Score

Try to achieve the highest score possible by:
- Collecting all pellets efficiently
- Eating ghosts during power mode (200 points each)
- Completing levels quickly
- Surviving with remaining lives

Enjoy playing this classic arcade game!

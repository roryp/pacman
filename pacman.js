// Pac-Man Game Engine
class PacManGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameMessage = document.getElementById('gameMessage');
        this.startButton = document.getElementById('startButton');
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        this.messageTitle = document.getElementById('messageTitle');
        this.messageText = document.getElementById('messageText');
        
        // Game state
        this.gameState = 'start'; // start, playing, paused, gameOver, win
        this.score = 0;
        this.lives = GAME_CONFIG.INITIAL_LIVES;
        this.level = 1;
        this.pelletsRemaining = GAME_CONFIG.PELLET_COUNT;
        this.powerPelletsRemaining = GAME_CONFIG.POWER_PELLET_COUNT;
        
        // Game objects
        this.pacman = null;
        this.ghosts = {};
        
        // Input handling
        this.keys = {};
        this.lastKeyPressed = null;
        
        // Game timing
        this.lastTime = 0;
        this.gameLoop = this.gameLoop.bind(this);
        
        // Audio placeholders (for future implementation)
        this.sounds = {
            pellet: () => console.log('🔊 Pellet eaten'),
            powerPellet: () => console.log('🔊 Power pellet eaten'),
            eatGhost: () => console.log('🔊 Ghost eaten'),
            death: () => console.log('🔊 Pac-Man died'),
            gameOver: () => console.log('🔊 Game over'),
            win: () => console.log('🔊 Level complete')
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createGameObjects();
        this.updateUI();
        this.showMessage('READY!', 'Use arrow keys to move Pac-Man<br>Press SPACE or START to begin');
    }
    
    setupEventListeners() {
        // Keyboard input
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            this.lastKeyPressed = e.key;
            
            if (e.key === ' ') {
                e.preventDefault();
                if (this.gameState === 'start' || this.gameState === 'gameOver') {
                    this.startGame();
                } else if (this.gameState === 'playing') {
                    this.pauseGame();
                } else if (this.gameState === 'paused') {
                    this.resumeGame();
                }
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        
        // Start button
        this.startButton.addEventListener('click', () => {
            if (this.gameState === 'start' || this.gameState === 'gameOver') {
                this.startGame();
            }
        });
        
        // Prevent arrow key scrolling
        document.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    createGameObjects() {
        // Create Pac-Man
        const pacmanStart = MazeUtils.gridToPixel(GAME_CONFIG.PACMAN_START.x, GAME_CONFIG.PACMAN_START.y);
        this.pacman = new PacMan(pacmanStart.x, pacmanStart.y, this);
        
        // Create Ghosts
        this.ghosts = {
            blinky: new Ghost('blinky', GAME_CONFIG.GHOST_STARTS.blinky, GAME_CONFIG.COLORS.BLINKY, this),
            pinky: new Ghost('pinky', GAME_CONFIG.GHOST_STARTS.pinky, GAME_CONFIG.COLORS.PINKY, this),
            inky: new Ghost('inky', GAME_CONFIG.GHOST_STARTS.inky, GAME_CONFIG.COLORS.INKY, this),
            clyde: new Ghost('clyde', GAME_CONFIG.GHOST_STARTS.clyde, GAME_CONFIG.COLORS.CLYDE, this)
        };
    }
    
    startGame() {
        this.gameState = 'playing';
        this.hideMessage();
        this.resetLevel();
        requestAnimationFrame(this.gameLoop);
    }
    
    pauseGame() {
        this.gameState = 'paused';
        this.showMessage('PAUSED', 'Press SPACE to continue');
    }
    
    resumeGame() {
        this.gameState = 'playing';
        this.hideMessage();
        requestAnimationFrame(this.gameLoop);
    }
    
    resetLevel() {
        // Restore original maze data
        const originalData = this.getOriginalMazeData();
        for (let y = 0; y < GAME_CONFIG.MAZE_ROWS; y++) {
            for (let x = 0; x < GAME_CONFIG.MAZE_COLS; x++) {
                MAZE_DATA[y][x] = originalData[y][x];
            }
        }
        
        // Count pellets
        this.pelletsRemaining = 0;
        this.powerPelletsRemaining = 0;
        
        for (let y = 0; y < GAME_CONFIG.MAZE_ROWS; y++) {
            for (let x = 0; x < GAME_CONFIG.MAZE_COLS; x++) {
                if (MAZE_DATA[y][x] === 2) {
                    this.pelletsRemaining++;
                } else if (MAZE_DATA[y][x] === 3) {
                    this.powerPelletsRemaining++;
                }
            }
        }
        
        // Reset game objects
        this.createGameObjects();
    }
    
    getOriginalMazeData() {
        // Return a copy of the original maze data
        return [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,1,1,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,4,4,4,4,4,4,1,1,0,1,1,1,1,2,1,1,1,1,1,1],
            [0,0,0,0,0,0,2,0,0,0,1,4,4,4,4,4,4,4,4,1,0,0,0,2,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,2,1,1,0,1,4,4,4,4,4,4,4,4,1,0,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,3,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,3,1],
            [1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,1,1,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
    }
    
    gameLoop(currentTime) {
        if (this.gameState !== 'playing') return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Update game objects
        this.update(deltaTime);
        
        // Render everything
        this.render();
        
        // Continue game loop
        requestAnimationFrame(this.gameLoop);
    }
    
    update(deltaTime) {
        // Update Pac-Man
        this.pacman.update();
        
        // Update ghosts
        Object.values(this.ghosts).forEach(ghost => ghost.update());
        
        // Check collisions
        this.checkCollisions();
        
        // Check win/lose conditions
        this.checkGameConditions();
    }
    
    checkCollisions() {
        const pacmanGrid = MazeUtils.pixelToGrid(this.pacman.x, this.pacman.y);
        
        // Check pellet collection
        if (MazeUtils.hasPellet(pacmanGrid.x, pacmanGrid.y)) {
            this.collectPellet(pacmanGrid.x, pacmanGrid.y);
        }
        
        // Check power pellet collection
        if (MazeUtils.hasPowerPellet(pacmanGrid.x, pacmanGrid.y)) {
            this.collectPowerPellet(pacmanGrid.x, pacmanGrid.y);
        }
        
        // Check ghost collisions
        Object.values(this.ghosts).forEach(ghost => {
            const distance = MazeUtils.distance(this.pacman.x, this.pacman.y, ghost.x, ghost.y);
            if (distance < GAME_CONFIG.CELL_SIZE * 0.8) {
                if (ghost.vulnerable) {
                    this.eatGhost(ghost);
                } else if (!ghost.eaten) {
                    this.pacmanDeath();
                }
            }
        });
    }
    
    collectPellet(x, y) {
        if (MazeUtils.removePellet(x, y)) {
            this.score += GAME_CONFIG.PELLET_POINTS;
            this.pelletsRemaining--;
            this.updateUI();
            this.sounds.pellet();
        }
    }
    
    collectPowerPellet(x, y) {
        if (MazeUtils.removePellet(x, y)) {
            this.score += GAME_CONFIG.POWER_PELLET_POINTS;
            this.powerPelletsRemaining--;
            this.makeGhostsVulnerable();
            this.updateUI();
            this.sounds.powerPellet();
        }
    }
    
    makeGhostsVulnerable() {
        Object.values(this.ghosts).forEach(ghost => {
            if (!ghost.eaten) {
                ghost.makeVulnerable();
            }
        });
    }
    
    eatGhost(ghost) {
        this.score += GAME_CONFIG.GHOST_POINTS;
        ghost.getEaten();
        this.updateUI();
        this.sounds.eatGhost();
    }
    
    pacmanDeath() {
        this.lives--;
        this.updateUI();
        this.sounds.death();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.resetPositions();
        }
    }
    
    resetPositions() {
        // Reset Pac-Man position
        const pacmanStart = MazeUtils.gridToPixel(GAME_CONFIG.PACMAN_START.x, GAME_CONFIG.PACMAN_START.y);
        this.pacman.x = pacmanStart.x;
        this.pacman.y = pacmanStart.y;
        this.pacman.direction = 'right';
        this.pacman.nextDirection = null;
        
        // Reset ghost positions
        Object.entries(this.ghosts).forEach(([name, ghost]) => {
            const start = MazeUtils.gridToPixel(GAME_CONFIG.GHOST_STARTS[name].x, GAME_CONFIG.GHOST_STARTS[name].y);
            ghost.x = start.x;
            ghost.y = start.y;
            ghost.direction = 'up';
            ghost.vulnerable = false;
            ghost.eaten = false;
        });
    }
    
    checkGameConditions() {
        // Check win condition
        if (this.pelletsRemaining <= 0 && this.powerPelletsRemaining <= 0) {
            this.levelComplete();
        }
    }
    
    levelComplete() {
        this.gameState = 'win';
        this.sounds.win();
        this.showMessage('LEVEL COMPLETE!', `Score: ${this.score}<br>Press SPACE to continue`);
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.sounds.gameOver();
        this.showMessage('GAME OVER', `Final Score: ${this.score}<br>Press SPACE to play again`);
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render maze
        this.renderMaze();
        
        // Render game objects
        this.pacman.render(this.ctx);
        Object.values(this.ghosts).forEach(ghost => ghost.render(this.ctx));
    }
    
    renderMaze() {
        for (let y = 0; y < GAME_CONFIG.MAZE_ROWS; y++) {
            for (let x = 0; x < GAME_CONFIG.MAZE_COLS; x++) {
                const pixelPos = MazeUtils.gridToPixel(x, y);
                
                switch (MAZE_DATA[y][x]) {
                    case 1: // Wall
                        this.ctx.fillStyle = GAME_CONFIG.COLORS.WALL;
                        this.ctx.fillRect(
                            x * GAME_CONFIG.CELL_SIZE,
                            y * GAME_CONFIG.CELL_SIZE,
                            GAME_CONFIG.CELL_SIZE,
                            GAME_CONFIG.CELL_SIZE
                        );
                        break;
                        
                    case 2: // Pellet
                        this.ctx.fillStyle = GAME_CONFIG.COLORS.PELLET;
                        this.ctx.beginPath();
                        this.ctx.arc(pixelPos.x, pixelPos.y, 2, 0, Math.PI * 2);
                        this.ctx.fill();
                        break;
                        
                    case 3: // Power pellet
                        this.ctx.fillStyle = GAME_CONFIG.COLORS.POWER_PELLET;
                        this.ctx.beginPath();
                        this.ctx.arc(pixelPos.x, pixelPos.y, 6, 0, Math.PI * 2);
                        this.ctx.fill();
                        break;
                }
            }
        }
    }
    
    updateUI() {
        this.scoreElement.textContent = this.score;
        
        // Update lives display
        this.livesElement.innerHTML = '';
        for (let i = 0; i < this.lives; i++) {
            const life = document.createElement('span');
            life.className = 'life';
            life.textContent = '●';
            this.livesElement.appendChild(life);
        }
    }
    
    showMessage(title, text) {
        this.messageTitle.textContent = title;
        this.messageText.innerHTML = text;
        this.gameMessage.classList.remove('hidden');
    }
    
    hideMessage() {
        this.gameMessage.classList.add('hidden');
    }
}

// Pac-Man Character Class
class PacMan {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.direction = 'right';
        this.nextDirection = null;
        this.speed = GAME_CONFIG.PACMAN_SPEED;
        this.radius = GAME_CONFIG.CELL_SIZE * 0.4;
        this.mouthAngle = 0;
        this.mouthDirection = 1;
    }
    
    update() {
        // Handle input
        this.handleInput();
        
        // Move Pac-Man
        this.move();
        
        // Update mouth animation
        this.updateMouthAnimation();
    }
    
    handleInput() {
        const keys = this.game.keys;
        
        if (keys['ArrowUp']) this.nextDirection = 'up';
        else if (keys['ArrowDown']) this.nextDirection = 'down';
        else if (keys['ArrowLeft']) this.nextDirection = 'left';
        else if (keys['ArrowRight']) this.nextDirection = 'right';
    }
    
    move() {
        // Try to change direction if requested
        if (this.nextDirection && this.canMove(this.nextDirection)) {
            this.direction = this.nextDirection;
            this.nextDirection = null;
        }
        
        // Move in current direction
        if (this.canMove(this.direction)) {
            switch (this.direction) {
                case 'up':
                    this.y -= this.speed;
                    break;
                case 'down':
                    this.y += this.speed;
                    break;
                case 'left':
                    this.x -= this.speed;
                    break;
                case 'right':
                    this.x += this.speed;
                    break;
            }
        }
        
        // Handle tunnel wrapping
        const wrapped = MazeUtils.wrapPosition(
            Math.floor(this.x / GAME_CONFIG.CELL_SIZE),
            Math.floor(this.y / GAME_CONFIG.CELL_SIZE)
        );
        
        if (wrapped.x !== Math.floor(this.x / GAME_CONFIG.CELL_SIZE)) {
            this.x = wrapped.x * GAME_CONFIG.CELL_SIZE + GAME_CONFIG.CELL_SIZE / 2;
        }
    }
    
    canMove(direction) {
        let nextX = this.x;
        let nextY = this.y;
        
        switch (direction) {
            case 'up':
                nextY -= this.speed + this.radius;
                break;
            case 'down':
                nextY += this.speed + this.radius;
                break;
            case 'left':
                nextX -= this.speed + this.radius;
                break;
            case 'right':
                nextX += this.speed + this.radius;
                break;
        }
        
        const gridPos = MazeUtils.pixelToGrid(nextX, nextY);
        return !MazeUtils.isWall(gridPos.x, gridPos.y);
    }
    
    updateMouthAnimation() {
        this.mouthAngle += this.mouthDirection * 0.2;
        if (this.mouthAngle >= 0.7 || this.mouthAngle <= 0) {
            this.mouthDirection *= -1;
        }
    }
    
    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Rotate based on direction
        switch (this.direction) {
            case 'up':
                ctx.rotate(-Math.PI / 2);
                break;
            case 'down':
                ctx.rotate(Math.PI / 2);
                break;
            case 'left':
                ctx.rotate(Math.PI);
                break;
            // right is default (0 rotation)
        }
        
        // Draw Pac-Man body
        ctx.fillStyle = GAME_CONFIG.COLORS.PACMAN;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, this.mouthAngle, Math.PI * 2 - this.mouthAngle);
        ctx.lineTo(0, 0);
        ctx.fill();
        
        ctx.restore();
    }
}

// Ghost Class
class Ghost {
    constructor(name, gridStart, color, game) {
        this.name = name;
        this.game = game;
        this.color = color;
        const start = MazeUtils.gridToPixel(gridStart.x, gridStart.y);
        this.x = start.x;
        this.y = start.y;
        this.direction = 'up';
        this.speed = GAME_CONFIG.GHOST_SPEED;
        this.radius = GAME_CONFIG.CELL_SIZE * 0.4;
        
        // Ghost states
        this.vulnerable = false;
        this.vulnerableTimer = 0;
        this.eaten = false;
        this.mode = 'scatter'; // scatter, chase, frightened
        this.modeTimer = 0;
        
        // AI properties
        this.target = { x: 0, y: 0 };
        this.lastDirection = null;
    }
    
    update() {
        this.updateMode();
        this.updateTarget();
        this.move();
        
        if (this.vulnerable) {
            this.vulnerableTimer--;
            if (this.vulnerableTimer <= 0) {
                this.vulnerable = false;
            }
        }
        
        // Check if eaten ghost reached ghost house
        if (this.eaten) {
            const ghostHousePos = MazeUtils.gridToPixel(GAME_CONFIG.GHOST_HOUSE.x, GAME_CONFIG.GHOST_HOUSE.y);
            const distance = MazeUtils.distance(this.x, this.y, ghostHousePos.x, ghostHousePos.y);
            if (distance < GAME_CONFIG.CELL_SIZE) {
                this.eaten = false;
                this.vulnerable = false;
            }
        }
    }
    
    updateMode() {
        this.modeTimer++;
        
        if (!this.vulnerable && !this.eaten) {
            if (this.mode === 'scatter' && this.modeTimer >= GAME_CONFIG.SCATTER_TIME) {
                this.mode = 'chase';
                this.modeTimer = 0;
            } else if (this.mode === 'chase' && this.modeTimer >= GAME_CONFIG.CHASE_TIME) {
                this.mode = 'scatter';
                this.modeTimer = 0;
            }
        }
    }
    
    updateTarget() {
        const pacmanGrid = MazeUtils.pixelToGrid(this.game.pacman.x, this.game.pacman.y);
        
        if (this.eaten) {
            // Return to ghost house
            this.target = GAME_CONFIG.GHOST_HOUSE;
        } else if (this.vulnerable) {
            // Run away from Pac-Man
            this.target = {
                x: this.x < this.game.pacman.x ? 0 : GAME_CONFIG.MAZE_COLS - 1,
                y: this.y < this.game.pacman.y ? 0 : GAME_CONFIG.MAZE_ROWS - 1
            };
        } else {
            // Different AI for each ghost
            switch (this.name) {
                case 'blinky':
                    // Direct chase
                    this.target = pacmanGrid;
                    break;
                    
                case 'pinky':
                    // Target 4 spaces ahead of Pac-Man
                    this.target = { ...pacmanGrid };
                    switch (this.game.pacman.direction) {
                        case 'up':
                            this.target.y -= 4;
                            break;
                        case 'down':
                            this.target.y += 4;
                            break;
                        case 'left':
                            this.target.x -= 4;
                            break;
                        case 'right':
                            this.target.x += 4;
                            break;
                    }
                    break;
                    
                case 'inky':
                    // Unpredictable movement
                    if (Math.random() < 0.1) {
                        this.target = {
                            x: Math.floor(Math.random() * GAME_CONFIG.MAZE_COLS),
                            y: Math.floor(Math.random() * GAME_CONFIG.MAZE_ROWS)
                        };
                    } else {
                        this.target = pacmanGrid;
                    }
                    break;
                    
                case 'clyde':
                    // Chase if far, scatter if close
                    const distance = MazeUtils.distance(this.x, this.y, this.game.pacman.x, this.game.pacman.y);
                    if (distance > GAME_CONFIG.CELL_SIZE * 8) {
                        this.target = pacmanGrid;
                    } else {
                        this.target = { x: 0, y: GAME_CONFIG.MAZE_ROWS - 1 };
                    }
                    break;
            }
        }
    }
    
    move() {
        const currentGrid = MazeUtils.pixelToGrid(this.x, this.y);
        const validDirections = MazeUtils.getValidDirections(currentGrid.x, currentGrid.y);
        
        // Remove reverse direction (ghosts can't reverse)
        const reverseDir = this.getReverseDirection(this.direction);
        const availableDirections = validDirections.filter(dir => dir !== reverseDir);
        
        if (availableDirections.length === 0) {
            // Can only reverse
            this.direction = reverseDir;
        } else if (availableDirections.length === 1) {
            // Only one way to go
            this.direction = availableDirections[0];
        } else {
            // Choose best direction toward target
            let bestDirection = this.direction;
            let bestDistance = Infinity;
            
            availableDirections.forEach(dir => {
                const testPos = this.getPositionInDirection(dir);
                const distance = MazeUtils.distance(testPos.x, testPos.y, this.target.x, this.target.y);
                
                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestDirection = dir;
                }
            });
            
            this.direction = bestDirection;
        }
        
        // Move in chosen direction
        const speed = this.vulnerable ? GAME_CONFIG.GHOST_VULNERABLE_SPEED : this.speed;
        
        switch (this.direction) {
            case 'up':
                this.y -= speed;
                break;
            case 'down':
                this.y += speed;
                break;
            case 'left':
                this.x -= speed;
                break;
            case 'right':
                this.x += speed;
                break;
        }
        
        // Handle tunnel wrapping
        const wrapped = MazeUtils.wrapPosition(
            Math.floor(this.x / GAME_CONFIG.CELL_SIZE),
            Math.floor(this.y / GAME_CONFIG.CELL_SIZE)
        );
        
        if (wrapped.x !== Math.floor(this.x / GAME_CONFIG.CELL_SIZE)) {
            this.x = wrapped.x * GAME_CONFIG.CELL_SIZE + GAME_CONFIG.CELL_SIZE / 2;
        }
    }
    
    getPositionInDirection(direction) {
        const currentGrid = MazeUtils.pixelToGrid(this.x, this.y);
        
        switch (direction) {
            case 'up':
                return { x: currentGrid.x, y: currentGrid.y - 1 };
            case 'down':
                return { x: currentGrid.x, y: currentGrid.y + 1 };
            case 'left':
                return { x: currentGrid.x - 1, y: currentGrid.y };
            case 'right':
                return { x: currentGrid.x + 1, y: currentGrid.y };
            default:
                return currentGrid;
        }
    }
    
    getReverseDirection(direction) {
        switch (direction) {
            case 'up': return 'down';
            case 'down': return 'up';
            case 'left': return 'right';
            case 'right': return 'left';
            default: return 'up';
        }
    }
    
    makeVulnerable() {
        this.vulnerable = true;
        this.vulnerableTimer = GAME_CONFIG.VULNERABLE_TIME;
        this.direction = this.getReverseDirection(this.direction);
    }
    
    getEaten() {
        this.eaten = true;
        this.vulnerable = false;
        this.vulnerableTimer = 0;
    }
    
    render(ctx) {
        ctx.save();
        
        // Choose color
        let color = this.color;
        if (this.vulnerable) {
            color = GAME_CONFIG.COLORS.VULNERABLE;
            // Flash when vulnerability is about to end
            if (this.vulnerableTimer < 120 && Math.floor(this.vulnerableTimer / 10) % 2) {
                color = '#ffffff';
            }
        }
        
        if (!this.eaten) {
            // Draw ghost body
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y - this.radius * 0.2, this.radius, Math.PI, 0);
            ctx.rect(this.x - this.radius, this.y - this.radius * 0.2, this.radius * 2, this.radius * 1.4);
            ctx.fill();
            
            // Draw ghost bottom (wavy)
            ctx.beginPath();
            ctx.moveTo(this.x - this.radius, this.y + this.radius * 0.2);
            for (let i = 0; i < 4; i++) {
                const x = this.x - this.radius + (i * this.radius * 0.5);
                const y = this.y + this.radius * 0.2 + (i % 2 === 0 ? this.radius * 0.3 : 0);
                ctx.lineTo(x, y);
            }
            ctx.lineTo(this.x + this.radius, this.y + this.radius * 0.2);
            ctx.fill();
        }
        
        // Draw eyes
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
        ctx.arc(this.x + this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw pupils
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.1, 0, Math.PI * 2);
        ctx.arc(this.x + this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.1, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new PacManGame();
});
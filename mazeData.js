// Maze Data for Pac-Man Game
// 0 = empty space, 1 = wall, 2 = pellet, 3 = power pellet, 4 = ghost house

const MAZE_DATA = [
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

// Game configuration constants
const GAME_CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    CELL_SIZE: 25,
    MAZE_ROWS: 22,
    MAZE_COLS: 32,
    
    // Scoring
    PELLET_POINTS: 10,
    POWER_PELLET_POINTS: 50,
    GHOST_POINTS: 200,
    
    // Game mechanics
    INITIAL_LIVES: 3,
    PELLET_COUNT: 244,
    POWER_PELLET_COUNT: 4,
    
    // Character speeds (pixels per frame)
    PACMAN_SPEED: 2,
    GHOST_SPEED: 1.5,
    GHOST_VULNERABLE_SPEED: 1,
    
    // Ghost modes
    SCATTER_TIME: 420, // 7 seconds at 60fps
    CHASE_TIME: 1200,  // 20 seconds at 60fps
    VULNERABLE_TIME: 600, // 10 seconds at 60fps
    
    // Positions
    PACMAN_START: { x: 16, y: 18 },
    GHOST_HOUSE: { x: 16, y: 9 },
    GHOST_STARTS: {
        blinky: { x: 16, y: 7 },
        pinky: { x: 16, y: 9 },
        inky: { x: 15, y: 9 },
        clyde: { x: 17, y: 9 }
    },
    
    // Tunnel positions
    LEFT_TUNNEL: { x: 0, y: 9 },
    RIGHT_TUNNEL: { x: 31, y: 9 },
    
    // Colors
    COLORS: {
        WALL: '#0040ff',
        PELLET: '#ffff88',
        POWER_PELLET: '#ffff88',
        PACMAN: '#ffff00',
        BLINKY: '#ff0000',
        PINKY: '#ffb8ff',
        INKY: '#00ffff',
        CLYDE: '#ffb852',
        VULNERABLE: '#0000ff',
        BACKGROUND: '#000000'
    }
};

// Helper functions for maze operations
const MazeUtils = {
    // Convert grid coordinates to pixel coordinates
    gridToPixel: (gridX, gridY) => ({
        x: gridX * GAME_CONFIG.CELL_SIZE + GAME_CONFIG.CELL_SIZE / 2,
        y: gridY * GAME_CONFIG.CELL_SIZE + GAME_CONFIG.CELL_SIZE / 2
    }),
    
    // Convert pixel coordinates to grid coordinates
    pixelToGrid: (pixelX, pixelY) => ({
        x: Math.floor(pixelX / GAME_CONFIG.CELL_SIZE),
        y: Math.floor(pixelY / GAME_CONFIG.CELL_SIZE)
    }),
    
    // Check if a position is a wall
    isWall: (x, y) => {
        if (x < 0 || x >= GAME_CONFIG.MAZE_COLS || y < 0 || y >= GAME_CONFIG.MAZE_ROWS) {
            return true;
        }
        return MAZE_DATA[y][x] === 1;
    },
    
    // Check if a position has a pellet
    hasPellet: (x, y) => {
        if (x < 0 || x >= GAME_CONFIG.MAZE_COLS || y < 0 || y >= GAME_CONFIG.MAZE_ROWS) {
            return false;
        }
        return MAZE_DATA[y][x] === 2;
    },
    
    // Check if a position has a power pellet
    hasPowerPellet: (x, y) => {
        if (x < 0 || x >= GAME_CONFIG.MAZE_COLS || y < 0 || y >= GAME_CONFIG.MAZE_ROWS) {
            return false;
        }
        return MAZE_DATA[y][x] === 3;
    },
    
    // Remove pellet from maze
    removePellet: (x, y) => {
        if (x >= 0 && x < GAME_CONFIG.MAZE_COLS && y >= 0 && y < GAME_CONFIG.MAZE_ROWS) {
            if (MAZE_DATA[y][x] === 2 || MAZE_DATA[y][x] === 3) {
                MAZE_DATA[y][x] = 0;
                return true;
            }
        }
        return false;
    },
    
    // Check if position is in ghost house
    isGhostHouse: (x, y) => {
        if (x < 0 || x >= GAME_CONFIG.MAZE_COLS || y < 0 || y >= GAME_CONFIG.MAZE_ROWS) {
            return false;
        }
        return MAZE_DATA[y][x] === 4;
    },
    
    // Get valid directions from a position
    getValidDirections: (x, y) => {
        const directions = [];
        if (!MazeUtils.isWall(x, y - 1)) directions.push('up');
        if (!MazeUtils.isWall(x, y + 1)) directions.push('down');
        if (!MazeUtils.isWall(x - 1, y)) directions.push('left');
        if (!MazeUtils.isWall(x + 1, y)) directions.push('right');
        return directions;
    },
    
    // Calculate distance between two points
    distance: (x1, y1, x2, y2) => {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    },
    
    // Handle tunnel wrapping
    wrapPosition: (x, y) => {
        if (x < 0) return { x: GAME_CONFIG.MAZE_COLS - 1, y };
        if (x >= GAME_CONFIG.MAZE_COLS) return { x: 0, y };
        return { x, y };
    }
};

// Count initial pellets and power pellets
const countPellets = () => {
    let pellets = 0;
    let powerPellets = 0;
    
    for (let y = 0; y < GAME_CONFIG.MAZE_ROWS; y++) {
        for (let x = 0; x < GAME_CONFIG.MAZE_COLS; x++) {
            if (MAZE_DATA[y][x] === 2) pellets++;
            if (MAZE_DATA[y][x] === 3) powerPellets++;
        }
    }
    
    return { pellets, powerPellets };
};

// Initialize pellet counts
const pelletCounts = countPellets();
GAME_CONFIG.PELLET_COUNT = pelletCounts.pellets;
GAME_CONFIG.POWER_PELLET_COUNT = pelletCounts.powerPellets;
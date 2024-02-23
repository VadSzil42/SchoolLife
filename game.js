const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define map properties
const tileSize = 32; // size of each tile
const mapWidth = 10; // number of tiles in width
const mapHeight = 10; // number of tiles in height

let playerX = 1;
let playerY = 1;

// Define the map (1 represents wall, 0 represents floor)
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Function to draw the map
function drawMap() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            if (map[y][x] === 1) {
                ctx.fillStyle = 'gray';
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Function to draw the player
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(playerX * tileSize, playerY * tileSize, tileSize, tileSize);
}

// Function to update the game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
}

// Initial update
update();

// Event listener for touch controls
canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchmove', handleTouchMove, false);

let touchX, touchY;

function handleTouchStart(event) {
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    event.preventDefault();
    let newTouchX = event.touches[0].clientX;
    let newTouchY = event.touches[0].clientY;

    let deltaX = newTouchX - touchX;
    let deltaY = newTouchY - touchY;

    // Determine the direction of swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        if (deltaY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    }

    touchX = newTouchX;
    touchY = newTouchY;
}

function moveUp() {
    if (playerY > 0 && map[playerY - 1][playerX] !== 1) {
        playerY--;
        update();
    }
}

function moveDown() {
    if (playerY < mapHeight - 1 && map[playerY + 1][playerX] !== 1) {
        playerY++;
        update();
    }
}

function moveLeft() {
    if (playerX > 0 && map[playerY][playerX - 1] !== 1) {
        playerX--;
        update();
    }
}

function moveRight() {
    if (playerX < mapWidth - 1 && map[playerY][playerX + 1] !== 1) {
        playerX++;
        update();
    }
}

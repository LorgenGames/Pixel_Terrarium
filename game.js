const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let square = {
    x: 50,
    y: 50,
    size: 20,
    dx: 5,
    dy: 4
};

// Initialize the Web Worker
const worker = new Worker('worker.js');

worker.onmessage = function(event) {
    console.log("Recebeu mensagem do worker");
    // Clear the old square
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update the square's position from the worker
    square = event.data;

    // Draw the new square
    drawSquare(square.x, square.y, 'blue');
};

// Start the worker
worker.postMessage('start');

function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, square.size, square.size);
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            square.dy = -5;
            break;
        case 'ArrowDown':
            square.dy = 5;
            break;
        case 'ArrowLeft':
            square.dx = -5;
            break;
        case 'ArrowRight':
            square.dx = 5;
            break;
    }
    // Send the updated direction to the worker
    worker.postMessage(square);
}

document.addEventListener('keydown', changeDirection);

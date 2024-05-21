const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let pixel = {
    x: 1,
    y: 1,
    color: 'white'
};

// Initialize the Web Worker
const worker = new Worker('worker.js');

worker.onmessage = function(event) {
    console.log("Recebeu mensagem do worker");
    // Clear the old square
    //context.clearRect(0, 0, 1, 1);

    // Update the square's position from the worker
    pixel = event.data;

    // Draw the new square
    drawSquare(pixel.x, pixel.y, 'blue');
};

// Start the worker
worker.postMessage('start');

function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);
}



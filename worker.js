let square = {
    x: 50,
    y: 50,
    size: 20,
    dx: 5,
    dy: 4
};

function updatePosition() {
    // Update the square's position
    square.x += square.dx;
    square.y += square.dy;

    // Bounce off walls
    if (square.x + square.size > 800 || square.x < 0) {
        square.dx *= -1;
    }
    if (square.y + square.size > 600 || square.y < 0) {
        square.dy *= -1;
    }

    // Send the updated position to the main script
    postMessage(square);

    // Request the next update
    setTimeout(updatePosition, 16); // Roughly 60 frames per second
}

onmessage = function(event) {
    if (event.data === 'start') {
        console.log("Worker recebeu mensagem");
        updatePosition();
    }
};

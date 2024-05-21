let pixel = {
    x: 50,
    y: 50,
    color: "white"
};

function updatePosition() {
    // Update the square's position


    // Send the updated position to the main script
    postMessage(pixel);

    // Request the next update
    setTimeout(updatePosition, 16); // Roughly 60 frames per second
}

onmessage = function(event) {
    if (event.data === 'start') {
        console.log("Worker recebeu mensagem");
        updatePosition();
    }
};

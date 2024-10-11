// createTable.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createTableForm");
    const pokerTableContainer = document.getElementById("pokerTable");
    const feedback = document.getElementById("feedback"); // This element will display feedback

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form values
        const tableName = document.getElementById("tableName").value;
        const numSeats = parseInt(document.getElementById("numSeats").value);

        // Validate input
        if (isNaN(numSeats) || numSeats <= 0 || numSeats > pokerTableContainer.children.length) {
            feedback.innerText = "Please enter a valid number of seats.";
            return;
        } else {
            feedback.innerText = ""; // Clear feedback for valid input
        }

        // Clear existing seat visibility
        const seats = pokerTableContainer.getElementsByClassName("seat");
        for (let i = 0; i < seats.length; i++) {
            seats[i].style.display = "none"; // Hide all seats by default
        }

        // Show the appropriate number of seats
        for (let i = 0; i < numSeats; i++) {
            if (seats[i]) {
                seats[i].style.display = "block"; // Show only the selected number of seats
            }
        }

        // Display the table name as feedback
        feedback.innerText = `Poker Table "${tableName}" created with ${numSeats} seats!`;
    });
});

// script.js
const container = document.querySelector('.circle-container');
const avatars = document.querySelectorAll('.avatar');

if (avatars.length > 0) {
    const radius = 140; // Radius of the container circle
    const centerX = container.offsetWidth / 2; // Center of the container
    const centerY = container.offsetHeight / 2; // Center of the container

    avatars.forEach((avatar, index) => {
        const angle = (index / avatars.length) * (2 * Math.PI); // Calculate the angle for each avatar
        const x = radius * Math.cos(angle); // X position
        const y = radius * Math.sin(angle); // Y position
        
        // Position the avatar
        avatar.style.position = 'absolute'; // Ensure avatars have absolute positioning
        avatar.style.left = `${centerX + x - (avatar.offsetWidth / 2)}px`; // Center the avatar horizontally
        avatar.style.top = `${centerY + y - (avatar.offsetHeight / 2)}px`; // Center the avatar vertically
    });
}

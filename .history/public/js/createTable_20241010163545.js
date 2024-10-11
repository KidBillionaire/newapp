// createTable.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createTableForm");
    const pokerTableContainer = document.getElementById("pokerTable");
    
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Get form values
      const tableName = document.getElementById("tableName").value;
      const numSeats = parseInt(document.getElementById("numSeats").value);
      
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
  
      // Optionally, display the table name
      alert(`Poker Table "${tableName}" created with ${numSeats} seats!`);
    });
  });
  
  // script.js
const container = document.querySelector('.circle-container');
const avatars = document.querySelectorAll('.avatar');
const radius = 140; // Radius of the container circle

avatars.forEach((avatar, index) => {
    const angle = (index / avatars.length) * (2 * Math.PI); // Calculate the angle for each avatar
    const x = radius * Math.cos(angle); // X position
    const y = radius * Math.sin(angle); // Y position
    
    // Position the avatar
    avatar.style.left = `calc(50% + ${x}px - 25px)`; // Center the avatar horizontally
    avatar.style.top = `calc(50% + ${y}px - 25px)`; // Center the avatar vertically
});

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
  
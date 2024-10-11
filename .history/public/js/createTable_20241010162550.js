document.addEventListener('DOMContentLoaded', () => {
    const createTableForm = document.getElementById('createTableForm');
    const aiPlayersList = document.getElementById('aiPlayersList');
    const seats = document.querySelectorAll('.seat'); // Select all seats on the table
  
    // Handle the form submission
    createTableForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const tableName = document.getElementById('tableName').value;
      const numSeats = document.getElementById('numSeats').value;
      const tableType = document.getElementById('tableType').value;
  
      const tableData = { tableName, numSeats: parseInt(numSeats), tableType };
  
      try {
        const response = await fetch('/tables', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tableData),
        });
  
        if (response.ok) {
          const newTable = await response.json();
  
          // Display AI Players on the table
          aiPlayersList.innerHTML = ''; // Clear the list
          seats.forEach((seat) => (seat.innerHTML = '')); // Clear seats
  
          newTable.aiPlayers.forEach((aiPlayer, index) => {
            if (index < seats.length) {
              seats[index].innerHTML = `<img src='/images/ai-avatar.png' alt='${aiPlayer}' width='40'><br>${aiPlayer}`;
            }
          });
  
          alert(`Poker table created successfully with AI players: ${newTable.aiPlayers.join(', ')}`);
          createTableForm.reset(); // Clear the form
        } else {
          alert('Failed to create table');
        }
      } catch (error) {
        console.error('Error creating table:', error);
        alert('An error occurred. Please try again.');
      }
    });
  });
  
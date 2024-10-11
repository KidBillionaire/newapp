document.addEventListener('DOMContentLoaded', () => {
    const createTableForm = document.getElementById('createTableForm');
  
    // Handle the form submission
    createTableForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Get form values
      const tableName = document.getElementById('tableName').value;
      const numSeats = document.getElementById('numSeats').value;
      const tableType = document.getElementById('tableType').value;
  
      // Create the table data object
      const tableData = {
        tableName,
        numSeats: parseInt(numSeats),
        tableType,
      };
  
      // Send the data to the server
      try {
        const response = await fetch('/tables', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tableData),
        });
  
        if (response.ok) {
          alert('Poker table created successfully!');
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
  
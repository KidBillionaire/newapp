// public/js/app.js

// Wait for the DOM content to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch user data and render it in the table
  async function fetchUserData() {
    try {
      // Fetch the data from the backend
      const response = await fetch('/users');
      const users = await response.json();

      // Get the table body element
      const tableBody = document.querySelector('#userTable tbody');

      // Clear any existing rows
      tableBody.innerHTML = '';

      // Iterate over each user and create a row
      users.forEach(user => {
        // Create a new table row element
        const row = document.createElement('tr');

        // Populate the row with user data
        row.innerHTML = `
          <td>${user.username}</td>
          <td>${user.pokerHands.map(hand => `${hand.hand} (${hand.result})`).join(', ')}</td>
          <td>${user.totalWins}</td>
          <td>${user.totalLosses}</td>
        `;

        // Append the row to the table body
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  // Fetch and display the user data when the page loads
  fetchUserData();
});

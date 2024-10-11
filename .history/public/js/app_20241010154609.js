document.addEventListener('DOMContentLoaded', () => {
  async function fetchUserData() {
    try {
      const response = await fetch('/users');
      const users = await response.json();
      const tableBody = document.querySelector('#userTable tbody');
      tableBody.innerHTML = '';

      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.username}</td>
          <td>${user.pokerHands.map(hand => `${hand.hand} (${hand.result})`).join(', ')}</td>
          <td>${user.totalWins}</td>
          <td>${user.totalLosses}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  // Handle Reload Data Button
  const reloadButton = document.getElementById('reloadButton');
  reloadButton.addEventListener('click', fetchUserData);

  // Handle New User Form Submission
  const addUserForm = document.getElementById('addUserForm');
  addUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const totalWins = document.getElementById('wins').value;
    const totalLosses = document.getElementById('losses').value;

    // Create a new user object
    const newUser = {
      username: username,
      pokerHands: [], // Empty hands initially
      totalWins: parseInt(totalWins),
      totalLosses: parseInt(totalLosses),
    };

    // Send a POST request to the backend to add the new user
    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log('User added successfully!');
        fetchUserData(); // Reload the data after adding a new user
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }

    // Clear the form
    addUserForm.reset();
  });

  // Fetch the initial data when the page loads
  fetchUserData();
});

document.addEventListener('DOMContentLoaded', () => {
  async function fetchUserData() {
    try {
      const response = await fetch('/users');
      const users = await response.json();
      const tableBody = document.querySelector('#userTable tbody');
      tableBody.innerHTML = ''; // Clear any previous content

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
  const reloadButton = document.getElementById('profileSettingsButton');
  reloadButton.addEventListener('click', () => {
    const profileSettingsDiv = document.getElementById('profileSettings');
    profileSettingsDiv.classList.toggle('hidden'); // Toggle visibility
  });

  // Handle Profile Form Submission
  const profileForm = document.getElementById('profileForm');
  profileForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const profilePicture = document.getElementById('profilePicture').value;
    const totalWins = document.getElementById('totalWins').value;
    const totalLosses = document.getElementById('totalLosses').value;

    const updatedUser = {
      username: newUsername,
      profilePicture: profilePicture, // New field
      totalWins: parseInt(totalWins),
      totalLosses: parseInt(totalLosses),
    };

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        console.log('User updated successfully!');
        fetchUserData(); // Reload the data after updating
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }

    // Clear the form
    profileForm.reset();
  });

  // Fetch the initial data when the page loads
  fetchUserData();
});
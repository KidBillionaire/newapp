// public/js/app.js
window.onload = async function() {
    try {
      // Fetch all user data from the server
      const response = await fetch('/users');
      const users = await response.json();
  
      // Get the table body element
      const tableBody = document.querySelector('#userTable tbody');
      tableBody.innerHTML = '';
  
      // Populate the table with user data
      users.forEach(user => {
        const row = document.createElement('tr');
  
        // Username cell
        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username;
        row.appendChild(usernameCell);
  
        // Poker hands cell
        const pokerHandsCell = document.createElement('td');
        pokerHandsCell.innerHTML = user.pokerHands
          .map(hand => `<p>${hand.hand} - ${hand.result}</p>`)
          .join('');
        row.appendChild(pokerHandsCell);
  
        // Total Wins cell
        const totalWinsCell = document.createElement('td');
        totalWinsCell.textContent = user.totalWins;
        row.appendChild(totalWinsCell);
  
        // Total Losses cell
        const totalLossesCell = document.createElement('td');
        totalLossesCell.textContent = user.totalLosses;
        row.appendChild(totalLossesCell);
  
        tableBody.appendChild(row); // Append row to table body
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
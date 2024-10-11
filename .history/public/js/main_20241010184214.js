document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const playerInfo = document.getElementById('playerInfo');
    const tableNameHeading = document.getElementById('tableNameHeading');
    const playerHandContainer = document.getElementById('playerHand');
    const aiHandContainer = document.getElementById('aiHand');
  
    // Fetch and display user information
    function renderUsers() {
      fetch('/users')
        .then(response => response.json())
        .then(data => {
          const userList = document.createElement('ul');
          data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.username}: Wins - ${user.totalWins}, Losses - ${user.totalLosses}`;
            userList.appendChild(listItem);
          });
          playerInfo.appendChild(userList);
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  
    // Fetch and display table information
    function renderTables() {
      fetch('/tables')
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const table = data[0]; // Assume only one table for now
            tableNameHeading.textContent = `Table: ${table.tableName} (${table.tableType})`;
            
            // Render AI Players at the Table
            const aiList = document.createElement('ul');
            table.aiPlayers.forEach(ai => {
              const listItem = document.createElement('li');
              listItem.textContent = `AI Player: ${ai}`;
              aiList.appendChild(listItem);
            });
            playerInfo.appendChild(aiList);
          }
        })
        .catch(error => console.error('Error fetching tables:', error));
    }
  
    // Fetch and display player cards
    function renderPlayerCards(hand) {
      playerHandContainer.innerHTML = ''; // Clear previous cards
      hand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'hole-card';
        cardElement.textContent = card;
        playerHandContainer.appendChild(cardElement);
      });
    }
  
    // Fetch and display AI cards
    function renderAICards(hand) {
      aiHandContainer.innerHTML = ''; // Clear previous cards
      hand.forEach(() => {
        const cardElement = document.createElement('div');
        cardElement.className = 'hole-card face-down';
        cardElement.textContent = '??';
        aiHandContainer.appendChild(cardElement);
      });
    }
  
    // Example: Fetch and render the current player's hand from the server
    function renderCurrentPlayerHand() {
      fetch('/users/6708557157787410479c6be6') // Replace with actual user ID
        .then(response => response.json())
        .then(user => {
          renderPlayerCards(user.pokerHands.map(hand => hand.hand.split(' ')[0])); // Example hand data processing
        })
        .catch(error => console.error('Error fetching player hand:', error));
    }
  
    // Initialize page with data
    renderUsers();
    renderTables();
    renderCurrentPlayerHand();
  });
  
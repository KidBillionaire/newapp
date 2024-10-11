document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const playerInfo = document.getElementById('playerInfo');
    const tableNameHeading = document.getElementById('tableNameHeading');
    const playerHandContainer = document.getElementById('playerHand');
    const aiHandContainer = document.getElementById('aiHand');

    // Fetch and display user information
    const renderUsers = async () => {
        try {
            const response = await fetch('/users');
            const data = await response.json();
            const userList = document.createElement('ul');
            data.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = `${user.username}: Wins - ${user.totalWins}, Losses - ${user.totalLosses}`;
                userList.appendChild(listItem);
            });
            playerInfo.appendChild(userList);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Fetch and display table information
    const renderTables = async () => {
        try {
            const response = await fetch('/tables');
            const data = await response.json();
            if (data.length > 0) {
                const table = data[0]; // Assume only one table for now
                tableNameHeading.textContent = `Table: ${table.tableName} (${table.tableType})`;
                
                const aiList = document.createElement('ul');
                table.aiPlayers.forEach(ai => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `AI Player: ${ai}`;
                    aiList.appendChild(listItem);
                });
                playerInfo.appendChild(aiList);
            }
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    // Fetch and display player cards
    const renderPlayerCards = (hand) => {
        playerHandContainer.innerHTML = ''; // Clear previous cards
        hand.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'hole-card';
            cardElement.textContent = card;
            playerHandContainer.appendChild(cardElement);
        });
    };

    // Fetch and display AI cards
    const renderAICards = (hand) => {
        aiHandContainer.innerHTML = ''; // Clear previous cards
        hand.forEach(() => {
            const cardElement = document.createElement('div');
            cardElement.className = 'hole-card face-down';
            cardElement.textContent = '??';
            aiHandContainer.appendChild(cardElement);
        });
    };

    // Example: Fetch and render the current player's hand from the server
    const renderCurrentPlayerHand = async () => {
        try {
            const response = await fetch('/users/6708557157787410479c6be6'); // Replace with actual user ID
            const user = await response.json();
            const hand = user.pokerHands.map(hand => hand.hand.split(' ')[0]); // Example hand data processing
            renderPlayerCards(hand);
        } catch (error) {
            console.error('Error fetching player hand:', error);
        }
    };

    // Initialize page with data
    renderUsers();
    renderTables();
    renderCurrentPlayerHand();
  
    // Get references to seat elements
    const seats = document.querySelectorAll('.seat');
    const modal = document.getElementById('userModal');
    const userIdInput = document.getElementById('userIdInput');
    const submitUserIdButton = document.getElementById('submitUserId');
    const closeModalButton = document.querySelector('.close');

    // Player Info Section References
    const currentPlayerName = document.getElementById('currentPlayerName');
    const currentPlayerWins = document.getElementById('currentPlayerWins');
    const currentPlayerLosses = document.getElementById('currentPlayerLosses');

    let selectedSeat = null;

    // Functions for modal
    const showModal = (seat) => {
        selectedSeat = seat; // Track the selected seat
        modal.style.display = 'block';
    };

    const hideModal = () => {
        modal.style.display = 'none';
    };

    // Function to fetch and display user data
    const fetchAndRenderUserData = async (userId, seatElement) => {
        try {
            const response = await fetch(`/users/${userId}`);
            const user = await response.json();
            seatElement.textContent = user.username;
            currentPlayerName.textContent = `Player Name: ${user.username}`;
            currentPlayerWins.textContent = `Total Wins: ${user.totalWins}`;
            currentPlayerLosses.textContent = `Total Losses: ${user.totalLosses}`;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Event listener for seat clicks
    seats.forEach(seat => {
        seat.addEventListener('click', () => showModal(seat));
    });

    // Event listener for the close button in the modal
    closeModalButton.addEventListener('click', hideModal);

    // Event listener for the submit button in the modal
    submitUserIdButton.addEventListener('click', () => {
        const userId = userIdInput.value.trim();
        if (userId && selectedSeat) {
            fetchAndRenderUserData(userId, selectedSeat); // Fetch and render user data for the selected seat
            hideModal(); // Hide the modal after submission
        } else {
            alert('Please enter a valid User ID');
        }
    });

    // Hide the modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });
});

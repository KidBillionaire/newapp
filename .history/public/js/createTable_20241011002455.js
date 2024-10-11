const createTableForm = document.getElementById('createTableForm');
const pokerTableContainer = document.getElementById('pokerTableContainer');
const dealCardsButton = document.getElementById('dealCardsButton');

createTableForm.addEventListener('submit', function(event) {
  event.preventDefault();

  pokerTableContainer.innerHTML = ''; // Clear existing seats

  const numSeats = parseInt(document.getElementById('numSeats').value);
  const xRadius = 350;
  const yRadius = 200;
  const centerX = pokerTableContainer.offsetWidth / 2;
  const centerY = pokerTableContainer.offsetHeight / 2;

  for (let i = 0; i < numSeats; i++) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.textContent = i + 1;
    pokerTableContainer.appendChild(seat);

    const angle = (i / numSeats) * (2 * Math.PI);
    const x = centerX + xRadius * Math.cos(angle) - (seat.offsetWidth / 2);
    const y = centerY + yRadius * Math.sin(angle) - (seat.offsetHeight / 2);

    seat.style.left = `${x}px`;
    seat.style.top = `${y}px`;
  }
});

// Function to handle card dealing and animation
dealCardsButton.addEventListener('click', function() {
  const existingCards = document.querySelectorAll('.card');
  existingCards.forEach(card => card.remove()); // Clear any previous cards

  const centerX = pokerTableContainer.offsetWidth / 2;
  const centerY = pokerTableContainer.offsetHeight / 2;

  // Sample card values and suits
  const cardValues = [
    { value: 'A♥', class: 'red' },
    { value: 'K♣', class: 'black' },
    { value: '10♦', class: 'red' },
    { value: '7♠', class: 'black' },
    { value: 'J♠', class: 'black' }
  ];

  cardValues.forEach((cardInfo, index) => {
    const card = document.createElement('div');
    card.className = `card ${cardInfo.class}`;
    card.textContent = cardInfo.value;
    pokerTableContainer.appendChild(card);

    card.style.left = `${centerX}px`;
    card.style.top = `${centerY}px`;

    setTimeout(() => {
      card.style.left = `${centerX - 160 + index * 80}px`; // Positioning cards in a row
      card.style.top = `${centerY - 40}px`;
      card.classList.add('deal'); // Trigger animation
    }, index * 200);
  });
});

let currentUserId = null; // Variable to store the current user's ID

// Function to set the current user ID (you can call this when a user logs in)
function setCurrentUser(userId) {
    currentUserId = userId;
}

// Handle seat click
function handleSeatClick(event) {
    const seat = event.target;
    if (seat.classList.contains('occupied')) return;

    const seatNumber = seat.getAttribute('data-seat');
    const playerName = prompt('Enter player name:');
    
    if (playerName && currentUserId) { // Check if player name and user ID are present
        seat.textContent = playerName;
        seat.classList.add('occupied');
        
        // Store player info with the current user ID
        players[seatNumber] = { name: playerName, chips: 1000, seat: seatNumber }; 
        currentPlayer = seatNumber;

        // Now make the API call to add the player to the table
        addPlayerToTable(currentUserId, seatNumber);
        
        updateBettingControls(); // Show betting controls when a player is seated
    } else if (!currentUserId) {
        alert('User ID is not set. Please log in first.');
    }
}

// Function to add player to the table via API call
function addPlayerToTable(userId, seatNumber) {
    const tableId = 'YOUR_TABLE_ID'; // Replace with your actual table ID

    fetch(`http://localhost:3000/tables/${tableId}/addPlayer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            seatNumber: seatNumber,
            chips: 1000, // Set the initial chips for the player
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add player to the table');
        }
        return response.json();
    })
    .then(data => {
        console.log('Player added:', data);
        // You can update your UI based on the added player here
    })
    .catch(error => {
        console.error('Error adding player:', error);
    });
}

// Example usage of setting the user ID when logging in
setCurrentUser('6708c42b5b4de1afc384c02e'); // Call this with the actual user ID after login

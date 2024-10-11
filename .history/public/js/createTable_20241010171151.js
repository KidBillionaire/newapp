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

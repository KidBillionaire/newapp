// js/main.js
import { setupTable } from './tableSetup.js';
import { check, fold, call, bet, raise, leaveTable } from './playerActions.js';
import { updatePotDisplay } from './tableLogic.js';

const pokerTableContainer = document.getElementById('pokerTableContainer');
const dealButton = document.getElementById('dealButton');
const betButton = document.getElementById('betButton');
const foldButton = document.getElementById('foldButton');
const checkButton = document.getElementById('checkButton');
const currentPotDisplay = document.getElementById('currentPot');

dealButton.addEventListener('click', () => {
    console.log('Dealing cards');
});

betButton.addEventListener('click', () => {
    bet(10, currentPotDisplay);
});

foldButton.addEventListener('click', fold);
checkButton.addEventListener('click', check);

setupTable(pokerTableContainer, () => console.log('Player took a seat'));

// js/playerActions.js
import { pot, playerChips } from './gameState.js';
import { updatePotDisplay } from './tableLogic.js';

export function check() {
    console.log('Player checked');
}

export function fold() {
    console.log('Player folded');
}

export function call() {
    console.log('Player called');
}

export function bet(betAmount, currentPotDisplay, playerChipsDisplay) {
    pot += betAmount;
    playerChips -= betAmount;
    updatePotDisplay(currentPotDisplay);
    playerChipsDisplay.textContent = `Player Chips: $${playerChips}`;
    console.log('Player bet');
}

export function raise() {
    console.log('Player raised');
}

export function postBlind() {
    console.log('Player posted a blind');
}

export function sitIn() {
    console.log('Player sat in');
}

export function sitOnTheTable() {
    console.log('Player sat on the table');
}

export function leaveTable() {
    console.log('Player left the table');
}

export function leaveRoom() {
    console.log('Player left the room');
}

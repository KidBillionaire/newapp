// js/tableLogic.js
import { pot } from './gameState.js';

export function minBetAmount() {
    console.log('Calculating minimum bet amount');
}

export function maxBetAmount() {
    console.log('Calculating maximum bet amount');
}

export function callAmount() {
    console.log('Calculating call amount');
}

export function showLeaveTableButton() {
    console.log('Showing leave table button');
}

export function showPostSmallBlindButton() {
    console.log('Showing small blind button');
}

export function showPostBigBlindButton() {
    console.log('Showing big blind button');
}

export function showFoldButton() {
    console.log('Showing fold button');
}

export function showCheckButton() {
    console.log('Showing check button');
}

export function showCallButton() {
    console.log('Showing call button');
}

export function showBetButton() {
    console.log('Showing bet button');
}

export function showRaiseButton() {
    console.log('Showing raise button');
}

export function showBetRange() {
    console.log('Showing bet range');
}

export function showBetInput() {
    console.log('Showing bet input');
}

export function showBuyInModal() {
    console.log('Showing buy-in modal');
}

export function potText() {
    console.log(`Pot: $${pot}`);
}

export function updatePotDisplay(currentPotDisplay) {
    currentPotDisplay.textContent = `Pot: $${pot}`;
}

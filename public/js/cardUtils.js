// js/cardUtils.js
export function getCardClass(seat, card) {
    if (seat === null) return 'card-back';
    return `card-${card}`;
}

export function seatOccupied(seat) {
    return seat !== null;
}

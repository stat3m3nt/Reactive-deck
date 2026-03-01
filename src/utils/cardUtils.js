/**
 * StAuth10244: I Andrew Evboifo, 000909727 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
 */

export const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
export const suits = ["♥", "♦", "♣", "♠"];

// createDeck function generates a standard 52-card deck by combining each rank with each suit
export function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ 
                rank, 
                suit,
                id: `${rank}-${suit}-${Math.random()}` // unique identifier for each card
             });
        }
    }
    return deck;
} 

// shuffleDeck function implements the Fisher-Yates algorithm to randomize the order of cards in the deck
export function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }   
    return deck;
}

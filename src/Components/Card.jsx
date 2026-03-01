/**
 * StAuth10244: I Andrew Evboifo, 000909727 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
 * 
 * This file contains the Card component which is responsible for rendering a single card in the game.
 * The Card component takes in props for the card's rank, suit, whether it is selected, and an onClick handler.
 * It displays the card's rank and suit in the top-left and bottom-right corners, as well as a larger suit symbol in the center.
 * The color of the card is determined by its suit (red for hearts and diamonds, black for clubs and spades) mimicking real playing cards.
 */

import React from "react";

function Card({ card, isPicked, onClick }) {
    const cardColor = card.suit === "♣" || card.suit === "♠" ? "black" : "red";
    return (

        <div className={`card ${isPicked ? "picked" : ""}`} onClick={onClick} style={{ color: cardColor }}>

            {/* Card rank and suit for top left corner of card */}
            <div className = "vertex left-top" style={{ color: cardColor }}>
                <div className="cardRank">{card.rank}</div>
                <div className="cardSuit">{card.suit}</div>
            </div>

            {/* Display the card rank and suit in the bottom-right corner */}
            <div className = "vertex right-bottom" style={{ color: cardColor }}>
                <div className="cardRank">{card.rank}</div>
                <div className="cardSuit">{card.suit}</div>
            </div>

            {/* Display center suit */}
            <div className = "center-suit" style={{ color: cardColor }}>
                <div className="cardSuit">{card.suit}</div>
            </div>
        </div>
    );
}

export default Card;
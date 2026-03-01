import React, { useState } from "react";
import Card from "./Components/Card";
import "./App.css";

/**
 * StAuth10244: I Andrew Evboifo, 000909727 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
 * 
 * This file contains the main App component which serves as the entry point for the card game application.
 * The App component manages the state of the deck of cards, the player's hand, and the selected cards.
 * It renders a button to shuffle the deck and a grid of Card components representing the player's hand.
 * The App component also handles the logic for selecting and deselecting cards when they are clicked.
 */

function App() {
  // hooks to create state variables for the deck of cards, the player's hand, and the selected cards
    const [deck, setDeck] = useState(createDeck());
    const [hand, setHand] = useState([]);
    const [pickedCards, setPickedCards] = useState([]);


  
  // selects random card from the deck and adds it to the player's hand only if there are more cards in the deck
    const drawCard = () => {
        if (deck.length > 0) {
            const newDeck = [...deck];
            const card = newDeck.pop();
            setDeck(newDeck);
            setHand([...hand, card]);
        } else alert("No more cards in the deck!");
    };

    const dealCards = (num) => {
        if (deck.length >= num) {
            const newDeck = [...deck];
            const newHand = [];
            for (let i = 0; i < num; i++) {
                const card = newDeck.pop();
                newHand.push(card);
            }
            setDeck(newDeck);
            setHand(newHand);
            setPickedCards([]);
        } else alert("Not enough cards in the deck to deal!");
    }; 

    // toss card
    const tossCard = () => {
      if (pickedCards === null) return;
      const newHand = [...hand];
      
      // sort in descending order to avoid index shifting issues when splicing
      pickedCards.sort((a, b) => b - a); 
      pickedCards.forEach(index => {
        newHand.splice(index, 1);
      });
      setHand(newHand);
      setPickedCards([]);
    }

    // reset game
    const resetGame = () => {
      setDeck([...deck, ...hand]);
      setHand([]);
      setPickedCards([]);
    }
    // shuffles deck after reset
    setDeck(shuffleDeck([...deck, ...hand]));
    setPickedCards([]);



    return (
        <div className="App">
            <h1>Card Game</h1>
            <button onClick={drawCard}>Draw Card  </button>
            <button onClick={tossCard}>Toss Card  </button>
            <div className="hand">
                {hand.map((card, index) => (
                    <Card
                        key={index}
                        card={card}
                        isPicked={pickedCards.includes(index)}
                        onClick={() => {
                            // if (pickedCards.includes(index)) {
                            //     setPickedCards(pickedCards.filter(i => i !== index));
                            // } else {
                            //     setPickedCards([...pickedCards, index]);
                            // }
                            setPickedCards(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
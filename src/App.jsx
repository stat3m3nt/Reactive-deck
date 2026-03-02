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

import React, { useState } from "react";
import Card from "./Components/Card";
import "./App.css";
import { ranks, suits, createDeck, shuffleDeck } from "./utils/cardUtils";


function App() {
  // hooks to create state variables for the deck of cards, the player's hand, and the selected cards
    const [deck, setDeck] = useState(shuffleDeck(createDeck())); // initialize deck with a shuffled standard 52-card deck
    const [hand, setHand] = useState([]);
    const [pickedCards, setPickedCards] = useState([]);

  // function to shuffle the deck of cards using the shuffleDeck utility function
  const shuffle = () => {
    setDeck(shuffleDeck([...deck]));
  };

  // function to draw a card from the deck and add it to the player's hand
    const drawCard = () => {
        if (deck.length > 0) {
            const newDeck = [...deck];
            const card = newDeck.pop();
            setDeck(newDeck);
            setHand([...hand, card]);
        } else alert("No more cards in the deck!");
    };

    // function to deal a specified number of cards from the deck to the player's hand
    const dealCards = (num) => {
        if (deck.length >= num) {
            const newDeck = [...deck];
            const newHand = [];
            for (let i = 0; i < num; i++) {
              newHand.push(newDeck.pop());
            }
            setDeck(newDeck);
            setHand(newHand);
            setPickedCards([]); 
        } else alert("Not enough cards in the deck to deal!");
    }; 

    // function to toss selected cards from the player's hand back into the deck
    const tossCard = () => {
      if (pickedCards.length === 0) return;
      const newHand = hand.filter(card => !pickedCards.includes(card.id));
      const tossedCards = hand.filter(card => pickedCards.includes(card.id));
      setDeck(shuffleDeck([...deck, ...tossedCards])); // add tossed cards back to deck and shuffle 
      setHand(newHand);
      setPickedCards([]);
    }

    // reset game
    const resetGame = () => {
      const newDeck = shuffleDeck([...deck, ...hand]);
      setDeck(newDeck);
      setHand([]);
      setPickedCards([]);
    }
    
    // function to regroup the player's hand by shuffling the cards in their hand
    const regroup = () => {
      setHand(shuffleDeck([...hand]));
      setPickedCards([]);
    }

    const wildCard = () => {
      const newCard = {
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        suit: suits[Math.floor(Math.random() * suits.length)],
        id: `wild-${Math.random()}`
      };
      setHand([...hand, newCard]);
    };


    return (
        <div className="App">

          {/* page header */}
          <header className="App-header">
            <h1>Card Game</h1>
          </header>

            {/* Button controls */}
            <div className="buttons">
              <button onClick={drawCard}>Draw Card  </button>
              <button onClick={tossCard}>Toss Card  </button>
              <button onClick={regroup}>Regroup Hand  </button>
              <button onClick={wildCard}>Wild Card  </button>
              <button onClick={resetGame}>Reset Game  </button>
              <button onClick={() => dealCards(5)}>Deal 5 Cards  </button>
              <button onClick={() => dealCards(7)}>Deal 7 Cards  </button>
              <button onClick={shuffle}>Shuffle Deck  </button> 
            </div>

            <div className="game-section">
              {/* Deck rectangle */}
              <div 
                className="deck" 
                onClick={deck.length > 0 ? drawCard : null}
                style={{backgrou}}>  
                  {deck.length > 0 ? <h3>Deck ({deck.length} cards)</h3> : <h3>Deck is Empty</h3>}
              </div>

              <div className="status">
                <h5> Number of Cards in Hand: {hand.length}</h5>
                <h5> Number of Cards in Deck: {deck.length}</h5>
              </div>

              <div className="hand">
                {hand.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    isPicked={pickedCards.includes(card.id)}
                    onClick={() => {
                      setPickedCards(prev => prev.includes(card.id) ? prev.filter(id => id !== card.id) : [...prev, card.id]);
                    }}
                  />
                ))}
              </div>
            </div>
            
        </div>
    );
}

export default App;
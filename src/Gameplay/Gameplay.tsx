import { useEffect, useState } from "react"
import ICard from "../Card/ICard";
import { generateShuffledDeck } from "./DeckUtils";
import Gameboard from "../GameBoard/Gameboard"

interface GameplayProps {
    playerName: string
    initialMoney: number
}

const Gameplay = (props: GameplayProps) => {
    // const [playerWallet, setPlayerWallet] = useState<number>(props.initialMoney);
    const [playerCards, setPlayerCards] = useState<Array<ICard>>([]);
    const [dealerCards, setDealerCards] = useState<Array<ICard>>([]);
    const [activeDeck, setActiveDeck] = useState<Array<ICard>>([]);

    useEffect(() => {
        const initialShuffledDeck = generateShuffledDeck();
        let toBePlayerCards = [];
        let toBeDealerCards = [];
        for (let i=0; i <= 3; i++) {
            let card = initialShuffledDeck.pop();
            if (card) {
                if (i % 2 === 0) {
                    toBeDealerCards.push(card);
                } else {
                    toBePlayerCards.push(card);
                }
            } else {
                throw Error("Card is unable to be dealt");
            }
        }

        setDealerCards(toBeDealerCards);
        setPlayerCards(toBePlayerCards);

        setActiveDeck(initialShuffledDeck);
    }, []);

    const dealCard = () => {
        // Wasn't working fix it
        const cardToDeal = activeDeck.pop();
        if (cardToDeal) {
            setPlayerCards([...playerCards, cardToDeal]);
        }
    }

    const stand = (player: string) => {
        // if (player === "dealer") {
        //     let deck = activeDeck;
        //     const cardToDeal = deck.pop();
        // }
    }

    return (
        <>
            <Gameboard 
                playerName={props.playerName}
                playerCards={playerCards}
                dealerCards={dealerCards}
                onHit={dealCard}
                onStand={stand}
            />
        </>
      );
}

export default Gameplay
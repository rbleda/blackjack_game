import { useEffect, useState } from "react"
import ICard from "../Card/ICard";
import { generateShuffledDeck } from "./DeckUtils";
import Card from "../Card/Card";

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
    
                initialShuffledDeck.filter((c) => !(c.value === card.value && c.suit === card.suit));
            } else {
                throw Error("Card is unable to be dealt");
            }
        }

        setDealerCards(toBeDealerCards);
        setPlayerCards(toBePlayerCards);

        setActiveDeck(initialShuffledDeck);
    }, []);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                {activeDeck.map((c) => (
                <Card key={`${c.color}-${c.suit}-${c.value}`} value={c.value} suit={c.suit} color={c.color} />
                ))}
            </div>
            <h1>{props.playerName}'s Cards: </h1>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                {playerCards.map((c) => (
                <Card key={`${c.color}-${c.suit}-${c.value}`} value={c.value} suit={c.suit} color={c.color} />
                ))}
            </div>
            <h1>Dealer's Cards: </h1>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                {dealerCards.map((c) => (
                <Card key={`${c.color}-${c.suit}-${c.value}`} value={c.value} suit={c.suit} color={c.color} />
                ))}
            </div>
        </>
      );
}

export default Gameplay
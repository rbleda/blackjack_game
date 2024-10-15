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
    // const [playerCards, setPlayerCards] = useState<Array<ICard>>([]);
    // const [dealerCards, setDealerCards] = useState<Array<ICard>>([]);
    const [activeDeck, setActiveDeck] = useState<Array<ICard>>([]);

    useEffect(() => {
        setActiveDeck(generateShuffledDeck());
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            {activeDeck.map((c) => (
              <Card key={`${c.color}-${c.suit}-${c.value}`} value={c.value} suit={c.suit} color={c.color} />
            ))}
        </div>
      );
}

export default Gameplay
import { useEffect, useState } from "react";
import ICard from "../Card/ICard";
import Card from "../Card/Card";

import "./PlayerBox.css";
import { GameOutcome } from "../Board/GameOutcome";

interface Props {
    userName: string;
    hand: ICard[];
    backgroundColor: string;
    playerTurn: boolean;
    playerBank?: number;
    gameOutcome: GameOutcome | null;
}

const PlayerBox = (props: Props) => {
    const [hand, setHand] = useState(props.hand);
    const [iconStyling, setIconStyling] = useState({backgroundColor: props.backgroundColor});
    const gameOverOutcomes = [GameOutcome.PLAYER_WINS, GameOutcome.PLAYER_LOSES, GameOutcome.GAME_TIED];

    useEffect(() => {
        setHand(props.hand);
    }, [props.hand]);

    useEffect(() => {
        if (props.playerTurn && props.userName !== "Dealer") {
            setTurnStyling('gold');
        } else if (!props.playerTurn && props.userName !== "Dealer") {
            setTurnStyling('black');
        } else if (!props.playerTurn && props.userName === "Dealer") {
            setTurnStyling('gold');
        } else {
            setTurnStyling('black');
        }
    }, [props.playerTurn]);

    const setTurnStyling = (color: string) => {
        const newStyling = {
            backgroundColor: props.backgroundColor,
            borderColor: color
        }

        setIconStyling(newStyling);
    }

    return (
        <div className="player-box-container">
            {props.playerBank && 
                <div className="player-bank">
                    {"$" + props.playerBank}
                </div>}
            <div className="player-icon" style={iconStyling}>
                {props.userName}
            </div>
            <div className="player-cards-container">
                {hand && hand.map((c) => {
                    if (props.gameOutcome !== null && gameOverOutcomes.includes(props.gameOutcome)) {
                        return <Card 
                            key={`$${c.suit}-${c.value}`} 
                            value={c.value} 
                            suit={JSON.parse(c.suit)} 
                            blankcard={false}/>
                    } else {
                        return <Card 
                            key={`$${c.suit}-${c.value}`} 
                            value={c.value} 
                            suit={JSON.parse(c.suit)} 
                            blankcard={JSON.parse(c.upsideDown)}/>
                    }
                })}
            </div>
        </div>
    )
}

export default PlayerBox;
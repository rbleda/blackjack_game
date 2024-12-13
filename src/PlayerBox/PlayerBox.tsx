import { useEffect, useState } from "react";
import ICard from "../Card/ICard";
import Card from "../Card/Card";

import "./PlayerBox.css";
import { GameOutcome } from "../Board/GameOutcome";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Props {
    hand: ICard[];
    backgroundColor?: string;
    playerTurn: boolean;
    isDealer: boolean;
}

const PlayerBox = (props: Props) => {
    const [hand, setHand] = useState(props.hand);
    const [iconStyling, setIconStyling] = useState({backgroundColor: props.backgroundColor});
    const gameOutcome = useSelector((state: RootState) => state.game.gameOutcome);
    const player = useSelector((state: RootState) => state.player);
    const gameOverOutcomes = [GameOutcome.PLAYER_WINS, GameOutcome.PLAYER_LOSES, GameOutcome.GAME_TIED];

    useEffect(() => {
        setHand(props.hand);
    }, [props.hand]);

    useEffect(() => {
        if (props.playerTurn && player.username !== "Dealer") {
            setTurnStyling('gold');
        } else if (!props.playerTurn && player.username !== "Dealer") {
            setTurnStyling('black');
        } else if (!props.playerTurn && player.username === "Dealer") {
            setTurnStyling('gold');
        } else {
            setTurnStyling('black');
        }
    }, [props.playerTurn]);

    const setTurnStyling = (color: string) => {
        const newStyling = {
            backgroundColor: props.backgroundColor && !props.isDealer ? props.backgroundColor : 'red',
            borderColor: color
        }

        setIconStyling(newStyling);
    }

    return (
        <div className="player-box-container">
            {!props.isDealer && 
                <div className="player-bank">
                    {"$" + player.playerBank}
                </div>}
            <div className="player-icon" style={iconStyling}>
                {!props.isDealer ? player.username : "Dealer"}
            </div>
            <div className="player-cards-container">
                {hand && hand.map((c) => {
                    if (gameOutcome !== null && gameOverOutcomes.includes(gameOutcome)) {
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
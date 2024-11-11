import { useEffect, useState } from "react";
import ICard from "../Card/ICard";
import Card from "../Card/Card";

import "./PlayerBox.css";

interface Props {
    userName: string;
    hand: ICard[];
    backgroundColor: string;
    playerTurn: boolean;
}

const PlayerBox = (props: Props) => {
    const [hand, setHand] = useState(props.hand);
    const [iconStyling, setIconStyling] = useState({backgroundColor: props.backgroundColor});

    useEffect(() => {
        setHand(props.hand);
    }, [props.hand]);

    useEffect(() => {
        if (props.playerTurn && props.userName != "Dealer") {
            setTurnStyling('gold');
        } else if (!props.playerTurn && props.userName != "Dealer") {
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
            <div className="player-icon" style={iconStyling}>
                {props.userName}
            </div>
            <div className="player-cards-container">
                {hand && hand.map((c) => {
                    return <Card 
                    key={`${c.color}-${c.suit}-${c.value}`} 
                    value={c.value} 
                    suit={JSON.parse(c.suit)} 
                    color={JSON.parse(c.color)} 
                    blankcard={false}/>
                })}
            </div>
        </div>
    )
}

export default PlayerBox;
import { useEffect, useState } from "react";
import ICard from "../Card/ICard";
import Card from "../Card/Card";

import "./PlayerBox.css";

interface Props {
    userName: string;
    hand: ICard[];
    backgroundColor: string;
}

const PlayerBox = (props: Props) => {
    const [hand, setHand] = useState(props.hand);

    useEffect(() => {
        setHand(props.hand);
    }, [props.hand]);

    const playerIconInLine = {
        backgroundColor: props.backgroundColor
    }

    return (
        <div className="player-box-container">
            <div className="player-icon" style={playerIconInLine}>
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
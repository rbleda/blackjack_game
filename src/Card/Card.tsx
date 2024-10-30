import { CardColor } from "./CardColor"
import { SUIT } from "./Suits"

interface CardProperties {
    value: number | string
    suit: SUIT
    color: CardColor
    blankcard?: boolean
}

const Card = (props: CardProperties) => {
    const drawSuit = (suit : SUIT, color : CardColor) : JSX.Element => {
        switch(suit) {
            case SUIT.CLUB:
                return  <p style={{ fontSize: '50px', color: color}}>♣️</p>
            case SUIT.SPADE:
                return  <p style={{ fontSize: '50px', color: color}}>♠</p>
            case SUIT.HEART:
                return <p style={{ fontSize: '50px', color: color}}>♥️</p>
            case SUIT.DIAMOND:
                return <p style={{ fontSize: '50px', color: color}}>♦️</p>
            default:
                return <p style={{ fontSize: '50px', color: color}}>N/A</p>
        }
    };

    const cardStyle: React.CSSProperties = {
        border: '1px solid black',
        borderRadius: '10px',
        padding: '20px',
        width: '30px',
        height: '60px',
        position: 'relative',
        backgroundColor: 'white', 
        margin: '5px'
    };

    if (props?.blankcard) {
        return (
            <div style={cardStyle}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    ?
                </div>
            </div>
        );
    } else {
        return (
            <div style={cardStyle}>
                <p style={{ position: 'absolute', top: '10px', left: '10px', margin: 0 }}>
                    {props.value}
                </p>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    {drawSuit(props.suit, props.color)}
                </div>
                <p style={{ position: 'absolute', bottom: '10px', right: '10px', margin: 0 }}>
                    {props.value}
                </p>
            </div>
        );
    }
};

export default Card;
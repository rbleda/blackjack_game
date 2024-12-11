import { SUIT } from "./Suits"

interface CardProperties {
    value: number | string
    suit: SUIT
    blankcard?: boolean
}

const Card = (props: CardProperties) => {
    const drawSuit = (suit : SUIT) : JSX.Element => {
        switch (suit) {
            case SUIT.CLUB:
                return <span style={{ fontSize: '50px', color: 'black', lineHeight: '1' }}>♣</span>;
            case SUIT.SPADE:
                return <span style={{ fontSize: '50px', color: 'black', lineHeight: '1' }}>♠</span>;
            case SUIT.HEART:
                return <span style={{ fontSize: '50px', color: 'red', lineHeight: '1' }}>♥</span>;
            case SUIT.DIAMOND:
                return <span style={{ fontSize: '50px', color: 'red', lineHeight: '1' }}>♦</span>;
            default:
                return <span style={{ fontSize: '50px', color: 'grey', lineHeight: '1' }}>N/A</span>;
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

    if (props?.blankcard === true) {
        return (
            <div style={cardStyle}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
                    {drawSuit(props.suit)}
                </div>
                <p style={{ position: 'absolute', bottom: '10px', right: '10px', margin: 0 }}>
                    {props.value}
                </p>
            </div>
        );
    }
};

export default Card;
import "./BetZone.css";

interface BetProps {
    onBetNum: (bet: number) => void;
    playerBet: number;
}

const BetZone = (props: BetProps) => {
    return (
        <div className="bet-zone-container">
            <div className="bet-zone-pot-container">
                <span className="bet-number">{"$" + props.playerBet}</span>
            </div>
            <div className="bet-zone-buttons-container">
                <button className="bet-zone-button" onClick={() => props.onBetNum(5)}>Less</button>
                <button className="bet-zone-button" onClick={() => props.onBetNum(10)}>Bet Min</button>
                <button className="bet-zone-button" onClick={() => props.onBetNum(20)}>More</button>
            </div>
        </div>
    )
}

export default BetZone;
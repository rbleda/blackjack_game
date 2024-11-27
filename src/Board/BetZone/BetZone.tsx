import "./BetZone.css";

interface BetProps {
    onBetNum: (bet: number) => void;
    onSubmitBetAndDeal: () => void;
    playerBet: number;
}

const BetZone = (props: BetProps) => {
    const returnDealOrNoDeal = () => {
        if (props.playerBet === 0 || props.playerBet < 10) {
            return (
                <div className="place-bet-message">Place bet to start game</div>
            )
        }

        return (
            <button className="bet-zone-deal-button" onClick={() => props.onSubmitBetAndDeal()}>Deal</button>
        )
    }

    return (
        <div className="bet-zone-container">
            {returnDealOrNoDeal()}
            <div className="bet-zone-pot-container">
                <span className="bet-number">{"$" + props.playerBet}</span>
            </div>
            <div className="bet-zone-buttons-container">
                <button className="bet-zone-button" onClick={() => props.onBetNum(-10)}>{"<"}</button>
                <button className="bet-zone-button" onClick={() => props.onBetNum(10)}>Bet Min</button>
                <button className="bet-zone-button" onClick={() => props.onBetNum(20)}>{">"}</button>
            </div>
        </div>
    )
}

export default BetZone;
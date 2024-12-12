import { useState } from "react";
import "./BetZone.css";
import MoneyPile from "../MoneyPile/MoneyPile";

interface BetProps {
    isGameInit: boolean;
    onBetNum: (bet: number) => void;
    onSubmitBetAndDeal: () => void;
    playerBet: number;
    canDoubleDown: boolean;
    onDoubleDown: () => void;
}

const BetZone = (props: BetProps) => {
    const [hasDoubledDown, setHasDoubledDown] = useState<boolean>(false);
    const returnDealOrNoDeal = () => {
        if (props.isGameInit) {
            if (props.playerBet === 0 || props.playerBet < 10) {
                return (
                    <div className="place-bet-message">Place bet to start game</div>
                )
            }
    
            return (
                <button className="bet-zone-deal-button" onClick={() => props.onSubmitBetAndDeal()}>Deal</button>
            )
        }

        return null;
    }

    const returnBetZoneButtonsContainer = () => {
        if (props.canDoubleDown && !hasDoubledDown) {
            return (
                <div className="bet-zone-buttons-container">
                <button className="bet-zone-button" onClick={() => clickDoubleDown()}>Double Down</button>
            </div>
            )
        } else if (props.isGameInit) {
            return (
                <div className="bet-zone-buttons-container">
                    <button className="bet-zone-button" onClick={() => props.onBetNum(-10)}>{"<"}</button>
                    <button className="bet-zone-button" onClick={() => props.onBetNum(10)}>Bet Min</button>
                    <button className="bet-zone-button" onClick={() => props.onBetNum(20)}>{">"}</button>
                </div>
            )
        }

        return null;
    }

    const clickDoubleDown = () => {
        if (!hasDoubledDown) {
            props.onDoubleDown();
            setHasDoubledDown(true);
        }
    };

    return (
        <div className="bet-zone-container">
            {returnDealOrNoDeal()}
            <div className="bet-zone-pot-container">
                <span className="bet-number">{"$" + props.playerBet}</span>
                {/* <MoneyPile amount={props.playerBet}/> */}
            </div>
            {returnBetZoneButtonsContainer()}
        </div>
    )
}

export default BetZone;
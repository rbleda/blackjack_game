import { useEffect, useState } from "react";
import "./GameBoard.css";
import { GameOutcome } from "./GameOutcome";
import GamePopup from "./GamePopup/GamePopup";
import BetZone from "./BetZone/BetZone";

interface Props {
    handleHit: any;
    handleStand: any;
    disableButtons: boolean;
    gameOutcome: GameOutcome | null;
    onPlayAgain: () => void;  
    onPlaceBet: (betAmount: number) => void;
    playerBank: number;
    playerBet: number;
}

const GameBoard = (props: Props) => {
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [moneyPot, setMoneyPot] = useState<number>(0);
    
    useEffect(() => {
        if (props.gameOutcome === null) {
            setGameOver(false);
        } else {
            setGameOver(true);
        }
    }, [props.gameOutcome]);

    useEffect(() => {
        if (props.playerBet > 0) {
            setMoneyPot(props.playerBet);
        }
    }, [props.playerBet]);

    const onBetNum = (bet: number) => {
        if (props.playerBank - bet >= 0) {
            const newPotVal = moneyPot + bet;
            setMoneyPot(newPotVal);
        }
    };

    const submitBetAndDeal = () => {
        props.onPlaceBet(moneyPot);
    };

    if (gameOver && props.gameOutcome !== null) {
        return (
            <div className="game-board-table">
                <>
                    <GamePopup 
                        gameOutcome={props.gameOutcome}
                        onPlayAgain={props.onPlayAgain}
                    />
                </>
            </div>
        )
    }

    return (
        <div className="game-board-table">
            <div className="game-board-content-wrapper">
                <div className="game-board-content">
                    <button className="game-board-button" onClick={props.handleHit} disabled={props.disableButtons}>Hit</button>
                    <div className="game-board-title">BLACKJACK</div>
                    <button className="game-board-button" onClick={props.handleStand} disabled={props.disableButtons}>Stand</button>
                </div>
            </div>
            <BetZone onBetNum={onBetNum} playerBet={moneyPot} />
        </div>
    )
}

export default GameBoard;
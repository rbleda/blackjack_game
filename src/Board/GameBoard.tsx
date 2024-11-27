import { useEffect, useState } from "react";
import "./GameBoard.css";
import { GameOutcome } from "./GameOutcome";
import GamePopup from "./GamePopup/GamePopup";
import BetZone from "./BetZone/BetZone";

interface Props {
    handleHit: any;
    handleStand: any;
    disableButtons: boolean;
    hideButtons: boolean;
    gameOutcome: GameOutcome | null;
    onPlayAgain: () => void;
    onPlaceBet: (bet: number) => void;
    onSubmitDeal: () => void;
    playerBank: number;
    playerBet: number;
    canDoubleDown: boolean;
}

const GameBoard = (props: Props) => {
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameIniting, setGameIniting] = useState<boolean>(false);
    const [moneyPot, setMoneyPot] = useState<number>(0);
    
    useEffect(() => {
        if (props.gameOutcome === null) {
            setGameOver(false);
            setGameIniting(false);
        } else if (props.gameOutcome === GameOutcome.GAME_INITIALIZING) {
            setGameIniting(true);
            setGameOver(false);
        } else {
            setGameOver(true);
        }
    }, [props.gameOutcome]);

    useEffect(() => {
        if (props.playerBet >= 0) {
            setMoneyPot(props.playerBet);
        }
    }, [props.playerBet]);

    const onBetNum = (bet: number) => {
        let newMoneyPot = moneyPot;
        if (bet < 0 && moneyPot + bet >= 0) {
            newMoneyPot = moneyPot + bet;
        } else if ((moneyPot + bet) >= 0 && props.playerBank - (moneyPot + bet) >= 0) {
            newMoneyPot = moneyPot + bet;
        }
        setMoneyPot(newMoneyPot);
    };

    const onSubmitAndDeal = () => {
        if (moneyPot > 0) {
            props.onPlaceBet(moneyPot);
            props.onSubmitDeal();
            setGameIniting(false);
        }
    };

    if (gameOver) {
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
                    {!props.hideButtons && <button className="game-board-button" onClick={props.handleHit} disabled={props.disableButtons}>Hit</button>}
                    <div className="game-board-title">BLACKJACK</div>
                    {!props.hideButtons && <button className="game-board-button" onClick={props.handleStand} disabled={props.disableButtons}>Stand</button>}
                </div>
            </div>
            <BetZone 
                isGameInit={gameIniting}
                onBetNum={onBetNum} 
                onSubmitBetAndDeal={onSubmitAndDeal} 
                playerBet={moneyPot}
                canDoubleDown={props.canDoubleDown}
            />
        </div>
    )
}

export default GameBoard;
import { useEffect, useState } from "react";
import "./GameBoard.css";
import { GameOutcome } from "./GameOutcome";
import GamePopup from "./GamePopup/GamePopup";

interface Props {
    handleHit: any;
    handleStand: any;
    disableButtons: boolean;
    gameOutcome: GameOutcome | null;
    onPlayAgain: () => void;  
}

const GameBoard = (props: Props) => {
    const [gameOver, setGameOver] = useState<boolean>(false);
    
    useEffect(() => {
        if (props.gameOutcome === null) {
            setGameOver(false);
        } else {
            setGameOver(true);
        }
    }, [props.gameOutcome]);

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
            <div className="game-board-content">
                <>
                    <button className="game-board-button" onClick={props.handleHit} disabled={props.disableButtons}>Hit</button>
                    <div className="game-board-title">BLACKJACK</div>
                    <button className="game-board-button" onClick={props.handleStand} disabled={props.disableButtons}>Stand</button>
                </>
            </div>
        </div>
    )
}

export default GameBoard;
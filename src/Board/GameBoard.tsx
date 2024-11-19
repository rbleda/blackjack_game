import { useEffect } from "react";
import "./GameBoard.css";
import { GameOutcome } from "./GameOutcome";

interface Props {
    handleHit: any;
    handleStand: any;
    disableButtons: boolean;
    gameOutcome: GameOutcome | null;  
}

const GameBoard = (props: Props) => {
    return (
        <div className="game-board-table">
            <div className="game-board-content">
                {props.gameOutcome === null && 
                <>
                    <button className="game-board-button" onClick={props.handleHit} disabled={props.disableButtons}>Hit</button>
                    <div className="game-board-title">BLACKJACK</div>
                    <button className="game-board-button" onClick={props.handleStand} disabled={props.disableButtons}>Stand</button>
                </>}
                {props.gameOutcome === GameOutcome.PLAYER_BJ &&
                    <>
                        <div className="game-board-title">BLACKJACK BABY!!!</div>
                    </>
                }
                {props.gameOutcome === GameOutcome.PLAYER_WINS &&
                    <>
                        <div className="game-board-title">YOU WIN! WoooHooo</div>
                    </>
                }
                {props.gameOutcome === GameOutcome.PLAYER_LOSES &&
                    <>
                        <div className="game-board-title">SORRY, YOU LOST.</div>
                    </>
                }
            </div>
        </div>
    )
}

export default GameBoard;
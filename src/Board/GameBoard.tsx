import "./GameBoard.css";

interface Props {
    handleHit: any;
    handleStand: any;
    disableButtons: boolean;
}

const GameBoard = (props: Props) => {
    return (
        <div className="game-board-table">
            <div className="game-board-content">
                <button className="game-board-button" onClick={props.handleHit} disabled={props.disableButtons}>Hit</button>
                <div className="game-board-title">BLACKJACK</div>
                <button className="game-board-button" onClick={props.handleStand} disabled={props.disableButtons}>Stand</button>
            </div>
        </div>
    )
}

export default GameBoard;
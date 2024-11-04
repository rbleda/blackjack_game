import "./GameBoard.css";

interface Props {
    handleHit: any;
    handleStand: any;
}

const GameBoard = (props: Props) => {
    return (
        <div className="game-board-table">
            <div className="game-board-content">
                <button className="game-board-button" onClick={props.handleHit}>Hit</button>
                <div className="game-board-title">BLACKJACK</div>
                <button className="game-board-button" onClick={props.handleStand}>Stand</button>
            </div>
        </div>
    )
}

export default GameBoard;
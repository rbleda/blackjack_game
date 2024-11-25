import { useEffect, useState } from "react";
import { GameOutcome } from "../GameOutcome";
import "./GamePopup.css";

interface Props {
    gameOutcome: GameOutcome;
    onPlayAgain: () => void;
}

const GamePopup = (props: Props) => {
    const [popupMessage, setPopupMessage] = useState<string>("");
    const [popupBackgroundColor, setPopupBackgroundColor] = useState<string>("white");

    useEffect(() => {
        if (props.gameOutcome === GameOutcome.PLAYER_BJ) {
            setPopupMessage("BLACKJACK! YOU WIN!");
            setPopupBackgroundColor("rgb(3, 175, 26)");
        } else if (props.gameOutcome === GameOutcome.PLAYER_WINS) {
            setPopupMessage("CONGRATS, YOU WIN!");
            setPopupBackgroundColor("rgb(85, 145, 93)");
        } else if (props.gameOutcome === GameOutcome.PLAYER_LOSES) {
            setPopupMessage("SORRY, YOU LOSE.");
            setPopupBackgroundColor("red");
        } else if (props.gameOutcome === GameOutcome.GAME_TIED) {
            setPopupMessage("NO BLOOD, YOU TIED THE DEALER.");
            setPopupBackgroundColor("white");
        }

    }, [props.gameOutcome]);

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ background: popupBackgroundColor }}>
                <h1>{popupMessage}</h1>
                <button className="button" onClick={props.onPlayAgain}>
                    Play Again
                </button>
            </div>
        </div>
    );
}

export default GamePopup;
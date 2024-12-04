import { useEffect, useState } from "react";
import { GameOutcome } from "../GameOutcome";
import "./GamePopup.css";

interface Props {
    gameOutcome: GameOutcome | null;
    onPlayAgain: () => void;
    playerBank: number;
    playerBet: number;
}

interface IPopupMessage {
    firstLineMoney: string;
    secondLineBank: string;
    moneyColor: string;
}

const GamePopup = (props: Props) => {
    const [popupMessage, setPopupMessage] = useState<string>("");
    const [popupBackgroundColor, setPopupBackgroundColor] = useState<string>("white");
    const [moneyResultMessage, setMoneyResultMessage] = useState<IPopupMessage>({ 
        firstLineMoney: "", 
        secondLineBank: "", 
        moneyColor: "white"
    });

    useEffect(() => {
        const winningMoneyMessage = { 
            firstLineMoney: "+ $" + props.playerBet,
            secondLineBank: "New Bank Value: $" + (props.playerBank + (props.playerBet * 2)),
            moneyColor: "lightGreen"
        }
        const losingMoneyMessage = { 
            firstLineMoney: "- $" + props.playerBet,
            secondLineBank: "New Bank Value: $" + props.playerBank,
            moneyColor: "darkRed"
        }
        const evenMoneyMessage = { 
            firstLineMoney: "+/- $0",
            secondLineBank: "Current Bank Value: $" + (props.playerBank + props.playerBet),
            moneyColor: "black"
        }
        if (props.gameOutcome === GameOutcome.PLAYER_BJ) {
            setPopupMessage("BLACKJACK! YOU WIN!");
            setPopupBackgroundColor("rgb(3, 175, 26)");
            setMoneyResultMessage(winningMoneyMessage);
        } else if (props.gameOutcome === GameOutcome.PLAYER_WINS) {
            setPopupMessage("CONGRATS, YOU WON!");
            setPopupBackgroundColor("rgb(85, 145, 93)");
            setMoneyResultMessage(winningMoneyMessage);
        } else if (props.gameOutcome === GameOutcome.PLAYER_LOSES) {
            setPopupMessage("SORRY, YOU LOST.");
            setPopupBackgroundColor("red");
            setMoneyResultMessage(losingMoneyMessage);
        } else if (props.gameOutcome === GameOutcome.GAME_TIED) {
            setPopupMessage("YOU TIED THE DEALER.");
            setPopupBackgroundColor("lightgrey");
            setMoneyResultMessage(evenMoneyMessage);
        }

    }, [props.gameOutcome]);

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ background: popupBackgroundColor }}>
                <h1>{popupMessage}</h1>
                <h1 style={{ color: moneyResultMessage.moneyColor }}>{moneyResultMessage.firstLineMoney}</h1>
                <h4>{moneyResultMessage.secondLineBank}</h4>
                <button className="button" onClick={props.onPlayAgain}>
                    Play Again
                </button>
            </div>
        </div>
    );
}

export default GamePopup;
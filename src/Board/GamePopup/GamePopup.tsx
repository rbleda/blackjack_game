import { useEffect, useState } from "react";
import { GameOutcome } from "../GameOutcome";
import "./GamePopup.css";
import { refreshEntireGame } from "../../Gameplay/game-play";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
    onPlayAgain: () => void;
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
    const [playerZeroedOut, setPlayerZeroedOut] = useState<boolean>(false);
    const gameOutcome = useSelector((state: RootState) => state.game.gameOutcome);
    const { playerBank, playerBet } = useSelector((state: RootState) => state.player);

    useEffect(() => {
        if (gameOutcome === GameOutcome.PLAYER_LOSES && playerBank === 0) {
            setPlayerZeroedOut(true);
            return;
        }
        const winningMoneyMessage = { 
            firstLineMoney: "+ $" + playerBet,
            secondLineBank: "New Bank Value: $" + (playerBank + (playerBet * 2)),
            moneyColor: "lightGreen"
        }
        const losingMoneyMessage = { 
            firstLineMoney: "- $" + playerBet,
            secondLineBank: "New Bank Value: $" + playerBank,
            moneyColor: "darkRed"
        }
        const evenMoneyMessage = { 
            firstLineMoney: "+/- $0",
            secondLineBank: "Current Bank Value: $" + (playerBank + playerBet),
            moneyColor: "black"
        }
        if (gameOutcome === GameOutcome.PLAYER_BJ) {
            setPopupMessage("BLACKJACK! YOU WIN!");
            setPopupBackgroundColor("rgb(3, 175, 26)");
            setMoneyResultMessage(winningMoneyMessage);
        } else if (gameOutcome === GameOutcome.PLAYER_WINS) {
            setPopupMessage("CONGRATS, YOU WON!");
            setPopupBackgroundColor("rgb(85, 145, 93)");
            setMoneyResultMessage(winningMoneyMessage);
        } else if (gameOutcome === GameOutcome.PLAYER_LOSES) {
            setPopupMessage("SORRY, YOU LOST.");
            setPopupBackgroundColor("red");
            setMoneyResultMessage(losingMoneyMessage);
        } else if (gameOutcome === GameOutcome.GAME_TIED) {
            setPopupMessage("YOU TIED THE DEALER.");
            setPopupBackgroundColor("lightgrey");
            setMoneyResultMessage(evenMoneyMessage);
        }

    }, [gameOutcome, playerBank, playerBet]);

    if (playerZeroedOut) {
        return (
            <div className="modal-overlay">
                <div className="modal-content" style={{ background: "#c70909" }}>
                    <h1>GAME OVER</h1>
                    <h4 style={{ fontStyle: "italic" }}>Blackjack giveth, and blackjack taketh away.</h4>
                    <button className="button" onClick={refreshEntireGame} style={{ margin: "0px"}}>Quit</button>
                </div>
            </div>
        )
    }

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
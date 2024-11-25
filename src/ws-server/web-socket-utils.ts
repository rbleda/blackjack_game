import { GameOutcome } from "../Board/GameOutcome";
import ICard from "../Card/ICard";
import { GameState } from "./WebSocketContext";

export const calculateGameOutcome = (gameState: GameState): GameOutcome => {
    let playerHandScore: number = 0;
    let playerAces: ICard[] = [];
    gameState.player.hand.forEach(card => {
        if (card.value === "A") {
            playerAces.push(card);
        } else if (card.value === "K" || card.value === "Q" || card.value === "J") {
            playerHandScore += 10;
        } else {
            playerHandScore += Number.parseInt(card.value);
        }
    });

    playerAces.forEach(() => {
        if (playerHandScore + 11 <= 21) {
            playerHandScore += 11;
        } else {
            playerHandScore += 1;
        }
    });

    let dealerHandScore: number = 0;
    let dealerAces: ICard[] = [];
    gameState.dealer.hand.forEach(card => {
        if (card.value === "A") {
            dealerAces.push(card);
        } else if (card.value === "K" || card.value === "Q" || card.value === "J") {
            dealerHandScore += 10;
        } else {
            dealerHandScore += Number.parseInt(card.value);
        }
    });

    dealerAces.forEach(() => {
        if (dealerHandScore + 11 <= 21) {
            dealerHandScore += 11;
        } else {
            dealerHandScore += 1;
        }
    });

    if (dealerHandScore === playerHandScore) {
        return GameOutcome.GAME_TIED;
    }

    return dealerHandScore < playerHandScore ? 
        GameOutcome.PLAYER_WINS : GameOutcome.PLAYER_LOSES;
}
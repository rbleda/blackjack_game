import { GameOutcome } from "../Board/GameOutcome";
import { GameState } from "./WebSocketContext";

export const calculateGameOutcome = (gameState: GameState): GameOutcome => {
    let playerHandScore: number = 0;
    gameState.player.hand.forEach(card => {
        if (card.value === "A") {
            playerHandScore += 11;
        } else if (card.value === "K" || card.value === "Q" || card.value === "J") {
            playerHandScore += 10;
        } else {
            playerHandScore += Number.parseInt(card.value);
        }
    });

    let dealerHandScore: number = 0;
    gameState.dealer.hand.forEach(card => {
        if (card.value === "A") {
            dealerHandScore += 11;
        } else if (card.value === "K" || card.value === "Q" || card.value === "J") {
            dealerHandScore += 10;
        } else {
            dealerHandScore += Number.parseInt(card.value);
        }
    });

    if (dealerHandScore === playerHandScore) {
        return GameOutcome.GAME_TIED;
    }

    return dealerHandScore < playerHandScore ? 
        GameOutcome.PLAYER_WINS : GameOutcome.PLAYER_LOSES;
}
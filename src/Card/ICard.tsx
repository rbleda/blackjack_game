import { CardColor } from "./CardColor"
import { SUIT } from "./Suits"

interface ICard {
    value: string | number
    suit: SUIT
    color: CardColor
}

export default ICard
import { CardColor } from "../Card/CardColor";
import { SUIT } from "../Card/Suits";
import ICard from "../Card/ICard";

export const generateShuffledDeck = () : ICard[] => {
    const cardArray : Array<ICard> = [];
    const cards = Array.from(getCards().keys());
    Object.values(CardColor).forEach((color) => {
        Object.values(SUIT).forEach((suit) => {
            cards.forEach((value: string | number) => {
                const theCard = {value, suit, color};
                cardArray.push(theCard);
            });
        })
    });

    return shuffleCards(cardArray);
}

const shuffleCards = (array: ICard[]): ICard[] => {
    const shuffledArray = [...array]; // Make a copy to avoid mutating the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
}

export const getCards = () : Map<string, number> => {
    const cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    const cardValues = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    const theCards = new Map();
    for (let i=0; i < cards.length; i++) {
        theCards.set(cards[i], cardValues[i]);
    }

    return theCards;
}
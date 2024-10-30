import styled from "styled-components";
import ICard from "../Card/ICard";
import Card from "../Card/Card";

interface Props {
    playerName: string;
    playerCards: ICard[];
    dealerCards: ICard[];
    onHit: any;
    onStand: any;
}

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const BlackjackBoard = styled.div`
  background-color: #2e8b57;
  width: 70%;
  height: 350px;
  border-radius: 50%;
  border: 4px solid black;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  &.highlight {
    border: 5px solid gold;
  }
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: absolute;
`;

const DealerCircle = styled(Circle)`
  top: -50px;
`;

const PlayerCircle = styled(Circle)`
  bottom: -50px;
`;


const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 20px;
`;

const GameButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const PlayerCardsContainer = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  bottom: -180px;
`;

const DealerCardsContainer = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  top: -180px;
`;

const Gameboard = (props: Props) => {
    return (
        <BoardContainer>
            <BlackjackBoard>
                <DealerCardsContainer>
                  {props.dealerCards.map((c) => (
                        <Card 
                        key={`${c.color}-${c.suit}-${c.value}`} 
                        value={c.value} 
                        suit={c.suit} 
                        color={c.color} 
                        blankcard={true}/>
                    ))}
                </DealerCardsContainer>
                <DealerCircle>Dealer</DealerCircle>
                <ButtonContainer>
                  <GameButton onClick={props.onHit}>Hit</GameButton>
                  <GameButton onClick={props.onStand}>Stand</GameButton>
                </ButtonContainer>
                <PlayerCircle>{props.playerName}</PlayerCircle>
                <PlayerCardsContainer>
                    {props.playerCards.map((c) => (
                        <Card 
                        key={`${c.color}-${c.suit}-${c.value}`} 
                        value={c.value} 
                        suit={c.suit} 
                        color={c.color} />
                    ))}
                </PlayerCardsContainer>
            </BlackjackBoard>
        </BoardContainer>
    )
}

export default Gameboard
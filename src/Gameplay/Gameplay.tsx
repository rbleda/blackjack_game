import React from 'react';
import { useGameState } from '../ws-server/WebSocketContext';
import Card from '../Card/Card';

const Gameplay: React.FC = () => {
  const { gameState, sendMessage } = useGameState();

  const handleHit = () => {
    sendMessage(JSON.stringify({ action: 'HIT_PLAYER' }));
  };

  const handleStand = () => {
    sendMessage(JSON.stringify({ action: 'STAND_PLAYER' }));
  };

  if (!gameState) return <div style={{fontSize: '10vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>Loading...</div>;

  return (
    <div>
      {gameState && (
        <>
          <h2>Player: {gameState.player.userName}</h2>
          <div>
            {gameState.player.hand.map((c) => (
                        <Card 
                        key={`${c.color}-${c.suit}-${c.value}`} 
                        value={c.value} 
                        suit={JSON.parse(c.suit)} 
                        color={JSON.parse(c.color)} 
                        blankcard={false}/>
            ))}
          </div>
          <h2>Dealer: {gameState.dealer.userName}</h2>
          <div>
            {gameState.dealer.hand.map((c) => (
                        <Card 
                        key={`${c.color}-${c.suit}-${c.value}`} 
                        value={c.value} 
                        suit={JSON.parse(c.suit)} 
                        color={JSON.parse(c.color)} 
                        blankcard={false}/>
            ))}
          </div>
        </>
      )}
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStand}>Stand</button>
    </div>
  );
};

export default Gameplay;
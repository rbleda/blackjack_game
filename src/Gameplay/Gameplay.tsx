import React, { useEffect, useState } from 'react';
import { useGameState } from '../ws-server/WebSocketContext';
import PlayerBox from '../PlayerBox/PlayerBox';
import GameBoard from '../Board/GameBoard';

import "./Gameplay.css";
import ICard from '../Card/ICard';

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
        <div className="game-setup">
          <PlayerBox 
            userName={gameState.dealer.userName} 
            hand={gameState.dealer.hand}
            backgroundColor='red'
          />
          <GameBoard 
            handleHit={handleHit}
            handleStand={handleStand}
          />
          <PlayerBox 
            userName={gameState.player.userName} 
            hand={gameState.player.hand}
            backgroundColor='lightblue'
          />
        </div>
      )}
    </div>
  );
};

export default Gameplay;
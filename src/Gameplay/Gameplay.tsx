import React, { useEffect, useState } from 'react';
import { useGameState } from '../ws-server/WebSocketContext';
import PlayerBox from '../PlayerBox/PlayerBox';
import GameBoard from '../Board/GameBoard';

import ClipLoader from 'react-spinners/ClipLoader';

import "./Gameplay.css";

const Gameplay: React.FC = () => {
  const { gameState, sendMessage } = useGameState();

  const handleHit = () => {
    sendMessage(JSON.stringify({ action: 'HIT_PLAYER' }));
  };

  const handleStand = () => {
    sendMessage(JSON.stringify({ action: 'STAND_PLAYER' }));
  };

  if (!gameState) {
    return (
      <div className="loader-container">
        <ClipLoader color={'#3498db'} size={150} />
        <h2>Establishing connection...</h2>
      </div>
    )
  }

  return (
    <div>
      {gameState && (
        <div className="game-setup">
          <PlayerBox 
            userName={gameState.dealer.userName} 
            hand={gameState.dealer.hand}
            backgroundColor='red'
            playerTurn={gameState.playerTurn}
          />
          <GameBoard 
            handleHit={handleHit}
            handleStand={handleStand}
            disableButtons={!gameState.playerTurn}
          />
          <PlayerBox 
            userName={gameState.player.userName} 
            hand={gameState.player.hand}
            backgroundColor='lightblue'
            playerTurn={gameState.playerTurn}
          />
        </div>
      )}
    </div>
  );
};

export default Gameplay;
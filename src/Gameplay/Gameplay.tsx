import React, { useEffect, useState } from 'react';
import { useGameState } from '../ws-server/WebSocketContext';
import PlayerBox from '../PlayerBox/PlayerBox';
import GameBoard from '../Board/GameBoard';

import ClipLoader from 'react-spinners/ClipLoader';

import "./Gameplay.css";
import WelcomePopup from './WelcomePopup/WelcomePopup';

const Gameplay: React.FC = () => {
  const { gameState, sendMessage, gameOutcome } = useGameState();
  const [ playerUserName, setPlayerUserName ] = useState<string | undefined>();

  const handleHit = () => {
    sendMessage(JSON.stringify({ action: 'HIT_PLAYER' }));
  };

  const handleStand = () => {
    sendMessage(JSON.stringify({ action: 'STAND_PLAYER' }));
  };

  const handleNewGame = () => {
    sendMessage(JSON.stringify({ action: 'RESTART_GAME' }))
  };

  const handleStartGame = (playerUN: string) => {
    sendMessage(JSON.stringify({ action: 'START_GAME', payload: {userName: playerUN} }))
  };

  const submitUsernameFunc = (username: string) => {
    setPlayerUserName(username);
    handleStartGame(username);
  };

  if (!gameState && !playerUserName) {
    return (
      <div>
        <WelcomePopup onSubmitUsername={submitUsernameFunc}/>
      </div>
    )
  }

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
            gameOutcome={gameOutcome}
            onPlayAgain={handleNewGame}
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
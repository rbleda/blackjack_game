import React, { useEffect, useState } from 'react';
import { useGameState } from '../ws-server/WebSocketContext';
import PlayerBox from '../PlayerBox/PlayerBox';
import GameBoard from '../Board/GameBoard';

import ClipLoader from 'react-spinners/ClipLoader';

import "./Gameplay.css";
import WelcomePopup from './WelcomePopup/WelcomePopup';
import { GameOutcome } from '../Board/GameOutcome';

const Gameplay: React.FC = () => {
  const { gameState, sendMessage, gameOutcome } = useGameState();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isGameSpinning, setIsGameSpinning] = useState<boolean>(false);

  const handleHit = () => {
    sendMessage(JSON.stringify({ action: 'HIT_PLAYER' }));
  };

  const handleStand = () => {
    sendMessage(JSON.stringify({ action: 'STAND_PLAYER' }));
  };

  const handleNewGame = () => {
    if (gameOutcome === GameOutcome.PLAYER_BJ || gameOutcome === GameOutcome.PLAYER_WINS)  {
      sendMessage(JSON.stringify({ action: 'PAY_PLAYER_POT' }));
    } else if (gameOutcome === GameOutcome.PLAYER_LOSES) {
      sendMessage(JSON.stringify({ action: 'REMOVE_POT' }));
    } else if (gameOutcome === GameOutcome.GAME_TIED ) {
      sendMessage(JSON.stringify({ action: 'RETURN_PLAYER_BET' }));
    }

    setIsGameSpinning(true);
    setTimeout(() => {
      sendMessage(JSON.stringify({ action: 'NEW_ROUND' }));
      setIsGameSpinning(false);
    }, 1000);
  };

  const handleInitGame = (playerUN: string) => {
    sendMessage(JSON.stringify({ action: 'INIT_GAME', payload: {userName: playerUN} }));
  };

  const handlePlaceBet = (betAmount: number) => {
    sendMessage(JSON.stringify({ action: 'PLACE_BET', payload: {amount: betAmount} }));
  };

  const handleDealRound = () => {
    sendMessage(JSON.stringify({ action: 'DEAL_ROUND' }));
  };

  const handleDoubleDown = () => {
    sendMessage(JSON.stringify({ action: 'DOUBLE_DOWN' }));
  }

  const submitUsernameFunc = (username: string) => {
    handleInitGame(username);
    setGameStarted(true);
  };


  if (!gameStarted) {
    return (
      <div>
        <WelcomePopup onSubmitUsername={submitUsernameFunc}/>
      </div>
    )
  }

  if (!gameState || isGameSpinning) {
    // Need to add functionality here with Spinner class
    // So that the message and color and stuff are different, based on what is happening
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
            hideButtons={gameState.player.hand.length === 0}
            gameOutcome={gameOutcome}
            onPlayAgain={handleNewGame}
            onPlaceBet={handlePlaceBet}
            onSubmitDeal={handleDealRound}
            onDoubleDown={handleDoubleDown}
            playerBank={gameState.playerBank}
            playerBet={gameState.playerBet}
            canDoubleDown={gameState.canDoubleDown}
          />
          <PlayerBox 
            userName={gameState.player.userName} 
            hand={gameState.player.hand}
            backgroundColor='lightblue'
            playerTurn={gameState.playerTurn}
            playerBank={gameState.playerBank}
          />
        </div>
      )}
    </div>
  );
};

export default Gameplay;
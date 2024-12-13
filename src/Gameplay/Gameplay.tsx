import React, { useState } from 'react';
import { useGameState } from '../ws-server/WebSocketContext';
import PlayerBox from '../PlayerBox/PlayerBox';
import GameBoard from '../Board/GameBoard';

import "./Gameplay.css";
import WelcomePopup from './WelcomePopup/WelcomePopup';
import { GameOutcome } from '../Board/GameOutcome';
import Spinner from '../UI/Spinner';
import { IconColor } from './WelcomePopup/IconColor/IconColor';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Gameplay: React.FC = () => {
  const { gameState, sendMessage } = useGameState();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isGameSpinning, setIsGameSpinning] = useState<boolean>(false);
  const [playerIconColor, setPlayerIconColor] = useState<IconColor>(IconColor.BLUE);
  const gameOutcome = useSelector((state: RootState) => state.game.gameOutcome);

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
        <WelcomePopup onSubmitUsername={submitUsernameFunc} setPlayerIconColor={setPlayerIconColor}/>
      </div>
    )
  }

  if (!gameState) {
    const message = "Establishing connection...";
    return (
      <div>
        <Spinner message={message}/>
      </div>
    )
  } else if (isGameSpinning) {
    const message = "Setting Up New Round...";
    const color = "gold";
    return (
      <div>
        <Spinner 
          message={message}
          color={color}
        />
      </div>
    )
  }

  return (
    <div>
      {gameState && (
        <div className="game-setup">
          <PlayerBox 
            hand={gameState.dealer.hand}
            playerTurn={gameState.playerTurn}
            isDealer={true}
          />
          <GameBoard 
            handleHit={handleHit}
            handleStand={handleStand}
            disableButtons={!gameState.playerTurn}
            hideButtons={gameState.player.hand.length === 0}
            onPlayAgain={handleNewGame}
            onPlaceBet={handlePlaceBet}
            onSubmitDeal={handleDealRound}
            onDoubleDown={handleDoubleDown}
            canDoubleDown={gameState.canDoubleDown}
          />
          <PlayerBox 
            hand={gameState.player.hand}
            backgroundColor={playerIconColor}
            playerTurn={gameState.playerTurn}
            isDealer={false}
          />
        </div>
      )}
    </div>
  );
};

export default Gameplay;
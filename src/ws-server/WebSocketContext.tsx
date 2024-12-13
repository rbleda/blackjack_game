import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import ICard from "../Card/ICard";
import { GameResult } from "../Board/GameResult";
import { GameOutcome } from "../Board/GameOutcome";
import { calculateGameOutcome } from "./web-socket-utils";
import { useDispatch } from "react-redux";
import { setGameOutcome, setPlayerBank, setPlayerBet } from "../redux/store";


export interface GameState {
    player: {
      userName: string;
      hand: ICard[];
    };
    dealer: {
      userName: string;
      hand: ICard[];
    };
    playerTurn: boolean;
    playerBank: number;
    playerBet: number;
    canDoubleDown: boolean;
}

interface WebSocketContextType {
    gameState: GameState | null;
    sendMessage: (message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const dispatch = useDispatch();

    // Utility function to create a delay (promisified setTimeout)
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
    useEffect(() => {
      trySocketConnection();
    }, []);

    useEffect(() => {
      if (socket != null){
        setSocketRoutines();
      }
    }, [socket]);

    function setSocketRoutines() {
      if (socket !== null) {
        socket.onmessage = async (event) => {
          const { type, state } = JSON.parse(event.data);
          const decodedGameState: GameState = await JSON.parse(state);
          setGameState(decodedGameState);
          switch (type) {
            case GameResult.INITIAL:
              dispatch(setGameOutcome(GameOutcome.GAME_INITIALIZING));
              break;
            case GameResult.NORMAL:
              dispatch(setGameOutcome(null));
              break;
            case GameResult.FINAL:
              dispatch(setGameOutcome(calculateGameOutcome(decodedGameState)));
              break;
            case GameResult.PLAYER_BJ:
              dispatch(setGameOutcome(GameOutcome.PLAYER_BJ));
              break;
            case GameResult.PLAYER_BUST:
              dispatch(setGameOutcome(GameOutcome.PLAYER_LOSES));
              break;
            case GameResult.DEALER_BJ:
              dispatch(setGameOutcome(GameOutcome.PLAYER_LOSES));
              break;
            case GameResult.DEALER_BUST:
              dispatch(setGameOutcome(GameOutcome.PLAYER_WINS));
              break;
            default:
              break;
          }
        };

        if (gameState?.playerBank && gameState?.playerBet) {
          dispatch(setPlayerBank(gameState.playerBank));
          dispatch(setPlayerBet(gameState.playerBet));
        }
      }
    }

    const trySocketConnection = async () => {
      try {
        const ws = new WebSocket('ws://localhost:7070');

        ws.onopen = () => {
          console.log('Connected to WebSocket');
          setSocket(ws); // Save the WebSocket instance when connected
        };

        ws.onerror = (error) => {
          console.error('WebSocket error', error);
          ws.close(); // Make sure to close the socket if there's an error
        };

        ws.onclose = async () => {
          console.log('WebSocket connection closed, retrying in 2 seconds...');
          await delay(2000); // Wait for 2 seconds before retrying
          trySocketConnection(); // Retry connection
        };
    
      } catch (e) {
        // This block won't catch WebSocket connection errors
        console.log('Unexpected error occurred', e);
      }
    };
    
  
    const sendMessage = useCallback(
      (message: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(message);
        } else {
          console.warn('WebSocket is not open');
        }
      },
      [socket]
    );
  
    return (
      <WebSocketContext.Provider value={{ gameState, sendMessage }}>
        {children}
      </WebSocketContext.Provider>
    );
  };
  
  export const useGameState = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
      throw new Error('useGameState must be used within a WebSocketProvider');
    }
    return context;
  };
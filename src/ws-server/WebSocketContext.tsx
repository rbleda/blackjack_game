import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import ICard from "../Card/ICard";
import { GameResult } from "../Board/GameResult";
import { GameOutcome } from "../Board/GameOutcome";
import { calculateGameOutcome } from "./web-socket-utils";


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
}

interface WebSocketContextType {
    gameState: GameState | null;
    sendMessage: (message: string) => void;
    gameOutcome: GameOutcome | null; 
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [finalGameState, setFinalGameState] = useState<boolean>(false);
    const [gameOutcome, setGameOutcome] = useState<GameOutcome | null>(null);

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

    useEffect(() => {
      if (finalGameState && gameState != null) {

      }
    }, [finalGameState])

    function setSocketRoutines() {
      if (socket !== null) {
        socket.onmessage = async (event) => {
          const { type, state } = JSON.parse(event.data);
          const decodedGameState: GameState = await JSON.parse(state);
          setGameState(decodedGameState);
          switch (type) {
            case GameResult.NORMAL:
              console.log("New game state:", decodedGameState);
              break;
            case GameResult.FINAL:
              // Do something I don't know
              console.log("New final game state:", decodedGameState);
              setGameOutcome(calculateGameOutcome(decodedGameState));
              break;
            case GameResult.PLAYER_BJ:
              setGameOutcome(GameOutcome.PLAYER_BJ);
              break;
            case GameResult.PLAYER_BUST:
              setGameOutcome(GameOutcome.PLAYER_LOSES);
              break;
            case GameResult.DEALER_BJ:
              setGameOutcome(GameOutcome.PLAYER_LOSES);
              break;
            case GameResult.DEALER_BUST:
              setGameOutcome(GameOutcome.PLAYER_WINS);
              break;
            default:
              break;
          }
        };
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
      <WebSocketContext.Provider value={{ gameState, sendMessage, gameOutcome }}>
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
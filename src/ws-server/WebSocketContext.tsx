import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import ICard from "../Card/ICard";


interface GameState {
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
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
  
    useEffect(() => {
      const ws = new WebSocket('ws://localhost:7070');
      setSocket(ws);
  
      ws.onopen = () => console.log('Connected to WebSocket');
  
      ws.onmessage = (event) => {
        const { type, state } = JSON.parse(event.data);
        if (type === 'INITIAL_STATE' || type === 'UPDATED_GAME') {
          setGameState(JSON.parse(state));
        }
      };
  
      ws.onclose = () => console.log('WebSocket connection closed');
  
      return () => {
        ws.close();
      };
    }, []);
  
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
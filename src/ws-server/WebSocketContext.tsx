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
        socket.onmessage = (event) => {
          const { type, state } = JSON.parse(event.data);
          if (type === 'GAME_STATE') {
            console.log("New game state:", JSON.parse(state));
            setGameState(JSON.parse(state));
          } else if (type === 'FINAL_STATE') {
            // Do something I don't know
            console.log("New final game state:", JSON.parse(state));
            setGameState(JSON.parse(state));
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
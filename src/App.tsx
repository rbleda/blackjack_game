import Gameplay from './Gameplay/Gameplay';
import { WebSocketProvider } from './ws-server/WebSocketContext';

function App() {
  
  return (
    <WebSocketProvider>
      <Gameplay/>
    </WebSocketProvider>
  );
}

export default App;

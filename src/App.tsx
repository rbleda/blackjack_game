import { Provider } from 'react-redux';
import Gameplay from './Gameplay/Gameplay';
import { WebSocketProvider } from './ws-server/WebSocketContext';
import store from './redux/store';

function App() {
  
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <Gameplay/>
      </WebSocketProvider>
    </Provider>
  );
}

export default App;

import { configureStore, createSlice } from '@reduxjs/toolkit';
import { GameOutcome } from '../Board/GameOutcome';

// Define the initial state
const initialPlayerState = {
  username: '',
  playerBet: 0,
  playerBank: 100,
};

const initialGameOutcome = {
    gameOutcome: null,
};

// Create a slice
const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayerState,
  reducers: {
    setPlayerUsername: (state, action) => {
        state.username = action.payload;
    },
    setPlayerBet: (state, action) => {
      state.playerBet = action.payload;
    },
    setPlayerBank: (state, action) => {
      state.playerBank = action.payload;
    },
  },
});

const gameSlice = createSlice({
    name: 'game',
    initialState: initialGameOutcome,
    reducers: {
        setGameOutcome: (state, action) => {
            state.gameOutcome = action.payload
        },
    }
})

// Export the actions
export const { setPlayerUsername, setPlayerBet, setPlayerBank } = playerSlice.actions;
export const { setGameOutcome } = gameSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    game: gameSlice.reducer,
  },
});

// Export the store and types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
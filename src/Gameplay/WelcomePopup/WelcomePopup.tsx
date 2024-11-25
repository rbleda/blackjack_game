import { useState } from "react";
import "./WelcomePopup.css";

interface WelcomePopupProps {
    onSubmitUsername: (username: string) => void;
}

const WelcomePopup = (props: WelcomePopupProps) => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    };
  
    const handleSubmit = () => {
      if (username.trim()) {
        props.onSubmitUsername(username);
      }
    };
  
    return (
      <div className="modal-background">
        <div className="modal-container">
          <h1 className="modal-title">Welcome to Blackjack</h1>
          <input
            type="text"
            className="modal-input"
            placeholder="Enter Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <button className="modal-button" onClick={handleSubmit}>
            Start Game
          </button>
        </div>
      </div>
    );
};

export default WelcomePopup;
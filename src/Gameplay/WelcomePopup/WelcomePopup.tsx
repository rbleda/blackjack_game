import { useState } from "react";
import "./WelcomePopup.css";
import IconColorList from "./IconColor/IconColorList";
import { useDispatch } from "react-redux";
import { setPlayerUsername } from "../../redux/store";

interface WelcomePopupProps {
    onSubmitUsername: (username: string) => void;
    setPlayerIconColor: any;
}

const WelcomePopup = (props: WelcomePopupProps) => {
    const [username, setUsername] = useState('');
    const [reminderMessage, setReminderMessage] = useState('');
    const dispatch = useDispatch();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    };
  
    const handleSubmit = () => {
      if (username.trim()) {
        dispatch(setPlayerUsername(username));
        props.onSubmitUsername(username);
      } else {
        setReminderMessage("Enter a username to begin");
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
          <IconColorList setPlayerIconColor={props.setPlayerIconColor}/>
          {!username && (
            <div className="reminder-message">{reminderMessage}</div>
          )}
          <button className="modal-button" onClick={handleSubmit}>
            Start Game
          </button>
        </div>
      </div>
    );
};

export default WelcomePopup;
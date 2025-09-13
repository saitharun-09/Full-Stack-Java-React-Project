import reactLogo from './assets/react.svg';
import image from './assets/images.png';

function ChatMsg({message, sender}) {
    let className = sender === 'user' ? "user-Msg" : "bot-Msg";
    if (sender === "display") className = "display-Msg";
        return(
            <div className={className} >
                {sender === 'robot' && <img className="botProfile" src={reactLogo} alt="React Logo"/>}
                <div className="messageText">
                    {message}   
                </div>
                {sender === 'user' && <img className="userProfile" src={image} alt="Profile"/>}
            </div>
        )
}
export default ChatMsg;
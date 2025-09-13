import React from "react";
import ChatMsg from "./ChatMsg";
import chatbot from "./downloadedBot";
import Loading from './assets/loading.gif';

function ChatBot() {

    //const [chatMsg, setChatMsg] = React.useState([])
    const [inputValue, setInputValue] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [chatMsg, setChatMsg] = React.useState(() => {
        const saved = localStorage.getItem("chatMessages");
        return saved ? JSON.parse(saved) : [];
    });

    React.useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(chatMsg));
    }, [chatMsg]);

    const chatMsgsRef = React.useRef(null);

    React.useEffect(() => {
        if (chatMsgsRef.current){
            chatMsgsRef.current.scrollTop = chatMsgsRef.current.scrollHeight;
        }
    }, [chatMsg]);

    React.useEffect(() => {
        if (chatMsg.length === 0) {
            const welcomeTimeout = setTimeout(() => {
                setChatMsg([
                    { sender: "display", message: "Welcome to the ChatBot!", id: crypto.randomUUID() }
                ]);
                const botTimeout = setTimeout(() => {
                    setChatMsg([
                        { sender: "display", message: "Welcome to the ChatBot!", id: crypto.randomUUID() },
                        { sender: "robot", message: "Hello, How can I assist you?", id: crypto.randomUUID() }
                    ]);
                }, 500);
                return () => clearTimeout(botTimeout);
            }, 0);
            return () => clearTimeout(welcomeTimeout);
        }
    }, [chatMsg]);

    function saveInputText(event){
        setInputValue(event.target.value)
    } 
    
    async function sendMsg() {
        if (!inputValue.trim() || loading) return;
        setLoading(true);
        const newUserMsg = [...chatMsg, {sender:"user", message:inputValue, id:crypto.randomUUID()}];
        setChatMsg([...newUserMsg, {sender:"robot", 
                                    message: <img className="loadinGif" src={Loading} alt="Loading..."/>, 
                                    id:crypto.randomUUID()}]);
        setInputValue('');

        await new Promise(resolve => setTimeout(resolve, 500));
        const response = chatbot.getResponse(inputValue);

        setChatMsg([...newUserMsg, {sender:"robot", message:response, id:crypto.randomUUID()}
        ]);
        setLoading(false);

    }

    return (
    <div className="chatBotContainer">
        <div className="messagesContainer" ref={chatMsgsRef}>
            {chatMsg.map((message) => (
                <ChatMsg
                    message={message.message}
                    sender={message.sender}
                    key={message.id}
                />
            ))}
        </div>
        <div className="inputContainer">
            <input
                className="inputField"
                onChange={saveInputText}
                onKeyDown={e => { if (e.key === "Enter") sendMsg(); }}
                type="text"
                placeholder="Type your Question?"
                value={inputValue}
            />
            <button 
                className="sendBtn"
                onClick={sendMsg} 
                disabled={loading}>send</button>
            <button
            className="clearBtn"
            onClick={() => setChatMsg([])}
            >clear</button>
        </div>
    </div>
);
}
export default ChatBot;
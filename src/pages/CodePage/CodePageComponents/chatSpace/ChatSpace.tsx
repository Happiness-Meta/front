import editorStore from "../../../../store/CodePageStore/editorStore";
import styles from "./ChatSpace.module.css";
import SockJS from "sockjs-client";
import Stomp, {Client} from "stompjs";
import userStore from "../../../../store/userStore/userStore";
import {FormEvent, useEffect, useRef, useState} from "react";
import defaultPicture from "/svg/profilePicture.svg";
import profileImageEnum from "../../../../store/userStore/profileImageEnum";
import {ReactComponent as ProfilePicture} from "/svg/profilePicture.svg";
import {ChatMessage} from "../../../../dto/ChatMessage";

interface Message {
    id: number;
    text: string;
    name: string;
    profilepicture: string;
    date: object;
}

const dummyMessage: Message[] = [
    {
        id: 5,
        text: "나는 김수연입니다. ",
        name: "김수연",
        profilepicture: defaultPicture,
        date: new Date(),
    },
    {
        id: 2,
        text: "나는 양재선입니다. ",
        name: "양재선",
        profilepicture: defaultPicture,
        date: new Date(),
    },
    {
        id: 6,
        text: "나는 최윤석입니다. ",
        name: "최윤석",
        profilepicture: defaultPicture,
        date: new Date(),
    },
    {
        id: 4,
        text: "나는 윤창호입니다.",
        name: "윤창호",
        profilepicture: defaultPicture,
        date: new Date(),
    },
    {
        id: 1,
        text: "나는 박준수입니다.",
        name: "박준수",
        profilepicture: defaultPicture,
        date: new Date(),
    },
    {
        id: 3,
        text: "나는 이재현입니다.",
        name: "이재현",
        profilepicture: defaultPicture,
        date: new Date(),
    },
];

function ChatSpace() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [username, setUsername] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const clientRef = useRef<Client | null>(null);

    // const [messages, setMessages] = useState<Message[]>([]);
    // const messagesEndRef = useRef<HTMLDivElement | null>(null);
    // const [inputText, setInputText] = useState("");
    // const { userInfo } = userStore();
    // const userEmail = userInfo?.email;
    // const sender = userInfo?.name;
    // const API_URL = import.meta.env.VITE_API_KEY;
    // const [username, setUsername] = useState<string>('');
    // const [submitted, setSubmitted] = useState<boolean>(false);

    // WebSocket 연결 초기화
    useEffect(() => {
        // if (true) {
            const socket = new SockJS(`http://localhost:8080/ws`);
            const client = Stomp.over(socket);
            client.connect({}, () => {
                console.log("WebSocket에 연결됨");
                client.subscribe("/topic/public", (message) => {
                    //receivedMessage : 서버로부터 수신된 메시지 내용
                    const receivedMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
                client.send("/app/chat.addUser", {}, JSON.stringify({sender: username, type: "JOIN"}));
            });
            clientRef.current = client;
        // }
        // return () => {
        //     clientRef.current?.disconnect(() => console.log("disconnected!"));
        // };
    }, [submitted, username]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username.trim()) {
            setSubmitted(true);
        }
    };

    // const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    //   event.preventDefault();
    //   if (inputText.trim() && clientRef.current) {
    //     const chatMessage = {
    //       sender: username,
    //       content: inputText,
    //       type: "CHAT",
    //     };
    //     clientRef.current.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    //     setInputText("");
    //   }
    // };

    // if (!submitted) {
    //   return (
    //     <div id="username-page">
    //       <div className="username-page-container">
    //         <h1 className="title">닉네임을 입력하세요...</h1>
    //         <form id="usernameForm" name="usernameForm" onSubmit={handleSubmit}>
    //           <div className="form-group">
    //             <input
    //               type="text"
    //               id="name"
    //               placeholder="Username"
    //               autoComplete="off"
    //               className="form-control"
    //               value={username}
    //               onChange={(e) => setUsername(e.target.value)}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <button type="submit" className="accent username-submit">
    //               채팅 시작하기
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   );
    // }

    useEffect(() => {
        const sortedMessages = dummyMessage.sort((a, b) => a.id - b.id);
        setMessages(sortedMessages);
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    //메시지 전송 핸들러 (실제 메시지 전송 로직 구현 전)
    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // 메시지 목록에 새 메시지 추가 (임시)
        setMessages([
            ...messages,
            {
                id: dummyMessage[4].id,
                text: inputText,
                name: dummyMessage[4].name,
                profilepicture: defaultPicture,
                date: new Date(),
            },
        ]);
        setInputText("");
    };

    const {rightSpace} = editorStore();
    return (
        <div className={`${rightSpace ? styles.rightSpaceOn : undefined} ${styles.rightSpace}`}>
            <div className={styles.filesTabSpace}> 채팅</div>
            <div className={` ${styles.chattingSpace} `}></div>
            <div className={styles.chat_room}>
                <div className={styles.messages} ref={messagesEndRef}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.message} ${message.name === "김수연" ? styles.myMessage : ""}`}
                        >
                            <img
                                src={message.profilepicture}
                                alt="Profile"
                                className={`${styles.profilePicture} ${
                                    message.name === "김수연" ? styles.myMessage_ProfilePicture : ""
                                }`}
                            />
                            <div
                                className={`${styles.messageDetail} ${
                                    message.name === "김수연" ? styles.myMessage_Detail : ""
                                }`}
                            >
                                <div className={styles.userName}>{message.name}</div>
                                <div
                                    className={`${styles.chat_bubble} ${
                                        message.name === "김수연" ? styles.myChat_bubble : ""
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <form className={styles.messageForm} onSubmit={sendMessage}>
                    <input
                        type="text"
                        className={styles.messageInput}
                        placeholder="메시지를 입력하세요..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button type="submit" className={styles.sendButton}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatSpace;

import styles from "@/styles/message.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import { IoSend } from "react-icons/io5";
import SockJS from "sockjs-client";
import { over } from "stompjs";

import axios from "axios";

export default function Chat({ token, receiver }) {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    // const [stompClient, setStompClient] = useState(null);

    const ref = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios.get(
                process.env.NEXT_PUBLIC_API_MESSAGE_URL + "chat",
                {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                    params: {senderId:token.id, receiverId: receiver },
                }
            );
            const result2 = await axios.get(
                process.env.NEXT_PUBLIC_API_MESSAGE_URL + "chat",
                {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                    params: {senderId:receiver,receiverId: token.id },
                }
            )
            console.log("messages", result.data);

            const rs = result.data.concat(result2.data);

            setMessages(rs);
        };
        fetch();
    }, [receiver]);

    // useEffect(() => {
            let Sock = new SockJS("http://localhost:8080/ws");
            // let stompClient = setStompClient(over(Sock));
            let stompClient = over(Sock);

            stompClient?.connect({}, onConnected, onError);

            function onConnected() {
                stompClient.subscribe(
                    "/user/" + token.name + "/message",
                    onMessageReceive
                );
                console.log("Connected");
            }

            function onError(error) {
                console.error("WebSocket error:", error);
            }

            function onMessageReceive(message) {
                let lst = [...messages];
                lst.push(JSON.parse(message.body));
                setMessages(lst);
                console.log("Received message:", messages);            }
        // }, []);

    function handleSendClick(){

        const data = {
            contents: content,
            senderId: token.id,
            receiverId: receiver
        }

        ref.current.value = "";
        stompClient.send("/app/receive-message", {}, JSON.stringify(data));
        console.log("sent clicked")
    }

    

    return (

            <div className={styles.mainChatLayout}>
                <div className={styles.chatLayout}>
                    {messages.map((mess) => 
                    <>
                            <div>{mess.senderName}</div>
                            <div>{mess.contents}</div>
                    </>
                    )}
                </div>
                <div className={styles.text}>
                    <input
                        className={styles.input}
                        ref={ref}
                        placeholder="Write a message"
                        onChange={(e) => setContent(e.target.value)}></input>

                    <div onClick={handleSendClick}>
                        <IoSend className={styles.sendIcon} size={24} />
                    </div>
                </div>
            </div>
    
    );
}

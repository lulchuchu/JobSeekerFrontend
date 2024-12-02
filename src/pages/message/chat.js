import styles from "@/styles/message.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import { IoSend } from "react-icons/io5";
import SockJS from "sockjs-client";
import { over } from "stompjs";

import axios from "axios";

export default function Chat({ token, receiver }) {
    let Sock = new SockJS("http://localhost:8080/ws");
    let stompClient = over(Sock);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const refList = useRef(null);
    // const [stompClient, setStompClient] = useState(null);

    const ref = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios.get(
                process.env.NEXT_PUBLIC_API_MESSAGE_URL + "chat",
                {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                    params: { receiverId: receiver },
                }
            );

            setMessages(result.data);
            // setTimeout(() => {
            //     scrollToBottom();
            // }, 100);
        };
        fetch();
    }, [receiver]);

    useEffect(() => {
        // let stompClient = setStompClient(over(Sock));

        stompClient?.connect({}, onConnected, onError);

        function onConnected() {
            stompClient.subscribe(
                "/user/" + token.name + "/message",
                onMessageReceive
            );
        }

        function onError(error) {
            console.error("WebSocket error:", error);
        }

        function onMessageReceive(message) {
            let lst = [...messages, JSON.parse(message.body)];
            // lst.push(JSON.parse(message.body));
            setMessages(lst);
            // scrollToBottom();
        }
        return () => {
            Sock.close();
        };
    }, [messages]);

    function handleSendClick() {
        const data = {
            contents: content,
            senderId: token.id,
            receiverId: receiver,
        };

        setContent('');
        stompClient.send("/app/receive-message", {}, JSON.stringify(data));
        let lst = [...messages];
        lst.push({
            ...data,
            senderName: token.name,
            senderAvatar: token.profilePicture,
        });
        setMessages(lst);
        // scrollToBottom();
    }
    // const scrollToBottom = () => {
    //     const heightScroll = refList.current.scrollHeight;
    //     refList.current?.scrollTo(0, heightScroll);
    // };
    return (
        <div className={styles.mainChatLayout}>
            <div className={styles.chatLayout} ref={refList}>
                {messages.map((mess) => (
                    <>
                        {token.id === mess.senderId ? (
                            <div className={styles.me}>
                                <div style={{background: "#ccffff"}} className={styles.content}>{mess.contents}</div>
                                <img
                                    className={styles.img}
                                    src={
                                        process.env.NEXT_PUBLIC_API_PIC_URL +
                                        mess.senderAvatar
                                    }
                                    width={40}
                                    height={40}></img>
                            </div>
                        ) : (
                            <div className={styles.other}>
                                <img
                                    className={styles.img}
                                    src={
                                        process.env.NEXT_PUBLIC_API_PIC_URL +
                                        mess.senderAvatar
                                    }
                                    width={40}
                                    height={40}></img>
                                <div style={{background: "white"}} className={styles.content}>{mess.contents}</div>
                            </div>
                        )}
                    </>
                ))}
                {/* <div ref={refList}></div> */}
            </div>
            <div className={styles.text}>
                <input
                    className={styles.input}
                    placeholder="Write a message"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}></input>

                <button className={styles.sendButton} onClick={handleSendClick} disabled = {!content}>
                    <IoSend className={styles.sendIcon} size={24} />
                </button>
            </div>
        </div>
    );
}

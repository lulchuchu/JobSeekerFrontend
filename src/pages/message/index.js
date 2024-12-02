import styles from "@/styles/message.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../components/heading";
import Chat from "./chat";

export default function Message() {
    const [token, setToken] = useState(null);
    const [following, setFollowing] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);


    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if(token){
            const fetch = async () => {
                const result = await axios.get(
                    process.env.NEXT_PUBLIC_API_CHAT_URL + "list",
                    {
                        headers: { Authorization: `Bearer ${token.accessToken}` }
                    }
                );
                setFollowing(result.data);
            };
            fetch();

        }
    }, [token]);

    return (
        <div className={styles.all}>
            <Heading />
            <div className={styles.mainLayout}>
                <div className={styles.left}>
                    {following?.map((user) => (
                        <div
                            className={styles.user}
                            onClick={() => setCurrentChat(user.id)}>
                            <img
                                className={styles.img}
                                src={
                                    process.env.NEXT_PUBLIC_API_PIC_URL +
                                    user.profilePicture
                                }
                            />
                            <div>{user.name}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.right}>
                    {currentChat && <Chat token = {token} receiver={currentChat} />}
                </div>
            </div>
        </div>
    );
}

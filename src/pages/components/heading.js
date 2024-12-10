import {useState} from "react";
import {useEffect} from "react";
import Link from "next/link";
import {MdWork} from "react-icons/md";
import {AiFillMessage} from "react-icons/ai";
import {IoMdNotifications} from "react-icons/io";
import {FiLogIn} from "react-icons/fi";
import NavBarIcon from "./navBarIcon";
import styles from "@/styles/heading.module.css";
import axios from "axios";
import SockJS from "sockjs-client";
import {over} from "stompjs";

export default function Heading() {
    const [token, setToken] = useState(null);
    const [notiShow, setnotiShow] = useState(false);
    const [notification, setNotification] = useState([]);
    // const [stompCLient, setStompClient] = useState(null);
    const Sock = new SockJS("http://localhost:8080/ws");
    let stompClient = over(Sock);

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token) {
            // let stompClient = setStompClient(over(Sock));
            stompClient?.connect({}, onConnected, onError);

            function onConnected() {
                stompClient.subscribe(
                    "/user/" + token.name + "/notification",
                    onNotificationReceived
                );
            }

            function onError(error) {
                console.error("WebSocket error:", error);
            }

            function onNotificationReceived(noti) {
                let lst = [...notification];
                lst.push(JSON.parse(noti.body));
                setNotification(lst);
                setnotiShow(true);
                setTimeout(() => setnotiShow(false), 5000);
            }
        }
        return () => {
            Sock.close();
        };
    }, [token]);

    function handleNotificationClick() {
        if (notiShow) {
            setnotiShow(false);
        } else {
            setnotiShow(true);
            const fetchData = async () => {
                const result = await axios.get(
                    "http://localhost:8080/api/notification/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                        params: {
                            userId: token.id,
                        },
                    }
                );
                setNotification(result.data);
            };
            fetchData();
        }
    }

    return (
        <div className={styles.heading}>
            <Link href="/home" className={styles.iconHome}>
                <img
                    alt="home-icon"
                    src="/pics/work.png"
                    width={41}
                    height={41}></img>
            </Link>
            <span className={styles.iconOption}>
                <NavBarIcon
                    url="/job"
                    component={<MdWork size={30}/>}
                    name="Jobs"
                />
                {token && (
                    <NavBarIcon
                        url="/message"
                        component={<AiFillMessage size={30}/>}
                        name="Messages"
                    />
                )}
                {token && (
                    <div className={styles.notiMain}>
                        <div
                            onClick={() => {
                                handleNotificationClick();
                            }}>
                            <NavBarIcon
                                url=""
                                component={<IoMdNotifications size={30}/>}
                                name="Notifications"
                            />
                        </div>

                        {notiShow && ((notification?.length > 0) ? (
                            <div className={styles.noti}>
                                {notification?.map((noti) => (
                                    <div key={noti.id} className={styles.oneNoti}>
                                        {noti.senderAvatar != null ? <img
                                            className={styles.profilePicture}
                                            src={
                                                process.env
                                                    .NEXT_PUBLIC_API_PIC_URL +
                                                noti.senderAvatar
                                            }
                                            width={41}
                                            height={41}
                                        /> : null}
                                        <div>
                                            {noti.message} {noti.postID != null ? noti.postId : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <div className={styles.noti}>None to show</div>)}
                    </div>
                )}
                {token ? (
                    <>
                        <NavBarIcon
                            token={token}
                            url="/user"
                            component={
                                <img
                                    className={styles.profilePicture}
                                    alt="profile-icon"
                                    src={
                                        process.env.NEXT_PUBLIC_API_PIC_URL +
                                        token.profilePicture
                                    }
                                    width={30}
                                    height={30}></img>
                            }
                            name="Profile"
                        />
                    </>
                ) : (
                    <NavBarIcon
                        url="/login"
                        component={<FiLogIn size={30}/>}
                        name="Login"
                    />
                )}
            </span>
        </div>
    );
}

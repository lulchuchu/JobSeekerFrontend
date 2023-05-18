import styles from "@/styles/post.module.css";
import Link from "next/link";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export default function CreatePost({
    token,
    setCreatePostShowing,
    photos,
    files,
}) {
    const userId = token.id;
    const profilePicture = token.profilePicture;
    //Content of post
    const [content, setContent] = useState("");
    //String represent photos name
    const [photosName, setPhotoNames] = useState("");
    //Showing photo status
    const [showingPhoto, setShowingPhoto] = useState(true); // [1

    const [stompClient, setStompClient] = useState(null);

    const ref = useRef(null);

    useEffect(() => {
        if (token) {
            let Sock = new SockJS("http://localhost:8080/ws");
            let stompClient = setStompClient(over(Sock));

            stompClient?.connect({}, onConnected, onError);

            function onConnected() {
                // stompClient.subscribe(
                //     "/user/notification",
                //     onNotificationReceived
                // );
                console.log("Connected");
            }

            function onError(error) {
                console.error("WebSocket error:", error);
            }

            function onNotificationReceived(notification) {
                // Handle the received notification
                console.log("Received notification:", notification.body);
                // You can display the notification or perform any other desired actions
            }
        }
    }, [token]);

    function handleSendClick() {
        //Upload photos
        const fetchData = async () => {
            const result = await axios.post(
                process.env.NEXT_PUBLIC_API_FILE_URL + "upload",
                files,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("token"))
                                .accessToken,
                    },
                }
            );
            console.log("result", result.data);

            // setPhotoNames(result.data);

            const data = {
                content: content,
                images: result.data,
            };

            //Create new Post with photos
            const post = async () => {
                console.log("content in post is " + content);
                const result = await axios.post(
                    process.env.NEXT_PUBLIC_API_POST_URL + "create",
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                    }
                );
                console.log(result.data);

                const postNoti = {
                    message: token.name + " posted a new post",
                    senderId: token.id,
                    senderName: token.name,
                    postId: result.data,
                };

                console.log('postNoti', postNoti)

                stompClient.send(
                    "/app/receive-post-notification",
                    {},
                    JSON.stringify(postNoti)
                );

                alert(result.data);
            };
            ref.current.value = "";
            setShowingPhoto(false);
            post();
        };

        fetchData();

        // console.log("photosName is " + photoNames)

        // const data = {
        //     content: content,
        //     images: photosName,
        // };

        // const post = async () => {
        //     console.log("content in post is " + content);
        //     const result = axios.post(
        //         process.env.NEXT_PUBLIC_API_POST_URL + "create",
        //         data,
        //         { headers: { Authorization: `Bearer ${token.accessToken}` } }
        //     );
        //     console.log(result.data);
        //     alert(result.data);
        // };
        // ref.current.value = "";
        // post();
    }

    console.log("content is " + content);

    return (
        <div className={styles.mainPost}>
            <div className={styles.create}>
                <img
                    className={styles.profilePic}
                    src={process.env.NEXT_PUBLIC_API_PIC_URL + profilePicture}
                    alt={userId}
                    width={41}
                    height={41}
                />
                <input
                    className={styles.input}
                    ref={ref}
                    placeholder="Start a post"
                    onChange={(e) => setContent(e.target.value)}></input>

                <Link href="">
                    <div onClick={handleSendClick}>
                        <IoSend className={styles.sendIcon} size={24} />
                    </div>
                </Link>
            </div>

            <div>
                {showingPhoto &&
                    photos &&
                    photos.map((photo) => (
                        <img src={photo} width={200} height={200} />
                    ))}
            </div>

            <button
                className={styles.button}
                onClick={() => setCreatePostShowing(true)}>
                <div className={styles.box}>
                    <HiOutlinePhotograph size={24} />
                    <p className={styles.buttonText}>Add a photo</p>
                </div>
            </button>
        </div>
    );
}

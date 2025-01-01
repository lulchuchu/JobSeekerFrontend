import axios from "axios";
import {useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import SockJS from "sockjs-client";
import { over } from "stompjs";

import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoSend } from "react-icons/io5";

import styles from "@/styles/post.module.css";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Post({ post }) {
    const [isLiked, setIsLiked] = useState(false);
    const [countLike, setCountLike] = useState(post.likeCount);
    const [countComment, setCountComment] = useState(post.commentCount);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [commentShowing, setCommentShowing] = useState(false);
    const [token, setToken] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    // let stompClient = over(Sock);

    const postId = post.id;
    const imgs = post.images ? post.images.split(",") : null;

    const target = post.user == null ? post.company : post.user;
    const targetUrl =
        post.user == null ? "/company/" + target.id : "/user/" + target.id;


    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token) {
            let Sock = new SockJS("http://localhost:8080/ws");
            let stompClient = setStompClient(over(Sock));
            // setStompClient(over(Sock));
            stompClient?.connect({}, onConnected, onError);

            function onConnected() {
                // stompClient.subscribe(
                //     "/user/notification",
                //     onNotificationReceived
                // );
            }

            function onError(error) {
                console.error("WebSocket error:", error);
            }

            function onNotificationReceived(notification) {
                console.log("Received notification:", notification.body);
            }
        }
        // return () => {
        //     Sock.close();
        // };
    }, [token]);

    useEffect(() => {
        if (token && postId) {
            const isLiked = async () => {
                const res = await axios.get(
                    process.env.NEXT_PUBLIC_API_LIKE_URL + "checkLiked",
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                        params: { postId: postId },
                    }
                );
                setIsLiked(res.data);
            };
            isLiked();
        }
    }, [token, postId]);

    function handleLikeButton() {
        const like = async () => {
            const data = {
                message: token.name + " reacted to your post",
                senderId: token.id,
                senderName: token.name,
                postId: postId,
            };

            stompClient.send(
                "/app/receive-like-notification",
                {},
                JSON.stringify(data)
            );

            const res = await axios.post(
                process.env.NEXT_PUBLIC_API_LIKE_URL +
                    "create?postId=" +
                    postId,
                {},
                { headers: { Authorization: `Bearer ${token.accessToken}` } }
            );
        };
        like();
        isLiked ? setCountLike(countLike - 1) : setCountLike(countLike + 1);
        setIsLiked(!isLiked);
    }

    function showComment() {
        setCommentShowing(true);
        const comment = async () => {
            const result = await axios.get(
                process.env.NEXT_PUBLIC_API_COMMENT_URL + "show",
                {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                    params: { postId: postId },
                }
            );
            setComments(result.data);
        };
        comment();
    }

    function handleCommentButton() {
        if (commentShowing) {
            setCommentShowing(false);
        } else {
            showComment();
        }
    }

    async function handleSendButton() {
        const send = async () => {
            const data = {
                contents: commentContent,
                postId: postId,
            };

            const commentNoti = {
                message: token.name + " commented your post",
                senderId: token.id,
                senderName: token.name,
                postId: postId,
            };

            stompClient.send(
                "/app/receive-like-notification",
                {},
                JSON.stringify(commentNoti)
            );

            await axios.post(
                process.env.NEXT_PUBLIC_API_COMMENT_URL + "post",
                data,
                { headers: { Authorization: `Bearer ${token.accessToken}` } }
            );
            handleCommentButton();
        };
        await send();
        setCommentContent('');
        setCountComment(countComment + 1);
        showComment();
    }

    return (
        <div className={styles.mainPost}>
            <div className={styles.info}>
                <Link href={targetUrl}>
                    <img
                        className={styles.profilePic}
                        src={
                            process.env.NEXT_PUBLIC_API_PIC_URL +
                            target.profilePicture
                        }
                        alt={target.name}
                        width={41}
                        height={41}
                    />
                </Link>
                <div>
                    <h3 className={styles.userName}>{target.name}</h3>
                    <p className={styles.postedDate}>{post.postedDate}</p>
                </div>
            </div>

            <p className={styles.content}>{post.content}</p>
            {imgs?.map((img) => (
                <img
                    src={process.env.NEXT_PUBLIC_API_PIC_URL + img}
                    alt={target.name}
                    width={200}
                    height={200}
                />
            ))}
            <div className={styles.infoReact}>
                <div className={styles.countLike}>{countLike} likes</div>
                <div className={styles.countComment}>
                    {countComment} comments
                </div>
            </div>
            <div className={styles.buttonLayout}>
                <button className={styles.button} onClick={handleLikeButton}>
                    <div className={styles.box}>
                        {isLiked ? (
                            <AiTwotoneLike size={24} color="#1DA1F2" />
                        ) : (
                            <AiOutlineLike size={24} />
                        )}
                        <div className={styles.buttonText}>
                            {isLiked ? "Liked" : "Like"}
                        </div>
                    </div>
                </button>
                <button className={styles.button} onClick={handleCommentButton}>
                    <div className={styles.box}>
                        <MdOutlineInsertComment size={24} />
                        <div className={styles.buttonText}>Comment</div>
                    </div>
                </button>
            </div>
            <div className={styles.commentLayout}>
                {comments && commentShowing
                    ? comments.map((comment) => (
                        <div key = {comment.id} className={styles.comment}>
                              <img
                                  className={styles.commentProfilePic}
                                  src={
                                      process.env.NEXT_PUBLIC_API_PIC_URL +
                                      comment.userProfilePicture
                                  }
                                  alt={comment.userName}
                                  width={41}
                                  height={41}
                              />
                              <div className={styles.commentBody}>
                                  <p className={styles.userName}>
                                      {comment.userName}
                                  </p>
                                  <p className={styles.commentContent}>
                                      {comment.contents}
                                  </p>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
            <div className={styles.create}>
                {token && (
                    <img
                        className={styles.profilePic}
                        src={
                            process.env.NEXT_PUBLIC_API_PIC_URL +
                            token.profilePicture
                        }
                        alt={token.id}
                        width={41}
                        height={41}
                    />
                )}
                <input
                    className={styles.input}
                    value = {commentContent}
                    placeholder="Write a comment"
                    onChange={(e) => setCommentContent(e.target.value)}></input>
                {/*<Link href="">*/}
                    <button className={styles.sendButton} disabled = {!commentContent} onClick={handleSendButton}>
                        <IoSend className={styles.sendIcon} size={24} />
                    </button>
                {/*</Link>*/}
            </div>
        </div>
    );
}

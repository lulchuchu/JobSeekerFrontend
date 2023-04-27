import { useState, useEffect } from "react";
import axios from "axios";

import styles from "@/styles/infocard.module.css";

//Phan tren cua trang ca nhan
export default function InfoCard({
    userDetail,
    isMyself,
    setEdit,
    setUpload,
    setProfilePic
}) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [token, setToken] = useState(null);
    const following_id = userDetail?.id;

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token && following_id) {
            const result = axios
                .get(process.env.NEXT_PUBLIC_API_USER_URL + "checkfollow", {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                    params: { followId: following_id },
                })
                .then((res) => {
                    setIsFollowed(res.data);
                });
        }
    }, [token, following_id]);

    function handleClickFollow() {
        setIsFollowed(!isFollowed);
        const result = axios.post(
            process.env.NEXT_PUBLIC_API_USER_URL +
                "addfollow" +
                "?followId=" +
                following_id,
            {},
            { headers: { Authorization: `Bearer ${token.accessToken}` } }
        ).data;
        console.log(isFollowed ? "unfollowed" : "followed" + " user");
    }

    function handleAddProfile() {
        console.log("add profile clicked");
        setEdit(true);
    }

    function handleUploadFile() {
        console.log("upload file clicked");
        setUpload(true);
    }

    return (
        <div className={styles.infoCard}>
            <img
                className={styles.backGround}
                src={
                    process.env.NEXT_PUBLIC_API_PIC_URL + "background.jpg"
                }></img>
            <img
                className={styles.profilePic}
                src={
                    process.env.NEXT_PUBLIC_API_PIC_URL +
                    userDetail?.profilePicture
                }
                alt={userDetail?.name}
                onClick={() => setProfilePic(true)}
            />
            <div className={styles.mainInfo}>
                <h1>{userDetail?.name}</h1>
                <h2>{userDetail?.email}</h2>
                <p>{userDetail?.shortDescription}</p>
                <p>{userDetail?.address}</p>
            </div>
            <div>
                {isMyself && (
                    <div className={styles.buttonOption}>
                        <button
                            className={styles.button}
                            onClick={handleAddProfile}>
                            Add Profile
                        </button>
                        <button
                            className={styles.button}
                            onClick={handleUploadFile}>
                            Upload CV
                        </button>
                    </div>
                )}
                {!isMyself && (
                    <div className={styles.buttonOption}>
                        <button
                            className={styles.button}
                            onClick={handleClickFollow}>
                            {isFollowed ? "Unfollow" : "Follow"}
                        </button>
                        <button className={styles.button}> More</button>
                    </div>
                )}
            </div>
        </div>
    );
}

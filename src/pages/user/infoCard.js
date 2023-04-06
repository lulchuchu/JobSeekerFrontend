import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

import styles from "@/styles/userpage.module.css"


export default function InfoCard({userDetail, isMyself, img_src}){
    const [isFollowed, setIsFollowed] = useState(false);
    const [token, setToken] = useState(null);

    const following_id = userDetail?.id;

    useEffect(() => {setToken(JSON.parse(localStorage.getItem("token")))}, []);

    useEffect(() => {
        if(token&&following_id){
            const result = axios.get(process.env.NEXT_PUBLIC_API_USER_URL + "checkfollow", 
                {headers: {"Authorization" : `Bearer ${token.accessToken}`} , params: {followId: following_id}})
                .then((res) => {setIsFollowed(res.data)});
        }
    },[token,following_id]);

    function handleClickFollow(){
        setIsFollowed(!isFollowed);
        const result = axios.post(process.env.NEXT_PUBLIC_API_USER_URL + "addfollow" +"?followId=" + following_id,
            {},{headers: {"Authorization" : `Bearer ${token.accessToken}`}},
           ).data;
        console.log(isFollowed ? "unfollowed" : "followed" + " user")
    }

    return(
        <div className={styles.infoCard}>
            <img className={styles.backGround} src = "/pics/background.png"></img>
            <img className = {styles.profilePic} src={img_src} alt={userDetail?.name}/>
            <div className={styles.mainInfo}>
                <h1>{userDetail?.name}</h1>
                <h2>{userDetail?.email}</h2>
                <p>{userDetail?.shortDescription}</p>
                <p>{userDetail?.address}</p>
            </div>
            <div>
                {isMyself&&<div className={styles.buttonOption}>
                    <button className={styles.button}>Add Profile</button>
                    <button className={styles.button}>More</button>
                </div>}
                {!isMyself&&<div className={styles.buttonOption}>
                    <button className={styles.button} onClick={handleClickFollow}>
                        {isFollowed? 'Unfollow':'Follow'}
                    </button>
                    <button className={styles.button}> More</button>
                </div>}
            </div>
        </div>
    )
}
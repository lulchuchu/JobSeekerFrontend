
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styles from '@/styles/home.module.css';

import Post from "./post"
import CreatePost from "./createPost";

export default function Newsfeed(){
    const [token, setToken] = useState(null);
    const [news, setNews] = useState([]);
    
    useEffect(() => {setToken(JSON.parse(localStorage.getItem("token")))}, []);
    useEffect(() => {
        if(token != null){
        const postUrl = process.env.NEXT_PUBLIC_API_POST_URL + "newsfeed";
        console.log("token in newsfeed " + token.accessToken)    
        const resultNewsfeed = axios.get(postUrl, {headers: {"Authorization" : `Bearer ${token.accessToken}`}})
                        .then((res) => setNews(res.data));   
        }
    },[token]);

    if(token){
        console.log(news)
    }

    return(
        <>

            <div className={styles.mainLayout}>
                {token && <CreatePost token={token} />}
                {/* Newsfeed */}
                {token && news.map((post) => <Post key={post.id} post={post} token={token} />)}
            </div>
        </>
    )
}
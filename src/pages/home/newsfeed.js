import Post from "./post"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

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
            <h1>this is newsfeed</h1>
            {token && news.map((post) => <Post key={post.id} post={post} token={token} />)}
        </>
    )
}
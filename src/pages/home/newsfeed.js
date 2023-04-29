import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styles from "@/styles/home.module.css";

import Post from "./post";
import CreatePost from "./createPost";
import UploadFile from "../user/uploadFile";
import UploadPics from "./uploadPics";

export default function Newsfeed() {
    const [token, setToken] = useState(null);
    //Newsfeed data
    const [news, setNews] = useState([]);
    //Photos link to show in post
    const [photos, setPhotos] = useState();
    // String represent photos name
    const [photoNames, setPhotoNames] = useState("");
    //Show popUp upload image
    const [createPostShowing, setCreatePostShowing] = useState(false);
    //File content to send to server
    const [files, setFiles] = useState(null);

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);
    useEffect(() => {
        if (token != null) {
            const postUrl = process.env.NEXT_PUBLIC_API_POST_URL + "newsfeed";
            console.log("token in newsfeed " + token.accessToken);
            const resultNewsfeed = axios
                .get(postUrl, {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                })
                .then((res) => setNews(res.data));
        }
    }, [token]);

    if (token) {
        console.log(news);
    }

    return (
        <>
            {createPostShowing && (
                <UploadPics
                    setUpload={setCreatePostShowing}
                    setPhotos={setPhotos}
                    setFiles={setFiles}
                />
            )}
            <div className={styles.mainLayout}>
                {token && (
                    <CreatePost
                        token={token}
                        setCreatePostShowing={setCreatePostShowing}
                        photos={photos}
                        files={files}
                    />
                )}
                {/* Newsfeed */}
                {token &&
                    news.map((post) => (
                        <Post key={post.id} post={post} token={token} />
                    ))}
            </div>
        </>
    );
}

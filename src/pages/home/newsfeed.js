import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "@/styles/home.module.css";

import Post from "./post";
import CreatePost from "./createPost";
import UploadFile from "../user/uploadFile";
import UploadPics from "./uploadPics";
import { Flex, Radio } from "antd";

const options = [
    { label: 'Post for user', value: 'user' },
    { label: 'Post for company', value: 'company' },
];

export default function Newsfeed() {
    const [token, setToken] = useState(null);
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [photos, setPhotos] = useState();
    const [photoNames, setPhotoNames] = useState("");
    const [createPostShowing, setCreatePostShowing] = useState(false);
    const [files, setFiles] = useState(null);
    const [isUser, setIsUser] = useState(true);
    const observer = useRef();

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token != null) {
            fetchNewsfeed();
        }
    }, [token, page]);

    const fetchNewsfeed = async () => {
        const postUrl = process.env.NEXT_PUBLIC_API_POST_URL + "newsfeed";
        const resultNewsfeed = await axios.get(postUrl, {
            headers: { Authorization: `Bearer ${token.accessToken}` },
            params: { page, size: 10 },
        });
        setNews((prevNews) => [...prevNews, ...resultNewsfeed.data]);
        setHasMore(resultNewsfeed.data.length > 0);
    };

    const lastPostElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    const handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        setIsUser(selectedValue === 'user');
    };

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
                {token && token?.manageCompany ? (
                    <Flex vertical gap="middle">
                        <Radio.Group
                            block
                            options={options}
                            defaultValue="Post for user"
                            optionType="button"
                            buttonStyle="solid"
                            onChange={(e) => handleRadioChange(e)}
                        />
                    </Flex>
                ) : null}
                {token && (
                    <CreatePost
                        token={token}
                        setCreatePostShowing={setCreatePostShowing}
                        photos={photos}
                        files={files}
                        isUser={isUser}
                    />
                )}
                {token &&
                    news.map((post, index) => {
                        if (news.length === index + 1) {
                            return (
                                <div ref={lastPostElementRef} key={post.id}>
                                    <Post post={post} token={token} />
                                </div>
                            );
                        } else {
                            return <Post key={post.id} post={post} token={token} />;
                        }
                    })}
            </div>
        </>
    );
}
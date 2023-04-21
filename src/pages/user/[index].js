import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Heading from "../components/heading";
import Experience from "./experience";
import InfoCard from "./infoCard";
import Info from "./info";
import Post from "../home/post";
import PageButton from "../company/pageButton";
import styles from "@/styles/userpage.module.css";
import SideUser from "./sideUser";

export default function User() {
    const router = useRouter();
    const { index } = router.query;
    const [token, setToken] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [experience, setExperience] = useState([]);
    const [isMyself, setIsMyself] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [following, setFollowing] = useState([]);
    const [showMoreFollow, setShowMoreFollow] = useState(false);

    const itemsPerPage = 2; // number of items to display per page
    const user_id = parseInt(index);
    const post_url = process.env.NEXT_PUBLIC_API_POST_URL + "show";
    const user_url = process.env.NEXT_PUBLIC_API_USER_URL + "details";
    const follow_url = process.env.NEXT_PUBLIC_API_USER_URL + "following";

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    //Set user information
    useEffect(() => {
        if (token && user_id) {
            if (token.id === user_id) {
                setIsMyself(true);
            }
            const resultUser = async () => {
                const resUserDetail = await axios.get(user_url, {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                    params: { userId: user_id },
                });
                setUserDetail(resUserDetail.data);
                setExperience(resUserDetail.data.jobs);
            };
            const resultFollowing = async () => {
                const resFollowing = await axios.get(follow_url, {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                    params: { userId: user_id },
                });
                setFollowing(resFollowing.data);
            };
            resultUser();
            resultFollowing();
            console.log("following", following);
        }
    }, [token, user_id]);

    useEffect(() => {
        if (token && user_id) {
            const fetchPostsByUser = async () => {
                const result = await axios.get(post_url, {
                    params: {
                        userId: user_id,
                        page: currPage - 1,
                        size: itemsPerPage,
                    },
                });
                setPosts(result.data.content);
            };
            fetchPostsByUser();
        }
    }, [token, user_id, currPage]);

    function handleShowPost() {}

    console.log("currPage", currPage);
    return (
        <>
            <Heading />
            <div className={styles.all}>
                <div className={styles.main}>
                    <InfoCard userDetail={userDetail} isMyself={isMyself} />
                    {userDetail != null ? <Info info={userDetail.bio} /> : null}
                    <div className={styles.mainContent}>
                        <div className={styles.text}>
                            <div>User posts</div>
                            <PageButton
                                currPage={currPage}
                                setCurrPage={setCurrPage}
                            />
                        </div>
                        <div className={styles.mainPost}>
                            {posts.map((post) => (
                                <div className={styles.smallPost}>
                                    <Post post={post} key={post.id} />
                                </div>
                            ))}
                        </div>
                        <button
                            className={styles.showAll}
                            onClick={handleShowPost}>
                            Show All Posts
                        </button>
                    </div>
                    <div className={styles.mainContent}>
                        <div className={styles.text}>Experience</div>
                        {experience.map((exp) => (
                            <Experience experience={exp} key={exp.id} />
                        ))}
                    </div>
                </div>
                <div className={styles.side}>
                    <div className={styles.subSide}>
                        <div className={styles.text}>
                            People this person following
                        </div>
                        {(showMoreFollow
                            ? following.slice(0, 10)
                            : following.slice(0, 5)
                        ).map((user) => (
                            <SideUser user={user} />
                        ))}
                        <button
                            className={styles.showAll}
                            onClick={() => setShowMoreFollow(!showMoreFollow)}>
                            {showMoreFollow ? "Show less" : "Show more"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

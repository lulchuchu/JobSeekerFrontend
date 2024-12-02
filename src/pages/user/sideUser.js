import Link from "next/link";
import styles from "@/styles/userpage.module.css";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function SideUser({user}) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [token, setToken] = useState(null);
    const router = useRouter();
    const checkFollowUrl = process.env.NEXT_PUBLIC_API_USER_URL + "checkfollow";
    const addFollowUrl = process.env.NEXT_PUBLIC_API_USER_URL + "addfollow";

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        const resultCheckFollow = async () => {
            const resCheckFollow = await axios.get(checkFollowUrl, {
                headers: {Authorization: `Bearer ${token.accessToken}`},
                params: {followId: user.id},
            });
            setIsFollowing(resCheckFollow.data);
        };
        token && resultCheckFollow();
    }, [token, user]);

    function handleFollowClick() {
        const result = axios.post(
            addFollowUrl + "?followId=" + user.id,
            {},
            {headers: {Authorization: `Bearer ${token.accessToken}`}}
        );
        setIsFollowing(!isFollowing);
    }

    return (
        <div className={styles.sideInfo}>
            <Link href={"/user/" + user.id}>
                <img
                    src={
                        process.env.NEXT_PUBLIC_API_PIC_URL +
                        user.profilePicture
                    }
                    alt={user.name}
                    className={styles.smallProfilePic}
                    width={50}
                    height={50}
                />
            </Link>

            <div className={styles.info}>
                <Link href={"/user/" + user.id}>
                    <h3>{user.name}</h3>
                </Link>
                <p>{user.email}</p>
                <p>{user.shortDescription}</p>
                <button className={styles.button} onClick={handleFollowClick}>
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>
        </div>
    );
}

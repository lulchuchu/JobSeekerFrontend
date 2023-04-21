import Link from "next/link";
import styles from "@/styles/userpage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SideCom({ company}) {

    const [isFollowing, setIsFollowing] = useState(false);
    const [token, setToken] = useState(null);
    
    const checkFollowUrl = process.env.NEXT_PUBLIC_API_COMPANY_URL + "checkFollow";
    const addFollowUrl = process.env.NEXT_PUBLIC_API_COMPANY_URL + "addFollow";
    
    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        const resultCheckFollow = async () => {
            const resCheckFollow = await axios.get(checkFollowUrl, {
                headers: { Authorization: `Bearer ${token.accessToken}` },
                params: { companyId: company.id }
            })
            setIsFollowing(resCheckFollow.data);
        }
        token&&resultCheckFollow();
    }, [token, company])

    function handleFollowClick(){
        const result = axios.post(addFollowUrl + "?companyId=" + company.id,{}, {headers: { Authorization: `Bearer ${token.accessToken}`} })
        setIsFollowing(!isFollowing);
    }

    return (
        <div className = {styles.sideInfo}>
            <Link href={"/company/" + company.id}>
                <img
                    src={
                        process.env.NEXT_PUBLIC_API_PIC_URL +
                        company.profilePicture
                    }
                    alt={company.name}
                    className={styles.smallProfilePic}
                />
            </Link>

            <div className={styles.info}>
                <Link href={"/company/" + company.id}>
                    <h3>{company.name}</h3>
                </Link>
                <p>{company.email}</p>
                <p>{company.shortDescription}</p>
                <button className = {styles.button} onClick={handleFollowClick}>{isFollowing?'Unfollow':'Follow'}</button>
            </div>
        </div>
    );
}

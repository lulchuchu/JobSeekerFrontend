import styles from "@/styles/infocard.module.css";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";

export default function InfoCard({company, setAddJobShowing}) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [token, setToken] = useState(null);
    const router = useRouter();
    const following_id = company?.id;

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token && following_id) {
            const result = axios
                .get(process.env.NEXT_PUBLIC_API_COMPANY_URL + "checkFollow", {
                    headers: {Authorization: `Bearer ${token.accessToken}`}, params: {companyId: following_id},
                })
                .then((res) => {
                    setIsFollowed(res.data);
                });
        }
    }, [token, following_id]);

    function handleClickFollow() {
        setIsFollowed(!isFollowed);
        const result = axios.post(process.env.NEXT_PUBLIC_API_COMPANY_URL + "addFollow" + "?companyId=" + following_id, {}, {headers: {Authorization: `Bearer ${token.accessToken}`}}).data;
    }

    return (<div className={styles.infoCard}>
            <img className={styles.backGround} src="/pics/background.png"></img>
            <img
                className={styles.profilePic}
                src={process.env.NEXT_PUBLIC_API_PIC_URL + company?.profilePicture}
                alt={company?.name}
            />
            <div className={styles.mainInfo}>
                <h1>{company?.name}</h1>
                <p>{company?.industry}</p>
                <p>{company?.location}</p>
            </div>
            <div>
                <div className={styles.buttonOption}>
                    <button
                        className={styles.button}
                        onClick={handleClickFollow}>
                        {isFollowed ? "Unfollow" : "Follow"}
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => router.push(company.website)}>
                        Visit Website
                    </button>
                    {company?.id === token?.manageCompany && <>
                        <button className={styles.button}
                                onClick={() => router.push("/job/company/all/" + company.id)}>Opening jobs
                        </button>
                        <button className={styles.button}
                                onClick={() => setAddJobShowing(true)}>Add jobs
                        </button>
                    </>}
                </div>
            </div>
        </div>);
}

import Heading from "../components/heading"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import styles from "@/styles/userpage.module.css"
import Experience from "./experience";
import InfoCard from "./infoCard";
import Info from "./info";

export default function User() {

    const router = useRouter()
    const { index } = router.query
    const [token, setToken] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [experience, setExperience] = useState([]);
    const [isMyself, setIsMyself] = useState(false);
    useEffect(() => { setToken(JSON.parse(localStorage.getItem("token"))) }, []);

    //Set user information
    useEffect(() => {
        const user_id = parseInt(index);
        if (token && user_id) {
            if (token.id === user_id) {
                setIsMyself(true);
            }
            console.log("user id is " + { index })
            const user_url = process.env.NEXT_PUBLIC_API_USER_URL + "details";
            const resultUser = axios.get(user_url, { headers: { "Authorization": `Bearer ${token.accessToken}` }, params: { userId: user_id } })
                .then((res) => {

                    console.log("user data", res.data);
                    setUserDetail(res.data);
                    setExperience(res.data.jobs);
                });
        }
    }, [token, index])

    // console.log("experienceee", experience)


    return (
        <>
            <Heading />
            <div className={styles.all}>
                <div className={styles.main}>
                    <InfoCard userDetail={userDetail} isMyself={isMyself} />
                    {/*  */}
                    {userDetail != null ? <Info info={userDetail.bio}/>:null}
                    <div className={styles.mainExp}>
                        <div className={styles.text}>Experience</div>
                        {experience.map(exp => <Experience experience={exp} key={exp.id} />)}
                    </div>
                </div>
                <div className={styles.side}>
                    <div> This is side</div>
                </div>
            </div>

        </>
    )
}
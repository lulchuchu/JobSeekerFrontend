import Heading from "../components/heading"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import styles from "@/styles/userpage.module.css"
import Experience from "./experience";
import InfoCard from "./infoCard";

export default function User(){
    
    const router = useRouter()
    const { index } = router.query
    const [token, setToken] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [experience, setExperience] = useState([]);
    const [isMyself, setIsMyself] = useState(false);
    useEffect(() => {setToken(JSON.parse(localStorage.getItem("token")))}, []);

    const img_src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqX-rwj50x1C9EP3pD_oEFvcUqHX_NHmil7sJZ90&s"

    useEffect(() => {
        const user_id = parseInt(index);
        if(token && user_id){
            if(token.id === user_id){
                setIsMyself(true);
            }
            console.log("user id is " + {index})
            const user_url = process.env.NEXT_PUBLIC_API_USER_URL + "details";
            const resultUser = axios.get(user_url, {headers: {"Authorization" : `Bearer ${token.accessToken}`},params: {userId: user_id}})
                .then((res) => {
                    // setExperience(res.data.jobs)
                    console.log("user data", res.data);
                    setUserDetail(res.data);
                    setExperience(res.data.jobs);
                });    
        }
    }, [token, index])

    return(
        <>
            <Heading token = {token}/>
            <div className={styles.all}>
                <div className={styles.main}>
                    <InfoCard userDetail = {userDetail} isMyself = {isMyself} img_src = {img_src}/>
                    {experience.map(exp => {<Experience experience={exp}/>})}
                </div>
                <div className={styles.side}>
                    <div> This is side</div>
                </div>
            </div>
            
        </>
    )
}
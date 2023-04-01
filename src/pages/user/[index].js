import Heading from "../components/heading"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

import Experience from "./experience";

export default function User(){
    
    const router = useRouter()
    const { index } = router.query
    const [token, setToken] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [experience, setExperience] = useState([]);
    useEffect(() => {setToken(JSON.parse(localStorage.getItem("token")))}, []);
    const img_src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqX-rwj50x1C9EP3pD_oEFvcUqHX_NHmil7sJZ90&s"

    useEffect(() => {
        const user_id = parseInt(index);
        if(token && user_id){
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
            {token && 
            <div>
                <div className="top-user-page">
                    <img src={img_src} alt={userDetail?.name}/>
                    <h1>This is user's name {userDetail?.name}</h1>
                    <h2>This is user's email {userDetail?.email}</h2>
                    <p>This is user's bio{userDetail?.bio}</p>
                </div>
                <div className="experience">
                    {experience.map((exp) => <Experience props={exp} key = {exp.id}/>)}
                </div>
            </div>}
        </>
    )
}
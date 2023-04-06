// import cheemspic from './src/pages/pics/cheemspic.png';

import { useState } from "react"
import { useEffect } from "react"
import Link from "next/link"
import {MdWork} from "react-icons/md"
import {AiFillMessage} from "react-icons/ai"
import {BiMessageRoundedDots} from "react-icons/bi"
import {IoMdNotifications} from "react-icons/io"
import {FiLogIn} from "react-icons/fi"
import NavBarIcon from "./navBarIcon"
import styles from '@/styles/heading.module.css'


export default function Heading({tok}){

    const [token, setToken] = useState(null);
    useEffect(() => {setToken(JSON.parse(localStorage.getItem("token")))}, []);
    console.log("token in heading", token);

    return(
        <div className={styles.heading}>
            <Link href = "/home" className={styles.iconHome}>
                <img alt = "home-icon" src = "/pics/cheemspic.png" width={41} height={41}></img>
            </Link>
            <span className={styles.iconOption}>
                <NavBarIcon url = "/job" component = {<MdWork size={24}/>} name = "Jobs"/>    
                {token && <NavBarIcon url = "/message" component = {<AiFillMessage size={24}/>} name = "Messages"/>}
                {token && <NavBarIcon url = "/notification" component = {<IoMdNotifications size={24}/>} name = "Notifications"/>}
                {token ? 
                    <NavBarIcon token = {token} url = "/user" component = {<img alt = "profile-icon" src={process.env.NEXT_PUBLIC_API_PIC_URL+token.profilePicture} width={24} height={24}></img>} name = "Profile"/> : 
                    <NavBarIcon url = "/login" component = {<FiLogIn size={24}/>} name = "Login"/>
                }
            </span>
        </div>
    )
}
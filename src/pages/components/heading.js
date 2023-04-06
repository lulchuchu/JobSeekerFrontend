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
// import { useState } from "react"

export default function Heading({token}){
    // let token = null;
    // if (typeof window !== 'undefined') {
    //     token = JSON.parse(localStorage.getItem("token"));
    // }
    console.log("token in heading", token);

    return(
        <div className={styles.heading}>
            <Link href = "/home" className={styles.iconHome}>
                <img alt = "home-icon" src = "/pics/cheemspic.png" width={41} height={41}></img>
                {/* {console.log("navigate to home")} */}
            </Link>
            <span className={styles.iconOption}>
                <NavBarIcon url = "/job" component = {<MdWork size={24}/>} name = "Jobs"/>    
                {token && <NavBarIcon url = "/message" component = {<AiFillMessage size={24}/>} name = "Messages"/>}
                {token && <NavBarIcon url = "/notification" component = {<IoMdNotifications size={24}/>} name = "Notifications"/>}
                {token ? 
                    <NavBarIcon token = {token} url = "/user" component = {<img alt = "profile-icon" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqX-rwj50x1C9EP3pD_oEFvcUqHX_NHmil7sJZ90&s" width={24} height={24}></img>} name = "Profile"/> : 
                    <NavBarIcon url = "/login" component = {<FiLogIn size={24}/>} name = "Login"/>
                }
            </span>
        </div>
    )
}
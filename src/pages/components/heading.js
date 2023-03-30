// import cheemspic from './src/pages/pics/cheemspic.png';

import { useState } from "react"
import { useEffect } from "react"
import Link from "next/link"
import {MdWork} from "react-icons/md"
import {AiFillMessage} from "react-icons/ai"
import {BiMessageRoundedDots} from "react-icons/bi"
import {IoMdNotifications} from "react-icons/io"
import NavBarIcon from "./navBarIcon"
// import { useState } from "react"

export default function Heading({token}){

    

    console.log("token in heading", token);
    return(
        <div className="nav-bar">
            <Link href = "/home">
                <img alt = "home-icon" src = "pics/cheemspic.png" width={41} height={41}></img>
                {console.log("navigate to home")}
            </Link>
            <NavBarIcon url = "/job" component = {<MdWork/>} name = "Jobs"/>    
            {token && <NavBarIcon url = "/message" component = {<AiFillMessage/>} name = "Messages"/>}
            {token && <NavBarIcon url = "/notification" component = {<IoMdNotifications/>} name = "Notifications"/>}
            {token ? 
                <NavBarIcon url = "/user" component = {<img alt = "profile-icon" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqX-rwj50x1C9EP3pD_oEFvcUqHX_NHmil7sJZ90&s" width={41} height={41}></img>} name = "Profile"/> : 
                <NavBarIcon url = "/login" component = {<BiMessageRoundedDots/>} name = "Login"/>
            }
        </div>
    )
}
import React, { useState } from 'react';
import Link from 'next/link'
import axios from "axios";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router'

export default function login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const router = useRouter()

    const sendInput = async (event) => {
        event.preventDefault();
        const data = {
            "username": username,
            "password": password
        };
        try {
            const loginUrl = process.env.NEXT_PUBLIC_API_LOGIN_URL;
            const resultLogin =  (await axios.post(loginUrl, data)).data
            // console.log("resultLogin",resultLogin)
            setToken(resultLogin.accessToken)
            localStorage.setItem("token", resultLogin.accessToken);
            router.push('/home')
        } catch (error) {
            const responseErr = error.response.data
            alert(responseErr)
        }
    };
    
    return (
        <>
            <div className="layout-login">
                <div className="head-login">
                    <h1>Log In</h1>
                </div>
                <div className="main-login">
                    <form className="form-input">
                        <label id = "username">username</label>
                        <input type="text" id="username" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/><br/>
                        <label id = "password">password</label>
                        <input type="password" id="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/><br/>
                    </form>
                    <form className="form-submit">
                        {/* <Link href={(token.accessToken) ? "/home" : "/login"} state = {(token.accessToken) ? {nameUser: token.name, tokenUser:token.accessToken} : ""}> */}
                            <input type="submit" value="Log In" onClick={sendInput}/>
                        {/* </Link> */}
                    </form>
                </div>
            </div>
        </>    
    )
}
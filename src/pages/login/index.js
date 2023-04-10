import React, { useState } from 'react';
import Link from 'next/link'
import axios from "axios";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router'
import Heading from '../components/heading.js';
import styles from '@/styles/login.module.css'

export default function login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const router = useRouter()

    const sendLogin = async (event) => {
        event.preventDefault();
        const data = {
            "username": username,
            "password": password
        };
        try {
            const loginUrl = process.env.NEXT_PUBLIC_API_LOGIN_URL;
            const resultLogin = (await axios.post(loginUrl, data)).data
            console.log("resultLogin", resultLogin)
            setToken(resultLogin.accessToken)
            localStorage.setItem("token", JSON.stringify(resultLogin));
            // localStorage.setItem("user", resultLogin.name)
            router.push('/home')
        } catch (error) {
            const responseErr = error.response.data
            alert(responseErr)
        }
    };

    const sendRegister = async (event) => {
        event.preventDefault();
        const data = {
            "username": username,
            "password": password
        };
        try {
            const loginUrl = process.env.NEXT_PUBLIC_API_LOGIN_URL;
            const resultLogin = (await axios.post(loginUrl, data)).data
            console.log("resultLogin", resultLogin)
            setToken(resultLogin.accessToken)
            localStorage.setItem("token", JSON.stringify(resultLogin));
            // localStorage.setItem("user", resultLogin.name)
            router.push('/home')
        } catch (error) {
            const responseErr = error.response.data
            alert(responseErr)
        }
    }

    return (
        <>
            <Heading token={token} />
            <div className={styles.main}>
                <div className={styles.layoutLogin}>
                    <div className={styles.formLogin}>
                        <div className={styles.headLogin}>
                            <h1>Welcome</h1>
                        </div>
                        {/* Input form */}
                        <form className="form-input">
                            <div className={styles.form}>
                                <div className={styles.label} id="username">Username or email</div>
                                <input className={styles.input} type="text" id="username" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} /><br />
                            </div>
                            <div className={styles.form}>
                                <div className={styles.label} id="password">Password</div>
                                <input className={styles.input} type="password" id="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
                            </div>
                        </form>

                        {/* Login button */}
                        <form >
                            {/* <Link href={(token.accessToken) ? "/home" : "/login"} state = {(token.accessToken) ? {nameUser: token.name, tokenUser:token.accessToken} : ""}> */}
                            <input className={styles.button} type="submit" value="Log In" onClick={sendLogin} />
                            {/* </Link> */}
                        </form>
                    </div>

                    <div className={styles.or}>or</div>

                    <form >
                        <input className={styles.button} type="submit" value="New? Join now" onClick={sendLogin} />
                    </form>
                </div>

                {/* Picture */}
                <img src="pics/Work_from_home.jpg" width={700} height={700}/>
            </div>

        </>
    )
}
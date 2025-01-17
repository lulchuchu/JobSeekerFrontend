import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Heading from "../components/heading.js";
import styles from "@/styles/login.module.css";

export default function login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
            router.push("/home");
        }
    })

    const sendLogin = async (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password,
        };
        try {
            const loginUrl = process.env.NEXT_PUBLIC_API_LOGIN_URL;
            const resultLogin = (await axios.post(loginUrl, data)).data;
            setToken(resultLogin.accessToken);
            localStorage.setItem("token", JSON.stringify(resultLogin));
            localStorage.setItem("user", resultLogin.name)
            router.push("/home");
        } catch (error) {
            const responseErr = error.response;
            alert(responseErr);
        }
    };

    const sendRegister = async (event) => {
        event.preventDefault();
        router.push('/register')
    };

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
                                <div className={styles.label} id="username">
                                    Username or email
                                </div>
                                <input
                                    className={styles.input}
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                                <br />
                            </div>
                            <div className={styles.form}>
                                <div className={styles.label} id="password">
                                    Password
                                </div>
                                <input
                                    className={styles.input}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <br />
                            </div>
                        </form>

                        {/* Login button */}
                        <form>
                            {/* <Link href={(token.accessToken) ? "/home" : "/login"} state = {(token.accessToken) ? {nameUser: token.name, tokenUser:token.accessToken} : ""}> */}
                            <input
                                className={styles.button}
                                type="submit"
                                value="Log In"
                                onClick={sendLogin}
                            />
                            {/* </Link> */}
                        </form>
                    </div>

                    <div className={styles.or}>or</div>

                    <form>
                        <input
                            className={styles.button}
                            type="submit"
                            value="New? Join now"
                            onClick={sendRegister}
                        />
                    </form>
                </div>

                {/* Picture */}
                <img src="pics/work.svg" width={700} height={700} />
            </div>
        </>
    );
}

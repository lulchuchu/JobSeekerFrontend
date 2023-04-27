import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Heading from "../components/heading";

import styles from "@/styles/register.module.css";
import { useRouter } from "next/router";

export default function login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const sendInput = () => {
        const data = {
            name: name,
            username: username,
            password: password,
            email: email
        }
        axios
            .post("http://localhost:8080/register", data)
            .then((res) => {
                alert("Account created successfully");
                router.push("/login")

            })
            .catch((err) => alert(err));
    };

    return (
        <>
            <Heading />
            <h1 style={{ textAlign: "center" }}>
                Make the most of your professional life
            </h1>
            <div className={styles.mainRegister}>
                <div className="main-login">
                    <form className="form-input">
                        <div className={styles.label}>
                            <div id="email">Email</div>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder={
                                    email ? email : "Fill your email"
                                }
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            <div id="username">Username</div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder={
                                    username
                                        ? username
                                        : "Fill your username"
                                }
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            <div id="password">Password</div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder=""
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            {" "}
                            <div id="name">Name</div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder={
                                    name ? name : "Fill your name"
                                }
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br />
                        </div>

                        <p>{console.log(username)}</p>
                        <p>{console.log(password)}</p>
                    </form>
                    <button onClick={sendInput} className={styles.button}>Register</button>
                </div>
            </div>
        </>
    );
}

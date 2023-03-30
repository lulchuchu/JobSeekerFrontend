import React, { useState } from 'react';
import Link from 'next/link'
import axios from "axios";

export default function login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState("");


    const sendInput = () => {
        const data = {
            "name": name,
            "username": username,
            "password": password,
            "email": email,
            "bio": bio,
            "profilePicture": profilePicture
        };

        axios
            .post('http://localhost:8080/register', data)
            .then(res => setToken(res.data))
            .catch(err => alert("Something wrong"))
    };

    return (
        <>
            <div className="layout-login">
                <div className="head-login">
                    <h1>register</h1>
                </div>
                <div className="main-login">
                    <form className="form-input">
                        <label id="username">username</label>
                        <input type="text" id="username" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} /><br />
                        <label id="password">password</label>
                        <input type="password" id="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
                        <label id="name">name</label>
                        <input type="text" id="name" name="name" placeholder="name" onChange={(e) => setName(e.target.value)} /><br />
                        <label id="email">email</label>
                        <input type="text" id="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
                        <label id="bio">bio</label>
                        <input type="text" id="bio" name="bio" placeholder="bio" onChange={(e) => setBio(e.target.value)} /><br />
                        <label id="profilePicture">profilePicture</label>
                        <input type="text" id="profilePicture" name="profilePicture" placeholder="profilePicture" onChange={(e) => setProfilePicture(e.target.value)} /><br />
                        <p>{console.log(username)}</p>
                        <p>{console.log(password)}</p>
                    </form>
                    <form className="form-submit">
                        <Link href="/login">
                            <input type="submit" value="Register" onClick={sendInput} />
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}
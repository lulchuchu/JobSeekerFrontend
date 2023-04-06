import  Heading  from '../components/heading.js';
import Newsfeed from './newsfeed.js';
import { useState } from "react";
import { useEffect } from "react";

export default function Home(){

    const [token, setToken] = useState(null);
    useEffect(() => {setToken(JSON.parse(localStorage.getItem("token")))}, []);

    return (
        <>
            {/* <h1>{token.accessToken}</h1> */}
            <Heading />
            <h1>This is homepage</h1>
            <Newsfeed />
        </>
    )
}
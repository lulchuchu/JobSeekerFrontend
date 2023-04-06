import  Heading  from '../components/heading.js';
import Newsfeed from './newsfeed.js';
import { useState } from "react";
import { useEffect } from "react";
import styles from '@/styles/home.module.css';

export default function Home(){

    const [token, setToken] = useState(null);
    useEffect(() => {setToken(JSON.parse(localStorage.getItem("token")))}, []);

    return (
        <>
            <Heading />
            <div className={styles.layout}>
                <Newsfeed />

            </div>
        </>
    )
}
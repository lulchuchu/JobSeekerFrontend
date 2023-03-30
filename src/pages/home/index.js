import  Heading  from '../components/heading.js';
import { useEffect } from 'react';

export default function Home(){

    let token = null;
    let user = null;

    if (typeof window !== 'undefined') {
        // Perform localStorage action
        // user = localStorage.getItem("user");
        token = JSON.parse(localStorage.getItem("token"));

      }

    return (
        <>
            <Heading token = {token}/>
            <h1>This is homepage</h1>
        </>
    )
}
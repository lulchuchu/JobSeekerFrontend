import Heading from "../components/heading"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import Jobb from "./job";

export default function Job(){
    const [application, setApplication] = useState([]);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_JOB_URL + "all")
            .then((res) => {
                console.log(res.data)
                setApplication(res.data)
                
            });
    }, [])

    return(
        <>
            {application.map((app) => <Jobb props = {app} key = {app.id}/>)};
        </>
    )
}
import styles from "@/styles/job.module.css"
import { useState, useEffect, useContext, useRef } from "react"
import axios from "axios"

import Heading from "../components/heading";
import Job from "./jobInfo";
import JobDetail from "./jobDetail";
import ButtonFilter from "./buttonFilter";

export default function Jobb() {
    const [job, setJob] = useState([]);
    const [currentJob, setCurrentJob] = useState(null);
    const [currValue, setCurrValue] = useState(
        {
            date: null,
            experience: null,
            jobType: null,
            onSite: null
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(process.env.NEXT_PUBLIC_API_JOB_URL + "all", {params: {date: currValue.date, experience: currValue.experience, jobType: currValue.jobType, onSite: currValue.onSite}});
            setJob(result.data);
        }
        fetchData();
    }, [currValue])

    return (
        <>
            <Heading />
            <div className={styles.layout}>
                <ButtonFilter change = {setCurrValue}/>
                {console.log("resulttttttt", currValue)}
                <div className={styles.mainLayout}>
                    <div className={styles.left}>
                        {job.map(job => {
                            return (
                                <div onClick={() => {setCurrentJob(job)}}> <Job job={job} key={job.id} /></div>
                            )
                        })};
                    </div>
                    {currentJob&&<JobDetail job = {currentJob}/>}
                </div>
            </div>
        </>
    )
}
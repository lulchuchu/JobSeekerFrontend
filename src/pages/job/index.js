import styles from "@/styles/job.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

import Heading from "../components/heading";
import Job from "./jobInfo";
import JobDetail from "./jobDetail";
import ButtonFilter from "./buttonFilter";

export default function Jobb({ companyId, totalPage }) {
    const numberPerPage = 10;

    const [job, setJob] = useState([]);
    const [currentJob, setCurrentJob] = useState(null);
    const [currPagee, setCurrPage] = useState(1);
    const pageNum = [];

    const [currValue, setCurrValue] = useState({
        companyId: companyId,
        date: null,
        experience: null,
        jobType: null,
        onSite: null,
        currPage: currPagee - 1,
        numberPerPage: numberPerPage,
    });

    useEffect(() => {
        console.log("currValll", currValue);
        const fetchData = async () => {
            const result = await axios.get(
                process.env.NEXT_PUBLIC_API_JOB_URL + "all",
                { params: currValue }
            );
            console.log("result", result.data);

            setJob(result.data);
        };
        fetchData();
    }, [currValue]);

    for (let i = 0; i < job.totalPages; i++) {
        pageNum.push(i + 1);
    }
    console.log("pageNum", pageNum);

    return (
        <>
            <Heading />
            <div className={styles.layout}>
                <ButtonFilter
                    changeFilter={setCurrValue}
                    changeResult={setCurrentJob}
                    companyId={companyId}
                />
                <div className={styles.mainLayout}>
                    <div className={styles.left}>
                        {job.content?.map((job) => {
                            return (
                                <div
                                    onClick={() => {
                                        setCurrentJob(job);
                                    }}>
                                    <Job job={job} key={job.id} />
                                </div>
                            );
                        })}
                        <div className={styles.pagination}>
                            {pageNum.map((page) => {
                                console.log("page", page)
                                console.log("currPagee", currPagee)
                                return (
                                <button
                                    className={
                                        page === currValue.currPage + 1
                                            ? styles.activePageinationButton
                                            : styles.paginationButton
                                    }
                                    onClick={() => {

                                        setCurrValue({
                                            ...currValue,
                                            currPage: page - 1,
                                        });
                                    }}>
                                    {page}
                                </button>
                            )})}
                        </div>
                    </div>
                    {currentJob && <JobDetail job={currentJob} />}
                </div>
            </div>
        </>
    );
}

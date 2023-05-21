import styles from "@/styles/job.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

import Heading from "../components/heading";
import Job from "./jobInfo";
import JobDetail from "./jobDetail";
import ButtonFilter from "./buttonFilter";
import useApiRequest from "../components/getRequest";

export default function Jobb({ companyId, totalPage }) {
    const numberPerPage = 10;
    //List of all jobs per page
    const [job, setJob] = useState([]);
    //Current job details
    const [currentJob, setCurrentJob] = useState(null);
    const [currPagee, setCurrPage] = useState(1);


    //List of page number
    const pageNum = [];

    //Data to send request filter
    const [currValue, setCurrValue] = useState({
        companyId: companyId,
        date: null,
        experience: null,
        jobType: null,
        onSite: null,
        currPage: currPagee - 1,
        numberPerPage: numberPerPage,
    });


    //Fetch jobs list data
    useEffect(() => {
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

    //Make list of page number
    for (let i = 0; i < job.totalPages; i++) {
        pageNum.push(i + 1);
    }
    console.log("pageNum", pageNum);

    return (
        <>
            <Heading />
            <div className={styles.layout}>
                {/* Filter Button */}
                <ButtonFilter
                    changeFilter={setCurrValue}
                    changeResult={setCurrentJob}
                    companyId={companyId}
                />
                {/* Main Layout */}
                <div className={styles.mainLayout}>
                    {/* List of jobs */}
                    <div className={styles.left}>
                        {/* Map List of job to Job component */}
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
                        {/* Pagination */}
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

                    {/* If currentJob is clicked show job Detail */}
                    {currentJob && <JobDetail job={currentJob} />}
                </div>
            </div>
        </>
    );
}

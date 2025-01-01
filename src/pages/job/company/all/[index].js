import Heading from "@/pages/components/heading";
import styles from "@/styles/job.module.css";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";

export default function Application() {
    const router = useRouter();
    const {index} = router.query;
    const companyId = parseInt(index);

    const [token, setToken] = useState(null);
    const [numberApplicants, setNumberApplicants] = useState(0);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token && companyId) {
            const fetch = async () => {
                const result = await axios.get(
                    process.env.NEXT_PUBLIC_API_JOB_URL + "all/" + companyId,
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                    }
                );
                setJobs(result.data);
            };
            fetch();
        }
    }, [companyId, token]);

    function handleCloseJob(jobId) {
        if (token && jobId) {
            const result = axios
                .post(
                    process.env.NEXT_PUBLIC_API_JOB_URL + "close/" + jobId,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                    }
                ).then(() => {
                    router.reload();

                })
            //reload
        }
    }

    return (
        <>
            <Heading/>
            <div>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
                    crossOrigin="anonymous"
                />

                <div className={styles.mainTable}>
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Experience</th>
                            <th scope="col">Type</th>
                            <th scope="col">OnSite</th>
                            <th scope="col">Address</th>
                            <th scope="col">Number of Applicants</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {jobs.map((job) => (
                            <tr
                                onClick={() =>
                                    router.push(
                                        "/job/company/applicant/" +
                                        job.id
                                    )
                                }>
                                <td>{job.id}</td>
                                <td>{job.title}</td>
                                <td>{job.experience}</td>
                                <td>{job.type}</td>
                                <td>{job.onSite}</td>
                                <td>{job.address}</td>
                                <td>{job.numberOfApplicants}</td>
                                <td>
                                    <button
                                        className={styles.buttonTable}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCloseJob(job.id)
                                        }}>
                                        Close
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

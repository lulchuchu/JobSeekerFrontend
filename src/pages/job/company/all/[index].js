import Heading from "@/pages/components/heading";
import styles from "@/styles/job.module.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export default function Application() {
    const router = useRouter();
    const { index } = router.query;
    const companyId = parseInt(index);

    const [token, setToken] = useState(null);
    const [numberApplicants, setNumberApplicants] = useState(0);
    const [applications, setApplications] = useState([]);

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
                console.log("all", result.data);
                setApplications(result.data);
            };
            fetch();
        }
    }, [companyId, token]);

    return (
        <>
            <Heading />
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
                                {/* <th scope="col">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => (
                                <tr
                                    onClick={() =>
                                        router.push(
                                            "/job/company/applicant/" +
                                                application.id
                                        )
                                    }>
                                    <td>{application.id}</td>
                                    <td>{application.title}</td>
                                    <td>{application.experience}</td>
                                    <td>{application.type}</td>
                                    <td>{application.onSite}</td>
                                    <td>{application.address}</td>
                                    <td>{application.numberOfApplicants}</td>
                                    {/* <td>
                                        <button
                                            className={styles.buttonTable}
                                            onClick={() =>
                                                handleChooseButton(application.id)
                                            }>
                                            Choose
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

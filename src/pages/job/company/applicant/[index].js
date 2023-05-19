import Heading from "@/pages/components/heading";
import styles from "@/styles/job.module.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Applicant() {
    const [token, setToken] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [chooseShowing, setChooseShowing] = useState(false);
    const [interviewTime, setInterviewTime] = useState(null);
    const router = useRouter();
    const { index } = router.query;
    const applicationId = parseInt(index);

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token && applicationId) {
            const fetch = async () => {
                const result = await axios.get(
                    process.env.NEXT_PUBLIC_API_JOB_URL + "applied/all",
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                        params: { applicationId: applicationId },
                    }
                );
                console.log("data is ", result.data);
                setApplicants(result.data);
            };
            fetch();
        }
    }, [token, applicationId]);

    function handleSubmit() {}

    return (
        <>
            {chooseShowing && (
                <div className={styles.fixed}>
                    <div className={styles.blur}></div>
                    <div className={styles.popup}>
                        <div className={styles.head}>
                            <div className={styles.title}>Choose Applicant</div>
                            <button
                                onClick={() => setChooseShowing(false)}
                                className={styles.buttonSmall}>
                                X
                            </button>
                        </div>
                        <div className={styles.form}>
                            <div>Interview Time</div>
                            <input
                                type="datetime-local"
                                className={styles.input}
                                onChange={(e) =>
                                    setInterviewTime(e.target.value)
                                }
                            />
                        </div>

                        <button
                            className={styles.saveButton}
                            onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
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
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Short Description</th>
                                <th scope="col">Resume</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants.map((applicant) => (
                                <tr>
                                    <td>{applicant.id}</td>
                                    <td>{applicant.name}</td>
                                    <td>{applicant.email}</td>
                                    <td>{applicant.shortDescription}</td>
                                    <td>{applicant.cv}</td>
                                    <td>
                                        <button
                                            className={styles.buttonTable}
                                            onClick={() =>
                                                setChooseShowing(true)
                                            }>
                                            Choose
                                        </button>
                                        <button className={styles.buttonTable}>
                                            Reject
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

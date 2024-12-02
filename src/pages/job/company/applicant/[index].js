import Heading from "@/pages/components/heading";
import styles from "@/styles/job.module.css";
import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";

export default function Applicant() {
    const [token, setToken] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [chooseShowing, setChooseShowing] = useState(false);
    const [interviewTime, setInterviewTime] = useState(null);
    const [application, setApplication] = useState(null);
    const [interviewData, setInterviewData] = useState(null);
    const [userId, setUserId] = useState(null);
    const router = useRouter();
    const {index} = router.query;
    const applicationId = parseInt(index);

    let Sock = new SockJS("http://localhost:8080/ws");
    let stompClient = over(Sock);

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token) {
            // setStompClient(over(Sock));
            stompClient?.connect({}, onConnected, onError);

            function onConnected() {
                // stompClient.subscribe(
                //     "/user/notification",
                //     onNotificationReceived
                // );
            }

            function onError(error) {
                console.error("WebSocket error:", error);
            }

            function onNotificationReceived(notification) {
                console.log("Received notification:", notification.body);
            }
        }
        return () => {
            Sock.close();
        };
    }, [token]);

    useEffect(() => {
        if (token && applicationId) {
            const fetch = async () => {
                const result = await axios.get(process.env.NEXT_PUBLIC_API_JOB_URL + "applied/all", {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    }, params: {applicationId: applicationId},
                });
                const applicationDetail = await axios.get(process.env.NEXT_PUBLIC_API_JOB_URL + "detail/" + applicationId, {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                });
                setApplicants(result.data);
                setApplication(applicationDetail.data);
            };
            fetch();
        }
    }, [token, applicationId]);

    function handleSubmit() {
        const interviewDto = {
            applicationId: applicationId, time: interviewTime, userId: userId,
        };

        const fetchData = async () => {
            const result = await axios.post(process.env.NEXT_PUBLIC_API_JOB_URL + "setInterview", interviewDto, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
            });
        };

        fetchData();
        const data = {
            message: "You have been invited to an interview at " + interviewTime + " for the position of " + application.title + " at " + application.company.name,
            receiverId: userId,
        };
        stompClient.send("/app/receive-job-notification", {}, JSON.stringify(data));
        setChooseShowing(false);
    }

    function handleChooseButton(applicantId) {
        setChooseShowing(true);
        setUserId(applicantId);
        const fetchData = async () => {
            const result = await axios.get(process.env.NEXT_PUBLIC_API_JOB_URL + "getInterview", {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                }, params: {
                    applicationId: applicationId, userId: applicantId,
                },
            });
            setInterviewData(result.data);
        };
        fetchData();
    }

    return (<>
        {chooseShowing && (<div className={styles.fixed}>
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
                        onChange={(e) => setInterviewTime(e.target.value)}
                    />
                </div>
                <div className={styles.form}>
                    <div>Interview Data</div>
                    <div>{interviewData?.time}</div>
                </div>

                <button
                    className={styles.saveButton}
                    onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>)}
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
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Short Description</th>
                        <th scope="col">Resume</th>
                        <th scope="col">Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applicants.map((applicant) => (<tr
                        id={applicant.id}
                        onClick={() => router.push("/user/" + applicant.id)}
                    >
                        <td>{applicant.id}</td>
                        <td>{applicant.name}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.shortDescription}</td>
                        <td><a
                            href={process.env.NEXT_PUBLIC_API_FILE_URL + `getCV/${applicant.cv.id}`}
                            target="_blank"
                            rel="noopener noreferrer" download>
                            {applicant.cv.filename}
                        </a></td>
                        <td>
                            <button
                                className={styles.buttonTable}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleChooseButton(applicant.id)
                                }}>
                                Choose
                            </button>
                            <button className={styles.buttonTable} onClick={(e) => {
                                e.stopPropagation()
                                handleChooseButton(applicant.id)
                            }}>
                                Reject
                            </button>
                        </td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}

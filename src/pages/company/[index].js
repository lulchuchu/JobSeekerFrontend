import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Heading from "../components/heading";
import InfoCard from "./infoCard";
import Job from "./job";
import Post from "../home/post";
import PageButton from "./pageButton";
import SideUser from "../user/sideUser";
import SideCom from "./sideCompany";

import styles from "@/styles/userpage.module.css";

export default function company() {
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [token, setToken] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currPagePost, setCurrPagePost] = useState(1);
    const [currPageJob, setCurrPageJob] = useState(1);
    const [companies, setCompanies] = useState([]);
    const [showMoreFollow, setShowMoreFollow] = useState(false);
    const [usersWorked, setUsersWorked] = useState([]);
    const [showMoreUser, setShowMoreUser] = useState(false);

    const router = useRouter();
    const { index } = router.query;

    const itemsPerPage = 2;
    const company_id = parseInt(index);
    const company_url = process.env.NEXT_PUBLIC_API_COMPANY_URL + "details";
    const job_url = process.env.NEXT_PUBLIC_API_JOB_URL + "company";
    const post_url = process.env.NEXT_PUBLIC_API_POST_URL + "showCompany";
    const random_url = process.env.NEXT_PUBLIC_API_COMPANY_URL + "all";
    const userWorked_url = process.env.NEXT_PUBLIC_API_USER_URL + "workat";

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token && company_id) {
            const resultCompany = async () => {
                const result = await axios.get(company_url, {
                    params: { companyId: company_id },
                });
                setCompany(result.data);
            };
            const randomComs = async () => {
                const result = await axios.get(random_url);
                setCompanies(result.data);
            };
            const userWorked = async () => {
                const result = await axios.get(userWorked_url, {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                    params: { companyId: company_id },
                });
                setUsersWorked(result.data);
            };
            resultCompany();
            randomComs();
            userWorked();
        }
    }, [token, company_id]);

    useEffect(() => {
        if (company_id) {
            const resultJob = async () => {
                const result = await axios.get(job_url, {
                    params: {
                        companyId: company_id,
                        page: currPageJob - 1,
                        size: itemsPerPage,
                    },
                });
                setJobs(result.data.content);
            };
            resultJob();
        }
    }, [company_id, currPageJob]);

    useEffect(() => {
        if (company_id) {
            const resultPost = async () => {
                const result = await axios.get(post_url, {
                    params: {
                        companyId: company_id,
                        page: currPagePost - 1,
                        size: itemsPerPage,
                    },
                });
                setPosts(result.data.content);
            };
            resultPost();
        }
    }, [company_id, currPagePost]);

    function handleShowJob() {
        router.push("/job/company/" + company.id);
    }

    function handleShowPost() {}

    return (
        <>
            <Heading />
            <div className={styles.all}>
                <div className={styles.main}>
                    <InfoCard company={company} />
                    <div className={styles.mainContent}>
                        <div className={styles.text}>About us</div>
                        {company && (
                            <div className={styles.content}>{company.bio}</div>
                        )}
                    </div>
                    <div className={styles.mainContent}>
                        <div className={styles.text}>
                            <div>Page posts</div>
                            <PageButton
                                currPage={currPagePost}
                                setCurrPage={setCurrPageJob}
                            />
                        </div>
                        <div className={styles.mainPost}>
                            {posts.map((post) => (
                                <div className={styles.smallPost}>
                                    <Post post={post} key={post.id} />
                                </div>
                            ))}
                        </div>
                        <button
                            className={styles.showAll}
                            onClick={handleShowPost}>
                            Show All Posts
                        </button>
                    </div>
                    <div className={styles.mainContent}>
                        <div className={styles.text}>
                            <div>Job Openning</div>
                            <PageButton
                                currPage={currPageJob}
                                setCurrPage={setCurrPageJob}
                            />
                        </div>
                        <div className={styles.mainJob}>
                            {jobs.map((job) => (
                                <Job job={job} key={job.id} />
                            ))}
                        </div>
                        <button
                            className={styles.showAll}
                            onClick={handleShowJob}>
                            Show All Jobs Available
                        </button>
                    </div>
                </div>
                <div className={styles.side}>
                    <div className={styles.subSide}>
                        <div className={styles.text}>Companies recommend</div>
                        {(showMoreFollow
                            ? companies.slice(0, 10)
                            : companies.slice(0, 5)
                        ).map((company) => (
                            <SideCom company={company} />
                        ))}
                        <button
                            className={styles.showAll}
                            onClick={() => setShowMoreFollow(!showMoreFollow)}>
                            {showMoreFollow ? "Show less" : "Show more"}
                        </button>
                    </div>
                    <div className={styles.subSide}>
                        <div className={styles.text}>
                            People worked there
                        </div>
                        {(showMoreUser
                            ? usersWorked.slice(0, 10)
                            : usersWorked.slice(0, 5)
                        ).map((user) => (
                            <SideUser user={user} />
                        ))}
                        <button
                            className={styles.showAll}
                            onClick={() => setShowMoreUser(!showMoreUser)}>
                            {showMoreUser ? "Show less" : "Show more"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

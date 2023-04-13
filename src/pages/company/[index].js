import Heading from "../components/heading";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/userpage.module.css";
import InfoCard from "./infoCard";
import Job from "./job";
import Post from "../home/post";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import PageButton from "./pageButton";

export default function company() {
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [token, setToken] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currPagePost, setCurrPagePost] = useState(1);
    const [currPageJob, setCurrPageJob] = useState(1);
    const router = useRouter();
    const { index } = router.query;

    const itemsPerPage = 2;
    const company_id = parseInt(index);
    const company_url = process.env.NEXT_PUBLIC_API_COMPANY_URL + "details";
    const job_url = process.env.NEXT_PUBLIC_API_JOB_URL + "company";
    const post_url = process.env.NEXT_PUBLIC_API_POST_URL + "showCompany";

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (company_id) {
            const resultCompany = async () => {
                const result = await axios.get(company_url, {
                    params: { companyId: company_id },
                });
                setCompany(result.data);
            };
            resultCompany();
        }
    }, [company_id]);

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
                    <div> This is side</div>
                </div>
            </div>
        </>
    );
}

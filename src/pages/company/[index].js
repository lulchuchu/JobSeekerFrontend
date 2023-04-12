import Heading from "../components/heading";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/userpage.module.css";
import InfoCard from "./infoCard";
import Job from "./job";
import Post from "../home/post";

export default function company() {
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [token, setToken] = useState(null);
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const { index } = router.query;

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);
    useEffect(() => {
        if (index) {
            const company_id = parseInt(index);
            const company_url =
                process.env.NEXT_PUBLIC_API_COMPANY_URL + "details";
            const job_url = process.env.NEXT_PUBLIC_API_JOB_URL + "company";
            const post_url =
                process.env.NEXT_PUBLIC_API_POST_URL + "showCompany";
            axios
                .get(company_url, { params: { companyId: company_id } })
                .then((res) => {
                    console.log("company", res.data);
                    setCompany(res.data);
                });

            axios
                .get(job_url, { params: { companyId: company_id } })
                .then((res) => {
                    console.log("jobs", res.data);
                    setJobs(res.data);
                });

            axios
                .get(post_url, { params: { companyId: company_id } })
                .then((res) => {
                    console.log("posts", res.data)
                    setPosts(res.data);
                });
        }
    }, [index]);

    function handleShowJob() {
        router.push("/job/company/" + company.id);
    }

    function handleShowPost() {
        
    }

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
                        <div className={styles.text}>Page posts</div>
                        <div className={styles.mainPost}>
                            {posts.map((post) => (
                                <Post post={post} key={post.id} />
                            ))}
                        </div>
                        <button
                            className={styles.showAll}
                            onClick={handleShowPost}>
                            Show All Posts
                        </button>
                    </div>
                    <div className={styles.mainContent}>
                        <h1 className={styles.text}>Job Openning</h1>
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

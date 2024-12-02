import styles from "@/styles/job.module.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { RiShareBoxLine } from "react-icons/ri";
import company from "../company/[index]";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function JobDetail({ job , setShowApply}) {
    const [token, setToken] = useState(null);
    const [isApplied, setIsApplied] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    const jobId = job.id;

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    // Check apply status
    useEffect(() => {
        if (token && jobId) {
            const isApplied = async () => {
                const res = await axios.get(
                    process.env.NEXT_PUBLIC_API_JOB_URL + "checkApply",
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                        params: { applicationId: jobId },
                    }
                );
                setIsApplied(res.data);
            };
            isApplied();
        }
    }, [token, jobId]);

    // Check admin
    useEffect(() => {
        if (token && jobId) {
            const isApplied = async () => {
                const res = await axios.get(
                    process.env.NEXT_PUBLIC_API_COMPANY_URL + "checkAdmin",
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                        params: { userId: token.id, companyId: job.company.id},
                    }
                );
                setIsAdmin(res.data);
            };
            isApplied();
        }
    }, [token, job.company.id]);

    function handleClickApply() {
        if (isApplied) {
            async function unApply() {
                await axios.post(
                    process.env.NEXT_PUBLIC_API_JOB_URL +
                    `unApply?applicationId=${job.id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                    }
                );
            }
            unApply()
            setIsApplied(false)
            return
        }
        setShowApply(true);
        setIsApplied(true);
    }

    return (
        <div className={styles.detail}>
            <div className={styles.content}>
                <div className={styles.detailTitle}>{job.title}</div>
                <div className={styles.subInfo}>
                    <Link href={"/company/" + job.company.id}>
                        <div className={styles.company}>{job.company.name}</div>
                    </Link>
                    <div className={styles.address}>{job.address}</div>
                </div>
                <div className={styles.date}>
                    {job.startDate} to {job.endDate ? job.endDate : "Present"}
                </div>
                <div className={styles.type}>{job.type}</div>

                <div className={styles.buttonLst}>
                    <button
                        className={styles.applyButton}
                        onClick={handleClickApply}>
                        <p className={styles.buttonText}>
                            {isApplied ? "Applied" : "Apply"}
                        </p>
                        <RiShareBoxLine size={24} className={styles.icon} />
                    </button>

                    {isAdmin && (
                        <button
                            className={styles.applyButton}
                            onClick={() =>
                                router.push(
                                    "/job/company/applicant/" + job.id
                                )
                            }>
                            <p className={styles.buttonText}>View applicants</p>
                        </button>
                    )}
                </div>

                <h3>About the job</h3>
                <div className={styles.description}>{job.description}</div>
            </div>
        </div>
    );
}

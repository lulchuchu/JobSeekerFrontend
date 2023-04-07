import styles from "@/styles/job.module.css"
import Link from "next/link"

import {RiShareBoxLine} from "react-icons/ri"

export default function JobDetail({job}){
    return (
        <div className={styles.detail}>
            <div className={styles.content}>
                <div className={styles.detailTitle}>{job.title}</div>
                <div className={styles.subInfo}>
                    <Link href={job.company.website}>
                        <div className={styles.company}>{job.company.name}</div>
                    </Link>
                    <div className={styles.address}>{job.address}</div>
                </div>
                <div className = {styles.date}>
                    {job.startDate} to {job.endDate? job.endDate : "Present"}
                </div>
                <div className={styles.type}>{job.type}</div>

                <button className={styles.applyButton}>
                    <p className={styles.buttonText}>Apply</p>
                    <RiShareBoxLine size={24} className={styles.icon}/>
                </button>

                <h3>About the job</h3>
                <div className={styles.description}>{job.description}</div>

            </div>
        </div>
    )
}
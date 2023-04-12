import styles from "@/styles/userpage.module.css";

export default function Job({job, key}) {
    return (
        <div className={styles.job}>
            <img
                src={process.env.NEXT_PUBLIC_API_PIC_URL + job.company.profilePicture}
                alt={job.company.name}
                width={48}
                height={48}
            />
            <div className={styles.content}>
                <div className={styles.title}>{job.title}</div>
                <div className={styles.address}>{job.address}</div>
            </div>
        </div>
    );
}

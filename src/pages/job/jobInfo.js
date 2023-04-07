import styles from "@/styles/job.module.css"



export default function Job({job, key, state}){



    return(
        <div className={styles.job}>
            <img className={styles.img} src = {job.company.profilePicture} width={41} height={41}/>
            <div className={styles.info}>
                <div className={styles.title}>{job.title}</div>
                <div className={styles.company}>{job.company.name}</div>
                <div className={styles.type}>{job.type}</div>
                <div className={styles.address}>{job.address}</div>
            </div>
        </div>
    )
}
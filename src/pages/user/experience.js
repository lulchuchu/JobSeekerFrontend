import styles from "@/styles/experience.module.css";
import Link from "next/link";

export default function Experience({ experience }) {
    const companyLogo =
        process.env.NEXT_PUBLIC_API_PIC_URL + experience.company.profilePicture;
    // const logoUrl = process.env.NEXT_PUBLIC_API_PIC_URL + companyLogo;
    const companyId = experience.company.id;
    const companyName = experience.company.name;
    const type = experience.type;
    const jobTitle = experience.title;
    const startDate = experience.startDate;
    const leaveDate = experience.leaveDate;
    const description = experience.description;
    const address = experience.address;

    return (
        <>
            <div className={styles.exp}>
                <Link href={"/company/" + companyId}>
                    <img
                        className={styles.img}
                        src={companyLogo}
                        width={48}
                        height={48}
                    />
                </Link>
                <div className={styles.description}>
                    <Link href={"/company/" + companyId}>
                        <div className={styles.content}>
                            <b>{jobTitle}</b>
                        </div>
                    </Link>

                    <div className={styles.content}>
                        {companyName} {type}
                    </div>
                    <div className={styles.content}>
                        {startDate} to {leaveDate}
                    </div>
                    <div className={styles.content}>{address}</div>
                    <div className={styles.content}>{description}</div>
                </div>
            </div>
        </>
    );
}

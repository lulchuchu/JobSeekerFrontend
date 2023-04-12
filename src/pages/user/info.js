import styles from "@/styles/userpage.module.css";

export default function Info({ info }) {
    return (
        <>
            <div className={styles.mainContent}>
                <h1 className={styles.text}>About me</h1>
                <p className={styles.content}>{info}</p>
            </div>
        </>
    );
}

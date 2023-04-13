import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styles from "@/styles/userpage.module.css";


export default function PageButton({currPage,setCurrPage}) {
    return (
        <div className={styles.paginationButton}>
            <button
                className={styles.pageButton}
                onClick={() => {
                    currPage > 1 ? setCurrPage(currPage - 1) : null;
                }}>
                <GrFormPrevious size={24} />
            </button>
            <button
                className={styles.pageButton}
                onClick={() => setCurrPage(currPage + 1)}>
                <GrFormNext size={24} />
            </button>
        </div>
    );
}

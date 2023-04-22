import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styles from "@/styles/userpage.module.css";


export default function PageButton({currPage,setCurrPage, maxPage=10}) {
    console.log("currPage", currPage)
    console.log("maxPage", maxPage)
    return (
        <div className={styles.paginationButton}>
            <button
                className={styles.pageButton}
                onClick={() => 
                    currPage > 1 ? setCurrPage(currPage - 1) : null
                }>
                <GrFormPrevious size={24} />
            </button>
            <button
                className={styles.pageButton}
                onClick={() => 
                    currPage < maxPage ? setCurrPage(currPage + 1) : null}>
                <GrFormNext size={24} />
            </button>
        </div>
    );
}

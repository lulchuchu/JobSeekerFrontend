import Link from "next/link";
import styles from "@/styles/heading.module.css";

export default function NavBarIcon(props) {
    let url = props.url;

    if (props.token) {
        url += "/" + props.token.id;
    }

    return (
        <>
            <Link href={url} className={styles.icon}>
                <div>{props.component}</div>
                <div>{props.name}</div>
                {console.log("navigate to " + props.name + " icon")}
            </Link>
        </>
    );
}

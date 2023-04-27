import Link from "next/link";
import styles from "@/styles/heading.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NavBarIcon(props) {
    const [userToggle, setUserToggle] = useState(false);
    const router = useRouter();
    let url = props.url;

    if (props.token) {
        url += "/" + props.token.id;
    }

    function handleLogOut() {
        localStorage.removeItem("token");
        router.push("/login");
    }

    function handleProfilePage() {

        router.push("/user/" + props.token.id);
    }

    return (
        <>
            {props.token ? (
                <div
                    className={styles.icon}
                    onClick={() => setUserToggle(!userToggle)}>
                    <div>{props.component}</div>
                    <div>{props.name}</div>
                    {console.log("navigate to " + props.name + " icon")}
                    {userToggle && props.token && (
                        <div className={styles.userNavigate}>
                            <div className={styles.option} onClick={handleProfilePage}>Profile page</div>
                            <div className = {styles.option} onClick={handleLogOut}>Log out</div>
                        </div>
                    )}
                </div>
            ) : (
                <Link href={url} className={styles.icon}>
                    <div>{props.component}</div>
                    <div>{props.name}</div>
                    {console.log("navigate to " + props.name + " icon")}
                </Link>
            )}
        </>
    );
}

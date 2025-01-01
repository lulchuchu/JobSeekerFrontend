import Link from "next/link";
import styles from "@/styles/heading.module.css";
import {useRouter} from "next/router";
import {useState} from "react";
import {Dropdown, Space} from "antd";

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

    function handleCompanyPage() {
        router.push("/company/" + props.token.manageCompany);
    }

    const items = [
        {
            label: (
                <div onClick={() => handleProfilePage()}>
                    Profile page
                </div>
            ),
            key: '0',
        },
        props?.token?.role === "ADMIN" && {
            label: (
                <div onClick={() => handleCompanyPage()}>
                    Manage company
                </div>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div onClick={() => handleLogOut()}>
                    Log out
                </div>
            ),
            key: '3',
        },
    ];

    return (
        <>
            {props.token ? (
                <Dropdown menu={{items}}>
                    <Space>
                        <div
                            className={styles.icon}
                            onClick={() => setUserToggle(!userToggle)}>
                            <div>{props.component}</div>
                            <div>{props.name}</div>
                        </div>
                    </Space>
                </Dropdown>
            ) : url === "" ? (
                <div className={styles.icon}>
                    <div>{props.component}</div>
                    <div>{props.name}</div>
                </div>
            ) : (
                <Link href={url} className={styles.icon}>
                    <div>{props.component}</div>
                    <div>{props.name}</div>
                </Link>
            )}
        </>
    );
}

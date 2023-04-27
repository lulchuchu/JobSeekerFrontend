import styles from "@/styles/infocard.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function EditUser({ userDetail, setEdit }) {

    const [name, setName] = useState(userDetail?.name);
    const [shortDescription, setShortDescription] = useState(userDetail?.shortDescription);
    const [address, setAddress] = useState(userDetail?.address);
    const [email, setEmail] = useState(userDetail?.email);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    
    const change_url = process.env.NEXT_PUBLIC_API_USER_URL + "update";

    function handleUpdate() {
        const data = {
            id: userDetail?.id,
            name: name,
            shortDescription: shortDescription,
            address: address,
            email: email,

        }

        const result = axios.post(change_url, data, { headers: { Authorization: `Bearer ${token.accessToken}` } }).data;
        router.reload();
    }

    return (
        <div className={styles.fixed}>
            <div className={styles.blur}></div>
            <div className={styles.popup}>
                <div className={styles.head}>
                    <div className={styles.title}>Edit Profile</div>
                    <button onClick={() => setEdit(false)} className={styles.buttonSmall}>X</button>
                </div>
                    <div className={styles.form}>
                        <div>Name</div>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder={userDetail?.name}
                            onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className={styles.form}>
                        <div>Short Description</div>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder={userDetail?.shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}></input>
                    </div>
                    <div className={styles.form}>
                        <div>Address</div>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder={userDetail?.address}
                            onChange={(e) => setAddress(e.target.value)}></input>
                    </div>
                    <div className={styles.form}>
                        <div>Email</div>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder={userDetail?.email}
                            onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <button
                    className={styles.saveButton}
                    onClick={handleUpdate}>Save</button>
            </div>
        </div>
    );
}

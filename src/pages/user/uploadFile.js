import styles from "@/styles/infocard.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function UploadFile({ setUpload, isProfilePic = false }) {
    const [token, setToken] = useState(null);
    const [files, setFiles] = useState(null);

    const router = useRouter();
    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    function handleUpload(e) {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("files", file);
        setFiles(formData);
        console.log(file.name);
        // console.log(files.map((file) => console.log(file.name)));
    }

    function handleConfirm() {
        const result = axios.post(
            process.env.NEXT_PUBLIC_API_FILE_URL + "upload",
            files,
            {
                headers: {
                    Authorization:
                        "Bearer " +
                        JSON.parse(localStorage.getItem("token")).accessToken,
                },
            }
        ).data;

        if(isProfilePic) {
            const update = axios.post(
                process.env.NEXT_PUBLIC_API_USER_URL + "changeProfilePicture?path=" + files.get("files").name,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("token")).accessToken,
                    },
                }
            ).data;
        }else{
            const update = axios.post(
                process.env.NEXT_PUBLIC_API_USER_URL + "changeCV?path=" + files.get("files").name,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("token")).accessToken,
                    },
                }
            ).data;
        }
        alert("Upload file successfully");
        router.reload();
    }

    return (
        <div className={styles.fixed}>
            <div className={styles.blur}></div>
            <div className={styles.popup}>
                <div className={styles.head}>
                    <div className={styles.title}>Upload file</div>
                    <button
                        onClick={() => setUpload(false)}
                        className={styles.buttonSmall}>
                        X
                    </button>
                </div>
                {isProfilePic ? (
                    <div>
                        Choose a picture to set as your profile picture 
                        <br/>
                        <br/>
                        {files?.get("files") && <img
                            src={
                                process.env.NEXT_PUBLIC_API_FILE_URL +
                                "getImage?path=" +
                                files.get("files").name
                                
                            }
                            width={500}
                            height={500}

                        />}
                    </div>
                ) : (
                    <div className={styles.files}>
                        {/* {files?.map((file) => <div>{file.name}</div>)} */}
                        {files?.get("files").name}
                    </div>
                )}
                <div className={styles.buttons}>
                    <input
                        type="file"
                        onChange={handleUpload}
                        id="actual-btn"
                        hidden></input>
                    <button className={styles.uploadButton}>
                        <label for="actual-btn">Choose File</label>
                    </button>
                    <button
                        className={styles.confirmButton}
                        onClick={handleConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

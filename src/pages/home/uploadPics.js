import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "@/styles/home.module.css";

export default function UploadPics({ setUpload, setPhotos,photos }) {
    const [token, setToken] = useState(null);
    const [files, setFiles] = useState(null);
    const [lstPhoto, setLstPhoto] = useState([]);

    const router = useRouter();
    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    function handleUpload(e) {
        let formData = new FormData();
        let tmp = [];
        const filesUpload = e.target.files;
        console.log("filesUpload", filesUpload);
        for (let i = 0; i < filesUpload.length; i++) {
            console.log("fileee", filesUpload[i]);
            tmp.push(filesUpload[i].name);
            formData.append("files", filesUpload[i]);
        }
        setLstPhoto(tmp);
        // filesUpload.FileList.map((file) => formData.append("files", file));
        // formData.append("files", filesUpload);
        setFiles(formData);
    }

    function handleConfirm() {
        const fetchData = async () => {
            const result = await axios.post(
                process.env.NEXT_PUBLIC_API_FILE_URL + "upload",
                files,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("token"))
                                .accessToken,
                    },
                }
            );
            console.log("result", result.data);
            setPhotos(result.data);

        };

        fetchData();
        setUpload(false);
    }

    return (
        <div className={styles.fixed}>
            <div className={styles.blur}></div>
            <div className={styles.popup}>
                <div className={styles.head}>
                    <div className={styles.title}>Add a photo</div>
                    <button
                        onClick={() => setUpload(false)}
                        className={styles.buttonSmall}>
                        X
                    </button>
                </div>

                <div className={styles.files}>
                    Choose a picture to set as your profile picture
                    <br />
                    <br />
                    {lstPhoto?.map((photo) => (
                        <img src = {process.env.NEXT_PUBLIC_API_FILE_URL + 'getImage?path='+photo}
                        width={100}
                        height={100}/>
                    ))}
                </div>

                <div className={styles.buttons}>
                    <input
                        type="file"
                        onChange={handleUpload}
                        id="actual-btn"
                        multiple="multiple"
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

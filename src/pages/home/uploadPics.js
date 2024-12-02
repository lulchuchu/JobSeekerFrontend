import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "@/styles/home.module.css";

export default function UploadPics({ setUpload, setPhotos, setFiles }) {
    const [token, setToken] = useState(null);
    // const [files, setFiles] = useState(null);
    //Link of photos source
    const [lstPhoto, setLstPhoto] = useState([]);

    const router = useRouter();
    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    function handleUpload(e) {
        let formData = new FormData();
        // Link of photos source
        const images = [],
            // File reader to read file
            fileReaders = [];
        // File received from input
        const filesUpload = e.target.files;

        //Loop through all files upload from input
        for (let i = 0; i < filesUpload.length; i++) {
            const fileReader = new FileReader();
            fileReaders.push(fileReader);
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    images.push(result);
                }
                if (images.length === filesUpload.length) {
                    setLstPhoto(images);
                    setPhotos(images);
                }
            };
            fileReader.readAsDataURL(filesUpload[i]);
            formData.append("files", filesUpload[i]);
        }
        setFiles(formData);
    }

    function handleConfirm() {
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
                    Choose a picture for your post
                    <br />
                    <br />
                    {lstPhoto?.map((photo) => (
                        <img src={photo} width={100} height={100} />
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

import styles from "@/styles/infocard.module.css";
import {useState, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";

export default function UploadFile({setUpload, isProfilePic = false}) {
    const [token, setToken] = useState(null);
    const [files, setFiles] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [cvs, setCvs] = useState([]);

    const router = useRouter();
    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token && !isProfilePic) {
            const resultCV = async () => {
                const result = await axios.get(process.env.NEXT_PUBLIC_API_FILE_URL + `getCVFileName/${token.id}`, {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    }
                });
                setCvs(result.data);
            };
            resultCV();
        }
    }, [token, isProfilePic]);

    function handleUpload(e) {
        const file = e.target.files[0];
        let formData = new FormData();
        const reader = new FileReader();
        reader.onload = (event) => {
            setImgSrc(event.target.result);
        };
        reader.readAsDataURL(file)
        formData.append("files", file);
        setFiles(formData);
        setImgSrc()
    }

    function handleConfirm() {
        files && axios.post(process.env.NEXT_PUBLIC_API_FILE_URL + "upload", files, {
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).accessToken,
            },
        }).data;

        if (files) {
            if (isProfilePic) {
                const update = axios.post(process.env.NEXT_PUBLIC_API_USER_URL + "changeProfilePicture?path=" + files.get("files").name, {}, {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).accessToken,
                    },
                }).data;
            } else {
                const update = axios.post(process.env.NEXT_PUBLIC_API_USER_URL + "changeCV?path=" + files.get("files").name, {}, {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).accessToken,
                    },
                }).data;
            }
        }

        alert("Upload file successfully");
        router.reload();
    }

    function handleDeleteCV(cvId) {
        axios.post(process.env.NEXT_PUBLIC_API_FILE_URL + `deleteCV/${cvId}`, {}, {
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).accessToken,
            }
        }).then(() => {
            setCvs(cvs.filter(cv => cv.id !== cvId));
        });
    }

    return (<div className={styles.fixed}>
        <div className={styles.blur}></div>
        <div className={styles.popup}>
            <div className={styles.head}>
                <div className={styles.title}>Upload file</div>
                <button
                    onClick={() => setUpload(false)}
                    className={styles.buttonSmall}
                >
                    X
                </button>
            </div>
            {isProfilePic ? (<div>
                Choose a picture to set as your profile picture
                <br/>
                <br/>
                {files?.get("files") && (<img
                    // src={
                    //     process.env.NEXT_PUBLIC_API_FILE_URL +
                    //     "getImage?path=" +
                    //     files.get("files").name
                    // }
                    src={imgSrc}
                    width={400}
                    height={400}
                />)}
            </div>) : (<div className={styles.files}>
                <div>
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
                        crossOrigin="anonymous"
                    />

                    <div>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">File</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {cvs.map((cv) => (
                                <tr>
                                    <td>
                                        <a
                                            href={process.env.NEXT_PUBLIC_API_FILE_URL + `getCV/${cv.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer" download>
                                            {cv.filename}
                                        </a>
                                    </td>
                                    <td width={20}>
                                        <button
                                            onClick={() => handleDeleteCV(cv.id)}
                                            className={styles.buttonSmall}>
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {files?.get("files").name}
            </div>)}
            <div className={styles.buttons}>
                <input
                    type="file"
                    onChange={handleUpload}
                    id="actual-btn"
                    hidden
                ></input>
                <button className={styles.uploadButton}>
                    <label for="actual-btn">Choose File</label>
                </button>
                <button
                    className={styles.confirmButton}
                    onClick={handleConfirm}
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>);
}

import styles from "@/styles/infocard.module.css";
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Apply({setShowApply, applicationId}) {
    const [token, setToken] = useState(null);
    const [cvs, setCvs] = useState([]);

    const router = useRouter();

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (token) {
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
    }, [token]);


    function handleChooseCV(cvId) {
        async function chooseCV() {
            await axios.post(
                process.env.NEXT_PUBLIC_API_JOB_URL +
                `apply?applicationId=${applicationId}&cvId=${cvId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                }
            );
        }

        chooseCV()
        setShowApply(false)
    }

    return (<div className={styles.fixed}>
        <div className={styles.blur}></div>
        <div className={styles.popup}>
            <div className={styles.head}>
                <div className={styles.title}>Choose CV</div>
                <button
                    onClick={() => setShowApply(false)}
                    className={styles.buttonSmall}
                >
                    X
                </button>
            </div>
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
                                <td>
                                    <button
                                        onClick={() => handleChooseCV(cv.id)}
                                        className={styles.buttonChoose}>
                                        Choose
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>);
}

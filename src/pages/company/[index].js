import Heading from "../components/heading"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import styles from "@/styles/userpage.module.css"
import InfoCard from "./infoCard";


export default function company(){
    const [company, setCompany] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter()
    const { index } = router.query

    useEffect(() => {setToken(JSON.parse(localStorage.getItem("token")))}, []);
    useEffect(() => { 
        if(index){
            const company_id = parseInt(index);
            console.log("company id is " + { index })
            const company_url = process.env.NEXT_PUBLIC_API_COMPANY_URL + "details";
            axios.get(company_url, { params: { companyId: company_id } }).then((res) => {
                setCompany(res.data);
            });
        }

    }, [index]);

    return(
        <>
            <Heading />
            <div className={styles.all}>
                <div className={styles.main}>
                    <InfoCard company={company} />
                    <div className={styles.mainExp}>
                        
                    </div>
                </div>
                <div className={styles.side}>
                    <div> This is side</div>
                </div>
            </div>

        </>
    );
}

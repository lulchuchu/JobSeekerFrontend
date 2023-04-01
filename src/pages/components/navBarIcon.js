import Link from "next/link"
import styles from '@/styles/navBarIcon.module.css'

export default function NavBarIcon(props) {
    let url = props.url;

    if(props.token){
        url += "/" + props.token.id;
    }

    return(
        <>
            <Link href = {url}>
                {props.component}
                <span>{props.name}</span>
                {console.log("navigate to " + props.name + " icon")}
            </Link>
        </>
    )
}
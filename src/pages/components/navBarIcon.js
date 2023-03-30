import Link from "next/link"

export default function NavBarIcon(props) {
    return(
        <>
            <Link href = {props.url}>
                {props.component}
                <span>{props.name}</span>
                {console.log("navigate to " + props.name + " icon")}
            </Link>
        </>
    )
}
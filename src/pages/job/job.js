export default function Jobb({props}){
    return (
        <>
            <h1>{props.title}</h1>
            <h2>{props.company.name}</h2>
            <p>{props.description}</p>
            <p>{props.endDate}</p>
        </>
    )
}
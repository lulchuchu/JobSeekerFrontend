export default function Experience({props}){
    console.log('props', props)
    return (
        <>
            <h2>{props.title}</h2>
            <h3>{props.company.name}</h3>
            <div className="date">
                <p>{props.startDate}</p>

            </div>
            
        </>
    )
}
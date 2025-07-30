export default function Card(props){
    return(
        <div>
            <p>
                name : {props.details.name} <br/>
                Age : {props.details.age} <br />
                Gender : {props.details.gender} <br />
            </p>
        </div>
    )
}
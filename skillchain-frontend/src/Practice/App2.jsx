import Card from "./Heading";
import UploadFile from "./UploadFile";


function App2(){

    var numbers = [1,2,3,4,5];

    var res = numbers.reduce((acc, num) => acc + num)

    return(
        <div>
            <h1>{res}</h1>
            <UploadFile />
        </div>
    )
}

export default App2;
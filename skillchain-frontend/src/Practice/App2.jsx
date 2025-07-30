import Card from "./Heading";


function App2(){

    var numbers = [1,2,3,4,5];

    var res = numbers.reduce((acc, num) => acc + num)

    return(
        <div>
            <h1>{res}</h1>
        </div>
    )
}

export default App2;
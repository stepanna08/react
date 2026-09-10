export function Abc(){
    const zmienna1 = "a1"
    const zmienna2 = "a2"
    const tablica1 = [zmienna1,zmienna2]
    const tablica2 = [1,2,4,5,6,1,2,9]

    return (<>
    <ul>
        <li>{zmienna1}</li>
        <li>{zmienna2}</li>
    </ul>    
    <ul>
        {tablica1.map(element =>{ return (<li>{element}</li>)})}
    </ul>    
    <ul>
        {tablica2.filter(element =>{ if (element%2==0) {return (<li>{element}</li>)}})}
    </ul>
    </>)
}
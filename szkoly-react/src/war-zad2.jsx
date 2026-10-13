import { useState } from "react";

/*

export default function InfoUczen({uczen,czyObecny,numerDziennika}){
    return (<>
    <PrzykladAND uczen = {uczen} czyObecny={czyObecny} numerDziennika={numerDziennika}></PrzykladAND>
    </>)
}
function PrzykladAND({uczen,czyObecny,numerDziennika}){
    return (<>
    <p>{uczen},{numerDziennika}</p>
    {czyObecny && (<p>obecny</p>)}
    {!czyObecny && (<p>nieobecny</p>)}
    </>)
}
    */
export default function PrzyciskZapisz(){
    return (<><Wyswietl></Wyswietl></>)
}
    /*{!czyZapisano && (<button onClick={onZapisz}>Zapisz</button>)}
    {czyZapisano && (<p>Zmiany zostały zapisane</p>)}*/
    /* */
function Wyswietl(){
   const [czyZapisano, setZapis] = useState(false);
   const onZapisz =(()=> {
    setZapis(poprzedniStan => !poprzedniStan);})
    return (<>
        {czyZapisano
        ? <p>Zmiany zostały zapisane</p>
        : <button onClick={onZapisz}>Zapisz</button>
} 

    </>)
}
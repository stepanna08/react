import { useState } from "react";

export default function InfoUczen({uczen = "Pyrka",czyObecny = true,numerDziennika = 14}){
    return (<>
    <PrzykladAND></PrzykladAND>
    
    </>)
}
function PrzykladAND(){
    /*const uczen = "Pyrka"
    const czyObecny = true
    const numerDziennika = 14*/
    return (<>
    <p>{uczen},{numerDziennika}</p>
    {czyObecny && (<p>obecny</p>)}
    {!czyObecny && (<p>nieobecny</p>)}
    </>)
}
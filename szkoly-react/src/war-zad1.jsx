import { useState } from "react";

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
/*export default function PrzyciskZapisz(){
    return (<><Wyswietl></Wyswietl></>)
}
{!czyZapisano && (<button onClick={onZapisz}>Zapisz</button>)}
    {czyZapisano && (<p>Zmiany zostały zapisane</p>)}
    
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
 */

import { useState } from "react";

export default function KartaUcznia({imie,klasa,srednia,czyAktywny}){
    return (<><Wyswietl imie = {imie} klasa = {klasa} srednia = {srednia} czyAktywny = {czyAktywny}></Wyswietl></>)
}

function Wyswietl({imie,klasa,srednia,czyAktywny}){

    return (<>
    {czyAktywny
    ? imie
    : null}
    {srednia >= 4 && <p style = {{ color: 'green' }}>DOBRA</p>}
    {srednia >= 3 && srednia < 4 && <p style = {{ color: 'yellow' }}>SREDNIA</p>}
    {srednia < 3 && <p style = {{ color: 'red' }}>SLABA</p>}
    {srednia >= 4.75 && <p>STYPENDIUM SZKOLNE</p>}
    </>)
}
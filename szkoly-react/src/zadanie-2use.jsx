/*	Zadanie 2 - Łatwe (Oceny ucznia)
	Stwórz komponent 'OcenyUcznia', który:
	- Przechowuje tablice ocen (stan), np. [5, 4, 3]
	- Umożliwia dodanie oceny przez input numeryczny (wartosci 1-6)
	- Wyświetla wszystkie oceny jako listę
	- Wyświetla średnią ocen obliczoną na bieżąco
		(podpowiedź: suma / ilość, metoda reduce lub pętla) - zaokrąglona do 2 miejsc po przecinku

	Podpowiedź obliczania średniej (
		const srednia = oceny.length > 0
			? (oceny.reduce((suma, o) => suma + o, 0) / oceny.length).toFixed(2)
			: 0;
	)
*/
import { useState } from 'react';

export function  OcenyUcznia(){
    const [stan,setOceny] = useState([5,4,3]);

    function ZmienOceny(){
        const ocena = parseInt(document.getElementById("ocenawpis").value);
        if (ocena > 0 && ocena < 7){
        setOceny(oceny => [...oceny, ocena]);}s
    }
    function Srednia(oceny){
        const srednia = oceny.length > 0
			? (oceny.reduce((suma, o) => suma + o, 0) / oceny.length).toFixed(2)
			: 0;
	return srednia;
    }
    return (<div>
        <input id = "ocenawpis" type = "number"></input>
        <button onClick={ZmienOceny}>Dodaj ocene</button>
        {stan.map(ocena => (<>
            <li>{ocena}</li>
        </>))}
        <p>Srednia {Srednia(stan)}</p>
    </div>)
}
/*	Zadanie 3 - Średnie (Lista obecności)
	Stwórz komponent 'ListaObecnosci', który:
	- Ma tablice uczniów (stan), każdy uczeń to obiekt: { id, imie, obecny: false }
	- Zaczyna z co najmniej 4 predefiniowanymi uczniami
	- Wyświetla listę uczniów z checkboxem przy każdym
	- Kliknięcie checkboxa przełącza pole 'obecny' dla danego ucznia
		(WAZNE: nie mutuj tablicy - użyj map() do stworzenia nowej wersji)
	- Na dole wyświetla: "Obecnych: X / Y" (X - obecni, Y - wszyscy)

	Podpowiedź do przełączania obecności (
		setUczniowie(poprzedni =>
			poprzedni.map(u =>
				u.id === id ? { ...u, obecny: !u.obecny } : u
			)
		);
	)
*/

import { useState } from "react";

export function ListaObecnosci(){
    const [stan,setUczen] = useState([{
        id: 1,
        imie: "Anna",
        obecny: false
    },
{
        id: 2,
        imie: "Mateusz",
        obecny: false
    },
{
        id: 3,
        imie: "Zofia",
        obecny: false
    },
{
        id: 4,
        imie: "Lena",
        obecny: false
    }])

    function ZmienObecnosc(){
		setUczniowie(poprzedni =>
			poprzedni.map(u =>
				u.id === id ? { ...u, obecny: !u.obecny } : u
			)
		);}
    function SprawdzObecnosc(){
        let iloscObecnych = 0;
        stan.map(uczen => (
            uczen.obecny ?  iloscObecnych++ : 0
        ))
        return iloscObecnych;
    }
    return (<div>
        <button onClick={ZmienObecnosc}></button>
        {stan.map(uczen => (<>
            <li>{uczen.imie}<input  type="checkbox" checked = {uczen.obecny} onChange={SprawdzObecnosc} id = {uczen.id}></input></li>
            
        </>))}
        <p>{<SprawdzObecnosc/>}</p>
    </div>)
    }
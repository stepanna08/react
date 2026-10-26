/*
import { createContext, useContext, useState } from "react";

const SchoolNameContext = createContext(null);
export function SchoolNameProvider({ children }){
    const [nazwa] = useState('Liceum Ogólnokształcące nr 1 im. Jana Kochanowskiego');
    return(<>
    <SchoolNameContext.Provider value = {nazwa}>
        {children}
    </SchoolNameContext.Provider>
    </>)
}

export function SchoolHeader(){
    const nazwa = useContext(SchoolNameContext)
    return (<h1>NAZWA {nazwa}</h1>)
}
    */

/*	Zadanie 2 - Poziom: Łatwy
	Temat: Context z możliwością zmiany danych

	Stwórz system zmiany klasy dla ucznia.
	Wymagania:
	1. Utwórz StudentContext przechowujący obiekt { name: 'Jan Kowalski', class: '1A' }
	2. Dodaj do Providera funkcję changeClass(newClass) która aktualizuje klasę ucznia
	3. Stwórz komponent StudentInfo wyświetlający imię i klasę ucznia
	4. Stwórz komponent ClassChanger z przyciskami: "1A", "2B", "3C"
		- Kliknięcie przycisku zmienia klasę ucznia w Contexcie
	5. Oba komponenty mają działać bez przekazywania props

	Oczekiwany wynik:
	Wyświetla się "Jan Kowalski - Klasa: 1A"
	Po kliknięciu "2B" zmienia się na "Jan Kowalski - Klasa: 2B"
*/

import { createContext, useContext, useState } from "react";

const ZmianaKlasyContext = createContext(null);
export function UczenProvider({ children }){
	const [uczen, setUczen] = useState({ name: 'Jan Kowalski', class: '1A' });

	const changeClass = (klasa) => {
		setUczen(uczen.class = klasa)
	}
	return (<ZmianaKlasyContext.Provider value = {{uczen,changeClass}}>
		{children}
	</ZmianaKlasyContext.Provider>)
}
export function StudentInfo(){
	const {uczen} = useContext(ZmianaKlasyContext);
	return(<>
	{uczen.name}
	</>)

}
export function ClassChanger(){
	const {changeClass} = useContext(ZmianaKlasyContext);
	return (<>
	<button onClick={changeClass("A")}>KLASA a</button>
	</>)
}
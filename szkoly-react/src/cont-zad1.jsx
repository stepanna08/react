/*	Zadanie 1 - Poziom: Łatwy
	Temat: Pierwszy własny Context

	Stwórz Context o nazwie SchoolNameContext przechowujący nazwę szkoły.
	Wymagania:
	1. Utwórz SchoolNameContext używając createContext()
	2. Stwórz komponent SchoolNameProvider który w stanie przechowuje
		nazwę szkoły "Liceum Ogólnokształcące nr 1 im. Jana Kochanowskiego"
	3. Stwórz komponent SchoolHeader który pobiera nazwę z Context
		i wyświetla ją w tagu <h1>
	4. Złóż wszystko w App i uruchom

	Oczekiwany wynik:
	Na stronie widoczny nagłówek z pełną nazwą szkoły.

	Wskazówka: Pamiętaj o "owinięciu" SchoolHeader w SchoolNameProvider!
*/

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
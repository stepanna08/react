/*	Utwórz komponent PersonCard z destrukturyzacją props:
	- firstName (string)
	- lastName (string)
	- age (number)
	- occuption (string, domyślnie "Bez zawodu")

	Wyświetl dane w karcie osoby.
*/
export function PersonCard({firstname,lastname,age,occupation = "Bez zawodu"}){
    //const {firstname,lastname,age,occupation} = props;
    return (<div>
        <p>Nazwisko: {lastname}</p>
        <p>Imię: {firstname}</p>
        <p>Wiek: {age}</p>
        <p>Zawód: {occupation}</p>
    </div>)
}
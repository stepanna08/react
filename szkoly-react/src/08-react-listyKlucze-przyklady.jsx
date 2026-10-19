import { useState } from 'react';

export default function Przyklady() {
	return (<div>
		<PrzykladMap />
		<PrzykladFilter />
		<PrzykladSort />
	</div>)
}

function PrzykladMap() {
	let iloscUczniow = 0;
	const [uczniowie, setUczniowie] = useState([]);

	const dodajUcznia = () => {
		let imie = prompt('Podaj imię ucznia');
		if (!imie) {
			return;
		}

		let nazwisko = prompt('Podaj nazwisko ucznia');
		if (!nazwisko) {
			return;
		}

		setUczniowie([...uczniowie, {id: iloscUczniow++, imie: imie, nazwisko: nazwisko}])
	}

	return (<div>
		<h2>Przykład .map</h2>

		<h3>Lista uczniów:</h3>
		<ul>
			{uczniowie.map(
				(uczen) => {
					return (<li key={uczen.id}>{uczen.imie} {uczen.nazwisko}</li>)
				}
			)}

			{/* wyjaśnienie:
			1. oryginalna tablica uczniowie:
				0: {imie: 'Jan', nazwisko: 'Kowalski'},
				1: {imie: 'Jan', nazwisko: 'Nowak'}
			2. uczniowie.map(...) zwraca tablicę JSXów:
				(<li>Jan Kowalski</li>),
				(<li>Jan Nowak</li>)
			3. {uczniowie.map(...)} wywołuje 'uczniowie.map(...).join()' i zwraca HTML:
				<li>Jan Kowalski</li>
				<li>Jan Nowak</li>
			*/}
		</ul>
		<button onClick={dodajUcznia}>Dodaj ucznia</button>
		<br /><br /><br />
	</div>)
}

function PrzykladFilter() {
	let iloscOcen = 0;
	const [oceny, setOceny] = useState([])

	const dodajOcene = () => {
		let ocena = prompt('Podaj ocenę');
		if (ocena) {
			setOceny([...oceny, {id: iloscOcen++, ocena: ocena}])
		}
	}

	function wypiszOceny(oceny) {	//	Zmienna oceny to nie jest getter oceny z useState. To jest zmienna lokalna
		return (<ul>
			{oceny.map((ocena) => {
				return (<li key={ocena.id}>{ocena.ocena}</li>)
			})}
		</ul>);
	}

	return (<div>
		<h2>Przykład .filter</h2>

		<h3>Lista wszystkich ocen:</h3>
		{wypiszOceny(oceny)}

		<h3>Lista ocen poniżej 3:</h3>
		{wypiszOceny(
			oceny.filter(
				(ocena) => { // zwraca tablicę przefiltrowaną
					return ocena < 3;	//	zwróć bool: czy dany element tablicy ma być w tablicy wynikowej?
				}
			)
		)}
		<button onClick={dodajOcene}>Dodaj ocenę</button>
		<br /><br /><br />
	</div>)
}

function PrzykladSort() {
	let iloscOcen = 0;
	const [oceny, setOceny] = useState([])

	const dodajOcene = () => {
		let ocena = prompt('Podaj ocenę');
		if (ocena) {
			setOceny([...oceny, {id: iloscOcen++, ocena: parseInt(ocena)}])
		}
	}

	function wypiszOceny(oceny) {	//	Zmienna oceny to nie jest getter oceny z useState. To jest zmienna lokalna
		return (<ul>
			{oceny.map((ocena) => {
				return (<li key={ocena.id}>{ocena.ocena}</li>)
			})}
		</ul>);
	}

	return (<div>
		<h2>Przykład .sort</h2>

		<h3>Lista wszystkich ocen:</h3>
		{wypiszOceny(oceny)}

		<h3>Lista ocen posortowanych od najwyższej:</h3>
		{wypiszOceny(
			[...oceny].sort(
				(prev, next) => {
					if (prev.ocena > next.ocena) {
						return -1;	//	-1:	wpierw pierwszy element, a potem drugi
					} else if (prev.ocena < next.ocena) {
						return 1;	//	1:	wpierw drugi element, a potem pierwszy
					} else {
						return 0;	//	0:	nie zmieniaj kolejności
					}
				}
			)
		)}
		<button onClick={dodajOcene}>Dodaj ocenę</button>
		<br /><br /><br />
	</div>)
}

import { useState } from 'react';

export default function Przyklady() {
	return (<>
		<PrzykladAnd />

		<PrzykladOr />

		<PrzykladTernary />

		<br /><br /><h2>przykład null</h2>
		<p>jeśli fałsz, to zwróć null zamiast JSX<br/><br/></p>
		<PrzykladNull />

		<PrzykladIfElse />
	</>)
}

function PrzykladAnd() {
	const czyZalogowany = true;
	const login = 'Ziutek';

	return (<>
		<br /><br /><h2>przykład && (AND)</h2>
		<p>Jeśli prawda, to wyświetl<br/><br/></p>
		{czyZalogowany && (<><span onClick={() => alert('czyZalogowany jest true')}>Cześć {login}!</span></>)}
	</>)
}

function PrzykladOr() {
	const czyZalogowany = false;

	return (<>
		<br /><br /><h2>przykład || (OR)</h2>
		<p>Jeśli fałsz, to wyświetl<br/><br/></p>
		{czyZalogowany || (<>
			Aby się zalogować, klinij <button onClick={() => alert('Kliknieto: Zaloguj się')}>Zaloguj się</button>
		</>)}
	</>)
}

function PrzykladTernary() {
	const [czyZalogowany, setCzyZalogowany] = useState(false);
	const login = 'Ziutek';

	return (<>
		<br /><br /><h2>przykład ?: (ternary)</h2>
		<p>wyświetl ? tekstJeśliPrawda : tekstJesliFalsz<br/><br/></p>
		{czyZalogowany
		?	(<span onClick={() => setCzyZalogowany(!czyZalogowany)}>Cześć {login}!</span>)
		:	(<>
			Aby się zalogować, klinij <button onClick={() => setCzyZalogowany(!czyZalogowany)}>Zaloguj się</button>
		</>)
		}
	</>)
}

function PrzykladNull() {
	const czyZalogowany = false;
	const login = 'Ziutek';

	if (!czyZalogowany) {
		return null;
	}

	return (<>
		Cześć {login}!
	</>)
}

function PrzykladIfElse() {
	const [czyZalogowany, setCzyZalogowany] = useState(false);
	const login = 'Ziutek';

	const wyswietlLogowanie = () => {
		if (czyZalogowany) {
			return (<span onClick={() => setCzyZalogowany(!czyZalogowany)}>Cześć {login}!</span>)
		} else {
			return (<>
				Aby się zalogować, klinij <button onClick={() => setCzyZalogowany(!czyZalogowany)}>Zaloguj się</button>
			</>)
		}
	}

	return (<>
		<br /><br /><h2>przykład if else</h2>
		<p>Użycie klasycznego if/else<br/><br/></p>
		{wyswietlLogowanie()}
	</>)
}

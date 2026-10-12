import { useState, useEffect } from "react";
/*
export function Zegar() {
	let data = new Date(); // 8:00
	const [aktualnyCzas, setAktualnyCzas] = useState((new Date()).getTime())
    useEffect(() => {
		const czas = setInterval(()=>{
			setAktualnyCzas((new Date()).getTime())

		},100)
		return () => {
			clearInterval(czas)
		}
    });
	const wyswietlCzas = () => {
		data.setTime(aktualnyCzas);
		return data.toLocaleTimeString();
	}
	return (
		<div>
			<p>{wyswietlCzas()}</p>
		</div>
	)
}
*/
/*
	import { useState, useEffect } from 'react';

	function ZapisywaczNotatek() {
		// Przy inicjalizacji stanu czytamy z localStorage
		// Jeśli nie ma zapisanych notatek, używamy pustego ciągu
		const [notatka, setNotatka] = useState(() => {
			return localStorage.getItem('notatka-lekcja') || '';
		});

		const [zapisano, setZapisano] = useState(false);

		// Zapisujemy do localStorage za każdym razem gdy zmieni się notatka
		useEffect(() => {
			// Małym opóźnieniem (debounce) zapobiegamy zapisywaniu po każdej literce
			const timer = setTimeout(() => {
				localStorage.setItem('notatka-lekcja', notatka);
				setZapisano(true);

				// Po 2 sekundach ukryj komunikat "zapisano"
				setTimeout(() => setZapisano(false), 2000);
			}, 500);

			return () => clearTimeout(timer); // cleanup - anuluj Jeśli użytkownik dalej pisze
		}, [notatka]); // uruchamia się gdy zmieni się 'notatka'

		return (
			<div>
				<h3>Moje notatki z lekcji</h3>
				<textarea
					value={notatka}
					onChange={e => setNotatka(e.target.value)}
					rows={5}
					cols={40}
					placeholder="Wpisz swoje notatki..."
				/>
				{zapisano && <p style={{ color: 'green' }}>Zapisano automatycznie!</p>}
			</div>
		);
	}
*/



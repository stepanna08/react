import { useState, useEffect } from "react";

/*
function tytulStrony() {
	const [licznik, setLicznik] = useState(0);

	// useEffect bez tablicy zależnosci - uruchamia się po KAŻDYM wyrenderowaniu
	useEffect(() => {
		document.title = `Kliknięto ${licznik} razy`;
		// Wynik: tytuł strony zmienia się przy każdym kliknieciu
	});

	return (
		<button onClick={() => setLicznik(l => l + 1)}>
			Kliknij mnie ({licznik})
		</button>
	);
}
	const interval = setInterval(() => {
    console.log('This will be called every 2 seconds');
  }, 2000);
*/

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
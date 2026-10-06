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
*/

function zegar() {
    const [zegar, setZegar] = useState(0)

    useEffect(() => {
        document.title = zegar;
        

    })
}
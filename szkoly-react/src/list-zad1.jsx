/*
jsx (
		// Dane reprezentujące uczniów w systemie szkolnym
		const uczniowie = [
			{ id: 101, imie: 'Anna', nazwisko: 'Kowalska', klasa: '3A' },
			{ id: 102, imie: 'Bartek', nazwisko: 'Nowak', klasa: '3A' },
			{ id: 103, imie: 'Celina', nazwisko: 'Wisniowska', klasa: '3A' },
			{ id: 104, imie: 'Daniel', nazwisko: 'Dabrowski', klasa: '3A' },
		];

		function ListaUczniow() {
			return (
				<div>
					<h2>Lista uczniów klasy 3A</h2>
					<ul>
						{uczniowie.map(uczen => (
							// key musi być na najwyższym elemencie w map()
							// używamy id ucznia, które jest unikalne i stabilne
							<li key={uczen.id}>
								{uczen.imie} {uczen.nazwisko}
							</li>
						))}
					</ul>
				</div>
			);
		}

		export default ListaUczniow;
	)
*/
const przedmioty = ["Matematyka", "Polski", "Angielski", "Historia", "Fizyka", "Chemia", "Biologia"]
export function ListaPrzedmiotow(){
    return (<>
    
    <ul>
        {przedmioty.map(przedmiot => (
            <li>{przedmiot}</li>
        ))}
    </ul>

    </>)
}
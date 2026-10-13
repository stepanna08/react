// #region wstęp
/*	Cel lekcji
	W tej lekcji nauczysz się, jak wyświetlać listy elementów w React.
	Dowiesz się, dlaczego React wymaga specjalnego atrybutu 'key' przy renderowaniu list
	oraz jak poprawnie używać metody map() do generowania list komponentów.
*/

/*	Co będziesz umiał po tej lekcji
	- Renderować listy elementów za pomocą metody map()
	- Rozumieć, dlaczego atrybut 'key' jest ważny i jak go poprawnie używać
	- Unikać błędów związanych z brakującymi lub niepoprawnymi kluczami
	- Rozumieć, jak klucze wpływają na wydajność i zachowanie stanu w liście
	- Filtrować i sortować listy przed ich wyświetleniem
*/
// #endregion


// #region informacje
/*	Czym jest renderowanie listy w React
	Bardzo często w aplikacjach mamy do czynienia z listami danych - np. lista uczniów,
	lista przedmiotów, lista ocen. W React nie używamy pętli for do generowania elementów JSX.
	Zamiast tego używamy metody tablicowej map(), która przekształca każdy element tablicy
	na element JSX.

	Przykład koncepcyjny:
	- Mamy tablice: ['Ania', 'Bartek', 'Celina']
	- Chcemy wyświetlić każde imię jako osobny element <li>
	- map() przechodzi przez każdy element i zwraca nowy element JSX
*/

/*	Czym jest props 'key'
	Kiedy tworzysz listę elementów w React, każdy element musi mieć unikalny atrybut 'key'.
	Jest to specjalny atrybut zarezerwowany przez React - nie jest przekazywany do komponentu
	jako props, ale jest używany wewnętrznie przez React.

	Po co React potrzebuje kluczy?
	React używa kluczy, aby wiedzieć, które elementy listy zmieniły się, zostały dodane
	lub usunięte. Dzięki temu może efektywnie aktualizować tylko te elementy, które
	faktycznie się zmieniły, zamiast przerysowywać całą listę od nowa.

	Wyobraź sobie listę zakupów na kartce papieru. Jeśli chcesz zmienić drugi punkt,
	znacznie szybciej jest wymazać tylko ten jeden punkt i napisać nowy, niż przepisywać
	całą listę od nowa. React działa podobnie - klucze są jak numery na liście zakupów,
	które pomagają React zidentyfikować każdy element.
*/

/*	Zasady dotyczące kluczy
	1. Klucze muszą być UNIKALNE wśród elementów tej samej listy (rodzeństwa)
	   - nie muszą być unikalne globalnie w całej aplikacji

	2. Klucze powinny być STABILNE - nie zmieniają się między renderowaniami
	   - dobre: id z bazy danych, unikalny identyfikator
	   - złe: indeks tablicy (Jeśli kolejność może się zmieniać), Math.random()

	3. Klucze MUSZĄ być przypisane do najwyższego elementu w każdej iteracji map()
	   - Jeśli Map() zwraca komponent <UczenRow>, to key dajemy na <UczenRow>, nie na elementy wewnątrz

	4. NIE UŻYWAJ indeksu tablicy jako klucza, Jeśli lista może być zmieniana
	   - dodawanie, usuwanie elementów z listy przy użyciu indeksu jako klucza
		 powoduje błędy stanu i problemy z wydajnością
	   - można użyć indeksu tylko gdy: lista jest statyczna i się nie zmienia
*/

/*	Wpływ kluczy na stan komponentu
	To jest bardzo ważne zagadnienie! Jeśli używasz niepoprawnych kluczy, możesz napotkać
	dziwne błędy ze stanem komponentów w liście.

	Przykład problemu:
	Wyobraź sobie listę trzech komponentów input ze stanem (wpisany tekst).
	Jeśli użyjesz indeksu jako klucza i usuniesz PIERWSZY element:
	- React widzi, że 'key=0' nadal istnieje (bo teraz jest nowy pierwszy element)
	- Myśląc, że to ten sam element, React ZACHOWUJE jego stan (wpisany tekst)
	- W efekcie tekst 'przesuwa się' na zły element - to błąd!

	Z poprawnymi kluczami (np. id):
	- React widzi, ze element z 'key=id_pierwszego' zniknął
	- Niszczy jego stan razem z nim
	- Pozostałe elementy zachowują swoje stany poprawnie
*/
// #endregion


// #region przydatne-funkcje
/*	Metoda Array.map()
	Opis: Przechodzi przez każdy element tablicy i zwraca nową tablicę
	z przetworzonymi elementami. W React uzywamy jej do tworzenia list JSX.

	Składnia: tablica.map((element, indeks) => { return nowyElement })
	lub skrocona: tablica.map(element => nowyElement)

	Przykład:
	javascript (
		const liczby = [1, 2, 3, 4, 5];
		const podwojone = liczby.map(n => n * 2);
		// Wynik: [2, 4, 6, 8, 10]
	)
*/

/*	Przykład uzycia map() do generowania JSX
	javascript (
		const imiona = ['Ania', 'Bartek', 'Celina'];

		// Zamieniamy każde imię na element <li>
		const listaJSX = imiona.map((imie, indeks) => (
			<li key={indeks}>{imie}</li>
			// Tutaj używamy indeksu tylko jako przykład - w praktyce lepiej użyć id
		));

		// Wynik w przegladarce:
		// - Ania
		// - Bartek
		// - Celina
	)
*/

/*	Zadanie praktyczne - map()
	Masz tablicę ocen: [5, 3, 4, 2, 5, 1]
	Użyj map(), aby stworzyć nową tablicę, gdzie każda ocena jest opisana słownie:
	5 -> 'bardzo dobry', 4 -> 'dobry', 3 -> 'dostateczny', 2 -> 'dopuszczajacy', 1 -> 'niedostateczny'
	Wskazówka: Użyj obiektu słownika lub instrukcji switch wewnątrz map()
*/

/*	Metoda Array.filter()
	Opis: Zwraca nową tablicę zawierającą tylko te elementy, dla których
	funkcja zwróciła true. Często używana przed map() do filtrowania listy.

	Przykład (
		const uczniowie = [
			{ id: 1, imie: 'Ania', srednia: 4.5 },
			{ id: 2, imie: 'Bartek', srednia: 2.8 },
			{ id: 3, imie: 'Celina', srednia: 3.9 },
		];

		// Filtrujemy uczniów ze średnią powyżej 4.0
		const wzorowiUczniowie = uczniowie.filter(uczen => uczen.srednia >= 4.0);
		// Wynik: tylko Ania

		// Możemy połączyć filter z map()
		const lista = uczniowie
			.filter(uczen => uczen.srednia >= 4.0)
			.map(uczen => <li key={uczen.id}>{uczen.imie}</li>);
	)
*/

/*	Zadanie praktyczne - filter()
	Masz listę przedmiotów szkolnych z ocenami
	Użyj filter(), aby wyświetlić tylko te przedmioty, z których uczeń ma ocenę niedostateczną (1 lub 2)
	Następnie wyświetl te przedmioty jako listę punktowaną <ul>
*/

/*	Metoda Array.sort()
	Opis: Sortuje elementy tablicy. UWAGA: sort() modyfikuje oryginalna tablicę, więc w React przed
	sortowaniem należy stworzyć kopię np. przez wykorzystanie parametru resztowego: [...tablica].sort()

	Przykład (
		const uczniowie = ['Celina', 'Ania', 'Bartek'];

		// ŹRÓDŁO BŁĘDÓW - modyfikuje oryginalną tablicę!
		// uczniowie.sort()

		// POPRAWNIE - tworzymy kopie i sortujemy
		const posortowani = [...uczniowie].sort();
		// Wynik: ['Ania', 'Bartek', 'Celina']

		// Sortowanie obiektów po polu
		const uczniowieObiekty = [
			{ id: 1, imie: 'Celina', srednia: 3.5 },
			{ id: 2, imie: 'Ania', srednia: 4.5 },
		];
		const posortowaniPoSredniej = [...uczniowieObiekty].sort((a, b) => b.srednia - a.srednia);
		// Wynik: najpierw Ania (4.5), potem Celina (3.5)
	)
*/

/*	Zadanie praktyczne - sort()
	Masz listę uczniów z imionami i nazwiskami
	Użyj sort(), aby posortować ich alfabetycznie po nazwisku
	Pamiętaj, aby nie modyfikować oryginalnej tablicy - Użyj parametru resztowego [...]
*/
// #endregion


// #region Przykłady
/*	Przykład 1 - Prosta lista uczniów
	Renderujemy listę uczniów z bazy danych szkoły.
	Każdy uczeń ma id (używamy go jako key) oraz imię i nazwisko.
*/

/*	Kod:
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

	Wynik w przeglądarce:
	Lista uczniów klasy 3A
	- Anna Kowalska
	- Bartek Nowak
	- Celina Wiśniowska
	- Daniel Dąbrowski
*/

/*	Zadanie do przykładu 1
	Zmodyfikuj powyższy komponent, aby wyświetlał również klasę obok imienia i nazwiska,
	np: 'Anna Kowalska (3A)'
	Dodaj do danych pole 'srednia' dla każdego ucznia i wyświetl je w nawiasach kwadratowych
*/

/*	Przykład 2 - Lista z oddzielnym komponentem dla każdego elementu
	Zamiast pisać cały HTML wewnątrz map(), tworzymy oddzielny komponent
	dla jednego wiersza listy. To dobra praktyka dla bardziej złożonych list.
*/

/*	Kod jsx (
	// Dane - plan lekcji
	const lekcje = [
		{ id: 1, przedmiot: 'Matematyka', nauczyciel: 'Pan Kowalski', sala: '101', godzina: '8:00' },
		{ id: 2, przedmiot: 'Polski', nauczyciel: 'Pani Nowak', sala: '202', godzina: '9:00' },
		{ id: 3, przedmiot: 'Fizyka', nauczyciel: 'Pan Wiśniewski', sala: '301', godzina: '10:00' },
	];

	// Oddzielny komponent dla jednej lekcji
	// UWAGA: 'key' NIE jest dostępne jako props wewnątrz komponentu
	// Jest używane tylko przez React wewnętrznie
	function WierszLekcji({ lekcja }) {
		return (
			<tr>
				<td>{lekcja.godzina}</td>
				<td>{lekcja.przedmiot}</td>
				<td>{lekcja.nauczyciel}</td>
				<td>Sala {lekcja.sala}</td>
			</tr>
		);
	}

	// Główny komponent tabeli z planem
	function PlanLekcji() {
		return (
			<table>
				<thead>
					<tr>
						<th>Godzina</th>
						<th>Przedmiot</th>
						<th>Nauczyciel</th>
						<th>Sala</th>
					</tr>
				</thead>
				<tbody>
					{lekcje.map(lekcja => (
						// key dajemy na WierszLekcji, nie na elementy wewnątrz!
						<WierszLekcji key={lekcja.id} lekcja={lekcja} />
					))}
				</tbody>
			</table>
		);
	}

	export default PlanLekcji;

	// Wynik - tabela z trzema wierszami dla Matematyki, Polskiego i Fizyki
*/

/*	Zadanie do Przykładu 2
	Dodaj do tabeli kolumnę 'status' pokazującą czy lekcja już minęła, trwa teraz, lub dopiero będzie
	Dodaj pole 'status' do danych (możliwe wartości: 'minela', 'trwa', 'nadchodzi')
	W komponencie WierszLekcji wyświetl status z odpowiednim kolorem tekstu (CSS inline style)
*/

/*	Przykład 3 - Filtrowanie i sortowanie listy
	Pokazujemy listę ocen ucznia z możliwością filtrowania po przedmiocie
	oraz wyświetlania tylko niedostatecznych ocen.
*/

/*	Kod jsx (
	import React, { useState } from 'react';

	// Dane - oceny ucznia Anny Kowalskiej
	const ocenyDane = [
		{ id: 1, przedmiot: 'Matematyka', ocena: 5, data: '2024-01-15' },
		{ id: 2, przedmiot: 'Polski', ocena: 3, data: '2024-01-16' },
		{ id: 3, przedmiot: 'Matematyka', ocena: 2, data: '2024-01-20' },
		{ id: 4, przedmiot: 'Fizyka', ocena: 4, data: '2024-01-22' },
		{ id: 5, przedmiot: 'Polski', ocena: 5, data: '2024-01-25' },
		{ id: 6, przedmiot: 'Fizyka', ocena: 1, data: '2024-01-28' },
	];

	function DziennikOcen() {
		// Stan do filtrowania: 'wszystkie' lub 'niedostateczne'
		const [filtr, setFiltr] = useState('wszystkie');

		// Filtrujemy oceny na podstawie wybranego filtru
		const wyfiltrowane = ocenyDane.filter(ocena => {
			if (filtr === 'niedostateczne') {
				return ocena.ocena <= 2; // zostawiamy tylko oceny 1 i 2
			}
			return true; // zostawiamy wszystko
		});

		// Sortujemy po dacie (najnowsze na górze)
		// WAZNE: używamy spreadu [...], żeby nie modyfikować oryginalnej tablicy
		const posortowane = [...wyfiltrowane].sort((a, b) =>
			new Date(b.data) - new Date(a.data)
		);

		return (
			<div>
				<h2>Dziennik ocen - Anna Kowalska</h2>

				// Przyciski do przełączania filtru
				<div>
					<button onClick={() => setFiltr('wszystkie')}>Wszystkie oceny</button>
					<button onClick={() => setFiltr('niedostateczne')}>Tylko niedostateczne</button>
				</div>

				// Informacja ile ocen jest widocznych
				<p>Wyświetlono: {posortowane.length} ocen</p>

				<ul>
					{posortowane.map(ocena => (
						// key musi być unikalne - używamy id oceny
						<li key={ocena.id}>
							{ocena.data} - {ocena.przedmiot}: {ocena.ocena}
						</li>
					))}
				</ul>
			</div>
		);
	}

	export default DziennikOcen;

	// Wynik:
	// - Początkowo wyświetla wszystkie 6 ocen posortowane od najnowszej
	// - Po kliknięciu 'Tylko niedostateczne' wyświetla tylko oceny 1 i 2 (Matematyka: 2, Fizyka: 1)
*/

/*	Zadanie do Przykładu 3
	Dodaj trzeci przycisk 'Tylko pozytywne' (oceny 3, 4, 5)
	Dodaj też możliwość sortowania - nie tylko po dacie, ale też po ocenie (od najwyższej)
	Użyj dodatkowego stanu 'sortowanie' z wartościami 'data' lub 'ocena'
*/

/*	Przykład 4 - Niebezpieczeństwo używania indeksu jako klucza
	DEMO pokazujące dlaczego NIE NALEŻY używać indeksu tablicy jako klucza
	gdy lista może być modyfikowana.
*/

/*	Kod jsx (
	import React, { useState } from 'react';

	// ŹRÓDŁOWY KOMPONENT - pokazuje problem z indeksem jako kluczem
	function ListaZlychKluczy() {
		const [uczniowie, setUczniowie] = useState([
			{ id: 1, imie: 'Anna' },
			{ id: 2, imie: 'Bartek' },
			{ id: 3, imie: 'Celina' },
		]);

		const usunPierwszego = () => {
			// Usuwamy pierwszego ucznia z listy
			setUczniowie(prev => prev.slice(1));
		};

		return (
			<div>
				<h3>Lista ŹLE - klucze jako indeksy</h3>
				<button onClick={usunPierwszego}>Usuń pierwszego ucznia</button>
				<ul>
					{uczniowie.map((uczen, indeks) => (
						// ŹLE! używamy indeksu - po usunięciu elementu
						// React 'myśląc', że key=0 to nadal ten sam element,
						// zachowuje stan dla złego komponentu
						<li key={indeks}>
							{uczen.imie}
							<input placeholder="Wpisz notatkę..." />
						</li>
					))}
				</ul>
				<p>Wpisz coś w pierwszym polu, potem usuń pierwszego ucznia - notatka zostanie na złym elemencie!</p>
			</div>
		);
	}

	// POPRAWNY KOMPONENT - używamy id jako klucza
	function ListaDobrychKluczy() {
		const [uczniowie, setUczniowie] = useState([
			{ id: 1, imie: 'Anna' },
			{ id: 2, imie: 'Bartek' },
			{ id: 3, imie: 'Celina' },
		]);

		const usunPierwszego = () => {
			setUczniowie(prev => prev.slice(1));
		};

		return (
			<div>
				<h3>Lista DOBRZE - klucze jako id</h3>
				<button onClick={usunPierwszego}>Usuń pierwszego ucznia</button>
				<ul>
					{uczniowie.map(uczen => (
						// DOBRZE! używamy unikalnego id - React wie dokładnie
						// który element został usunięty i niszczy jego stan
						<li key={uczen.id}>
							{uczen.imie}
							<input placeholder="Wpisz notatkę..." />
						</li>
					))}
				</ul>
				<p>Wpisz coś w pierwszym polu, potem usuń pierwszego ucznia - notatka zniknie razem z Anną!</p>
			</div>
		);
	}

	export default function Demo() {
		return (
			<div>
				<ListaZlychKluczy />
				<ListaDobrychKluczy />
			</div>
		);
	}

	// Wynik:
	// - W ListaZlychKluczy: wpisz 'test' w pierwszym polu, kliknij 'Usuń' - 'test' zostanie na Bartku (BŁĄD!)
	// - W ListaDobrychKluczy: wpisz 'test' w pierwszym polu, kliknij 'Usuń' - 'test' zniknie razem z Anną (POPRAWNIE)
*/

/*	Zadanie do Przykładu 4
	Stwórz własne demo pokazujące ten problem
	Lista powinna zawierać 4 uczniów, a każdy uczeń ma pole checkbox 'obecny'
	Przetestuj używając najpierw indeksu, a potem id jako klucza
	Sprawdź, co się dzieje z zaznaczeniem checkboxa po usunięciu pierwszego ucznia
*/
// #endregion


// #region zadania
/*	Odpowiedzi do zadań proszę zapisać:
	w formacie 'zadanie-X.js' (X to numer zadania np. 'zadanie-1.js')
	w katalogu 'W:\numerKlasy\przedmiot\data-nazwaPlikuBezRozszerzenia\ImieNazwisko\'
		np. 'W:\1a\algorytmy\20260325-10-tabliceJednowymiarowe\JanKowalski\zadanie-1.js'
	Nie wrzucaj katalogu 'node_modules' ani innych zbędnych (zwłaszcza dużych)
		katalogów, tylko same pliki z rozwiązaniami
*/

/*	Zadanie 1 (proste) - Lista przedmiotów szkolnych
	Stwórz komponent 'ListaPrzedmiotow'.
	Dane: tablica stringów z nazwami przedmiotów: Matematyka, Polski, Angielski, Historia, Fizyka, Chemia, Biologia.
	Wyświetl je jako listę nieuporządkowaną <ul>.
	Ponieważ są to stringi (nie obiekty z id), możesz użyć indeksu jako klucza
	- lista jest statyczna i się nie zmienia.

	Oczekiwany wynik:
	Lista przedmiotów:
	- Matematyka
	- Polski
	- Angielski
	- (i tak dalej...)
*/

/*	Zadanie 2 (lekko trudniejsze) - Karta klasy
	Stwórz komponent 'KartaKlasy'.
	Dane: tablica obiektów uczniów, każdy z polami: id, imie, nazwisko, nrDziennika.
	Wyświetl uczniów jako tabelę HTML z kolumnami: Nr dziennika, Imię, Nazwisko.
	Posortuj uczniów po nrDziennika przed wyświetleniem.
	Użyj id ucznia jako klucza.

	Przykładowe dane do użycia:
	const uczniowie = [
		{ id: 1, imie: 'Celina', nazwisko: 'Wiśniowska', nrDziennika: 3 },
		{ id: 2, imie: 'Anna', nazwisko: 'Kowalska', nrDziennika: 1 },
		{ id: 3, imie: 'Bartek', nazwisko: 'Nowak', nrDziennika: 2 },
	];
*/

/*	Zadanie 3 (średnie) - Dziennik ocen z filtrami
	Stwórz komponent 'DziennikOcen'.
	Dane: tablica ocen z polami: id, przedmiot, ocena (1-6), data.
	Wymagania:
	- Wyświetl listę ocen
	- Dodaj filtr (select) pozwalający wybrać konkretny przedmiot lub 'Wszystkie'
	- Wyświetl średnią ocen z aktualnie wyświetlanych przedmiotów
	- Użyj id jako klucza
	- Jeśli po filtrowaniu nie ma żadnych ocen, wyświetl tekst 'Brak ocen z tego przedmiotu'

	Wskazówka: listę unikalnych przedmiotów do selecta możesz stworzyć używając:
	[...new Set(oceny.map(o => o.przedmiot))]
*/

/*	Zadanie 4 (trudniejsze) - Dynamiczna lista z dodawaniem i usuwaniem
	Stwórz komponent 'ListaObecnosci'.
	Funkcjonalność:
	- Wyświetl listę uczniów z przyciskiem 'Usuń' przy każdym z nich
	- Dodaj formularz z polem tekstowym i przyciskiem 'Dodaj ucznia'
	- Po dodaniu nowego ucznia, generuj dla niego unikalne id (możesz użyć Date.now())
	- Po kliknieciu 'Usuń' usuń ucznia z listy
	- Wyświetl liczbę uczniów na liście

	WAZNE: upewnij się, że używasz poprawnych kluczy (nie indeksów)!
	Przetestuj: zaznacz przy każdym uczniu checkbox 'obecny', potem usuń kogoś ze środka
	i sprawdź czy zaznaczenia pozostały przy właściwych uczniach.
*/

/*	Zadanie 5 (zaawansowane) - Plan lekcji tygodniowy
	Stwórz komponent 'PlanTygodniowy'.
	Dane: obiekt gdzie klucze to dni tygodnia (poniedzialek..piatek),
	a wartości to tablice lekcji (przedmiot, godzina, sala, nauczyciel).

	Przykładowa struktura danych:
	const plan = {
		poniedzialek: [
			{ id: 1, godzina: '8:00', przedmiot: 'Matematyka', sala: '101', nauczyciel: 'pan Kowalski' },
			{ id: 2, godzina: '9:00', przedmiot: 'Polski', sala: '202', nauczyciel: 'pani Nowak' },
		],
		wtorek: [ ... ],
		...
	};

	Wymagania:
	- Wyświetl plan jako 5 sekcji (jedna na dzień tygodnia)
	- Każda sekcja to tabela z lekcjami danego dnia
	- Dodaj możliwość ukrywania/pokazywania planu na dany dzień (przycisk 'Zwiń/Rozwiń')
	- Oznacz aktualny dzień tygodnia (możesz użyć new Date().getDay())
	- Dodaj możliwość filtrowania: wyświetl lekcje tylko z danym nauczycielem

	Wskazówka do kluczy: używaj Object.entries(plan) do iteracji po dniach,
	i id lekcji jako klucze wierszy tabeli.
*/

/*	Zadanie 6 (bardzo trudne) - System zarządzania ocenami klasy
	Stwórz rozbudowany komponent 'SystemOcen'.

	Funkcjonalności:
	1. Wyświetl listę uczniów z ich ocenami z różnych przedmiotów
	2. Każdy uczeń ma tablicę ocen (przedmiot, ocena, waga - np. kartkówka/sprawdzian/odpowiedz)
	3. Oblicz i wyświetl średnią ważoną dla każdego ucznia
	   - wagi: kartkówka=1, odpowiedź=2, sprawdzian=3
	   - średnia ważona = suma(ocena*waga) / suma(wag)
	4. Dodaj możliwość sortowania listy uczniów po: nazwisku (A-Z), średniej (rosnąco/malejąco)
	5. Dodaj filtr: wyświetl tylko uczniów zagrożonych (średnia < 2.0)
	6. Przy każdym uczniu: przycisk 'Dodaj ocenę' otwierający mini-formularz
	   (przedmiot, ocena, typ - kartkówka/odpowiedź/sprawdzian)
	7. Po dodaniu oceny - automatycznie przelicz średnią na żywo

	Wymagania techniczne:
	- Użyj useState do zarządzania listą uczniów i ich ocenami
	- Każdy uczeń i każda ocena musi mieć unikalne id
	- Stwórz oddzielne komponenty: WierszUcznia, FormularzOceny
	- Pamiętaj o poprawnych kluczach wszędzie!

	Przykładowe dane startowe:
	const uczniowieStartowi = [
		{
			id: 1,
			imie: 'Anna',
			nazwisko: 'Kowalska',
			oceny: [
				{ id: 101, przedmiot: 'Matematyka', ocena: 5, typ: 'sprawdzian' },
				{ id: 102, przedmiot: 'Polski', ocena: 4, typ: 'odpowiedz' },
			]
		},
		{
			id: 2,
			imie: 'Bartek',
			nazwisko: 'Nowak',
			oceny: [
				{ id: 201, przedmiot: 'Matematyka', ocena: 2, typ: 'kartkówka' },
				{ id: 202, przedmiot: 'Fizyka', ocena: 1, typ: 'sprawdzian' },
			]
		},
	];
*/
// #endregion


// #region podsumowanie
/*	Podsumowanie lekcji - Listy i Klucze w React
	W tej lekcji nauczyliście się, jak renderować listy danych w React.
	Oto najważniejsze rzeczy, które powinniście pamiętać z tej lekcji:
*/

/*	Kluczowe punkty
	1. DO RENDEROWANIA LIST używamy metody map()
	   - map() przechodzi przez każdą tablicę i zwraca nową tablicę z elementami JSX
	   - Zawsze zwracamy jeden element JSX z każdej iteracji
	   - jsx ( {tablica.map(element => <li>{element}</li>)} )

	2. ATRYBUT key JEST OBOWIĄZKOWY
	   - Każdy element zwrócony przez map() musi mieć prop 'key'
	   - key musi być unikalne wśród elementów w tej samej liście
	   - key powinno być stabilne (nie zmieniać się między renderowaniami)
	   - Najlepsze klucze: id z bazy danych lub inny unikalny identyfikator

	3. NIE UŻYWAJ INDEKSU jako klucza Jeśli:
	   - Lista może zmieniać kolejność elementów
	   - Można dodawać lub usuwać elementy ze środka listy
	   - Elementy mają własny stan (input, checkbox, itp.)
	   - Indeks można użyć TYLKO gdy lista jest statyczna i się nie zmienia

	4. key JEST WEWNĘTRZNE dla React
	   - Props 'key' nie jest dostępne wewnątrz komponentu jako props
	   - Jeśli potrzebujesz wartości klucza wewnątrz komponentu, przekaż ją osobno (np. id={uczen.id})

	5. FILTROWANIE I SORTOWANIE przed renderowaniem
	   - Używaj filter() przed map() żeby wyświetlić tylko wybrane elementy
	   - Używaj [...tablica].sort() (ze spreadem) zamiast tablica.sort() - nie modyfikuj stanu bezpośrednio
	   - Można łączyć: tablica.filter(warunek).sort(porownanie).map(jsx)

	6. WYDAJNOŚĆ
	   - Dobre klucze pomagają React optymalizować renderowanie
	   - React aktualizuje tylko elementy, które faktycznie się zmieniły
	   - Złe klucze powodują niepotrzebne re-rendery lub błędy stanu
*/

/*	Najczęstsze błędy i jak ich unikać
	BLĄD: Brak atrybutu key
	- Symptom: Ostrzeżenie w konsoli: 'Each child in a list should have a unique key prop'
	- Rozwiązanie: Zawsze dodaj key={unikalnaWartość} do najwyższego elementu w map()

	BLĄD: życie indeksu jako klucza przy dynamicznej liście
	- Symptom: Stan przenosi się na zły element po dodaniu/usunięciu elementu
	- Rozwiązanie: Użyj unikalnego id zamiast indeksu

	BLĄD: Modyfikowanie oryginalnej tablicy stanu przez sort()
	- Symptom: React nie wykrywa zmiany lub aplikacja zachowuje się niestabilnie
	- Rozwiązanie: Zawsze użyj spreadu: [...stan].sort()

	BLĄD: key nie na najwyższym elemencie w map()
	- Symptom: Ostrzeżenie w konsoli mimo że dodałeś key
	- Rozwiązanie: Key musi być na elemencie bezpośrednio zwracanym przez map(), nie na jego dzieciach
*/

/*	Przydatne metody tablicowe w React
	- map() - transformacja kazdego elementu (Użyj do tworzenia JSX)
	- filter() - zostawia tylko elementy spelniajace warunek (Użyj do filtrowania)
	- [...tablica].sort() - sortowanie bez modyfikacji oryginalu
	- find() - zwraca pierwszy element spełniający warunek
	- includes() - sprawdza czy element istnieje w tablicy
	- some() - sprawdza czy CHOCIAŻ JEDEN element spełnia warunek
	- every() - sprawdza czy WSZYSTKIE elementy spełniają warunek
	- reduce() - redukuje tablicę do pojedynczej wartości (np. suma, średnia, itp.)
*/
// #endregion

// #region wstęp
/*	W tej lekcji poznasz jeden z najważniejszych "haków" (hooks) w React - useState.
	Dzięki niemu Twoje komponenty będą mogły "pamiętać" dane i reagować na zmiany,
	np. kliknięcia przycisków, wpisywanie tekstu czy zaznaczanie checkboxów.

	W projekcie Systemu Zarządzania Szkołą będziesz używać useState wszędzie -
	od formularzy rejestracji uczniów, przez listy obecności, aż po oceny.
*/

/*	Co będziesz umiał po tej lekcji
	- Wyjaśnić, czym jest stan (state) w komponencie React
	- Użyć hooka useState do przechowywania i aktualizowania danych
	- Aktualizować stan poprawnie (zgodnie z zasadą immutability)
	- Rozróżnić, kiedy użyć zmiennej zwykłej, a kiedy useState
	- Obsługiwać stan będący liczbą, tekstem, wartością logiczną i obiektem
*/
// #endregion


// #region informacje
/*	Czym jest stan (state)?
	Stan to dane, które są przechowywane wewnątrz komponentu i mogą się zmieniać
	w czasie działania aplikacji. Gdy stan się zmienia, React automatycznie
	przerysowuje (re-renderuje) komponent, aby pokazać użytkownikowi nowe dane.

	Przykład z życia:
	Wyobraź sobie tablicę z liczbą obecnych uczniów w klasie.
	Na początku jest np. 20 osób. Gdy ktoś wychodzi, liczba zmienia się na 19.
	Tablica (ekran) się aktualizuje. To właśnie działa stan w React!
*/

/*	Czym jest hook?
	Hook (hak) to specjalna funkcja Reacta, której można używać tylko wewnątrz
	komponentów funkcyjnych. Jej nazwa zawsze zaczyna się od słowa "use".

	Przykładowe haki:
	- useState   - do przechowywania stanu
	- useEffect  - do efektów ubocznych (następna lekcja)
	- useContext - do globalnego stanu (późniejsza lekcja)
*/

/*	Zasada immutability (niezmienności)
	W React NIE można modyfikować stanu bezpośrednio!
	Zamiast tego należy zawsze tworzyć nową kopię danych i przekazywać
	ją do funkcji aktualizującej.

	ŹLE (nie rób tak):
	stan.imie = "Anna";         // bezpośrednia zmiana - React tego nie zauważy!

	DOBRZE:
	setStan({ ...stan, imie: "Anna" });  // tworzę kopię ze zmianą - React to zarejestruje

	Dlaczego? React porównuje stary i nowy stan. Jeśli obiekt jest ten sam
	(ten sam adres w pamięci), React myśli, że nic się nie zmieniło i nie
	odrysuje komponentu. Tworząc kopię, dajemy Reactowi nowy obiekt do porównania.
*/

/*	Składnia useState
	Importowanie (
		import { useState } from 'react';
	)

	życie wewnątrz komponentu (
		const [obecnaWartosc, fnUstawWartosc] = useState(wartoscPoczatkowa);
	)

	- 'obecnaWartosc'     - aktualna wartość stanu (można czytać)
	- 'fnUstawWartosc'    - funkcja do zmiany stanu (można wywoływać)
	- 'wartoscPoczatkowa' - stan na samym początku (tylko przy pierwszym renderze)

	Konwencja nazewnictwa: jeśli stan nazywa się "licznik", funkcja to "setLicznik".
	Zawsze przedrostek "set" + nazwa stanu z wielką literą.
*/
// #endregion


// #region przydatne funkcje
/*	useState - inicjalizacja stanu
	Opis: Tworzy nową "skrzynkę" na dane w komponencie.
	Można podać dowolny typ danych: liczbę, tekst, boolean, tablice, obiekt.

	Przykład (
		import { useState } from 'react';

		const [liczbaUczniow, setLiczbaUczniow] = useState(30);
		// liczbaUczniow = 30 (początkowa wartość)
	)

	Wynik: komponent "pamięta", że jest 30 uczniów.
*/

/*	Aktualizacja stanu wartością bezpośrednią
	Opis: Przekazujemy nową wartość bezpośrednio do funkcji ustawiającej.
	Użyj tego, gdy nowa wartość NIE zależy od poprzedniej.

	Przykład (
		setLiczbaUczniow(25);
		// liczbaUczniow zmieni się na 25
	)

	Wynik: React odrysowuje komponent z nową wartością 25.
*/

/*	Aktualizacja stanu na podstawie poprzedniej wartości
	Opis: Przekazujemy funkcję (tzw. funkcja aktualizująca), która otrzymuje
	poprzedni stan i zwraca nowy. Użyj tego, gdy nowa wartość ZALEŻY od starej.

	Przykład (
		setLiczbaUczniow(poprzednia => poprzednia + 1);
		// jeśli było 25, teraz będzie 26
	)

	Wynik: React bezpiecznie zwiększy wartość o 1, nawet jeśli kilka aktualizacji
	nastąpi jednocześnie (np. szybkie klikanie przycisku).

	WAZNE: Ta forma jest bezpieczniejsza przy licznikach i kolejkach zmian!
*/

/*	Aktualizacja stanu będącego obiektem
	Opis: Przy obiektach należy zawsze skopiować stare pola za pomocą
	operatora spread (...) i nadpisać tylko te, które chcemy zmienić.

	Przykład (
		import { useState } from 'react';

		const [uczen, setUczen] = useState({ imie: 'Jan', klasa: '3A', srednia: 4.5 });

		// Zmiana tylko średniej - reszta pól zostaje bez zmian:
		setUczen(obecneDane => ({ ...obecneDane, srednia: 4.8 }));
		// uczen = { imie: 'Jan', klasa: '3A', srednia: 4.8 }
	)

	Wynik: Nowy obiekt ma wszystkie stare pola plus zaktualizowana średnia.
*/

/*	Aktualizacja stanu będącego tablicą
	Opis: Tak jak przy obiektach, nie można mutować tablicy bezpośrednio.
	Należy użyć metod, które zwracają nowe tablice: map(), filter(), spread.

	Przykład dodawania elementu (
		const [uczniowie, setUczniowie] = useState(['Anna', 'Bartek']);

		setUczniowie(poprzedni => [...poprzedni, 'Celina']);
		// uczniowie = ['Anna', 'Bartek', 'Celina']
	)

	Wynik: Nowa tablica zawiera wszystkich starych uczniów + nowego.
*/

/*	Zadanie praktyczne - przydatne funkcje
	Uzupełnij poniższy kod tak, aby:
	1. Stan 'temperatura' zaczyna od wartości 20
	2. Funkcja 'zwiekszTemperature' zwiększa temperaturę o 1 (używa funkcji aktualizującej)
	3. Funkcja 'resetujTemperature' ustawia temperaturę na 20

	javascript (
		function Termometr() {
			const [temperatura, setTemperatura] = useState(20);

			function zwiekszTemperature() {
				setTemperatura(poprzednia => poprzednia + 1);
			}

			function resetujTemperature() {
				setTemperatura(20);
			}

			return (
				<div>
					<p>Temperatura: {temperatura} stopni</p>
					<button onClick={zwiekszTemperature}>+1 stopień</button>
					<button onClick={resetujTemperature}>Reset</button>
				</div>
			);
		}
	)
*/
// #endregion


// #region przyklady
/*	Przykład 1 - Prosty licznik obecności
	Poniższy komponent liczy, ilu uczniów jest obecnych na lekcji.
	Można dodawać i odejmować uczniów przyciskami.
*/

// Przykład 1 - kod (wklej do pliku .jsx i uruchom):
// jsx (
// 	import { useState } from 'react';
//
// 	function LicznikObecnosci() {
// 		// Tworzymy stan 'obecni' z wartością początkową 0
// 		const [obecni, setObecni] = useState(0);
//
// 		// Funkcja zwiększająca liczbę obecnych
// 		// używamy updater function, bo nowa wartość zależy od starej
// 		function dodajUcznia() {
// 			setObecni(poprzedni => poprzedni + 1);
// 		}
//
// 		// Funkcja zmniejszająca liczbę obecnych
// 		// Sprawdzamy, czy nie zejdziemy poniżej 0
// 		function usunUcznia() {
// 			setObecni(poprzedni => (poprzedni > 0 ? poprzedni - 1 : 0));
// 		}
//
// 		return (
// 			<div>
// 				<h2>Obecność na lekcji</h2>
// 				{/* Wyświetlamy aktualny stan */}
// 				<p>Liczba obecnych uczniów: {obecni}</p>
// 				<button onClick={dodajUcznia}>+ Dodaj ucznia</button>
// 				<button onClick={usunUcznia}>- Usuń ucznia</button>
// 			</div>
// 		);
// 	}
//
// 	export default LicznikObecnosci;
// )

/*	Wynik działania przykładu 1:
	Na ekranie widać:
	- nagłówek "Obecność na lekcji"
	- tekst "Liczba obecnych uczniów: 0"
	- dwa przyciski: "+ Dodaj ucznia" i "- Usuń ucznia"
	Klikając "+" liczba rośnie, klikając "-" spada (minimum 0).
*/

/*	Zadanie do przykładu 1:
	Zmodyfikuj komponent LicznikObecnosci:
	- Dodaj stan 'maksUczniow' przechowujący maksymalną liczbę miejsc w klasie (np. 30)
	- Przycisk "+ Dodaj ucznia" ma być zablokowany (disabled), gdy liczba obecnych
		równa się maksymalnej liczbie miejsc
	- Wyświetl komunikat "Klasa pełna!", gdy osiągniemy maksimum
*/


/*	Przykład 2 - Formularz danych ucznia (stan jako obiekt)
	Poniższy komponent przechowuje dane ucznia jako jeden obiekt w stanie.
	Pokazuje, jak aktualizować pojedyncze pole bez niszczenia pozostałych.
*/

// Przykład 2 - kod:
// jsx (
// 	import { useState } from 'react';
//
// 	function FormularzUcznia() {
// 		// Stan to obiekt z wieloma polami
// 		const [uczen, setUczen] = useState({
// 			imie: '',
// 			nazwisko: '',
// 			klasa: '1A',
// 		});
//
// 		// Uniwersalna funkcja obsługi zmian w polach formularza
// 		// 'e.target.name' - nazwa pola (musi zgadzać się z kluczem w obiekcie)
// 		// 'e.target.value' - nowa wartość wpisana przez użytkownika
// 		function handleChange(e) {
// 			setUczen(poprzedni => ({
// 				...poprzedni,                    // kopiujemy wszystkie stare pola
// 				[e.target.name]: e.target.value, // nadpisujemy tylko zmienione pole
// 			}));
// 		}
//
// 		return (
// 			<div>
// 				<h2>Dane ucznia</h2>
// 				<input
// 					name="imie"
// 					placeholder="Imię"
// 					value={uczen.imie}
// 					onChange={handleChange}
// 				/>
// 				<input
// 					name="nazwisko"
// 					placeholder="Nazwisko"
// 					value={uczen.nazwisko}
// 					onChange={handleChange}
// 				/>
// 				<input
// 					name="klasa"
// 					placeholder="Klasa"
// 					value={uczen.klasa}
// 					onChange={handleChange}
// 				/>
// 				{/* Podgląd aktualnego stanu - bardzo przydatne do debugowania */}
// 				<h3>Podgląd danych:</h3>
// 				<p>Imię: {uczen.imie}</p>
// 				<p>Nazwisko: {uczen.nazwisko}</p>
// 				<p>Klasa: {uczen.klasa}</p>
// 			</div>
// 		);
// 	}
//
// 	export default FormularzUcznia;
// )

/*	Wynik działania przykładu 2:
	Na ekranie widać trzy pola tekstowe i sekcje podglądu.
	Przy każdym wciśnięciu klawisza podgląd danych aktualizuje się na żywo,
	pokazując, co aktualnie zawiera stan 'uczen'.
*/

/*	Zadanie do przykładu 2:
	Rozbuduj komponent FormularzUcznia:
	- Dodaj do obiektu stanu pole 'srednia' z wartością początkową 0
	- Dodaj pole input typu "number" dla średniej (min 1, max 6)
	- Dodaj przycisk "Zapisz", który po kliknięciu wyświetli w konsoli
		(console.log) cały obiekt ucznia
*/


/*	Przykład 3 - Lista uczniow (stan jako tablica)
	Komponent przechowuje listę uczniów jako tablicę w stanie.
	Można dodawać nowych uczniów i usuwać istniejących.
*/

// Przykład 3 - kod:
// jsx (
// 	import { useState } from 'react';
//
// 	function ListaUczniow() {
// 		// Stan to tablica obiektów (każdy uczeń to obiekt z id i imieniem)
// 		const [uczniowie, setUczniowie] = useState([
// 			{ id: 1, imie: 'Anna Kowalska' },
// 			{ id: 2, imie: 'Bartek Nowak' },
// 		]);
//
// 		// Stan dla pola tekstowego (nowe imie)
// 		const [noweImie, setNoweImie] = useState('');
//
// 		// Dodawanie ucznia - tworzymy NOWĄ tablicę ze starymi + nowy element
// 		function dodajUcznia() {
// 			if (noweImie.trim() === '') return; // nie dodajemy pustych
// 			const nowyUczen = {
// 				id: Date.now(), // unikalny id na podstawie czasu
// 				imie: noweImie,
// 			};
// 			setUczniowie(poprzedni => [...poprzedni, nowyUczen]);
// 			setNoweImie(''); // czyścimy pole tekstowe
// 		}
//
// 		// Usuwanie ucznia - tworzymy NOWĄ tablicę bez wybranego ucznia
// 		function usunUcznia(id) {
// 			setUczniowie(poprzedni => poprzedni.filter(u => u.id !== id));
// 		}
//
// 		return (
// 			<div>
// 				<h2>Lista uczniów</h2>
// 				<input
// 					placeholder="Imię i nazwisko"
// 					value={noweImie}
// 					onChange={e => setNoweImie(e.target.value)}
// 				/>
// 				<button onClick={dodajUcznia}>Dodaj ucznia</button>
// 				<ul>
// 					{uczniowie.map(uczen => (
// 						// 'key' musi być unikalny w liście - więcej w lekcji 6
// 						<li key={uczen.id}>
// 							{uczen.imie}
// 							<button onClick={() => usunUcznia(uczen.id)}>Usuń</button>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		);
// 	}
//
// 	export default ListaUczniow;
// )

/*	Wynik działania przykładu 3:
	Na ekranie widać pole tekstowe, przycisk "Dodaj ucznia" i listę z dwoma
	domyślnymi uczniami. Po wpisaniu imienia i kliknięciu "Dodaj" pojawia się
	na liście. Kliknięcie "Usuń" przy danym uczniu usuwa go z listy.
*/

/*	Zadanie do przykładu 3:
	Rozbuduj komponent ListaUczniow:
	- Dodaj wyświetlanie liczby uczniów na liście (np. "Liczba uczniów: 2")
	- Posortuj listę alfabetycznie po dodaniu nowego ucznia
		(podpowiedź: użyj [...poprzedni, nowyUczen].sort((a, b) => a.imie.localeCompare(b.imie)))
*/
// #endregion


// #region zadania
/*	Odpowiedzi do zadań proszę zapisać:
	w formacie 'zadanie-X.jsx' (X to numer zadania np. 'zadanie-1.jsx')
	w katalogu 'W:\numerKlasy\przedmiot\data-nazwaPlikuBezRozszerzenia\ImieNazwisko\'
		np. 'W:\1a\algorytmy\20260325-10-tabliceJednowymiarowe\JanKowalski\zadanie-1.jsx'
	Nie wrzucaj katalogu 'node_modules' ani innych zbędnych (zwłaszcza dużych)
		katalogów, tylko same pliki z rozwiązaniami
*/

/*	Zadanie 1 - Proste (Przełącznik trybu ciemnego)
	Stwórz komponent 'TrybKoloru', ktory:
	- Przechowuje stan 'ciemnyTryb' (boolean, domyślnie false)
	- Wyświetla przycisk "Włącz tryb ciemny" lub "Wyłącz tryb ciemny"
		w zależności od aktualnego stanu
	- Po kliknięciu przełącza tryb na przeciwny
	- Wyświetla tekst "Aktualny tryb: ciemny" lub "Aktualny tryb: jasny"

	Podpowiedz:
	- useState(false) dla wartości logicznej
	- setTryb(poprzedni => !poprzedni) do przełączania
*/

/*	Zadanie 2 - Łatwe (Oceny ucznia)
	Stwórz komponent 'OcenyUcznia', który:
	- Przechowuje tablice ocen (stan), np. [5, 4, 3]
	- Umożliwia dodanie oceny przez input numeryczny (wartosci 1-6)
	- Wyświetla wszystkie oceny jako listę
	- Wyświetla średnią ocen obliczoną na bieżąco
		(podpowiedź: suma / ilość, metoda reduce lub pętla) - zaokrąglona do 2 miejsc po przecinku

	Podpowiedź obliczania średniej (
		const srednia = oceny.length > 0
			? (oceny.reduce((suma, o) => suma + o, 0) / oceny.length).toFixed(2)
			: 0;
	)
*/

/*	Zadanie 3 - Średnie (Lista obecności)
	Stwórz komponent 'ListaObecnosci', który:
	- Ma tablice uczniów (stan), każdy uczeń to obiekt: { id, imie, obecny: false }
	- Zaczyna z co najmniej 4 predefiniowanymi uczniami
	- Wyświetla listę uczniów z checkboxem przy każdym
	- Kliknięcie checkboxa przełącza pole 'obecny' dla danego ucznia
		(WAZNE: nie mutuj tablicy - użyj map() do stworzenia nowej wersji)
	- Na dole wyświetla: "Obecnych: X / Y" (X - obecni, Y - wszyscy)

	Podpowiedź do przełączania obecności (
		setUczniowie(poprzedni =>
			poprzedni.map(u =>
				u.id === id ? { ...u, obecny: !u.obecny } : u
			)
		);
	)
*/

/*	Zadanie 4 - Średniozaawansowane (Koszyk ocen z usuwaniem)
	Stwórz komponent 'DziennikOcen', który symuluje dziennik:
	- Stan: tablica obiektów { id, przedmiot, ocena, data }
	- Formularz z polem select dla przedmiotu (min 4 przedmioty),
		polem number dla oceny (1-6) - data ustawiania automatycznie (new Date().toLocaleDateString())
	- Po kliknięciu "Dodaj ocenę" - dodaje wpis do stanu
	- Wyświetla wszystkie wpisy w tabeli HTML (kolumny: Przedmiot, Ocena, Data, Akcja)
	- Przycisk "Usuń" w każdym wierszu usuwa dany wpis
	- Na dole: średnia wszystkich ocen (lub komunikat "Brak ocen")
*/

/*	Zadanie 5 - Trudne (Zarządzanie klasą)
	Stwórz komponent 'ZarzadzanieKlasa', który:
	- Stan główny: obiekt { nazwa: '1A', uczniowie: [], maxMiejsc: 30 }
	- Można zmienić nazwę klasy przez pole tekstowe (aktualizacja pojedynczego pola w obiekcie)
	- Można dodawać uczniów (obiekt: { id, imie, nazwisko, srednia })
	- Można usuwać uczniów z listy
	- Można edytować średnią wybranego ucznia klikając "Edytuj"
		(pojawia się inline input, po zatwierdzeniu aktualizuje stan - użyj map())
	- Nie można dodać ucznia jeśli klasa jest pełna (uczniowie.length >= maxMiejsc)
	- Wyświetla statystyki: liczba uczniów, średnia klasy, najlepsza i najgorsza średnia

	Podpowiedz do edycji inline:
	- Trzymaj dodatkowy stan 'edytowanyId' (id ucznia w trybie edycji lub null)
	- Trzymaj stan 'nowaaSrednia' (wartość wpisywana podczas edycji)
*/

/*	Zadanie 6 - Bardzo trudne (System planowania lekcji)
	Stwórz komponent 'PlanLekcji', który symuluje tygodniowy plan:
	- Stan to obiekt, gdzie kluczami są dni tygodnia, a wartościami tablice lekcji:
		{ poniedziałek: [], wtorek: [], ... }
	- Każda lekcja to obiekt: { id, przedmiot, godzina, nauczyciel }
	- Można wybrać dzień (przyciski lub select), dodawać lekcje do wybranego dnia
	- Można usuwać lekcje z dowolnego dnia
	- Walidacja: nie można dodać dwóch lekcji o tej samej godzinie w tym samym dniu
		(wyświetl komunikat błędu jako stan 'bladValidacji')
	- Wyświetla plan wybraneg dnia oraz całkowita liczbe lekcji w tygodniu
	- Można wyczyścić cały plan (przycisk "Wyczyść plan" - reset do pustych tablic)

	Podpowiedz (
		const [plan, setPlan] = useState({
			poniedzialek: [],
			wtorek: [],
			sroda: [],
			czwartek: [],
			piatek: [],
		});

		// Dodawanie lekcji do wybranego dnia:
		setPlan(poprzedni => ({
			...poprzedni,
			[wybranyDzien]: [...poprzedni[wybranyDzien], nowaLekcja],
		}));
	)
*/
// #endregion


// #region podsumowanie
/*	Podsumowanie lekcji 4 - Hook useState
	W tej lekcji nauczyłeś się, jak używać hooka useState do przechowywania
	i aktualizowania stanu w komponentach funkcyjnych React.
*/

/*	Kluczowe punkty
	1. Stan (state) - dane wewnątrz komponentu, które mogą się zmieniać.
		Gdy stan się zmienia, React automatycznie odrysowuje komponent.

	2. życie useState (
		const [wartosc, setWartosc] = useState(wartoscPoczatkowa);
	)

	3. Zasada immutability - nigdy nie modyfikuj stanu bezpośrednio!
		Zawsze twórz nowy obiekt/tablice zamiast zmieniać istniejący.

	4. Updater function - gdy nowa wartość zależy od starej, użyj funkcji aktualizującej:
		javascript (
			setLicznik(poprzedni => poprzedni + 1);
		)

	5. Aktualizacja obiektu - kopiuj stare pola operatorem spread:
		javascript (
			setUczen(poprzedni => ({ ...poprzedni, imie: 'Nowe imie' }));
		)

	6. Aktualizacja tablicy - użyj spread, filter(), map() - metod
		zwracających NOWE tablice, nie mutujących istniejących.
*/

/*	Wnioski i wskazowki
	- Jeden komponent może mieć wiele stanów - używaj tylu useState, ile potrzebujesz
	- Krótkie, opisowe nazwy stanów ułatwiają czytanie kodu
	- Jeśli kilka pól formularza należy razem, można trzymać je jako jeden obiekt
	- Jeśli stany są od siebie niezależne, lepiej użyć oddzielnych useState
	- Zawsze pytaj: "czy ta wartość powinna powodować odrysowanie komponentu?"
		Jeśli tak - użyj useState. Jeśli nie - użyj zwykłej zmiennej lub useRef (lekcja z formularzami).
*/
// #endregion

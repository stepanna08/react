// #region wstep
/*	Cel lekcji
	W tej lekcji nauczysz się, jak wyświetlać lub ukrywać elementy na stronie
	w zależności od różnych warunków. To bardzo ważna umiejętność w React,
	bo aplikacje często pokazują różne treści w zależności od stanu użytkownika
	(np. czy jest zalogowany, czy koszyk jest pusty, czy dane się załadowały).

	Przykład z życia: sklep internetowy pokazuje komunikat "Brak w magazynie"
	tylko wtedy, gdy produktu nie ma na stanie. Właśnie to będziemy robić!
*/

/*	Co będziesz umiał po tej lekcji
	- Wyświetlać elementy warunkowo za pomocą instrukcji if/else
	- żywać operatora && i || do prostego warunkowego renderowania
	- żywać operatora ?: (ternary) do wyboru między dwoma elementami
	- Ukrywać komponenty przez zwracanie null
	- Łączyć wiele warunków w bardziej złożonych sytuacjach
	- Stosować warunkowe renderowanie w praktycznym projekcie szkolnym
*/
// #endregion


// #region informacje
/*	Czym jest warunkowe renderowanie?
	Warunkowe renderowanie to po prostu decyzja: "czy wyświetlić ten element, czy nie?"
	lub "co wyświetlić w tej sytuacji?"

	W zwykłym HTML nie możesz tego łatwo zrobić. Musisz pisać dużo kodu JavaScript.
	W React możesz to robić bezpośrednio w JSX, co jest znacznie wygodniejsze.

	React jest mądry - jeśli zwrócisz z komponentu false lub nullish (null, undefined),
	nic nie wyrenderuje.
*/

/*	Metody warunkowego renderowania - przegląd
	W React masz kilka sposobów na warunkowe renderowanie:

	1. Instrukcja if/else - klasyczna, używana przed zwróceniem JSX
	2. Operator && - krótkie renderowanie "jeśli prawda, pokaż to"
	3. Operator || - krótkie renderowanie "jeśli fałsz, pokaż to"
	4. Operator ?: (ternary) - wybór między dwoma opcjami "jeśli prawda ? pokaż_A : pokaż_B"
	5. Zwracanie false lub nullish (null, undefined) - całkowite ukryćie komponentu
	6. Zmienna z JSX - przechowywanie elementu w zmiennej i warunkowe jej przypisywanie

	Każda metoda ma swoje miejsce - nauczysz się kiedy używać której!
*/

/*	Zasada działania - co React renderuje, a czego nie
	React NIE renderuje (ignoruje):
	- false
	- null
	- undefined

	React RENDERUJE:
	- stringi (nawet pustego "")
	- liczby (włącznie z 0!)
		Ważna uwaga na temat liczby 0:
		Jeśli masz warunek oparty na liczbie (np. items.length && <Lista/>), gdy items.length
		wynosi 0, React wyrenderuje cyfrę "0" na ekranie! Dlatego lepiej zamienić na
		bool: np.
			(items.length > 0 && <Lista/>)
			lub
			(items.length > 0 || <>Brak elementów</>)
	- elementy JSX
	- tablice elementów
*/

/*	Projekt - System Zarządzania Szkolą
	W tej lekcji będziemy budować elementy systemu szkolnego:
	- Panel ucznia (zalogowany / niezalogowany)
	- Status ocen (zdał / nie zdał)
	- Komunikaty o błędach
	- Lista lekcji (załadowana / ładowanie / błąd)

	Każdy przykład będzie częścią tego systemu!
*/
// #endregion


// #region przydatneFunkcje
// #region Operator && (AND)
/*	Operator && (AND) - "Jeśli prawda, pokaz"
	Składnia: {warunek && <Element />}

	Jak działa:
	- Jeśli warunek jest prawdziwy, wyrenderuje Element
	- Jeśli warunek jest fałszywy, nie wyrenderuje nic

	To jest skrót od: if (warunek) { return <Element /> }

	UWAGA: Jeśli warunek jest liczbą (np. 0), React wyrenderuje tę liczbę!
	Zawsze używaj warunku boolean: 'liczba > 0 && <Element />'
*/

// Przykład: operator &&
jsx(
	function PrzykładAnd() {
		const czyZalogowany = true;
		const liczbaWiadomosci = 3;

		return (
			<div>
				{/* Jeśli czyZalogowany jest true, pokaż powitanie */}
				{czyZalogowany && <p>Witaj w systemie szkolnym!</p>}

				{/* POPRAWNE: liczba > 0 zabezpiecza przed wyświetleniem "0" */}
				{liczbaWiadomosci > 0 && <p>Ilość nowych wiadomości: {liczbaWiadomosci}</p>}

				{/* ŹLE - może wyświetlić "0" gdy brak wiadomości */}
				{/* {liczbaWiadomosci && <p>Masz wiadomości</p>} */}
			</div>
		);
	}
)
/*	Wynik gdy czyZalogowany = true, liczbaWiadomosci = 3:
	Witaj w systemie szkolnym!
	Ilość nowych wiadomości: 3

	Wynik gdy czyZalogowany = false:
	(nic nie jest wyświetlone)
*/

/*	Zadanie praktyczne - &&
	Stwórz komponent 'StatusUcznia', który przyjmuje props 'aktywny' (boolean).
	Jeśli aktywny jest true, wyświetl tekst "Konto ucznia jest aktywne".
	Jeśli nie, nie wyświetlaj nic (użyj operatora &&).
*/
// #endregion

// #region Operator || (OR)
/*	Operator || (OR) - "jeśli fałsz, pokaż to"
	Składnia: {warunek || <Element />}

	Jak działa:
	- Jeśli warunek jest prawdziwy, nie wyrenderuje Element
	- Jeśli warunek jest fałszywy, wyrenderuje Element

	To jest skrót od: if (!warunek) { return <Element /> }
*/

// Przykład: operator ||
jsx(
	function PrzykladOr() {
		const listaElementów = [];

		return (
			<div>
				{/* Jeśli listaElementów jest pusta, pokaż komunikat "Brak elementów" */}
				{listaElementów.length > 0 || <>Brak elementów</>}
			</div>
		);
	}
)
/*	Wynik gdy listaElementów jest pusta:
	Brak elementów
*/

/* Zadanie praktyczne - ||
	Stwórz komponent 'ListaElementów', który przyjmuje props 'elementy' (tablica).
	Jeśli tablica jest pusta, wyświetl tekst "Brak elementów" (użyj operatora ||).
*/
// #endregion

// #region Operator ?: (ternary)
/*	Operator ?: (ternary) - "jeśli prawda, pokaż A, inaczej pokaż B"
	Składnia: {warunek ? <ElementA /> : <ElementB />}

	Jak działa:
	- Jeśli warunek jest true, wyrenderuje ElementA
	- Jeśli warunek jest false, wyrenderuje ElementB

	To jest skrót od klasycznego if/else.
	Używaj go gdy chcesz pokazać jedną z dwóch opcji.
*/

// Przykład: operator ternary
jsx(
	function PrzykładTernary() {
		const czyZalogowany = false;

		return (
			<div>
				{/* Jeśli zalogowany - pokaż panel, jeśli nie - pokaż przycisk logowania */}
				{czyZalogowany
					? <p>Jesteś zalogowany. Witaj!</p>
					: <button>Zaloguj się</button>
				}
			</div>
		);
	}
)
/*	Wynik gdy czyZalogowany = false:
	[przycisk] Zaloguj się

	Wynik gdy czyZalogowany = true:
	Jesteś zalogowany. Witaj!
*/

/*	Zadanie praktyczne - ternary
	Stwórz komponent 'OcenaUcznia', który przyjmuje prop 'ocena' (liczba 1-6).
	Jeśli ocena >= 3, wyświetl "ZDAŁ" w kolorze zielonym (className="zdal").
	Jeśli ocena < 3, wyświetl "NIE ZDAŁ" w kolorze czerwonym (className="niezdal").
*/
// #endregion

// #region Zwracanie null
/*	Zwracanie null - całkowite ukryćie komponentu
	Składnia: if (warunek) return null;

	Jak działa:
	- Możesz zwrócić null z całego komponentu, żeby go ukryć
	- Komponent dalej istnieje, ale nic nie wyrenderuje
	- Przydatne gdy nie chcesz zaśmiecać JSX warunkami

	Nie jest to to samo co display:none w CSS - komponent naprawdę nie istnieje w DOM!
*/

// Przykład: zwracanie null
jsx(
	function BanerPowiadomienia({ tekst, widoczny }) {
		// Jeśli widoczny jest false, nie renderuj nic
		if (!widoczny) return null;

		// W przeciwnym razie wyświetl banner
		return (
			<div className="baner">
				<p>{tekst}</p>
			</div>
		);
	}
)
/*	Wynik gdy widoczny = true, tekst = "Jutro test z matematyki!":
	[baner] Jutro test z matematyki!

	Wynik gdy widoczny = false:
	(nic nie jest wyświetlone, element nie istnieje w DOM)
*/

/*	Zadanie praktyczne - null
	Stwórz komponent 'KomunikatBledu', który przyjmuje props 'blad' (string lub null).
	Jeśli blad jest null lub pusty string, nie renderuj nic (return null).
	Jeśli blad ma treści, wyświetl go w elemencie <div className="blad">.
*/
// #endregion

// #region Instrukcja if/else przed return
/*	Instrukcja if/else przed return - klasyczne podejście
	Składnia: normalna instrukcja if przed poleceniem return

	Jak działa:
	- Przed zwróceniem JSX decydujesz co zwrócić
	- Lepsza czytelność przy skomplikowanych warunkach
	- Można łączyć wiele warunków (if / else if / else)

	Używaj gdy masz wiele możliwych wyników lub skomplikowaną logikę.
*/

// Przykład: if/else przed return
jsx(
	function StatusLadowania({ status }) {
		// Decydujemy co wyrenderować PRZED return
		if (status === 'ladowanie') {
			return <p>Ładowanie danych...</p>;
		}

		if (status === 'blad') {
			return <p className="blad">Wystąpił błąd!</p>;
		}

		// Domyślnie - dane są gotowe
		return <p className="sukces">Dane załadowane pomyślnie!</p>;
	}
)
/*	Wynik gdy status = 'ladowanie':
	Ładowanie danych...

	Wynik gdy status = 'blad':
	Wystąpił błąd!

	Wynik gdy status = 'gotowe' (lub cokolwiek innego):
	Dane załadowane pomyślnie!
*/

/*	Zadanie praktyczne - if/else
	Stwórz komponent 'RolaPrzycisk', który przyjmuje props 'rola' (string).
	- Jeśli rola == 'admin': wyświetl "Panel Administratora"
	- Jeśli rola == 'nauczyciel': wyświetl "Panel Nauczyciela"
	- Jeśli rola == 'uczen': wyświetl "Panel Ucznia"
	- W każdym innym przypadku: wyświetl "Nieznana rola"
	Użyj instrukcji if/else przed return.
*/
// #endregion
// #endregion


// #region przykłady
/*	Przykład 1 - Panel logowania ucznia
	Pokazuje różne widoki w zależności od tego czy użytkownik jest zalogowany.
	Używa operatora ternary do przełączania między formularzem a panelem.
*/

jsx(
	import { useState } from 'react';

function PanelLogowania() {
	// Stan - czy użytkownik jest zalogowany
	const [zalogowany, setZalogowany] = useState(false);
	const [imie, setImie] = useState('Jan Kowalski');

	const handleLogowanie = () => setZalogowany(true);
	const handleWylogowanie = () => setZalogowany(false);

	return (
		<div className="panel">
			<h1>System Szkolny</h1>

			{/* Ternary: zalogowany? pokaz panel ucznia : pokaz formularz */}
			{zalogowany
				? (
					<div className="panel-ucznia">
						<h2>Witaj, {imie}!</h2>
						<p>Jesteś zalogowany do systemu.</p>
						<button onClick={handleWylogowanie}>Wyloguj się</button>
					</div>
				)
				: (
					<div className="formularz-logowania">
						<h2>Zaloguj się</h2>
						<p>Musisz się zalogować, aby uzyskać dostęp.</p>
						<button onClick={handleLogowanie}>Zaloguj się</button>
					</div>
				)
			}
		</div>
	);
}
)
/*	Wynik początkowy (zalogowany = false):
	System Szkolny
	Zaloguj się
	Musisz się zalogować, aby uzyskać dostęp.
	[przycisk] Zaloguj się

	Po kliknieciu przycisku (zalogowany = true):
	System Szkolny
	Witaj, Jan Kowalski!
	Jesteś zalogowany do systemu.
	[przycisk] Wyloguj się
*/

/*	Zadanie do przykładu 1
	Rozbuduj komponent 'PanelLogowania':
	- Dodaj props 'rola' przyjmujący wartość 'uczen', 'nauczyciel' lub 'admin'
	- Gdy użytkownik jest zalogowany, obok imienia wyświetl jego rolę
		w nawiasach np. "Witaj, Jan Kowalski! (uczeń)"
	- Użyj operatora && do wyświetlenia dodatkowego komunikatu tylko dla adminów:
		"Masz dostęp do panelu administracyjnego"
*/


/*	Przykład 2 - Lista ocen z warunkowym komunikatem
	Pokazuje listę ocen ucznia. Jeśli brak ocen, wyświetla komunikat.
	Pokazuje średnią i status (zdał/nie zdał).
*/

jsx(
	function ListaOcen({ oceny, imieUcznia }) {
		// Obliczamy średnią (lub 0 jeśli brak ocen)
		const srednia = oceny.length > 0
			? oceny.reduce((sum, o) => sum + o, 0) / oceny.length
			: 0;

		// Zaokrąglamy do 2 miejsc po przecinku
		const sredniaZaokraglona = Math.round(srednia * 100) / 100;

		return (
			<div className="lista-ocen">
				<h2>Oceny ucznia: {imieUcznia}</h2>

				{/* && operator: wyświetl listę tylko gdy są jakieś oceny */}
				{oceny.length > 0 && (
					<ul>
						{oceny.map((ocena, index) => (
							<li key={index}>Ocena {index + 1}: {ocena}</li>
						))}
					</ul>
				)}

				{/* && operator: komunikat gdy brak ocen */}
				{oceny.length === 0 && (
					<p className="brak-ocen">Brak wystawionych ocen.</p>
				)}

				{/* Ternary: pokaż średnią tylko gdy są oceny */}
				{oceny.length > 0 && (
					<div className="podsumowanie">
						<p>Średnia: {sredniaZaokraglona}</p>

						{/* Ternary: zdał czy nie zdał na podstawie średniej */}
						{sredniaZaokraglona >= 3
							? <p className="zdal">Status: ZDAŁ</p>
							: <p className="niezdal">Status: NIE ZDAŁ</p>
						}
					</div>
				)}
			</div>
		);
	}

	// Użycie komponentu:
	// <ListaOcen oceny={[4, 5, 3, 2, 5]} imieUcznia="Anna Nowak" />
	// <ListaOcen oceny={[]} imieUcznia="Piotr Wisniewski" />
)
/*	Wynik dla oceny={[4, 5, 3, 2, 5]}, imieUcznia="Anna Nowak":
	Oceny ucznia: Anna Nowak
	- Ocena 1: 4
	- Ocena 2: 5
	- Ocena 3: 3
	- Ocena 4: 2
	- Ocena 5: 5
	Średnia: 3.8
	Status: ZDAŁ

	Wynik dla oceny={[]}, imieUcznia="Piotr Wiśniewski":
	Oceny ucznia: Piotr Wiśniewski
	Brak wystawionych ocen.
*/

/*	Zadanie do przykładu 2
	Do komponentu 'ListaOcen' dodaj:
	- Warunkowe wyświetlanie napisu "Wyróżniony uczeń!" jeżeli średnia >= 5
		(użyj operatora &&)
	- Warunkowe wyświetlanie napisu "Uwaga: uczeń wymaga wsparcia!" jeżeli średnia < 2
		(użyj operatora &&)
	- Zmienny kolor średniej: zielony gdy >= 3, czerwony gdy < 3
		(użyj ternary w atrybucie className lub style)
*/


/*	Przykład 3 - Komponent ładowania danych (Loading State)
	Bardzo częsty wzorzec w React - pokazuje różne stany podczas pobierania danych.
	Używa if/else przed return dla przejrzystości.
*/

jsx(
	import { useState, useEffect } from 'react';

function DaneSzkolne({ klasaId }) {
	const [dane, setDane] = useState(null);
	const [ladowanie, setLadowanie] = useState(true);
	const [blad, setBlad] = useState(null);

	useEffect(() => {
		// Symulacja pobierania danych (setTimeout zamiast prawdziwego API)
		setLadowanie(true);
		setBlad(null);

		setTimeout(() => {
			if (klasaId === 'nieistniejaca') {
				// Symulacja błędu podczas pobierania danych
				setBlad('Nie znaleziono klasy o podanym ID');
				setLadowanie(false);
			} else {
				// Symulacja udanego pobrania danych
				setDane({
					nazwa: `Klasa ${klasaId}`,
					liczbaUczniow: 28,
					wychowawca: 'mgr Kowalska'
				});
				setLadowanie(false);
			}
		}, 1000);
	}, [klasaId]);

	// Warunek 1: Trwa ładowanie - pokaz spinner/komunikat
	if (ladowanie) {
		return (
			<div className="ladowanie">
				<p>Ładowanie danych klasy...</p>
			</div>
		);
	}

	// Warunek 2: Wystąpił błąd - pokaz komunikat błędu
	if (blad) {
		return (
			<div className="blad">
				<p>Błąd: {blad}</p>
			</div>
		);
	}

	// Warunek 3: Brak danych (null) - nie powinno się zdarzyć, ale zabezpieczamy
	if (!dane) return null;

	// Domyślnie: dane są dostępne - pokaż je
	return (
		<div className="dane-klasy">
			<h2>{dane.nazwa}</h2>
			<p>Liczba uczniów: {dane.liczbaUczniow}</p>
			<p>Wychowawca: {dane.wychowawca}</p>
		</div>
	);
}
)
/*	Wynik podczas ładowania (pierwsze 1000ms):
	Ładowanie danych klasy...

	Wynik po załadowaniu dla klasaId="3A":
	Klasa 3A
	Liczba uczniów: 28
	Wychowawca: mgr Kowalska

	Wynik dla klasaId="nieistniejaca":
	Błąd: Nie znaleziono klasy o podanym ID
*/

/*	Zadanie do przykładu 3
	Stwórz komponent 'ProfilNauczyciela', który:
	- Przyjmuje props 'nauczycielId' (string)
	- Ma state: dane, ladowanie (true na poczatku), blad
	- Symuluje ładowanie danych przez 800ms (setTimeout)
	- Jeżeli nauczycielId === 'brak', ustaw blad "Nauczyciel nie istnieje"
	- W przeciwnym razie ustaw dane: { imie: "mgr Nowak", przedmiot: "Matematyka" }
	- Użyj if/else przed return do obsługi róznych stanów
*/
// #endregion


// #region zadaniaPraktyczne
/*	Odpowiedzi do zadań proszę zapisać:
	w formacie 'zadanie-X.js' (X to numer zadania np. 'zadanie-1.js')
	w katalogu 'W:\numerKlasy\przedmiot\data-nazwaPlikuBezRozszerzenia\ImieNazwisko\'
		np. 'W:\1a\algorytmy\20260325-10-tabliceJednowymiarowe\JanKowalski\zadanie-1.js'
	Nie wrzucaj katalogu 'node_modules' ani innych zbędnych (zwłaszcza dużych)
		katalogów, tylko same pliki z rozwiązaniami
*/

/*	Zadanie 1 - Proste (operator &&)
	Stwórz komponent 'InfoUczen', który przyjmuje props:
	- imie (string)
	- czyObecny (boolean)
	- numerDziennika (number)

	Wyświetl:
	- Zawsze: imie ucznia i numer w dzienniku
	- Tylko gdy czyObecny jest true: tekst "(obecny)"
	- Tylko gdy czyObecny jest false: tekst "(nieobecny)"
		Wskazówka: Użyj dwóch osobnych operatorów && dla każdego przypadku.

	Przykładowe użycie:
	<InfoUczen imie="Kasia Nowak" czyObecny={true} numerDziennika={5} />
	Oczekiwany wynik: "5. Kasia Nowak (obecny)"
*/


/*	Zadanie 2 - Łatwe (ternary operator)
	Stwórz komponent 'PrzyciskZapisz', który przyjmuje props:
	- czyZapisano (boolean)
	- onZapisz (funkcja)

	Gdy czyZapisano jest false: wyświetl przycisk "Zapisz zmiany" który wywołuje onZapisz
	Gdy czyZapisano jest true: wyświetl tekst "Zmiany zostały zapisane!" (zamiast przycisku)

	Użyj operatora ternary.

	Wskazówka: możesz użyć useState do przełączania stanu w komponencie nadrzędnym.
*/


/*	Zadanie 3 - Średnie (kombinacja metod)
	Stwórz komponent 'KartaUcznia', który przyjmuje props:
	- imie (string)
	- klasa (string)
	- srednia (number)
	- czyAktywny (boolean)

	Komponent ma:
	1. Nie renderować nic (return null) gdy czyAktywny jest false
	2. Wyświetlać imię i klasę
	3. Wyświetlać średnią w kolorze:
		 - zielonym (className="ocena-dobra") gdy średnia >= 4
		 - żółtym (className="ocena-srednia") gdy średnia >= 3 i < 4
		 - czerwonym (className="ocena-slaba") gdy średnia < 3
		 Wskazówka: zagnieżdź dwa operatory ternary lub Użyj oddzielnej zmiennej.
	4. Wyświetlać "Stypendium szkolne" tylko gdy średnia >= 4.75 (operator &&)
*/


/*	Zadanie 4 - Średniozaawansowane (zarządzanie stanem i warunkowe renderowanie)
	Stwórz komponent 'ZarzadzaniePlanLekcji', który:
	- Przechowuje w state listę lekcji (tablica obiektów {id, nazwa, czyOdwolana})
	- Startuje z 3 lekcjami: Matematyka, Język Polski, Fizyka (żaden nie jest odwołany)
	- Wyświetla każdą lekcję wraz z:
		a) Jej nazwą
		b) Statusem: "Lekcja odwołana!" (gdy czyOdwolana=true) lub "Lekcja odbywa się" (gdy false)
		 Użyj ternary dla tej części
		c) Przycisk "Odwołaj lekcję" - tylko gdy lekcja NIE jest odwołana (operator &&)
		d) Komunikat "Skontaktuj się z wychowawcą" - tylko gdy lekcja jest odwołana (operator &&)
	- Kliknięcie "Odwołaj lekcję" zmienia stan danej lekcji na czyOdwolana=true
	- Na dole strony wyświetl liczbę odwołanych lekcji tylko gdy co najmniej 1 jest odwołana (operator &&)
*/


/*	Zadanie 5 - Trudne (zarządzanie wieloma stanami)
	Stwórz komponent 'SystemLogowania' z następującymi funkcjonalnościami:
	- State: użytkownik (null lub obiekt {imie, rola}), błąd (string lub null), ładowanie (boolean)
	- Wyświetl formularz (input na login + przycisk) gdy użytkownik jest null
	- Po kliknięciu "Zaloguj":
		a) Ustaw ładowanie na true i błąd na null
		b) Po 1 sekundzie (setTimeout):
		 - Jeśli login to "admin" - zaloguj jako {imie: "Administrator", rola: "admin"}
		 - Jeśli login to "uczen" - zaloguj jako {imie: "Jan Kowalski", rola: "uczen"}
		 - Dla każdego innego - ustaw błąd "Nieprawidłowy login"
		c) Ustaw ladowanie na false
	- Gdy ladowanie=true: wyświetl "Sprawdzanie danych..."
	- Gdy blad != null: wyświetl komunikat błędu (operator &&) nad formularzem
	- Gdy uzytkownik != null: wyświetl panel z imieniem i rolą użytkownika
	- Dla admina: wyświetl dodatkowy przycisk "Panel administracyjny" (operator &&)
	- Dodaj przycisk "Wyloguj" w panelu użytkownika, który resetuje stan do początkowego (uzytkownik=null, blad=null, ladowanie=false)
*/


/*	Zadanie 6 - Bardzo trudne (rozbudowany komponent z wieloma warunkami)
	Stwórz kompletny komponent 'DashboardSzkolny':

	Stan aplikacji:
	- uzytkownik: null lub { imie, rola: 'uczen'|'nauczyciel'|'admin' }
	- aktywnaSekcja: 'oceny'|'plan'|'komunikaty' (domyślnie 'oceny')
	- oceny: tablica liczb (np. [4, 3, 5, 2, 4])
	- komunikaty: tablica String (np. ["Test jutro!", "Brak lekcji w piątek"])
	- czyZalogowany: boolean (false na początku)

	Wymagania:
	1. Gdy nie zalogowany: pokaż prosty ekran logowania z 3 przyciskami:
		 "Zaloguj jako Uczeń", "Zaloguj jako Nauczyciel", "Zaloguj jako Admin"
		 Każdy ustawia odpowiedni obiekt użytkownika i czyZalogowany=true

	2. Gdy zalogowany:
		 a) Naglówek z imieniem i rola użytkownika (np. "Witaj, Jan Kowalski! (nauczyciel)")
		 b) Menu nawigacyjne z 3 przyciskami sekcji (Oceny, Plan, Komunikaty)
			- Aktywny przycisk ma className="aktywny" (ternary w className)
		 c) Treść zależna od aktywnaSekcja (Użyj if/else lub switch):
			- 'oceny': pokaż listę ocen, średnią, status zdał/nie zdał
			Dla nauczyciela i admina: dodaj przycisk "Dodaj ocenę losową" (operator &&)
			- 'plan': pokaż fałszywy plan (po prostu kilka statycznych lekcji)
			Dodaj komunikat "Brak lekcji dzisiaj" jeśli tablica jest pusta (operator &&)
			- 'komunikaty': pokaż listę komunikatów lub "Brak komunikatów" gdy pusta lista
			Tylko dla admina: pokaż przycisk "Dodaj komunikat" (operator &&)
		 d) Przycisk "Wyloguj się" na dole

	3. Kliknięcie "Dodaj ocenę losową" dodaje losową ocenę (1-6) do tablicy ocen
	4. Kliknięcie "Dodaj komunikat" dodaje komunikat "Nowy komunikat!" do tablicy
	5. Przycisk "Wyloguj się" resetuje cały stan do początkowego

	Wskazówka: Podziel na mniejsze komponenty pomocnicze (np. SekcjaOcen, SekcjaPlan, SekcjaKomunikaty)
	i użyj warunkowego renderowania żeby wyświetlać odpowiedni komponent.
*/
// #endregion


// #region podsumowanie
/*	Podsumowanie lekcji - Warunkowe renderowanie w React
	Nauczyłeś się czterech głównych sposobów warunkowego renderowania:

	1. Operator && (AND):
		 - Użyj gdy: chcesz coś pokazać ALBO nic nie pokazać
		 - Składnia: {warunek && <Element />}
		 - Uwaga: gdy warunek jest liczba 0, React wyrenderuje "0" - używaj 'warunek > 0'

	2. Operator ?: (ternary):
		 - Użyj gdy: chcesz pokazać jedną z DWÓCH rzeczy
		 - Składnia: {warunek ? <ElementA /> : <ElementB />}
		 - Można zagnieżdżać, ale unikaj zbyt głębokiego zagnieżdżania (trudno czytać)

	3. Zwracanie null:
		 - Użyj gdy: chcesz całkowicie ukryć komponent
		 - Składnia: if (!warunek) return null; przed glównym return
		 - Element nie istnieje w DOM (róznica wzgledem display:none w CSS)

	4. Instrukcja if/else przed return:
		 - Użyj gdy: masz wiele (3+) możliwych wyników lub skomplikowaną logikę
		 - Najlepsza czytelność przy złożonych przypadkach
		 - Można łączyć z early return (return null, return <Blad/> itd.)
*/

/*	Kluczowe wnioski
	- Warunkowe renderowanie jest fundamentem tworzenia dynamicznych interfejsów
	- Nie musisz (i nie powinieneś) tworzyć osobnych stron dla każdego stanu - Użyj warunków!
	- Zawsze myśl o wszystkich stanach: ładowanie, błąd, sukces, pusty stan
	- Czysty kod jest lepszy niż krótki kod: Jeżeli && i ternary robią za długie linijki, Użyj if/else
	- Warunkowe renderowanie + useState = potężne narzędzie do budowania aplikacji
	- W systemach takich jak System Szkolny, warunki są wszędobylskie:
		kto jest zalogowany, jaka ma rolę, czy dane są załadowane, czy formularz jest poprawny...

	Co dalej? Następna lekcja: Listy i Klucze - renderowanie list za pomocą map()
	i dlaczego React wymaga atrybutu 'key' dla elementów listy.
*/
// #endregion

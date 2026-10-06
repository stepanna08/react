// #region Hook useEffect - wstęp
/*	cele lekcji
	W tej lekcji dowiesz się, czym są efekty uboczne w React i jak nimi zarządzać.
	Hook useEffect to jeden z najważniejszych hooków w React - bez niego nie można
	np. pobierać danych z serwera ani reagować na zmiany w komponencie.
*/

/*	Co będziesz umieć po tej lekcji
	- Rozumieć, czym są efekty uboczne (side effects ) i dlaczego są potrzebne
	- Uzywać hooka useEffect do wykonywania kodu po wyrenderowaniu komponentu
	- Kontrolować, kiedy useEffect się uruchamia, za pomocą tablicy zależnosci (dependency array)
	- Pisać funkcje czyszczące (cleanup functions), które zapobiegają wyciekom pamięci
	- Synchronizować komponenty z zewnętrznymi systemami (API, liczniki czasu, subskrypcje)
*/
// #endregion


// #region informacje
/*	Czym są efekty uboczne (side effects)?
	Efekt uboczny to każda operacja, która wykracza poza samo obliczenie i zwrócenie JSX.
	Innymi słowy - wszystko co "wychodzi" poza komponent i dotyka świata zewnętrznego.
	https://pl.wikipedia.org/wiki/Skutek_uboczny_(informatyka)

	Przykłady efektów ubocznych:
	- Pobieranie danych z API (fetch, axios)
	- Ustawianie timerów (setTimeout, setInterval)
	- Bezpośrednia manipulacja DOM (zmiana tytułu strony, scroll)
	- Subskrypcje (WebSocket, EventListener)
	- Zapis do localStorage lub sessionStorage

	Dlaczego nie można robić tego bezpośrednio w ciele komponentu?
	Komponenty React mogą się przerenderowywać wielokrotnie.
	Gdybyś ustawił timer bezpośrednio w ciele funkcji komponentu,
	zostałby on utworzony przy każdym wyrenderowaniu - co doprowadziłoby do chaosu.
	useEffect daje ci kontrolę nad tym, KIEDY dany kod się wykonuje.
*/

/*	Definicja useEffect
	useEffect to hook, który pozwala wykonać kod "po" wyrenderowaniu komponentu.
	Przyjmuje dwa argumenty:

	javascript (
		import { useState, useEffect } from 'react';
		useEffect(funkcjaEfektu, tablicaZaleznosci);
	)

	- 'funkcjaEfektu' - funkcja, która zostanie wykonana po wyrenderowaniu
	- 'tablicaZaleznosci' - (opcjonalna) tablica wartości, od których zależą ponowne uruchomienia efektu
*/

/*	Trzy sposoby uzycia useEffect - tablica zależnosci (dependency array)

	1. Bez tablicy zależnosci - efekt uruchamia się po KAŻDYM wyrenderowaniu:
	kod (
		import { useState, useEffect } from 'react';
		useEffect(() => {
			// uruchamia się po każdym wyrenderowaniu
		});
	)

	2. Z pustą tablicą [] - efekt uruchamia się tylko RAZ, po pierwszym wyrenderowaniu:
	kod (
		import { useState, useEffect } from 'react';
		useEffect(() => {
			// uruchamia się tylko raz, przy montowaniu komponentu
		}, []);
	)

	3. Z wartościami w tablicy - efekt uruchamia się gdy zmienia się któraś z podanych wartości:
	kod (
		import { useState, useEffect } from 'react';
		useEffect(() => {
			// uruchamia się gdy zmieni się 'wartość1' lub 'wartość2'
		}, [wartość1, wartość2]);
	)
*/

/*	Cykl zycia komponentu - uproszczone wyjaśnienie
	Komponent React przechodzi przez trzy fazy:

	1. Montowanie (Mounting) - komponent pojawia się na stronie po raz pierwszy
	2. Aktualizacja (Updating) - stan lub propsy się zmieniają, komponent się przerenderowuje
	3. Odmontowanie (Unmounting) - komponent znika ze strony

	useEffect pozwala się "wpiąć" w te fazy:
	- brak tablicy = montowanie + każda aktualizacja czegokolwiek
	- [] = tylko montowanie
	- [zmienna] = montowanie + każda aktualizacja tej zmiennej
	- zwrócona funkcja cleanup = odmontowanie (i przed każdym kolejnym uruchomieniem efektu)
*/

/*	Funkcje czyszczące (cleanup functions)
	Jeśli efekt tworzy coś trwałego (timer, subskrypcje, event listener),
	trzeba to po sobie "posprzątać". Do tego służy funkcja cleanup.

	Zwracasz ją z wnętrza useEffect:
	kod (
		useEffect(() => {
			// uruchom efekt
			const timer = setInterval(() => { ... }, 1000);

			return () => {
				// cleanup - wykonuje się przed kolejnym uruchomieniem efektu
				// oraz gdy komponent znika ze strony
				clearInterval(timer);
			};
		}, []);
	)

	Bez cleanup możesz mieć wycieki pamięci - timer będzie działać
	nawet po tym, jak komponent zniknie ze strony!
*/
// #endregion


// #region przydatne funkcje
/*	useEffect - podstawowa Składnia
	Import: import { useEffect } from 'react';

	Opis: Hook do zarzadzania efektami ubocznymi w komponentach funkcyjnych.
	Wykonuje przekazaną funkcję po każdym wyrenderowaniu (lub selektywnie, zależnie od tablicy zależnosci).
*/

// #region Przykład 1 - zmiana tytułu strony po każdym wyrenderowaniu
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

/*	Zadanie praktyczne 1
	Stwórz komponent 'PowitanieUzytkownika', który:
	- Przechowuje imię użytkownika w stanie (useState)
	- Używając useEffect bez tablicy zależnosci wyświetla w konsoli
		komunikat "Ponowny render: [imie]" przy każdej zmianie imienia
	- Ma pole input, w którym można wpisać imię
*/

/*	useEffect z pustą tablicą [] - pojedyncze uruchomienie
	Opis: Idealny do jednorazowych operacji przy ładowaniu komponentu,
	np. pobierania danych z API.
*/
// #endregion

// #region Przykład 2 - jednorazowe pobranie danych przy montowaniu
function ListaUczniow() {
	const [uczniowie, setUczniowie] = useState([]);
	const [ladowanie, setLadowanie] = useState(true);

	// [] = uruchom się tylko raz, gdy komponent pojawi się na stronie
	useEffect(() => {
		// Symulacja pobierania danych z API
		setTimeout(() => {
			setUczniowie(['Anna', 'Bartek', 'Celina', 'Dawid']);
			setLadowanie(false);
			// Wynik: lista uczniów pojawia się po 1 sekundzie
		}, 1000);
	}, []); // pusta tablica = wykonaj tylko raz

	if (ladowanie) return <p>ładowanie...</p>;

	return (
		<ul>
			{uczniowie.map(uczen => (
				<li key={uczen}>{uczen}</li>
			))}
		</ul>
	);
}

/*	Zadanie praktyczne 2
	Stwórz komponent 'ZegarStartowy', który:
	- Przy pierwszym wyrenderowaniu (useEffect z []) zapisuje godzinę startu w stanie
	- Wyświetla komunikat "Strona załadowana o: [godzina]"
	- Wskazówka: Użyj new Date().toLocaleTimeString()
*/

/*	useEffect z zależnoscią - reagowanie na zmiany
	Opis: Efekt uruchamia się ponownie tylko wtedy, gdy zmieni się wartość podana w tablicy zależnosci.
*/
// #endregion

// #region Przykład 3 - reagowanie na zmianę stanu (
function WyszukiwarkaUczniow() {
	const [fraza, setFraza] = useState('');
	const [wyniki, setWyniki] = useState([]);
	const uczniowie = ['Anna Kowalska', 'Bartek Nowak', 'Anna Wiśniowa', 'Celina Dąbrowska'];

	// Efekt uruchamia się tylko gdy zmieni się 'fraza'
	useEffect(() => {
		if (fraza.length === 0) {
			setWyniki([]);
			return;
		}

		const znalezione = uczniowie.filter(u =>
			u.toLowerCase().includes(fraza.toLowerCase())
		);
		setWyniki(znalezione);
		// Wynik: lista wyników aktualizuje się tylko gdy zmienia się fraza
	}, [fraza]); // efekt zależny od 'fraza'

	return (
		<div>
			<input
				value={fraza}
				onChange={e => setFraza(e.target.value)}
				placeholder="Szukaj ucznia..."
			/>
			<ul>
				{wyniki.map(u => <li key={u}>{u}</li>)}
			</ul>
		</div>
	);
}

/*	Zadanie praktyczne 3
	Stwórz komponent 'WalidatorHasla', który:
	- Ma pole input dla hasła
	- Używając useEffect z tablicą zależnosci [haslo] sprawdza po każdej zmianie:
		- Czy hasło ma co najmniej 8 znaków
		- Czy zawiera cyfrę
	- Wyświetla odpowiedni komunikat (np. "Hasło jest bezpieczne" lub "Hasło jest za krótkie")
*/

/*	Cleanup functions - sprzątanie po efekcie
	Opis: Funkcja zwracana z useEffect, wykonywana przed kolejnym uruchomieniem efektu
	lub gdy komponent znika ze strony. Zapobiega wyciekom pamięci.
*/
// #endregion

// #region Przykład 4 - timer z cleanup
function OdliczanieDoDzwonka() {
	const [sekundy, setSekundy] = useState(0);
	const [aktywny, setAktywny] = useState(false);

	useEffect(() => {
		if (!aktywny) return; // Jeśli nieaktywny, nie rób nic

		// Tworzymy timer
		const interval = setInterval(() => {
			setSekundy(s => s + 1);
		}, 1000);

		// Cleanup - zatrzymaj timer gdy:
		// - 'aktywny' zmieni się na false
		// - komponent zniknie ze strony
		return () => {
			clearInterval(interval);
			// Wynik: timer zostaje zatrzymany, brak wycieków pamięci
		};
	}, [aktywny]); // efekt zależny od 'aktywny'

	return (
		<div>
			<p>Czas: {sekundy}s</p>
			<button onClick={() => setAktywny(a => !a)}>
				{aktywny ? 'Zatrzymaj' : 'Start'}
			</button>
			<button onClick={() => { setSekundy(0); setAktywny(false); }}>
				Reset
			</button>
		</div>
	);
}

/*	Zadanie praktyczne 4
	Stwórz komponent 'DetektorKlawisza', który:
	- Używając useEffect z [] dodaje obserwator zdarzenia 'keydown' na oknie przeglądarki
		window.addEventListener('keydown', handler)
	- Wyświetla ostatnio wciśnięty klawisz
	- W cleanup usuwa obserwator (removeEventListener), żeby nie było wycieków pamięci
*/
// #endregion
// #endregion


// #region Przykłady
// #region Przykład 1
/*	Pobieranie danych z prawdziwego API
	Ten przykład pokazuje, jak używać useEffect do pobierania danych z zewnętrznego API.
	Zawiera też obsługę stanu ładowania i błędów.
*/

/*	javascript
	import { useState, useEffect } from 'react';

	function ListaPrzedmiotow({ idKlasy }) {
		const [przedmioty, setPrzedmioty] = useState([]);
		const [ladowanie, setLadowanie] = useState(false);
		const [blad, setBlad] = useState(null);

		useEffect(() => {
			// Sprawdzamy czy mamy idKlasy
			if (!idKlasy) return;

			// Ustawiamy stan ładowania
			setLadowanie(true);
			setBlad(null);

			// Pobieramy dane z API
			// W prawdziwej aplikacji byłoby tutaj fetch(`/api/klasy/${idKlasy}/przedmioty`)
			// Tu symulujemy (tworzymy mocka) odpowiedź serwera
			const timeout = setTimeout(() => {
				// Symulacja odpowiedzi API - lista przedmiotów dla klasy
				const danePrzedmiotow = {
					'1A': ['Matematyka', 'Fizyka', 'Chemia', 'Biologia'],
					'1B': ['Polski', 'Historia', 'Geografia', 'WOS'],
					'2A': ['Angielski', 'Informatyka', 'Matematyka'],
				};

				if (danePrzedmiotow[idKlasy]) {
					setPrzedmioty(danePrzedmiotow[idKlasy]);
				} else {
					setBlad('Nie znaleziono klasy o podanym ID');
				}
				setLadowanie(false);
			}, 800);

			// Cleanup - anuluj pobieranie Jeśli klasa się zmieni zanim zakończymy
			return () => clearTimeout(timeout);

		}, [idKlasy]); // efekt uruchamia się gdy zmieni się idKlasy

		if (ladowanie) {
			return <p>Ładowanie przedmiotów...</p>;
		}
		if (blad) {
			return <p style={{ color: 'red' }}>Błąd: {blad}</p>;
		}
		if (przedmioty.length === 0) {
			return <p>Wybierz klasę</p>;
		}

		return (
			<ul>
				{przedmioty.map(p => <li key={p}>{p}</li>)}
			</ul>
		);
	}

	// Komponent główny używający ListaPrzedmiotow
	function AplikacjaZKlasami() {
		const [wybranaKlasa, setWybranaKlasa] = useState('');
		const klasy = ['1A', '1B', '2A'];

		return (
			<div>
				<h2>Przedmioty dla klasy:</h2>
				<select onChange={e => setWybranaKlasa(e.target.value)} value={wybranaKlasa}>
					<option value="">-- Wybierz klasę --</option>
					{klasy.map(k => <option key={k} value={k}>{k}</option>)}
				</select>
				<ListaPrzedmiotow idKlasy={wybranaKlasa} />
			</div>
		);
	}
*/

/*	Zadanie po Przykładzie 1
	Rozszerz komponent 'AplikacjaZKlasami':
	- Dodaj przycisk "Odswież listę"
	- Kliknięcie w przycisk powinno ponownie pobrać dane dla aktualnie wybranej klasy
	- Wskazówka: dodaj dodatkowy stan 'odswiezanie' i dodaj go do tablicy zależnosci useEffect
*/
// #endregion

// #region Przykład 2
/*	Synchronizacja z localStorage
	Zapisywanie i odczytywanie danych z pamięci przeglądarki.
	Dane zostają nawet po odświeżeniu strony!
*/

/* javascript
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

/*	Zadanie po Przykładzie 2
	Rozszerz 'ZapisywaczNotatek':
	- Dodaj przycisk "Wyczyść notatki"
	- Po kliknieciu usuwa notatkę z localStorage i czyści stan
	- Wyświetla liczbę znaków w notatce (np. "Znaków: 42 / 500")
	- Zablokuj wpisywanie więcej niż 500 znaków
*/
// #endregion

// #region Przykład 3
/*	Wielokrotne useEffect w jednym komponencie
	można mieć wiele hooków useEffect w jednym komponencie.
	każdy odpowiada za inną rzecz - to dobra praktyka!
*/

/* javascript (
	import { useState, useEffect } from 'react';

	function PanelUcznia({ uczenId, imie }) {
		const [oceny, setOceny] = useState([]);
		const [obecnosci, setObecnosci] = useState(0);
		const [powiadomienie, setPowiadomienie] = useState('');

		// Efekt 1 - zmiana tytułu strony gdy zmieni się imię ucznia
		useEffect(() => {
			document.title = `Panel ucznia: ${imie}`;
			return () => {
				document.title = 'System Szkolny'; // przywróć domyślny tytuł
			};
		}, [imie]);

		// Efekt 2 - pobierz oceny gdy zmieni się uczenId
		useEffect(() => {
			if (!uczenId) return;
			// Symulacja pobierania ocen
			setTimeout(() => {
				setOceny([5, 4, 3, 5, 4]);
			}, 300);
		}, [uczenId]);

		// Efekt 3 - sprawdź obecności gdy zmieni się uczenId
		useEffect(() => {
			if (!uczenId) return;
			// Symulacja pobierania obecności
			setTimeout(() => {
				setObecnosci(85); // procent obecności
			}, 500);
		}, [uczenId]);

		// Efekt 4 - wyświetl ostrzeżenie Jeśli obecności są poniżej 50%
		useEffect(() => {
			if (obecnosci > 0 && obecnosci < 50) {
				setPowiadomienie('Uwaga! Zbyt niska frekwencja!');
			} else {
				setPowiadomienie('');
			}
		}, [obecnosci]);

		const srednia = oceny.length > 0
			? (oceny.reduce((s, o) => s + o, 0) / oceny.length).toFixed(2)
			: '-';

		return (
			<div>
				<h3>Panel: {imie}</h3>
				<p>Średnia ocen: {srednia}</p>
				<p>Frekwencja: {obecnosci}%</p>
				{powiadomienie && <p style={{ color: 'orange' }}>{powiadomienie}</p>}
			</div>
		);
	}
*/

/*	Zadanie po Przykładzie 3
	Na podstawie Przykładu stwórz komponent 'StatusPolaczenia', który:
	- Używając useEffect z [] nasluchuje zmian połączenia internetowego
		(window.addEventListener('online', handler) i 'offline')
	- Wyświetla "Połączono z internetem" lub "Brak połączenia"
	- W cleanup usuwa obserwatory zdarzeń, żeby nie było wycieków pamięci
*/
// #endregion
// #endregion


// #region zadania
/*	Odpowiedzi do zadań proszę zapisać:
	w formacie 'zadanie-X.js' (X to numer zadania np. 'zadanie-1.js')
	w katalogu 'W:\numerKlasy\przedmiot\data-nazwaPlikuBezRozszerzenia\ImieNazwisko\'
		np. 'W:\1a\algorytmy\20260325-10-tabliceJednowymiarowe\JanKowalski\zadanie-1.js'
	Nie wrzucaj katalogu 'node_modules' ani innych zbędnych (zwłaszcza dużych)
		katalogów, tylko same pliki z rozwiązaniami
*/

/*	Zadanie 1 - Latwe
	Stwórz komponent 'ZegarCyfrowy', który wyświetla aktualny czas (godziny, minuty, sekundy).
	Wymagania:
	- Użyj useEffect z [] do uruchomienia interwalu co 1 sekundę
	- Użyj useState do przechowywania aktualnego czasu
	- Wyświetl czas w formacie HH:MM:SS
	- W cleanup zatrzymaj interval (clearInterval)
	- Wskazówka: new Date().toLocaleTimeString()
*/

/*	Zadanie 2 - Latwe
	Stwórz komponent 'PowitanieZBazy', który:
	- Przy montowaniu (useEffect z []) "pobiera" imię ucznia z localStorage
		(klucz: 'imie-ucznia') lub ustawia domyślne "Nieznajomy"
	- Wyświetla "Witaj, [imie]!"
	- Ma pole input i przycisk "Zapisz imię"
	- Po kliknieciu przycisku zapisuje imie do localStorage i aktualizuje stan
	- Przy ponownym otwarciu strony pamięta zapisane imię
*/

/*	Zadanie 3 - Średnie
	Stwórz komponent 'PodgladTypowania', który implementuje efekt "ktos pisze...":
	- Ma pole tekstowe
	- Gdy użytkownik zaczyna pisać, wyświetla "użytkownik pisze..."
	- Jeśli użytkownik nie pisał przez 1,5 sekundy, komunikat znika
	- Użyj useEffect z [tekst] i clearTimeout w cleanup
	- To częsty pattern w komunikatorach (np. WhatsApp)
*/

/*	Zadanie 4 - Średnie
	Stwórz system 'OcenySzkolne' z komponentami:
	- Komponent 'DodajOcene': formularz z polem na ocene (1-6) i przyciskiem "Dodaj"
	- Komponent 'StatystykiOcen': przyjmuje tablice ocen przez propsy i wyświetla średnią
	- W komponencie głównym:
		- Przechowyj tablicę ocen w stanie
		- Użyj useEffect ([oceny]) żeby zapisywać oceny do localStorage przy każdej zmianie
		- Przy montowaniu wczytaj oceny z localStorage
		- Wyświetl średnią ocen i liczbę ocen
*/

/*	Zadanie 5 - Trudne
	Stwórz komponent 'WyszukiwarkaUczniowApi', który symuluje wyszukiwanie z opóznieniem (debounce):
	- Ma pole input do wpisywania imienia ucznia
	- Użyj useEffect ([fraza]) - ale dane pobieraj dopiero po 400ms od ostatniej zmiany frazy
		(Użyj setTimeout + clearTimeout w cleanup - to własnie jest debounce)
	- Gdy fraza jest krótsza niz 2 znaki, nie wyszukuj
	- Symuluj "pobieranie z API" przez setTimeout (300ms) i wbudowaną listę uczniów
	- Wyświetl stan: "Wpisz imię", "Szukam...", lista wyników lub "Brak wyników"
	- Lista uczniów do wyszukiwania: ['Anna Kowalska', 'Bartek Nowak', 'Anna Wiśniowa',
		'Celina Dąbrowska', 'Daniel Witek', 'Ewa Kowalczyk', 'Filip Adamski']
*/

/*	Zadanie 6 - Bardzo trudne
	Stwórz pełny komponent 'PanelLekcjiOnline', który symuluje panel lekcji online:

	Funkcjonalnosci:
	a) Zegar odlicząjacy czas lekcji (np. 45 minut = 2700 sekund)
		 - useEffect z [] uruchamia interval
		 - Wyświetla pozostały czas w formacie MM:SS
		 - Cleanup zatrzymuje interval

	b) Lista obecnych uczniów
		 - useEffect z [] "pobiera" listę uczniów (symulacja, setTimeout 1s)
		 - można zaznaczać obecność checkboxem przy każdym uczniu

	c) Automatyczny zapis do localStorage
		 - useEffect ([obecnosci]) zapisuje stan obecności do localStorage
		 - Przy montowaniu wczytuje zapisany stan

	d) Powiadomienia
		 - useEffect ([pozostałyCzas]) sprawdza czy zostało 5 minut i wyświetla ostrzeżenie
		 - Po końcu czasu wyświetla "Koniec lekcji!"

	e) tytuł strony
		 - useEffect ([pozostalyCzas]) aktualizuje tytuł strony Np. "Lekcja - 44:32 pozostało"
		 - Cleanup przywraca domyslny tytuł

	Uczniowie do wyświetlenia: ['Anna K.', 'Bartek N.', 'Celina D.', 'Dawid W.', 'Ewa M.']
*/
// #endregion


// #region podsumowanie
/*	Kluczowe punkty lekcji
	1. Efekty uboczne (side effects) to operacje wykraczajace poza renderowanie:
		 - pobieranie danych, timery, event listenery, localStorage, zmiana DOM

	2. Tablica zależnosci (dependency array) kontroluje kiedy useEffect się uruchamia:
		 - brak tablicy = po KAŻDYM wyrenderowaniu
		 - [] = tylko raz, przy montowaniu
		 - [a, b] = przy montowaniu i gdy zmieni się 'a' lub 'b'

	3. Cleanup function - funkcja zwracana z useEffect:
		 - Wykonuje się przed kolejnym uruchomieniem efektu
		 - Wykonuje się gdy komponent znika ze strony
		 - Użyj jej do: clearInterval, clearTimeout, removeEventListener
		 - Brak cleanup = możliwe wycieki pamięci!

	4. można mieć wiele useEffect w jednym komponencie - to dobra praktyka!
		 każdy efekt powinien robić jedną konkretną rzecz.

	5. Częste wzorce użycia:
		 - [] + fetch = pobranie danych przy starcie
		 - [id] + fetch = pobranie danych gdy zmieni się id
		 - [tekst] + setTimeout + cleanup = debounce
		 - [] + setInterval + cleanup = zegar/timer
		 - [] + addEventListener + cleanup = nasłuchiwanie zdarzeń globalnych
*/

/*	Czego unikać
	- Nie umieszczaj całych obiektów i tablic w tablicy zależnosci bez potrzeby
		(React porównuje je przez referencje, co może powodować nieskończone pętle)
	- Nie zapomnij o cleanup przy timerach i event listenerach
	- Nie modyfikuj stanu bezpośrednio w useEffect bez odpowiedniej tablicy zależnosci
		- to może powodować nieskończone pętle renderowania!
	- Jeśli używasz zmiennej wewnątrz useEffect, dodaj ją do tablicy zależnosci
*/
// #endregion

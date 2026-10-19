// #region Context API w React - wstęp
/*	Cele lekcji
	Celem dzisiejszej lekcji jest nauczenie się, jak zarządzać danymi, które muszą być
	dostępne w wielu miejscach aplikacji jednocześnie - bez konieczności przekazywania
	ich przez każdy komponent po drodze.

	Wyobraź sobie, że masz aplikację szkolną i chcesz wyświetlić imię zalogowanego ucznia
	w 10 różnych miejscach. Bez Context API musiałbyś przekazywać to imię przez props
	przez każdy komponent - to właśnie nazywamy "prop drilling" i jest to bardzo uciążliwe.
	Context API rozwiązuje ten problem elegancko i prosto.
*/

/*	Co będziesz umieć po tej lekcji?
	- Wyjaśnić, czym jest prop drilling i dlaczego jest problematyczny
	- Tworzyć własny Context za pomocą React.createContext()
	- Udostępniać dane przez Context.Provider
	- Odczytywać dane z Context za pomocą hooka useContext()
	- Budować globalny stan aplikacji (np. zalogowany użytkownik, motyw kolorystyczny)
	- Aktualizować dane w Contexcie z poziomu dowolnego komponentu
	- Stosować Context API w projekcie systemu zarządzania szkołą
*/
// #endregion


// #region informacje
/*	Kluczowe pojęcie 1 - Prop Drilling (problem, który Context rozwiązuje)
	Prop drilling to sytuacja, gdy przekazujesz dane przez props przez wiele poziomów
	komponentów, nawet przez te, które tych danych nie potrzebują - tylko po to,
	żeby dotrzeć do komponentu, który ich potrzebuje.

	Przykład problemu (bez Context):
	javascript (
		// Dane muszą przechodzić przez KAŻDY komponent po drodze
		<App user={user}>						// App wie o userze
			<Layout user={user}>				// Layout też musi wiedzieć, choć nie używa
				<Navbar user={user}>			// Navbar też tylko przekazuje dalej
					<UserAvatar user={user} />	// tylko tutaj dane są używane!
				</Navbar>
			</Layout>
		</App>
	)

	To jak gra telefon - dane musiały przejść przez Layout i Navbar, mimo że ich nie potrzebowały.
	Context API pozwala "teleportować" dane bezpośrednio tam, gdzie są potrzebne.
*/

/*	Kluczowe pojęcie 2 - Context API - jak to działa?
	Context API składa się z trzech głównych elementów:

	1. createContext() - tworzy "magazyn" na dane
		- Wywołujesz raz, zazwyczaj w osobnym pliku
		- Zwraca obiekt z Provider i Consumer

	2. Provider - "dostawca" danych
		- Opakowuje komponenty, które mają mieć dostęp do danych
		- Przyjmuje prop 'value' z danymi, które chcemy udostępnić
		- Wszystkie komponenty wewnątrz Providera mają dostęp do tych danych

	3. useContext() - hook do odczytywania danych
		- Używasz go w komponencie, który potrzebuje danych z Context
		- Zwraca aktualną wartość Context
		- Komponent automatycznie rerenderuje się gdy dane w Contexcie się zmienią

	Wizualizacja:
	javascript (
		<SchoolContext.Provider value={daneKontekstu}>
			<Dowolny komponent na dowolnym poziomie>
				<MozeByc20PoziomowNizej />	// i tak ma dostęp do danych!
			</Dowolny komponent na dowolnym poziomie>
		</SchoolContext.Provider>
	)
*/

/*	Kluczowe pojęcie 3 - Kiedy używać Context API?
	Context API jest idealny gdy:
	- Te same dane są potrzebne w wielu niezbliżonych komponentach
	- Dane rzadko się zmieniają (np. zalogowany użytkownik, język, motyw)
	- Prop drilling powoduje, że kod staje się nieczytelny

	Kiedy NIE używać Context:
	- Gdy dane są potrzebne tylko w jednym miejscu - użyj zwykłego stanu useState
	- Gdy dane bardzo często się zmieniają - Context może powodować zbędne rerendery
	- Gdy komponenty są blisko siebie w hierarchii - po prostu przekaż przez props

	Typowe zastosowania w szkole:
	- Informacje o zalogowanym uczniu/nauczycielu
	- Motyw kolorystyczny (jasny/ciemny)
	- Język interfejsu (polski/angielski)
	- Globalne powiadomienia
*/

/*	Kluczowe pojęcie 4 - Wartość domyślna Context
	Kiedy tworzysz Context, możesz podać wartość domyślną:
	javascript (
		const MojContext = createContext(wartośćDomyslna);
	)

	Ta wartość jest używana TYLKO gdy komponent korzysta z useContext()
	ale nie jest opakowany w żaden Provider. W praktyce rzadko to się zdarza,
	ale warto znać tę zasadę.

	Zazwyczaj jako wartość domyślną podaje się null lub pusty obiekt:
	javascript (
		const UserContext = createContext(null);
	)
*/
// #endregion


// #region przydatne funkcje
/*	createContext(wartośćDomyslna) - tworzenie nowego Context
	Opis: Tworzy nowy obiekt Context, który pozwala na udostępnianie danych
		bez przekazywania ich przez props. Wywołujesz tę funkcję RAZ,
		zazwyczaj w osobnym pliku, i eksportujesz wynik.

	Składnia:
		import React, { createContext } from 'react';
		const NazwaContext = createContext(opcjonalnawartośćDomyslna);

	Zwraca obiekt zawierający:
	- NazwaContext.Provider - komponent dostawca
	- NazwaContext.Consumer - stary sposób konsumowania (nie używamy, mamy useContext)
*/

/* Przykład createContext:
	// Tworzymy Context dla informacji o szkole
	import React, { createContext, useContext } from 'react';
	const SchoolContext = createContext(null);

	// Wynik: obiekt SchoolContext z polami Provider i Consumer
	// SchoolContext.Provider - będziemy używać do owijania aplikacji
	// SchoolContext.Consumer - stary sposób, nie używamy, mamy useContext
*/

/*	Context.Provider - dostarczanie danych do komponentów
	Opis: Komponent, który "opakowuje" inne komponenty i udostępnia im dane.
		Przyjmuje obowiązkowy prop 'value' z danymi do udostępnienia.
		Wszystkie komponenty wewnątrz Providera (na dowolnym poziomie!)
		mają dostęp do tych danych.

	Składnia: (
		<NazwaContext.Provider value={daneDoUdostepnienia}>
			<KomponentyMajaceDosteDoKontekstu />
		</NazwaContext.Provider>
	)

	WAŻNE: Gdy wartość 'value' się zmienia, WSZYSTKIE komponenty korzystające
	z tego Context zostaną ponownie wyrenderowane!
*/

// Przykład Provider:
import React, { createContext, useContext, useState } from 'react';
const AppWithProvider = () => {
	const [currentUser] = useState({ name: 'Anna Kowalska', role: 'uczen', class: '2B' });

	return (
		// Owijamy całą aplikację Providerem
		// Teraz KAŻDY komponent wewnątrz ma dostęp do currentUser
		<SchoolContext.Provider value={currentUser}>
			<h1>System Szkolny</h1>
			{/* Nie musimy przekazywać currentUser przez props! */}
		</SchoolContext.Provider>
	);
};
// Wynik: Aplikacja z dostępem do danych użytkownika w każdym komponencie


/*	useContext(Context) - odczytywanie danych z Context
	Opis: Hook, który pozwala odczytać aktualną wartość z Context.
		Komponent korzystający z useContext() automatycznie rerenderuje się
		gdy wartość Context się zmieni.

	Składnia: (
		import React, { createContext, useContext, useState } from 'react';
		const wartośćZKontekstu = useContext(NazwaContext);
	)

	Zasady:
	- Wywołuj tylko wewnątrz komponentów funkcyjnych lub innych hooków
	- Wywołuj na poziomie komponentu, nie wewnątrz warunków czy pętli
	- Komponent musi być wewnątrz odpowiedniego Providera
*/

// Przykład useContext:
import React, { createContext, useContext, useState } from 'react';
const StudentProfile = () => {
	// Pobieramy dane bezpośrednio z Context - bez props!
	const user = useContext(SchoolContext);

	if (!user) return <p>Ładowanie danych użytkownika...</p>;

	return (
		<div>
			<h2>Profil ucznia</h2>
			<p>Imię: {user.name}</p>
			<p>Rola: {user.role}</p>
			<p>Klasa: {user.class}</p>
		</div>
	);
};
// Wynik: Wyświetla profil ucznia pobrany z Context
// Nie potrzebuje żadnych props - dane pobiera samodzielnie!

/*	Zadanie praktyczne - useContext
	Stwórz Context o nazwie ThemeContext z wartością domyślną 'jasny'.
	Następnie stwórz komponent ThemeDisplay, który wyświetla aktualny motyw
	pobrany z ThemeContext. Nie zapomnij opakować komponentu w Provider!
*/
// #endregion


// #region Przykłady
// #region Przykład 1 - Podstawowy Context dla zalogowanego użytkownika
/*	Ten przykład pokazuje pełny przepływ: tworzenie Context, Provider,
	i odczytywanie danych w zagnieżdżonym komponencie.
*/

// --- Krok 1: Importowanie funkcji i tworzenie Context (zazwyczaj w osobnym pliku UserContext.jsx) ---
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);
// Eksportujemy Context żeby inne pliki mogły go używać

// --- Krok 2: Provider - zazwyczaj opakowuje całą aplikację ---
const UserProvider = ({ children }) => {
	// Stan z danymi zalogowanego użytkownika
	const [user, setUser] = useState({
		id: 1,
		name: 'Tomasz Nowak',
		role: 'uczen',
		class: '3A',
		isLoggedIn: true
	});

	// Funkcja do wylogowania - zmieniamy user na null
	const logout = () => {
		setUser(null);
	};

	// Udostępniamy zarówno dane jak i funkcje!
	// Dzięki temu każdy komponent może też wylogować użytkownika
	return (
		<UserContext.Provider value={{ user, logout }}>
			{children}
		</UserContext.Provider>
	);
};

// --- Krok 3: Komponent głęboko zagnieżdżony korzysta z danych ---
const WelcomeMessage = () => {
	// Pobieramy dane z Context bezpośrednio - bez props!
	const { user, logout } = useContext(UserContext);

	if (!user) {
		return <p>Nie jesteś zalogowany. Zaloguj się, aby kontynuować.</p>;
	}

	return (
		<div>
			<h2>Witaj, {user.name}!</h2>
			<p>Klasa: {user.class} | Rola: {user.role}</p>
			<button onClick={logout}>Wyloguj się</button>
		</div>
	);
};

// --- Krok 4: Składamy wszystko razem ---
const SchoolApp = () => {
	return (
		// UserProvider opakowuje całą aplikację
		// Dzięki temu WelcomeMessage (i każdy inny komponent) ma dostęp do danych
		<UserProvider>
			<div className="app">
				<h1>System Zarządzania Szkołą</h1>
				{/* WelcomeMessage nie dostaje żadnych props - czyta z Context */}
				<WelcomeMessage />
			</div>
		</UserProvider>
	);
};

/*	Wynik działania przykładu 1:
	Na ekranie pojawia się:
	- "System Zarządzania Szkołą"
	- "Witaj, Tomasz Nowak!"
	- "Klasa: 3A | Rola: uczen"
	- Przycisk "Wyloguj się"

	Po kliknięciu przycisku:
	- user staje się null
	- WelcomeMessage wyświetla komunikat o braku logowania
	- Provider automatycznie aktualizuje wszystkie komponenty które korzystają z UserContext
*/

/*	Zadanie do przykładu 1:
	Rozszerz komponent WelcomeMessage tak, żeby wyświetlał różne wiadomości
	w zależności od roli użytkownika:
	- dla 'uczen': "Sprawdź swój plan lekcji"
	- dla 'nauczyciel': "Masz X uczniów w klasie"
	- dla 'admin': "Panel administracyjny"
	Wskazówka: użyj instrukcji if lub operatora trójargumentowego ?:
*/
// #endregion

// #region Przykład 2 - Context z możliwością aktualizacji (motyw kolorystyczny)
/*	Pokazuje jak udostępniać funkcje do zmiany danych przez Provider,
	co pozwala komponentom nie tylko czytać, ale też modyfikować stan globalny.
*/

// Tworzymy Context dla motywu
const ThemeContext = createContext(null);

// Provider zarządzający motywem
const ThemeProvider = ({ children }) => {
	// Stan przechowujący aktualny motyw
	const [theme, setTheme] = useState('jasny');

	// Funkcja do przełączania motywu
	const toggleTheme = () => {
		setTheme(currentTheme => currentTheme === 'jasny' ? 'ciemny' : 'jasny');
	};

	// Udostępniamy temat i funkcję do jego zmiany
	const contextValue = {
		theme,
		toggleTheme,
		// Pomocnicze wartości CSS - wygodne skróty
		backgroundColor: theme === 'jasny' ? '#fff' : '#222',
		textColor: theme === 'jasny' ? '#333' : '#ddd'
	};

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
};

// Komponent który UŻYWA motywu
const ThemedClassroom = () => {
	const { theme, toggleTheme, backgroundColor, textColor } = useContext(ThemeContext);

	const styles = {
		backgroundColor: backgroundColor,
		color: textColor,
		padding: '20px',
		borderRadius: '8px',
		margin: '10px'
	};

	return (
		<div style={styles}>
			<h3>Klasa 2B - Lista uczniów</h3>
			<p>Aktualny motyw: {theme}</p>
			<ul>
				<li>Anna Kowalska</li>
				<li>Piotr Wiśniewski</li>
				<li>Maja Kamińska</li>
			</ul>
			{/* Kliknięcie tego przycisku zmieni motyw dla WSZYSTKICH komponentów! */}
			<button onClick={toggleTheme}>
				Zmień na motyw {theme === 'jasny' ? 'ciemny' : 'jasny'}
			</button>
		</div>
	);
};

// Drugi komponent - też automatycznie reaguje na zmianę motywu
const ThemedGradePanel = () => {
	const { backgroundColor, textColor, theme } = useContext(ThemeContext);

	return (
		<div style={{ backgroundColor, color: textColor, padding: '20px' }}>
			<h3>Oceny - motyw: {theme}</h3>
			<p>Matematyka: 5</p>
			<p>Fizyka: 4</p>
		</div>
	);
};

const SchoolWithTheme = () => {
	return (
		<ThemeProvider>
			{/* Oba komponenty automatycznie zmieniają wygląd po zmianie motywu */}
			<ThemedClassroom />
			<ThemedGradePanel />
		</ThemeProvider>
	);
};

/*	Wynik działania przykładu 2:
	- Dwa panele wyświetlają informacje szkolne
	- Oba mają tło białe (motyw jasny) i ciemny tekst
	- Po kliknięciu przycisku "Zmień na motyw ciemny":
		- OBA panele jednocześnie zmieniają kolory na ciemne
		- Dzieje się to automatycznie, bez żadnego dodatkowego kodu!
	- To pokazuje moc Context - jeden stan, wiele komponentów reaguje
*/

/*	Zadanie do przykładu 2:
	Dodaj do ThemeProvider trzeci motyw - 'szkolny' (np. żółte tło, granatowy tekst).
	Zmień toggleTheme tak żeby cyklicznie przechodziło przez trzy motywy:
	jasny -> ciemny -> szkolny -> jasny -> ...
	Wskazówka: możesz użyć tablicy motywów i modulo (%)
*/
// #endregion

// #region Przykład 3 - Wiele Contextów naraz i custom hook
/*	W realnych aplikacjach często używamy kilku Contextów jednocześnie.
	Dobrą praktyką jest tworzenie własnych hooków (custom hooks) dla Contextów,
	które upraszczają korzystanie z nich i dodają obsługę błędów.
*/

// Context dla powiadomień szkolnych
const NotificationContext = createContext(null);

const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);

	// Funkcja dodająca nowe powiadomienie
	const addNotification = (message, type = 'info') => {
		const newNotification = {
			id: Date.now(), // unikalny identyfikator oparty na czasie
			message,
			type, // 'info', 'sukces', 'ostrzeżenie', 'blad'
			timestamp: new Date().toLocaleTimeString('pl-PL')
		};
		// Dodajemy nowe powiadomienie na początek listy
		setNotifications(prev => [newNotification, ...prev]);
	};

	// Funkcja usuwająca powiadomienie po jego ID
	const removeNotification = (id) => {
		setNotifications(prev => prev.filter(notif => notif.id !== id));
	};

	return (
		<NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
			{children}
		</NotificationContext.Provider>
	);
};

// Custom hook - własny hook upraszczający użycie Context
// Konwencja: nazwa zaczyna się od 'use'
const useNotifications = () => {
	const context = useContext(NotificationContext);
	// Sprawdzamy czy komponent jest wewnątrz Providera
	if (!context) {
		// Ten błąd pojawi się podczas developmentu jeśli zapomnimy o Providerze
		throw new Error('useNotifications musi być użyty wewnątrz NotificationProvider!');
	}
	return context;
};

// Komponent wyświetlający powiadomienia
const NotificationList = () => {
	const { notifications, removeNotification } = useNotifications();

	if (notifications.length === 0) {
		return <p>Brak nowych powiadomień.</p>;
	}

	return (
		<div>
			<h3>Powiadomienia ({notifications.length})</h3>
			{notifications.map(notif => (
				<div key={notif.id} className={`notification notification-${notif.type}`}>
					<span>{notif.timestamp} - {notif.message}</span>
					<button onClick={() => removeNotification(notif.id)}>Usuń</button>
				</div>
			))}
		</div>
	);
};

// Komponent który wysyła powiadomienia
const GradeEntry = () => {
	const { addNotification } = useNotifications();

	const saveGrade = () => {
		// Symulujemy zapisanie oceny i wysyłamy powiadomienie
		addNotification('Ocena 5 z matematyki została zapisana pomyślnie!', 'sukces');
	};

	const sendWarning = () => {
		addNotification('Uwaga: Tomasz Nowak ma nieusprawiedliwioną nieobecność!', 'ostrzeżenie');
	};

	return (
		<div>
			<h3>Wpisywanie ocen</h3>
			<button onClick={saveGrade}>Zapisz ocenę 5</button>
			<button onClick={sendWarning}>Wyślij ostrzeżenie</button>
		</div>
	);
};

// Składamy aplikację z wieloma Providerami
const FullSchoolApp = () => {
	return (
		// Zagnieżdżamy Providery - kolejność może mieć znaczenie!
		<UserProvider>
			<ThemeProvider>
				<NotificationProvider>
					<div>
						<h1>System Szkolny</h1>
						<WelcomeMessage />
						<GradeEntry />
						<NotificationList />
					</div>
				</NotificationProvider>
			</ThemeProvider>
		</UserProvider>
	);
};

/*	Wynik działania przykładu 3:
	- Na ekranie: powitanie użytkownika, formularz ocen, lista powiadomień
	- Po kliknięciu "Zapisz ocenę 5": pojawia się powiadomienie o sukcesie
	- Po kliknięciu "Wyślij ostrzeżenie": pojawia się powiadomienie ostrzeżenia
	- Każde powiadomienie ma godzinę dodania i przycisk "Usuń"
	- useNotifications() jako custom hook sprawia, że kod jest czytelniejszy
		i automatycznie sprawdza czy Provider jest obecny
*/

/*	Zadanie do przykładu 3:
	Stwórz komponent NotificationCount który wyświetla tylko liczbę nieprzeczytanych
	powiadomień (np. "Masz 3 powiadomienia"). Użyj custom hooka useNotifications().
	Następnie dodaj funkcję clearAll() do NotificationProvider która usuwa wszystkie
	powiadomienia naraz, i dodaj przycisk "Wyczyść wszystkie" do NotificationList.
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

/*	Zadanie 1 - Poziom: Łatwy
	Temat: Pierwszy własny Context

	Stwórz Context o nazwie SchoolNameContext przechowujący nazwę szkoły.
	Wymagania:
	1. Utwórz SchoolNameContext używając createContext()
	2. Stwórz komponent SchoolNameProvider który w stanie przechowuje
		nazwę szkoły "Liceum Ogólnokształcące nr 1 im. Jana Kochanowskiego"
	3. Stwórz komponent SchoolHeader który pobiera nazwę z Context
		i wyświetla ją w tagu <h1>
	4. Złóż wszystko w App i uruchom

	Oczekiwany wynik:
	Na stronie widoczny nagłówek z pełną nazwą szkoły.

	Wskazówka: Pamiętaj o "owinięciu" SchoolHeader w SchoolNameProvider!
*/

/*	Zadanie 2 - Poziom: Łatwy
	Temat: Context z możliwością zmiany danych

	Stwórz system zmiany klasy dla ucznia.
	Wymagania:
	1. Utwórz StudentContext przechowujący obiekt { name: 'Jan Kowalski', class: '1A' }
	2. Dodaj do Providera funkcję changeClass(newClass) która aktualizuje klasę ucznia
	3. Stwórz komponent StudentInfo wyświetlający imię i klasę ucznia
	4. Stwórz komponent ClassChanger z przyciskami: "1A", "2B", "3C"
		- Kliknięcie przycisku zmienia klasę ucznia w Contexcie
	5. Oba komponenty mają działać bez przekazywania props

	Oczekiwany wynik:
	Wyświetla się "Jan Kowalski - Klasa: 1A"
	Po kliknięciu "2B" zmienia się na "Jan Kowalski - Klasa: 2B"
*/

/*	Zadanie 3 - Poziom: Sredni
	Temat: Custom Hook dla Context

	Stwórz system zarządzania listą obecności z custom hookiem.
	Wymagania:
	1. Utwórz AttendanceContext z listą uczniów:
		[
			{ id: 1, name: 'Anna Nowak', present: false },
			{ id: 2, name: 'Piotr Kowalski', present: false },
			{ id: 3, name: 'Maria Wiśniewska', present: false }
		]
	2. Dodaj funkcję toggleAttendance(id) przełączającą obecność ucznia
	3. Stwórz custom hook useAttendance() z sprawdzaniem czy Provider jest aktywny
	4. Stwórz komponent AttendanceList wyświetlający listę z checkboxami
		(checkbox zaznaczony jeśli present === true)
	5. Stwórz komponent AttendanceSummary wyświetlający:
		"Obecnych: X z Y uczniów"

	Oczekiwany wynik:
	Lista uczniów z checkboxami. Kliknięcie checkboxa zmienia status.
	Podsumowanie aktualizuje się automatycznie.
*/

/*	Zadanie 4 - Poziom: Sredni
	Temat: Kilka Contextów i komunikacja między nimi

	Stwórz mini panel ocen dla systemu szkolnego.
	Wymagania:
	1. UserContext: przechowuje zalogowanego nauczyciela { name: 'dr Makowski', subject: 'Matematyka' }
	2. GradesContext: przechowuje tablicę ocen z funkcjami addGrade i deleteGrade:
		- addGrade(studentName, grade) - dodaje ocenę { id, studentName, grade, addedBy, date }
		- pole addedBy powinno pobierać imię z UserContext... ale Contexty nie mogą się wzajemnie
			odczytywać bezpośrednio! Wskazówka: przekaż imię nauczyciela jako parametr do addGrade.
		- deleteGrade(id) - usuwa ocenę po ID
	3. Komponent AddGradeForm: formularz z polem na imię ucznia i select z ocenami (1-6)
	4. Komponent GradesList: lista wszystkich ocen z przyciskiem usuwania
	5. Komponent TeacherInfo: wyświetla informacje o zalogowanym nauczycielu

	Oczekiwany wynik:
	Widoczne imię nauczyciela, formularz dodawania ocen, lista ocen.
	Po dodaniu oceny pojawia się na liście z imieniem nauczyciela.
*/

/*	Zadanie 5 - Poziom: Trudny
	Temat: Pełny system autoryzacji z Context API

	Stwórz system logowania dla szkoły.
	Wymagania:
	1. Stwórz AuthContext z:
		- currentUser: null (niezalogowany) lub obiekt użytkownika
		- login(username, password): sprawdza dane i ustawia użytkownika
		- logout(): wylogowuje
		- isLoggedIn: wartość boolean (true/false) obliczona z currentUser
	2. Przygotuj "bazę danych" (tablicę w kodzie) z użytkownikami:
		[
			{ id: 1, username: 'uczen1', password: '1234', name: 'Jan Nowak', role: 'uczen', class: '2B' },
			{ id: 2, username: 'nauczyciel1', password: 'abcd', name: 'Anna Kowalska', role: 'nauczyciel', subject: 'Biologia' },
			{ id: 3, username: 'admin', password: 'admin', name: 'Dyrektór Szkoły', role: 'admin' }
		]
	3. Stwórz komponent LoginForm z polami username i password
	4. Stwórz komponent Dashboard który wyświetla RÓŻNE treści zależnie od roli:
		- uczen: "Twój plan lekcji" + info o klasie
		- nauczyciel: "Twoje klasy" + przedmiot
		- admin: "Panel administracyjny" + wszystkie funkcje
	5. App powinno wyświetlać LoginForm jeśli !isLoggedIn lub Dashboard jeśli zalogowany
	6. Dodaj obsługę błędnego logowania (wyświetl komunikat błędu)
	7. Stwórz custom hook useAuth()

	Oczekiwany wynik:
	Formularz logowania. Po podaniu poprawnych danych - panel odpowiedni dla roli.
	Po wylogowaniu - powrót do formularza.
*/

/*	Zadanie 6 - Poziom: Bardzo Trudny
	Temat: Kompletny mini-system szkolny z wieloma Contextami i zaawansowanymi funkcjami

	Stwórz "System Zarządzania Szkołą" łączący wiele Contextów.
	Wymagania:

	KONTEKSTY:
	1. AuthContext - logowanie/wylogowanie (z zadania 5 lub uproszczony)
	2. ClassesContext - zarządzanie klasami:
		- klasy: [{ id, name, students: [] }]
		- addClass(name), deleteClass(id)
		- addStudentToClass(classId, studentName)
		- removeStudentFromClass(classId, studentName)
	3. ScheduleContext - plan lekcji:
		- schedule: { '1A': [], '2B': [] } (pary przedmiotów)
		- addLesson(classId, day, subject, teacher)
		- lessons przechowują { id, day, subject, teacher }
	4. NotificationContext - powiadomienia (jak w przykładzie 3)

	KOMPONENTY:
	- Navbar: wyświetla nazwę zalogowanego użytkownika i przycisk wylogowania
	- ClassManager: CRUD dla klas i uczniów (dodawanie, usuwanie)
	- ScheduleViewer: wyświetla plan lekcji dla wybranej klasy (select z klasami)
	- ScheduleEditor: dodawanie lekcji do planu (tylko dla roli nauczyciel/admin)
	- Każda operacja (dodanie klasy, ucznia, lekcji) powinna generować powiadomienie

	ZAAWANSOWANE WYMAGANIA:
	- Stwórz custom hooki: useAuth(), useClasses(), useSchedule(), useNotifications()
	- Komponent ClassManager powinien być dostępny tylko dla admina (warunkowe renderowanie)
	- ScheduleEditor powinien być dostępny tylko dla nauczyciela lub admina
	- Plan lekcji powinien być posortowany według dni tygodnia (Pn, Wt, Sr, Cz, Pt)
	- Dodaj licznik uczniów w każdej klasie widoczny w ClassManager

	Oczekiwany wynik:
	Pełna mini-aplikacja szkolna. Logowanie jako różne role odblokowuje różne funkcje.
	Wszystkie operacje generują powiadomienia. Dane są spójne między komponentami dzięki Context API.

	Wskazówka: Zacznij od stworzenia wszystkich Contextów i Providerów,
	a dopiero potem twórz komponenty. Pamiętaj o zagnieżdżeniu Providerów w App.
*/
// #endregion


// #region podsumowanie
/*	Kluczowe punkty lekcji
	1. PROBLEM - Prop Drilling
		- Przekazywanie danych przez wiele poziomów komponentów przez props
		- Kod staje się nieczytelny i trudny w utrzymaniu
		- Context API elegancko rozwiązuje ten problem

	2. ROZWIĄZANIE - Trzy kroki Context API
		Krok 1: Stwórz Context
		javascript (
			const MojContext = createContext(null);
		)

		Krok 2: Owiń komponenty Providerem
		javascript (
			<MojContext.Provider value={daneDoUdostepnienia}>
				<TwojKomponent />
			</MojContext.Provider>
		)

		Krok 3: Odczytaj dane w komponencie
		javascript (
			const dane = useContext(MojContext);
		)

	3. CO MOŻNA PRZEKAZYWAĆ PRZEZ CONTEXT
		- Proste wartości: string, number, boolean
		- Obiekty z danymi: { user, settings, theme }
		- Funkcje: addItem, deleteItem, toggleTheme
		- Kombinacje powyższych: { dane, funkcjaAktualizujaca }

	4. CUSTOM HOOKI DLA CONTEXT
		- Dobra praktyka - tworzy czytelniejszy kod
		- Pozwala dodać sprawdzanie czy Provider istnieje
		- Konwencja nazewnictwa: useMojContext()
			javascript (
				const useMojContext = () => {
					const ctx = useContext(MojContext);
					if (!ctx) throw new Error('Brak Providera!');
					return ctx;
				}
			)

	5. KIEDY UŻYWAĆ CONTEXT API
		UŻYWAJ gdy:
		- Dane potrzebne w wielu niezależnych komponentach (user, theme, język)
		- Prop drilling powoduje nieczytelność kodu
		- Dane zmieniają się rzadko lub umiarkowanie często

		NIE UŻYWAJ gdy:
		- Dane potrzebne tylko w jednym miejscu (użyj useState)
		- Dane bardzo blisko siebie w hierarchii (użyj props)
		- Bardzo częste zmiany danych (może powodować problemy z wydajnością)

	6. WAŻNE ZASADY
		- Każda zmiana wartości w Provider rerenderuje WSZYSTKIE komponenty
			korzystające z tego Context
		- Możesz mieć wiele Contextów w jednej aplikacji - to całkowicie normalne
		- Kolejność zagnieżdżenia Providerów nie ma znaczenia dla funkcjonalności,
			ale warto zachować logiczną kolejność (np. AuthProvider najbardziej zewnętrzny)
		- Context NIE zastępuje zarządzania stanem jak Redux dla dużych aplikacji,
			ale dla małych i średnich projektów jest idealny
*/

/*	Schemat działania Context API - wizualizacja
	Bez Context (prop drilling):
	javascript (
		App [ma dane]
			-> Layout [przekazuje dalej, nie uzywa]
				-> Sidebar [przekazuje dalej, nie uzywa]
					-> UserCard [TUTAJ chcemy dane]	-- 3 poziomy przekazywania!
	)

	Z Context API:
	javascript (
		<DaneContext.Provider value={dane}>	// dane dostepne wszedzie ponizej
			App
			-> Layout			// nie musi wiedziec o danych
				-> Sidebar		// nie musi wiedziec o danych
					-> UserCard	// pobiera dane bezpośrednio z Context!
		</DaneContext.Provider>
	)

	To jak sieć Wi-Fi w domu - router (Provider) nadaje sygnał (dane),
	a każde urządzenie (komponent) może się podłączyć bezpośrednio,
	bez konieczności ciągniecia kabla (props) przez całe mieszkanie!
*/

/*	Najczęstsze błędy i jak ich unikać
	BŁĄD 1: Zapomnienie o Providerze
	- Objaw: useContext zwraca undefined lub wartość domyślną
	- Rozwiązanie: Sprawdź czy komponent jest wewnątrz Provider
	- Wskazówka: Custom hook z throw new Error() szybko pokazuje problem

	BŁĄD 2: Tworzenie nowego obiektu value przy każdym renderze
	- Przykład błędu: <Context.Provider value={{ user, logout }}>
	- Problem: { user, logout } to nowy obiekt przy każdym renderze = zbędne rerendery
	- Rozwiązanie: Użyj useMemo() lub przenieś obiekt do stanu/zmiennej poza JSX
	- Na poziomie nauki nie musisz się tym teraz martwić, ale warto wiedzieć

	BŁĄD 3: Zbyt wiele danych w jednym Context
	- Problem: Jeden duży Context spowalnia aplikację i jest trudny w utrzymaniu
	- Rozwiązanie: Rozdziel na mniejsze, tematyczne Contexty
		(UserContext, ThemeContext, NotificationContext itd.)

	BŁĄD 4: Używanie Context zamiast zwykłego przekazywania props
	- Problem: Overengineering - zbędna złożoność dla prostych przypadków
	- Rozwiązanie: Jeśli dane są potrzebne tylko w 1-2 miejscach, użyj props
*/
// #endregion

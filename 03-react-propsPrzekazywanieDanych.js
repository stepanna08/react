// #region Informacje ogólne
/*	Temat: Props - Przekazywanie danych w React
	Cel lekcji:
	- Zrozumienie koncepcji props jako mechanizmu przekazywania danych między komponentami
	- Nauka destrukturyzacji props dla czytelniejszego kodu
	- Implementacja walidacji props za pomocą PropTypes
	- Przejście z podejścia Angular (property binding) na React (props)
	- Zrozumienie, że props są read-only i jak to wpływa na projektowanie komponentów

	Przejście z Angulara do React:
	- W Angularze: @Input() do przekazywania danych do komponentów
	- W React: props jako argument funkcji komponentu (od rodzica do dziecka)
	- Props są read-only, podobnie jak @Input w Angularze
	- Brak two-way binding. Przekazywanie od dziecka do rodzica odbywa się przez callbacki (funkcje przekazywane jako props)
/

/*	Instalacja PropTypes
	Vite
		npm install prop-types

	Create-React-App
		PropTypes jest już wbudowane, nie trzeba instalować
/
// #endregion


// #region Przykłady
// #region Przykład 1: Podstawowy props
import PropTypes from 'prop-types';

function Welcome(props) {
	return <h1>Cześć, {props.name}!</h1>;
}

// Użycie: <Welcome name="Anna" />
// wynik: <h1>Cześć, Anna!</h1>
// #endregion

// #region Przykład 2: destrukturyzacja props
/*	Destrukturyzacja props pozwala na bezpośrednie wyciągnięcie wartości z
	obiektu props, co czyni kod bardziej czytelnym i zwięzłym. Zamiast pisać
	props.name i props.age, możemy od razu wyciągnąć te wartości w definicji
	funkcji komponentu.
/

// wersja bez destrukturyzacji
function Greeting(props) {
	return <p>{props.name} ma {props.age} lat</p>;
}

// wersja z destrukturyzacją wewnątrz funkcji
function Greeting(props) {
	const { name, age } = props;
	return <p>{name} ma {age} lat</p>;
}

// wersja z destrukturyzacją w definicji funkcji
function Greeting({ name, age }) {
	return <p>{name} ma {age} lat</p>;
}

// Użycie w każdej wersji: <Greeting name="Piotr" age={30} />
// wynik: <p>Piotr ma 30 lat</p>
// #endregion

// #region Przykład 3: Walidacja PropTypes
function UserCard({ username, email, age }) {
	age ??= UserCard.defaultProps.age; // Ustawienie domyślnej wartości dla age, jeśli nie jest przekazana
	return (
		<div>
			<h2>{username}</h2>
			<p>Email: {email}</p>
			<p>Wiek: {age}</p>
		</div>
	);
}

UserCard.propTypes = {
	username: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	age: PropTypes.number,
};

UserCard.defaultProps = {
	age: 0,
};
// #endregion

// #region Przykład 4: Props z obiektami i tablicami
function ProductList({ products = [] }) {
	return (
		<ul>
			{products.map(prod => (
				<li key={prod.id}>{prod.name}: {prod.price}zł</li>
			))}
		</ul>
	);
}

ProductList.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
		})
	),
};
// #endregion

// #region Przykład 5: Props z funkcją callback
function Parent() {
	const [readMessage, setMessage] = useState("");

	const handleMessage = (msg) => {
		setMessage(msg);
	};

	return (
		<div>
			<Child onMessage={handleMessage} />
			<p>Wiadomość z dziecka: {readMessage}</p>
		</div>
	);
}

function Child({ onMessage }) {
	return (
		<input
			type="text"
			onChange={(e) => onMessage(e.target.value)}
			placeholder="Napisz coś..."
		/>
	);
}
// #endregion
// #endregion


// #region Zadania praktyczne
/*	Odpowiedzi do zadań proszę zapisać:
	w formacie 'zadanie-X.js' (X to numer zadania np. 'zadanie-1.js')
	w katalogu 'W:\numerKlasy\przedmiot\data-nazwaPlikuBezRozszerzenia\ImieNazwisko\'
		np. 'W:\1a\algorytmy\20260325-10-tabliceJednowymiarowe\JanKowalski\zadanie-1.js'
	Nie wrzucaj katalogu 'node_modules' ani innych zbędnych (zwłaszcza dużych)
		katalogów, tylko same pliki z rozwiązaniami
*/

/*	Zadanie praktyczne 1: Komponent Article
	Utwórz komponent Article, który przyjmuje props:
	- title (string, wymagane)
	- author (string, wymagane)
	- content (string, opcjonalne)

	Komponent powininen wyświetlić artykuł w formacie:
	<h2>Tytuł</h2>
	<p>Autor: imię autora</p>
	<p>Zawartość artykułu</p>

	Dodaj PropTypes do walidacji danych.
	Użycie: <Article title="React 18" author="Jan" content="React jest super!" />
/

/*	Zadanie praktyczne 2: Komponent Person Card
	Utwórz komponent PersonCard z destrukturyzacją props:
	- firstName (string)
	- lastName (string)
	- age (number)
	- occuption (string, domyślnie "Bez zawodu")

	Wyświetl dane w karcie osoby.
	Waliduj wszystkie props za pomocą PropTypes.

	Śledź: W Angularze byłaby to @Input property - tutaj to props!
/

/*	Zadanie praktyczne 3: Komponent Lista filmów
	Utwórz komponent MovieList, który przyjmuje:
	- movies (tablica obiektów z polami: id, title, year, rating)

	Komponent powinien:
	- Iterować przez tablicę filmów
	- Wyświetlić każdy film na liście
	- Walidować że movies to tablica obiektów z wymaganymi polami

	Przykład użycia:
	<MovieList movies={[
	  { id: 1, title: "Inception", year: 2010, rating: 8.8 },
	  { id: 2, title: "Avatar", year: 2009, rating: 8.5 }
	]} />
/

/*	Zadanie praktyczne 4: Komponent z callback props
	Utwórz komponent Counter z props:
	- initialValue (number, opcjonalne, domyślnie 0)
	- onIncrement (function, wymagane)
	- onDecrement (function, wymagane)

	Komponent wyświetli:
	- Bieżącą wartość licznika
	- Przycisk "Zwiększ" i "Zmniejsz" które wywołują callback'i

	Waliduj że onIncrement i onDecrement to funkcje (PropTypes.func)
/

/*	Zadanie praktyczne 5: Komponent Profile
	Utwórz komponent Profile, który łączy wszystkie koncepty:
	- Destrukturyzacja props
	- PropTypes walidacja
	- Domyślne wartości
	- Props z tablicami i obiektami

	Props powinny zawierać:
	- name (string)
	- bio (string)
	- skills (tablica stringów)
	- socialLinks (obiekt z polami: github, twitter, linkedin)

	Wyświetl wszystkie informacje w strukturalny sposób.
/
// #endregion

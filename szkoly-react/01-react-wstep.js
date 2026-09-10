// #region Informacje ogólne
// #region Cele lekcji:
/* 1. Poznanie koncepcji komponentów funkcyjnych w React
 * 2. Opanowanie JSX jako składni do definiowania UI
 * 3. Zrozumienie jak JSX konwertuje się na JavaScript
 * 4. Praktyczne wykorzystanie React w pierwszych projektach
 */
// #endregion

// #region Informacje o React:
/* Biblioteka JavaScript do budowania interfejsów użytkownika
 * Stworzona przez Facebooka, szeroko stosowana w branży
 * Skupia się na komponentach i deklaratywnym podejściu do UI
 * Używa wirtualnego DOM dla optymalizacji wydajności
 * Ma ogromny ekosystem narzędzi i bibliotek wspierających rozwój aplikacji
 * Jest open-source i ma dużą społeczność deweloperów
 * W przeciwieństwie do Angulara, React jest biblioteką, a nie frameworkiem, co daje większą elastyczność w wyborze narzędzi i architektury aplikacji
 * można tworzyć zarówno aplikacje webowe (React DOM), jak i mobilne (React Native) używając tej samej składni i koncepcji komponentów
 * Można używać do tworzenia frontendu w różnych językach, takich jak JavaScript, TypeScript, a nawet z wykorzystaniem JSX, który jest rozszerzeniem składni JavaScript i backendu (np. z Next.js) w pełnym stacku JavaScript
 * React promuje podejście "learn once, write anywhere", co oznacza, że umiejętności nabyte w React można zastosować w różnych kontekstach i platformach, nie tylko w przeglądarce
 * React ma bogaty ekosystem narzędzi do zarządzania stanem (Redux, MobX), routingu (React Router) i wielu innych aspektów rozwoju aplikacji, co pozwala na tworzenie skalowalnych i złożonych projektów
 */
// #endregion

// #region Struktura katalogów w projekcie React:
/* aplikacja/
 * ├── node_modules/          # Zainstalowane zależności
 * ├── public/                # Pliki statyczne (index.html, favicon, itp.)
 * ├── src/                   # Kod źródłowy aplikacji
 * │   ├── components/        # Komponenty React
 * │   ├── App.js             # Główny komponent aplikacji
 * │   ├── index.js           # Punkt wejścia do aplikacji
 * │   └── ...                # Inne pliki JS, CSS, itp.
 * ├── package.json           # Konfiguracja projektu i zależności
 * ├── README.md              # Dokumentacja projektu
 * └── ...                    # Inne pliki konfiguracyjne (np. .gitignore)
 */
// #endregion

// #region INSTALACJA
// #region instalacja i konfiguracja za pomocą VITE - nowocześniejsza i szybsza alternatywa dla Create React App:
/* szybsze od Create React App, nowoczesne narzędzie do budowania aplikacji webowych, które wykorzystuje natywne moduły ES i jest zoptymalizowane pod kątem wydajności.

// 1. zainstaluj pakiety globalne

// 2. Zainstaluj projekt 'szkoly-react' za pomocą VITE:
npm create vite@latest szkoly-react -- --template react
cd szkoly-react

// 3. zainstaluj pakiety lokalne

// 4. dodaj obsługę dysków sieciowych np. z:\
// w 'vite.config.js' przed 'plugins: [react()],' dodaj:
	server: { // obsluga dyskow sieciowych
		watch: {
			usePolling: true
		}
	},

// 5. uruchom React za pomocą Vite:
npm run dev
 */
// #endregion

// #region pakiety globalne:
/*	// Wtyczki/narzędzia odpowiedzialne za kompilowanie TypeScriptu, budowanie aplikacji,
	// tworzenie projektów Vite oraz tworzenie aplikacji React
	npm install -g typescript vite create-vite create-react-app
*/
// #endregion

// #region pakiety lokalne:
/*	przejdź do katalogu projektu przed instalacją lokalnych pakietów
	// podstawowe pakiety dla projektu React
	npm install react @vitejs/plugin-react prop-types react-hook-form react-jsx-runtime react-dom react-router-dom axios redux dotenv eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh

	// dodatkowe pakiety dla projektu React
	npm install framer-motion jest lodash prettier @types/react @types/react-dom

	// pakiety dla CREATE REACT APP (w katalogu projektu):
	npm install @babel/core @babel/preset-react
*/
// #endregion

// #region opis pakietów:
/*	najważniejsze wtyczki dla projektu React:
	react
		Biblioteka React oraz integracja Vite z Reactem
	@vitejs/plugin-react
		integracja Vite z Reactem
	prop-types
		Walidacja typów właściwości przekazywanych do komponentów React
	react-hook-form
		Zarządzanie formularzami w React
	react-jsx-runtime
		Środowisko uruchomieniowe dla automatycznie transformowanego JSX
	react-dom
		Renderowanie komponentów React w środowisku przeglądarki
	react-router-dom
		Routing i nawigacja w aplikacjach React
	axios
		Wykonywanie żądań HTTP
	redux
		Zarządzanie stanem aplikacji
	dotenv
		Wczytywanie zmiennych środowiskowych z plików konfiguracyjnych
	redis
		ObsługA magazynu danych Redis
	eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
		AnalizA i formatowanie kodu JavaScript oraz reguły dla Reacta i hooków
*/

/*	dodatkowe wtyczki dla projektu React:
	framer-motion
		Tworzenie animacji i przejść w interfejsie React
	jest
		Uruchamianie testów jednostkowych JavaScript
	lodash
		Pomocnicze funkcje do pracy z kolekcjami, obiektami i innymi danymi
	prettier
		Automatyczne formatowanie kodu
	@types/react @types/react-dom
		Definicje typów TypeScript dla Reacta i React DOM
*/

/*	dodatkowe wtyczki dla Create React App:
	@babel/core
		kompilowanie nowoczesnego JavaScriptu (ES6+) do wersji zgodnej z przeglądarkami
	@babel/preset-react
		ustawienia dla Create React App
*/
// #endregion

// #region PRZESTARZAŁA instalacja i konfiguracja za pomocą Create React App:
/* 1. Globalnie zainstaluj Create React App:
 *    npm install -g create-react-app
 *    npm install @babel/core @babel/preset-react
 *
 * 2. Utwórz nowy projekt:
 npm install -g create-react-app
 create-react-app szkola
 cd szkola
 *
 * 3. Uruchom serwer deweloperski:
 *    npm start
 *
 * 4. Otwórz http://localhost:3000 w przeglądarce
 */
// #endregion
// #endregion


// #region JSX - JavaScript XML
/* JSX to składnia rozszerzająca JavaScript, pozwalająca na pisanie kodu przypominającego HTML w plikach JavaScript.
 * JSX jest przekształcany przez Babel do wywołań React.createElement, co umożliwia tworzenie elementów React.
 * JSX pozwala na łatwe definiowanie struktury UI w sposób deklaratywny, co jest jednym z kluczowych aspektów Reacta.
 * W JSX można używać wyrażeń JavaScript, umieszczając je w nawiasach klamrowych {}.
 * JSX jest opcjonalny, ale jest szeroko stosowany w społeczności React ze względu na swoją czytelność i wygodę.
 * JSX pozwala na tworzenie komponentów, które mogą być wielokrotnie używane i łatwo komponowane, co jest podstawą budowania złożonych interfejsów użytkownika w React.
 * JSX umożliwia również stosowanie warunkowego renderowania, iteracji po kolekcjach i innych zaawansowanych technik, co czyni go potężnym narzędziem do tworzenia dynamicznych interfejsów użytkownika.
 * JSX jest często używany w połączeniu z narzędziami do stylowania, takimi jak CSS-in-JS, co pozwala na definiowanie stylów bezpośrednio w komponentach React, co zwiększa modularność i reużywalność kodu.
 */
// #endregion


// #region Przykłady
// #region PRZYKŁAD 1: Prosty komponent funkcyjny (różnica od Angular)
/*
 * Angular:
 * @Component({
 *   selector: 'app-greeting',
 *   template: `<h1>Hello {{name}}</h1>`
 * })
 * export class GreetingComponent {
 *   name = 'World';
 * }
 *
 * React:
 */
import React from "react";
function Greeting() {
	const name = 'World';
	const html = <h1>Hello {name}</h1>;
		// ten HTML to JSX, który zostanie przekształcony na JavaScript
		// wynik: '<h1>Hello World</h1>'
	return html;
}
// #endregion

// #region PRZYKŁAD 2: JSX - co to jest w rzeczywistości?
/* JSX jest przekształcany przez Babel:
 */
// JSX:
import React from "react";
const element = <div className="container"><p>Hello React!</p></div>;
// zawartość element: '<div className="container"><p>Hello React!</p></div>'

// Przekształcone na JavaScript:
// const element = React.createElement(
//   'div',
//   { className: 'container' },
//   React.createElement('p', null, 'Hello React!')
// );
// #endregion

// #region PRZYKŁAD 3: Komponenty z propsami (jak @Input w Angularze)
import React from "react";
function Welcome({ name, age }) {
	return (
		<div>
			<h2>Hello, {name}!</h2>
			<p>You are {age} years old.</p>
		</div>
	);
}

/* Użycie:
	<div>
		<Welcome name="John" age={30} />
		<Welcome name="Jane" age={25} />
	</div>
*/
// #endregion

// #region PRZYKŁAD 4: useState Hook (zastępuje component state w Angularze)
import React from "react";
function Counter() {
	const wartoscPoczatkowa = 0;
	const [count, setCount] = React.useState(wartoscPoczatkowa);

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
}
function Imie() {
	const [imie, setImie] = React.useState('jakaś wartość początkowa');

	return (
		<div>
			<p><input type="text" value={imie} onChange={e => setImie(e.target.value)} /></p>
			<button onClick={() => setImie('')}>Clear</button>
		</div>
	);
}
// #endregion

// #region PRZYKŁAD 5: Warunkowe renderowanie w JSX
import React from "react";
function LoginStatus({ isLoggedIn }) {
	return (
		<div>
			{isLoggedIn ? (
				<p>Welcome back!</p>
			) : (
				<p>Please log in.</p>
			)}
		</div>
	);
}
// #endregion
// #endregion

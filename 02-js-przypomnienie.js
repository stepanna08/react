// #region parametr resztowy '...argumenty'
// przykład
const tablica1 = [1, 4, 7];
const tablica2 = ['6', '3', '9'];
const polaczoneTablice = [...tablica1, ...tablica2];
console.log(polaczoneTablice);

// zadanie 1
// 1. Stwórz dwie nowe tablice
// 2. Wypełnij je losowymi danymi
// 3. Następnie połącz je za pomocą operatora resztowego

// zadanie 2
// stwórz funkcję, która przyjmie dowolną ilość elementów i zwróci sumę wszystkich przekazanych elementów.
// #endregion

// #region funkcja [].map
// przykład
polaczoneTablice.map((element, opcjonalny_currentIndex, opcjonalny_tablicaPolaczoneTablice) => {
	console.log(`Element: ${element}, aktualny indeks: ${opcjonalny_currentIndex}, tablica: ${opcjonalny_tablicaPolaczoneTablice}`);
	return element * 2
});

// zadanie 1
// stwórz nową tablicę, w której każdy element będzie zamieniony na string

// zadanie 2
// stwórz nową tablicę, w której każdy element będzie podniesiony do kwadratu
// #endregion

// #region funkcja [].filter
// przykład
const parzysteElementy = polaczoneTablice.filter((element, opcjonalny_currentIndex, opcjonalny_tablicaPolaczoneTablice) => {
	console.log(`Element: ${element}, aktualny indeks: ${opcjonalny_currentIndex}, tablica: ${opcjonalny_tablicaPolaczoneTablice}`);
	return element % 2 === 0;
});
console.log(parzysteElementy);

// zadanie 1
// stwórz nową tablicę, w której znajdą się tylko elementy, które są stringiem

// zadanie 2
// stwórz nową tablicę, w której znajdą się tylko elementy, które są liczbami
// #endregion

// #region funkcja [].reduce
// przykład
let wartoscPoczatkowa = 0;
const sumaElementow = polaczoneTablice.reduce((suma, element, opcjonalny_currentIndex, opcjonalny_tablicaPolaczoneTablice) => {
	console.log(`Suma: ${suma}, aktualny element: ${element}, aktualny indeks: ${opcjonalny_currentIndex}, tablica: ${opcjonalny_tablicaPolaczoneTablice}`);
	return suma + element;
}, wartoscPoczatkowa);
console.log(sumaElementow);

// zadanie 1
// stwórz funkcję, która przyjmie dowolną ilość elementów i zwróci ich sumę

// zadanie 2
// stwórz funkcję, która przyjmie dowolną ilość elementów i zwróci ich iloczyn
// #endregion

// #region kod asynchroniczny (promise i async/await)
// #region przykład Promise
let przykladPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('Dane zostały pobrane');
	}, 1000);
});
przykladPromise
	.then((dane) => {
		console.log(dane);
	})
	.catch((error) => {
		console.error(error);
	});
// #endregion

// #region przykład async/await
async function przykladAsyncAwait() {
	try {
		const dane = await przykladPromise;
		console.log(dane);
	} catch (error) {
		console.error(error);
	}
}
przykladAsyncAwait();
// #endregion

// #region przykład użycia wielu Promise
const promise1 = new Promise((resolve) => {
	setTimeout(() => resolve('Promise 1'), 1000)
});
const promise2 = new Promise((resolve) => {
	setTimeout(() => resolve('Promise 2'), 2000)
});
const promise3 = new Promise((resolve) => {
	setTimeout(() => resolve('Promise 3'), 3000)
});
Promise.all([promise1, promise2, promise3])
	.then((dane) => {
		console.log(dane);
	})
	.catch((error) => {
		console.error(error);
	});
// #endregion

// zadanie 1
// stwórz funkcję, która zwróci promise, który po 2 sekundach wyświetli prompt 'czy chcesz kontynuować?'
// jeśli użytkownik wybierze "tak", promise powinien zostać rozwiązany, w przeciwnym razie powinien zostać odrzucony

// zadanie 2
// stwórz funkcję asynchroniczną, która użyje await do pobrania danych z promise z zadania 1 i wyświetli je w konsoli
// #endregion

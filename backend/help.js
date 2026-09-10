{ // funkcje
	var jakasFunkcja = function(liczba1, liczba2) {
		return liczba1 + liczba2;
	};
	
	var dodajLiczby = (liczba1, liczba2) => liczba1 + liczba2;
	var dodajLiczby = (liczba1, liczba2) => {
		return liczba1 + liczba2;
	};
	
	var poteguj = liczba => liczba ** liczba;
}
{ // petle
	limit = 100;
	for (let i = 0; i <= limit; i++) {
		console.log('i=' + i);
	}
	while(warunek) {
		// jakis kod
	}
	do {
		// jakis kod
	} while(warunek)
}
{ // parametr resztowy
	var dodajLiczby = (...liczby) => {
		var wynik = 0;
		for (liczba of liczby) {
			wynik += liczba;
		}
	
		return wynik;
	}
	dodajLiczby(4);
	dodajLiczby(23, 56, 899, 34);
	dodajLiczby(23, 56, 899, 34, 45, 12, 45, 7, 3);
	
	var tablicaN = [...tabliac1, ...tablica2];
}
{ // tablice
	var tablica = [1234, 123, 657];
	// index:      0     1    2  
	tablica.push(234);
	console.log( tablica.join('; ') ); // 1234; 123; 657; 234
	console.log(tablica[1]); // 123
	var tablicaLength = tablica.length;
}
{ // klasy
	class User {
		constructor(name = '') {
			this.name = name;
		}
		setName(name) {
			this.name = name;
		}
		getName() {
			return this.name;
		}
	}
	user = new User('Ala');
	console.log( user.getName() ); //  Ala
}
{ // obiekty
	var user = {
		name: 'Ala',	
		surname: 'Makota',
		age: 25
	};
	user.name = 'Ola';
	console.log( user.name ); //  Ola
}
{ // enum
	const PRAWA_PLIKOW = {
		READ: 1,	
		WRITE, // 2	
		EXECUTE: 4,
	};
}
{ // moduły
	// user.js
	export default class User { /* ... */ };
	const USER_TYPE = {
		ADMIN: 1,	
		EMPLOYEE: 2,	
		CUSTOMER: 3,
	};
	const COMPANY_CITY = 'Piaseczno';
	const COMPANY_STREET = 'Szkolna 10';
	export { USER_TYPE, COMPANY_CITY, COMPANY_STREET };

	// app.js
	import User from './user.js';
	import { USER_TYPE } from './user.js';
	var user = new User('Ala', USER_TYPE.CUSTOMER, 'Ala', 'Makota');
	console.log( user.getFullName() ); //  Ala Makota
}

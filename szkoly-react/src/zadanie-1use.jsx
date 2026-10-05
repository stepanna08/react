//jsx (
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

import { useState } from 'react';

export function TrybKoloru(){
        const [tryb, setKolor] = useState(false);

    function ZmienKolor(){
        setKolor(!tryb);
    }

    return (<div>
        <button onClick={ZmienKolor}>Zmień kolor</button>
        <p>Tryb ciemny {tryb ? "wlaczony" : "wylaczony"}</p>
        </div>);
}
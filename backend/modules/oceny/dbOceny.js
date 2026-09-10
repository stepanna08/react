import { db, logDbError } from '../db/db.js';

class DbOceny {
	async getAll(id_szkoly) {
		return new Promise((resolve, reject) => {
			if (!id_szkoly) {
				return reject(logDbError('Brak wybranej szkoły', 'DbOceny.getAll'));
			}

			db.select(`SELECT oceny.*, 
				uczniowie.imie as imie_ucznia,
				uczniowie.nazwisko as nazwisko_ucznia,
				przedmioty.nazwa as nazwa_przedmiotu,
				nauczyciele.imie as imie_nauczyciela,
				nauczyciele.nazwisko as nazwisko_nauczyciela
			FROM oceny
			LEFT JOIN uczniowie ON oceny.id_ucznia = uczniowie.id
			LEFT JOIN przedmioty ON oceny.id_przedmiotu = przedmioty.id
			LEFT JOIN nauczyciele ON oceny.id_nauczyciela = nauczyciele.id
			WHERE oceny.id_szkoly = ?
			ORDER BY oceny.data DESC`, [id_szkoly], 'DbOceny.getAll')
			.then(results => resolve(results))
			.catch(error => reject(error));
		});
	}
	async getByIdUcznia(id_szkoly, id_ucznia) {
		return new Promise((resolve, reject) => {
			if (!id_szkoly) {
				return reject(logDbError('Brak wybranej szkoły', 'DbOceny.getByIdUcznia'));
			}

			if (!id_ucznia) {
				return reject(logDbError('Brak wybranego ucznia', 'DbOceny.getByIdUcznia'));
			}

			db.select(`SELECT oceny.*, 
				uczniowie.imie as imie_ucznia,
				uczniowie.nazwisko as nazwisko_ucznia,
				przedmioty.nazwa as nazwa_przedmiotu,
				nauczyciele.imie as imie_nauczyciela,
				nauczyciele.nazwisko as nazwisko_nauczyciela
			FROM oceny
			LEFT JOIN uczniowie ON oceny.id_ucznia = uczniowie.id
			LEFT JOIN przedmioty ON oceny.id_przedmiotu = przedmioty.id
			LEFT JOIN nauczyciele ON oceny.id_nauczyciela = nauczyciele.id
			WHERE oceny.id_ucznia = ? AND oceny.id_szkoly = ?
			ORDER BY oceny.data DESC`, [id_ucznia, id_szkoly], 'DbOceny.getByIdUcznia')
			.then(results => resolve(results))
			.catch(error => reject(error));
		});
	}
	async getById(id) {
		return db.select(`SELECT oceny.*, 
			uczniowie.imie as imie_ucznia,
			uczniowie.nazwisko as nazwisko_ucznia,
			przedmioty.nazwa as nazwa_przedmiotu,
			nauczyciele.imie as imie_nauczyciela,
			nauczyciele.nazwisko as nazwisko_nauczyciela
		FROM oceny
		LEFT JOIN uczniowie ON oceny.id_ucznia = uczniowie.id
		LEFT JOIN przedmioty ON oceny.id_przedmiotu = przedmioty.id
		LEFT JOIN nauczyciele ON oceny.id_nauczyciela = nauczyciele.id
		WHERE oceny.id = ?`, [id], 'DbOceny.getById');
	}
	async add(ocena) {
		return db.insert('INSERT INTO oceny SET ?', ocena, 'DbOceny.add');
	}
	async update(id, ocena) {
		return db.update('UPDATE oceny SET ? WHERE id = ?', [ocena, id], 'DbOceny.update');
	}
	async delete(id) {
		return db.delete('DELETE FROM oceny WHERE id = ?', [id], 'DbOceny.delete');
	}
}

const dbOceny = new DbOceny();
export default dbOceny;

/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_szkoly INT,
	id_ucznia INT,
	id_przedmiotu INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE uczniowie (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */
/* CREATE TABLE przedmioty (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL
); */
/* CREATE TABLE nauczyciele (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */

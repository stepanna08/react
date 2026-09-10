import { db, logDbError } from '../db/db.js';

class DbKlasy {
	async getAll(id_szkoly) {
		return new Promise((resolve, reject) => {
			if (!id_szkoly) {
				return reject(logDbError('Brak wybranej szkoły', 'DbKlasy.getAll'));
			}
			db.select('SELECT * FROM klasy WHERE id_szkoly=?', [id_szkoly], 'DbKlasy.getAll').then(results => {
				resolve(results);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
	async getById(id) {
		return db.select(`SELECT klasy.*, imie, nazwisko, profile_klas.nazwa as nazwa_profilu_klasy
			FROM klasy
			LEFT JOIN nauczyciele ON klasy.id_wychowawcy = nauczyciele.id
			LEFT JOIN profile_klas ON klasy.id_profilu_klasy = profile_klas.id
			WHERE klasy.id = ?`, [id], 'DbKlasy.getById');
	}
	async add(dane) {
		return db.insert('INSERT INTO klasy SET ?', dane, 'DbKlasy.add');
	}
	async update(id, dane) {
		return db.update('UPDATE klasy SET ? WHERE id = ?', [dane, id], 'DbKlasy.update');
	}
	async delete(id) {
		return db.delete('DELETE FROM klasy WHERE id = ?', [id], 'DbKlasy.delete');
	}
	async getSelect(id_szkoly, selectedId, attr = 'name="id_klasy" id="id_klasy"') {
		return new Promise((resolve, reject) => {
			this.getAll(id_szkoly).then(results => {
				const options = results.map(klasa =>
					`<option value="${klasa.id}" ${selectedId == klasa.id ? 'selected' : ''}>${klasa.nazwa}</option>`
				).join('');

				resolve(`<select ${attr} size="6" class="form-select"><option value="">-- Wybierz klasę --</option>${options}</select>`);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
	async getUczniow(id_klasy) {
		return new Promise((resolve, reject) => {
			if (!id_klasy) {
				return reject(logDbError('Brak wybranej klasy', 'DbKlasy.getUczniow'));
			}
			db.select('SELECT id_ucznia FROM klasy_uczniowie WHERE id_klasy=?', [id_klasy], 'DbKlasy.getUczniow').then(results => {
				resolve(results);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
	async addUcznia(dane) {
		return db.insert('INSERT INTO klasy_uczniowie SET ?', dane, 'DbKlasy.addUcznia');
	}
	async deleteUcznia(dane) {
		return db.delete('DELETE FROM klasy_uczniowie WHERE id_klasy = ? AND id_ucznia = ?', [dane.id_klasy, dane.id_ucznia], 'DbKlasy.deleteUcznia');
	}
}

const dbKlasy = new DbKlasy();
export default dbKlasy;

/* CREATE TABLE klasy ( -- id_szkoly, id_profilu_klasy, id_wychowawcy
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(20) NOT NULL,
	id_szkoly INT,
	id_profilu_klasy INT,
	id_wychowawcy INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_profilu_klasy) REFERENCES profile_klas(id),
	FOREIGN KEY (id_wychowawcy) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE szkoly ( -- id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(100) NOT NULL,
	adres VARCHAR(200),
	telefon VARCHAR(20),
	email VARCHAR(100),
	www VARCHAR(100),
	id_dyrektora INT DEFAULT NULL,
	FOREIGN KEY (id_dyrektora) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE profile_klas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */
/* CREATE TABLE nauczyciele (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */
/* CREATE TABLE klasy_uczniowie ( -- id_klasy, id_ucznia
id_klasy INT,
id_ucznia INT,
PRIMARY KEY (id_klasy, id_ucznia),
FOREIGN KEY (id_klasy) REFERENCES klasy(id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id) ON DELETE RESTRICT ON UPDATE CASCADE
); */

import { db, logDbError } from '../db/db.js';

class DbNauczyciele {
	async getAll(id_szkoly = null) {
		console.log('\tDbNauczyciele.getAll', id_szkoly);
		if (id_szkoly) {
			var query = 'SELECT * FROM nauczyciele WHERE id IN (SELECT id_nauczyciela FROM szkoly_nauczyciele WHERE id_szkoly = ?)';
		} else {
			var query = 'SELECT * FROM nauczyciele';
		}
		return db.select(query, [id_szkoly], 'DbNauczyciele.getAll');
	}
	async getById(id) {
		return db.select(`SELECT * FROM nauczyciele WHERE id = ?`, [id], 'DbNauczyciele.getById');
	}
	async add(nauczyciel) {
		return db.insert('INSERT INTO nauczyciele SET ?', nauczyciel, 'DbNauczyciele.add');
	}
	async update(id, nauczyciel) {
		return db.update('UPDATE nauczyciele SET ? WHERE id = ?', [nauczyciel, id], 'DbNauczyciele.update');
	}
	async delete(id) {
		return db.delete('DELETE FROM nauczyciele WHERE id = ?', [id], 'DbNauczyciele.delete');
	}
	async getSelect(id_szkoly = null, selectedId = null, attr = 'name="id_nauczyciela" id="id_nauczyciela"') {
		return new Promise((resolve, reject) => {
			this.getAll(id_szkoly)
				.then(results => {
					const options = results.map(nauczyciel =>
						`<option value="${nauczyciel.id}" ${selectedId == nauczyciel.id ? 'selected' : ''}>${nauczyciel.imie} ${nauczyciel.nazwisko}</option>`
					).join('');

					resolve(`<select ${attr} size="6" class="form-select"><option value="">-- Wybierz nauczyciela --</option>${options}</select>`);
				})
				.catch(error => {
					
					reject(error);
				});
		});
	}
	async addToSzkola(dane) {
		// console.log('addToSzkola', dane);
		return db.insert('INSERT INTO szkoly_nauczyciele SET ?', dane, 'DbNauczyciele.addToSzkola');
	}
	async deleteFromSzkola(dane) {
		return db.delete('DELETE FROM szkoly_nauczyciele WHERE id_szkoly = ? AND id_nauczyciela = ?', [dane.id_szkoly, dane.id_nauczyciela], 'DbNauczyciele.deleteFromSzkola');
	}
}

const dbNauczyciele = new DbNauczyciele();
export default dbNauczyciele;

/* CREATE TABLE nauczyciele (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */
/* CREATE TABLE szkoly ( -- id_szkoly, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(100) NOT NULL,
	adres VARCHAR(200),
	telefon VARCHAR(20),
	email VARCHAR(100),
	www VARCHAR(100),
	id_dyrektora INT DEFAULT NULL,
	FOREIGN KEY (id_dyrektora) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE szkoly_nauczyciele ( -- id_szkoly, id_nauczyciela
	id_szkoly INT,
	id_nauczyciela INT,
	PRIMARY KEY (id_szkoly, id_nauczyciela),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	godzina_lekcyjna INT,
	data DATETIME,
	id_szkoly INT,
	id_klasy INT,
	id_przedmiotu INT,
	id_sali INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_klasy) REFERENCES klasy(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_sali) REFERENCES sale(id),
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_ucznia INT,
	id_przedmiotu INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id)
); */

import { db, logDbError } from '../db/db.js';

class DbUczniowie {
	async getAll(id_szkoly = null) {
		// console.log('DbUczniowie.getAll', id_szkoly);
		if (id_szkoly) {
			var query = 'SELECT * FROM uczniowie WHERE id IN (SELECT id_ucznia FROM szkoly_uczniowie WHERE id_szkoly = ?)';
		} else {
			var query = 'SELECT * FROM uczniowie';
		}
		return db.select(query, [id_szkoly], 'DbUczniowie.getAll');
	}
	async getById(id) {
		return db.select(`SELECT * FROM uczniowie WHERE id = ?`, [id], 'DbUczniowie.getById');
	}
	async add(uczen) {
		return db.insert('INSERT INTO uczniowie SET ?', uczen, 'DbUczniowie.add');
	}
	async update(id, uczen) {
		return db.update('UPDATE uczniowie SET ? WHERE id = ?', [uczen, id], 'DbUczniowie.update');
	}
	async delete(id) {
		return db.delete('DELETE FROM uczniowie WHERE id = ?', [id], 'DbUczniowie.delete');
	}
	async getSelect(id_szkoly = null, selectedId = null, attr = 'name="id_ucznia" id="id_ucznia"') {
		return new Promise((resolve, reject) => {
			this.getAll(id_szkoly)
				.then(results => {
					const options = results.map(uczen =>
						`<option value="${uczen.id}" ${selectedId == uczen.id ? 'selected' : ''}>${uczen.imie} ${uczen.nazwisko}</option>`
					).join('');

					resolve(`<select ${attr} size="6" class="form-select"><option value="">-- Wybierz ucznia --</option>${options}</select>`);
				})
				.catch(error => {
					
					reject(error);
				});
		});
	}
	async addToSzkola(dane) {
		// console.log('addToSzkola', dane);
		return db.insert('INSERT INTO szkoly_uczniowie SET ?', dane, 'DbUczniowie.addToSzkola');
	}
	async deleteFromSzkola(dane) {
		return db.delete('DELETE FROM szkoly_uczniowie WHERE id_szkoly = ? AND id_ucznia = ?', [dane.id_szkoly, dane.id_ucznia], 'DbUczniowie.deleteFromSzkola');
	}
}

const dbUczniowie = new DbUczniowie();
export default dbUczniowie;

/* CREATE TABLE uczniowie (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */
/* CREATE TABLE szkoly_uczniowie ( -- id_szkoly, id_ucznia
	id_szkoly INT,
	id_ucznia INT,
	PRIMARY KEY (id_szkoly, id_ucznia),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
); */
/* CREATE TABLE klasy_uczniowie ( -- id_klasy, id_ucznia
	id_klasy INT,
	id_ucznia INT,
	PRIMARY KEY (id_klasy, id_ucznia),
	FOREIGN KEY (id_klasy) REFERENCES klasy(id),	
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
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

import { db, logDbError } from '../db/db.js';

class DbPrzedmioty {
	async getAll(id_szkoly = null) {
		// console.log('DbPrzedmioty.getAll', id_szkoly);
		if (id_szkoly) {
			var query = 'SELECT * FROM przedmioty WHERE id IN (SELECT id_przedmiotu FROM szkoly_przedmioty WHERE id_szkoly = ?)';
		} else {
			var query = 'SELECT * FROM przedmioty';
		}
		return db.select(query, [id_szkoly], 'DbPrzedmioty.getAll');
	}
	async getById(id) {
		return db.select(`SELECT * FROM przedmioty WHERE id = ?`, [id], 'DbPrzedmioty.getById');
	}
	async add(dane) {
		return db.insert('INSERT INTO przedmioty SET ?', dane, 'DbPrzedmioty.add');
	}
	async update(id, dane) {
		return db.update('UPDATE przedmioty SET ? WHERE id = ?', [dane, id], 'DbPrzedmioty.update');
	}
	async delete(id) {
		console.log('DbPrzedmioty.delete', id);
		return db.delete('DELETE FROM przedmioty WHERE id = ?', [id], 'DbPrzedmioty.delete');
	}
	async getSelect(id_szkoly = null, selectedId = null, attr = 'name="id_przedmiotu" id="id_przedmiotu"') {
		return new Promise((resolve, reject) => {
			this.getAll(id_szkoly)
				.then(results => {
					const options = results.map(przedmiot =>
						`<option value="${przedmiot.id}" ${selectedId == przedmiot.id ? 'selected' : ''}>${przedmiot.nazwa}</option>`
					).join('');

					resolve(`<select ${attr} size="6" class="form-select"><option value="">-- Wybierz przedmiot --</option>${options}</select>`);
				})
				.catch(error => {
					reject(error);
				});
		});
	}
	async addToSzkola(dane) {
		// console.log('addToSzkola', dane);
		return db.insert('INSERT INTO szkoly_przedmioty SET ?', dane, 'DbPrzedmioty.addToSzkola');
	}
	async deleteFromSzkola(dane) {
		return db.delete('DELETE FROM szkoly_przedmioty WHERE id_szkoly = ? AND id_przedmiotu = ?', [dane.id_szkoly, dane.id_przedmiotu], 'DbPrzedmioty.deleteFromSzkola');
	}
}

const dbPrzedmioty = new DbPrzedmioty();
export default dbPrzedmioty;

/* CREATE TABLE przedmioty (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL
); */
/* CREATE TABLE szkoly_przedmioty ( -- id_szkoly, id_przedmiotu
	id_szkoly INT,
	id_przedmiotu INT,
	PRIMARY KEY (id_szkoly, id_przedmiotu),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id)
); */
/* CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_przedmiotu
	id INT AUTO_INCREMENT PRIMARY KEY,
	godzina_lekcyjna INT,
	data DATETIME,
	id_szkoly INT,
	id_klasy INT,
	id_przedmiotu INT,
	id_sali INT,
	id_przedmiotu INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_klasy) REFERENCES klasy(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_sali) REFERENCES sale(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_przedmiotu
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_ucznia INT,
	id_przedmiotu INT,
	id_przedmiotu INT,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES nauczyciele(id)
); */

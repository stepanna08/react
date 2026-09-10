import { db, logDbError } from '../db/db.js';

class DbSzkoly {
	async getAll() {
		return db.select('SELECT id, nazwa FROM szkoly', null, 'DbSzkoly.getAll');
	}
	async getById(id) {
		return db.select(`SELECT szkoly.*, nauczyciele.imie, nauczyciele.nazwisko
			FROM szkoly
			LEFT JOIN nauczyciele ON szkoly.id_dyrektora = nauczyciele.id
			WHERE szkoly.id = ?`, [id], 'DbSzkoly.getById');
	}
	async add(dane) {
		return db.insert('INSERT INTO szkoly SET ?', dane, 'DbSzkoly.add');
	}
	async update(id, dane) {
		return db.update('UPDATE szkoly SET ? WHERE id = ?', [dane, id], 'DbSzkoly.update');
	}
	async delete(id) {
		return db.delete('DELETE FROM szkoly WHERE id = ?', [id], 'DbSzkoly.delete');
	}
	async getSelect(selectedId, attr = '') {
		return new Promise((resolve, reject) => {
			this.getAll().then(results => {
				// console.log('getSelect.getAll results:', results);
				const options = results.map(szkola =>
					`<option value="${szkola.id}" ${selectedId == szkola.id ? 'selected' : ''}>${szkola.nazwa}</option>`
				).join('');

				resolve(`<select ${attr} class="form-select">
					<option value="">Wybierz szkołę</option>
					${options}
				</select>`);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}

const dbSzkoly = new DbSzkoly();
export default dbSzkoly;

/* CREATE TABLE szkoly ( -- id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(100) NOT NULL,
	adres VARCHAR(200),
	telefon VARCHAR(20),
	email VARCHAR(100),
	www VARCHAR(100),
	id_dyrektora INT DEFAULT NULL,
	FOREIGN KEY (id_dyrektora) REFERENCES nauczyciele(id)
);
/* CREATE TABLE szkoly_nauczyciele ( -- id_szkoly, id_nauczyciela
	id_szkoly INT,
	id_nauczyciela INT,
	PRIMARY KEY (id_szkoly, id_nauczyciela),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE szkoly_przedmioty ( -- id_szkoly, id_przedmiotu
	id_szkoly INT,
	id_przedmiotu INT,
	PRIMARY KEY (id_szkoly, id_przedmiotu),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id)
); */
/* CREATE TABLE szkoly_uczniowie ( -- id_szkoly, id_ucznia
	id_szkoly INT,
	id_ucznia INT,
	PRIMARY KEY (id_szkoly, id_ucznia),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
); */
/* CREATE TABLE klasy ( -- id_szkoly, id_profilu_klasy, id_wychowawcy
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(20) NOT NULL,
	ilosc_uczniow INT DEFAULT 0,
	id_szkoly INT,
	id_profilu_klasy INT,
	id_wychowawcy INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_profilu_klasy) REFERENCES profile_klas(id),
	FOREIGN KEY (id_wychowawcy) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE sale ( -- id_szkoly, id_typu_sali, id_opiekuna
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL,
	ilosc_miejsc INT,
	id_szkoly INT,
	id_typu_sali INT,
	id_opiekuna INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_typu_sali) REFERENCES typy_sal(id),
	FOREIGN KEY (id_opiekuna) REFERENCES nauczyciele(id)
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

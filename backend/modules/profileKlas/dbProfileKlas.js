import { db, logDbError } from '../db/db.js';

class DbProfileKlas {
	async getAll() {
		return db.select('SELECT * FROM profile_klas', [], 'DbProfileKlas.getAll');
	}
	async getById(id) {
		return db.select('SELECT * FROM profile_klas WHERE id = ?', [id], 'DbProfileKlas.getById');
	}
	async add(dane) {
		return db.insert('INSERT INTO profile_klas SET ?', dane, 'DbProfileKlas.add');
	}
	async update(id, dane) {
		return db.update('UPDATE profile_klas SET ? WHERE id = ?', [dane, id], 'DbProfileKlas.update');
	}
	async delete(id) {
		return db.delete('DELETE FROM profile_klas WHERE id = ?', [id], 'DbProfileKlas.delete');
	}
	async getSelect(selectedId = null, attr = 'name="id_profilu_klasy" id="id_profilu_klasy"') {
		return new Promise((resolve, reject) => {
			this.getAll()
				.then(results => {
					const options = results.map(profil_klasy =>
						`<option value="${profil_klasy.id}" ${selectedId == profil_klasy.id ? 'selected' : ''}>${profil_klasy.nazwa}</option>`
					).join('');
					resolve(`<select ${attr} size="6" class="form-select"><option value="">-- Wybierz profil klasy --</option>${options}</select>`);
				})
				.catch(error => {
					console.log('Error in DbProfileKlas.getSelect:', logDbError(error));
					reject(error);
				});
		});
	}
}

const dbProfileKlas = new DbProfileKlas();
export default dbProfileKlas;

/* CREATE TABLE profile_klas (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */
/* CREATE TABLE klasy ( -- id_szkoly, id_profilu_klasy, id_wychowawcy
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nazwa VARCHAR(20) NOT NULL,
	id_szkoly INT,
	id_profilu_klasy INT,
	id_wychowawcy INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_profilu_klasy) REFERENCES profile_klas(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_wychowawcy) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
); */

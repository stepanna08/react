import { db, logDbError } from '../db/db.js';

class DbTypySal {
	async getAll() {
		return db.select('SELECT * FROM typy_sal', [], 'DbTypySal.getAll');
	}
	async getById(id) {
		return db.select('SELECT * FROM typy_sal WHERE id = ?', [id], 'DbTypySal.getById');
	}
	async add(dane) {
		return db.insert('INSERT INTO typy_sal SET ?', dane, 'DbTypySal.add');
	}
	async update(id, dane) {
		return db.update('UPDATE typy_sal SET ? WHERE id = ?', [dane, id], 'DbTypySal.update');
	}
	async delete(id) {
		return db.delete('DELETE FROM typy_sal WHERE id = ?', [id], 'DbTypySal.delete');
	}
	async getSelect(selectedId = null, attr = 'name="id_typu_sali" id="id_typu_sali"') {
		return new Promise((resolve, reject) => {
			this.getAll().then(results => {
				const options = results.map(typ_sali =>
					`<option value="${typ_sali.id}" ${selectedId == typ_sali.id ? 'selected' : ''}>${typ_sali.nazwa}</option>`
				).join('');
				resolve(`<select ${attr} size="6" class="form-select"><option value="">-- Wybierz typ sali --</option>${options}</select>`);
			})
			.catch(error => {
				console.log('Error in DbTypySal.getSelect:', logDbError(error));
				reject(error);
			});
		});
	}
}

const dbTypySal = new DbTypySal();
export default dbTypySal;

/* CREATE TABLE typy_sal (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */
/* CREATE TABLE sale ( -- id_szkoly, id_typu_sali, id_opiekuna
id INTEGER PRIMARY KEY AUTOINCREMENT,
nazwa VARCHAR(50) NOT NULL,
ilosc_miejsc INT,
id_szkoly INT,
id_typu_sali INT,
id_opiekuna INT,
FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (id_typu_sali) REFERENCES typy_sal(id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (id_opiekuna) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
); */

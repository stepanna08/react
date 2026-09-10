import { db, logDbError, fixSelectedIds } from '../db/db.js';

class DbTypyTablic {
	async getAll() {
		return db.select('SELECT * FROM typy_tablic', [], 'DbTypyTablic.getAll');
	}
	async getById(id) {
		return db.select('SELECT * FROM typy_tablic WHERE id = ?', [id], 'DbTypyTablic.getById');
	}
	async getByIdSali(id) {
		return db.select(`SELECT * FROM typy_tablic WHERE id IN (SELECT id_typu_tablicy FROM sale_tablice WHERE id_sali = ?)`, [id], 'DbTypyTablic.getByIdSali');
	}
	async add(dane) {
		return db.insert('INSERT INTO typy_tablic SET ?', dane, 'DbTypyTablic.add');
	}
	async update(id, dane) {
		return db.update('UPDATE typy_tablic SET ? WHERE id = ?', [dane, id], 'DbTypyTablic.update');
	}
	async delete(id) {
		return db.delete('DELETE FROM typy_tablic WHERE id = ?', [id], 'DbTypyTablic.delete');
	}
	async getSelect(selectedIds = [], attr = 'name="id_typu_tablicy" id="id_typu_tablicy"') {
		return new Promise((resolve, reject) => {
			this.getAll()
				.then(results => {
					selectedIds = fixSelectedIds(selectedIds);
					const options = results.map(typ_tablicy =>
						`<option value="${typ_tablicy.id}" ${selectedIds.indexOf(typ_tablicy.id) !== -1 ? 'selected' : 'notSelected="' + selectedIds.indexOf(typ_tablicy.id) + '"' }>${typ_tablicy.nazwa}</option>`
					).join('');
					resolve(`<select ${attr} size="6" class="form-select">${options}</select>`); // <option value="">-- Wybierz typ tablicy --</option>
				})
				.catch(error => {
					console.log('Error in DbTypyTablic.getSelect:', logDbError(error));
					reject(error);
				});
		});
	}
	async addToSala(idSali, typyTablic) {
		console.log('\t[DbTypyTablic.addToSala]\t', idSali, typyTablic);
		if (Array.isArray(typyTablic) && typyTablic.length) {
			// let data = typyTablic.map(idTypu => `(${idSali}, ${idTypu})`).join(', '); /*
			let data = typyTablic.map(idTypu => { return {'id_sali': idSali, 'id_typu_tablicy': idTypu} }); /* */
			console.log('\t\tdata:', data);
			return db.insert(`INSERT IGNORE INTO sale_tablice SET ?`, data, 'DbTypyTablic.addToSala');
		} else {
			return Promise.resolve();
		}
	}
	async getFromSala(idSali) {
		console.log('\t[DbTypyTablic.getFromSala]\t', idSali);
		return db.select(`SELECT * FROM typy_tablic WHERE id IN (SELECT id_typu_tablicy FROM sale_tablice WHERE id_sali = ?)`, [idSali], 'DbTypyTablic.getFromSala');
	}
	async deleteFromSala(id_sali) {
		if (id_sali) {
			return db.delete('DELETE FROM sale_tablice WHERE id_sali = ?', [id_sali], 'DbTypyTablic.deleteFromSala');
		} else {
			return Promise.resolve();
		}
	}
}

const dbTypyTablic = new DbTypyTablic();
export default dbTypyTablic;

/* CREATE TABLE typy_tablic (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */
/* CREATE TABLE sale_tablice ( -- id_sali, id_typu_tablicy
	id_sali INT,
	id_typu_tablicy INT,
	PRIMARY KEY (id_sali, id_typu_tablicy),
	FOREIGN KEY (id_sali) REFERENCES sale(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_typu_tablicy) REFERENCES typy_tablic(id) ON DELETE RESTRICT ON UPDATE CASCADE
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

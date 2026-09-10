import { db, logDbError } from '../db/db.js';
import dbTypyTablic from '../typyTablic/dbTypyTablic.js';

class DbSale {
	async getAll(id_szkoly) {
		return new Promise((resolve, reject) => {
			if (!id_szkoly) {
				return reject(logDbError('Brak wybranej szkoły', 'DbSale.getAll'));
			}

			db.select('SELECT * FROM sale WHERE id_szkoly = ?', [id_szkoly], 'DbSale.getAll').then(results => {
				resolve(results);
			})
			.catch(error => reject(error));
		});
	}
	async getById(idSali) {
		return Promise.all([
			db.select(`SELECT sale.*, imie, nazwisko, typy_sal.nazwa as typ_sali FROM sale
				LEFT JOIN nauczyciele ON sale.id_opiekuna = nauczyciele.id
				LEFT JOIN typy_sal ON sale.id_typu_sali = typy_sal.id
				WHERE sale.id = ?`, [idSali], 'DbSale.getByIdSali'),
			dbTypyTablic.getByIdSali(idSali),
		]).then(([sala, typy_tablic]) => {
			sala[0].typy_tablic = typy_tablic;
			return sala;
		}).catch(error => {
			throw error;
		});
	}
	async add(dane) {
		return new Promise((resolve, reject) => {
			var typyTablic = dane.id_typu_tablicy;
			if (!Array.isArray(typyTablic)) {
				typyTablic = [typyTablic];
			}
			delete dane.id_typu_tablicy;
			// console.log('add dane after:', dane, ' typyTablic:', typyTablic);
			db.insert('INSERT INTO sale SET ?', dane, 'DbSale.add')
			.then(result => {
				// console.log('result:', result);
				if (typyTablic && typyTablic.length) {
					this.addTypyTablic(result.lastInsertRowid, typyTablic)
						.then(() => resolve(result.lastInsertRowid))
						.catch(error => reject(error));
				} else {
					resolve(result);
				}
			})
			.catch(error => {
				reject(error);
			});
		});
	}
	async addTypyTablic(idSali, typyTablic) {
		// console.log('addTypyTablic idSali:', idSali, ' typyTablic:', typyTablic);
		return new Promise((resolve, reject) => {
			dbTypyTablic.deleteFromSala(idSali)
			.then(() => {
				resolve(dbTypyTablic.addToSala(idSali, typyTablic));
				// if (Array.isArray(typyTablic) && typyTablic.length) {
				// 	let data = typyTablic.map(idTypu => `(${idSali}, ${idTypu})`).join(', ');
				// 	resolve(db.insert(`INSERT IGNORE INTO sale_tablice (id_sali, id_typu_tablicy) VALUES ${data}`, [], 'DbSale.addTypyTablic'));
				// } else {
				// 	resolve();
				// }
			})
			.catch(error => reject(error));
		});
	}
	async getTypyTablic(idSali, typyTablic) {
		// console.log('addTypyTablic idSali:', idSali, ' typyTablic:', typyTablic);
		return dbTypyTablic.getFromSala(idSali, typyTablic);
	}
	async update(id, dane) {
		// console.log('update id:', id, ' dane:', dane);
		/* dane = {
			nazwa: '101',
			ilosc_miejsc: '15',
			id_szkoly: 1,
			id_typu_sali: '1',
			id_opiekuna: '1',
			id_typu_tablicy: [ '1', '3' ]
		} */
		return new Promise((resolve, reject) => {
			var typyTablic = dane.id_typu_tablicy;
			delete dane.id_typu_tablicy;
			if (!Array.isArray(typyTablic)) {
				typyTablic = [typyTablic];
			}

			db.update('UPDATE sale SET ? WHERE id = ?', [dane, id], 'DbSale.update')
			.then(results => {
				dbTypyTablic.deleteFromSala(id)
				.then(() => {
					if (typyTablic && Array.isArray(typyTablic) && typyTablic.length) {
						this.addTypyTablic(id, typyTablic)
							.then(() => resolve(results))
							.catch(error => reject(error));
					} else {
						resolve(results);
					}
				})
				.catch(error => reject(error));
			})
			.catch(error => reject(error));
		});
	}
	async delete(id) {
		return new Promise((resolve, reject) => {
			dbTypyTablic.deleteFromSala(id)
			.then(() => {
				db.delete('DELETE FROM sale WHERE id = ?', [id], 'DbSale.delete')
					.then(() => resolve())
					.catch(error => reject(error));
			})
			.catch(error => reject(error));
		});
	}
	async getSelect(id_szkoly = null, selectedId = null, attr = 'name="id_sali" id="id_sali"') {
		return new Promise((resolve, reject) => {
			this.getAll(id_szkoly).then(results => {
				const options = results.map(sala =>
					`<option value="${sala.id}" ${selectedId == sala.id ? 'selected' : ''}>${sala.nazwa}</option>`
				).join('');

				resolve(`<select ${attr} size="6" class="form-select"><option value="">-- Wybierz salę --</option>${options}</select>`);
			})
			.catch(error => {
				console.log('Error in DbSale.getSelect:', logDbError(error));
				reject(error);
			});
		});
	}
}

const dbSale = new DbSale();
export default dbSale;

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
/* CREATE TABLE typy_sal (
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
/* CREATE TABLE sale_tablice ( -- id_sali, id_typu_tablicy
	id_sali INT,
	id_typu_tablicy INT,
	PRIMARY KEY (id_sali, id_typu_tablicy),
	FOREIGN KEY (id_sali) REFERENCES sale(id),	
	FOREIGN KEY (id_typu_tablicy) REFERENCES typy_tablic(id)
); */
/* CREATE TABLE typy_tablic (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
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

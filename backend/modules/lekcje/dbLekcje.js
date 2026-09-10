import { db, logDbError } from '../db/db.js';

class DbLekcje {
	async getAll(id_szkoly) {
		return new Promise((resolve, reject) => {
			if (!id_szkoly) {
				return reject(logDbError('Brak wybranej szkoły', 'DbLekcje.getAll'));
			}
			db.select(`SELECT lekcje.*, klasy.nazwa as nazwa_klasy, przedmioty.nazwa as nazwa_przedmiotu
			FROM lekcje
			LEFT JOIN przedmioty ON lekcje.id_przedmiotu = przedmioty.id
			LEFT JOIN klasy ON lekcje.id_klasy = klasy.id
			WHERE lekcje.id_szkoly = ?`, [id_szkoly], 'DbLekcje.getAll').then(results => {
				resolve(results);
			})
			.catch(error => {
				reject(error);
			});
		});
	}
	async getById(id) {
		return db.select(`SELECT lekcje.*, klasy.nazwa as nazwa_klasy, przedmioty.nazwa as nazwa_przedmiotu, nauczyciele.imie, nauczyciele.nazwisko, sale.nazwa as nazwa_sali
			FROM lekcje
			LEFT JOIN klasy ON lekcje.id_klasy = klasy.id
			LEFT JOIN przedmioty ON lekcje.id_przedmiotu = przedmioty.id
			LEFT JOIN nauczyciele ON lekcje.id_nauczyciela = nauczyciele.id
			LEFT JOIN sale ON lekcje.id_sali = sale.id
			WHERE lekcje.id = ?`, [id], 'DbLekcje.getById');
	}
	async add(lekcja) {
		return db.insert('INSERT INTO lekcje SET ?', lekcja, 'DbLekcje.add');
	}
	async getById(id) {
		return db.select(`SELECT lekcje.*, 
			klasy.nazwa as nazwa_klasy,
			przedmioty.nazwa as nazwa_przedmiotu,
			nauczyciele.imie,
			nauczyciele.nazwisko,
			sale.nazwa as nazwa_sali
		FROM lekcje
		LEFT JOIN klasy ON lekcje.id_klasy = klasy.id
		LEFT JOIN przedmioty ON lekcje.id_przedmiotu = przedmioty.id
		LEFT JOIN nauczyciele ON lekcje.id_nauczyciela = nauczyciele.id
		LEFT JOIN sale ON lekcje.id_sali = sale.id
		WHERE lekcje.id = ?`, [id], 'DbLekcje.getById');
	}
	async add(lekcja) {
		return db.insert('INSERT INTO lekcje SET ?', lekcja, 'DbLekcje.add');
	}
	async update(id, dane) {
		return db.update('UPDATE lekcje SET ? WHERE id = ?', [dane, id], 'DbLekcje.update');
	}
	async delete(id) {
		return db.delete('DELETE FROM lekcje WHERE id = ?', [id], 'DbLekcje.delete');
	}
	async getSelect(id_szkoly, selectedId, attr = 'name="id_lekcji" id="id_lekcji"') {
		return new Promise((resolve, reject) => {
			this.getAll(id_szkoly).then(results => {
				const options = results.map(lekcja =>
					`<option value="${lekcja.id}" ${selectedId == lekcja.id ? 'selected' : ''}>${lekcja.nazwa}</option>`
				).join('');

				resolve(`<select ${attr} size="6" class="form-select"><option value="">-- Wybierz salę --</option>${options}</select>`);
			})
			.catch(error => {
				
				reject(error);
			});
		});
	}
	getDniTygodnia(selectedId, attr = 'name="dzien_tygodnia" id="dzien_tygodnia"') {
		const dniTygodnia = [
			'Poniedziałek',
			'Wtorek',
			'Środa',
			'Czwartek',
			'Piątek',
		];
		const options = dniTygodnia.map(dzien =>
			`<option value="${dzien}" ${selectedId == dzien ? 'selected' : ''}>${dzien}</option>`
		).join('');
		return `<select ${attr} size="6" class="form-select"><option value="">-- Wybierz dzień tygodnia --</option>${options}</select>`;
	}
	getGodzinyLekcyjne(selectedId, attr = 'name="godzina_lekcyjna" id="godzina_lekcyjna"') {
		const godzinyLekcyjne = [
			'0 (07:10 - 07:55)',
			'1 (08:00 - 08:45)',
			'2 (08:50 - 09:35)',
			'3 (09:40 - 10:25)',
			'4 (10:40 - 11:25)',
			'5 (11:40 - 12:25)',
			'6 (12:30 - 13:15)',
			'7 (13:30 - 14:15)',
			'8 (14:20 - 15:05)',
			'9 (15:10 - 15:55)',
		];
		const options = godzinyLekcyjne.map(godzina =>
			`<option value="${godzina}" ${selectedId == godzina ? 'selected' : ''}>${godzina}</option>`
		).join('');
		return `<select ${attr} size="6" class="form-select"><option value="">-- Wybierz godzinę lekcyjną --</option>${options}</select>`;
	}
}

const dbLekcje = new DbLekcje();
export default dbLekcje;

/* CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	dzien_tygodnia VARCHAR(20),
	godzina_lekcyjna VARCHAR(20),
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
/* CREATE TABLE przedmioty (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL
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
/* CREATE TABLE nauczyciele (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */

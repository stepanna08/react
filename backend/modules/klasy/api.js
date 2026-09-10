import app from '../app.js';
import dbKlasy from './dbKlasy.js';

const routerKlasa = app.getRouter()
	.get('/szkola/:id', (req, res) => {
		dbKlasy.getAll(req.params.id)
			.then(klasy => {
				res.json(klasy);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/:id', (req, res) => {
		dbKlasy.getById(req.params.id)
			.then(klasa => {
				if (!klasa || !klasa.length) {
					return res.status(404).json({ error: 'Klasa nie znaleziona' });
				}
				res.json(klasa[0]);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.post('/', (req, res) => {
		let dane = {};
		req.body.id_szkoly && (dane.id_szkoly = req.body.id_szkoly);
		req.body.nazwa && (dane.nazwa = req.body.nazwa);
		req.body.id_profilu_klasy && (dane.id_profilu_klasy = req.body.id_profilu_klasy);
		req.body.id_wychowawcy && (dane.id_wychowawcy = req.body.id_wychowawcy);

		dbKlasy.add(dane)
			.then(result => {
				res.status(201).json({ 
					id: result.lastInsertRowid, 
					message: 'Klasa została dodana!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.put('/:id', (req, res) => {
		let dane = {};
		req.body.nazwa && (dane.nazwa = req.body.nazwa);
		req.body.id_profilu_klasy && (dane.id_profilu_klasy = req.body.id_profilu_klasy);
		req.body.id_wychowawcy && (dane.id_wychowawcy = req.body.id_wychowawcy);

		dbKlasy.update(req.params.id, dane)
			.then(result => {
				res.json({ 
					id: req.params.id,
					message: 'Klasa została zaktualizowana!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.delete('/:id', (req, res) => {
		dbKlasy.delete(req.params.id)
			.then(result => {
				res.json({ message: 'Klasa została usunięta!' });
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/uczniowie/:id', (req, res) => {
		dbKlasy.getUczniow(req.params.id)
			.then(uczniowie => {
				res.json(uczniowie);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.post('/uczen', (req, res) => {
		if (!req.body.id_klasy || !req.body.id_ucznia) {
			return res.status(400).json({ error: 'Brak id_klasy lub id_ucznia' });
		}
		let dane = {
			id_klasy: req.body.id_klasy,
			id_ucznia: req.body.id_ucznia,
		};

		dbKlasy.addUcznia(dane)
			.then(result => {
				res.status(201).json({ 
					id: result.lastInsertRowid, 
					message: 'Uczeń został dodany do klasy!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.delete('/uczen/:id_klasy/:id_ucznia', (req, res) => {
		if (!req.params.id_klasy || !req.params.id_ucznia) {
			return res.status(400).json({ error: 'Brak id_klasy lub id_ucznia' });
		}
		let dane = {
			id_klasy: req.params.id_klasy,
			id_ucznia: req.params.id_ucznia,
		};

		dbKlasy.deleteUcznia(dane)
			.then(result => {
				res.json({ message: 'Uczeń został usunięty z klasy!' });
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	});

app.app.use('/api/klasy', routerKlasa);

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

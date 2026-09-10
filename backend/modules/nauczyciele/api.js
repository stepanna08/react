import app from '../app.js';
import dbNauczyciele from './dbNauczyciele.js';

const routerNauczyciel = app.getRouter()
	.get('/', (req, res) => {
		console.log('\nAPI GET /api/nauczyciele');
		const id_szkoly = req.query.id_szkoly;
		dbNauczyciele.getAll(id_szkoly)
		.then(nauczyciele => {
			res.json(nauczyciele);
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.get('/szkola/:id', (req, res) => {
		console.log('\nAPI GET /nauczyciele/szkola/:id');
		if (!req.params.id) {
			res.status(500).json({ error: 'Brak id szkoły' });
		}
		dbNauczyciele.getAll(req.params.id).then(nauczyciele => {
			res.json(nauczyciele);
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.get('/:id', (req, res) => {
		console.log('\nAPI GET /api/nauczyciele/:id');
		dbNauczyciele.getById(req.params.id)
		.then(nauczyciel => {
			if (!nauczyciel || !nauczyciel.length) {
				return res.status(404).json({ error: 'Nauczyciel nie znaleziony' });
			}
			res.json(nauczyciel[0]);
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.post('/', (req, res) => {
	console.log('\nAPI POST /api/nauczyciele');
		let dane = {};
		req.body.imie && (dane.imie = req.body.imie);
		req.body.nazwisko && (dane.nazwisko = req.body.nazwisko);
		req.body.email && (dane.email = req.body.email);
		req.body.telefon && (dane.telefon = req.body.telefon);

		dbNauczyciele.add(dane)
		.then(result => {
			res.status(201).json({
				id: result.lastInsertRowid,
				message: 'Nauczyciel został dodany!',
				...dane
			});
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.put('/:id', (req, res) => {
		console.log('\nAPI PUT /api/nauczyciele/:id');
		let dane = {};
		req.body.imie && (dane.imie = req.body.imie);
		req.body.nazwisko && (dane.nazwisko = req.body.nazwisko);
		req.body.email && (dane.email = req.body.email);
		req.body.telefon && (dane.telefon = req.body.telefon);

		dbNauczyciele.update(req.params.id, dane)
		.then(result => {
			res.json({
				id: req.params.id,
				message: 'Nauczyciel został zaktualizowany!',
				...dane
			});
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.delete('/:id', (req, res) => {
		console.log('\nAPI DELETE /api/nauczyciele/:id');
		dbNauczyciele.delete(req.params.id)
		.then(result => {
			res.json({ message: 'Nauczyciel został usunięty!' });
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	});

app.app.use('/api/nauczyciele', routerNauczyciel);

/* CREATE TABLE nauczyciele (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */
/* CREATE TABLE szkoly ( -- id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(100) NOT NULL,
	adres VARCHAR(200),
	telefon VARCHAR(20),
	email VARCHAR(100),
	www VARCHAR(100),
	id_dyrektora INT DEFAULT NULL,
	FOREIGN KEY (id_dyrektora) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
); */
/* CREATE TABLE szkoly_nauczyciele ( -- id_szkoly, id_nauczyciela
	id_szkoly INT,
	id_nauczyciela INT,
	PRIMARY KEY (id_szkoly, id_nauczyciela),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
); */
/* CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(100),
	dzien_tygodnia VARCHAR(20),
	godzina_lekcyjna VARCHAR(20),
	id_szkoly INT,
	id_klasy INT,
	id_przedmiotu INT,
	id_sali INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_klasy) REFERENCES klasy(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_sali) REFERENCES sale(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
); */
/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_szkoly INT,
	id_ucznia INT,
	id_przedmiotu INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
); */

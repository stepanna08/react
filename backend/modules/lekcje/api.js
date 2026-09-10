import app from '../app.js';
import dbLekcje from './dbLekcje.js';

const routerLekcja = app.getRouter()
	.get('/szkola/:id', (req, res) => {
		dbLekcje.getAll(req.params.id)
			.then(lekcje => {
				res.json(lekcje);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/:id', (req, res) => {
		dbLekcje.getById(req.params.id)
			.then(lekcja => {
				if (!lekcja || !lekcja.length) {
					return res.status(404).json({ error: 'Lekcja nie znaleziona' });
				}
				res.json(lekcja[0]);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.post('/', (req, res) => {
		let dane = {};
		req.body.id_szkoly && (dane.id_szkoly = req.body.id_szkoly);
		req.body.id_klasy && (dane.id_klasy = req.body.id_klasy);
		req.body.id_przedmiotu && (dane.id_przedmiotu = req.body.id_przedmiotu);
		req.body.id_nauczyciela && (dane.id_nauczyciela = req.body.id_nauczyciela);
		req.body.id_sali && (dane.id_sali = req.body.id_sali);
		req.body.dzien_tygodnia && (dane.dzien_tygodnia = req.body.dzien_tygodnia);
		req.body.godzina_lekcyjna && (dane.godzina_lekcyjna = req.body.godzina_lekcyjna);

		dbLekcje.add(dane)
			.then(result => {
				res.status(201).json({ 
					id: result.lastInsertRowid, 
					message: 'Lekcja została dodana!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.put('/:id', (req, res) => {
		let dane = {};
		req.body.id_szkoly && (dane.id_szkoly = req.body.id_szkoly);
		req.body.id_klasy && (dane.id_klasy = req.body.id_klasy);
		req.body.id_przedmiotu && (dane.id_przedmiotu = req.body.id_przedmiotu);
		req.body.id_nauczyciela && (dane.id_nauczyciela = req.body.id_nauczyciela);
		req.body.id_sali && (dane.id_sali = req.body.id_sali);
		req.body.dzien_tygodnia && (dane.dzien_tygodnia = req.body.dzien_tygodnia);
		req.body.godzina_lekcyjna && (dane.godzina_lekcyjna = req.body.godzina_lekcyjna);

		dbLekcje.update(req.params.id, dane)
			.then(result => {
				res.json({ 
					id: req.params.id,
					message: 'Lekcja została zaktualizowana!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.delete('/:id', (req, res) => {
		dbLekcje.delete(req.params.id)
			.then(result => {
				res.json({ message: 'Lekcja została usunięta!' });
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	});

app.app.use('/api/lekcje', routerLekcja);

/* CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(100),
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

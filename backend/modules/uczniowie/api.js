
import app from '../app.js';
import dbUczniowie from './dbUczniowie.js';

const routerUczniowie = app.getRouter()
	.get('/szkola/:id', (req, res) => {
		dbUczniowie.getAll(req.params.id)
			.then(uczniowie => {
				res.json(uczniowie);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/:id', (req, res) => {
		dbUczniowie.getById(req.params.id)
			.then(uczen => {
				if (!uczen || !uczen.length) {
					return res.status(404).json({ error: 'Uczeń nie znaleziony' });
				}
				res.json(uczen[0]);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.post('/', (req, res) => {
		let dane = {};
		req.body.id_szkoly && (dane.id_szkoly = req.body.id_szkoly);
		req.body.imie && (dane.imie = req.body.imie);
		req.body.nazwisko && (dane.nazwisko = req.body.nazwisko);
		req.body.pesel && (dane.pesel = req.body.pesel);
		req.body.data_urodzenia && (dane.data_urodzenia = req.body.data_urodzenia);
		req.body.adres && (dane.adres = req.body.adres);
		req.body.telefon && (dane.telefon = req.body.telefon);
		req.body.email && (dane.email = req.body.email);

		dbUczniowie.add(dane)
			.then(result => {
				res.status(201).json({ 
					id: result.lastInsertRowid, 
					message: 'Uczeń został dodany!',
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
		req.body.imie && (dane.imie = req.body.imie);
		req.body.nazwisko && (dane.nazwisko = req.body.nazwisko);
		req.body.pesel && (dane.pesel = req.body.pesel);
		req.body.data_urodzenia && (dane.data_urodzenia = req.body.data_urodzenia);
		req.body.adres && (dane.adres = req.body.adres);
		req.body.telefon && (dane.telefon = req.body.telefon);
		req.body.email && (dane.email = req.body.email);

		dbUczniowie.update(req.params.id, dane)
			.then(result => {
				res.json({ 
					id: req.params.id,
					message: 'Uczeń został zaktualizowany!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.delete('/:id', (req, res) => {
		dbUczniowie.delete(req.params.id)
			.then(result => {
				res.json({ message: 'Uczeń został usunięty!' });
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	});

app.app.use('/api/uczniowie', routerUczniowie);

/* CREATE TABLE uczniowie (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */
/* CREATE TABLE szkoly_uczniowie ( -- id_szkoly, id_ucznia
	id_szkoly INT,
	id_ucznia INT,
	PRIMARY KEY (id_szkoly, id_ucznia),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
); */
/* CREATE TABLE klasy_uczniowie ( -- id_klasy, id_ucznia
	id_klasy INT,
	id_ucznia INT,
	PRIMARY KEY (id_klasy, id_ucznia),
	FOREIGN KEY (id_klasy) REFERENCES klasy(id),	
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
); */
/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_ucznia
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_ucznia INT,
	id_przedmiotu INT,
	id_ucznia INT,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
); */

import app from '../app.js';
import dbPrzedmioty from './dbPrzedmioty.js';

const routerPrzedmiot = app.getRouter()
	.get('/szkola/:id', (req, res) => {
		dbPrzedmioty.getAll(req.params.id)
			.then(przedmioty => {
				res.json(przedmioty);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/:id', (req, res) => {
		dbPrzedmioty.getById(req.params.id)
			.then(przedmiot => {
				if (!przedmiot || !przedmiot.length) {
					return res.status(404).json({ error: 'Przedmiot nie znaleziony' });
				}
				res.json(przedmiot[0]);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.post('/', (req, res) => {
		let dane = {
			id_szkoly: req.body.id_szkoly,
			nazwa: req.body.nazwa,
			ilosc_godzin: 0,
		};
		req.body.ilosc_godzin && (dane.ilosc_godzin = req.body.ilosc_godzin);

		dbPrzedmioty.add(dane)
			.then(result => {
				res.status(201).json({ 
					id: result.lastInsertRowid, 
					message: 'Przedmiot został dodany!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.put('/:id', (req, res) => {
		const dane = {};
		req.body.nazwa && (dane.nazwa = req.body.nazwa);
		req.body.ilosc_godzin && (dane.ilosc_godzin = req.body.ilosc_godzin);
		dbPrzedmioty.update(req.params.id, dane)
			.then(result => {
				res.json({ 
					id: req.params.id,
					message: 'Przedmiot został zaktualizowany!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.delete('/:id', (req, res) => {
		dbPrzedmioty.delete(req.params.id)
			.then(result => {
				res.json({ message: 'Przedmiot został usunięty!' });
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	});

app.app.use('/api/przedmioty', routerPrzedmiot);

/* CREATE TABLE przedmioty (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL,
	ilosc_godzin INT NOT NULL default 0
); */
/* CREATE TABLE szkoly_przedmioty ( -- id_szkoly, id_przedmiotu
	id_szkoly INT,
	id_przedmiotu INT,
	PRIMARY KEY (id_szkoly, id_przedmiotu),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id)
); */
/* CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_Przedmiot
	id INT AUTO_INCREMENT PRIMARY KEY,
	godzina_lekcyjna INT,
	data DATETIME,
	id_szkoly INT,
	id_klasy INT,
	id_przedmiotu INT,
	id_sali INT,
	id_Przedmiot INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_klasy) REFERENCES klasy(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_sali) REFERENCES sale(id),
	FOREIGN KEY (id_Przedmiot) REFERENCES przedmioty(id)
); */
/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_Przedmiot
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_ucznia INT,
	id_przedmiotu INT,
	id_Przedmiot INT,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_Przedmiot) REFERENCES przedmioty(id)
); */

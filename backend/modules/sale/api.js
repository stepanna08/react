import app from '../app.js';
import dbSale from './dbSale.js';

const routerSala = app.getRouter()
	.get('/szkola/:id', (req, res) => {
		dbSale.getAll(req.params.id)
			.then(sale => {
				res.json(sale);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/:id', (req, res) => {
		dbSale.getById(req.params.id)
			.then(sala => {
				if (!sala || !sala.length) {
					return res.status(404).json({ error: 'Sala nie znaleziona' });
				}
				res.json(sala[0]);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/tablice/:id', (req, res) => {
		dbSale.getTypyTablic(req.params.id)
			.then(tablice => {
				if (!tablice || !tablice.length) {
					return res.status(404).json({ error: 'Sala nie znaleziona' });
				}
				res.json(tablice);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.post('/', (req, res) => {
		if (!req.body.id_szkoly || !req.body.nazwa) {
			return res.status(400).json({ error: 'Brak podstawowych danych' });
		}
		let dane = {
			id_szkoly: req.body.id_szkoly,
			nazwa: req.body.nazwa,
		};
		req.body.ilosc_miejsc && (dane.ilosc_miejsc = req.body.ilosc_miejsc);
		req.body.id_typu_sali && (dane.id_typu_sali = req.body.id_typu_sali);
		req.body.id_opiekuna && (dane.id_opiekuna = req.body.id_opiekuna);

		dbSale.add(dane)
			.then(result => {
				res.status(201).json({ 
					id: result.lastInsertRowid, 
					message: 'Sala została dodana!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.put('/:id', (req, res) => {
		
		console.log('Updating sala id:', req.params.id, ' req.body:', req.body);
		if (req.body.id_typu_tablicy) {
			dbSale.addTypyTablic(req.params.id, req.body.id_typu_tablicy)
			.then(result => {
				res.json({ 
					id: req.params.id,
					message: 'Sala została zaktualizowana!',
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
		} else {
			let dane = {};
			req.body.nazwa && (dane.nazwa = req.body.nazwa);
			req.body.ilosc_miejsc && (dane.ilosc_miejsc = req.body.ilosc_miejsc);
			req.body.id_opiekuna && (dane.id_opiekuna = req.body.id_opiekuna);
			req.body.id_typu_sali && (dane.id_typu_sali = req.body.id_typu_sali);
			dbSale.update(req.params.id, dane)
				.then(result => {
					res.json({ 
						id: req.params.id,
						message: 'Sala została zaktualizowana!',
						...dane
					});
				})
				.catch(err => {
					res.status(500).json({ error: err.message });
				});
		}
	})
	.delete('/:id', (req, res) => {
		dbSale.delete(req.params.id)
			.then(result => {
				res.json({ message: 'Sala została usunięta!' });
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	});

app.app.use('/api/sale', routerSala);

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

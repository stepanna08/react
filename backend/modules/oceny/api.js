import app from '../app.js';
import dbOceny from './dbOceny.js';

const routerOceny = app.getRouter()
	.get('/', (req, res) => {
		console.log('\nAPI GET /api/oceny');
		const id_szkoly = req.query.id_szkoly;
		if (!id_szkoly) {
			return res.status(400).json({ error: 'Brak id_szkoly' });
		}
		dbOceny.getAll(id_szkoly)
		.then(oceny => {
			res.json(oceny);
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.get('/uczen/:id_ucznia', (req, res) => {
		// Przykładowy adres: http://localhost:3000/api/oceny/uczen/123?id_szkoly=1
		console.log('\nAPI GET /api/oceny/uczen/:id_ucznia');
		const id_szkoly = req.query.id_szkoly;
		if (!id_szkoly) {
			return res.status(400).json({ error: 'Brak id_szkoly' });
		}
		dbOceny.getByIdUcznia(id_szkoly, req.params.id_ucznia)
		.then(oceny => {
			res.json(oceny);
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.get('/:id', (req, res) => {
		console.log('\nAPI GET /api/oceny/:id');
		dbOceny.getById(req.params.id)
		.then(ocena => {
			if (!ocena || !ocena.length) {
				return res.status(404).json({ error: 'Ocena nie znaleziona' });
			}
			res.json(ocena[0]);
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.post('/', (req, res) => {
		console.log('\nAPI POST /api/oceny');
		let dane = {};
		if (!req.body.id_szkoly) {
			return res.status(400).json({ error: 'Brak id_szkoly' });
		}
		req.body.wartosc && (dane.wartosc = req.body.wartosc);
		req.body.opis && (dane.opis = req.body.opis);
		req.body.data && (dane.data = req.body.data);
		req.body.id_szkoly && (dane.id_szkoly = req.body.id_szkoly);
		req.body.id_ucznia && (dane.id_ucznia = req.body.id_ucznia);
		req.body.id_przedmiotu && (dane.id_przedmiotu = req.body.id_przedmiotu);
		req.body.id_nauczyciela && (dane.id_nauczyciela = req.body.id_nauczyciela);

		dbOceny.add(dane)
		.then(result => {
			res.status(201).json({ 
				id: result.lastInsertRowid, 
				message: 'Ocena została dodana!',
				...dane
			});
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.put('/:id', (req, res) => {
		console.log('\nAPI PUT /api/oceny/:id');
		let dane = {};
		req.body.wartosc && (dane.wartosc = req.body.wartosc);
		req.body.opis && (dane.opis = req.body.opis);
		req.body.data && (dane.data = req.body.data);
		req.body.id_ucznia && (dane.id_ucznia = req.body.id_ucznia);
		req.body.id_przedmiotu && (dane.id_przedmiotu = req.body.id_przedmiotu);
		req.body.id_nauczyciela && (dane.id_nauczyciela = req.body.id_nauczyciela);

		dbOceny.update(req.params.id, dane)
		.then(result => {
			res.json({ 
				id: req.params.id,
				message: 'Ocena została zaktualizowana!',
				...dane
			});
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	})
	.delete('/:id', (req, res) => {
		console.log('\nAPI DELETE /api/oceny/:id');
		dbOceny.delete(req.params.id)
		.then(result => {
			res.json({ message: 'Ocena została usunięta!' });
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	});

app.app.use('/api/oceny', routerOceny);

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

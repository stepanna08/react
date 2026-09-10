import app from '../app.js';
import dbTypyTablic from './dbTypyTablic.js';

const routerTypyTablic = app.getRouter()
	.get('/szkola/:id', (req, res) => {
		dbTypyTablic.getAll(req.params.id)
			.then(typyTablic => {
				res.json(typyTablic);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/:id', (req, res) => {
		dbTypyTablic.getById(req.params.id)
			.then(typ => {
				if (!typ || !typ.length) {
					return res.status(404).json({ error: 'Typ tablicy nie znaleziony' });
				}
				res.json(typ[0]);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.post('/', (req, res) => {
		const dane = {
			'nazwa': req.body.nazwa,
		};
		dbTypyTablic.add(dane)
			.then(result => {
				res.status(201).json({ 
					id: result.lastInsertRowid, 
					message: 'Typ tablicy został dodany!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.put('/:id', (req, res) => {
		const dane = {
			'nazwa': req.body.nazwa,
		};
		dbTypyTablic.update(req.params.id, dane)
			.then(result => {
				res.json({ 
					id: req.params.id,
					message: 'Typ tablicy został zaktualizowany!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.delete('/:id', (req, res) => {
		dbTypyTablic.delete(req.params.id)
			.then(result => {
				res.json({ message: 'Typ tablicy został usunięty!' });
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	});

app.app.use('/api/typy-tablic', routerTypyTablic);

/* CREATE TABLE typy_tablic (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */

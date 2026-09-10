import app from '../app.js';
import dbTypySal from './dbTypySal.js';

const routerTypySal = app.getRouter()
	.get('/szkola/:id', (req, res) => {
		dbTypySal.getAll(req.params.id)
			.then(typySal => {
				res.json(typySal);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/:id', (req, res) => {
		dbTypySal.getById(req.params.id)
			.then(typ => {
				if (!typ || !typ.length) {
					return res.status(404).json({ error: 'Typ sali nie znaleziony' });
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
		dbTypySal.add(dane)
			.then(result => {
				res.status(201).json({ 
					id: result.lastInsertRowid, 
					message: 'Typ sali został dodany!',
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
		dbTypySal.update(req.params.id, dane)
			.then(result => {
				res.json({ 
					id: req.params.id,
					message: 'Typ sali został zaktualizowany!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.delete('/:id', (req, res) => {
		dbTypySal.delete(req.params.id)
			.then(result => {
				res.json({ message: 'Typ sali został usunięty!' });
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	});

app.app.use('/api/typy-sal', routerTypySal);

/* CREATE TABLE typy_sal (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */

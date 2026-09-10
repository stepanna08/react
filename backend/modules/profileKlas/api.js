import app from '../app.js';
import dbProfileKlas from './dbProfileKlas.js';

const routerProfileKlas = app.getRouter()
	.get('/szkola/:id', (req, res) => {
		dbProfileKlas.getAll(req.params.id)
			.then(profileKlas => {
				res.json(profileKlas);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.get('/:id', (req, res) => {
		dbProfileKlas.getById(req.params.id)
			.then(profil => {
				if (!profil || !profil.length) {
					return res.status(404).json({ error: 'Profil klasy nie znaleziony' });
				}
				res.json(profil[0]);
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.post('/', (req, res) => {
		const dane = {
			'nazwa': req.body.nazwa,
		};
		dbProfileKlas.add(dane)
			.then(result => {
				res.status(201).json({ 
					id: result.lastInsertRowid, 
					message: 'Profil klasy został dodany!',
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
		dbProfileKlas.update(req.params.id, dane)
			.then(result => {
				res.json({ 
					id: req.params.id,
					message: 'Profil klasy został zaktualizowany!',
					...dane
				});
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	})
	.delete('/:id', (req, res) => {
		dbProfileKlas.delete(req.params.id)
			.then(result => {
				res.json({ message: 'Profil klasy został usunięty!' });
			})
			.catch(err => {
				res.status(500).json({ error: err.message });
			});
	});

app.app.use('/api/profile-klas', routerProfileKlas);

/* CREATE TABLE profile_klas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */

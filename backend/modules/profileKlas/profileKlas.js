import app from '../app.js';
import dbProfileKlas from './dbProfileKlas.js';

const routerProfileKlas = app.getRouter()
	.get('/list', (req, res) => {
		dbProfileKlas.getAll().then(profileKlas => {
			app.generujLayout('profileKlas/lista', res, { profileKlas: profileKlas }, 'Lista profili klas');
		})
		.catch(error => {
			console.log('Błąd pobierania profili klas', error);
			app.addError(res, 'Błąd pobierania profili klas');
		});
	})
	.get('/details/:id', (req, res) => {
		dbProfileKlas.getById(req.params.id).then(profil => {
			profil = profil[0];
			app.generujLayout('profileKlas/szczegoly', res, { profil: profil }, `Szczegóły profilu klasy: ${profil.nazwa}`);
		})
		.catch(err => {
			console.log('Błąd pobierania profilu klasy ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.get('/add', (req, res) => {
		app.generujLayout('profileKlas/dodaj', res, {}, 'Dodaj profil klasy');
	})
	.post('/add', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
		};
		dbProfileKlas.add(dane)
			.then(result => {
				app.addSuccess(res, 'Profil klasy został dodany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/profile-klas/list');
			});
	})
	.get('/update/:id', (req, res) => {
		dbProfileKlas.getById(req.params.id).then(profil => {
			profil = profil[0];
			app.generujLayout('profileKlas/edytuj', res, { profil: profil }, 'Edytuj profil klasy');
		})
		.catch(err => {
			console.log('Błąd pobierania profilu klasy ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.post('/update', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
		};
		dbProfileKlas.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Profil klasy został zaktualizowany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/profile-klas/details/' + req.body.id);
			});
	})
	.get('/delete/:id', (req, res) => {
		dbProfileKlas.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Profil klasy został usunięty!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/profile-klas/list');
			});
	});

app.app.use('/profile-klas', routerProfileKlas);

/* CREATE TABLE profile_klas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */

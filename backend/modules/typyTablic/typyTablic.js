import app from '../app.js';
import dbTypyTablic from './dbTypyTablic.js';

const routerTypyTablic = app.getRouter()
	.get('/list', (req, res) => {
		dbTypyTablic.getAll().then(typyTablic => {
			app.generujLayout('typyTablic/lista', res, { typyTablic: typyTablic }, 'Lista typów tablic');
		})
		.catch(error => {
			console.log('Błąd pobierania typów tablic', error);
			app.addError(res, 'Błąd pobierania typów tablic');
		});
	})
	.get('/details/:id', (req, res) => {
		dbTypyTablic.getById(req.params.id).then(typ => {
			typ = typ[0];
			app.generujLayout('typyTablic/szczegoly', res, { typ: typ }, `Szczegóły typu tablicy: ${typ.nazwa}`);
		})
		.catch(err => {
			console.log('Błąd pobierania typu tablicy ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.get('/add', (req, res) => {
		app.generujLayout('typyTablic/dodaj', res, {}, 'Dodaj typ tablicy');
	})
	.post('/add', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
		};
		dbTypyTablic.add(dane)
			.then(result => {
				app.addSuccess(res, 'Typ tablicy został dodany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/typy-tablic/list');
			});
	})
	.get('/update/:id', (req, res) => {
		dbTypyTablic.getById(req.params.id).then(typ => {
			typ = typ[0];
			app.generujLayout('typyTablic/edytuj', res, { typ: typ }, 'Edytuj typ tablicy');
		})
		.catch(err => {
			console.log('Błąd pobierania typu tablicy ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.post('/update', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
		};
		dbTypyTablic.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Typ tablicy został zaktualizowany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/typy-tablic/details/' + req.body.id);
			});
	})
	.get('/delete/:id', (req, res) => {
		dbTypyTablic.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Typ tablicy został usunięty!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/typy-tablic/list');
			});
	});

app.app.use('/typy-tablic', routerTypyTablic);

/* CREATE TABLE typy_tablic (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */

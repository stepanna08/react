import app from '../app.js';
import dbTypySal from './dbTypySal.js';

const routerTypySal = app.getRouter()
	.get('/list', (req, res) => {
		dbTypySal.getAll().then(typySal => {
			app.generujLayout('typySal/lista', res, { typySal: typySal }, 'Lista typów sal');
		})
		.catch(error => {
			console.log('Błąd pobierania typów sal', error);
			app.addError(res, 'Błąd pobierania typów sal');
		});
	})
	.get('/details/:id', (req, res) => {
		dbTypySal.getById(req.params.id).then(typ => {
			typ = typ[0];
			app.generujLayout('typySal/szczegoly', res, { typ: typ }, `Szczegóły typu sali: ${typ.nazwa}`);
		})
		.catch(err => {
			console.log('Błąd pobierania typu sali ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.get('/add', (req, res) => {
		app.generujLayout('typySal/dodaj', res, {}, 'Dodaj typ sali');
	})
	.post('/add', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
		};
		dbTypySal.add(dane)
			.then(result => {
				app.addSuccess(res, 'Typ sali został dodany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/typy-sal/list');
			});
	})
	.get('/update/:id', (req, res) => {
		dbTypySal.getById(req.params.id).then(typ => {
			typ = typ[0];
			app.generujLayout('typySal/edytuj', res, { typ: typ }, 'Edytuj typ sali');
		})
		.catch(err => {
			console.log('Błąd pobierania typu sali ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.post('/update', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
		};
		dbTypySal.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Typ sali został zaktualizowany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/typy-sal/details/' + req.body.id);
			});
	})
	.get('/delete/:id', (req, res) => {
		dbTypySal.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Typ sali został usunięty!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/typy-sal/list');
			});
	});

app.app.use('/typy-sal', routerTypySal);

/* CREATE TABLE typy_sal (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
); */

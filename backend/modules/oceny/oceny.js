import app from '../app.js';
import dbOceny from './dbOceny.js';
import dbUczniowie from '../uczniowie/dbUczniowie.js';
import dbPrzedmioty from '../przedmioty/dbPrzedmioty.js';
import dbNauczyciele from '../nauczyciele/dbNauczyciele.js';

const routerOceny = app.getRouter()
	.get('/list', (req, res) => {
		if (!req.session.selectedSchoolId) {
			app.addError(res, 'Wybierz szkołę', true);
			return res.redirect('/');
		}
		dbOceny.getAll(req.session.selectedSchoolId).then(oceny => {
			app.generujLayout('oceny/lista', res, { oceny: oceny }, 'Lista ocen');
		})
		.catch(error => {
			console.log('Błąd pobierania ocen', error);
			app.addError(res, 'Błąd pobierania ocen');
		});
	})
	.get('/uczen/:id_ucznia', (req, res) => {
		if (!req.session.selectedSchoolId) {
			app.addError(res, 'Wybierz szkołę', true);
			return res.redirect('/');
		}
		dbOceny.getByIdUcznia(req.session.selectedSchoolId, req.params.id_ucznia).then(oceny => {
			app.generujLayout('oceny/uczen-lista', res, { oceny: oceny }, 'Oceny ucznia');
		})
		.catch(error => {
			console.log('Błąd pobierania ocen ucznia', error);
			app.addError(res, 'Błąd pobierania ocen ucznia');
		});
	})
	.get('/details/:id', (req, res) => {
		dbOceny.getById(req.params.id).then(ocena => {
			ocena = ocena[0];
			app.generujLayout('oceny/szczegoly', res, { ocena: ocena }, `Szczegóły oceny`);
		})
		.catch(err => {
			console.log('Błąd pobierania oceny ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.get('/add', async (req, res) => {
		if (!req.session.selectedSchoolId) {
			app.addError(res, 'Wybierz szkołę', true);
			return res.redirect('/');
		}
		try {
			const uczniowieSelect = await dbUczniowie.getSelect(req.session.selectedSchoolId, null, 'name="id_ucznia" id="id_ucznia"');
			const przedmiotySelect = await dbPrzedmioty.getSelect(req.session.selectedSchoolId, null, 'name="id_przedmiotu" id="id_przedmiotu"');
			const nauczycieleSelect = await dbNauczyciele.getSelect(req.session.selectedSchoolId, null, 'name="id_nauczyciela" id="id_nauczyciela"');
			app.generujLayout('oceny/dodaj', res, { 
				uczniowieSelect: uczniowieSelect,
				przedmiotySelect: przedmiotySelect,
				nauczycieleSelect: nauczycieleSelect
			}, 'Dodaj ocenę');
		} catch(err) {
			console.log('Błąd pobierania danych do formularza', err);
			app.addError(res, err);
		}
	})
	.post('/add', (req, res) => {
		if (!req.session.selectedSchoolId) {
			app.addError(res, 'Wybierz szkołę', true);
			return res.redirect('/');
		}
		var dane = {
			'wartosc': req.body.wartosc,
			'opis': req.body.opis || '',
			'data': req.body.data,
			'id_szkoly': req.session.selectedSchoolId,
			'id_ucznia': req.body.id_ucznia,
			'id_przedmiotu': req.body.id_przedmiotu,
			'id_nauczyciela': req.body.id_nauczyciela,
		};
		dbOceny.add(dane)
			.then(result => {
				app.addSuccess(res, 'Ocena została dodana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/oceny/list');
			});
	})
	.get('/update/:id', async (req, res) => {
		if (!req.session.selectedSchoolId) {
			app.addError(res, 'Wybierz szkołę', true);
			return res.redirect('/');
		}
		try {
			const ocena = await dbOceny.getById(req.params.id);
			const uczniowieSelect = await dbUczniowie.getSelect(req.session.selectedSchoolId, ocena[0].id_ucznia, 'name="id_ucznia" id="id_ucznia"');
			const przedmiotySelect = await dbPrzedmioty.getSelect(req.session.selectedSchoolId, ocena[0].id_przedmiotu, 'name="id_przedmiotu" id="id_przedmiotu"');
			const nauczycieleSelect = await dbNauczyciele.getSelect(req.session.selectedSchoolId, ocena[0].id_nauczyciela, 'name="id_nauczyciela" id="id_nauczyciela"');
			app.generujLayout('oceny/edytuj', res, { 
				ocena: ocena[0],
				uczniowieSelect: uczniowieSelect,
				przedmiotySelect: przedmiotySelect,
				nauczycieleSelect: nauczycieleSelect
			}, `Edytuj ocenę`);
		} catch(err) {
			app.addError(res, err);
		}
	})
	.post('/update', (req, res) => {
		var dane = {
			'wartosc': req.body.wartosc,
			'opis': req.body.opis || '',
			'data': req.body.data,
			'id_ucznia': req.body.id_ucznia,
			'id_przedmiotu': req.body.id_przedmiotu,
			'id_nauczyciela': req.body.id_nauczyciela,
		};
		dbOceny.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Ocena została zaktualizowana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/oceny/list');
			});
	})
	.get('/delete/:id', (req, res) => {
		dbOceny.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Ocena została usunięta!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/oceny/list');
			});
	});

app.app.use('/oceny', routerOceny);

/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_szkoly INT,
	id_ucznia INT,
	id_przedmiotu INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id)
); */

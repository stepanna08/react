import app from '../app.js';
import dbUczniowie from './dbUczniowie.js';
import dbKlasy from '../klasy/dbKlasy.js';
import dbOceny from '../oceny/dbOceny.js';

const routerUczniowie = app.getRouter()
	.get('/list', (req, res) => {
		req.session.selectedSchoolId = null;
		req.session.selectedSchoolName = 'Wybierz szkołę';
		dbUczniowie.getAll().then(uczniowie => {
			app.generujLayout('uczniowie/lista', res, { uczniowie: uczniowie, dodajUcznia: req.query.dodajUcznia || '' }, 'Lista uczniów');
		})
		.catch(error => {
			console.log('Błąd pobierania uczniów', error);
			app.addError(res, 'Błąd pobierania uczniów');
		});
	})
	.get('/details/:id', async (req, res) => {
		try {
			const uczen = await dbUczniowie.getById(req.params.id);
			let oceny = [];
			if (req.session.selectedSchoolId) {
				oceny = await dbOceny.getByIdUcznia(req.session.selectedSchoolId, req.params.id);
			}
			app.generujLayout('uczniowie/szczegoly', res, { 
				uczen: uczen[0],
				oceny: oceny
			}, `Szczegóły ucznia: ${uczen[0].imie} ${uczen[0].nazwisko}`);
		} catch(err) {
			console.log('Błąd pobierania ucznia ' + req.params.id, err);
			app.addError(res, err);
		}
	})
	.get('/add', (req, res) => {
		app.generujLayout('uczniowie/dodaj', res, {}, 'Dodaj ucznia');
	})
	.post('/add', (req, res) => {
		var dane = {
			'imie': req.body.imie,
			'nazwisko': req.body.nazwisko,
			'telefon': req.body.telefon,
			'email': req.body.email,
		};
		dbUczniowie.add(dane)
			.then(result => {
				// console.log('\tDodano result:', result);
				app.addSuccess(res, 'Uczeń został dodany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/uczniowie/list');
			});
	})
	.get('/update/:id', (req, res) => {
		dbUczniowie.getById(req.params.id).then(uczen => {
			uczen = uczen[0];
			app.generujLayout('uczniowie/edytuj', res, { uczen: uczen }, 'Edytuj ucznia');
		})
		.catch(err => {
			console.log('Błąd pobierania ucznia ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.post('/update', (req, res) => {
		var dane = {
			'imie': req.body.imie,
			'nazwisko': req.body.nazwisko,
			'telefon': req.body.telefon,
			'email': req.body.email,
		};
		dbUczniowie.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Uczeń został zaktualizowany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/uczniowie/list');
			});
	})
	.get('/delete/:id', (req, res) => {
		dbUczniowie.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Uczeń został usunięty!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/uczniowie/list');
			});
	})
	.get('/szkola/list', (req, res) => {
		if (!req.session.selectedSchoolId) {
			return res.redirect('/uczniowie/list');
		}
		dbUczniowie.getAll(req.session.selectedSchoolId).then(uczniowie => {
			app.generujLayout('uczniowie/szkola-lista', res, { uczniowie: uczniowie, dodajUcznia: req.query.dodajUcznia || '' }, 'Lista uczniów');
		})
		.catch(error => {
			console.log('Błąd pobierania uczniów', error);
			app.addError(res, 'Błąd pobierania uczniów');
		});
	})
	.get('/szkola/details/:id', async (req, res) => {
		if (!req.session.selectedSchoolId) {
			return res.redirect('/uczniowie/list');
		}
		try {
			const uczen = await dbUczniowie.getById(req.params.id);
			const oceny = await dbOceny.getByIdUcznia(req.session.selectedSchoolId, req.params.id);
			app.generujLayout('uczniowie/szkola-szczegoly', res, { 
				uczen: uczen[0],
				oceny: oceny
			}, `Szczegóły ucznia: ${uczen[0].imie} ${uczen[0].nazwisko}`);
		} catch(err) {
			console.log('Błąd pobierania ucznia ' + req.params.id, err);
			app.addError(res, err);
		}
	})
	.get('/szkola/add', (req, res) => {
		dbUczniowie.getSelect(0, 'name="id_ucznia" id="id_ucznia"').then(uczniowie => {
			app.generujLayout('uczniowie/szkola-dodaj', res, { uczniowie: uczniowie }, 'Dodaj ucznia');
		}).catch(err => {
			console.log('Błąd pobierania uczniów', err);
			app.addError(res, err);
		});
	})
	.post('/szkola/add', (req, res) => {
		var dane = {
			'id_szkoly': req.session.selectedSchoolId,
			'id_ucznia': req.body.id_ucznia,
		};
		dbUczniowie.addToSzkola(dane)
			.then(result => {
				app.addSuccess(res, 'Uczeń został dodany do szkoły!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/uczniowie/szkola/list');
			});
	})
	.get('/szkola/delete/:id_ucznia', (req, res) => {
		var dane = {
			'id_szkoly': req.session.selectedSchoolId,
			'id_ucznia': req.params.id_ucznia,
		};
		dbUczniowie.deleteFromSzkola(dane)
			.then(result => {
				app.addSuccess(res, 'Uczeń został usunięty!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/uczniowie/szkola/list');
			});
	});

app.app.use('/uczniowie', routerUczniowie);

/* CREATE TABLE uczniowie (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */
/* CREATE TABLE szkoly_uczniowie ( -- id_szkoly, id_ucznia
	id_szkoly INT,
	id_ucznia INT,
	PRIMARY KEY (id_szkoly, id_ucznia),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
); */
/* CREATE TABLE klasy_uczniowie ( -- id_klasy, id_ucznia
	id_klasy INT,
	id_ucznia INT,
	PRIMARY KEY (id_klasy, id_ucznia),
	FOREIGN KEY (id_klasy) REFERENCES klasy(id),	
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
); */
/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_ucznia
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_ucznia INT,
	id_przedmiotu INT,
	id_ucznia INT,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
); */

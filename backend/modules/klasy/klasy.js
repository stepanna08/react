import app from '../app.js';
import dbKlasy from './dbKlasy.js';
import dbSzkoly from '../szkoly/dbSzkoly.js';
import dbNauczyciele from '../nauczyciele/dbNauczyciele.js';
import dbProfileKlas from '../profileKlas/dbProfileKlas.js';

const routerKlasa = app.getRouter();
routerKlasa
	.get('/list', (req, res) => {
		dbKlasy.getAll(req.session.selectedSchoolId).then(klasy => {
			app.generujLayout('klasy/lista', res, { klasy: klasy }, 'Lista klas');
		})
		.catch(error => {
			console.log('Błąd pobierania klas', error);
			app.addError(res, 'Błąd pobierania klas');
		})
	})
	.get('/list-old', (req, res) => {
		app.pageBegin(res).then(() => {
			dbKlasy.getAll(req.session.selectedSchoolId).then((klasy) => {
				if (req.query.dodajKlase) {
					res.write('<h2>' + req.query.dodajKlase + '</h2>\n');
				}
				res.write('<h2>Lista klas:</h2>\n');
				if (klasy.length) {
					klasy.forEach(klasa => {
						res.write(`<p><a href="/klasy/details/${klasa.id}">${klasa.nazwa}</a></p>\n`);
					});
				} else {
					res.write('<p>brak klas</p>\n');
				}
				res.write('<p><a class="btn" href="/klasy/add">Dodaj klasę</a></p>\n');
			})
			.catch(err => {
				app.addError(res, 'Błąd pobierania klas');
			})
			.finally(() => {
				app.pageEnd(res);
			});
		}).catch(err => {
			app.addError(res, err);
			app.pageEnd(res);
		});
	})
	.get('/details/:id', (req, res) => {
		dbKlasy.getById(req.params.id).then(klasa => {
			klasa = klasa[0];
			app.generujLayout('klasy/szczegoly', res, { klasa: klasa }, `Szczegóły klasy${klasa.nazwa}`);
		})
		.catch(err => {
			console.log('Błąd pobierania klasy ' + req.params.id, error);
			app.addError(res, err);
		});
	})
	.get('/add/', (req, res) => {
		Promise.all([
			dbProfileKlas.getSelect(),
			dbNauczyciele.getSelect(req.session.selectedSchoolId, null, 'name="id_wychowawcy" id="id_wychowawcy"'),
		]).then(([profile_klas, nauczyciele]) => {
			app.generujLayout('klasy/dodaj', res, { profile_klas: profile_klas, nauczyciele: nauczyciele }, `Dodaj klasę`);
		}).catch(err => {
			app.addError(res, err);
		});
	})
	.post('/add', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
			'id_szkoly': req.session.selectedSchoolId,
			'id_wychowawcy': req.body.id_wychowawcy,
			'id_profilu_klasy': req.body.id_profilu_klasy
		};
		dbKlasy.add(dane)
			.then(result => {
				// console.log('\tDodano result:', result);
				app.addSuccess(res, 'Klasa została dodana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/klasy/list');
			});
	})
	.get('/update/:id', (req, res) => {
		dbKlasy.getById(req.params.id).then(klasa => {
			// console.log('klasa', klasa);
			klasa = klasa[0];
			Promise.all([
				dbProfileKlas.getSelect(klasa.id_profilu_klasy),
				dbNauczyciele.getSelect(req.session.selectedSchoolId, klasa.id_wychowawcy, 'name="id_wychowawcy" id="id_wychowawcy"'),
				// dbSzkoly.getSelect(klasa.id_szkoly, 'name="id_szkoly" id="id_szkoly"'),
			]).then(([profile_klas, nauczyciele]) => {
				app.generujLayout('klasy/edytuj', res, { klasa: klasa, profile_klas: profile_klas, nauczyciele: nauczyciele }, `Edytuj klasę`);
			}).catch(err => {
				app.addError(res, err);
			}).finally(() => {
				app.pageEnd(res);
			});
		})
		.catch(err => {
			app.addError(res, err);
		});
	})
	.post('/update', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
			// 'id_szkoly': req.body.id_szkoly,
			'id_profilu_klasy': req.body.id_profilu_klasy,
			'id_wychowawcy': req.body.id_wychowawcy
		};
		dbKlasy.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Klasa została zaktualizowana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/klasy/list');
			});
	})
	.get('/delete/:id', (req, res) => {
		dbKlasy.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Klasa została usunięta!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/klasy/list');
			});
	});

app.app.use('/klasy', routerKlasa);

/* CREATE TABLE klasy ( -- id_szkoly, id_profilu_klasy, id_wychowawcy
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(20) NOT NULL,
	id_szkoly INT,
	id_profilu_klasy INT,
	id_wychowawcy INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_profilu_klasy) REFERENCES profile_klas(id),
	FOREIGN KEY (id_wychowawcy) REFERENCES nauczyciele(id)
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
/* CREATE TABLE profile_klas (
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

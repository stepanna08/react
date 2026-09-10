import app from '../app.js';
import dbSzkoly from './dbSzkoly.js';
import dbNauczyciele from '../nauczyciele/dbNauczyciele.js';

const routerSzkola = app.getRouter()
	.get('/list', (req, res) => {
		dbSzkoly.getAll().then(szkoly => {
			app.generujLayout('szkoly/lista', res, { szkoly: szkoly, dodajSzkole: req.query.dodajSzkole || '' }, 'Lista szkół');
		})
		.catch(error => {
			console.log('Błąd pobierania szkół', error);
			app.addError(res, 'Błąd pobierania szkół');
		});
	})
	.get('/details', (req, res) => {
		if (!req.session.selectedSchoolId || req.session.selectedSchoolId === 'undefined' || req.session.selectedSchoolId === undefined) {
			app.pageBegin(res).then(() => {
				res.write('Wybierz szkołę\n');
				app.pageEnd(res);
			});
			return;
		}

		dbSzkoly.getById(req.session.selectedSchoolId)
			.then(szkoly => {
				szkoly = szkoly[0];
				req.session.selectedSchoolId = szkoly.id;
				req.session.selectedSchoolName = szkoly.nazwa;
				app.generujLayout('szkoly/szczegoly', res, { szkola: szkoly }, `Szczegóły szkoły: ${szkoly.nazwa}`);
			})
			.catch(err => {
				console.log('Błąd pobierania szkoły ' + req.session.selectedSchoolId, err);
				app.addError(res, err);
				req.session.selectedSchoolId = '';
				req.session.selectedSchoolName = '';
			});
	})
	.get('/add', (req, res) => {
		dbNauczyciele.getSelect(0, 'name="id_dyrektora" id="id_dyrektora"').then(nauczyciele => {
			app.generujLayout('szkoly/dodaj', res, { nauczyciele: nauczyciele }, 'Dodaj szkołę');
		})
		.catch(error => {
			console.log('Błąd pobierania listy nauczycieli', error);
			app.addError(res, error, 'Błąd pobierania listy nauczycieli');
		});
	})
	.post('/add', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
			'adres': req.body.adres,
			'telefon': req.body.telefon,
			'email': req.body.email,
			'www': req.body.www,
			'id_dyrektora': req.body.id_nauczyciela,
		};
		dbSzkoly.add(dane)
			.then(result => {
				// console.log('\tDodano result:', result);
				app.addSuccess(res, 'Szkoła została dodana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/szkoly/list');
			});
	})
	.get('/update', (req, res) => {
		dbSzkoly.getById(req.session.selectedSchoolId).then(szkola => {
			szkola = szkola[0];
			dbNauczyciele.getSelect(req.session.selectedSchoolId, szkola.id_dyrektora, 'name="id_dyrektora" id="id_dyrektora"').then(nauczycieleSelect => {
				app.generujLayout('szkoly/edytuj', res, { szkola: szkola, nauczyciele: nauczycieleSelect }, `Edytuj szkołę: ${szkola.nazwa}`);
			})
			.catch(err => {
				console.log('Błąd pobierania nauczycieli', err);
				app.addError(res, err);
			});
		}).catch(err => {
			console.log('Błąd pobierania szkoły ' + req.session.selectedSchoolId, err);
			app.addError(res, err);
		});
	})
	.post('/update', (req, res) => {
		const dane = {
			nazwa: req.body.nazwa,
			adres: req.body.adres,
			telefon: req.body.telefon,
			email: req.body.email,
			www: req.body.www,
		};
		if (req.body.id_dyrektora) {
			dane.id_dyrektora = req.body.id_dyrektora;
		}
		// console.log('dane do update:', dane);
		dbSzkoly.update(req.session.selectedSchoolId, dane)
			.then(result => {
				app.addSuccess(res, 'Szkoła została zaktualizowana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/szkoly/details');
			});
	})
	.get('/select/', (req, res) => {
		req.session.selectedSchoolId = '';
		req.session.selectedSchoolName = 'Wybierz szkołę';
		res.redirect('/szkoly/list');
	})
	.get('/select/:id', (req, res) => {
		dbSzkoly.getById(req.params.id)
			.then(szkola => {
				szkola = szkola[0];
				req.session.selectedSchoolId = req.params.id;
				req.session.selectedSchoolName = szkola.nazwa;
			})
			.catch(err => {
				app.addError(res, err, true);
				req.session.selectedSchoolId = '';
				req.session.selectedSchoolName = '';
			})
			.finally(() => {
				res.redirect('/szkoly/details');
			});
	})
	.get('/delete/:id', (req, res) => {
		dbSzkoly.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Szkoła została usunięta!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/szkoly/list');
			});
	});

app.app.use('/szkoly', routerSzkola);

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
/* CREATE TABLE szkoly_nauczyciele ( -- id_szkoly, id_nauczyciela
	id_szkoly INT,
	id_nauczyciela INT,
	PRIMARY KEY (id_szkoly, id_nauczyciela),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE szkoly_przedmioty ( -- id_szkoly, id_przedmiotu
	id_szkoly INT,
	id_przedmiotu INT,
	PRIMARY KEY (id_szkoly, id_przedmiotu),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id)
); */
/* CREATE TABLE szkoly_uczniowie ( -- id_szkoly, id_ucznia
	id_szkoly INT,
	id_ucznia INT,
	PRIMARY KEY (id_szkoly, id_ucznia),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id)
); */
/* CREATE TABLE klasy ( -- id_szkoly, id_profilu_klasy, id_wychowawcy
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(20) NOT NULL,
	ilosc_uczniow INT DEFAULT 0,
	id_szkoly INT,
	id_profilu_klasy INT,
	id_wychowawcy INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_profilu_klasy) REFERENCES profile_klas(id),
	FOREIGN KEY (id_wychowawcy) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE sale ( -- id_szkoly, id_typu_sali, id_opiekuna
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL,
	ilosc_miejsc INT,
	id_szkoly INT,
	id_typu_sali INT,
	id_opiekuna INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_typu_sali) REFERENCES typy_sal(id),
	FOREIGN KEY (id_opiekuna) REFERENCES nauczyciele(id)
); */
/* CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	godzina_lekcyjna INT,
	data DATETIME,
	id_szkoly INT,
	id_klasy INT,
	id_przedmiotu INT,
	id_sali INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_klasy) REFERENCES klasy(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_sali) REFERENCES sale(id),
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id)
); */

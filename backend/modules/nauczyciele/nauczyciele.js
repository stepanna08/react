import app from '../app.js';
import dbNauczyciele from './dbNauczyciele.js';

const routerNauczyciel = app.getRouter()
	.get('/list', (req, res) => {
		req.session.selectedSchoolId = null;
		req.session.selectedSchoolName = 'Wybierz szkołę';
		dbNauczyciele.getAll().then(nauczyciele => {
			app.generujLayout('nauczyciele/lista', res, { nauczyciele: nauczyciele }, 'Lista nauczycieli');
		})
		.catch(error => {
			console.log('Błąd pobierania nauczycieli', error);
			app.addError(res, 'Błąd pobierania nauczycieli');
		});
	})
	.get('/details/:id', (req, res) => {
		dbNauczyciele.getById(req.params.id).then(nauczyciel => {
			nauczyciel = nauczyciel[0];
			app.generujLayout('nauczyciele/szczegoly', res, { nauczyciel: nauczyciel }, `Szczegóły nauczyciela: ${nauczyciel.imie} ${nauczyciel.nazwisko}`);
		})
		.catch(err => {
			console.log('Błąd pobierania nauczyciela ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.get('/add', (req, res) => {
		app.generujLayout('nauczyciele/dodaj', res, {}, 'Dodaj nauczyciela');
	})
	.post('/add', (req, res) => {
		var dane = {
			'imie': req.body.imie,
			'nazwisko': req.body.nazwisko,
			'email': req.body.email,
			'telefon': req.body.telefon,
		};
		if (req.body.id_przedmiotu) {
			dane.id_przedmiotu = req.body.id_przedmiotu;
		}
		if (req.body.id_szkoly) {
			dane.id_szkoly = req.body.id_szkoly;
		}
		dbNauczyciele.add(dane)
			.then(result => {
				// console.log('\tDodano result:', result);
				app.addSuccess(res, 'Nauczyciel został dodany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/nauczyciele/list');
			});
	})
	.get('/update/:id', (req, res) => {
		dbNauczyciele.getById(req.params.id).then(nauczyciel => {
			nauczyciel = nauczyciel[0];
			app.generujLayout('nauczyciele/edytuj', res, { nauczyciel: nauczyciel }, `Edytuj nauczyciela`);
		})
		.catch(err => {
			app.addError(res, err);
		});
	})
	.post('/update', (req, res) => {
		var dane = {
			'imie': req.body.imie,
			'nazwisko': req.body.nazwisko,
			'email': req.body.email,
			'telefon': req.body.telefon,
			// 'id_przedmiotu': req.body.id_przedmiotu,
			// 'id_szkoly': req.body.id_szkoly
		};
		dbNauczyciele.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Nauczyciel został zaktualizowany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/nauczyciele/list');
			});
	})
	.get('/delete/:id', (req, res) => {
		dbNauczyciele.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Nauczyciel został usunięty!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/nauczyciele/list');
			});
	})
	.get('/szkola/list', (req, res) => {
		if (!req.session.selectedSchoolId) {
			return res.redirect('/nauczyciele/list');
		}
		dbNauczyciele.getAll(req.session.selectedSchoolId).then(nauczyciele => {
			app.generujLayout('nauczyciele/szkola-lista', res, { nauczyciele: nauczyciele, dodajNauczyciela: req.query.dodajNauczyciela || '' }, 'Lista nauczycieli');
		})
		.catch(error => {
			console.log('Błąd pobierania nauczycieli', error);
			app.addError(res, 'Błąd pobierania nauczycieli');
		});
	})
	.get('/szkola/add', (req, res) => {
		dbNauczyciele.getSelect(0, 0, 'name="id_nauczyciela" id="id_nauczyciela"').then(nauczyciele => {
			app.generujLayout('nauczyciele/szkola-dodaj', res, { nauczyciele: nauczyciele }, 'Dodaj nauczyciela');
		}).catch(err => {
			console.log('Błąd pobierania nauczycieli', err);
			app.addError(res, err);
		});
	})
	.post('/szkola/add', (req, res) => {
		var dane = {
			'id_szkoly': req.session.selectedSchoolId,
			'id_nauczyciela': req.body.id_nauczyciela,
		};
		dbNauczyciele.addToSzkola(dane)
			.then(result => {
				app.addSuccess(res, 'Nauczyciel został dodany do szkoły!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/nauczyciele/szkola/list');
			});
	})
	.get('/szkola/delete/:id_nauczyciela', (req, res) => {
		var dane = {
			'id_szkoly': req.session.selectedSchoolId,
			'id_nauczyciela': req.params.id_nauczyciela,
		};
		dbNauczyciele.deleteFromSzkola(dane)
			.then(result => {
				app.addSuccess(res, 'Nauczyciel został usunięty!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/nauczyciele/szkola/list');
			});
	});

app.app.use('/nauczyciele', routerNauczyciel);

async function getNauczycieleSelect(selectedId = '') {
	const nauczyciele = await dbNauczyciele.getAll();
	let html = '<select name="id_nauczyciela">\n';
	html += '<option value="">-- wybierz nauczyciela --</option>\n';
	nauczyciele.forEach(nauczyciel => {
		const selected = nauczyciel.id == selectedId ? ' selected' : '';
		html += `<option value="${nauczyciel.id}"${selected}>${nauczyciel.imie} ${nauczyciel.nazwisko}</option>\n`;
	});
	html += '</select>';
	return html;
}

export { getNauczycieleSelect };

/* CREATE TABLE nauczyciele (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */
/* CREATE TABLE szkoly ( -- id_szkoly, id_nauczyciela
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
/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_ucznia INT,
	id_przedmiotu INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id)
); */

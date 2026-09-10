import app from '../app.js';
import dbPrzedmioty from './dbPrzedmioty.js';

const routerPrzedmiot = app.getRouter()
	.get('/list', (req, res) => {
		req.session.selectedSchoolId = null;
		req.session.selectedSchoolName = 'Wybierz szkołę';
		dbPrzedmioty.getAll().then(przedmioty => {
			app.generujLayout('przedmioty/lista', res, { przedmioty: przedmioty }, 'Lista przedmiotów');
		})
		.catch(error => {
			console.log('Błąd pobierania przedmiotów', error);
			app.addError(res, 'Błąd pobierania przedmiotów');
		});
	})
	.get('/list/:id', (req, res) => {
		app.pageBegin(res).then(() => {
			dbPrzedmioty.getAll().then(przedmioty => {
				res.write('<h2>Lista przedmiotów:</h2>\n');
				if (przedmioty.length) {
					przedmioty.forEach(przedmiot => {
						res.write(`<p><a class="btn" href="/przedmioty/details/${przedmiot.id}">${przedmiot.nazwa}</a></p>\n`);
					});
				} else {
					res.write('<p>brak przedmiotów</p>\n');
				}
				res.write('<p><a class="btn" href="/przedmioty/add">Dodaj przedmiot</a></p>\n');
			})
			.catch(err => {
				app.addError(res, err);
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
		dbPrzedmioty.getById(req.params.id).then(przedmiot => {
			przedmiot = przedmiot[0];
			app.generujLayout('przedmioty/szczegoly', res, { przedmiot: przedmiot }, `Szczegóły przedmiotu: ${przedmiot.nazwa}`);
		})
		.catch(err => {
			console.log('Błąd pobierania przedmiotu ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.get('/add', (req, res) => {
		app.generujLayout('przedmioty/dodaj', res, {}, 'Dodaj przedmiot');
	})
	.post('/add', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa
		};
		dbPrzedmioty.add(dane)
			.then(result => {
				// console.log('\tDodano result:', result);
				app.addSuccess(res, 'Przedmiot został dodany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/przedmioty/list');
			});
	})
	.get('/update/:id', (req, res) => {
		dbPrzedmioty.getById(req.params.id).then(przedmiot => {
			przedmiot = przedmiot[0];
			app.generujLayout('przedmioty/edytuj', res, { przedmiot: przedmiot }, `Edytuj przedmiot`);
		})
		.catch(err => {
			app.addError(res, err);
		});
	})
	.post('/update', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa
		};
		dbPrzedmioty.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Przedmiot został zaktualizowany!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/przedmioty/list');
			});
	})
	.get('/delete/:id', (req, res) => {
		dbPrzedmioty.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Przedmiot został usunięty!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/przedmioty/list');
			});
	})
	.get('/szkola/list', (req, res) => {
		if (!req.session.selectedSchoolId) {
			return res.redirect('/przedmioty/list');
		}
		dbPrzedmioty.getAll(req.session.selectedSchoolId).then(przedmioty => {
			app.generujLayout('przedmioty/szkola-lista', res, { przedmioty: przedmioty, dodajPrzedmiot: req.query.dodajPrzedmiot || '' }, 'Lista przedmiotów');
		})
		.catch(error => {
			console.log('Błąd pobierania przedmiotów', error);
			app.addError(res, 'Błąd pobierania przedmiotów');
		});
	})
	.get('/szkola/add', (req, res) => {
		dbPrzedmioty.getSelect().then(przedmioty => {
			app.generujLayout('przedmioty/szkola-dodaj', res, { przedmioty: przedmioty }, 'Dodaj przedmiot');
		}).catch(err => {
			console.log('Błąd pobierania przedmiotów', err);
			app.addError(res, err);
		});
	})
	.post('/szkola/add', (req, res) => {
		var dane = {
			'id_szkoly': req.session.selectedSchoolId,
			'id_przedmiotu': req.body.id_przedmiotu,
		};
		dbPrzedmioty.addToSzkola(dane)
			.then(result => {
				app.addSuccess(res, 'Przedmiot został dodany do szkoły!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/przedmioty/szkola/list');
			});
	})
	.get('/szkola/delete/:id_przedmiotu', (req, res) => {
		var dane = {
			'id_szkoly': req.session.selectedSchoolId,
			'id_przedmiotu': req.params.id_przedmiotu,
		};
		dbPrzedmioty.deleteFromSzkola(dane)
			.then(result => {
				app.addSuccess(res, 'Przedmiot został usunięty!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/przedmioty/szkola/list');
			});
	});

app.app.use('/przedmioty', routerPrzedmiot);

/* CREATE TABLE przedmioty (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL
); */
/* CREATE TABLE szkoly_przedmioty ( -- id_szkoly, id_przedmiotu
	id_szkoly INT,
	id_przedmiotu INT,
	PRIMARY KEY (id_szkoly, id_przedmiotu),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id)
); */
/* CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_Przedmiot
	id INT AUTO_INCREMENT PRIMARY KEY,
	godzina_lekcyjna INT,
	data DATETIME,
	id_szkoly INT,
	id_klasy INT,
	id_przedmiotu INT,
	id_sali INT,
	id_Przedmiot INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id),
	FOREIGN KEY (id_klasy) REFERENCES klasy(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_sali) REFERENCES sale(id),
	FOREIGN KEY (id_Przedmiot) REFERENCES przedmioty(id)
); */
/* CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_Przedmiot
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_ucznia INT,
	id_przedmiotu INT,
	id_Przedmiot INT,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id),
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id),
	FOREIGN KEY (id_Przedmiot) REFERENCES przedmioty(id)
); */

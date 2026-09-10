import app from '../app.js';
import dbLekcje from './dbLekcje.js';
import dbPrzedmioty from '../przedmioty/dbPrzedmioty.js';
import dbNauczyciele from '../nauczyciele/dbNauczyciele.js';
import dbKlasy from '../klasy/dbKlasy.js';
import dbSale from '../sale/dbSale.js';

const routerLekcja = app.getRouter()
	.get('/list', (req, res) => {
		dbLekcje.getAll(req.session.selectedSchoolId).then(lekcje => {
			app.generujLayout('lekcje/lista', res, { lekcje: lekcje }, 'Lista lekcji');
		})
		.catch(error => {
			console.log('Błąd pobierania lekcji', error);
			app.addError(res, 'Błąd pobierania lekcji');
		});
	})
	.get('/details/:id', (req, res) => {
		dbLekcje.getById(req.params.id).then(lekcja => {
			lekcja = lekcja[0];
			app.generujLayout('lekcje/szczegoly', res, { lekcja: lekcja }, `Szczegóły lekcji: ${lekcja.nazwa}`);
		})
		.catch(err => {
			console.log('Błąd pobierania lekcji ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.get('/add', (req, res) => {
		Promise.all([
			dbKlasy.getSelect(req.session.selectedSchoolId),
			dbPrzedmioty.getSelect(req.session.selectedSchoolId),
			dbNauczyciele.getSelect(req.session.selectedSchoolId),
			dbSale.getSelect(req.session.selectedSchoolId),
		]).then(([klasy, przedmioty, nauczyciele, sale]) => {
			app.generujLayout('lekcje/dodaj', res, { 
				klasy: klasy, 
				przedmioty: przedmioty, 
				nauczyciele: nauczyciele, 
				sale: sale,
				dniTygodnia: dbLekcje.getDniTygodnia(),
				godzinyLekcyjne: dbLekcje.getGodzinyLekcyjne()
			}, 'Dodaj lekcję');
		}).catch(err => {
			app.addError(res, err);
		});
	})
	.post('/add', (req, res) => {
		var dane = {
			'id_szkoly': req.session.selectedSchoolId,
			'nazwa': req.body.nazwa,
			'id_klasy': req.body.id_klasy,
			'id_przedmiotu': req.body.id_przedmiotu,
			'id_nauczyciela': req.body.id_nauczyciela,
			'id_sali': req.body.id_sali,
			'dzien_tygodnia': req.body.dzien_tygodnia,
			'godzina_lekcyjna': req.body.godzina_lekcyjna
		};
		dbLekcje.add(dane)
			.then(result => {
				// console.log('\tDodano result:', result);
				app.addSuccess(res, 'Lekcja została dodana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/lekcje/list');
			});
	})
	.get('/update/:id', (req, res) => {
		console.log(`GET /lekcje/update/:${req.params.id}`);
		dbLekcje.getById(req.params.id).then((lekcja) => {
			lekcja = lekcja[0];
			Promise.all([
				dbKlasy.getSelect(req.session.selectedSchoolId, lekcja.id_klasy),
				dbPrzedmioty.getSelect(req.session.selectedSchoolId, lekcja.id_przedmiotu),
				dbNauczyciele.getSelect(req.session.selectedSchoolId, lekcja.id_nauczyciela),
				dbSale.getSelect(req.session.selectedSchoolId, lekcja.id_sali),
			]).then(([klasy, przedmioty, nauczyciele, sale]) => {
				app.generujLayout('lekcje/edytuj', res, { 
					lekcja: lekcja,
					klasy: klasy, 
					przedmioty: przedmioty, 
					nauczyciele: nauczyciele, 
					sale: sale,
					dniTygodnia: dbLekcje.getDniTygodnia(lekcja.dzien_tygodnia),
					godzinyLekcyjne: dbLekcje.getGodzinyLekcyjne(lekcja.godzina_lekcyjna)
				}, 'Edytuj lekcję');
			})
			.catch(err => {
				app.addError(res, err);
			});
		})
		.catch(err => {
			app.addError(res, err);
		});
	})
	.post('/update', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
			'id_klasy': req.body.id_klasy,
			'id_przedmiotu': req.body.id_przedmiotu,
			'id_nauczyciela': req.body.id_nauczyciela,
			'id_sali': req.body.id_sali,
			'dzien_tygodnia': req.body.dzien_tygodnia,
			'godzina_lekcyjna': req.body.godzina_lekcyjna,
		};
		dbLekcje.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Lekcja została zaktualizowana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/lekcje/list');
			});
	})
	.get('/delete/:id', (req, res) => {
		dbLekcje.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Lekcja została usunięta!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/lekcje/list');
			});
	});

app.app.use('/lekcje', routerLekcja);

/* CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(100),
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
/* CREATE TABLE przedmioty (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL
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
/* CREATE TABLE nauczyciele (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
); */

import app		from '../app.js';
import dbSale	from './dbSale.js';
import dbTypySal	from '../typySal/dbTypySal.js';
import dbNauczyciele from '../nauczyciele/dbNauczyciele.js';
import dbTypyTablic	from '../typyTablic/dbTypyTablic.js';

const routerSala = app.getRouter()
	.get('/list', (req, res) => {
		dbSale.getAll(req.session.selectedSchoolId).then(sale => {
			app.generujLayout('sale/lista', res, { sale: sale }, 'Lista sal');
		})
		.catch(error => {
			console.log('Błąd pobierania sal', error);
			app.addError(res, 'Błąd pobierania sal');
		});
	})
	.get('/details/:id', (req, res) => {
		dbSale.getById(req.params.id).then(sala => {
			sala = sala[0];
			app.generujLayout('sale/szczegoly', res, { sala: sala }, `Szczegóły sali: ${sala.nazwa}`);
		})
		.catch(err => {
			console.log('Błąd pobierania sali ' + req.params.id, err);
			app.addError(res, err);
		});
	})
	.get('/add', (req, res) => {
		Promise.all([
			dbTypyTablic.getSelect(0, 'id="id_typu_tablicy" name="id_typu_tablicy" multiple'),
			dbTypySal.getSelect(0, 'name="id_typu_sali" id="id_typu_sali"'),
			dbNauczyciele.getSelect(req.session.selectedSchoolId, 0, 'name="id_opiekuna" id="id_opiekuna"'),
		]).then(([typy_tablic, typy_sal, nauczyciele]) => {
			app.generujLayout('sale/dodaj', res, { typy_tablic: typy_tablic, typy_sal: typy_sal, nauczyciele: nauczyciele }, `Dodaj salę`);
		}).catch(err => {
			app.addError(res, err);
		});
	})
	.post('/add', (req, res) => {
		var dane = {
			'nazwa': req.body.nazwa,
			'ilosc_miejsc': req.body.ilosc_miejsc,
			'id_szkoly': req.session.selectedSchoolId,
			'id_typu_sali': req.body.id_typu_sali,
			'id_opiekuna': req.body.id_opiekuna,
			'id_typu_tablicy': req.body.id_typu_tablicy,
		};
		// console.log('dane:', dane); return;
		dbSale.add(dane)
			.then(result => {
				// console.log('\tDodano result:', result);
				app.addSuccess(res, 'Sala została dodana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/sale/list');
			});
	})
	.get('/update/:id', (req, res) => {
		dbSale.getById(req.params.id).then(sala => {
			sala = sala[0];
			Promise.all([
				dbTypySal.getSelect(sala.id_typu_sali, 'name="id_typu_sali" id="id_typu_sali"'),
				dbNauczyciele.getSelect(req.session.selectedSchoolId, sala.id_opiekuna, 'name="id_opiekuna" id="id_opiekuna"'),
				dbTypyTablic.getSelect(sala.typy_tablic, 'id="id_typu_tablicy" name="id_typu_tablicy" multiple'),
			]).then(([typy_sal, nauczyciele, typy_tablic]) => {
				app.generujLayout('sale/edytuj', res, { sala: sala, typy_sal: typy_sal, nauczyciele: nauczyciele, typy_tablic: typy_tablic }, `Edytuj salę`);
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
			'ilosc_miejsc': req.body.ilosc_miejsc,
			// 'id_szkoly': req.session.selectedSchoolId,
			'id_typu_sali': req.body.id_typu_sali,
			'id_opiekuna': req.body.id_opiekuna,
			'id_typu_tablicy': req.body.id_typu_tablicy,
		};
		dbSale.update(req.body.id, dane)
			.then(result => {
				app.addSuccess(res, 'Sala została zaktualizowana!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/sale/details/' + req.body.id);
			});
	})
	.get('/delete/:id', (req, res) => {
		dbSale.delete(req.params.id)
			.then(result => {
				app.addSuccess(res, 'Sala została usunięta!', true);
			})
			.catch(err => {
				app.addError(res, err, true);
			})
			.finally(() => {
				res.redirect('/sale/list');
			});
	});

app.app.use('/sale', routerSala);

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
/* CREATE TABLE typy_sal (
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
/* CREATE TABLE sale_tablice ( -- id_sali, id_typu_tablicy
	id_sali INT,
	id_typu_tablicy INT,
	PRIMARY KEY (id_sali, id_typu_tablicy),
	FOREIGN KEY (id_sali) REFERENCES sale(id),	
	FOREIGN KEY (id_typu_tablicy) REFERENCES typy_tablic(id)
); */
/* CREATE TABLE typy_tablic (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
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

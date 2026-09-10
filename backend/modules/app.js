import express from 'express';
import cors from 'cors';
import { db, logDbError } from './db/db.js';
import session from 'express-session';
import flash from 'express-flash';
import dbSzkoly from './szkoly/dbSzkoly.js';
import path from 'path';
import { fileURLToPath } from 'url';

/* todo
start aplikacji. 'Wybierz szkołę' zamiast listy szkół i dodanania nowej szkoły
usuwanie nauczyciela przypisanego do szkoly - brak komunikatu
*/

class App {
	db = db;
	szkoly = [];
	btnAnuluj = '<a onclick="window.history.go(-1)" class="btn">anuluj</a> &nbsp;  &nbsp;';
	btnZapisz = '<input type="submit" value="zapisz" />';
	btnDodaj = '<input type="submit" value="dodaj" />';
	btnUsun(url) {
		return `<a class="btn" onclick="if(confirm('Czy na pewno chcesz usunąć?')) { window.location.href='${url}'; }">Usuń</a> &nbsp; &nbsp;`;
	}
	constructor() {
		// console.log('tworze App');
		// this.db.connect(err => {
		// 	if (err) {
		// 		console.error('Błąd połączenia z MySQL:', err);
		// 	} else {
		// 		console.log('Połączono z bazą MySQL');
		// 	}
		// });
		dbSzkoly.getAll()
			.then(results => {
				this.szkoly = results;
				// console.log('Wczytano listę szkół:', this.szkoly);
			})
			.catch(err => {
				console.error('Błąd pobierania listy szkół:', err);
			});

		this.port = 3000;
		this.root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../'); // sciezka absolutna do katalogu projektu
		// console.log('Root path:', this.root);
		this.app = express();
		this.app
			.use(express.static(this.root + 'public')) // obsługa plików statycznych z katalogu public
			.use(express.urlencoded({ extended: true })) // obsługa danych z formularzy
			.use(express.json()) // obsługa danych JSON
			.use((req, res, next) => {
				console.log(req.method + '	', req.originalUrl);
				next();
			})
			.use((req, res, next) => {
				console.log('Setting headers for request:', req.originalUrl);
				res.setHeader('Content-Type', 'text/html; charset=utf-8');
				res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
				res.setHeader('Pragma', 'no-cache');
				res.setHeader('Expires', '0');
				res.setHeader('Max-Age', '0');
				res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200, http://localhost:4201, http://localhost:4202');
				res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
				res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
				next();
			})
			.use(session({
				secret: 'T@jny-Kluc2-D0-52yfr0w@n!@-M!n-32-2n@k!-N@jlep!ej-Wygener0w@ny-L050w0',
				resave: false, // zapisywac sesję przy każdym żądaniu, nawet bez zmian? Zwykle false
				saveUninitialized: true, // zapisywać nową sesję, zanim zostanie zmodyfikowana? Zwykle true
				cookie: {
					maxAge: 1000 * 60 * 30
				}
			}))
			.use(flash())
			.set('views', './modules/') // path.join(this.root, 'modules')
			.set('view engine', 'ejs')
			.use(cors({ origin: ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:4202'] }));
		console.log('	root:', path.join(this.root, 'modules'))
	}
	/* preperDestroy() {
		process.on('SIGINT', () => { // Obsługa Ctrl+C
			this.destroy();
			process.exit(0);
		});
		process.on('SIGTERM', () => { // Obsługa Ctrl+C
			this.destroy();
			process.exit(0);
		});
		process.on('uncaughtException', () => { // Obsługa końca przez błąd
			this.destroy();
			process.exit(1);
		});
	} */
	destroy() {
		this.db.close(err => {
			if (err) {
				console.error('Błąd rozłączania z MySQL:', err);
			} else {
				console.log('Rozłączono z bazą MySQL');
			}
		});
	}
	async pageBegin(res) {
		// res.setHeader('Content-Type', 'text/html; charset=utf-8');
		// res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
		// res.setHeader('Pragma', 'no-cache');
		// res.setHeader('Expires', '0');
		// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
		// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		// res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

		var selectedSchoolId = res.req.session.selectedSchoolId || '';
		var selectedSchoolName = res.req.session.selectedSchoolName || '';
		return dbSzkoly.getSelect(selectedSchoolId, 'id="schoolSelect" onchange="window.location.href=\'/szkoly/select/\' + this.value"')
			.then(szkolySelect => {
				let flashError = res.req.flash('error');
				let flashSuccess = res.req.flash('success');
				res.write(`<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>System zarządzania szkołami</title>
	<link rel="stylesheet" href="/style.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
	<h1>
		${selectedSchoolId ? `Zarządzanie szkołą ${selectedSchoolName} (ID: ${selectedSchoolId})` : 'System zarządzania szkołami'}
	</h1>
	<div class="container">
		<div class="left-panel">
			<nav>
				<ul>
					<li>
						${szkolySelect}
						<ul>
							${selectedSchoolId ?
								`<li><a href="/szkoly/details"><i class="fas fa-info-circle"></i> &nbsp; &nbsp; Szczegóły szkoły</a></li>
								<li><a href="/klasy/list"><i class="fas fa-users"></i> &nbsp; &nbsp; Klasy</a></li>
								<li><a href="/lekcje/list"><i class="fas fa-clock"></i> &nbsp; &nbsp; Lekcje</a></li>
								<li><a href="/nauczyciele/szkola/list"><i class="fas fa-chalkboard-teacher"></i> &nbsp; &nbsp; Nauczyciele</a></li>
								<li><a href="/przedmioty/szkola/list"><i class="fas fa-book"></i> &nbsp; &nbsp; Przedmioty</a></li>
								<li><a href="/sale/list"><i class="fas fa-door-open"></i> &nbsp; &nbsp; Sale</a></li>
								<li><a href="/uczniowie/szkola/list"><i class="fas fa-user-graduate"></i> &nbsp; &nbsp; Uczniowie</a></li>
								`
							: ''}
						</ul>
					</li>
					<li><a href="/nauczyciele/list"><i class="fas fa-chalkboard-teacher"></i> &nbsp; &nbsp; Nauczyciele</a></li>
					<li><a href="/profile-klas/list"><i class="fas fa-chalkboard-teacher"></i> &nbsp; &nbsp; Profile klas</a></li>
					<li><a href="/przedmioty/list"><i class="fas fa-book"></i> &nbsp; &nbsp; Przedmioty</a></li>
					<li><a href="/typy-sal/list"><i class="fas fa-chalkboard-teacher"></i> &nbsp; &nbsp; Typy sal</a></li>
					<li><a href="/typy-tablic/list"><i class="fas fa-chalkboard-teacher"></i> &nbsp; &nbsp; Typy tablic</a></li>
					<li><a href="/uczniowie/list"><i class="fas fa-user-graduate"></i> &nbsp; &nbsp; Uczniowie</a></li>
				</ul>
			</nav>
		</div>
		<div class="right-panel">
			<div id="content">
				${flashError.length ? `<div class="error">${flashError}</div>` : ''}
				${flashSuccess.length ? `<div class="success">${flashSuccess}</div>` : ''}`);
			})
			.catch(err => {
				res.write('Błąd pobierania listy szkół: ' + err);
				this.pageEnd(res);
			})
			// .finally(() => {});
	}
	pageEnd(res) {
		res.write(`
			</div>
		</div>
	</div>
</body>
</html>`);
		res.end();
	}
	addError(res, err, useFlash = false) {
		if (useFlash) {
			res.req.flash('error', err.message);
		} else {
			res.write(`<div class="error">${err.message}</div>`);
		}
	}
	addSuccess(res, msg = '', useFlash = false) {
		if (useFlash) {
			res.req.flash('success', msg);
		} else {
			res.write(`<div class="success">${msg}</div>`);
		}
	}
	getRouter() {
		return express.Router();
	}
	async generujLayout(layout, res, data, title = '') {
		try {
			console.log('	[generujLayout]	layout:', layout); // D:/t1/zaawansowaneWebowe/node/modules/app/layout
			res.render(layout, data, (error, content) => {
				if (error) {
					console.log('	[generujLayout]	błąd renderowania "' + layout + '":', error);
					throw error;
				}

				try {
					// console.log('		rendering "layout/index"');
					return dbSzkoly.getSelect(res.req.session.selectedSchoolId || 0, 'id="schoolSelect" onchange="window.location.href=\'/szkoly/select/\' + this.value"')
						.then(szkolySelect => {
							// console.log('		generujLayout - render index');
							res.render(
								'layout/index',
								{
									title: title,
									szkolySelect: szkolySelect,
									selectedSchoolId: res.req.session.selectedSchoolId,
									selectedSchoolName: res.req.session.selectedSchoolName,
									flashError: res.req.flash('error'),
									flashSuccess: res.req.flash('success'),
									content: content,
								},
								(error, html) => {
									// console.log('	rendered layout/index');
									if (error) {
										console.log('	błąd renderowania layout/index:', error);
										throw error;
									}
									// console.log('	sending ' + html);
									res.write(html);
									res.end();
								}
							);
						})
						.catch(err => {
							res.write('Błąd podczas pobierania szkół "' + layout + '":', err);
						});
				} catch (error) {
					console.log('	[generujLayout]	błąd renderowania "' + layout + '":', error);
				}
			});
		} catch (error) {
			console.log('	[generujLayout]	błąd renderowania "' + layout + '":', error);
		}
	}
}

const app = new App();
app.app
	.get('/szkoly', (req, res) => {
		res.redirect('/szkoly/list'); /*
		app.generujLayout('szkoly/szczegoly', res, { szkola: false }, 'Strona glowna'); /*
		app.pageBegin(res).then(() => {
			res.write(`<h2>Strona główna</h2>\n<p>Wybierz jedną z opcji z menu po lewej stronie.</p>\n`);
			app.pageEnd(res);
		}); /* */
	})
	.get('/', (req, res) => {
		res.redirect('/szkoly/list'); /*
		app.generujLayout('szkoly/szczegoly', res, { szkola: false }, 'Strona glowna'); /*
		app.pageBegin(res).then(() => {
			res.write(`<h2>Strona główna</h2>\n<p>Wybierz jedną z opcji z menu po lewej stronie.</p>\n`);
			app.pageEnd(res);
		}); /* */
	})
	.listen(app.port, () => {
		console.log('\nSerwer dostepny pod adresem http://localhost:' + app.port + '/szkoly');
	});

export default app;

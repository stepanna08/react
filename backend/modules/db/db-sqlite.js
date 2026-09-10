import Database from 'better-sqlite3';

export class DbSqlite3 {
	/**
	 * Creates a new DbSqlite3 instance
	 * @param {string} dbFilePath - Path to the SQLite database file
	 */
	constructor(dbFilePath) {
		this.db = new Database(dbFilePath);
	}

	/**
	 * Executes a SQL query and returns all matching rows
	 * @param {string} sql - The SQL query to execute
	 * @param {Array} [params=[]] - Parameters to bind to the SQL query
	 * @returns {Promise<Array>} Promise that resolves to array of objects representing all rows that match the query
	 */
	async select(sql, params = [], context = '') {
		// console.log('\t[db-sqlite.select]\tsql:', sql, ' params:', params, 'fixed:', this.fixParams(params), ' context:', context);
		return new Promise((resolve, reject) => {
			try {
				var results = this.db.prepare(sql);
				// console.log('\t\tquery:', results.source, ' params:', this.fixParams(params));
				results = results.all(...this.fixParams(params));
				// if (params.length) {
				// } else {
				// 	results = results.all();
				// }

				// if (!results || !results.length) {
				// 	return reject(logDbError('Brak danych', context));
				// }

				resolve(results);
			} catch (error) {
				console.log('error:', error);
				reject(logDbError(error, context));
			}
		});
	}

	/**
	 * Executes a SQL statement that doesn't return data (INSERT, UPDATE, DELETE)
	 * @param {string} sql - The SQL statement to execute
	 * @param {Array} [params=[]] - Parameters to bind to the SQL statement
	 * @returns {Promise<Object>} Promise that resolves to result object containing changes, lastInsertRowid, etc.
	 */
	async run(sql, params = [], context = '') {
		// console.log('\t[db-sqlite.run]\tsql:', sql, ' params:', params, ' context:', context);
		return new Promise((resolve, reject) => {
			try {
				const query = this.db.prepare(sql);
				let result = query.run(...this.fixParams(params));
				resolve(result); // { changes: 1, lastInsertRowid: 17 }
			} catch (error) {
				reject(logDbError(error, context));
			}
		});
	}

	/**
	 * Executes an INSERT SQL statement
	 * @param {string} sql - The SQL statement to execute
	 * @param {Array} [params=[]] - Parameters to bind to the SQL statement
	 * @returns {Promise<Object>} Promise that resolves to result object containing changes, lastInsertRowid, etc.
	 */
	async insert(sql, params = [], context = '') {
		return new Promise((resolve, reject) => {
			try {
				sql = sql.replace(/insert ignore into/i, 'INSERT OR IGNORE INTO');
				// console.log('\t[db-sqlite.insert]\t', '\n\t\tsql:', sql, '\n\t\tparams:', params);

				if (sql.toLowerCase().indexOf(' set ?') !== -1 && params) {
					// console.log('\t\tbefore fix sql:', sql, ' params:', params);
					let keys;
					if (Array.isArray(params) && params.length && typeof params[0] === 'object' && !Array.isArray(params[0])) {
						keys = Object.keys(params[0]);
						let set, values = [];
						sql = sql.replace(/ set \?/i, ' (' + keys.join(', ') + ') values ');
						set = '(' + keys.map(() => '?').join(', ') + ')';
						keys = [];
						for (let param of params) {
							keys.push(set);
							// param = Object.values(param);
							values.push(... Object.values(param));
						}
						sql += keys.join(', ');
						params = values;
					} else {
						keys = Object.keys(params);
						sql = sql.replace(/ set \?/i, ' (' + keys.join(', ') + ') values (' + keys.map(() => '?').join(', ') + ')');
						params = [... Object.values(params)];
					}
					// console.log('\t\tafter fix sql:', sql, ' params:', params);
				}
				this.run(sql, params, context)
					.then(result => {
						// console.log('\t\tresult:', result);
						resolve(result);
					})
					.catch(error => {
						reject(error);
					});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * Executes an UPDATE SQL statement
	 * @param {string} sql - The SQL statement to execute
	 * @param {Array} [params=[]] - Parameters to bind to the SQL statement
	 * @returns {Promise<Object>} Promise that resolves to result object containing changes, lastInsertRowid, etc.
	 */
	async update(sql, params = [], context = '') {
		// console.log('\t[db-sqlite.update]\tsql:', sql, ' params:', params, ' context:', context);
		if (sql.toLowerCase().indexOf(' set ?') !== -1) {
			// console.log('\t\tfixParams params:', params);
			if (params.length && typeof params[0] === 'object' && !Array.isArray(params[0])) {
				let newParams = [];
				const keys = Object.keys(params[0]);
				const values = Object.values(params[0]);
				newParams = values;
				sql = sql.replace(/ set \?/i, ' SET ' + keys.map(key => `${key} = ?`).join(', '));
				newParams.push(params[1]);
				params = newParams;
			}
			// console.log('\t\tafter set fix sql:', sql, ' params:', params);
		}
		return this.run(sql, params, context);
	}

	/**
	 * Executes a DELETE SQL statement
	 * @param {string} sql - The SQL statement to execute
	 * @param {Array} [params=[]] - Parameters to bind to the SQL statement
	 * @returns {Promise<Object>} Promise that resolves to result object containing changes, lastInsertRowid, etc.
	 */
	async delete(sql, params = [], context = '') {
		return this.run(sql, params, context);
	}

	/**
	 * Executes a SQL query and returns the first matching row
	 * @param {string} sql - The SQL query to execute
	 * @param {Array} [params=[]] - Parameters to bind to the SQL query
	 * @returns {Promise<Object|undefined>} Promise that resolves to first row that matches the query, or undefined if no matches
	 */
	async one(sql, params = [], context = '') {
		return new Promise((resolve, reject) => {
			try {
				const results = this.db.prepare(sql).get(...this.fixParams(params));

				if (!results || !results.length) {
					return reject(logDbError('Brak danych', context));
				}

				resolve(results);
			} catch (error) {
				reject(logDbError(error, context));
			}
		});
	}

	/**
	 * Closes the database connection
	 * @returns {Promise<void>} Promise that resolves when the database connection is closed
	 */
	async close() {
		return new Promise((resolve, reject) => {
			try {
				this.db.close();
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	fixParams(params) {
		// console.log('\t[db-sqlite.fixParams]\tbefore:', params);
		if (!params) {
			params = [];
		} else if (!Array.isArray(params)) {
			params = [params];
		} else if (!params[0]) {
			params = [];
		}
		// console.log('\t\tafter:', params);
		return params;
	}
}

export function logDbError(error, context = '') {
	if (typeof error === 'string') {
		let msg = error;
		error = new Error(msg);
		error.message = msg;
		error.code = 'ER_NO_DB_ERROR';
	} else {
		error.msg = error.toString().replace('SqliteError: ', '');
		switch (error.code) {
			case 'SQLITE_CONSTRAINT_PRIMARYKEY':
				// error.message = 'Wystąpił błąd bazy danych.';
				error.message = 'Wybrany klucz już istnieje';
				break;

			case 'SQLITE_ERROR':
				// error.message = 'Wystąpił błąd bazy danych.';
				error.message = 'Błąd zapytania bazy danych: ' + error.msg;
				break;

			case 'ER_DUP_ENTRY':
				error.message = 'Nie można dodać wpisu, ponieważ już istnieje.';
				break;

			case 'ER_ROW_IS_REFERENCED_2':
				error.message = 'Nie można usunąć wpisu, ponieważ jest on powiązany z innym.';
				break;

			case 'ER_NO_REFERENCED_ROW_2':
				error.message = 'Nie można dodać wpisu, ponieważ element, do którego się odwołuje, nie istnieje.';
				break;

			default:
				console.log(`Nieobsługiwany błąd bazy danych (${error.code}): ${error.msg}`);
				error.message = `Wystąpił błąd bazy danych (${error.msg})`;
		}
	}

	console.log(`Error in ${context}: ${error.message}`);

	return error;
};

/* 	import Database from 'better-sqlite3';
const db = new Database('db/baza.db');
const rows = db.prepare('SELECT * FROM szkoly').all();
console.log(rows);
*/

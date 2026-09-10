import mysql from 'mysql2';

export class DbMySql {
	/**
	 * Creates a new DbMySql instance
	 * @param {string} host - Database host
	 * @param {string} user - Database user
	 * @param {string} password - Database password
	 * @param {string} database - Database name
	 * @param {boolean} nestTables - Whether to nest tables in results
	 * @param {number} connectionLimit - Maximum number of connections in the pool
	 */
	constructor(host, user, password, database, nestTables = false, connectionLimit = 10) {
		this.db = mysql.createPool({
			host: host,
			user: user,
			password: password,
			database: database,
			nestTables: nestTables,
			connectionLimit: connectionLimit
		});
	}

	/**
	 * Executes a SQL statement that doesn't return data (INSERT, UPDATE, DELETE)
	 * @param {string} sql - The SQL statement to execute
	 * @param {Array} [params=[]] - Parameters to bind to the SQL statement
	 * @returns {Promise<Object>} Promise that resolves to result object containing changes, lastInsertRowid, etc.
	 */
	run(sql, params = [], context = '') {
		return new Promise((resolve, reject) => {
			this.db.query(sql, params, (error, results) => {
				if (error) {
					reject(logDbError(error, context));
				} else {
					resolve(results);
				}
			});
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
			this.run(sql, params, context).then(result => {
				resolve(result.insertId);
			}).catch(error => {
				reject(error);
			});
		});
	}

	/**
	 * Executes an UPDATE SQL statement
	 * @param {string} sql - The SQL statement to execute
	 * @param {Array} [params=[]] - Parameters to bind to the SQL statement
	 * @returns {Promise<Object>} Promise that resolves to result object containing changes, lastInsertRowid, etc.
	 */
	async update(sql, params = [], context = '') {
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
	
	select(sql, params = [], context = '') {
		return new Promise((resolve, reject) => {
			this.db.query(sql, params, (error, results) => {
				if (error) {
					return reject(logDbError(error, context));
				}

				if (!results || !results.length) {
					return reject(logDbError('Brak danych', context));
				}

				resolve(results);
			});
		});
	}

	close() {
		this.db.end();
	}
}

export function logDbError(error, context = '') {
	if (typeof error === 'string') {
		let msg = error;
		error = new Error(msg);
		error.message = msg;
		error.code = 'ER_NO_DB_ERROR';
	} else {
		switch (error.code) {
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
				console.log('Nieobsługiwany błąd bazy danych:', error);
				error.message = 'Wystąpił błąd bazy danych.';
		}
	}

	console.log(`Error in ${context}: ${error.message}`);

	return error;
};

import { DbSqlite3, logDbError } from './db-sqlite.js';
export const db = new DbSqlite3('./modules/db/szkoly.db');

/* import { DbMySql, logDbError } from 'db-mysql';
export const db = new DbMySql(
	'localhost',	//	host
	'szkoly',	//	user
	'1qaz!QAZ',	//	password
	'szkoly',	//	database
	true,	//	nestTables
	10	//	connectionLimit
); /**/

export { logDbError };

export const fixSelectedIds = selectedIds => {
	if (Array.isArray(selectedIds)) {
		selectedIds = selectedIds.map(tablica => parseInt(tablica.id, 10));
	} else {
		selectedIds = [selectedIds];
	}

	return selectedIds;
};

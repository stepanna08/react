export const USER_TYPE = {
	ADMIN: 1,	
	EMPLOYEE: 2,	
	CUSTOMER: 3,
};

export default class User {
    constructor(login, userType = USER_TYPE.CUSTOMER, name = '', surname = '') {
        this.login = login;
		this.userType = userType;
		this.name = name;
		this.surname = surname;
    }

	getLogin() {
		return this.login;
	}
	setUserType(userType) {
		this.userType = userType;
	}
	getUserType() {
		return this.userType;
	}

	setName(name) {
        this.name = name;
    }
	getName() {
		return this.name;
	}
	setSurname(surname) {
		this.surname = surname;
	}
	getSurname() {
		return this.surname;
	}
	getFullName() {
		return `${this.name} ${this.surname}`;
	}
}

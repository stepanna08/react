CREATE DATABASE IF NOT EXISTS szkoly
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_unicode_ci;

USE szkoly;

DROP TABLE IF EXISTS `oceny`, `lekcje`, `sale_tablice`, `sale`, `klasy_uczniowie`, `klasy`, `szkoly_uczniowie`, `szkoly_przedmioty`, `szkoly_nauczyciele`, `szkoly`, `uczniowie`, `przedmioty`, `nauczyciele`, `typy_tablic`, `typy_sal`, `profile_klas`;

CREATE TABLE profile_klas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
);
INSERT INTO profile_klas (nazwa) VALUES
	('Technik Programista'),
	('Technik Informatyk'),
	('Technik Teleinformatyk'),
	('Technik Grafik Komputerowy'),
	('Technik Robotyk'),
	('Technik Mechatronik'),
	('Technik Elektronik');


CREATE TABLE typy_sal (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
);
INSERT INTO typy_sal (nazwa) VALUES
	('Programistyczna'),
	('Informatyczna'),
	('Sieciowa'),
	('Graficzna'),
	('Robotyczna'),
	('Mechatroniczna'),
	('Elektroniczna');


CREATE TABLE typy_tablic (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(30) UNIQUE NOT NULL
);
INSERT INTO typy_tablic (nazwa) VALUES
	('Zwykla'),
	('Interaktywna'),
	('Rzutnik');


CREATE TABLE nauczyciele (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
);
INSERT INTO nauczyciele (imie, nazwisko, telefon, email) VALUES
	('Nauczyciel', 'Pierwszy', '123456', 'pierwszy@nauczyciele.pl'),
	('Nauczyciel', 'Drugi', '234567', 'drugi@nauczyciele.pl'),
	('Nauczyciel', 'Trzeci', '345678', 'trzeci@nauczyciele.pl'),
	('Nauczyciel', 'Czwarty', '456789', 'czwarty@nauczyciele.pl'),
	('Nauczyciel', 'Piąty', '567890', 'piaty@nauczyciele.pl'),
	('Nauczyciel', 'Szósty', '678901', 'szosty@nauczyciele.pl');


CREATE TABLE przedmioty (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL,
	ilosc_godzin INT NOT NULL default 0
);
INSERT INTO przedmioty (nazwa, ilosc_godzin) VALUES
	('Algorytmy', 30),
	('Angular', 31),
	('Node', 32),
	('Python', 33),
	('PHP i JS', 34),
	('Bazy danych', 35);


CREATE TABLE uczniowie (
	id INT AUTO_INCREMENT PRIMARY KEY,
	imie VARCHAR(50) NOT NULL,
	nazwisko VARCHAR(50) NOT NULL,
	telefon VARCHAR(20),
	email VARCHAR(100)
);
INSERT INTO uczniowie (imie, nazwisko, telefon, email) VALUES
	('Uczeń', 'Pierwszy', '345678', 'pierwszy@uczniowie.pl'),
	('Uczeń', 'Drugi', '456789', 'drugi@uczniowie.pl'),
	('Uczeń', 'Trzeci', '567890', 'trzeci@uczniowie.pl'),
	('Uczeń', 'Czwarty', '678901', 'czwarty@uczniowie.pl'),
	('Uczeń', 'Piąty', '789012', 'piaty@uczniowie.pl'),
	('Uczeń', 'Szósty', '890123', 'szosty@uczniowie.pl');


CREATE TABLE szkoly ( -- id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(100) NOT NULL,
	adres VARCHAR(200),
	telefon VARCHAR(20),
	email VARCHAR(100),
	www VARCHAR(100),
	id_dyrektora INT DEFAULT NULL,
	FOREIGN KEY (id_dyrektora) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO szkoly (nazwa, adres, telefon, email, www) VALUES
	('SP1', 'Szkolna 1, 05-500 Piaseczno', '123456789', 'sp1@szkola.pl', 'https://szkola.pl/sp1'),
	('SP2', 'Szkolna 2, 05-500 Piaseczno', '234567890', 'sp2@szkola.pl', 'https://szkola.pl/sp2');


CREATE TABLE szkoly_nauczyciele ( -- id_szkoly, id_nauczyciela
	id_szkoly INT,
	id_nauczyciela INT,
	PRIMARY KEY (id_szkoly, id_nauczyciela),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO szkoly_nauczyciele (id_szkoly, id_nauczyciela) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 4),
	(2, 5),
	(2, 6);


CREATE TABLE szkoly_przedmioty ( -- id_szkoly, id_przedmiotu
	id_szkoly INT,
	id_przedmiotu INT,
	PRIMARY KEY (id_szkoly, id_przedmiotu),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO szkoly_przedmioty (id_szkoly, id_przedmiotu) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 4),
	(2, 5),
	(2, 6);


CREATE TABLE szkoly_uczniowie ( -- id_szkoly, id_ucznia
	id_szkoly INT,
	id_ucznia INT,
	PRIMARY KEY (id_szkoly, id_ucznia),
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO szkoly_uczniowie (id_szkoly, id_ucznia) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 4),
	(2, 5),
	(2, 6);


CREATE TABLE klasy ( -- id_szkoly, id_profilu_klasy, id_wychowawcy
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(20) NOT NULL,
	id_szkoly INT,
	id_profilu_klasy INT,
	id_wychowawcy INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_profilu_klasy) REFERENCES profile_klas(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_wychowawcy) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO klasy (nazwa, id_szkoly, id_profilu_klasy, id_wychowawcy) VALUES
	('1A', 1, 1, 1),
	('1B', 1, 2, 2),
	('1C', 1, 3, 3),
	('2A', 2, 4, 4),
	('2B', 2, 5, 5),
	('2C', 2, 6, 6);

CREATE TABLE klasy_uczniowie ( -- id_klasy, id_ucznia
	id_klasy INT,
	id_ucznia INT,
	PRIMARY KEY (id_klasy, id_ucznia),
	FOREIGN KEY (id_klasy) REFERENCES klasy(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE sale ( -- id_szkoly, id_typu_sali, id_opiekuna
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(50) NOT NULL,
	ilosc_miejsc INT,
	id_szkoly INT,
	id_typu_sali INT,
	id_opiekuna INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_typu_sali) REFERENCES typy_sal(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_opiekuna) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO sale (nazwa, ilosc_miejsc, id_szkoly, id_typu_sali, id_opiekuna) VALUES
	('101', 15, 1, 1, 1),
	('102', 20, 1, 2, 2),
	('103', 25, 1, 3, 3),
	('201', 15, 2, 4, 4),
	('202', 20, 2, 5, 5),
	('203', 25, 2, 6, 6);


CREATE TABLE sale_tablice ( -- id_sali, id_typu_tablicy
	id_sali INT,
	id_typu_tablicy INT,
	PRIMARY KEY (id_sali, id_typu_tablicy),
	FOREIGN KEY (id_sali) REFERENCES sale(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_typu_tablicy) REFERENCES typy_tablic(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO sale_tablice (id_sali, id_typu_tablicy) VALUES
	(1, 1),
	(1, 2),
	(2, 1),
	(2, 3),
	(3, 2),
	(4, 3),
	(4, 1),
	(5, 2),
	(6, 3);


CREATE TABLE lekcje ( -- id_szkoly, id_klasy, id_przedmiotu, id_sali, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	nazwa VARCHAR(100),
	dzien_tygodnia VARCHAR(20),
	godzina_lekcyjna VARCHAR(20),
	id_szkoly INT,
	id_klasy INT,
	id_przedmiotu INT,
	id_sali INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_klasy) REFERENCES klasy(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_sali) REFERENCES sale(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
insert INTO lekcje (nazwa, dzien_tygodnia, godzina_lekcyjna, id_szkoly, id_klasy, id_przedmiotu, id_sali, id_nauczyciela) VALUES
	('Lekcja 1', 'Poniedziałek', '0 (07:10 - 07:55)', 1, 1, 1, 1, 1),
	('Lekcja 2', 'Wtorek', '1 (08:00 - 08:45)', 1, 2, 2, 2, 2),
	('Lekcja 3', 'Środa', '2 (08:50 - 09:35)', 1, 3, 3, 3, 3),
	('Lekcja 4', 'Czwartek', '3 (09:40 - 10:25)', 2, 4, 4, 4, 4),
	('Lekcja 5', 'Piątek', '4 (10:40 - 11:25)', 2, 5, 5, 5, 5),
	('Lekcja 6', 'Poniedziałek', '5 (11:40 - 12:25)', 2, 6, 6, 6, 6);


CREATE TABLE oceny ( -- id_ucznia, id_przedmiotu, id_nauczyciela
	id INT AUTO_INCREMENT PRIMARY KEY,
	wartosc DECIMAL(3,1),
	opis TEXT,
	data DATE,
	id_szkoly INT,
	id_ucznia INT,
	id_przedmiotu INT,
	id_nauczyciela INT,
	FOREIGN KEY (id_szkoly) REFERENCES szkoly(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_ucznia) REFERENCES uczniowie(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_przedmiotu) REFERENCES przedmioty(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (id_nauczyciela) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

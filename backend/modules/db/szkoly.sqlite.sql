CREATE TABLE profile_klas (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nazwa VARCHAR(30) UNIQUE NOT NULL
);
INSERT INTO typy_tablic (nazwa) VALUES
	('Zwykla'),
	('Interaktywna'),
	('Rzutnik');


CREATE TABLE nauczyciele (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nazwa VARCHAR(100) NOT NULL,
	adres VARCHAR(200),
	telefon VARCHAR(20),
	email VARCHAR(100),
	www VARCHAR(100),
	id_dyrektora INT DEFAULT NULL,
	FOREIGN KEY (id_dyrektora) REFERENCES nauczyciele(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO szkoly (nazwa, adres, telefon, email, www, id_dyrektora) VALUES
	('SP1', 'Szkolna 1, 05-500 Piaseczno', '123456789', 'sp1@szkola.pl', 'https://szkola.pl/sp1', 1),
	('SP2', 'Szkolna 2, 05-500 Piaseczno', '234567890', 'sp2@szkola.pl', 'https://szkola.pl/sp2', 2);


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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	wartosc VARCHAR(3),
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

-- Trigger blokujący usunięcie profilu klasy
CREATE TRIGGER blokuj_usuniecie_profilu_klasy
BEFORE DELETE ON profile_klas
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć profilu klasy, który jest używany w klasach')
	WHERE EXISTS (
		SELECT 1 FROM klasy WHERE id_profilu_klasy = OLD.id
	);
END;

-- Trigger blokujący usunięcie typu sali
CREATE TRIGGER blokuj_usuniecie_typu_sali
BEFORE DELETE ON typy_sal
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć typu sali, który jest używany w salach')
	WHERE EXISTS (
		SELECT 1 FROM sale WHERE id_typu_sali = OLD.id
	);
END;

-- Trigger blokujący usunięcie typu tablicy
CREATE TRIGGER blokuj_usuniecie_typu_tablicy
BEFORE DELETE ON typy_tablic
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć typu tablicy, który jest używany w salach')
	WHERE EXISTS (
		SELECT 1 FROM sale_tablice WHERE id_typu_tablicy = OLD.id
	);
END;

-- Trigger blokujący usunięcie nauczyciela
CREATE TRIGGER blokuj_usuniecie_nauczyciela
BEFORE DELETE ON nauczyciele
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć nauczyciela, który jest dyrektorem szkoły')
	WHERE EXISTS (
		SELECT 1 FROM szkoly WHERE id_dyrektora = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć nauczyciela, który jest wychowawcą klasy')
	WHERE EXISTS (
		SELECT 1 FROM klasy WHERE id_wychowawcy = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć nauczyciela, który jest opiekunem sali')
	WHERE EXISTS (
		SELECT 1 FROM sale WHERE id_opiekuna = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć nauczyciela, który prowadzi lekcje')
	WHERE EXISTS (
		SELECT 1 FROM lekcje WHERE id_nauczyciela = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć nauczyciela, który wystawił oceny')
	WHERE EXISTS (
		SELECT 1 FROM oceny WHERE id_nauczyciela = OLD.id
	);
END;

-- Trigger blokujący usunięcie przedmiotu
CREATE TRIGGER blokuj_usuniecie_przedmiotu
BEFORE DELETE ON przedmioty
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć przedmiotu, który jest używany w szkołach')
	WHERE EXISTS (
		SELECT 1 FROM szkoly_przedmioty WHERE id_przedmiotu = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć przedmiotu, który jest używany w lekcjach')
	WHERE EXISTS (
		SELECT 1 FROM lekcje WHERE id_przedmiotu = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć przedmiotu, który ma oceny')
	WHERE EXISTS (
		SELECT 1 FROM oceny WHERE id_przedmiotu = OLD.id
	);
END;

-- Trigger blokujący usunięcie ucznia
CREATE TRIGGER blokuj_usuniecie_ucznia
BEFORE DELETE ON uczniowie
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć ucznia, który jest przypisany do szkoły')
	WHERE EXISTS (
		SELECT 1 FROM szkoly_uczniowie WHERE id_ucznia = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć ucznia, który jest w klasie')
	WHERE EXISTS (
		SELECT 1 FROM klasy_uczniowie WHERE id_ucznia = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć ucznia, który ma oceny')
	WHERE EXISTS (
		SELECT 1 FROM oceny WHERE id_ucznia = OLD.id
	);
END;

-- Trigger blokujący usunięcie szkoły
CREATE TRIGGER blokuj_usuniecie_szkoly
BEFORE DELETE ON szkoly
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć szkoły, która ma nauczycieli')
	WHERE EXISTS (
		SELECT 1 FROM szkoly_nauczyciele WHERE id_szkoly = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć szkoły, która ma przedmioty')
	WHERE EXISTS (
		SELECT 1 FROM szkoly_przedmioty WHERE id_szkoly = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć szkoły, która ma uczniów')
	WHERE EXISTS (
		SELECT 1 FROM szkoly_uczniowie WHERE id_szkoly = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć szkoły, która ma klasy')
	WHERE EXISTS (
		SELECT 1 FROM klasy WHERE id_szkoly = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć szkoły, która ma sale')
	WHERE EXISTS (
		SELECT 1 FROM sale WHERE id_szkoly = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć szkoły, która ma lekcje')
	WHERE EXISTS (
		SELECT 1 FROM lekcje WHERE id_szkoly = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć szkoły, która ma oceny')
	WHERE EXISTS (
		SELECT 1 FROM oceny WHERE id_szkoly = OLD.id
	);
END;

-- Trigger blokujący usunięcie nauczyciela ze szkoły
CREATE TRIGGER blokuj_usuniecie_nauczyciela_jesli_w_sali
BEFORE DELETE ON szkoly_nauczyciele
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć nauczyciela, który jest przypisany do sali')
	WHERE EXISTS (
		SELECT 1 FROM sale WHERE id_opiekuna = OLD.id_nauczyciela
	);
END;

-- Trigger blokujący usunięcie przedmiotu ze szkoły
CREATE TRIGGER blokuj_usuniecie_przedmiotu_ze_szkoly
BEFORE DELETE ON szkoly_przedmioty
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć przedmiotu ze szkoły, który jest używany w lekcjach')
	WHERE EXISTS (
		SELECT 1 FROM lekcje WHERE id_szkoly = OLD.id_szkoly AND id_przedmiotu = OLD.id_przedmiotu
	);
END;

-- Trigger blokujący usunięcie ucznia ze szkoły
CREATE TRIGGER blokuj_usuniecie_ucznia_ze_szkoly
BEFORE DELETE ON szkoly_uczniowie
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć ucznia ze szkoły, który jest w klasie')
	WHERE EXISTS (
		SELECT 1 FROM klasy_uczniowie ku
		JOIN klasy k ON ku.id_klasy = k.id
		WHERE ku.id_ucznia = OLD.id_ucznia AND k.id_szkoly = OLD.id_szkoly
	);
END;

-- Trigger blokujący usunięcie klasy
CREATE TRIGGER blokuj_usuniecie_klasy
BEFORE DELETE ON klasy
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć klasy, która ma uczniów')
	WHERE EXISTS (
		SELECT 1 FROM klasy_uczniowie WHERE id_klasy = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć klasy, która ma lekcje')
	WHERE EXISTS (
		SELECT 1 FROM lekcje WHERE id_klasy = OLD.id
	);
END;

-- Trigger blokujący usunięcie ucznia z klasy
CREATE TRIGGER blokuj_usuniecie_ucznia_z_klasy
BEFORE DELETE ON klasy_uczniowie
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć ucznia z klasy, który ma oceny')
	WHERE EXISTS (
		SELECT 1 FROM oceny WHERE id_ucznia = OLD.id_ucznia
	);
END;

-- Trigger blokujący usunięcie sali
CREATE TRIGGER blokuj_usuniecie_sali
BEFORE DELETE ON sale
FOR EACH ROW
BEGIN
	SELECT RAISE(ABORT, 'Nie można usunąć sali, która ma przypisane tablice')
	WHERE EXISTS (
		SELECT 1 FROM sale_tablice WHERE id_sali = OLD.id
	);
	SELECT RAISE(ABORT, 'Nie można usunąć sali, w której odbywają się lekcje')
	WHERE EXISTS (
		SELECT 1 FROM lekcje WHERE id_sali = OLD.id
	);
END;

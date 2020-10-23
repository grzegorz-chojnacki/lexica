create database applicationdb;
\c applicationdb;
create table AppUser (
id bigserial not null primary key,
first_name VARCHAR(50) not null,
last_name VARCHAR(50) not null,
password VARCHAR(50) not null,
email varchar(50) not null,
avatar VARCHAR(50) );
insert into AppUser (id, first_name, last_name, password, email, avatar) values (1, 'Lyn', 'Tommaseo', 'mptENwGiyM4', 'aaaaaaa@bd.com', 'Fuscia');
insert into AppUser (id, first_name, last_name, password, email, avatar) values (2, 'Amie', 'Acomb', 'c9Sqqa0Db', 'bbbbbbb@bd.com', 'Goldenrod');
insert into AppUser (id, first_name, last_name, password, email, avatar) values (3, 'Frederich', 'Bastow', 'fn21ot', 'ccccc@bd.com', 'Khaki');
insert into AppUser (id, first_name, last_name, password, email, avatar) values (4, 'Hilde', 'Felten', '1mrKRj', 'ddddddd@bd.com', 'Purple');
insert into AppUser (id, first_name, last_name, password, email, avatar) values (5, 'Fraser', 'Spaule', 'KgFDDVRzVs9', 'eeeee@bd.com', 'Maroon');
insert into AppUser (id, first_name, last_name, password, email, avatar) values (6, 'Erna', 'Yokley', 'g8Ud0YyV4TcI', 'fffff@bd.com', 'Fuscia');
insert into AppUser (id, first_name, last_name, password, email, avatar) values (7, 'Walt', 'Verrick', 'eeXt07', 'ggggg@bd.com', 'Violet');
insert into AppUser (id, first_name, last_name, password, email, avatar) values (8, 'Ossie', 'Capoun', 'hPSy5xgv77X', 'hhhhh@bd.com', 'Fuscia');
insert into AppUser (id, first_name, last_name, password, email, avatar) values (9, 'Damita', 'Fransinelli', 'ixZBpwoH', 'iii@bd.com', 'Yellow');
insert into AppUser (id, first_name, last_name, password, email, avatar) values (10, 'Peggie', 'Gerrelt', '4FdlyZc4I1', 'jjjjjj@bd.com', 'Khaki');

create table Team (
	id bigserial not null primary key,
	Name VARCHAR(50),
	Graphics VARCHAR(50),
	Description VARCHAR(200)
);
insert into Team (id, Name, Graphics, Description) values (1, 'Maggio-Parker', 'Khaki', 'Milt op involving oth dest arcrft, civilian, sequela');
insert into Team (id,  Name, Graphics, Description) values (2, 'Heller-Bosco', 'Aquamarine', 'Contracture, unspecified hip');
insert into Team (id, Name, Graphics, Description) values (3, 'Little Group', 'Fuscia', 'Smith''s fx r radius, subs for opn fx type I/2 w nonunion');
insert into Team (id,  Name, Graphics, Description) values (4, 'Daniel and Sons', 'Orange', 'Stress fracture, right femur, initial encounter for fracture');
insert into Team (id,  Name, Graphics, Description) values (5, 'Schmitt, Walsh and Vandervort', 'Mauv', null);
insert into Team (id,  Name, Graphics, Description) values (6, 'Hickle Group', 'Aquamarine', 'Left sided colitis');
insert into Team (id,  Name, Graphics, Description) values (7, 'MacGyver LLC', 'Crimson', 'Pulsating exophthalmos, left eye');


create table typeOfTask (
id_type_of_task bigserial not null primary key,
graphics varchar(20),
description varchar(200) not null,
name varchar(50) not null,
tasks varchar(10) );

create table TeamHasUser (
idTeam int not null references Team (id),
idUser int not null references AppUser (id)
);

create table Tasks (
	id bigserial not null primary key,
	id_type_of_task INT references typeOfTask(id_type_of_task),
	id_Team INT references Team(id),
	Name VARCHAR(50),
	Description VARCHAR(200),
	activityStatus bool
);
insert into Tasks (id, id_type_of_task, id_Team, Name, Description, activityStatus) values (1, 2, 1, 'Steuber, Corkery and DuBuque', 'Disp fx of unsp tibial tuberosity, 7thC', false);
insert into Tasks (id, id_type_of_task, id_Team, Name, Description, activityStatus) values (2, 3, 2, 'Schiller, Bergnaum and Kuhlman', 'Adverse effect of other viral vaccines', false);
insert into Tasks (id, id_type_of_task, id_Team, Name, Description, activityStatus) values (3, 4, 3, 'Morissette LLC', 'Swimming-pool of mobile home as place', false);
insert into Tasks (id, id_type_of_task, id_Team, Name, Description, activityStatus) values (4, 5, 4, 'Sporer-Nienow', 'Car driver injured in collision w car nontraf, sequela', false);
insert into Tasks (id, id_type_of_task, id_Team, Name, Description, activityStatus) values (5, 6, 5, 'Mueller-Kovacek', 'Corrosion of third degree of unspecified axilla, subs encntr', true);
insert into Tasks (id, id_type_of_task, id_Team, Name, Description, activityStatus) values (6, 7, 6, 'Walsh LLC', 'Other marginal perforations of tympanic membrane, right ear', false);

create table Example (
	id bigserial not null primary key,
	id_Task INT references Tasks(id),
	contents VARCHAR(50)
);
insert into Example (id,  id_Task, contents) values (1,  2, 'Soup - Campbells Chili');
insert into Example (id,  id_Task, contents) values (2, 1, 'Nori Sea Weed');
insert into Example (id,  id_Task, contents) values (3, 2, 'Beans - Turtle, Black, Dry');
insert into Example (id,  id_Task, contents) values (4, 1, 'Pop - Club Soda Can');
insert into Example (id,  id_Task, contents) values (5, 2, 'Chutney Sauce');
insert into Example (id,  id_Task, contents) values (6, 1, 'Tea - Camomele');
insert into Example (id,  id_Task, contents) values (7, 2, 'Pastry - Key Limepoppy Seed Tea');
insert into Example (id,  id_Task, contents) values (8, 1, 'Pants Custom Dry Clean');
insert into Example (id,  id_Task, contents) values (9, 2, 'Bar Mix - Lemon');
insert into Example (id,  id_Task, contents) values (10, 1, 'Smoked Paprika');


create table ProgressOfUser (
	id bigserial not null primary key,
	score INT,
	id_type_of_task INT references typeOfTask(id_type_of_task),
	idUser INT references AppUser(id)
);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (64, 2, 1);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (8, 3, 2);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (31, 4, 3);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (75, 5, 4);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (15, 6, 5);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (15, 7, 6);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (62, 8, 7);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (61, 9, 8);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (69, 10, 9);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (59, 11, 10);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (81, 12, 11);
insert into ProgressOfUser (score, id_type_of_task,  idUser) values (96, 13, 12);

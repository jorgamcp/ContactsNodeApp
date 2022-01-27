/* RDBMS MySQL */
USE contactsnodedb;

CREATE TABLE contacts
(
    contact_id PRIMARY KEY INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) NOT NULL,
    age int NULL
);

insert into contacts(name,age) values('Pepe',34);
insert into contacts(name,age) values('Oscar',14);
insert into contacts(name,age) values('Maria',15);
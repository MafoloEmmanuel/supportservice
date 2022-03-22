create table board(
    id serial not null primary key,
name text,
email varchar(50),
problem char(100)
);
insert into board(name,email,problem) values('EmmanuelM','emmanuelm@foodbev.co.za','My Account is locked out');
insert into board(name,email,problem) values('TwelaneM','twelanem@foodbev.co.za','My Account is locked out');
insert into board(name,email,problem) values('GoitseonaM','goitseonam@foodbev.co.za','My Account is locked out');

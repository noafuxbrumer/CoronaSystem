﻿create database DBCoronaSystem
go 
use DBCoronaSystem
go
create table MembersHealth(
IdMH int primary key identity(1,1),
TZ varchar(9) not null,
NameMH varchar(40) not null,
AddressMH varchar(30) not null,
DateBirth date, 
Tel varchar(9),
MobilePhone varchar(10)
)
create table CoronaMembersHealth(
IdCMH int foreign key REFERENCES MembersHealth(IdMH),
DateRecoveryIllness date
)
create table ManufacturersVaccines(
IdMVS int primary key identity(1,1),
NameMV varchar(40))

CREATE TABLE TheDateOfReceivingTheVaccine(
Id int foreign key REFERENCES MembersHealth(IdMH),
DateReceiptPositiveCorona date,
DateVaccine date,
IdMHS int foreign key REFERENCES ManufacturersVaccines(IdMVS)
  )

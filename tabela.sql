CREATE DATABASE `db_crud_teste`;
CREATE TABLE `tarefas` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `task` varchar(30) DEFAULT NULL,
  `dblocal` varchar(60) DEFAULT NULL,
  `dbtime` int(11) DEFAULT NULL,
  `dbstatus` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
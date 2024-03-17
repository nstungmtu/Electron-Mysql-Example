CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `RoleID` int NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(45) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`RoleID`),
  UNIQUE KEY `RoleName_UNIQUE` (`RoleName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrator','Quản trị viên'),(2,'Manager',NULL),(3,'Employee',NULL),(4,'Reader',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Login` varchar(20) NOT NULL,
  `Password` varchar(32) NOT NULL,
  `UserName` varchar(45) NOT NULL,
  `Created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastUpdated` datetime NOT NULL,
  `Disabled` tinyint NOT NULL DEFAULT '0',
  `RoleID` int NOT NULL,
  PRIMARY KEY (`UserID`,`RoleID`),
  UNIQUE KEY `UserName_UNIQUE` (`Login`),
  KEY `fk_Users_Roles_idx` (`RoleID`),
  CONSTRAINT `fk_Users_Roles` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'gbeneyto','aQ7\"ptyh','Giselle Beneyto','2024-03-14 23:23:35','2024-03-17 19:46:12',0,1),(2,'estelli1','cH2.h`w&bhl','Ephrayim Stelli','2024-03-07 05:36:01','2024-03-15 00:00:00',0,3),(3,'ppochet2','tN5({4!','Petrina Pochet','2024-03-04 10:27:24','2024-03-15 00:00:00',0,4),(4,'gotuohy3','tZ8~MAX!T!JL','Geri O\'Tuohy','2024-03-09 23:26:59','2024-03-15 00:00:00',0,3),(5,'vlope4','jQ7_{{mw%uIF','Verla Lope','2024-03-11 04:22:10','2024-03-15 00:00:00',0,3),(6,'jdow5','qR0`LT}fx?','Jerald Dow','2024-03-12 21:43:06','2024-03-15 00:00:00',0,2),(7,'cmurkitt6','jZ5}Fg&7mNe','Carolin Murkitt','2024-03-08 21:59:53','2024-03-15 00:00:00',1,2),(8,'jle7','iA2{#gPD','Julius Le Breton','2024-03-02 01:25:51','2024-03-15 00:00:00',1,2),(9,'vspaven8','fC0#P0_','Vikky Spaven','2024-03-13 21:20:37','2024-03-15 00:00:00',0,4),(10,'bpanniers9','lS5%?W','Blakeley Panniers','2024-03-08 03:37:24','2024-03-15 00:00:00',0,1),(11,'abudgetta','sR7(OZS','Ardyce Budgett','2024-03-01 16:48:22','2024-03-15 00:00:00',0,3),(12,'wtooveyb','tV1..2m}4','Wade Toovey','2024-03-13 14:33:03','2024-03-15 00:00:00',0,1),(13,'dzmitrovichc','pP5}a&)j','Darcy Zmitrovich','2024-03-08 00:55:01','2024-03-15 00:00:00',0,4),(14,'nkirknessd','yH0>6QWW$}X6','Norbert Kirkness','2024-03-09 12:13:57','2024-03-15 00:00:00',0,3),(15,'divkovice','cE9(2_7%CL','Dolley Ivkovic','2024-03-12 09:50:49','2024-03-15 00:00:00',1,1),(16,'trancef','dE4}?)R5','Trey Rance','2024-03-14 04:16:32','2024-03-15 00:00:00',0,1),(17,'cbolzeng','rL5(Yp','Cassey Bolzen','2024-03-03 01:33:48','2024-03-15 00:00:00',0,2),(18,'okardosh','rG7$=gy5','Orel Kardos','2024-03-03 20:17:56','2024-03-15 00:00:00',0,4),(19,'myakobi','qF6}|c2U','Minny Yakob','2024-03-14 00:16:28','2024-03-15 00:00:00',1,3),(20,'sneilandsj','hR3+H`o','Serge Neilands','2024-03-12 12:02:45','2024-03-15 00:00:00',0,3),(21,'gbullask','zT9?=h','Georgette Bullas','2024-03-12 07:55:38','2024-03-15 00:00:00',1,1),(22,'fmeltonl','gD2$B/c22QR','Finlay Melton','2024-03-11 02:24:06','2024-03-15 00:00:00',0,2),(23,'nraybouldm','rP9}+3Yzkgd','Nevil Raybould','2024-03-06 02:49:33','2024-03-15 00:00:00',0,3),(24,'lpinckneyn','qW0<(te(Z4{V','Lewiss Pinckney','2024-03-06 01:26:07','2024-03-15 00:00:00',1,3),(25,'cgwillimo','yE5@/VZ','Catrina Gwillim','2024-03-04 01:22:49','2024-03-15 00:00:00',0,1),(26,'kschreinerp','eJ0\"Vn','Kayley Schreiner','2024-03-04 23:40:39','2024-03-15 00:00:00',0,2),(27,'gburnhillq','kB3*,4dPj{F','Gwenni Burnhill','2024-03-12 22:04:43','2024-03-15 00:00:00',0,3),(28,'btanguyr','bW1)W9*40}','Brena Tanguy','2024-03-07 08:32:58','2024-03-15 00:00:00',0,3),(29,'mweatherills','lW4!g\'X','Melisandra Weatherill','2024-03-02 13:36:03','2024-03-15 00:00:00',0,3),(30,'npontingt','nC6_Bo','Nancee Ponting','2024-03-11 18:12:52','2024-03-15 00:00:00',1,2),(31,'rhayesmanu','wX1.iuT7#','Rhody Hayesman','2024-03-09 18:36:12','2024-03-15 00:00:00',1,2),(32,'dpauleitv','uC4<m8','Devinne Pauleit','2024-03-10 07:26:08','2024-03-15 00:00:00',1,1),(33,'ctheuffw','wW6,my?DF','Cale Theuff','2024-03-05 23:43:05','2024-03-15 00:00:00',0,1),(34,'fciceronex','rW1<9{','Franky Cicerone','2024-03-07 14:18:45','2024-03-15 00:00:00',0,1),(35,'inewlyny','yW1|aeyLyRJ/','Idelle Newlyn','2024-03-12 18:58:02','2024-03-15 00:00:00',0,4),(36,'dcolmanz','vJ6=\"!RBC','Doro Colman','2024-03-03 13:49:26','2024-03-15 00:00:00',0,1),(37,'gfaunch10','hQ8/tUg`n$o','Gladys Faunch','2024-03-11 21:54:55','2024-03-15 00:00:00',0,2),(38,'cpoynor11','gM9+lJv0<x','Correy Poynor','2024-03-12 18:38:10','2024-03-15 00:00:00',0,4),(39,'ajelly12','yO6+L.CwQI+0','Addie Jelly','2024-03-10 22:06:44','2024-03-15 00:00:00',0,2),(40,'dnerne13','iH2#\"67','Drucy Nerne','2024-03-01 05:59:02','2024-03-15 00:00:00',1,3),(41,'jmccoveney14','kR3?d9H','Jordain McCoveney','2024-03-02 08:10:54','2024-03-15 00:00:00',1,3),(42,'nlinn15','rK5`7eh~V','Nate Linn','2024-03-13 06:57:58','2024-03-15 00:00:00',0,4),(43,'aconstantinou16','uM4%J@0>2KHo','Anastasie Constantinou','2024-03-04 02:25:36','2024-03-15 00:00:00',1,4),(44,'lmarnes17','eI1\"@@,|aNJ`','Lorens Marnes','2024-03-03 02:51:04','2024-03-15 00:00:00',1,1),(45,'lmewton18','sW4_MU9(59n`','Leonard Mewton','2024-03-02 15:10:24','2024-03-15 00:00:00',0,4),(46,'wsmithe19','yX7%(\"3','Wendeline Smithe','2024-03-09 06:07:57','2024-03-15 00:00:00',0,4),(47,'kmccaughey1a','zL9$l_ySz(&','Kassandra McCaughey','2024-03-06 09:25:28','2024-03-15 00:00:00',0,3),(48,'gmaciejak1b','dQ5\"\"UI0/5.','Giorgi Maciejak','2024-03-04 18:14:36','2024-03-15 00:00:00',1,3),(49,'hwrigglesworth1c','hK1\'0O{n','Hillyer Wrigglesworth','2024-03-14 13:39:40','2024-03-15 00:00:00',1,1),(50,'cive1d','hU4?Q>m','Chelsea Ive','2024-03-05 03:38:51','2024-03-15 00:00:00',0,4);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-17 21:49:54

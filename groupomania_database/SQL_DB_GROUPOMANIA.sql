CREATE DATABASE  IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Bonjour tout le monde ! ','http://localhost:3000/images/KlutzySaltyKakapo-size_restricted.gif1654099853759.gif',1,'2022-06-01 16:10:53','2022-06-01 16:10:53',NULL),(3,'Bonjour.. et encore un problème sur la ligne 7.. ','http://localhost:3000/images/B6z.gif1654100397391.gif',3,'2022-06-01 16:19:57','2022-06-01 16:19:57',NULL),(4,'Ah oui.. en effet.. j\'suis bloqué sur le quai..',NULL,4,'2022-06-01 16:21:40','2022-06-01 16:21:40',NULL),(5,'C\'est télétravail pour moi aujourd\'hui, bon courage à vous !','http://localhost:3000/images/11B6.gif1654100627817.gif',5,'2022-06-01 16:23:47','2022-06-01 16:23:47',NULL),(6,'Raaah.. Reprise du trafic dans une heure apparemment.. ','http://localhost:3000/images/tenor.gif1654100709890.gif',4,'2022-06-01 16:25:09','2022-06-01 16:25:09',NULL),(7,'Hello tout le monde ! C\'est reparti pour une nouvelle semaine, bon courage à tous !','http://localhost:3000/images/machine-cafe-entreprise-productivite.gif1654100841755.gif',6,'2022-06-01 16:27:21','2022-06-01 16:27:21',NULL);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220530163233-create_users_tables.js'),('20220530164456-create_articles_tables.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'Admin','Admin@gmail.com','$2b$08$Eq4Ebjaz9S7y.eP..A9F2OjnjckQqokmsClYqVHIQSp.OmFuiwWYm','2022-06-01 16:10:16','2022-06-01 16:10:16',NULL),(2,0,'Elsa','Elsa@gmail.com','$2b$08$0XKge4jTTl04XqBqiNmx1eYNo60fjg2L5Juxa4GEORxUct1Xd2ska','2022-06-01 16:14:59','2022-06-01 16:14:59','2022-06-01 16:25:58'),(3,0,'Eric','Eric@gmail.com','$2b$08$g0l7HWeJHZLp8I1mpYHFaOzdRZkFypzvKZPeTA.tATnYYxR4bD5Jy','2022-06-01 16:19:14','2022-06-01 16:19:14',NULL),(4,0,'Anthony','Anthony@gmail.com','$2b$08$oitrLYUhRcuK9lpsh.Bww.oSiJ4ZbspFOYnVBUY0dSTPbT.4BgvvW','2022-06-01 16:20:31','2022-06-01 16:20:31',NULL),(5,0,'Lily','Lily@gmail.com','$2b$08$2MBVhB92dIS8nC.qQwan5e.MbnaXAoP5H0MfxVcsyGeSSy6UB5uo6','2022-06-01 16:22:53','2022-06-01 16:22:53',NULL),(6,0,'Nathalie','Nathalie@gmail.com','$2b$08$hpS6qGnZI5tXCgfiTdC/sOKO5zTjAGWwjlzxFTKIkO7KJ0NRwzVQ.','2022-06-01 16:26:12','2022-06-01 16:26:12',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-01 18:53:56

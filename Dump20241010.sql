-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdfunding_db
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CATEGORY_ID` int NOT NULL,
  `NAME` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Healthcare'),(2,'Animal Welfare'),(3,'Disaster Relief'),(4,'Education'),(5,'Environmental Protection');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `money` varchar(45) DEFAULT NULL,
  `donors` varchar(45) DEFAULT NULL,
  `fundraiser` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES (11,'2024-09-10','50','Alice Johnson',1),(12,'2024-09-15','100','Bob Smith',2),(13,'2024-09-20','75','Charlie Davis',3),(14,'2024-09-25','200','David Miller',4),(15,'2024-09-30','120','Eva Green',5),(16,'2024-10-05','60','Frank Martin',6),(17,'2024-10-10','90','Grace Lee',7),(18,'2024-10-12','30','Henry Wilson',8),(19,'2024-10-14','150','Isabella Clark',9),(20,'2024-10-16','250','Jack Brown',10),(21,'2024-10-10','456','AAAAA',2);
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundraiser`
--

DROP TABLE IF EXISTS `fundraiser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fundraiser` (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(45) DEFAULT NULL,
  `CAPTION` varchar(45) DEFAULT NULL,
  `TARGET_FUNDING` varchar(45) DEFAULT NULL,
  `CURRENT_FUNDING` varchar(45) DEFAULT NULL,
  `CITY` varchar(45) DEFAULT NULL,
  `ACTIVE` varchar(45) DEFAULT NULL,
  `CATEGORY_ID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundraiser`
--

LOCK TABLES `fundraiser` WRITE;
/*!40000 ALTER TABLE `fundraiser` DISABLE KEYS */;
INSERT INTO `fundraiser` VALUES (1,'John Doe','Education for All','10000','5000','New York','1','1'),(2,'Jane Smith','Save the Forest','20000','12000','Los Angeles','1','2'),(3,'Global Charity','Art Therapy','15000','8000','San Francisco','1','3'),(4,'Mike Johnson','Clean Water Project','30000','25000','Chicago','1','2'),(5,'Anna Lee','Support Local Artists','5000','3000','Austin','1','3'),(6,'Community Group','Rebuild Homes','40000','20000','Houston','1','2'),(7,'Sarah Connor','School Supplies for Kids','8000','4000','Boston','1','1'),(8,'Tom Hanks','Wildlife Conservation','25000','15004','Seattle','1','2'),(9,'Emma Watson','Support Theater Programs','12000','6000','San Diego','1','3'),(10,'David Beckham','Sports for Youth','18000','9000','Miami','1','1');
/*!40000 ALTER TABLE `fundraiser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-10 21:25:14

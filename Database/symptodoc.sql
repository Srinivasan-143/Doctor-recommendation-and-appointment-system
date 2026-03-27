-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: hospitaldbms
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `appointment_time` time DEFAULT NULL,
  `appointment_reason` text,
  `status` enum('Pending','Confirmed','Rescheduled','Cancelled','Completed') DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE,
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,1,2,'2026-01-20','10:00:00','Regular Checkup','Completed'),(2,2,3,'2024-10-16','10:00:00','Heart Check','Pending'),(5,5,6,'2026-02-04','10:00:00','just consultation','Confirmed'),(6,5,2,'2026-02-18','15:00:00','need to see','Pending'),(7,6,1,'2026-03-06','10:00:00','skin infection','Pending'),(8,6,4,'2026-03-06','11:00:00','just checkup','Completed'),(9,6,5,'2026-03-07','11:30:00','to see','Pending'),(10,8,18,'2026-03-31','10:00:00','need to consult','Rescheduled'),(11,8,4,'2026-03-06','20:00:00','to meet','Pending'),(12,8,22,'2026-03-22','10:00:00','need to see','Pending'),(13,8,24,'2026-03-31','10:30:00','need to consult about my medical condition','Pending');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `appointment_id` int DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `billing_date` date DEFAULT NULL,
  `payment_status` enum('pending','completed') DEFAULT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `appointment_id` (`appointment_id`),
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (3,5,0,'2026-02-04','pending'),(4,6,0,'2026-02-18','pending'),(5,7,0,'2026-03-06','pending'),(6,8,0,'2026-03-06','pending'),(7,9,0,'2026-03-07','pending'),(8,10,0,'2026-03-07','pending'),(9,11,0,'2026-03-06','pending'),(10,12,0,'2026-03-22','pending'),(11,13,0,'2026-03-31','pending');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(256) DEFAULT NULL,
  `last_name` varchar(256) DEFAULT NULL,
  `specialization` enum('general-physician','gynecologist','dermatologist','pediatricians','neurologist','gastroenterologist','cardiologist','pulmonologist','endocrinologist','hepatologist','rheumatologist','orthopedic-surgeon','urologist','vascular-surgeon','colorectal-surgeon','allergist','infectious-disease-specialist') DEFAULT NULL,
  `phone_number` bigint DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `available_days` varchar(128) DEFAULT NULL,
  `available_from` time DEFAULT NULL,
  `available_to` time DEFAULT NULL,
  `years_of_experience` int DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `avg_rating` decimal(3,2) DEFAULT '0.00',
  `total_reviews` int DEFAULT '0',
  `profile_photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'Alice','Greens','dermatologist',9876543210,'alice.green@example.com','Mon,Wed,Fri','08:00:00','10:00:00',11,50000,5.00,1,'uploads/doctors/Al.jpg'),(2,'Bob','White','general-physician',2345678901,'bob.white@example.com','Tue,Thu','09:00:00','17:00:00',15,90000,3.00,1,'uploads/doctors/Bob.jpg'),(3,'George','Brown','neurologist',7890123456,'george.brown@example.com','Mon,Wed','07:00:00','15:00:00',16,98000,0.00,0,'uploads/doctors/George.jpg'),(4,'John','Smith','cardiologist',9876543210,'john.smith@hospital.com','Mon,Tue,Thu','09:00:00','17:00:00',12,120000,4.00,1,'uploads/doctors/John.jpg'),(5,'Priya','Kumar','endocrinologist',8765432109,'priya.kumar@hospital.com','Wed,Fri','10:00:00','16:00:00',8,95000,4.20,15,'uploads/doctors/Priya.jpg'),(6,'Rahul','M','pulmonologist',9654321098,'rahul.mehta@hospital.com','sunday','08:00:00','14:00:00',10,100000,4.70,30,'uploads/doctors/Rahul.jpg'),(7,'Sara','Lee','infectious-disease-specialist',6543210987,'sara.lee@hospital.com','Tue,Thu','09:30:00','15:30:00',14,110000,4.80,25,'uploads/doctors/Sara.jpg'),(10,'Rakesh','R','gastroenterologist',9876543210,'rakesh@gmail.com','Monday','13:00:00','17:00:00',5,20000,0.00,0,'uploads/doctors/rakesh.jpg'),(11,'saravanan','s','orthopedic-surgeon',9876512309,'saravanan@gmail.com','Monday','13:31:00','13:31:00',15,50000,0.00,0,'uploads/doctors/saravanan.jpg'),(18,'Swetha','R','gynecologist',9876543210,'swe@gmail.com','Tuesday','10:00:00','14:00:00',10,100000,4.00,1,'uploads/doctors/swe.jpg'),(19,'Riya','R','pediatricians',6312345678,'riya@gmail.com','Saturday','10:00:00','12:00:00',5,30000,0.00,0,'uploads/doctors/doctor_1774095966157.jpg'),(20,'Ajay','S','allergist',9876543210,'ajay@gmail.com','Friday','11:00:00','12:00:00',5,30000,0.00,0,'uploads/doctors/doctor_1774097270570.jpg'),(21,'Shuba','S','hepatologist',8765432106,'shuba@gmail.com','Friday','10:00:00','12:00:00',7,30000,0.00,0,'uploads/doctors/doctor_1774099075052.jpg'),(22,'Princy','S','colorectal-surgeon',6543217890,'princy@gmail.com','Thursday','10:00:00','12:00:00',3,20000,0.00,0,'uploads/doctors/doctor_1774099822632.jpg'),(23,'Jessy','R','vascular-surgeon',6543210987,'jessy@gmail.com','Wednesday','11:00:00','12:00:00',2,30000,0.00,0,'uploads/doctors/doctor_1774100488617.jpg'),(24,'Britney','S','rheumatologist',6789054321,'britney@gmail.com','Tuesday','10:00:00','12:00:00',4,20000,0.00,0,'uploads/doctors/doctor_1774100722287.jpg'),(25,'sarvesh','P','urologist',8765432190,'sarvesh@gmail.com','Tuesday','10:00:00','11:00:00',3,15000,0.00,0,'uploads/doctors/doctor_1774100968825.jpg');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctorlogin`
--

DROP TABLE IF EXISTS `doctorlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctorlogin` (
  `doctor_id` int NOT NULL,
  `password` varchar(128) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  CONSTRAINT `doctorlogin_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctorlogin`
--

LOCK TABLES `doctorlogin` WRITE;
/*!40000 ALTER TABLE `doctorlogin` DISABLE KEYS */;
INSERT INTO `doctorlogin` VALUES (1,'$2b$10$mCuFtrUdIdgPOtzvY4LzdupdamMSNBMdKpGQCzLBri6Bx/TX0gmbe','alice.green@example.com'),(2,'$2b$10$gNWULlSB3JDM6mRzqEx/0.skwkeeZJlUmSBN5bOYJgtZz3GR8BUaa','bob.white@example.com'),(3,'$2b$10$4gGu7SzuVVg4t/M58aJXkuSAbcTJLeGIOUgcnU1gc6GVyRPcorhhu','george.brown@example.com'),(4,'$2b$10$KwCoE6ES1ScbyYrVk/DoJexvOd9ysV50Q50g8wZRKiCroLJyd5BzC','john.smith@hospital.com'),(5,'$2b$10$GuB5.SWWO91v2LqH6e.Ituqrs5WytnvUFklCVqL1i2v/s1b/lhXPu','priya.kumar@hospital.com'),(6,'$2b$10$cMlHhCNioRIJF2r4kEjcEu8nsOzYT7LNhxxwJt3OibXtoDLtJRc..','rahul.mehta@hospital.com'),(7,'$2b$10$5BGshiErEmI/LVOtOK21dueChui8Fh1aUCulYCQBuXJfZJA6LzjDC','sara.lee@hospital.com'),(10,'$2b$10$QMnzJ7NkvfwvkURPU/eACeYJcZoMU0CItUsryZc1o1moWDhkzIY4q','rakesh@gmail.com'),(11,'$2b$10$GeoCpgM.9ifZlyOEUTD8b.hHpcd7MkUC6bVjGdcrPFBqTdn5/HcvO','saravanan@gmail.com'),(18,'$2b$10$7UuxjVWwp0rBdL.Eo9yl7OrwdS3R5RV7Lj9Oy1qASqpbyph2OeDGq','swe@gmail.com'),(19,'$2b$10$wls62qpNDhF2mCrH9yJyHOlGQr8eoU2w6lHT8/IFo2yRenwCT8kiS','riya@gmail.com'),(20,'$2b$10$WmChACLW2B1AwASzW7yt4effeIL/7feMk99xl01l4cb8HkKR4RY7W','ajay@gmail.com'),(21,'$2b$10$1.IjefcMWOoMdPBU.UBEM.FMjNC5hchkSkoIf67N4OKiWRcpczA.a','shuba@gmail.com'),(22,'$2b$10$SFLQelt0rZ2JkdT/AjvQyOr3L5xJgqBEyqTT.Qk0Yh4zUqriNOcXe','princy@gmail.com'),(23,'$2b$10$bvv1rsX8NMXvfeE5A4qGauVelP22w0qnxoJ0TC5kWxx7fudEyUfyi','jessy@gmail.com'),(24,'$2b$10$ifSCUMKOrsQXZouCe0mECOcnmG/4tw6ptkOexGv7p8QehnCRJxovG','britney@gmail.com'),(25,'$2b$10$z8RbOVee0zLxda/zpFWaWuRMkAPcP1exTml4p5h.A8u0ejDDAsw16','sarvesh@gmail.com');
/*!40000 ALTER TABLE `doctorlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `patient_id` int NOT NULL,
  `password` varchar(128) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'$2b$10$Is5GrGoOW4L83j2CwBYAYObLlu4epGFps/hakcktZF3XX8fumm7Ye','john@example.com'),(2,'$2b$10$Oo5sH65Ii8acKRiUW7j6hOTdTwYJIPpJt44uMB1oDniLhaNgFYcwO','jane@example.com'),(5,'$2b$10$yEfnDGylNXpMpTdQ7v/J9es.gEAtg1YVlGz0WSQNT1uauS/Nv2.02','saranya@gmail.com'),(6,'$2b$10$IK.xNAsqysQR4s3W7khZbO43XApD9KWjZLf8efbHxMW7MffRoESwu','ram@gmail.com'),(7,'$2b$10$a4jkE5H2l4Upy4sqJTdZ1.RE78X0SPuatjE72ES2R/RhTmHp9tNim','kamal@gmail.com'),(8,'$2b$10$7EqpkETIdVkO2nsky3fvoOTtoZslXp45UtMUxixZ7sacllVcwwZGC','rajini@gmail.com');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(256) DEFAULT NULL,
  `last_name` varchar(256) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `address` varchar(512) DEFAULT NULL,
  `phone_number` bigint DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `blood_type` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') DEFAULT NULL,
  `emergency_contact` bigint DEFAULT NULL,
  `allergies` text,
  `existing_conditions` text,
  `profile_photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'John','Doe','1985-05-15','Male','123 Elm St, Springfield',1234567890,'john@example.com','A+',9876543210,'Peanuts','None',NULL),(2,'Jane','Smith','1990-10-10','Female','456 Oak St, Springfield',2345678901,'jane@example.com','O-',8765432109,'None','Diabetes',NULL),(5,'saranya','saravanan','2000-02-08','Female','coimbatore',1234567890,'saranya@gmail.com','B+',9876543210,'skin allergies','skin allergies','uploads/patients/patient_1772096161935.webp'),(6,'ram','s','1998-12-30','Male','chennai',9876543210,'ram@gmail.com','A+',9876543210,'fever and cold','normal','uploads/patients/patient_1772119038324.jpeg'),(7,'kamal','hasan','2000-01-01','Male','chennai',9876543210,'kamal@gmail.com','A+',9876543210,'fever','normal',NULL),(8,'rajini','s','2000-02-01','Male','chennai',9876543210,'rajini@gmail.com','A+',9876543210,'fever','normal',NULL);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `appointment_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `review_text` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `unique_review` (`appointment_id`,`patient_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (6,1,1,2,3,'good','2026-01-30 16:03:22'),(12,10,8,18,4,'good consultations','2026-03-06 07:30:16'),(15,8,6,4,4,'Had a nice consultation with doctor john','2026-03-18 17:16:29');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-27  9:31:24

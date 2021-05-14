-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mom_db_3
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `UserID` int NOT NULL,
  `Quantity` int NOT NULL DEFAULT '1',
  `MedicineID` int NOT NULL,
  PRIMARY KEY (`UserID`,`MedicineID`),
  KEY `UserID_idx` (`UserID`),
  KEY `MedicineID_idx` (`MedicineID`),
  CONSTRAINT `MedicineID` FOREIGN KEY (`MedicineID`) REFERENCES `medicines` (`MedicineID`),
  CONSTRAINT `UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checks_availability`
--

DROP TABLE IF EXISTS `checks_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checks_availability` (
  `MedicineID` int NOT NULL,
  `PhramacyID` int NOT NULL,
  `Stock` int NOT NULL,
  PRIMARY KEY (`MedicineID`,`PhramacyID`),
  KEY `CA_PharmcyID_idx` (`PhramacyID`),
  CONSTRAINT `CA_MedicineID` FOREIGN KEY (`MedicineID`) REFERENCES `medicines` (`MedicineID`),
  CONSTRAINT `CA_PharmcyID` FOREIGN KEY (`PhramacyID`) REFERENCES `pharmacies` (`PharmacyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `ComplaintsID` int NOT NULL AUTO_INCREMENT,
  `Description` text,
  `RelatedTo` enum('User Experience','Membership','Subscription','Order','Medicine','Miscellaneous') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Miscellaneous',
  `ComplaintDate` date NOT NULL,
  `UserID` int NOT NULL,
  `OrderID_If_Applicable` int DEFAULT NULL,
  `Pending` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ComplaintsID`),
  KEY `CM_UserID_idx` (`UserID`),
  KEY `CM_OrderID` (`OrderID_If_Applicable`),
  CONSTRAINT `CM_OrderID` FOREIGN KEY (`OrderID_If_Applicable`) REFERENCES `orders` (`OrderID`),
  CONSTRAINT `CM_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `UserID` int NOT NULL,
  `RewardPoints` varchar(45) DEFAULT '0',
  PRIMARY KEY (`UserID`),
  CONSTRAINT `FK_customer_user_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delivery_agent`
--

DROP TABLE IF EXISTS `delivery_agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_agent` (
  `AgentID` int NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `DOB` date NOT NULL,
  `Gender` varchar(45) NOT NULL,
  `salary` int NOT NULL,
  `DrvingLicenseNo` varchar(45) NOT NULL,
  `Description` text,
  `State` varchar(45) NOT NULL,
  `City` varchar(45) NOT NULL,
  `Street` varchar(45) NOT NULL,
  `ApartmentNo` varchar(45) NOT NULL,
  `Pincode` char(6) NOT NULL,
  `Landmark` varchar(45) DEFAULT NULL,
  `EmailAddress` varchar(45) NOT NULL,
  `PhoneNumber1` varchar(20) NOT NULL,
  `PhoneNumber2` varchar(20) DEFAULT NULL,
  `BankAC_No` varchar(45) NOT NULL,
  `IFSC_Code` varchar(45) NOT NULL,
  `UPI_ID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`AgentID`),
  UNIQUE KEY `Drving License No.` (`DrvingLicenseNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `UserID` int NOT NULL,
  `LicenseNo` char(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Degree` varchar(45) NOT NULL,
  `Department` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  CONSTRAINT `Doc_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `donation_item`
--

DROP TABLE IF EXISTS `donation_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_item` (
  `DonationID` int NOT NULL,
  `MedicineID` int NOT NULL,
  `Quantity` int NOT NULL DEFAULT '1',
  `Total_MRP` int NOT NULL,
  PRIMARY KEY (`DonationID`,`MedicineID`),
  KEY `MedicineID_idx` (`MedicineID`),
  CONSTRAINT `DonationID` FOREIGN KEY (`DonationID`) REFERENCES `donations` (`DonationID`),
  CONSTRAINT `MedicinID` FOREIGN KEY (`MedicineID`) REFERENCES `medicines` (`MedicineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `DonationID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `Request_Date` date NOT NULL,
  `Pickup_Date` date DEFAULT NULL,
  PRIMARY KEY (`DonationID`),
  KEY `FK_donations_user_UserID_idx` (`UserID`),
  CONSTRAINT `FK_donations_user_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=501 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `login_credentials`
--

DROP TABLE IF EXISTS `login_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_credentials` (
  `username` varchar(50) NOT NULL,
  `hash` char(150) DEFAULT NULL,
  `userID` int NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  CONSTRAINT `FK_loginCredentials_user_UserID` FOREIGN KEY (`userID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `med_company_contact`
--

DROP TABLE IF EXISTS `med_company_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `med_company_contact` (
  `CompanyID` int NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  PRIMARY KEY (`CompanyID`,`PhoneNumber`),
  CONSTRAINT `MCC_CompanyID` FOREIGN KEY (`CompanyID`) REFERENCES `medicine_companies` (`CompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medicine_companies`
--

DROP TABLE IF EXISTS `medicine_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine_companies` (
  `CompanyID` int NOT NULL,
  `LicenseNo` varchar(45) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Description` text,
  `Address` text,
  `Email` varchar(45) DEFAULT NULL,
  `Website` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicines` (
  `MedicineID` int NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` text NOT NULL,
  `CompanyName` varchar(45) NOT NULL,
  `Cost` float NOT NULL,
  `Category` varchar(45) NOT NULL,
  `IsPrescibed` tinyint DEFAULT NULL,
  `PackagingTemperature` float NOT NULL,
  `CompanyID` int NOT NULL,
  `HomemadeRemedies` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`MedicineID`),
  KEY `Med_CompanyID_idx` (`CompanyID`),
  KEY `idx_name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `OrderItemNo` int NOT NULL AUTO_INCREMENT,
  `Cost` float DEFAULT NULL,
  `Quantity` float DEFAULT NULL,
  `OrderID` int NOT NULL,
  `MedicineID` int NOT NULL,
  PRIMARY KEY (`OrderItemNo`,`MedicineID`,`OrderID`),
  KEY `OI_OrderID_idx` (`OrderID`),
  KEY `OI_MedicineID_idx` (`MedicineID`),
  CONSTRAINT `OI_MedicineID` FOREIGN KEY (`MedicineID`) REFERENCES `medicines` (`MedicineID`),
  CONSTRAINT `OI_OrderID` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=11276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `ItemsQuantity` int NOT NULL,
  `State` varchar(45) NOT NULL,
  `City` varchar(45) NOT NULL,
  `Street` varchar(45) NOT NULL,
  `ApartmentNumber` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Pincode` char(6) NOT NULL,
  `Landmark` varchar(45) DEFAULT NULL,
  `Discount` float DEFAULT '0',
  `DeliveryCost` float DEFAULT '0',
  `TotalAmount` float NOT NULL,
  `ModeOfPayment` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TransactionID` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `OrderDate` date NOT NULL,
  `DeliveryDate` date NOT NULL,
  `AgentID` int NOT NULL,
  `PharmacyID` int NOT NULL,
  `PrescriptionID` int DEFAULT NULL,
  `UserID` int NOT NULL,
  `Status` enum('Being Placed','Order Placed','Dispatched','Out For Delivery','Delivered','Cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Subscription` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`OrderID`),
  KEY `Ord_AgentID_idx` (`AgentID`),
  KEY `Ord_PharmacyID_idx` (`PharmacyID`),
  KEY `Ord_PrescriptionID_idx` (`PrescriptionID`),
  KEY `Ord_UserID_idx` (`UserID`),
  KEY `idx_Status` (`Status`)
) ENGINE=InnoDB AUTO_INCREMENT=2362 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pharmacies`
--

DROP TABLE IF EXISTS `pharmacies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacies` (
  `PharmacyID` int NOT NULL,
  `LicenseNo` varchar(45) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `PhoneNumber1` varchar(20) NOT NULL,
  `PhoneNumber2` varchar(20) DEFAULT NULL,
  `EmailAddress` varchar(45) NOT NULL,
  `Website` varchar(45) DEFAULT NULL,
  `Description` text NOT NULL,
  `State` varchar(45) NOT NULL,
  `City` varchar(45) NOT NULL,
  `Street` varchar(45) NOT NULL,
  `ApartmentNo` varchar(45) NOT NULL,
  `Pincode` char(6) NOT NULL,
  `Landmark` varchar(45) DEFAULT NULL,
  `AC_No` varchar(45) NOT NULL,
  `IFSC_Code` varchar(45) NOT NULL,
  `UPI_ID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PharmacyID`),
  UNIQUE KEY `License No.` (`LicenseNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pharmacy_credentials`
--

DROP TABLE IF EXISTS `pharmacy_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacy_credentials` (
  `pharmacyID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `hash` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`pharmacyID`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  CONSTRAINT `FK_pharmacyCredentials_pharmacies_PharmacyID` FOREIGN KEY (`pharmacyID`) REFERENCES `pharmacies` (`PharmacyID`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `premium member`
--

DROP TABLE IF EXISTS `premium member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `premium member` (
  `MembershipNumber` int NOT NULL AUTO_INCREMENT,
  `DurationInDays` int NOT NULL,
  `TransactionID` varchar(45) NOT NULL,
  `StartDate` date NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`MembershipNumber`),
  UNIQUE KEY `UserID` (`UserID`),
  KEY `PM_UserID_idx` (`UserID`),
  CONSTRAINT `PM_UserID_idx` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `PrescriptionID` int NOT NULL AUTO_INCREMENT,
  `ImageURL` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `PrescriptionDate` date NOT NULL,
  `DoctorUserID` int DEFAULT NULL,
  `PatientUserID` int DEFAULT NULL,
  PRIMARY KEY (`PrescriptionID`),
  KEY `Pnt_UserID_idx` (`PatientUserID`),
  KEY `Doc_LIC_idx` (`DoctorUserID`),
  CONSTRAINT `Pnt_UserID` FOREIGN KEY (`PatientUserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`DoctorUserID`) REFERENCES `doctor` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=701 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `SubscriptionID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `MedicineID` int NOT NULL,
  `Cost` int NOT NULL,
  `Quantity` int NOT NULL DEFAULT '1',
  `StartDate` date NOT NULL,
  `Duration_In_Days` int NOT NULL,
  `Status` enum('Active','Cancelled') NOT NULL,
  `LastOrderDate` date DEFAULT NULL,
  PRIMARY KEY (`SubscriptionID`),
  KEY `Medicine_idx` (`MedicineID`),
  KEY `User_idx` (`UserID`),
  CONSTRAINT `Medicine` FOREIGN KEY (`MedicineID`) REFERENCES `medicines` (`MedicineID`),
  CONSTRAINT `User` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Gender` varchar(45) NOT NULL,
  `PhoneNumber1` varchar(20) NOT NULL,
  `PhoneNumber2` varchar(20) DEFAULT NULL,
  `EmailAddress` varchar(45) NOT NULL,
  `State` varchar(45) NOT NULL,
  `City` varchar(45) NOT NULL,
  `Street` varchar(45) NOT NULL,
  `ApartmentNumber` varchar(45) NOT NULL,
  `Pincode` char(6) NOT NULL,
  `Landmark` varchar(45) DEFAULT NULL,
  `IsPremiumMember` tinyint NOT NULL,
  `DOB` date NOT NULL,
  `RewardPoints` int DEFAULT '0',
  PRIMARY KEY (`UserID`),
  KEY `ix_isPremiumMember` (`IsPremiumMember`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'mom_db_3'
--

--
-- Dumping routines for database 'mom_db_3'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-04 11:34:50

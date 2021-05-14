# **MOM : Master Of Medicines**

<a name="1"></a>
### API Documentation
https://documenter.getpostman.com/view/11165950/TzCS6mRU

<a name="2"></a>
### Server URL
https://masterofmedicines.herokuapp.com/

### Table of Contents
1.  [API Documentation](#1)
2.  [Server URL](#2)
3.  [Group Members](#3)
4.  [Problem Statement](#4)
5.  [Objectives](#5)
6.  [Problem Overview](#6)
7.  [Some Salient Features](#7)
8.  [Stakeholders](#8)
9.  [Miniword](#9)
10. [Data Entities and Attributes](#10)
11. [ER Diagram](#11)
12. [Relationships](#12)
13. [Relational Schema](#13)
14. [Keys, Constraints and Range Values](#14)
#

[CSE202 : Fundamentals of Database Management Systems](http://techtree.iiitd.edu.in/viewDescription/filename?=CSE202 "Course Description")
<a name="3"></a>
─

Group - 45

[Aastha](https://github.com/aastha985 "GitHub Profile") 2019224

[Abhimanyu Gupta](https://github.com/0deadLock0 "GitHub Profile") 2019226

[Ayush Misra](https://github.com/Ayush-0801 "GitHub Profile") 2019301

[Dhruv Mehta](https://github.com/Dhruv_Mehta "GitHub Profile") 2018335

[Vasu Kashyap](https://github.com/Vasu-Kashyap "GitHub Profile") 2019343

<a name="4"></a>
#
## Problem Statement

Medical supplies are the need of the hour.How many times have you gone to a pharmacy and couldn&#39;t find the right medicines ? The pandemic showed us the significance of a good medicine supply network to aid the citizens and maintain health and well-being of a nation. Fake prescriptions are also one of the growing concerns which solicit irresponsible drug consumptions and in turn leads to shortage of supply to those who actually need it.

<a name="5"></a>
#
## Objectives

1. A network of medicine suppliers to cater to the medical needs of the masses.
2. Providing doctors/independent clinics a way to directly prescribe medicines to their patients without the use of a physical/handwritten prescription.
3. Statistical analysis for medicine companies to further encourage the development of the healthcare industry.

<a name="6"></a>
#
## Project Overview

Our platform caters to the medical needs by encompassing the whole industry into one app.It could also be considered as one-stop for all your medical needs be it medicines, medical equipments,etc.The main purpose of this application would be to ensure a user friendly way to buy medicines and keep track of your health requirements and at the same time helping budding medicine companies , pharmacies and clinics to boost their economy by selling , distributing and resourcing through our app respectively.

#
<a name="7"></a>
#
## Some Salient Features

## 1. One-Stop Medic

We provide all kinds of medicines ranging from common day to day cold pills, to life saving asthma medicines. Doctors can depend on us for all their medical supplies/equipment .

Just visit the website and place your order within minutes.

## 2. Scan, Upload &amp; Order

Giving patients the chance to have orders directly placed by their doctor. No more hassle of understanding handwritten prescriptions or receiving the fake prescriptions. You can even scan your prescriptions and upload them to automatically generate an order.

## 3. Giving back to the community (Bonus)

To uplift the healthcare of the nation, the common people play a major role by coming forward and donating essential medicines for those who need it the most.Incentivising and making this process convenient is the first step towards national healthcare development.

## 4. Get homemade remedies (Bonus)

Suggestions of ancient remedies that embody our culture and tradition passed down by the spirit of motherhood whenever you buy a medicine related to some such ailment.

#
<a name="8"></a>
#
## Stakeholders

## 1. Customer/Patient

**Role** : The main role of a customer/patient would be to purchase medicines for his/her personal healthcare or prescribed by a doctor

**Purpose of using the database:**

1. Authentication:
    1. Sign Up: For adding details like username , password(hash) to login credentials in the database.
    2. Login: Checking if a user with the username exists in the database, and matching the hash of the password provided by the user.
2. Fetching the list of medicines and discounts available on them from the database based on:
    1. User&#39;s search result
    2. Category wise like vitamins and supplements, Ayurveda, homeopathy, hair care and more.
3. Fetch details like cart items, previous orders.
4. Uploading prescriptions to the database: Certain medicines require the patient to upload a doctor&#39;s prescription. All the prescriptions are saved to the user&#39;s database in the user&#39;s schema for validating the prescription and scheduling orders in the future.
5. Saving the following details during an order:
    1. Address(can have multiple addresses-office address, home address).
    2. Optionally, Users&#39; card and wallet details for future use.
    3. Reward Points earned/redeemed
    4. Payment amount and mode- Cash on Delivery, Card( Credit Card/ Debit Card), E-Wallets- Amazon Pay/Paytm)
6. Updating and redeeming reward points during an order
7. Accessing the user&#39;s order history for:
    1. Tracking an order
    2. Giving reviews
    3. Order Information like payment amount, reward points earned/redeemed, discount, payment method, medicine name and shipping cost
    4. Order Status: Cancelled/Yet to be Dispatched/Dispatched/Out for delivery/Return Placed/Returned/Refund Initiated)
8. Subscription: Scheduling orders for a medicine (monthly/weekly/quarterly).
9. Complaint: Storing user&#39;s complaints in the database.
10. Membership: Accessing special offers for members.

**Key Questions:**

1. What are the items in my cart?
2. What are my previous orders?
3. What is the status of my current order?
4. Is this medicine available?
5. How can I file a complaint?

## 2. Pharmacies

**Role** : The main role of the pharmacies is to supply the required medicines a customer orders or is prescribed to.

**Purpose of using the database:**

1. Access medicine data to view/update the availability of medicines
2. Receiving order details of a customer through the database to supply medicines to the customer/patient

**Key Questions:**

1. Is a particular medicine in stock?
2. Receive and supply an order
3. Check transaction history
4. What orders are due for delivery?
5. Raise request for delivery of medicines

## 3. Medicine Companies

**Role** : The main role of the medicine companies is to keep track of their medicine supplies and analyse the growth and development of each of their medicine.

**Purpose of using the database:**

1. Fetching the data for medicines that are to be sold to various hospitals/pharmacies
    1. Confirming from various order records
2. Checking on the stock.
3. Statistical analysis of growth,marketing and selling of each and every medicine.

**Key Questions :**

1. What are the order details (number of units of medicines) that have been sold to the pharmacies and hospitals?
2. What are the current orders in the pipeline?
3. Which medicines are in the highest selling list?
4. What are the reasons given by customers when they return the order? (Assuming that returning the order is allowed)
5. What is the profit sharing mechanism? (Is there a fixed amount per order or a percentage of the profit the company makes per order )

## 4. Doctors/Independent Clinics

**Role** : The main role of the doctors is to prescribe medicines to their patients directly thereby making it more efficient and convenient. Also to get medical supplies for his/her clinic.

**Purpose for using the database:**

1. Fetching the required medical supplies/equipments
    1. Through Search
    2. Through Categories ( ENT,Dental,Orthopedics,Surgery,etc)
2. Prescribing the patient&#39;s prescription
    1. When patient himself uploads the prescription
    2. Directly added by the doctor in the patient&#39;s account
3. Fetching information about new medicine companies who promote their medicines through our app/database.

**Key Questions:**

1. What equipment/supplies does the clinic require (order details)?
2. How to add a prescribed medicine into a patient&#39;s cart directly?
3. What new medicines are out there in the market?
4. How to control usage of fake prescriptions?
5. How to regulate doses of medicines to a patient ?

## 5. Delivery and Logistics

**Role** : The main role of the delivery and logistics department is to handle the packaging, transit and delivery of the medicines and medical equipment from the pharmacies to the customer&#39;s doorstep.

**Purpose for using the database:**

1. To access data from medicine for storage conditions related data.
2. For storing basic details about logistics companies and where they provide service.
3. Details of the pincodes where the company delivers.
4. Data related to tracking of the delivery service.
5. For maintaining warehouse/stock related information.

**Key Questions:**

1. Where is my order?
2. Is the stock sufficient to meet demands?
3. Will medicine be delivered in temperature controlled packaging, if needed?
4. Is the particular medicine available at my pincode?
5. When will my order arrive?

<a name="9"></a>
#
## MiniWord

Consider a database of our app which centralises over the aspect of medicine selling and delivery.Each user can be categorized into two categories a regular customer/patient and a doctor.A regular customer can place orders for medicines, add subscriptions of medicines and can even file a complaint of some of the issues.Doctors apart from doing all this can also place orders for medical equipments and also prescribe medicines to their patients by directly adding an order.The medicines are supplied to the customer&#39;s doorstep through pharmacies, who keep the stock updated and receives the order.The delivery agent is responsible for the pick up of the medicine order from the pharmacy and deliver it to the customer.Medicine companies use the statistics gathered from this service to market and analyse their medicines.

<a name="10"></a>
#
## Data Entities &amp; Attributes

#### 1. User
  1. User ID
  2. First Name
  3. Last Name
  4. Gender
  5. PhoneNumber1
  6. PhoneNumber2
  7. Email Address
  8. State
  9. City
  10. Street
  11. Apartment Number
  12. Pincode
  13. Landmark
  14. IsPremiumMember
  15. DOB
  16. RewardPoints
#### 2. Doctor
  1. User ID
  2. License Number
  3. Degree
  4. Department
#### 3. Login Credentials
  1. username
  2. hash
  3. User ID
#### 4. Order
  1. Order ID
  2. Items Quantity
  3. State
  4. City
  5. Apartment Number
  6. Pincode
  7. Landmark
  8. Discount
  9. Delivery cost
  10. Total Amount
  11. Mode of Payment
  12. Transaction ID
  13. Order Date
  14. Delivery Date
  15. Delivery Agent ID
  16. Pharmacy ID
  17. Prescription ID
  18. User ID
  19. Status
  20. IsSubscriptionOrder
#### 5. Order Item
  1. Order Item Number
  2. Cost
  3. Quantity
  4. Order ID
  5. Medicine ID
#### 6. Subscriptions
  1. Subscription ID
  2. Medicine ID
  3. Cost
  4. Quantity
  5. Start Date
  6. User ID
  7. Duration In Days
  8. Status: Active/Cancelled
  9. Last Order Date
#### 7. Premium Member
  1. Membership Number
  2. Duration In Days
  3. Transaction ID
  4. Start Date
  5. User ID
#### 8. Complaints
  1. Complaint ID
  2. Description
  3. Related To(Order,Membership etc)
  4. Complaint Date
  5. User ID
  6. OrderID If Applicable
  7. Pending(true/false)
#### 9. Pharmacy Table
  1. Pharmacy ID
  2. License Number
  3. Name
  4. PhoneNumber1
  5. PhoneNumber2
  6. Email Address
  7. Website
  8. Description
  9. Street
  10. City
  11. Apartment Number
  12. Pincode
  13. Landmark
  14. AC\_No
  15. IFSC Code
  16. UPI ID
#### 10. Pharmacy Credentials
  1. Pharmacy ID
  2. username
  3. hash
#### 11. Prescriptions
  1. Prescription ID
  2. Image URL
  3. Prescription ID
  4. Doctor&#39;s User ID
  5. Patient User ID
#### 12. Delivery Agent
  1. Agent ID
  2. First Name
  3. Last Name
  4. DOB
  5. Gender
  6. Salary
  7. Driver License Number
  8. Description
  9. State
  10. City
  11. Street
  12. Apartment Number
  13. Pincode
  14. Landmark
  15. Email Address
  16. Phone Number 1
  17. Phone Number 2
  18. Bank Account Number
  19. IFSC Code
  20. UPI ID
#### 13. Medicine Company table
  1. Company ID
  2. License No.
  3. Name
  4. Description
  5. Address
  6. Email
  7. Website
#### 14. Medicine Company Contact
  1. Company ID
  2. Phone Number
#### 15. Medicines
  1. Medicine ID
  2. Medicine Name
  3. Description
  4. Company name
  5. Cost
  6. Category: Diabetes/Hypertension/Homeopathy etc
  7. IsPrescribed: true/false
  8. Packaging Conditions(Temperature in degree celsius)
  9. Company ID
#### 16. Cart Items
  1. User ID
  2. Quantity ID
  3. Medicine ID
#### 17. Donations
  1. User ID
  2. Request Date
  3. Pickup Date
  4. Donation ID
#### 18. Donation Item
  1. Donation ID
  2. Medicine ID
  3. Quantity
  4. Total MRP

<a name="11"></a>
#
## Relationships

- User (1)-- has --(1) Login credentials
- User (1)-- upgrades to --(1) Premium member
- User (1)-- subscribes --(Many) Subscriptions
- User (1)-- places --(Many) Order
- User (1)-- lodges --(Many) Complaints
- Complaint (1)-- has --(1) Complaint Type
- User (Many)-- searches --(Many) Medicines
- User (1)-- gets prescribes --(Many) Prescription
- Customer (1)-- is a --(1) User
- Doctor (1)-- is a --(1) User
- Doctor (1)-- prescribes --(Many) Prescription
- Delivery Agent (1)-- delivers --(Many) Order
- Delivery Agent (Many)-- picks up --(Many) Pharmacies
- Order (1)-- contains --(1) Prescriptions
- Order (1)-- consists --(Many) Order Item
- Order (Many)-- creates --(1) Subscriptions
- Subscription (1)-- consists --(Many) Subscription Item
- Subscription Item (1)-- has --(1) Medicine
- Pharmacies (Many)-- checks availability (Many) Medicine
- Pharmacies (1)-- receives --(Many) orders
- Medicine Companies (1)-- gather stats --(1) Medicine
- Order Item (1)-- has --(1) medicine

<a name="12"></a>
#
## E-R Diagram

[https://lucid.app/lucidchart/invitations/accept/46955573-d169-4844-a35d-4b51550a1850](https://lucid.app/lucidchart/invitations/accept/46955573-d169-4844-a35d-4b51550a1850)

<a name="13"></a>
#
## Relational Schema

Login Credentials(Username,Password, User ID)

User(UserID,First Name,Last Name,DOB, Gender, Phone Number 1,Phone Number 2, Email Address,State,City,Street,Apartment No,Pincode,Landmark,Is Premium Member,DOB, Reward Points)

Doctor(UserID, Doctor License No (IMR No),Degree,Department)

Order(Order ID, Items Quantity,State,City,Street,Apartment No.,Pincode,Landmark, Discount, Delivery Cost, Total Amount, Mode of Payment,Transaction ID,Order Date, Delivery Date, Agent ID,Subscription ID,User ID,Pharmacy ID,Prescription ID, Status, Subscription)

Order\_Item (Order Item No, Order ID, Medicine ID, Cost, Quantity)

Subscriptions(Subscription ID,Medicine ID, Cost, Quantity, Start Date, Duration,Status,Last Order Date,User ID)

Medicine(Medicine ID, Name,Description, Company Name, Cost, Category,IsPrescribed,Packaging Conditions, Company ID)

Medicine\_Companies (Company ID, Licence No., Name, Description, Address, Email,Website)

Med\_Company\_Contacts(CompanyID,Phone numbers)

Prescription(Prescription ID, ImageUrl/Digital Copy Url, Prescription Date,Doctor&#39;s User ID,(Patients&#39;) User ID)

Pharmacies(PharmacyID, License No., Name, State, City, Street, Apartment No, Pincode, Landmark, Phone Number 1, Phone Number 2, Email, Website, Description, A/C no,, IFSC Code, UPI ID)

Premium Member(Membership No, Duration, TransactionID, Start Date, UserID)

Complaints(Complaint ID,Description,Related To,Pending,Complaint Date, User ID,Order ID if Applicable)

Delivery\_Agent(Agent ID,First Name, Last Name, DOB, Gender, Description, State, City, Street, Apartment No,Pincode, Landmark, Email, Phone Number 1, Phone Number 2, Bank Account No, Bank IFSC Code, UPI ID, Salary, Driving License)

Picks Up(Agent ID, Pharmacy ID, Order ID)

ChecksAvailability(Medicine ID, Pharmacy ID,No Of Items In Stock)

CartItems(UserID, Quantity, Medicine ID)

Donations(UserID, Request Date, PickUp Date, Donation ID)

DonationItem(Donation ID, Medicine ID, Cost, Quantity)

<a name="14"></a>
#
## Keys, Constraints and Range Values

#### 1. User
  1. User ID(Primary Key,int,Foreign Key references UserID from login\_credentials)
  2. Name(Composite)
        1. first\_name(not null, varchar(45))
        2. last\_name(can be null,varchar(45))
  3. DOB( not null, date)
  4. Gender(not null, varchar(10)
  5. Mobile Number(Composite) :
        1. mobile\_number1(not null,char(10),min &amp; max length: 9)
        2. mobile\_number2(can be null,char(10))
  6. Email Address(not null,unique,candidate key, varchar(100))
  7. Address (Composite Attribute)
        1. State(not null, varchar(45))
        2. City(not null, varchar(45))
        3. Street Address(not null, varchar(45))
        4. Apartment No(not null, int)
        5. Pincode(not null, char(6))
        6. Landmark(can be null, varchar(100))
  8. Is Premium Member(boolean/tinyint, default: false/0)
  9. Reward Points(int)
 
#### 2. Premium Member
  1. User ID(Foreign Key,int,references User ID from User,not null)
  2. Membership No(Primary Key,int)
  3. Duration In Days( not null, int,Valid values: 28, 84, 365)
  4. Start Date(not null, date)
  5. Transaction id(not null,varchar(50))

#### 3. Prescription
  1. Prescription ID(Primary Key, int)
  2. Doctor&#39;s User ID(Foreign Key, int , references User ID from Doctor)
  3. Patient&#39;s User ID(Foreign Key,int, references User ID from User)
  4. Image URL/Digital Copy URL(varchar(200),unique,not null)
  5. Prescription Date(date)
 
#### 4. Doctor
  1. User ID(Primary Key and Foreign Key, references User ID from User)
  2. License Number(unique and not null, char(6))
  3. Degree(not null, varchar(45))
  4. Department(can be null, varchar(45))
 
#### 5. Order
  1. Order ID (Primary Key,int)
  2. User ID (Foreign Key,int,references User ID from User)
  3. Items Quantity (not null,int)
  4. Delivery Address (not null,Composite)
        1. State(not null,varchar(50))
        2. City(not null, varchar(50))
        3. Street(not null, varchar(50))
        4. Apartment no.(not null, varchar(50))
        5. Pincode(not null, varchar(50))
        6. Landmark(can be null, varchar(50))
  5. Discount (can be null, float)
  6. Delivery Charges (can be null, float)
  7. Total amount(not null, float)
  8. Mode of Payment (not null, varchar(50))
  9. Transaction ID (not null, int)
  10. Subscription ID(Foreign Key,can be null,int)
  11. Pharmacy ID (Foreign Key, int)
  12. Prescription ID (Foreign Key, int)
  13. Agent ID(Foreign Key,int)
  14. OrderDate(not null,date)
  15. DeliveryDate(not null,date)
  16. Status: Being Placed, Placed, Dispatched, Out for Delivery, Delivered, Cancelled
 
#### 6. Order Item

1. Order item no. (Primary Key, int)
2. Medicine ID (Foreign Key, int, references Medicine ID from Medicine )
3. Cost (not null, int)
4. Quantity (not null, int)
5. Order ID(Foreign Key, references Order ID from Orders)

#### 7. Subscription
  1. Subscription ID (Primary Key, int)
  2. Medicine ID (Foreign Key, int)
  3. Cost (not null, int)
  4. Quantity (not null, int)
  5. Start Date (Relationship attribute, date)
  6. User ID(Foreign Key, int , references User ID from User)
  7. Duration (not null, int (number of days)
  8. Status(Active/Cancelled)
  9. Last Order Date(date)
 
#### 8. Complaints
  1. Complaint ID (Primary Key, int)
  2. User ID (Foreign Key, int, references User ID from User)
  3. Description (not null, varchar(50))
  4. Related To (enum, not null valid values: &#39;User Experience&#39;,&#39;Membership&#39;,&#39;Subscription&#39;,&#39;Order&#39;,&#39;Medicine&#39;,&#39;Miscellaneous&#39;)
  5. ComplaintDate (not null, date)
  6. Order ID if Applicable(can be null,Foreign Key, references Order ID from orders)
  7. Pending(tinyint)

#### 9. Pharmacies
  1. Pharmacy id (primary key, int)
  2. License Number (Unique Key,varchar(50))
  3. Display Name(not null,varchar(50))
  4. Address (not null, Multivalued)
        1. State(not null, varchar(50))
        2. City(not null, varchar(50))
        3. Street Address(not null, varchar(50))
        4. Apartment no.(not null,varchar(50))
        5. Pincode(not null, int)
        6. Landmark(not null, varchar(100))
  5. mobile\_number1(not null,char(9),min &amp; max length: 9)
  6. mobile\_number2(can be null,char(9))
  7. Email(not null,varchar(50))
  8. Website(can be null,varchar(50))
  9. Description(can be null,varchar(1000))
  10. Bank Account No(Not null, multivalued)
        1. Account number(not null, int)
        2. IFSC Code(not null, varchar(50))
        3. UPI ID(can be null, varchar(50))
        
#### 10. Delivery agent
  1. Agent id(Primary key, int)
  2. Name(not null, varchar(50))
        1. First name
        2. Last name
  3. DOB(not null,date)
  4. Gender(not null,varchar(50))
  5. Description(not null, varchar(1000))
  6. mobile\_number1(not null,char(9),min &amp; max length: 9)
  7. mobile\_number2(can be null,char(9))
  8. Email\_id(not null,varchar(50))
  9. Address (not null, Multivalued)
        1. State(not null, varchar(50))
        2. City(not null, varchar(50))
        3. Street Address(not null, varchar(50))
        4. Apartment no.(not null, varchar(50))
        5. Pincode(not null, int)
        6. Landmark(not null, varchar(100))
  10. Bank Account No(Not null, multivalued)
        1. Account number(not null, int)
        2. IFSC Code(not null, varchar(50))
        3. UPI ID(can be null, varchar(50))
  11. Salary(Not null, int)
  12. Driving license(Unique ,not null, varchar(50))
#### 11. Medicine Company

1. Company ID (Primary key, int)
2. License No.(unique key, varchar(50))
3. Name (not null, varchar(100))
4. Description (not null, varchar(50), atleast 10 words)
5. Address (Composite Attribute)
    1. State(not null, varchar(50))
    2. City(not null, varchar(50))
    3. Street Address(not null, varchar(50))
    4. Pincode(not null, char(6))
6. Email (not null,candidate key, varchar(50))
7. mobile\_number1(not null,char(9),min &amp; max length: 9)
8. mobile\_number2(can be null,char(9))
9. Website (can be null,varchar(50))

#### 12. Medicines
  1. Medicine ID (Primary key, int)
  2. Name (not null, varchar(100))
  3. Description(not null, varchar(1000))
  4. Company Name (not null, varchar(100))
  5. Cost (not null, int)
  6. Category (not null, varchar(100))
  7. IsPrescribed (not null,boolean)
  8. Packaging Conditions(not null,varchar(100)
  9. Company ID (Foreign Key,not null,int)
  
#### 13. Medicine Availability
  1. Medicine ID(Foreign key, int references Medicine ID from Medicines)
  2. Pharmacy ID(Foreign key,int references Pharmacy ID from pharmacy )
  3. No of Items In stock(not null, int)
  
#### 14. Delivery Pick Up
  1. Delivery Agent ID(Foreign key,int references Agent ID from delivery agent)
  2. Pharmacy ID(Foreign key,int references Pharmacy ID from pharmacy)
  3. Order Number(not null,int,auto generated)

#### 15. Login Credentials
  1. Username(not null,varchar(45))
  2. Password(not null, varchar(45))
  3. User ID(not null,primary key)

#### 16. Pharmacy Login Credentials
  1. Username(not null,varchar(45))
  2. Password(not null, varchar(45))
  3. Pharmacy User ID(not null,primary key)
  
#### 17. Donations
  1. User ID(references User ID from User)
  2. Request Date(date,not null)
  3. Pickup Date(date, can be null)
  4. Donation ID(Primary Key,int)
  
#### 18. Donation Item
  1. Donation ID(part of primary key, Foreign Key, references donation Id from donations)
  2. Medicine ID(part of primary key,Foreign Key, references Medicine ID from Medicines)
  3. Quantity(int)
  4. Total MRP(int)
  
#### 19. Cart Items
  1. User ID(part of primary key,Foreign Key, references User ID from User)
  2. Quantity(int)
  3. Medicine ID(part of primary key, Foreign Key, references Medicine ID from Medicines)
 
#### 20. Medicine Company Contact
  1. Medicine ID(part of primary key, Foreign Key, references Medicine ID from Medicines)
  2. Phone number(part of primary key, char(10))

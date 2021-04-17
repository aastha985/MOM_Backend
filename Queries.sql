# User 

# 1. Signup
INSERT INTO login_credentials (username, hash) VALUES ("aastha001","$2b$10erewjroj");

# 2. Login
SELECT * FROM login_credentials WHERE username = "aastha";

# 3. Profile
select * from user where UserID = 1;

# 4. Is Profile Created
select count(*) as profileCreated from user where UserID = 1;

# 5. Create Profile
INSERT INTO user (UserID,FirstName,LastName, Gender, PhoneNumber1,PhoneNumber2,EmailAddress, State, City,Street,ApartmentNumber, Pincode, Landmark,IsPremiumMember,DOB) VALUES (202,"Rohan","Jain","Male","9958292910","9923191291","rohanjain1922@gmail.com","New Delhi","Delhi","Saket",2,"110017",null,0,"1989-01-01");

# 6. Purchase Premium Membership
insert into `premium member` (DurationInDays,TransactionID,StartDate,UserID) values (365,"21030213",curdate(),23);

# 7. update IsPremiumMember Parameter after user purchase premium
update user set IsPremiumMember = 1 where UserID = 23;

# 8. Premium Member Details
select * from `premium member` where UserID = 23;

# 9. Check if a user is also a doctor(1 = Yes, 0 = No)
select count(*) as IsDoctor from doctor where UserID = 23;

# 10. User registers as a doctor
insert into doctor (UserID,LicenseNo,Degree,Department) values (23,210202,"MD","Dermatologist");

# 11. Show Doctor's Profile
select * from doctor where UserID = 23;

# 12. Display All Prescriptions of Doctor along with Patient Name's and Phone Number
SELECT PrescriptionID,ImageURL as Prescription,PrescriptionDate,CONCAT(FirstName," ",LastName) as "Patient Name",PhoneNumber1 as "Patient Phone Number" FROM prescription join user on prescription.PatientUserID = user.UserID where prescription.DoctorUserID=14;

# 13. Display All Prescriptions of User along with Doctor's Name and Phone Number
SELECT PrescriptionID,ImageURL,PrescriptionDate,CONCAT(FirstName," ",LastName) as "DoctorName",PhoneNumber1 as "DoctorPhoneNumber" FROM prescription join user on user.UserID = prescription.DoctorUserID where PatientUserID = 2;

# 14. Add a new Prescription
insert into prescription (ImageURL,PrescriptionDate,DoctorUserID,PatientUserID) values ("https://www.google.com","2021-03-01",1,3);

# 15.View Items in User's Cart 
select * from cart_items where UserID = 1;

# 16. Add Item to cart
insert into cart_items (UserID,MedicineID) values(1,3);

# 17. Update Quantity of an item in cart
update cart_items set Quantity=3 where UserID = 1 and MedicineID = 3;

# 18. Delete Item From Cart
delete from cart_items where UserID = 1 and MedicineID = 3;

# 19. Show all orders of the user
select * from orders where UserID = 1;

# 20. Create a new order
insert into orders(ItemsQuantity,State,City,Street,ApartmentNumber,Pincode,Landmark,Discount,DeliveryCost,TotalAmount,ModeOfPayment,TransactionID,OrderDate,DeliveryDate,Subscription,PharmacyID,PrescriptionID,UserID,Status) values (2,"Kerala","Thiruvananthapuram","Kanu Kunj","12","110092",null,null,null,400.7,"E-Wallet","VADE0B244532","2020-05-10","2020-05-19",null,6,5,3,1);

# 21. Add cart items to order items while placing order
insert into order_item (Cost,Quantity,OrderID,MedicineID)(select m.Cost, c.Quantity,22 as OrderID,c.MedicineID from cart_items c join medicines m on c.MedicineID =m.MedicineID where UserID = 3);

# 22. Update Order Status to Order Placed 
update orders set status = 2 where OrderID = 22;

# 23. Delete Items from Cart When Order is Placed
delete from cart_items where UserID = 3;

# 24. Cancel an order
update orders set Status = 6 where OrderID = 22;

# 25. Subscribe to an Item
insert into subscription(MedicineID,Cost,Quantity,StartDate,UserID,Duration_In_Days,Status,LastOrderDate) values (4,30,4,"2020-01-01",1,30,1,curdate());

# 26. List all Subscribed Items of the user
select * from subscription where UserID = 1;

# 27. Cancel subscription of an item
update subscription set Status = 2 where SubscriptionID = 4;

# 28. Generate order from subscription
insert into order_item (Cost,Quantity,OrderID,MedicineID)(select Cost,Quantity,? as OrderID,MedicineID from subscription where UserID = ? and Status = 1);

# 29. Set Order status to Order Placed
update orders set status = 2 where OrderID = 20;

# 30. Update Last Order Date After Placing order
update subscription set LastOrderDate = curdate() where UserID = 3 and Status = 1;

# 31. Display all complaints of user
select * from complaints where UserID = 1;

# 32. File New Complaint
insert into complaints (Description,RelatedTo,ComplaintDate,UserID,OrderID_If_Applicable) values ("Delivery Person was rude",4,curdate(),1,1);

# 33. Set Complaint Status to Resolved
update complaints set Pending = 1 where ComplaintsID = 16;

# 34. Donate Items
insert into donations (UserID,Request_Date,Pickup_Date) values(1,curdate(),null);

# 35. Add Item to Donate
insert into donation_item (DonationID,MedicineID,Quantity,Total_MRP) values (1,3,2,"300");

#Medicines
# 36. Display Medicines by Page Number, 10 results per page, offset = (page number -1)*results per page
select * from medicines limit 10 offset 0;

# 37. Display Medicines by Category
select * from medicines where Category = "General Sales List";

# 38. Search Medicine by Name
select * from medicines where Name like "ro";

# Medicine Companies
# 39. Top n medicine companies vased on total quantity of medicines sold, n=5
select rank() over (order by quantitySold desc) Ranking, Name as "Medicine Name",CompanyName,quantitySold from(
            select sum(quantity) as quantitySold,medicines.Name,medicines.CompanyName from order_item join medicines on order_item.MedicineID = medicines.MedicineID group by order_item.MedicineID order by quantitySold desc limit 5
            ) as topMedicines;
            
# 40. Ranking of Medicine Companies by Sales
select rank() over (order by total_sale desc) Rank_by_Sales,CompanyName,total_sale from
	(select medicines.CompanyName , sum(order_item.Cost * order_item.Quantity) as total_sale from medicines join order_item on order_item.MedicineID = medicines.MedicineID 
	group by medicines.CompanyName) as sales;

# 41. Login For Medicine Companies using OTP
select * from medicine_companies where Email = "info@avlbio.com";

# 42. Display Medicines of the Company
select m.Name,m.Description,m.Cost,m.Category,m.IsPrescibed,m.PackagingTemperature from medicines as m join medicine_companies on m.CompanyID = medicine_companies.CompanyID where m.CompanyID=?;

# 43. Display Details about quantity of different medicines sold by the company
select m.Name, sum(Quantity) as quantitySold from medicines m join order_item o on m.MedicineID = o.MedicineID where CompanyID=? group by m.MedicineID order by quantitySold desc;

# 44. Pharmacy Signup
INSERT INTO pharmacy_credentials ( username, hash ) VALUES ( ?, ? ) ;

# 45. Pharmacy Login
SELECT * FROM pharmacy_credentials WHERE username = ? ;

# 46. View Pharmacy Profile
SELECT * FROM pharmacies WHERE PharmacyID = ? ; 

# 47. Checking if a Pharmacy Profile already Created
SELECT COUNT(*) AS profileCreated FROM pharmacies WHERE PharmacyID = ? ;

# 48. Creating a new profile for Pharmacy
INSERT INTO pharmacies ( `PharmacyID`, `Name`, `PhoneNumber1`, `PhoneNumber2`, `Street`, `ApartmentNo`, `Landmark`, `City`, `State`, `Pincode`, `Description`, `LicenseNo`, `EmailAddress`, `Website`, `AC_No`, `IFSC_Code`, `UPI_ID` ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ; 

# 49. Viewing all the orders taken by the Pharmacy
SELECT orders.`OrderID`, orders.`ItemsQuantity`, orders.`OrderDate`, orders.`AgentID`, orders.`Status`, order_item.`OrderItemNo`, order_item.`MedicineID`, order_item.`Quantity` FROM orders INNER JOIN order_item ON orders.OrderID = order_item.OrderID WHERE orders.PharmacyID = ? ;

# 50. Viewing pending orders of the Pharmacy
SELECT orders.`OrderID`, orders.`ItemsQuantity`, orders.`OrderDate`, orders.`AgentID`, orders.`Status`, order_item.`OrderItemNo`, order_item.`MedicineID`, order_item.`Quantity` FROM orders INNER JOIN order_item ON orders.OrderID = order_item.OrderID WHERE orders.PharmacyID = ? AND orders.Status != `Delivered` AND orders.Status != `Cancelled` ;

# 51. Viewing completed orders of the Pharmacy
SELECT orders.`OrderID`, orders.`ItemsQuantity`, orders.`OrderDate`, orders.`AgentID`, orders.`Status`, order_item.`OrderItemNo`, order_item.`MedicineID`, order_item.`Quantity` FROM orders INNER JOIN order_item ON orders.OrderID = order_item.OrderID WHERE orders.PharmacyID = ? AND orders.Status = `Delivered` ;

# 52. Viewing Delivery Agent profile
SELECT * FROM delivery_agent WHERE AgentID = ? ;

# 53. Creating a new Delivery Agent
INSERT INTO delivery_agent ( `AgentID`, `FirstName`, `LastName`, `DOB`, `Gender`, `PhoneNumber1`, `PhoneNumber2`, `EmailAddress`, `DrvingLicenseNo`, `Description`, `ApartmentNo`, `Street`, `Landmark`, `City`, `State`, `Pincode`, `salary`, `BankAC_No`, `IFSC_Code`, `UPI_ID` ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ;

# 54. Checking Due order for the Agent
SELECT orders.`OrderID`, orders.`PharmacyID`, orders.`DeliveryDate` FROM orders WHERE orders.AgentID = ? AND orders.Status != `Delivered` AND orders.Status != `Cancelled` ;

# 55. Viewing all orders ever came for delivery
SELECT orders.`OrderID`, orders.`PharmacyID`, orders.`AgentID`, orders.`Status`, orders.`DeliveryDate` FROM orders ;

# 56. Checking orders left for delivery
SELECT orders.`OrderID`, orders.`PharmacyID`, orders.`AgentID`, orders.`DeliveryDate` FROM orders WHERE orders.Status != `Delivered` AND orders.Status != `Cancelled` ;

# 57. Viewing orders of a particular Date
SELECT orders.`OrderID`, orders.`PharmacyID`, orders.`AgentID`, orders.`Status`, orders.`DeliveryDate` FROM orders WHERE orders.DeliveryDate = ? ;

# 58. Viewing orders between Dates
SELECT orders.`OrderID`, orders.`PharmacyID`, orders.`AgentID`, orders.`Status`, orders.`DeliveryDate` FROM orders WHERE orders.DeliveryDate BETWEEN ? AND ? ;

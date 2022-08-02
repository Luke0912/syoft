# syoft
3 Page’s
• Register
• Login
• Product List
Using MERN stack and JWT Token.
Register:
Create a page and an API post call to get fields like username, phone, email, password and role
(admin, manager, staff).
Login:
Create a page and an API call for user to login, using his credentials like email and password if
a valid user, return response with his details along with JWT authentication token and store it in
session.
Product List:
Create a page and an API get and post call for Products list to take input and output fields like
product name, product price, product description, inventory count along with JWT token retrieve from
session storage.
Use the JWT token to verify whether he has access to CRUD operations or not.
Perform CRUD operations like
• API call to create product - (admin)
• API call to read all products – (admin, manager)
• API call to update inventory – (admin, manager)
• Staff will not have any rights for that API’s
Use JWT authentication to check whether the session user has rights to perform these operations or
not.

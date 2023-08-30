# Phonebook

# Starting the application

To start the application first install the dependencies with the command npm install inside the terminal
To run the application use the command npm start
Npm start will start the server and connect to the database if one is provided
The application will run on port 3001 unless a different one is provided in a .env file

# Connecting with a new database

To connect to your own database go to the file mongodb.js inside the src directory and assign your database to the variable MONGODB_URI

# Using the application

The application has 3 main pages: Keypad, Contacts and Favorite Contacts

# Keypad Page

- On the Keypad page you can add the phone number by pressing Add Number button that will appear once a number is typed
- Then you will be send to a new page to create the contact
- The contact will have a name, first name and the number that you just typed that can still be edited
- All fields are mandatory
- The phone numbers can't repeat themselves, if there is a contact that already has the same phone number the application will let you know which contact already uses that number
- Once the fields have been completed you can press the save button, which will create the contact and save it inside the database or the cancel button which will clear the fields and send you back to the Keypad page

# Contact Page

- If there currently are no contacts in the database this page will be empty
- If there are more contacts they will be display in alphabetical order
- There is also a search field that will filter through the contacts by name, first name, full name or phone number
- When pressing on a contact, a page with the contact details will open
- To edit a contact you can press the edit button, make the desired changes and press the save button that will appear in place of the edit. This will update the contact inside the database
- To delete the contact press the delete button
- You can also add/remove a contact to/from favorite with the Add/Remove as favorite button. This will display/remove the contact in the Favorite Page

# Favorite Contacts Page

- Similar to the Contact Page, but it will only display the contacts that have been added as favorite
- If there are no contacts added as favorite this page will be empty

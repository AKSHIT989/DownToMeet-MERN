# DownToMeet-MERN
Hosted on: https://downtomeet-akshit-soneji.web.app/

API Hosted on: https://downtomeet-api.herokuapp.com/

API Documentation: https://documenter.getpostman.com/view/12792834/TVzViGQU

Down To Meet: An event management website built using React, Express, Node.js, MongoDB Atlas, AWS S3, API hosted on Heroku.
### Table of Content for README.md
1) Steps to make this project work
2) Features
3) Screenshots


### Steps for making this project work:
1) clone this repo using 
```
    "git clone https://github.com/AKSHIT989/DownToMeet-MERN.git"
```
2) open cmd with pwd ./DownToMeet-MERN and type 
```"npm install"``` this will create npm  modules and package-lock.json
3) create .env file with content like<br>
```
  mongo_DB_Connection = mongodb+srv://<username>:<password>@cluster0.himhp.mongodb.net/<dbname>?retryWrites=true&w=majority
  ACCESS_KEY_ID = "Provided through AWS S3"
  SECRET_ACCESS_KEY = "Provided through AWS S3"
  
```
4) Type ```npm run dev``` or ```nodemon backend/server```,this will make the express server run at localhost:8000
5) For frontend to work follow these steps
```
cd client
npm install
``` 
6) Type ```npm run dev``` or ```npm start```,this will make the react app start at localhost:3000

### Features:
1) Password hashing during register/login for security using npm package "bcrypt"
2) Using tokens and verifying for protecting routes using npm package "jsonwebtoken"
3) Creating events with proper validations
4) Storing images on AWS S3 and using timestamp for unique identification of image using npm package "multer"
5) Displaying events ascendingly sorted with base of Date
6) Filtering events based on event-type(seminar/webinar/workshop and Your events)
7) Deleting events that you have created.
8) Requesting registration for event as an attendee.
9) Accepting/Rejecting participant request as an organizer of event.
10) Viewing number of participants and all details of participants.


### Screenshots:
![Login Page](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss1.jpg?raw=true)
![Register Page](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss2.jpg?raw=true)
![Home Page](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss3.jpg?raw=true)
![Events, Filter on Home Page](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss4.jpg?raw=true)
![Events on Home Page](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss5.jpg?raw=true)
![Workshop Filter applied in Home Page](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss6.jpg?raw=true)
![Link to Event page for non organizer](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss7.jpg?raw=true)
![Link to Event page for organizer](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss8.jpg?raw=true)
![View Participants](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss9.jpg?raw=true)
![Create Event](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss10.jpg?raw=true)
![Registrations Request](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss11.jpg?raw=true)
![Mobile View for Home Page](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss12.jpg?raw=true)
![Mobile View for Create Event Page](https://github.com/AKSHIT989/DownToMeet-MERN/blob/master//client/src/assets/Screenshots/ss13.jpg?raw=true)

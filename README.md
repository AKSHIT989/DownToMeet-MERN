# DownToMeet-MERN
A meetup clone built using MERN Stack

Steps for making this project work:
1) clone this repo using 
```
    "git clone https://github.com/AKSHIT989/DownToMeet-MERN.git"
```
2) open cmd with pwd ../DownToMeet-MERN and type 
```"npm install"``` this will create npm  modules and package-lock.json
3) create .env file with content like<br>
```
  mongo_DB_Connection = mongodb+srv://<username>:<password>@cluster0.himhp.mongodb.net/<dbname>?retryWrites=true&w=majority
```
4) Type ```npm run dev``` or ```nodemon backend/server```,this will make the express server run at localhost:8000
5) For frontend to work follow these steps
```
cd client
npm install
``` 
6) Type ```npm run dev``` or ```npm start```,this will make the react app start at localhost:3000

Features:
1) Password hashing
2) Using tokens for sharing userid between processes
3) creating event
4) filtering events based on seminar, workshop, webinars, your events
5) deleting events.

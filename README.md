## REQUEST AND RESPONSE TIME LOGGER
- Contains all the log for req and response time. 

## HOW TO USE
### Steps:
 - Clone this project
 - Install all dependences by ```npm i``` or ```npm install ```
 - Start the server using ```nodemon app.js```(required nodemon globally) OR ```node app.js```
 - now hit the url (http://localhost:3000/api/v1/gkb) either in browser or in postman with GET method. 
 - if you get response like this
 ```{"error":false,"message":"execution finished","status":200,"data":{"responseTimeFormate":"23:12:45:889","totalTimeTaken":1050}}```
 then check the logs folder created in the same project where log is stored.

 **log storage location**: project_location/logs/combined

 **Note**: Logs will be stores with date filename followed by combined keyword

 - If there is any error, check this location for any error:
 **log storage location**: project_location/logs/error

 ### System Requirement
 - Node js 12.x.x
 - Postman
 - Browser (Chrome or Mozilla)
 - OS (Linux or Windows)

 
### User Details Management (CRUD) Frontend and Backend (File System Storage) Applications
#
#### BACKEND - Nodejs/ExpressJS 4, Command Line Window 1
Run `cd backend` to go to frontend directory.\
Run `npm install` to install all the dependencies.\
Run `node starter.js` to start backend application. Navigate to `http://localhost:4000/` Which can be consumed by the frontend application.

##### Routes
* User List (GET) - http://localhost:4000/api/users
* Add User (POST) - http://localhost:4000/api/users
* View User (GET) - http://localhost:4000/api/users/userone
* Edit User (PUT) - http://localhost:4000/api/users/userone
* Delete User (DELETE) - http://localhost:4000/api/users/userone
#

#### FRONTEND - Angular 6, Bootstrap 4, Command Line Window 2
Run `cd frontend` to go to frontend directory.\
Run `npm install` to install all the dependencies.\
Run `ng serve` to start frontend application. Navigate to `http://localhost:4200/`.

##### Routes
* User List - http://localhost:4200/users/list
* Add User - http://localhost:4200/users/add
* View User - http://localhost:4200/users/view/userone
* Edit User - http://localhost:4200/users/edit/userone
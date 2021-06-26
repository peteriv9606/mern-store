# mern-store
A Full-Stack M(ongo)E(xpress)R(eact)N(ode) App (still under construction).

[View live website](https://pivanov-mern-store.herokuapp.com/)

Keep in mind, that the site may load slowly if nobody has accessed it recently. It's hosted on Heroku.

Functionalities:
  * Register a new user;
  * Login; 
  * Add new product;
  * Delete product;
  * Edit product;
  * Password encryption added (using bcrypt);
  
If you do not want to register, you can use username: 1 and password 1 to login.

# let's build and run this

/You need Node.js to run this program/
  1. Download or clone this repo;
  2. Go to main directory and type in console "npm install";
  3. Go to backend and type "npm install", and then to frontend - "npm install";
  4. To run localy, you can either go to frontend and backend folders separately and type "npm start", or go to main directory and type "npm start" (in main, I'm using npm package concurrently to run both environments)

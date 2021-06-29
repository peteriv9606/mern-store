# MERN-Store
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
  * View single product on click (with SOON TO BE ADDED options to add-to-cart/message-seller/leave-a-comment(review)-under-the-product (if logged in);
  
If you do not want to register, you can use username: "testUsername" and password: "testUsername" to login.

# Let's build and run this
/Prequisitories: Node.js, MongoDB Atlas account/

  1. Download or clone this repo;
  2. Go to main directory and type in console "npm run install-local" (This will install dependencies will add the node_modules folder to both server and frontend folders);
  3. In main directory, create a .env file and input your mongodb connection string using MONGO_URI variable (you can follow [this](https://docs.mongodb.com/guides/cloud/connectionstring/) tutorial. (e.g (in .env: MONGO_URI=mongodb+srv://<username>:<password>@maincluster.xxs1n.mongodb.net/<database>?retryWrites=true&w=majority);
  *Don't forget to whitelist your IP address in order to access the database*; 
  4. To run localy, you can either:
    4.1 (In main directory) run command "npm run build" (to build the frontend) and then "nodemon server.js" to run the backend (server responds to requests with the /build/index.html file);
    4.2 (In main directory) run command "npm run start-backend" and *in new terminal* run command "npm run start-backend" (now frontends' requests *localhost:3000* are proxied to the backend *localhost:4000*, and you can monitor both backend and frontend requests/changes)

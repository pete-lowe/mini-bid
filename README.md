
# MiniBid - Auction site for Cloud Computing


### Starting the application
------------------

To start the application run the following command:

```
npm start
```

This will start the application on your local machine (default port 3000)

------------------
### Swagger
------------------

The API endpoints can be accessed and tested using swagger by accessing the following link (when running locally and on the default port):

```
http://localhost:3000/doc/
```

------------------
### Testing
------------------

There is a small set of automated tests written in python which carry out functional checks of the API end points. These are located in the following folder:

```
\test
```

The automated scripts can be run using the following command (if running locally you will need to enter these commands in a seperate terminal whilst the application is running and connected to the DB):

```
python3 tests.py
```
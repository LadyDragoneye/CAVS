Make sure before pushing to the repo to run `docker-compose up --build` pls



# Feb 7 -Brooks
Connecting frontend to backend using axios and django REST framework
prompt the user to input name and department
`Make sure to run npm run build before starting react app or else it wont start'
created react app with `create-react-app` start it with `npm start`

created django app with `django-admin startproject myproject`
to run `python3 manage.py runserver`

added installed apps in `settings.py`
as well as corseheaders to middleware and dictionaries

`REST_FRAMEWORK` which we need in order to not block react framework from interacting with django

`CORS_ORIGIN_ALLOW_ALL` which is used to tell the browser that our web app is running at one origin.

The new users are currently being save to the default databse which is SQLite but it looks pretty easy to implement mysql or whatever we're going to use in settings.py


# Feb 8 -Brooks

After cloning the repository, switch to the frontend directory and run `npm install`
# Feb 8 - Eric
    NOTE: Need to run:
        npm i react-router-dom --save styled-components
        npm install react-icons --save
        npm install bootstrap
# Feb 8 - Brooks
Then `docker-compose up --build` 
Then after that you only need to run `docker-compose up` when you want to start it up again



Now the front end should be served locally on port 3000, and backend on port 8000 and all will be formatted on save!

# Feb 7

Connecting frontend to backend using axios and django REST framework
prompt the user to input name and department
`Make sure to run npm run build before starting react app or else it wont start'
created react app with `create-react-app`

created django app with `django-admin startproject myproject`
to run `python3 manage.py runserver`

added installed apps in `settings.py`
as well as corseheaders to middleware and dictionaries

`REST_FRAMEWORK` which we need in order to not block react framework from interacting with django

`CORS_ORIGIN_ALLOW_ALL` which is used to tell the browser that our web app is running at one origin.

The new users are currently being save to the default databse which is SQLite but it looks pretty easy to implement mysql or whatever we're going to use in settings.py

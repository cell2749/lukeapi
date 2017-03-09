BALTIC APP BACKEND
The Backend is built on nodejs(express) and mongodb.
npm dependencies are in package.json

Service sensitive dependencies are: Auth0 and openweathermap
https://auth0.com/
http://openweathermap.org/

openweathermap api access frequency is adjusted for free pricing plan, through WEATHER_UPDATE_PERIOD variable for lukeB team in the place.js route

The backend contains interfaces for two different apis'
lukeA - was Harri and Daniel team.
lukeB - was Juhani team.

!Important
The source code is missing .env file which is to be included in the root of the project directory and in the bin directory.
.env carries sensitive variables. The following variables should be defined in .env file:

AUTH0_DOMAIN
AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET
AUTH0_CALLBACK_URL_DEVELOPMENT
AUTH0_CALLBACK_URL_PRODUCTION
AUTH0_CALLBACK_URL_DEVELOPMENT_A
AUTH0_CALLBACK_URL_PRODUCTION_A
AUTH0_CALLBACK_URL_DEVELOPMENT_B
AUTH0_CALLBACK_URL_PRODUCTION_B
AUTH0_API_TOKEN
OPEN_WEATHER_API_KEY

F.E. 
AUTH0_DOMAIN = example.region.auth0.com
# Weather App - Tamkeen Technologies

- This project is created using [Next.js](https://nextjs.org/) - bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- Listing of top cities
- Searching by city name
- Searcing by long-lat
- Caching the previous search results

## Highlights

- Used [`Open weather map`](https://openweathermap.org/) for getting the weather data of searched locations.
- All components are designed using Styled Components.
- For fonts used google fonts.
- Used redux toolkit for application data management.
- Used typescript as a template for application creation.

## Getting started

- Get this app to local machine - git clone https://github.com/Chetan-Bashetti/weather-app.git
- Once done with cloning cd to the code and do code . in terminal.
- This will open VSCode for this project.
- To install the modules do npm || npm i || npm install.
- Create a .env.local file for having the env variables.
- Add 2 env variables NEXT_PUBLIC_OPEN_WEATHER_API_KEY - for the api key
- And NEXT_PUBLIC_OPEN_WEATHER_API_URL - for open weather api end point - (https://api.openweathermap.org/data/2.5/weather).
- Once you are done with installing the modules and added env variables do npm run dev.
- This will start the local server on machine on PORT 3000 - http://localhost:3000/

## Operations to perform

- First section is dedicated to top cities like Riyadh, Dammam, Jeddah, Mecca, Madina
- In next section there are 2 input fields in 1st you can select the type of serach for ex - by city or by lat-long.
- You can click on clear button to clear the input fields.
- Once you click on search you will be able to load the weather data of the searched city.
- If wrong city name of lat-long entered UI will show the proper error messsage.
- Whenever you search, that location will be cached and stored for further use, in this section you can see all the cached locations.
- You can search with same city by clicking on the search icon and you can even update and delete the city by clicking on the edit and remove icon respectively.
- The Last card is a weather card which shows the information like Name, country, local-time, temprature, description, sunrise, sunset & etc of the searched location's weather

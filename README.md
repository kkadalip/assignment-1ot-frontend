#  Estonian Weather data UI
Frontend code for 1oT assignment

## 1. Navigate to project root
    $ cd C:\Users\username\workspace\assignment-1ot-frontend

## 2. [OPTION 1] Building and running with docker-compose
    ($ docker-compose down)
    ($ docker-compose build --no-cache)
    $ docker-compose up
    
## 2. [OPTION 2] Building and running with docker
    $ docker build -t weatherapp-ui .
    $ docker run -p 3000:3000 weatherapp-ui .
    
## 2. [OPTION 3] Building and running the application with npm
    $ npm run-script build
    $ npm start
    
## 3. Open http://localhost:3000/

#### Technologies and frameworks in use:
* ReactJS https://github.com/facebook/create-react-app
* Docker https://docs.docker.com/docker-for-windows/ and https://hub.docker.com/_/node

###### UI:
* PrimeReact <a>https://www.primefaces.org/primereact
* Primeicons (included with PrimeReact, examples at: https://www.primefaces.org/primeng/#/icons) 
* reactstrap https://reactstrap.github.io/

###### Translations:
* i18next https://www.i18next.com/
* react-i18next https://react.i18next.com/overview/getting-started

###### Data fetching (better HTTP requests) and error handling:
* axios https://github.com/axios/axios

###### Weather icons
* react-icons-weather https://www.npmjs.com/package/react-icons-weather (based on: https://erikflowers.github.io/weather-icons/)

##### Useful guides
* https://reactjs.org/docs/getting-started.html
* https://github.com/facebook/create-react-app
* ReactStrap components - https://reactstrap.github.io/components/